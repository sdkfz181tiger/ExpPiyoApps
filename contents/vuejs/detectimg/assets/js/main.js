console.log("main.js!!");

const KEY_STORAGE  = "imgdetector";

const MODE_LOADING = 0;
const MODE_MAIN    = 1;

const myData = {
	mode: MODE_LOADING,
	actives: [false, false, false, false, false],
	myOffcanvas: null,
	modalText: "",
	data: null,
	photos: []
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
		readyBase64(base64){
			console.log("readyBase64");
			// Photo
			const photo = {};
			photo.img = new Image();
			photo.img.src = "data:image/png;base64," + base64;
			photo.img.onload = (e)=>{
				this.startDetection(this.photos[this.photos.length-1]);
			}
			this.photos.push(photo);
		},
		async startDetection(photo){
			// Detector
			const detector = await ml5.objectDetector("yolo", ()=>{
				detector.detect(photo.img, (err, results)=>{
					if(err){
						showToast("Error", "0 min ago.", "Something went wrong...");
						return;
					}
					photo.msgs = [];
					for(let result of results){
						const msg = result.label + ":" + Math.floor(result.confidence * 100);
						photo.msgs.push(msg);
						showToast("Success", "0 min ago.", msg);
					}
				});
			});
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
		loadAxios("./assets/imobile.json", json=>{
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

// Components(filepond)
app.component("filepond", {
	data(){
		return {
			msg: "This is my Component!!"
		}
	},
	mounted(){
		console.log("Component is mounted!!");
		// FilePond
		FilePond.registerPlugin(FilePondPluginImagePreview);
		FilePond.registerPlugin(FilePondPluginFileValidateType);
		FilePond.registerPlugin(FilePondPluginFileEncode);
		const elem = document.getElementById("my-filepond");
		const pond = FilePond.create(elem, {
			allowMultiple: false,
			allowReplace: true,
			acceptedFileTypes: ["image/png", "image/jpeg", "image/webp"]
		});
		pond.on("addfile", (error, file)=>{
			if(error){
				console.log("Error:", error);
				return;
			}
			const name = file.file.name;
			const size = file.file.size;
			const type = file.file.type;
			console.log("Filepond:", name, size, type);
			const base64 = file.getFileEncodeBase64String();
			this.$emit("on-base64", base64);// Emit
		});
	},
	emits: ["on-base64"],// Important
	template: '<input id="my-filepond" type="file"/>'
});

app.mount("#app");