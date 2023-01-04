console.log("main.js!!");

const VERSION      = "v1.0.0";
const KEY_STORAGE  = "apps";

const MODE_LOADING = 0;
const MODE_TITLE   = 1;

const myData = {
	version: VERSION,
	mode: MODE_LOADING,
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