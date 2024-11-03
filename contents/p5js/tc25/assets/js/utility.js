console.log("utility.js!!");

//==========
// ServiceWorker
navigator.serviceWorker.register("./pwa_sw.js");

//==========
// Mobile
const FLG_MOBILE = "ontouchstart" in window || 0<navigator.maxTouchPoints;

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
	showRetryDialog();
});

const btnRetry = document.getElementById("btn_retry");
btnRetry.addEventListener("click", ()=>{
	location.reload();// Reload
});

function showRetryDialog(){
	const elem = document.getElementById("myModal");
	if(elem.classList.contains("show")) return;
	const modal = new bootstrap.Modal(elem);
	bootstrap.Modal.getInstance(elem).show();
}

//==========
// Button
class Button{

	constructor(x, y, w, h, str="HELLO", 
		color="#444444", visible=true, onPressed=null){
		this._pos       = {x: x, y: y};
		this._w         = w;
		this._h         = h;
		this._str       = str;
		this._color     = color;
		this._visible   = visible;
		this._onPressed = onPressed;
	}

	isInside(tX, tY){
		if(tX < this._pos.x-this._w/2) return false;
		if(tY < this._pos.y-this._h/2) return false;
		if(this._pos.x+this._w/2 < tX) return false;
		if(this._pos.y+this._h/2 < tY) return false;
		return true;
	}

	touch(tX, tY){
		if(!this.isInside(tX, tY)) return false;
		if(!this._visible) return false;
		if(this._onPressed) this._onPressed();
		return true;
	}

	show(){
		if(this._visible) return;
		this._visible = true;
	}

	update(){
		if(!this._visible) return false;
		fill(this._color);
		noStroke();
		rectMode(CENTER, CENTER);
		rect(this._pos.x, this._pos.y, this._w, this._h, this._h*0.1);
		fill("white"); noStroke();
		textSize(this._h*0.5); textAlign(CENTER, CENTER);
		text(this._str, this._pos.x, this._pos.y-this._h*0.04);
	}
}

//==========
// ShareWithX
function shareWithX(){
	console.log("shareWithX");
	const api = "https://twitter.com/share";
	const params = {
		"url": "https://sdkfz181tiger.github.io/ExpPiyoApps/contents/p5js/panda/",
		"text": "パンダロンダリングで" + cntScore + "点取りました!!(最高得点は" + cntHigh + "です)",
		"hashtags": ["ahoge", "gamedev", "パンダロンダリング"]
	}
	const query =  new URLSearchParams(params).toString();
	location.href = api + "?" + query;
}