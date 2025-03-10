console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;
const KEY_HIGH  = "shanghai";

const FILES_IMG = [
	"mark_bkg.png", "mark_ng.png", "mark_ok.png"
];

let font, cW, cH, cX, cY;
let score, high;
let btnHigh, btnLow;
let btnRetryDialog;
let gameOverFlg = false;

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
	frameRate(32);
	noSmooth();

	score = 0;// Score
	high = loadHighScore();// High

	// Button
	btnHigh = new Button(cX-gSize*4, cH-gSize*4, gSize*6, gSize*2.2, 
		"大きい", "#ff595e", true, ()=>{onTouchHigh();});

	btnLow = new Button(cX+gSize*4, cH-gSize*4, gSize*6, gSize*2.2, 
		"小さい", "#595eff", true, ()=>{onTouchLow();});

	// RetryDialog
	btnRetryDialog = new Button(cX, cH-gSize*4, gSize*6, gSize*2.2, 
		"RETRY", "#ff595e", true, ()=>{showRetryDialog();});
}

function draw(){
	background("#333333");
	noStroke(); fill("#cccccc");
	textSize(FONT_SIZE); textAlign(CENTER, CENTER);
	drawGrids();// Grids

	drawMsg("SC:"+score, gSize, cY-gSize*12, 1.4, "#ffffff", LEFT);
	drawMsg("HI:"+high, cW-gSize, cY-gSize*12, 1.4, "#ff595e", RIGHT);
	drawMsg("準備中です...", cX, cY+gSize*6.8, 1.2);

	if(!gameOverFlg){
		btnHigh.update();// High
		btnLow.update();// Low
	}else{
		btnRetryDialog.update();// RetyDialog
	}

	TWEEN.update();// Tween
}

function mousePressed(){
	if(FLG_MOBILE) return;
	touchStarted();
}

function touchStarted(){
	if(mouseY < 0) return;

	if(!gameOverFlg){
		btnHigh.touch(mouseX, mouseY);// High
		btnLow.touch(mouseX, mouseY);// Low
	}else{
		btnRetryDialog.touch(mouseX, mouseY);// RetryDialog
	}
}

function onTouchHigh(){
	console.log("onTouchHigh");
}

function onTouchLow(){
	console.log("onTouchLow");
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

function drawMsg(msg, x, y, size=2.0, 
	color="#ffffff", alignX=CENTER, alignY=CENTER){
	fill(color);
	textSize(gSize * size); 
	textAlign(alignX, alignY);
	text(msg, x, y);
}

function loadHighScore(){
	const num = localStorage.getItem(KEY_HIGH);
	if(num == null) return 0;
	return num;
}

function saveHighScore(){
	localStorage.setItem(KEY_HIGH, high);
}