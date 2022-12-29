console.log("main.js!!");

const MODE_LOADING  = 0;
const MODE_HOME     = 1;
const MODE_GOOGLE   = 2;
const MODE_APPLE    = 3;
const MODE_SETTINGS = 4;
const KEY_STORAGE   = "todo";

const myData = {
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
		elemOff.addEventListener("show.bs.offcanvas", this.onOffcavasShow);
		elemOff.addEventListener("hide.bs.offcanvas", this.onOffcavasHide);
		this.myOffcanvas = new bootstrap.Offcanvas(elemOff);
		// Modal
		const elemModalTag = document.getElementById("myModalTag");
		const modalTag = new bootstrap.Modal(elemModalTag);
		const elemModalTodo = document.getElementById("myModalTodo");
		const modalTodo = new bootstrap.Modal(elemModalTodo);
		// Sortable
		this.mountSortable("myStblTodos", ".myStblHandleTodos", 
			this.onSortTodo, this.onEndTodo);
		this.mountSortable("myStblTags", ".myStblHandleTags", 
			this.onSortTag, this.onEndTag);
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
			children.sort((a, b)=>a.getAttribute("order") - b.getAttribute("order"));
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
			this.data.tags.sort((a, b)=>a.index - b.index);
			this.data.todos.sort((a, b)=>a.index - b.index);
		},
		createTag(){
			console.log("createTag");
			// Error
			if(this.tagName == null || this.tagName.length <= 0){
				showToast("Error", "1 min ago", "タグ名を入力してください");
				return;
			}
			// Tag
			const tag = {
				id: "t_" + Date.now(),
				index: this.tags.length,
				name: this.tagName
			}
			this.data.tags.push(tag);// Create
			this.activeTag = tag;// Active
			this.changeTag(this.activeTag);// Reflesh
		},
		updateTag(id){
			console.log("updateTag:", id);
			// Error
			if(this.tagName == null || this.tagName.length <= 0){
				showToast("Error", "1 min ago", "タグ名を入力してください");
				return;
			}
			for(let i=this.data.tags.length-1; 0<=i; i--){
				const tag = this.data.tags[i];
				if(tag.id != id) continue;
				tag.name = this.tagName;// Update
				break;
			}
			this.changeTag(this.activeTag);// Reflesh
		},
		deleteTag(id){
			console.log("deleteTag:", id);
			for(let i=this.data.tags.length-1; 0<=i; i--){
				const tag = this.data.tags[i];
				if(tag.id != id) continue;
				this.data.tags.splice(i, 1);// Delete
				break;
			}
			this.changeTag(this.activeTag);// Reflesh
		},
		changeTag(tag){
			if(tag==null && tag==undefined) return;
			this.activeTag = tag;
			console.log("changeTag:", tag.id, tag.name);
			
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
			this.tags = this.data.tags.slice();
			//this.tags.sort((a, b)=>a.index - b.index);// Sort

			// Todos
			this.todos = this.data.todos.filter(todo=>todo.tag==this.activeTag.id);// Filter
			this.todos.sort((a, b)=>a.index - b.index);// Sort
			this.resetSortable("myStblTodos");// Reset

			this.saveStorage();// Save
		},
		createTodo(){
			console.log("createTodo");
			// Error
			if(this.todoMsg == null || this.todoMsg.length <= 0){
				showToast("Error", "1 min ago", "テキストを入力してください");
				return;
			}
			// Todo
			const todo = {
				id: "r_" + Date.now(),
				index: this.todos.length,
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
			for(let i=this.data.todos.length-1; 0<=i; i--){
				const todo = this.data.todos[i];
				if(todo.id != id) continue;
				todo.msg = this.todoMsg;// Update
				break;
			}
			this.changeTag(this.activeTag);// Reflesh
		},
		deleteTodo(id){
			console.log("deleteTodo:", id);
			for(let i=this.data.todos.length-1; 0<=i; i--){
				const todo = this.data.todos[i];
				if(todo.id != id) continue;
				this.data.todos.splice(i, 1);// Delete
				break;
			}
			this.changeTag(this.activeTag);// Reflesh
		},
		toggleTodo(id){
			console.log("toggleTodo:", id);
			for(let i=this.data.todos.length-1; 0<=i; i--){
				const todo = this.data.todos[i];
				if(todo.id != id) continue;
				todo.checked = !todo.checked;// Toggle
				break;
			}
			this.changeTag(this.activeTag);// Reflesh
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
		onOffcavasShow(){
			// Do nothing
		},
		onOffcavasHide(){
			// Do nothing
		},
		onSortTodo(e){
			console.log("onSortTodo:", e);
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
		},
		onSortTag(e){
			console.log("onSortTag:", e);
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
		}
	},
	computed:{
		getSortedTags(){
			return this.tags.slice().sort((a, b)=>a.index - b.index);// Sort
		}
	}
});

// Components
app.component("greeting", {
	template: "<p>Good morning!!</p>"
});

app.mount("#app");