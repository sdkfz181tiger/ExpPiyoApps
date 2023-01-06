console.log("main.js!!");

const TITLE = "2048";
const TILE_NUMS = 4;

let font, btnHome, flkManager;
let my2048;
let tilePad, tileSize, tileCorner;
let sX, sY, tiles, lockFlg;

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
	flkManager = new FlickManager(6, e=>{
		//console.log("Flicked:", e);
		if(e.dir == "left") actionLeft();
		if(e.dir == "right") actionRight();
		if(e.dir == "up") actionUp();
		if(e.dir == "down") actionDown();
	});
	textFont(font);
	colorMode(HSB);
	frameRate(32);
	noSmooth();

	// 2048
	my2048 = new Smz2048();
	my2048.randomPut();
	my2048.randomPut();
	my2048.consoleBoard();

	// Padding, Size
	if(width < height){
		tilePad = width * 0.2;
		tileSize = tilePad * 0.95;
	}else{
		tilePad = height * 0.15;
		tileSize = tilePad * 0.95;
	}
	tileCorner = tileSize * 0.1;

	sX = width*0.5  - tilePad*TILE_NUMS*0.5;
	sY = height*0.5 - tilePad*TILE_NUMS*0.5 + tilePad*0.5;
	lockFlg = false;

	// Reflesh
	this.refleshBoard();
}

function draw(){
	background("whitesmoke");
	noStroke(); fill(33, 33, 33);
	textSize(28); textAlign(RIGHT, BASELINE);
	text(TITLE, width - 12, 32);
	btnHome.drawBtn();
	// Board
	fill(33, 33, 33);
	textSize(28); textAlign(CENTER, BASELINE);
	text("SCR:"+my2048.getScore(), width*0.5, sY-tilePad*0.4);
	fill(33, 33, 99);
	square(sX, sY, tilePad*TILE_NUMS, tileCorner);
	for(let r=0; r<TILE_NUMS; r++){
		for(let c=0; c<TILE_NUMS; c++){
			if(tiles[r][c]) tiles[r][c].draw();
		}
	}
}

function mousePressed(){
	btnHome.checkBtn();
	if(flkManager) flkManager.touchStarted();
}

function mouseMoved(){
	if(flkManager) flkManager.touchMoved();
}

function mouseEnded(){
	if(flkManager) flkManager.touchEnded();
}

function touchStarted(){
	btnHome.checkBtn();
	if(flkManager) flkManager.touchStarted();
}

function touchMoved(){
	if(flkManager) flkManager.touchMoved();
}

function touchEnded(){
	if(flkManager) flkManager.touchEnded();
}

function keyPressed(){
	if(key == "ArrowLeft") actionLeft();
	if(key == "ArrowRight") actionRight();
	if(key == "ArrowUp") actionUp();
	if(key == "ArrowDown") actionDown();
}

function actionLeft(){
	if(lockFlg) return;
	if(!my2048.slideLeft()) return;
	lockFlg = true;
	my2048.consoleBoard();
	updateBoard();
}

function actionRight(){
	if(lockFlg) return;
	if(!my2048.slideRight()) return;
	lockFlg = true;
	my2048.consoleBoard();
	updateBoard();
}

function actionUp(){
	if(lockFlg) return;
	if(!my2048.slideUp()) return;
	lockFlg = true;
	my2048.consoleBoard();
	updateBoard();
}

function actionDown(){
	if(lockFlg) return;
	if(!my2048.slideDown()) return;
	lockFlg = true;
	my2048.consoleBoard();
	updateBoard();
}

function refleshBoard(){
	lockFlg = false;
	let tC = color(33, 66, 99);
	let board = my2048.getBoard();
	tiles = [];
	for(let r=0; r<TILE_NUMS; r++){
		let line = [];
		for(let c=0; c<TILE_NUMS; c++){
			let n = board[r][c];
			let x = sX + tilePad * c;
			let y = sY + tilePad * r;
			if(n != 0){
				line.push(new Tile(n, x, y, tC));
			}else{
				line.push(null);
			}
		}
		tiles.push(line);
	}
}

function updateBoard(){
	// Move
	for(let r=0; r<TILE_NUMS; r++){
		for(let c=0; c<TILE_NUMS; c++){
			let move = my2048.getMove(r, c);
			if(move == null) continue;
			tiles[r][c].moveTo(move.gR, move.gC);
		}
	}
	// Reflesh
	setTimeout(()=>{
		my2048.randomPut();
		refleshBoard();
	}, 250);
}

//==========
// Tile

class Tile{

	constructor(n, x, y, c){
		this._n = n;
		this._x = x;
		this._y = y;
		this._c = c;
		this._dX = x;
		this._dY = y;
	}

	setNum(n){
		this._n = n;
	}

	setPosition(x, y, c){
		this._x = x;
		this._y = y;
		this._c = c;
	}

	moveTo(gR, gC){
		this._dX = this._x + gC * tilePad;
		this._dY = this._y + gR * tilePad;
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
		if(this._n == 0) return;
		// Background
		noStroke(); fill(this._c);
		square(this._x, this._y, tileSize, tileCorner);
		// Font
		let size = tileSize * 0.6;
		if(this._n.toString().length == 2) size = tileSize * 0.5;
		if(this._n.toString().length == 3) size = tileSize * 0.4;
		if(this._n.toString().length == 4) size = tileSize * 0.3;
		if(this._n.toString().length == 5) size = tileSize * 0.2;
		if(5 < this._n.toString().length) size = tileSize * 0.1;
		fill(33, 33, 33); textSize(size); textAlign(CENTER, CENTER);
		text(this._n, this._x+tileSize/2, this._y+tileSize/2-size*0.1);
	}

	calcDistance(){
		let x = this._dX - this._x;
		let y = this._dY - this._y;
		return x*x+y*y;
	}
}