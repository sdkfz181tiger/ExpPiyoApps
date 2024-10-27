console.log("main.js!!");

const KEY_STORAGE  = "camdetector";

const MODE_LOADING = 0;
const MODE_MAIN    = 1;

const myData = {
	mode: MODE_LOADING,
	actives: [false, false, false, false, false],
	myOffcanvas: null,
	modalText: "",
	data: null,
	results: []
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
		onDetected(results){
			//console.log("onDetected:", results);
			if(!results || results.length <= 0) return;
			this.results = results;
		},
		showModal(title, body){
			console.log("showModal");
			const elem = document.getElementById("myModal");
			if(elem.classList.contains("show")) return;
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

// Components(WebCam)
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
		this.init();// init
	},
	emits: ["on-detected"],// Important
	methods:{
		async init(){
			console.log("init");

			// WebCam
			navigator.mediaDevices = navigator.mediaDevices || (
				(navigator.mozGetUserMedia || navigator.webkitGetUserMedia)?{
					getUserMedia: function(c){
						return new Promise(function(y, n){
							(navigator.mozGetUserMedia || navigator.webkitGetUserMedia).call(navigator, c, y, n);
						});
					}
				} : null);
			if(!navigator.mediaDevices){
				showToast("エラー", "Error", "Webカメラを取得できません");
				return;
			}

			showToast("Webカメラ", "Yahoo", "Webカメラを取得しました");

			// Mobile or PC
			const isMobile = (navigator.userAgent.match(/iPhone|Android.+Mobile/)) ? true:false;
			const optionMobile = {video: {facingMode: {exact: "environment"}}};
			const optionPC = {video: {width: this.videoWidth, height: this.videoHeight}};
			const option = (isMobile) ? optionMobile:optionPC;
			navigator.mediaDevices.getUserMedia(option).then(stream=>{
				this.video = document.getElementsByTagName("video")[0];
				this.video.srcObject = stream;
				this.video.onloadedmetadata = event=>{
					this.canvas = document.createElement("canvas");
					this.video.after(this.canvas);
					this.video.play();// Play
				};
			}).catch(err=>{
				console.log(err.name + ":" + err.message);
				showToast(err.name, "Error", err.message);
			});

			// Detector
			const detector = await ml5.objectDetector("yoro", ()=>{
				showToast("検知開始", "Yoro", "物体検知を開始します");
				this.startDetection(detector);
			});
		},
		startDetection(detector){
			//console.log("startDetection");
			detector.detect(this.video, (err, results)=>{
				if(err){
					console.log(err);
					showToast("Error", "0 min ago.", err);
					return;
				}
				// Context
				const width = this.video.clientWidth;
				const height = this.video.clientHeight;
				const rate = width / this.video.videoWidth;
				this.canvas.width = width;
				this.canvas.height = height;
				const ctx = this.canvas.getContext("2d");
				ctx.strokeStyle = "lime";
				ctx.lineWidth = 4;
				ctx.clearRect(0, 0, width, height);
				ctx.strokeRect(0, 0, width, height);
				results.map(result=>{
					result.persent = Math.floor(result.confidence*100) + "%";
					result.x = Math.floor(result.x * rate);
					result.y = Math.floor(result.y * rate);
					result.w = Math.floor(result.width * rate);
					result.h = Math.floor(result.height * rate);
					ctx.strokeRect(result.x, result.y, result.w, result.h);
				});
				ctx.fill();
				setTimeout(()=>{
					this.startDetection(detector);
					this.$emit("on-detected", results);// Emit
				}, 1000);
			});
		}
	},
	template: '<video></video>'
});

app.mount("#app");