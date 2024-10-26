console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;

const FILES_IMG = [
	"caret-l-w.png", "caret-r-w.png"
];

const TILE_COLORS = [
	"slateblue", "royalblue", "darkblue", "skyblue", "lightblue"
];

let font, cW, cH, cX, cY;
let gSize, gRows, gCols;
let cntDown, num;

const tRows = 5;
const tCols = 5;
let shadows = [];
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

	// Canvas
	const canvas = createCanvas(cW, cH);
	canvas.parent("game");
	textFont(font);
	frameRate(48);
	noSmooth();

	// Countdown
	cntDown = new Countdown(cX, cY+gSize*9, gSize*4, ()=>{
		console.log("onFinished!!");
	});
	num = 1;// Number
	createShadows();// Shadows
}

function draw(){
	background("#333333");
	noStroke(); fill("#cccccc");
	textSize(FONT_SIZE); textAlign(CENTER, CENTER);
	drawGrids();// Grids

	// Shadows
	for(const shadow of shadows) shadow.update();
	// Tiles
	for(let i=tiles.length-1; 0<=i; i--){
		const tile = tiles[i];
		if(tile.isDead()){
			tiles.splice(i, 1);
			continue;
		}
		tile.update();
	}
	cntDown.update();// Countdown

	// Num
	fill("#ffffff");
	textSize(gSize * 2); 
	textAlign(CENTER, BOTTOM);
	text(num, cX, cY - gSize*10);

	TWEEN.update();// Tween
}

function mousePressed(){
	if(FLG_MOBILE) return;
	touchStarted();
}

function touchStarted(){
	if(cntDown.isReady()){
		cntDown.start();
		createTiles();// Tiles
	}
	if(cntDown.isCounting()) return;
	console.log("touchStarted!!");
	for(const tile of tiles){
		if(tile.touch(mouseX, mouseY, num)){
			num++;
		}
	}
}

function drawGrids(){
	stroke("#111111"); strokeWeight(1);
	for(let r=0; r<gRows+1; r++){
		const y = r * gSize;
		line(0, y, cW, y);
		for(let c=0; c<gCols+1; c++){
			const x = c * gSize;
			line(x, 0, x, cH);
		}
	}
}

function createShadows(){
	// Shadows
	const tSize = gSize * 3;
	const sX = cX - (tCols*tSize)/2 + tSize/2;
	const sY = cY - (tRows*tSize)/2;
	const total = tRows * tCols;
	for(let r=0; r<tRows; r++){
		for(let c=0; c<tCols; c++){
			const x = sX + tSize * c;
			const y = sY + tSize * r;
			const shadow = new Shadow(x, y, tSize);
			shadows.push(shadow);
		}
	}
}

function createTiles(){
	// Tiles
	const tSize = gSize * 3;
	const sX = cX - (tCols*tSize)/2 + tSize/2;
	const sY = cY - (tRows*tSize)/2;
	const total = tRows * tCols;
	for(let r=0; r<tRows; r++){
		for(let c=0; c<tCols; c++){
			const x = sX + tSize * c;
			const y = sY + tSize * r;
			const num = r*tCols + c + 1;
			const color = TILE_COLORS[num%TILE_COLORS.length]
			const tile = new Tile(x, y, tSize, num, color);
			tile.ready((total-num) * 30);
			tiles.push(tile);
		}
	}
}