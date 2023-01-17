console.log("main.js!!");

const KEY_STORAGE  = "apps";

const MODE_LOADING = 0;
const MODE_TITLE   = 1;

const myData = {
	devicePlatforms: devicePlatforms,
	deviceInstalled: deviceInstalled,
	mode: MODE_LOADING,
}

// Vue.js
const app = Vue.createApp({
	data(){
		return myData;
	},
	created(){
		console.log("created!!");

		setTimeout(()=>{
			// Installed or not
			const msg = (this.deviceInstalled) ? "Already":"Before";
			showToast("Hello", "0 min ago.", msg + " installed.");

			console.log(devicePlatforms, deviceInstalled);
		}, 3000);
	},
	mounted(){
		console.log("mounted!!");
		this.changeMode(MODE_TITLE);
	},
	methods:{
		changeMode(mode){
			if(this.mode == mode) return;
			this.mode = mode;
		}
	}
});

// Components
app.component("greeting", {
	template: "<p>Good morning!!</p>"
});

app.mount("#app");