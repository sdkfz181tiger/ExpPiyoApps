console.log("main.js!!");

const VERSION      = "v0.0.1";
const KEY_STORAGE  = "timer";

const MODE_LOADING = 0;
const MODE_MAIN    = 1;

const myHowl       = new MyHowler();

const myData = {
	version: VERSION,
	mode: MODE_LOADING,
	actives: [false, false, false, false, false],
	myOffcanvas: null,
	modalText: "",
	data: null,
	timerMillis: 0,
	numHours: 0,
	numMinutes: 0,
	numSeconds: 0
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
		const elemModal = document.getElementById("myModal");
		const modal = new bootstrap.Modal(elemModal);
		// Sound
		const elemSound = document.getElementById("switchSound");
		if(myHowl.isActive()){
			console.log("Active!!");
			elemSound.setAttribute("checked", "checked");
		}
		// Axios
		loadAxios("./assets/js/data.json", json=>{
			this.data = json.data;
			setTimeout(()=>{
				this.changeMode(MODE_MAIN);
			}, 200);
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
		clickHours(n){
			console.log("clickHours");
			this.numHours += n;
			if(this.numHours < 0) this.numHours = 0;
		},
		clickMinutes(n){
			console.log("clickMinutes");
			this.numMinutes += n;
			if(this.numMinutes < 0) this.numMinutes = 0;
		},
		clickSeconds(n){
			console.log("clickSeconds");
			this.numSeconds += n;
			if(this.numSeconds < 0) this.numSeconds = 0;
		},
		showModal(){
			console.log("showModal");
			const elem = document.getElementById("myModal");
			elem.querySelector("#modalLabel").innerText = "Modal";
			bootstrap.Modal.getInstance(elem).show();
		},
		switchSound(){
			console.log("switchSound");
			if(myHowl) myHowl.toggleActive();
		},
		doAnimate(id, anim){
			console.log("doAnimate:", id, anim);
			const elem = document.getElementById(id);
			elem.setAttribute("class", "animate__animated " + anim);
			elem.addEventListener("animationend", ()=>{
				elem.removeEventListener("animationend", this);
				elem.removeAttribute("class");
			});
		}
	},
	computed:{
		getDisplay(){
			const h = (this.numHours < 10)?  "0"+this.numHours:this.numHours;
			const m = (this.numMinutes < 10)?"0"+this.numMinutes:this.numMinutes;
			const s = (this.numSeconds < 10)?"0"+this.numSeconds:this.numSeconds;
			return h + ":" + m + ":" + s;
		}
	}
});

// Components
app.component("greeting", {
	template: "<p>Good morning!!</p>"
});

app.mount("#app");