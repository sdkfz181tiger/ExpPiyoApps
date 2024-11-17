console.log("utility.js!!");

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

	constructor(file, x, y, size, alpha=255, rotation=0){
		this._img      = ImgLoader.getImg(file);
		this._pos      = {x: x, y: y};
		this._scale    = size / this._img.width;
		this._alpha    = alpha;
		this._rotation = rotation;
		this._visible  = true;
		this._w        = this._img.width * this._scale;
		this._h        = this._img.height * this._scale;
		this._hw       = this._w / 2;
		this._hh       = this._h / 2;
	}

	get img(){return this._img;}
	set img(n){this._img = n;}
	get x(){return this._pos.x;}
	set x(n){this._pos.x = n;}
	get y(){return this._pos.y;}
	set y(n){this._pos.y = n;}

	get scale(){return this._scale;}
	set scale(n){
		this._scale = n;
		this._w = this._img.width * n;
		this._h = this._img.height * n;
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

	get l(){return this._pos.x-this._hw;}
	get r(){return this._pos.x+this._hw;}
	get t(){return this._pos.y-this._hh;}
	get b(){return this._pos.y+this._hh;}

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
		if(!this._visible) return;
		tint(255, this._alpha);
		if(this._rotation == 0){
			image(this._img, this.l, this.t, this.w, this.h);
		}else{
			push();
			translate(this._pos.x, this._pos.y);
			rotate(this._rotation * PI/180);
			image(this._img, -this.hw, -this.hh, this.w, this.h);
			pop();
		}
	}
}