console.log("main.js!!");

const KEY_STORAGE  = "textcounter";

const MODE_LOADING = 0;
const MODE_MAIN    = 1;

const myData = {
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
		setTimeout(()=>{
			this.changeMode(MODE_MAIN);
		}, 200);
	},
	methods:{
		changeMode(mode){
			if(this.mode == mode) return;
			this.mode = mode;
			for(let i=0; i<this.actives.length; i++){
				this.actives[i] = this.mode == i;
			}
		},
		clickBtn(){
			this.$refs.child.drawOmikuji();
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

// Compoonents(Omikuji)
app.component("omikuji", {
	data(){
		return {
			msg: "This is my Component!!",
			infos: []
		}
	},
	mounted(){
		console.log("Component is mounted!!");
		// QR
		this.init();
	},
	methods:{
		async init(){
			console.log("init");
			// Params
			const params = new URLSearchParams(window.location.search);
			const tokurei = params.get("tokurei");
			const q = params.get("q");
			if(tokurei==null || q==null){
				this.drawOmikuji();// Omikuji
				return;
			}
			this.drawUrakuji(tokurei.replace("/", ""), q.replace("/", ""));// Urakuji
		},
		drawOmikuji(){
			console.log("drawOmikuji!!");
			this.infos.push("おみくじを引きます.");
		},
		drawUrakuji(tokurei, q){
			console.log("drawUrakuji:", tokurei, q);
			this.infos.push("うらくじを引きます.");
			// URL
			const url = "https://ozateck.sakura.ne.jp/nichibi/tokurei/data.php";
			// Axios
			const option = {responseType: "blob"};
			axios.get(url, option).then(res=>{
				// CSV
				res.data.text().then(str=>{
					// Data
					const arr = this.csv2Arr(str);
					console.log(arr);
					this.infos.push(arr.length + "件のデータを取得しました.");
					this.infos.push("データを検索しています.");
					// Search
					const result = this.searchArr(arr, tokurei, q);
					if(result == null){
						this.infos.push("データが見つかりませんでした...");
						return;
					}
					this.infos.push("データが見つかりました.");

				});
			}).catch(err=>{
				console.log(err);
			});
		},
		csv2Arr(csv){
			const arr = [];
			const rows = csv.split("\n");
			for(const row of rows) arr.push(row.split(","));
			return arr;
		},
		searchArr(arr, tokurei, q){
			for(const row of arr){
				if(row[0] != tokurei) continue;
				if(row[1] != q) continue;
				return row;
			}
			return null;
		}
	},
	template: '<div><ul v-for="info in infos"><li>{{ info }}</li></ul></div>'
});

app.mount("#app");