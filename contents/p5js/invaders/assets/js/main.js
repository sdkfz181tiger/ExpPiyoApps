console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;
const KEY_HIGH  = "invaders";

const FILES_IMG = [
	"mark_bkg.png", "mark_ng.png", "mark_ok.png",
	"reimu_good_01.png"
];

let font, cW, cH, cX, cY;
let score, high;
let btnLeft, btnRight;
let btnRetryDialog;
let gameOverFlg = false;

let player;

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
	btnLeft = new Button(cX-gSize*4.8, cH-gSize*3, 
		gSize*8, gSize*3.2, "<-L", "#ff595e", true, 
		()=>{onTouchLeft();}, ()=>{onReleaseLR();});

	btnRight = new Button(cX+gSize*4.8, cH-gSize*3, 
		gSize*8, gSize*3.2, "R->", "#595eff", true, 
		()=>{onTouchRight();}, ()=>{onReleaseLR();});

	// RetryDialog
	btnRetryDialog = new Button(cX, cH-gSize*4, gSize*6, gSize*2.2, 
		"RETRY", "#ff595e", true, ()=>{showRetryDialog();});

	// Player
	player = new Player("reimu_good_01.png", cX, cY+gSize*6, gSize*3);
}

function draw(){
	background("#333333");
	noStroke(); fill("#cccccc");
	textSize(FONT_SIZE); textAlign(CENTER, CENTER);
	drawGrids();// Grids
	if(frameRate() <= 0) return;

	drawMsg("SC:"+score, gSize, cY-gSize*12, 1.4, "#ffffff", LEFT);
	drawMsg("HI:"+high, cW-gSize, cY-gSize*12, 1.4, "#ff595e", RIGHT);
	drawMsg("レベルを調整...!?", cX, cY-gSize*12, 1.2);

	if(!gameOverFlg){
		btnLeft.update();// Left
		btnRight.update();// Right
	}else{
		btnRetryDialog.update();// RetyDialog
	}

	player.update();
	overWrapCanvas(player);

	TWEEN.update();// Tween
}

function mousePressed(){
	if(FLG_MOBILE) return;
	touchStarted();
}

function mouseMoved(){
	if(FLG_MOBILE) return;
	touchMoved();
}

function mouseReleased(){
	if(FLG_MOBILE) return;
	touchEnded();
}

function touchStarted(){
	if(mouseY < 0) return;
	if(!gameOverFlg){
		btnLeft.touchStarted(mouseX, mouseY);// Left
		btnRight.touchStarted(mouseX, mouseY);// Right
	}else{
		btnRetryDialog.touchStarted(mouseX, mouseY);// RetryDialog
	}
}

function touchMoved(){
	if(mouseY < 0) return;
	if(!gameOverFlg){
		btnLeft.touchMoved(mouseX, mouseY);// Left
		btnRight.touchMoved(mouseX, mouseY);// Right
	}else{
		btnRetryDialog.touchMoved(mouseX, mouseY);// RetryDialog
	}
}

function touchEnded(){
	if(mouseY < 0) return;
	if(!gameOverFlg){
		btnLeft.touchEnded(mouseX, mouseY);// Left
		btnRight.touchEnded(mouseX, mouseY);// Right
	}else{
		btnRetryDialog.touchEnded(mouseX, mouseY);// RetryDialog
	}
}

function onTouchLeft(){
	console.log("onTouchLeft");
	player.moveLeft(gSize*3);
}

function onTouchRight(){
	console.log("onTouchRight");
	player.moveRight(gSize*3);
}

function onReleaseLR(){
	console.log("onReleaseLR");
	player.moveStop();
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

function overWrapCanvas(spr){
	if(spr.x < 0) spr.x = cW;
	if(spr.y < 0) spr.y = cH;
	if(cW < spr.x) spr.x = 0;
	if(cH < spr.y) spr.y = 0;
}