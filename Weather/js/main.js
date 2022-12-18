console.log("main.js!!");

const MODE_LOADING  = 0;
const MODE_ERROR    = 1;
const MODE_ZONE     = 2;
const MODE_FORECAST = 3;
const MODE_SETTINGS = 4;

const myData = {
	mode: MODE_LOADING,
	actives: [false, false, false, false, false],
	msgErr: "",
	myOffcanvas: null,
	weatherArea: WEATHER_AREA,
	weatherIcon: WEATHER_ICON,
	forecastKanji: ["日", "月", "火", "水", "木", "金", "土"],
	forecastPref: "東京都",// Default
	forecastOffice: null,
	forecastZones: null,
	forecastToday: null,
	forecastWeek: null
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
		}else{
			const elem = document.getElementById("myOffcanvas");// Offcanvas
			this.myOffcanvas = new bootstrap.Offcanvas(elem);
			this.loadPref();// Load
			this.startPref(this.forecastPref);// Pref
		}
	},
	methods:{
		changeMode(mode){
			if(this.mode == mode) return;
			this.mode = mode;
			for(let i=0; i<this.actives.length; i++){
				this.actives[i] = this.mode == i;
			}
		},
		loadPref(){
			if(!localStorage.getItem("pref")) return;
			this.forecastPref = localStorage.getItem("pref");
		},
		savePref(pref){
			this.forecastPref = pref;
			localStorage.setItem("pref", pref);
		},
		clearPref(){
			this.forecastPref = null;
			localStorage.removeItem("pref");
		},
		startPref(pref){
			console.log("startPref:", pref);
			if(pref in this.weatherArea){// Hokkaido, Okinawa
				this.forecastZones = this.weatherArea[pref];// Zones
				this.changeMode(MODE_ZONE);
			}else{// Others...
				for(let key in this.weatherArea){
					if(!(pref in this.weatherArea[key])) continue;
					this.startForecast(pref, this.weatherArea[key][pref]);// Forecast
				}
			}
		},
		startGeoLoc(){
			console.log("startGeoLoc");
			// GeoLocation
			loadGeoLoc()
				.then(res=>loadGeoRev(res.coords))
				.then(res=>convertText(res))
				.then(res=>{
					const muni = JSON.parse(res).results.muniCd;
					const pref = GSI.MUNI_ARRAY[muni].split(",")[1];
					this.forecastPref = pref;// Update
					this.startPref(pref);
				}).catch(err=>{
					console.log(err);
					this.clearPref();// Clear
					showToast("Error", "0 min ago.", err);
					showToast("Error", "0 min ago.", err.code);
					showToast("Error", "0 min ago.", err.message);
				});
		},
		startForecast(pref, file){
			console.log("startForecast:", pref, file);
			this.savePref(pref);// Save
			this.myOffcanvas.hide();// Hide
			// Forecast
			loadForecast(file)
				.then(res=>convertText(res))
				.then(res=>{
					const json = JSON.parse(res);
					for(let data of json){// Icon
						this.forecastOffice = data.publishingOffice;// Office
						for(let area of data.timeSeries[0].areas){
							area.spots = [];// Spot
							const date = new Date(data.reportDatetime);// Date
							for(let i=0; i<area.weatherCodes.length; i++){
								const icon = this.weatherIcon[area.weatherCodes[i]][0];
								const spot = {};
								spot.month = date.getMonth() + 1;
								spot.date = date.getDate();
								spot.day = this.forecastKanji[date.getDay()];
								spot.src = API_ICON + icon;// Icon
								area.spots.push(spot);
								date.setDate(date.getDate() + 1);// Tomorrow
							}
						}
					}
					this.forecastToday = json[0];
					this.forecastWeek = json[1];
					this.changeMode(MODE_FORECAST);
					showToast("Success", "0 min ago.", this.forecastPref + "の天気を取得しました");
				}).catch(err=>{
					console.log(err);
					this.clearPref();// Clear
					showToast("Error", "0 min ago.", err);
				});
		}
	}
});

// Components
app.component("greeting", {
	template: "<p>Good morning!!</p>"
});

app.mount("#app");