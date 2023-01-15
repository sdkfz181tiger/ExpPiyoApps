console.log("utility.js!!");

//==========
// ServiceWorker
navigator.serviceWorker.register("./pwa_sw.js");

//==========
// ImgLoader

class ImgLoader{

	static dir = "./assets/images/";
	static imgs = {};
	
	static loadImg(file){
		this.imgs[file] = loadImage(this.dir + file);
	}

	static getImg(file){
		return this.imgs[file];
	}
}

//==========
// Sprite

class Sprite{

	constructor(file, x, y, s=1.0, a=255){
		this._img     = ImgLoader.getImg(file);
		this._x       = x;
		this._y       = y;
		this._scale   = s;
		this._alpha   = a;
		this._visible = true;
		this._w       = this._img.width * s;
		this._h       = this._img.height * s;
		this._hw      = this._w / 2;
		this._hh      = this._h / 2;
		this._vFlg    = false;
		this._vX      = 0;
		this._vY      = 0;
	}

	get x(){return this._x;}
	set x(n){this._x = n;}
	get y(){return this._y;}
	set y(n){this._y = n;}

	get scale(){return this._scale;}
	set scale(n){
		this._scale = n;
		this.w = this._img.width * n;
		this.h = this._img.height * n;
	}
	get alpha(){return this._alpha;}
	set alpha(n){this._alpha = n;}
	get visible(){return this._visible;}
	set visible(n){this._visible = n;}

	get w(){return this._w;}
	set w(n){
		this._w = n;
		this._hw = n / 2;
	}
	get h(){return this._h;}
	set h(n){
		this._h = n;
		this._hh = n / 2;
	}

	get hw(){return this._hw;}
	get hh(){return this._hh;}

	get l(){return this._x-this._hw;}
	get r(){return this._x+this._hw;}
	get t(){return this._y-this._hh;}
	get b(){return this._y+this._hh;}

	startMove(vX, vY){
		this._vFlg = true;
		this._vX = vX;
		this._vY = vY;
	}

	stopMove(){
		this._vFlg = false;
	}

	contains(x, y){
		if(x < this.l) return false;
		if(this.r < x) return false;
		if(y < this.t) return false;
		if(this.b < y) return false;
		return true;
	}

	intersects(spr){
		if(spr.r < this.l) return false;
		if(this.r < spr.l) return false;
		if(spr.b < this.t) return false;
		if(this.b < spr.t) return false;
		return true;
	}

	update(){
		if(this._vFlg){
			this.x += this._vX;
			this.y += this._vY;
		}
		this.draw();
	}

	draw(){
		if(!this._visible) return;
		tint(255, this._alpha);
		image(this._img, this.l, this.t, this.w, this.h);
	}
}

//==========
// Button

class Button extends Sprite{

	constructor(file, x, y, onPressed=null){
		super(file, x, y);
		this._onPressed = onPressed;
		this._tween = null;
	}

	press(x, y){
		if(!this.visible) return;
		if(!this._onPressed) return;
		if(!this.contains(x, y)) return;
		this._onPressed();// Callback
	}

	show(x, y){
		this.x = x;
		this.y = y;
		this.visible = true;// Show
		this.scale = 1.0;
		this.alpha = 255;
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

class MyBird extends Sprite{

	constructor(file, x, y){
		super(file, x, y);
		this._jY = -10;
		this._gY = 0.6;
	}

	reset(x, y){
		this.x = x;
		this.y = y;
		this._vFlg  = false;
		this._vX = 0;
		this._vY = 0;
	}

	jump(){
		this._vFlg = true;
		this._vY = this._jY;
	}

	update(){
		super.update();
		if(!this._vFlg) return;
		this._vY += this._gY;
	}
}

class MyScroller extends Sprite{

	constructor(file, x, y){
		super(file, x, y);
	}

	update(){
		super.update();
		if(!this._vFlg) return;
		if(this.r < 0) this.x += this.w * 4;
	}
}