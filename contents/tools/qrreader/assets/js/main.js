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

// Components
app.component("imobile", {
	props: ["pid", "mid", "asid", "id"],
	created(){
		// Banner
		(window.adsbyimobile=window.adsbyimobile||[]).push({
			pid: this.pid, mid: this.mid, asid: this.asid, 
			type: "banner", display: "inline", elementid: this.id});
	},
	mounted(){
		console.log("Component is mounted!!");
		const elem = document.getElementById(this.id);
		const imobile = document.createElement("script");
		imobile.src = "//imp-adedge.i-mobile.co.jp/script/v1/spot.js?20220104";
		imobile.setAttribute("async", "true");
		elem.after(imobile);
	},
	template: '<div class="overflow-hidden" v-bind:id="id"></div>'
});

// Compoonents(jsQR)
app.component("webcam", {
	data(){
		return {
			msg: "This is my Component!!",
			videoWidth: 480,
			videoHeight: 320,
			video: null,
			canvas: null
		}
	},
	mounted(){
		console.log("Component is mounted!!");
		// WebCam
		this.readyWebCam();
	},
	methods:{
		async readyWebCam(){
			console.log("readyWebCam");
			// Mobile
			const isMobile = (navigator.userAgent.match(/iPhone|Android.+Mobile/)) ? true:false;
			const optionPC = {video: {width: this.videoWidth, height: this.videoHeight}};
			const optionMobile = {video: {facingMode: {exact: "environment"}}};
			const option = (isMobile) ? optionMobile:optionPC;
			// WebCam
			const capture = await navigator.mediaDevices.getUserMedia(option);
			this.video = document.getElementsByTagName("video")[0];
			this.video.srcObject = capture;
			this.video.addEventListener("play", (e)=>{
				// Overlay
				this.canvas = document.createElement("canvas");
				this.video.after(this.canvas);
				this.startTick();// Start
			});
			this.video.play();

			// jsQR
			//const video  = document.createElement("video");
			//const canvas = document.getElementById("canvas");
			//const ctx    = canvas.getContext("2d");
			//const msg    = document.getElementById("msg");

			// const userMedia = {video: {facingMode: "environment"}};
			// navigator.mediaDevices.getUserMedia(userMedia).then((stream)=>{
			// 	video.srcObject = stream;
			// 	video.setAttribute("playsinline", true);
			// 	video.play();
			// 	startTick();
			// });

			// function startTick(){
			// 	msg.innerText = "Loading video...";
			// 	if(video.readyState === video.HAVE_ENOUGH_DATA){
			// 		canvas.height = video.videoHeight;
			// 		canvas.width = video.videoWidth;
			// 		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			// 		// このタイミングでQRコードを判定します
			// 	}
			// 	setTimeout(startTick, 250);
			// }
		},
		startTick(){
			if(this.video.readyState === this.video.HAVE_ENOUGH_DATA){
				const ctx = this.canvas.getContext("2d");
				const img = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
				const code = jsQR(img.data, img.width, img.height, {inversionAttempts: "dontInvert"});
				if(code){
					console.log("Found:", code.location);
					this.msg = "Found:" + code.location;
				}else{
					console.log("Not found...");
					this.msg = "Not found...";
				}
			}
			setTimeout(this.startTick, 250);
		}
	},
	template: '<div>msg:{{ msg }}</div><hr/><video></video>'
});

app.mount("#app");