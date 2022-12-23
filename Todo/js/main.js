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
	set id(id){this._id = id;}
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
	tags: new Set(),
	records: new Array(),
	inputTodo: null
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
			// Records
			for(let obj of json.data){
				this.tags.add(obj.tag);
				this.records.push(new Record(obj));
			}
			setTimeout(()=>{
				this.changeMode(MODE_HOME);
			}, 200);
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
		createTodo(){
			console.log("createTodo");
			console.log("inputTodo:", this.inputTodo);
			// Error
			if(this.inputTodo == null || this.inputTodo.length <= 0){
				showToast("Error", "1 min ago", "テキストを入力してください");
				return;
			}
		},
		deleteTodo(id){
			console.log("deleteTodo:", id);
		},
		showModal(){
			console.log("showModal");
			const elem = document.getElementById("myModal");
			elem.querySelector("#modalLabel").innerText = "TODO";
			bootstrap.Modal.getInstance(elem).show();
		}
	}
});

// Components
app.component("greeting", {
	template: "<p>Good morning!!</p>"
});

app.mount("#app");