console.log("main.js!!");

const KEY_STORAGE   = "weather";

const MODE_LOADING  = 0;
const MODE_ERROR    = 1;
const MODE_FORECAST = 2;

const myData = {
	mode: MODE_LOADING,
	actives: [false, false, false, false, false],
	msgErr: "",
	myOffcanvas: null,
	weatherArea: WEATHER_AREA,
	weatherIcon: WEATHER_ICON,
	forecastKanji: ["日", "月", "火", "水", "木", "金", "土"],
	forecastFile: "130000.json",// Default
	forecastOffice: null,
	areasDaily: null,
	areasWeekly: null
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

		// Online
		if(!navigator.onLine){
			this.msgErr = "No internet...";
			this.changeMode(MODE_ERROR);// Error
			showToast("Error", "0 min ago.", "インターネットに接続してください");
			return;
		}

		// Offcanvas
		const elemOff = document.getElementById("myOffcanvas");// Offcanvas
		this.myOffcanvas = new bootstrap.Offcanvas(elemOff);
		// Modal
		const elemModalGPS = document.getElementById("myModalGPS");
		const modalGPS = new bootstrap.Modal(elemModalGPS);
		const elemModalInfo = document.getElementById("myModalInfo");
		const modalInfo = new bootstrap.Modal(elemModalInfo);

		this.loadFile();// Load
		this.startForecast(this.forecastFile);// Forecast
	},
	methods:{
		changeMode(mode){
			if(this.mode == mode) return;
			this.mode = mode;
			for(let i=0; i<this.actives.length; i++){
				this.actives[i] = this.mode == i;
			}
		},
		loadFile(){
			if(!localStorage.getItem(KEY_STORAGE)) return;
			this.forecastFile = localStorage.getItem(KEY_STORAGE);
		},
		saveFile(file){
			this.forecastFile = file;
			localStorage.setItem(KEY_STORAGE, file);
		},
		clearFile(){
			this.forecastFile = null;
			localStorage.removeItem(KEY_STORAGE);
		},
		startGeo(){
			console.log("startGeo");
			// GeoLocation
			loadGeo().then(res=>loadRev(res)).then(res=>convertText(res))
				.then(res=>{
					const results = JSON.parse(res).results;
					this.startArea(results.muniCd, results.lv01Nm);
				}).catch(err=>{
					console.log(err);
					this.clearFile();// Clear
					showToast("Error", "0 min ago.", err);
				});
		},
		startArea(muniCd, lv01Nm){
			console.log("startArea:", muniCd, lv01Nm);
			// Area
			loadArea().then(res=>convertText(res))
				.then(res=>{
					const area = JSON.parse(res);
					const class20s = area.class20s[muniCd + "00"];
					const class15s = area.class15s[class20s.parent];
					const class10s = area.class10s[class15s.parent];
					this.startForecast(class10s.parent + ".json");
				}).catch(err=>{
					console.log(err);
					this.clearFile();// Clear
					showToast("Error", "0 min ago.", err);
				});
		},
		startForecast(file){
			console.log("startForecast:", file);
			this.saveFile(file);// Save
			this.myOffcanvas.hide();// Hide
			// Forecast
			loadForecast(file).then(res=>convertText(res))
				.then(res=>{
					const json = JSON.parse(res);
					this.forecastOffice = json[0].publishingOffice;// Office
					this.areasDaily = getDailyData(json[0], this.forecastKanji, this.weatherIcon);
					this.areasWeekly = getWeeklyData(json[1], this.forecastKanji, this.weatherIcon);
					this.changeMode(MODE_FORECAST);
					showToast("Success", "0 min ago.", this.forecastOffice + "の天気を取得しました");
				}).catch(err=>{
					console.log(err);
					this.clearFile();// Clear
					showToast("Error", "0 min ago.", err);
				});
		},
		showModalGPS(){
			console.log("showModalGPS");
			const elem = document.getElementById("myModalGPS");
			elem.querySelector("#modalLabel").innerText = "GPSを利用します";
			elem.querySelector("#modalBody").innerText = "位置情報から天気予報を取得します";
			bootstrap.Modal.getInstance(elem).show();
		},
		showModalInfo(area, i){
			console.log("showModalInfo");
			const elem = document.getElementById("myModalInfo");
			const label = area.name + "_" + area.months[i] + "月" + area.dates[i] + "日(" + area.days[i] + ")";
			elem.querySelector("#modalLabel").innerText = label;
			elem.querySelector("#modalBody").innerText = area.weathers[i];
			bootstrap.Modal.getInstance(elem).show();
		}
	}
});

// Components
app.component("greeting", {
	template: "<p>Good morning!!</p>"
});

app.mount("#app");