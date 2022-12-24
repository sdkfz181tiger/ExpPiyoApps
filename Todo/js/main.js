console.log("main.js!!");

// Record
class Record{
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
	selectedTag: null,
	tags: [],
	records: [],
	todos: [],
	todoId: null,
	todoMsg: null,
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
			// Data
			const data = json.data;
			// Tags
			for(let tag of data.tags) this.tags.push(tag);
			// Records
			for(let record of data.records) this.records.push(new Record(record));
			// Todos
			this.selectedTag = this.tags[0];// Selected
			this.todos = this.records.filter(record=>record.tag==this.selectedTag);
			setTimeout(()=>{this.changeMode(MODE_HOME);}, 200);
		}, (err)=>{
			showToast("Error", "0 min ago", "通信エラーです");
		});

		// Offcanvas
		const elemOff = document.getElementById("myOffcanvas");// Offcanvas
		this.myOffcanvas = new bootstrap.Offcanvas(elemOff);
		// Modal
		const elem = document.getElementById("myModal");
		const modal = new bootstrap.Modal(elem);
	},
	methods:{
		changeMode(mode){
			if(this.mode == mode) return;
			this.mode = mode;
			for(let i=0; i<this.actives.length; i++){
				this.actives[i] = this.mode == i;
			}
		},
		changeTag(tag){
			console.log("changeTag:", tag);
			this.selectedTag = tag;// Selected
			this.todos = this.records.filter(record=>record.tag==this.selectedTag);
		},
		createTodo(){
			console.log("createTodo");
			// Error
			if(this.todoMsg == null || this.todoMsg.length <= 0){
				showToast("Error", "1 min ago", "テキストを入力してください");
				return;
			}
			// Record
			const record = new Record({
				id: Date.now(),
				tag: this.selectedTag,
				msg: this.todoMsg,
				checked: false
			});
			this.records.push(record);// Create
			this.changeTag(this.selectedTag);// Reflesh
		},
		toggleTodo(id){
			console.log("toggleTodo:", id);
			for(let i=this.records.length-1; 0<=i; i--){
				const record = this.records[i];
				if(record.id != id) continue;
				record.checked = !record.checked;// Toggle
			}
			this.changeTag(this.selectedTag);// Reflesh
		},
		updateTodo(id){
			console.log("updateTodo:", id);
			for(let i=this.records.length-1; 0<=i; i--){
				const record = this.records[i];
				if(record.id != id) continue;
				record.msg = this.todoMsg;// Update
			}
			this.changeTag(this.selectedTag);// Reflesh
		},
		deleteTodo(id){
			console.log("deleteTodo:", id);
			for(let i=this.records.length-1; 0<=i; i--){
				const record = this.records[i];
				if(record.id != id) continue;
				this.records.splice(i, 1);// Delete
			}
			this.changeTag(this.selectedTag);// Reflesh
		},
		showCreateModal(){
			console.log("showCreateModal");
			this.todoId = null;
			this.todoMsg = null;
			const elem = document.getElementById("myModal");
			elem.querySelector("#modalLabel").innerText = "Create";
			bootstrap.Modal.getInstance(elem).show();
		},
		showEditModal(todo){
			console.log("showEditModal:", todo.id);
			this.todoId = todo.id;
			this.todoMsg = todo.msg;
			const elem = document.getElementById("myModal");
			elem.querySelector("#modalLabel").innerText = "Edit";
			bootstrap.Modal.getInstance(elem).show();
		}
	}
});

// Components
app.component("greeting", {
	template: "<p>Good morning!!</p>"
});

app.mount("#app");