console.log("main.js!!");

const VERSION       = "v0.0.1";
const KEY_STORAGE   = "timer";

const MODE_LOADING  = 0;
const MODE_MAIN     = 1;

const myHowl        = new MyHowler();

const myData = {
	version: VERSION,
	mode: MODE_LOADING,
	actives: [false, false, false, false, false],
	myOffcanvas: null,
	modalText: ""
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
			this.flags = json.data.filter(flag=>flag.capital!="");// Flags
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
		},
		clickTest(){
			console.log("clickTest");

			// 1. Permissionの確認
			if(!Push.Permission.has()){
				// 2. Permissionのリクエスト
				Push.Permission.request(()=>{
					console.log("onGranted!!");
					const status = Push.Permission.get();// Status
					console.log(status);
				}, ()=>{
					console.log("onDenied!!");
					const status = Push.Permission.get();// Status
					console.log(status);
				});
			}else{
				// 3. Notificationの実行
				Push.create("こんにちは!!", {
					body: "ゆっくり霊夢です!!",
					icon: "./assets/images/logo.png",
					tag: "myTag",
					timeout: 12000,
					vibrate: [100, 100, 100],
					onClick: function(e){
						console.log("onClick", e);
					},
					onShow: function(e){
						console.log("onShow", e);
					},
					onClose: function(e){
						console.log("onClose", e);
					},
					onError: function(e){
						console.log("onError", e);
					}
				});
			}


		}
	},
	computed:{

	}
});

// Components
app.component("greeting", {
	template: "<p>Good morning!!</p>"
});

app.mount("#app");