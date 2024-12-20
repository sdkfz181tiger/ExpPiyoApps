console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;
const KEY_HIGH  = "tn25";

const FILES_IMG = [
	"egg_01.png"
];

const TILE_COLORS = [
	"#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"
];

let font, cW, cH, cX, cY;
let gSize, gRows, gCols;
let tSize, num, clearFlg, highFlg;
let cntTime, cntHigh, cntDown, btnRetryDialog;

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

	// Init
	tSize    = gSize * 3.4;// TileSize
	num      = 1;// Number
	clearFlg = false;// Clear
	highFlg  = false;// High
	cntTime  = 0;// Time
	cntHigh  = loadHighScore();// HighScore
	// Countdown
	cntDown = new Countdown(cX, cY+gSize*11, gSize*4, 
		()=>{console.log("onFinished!!");});
	// RetryDialog
	btnRetryDialog = new Button(cX, cY+gSize*12, gSize*6, gSize*2.2, 
		"RETRY", "#ff595e", false, ()=>{showRetryDialog();});
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
	// Time
	if(cntDown.isPlaying() && !clearFlg){
		cntTime += floor(100 / frameRate());
	}
	// Countdown
	cntDown.update();
	// RetryDialog
	btnRetryDialog.update();

	drawMsgNext(gSize*2, cY - gSize*11);// Next
	drawMsgTime(cW-gSize*2, cY - gSize*11);// Time
	drawMsgHigh(cW-gSize*2, cY - gSize*9.5);// High
	drawMsgClear(cX, cY);// Game Clear
	drawMsgHighScore(cX, cY + gSize*2);// High Score

	TWEEN.update();// Tween
}

function mousePressed(){
	if(FLG_MOBILE) return;
	touchStarted();
}

function touchStarted(){
	if(mouseY < 0) return;
	if(cntDown.isReady()){
		cntDown.start();
		createTiles();// Tiles
	}
	if(cntDown.isCounting()) return;

	btnRetryDialog.touch(mouseX, mouseY);// RetryDialog
	// Tiles
	for(const tile of tiles){
		if(!tile.touch(mouseX, mouseY)) continue;
		if(tile.isCorrect(num)){
			tile.jump();// Correct
			if(tRows*tCols <= num){
				clearFlg = true;// Clear
				btnRetryDialog.show();// RetryDialog
				saveHighScore();// Save
				return;
			}
			num++;// Next
			return;
		}
		tile.shake();// Incorrect
		cntTime += 50;// Penalty
		return;
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

function drawMsgNext(x, y){
	fill("#ffffff");
	textSize(gSize * 1.6); 
	textAlign(LEFT, CENTER);
	text("NEXT:"+num, x, y);
}

function drawMsgTime(x, y){
	fill("#ffffff");
	textSize(gSize * 1.6); 
	textAlign(RIGHT, CENTER);
	text((cntTime/100).toFixed(2), x, y);
}

function drawMsgHigh(x, y){
	fill("#ff9999");
	textSize(gSize * 0.8); 
	textAlign(RIGHT, CENTER);
	text("HIGH:"+(cntHigh/100).toFixed(2), x, y);
}

function drawMsgClear(x, y){
	if(!clearFlg) return;
	fill("#ffffff");
	textSize(gSize * 1.6); 
	textAlign(CENTER, BOTTOM);
	text("GAME CLEAR!!", x, y);
}

function drawMsgHighScore(x, y){
	if(!clearFlg || !highFlg) return;
	fill("#ff9999");
	textSize(gSize * 1.2);
	textAlign(CENTER, BOTTOM);
	text("HIGH SCORE!!", x, y);
}

function createShadows(){
	// Shadows
	const sX = cX - (tCols*tSize)/2 + tSize/2;
	const sY = cY - (tRows*tSize)/2 + gSize*2;
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
	const sX = cX - (tCols*tSize)/2 + tSize/2;
	const sY = cY - (tRows*tSize)/2 + gSize*2;
	const total = tRows * tCols;
	const nums = [];
	for(let i=0; i<tRows*tCols; i++) nums.push(i+1);
	for(let i=nums.length-1; 0<=i; i--){
		const rdm = floor(random(i));
		[nums[i], nums[rdm]] = [nums[rdm], nums[i]];
	}
	for(let r=0; r<tRows; r++){
		for(let c=0; c<tCols; c++){
			const x = sX + tSize * c;
			const y = sY + tSize * r;
			const i = r * tCols + c;
			const num = nums[i];
			const color = TILE_COLORS[num%TILE_COLORS.length]
			const tile = new Tile(x, y, tSize, num, color);
			tile.ready((total-i) * 30);
			tiles.push(tile);
		}
	}
}

function loadHighScore(){
	const num = localStorage.getItem(KEY_HIGH);
	if(num == null) return 99999;
	return num;
}

function saveHighScore(){
	if(cntHigh < cntTime) return;
	cntHigh = cntTime;
	highFlg = true;
	localStorage.setItem(KEY_HIGH, cntHigh);
}