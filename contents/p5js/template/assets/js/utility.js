console.log("utility.js!!");

//==========
// ServiceWorker
navigator.serviceWorker.register("./pwa_sw.js");

//==========
// Mobile
const FLG_MOBILE = "ontouchstart" in window || 0<navigator.maxTouchPoints;

//==========
// Button
class Button extends Sprite{

	constructor(file, x, y, s, onPressed=null){
		super(file, x, y, s);
		this._onPressed = onPressed;
		this._tween     = null;
	}

	press(x, y){
		if(!this.visible) return;
		if(!this.contains(x, y)) return;
		if(this._onPressed) this._onPressed();// Callback
	}
}

//==========
// Axios
function loadAxios(url, onSuccess, onError){
	const option = {responseType: "blob"};
	axios.get(url, option).then(res=>{
		res.data.text().then(str=>{
			onSuccess(JSON.parse(str));
		});
	}).catch(err=>{
		onError(err);
	});
}

//==========
// imobile
function loadImobile(path){
	// Axios
	loadAxios(path, json=>{
		const type = (navigator.userAgent.match(/iPhone|Android.+Mobile/))?"sp":"pc";
		const places = [
			{"ad": "banner", "id": "ad_banner"},
			{"ad": "rectangle", "id": "ad_rectangle"}];
		for(place of places){
			const ad = place["ad"];
			const id = place["id"];
			const params = json[ad][type];
			(window.adsbyimobile=window.adsbyimobile||[]).push({
				pid:params["pid"], mid:params["mid"], asid:params["asid"], 
				type:"banner", display:"inline", elementid:id});
		}
		const elem = document.getElementsByTagName("body")[0];
		const imobile = document.createElement("script");
		imobile.src = "//imp-adedge.i-mobile.co.jp/script/v1/spot.js?20220104";
		imobile.setAttribute("async", "true");
		elem.appendChild(imobile);
	}, (err)=>{
		showToast("Error", "0 min ago", "通信エラーです");
	});
}

//==========
// Modal
const btnModal = document.getElementById("btn_modal");
btnModal.addEventListener("click", ()=>{
	const elem = document.getElementById("myModal");
	const modal = new bootstrap.Modal(elem);
	bootstrap.Modal.getInstance(elem).show();
});

const btnRetry = document.getElementById("btn_retry");
btnRetry.addEventListener("click", ()=>{
	location.reload();// Reload
});

//==========
// Countdown
class Countdown{

	constructor(x, y, size=28, onFinished=null){
		this._mil = 10000;
		this._x = x;
		this._y = y;
		this._size = size;
		this._onFinished = onFinished;
		this._timeoutID = 0;
	}

	start(){
		if(this._mil <= 0) return;
		this.tick();
	}

	stop(){
		if(this.timeoutID <= 0) return;
		clearTimeout(this.timeoutID);
		this.timeoutID = 0;
	}

	tick(){
		if(this._mil <= 0) return;
		this._mil -= 10;
		this.timeoutID = setTimeout(()=>{this.tick();}, 8);
	}

	update(){
		fill("white");
		textSize(this._size); 
		textAlign(CENTER, BOTTOM);
		const sec = floor(this._mil/1000);
		const mil = this._mil % 1000;
		text(sec, this._x, this._y);
		textSize(this._size/4);
		textAlign(CENTER, TOP);
		text(mil, this._x, this._y);

	}
}