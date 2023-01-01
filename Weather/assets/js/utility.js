console.log("utility.js!!");

//==========
// ServiceWorker
navigator.serviceWorker.register("./pwa_sw.js");

//==========
// Toast
function showToast(title, sub, msg, autohide=true, delay=400){
	// Object
	if(typeof(msg) == "object"){
		const props = Object.getOwnPropertyNames(msg);
		for(let prop of props){
			setTimeout(()=>popToast(title, sub, msg[prop], autohide), delay);
			delay += delay;
		}
		return;
	}
	setTimeout(()=>popToast(title, sub, msg, autohide), delay);
}

function popToast(title, sub, msg, autohide=true){
	if(typeof(msg) == "object") return;
	if(100 < msg.length) return;
	// Clone
	const base = document.querySelector(".toast");
	const clone = base.cloneNode(true);
	clone.querySelector("strong").innerText = title;
	clone.querySelector("small").innerText = sub;
	clone.querySelector(".toast-body").innerText = msg;
	// Event
	clone.addEventListener("shown.bs.toast", ()=>{
		//console.log("shown");
	});
	clone.addEventListener("hidden.bs.toast", ()=>{
		//console.log("hidden");
		clone.remove();// Remove
	});
	clone.classList.remove("d-none");
	// Append
	const container = document.querySelector(".toast-container");
	container.appendChild(clone);
	// Toast
	const toast = new bootstrap.Toast(clone, {autohide: autohide});
	toast.show();
}

//==========
// GeoLocation, Weather
const API_REV     = "https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress";
const API_AREA    = "https://www.jma.go.jp/bosai/common/const/area.json";
const API_WEATHER = "https://www.jma.go.jp/bosai/forecast/data/forecast/";
const API_ICON    = "https://www.jma.go.jp/bosai/forecast/img/";

function loadGeo(){
	//console.log("loadGeo!!");
	return new Promise((resolve, reject)=>{
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
}

function loadRev(res){
	console.log("loadRev:", res.coords.latitude, res.coords.longitude);
	const coords = res.coords;
	const lat = coords.latitude;
	const lon = coords.longitude;
	// const lat = "43.768034980021596";// Hokkaido
	// const lon = "142.39049553222543";
	// const lat = 26.594319927628522;// Okinawa
	// const lon = 127.98102920031258;
	// const lat = 35.367450839400526;// Ogaki
	// const lon = 136.63153313528196;
	// const lat = 37.33989970140487;// Koyocho
	// const lon = 140.34377371293675
	const url = API_REV + "?lat=" + lat + "&lon=" + lon;
	const option = {responseType: "blob"};
	return axios.get(url, option);
}

function loadArea(){
	console.log("loadArea");
	const url = API_AREA;
	const option = {responseType: "blob"};
	return axios.get(url, option);
}

function loadForecast(file){
	console.log("loadForecast:", file);
	const url = API_WEATHER + file;
	const option = {responseType: "blob"};
	return axios.get(url, option);
}

function convertText(res){
	//console.log("convertText");
	return res.data.text();
}

//==========
// JSON

function getDailyData(data, kanjis, icons){
	// Daily
	const areas = {};// Areas
	for(let i=0; i<2; i++){
		const timeSeries = data.timeSeries[i];
		for(let a=0; a<timeSeries.areas.length; a++){
			const area = timeSeries.areas[a];
			const name = area.area.name;
			if(areas[name] == undefined) areas[name] = {};
			areas[name].name = name;
			// Month, Date, Day
			const date = new Date(data.reportDatetime);// Today
			areas[name].months = [];
			areas[name].dates = [];
			areas[name].days = [];
			for(let d=0; d<3; d++){
				areas[name].months.push(date.getMonth() + 1);
				areas[name].dates.push(date.getDate());
				areas[name].days.push(kanjis[(date.getDay())%7]);
				date.setDate(date.getDate() + 1);// Tomorrow
			}
			// WeatherCodes
			if(area.weatherCodes){
				areas[name].weatherCodes = area.weatherCodes;
				areas[name].srcs = [];
				for(let code of area.weatherCodes){
					const src = API_ICON + icons[code][0];// Icon
					areas[name].srcs.push(src);
				}
			}
			// Weathers
			if(area.weathers){
				areas[name].weathers = area.weathers;
			}
			// Pops
			if(area.pops){
				areas[name].pops = area.pops;
			}
		}
	}
	return areas;
}

function getWeeklyData(data, kanjis, icons){
	// Weekly
	const areas = {};// Areas
	for(let i=0; i<1; i++){
		const timeSeries = data.timeSeries[i];
		for(let a=0; a<timeSeries.areas.length; a++){
			const area = timeSeries.areas[a];
			const name = area.area.name;
			if(areas[name] == undefined) areas[name] = {};
			areas[name].name = name;
			// Month, Date, Day
			const date = new Date(data.reportDatetime);// Today
			areas[name].months = [];
			areas[name].dates = [];
			areas[name].days = [];
			for(let d=0; d<7; d++){
				areas[name].months.push(date.getMonth() + 1);
				areas[name].dates.push(date.getDate());
				areas[name].days.push(kanjis[(date.getDay()+1)%7]);
				date.setDate(date.getDate() + 1);// Tomorrow
			}
			// WeatherCodes
			if(area.weatherCodes){
				area.weatherCodes = area.weatherCodes.splice(2);// Splice
				areas[name].weatherCodes = area.weatherCodes;
				areas[name].srcs = [];
				for(let code of area.weatherCodes){
					const src = API_ICON + icons[code][0];// Icon
					areas[name].srcs.push(src);
				}
			}
			// Pops
			if(area.pops){
				areas[name].pops = area.pops;
			}
		}
	}
	return areas;
}