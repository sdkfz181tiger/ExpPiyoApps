console.log("main.js!!");

const KEY_STORAGE  = "camdetector";

const MODE_LOADING = 0;
const MODE_MAIN    = 1;

const myData = {
	mode: MODE_LOADING,
	actives: [false, false, false, false, false],
	myOffcanvas: null,
	modalText: "",
	data: null
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
		onDetected(base64){
			console.log("onDetected:", base64);
		},
		showModal(title, body){
			console.log("showModal");
			const elem = document.getElementById("myModal");
			elem.querySelector("#modalTitle").innerText = title;
			elem.querySelector("#modalBody").innerText = body;
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

// Components(webcam)
app.component("webcam", {
	data(){
		return {
			msg: "This is my Component!!",
			videoWidth: 480,
			videoHeight: 320,
			video: null,
			overlay: null
		}
	},
	mounted(){
		console.log("Component is mounted!!");
		this.init();// init
	},
	emits: ["on-detected"],// Important
	methods:{
		async init(){
			console.log("init");
			// Mobile
			const isMobile = (navigator.userAgent.match(/iPhone|Android.+Mobile/)) ? true:false;
			const optionPC = {video: {width: this.videoWidth, height: this.videoHeight}};
			const optionMobile = {video: {facingMode: {exact: "environment"}}};
			const option = (isMobile) ? optionMobile:optionPC;
			// WebCam
			this.video = document.getElementsByTagName("video")[0];
			const capture = await navigator.mediaDevices.getUserMedia(option);
			this.video.srcObject = capture;
			this.video.addEventListener("canplay", (e)=>{
				// Overlay
				this.overlay = document.createElement("canvas");
				this.overlay.width = this.video.clientWidth;
				this.overlay.height = this.video.clientHeight;
				this.video.after(this.overlay);
				this.drawGrid();
				setTimeout(()=>{this.startDetection();}, 2000);
			});
			this.video.play();
		},
		startDetection(){
			console.log("startDetection");
			const width = this.video.clientWidth;
			const height = this.video.clientHeight;
			const gNum = 9;
			const gSize = ((width<height)?width:height) / gNum;
			const sX = Math.floor(width / 2 - gSize*gNum / 2);
			const sY = Math.floor(height / 2 - gSize*gNum / 2);
			const capture = document.getElementById("myCapture");
			capture.width = gSize * gNum;
			capture.height = gSize * gNum;
			capture.getContext("2d").drawImage(this.video, -sX, -sY, width, height);
			// OCRAD
			OCRAD(capture, {verbose: true, numeric: true}, (e)=>{
				scanImg(capture, e.letters);
			});
			const base64 = "This is base64!!";
			this.$emit("on-detected", base64);// Emit
			setTimeout(()=>{this.startDetection();}, 5000);
		},
		drawGrid(){
			const width = this.video.clientWidth;
			const height = this.video.clientHeight;
			const rate = width / this.video.videoWidth;
			const ctx = this.overlay.getContext("2d");
			ctx.strokeStyle = "lime";
			ctx.lineWidth = 2;
			ctx.clearRect(0, 0, width, height);
			//ctx.strokeRect(0, 0, width, height);

			const gNum = 9;
			const gSize = ((width<height)?width:height) / gNum;
			const sX = Math.floor(width / 2 - gSize*gNum / 2);
			const sY = Math.floor(height / 2 - gSize*gNum / 2);
			for(let r=0; r<=gNum; r++){
				const y = sY + gSize * r;
				ctx.lineWidth = (r%3==0) ? 1:0.5;
				ctx.beginPath();
				ctx.moveTo(sX, y);
				ctx.lineTo(sX+gSize*gNum, y);
				ctx.stroke();
			}
			for(let c=0; c<=gNum; c++){
				const x = sX + gSize * c;
				ctx.lineWidth = (c%3==0) ? 1:0.5;
				ctx.beginPath();
				ctx.moveTo(x, sY);
				ctx.lineTo(x, sY+gSize*gNum);
				ctx.stroke();
			}
		}
	},
	template: '<video></video>'
});

app.mount("#app");