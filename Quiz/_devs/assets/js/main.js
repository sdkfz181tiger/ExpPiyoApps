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
	choises: [],
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
		shuffleChoises(){
			console.log("shuffleChoises");
			this.choises = this.quizes.filter(flag=>flag.name!=this.quiz.name);
			for(let i=this.choises.length-1; 0<i; i--){
				const rdm = Math.floor(Math.random() * i);
				[this.choises[i], this.choises[rdm]] = [this.choises[rdm], this.choises[i]];
			}
			this.choises.splice(3);
			this.choises.push(this.quiz);
			for(let i=0; i<this.choises.length; i++){
				const rdm = Math.floor(Math.random() * this.choises.length);
				if(rdm == i) continue;
				[this.choises[i], this.choises[rdm]] = [this.choises[rdm], this.choises[i]];
			}
		},
		clickGameLevel(level){
			console.log("clickGameLevel:", level);
			this.shuffleFlags();// Shuffle
			this.level = level;
			this.index = 0;
			this.quizes = this.flags.filter(flag=>flag.level==this.level);
			this.quiz = this.quizes[this.index];
			this.shuffleChoises();// Choises
			this.changeMode(MODE_GAME);
		},
		clickChoise(){
			console.log("clickChoise");
			if(this.quizes.length-1 < ++this.index){
				this.changeMode(MODE_RESULT);
				return;
			}
			this.quiz = this.quizes[this.index];// Next
			this.shuffleChoises();// Choises
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