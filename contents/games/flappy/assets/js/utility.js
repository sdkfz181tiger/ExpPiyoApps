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
// Rect

class Rect{

	constructor(x, y, w, h){
		this._x = x;
		this._y = y;
		this._w = w;
		this._h = h;
		this._hw = w / 2;
		this._hh = h / 2;
	}

	get x(){return this._x;}
	set x(n){this._x = n;}
	get y(){return this._y;}
	set y(n){this._y = n;}

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
}

//==========
// Sprite
//	 Ease: https://milchreis.github.io/p5.tween/docs/

class Sprite{

	constructor(file, x, y, s=1.0, a=255){
		this._img = ImgLoader.getImg(file);
		this._rect = new Rect(x, y, 
			this._img.width, this._img.height);
		this.scale = s;
		this.alpha = a;
		this.visible = true;
		this._vFlg = false;
		this._vX = 0;
		this._vY = 0;
	}

	get img(){return this._img;}
	get rect(){return this._rect;}

	get scale(){return this._scale;}
	set scale(n){
		this._scale = n;
		this._rect.w = this._img.width * n;
		this._rect.h = this._img.height * n;
	}
	get alpha(){return this._alpha;}
	set alpha(n){this._alpha = n;}
	get visible(){return this._visible;}
	set visible(n){this._visible = n;}

	startMove(vX, vY){
		this._vFlg = true;
		this._vX = vX;
		this._vY = vY;
	}

	stopMove(){
		this._vFlg = false;
	}

	contains(x, y){
		if(x < this._rect.l) return false;
		if(this._rect.r < x) return false;
		if(y < this._rect.t) return false;
		if(this._rect.b < y) return false;
		return true;
	}

	intersects(spr){
		if(spr.rect.r < this._rect.l) return false;
		if(this._rect.r < spr.rect.l) return false;
		if(spr.rect.b < this._rect.t) return false;
		if(this._rect.b < spr.rect.t) return false;
		return true;
	}

	update(){
		if(this._vFlg){
			this.rect.x += this._vX;
			this.rect.y += this._vY;
		}
		this.draw();
	}

	draw(){
		if(!this._visible) return;
		tint(255, this._alpha);
		image(this._img, 
			this._rect.l, this._rect.t, 
			this._rect.w, this._rect.h);
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
		console.log("Show!!");
		this.rect.x = x;
		this.rect.y = y;
		this.visible = true;// Show
		this.alpha = 255;
		if(this._tween) this._tween.resetMotions();// Important
		this._tween = p5.tween.manager.addTween(this.rect, "show");
		this._tween.addMotion("y", this.rect.y+5, 1000, "easeOutQuad")
			.addMotion("y", this.rect.y, 1000, "easeOutQuad")
			.startLoop();
	}

	hide(){
		console.log("Hide!!");
		setTimeout(()=>{this.visible=false;}, 400);// Hide
		if(this._tween) this._tween.resetMotions();// Important
		this._tween = p5.tween.manager.addTween(this.rect, "hide");
		this._tween.addMotions(
			[{key:"y", target: this.rect.y-50}, {key:"alpha", target: 0}],
			400, "easeOutQuad")
			.startTween();
	}
}

class MyBird extends Sprite{

	constructor(file, x, y){
		super(file, x, y);
		this._jY = -10;
		this._gY = 0.6;
	}

	reset(x, y){
		this.rect.x = x;
		this.rect.y = y;
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
		if(this.rect.r < 0) this.rect.x += this.rect.w * 4;
	}
}