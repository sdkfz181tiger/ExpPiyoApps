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
//	 Ease: //milchreis.github.io/p5.tween/docs/modules/_easings_.p5.tween.html

class Sprite{

	constructor(file, x, y){
		this._img = ImgLoader.getImg(file);
		this._rect = new Rect(x, y, 
			this._img.width, this._img.height);
	}

	setPos(x, y){
		this._rect.x = x;
		this._rect.y = y;
	}

	setScale(s){
		this._rect.w *= s;
		this._rect.h *= s;
	}

	get x(){return this._rect.x;}
	set x(n){this._rect.x = n;}
	get y(){return this._rect.y;}
	set y(n){this._rect.y = n;}

	get w(){return this._rect.w;}
	get h(){return this._rect.h;}
	get hw(){return this._rect.hw;}
	get hh(){return this._rect.hh;}

	contains(x, y){
		if(x < this._rect.l) return false;
		if(this._rect.r < x) return false;
		if(y < this._rect.t) return false;
		if(this._rect.b < y) return false;
		return true;
	}

	draw(){
		fill("#0D6EFD");
		rect(this._rect.l, this._rect.t, 
			this._rect.w, this._rect.h);
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
	}

	onPressed(x, y){
		if(this._onPressed == null) return false;
		return this.contains(x, y);
	}
}

//==========
// Bird

class MyBird extends Sprite{

	constructor(file, x, y){
		super(file, x, y);
	}

	moveTo(x, y, mil, ease="linear"){
		p5.tween.manager.addTween(this, "moveto")
			.addMotions([{key:"x", target: x}, {key:"y", target: y}], mil, ease)
			.startTween();
	}
}