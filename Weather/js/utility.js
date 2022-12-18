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
		console.log(props);
		for(let prop of props){
			setTimeout(()=>{
				popToast(title, sub, msg[prop], autohide);
			}, delay);
			delay *= 2;
		}
		return;
	}
	setTimeout(()=>{
		popToast(title, sub, msg, autohide);
	}, delay);
}

function popToast(title, sub, msg, autohide=true){
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
const API_GEOREV  = "https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress";
const API_WEATHER = "https://www.jma.go.jp/bosai/forecast/data/forecast/";
const API_ICON    = "https://www.jma.go.jp/bosai/forecast/img/";

function loadGeoLoc(){
	//console.log("loadGeoLoc!!");
	return new Promise((resolve, reject)=>{
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
}

function loadGeoRev(coords){
	//console.log("loadGeoRev:", coords.latitude, coords.longitude);
	const lat = coords.latitude;
	const lon = coords.longitude;
	// const lat = 26.594319927628522;// Test: Okinawa
	// const lon = 127.98102920031258;
	const url = API_GEOREV + "?lat=" + lat + "&lon=" + lon;
	const option = {responseType: "blob"};
	return axios.get(url, option);
}

function loadForecast(file){
	//console.log("loadForecast:", file);
	const url = API_WEATHER + file;
	const option = {responseType: "blob"};
	return axios.get(url, option);
}

function convertText(res){
	//console.log("convertText");
	return res.data.text();
}