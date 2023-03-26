console.log("sprite.js!!");

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

	constructor(file, x, y, s=1.0, a=255, r=0){
		this._img      = ImgLoader.getImg(file);
		this._x        = x;
		this._y        = y;
		this._scale    = s;
		this._alpha    = a;
		this._rotation = r;
		this._visible  = true;
		this._w        = this._img.width * s;
		this._h        = this._img.height * s;
		this._hw       = this._w / 2;
		this._hh       = this._h / 2;
		this._vFlg     = false;
		this._vX       = 0;
		this._vY       = 0;
	}

	get img(){return this._img;}
	set img(n){this._img = n;}
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
	get rotation(){return this._rotation;}
	set rotation(n){this._rotation = n;}
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

	get vFlg(){return this._vFlg;}
	set vFlg(n){this._vFlg = n;}
	get vX(){return this._vX;}
	set vX(n){this._vX = n;}
	get vY(){return this._vY;}
	set vY(n){this._vY = n;}

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
		if(!this._visible) return false;
		if(x < this.l) return false;
		if(this.r < x) return false;
		if(y < this.t) return false;
		if(this.b < y) return false;
		return true;
	}

	intersects(spr){
		if(!this._visible) return false;
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
		if(this._rotation == 0){
			image(this._img, this.l, this.t, this.w, this.h);
		}else{
			push();
			translate(this.x, this.y);
			rotate(this._rotation * PI/180);
			image(this._img, -this.hw, -this.hh, this.w, this.h);
			pop();
		}
	}
}