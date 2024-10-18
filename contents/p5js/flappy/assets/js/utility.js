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

	constructor(file, x, y, onPressed=null){
		super(file, x, y);
		this._onPressed = onPressed;
		this._tween     = null;
	}

	press(x, y){
		if(!this.visible) return;
		if(!this.contains(x, y)) return;
		if(this._onPressed) this._onPressed();// Callback
	}

	show(x, y){
		this.x        = x;
		this.y        = y;
		this.scale    = 1.0;
		this.alpha    = 255;
		this.rotation = 0;
		this.visible  = true;// Show
		if(this._tween) this._tween.resetMotions();// Important
		this._tween = p5.tween.manager.addTween(this, "show");
		this._tween.addMotion("y", this.y+5, 1000, "easeOutQuad")
			.addMotion("y", this.y, 1000, "easeOutQuad").startLoop();
	}

	hide(){
		setTimeout(()=>{this.visible=false;}, 200);// Hide
		if(this._tween) this._tween.resetMotions();// Important
		this._tween = p5.tween.manager.addTween(this, "hide");
		this._tween.addMotions([
			{key:"scale", target: 0.8},
			{key:"alpha", target: 0}],
			200, "easeOutQuad").startTween();
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
// Flappy
class MyBird extends Sprite{

	constructor(files, x, y){
		super(files[0], x, y);
		this._frInterMin = 0;
		this._frInterMax = 10;
		this._frIndex    = 0;
		this._frImgs     = [];
		for(let file of files){
			this._frImgs.push(ImgLoader.getImg(file));
		}
		this._jY = BIRD_JUMP_Y;
		this._gY = BIRD_GRV_Y;
	}

	reset(x, y){
		this.x        = x;
		this.y        = y;
		this.scale    = 1.0;
		this.alpha    = 255;
		this.rotation = 0;
		this.vFlg     = false;
		this.vX       = 0;
		this.vY       = 0;
	}

	jump(){
		this.vFlg = true;
		this.vY   = this._jY;
	}

	update(){
		super.update();
		if(!this.vFlg) return;
		this.vY += this._gY;
	}

	draw(){
		super.draw();
		// Interval
		this._frInterMin++;
		if(this._frInterMin < this._frInterMax) return;
		this._frInterMin = 0;
		// Frames
		this._frIndex++;
		if(this._frImgs.length <= this._frIndex) this._frIndex = 0;
		this.img = this._frImgs[this._frIndex];
	}
}

class MyScroller extends Sprite{

	constructor(file, x, y){
		super(file, x, y);
	}

	update(){
		super.update();
		if(!this.vFlg) return;
		if(this.r < 0) this.x += this.w * 4;
	}
}

class MyTunnel{

	constructor(fileC, fileT, x, y, pY){
		this._coin = new Sprite(fileC, x, y);
		this._tTop = new Sprite(fileT, x, y);
		this._tBtm = new Sprite(fileT, x, y);
		this.setPos(x, y, pY);
	}

	setPos(x, y, pY){
		this._coin.x = x;
		this._coin.y = y;
		this._tTop.x = x;
		this._tTop.y = y - (this._tTop.hh + pY/2);
		this._tBtm.x = x;
		this._tBtm.y = y + (this._tBtm.hh + pY/2);
		this.showCoin();
	}

	startMove(vX, vY){
		this._coin.startMove(vX, vY);
		this._tTop.startMove(vX, vY);
		this._tBtm.startMove(vX, vY);
	}

	stopMove(){
		this._coin.stopMove();
		this._tTop.stopMove();
		this._tBtm.stopMove();
	}

	intersectCoin(spr){
		if(!this._coin.visible) return false;
		return this._coin.intersects(spr);
	}

	intersectTnls(spr){
		if(this._tTop.contains(spr.x, spr.y)) return true;
		if(this._tBtm.contains(spr.x, spr.y)) return true;
		return false;
	}

	showCoin(){
		this._coin.visible = true;
	}

	hideCoin(){
		this._coin.visible = false;
	}

	update(){
		this._coin.update();
		this._tTop.update();
		this._tBtm.update();
		// Offset
		if(0 < this._tTop.r) return;
		const x = TNL_PAD_X * 3;
		const y = height/2 + random(-80, 80);
		const pY = floor(random(TNL_PAD_Y*0.25, TNL_PAD_Y*0.50));
		this._coin.x += x;
		this._tTop.x += x;
		this._tBtm.x += x;
		this._coin.y = y;
		this._tTop.y = y - (this._tTop.hh+pY);
		this._tBtm.y = y + (this._tBtm.hh+pY);
		this.showCoin();
	}

	draw(){
		this._coin.draw();
		this._tTop.draw();
		this._tBtm.draw();
	}
}