console.log("main.js!!");

const VERSION = "v0.0.1";
const MODE_LOADING  = 0;
const MODE_TITLE    = 1;
const MODE_GAME     = 2;
const MODE_RESULT   = 3;
const MODE_SETTINGS = 4;
const KEY_STORAGE   = "quiz";

const LEVEL_EASY    = 1;
const LEVEL_NORMAL  = 2;
const LEVEL_HARD    = 3;

const PATH_FLAGS    = "./assets/images/flags/";

const myData = {
	version: VERSION,
	mode: MODE_LOADING,
	actives: [false, false, false, false, false],
	myOffcanvas: null,
	modalText: "",
	level: LEVEL_EASY,// Default
	index: 0,
	flags: [],
	quizes: [],
	quiz: null
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
		const elem = document.getElementById("myModal");
		const modal = new bootstrap.Modal(elem);

		// Axios
		loadAxios("./assets/js/data.json", json=>{
			this.data = json.data;// Data
			this.flags = this.data.flags;// Flags
			this.flags.map(flg=>{flg.src = PATH_FLAGS + flg.src;});
			setTimeout(()=>{this.changeMode(MODE_TITLE);}, 200);
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
		create(){
			console.log("create");
			// Error
			if(this.modalText == null || this.modalText.length <= 0){
				showToast("Error", "1 min ago", "テキストを入力してください");
				return;
			}
			showToast("Create", "1 min ago", this.modalText);
		},
		showModal(){
			console.log("showModal");
			this.tagId = null;
			this.tagName = null;
			const elem = document.getElementById("myModal");
			elem.querySelector("#modalLabel").innerText = "Modal";
			bootstrap.Modal.getInstance(elem).show();
		},
		shuffleFlags(){
			console.log("shuffleFlags");
			for(let i=this.flags.length-1; 0<i; i--){
				const rdm = Math.floor(Math.random() * i);
				[this.flags[i], this.flags[rdm]] = [this.flags[rdm], this.flags[i]];
			}
		},
		clickGameEasy(){
			console.log("clickGameEasy");
			this.shuffleFlags();// Shuffle
			this.level = LEVEL_EASY;
			this.index = 0;
			this.quizes = this.flags.filter(flag=>flag.level==this.level);
			this.quiz = this.quizes[this.index];
			this.changeMode(MODE_GAME);
		},
		clickGameNormal(){
			console.log("clickGameNormal");
			this.shuffleFlags();// Shuffle
			this.level = LEVEL_NORMAL;
			this.index = 0;
			this.quizes = this.flags.filter(flag=>flag.level==this.level);
			this.quiz = this.quizes[this.index];
			this.changeMode(MODE_GAME);
		},
		clickGameHard(){
			console.log("clickGameHard");
			this.shuffleFlags();// Shuffle
			this.level = LEVEL_HARD;
			this.index = 0;
			this.quizes = this.flags.filter(flag=>flag.level==this.level);
			this.quiz = this.quizes[this.index];
			this.changeMode(MODE_GAME);
		},
		clickNext(){
			console.log("clickNext");
			if(this.quizes.length-1 < ++this.index){
				this.changeMode(MODE_RESULT);
				return;
			}
			this.quiz = this.quizes[this.index];// Next
		},
		clickRetry(){
			console.log("clickRetry");
			this.changeMode(MODE_TITLE);
		}
	}
});

// Components
app.component("greeting", {
	template: "<p>Good morning!!</p>"
});

app.mount("#app");