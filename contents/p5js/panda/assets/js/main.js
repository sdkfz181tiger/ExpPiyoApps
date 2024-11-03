console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;
const KEY_HIGH  = "panda_v0.4";
const TOTAL     = 512;

const FILES_IMG = [
	"a_panda.png", "a_bear.png"
];

const FILES_SOUND_SUCCESS = [
	"./assets/sounds/se_success_01.mp3",
	"./assets/sounds/se_success_02.mp3",
	"./assets/sounds/se_success_03.mp3"
];
const FILES_SOUND_FAILED = [
	"./assets/sounds/se_failed_01.mp3"
];
const sounds_success = [];
const sounds_failed = [];

let font, cW, cH, cX, cY;
let cntScore, cntHigh, cntDown;
let overFlg, animals, padY;
let btnPanda, btnBear;
let btnRetryDialog, btnShareWithX;

function preload(){
	font = loadFont("../../assets/fonts/nicokaku_v2.ttf");
	for(let file of FILES_IMG) ImgLoader.loadImg(file);
	for(let file of FILES_SOUND_SUCCESS) sounds_success.push(loadSound(file));
	for(let file of FILES_SOUND_FAILED) sounds_failed.push(loadSound(file));
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
	cntHigh = loadHigh();
	cntDown = new Countdown(cW-gSize*2.5, gSize*1.8, gSize*2, ()=>{
		gameOver();// GameOver
	});

	overFlg = false;
	animals = [];
	padY = gSize * 3;

	const sY = cY + gSize*5 - padY * TOTAL;
	for(let i=0; i<TOTAL; i++){
		const x = cX + random(gSize*-1, gSize*1);
		const y = sY + padY * i;
		const size = random(gSize*3, gSize*5);
		const animal = new Animal("a_panda.png", "a_bear.png", x, y, size);
		animals.push(animal);
	}

	// Panda
	btnPanda = new Button(cX-gSize*4, cY+gSize*8, gSize*6, gSize*2.2, 
		"パンダに!", "#5e59ff", true, ()=>{actionPanda();});

	// Bear
	btnBear = new Button(cX+gSize*4, cY+gSize*8, gSize*6, gSize*2.2, 
		"シロクマに!", "#5e59ff", true, ()=>{actionBear();});

	// RetryDialog
	btnRetryDialog = new Button(cX+gSize*4, cY+gSize*11, gSize*6, gSize*2.2, 
		"RETRY", "#ff595e", true, ()=>{showRetryDialog();});

	// ShareWithX
	btnShareWithX = new Button(cX-gSize*4, cY+gSize*11, gSize*6, gSize*2.2, 
		"Xでシェア", "#1da1f2", true, ()=>{shareWithX();});
}

function draw(){
	background("#333333");
	noStroke(); fill("#cccccc");
	textSize(FONT_SIZE); textAlign(CENTER, CENTER);
	drawGrids();// Grids

	drawMsg("スコア:"+cntScore, gSize, gSize*1.5, gSize*1.4, LEFT);// Score
	drawMsg("ハイ:"+cntHigh, gSize, gSize*3.0, gSize*1.0, LEFT, "#ff595e");// High

	drawMsg("パンダをシロクマに、", gSize, gSize*5, gSize*0.7, LEFT);
	drawMsg("シロクマをパンダに",    gSize, gSize*6, gSize*0.7, LEFT);
	drawMsg("転職させるゲームだよ。", gSize, gSize*7, gSize*0.7, LEFT);
	drawMsg("間違えたら",           gSize, gSize*8, gSize*0.7, LEFT);
	drawMsg("ゲームオーバーだよ!!",  gSize, gSize*9, gSize*0.7, LEFT);
	drawMsg("レッツらゴー!!",       gSize, gSize*10, gSize*0.7, LEFT);

	// Countdown
	cntDown.update();

	if(!overFlg){
		cntDown.tick(floor(9));// Tick
		btnPanda.update();// Panda
		btnBear.update();// Bear
	}else{
		drawMsg("ゲームオーバー", cX, cY+gSize*8, gSize*1.4, CENTER);// Score
		btnRetryDialog.update();// RetyDialog
		btnShareWithX.update();// ShareWithX
	}

	// Animals
	for(const animal of animals){
		if(animal.y < 0) continue;
		animal.update();
	}
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
		btnShareWithX.touch(mouseX, mouseY);// ShareWithX
	}
}

function actionPanda(){
	console.log("actionPanda!!");
	if(animals.length <= 0) return;
	if(isMovingAll()) return;
	const animal = animals[animals.length-1];
	if(animal.isChecked()) return;
	if(animal.isClosed()){
		gameOver();
		return;
	}
	const x = 0;
	const y = animal.y;
	animal.closeAndByebye(gSize*2, x, y, 60);
	moveDownAll();
	cntScore++;
	playSoundRandom(sounds_success);// Success
}

function actionBear(){
	console.log("actionBear!!");
	if(animals.length <= 0) return;
	if(isMovingAll()) return;
	const animal = animals[animals.length-1];
	if(animal.isChecked()) return;
	if(animal.isOpened()){
		gameOver();
		return;
	}
	const x = cW;
	const y = animal.y;
	animal.openAndByebye(gSize*2, x, y, 60);
	moveDownAll();
	cntScore++;
	playSoundRandom(sounds_success);// Success
}

function moveDownAll(){
	console.log("moveDownAll");
	for(let i=0; i<animals.length-1; i++){
		const animal = animals[i];
		animal.moveDown(padY, 100);
	}
}

function isMovingAll(){
	for(const animal of animals){
		if(animal.isMoving()) return true;
	}
	return false;
}

function gameOver(){
	overFlg = true;// GameOver
	saveHigh();
	const msgs = ["えー...", "たのむよ...", "むきー!!"];
	for(const animal of animals){
		const rdm = floor(random(msgs.length));
		animal.saySomething(msgs[rdm]);
	}
	playSoundRandom(sounds_failed);// Failed
}

function playSoundRandom(arr){
	const rdm = floor(random(arr.length));
	arr[rdm].play();
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

function drawMsg(msg, x, y, size, align, color="#ffffff"){
	fill(color);
	textSize(size);
	textAlign(align, CENTER);
	text(msg, x, y);
}

function loadHigh(){
	const num = localStorage.getItem(KEY_HIGH);
	if(num == null) return 0;
	return num;
}

function saveHigh(){
	cntHigh = max(cntHigh, cntScore);
	localStorage.setItem(KEY_HIGH, cntHigh);
}