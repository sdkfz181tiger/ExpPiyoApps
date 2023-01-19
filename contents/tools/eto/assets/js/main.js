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
	fullYear: 0,
	tableYearFrom: 0,
	tableYearTo: 0,
	tableData: []
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
			// Create data
			this.fullYear = new Date().getFullYear();
			const warekis = this.data.warekis;
			const etos = this.data.etos;
			let counter = 0;// Counter
			for(let w=0; w<warekis.length; w++){
				this.yearFrom = warekis[w].from;
				this.yearTo = warekis[w].to;
				if(this.fullYear < this.yearTo) this.yearTo = this.fullYear;
				let off = 1;
				for(let y=this.yearFrom; y<=this.yearTo; y++){
					const year = y;
					const wareki = warekis[w];
					const num = (off==1) ? "元":off;
					const age = this.fullYear - y;
					const eto = etos[counter%12];
					console.log(year, wareki.name, num, age, eto.name);
					this.tableData.push({year: y, wareki: wareki, num: num, age: age, eto: eto});
					off++;
					counter++;
				}
			}
			this.tableData = this.tableData.reverse();// Reverse

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
		getTableLeft(){
			return this.getTableData(this.fullYear-30, this.fullYear);
		},
		getTableRight(){
			return this.getTableData(this.fullYear-60, this.fullYear-30);
		},
		getTableData(from, to){
			return this.tableData.filter(obj=> from<=obj.year && obj.year<=to);
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
app.component("greeting", {
	template: "<p>Good morning!!</p>"
});

app.mount("#app");