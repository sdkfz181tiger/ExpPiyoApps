console.log("main.js!!");

const TITLE   = "2048";

let font, btnHome, btnAuto;

function preload(){
	font = loadFont("./assets/fonts/nicokaku_v2.ttf");
}

function setup(){
	console.log("setup");
	const W = window.innerWidth;
	const H = window.innerHeight;
	const canvas = createCanvas(W, H);
	btnHome = new MyButton("caret-l-w.png", ()=>{
		window.location.replace("../../");
	});
	frameRate(32);
	textFont(font);
	noSmooth();
}

function draw(){
	background("whitesmoke");
	noStroke(); fill(33, 33, 33);
	textSize(28); textAlign(RIGHT);
	text(TITLE, width - 12, 32);
	btnHome.drawBtn();
}

function mousePressed(){
	btnHome.checkBtn();
	checkTiles();
}

function touchStarted(){
	btnHome.checkBtn();
	checkTiles();
}

function checkTiles(){
	
}

//==========
// MyButton

class MyButton{

	constructor(file, onPressed=null){
		this._img = loadImage("./assets/images/" + file);
		this._onPressed = onPressed;
		this.setPos(24, 24);// Default
	}

	setPos(x, y, size=32){
		this._size = size;
		this._x = x - this._size*0.5;
		this._y = y - this._size*0.5;
		this._corner = this._size * 0.1;
		this._sizeC = this._size * 0.6;
		this._xC = this._x + this._size*0.5 - this._sizeC*0.5;
		this._yC = this._y + this._size*0.5 - this._sizeC*0.5;
	}

	checkBtn(){
		if(mouseX < this._x) return;
		if(mouseY < this._y) return;
		if(this._x + this._size < mouseX) return;
		if(this._y + this._size < mouseY) return;
		if(this._onPressed) this._onPressed();
	}

	drawBtn(){
		fill("dodgerblue");
		square(this._x, this._y, this._size, this._corner);
		image(this._img, this._xC, this._yC, this._sizeC, this._sizeC);
	}
}