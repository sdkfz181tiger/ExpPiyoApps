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
				this.startDetection(e.target);
			}
			this.photos.push(photo);
		},
		async startDetection(img){
			// OCRAD
			OCRAD(img, {verbose: true, numeric: true}, (e)=>{
				this.drawSudoku(img, e.letters);
			});
		},
		drawSudoku(img, letters){
			const cvs = document.createElement("canvas");
			cvs.width  = img.width;
			cvs.height = img.height;
			const ctx  = cvs.getContext("2d");
			ctx.drawImage(img, 0, 0, img.width, img.height);
			const elem = document.getElementById("my_target");
			while(elem.firstChild){
				elem.removeChild(elem.firstChild);
			}
			elem.appendChild(cvs);
			scanImg(cvs, img, letters);// Scan
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
			acceptedFileTypes: ["image/png", "image/jpeg", "image/gif"]
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