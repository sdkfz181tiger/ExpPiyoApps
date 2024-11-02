console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;
const KEY_HIGH  = "panda";
const TOTAL     = 30;

const FILES_IMG = [
	"a_panda.png", 
	"a_bear.png"
];

let font, cW, cH, cX, cY;
let cntScore, overFlg, animals, padY;
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
	frameRate(48);
	noSmooth();

	// Score
	cntScore = 0;
	overFlg = false;

	// Animals
	animals = [];
	padY = gSize * 3;

	const sY = cY + gSize*5 - padY * TOTAL;
	for(let i=0; i<TOTAL; i++){
		const x = cX + random(gSize*-1, gSize*1);
		const y = sY + padY * i;
		const animal = new Animal("a_panda.png", "a_bear.png", x, y, gSize*4);
		animals.push(animal);
	}

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

	drawMsg("スコア:"+cntScore, cW-gSize, gSize*2, gSize*1.4, RIGHT);// Score

	if(!overFlg){
		btnPanda.update();// Panda
		btnBear.update();// Bear
	}else{
		drawMsg("ゲームオーバー", cX, cY+gSize*8, gSize*1.4, CENTER);// Score
		btnRetryDialog.update();// RetyDialog
	}

	// Animals
	for(const animal of animals) animal.update();
	for(let i=animals.length-1; 0<=i; i--){
		const animal = animals[i];
		if(!animal.isByebye()) continue;
		animals.splice(i, 1);
	}

	TWEEN.update();// Tween
}

function mousePressed(){
	if(FLG_MOBILE) return;
	touchStarted();
}

function touchStarted(){
	if(mouseY < 0) return;
	if(!overFlg){
		btnPanda.touch(mouseX, mouseY);// Panda
		btnBear.touch(mouseX, mouseY);// Bear
	}else{
		btnRetryDialog.touch(mouseX, mouseY);// RetryDialog
	}
}

function actionPanda(){
	console.log("actionPanda!!");
	if(animals.length <= 0) return;
	if(isMovingAll()) return;
	const animal = animals[animals.length-1];
	if(animal.isChecked()) return;
	if(animal.isClosed()){
		overFlg = true;// GameOver
		for(const animal of animals) animal.saySomething("えー...");
		return;
	}
	const x = 0;
	const y = animal.y;
	animal.closeAndByebye(gSize*2, x, y, 120);
	moveDownAll();
	cntScore++;
}

function actionBear(){
	console.log("actionBear!!");
	if(animals.length <= 0) return;
	if(isMovingAll()) return;
	const animal = animals[animals.length-1];
	if(animal.isChecked()) return;
	if(animal.isOpened()){
		console.log("omg");
		overFlg = true;// GameOver
		for(const animal of animals) animal.saySomething("えー...");
		return;
	}
	const x = cW;
	const y = animal.y;
	animal.openAndByebye(gSize*2, x, y, 120);
	moveDownAll();
	cntScore++;
}

function moveDownAll(){
	console.log("moveDownAll");
	for(let i=0; i<animals.length-1; i++){
		const animal = animals[i];
		animal.moveDown(padY, 200);
	}
}

function isMovingAll(){
	for(const animal of animals){
		if(animal.isMoving()) return true;
	}
	return false;
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

function drawMsg(msg, x, y, size, align){
	fill("#ffffff");
	textSize(size);
	textAlign(align, CENTER);
	text(msg, x, y);
}

function loadScore(){
	const num = localStorage.getItem(KEY_HIGH);
	if(num == null) return 0;
	return num;
}

function saveScore(){
	localStorage.setItem(KEY_HIGH, cntTap);
}