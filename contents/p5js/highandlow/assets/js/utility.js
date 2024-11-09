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
// Card
class Card{

	constructor(fileClose, fileOpen, x, y, size){
		this._pageClose = new OnePage(fileClose, x, y, size);
		this._pageOpen = new OnePage(fileOpen, x, y, size);
		this._pageCurrent = this._pageClose;
		this._num = Number(fileOpen.split("_")[2].split(".")[0]);
	}

	get x(){return this._pageCurrent.x;}
	get y(){return this._pageCurrent.y;}
	get num(){return this._num;}

	contains(x, y){return this._pageCurrent.contains(x, y);}

	setPosition(x, y){
		this._pageClose.x = x;
		this._pageClose.y = y;
		this._pageOpen.x = x;
		this._pageOpen.y = y;
	}

	adaptPosition(){
		this.setPosition(this._pageCurrent.x, this._pageCurrent.y);
	}

	isOpened(){return this._pageCurrent == this._pageOpen;}

	isClosed(){return this._pageCurrent == this._pageClose;}

	open(jumpH){
		if(this.isOpened()) return;
		this._pageCurrent = this._pageOpen;
		this._pageCurrent.jump(jumpH, ()=>{
			this.adaptPosition();// Adapt
			console.log("opened:", this._num);
		});
	}

	close(shakeW){
		if(this.isClosed()) return;
		this._pageCurrent = this._pageClose;
		this._pageCurrent.shake(shakeW, ()=>{
			this.adaptPosition();// Adapt
			console.log("closed:", this._num);
		});
	}

	moveTo(x, y, delay, onFinished=null){
		this._pageCurrent.moveTo(x, y, delay, ()=>{
			this.adaptPosition();// Adapt
			if(onFinished) onFinished();
		});
	}

	update(){
		this._pageCurrent.update();
	}
}

class OnePage extends Sprite{

	constructor(file, x, y, size, alpha=255, rotation=0){
		super(file, x, y, size, alpha, rotation);
		this._movingFlg = false;
	}

	isMoving(){return this._movingFlg;}

	jump(jumpH=0, onFinished=null){
		if(this._movingFlg) return;
		this._movingFlg = true;
		// Tween
		const jumpY  = this._pos.y - jumpH;
		const defX   = this._pos.x;
		const defY   = this._pos.y;
		const delay  = 100;
		const tween1 = new TWEEN.Tween(this._pos)
			.to({x: defX, y: jumpY}, delay)
			.easing(TWEEN.Easing.Quadratic.In);
		const tween2 = new TWEEN.Tween(this._pos)
			.to({x: defX, y: defY}, delay)
			.easing(TWEEN.Easing.Quadratic.Out)
			.onComplete(()=>{
				this._movingFlg = false;
				if(onFinished) onFinished();// Callback
			});
		tween1.chain(tween2);// Chain
		tween1.start();
	}

	shake(shakeW=0, onFinished=null){
		if(this._movingFlg) return;
		this._movingFlg = true;
		// Shake
		const shakeX = (random()<0.5)?shakeW:-shakeW;
		const defX   = this._pos.x;
		const defY   = this._pos.y;
		const delay  = 50;
		const tween1 = new TWEEN.Tween(this._pos)
			.to({x: defX-shakeX, y: defY}, delay)
			.easing(TWEEN.Easing.Quadratic.In);
		const tween2 = new TWEEN.Tween(this._pos)
			.to({x: defX, y: defY}, delay)
			.easing(TWEEN.Easing.Quadratic.Out);
		const tween3 = new TWEEN.Tween(this._pos)
			.to({x: defX+shakeX, y: defY}, delay)
			.easing(TWEEN.Easing.Quadratic.In);
		const tween4 = new TWEEN.Tween(this._pos)
			.to({x: defX, y: defY}, delay)
			.easing(TWEEN.Easing.Quadratic.Out)
			.onComplete(()=>{
				this._movingFlg = false;
				if(onFinished) onFinished();// Callback
			});
		tween1.chain(tween2);// Chain
		tween2.chain(tween3);
		tween3.chain(tween4);
		tween1.start();
	}

	moveTo(x, y, delay, onFinished=null){
		if(this._movingFlg) return;
		this._movingFlg = true;
		// Tween
		const defX  = this._pos.x;
		const defY  = this._pos.y;
		const tween = new TWEEN.Tween(this._pos)
			.to({x: x, y: y}, delay)
			.easing(TWEEN.Easing.Quadratic.Out)
			.onComplete(()=>{
				this._movingFlg = false;
				if(onFinished) onFinished();// Callback
			});
		tween.start();
	}
}