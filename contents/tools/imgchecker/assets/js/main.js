console.log("main.js!!");

const KEY_STORAGE  = "textcounter";

const MODE_LOADING = 0;
const MODE_MAIN    = 1;

const myData = {
	mode: MODE_LOADING,
	actives: [false, false, false, false, false],
	myOffcanvas: null,
	modalText: "",
	data: null,
	srcs: []
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
			this.srcs.push("data:image/png;base64," + base64);
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
app.component("filepond", {
	data(){
		return {
			msg: "This is my Component!!"
		}
	},
	mounted(){
		console.log("Component is mounted!!");
		FilePond.registerPlugin(FilePondPluginImagePreview);
		FilePond.registerPlugin(FilePondPluginFileEncode);
		const elem = document.getElementById("my-filepond");
		const pond = FilePond.create(elem, {
			allowMultiple: false,
			allowReplace: true
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
	template: '<input id="my-filepond" type="file"/>'
});

app.mount("#app");