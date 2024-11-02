console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;
const KEY_HIGH  = "panda";

const FILES_IMG = [
	"a_panda.png", 
	"a_bear.png"
];

const TOTAL = 100;

let font, cW, cH, cX, cY;
let cntScore, overFlg, animal;
let btnPanda, btnBear;
let btnRetryDialog;

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

	// Score
	cntScore = 0;
	overFlg = false;

	// Animals
	animal = new Animal("a_panda.png", "a_bear.png", cX, cY, gSize*4);

	// Panda
	btnPanda = new Button(cX-gSize*4, cY+gSize*8, gSize*6, gSize*2.2, 
		"パンダに!", "#5e59ff", true, ()=>{actionPanda();});

	// Bear
	btnBear = new Button(cX+gSize*4, cY+gSize*8, gSize*6, gSize*2.2, 
		"シロクマに!", "#5e59ff", true, ()=>{actionBear();});

	// RetryDialog
	btnRetryDialog = new Button(cX, cY+gSize*12, gSize*6, gSize*2.2, 
		"RETRY", "#ff595e", true, ()=>{showRetryDialog();});
}

function draw(){
	background("#333333");
	noStroke(); fill("#cccccc");
	textSize(FONT_SIZE); textAlign(CENTER, CENTER);
	drawGrids();// Grids

	drawMsgScore(cW-gSize, gSize*2);// Score

	if(!overFlg){
		btnPanda.update();// Panda
		btnBear.update();// Bear
	}else{
		btnRetryDialog.update();// RetyDialog
		drawMsgGameOver(cX, cH-gSize*6);// GameOver
	}

	animal.update();

	TWEEN.update();// Tween
}

function mousePressed(){
	if(FLG_MOBILE) return;
	touchStarted();
}

function touchStarted(){
	if(mouseY < 0) return;

	if(animal.contains(mouseX, mouseY)){
		animal.toggle(gSize*2, gSize*1);
		cntScore++;
	}

	// if(!overFlg){
	// 	btnPanda.touch(mouseX, mouseY);// Panda
	// 	btnBear.touch(mouseX, mouseY);// Bear
	// }else{
	// 	btnRetryDialog.touch(mouseX, mouseY);// RetryDialog
	// }
}

function actionPanda(){
	console.log("actionPanda!!");
	// if(animals.length <= 0) return;
	// const animal = animals[animals.length-1];
	// if(animal.isMoving()) return;
	// if(animal.isClosed()){
	// 	overFlg = true;// GameOver
	// 	return;
	// }
	// const x = 0;
	// const y = animal.y;
	// animal.closeAndByebye(gSize*2, x, y, 120);
	// stepForward();
	// cntScore++;
}

function actionBear(){
	console.log("actionBear!!");
	// if(animals.length <= 0) return;
	// const animal = animals[animals.length-1];
	// if(animal.isMoving()) return;
	// if(animal.isOpened()){
	// 	overFlg = true;// GameOver
	// 	return;
	// }
	// const x = cW;
	// const y = animal.y;
	// animal.openAndByebye(gSize*2, x, y, 120);
	// stepForward();
	// cntScore++;
}

function stepForward(){
	console.log("stepForward");
	const sY = cH - gSize * 10 - padY * animals.length;
	for(let i=0; i<animals.length-1; i++){
		const animal = animals[i];
		const y = sY + padY * i;
		animal.setPosition(animal.x, y);
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

function drawMsgScore(x, y){
	fill("#ffffff");
	textSize(gSize * 1.4); 
	textAlign(RIGHT, CENTER);
	text("スコア:"+cntScore, x, y);
}

function drawMsgGameOver(x, y){
	fill("#ffffff");
	textSize(gSize * 1.4); 
	textAlign(CENTER, CENTER);
	text("ゲームオーバー", x, y);
}

function drawMsgHowto(x, y, str){
	fill("#ffffff");
	textSize(gSize * 0.8); 
	textAlign(LEFT, CENTER);
	text(str, x, y);
}

function loadScore(){
	const num = localStorage.getItem(KEY_HIGH);
	if(num == null) return 0;
	return num;
}

function saveScore(){
	localStorage.setItem(KEY_HIGH, cntTap);
}