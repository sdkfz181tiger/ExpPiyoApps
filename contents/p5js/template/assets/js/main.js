console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;

const FILES_IMG = [
	"caret-l-w.png", "caret-r-w.png"
];

let font, cW, cH, cX, cY;
let gSize, gRows, gCols;
let cntDown;

const tRows = 5;
const tCols = 5;
let tiles = [];

function preload(){
	font = loadFont("../../assets/fonts/nicokaku_v2.ttf");
	for(let file of FILES_IMG) ImgLoader.loadImg(file);
}

function setup(){
	const main = document.querySelector("main");
	cH = main.clientHeight - AD_HEIGHT;
	cW = min(main.clientWidth, cH*A_RACIO);
	cX = cW / 2;
	cY = cH / 2;
	gSize = floor(cW / 20);
	gRows = floor(cH / gSize);
	gCols = floor(cW / gSize);

	const canvas = createCanvas(cW, cH);
	canvas.parent("game");
	textFont(font);
	frameRate(16);
	noSmooth();

	// Countdown
	cntDown = new Countdown(cX, cY, gSize*4, ()=>{
		console.log("onFinished!!");
		readyTiles();// Tiles
	});
}

function draw(){
	background("#333333");
	noStroke(); fill("#cccccc");
	textSize(FONT_SIZE); textAlign(CENTER, CENTER);
	drawGrids();// Grids

	cntDown.update();// Countdown

	// Tiles
	for(let i=tiles.length-1; 0<=i; i--){
		const tile = tiles[i];
		if(tile.isDead()){
			tiles.splice(i, 1);
			continue;
		}
		tile.update();
	}

	TWEEN.update();// Tween
}

function mousePressed(){
	if(FLG_MOBILE) return;
	if(cntDown.isReady()) cntDown.start();
	if(cntDown.isCounting()) return;
	console.log("mousePressed!!");
	for(const tile of tiles) tile.touch(mouseX, mouseY);
}

function touchStarted(){
	if(cntDown.isReady()) cntDown.start();
	if(cntDown.isCounting()) return;
	console.log("touchStarted!!");
	for(const tile of tiles) tile.touch(mouseX, mouseY);
}

function drawGrids(){
	stroke("gray"); strokeWeight(1);
	for(let r=0; r<gRows+1; r++){
		const y = r * gSize;
		line(0, y, cW, y);
		for(let c=0; c<gCols+1; c++){
			const x = c * gSize;
			line(x, 0, x, cH);
		}
	}
}

function readyTiles(){
	// Tiles
	const tSize = gSize * 3;
	const sX = cX - (tCols*tSize)/2 + tSize/2;
	const sY = cY - (tRows*tSize)/2;
	for(let r=0; r<tRows; r++){
		for(let c=0; c<tCols; c++){
			const x = sX + tSize * c;
			const y = sY + tSize * r;
			const num = r*tCols + c + 1;
			const tile = new Tile(x, y, tSize, num);
			tiles.push(tile);
		}
	}
}