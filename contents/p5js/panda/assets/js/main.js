console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;
const KEY_HIGH  = "panda";

const FILES_IMG = [
	"a_panda.png", 
	"a_bear.png"
];

const TOTAL = 30;

let font, cW, cH, cX, cY;
let cntScore, animals, padY;
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
	cntScore = loadScore();

	// Animals
	animals = [];

	padY = gSize * 3;
	const sY = cH - gSize * 10 - padY * TOTAL;
	for(let i=0; i<TOTAL; i++){
		const x = cX + random(-gSize*2, gSize*2);
		const y = sY + padY * i;
		const size = random(gSize*4, gSize*6);
		const animal = new Animal(
			"a_panda.png", "a_bear.png",
			x, y, size);
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

	drawMsgScore(gSize, gSize*2);// Score

	btnPanda.update();// Panda
	btnBear.update();// Bear
	btnRetryDialog.update();// RetyDialog

	// Clean
	if(0 < animals.length){
		for(let i=animals.length-1; 0<=i; i--){
			const animal = animals[i];
			if(animal.isByebye()){// Delete
				animals.splice(i, 1);
				continue;
			}
		}
	}

	// Draw
	for(const animal of animals){
		//if(animal.y < 0) continue;
		animal.update();// Update
	}

	TWEEN.update();// Tween
}

function mousePressed(){
	if(FLG_MOBILE) return;
	touchStarted();
}

function touchStarted(){
	if(mouseY < 0) return;

	btnPanda.touch(mouseX, mouseY);// Panda
	btnBear.touch(mouseX, mouseY);// Bear
	btnRetryDialog.touch(mouseX, mouseY);// RetryDialog
}

function actionPanda(){
	console.log("actionPanda!!");
	if(animals.length <= 0) return;
	const animal = animals[animals.length-1];
	const x = 0;
	const y = animal.y;
	animal.openAndByebye(gSize*2, x, y, 120);
	stepForward();
}

function actionBear(){
	console.log("actionBear!!");
	if(animals.length <= 0) return;
	const animal = animals[animals.length-1];
	const x = cW;
	const y = animal.y;
	animal.openAndByebye(gSize*2, x, y, 120);
	stepForward();
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
	textAlign(LEFT, CENTER);
	text("スコア:"+cntScore, x, y);
}

function loadScore(){
	const num = localStorage.getItem(KEY_HIGH);
	if(num == null) return 0;
	return num;
}

function saveScore(){
	localStorage.setItem(KEY_HIGH, cntTap);
}