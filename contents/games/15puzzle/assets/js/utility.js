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
// Tile

const T_COLORS = [
	"#FFFFFF", "#F44336", "#E91E63", "#9C27B0", "#673Ab7", "#3F51B5", 
	"#2196F3", "#03A9f4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", 
	"#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548"];
const F_COLORS = [
	"#333", "#FFF", "#FFF", "#FFF", "#FFF", "#FFF", 
	"#333", "#333", "#333", "#FFF", "#FFF", "#FFF", 
	"#333", "#333", "#333", "#333", "#FFF", "#FFF"];

class Tile{

	constructor(num, r, c, pad, size, corner){
		this._num    = num;
		this._r      = r;
		this._c      = c;
		this._pad    = pad;
		this._size   = size;
		this._corner = corner;

		this._x   = sX + pad * c;
		this._y   = sY + pad * r;
		this._dX  = this._x;
		this._dY  = this._y;
	}

	get num(){return this._num;}
	get r(){return this._r;}
	get c(){return this._c;}

	set num(n){this._num = n;}
	set r(n){this._r = r;}
	set c(n){this._c = c;}

	change(r, c){
		this._r = r;
		this._c = c;
		this._dX = sX + this._pad * c;
		this._dY = sY + this._pad * r;
	}

	contains(x, y){
		if(x < this._x) return false;
		if(y < this._y) return false;
		if(this._x + this._size < x) return false;
		if(this._y + this._size < y) return false;
		return true;
	}

	draw(){
		// Move
		if(this.calcDistance() < 4){
			this._x = this._dX;
			this._y = this._dY;
		}else{
			this._x += (this._dX - this._x) / 2;
			this._y += (this._dY - this._y) / 2;
		}
		if(this._num != 0){
			let i = Math.floor(this._num%T_COLORS.length);
			// Background
			noStroke(); fill(T_COLORS[i]);
			square(this._x, this._y, this._size, this._size, this._corner);
			// Font
			fill(F_COLORS[i]); textSize(this._size*0.5); textAlign(CENTER);
			text(this._num, this._x+this._size/2, this._y+this._size*0.7);
		}
	}

	calcDistance(){
		let x = this._dX - this._x;
		let y = this._dY - this._y;
		return x*x+y*y;
	}
}

//==========
// FpzManager

const D_LEFT  = 0;
const D_RIGHT = 1;
const D_UP    = 2;
const D_DOWN  = 3;

class FpzManager{

	constructor(){
		this._grids = 4;
		this._board = [
			[ 1, 2, 3, 4],
			[ 5, 6, 7, 8],
			[ 9,10,11,12],
			[13,14,15, 0]
		];
		this._histories = [];
		this.wanderGrid(3, 3, -1, 100);
	}

	getGrids(){return this._grids;}

	getBoard(){return this._board;}

	pushHistory(fR, fC, tR, tC){
		let history = {fR:fR, fC:fC, tR:tR, tC:tC};
		this._histories.push(history);
	}

	popHistory(){
		let l = this._histories.length - 1;
		if(l < 0) return null;
		let history = this._histories[l];
		this._histories.splice(l, 1);
		return history;
	}

	checkVH(r, c){
		if(this.checkZero(r-1, c)) return this.swapGrid(r, c, r-1, c);
		if(this.checkZero(r+1, c)) return this.swapGrid(r, c, r+1, c);
		if(this.checkZero(r, c-1)) return this.swapGrid(r, c, r, c-1);
		if(this.checkZero(r, c+1)) return this.swapGrid(r, c, r, c+1);
		return {r:-1, c:-1};
	}

	checkZero(r, c){
		if(r < 0) return false;
		if(c < 0) return false;
		if(this._grids-1 < r) return false;
		if(this._grids-1 < c) return false;
		if(this._board[r][c] != 0) return false;
		return true;
	}

	wanderGrid(r, c, prev, cnt){
		if(cnt <= 0) return;
		let dirs = [];
		for(let i=0; i<4; i++) dirs.push(i);
		for(let i=dirs.length-1; 0<i; i--){
			let rdm = Math.floor(Math.random()*i);
			let tmp = dirs[rdm];
			dirs[rdm] = dirs[i];
			dirs[i] = tmp;
		}
		for(let i=0; i<dirs.length; i++){
			let dir = dirs[i];
			let rev = -1;
			if(prev == D_LEFT) rev = D_RIGHT;
			if(prev == D_RIGHT) rev = D_LEFT;
			if(prev == D_UP) rev = D_DOWN;
			if(prev == D_DOWN) rev = D_UP;
			if(dir == rev) continue;
			let oR = 0;
			let oC = 0;
			if(dir == D_LEFT){
				if(c-1<0) continue;
				oC--;
			}
			if(dir == D_RIGHT){
				if(this._grids-1<c+1) continue;
				oC++;
			}
			if(dir == D_UP){
				if(r-1<0) continue;
				oR--;
			}
			if(dir == D_DOWN){
				if(this._grids-1<r+1) continue;
				oR++;
			}
			this._histories.push({fR:r, fC:c, tR:r+oR, tC:c+oC});
			this.swapGrid(r, c, r+oR, c+oC);
			this.wanderGrid(r+oR, c+oC, dir, cnt-1);
			return;
		}
	}

	swapGrid(fR, fC, tR, tC){
		let tmp = this._board[tR][tC];
		this._board[tR][tC] = this._board[fR][fC];
		this._board[fR][fC] = tmp;
		return {r:tR, c:tC};
	}
}