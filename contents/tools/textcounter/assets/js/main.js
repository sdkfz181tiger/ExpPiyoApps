console.log("main.js!!");

const KEY_STORAGE  = "timer";

const MODE_LOADING = 0;
const MODE_MAIN    = 1;

const myHowl       = new MyHowler();

const myData = {
	mode: MODE_LOADING,
	actives: [false, false, false, false, false],
	myOffcanvas: null,
	modalText: "",
	data: null,
	timerID: 0,
	numMillis: 0,
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
			if(0 < this.timerID) return;
			this.numHours += n;
			if(this.numHours < 0) this.numHours = 0;
			if(99 < this.numHours) this.numHours = 99;
			this.calcMillis();
		},
		clickMinutes(n){
			console.log("clickMinutes");
			if(0 < this.timerID) return;
			this.numMinutes += n;
			if(this.numMinutes < 0) this.numMinutes = 0;
			if(59 < this.numMinutes) this.numMinutes = 59;
			this.calcMillis();
		},
		clickSeconds(n){
			console.log("clickSeconds");
			if(0 < this.timerID) return;
			this.numSeconds += n;
			if(this.numSeconds < 0) this.numSeconds = 0;
			if(59 < this.numSeconds) this.numSeconds = 59;
			this.calcMillis();
		},
		clickStart(){
			console.log("clickStart:", this.timerID);
			if(0 < this.timerID) return;
			this.timerID = setInterval(this.tickTimer, 31);
			this.calcMillis();
		},
		clickStop(){
			console.log("clickStop:", this.timerID);
			if(0 < this.timerID){
				clearInterval(this.timerID);
				this.timerID = 0;
				this.calcMillis();
				return;
			}
			this.resetMillis();
			this.calcMillis();
		},
		tickTimer(){
			console.log("tickTimer");
			this.numMillis -= 31;
			if(1000 < this.numMillis) return;
			this.resetMillis();
			this.calcMillis();
			this.clickStop();
			showToast("Timer", "0 min ago.", "Hi, it's time!!");
		},
		resetMillis(){
			console.log("resetMillis");
			this.numMillis = 0;// Reset
			this.numHours = 0;
			this.numMinutes = 0;
			this.numSeconds = 0;
		},
		calcMillis(){
			console.log("calcMillis");
			this.numMillis = 0;
			this.numMillis += this.numHours * 60 * 60 * 1000;
			this.numMillis += this.numMinutes * 60 * 1000;
			this.numMillis += this.numSeconds * 1000;
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
		getDisplayHMS(){
			let h = Math.floor(this.numMillis / 1000 / 60 / 60);
			this.numHours = h;
			if(h < 10) h = "0" + h;
			let m = Math.floor(this.numMillis / 1000 / 60) % 60;
			this.numMinutes = m;
			if(m < 10) m = "0" + m;
			let s = Math.floor(this.numMillis / 1000) % 60;
			this.numSeconds = s;
			if(s < 10) s = "0" + s;
			return h + ":" + m + ":" + s;
		},
		getDisplayMillis(){
			let m = this.numMillis % 1000;
			if(m <= 0){
				m = "000";
			}else if(m < 10){
				m = "00" + m;
			}else if(m < 100){
				m = "0" + m;
			}
			return m;
		}
	}
});

// Components
app.component("greeting", {
	template: "<p>Good morning!!</p>"
});

app.mount("#app");