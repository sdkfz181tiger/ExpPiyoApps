console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;
const KEY_HIGH  = "invaders";

const FILES_IMG = [
	"mark_bkg.png", "mark_ng.png", "mark_ok.png",
	"reimu_good_01.png", "marisa_good_01.png"
];

let font, cW, cH, cX, cY;
let score, high;
let btnLeft, btnRight;
let btnRetryDialog;
let gameOverFlg = false;

let player;
let enemies = [];

let numCnt = 0;
let numWave = 1;
let numLevel = 1;

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
	btnLeft = new Button(cX-gSize*4.8, cH-gSize*4, 
		gSize*8, gSize*3.2, "<-L", "#ff595e", true, 
		()=>{onTouchLeft();}, ()=>{onReleaseLR();});

	btnRight = new Button(cX+gSize*4.8, cH-gSize*4, 
		gSize*8, gSize*3.2, "R->", "#595eff", true, 
		()=>{onTouchRight();}, ()=>{onReleaseLR();});

	// RetryDialog
	btnRetryDialog = new Button(cX, cH-gSize*4, gSize*6, gSize*2.2, 
		"RETRY", "#ff595e", true, null, ()=>{showRetryDialog();});

	// Player
	player = new Player("reimu_good_01.png", cX, cY+gSize*5, gSize*2.2);
}

function draw(){
	background("#333333");
	noStroke(); fill("#cccccc");
	textSize(FONT_SIZE); textAlign(CENTER, CENTER);
	drawGrids();// Grids
	if(frameRate() <= 0) return;

	drawMsg("SC:"+score, gSize, cY-gSize*12, 1.4, "#ffffff", LEFT);
	drawMsg("HI:"+high, cW-gSize, cY-gSize*12, 1.4, "#ff595e", RIGHT);
	drawMsg("Lv:"+numLevel, cX, cY-gSize*12, 1.4);
	if(gameOverFlg) drawMsg("GAME OVER!", cX, cY, 1.4, "#ffffff");

	if(!gameOverFlg){
		btnLeft.update();// Left
		btnRight.update();// Right
	}else{
		btnRetryDialog.update();// RetyDialog
	}

	// Player
	player.update();
	overWrapCanvas(player);

	// Enemies
	for(const enemy of enemies){
		enemy.update();
		if(player.contains(enemy.x, enemy.y)) gameOver();
		if(cH-gSize*1 < enemy.y) enemy.setDead();
	}
	cleanupEnemies();

	countUp();// Countup
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
	//console.log("onTouchLeft");
	player.moveLeft(gSize*3);
}

function onTouchRight(){
	//console.log("onTouchRight");
	player.moveRight(gSize*3);
}

function onReleaseLR(){
	//console.log("onReleaseLR");
	player.moveStop();
}

function countUp(){
	numCnt++;// Counter
	if(numCnt < frameRate()*2) return;
	numCnt = 0;

	createEnemy();// Enemy

	numWave++;// Wave
	if(numWave < 10) return;
	numWave = 0;

	numLevel++;// Level
	if(numLevel < 10) return;
	numLevel = 0;
}

function createEnemy(){
	const num = pow(numWave/10, 5/(numLevel+1));
	const rate = round(num*100) / 100;
	const total = round(rate*10) + 1;
	for(let i=0; i<total; i++){
		const x = random(cH);
		const y = random(-gSize*4, -gSize*2);
		const spd = random(gSize*2, gSize*5);
		const rotation = random(80, 100);
		const enemy = new Enemy("marisa_good_01.png", x, y, gSize*2.6);
		enemy.flipX = random() < 0.5;
		enemy.move(spd, rotation);
		enemies.push(enemy);
	}
}

function cleanupEnemies(){
	for(let i=enemies.length-1; 0<=i; i--){
		const enemy = enemies[i];
		if(!enemy.isDead()) continue;
		enemies.splice(i, 1);
	}
}

function gameOver(){
	console.log("gameOver");
	player.moveStop();
	for(const enemy of enemies) enemy.moveStop();
	gameOverFlg = true;
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