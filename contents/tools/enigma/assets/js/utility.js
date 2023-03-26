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

	constructor(file, x, y, s, k, onPressed=null){
		super(file, x, y, s);
		this._key       = k;
		this._onPressed = onPressed;
		this._tween     = null;
	}

	press(x, y){
		if(!this.visible) return;
		if(!this.contains(x, y)) return;
		if(this._onPressed) this._onPressed(this._key);// Callback
	}

	update(){
		super.update();
		fill("#ffffff"); noStroke();
		textSize(FONT_SIZE); textAlign(CENTER);
		text(this._key, this._x, this._y+FONT_SIZE * 0.25);
	}
}

//==========
// Enigma(UI)

// MyCircle
class MyCircle{

	constructor(x, y, radius, roter){
		console.log("Circle");
		this._x      = x;
		this._y      = y;
		this._radius = radius;
		this._roter  = roter;
		this._padR   = Math.PI*2 / roter.ptn.length;
		console.log(roter.index, roter.ptn, this._padR);
	}

	press(x, y){
		const dX = this._x - x;
		const dY = this._y - y;
		const dist = Math.sqrt(dX**2 + dY**2);
		if(this._radius < dist) return;
		this._roter.rotate();// Rotate
	}

	update(){
		noFill(); stroke("#aaaaaa"); strokeWeight(1);
		//circle(this._x, this._y, this._radius*2);
		for(let i=0; i<this._roter.ptn.length; i++){
			const from = this._padR*i-Math.PI*0.5;
			const fX   = this._x + this._radius * Math.cos(from);
			const fY   = this._y + this._radius * Math.sin(from);
			const o    = (this._roter.index + i) % this._roter.ptn.length;
			const to   = this._padR*this._roter.ptn[o]-Math.PI*0.5;
			const tX   = this._x + this._radius * Math.cos(to);
			const tY   = this._y + this._radius * Math.sin(to);
			line(fX, fY, tX, tY);
		}
		fill("#333333"); noStroke();
		textSize(FONT_SIZE*0.6); textAlign(CENTER, CENTER);
		text(this._roter.index, this._x, this._y);
		textSize(FONT_SIZE*0.4);
		for(let i=0; i<alphabets.length; i++){
			const r = this._padR*i-Math.PI*0.5;
			const x = this._x + this._radius * Math.cos(r);
			const y = this._y + this._radius * Math.sin(r);
			const c = alphabets[i];
			text(c, x, y-FONT_SIZE*0.1);
		}
	}
}

//==========
// Enigma(Logic)

const alphabets = "abcdefghijklmnopqrstuvwxyz";
const ROT_1 = [14,20,12,2,22,19,13,23,16,6,0,7,17,1,24,10,5,25,3,9,18,21,11,4,15,8];
const ROT_2 = [20,2,21,15,3,17,11,19,0,1,4,23,5,24,6,8,22,25,9,10,13,16,7,14,12,18];
const ROT_3 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];

// Enigma
class Enigma{

	constructor(){
		console.log("Enigma");
	}

	init(n1, n2, n3){
		// Scrambler
		// n1, n2, n3: ローター回転値
		this._scrambler = new Scrambler(n1, n2, n3);
	}

	decode(c){
		this._scrambler.rotate();// Rotate
		return this._scrambler.decode(c);// Decode
	}

	getRoters(){
		return this._scrambler.getRoters();
	}

	getInfo(){
		return this._scrambler.getInfo();
	}
}

// Scrambler
class Scrambler{

	constructor(n1, n2, n3){
		console.log("Scrambler");

		// Roters(3つのローターを装備)
		// 第一引数: ローター回転値
		// 第二引数: ローター内配線
		this._roters = [
			new Roter(n1, ROT_1),
			new Roter(n2, ROT_2),
			new Roter(n3, ROT_3)
		];
	}

	decode(c){
		const history = [c];
		const size = this._roters.length;
		for(let i=0; i<size; i++){// Forward
			c = this._roters[i].forward(c);
			history.push(c);
		}
		c = this._roters[size-1].reflect(c);// Reflect
		history.push(c);
		for(let i=size-1; 0<=i; i--){// Backward
			c = this._roters[i].backward(c);
			history.push(c);
		}
		console.log("history:", history);
		return history;
	}

	rotate(){
		// 右のローターを回転(1周すると次のローターも回転)
		for(let i=this._roters.length-1; 0<=i; i--){
			const roter = this._roters[i];
			if(!roter.rotate()) return;
		}
	}

	getRoters(){
		return this._roters;
	}

	getInfo(){
		let info = "roters: ";
		for(let roter of this._roters){
			info += roter.index + ",";
		}
		return info;
	}
}

// Roter
class Roter{

	constructor(index, ptn){
		//console.log("Roter");
		this._index = index % ptn.length;// Index
		this._ptn   = ptn;
		this.init();
	}

	init(){
		// init
		this._forward = {}
		this._backward = {}
		const size = this._ptn.length;
		for(let i=0; i<size; i++){
			const o = (this._index + i) % size;
			this._forward[i] = this._ptn[o];
			this._backward[this._ptn[o]] = i;
		}
	}

	forward(c){
		const i = this.getIndex(c);
		const f = this._forward[i];
		//console.log("forward:", i, "->", f);
		return alphabets[f];
	}

	backward(c){
		const i = this.getIndex(c);
		const b = this._backward[i];
		//console.log("backward:", i, "->", b);
		return alphabets[b];
	}

	reflect(c){
		const i = this.getIndex(c);
		const r = this._ptn.length-1 - i;
		//console.log("reflect:", i, "->", r);
		return alphabets[r];
	}

	getIndex(c){
		for(let i=0; i<alphabets.length; i++){
			if(alphabets[i] == c) return i;
		}
		return -1;
	}

	rotate(){
		this._index++;
		if(this._ptn.length-1 < this._index){
			this._index = 0;
			this.init();// Init
			return true;
		}
		this.init();// Init
		return false;
	}

	get index(){
		return this._index;
	}

	get ptn(){
		return this._ptn;
	}
}