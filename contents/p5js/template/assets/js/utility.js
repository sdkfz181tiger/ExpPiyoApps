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
		this._max = 4000;
		this._mil = this._max;
		this._x = x;
		this._y = y;
		this._size = size;
		this._onFinished = onFinished;
		this._timeoutID = 0;
	}

	isReady(){
		return this._max == this._mil;
	}

	isCounting(){
		return 0 < this._mil;
	}

	start(){
		if(this._mil <= 0) return;
		this.tick();
	}

	tick(){
		if(this._mil <= 0){
			if(this._onFinished) this._onFinished();
			return;
		}
		this._mil -= 10;
		this.timeoutID = setTimeout(()=>{this.tick();}, 8);
	}

	update(){
		if(this._mil <= 0) return;
		fill("white");
		textSize(this._size*0.4); 
		textAlign(CENTER, BOTTOM);
		if(this._max <= this._mil){
			text("TAP TO START", this._x, this._y);
			return;
		}
		if(this._mil <= 1000){
			text("START", this._x, this._y);
			return;
		}
		const sec = floor(this._mil/1000);
		const mil = this._mil % 1000;
		textSize(this._size*0.6); 
		textAlign(CENTER, BOTTOM);
		text(sec, this._x, this._y);
		textSize(this._size*0.2);
		textAlign(CENTER, TOP);
		text(mil, this._x, this._y);
	}
}

//==========
// Tile
class Tile{

	constructor(x, y, size, num=88, color="gray"){
		this._pos   = {x: x, y: y};
		this._size  = size;
		this._num   = num;
		this._color = color;
		this._movingFlg = false;
	}

	// fall(r, c, x, y, maxR=ROWS-1){
	// 	this._r = r;
	// 	this._c = c;
	// 	this._movingFlg = true;
	// 	const delay = (maxR-this._r)*40 + Math.floor(Math.random()*20);
	// 	this._tween = new TWEEN.Tween(this._pos).to(
	// 		{x: x, y: y}, 200).delay(delay).easing(TWEEN.Easing.Quadratic.In).onComplete(()=>{
	// 			this._movingFlg = false;
	// 		}).start();
	// }

	get x(){return this._pos.x;}
	get y(){return this._pos.y;}
	get size(){return this._size;}
	get num(){return this._num;}

	isInside(tX, tY){
		if(tX < this._pos.x-this._size/2) return false;
		if(tY < this._pos.y-this._size/2) return false;
		if(this._pos.x+this._size/2 < tX) return false;
		if(this._pos.y+this._size/2 < tY) return false;
		return true;
	}

	isMoving(){
		return this._movingFlg;
	}

	update(){
		fill(this._color);
		noStroke();
		rectMode(CENTER, CENTER);
		square(this._pos.x, this._pos.y, this._size, this._size*0.1);

		fill("white"); noStroke();
		textSize(this._size*0.5); textAlign(CENTER, CENTER);
		text(this._num, this._pos.x, this._pos.y-this._size*0.04);
	}
}