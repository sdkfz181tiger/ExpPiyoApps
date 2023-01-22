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

// Components
app.component("imobile", {
	props: ["pid", "mid", "asid", "id"],
	created(){
		// Banner
		(window.adsbyimobile=window.adsbyimobile||[]).push({
			pid: this.pid, mid: this.mid, asid: this.asid, 
			type: "banner", display: "inline", elementid: this.id});
	},
	template: '<div class="overflow-hidden" v-bind:id="id"></div>'
});

app.component("webcam", {
	data(){
		return {
			msg: "This is my Component!!"
		}
	},
	mounted(){
		console.log("Component is mounted!!");
		// Video
		this.readyWebcam();
	},
	methods:{
		async readyWebcam(){
			console.log("readyWebcam");
			// Mobile
			const isMobile = navigator.userAgentData.mobile;
			const option = (isMobile) ? {video: {facingMode: {exact: "environment"}}}:{video: true};
			// WebCam
			const video = document.getElementById("myVideo");
			const capture = await navigator.mediaDevices.getUserMedia(option);
			video.srcObject = capture;
			video.play();
			// Detector
			const detector = await ml5.objectDetector("yoro", ()=>{
				this.startDetection(video, detector);
			});
		},
		startDetection(video, detector){
			//console.log("startDetection");
			detector.detect(video, (err, results)=>{
				if(err){
					console.log(err);
					showToast("Error", "0 min ago.", err);
					return;
				}
				results.map(result=>{
					result.persent = Math.floor(result.confidence*100) + "%";
					result.x = Math.floor(result.x);
					result.y = Math.floor(result.y);
					result.w = Math.floor(result.width);
					result.h = Math.floor(result.height);
				});
				setTimeout(()=>{
					this.startDetection(video, detector);
					this.$emit("on-detected", results);// Emit
				}, 1000);
			});
		}
	},
	template: '<video id="myVideo"></video>'
});

app.mount("#app");