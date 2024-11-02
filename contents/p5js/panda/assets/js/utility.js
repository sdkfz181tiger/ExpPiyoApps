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
// Animal
class Animal{

	constructor(fileClose, fileOpen, x, y, size){
		this._pageClose = new Actor(fileClose, x, y, size);
		this._pageOpen = new Actor(fileOpen, x, y, size);
		this._pageCurrent = this._pageClose;
		this._size = size;
		this._byebyeFlg = false;
	}

	get x(){return this._pageCurrent.x;}
	get y(){return this._pageCurrent.y;}

	contains(x, y){return this._pageCurrent.contains(x, y);}

	setPosition(x, y){
		this._pageClose.x = x;
		this._pageClose.y = y;
		this._pageOpen.x = x;
		this._pageOpen.y = y;
	}

	isOpened(){return this._pageCurrent == this._pageOpen;}

	isClosed(){return this._pageCurrent == this._pageClose;}

	isByebye(){return this._byebyeFlg;}

	open(jumpH){
		if(this.isOpened()) return;
		this._pageCurrent = this._pageOpen;
		this._pageCurrent.jump(jumpH, (pos)=>{
			this.setPosition(pos.x, pos.y);
			console.log("opened");
		});
	}

	close(shakeW){
		if(this.isClosed()) return;
		this._pageCurrent = this._pageClose;
		this._pageCurrent.shake(shakeW, (pos)=>{
			this.setPosition(pos.x, pos.y);
			console.log("closed");
		});
	}

	toggle(jumpH, shakeW){
		if(this.isClosed()){
			this.open(jumpH);
			return;
		}
		if(this.isOpened()){
			this.close(shakeW);
			return;
		}
	}

	moveTo(x, y, delay, onFinished){
		this._pageCurrent.moveTo(x, y, delay, (pos)=>{
			this.setPosition(pos.x, pos.y);
			onFinished(pos);
		});
	}

	openAndByebye(jumpH, x, y, delay, onFinished=null){
		if(this.isOpened()) return;
		this._pageCurrent = this._pageOpen;
		this._pageCurrent.jumpAndMoveTo(jumpH, x, y, delay, (pos)=>{
			this.setPosition(pos.x, pos.y);
			this._byebyeFlg = true;// Byebye
			if(onFinished) onFinished(pos);
		});
	}

	drawMsg(msg, size){
		fill("#ffffff");
		textSize(this._size / 4); 
		textAlign(CENTER, CENTER);
		const x = this._pageCurrent.x;
		const y = this._pageCurrent.y - this._pageCurrent.h/2;
		text(msg, x, y);
	}

	update(){
		this._pageCurrent.update();
		if(this.isOpened()) this.drawMsg("Thanks!");
	}
}

// Actor
class Actor extends Sprite{

	constructor(file, x, y, size, alpha=255, rotation=0){
		super(file, x, y, size, alpha, rotation);
		this._movingFlg = false;
	}

	isMoving(){return this._movingFlg;}

	jump(jumpH, onFinished=null){
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
				if(onFinished) onFinished(this._pos);// Callback
			});
		tween1.chain(tween2);// Chain
		tween1.start();
	}

	shake(shakeW, onFinished=null){
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
				if(onFinished) onFinished(this._pos);// Callback
			});
		tween1.chain(tween2);// Chain
		tween2.chain(tween3);
		tween3.chain(tween4);
		tween1.start();
	}

	moveTo(x, y, delay, onFinished){
		if(this._movingFlg) return;
		this._movingFlg = true;
		// Move
		const defX   = this._pos.x;
		const defY   = this._pos.y;
		const tween = new TWEEN.Tween(this._pos)
			.to({x: x, y: y}, delay)
			.easing(TWEEN.Easing.Quadratic.Out)
			.onComplete(()=>{
				this._movingFlg = false;
				if(onFinished) onFinished(this._pos);// Callback
			});
		tween.start();
	}

	jumpAndMoveTo(jumpH, x, y, delay, onFinished=null){
		if(this._movingFlg) return;
		this._movingFlg = true;
		// Tween
		const jumpY  = this._pos.y - jumpH;
		const defX   = this._pos.x;
		const defY   = this._pos.y;
		const tween1 = new TWEEN.Tween(this._pos)
			.to({x: defX, y: jumpY}, delay)
			.easing(TWEEN.Easing.Quadratic.In);
		const tween2 = new TWEEN.Tween(this._pos)
			.to({x: defX, y: defY}, delay)
			.easing(TWEEN.Easing.Quadratic.Out);
		const tween3 = new TWEEN.Tween(this._pos)
			.delay(delay*2.2)
			.to({x: x, y: y}, delay)
			.easing(TWEEN.Easing.Quadratic.Out)
			.onComplete(()=>{
				this._movingFlg = false;
				console.log(onFinished);
				if(onFinished) onFinished(this._pos);// Callback
			});
		tween1.chain(tween2);// Chain
		tween2.chain(tween3);
		tween1.start();
	}
}