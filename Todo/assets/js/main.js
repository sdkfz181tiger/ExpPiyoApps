console.log("main.js!!");

const VERSION = "v0.1.0";
const MODE_LOADING  = 0;
const MODE_HOME     = 1;
const MODE_GOOGLE   = 2;
const MODE_APPLE    = 3;
const MODE_SETTINGS = 4;
const KEY_STORAGE   = "todo";

const myData = {
	version: VERSION,
	mode: MODE_LOADING,
	actives: [false, false, false, false, false],
	myOffcanvas: null,
	activeTag: null,
	data: null,
	tags: [], todos: [],
	tagId: null, tagName: null,
	todoId: null, todoMsg: null
}

// Vue.js
const app = Vue.createApp({
	data(){
		return myData;
	},
	created(){
		console.log("created!!");
	},
	mounted(){
		console.log("mounted!!");
		// Offcanvas
		const elemOff = document.getElementById("myOffcanvas");
		this.myOffcanvas = new bootstrap.Offcanvas(elemOff);
		// Modal
		const elemModalTag = document.getElementById("myModalTag");
		const modalTag = new bootstrap.Modal(elemModalTag);
		const elemModalTodo = document.getElementById("myModalTodo");
		const modalTodo = new bootstrap.Modal(elemModalTodo);
		// Sortable
		this.mountSortable("myStblTags", ".myStblHandleTags", 
			this.onSortTag, this.onEndTag);
		this.mountSortable("myStblTodos", ".myStblHandleTodos", 
			this.onSortTodo, this.onEndTodo);
		// LocalStorage
		this.loadStorage();
	},
	methods:{
		changeMode(mode){
			if(this.mode == mode) return;
			this.mode = mode;
			for(let i=0; i<this.actives.length; i++){
				this.actives[i] = this.mode == i;
			}
		},
		mountSortable(id, handle, onSort, onEnd){
			console.log("mountSortable");
			const elem = document.getElementById(id);
			if(elem == null){
				setTimeout(()=>{
					this.mountSortable(id, handle, onSort, onEnd);
				}, 200);
				return;
			}
			console.log("mountSortable:", id);
			Sortable.create(document.getElementById(id),
				{handle: handle, animation: 150, onSort: onSort, onEnd: onEnd});
		},
		resetSortable(id){
			const elem = document.getElementById(id);
			if(elem == null){
				setTimeout(()=>{
					this.resetSortable(id);
				}, 200);
				return;
			}
			console.log("resetSortable:", id);
			// Reset(Views)
			const list = elem.getElementsByClassName("children");
			const children = Array.prototype.slice.call(list);
			children.sort((a, b)=>a.getAttribute("order")-b.getAttribute("order"));
			for(let i=children.length-1; 0<=i; i--) elem.prepend(children[i]);
		},
		loadStorage(){
			console.log("loadStorage");
			// LocalStorage
			const json = localStorage.getItem(KEY_STORAGE);
			if(json != null){
				this.data = JSON.parse(json);
				this.sortAllData();// Sort
				this.changeTag(this.data.tags[0]);
				setTimeout(()=>{this.changeMode(MODE_HOME);}, 100);
				return;
			}
			// Axios
			loadAxios("./assets/js/data.json", (json)=>{
				this.data = json.data;// Data
				this.sortAllData();// Sort
				this.changeTag(this.data.tags[0]);
				setTimeout(()=>{this.changeMode(MODE_HOME);}, 100);
			}, (err)=>{
				showToast("Error", "0 min ago", "通信エラーです");
			});
		},
		saveStorage(){
			console.log("saveStorage");
			const json = JSON.stringify(this.data);
			localStorage.setItem(KEY_STORAGE, json);
		},
		sortAllData(){
			console.log("sortAllData");
			this.data.tags.sort((a, b)=>a.index-b.index);
			this.data.todos.sort((a, b)=>a.index-b.index);
		},
		createTag(){
			console.log("createTag");
			// Error
			if(this.tagName == null || this.tagName.length <= 0){
				showToast("Error", "1 min ago", "タグ名を入力してください");
				return;
			}
			// Tags
			let next = 0;
			if(0 < this.tags.length){
				const max = this.tags.reduce((a, b)=>a.index<b.index?b:a);
				next = max.index + 1;
			}
			const tag = {
				id: "t_" + Date.now(),
				index: next,
				name: this.tagName
			}
			this.data.tags.push(tag);// Create
			this.changeTag(tag);// Reflesh
		},
		updateTag(id){
			console.log("updateTag:", id);
			// Error
			if(this.tagName == null || this.tagName.length <= 0){
				showToast("Error", "1 min ago", "タグ名を入力してください");
				return;
			}
			// Update
			this.data.tags.some((tag, i)=>{
				if(tag.id == id) tag.name = this.tagName;
			});
			this.changeTag(this.activeTag);// Reflesh
		},
		deleteTag(id){
			console.log("deleteTag:", id);
			// Delete
			this.data.tags.some((tag, i)=>{
				if(tag.id == id) this.data.tags.splice(i, 1);
			});
			this.changeTag(this.activeTag);// Reflesh
		},
		changeTag(tag, resortFlg=true){
			console.log("changeTag:", tag);
			// Change
			if(tag==null && tag==undefined) return;
			this.activeTag = tag;
			
			// Tags
			if(this.data.tags.length <= 0){
				this.data.tags.push({
					id: "t_" + Date.now(),
					index: 0,
					name: "MyTodo"
				});
			}
			if(!this.data.tags.includes(this.activeTag)){
				this.activeTag = this.data.tags[0];
			}
			this.tags = this.data.tags.slice();// Copy

			// Todos
			if(resortFlg){
				this.todos = this.data.todos.filter(todo=>todo.tag==this.activeTag.id);// Filter
				this.todos.sort((a, b)=>a.index - b.index);// Sort
				this.resetSortable("myStblTodos");// Reset
			}

			this.saveStorage();// Save
		},
		createTodo(){
			console.log("createTodo");
			// Error
			if(this.todoMsg == null || this.todoMsg.length <= 0){
				showToast("Error", "1 min ago", "テキストを入力してください");
				return;
			}
			// Todos
			let next = 0;
			if(0 < this.todos.length){
				const max = this.todos.reduce((a, b)=>a.index<b.index?b:a);
				next = max.index + 1;
			}
			const todo = {
				id: "r_" + Date.now(),
				index: next,
				tag: this.activeTag.id,
				msg: this.todoMsg,
				checked: false
			};
			this.data.todos.push(todo);// Create
			this.changeTag(this.activeTag);// Reflesh
		},
		updateTodo(id){
			console.log("updateTodo:", id);
			// Error
			if(this.todoMsg == null || this.todoMsg.length <= 0){
				showToast("Error", "1 min ago", "テキストを入力してください");
				return;
			}
			// Update
			this.data.todos.some((todo, i)=>{
				if(todo.id == id) todo.msg = this.todoMsg;
			});
			this.changeTag(this.activeTag);// Reflesh
		},
		deleteTodo(id){
			console.log("deleteTodo:", id);
			// Delete
			this.data.todos.some((todo, i)=>{
				if(todo.id == id) this.data.todos.splice(i, 1);
			});
			this.changeTag(this.activeTag);// Reflesh
		},
		toggleTodo(id){
			console.log("toggleTodo:", id);
			// Toggle
			this.data.todos.some((todo, i)=>{
				if(todo.id == id) todo.checked = !todo.checked;
			});
			this.changeTag(this.activeTag, false);// Reflesh
		},
		showModalCreateTag(){
			console.log("showModalCreateTag");
			this.tagId = null;
			this.tagName = null;
			const elem = document.getElementById("myModalTag");
			elem.querySelector("#modalLabel").innerText = "CreateTag";
			bootstrap.Modal.getInstance(elem).show();
		},
		showModalEditTag(tag){
			console.log("showModalEditTag:", tag.id);
			this.tagId = tag.id;
			this.tagName = tag.name;
			const elem = document.getElementById("myModalTag");
			elem.querySelector("#modalLabel").innerText = "EditTag";
			bootstrap.Modal.getInstance(elem).show();
		},
		showModalCreateTodo(){
			console.log("showModalCreateTodo");
			this.todoId = null;
			this.todoMsg = null;
			const elem = document.getElementById("myModalTodo");
			elem.querySelector("#modalLabel").innerText = "CreateTodo";
			bootstrap.Modal.getInstance(elem).show();
		},
		showModalEditTodo(todo){
			console.log("showModalEditTodo:", todo.id);
			this.todoId = todo.id;
			this.todoMsg = todo.msg;
			const elem = document.getElementById("myModalTodo");
			elem.querySelector("#modalLabel").innerText = "EditTodo";
			bootstrap.Modal.getInstance(elem).show();
		},
		onSortTag(e){
			console.log("onSortTag");
			const items = e.target.querySelectorAll("label");
			for(let i=0; i<items.length; i++){
				const id = items[i].getAttribute("id");
				const tag = this.tags.find(tag=>tag.id==id);
				tag.index = i;// Index
			}
		},
		onEndTag(e){
			console.log("onEndTag:", e.oldIndex, "->", e.newIndex);
			this.saveStorage();// Save
			const id = e.item.getAttribute("id");
			const tag = this.tags.find(tag=>tag.id==id);
			if(tag) this.changeTag(tag);// Change

		},
		onSortTodo(e){
			console.log("onSortTodo");
			const items = e.target.querySelectorAll("input");
			for(let i=0; i<items.length; i++){
				const id = items[i].getAttribute("id");
				const todo = this.todos.find(todo=>todo.id==id);
				todo.index = i;// Index
			}
		},
		onEndTodo(e){
			console.log("onEndTodo:", e.oldIndex, "->", e.newIndex);
			this.saveStorage();// Save
		}
	},
	computed:{
		getSortedTags(){
			return this.tags.slice().sort((a, b)=>a.index-b.index);// Sort
		}
	}
});

// Components
app.component("greeting", {
	template: "<p>Good morning!!</p>"
});

app.mount("#app");