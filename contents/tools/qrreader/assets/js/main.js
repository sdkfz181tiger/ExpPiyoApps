console.log("main.js!!");

const KEY_STORAGE  = "textcounter";

const MODE_LOADING = 0;
const MODE_MAIN    = 1;

const myData = {
	mode: MODE_LOADING,
	actives: [false, false, false, false, false],
	myOffcanvas: null,
	modalText: "",
	str: "***"
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
		onQRDetected(str){
			this.str = str;
		},
		onQRLosted(str){
			this.str = str;
		},
		isValidURL(){
			const regex = new RegExp('^(https?:\\/\\/)?'+
				'(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}'+
				'(\\/[-a-z\\d%_.~+]*)*', 'i');
			return regex.test(this.str);
		},
		clickBtn(value){
			console.log("clickBtn:", value);
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
			canvas: null,
			ctx: null
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
			this.video = document.createElement("video");
			this.video.srcObject = capture;
			this.video.addEventListener("play", (e)=>{
				// Overlay
				this.canvas = document.getElementsByTagName("canvas")[0];
				this.ctx = this.canvas.getContext("2d");
				this.startTick();// Start
			});
			this.video.play();
		},
		startTick(){
			if(this.video.readyState === this.video.HAVE_ENOUGH_DATA){
				// Aspect
				this.canvas.style.aspectRatio = this.video.videoWidth / this.video.videoHeight;
				// Draw
				this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
				const img = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
				const code = jsQR(img.data, img.width, img.height, {inversionAttempts: "dontInvert"});
				if(code){
					this.drawRect(code.location);// Draw
					this.$emit("on-qr-detected", code.data);// Emit
				}else{
					this.$emit("on-qr-losted", "Losted...");// Emit
				}
			}
			setTimeout(this.startTick, 120);
		},
		drawRect(location){
			this.drawLine(location.topLeftCorner,     location.topRightCorner);
			this.drawLine(location.topRightCorner,    location.bottomRightCorner);
			this.drawLine(location.bottomRightCorner, location.bottomLeftCorner);
			this.drawLine(location.bottomLeftCorner,  location.topLeftCorner);
		},
		drawLine(begin, end){
			this.ctx.lineWidth = 2;
			this.ctx.strokeStyle = "#FF3B58";
			this.ctx.beginPath();
			this.ctx.moveTo(begin.x, begin.y);
			this.ctx.lineTo(end.x, end.y);
			this.ctx.stroke();
		}
	},
	template: '<div><canvas></canvas></div>'
});

app.mount("#app");