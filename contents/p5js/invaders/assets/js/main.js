console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;
const KEY_HIGH  = "invaders";

const FILES_IMG = [
	"mark_bkg.png", "mark_ng.png", "mark_ok.png"
];

let font, cW, cH, cX, cY;
let score, high;
let btnLeft, btnRight, btnShot;
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
	btnLeft = new Button(cX-gSize*7.4, cH-gSize*3, gSize*3.2, gSize*3.2, 
		"<", "#ff595e", true, ()=>{onTouchLeft();});

	btnRight = new Button(cX-gSize*3.4, cH-gSize*3, gSize*3.2, gSize*3.2, 
		">", "#595eff", true, ()=>{onTouchRight();});

	btnShot = new Button(cX+gSize*5.5, cH-gSize*3, gSize*7, gSize*3.2, 
		"SHOT", "#59cc5e", true, ()=>{onTouchShot();});

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
	drawMsg("準備中です...", cX, cY-gSize*12, 1.2);

	if(!gameOverFlg){
		btnLeft.update();// Left
		btnRight.update();// Right
		btnShot.update();// Shot
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
		btnLeft.touch(mouseX, mouseY);// Left
		btnRight.touch(mouseX, mouseY);// Right
		btnShot.touch(mouseX, mouseY);// Shot
	}else{
		btnRetryDialog.touch(mouseX, mouseY);// RetryDialog
	}
}

function onTouchLeft(){
	console.log("onTouchLeft");
}

function onTouchRight(){
	console.log("onTouchRight");
}

function onTouchShot(){
	console.log("onTouchShot");
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