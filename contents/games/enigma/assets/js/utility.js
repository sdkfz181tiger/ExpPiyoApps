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

// 
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
		noFill(); stroke("#cccccc"); strokeWeight(1);
		circle(this._x, this._y, this._radius*2);
		fill("#333333"); noStroke();
		circle(this._x, this._y-this._radius*1.3, 5);
		textSize(FONT_SIZE*0.6); textAlign(CENTER, CENTER);
		text(this._roter.index, this._x, this._y);
		textSize(FONT_SIZE*0.4);
		for(let i=0; i<this._roter.ptn.length; i++){
			const r = this._padR*i-Math.PI*0.5 - this._padR*this._roter.index;
			const x = this._x + this._radius * Math.cos(r);
			const y = this._y + this._radius * Math.sin(r);
			const c = alphabets[this._roter.ptn[i]];
			text(c, x, y);
		}
	}
}

//==========
// Enigma(Logic)

const alphabets = "abcdefghijklmnopqrstuvwxyz";
const ROT_1 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
const ROT_2 = [20,21,22,23,24,25,11,12,13,14,15,16,17,18,19,0,1,2,3,4,5,6,7,8,9,10];
const ROT_3 = [22,23,24,25,6,7,8,9,10,11,12,13,14,15,16,17,0,1,2,3,4,5,18,19,20,21];

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

	decode(str){
		let result = "";
		for(let c of str){
			result += this._scrambler.decode(c);// Decode
			this._scrambler.rotate();// Rotate
			console.log(this.getInfo());
		}
		return result;
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
		const size = this._roters.length;
		for(let i=0; i<size; i++){// Forward
			c = this._roters[i].forward(c);
		}
		c = this._roters[size-1].reflect(c);// Reflect
		for(let i=size-1; 0<=i; i--){// Backward
			c = this._roters[i].backward(c);
		}
		return c;
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