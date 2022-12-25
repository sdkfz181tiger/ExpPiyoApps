console.log("main.js!!");

const MODE_LOADING  = 0;
const MODE_HOME     = 1;
const MODE_GOOGLE   = 2;
const MODE_APPLE    = 3;
const MODE_SETTINGS = 4;

const myData = {
	mode: MODE_LOADING,
	actives: [false, false, false, false, false],
	myOffcanvas: null,
	modalText: ""
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
		const elem = document.getElementById("myModal");
		const modal = new bootstrap.Modal(elem);

		// Axios
		loadAxios("./assets/js/data.json", (json)=>{
			this.data = json.data;// Data
			console.log(this.data);
			setTimeout(()=>{this.changeMode(MODE_HOME);}, 200);
		}, (err)=>{
			showToast("Error", "0 min ago", "通信エラーです");
		});
	},
	methods:{
		changeMode(mode){
			if(this.mode == mode) return;
			this.mode = mode;
			for(let i=0; i<this.actives.length; i++){
				this.actives[i] = this.mode == i;
			}
		},
		create(){
			console.log("create");
			// Error
			if(this.modalText == null || this.modalText.length <= 0){
				showToast("Error", "1 min ago", "テキストを入力してください");
				return;
			}
			showToast("Create", "1 min ago", this.modalText);
		},
		showModal(){
			console.log("showModal");
			this.tagId = null;
			this.tagName = null;
			const elem = document.getElementById("myModal");
			elem.querySelector("#modalLabel").innerText = "Modal";
			bootstrap.Modal.getInstance(elem).show();
		}
	}
});

// Components
app.component("greeting", {
	template: "<p>Good morning!!</p>"
});

app.mount("#app");