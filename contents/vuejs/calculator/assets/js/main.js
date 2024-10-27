console.log("main.js!!");

const KEY_STORAGE  = "textcounter";

const MODE_LOADING = 0;
const MODE_MAIN    = 1;

const myData = {
	mode: MODE_LOADING,
	actives: [false, false, false, false, false],
	myOffcanvas: null,
	modalText: "",
	cMng: null,
	disp: "***"
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
		setTimeout(()=>{
			this.changeMode(MODE_MAIN);
			// CalcManager
			this.cMng = new CalcManager();
			this.disp = this.cMng.put("C");// Clear
		}, 200);
	},
	methods:{
		changeMode(mode){
			if(this.mode == mode) return;
			this.mode = mode;
			for(let i=0; i<this.actives.length; i++){
				this.actives[i] = this.mode == i;
			}
		},
		clickBtn(value){
			console.log("clickBtn:", value);
			this.disp = this.cMng.put(value);// CalcManager
		},
		showModal(){
			console.log("showModal");
			const elem = document.getElementById("myModal");
			if(elem.classList.contains("show")) return;
			elem.querySelector("#modalLabel").innerText = "Modal";
			bootstrap.Modal.getInstance(elem).show();
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
	}
});

// Components(imobile)
app.component("imobile", {
	props: ["ad", "id"],
	created(){
		console.log("created");
	},
	mounted(){
		// Axios
		loadAxios("../../assets/imobile.json", json=>{
			const type = (this.isMobile())?"sp":"pc";
			const params = json[this.ad][type];
			this.loadBanner(params["pid"], params["mid"], params["asid"]);
		}, (err)=>{
			showToast("Error", "0 min ago", "通信エラーです");
		});
	},
	methods:{
		isMobile(){
			return navigator.userAgent.match(/iPhone|Android.+Mobile/);
		},
		loadBanner(pid, mid, asid){
			if(pid == "" || mid == "" || asid == "") return;
			console.log("loadBanner:", pid, mid, asid, this.id);
			// Banner
			(window.adsbyimobile=window.adsbyimobile||[]).push({
				pid: pid, mid: mid, asid: asid, 
				type: "banner", display: "inline", elementid: this.id});
			const elem = document.getElementById(this.id);
			const imobile = document.createElement("script");
			imobile.src = "//imp-adedge.i-mobile.co.jp/script/v1/spot.js?20220104";
			imobile.setAttribute("async", "true");
			elem.after(imobile);
		}
	},
	template: '<div class="overflow-hidden" v-bind:id="id"></div>'
});

app.mount("#app");