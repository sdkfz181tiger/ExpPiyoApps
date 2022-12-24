console.log("main.js!!");

// Todo
class Todo{
	constructor(obj){
		this._id = obj.id;
		this._tag = obj.tag;
		this._msg = obj.msg;
		this._checked = obj.checked;
	}
	get id(){return this._id;}
	set id(i){this._id = i;}
	get tag(){return this._tag;}
	set tag(t){this._tag = t;}
	get msg(){return this._msg;}
	set msg(m){this._msg = m;}
	get checked(){return this._checked;}
	set checked(c){this._checked = c;}
}

const MODE_LOADING  = 0;
const MODE_HOME     = 1;
const MODE_GOOGLE   = 2;
const MODE_APPLE    = 3;
const MODE_SETTINGS = 4;

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

		// Axios
		loadAxios("./js/data.json", (json)=>{
			this.data = json.data;// Data
			this.changeTag(this.data.tags[0]);
			setTimeout(()=>{this.changeMode(MODE_HOME);}, 200);
		}, (err)=>{
			showToast("Error", "0 min ago", "通信エラーです");
		});

		// Offcanvas
		const elemOff = document.getElementById("myOffcanvas");// Offcanvas
		this.myOffcanvas = new bootstrap.Offcanvas(elemOff);
		// Modal
		const elemModalTag = document.getElementById("myModalTag");
		const modalTag = new bootstrap.Modal(elemModalTag);
		const elemModalTodo = document.getElementById("myModalTodo");
		const modalTodo = new bootstrap.Modal(elemModalTodo);
	},
	methods:{
		changeMode(mode){
			if(this.mode == mode) return;
			this.mode = mode;
			for(let i=0; i<this.actives.length; i++){
				this.actives[i] = this.mode == i;
			}
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
				name: this.tagName
			}
			this.data.tags.push(tag);// Create
			this.activeTag = tag;// Active
			this.changeTag(this.activeTag);// Reflesh
		},
		updateTag(id){
			console.log("updateTag:", id);
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
			console.log("changeTag:", tag.id, tag.name);
			this.tags = [];// Tags
			for(let obj of this.data.tags) this.tags.push(obj);
			this.todos = [];// Tags
			for(let obj of this.data.todos) this.todos.push(new Todo(obj));
			this.activeTag = tag;// Selected
			this.todos = this.data.todos.filter(todo=>todo.tag==this.activeTag.id);
		},
		createTodo(){
			console.log("createTodo");
			// Error
			if(this.todoMsg == null || this.todoMsg.length <= 0){
				showToast("Error", "1 min ago", "テキストを入力してください");
				return;
			}
			// Todo
			const todo = new Todo({
				id: "r_" + Date.now(),
				tag: this.activeTag.id,
				msg: this.todoMsg,
				checked: false
			});
			this.data.todos.push(todo);// Create
			this.changeTag(this.activeTag);// Reflesh
		},
		updateTodo(id){
			console.log("updateTodo:", id);
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
		}
	}
});

// Components
app.component("greeting", {
	template: "<p>Good morning!!</p>"
});

app.mount("#app");