console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;
const KEY_HIGH  = "panda";

const FILES_IMG = [
	"reimu_good_01.png", 
	"reimu_bad_01.png"
];

let font, cW, cH, cX, cY;
let cntScore, animals;
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
	for(let i=0; i<10; i++){
		const x = cX;
		const y = random(0, cH-gSize*10);
		const size = random(gSize*2, gSize*6);
		const animal = new Animal(
			"reimu_good_01.png", "reimu_bad_01.png",
			x, y, size);
		animals.push(animal);
	}

	// Panda
	btnPanda = new Button(cX-gSize*4, cY+gSize*8, gSize*6, gSize*2.2, 
		"PANDA", "#5e59ff", true, ()=>{actionPanda();});

	// Bear
	btnBear = new Button(cX+gSize*4, cY+gSize*8, gSize*6, gSize*2.2, 
		"BEAR", "#5e59ff", true, ()=>{actionBear();});

	// RetryDialog
	btnRetryDialog = new Button(cX, cY+gSize*12, gSize*6, gSize*2.2, 
		"RETRY", "#ff595e", true, ()=>{showRetryDialog();});
}

function draw(){
	background("#333333");
	noStroke(); fill("#cccccc");
	textSize(FONT_SIZE); textAlign(CENTER, CENTER);
	drawGrids();// Grids

	drawMsgScore(cX, cY-gSize*11);// Score

	btnPanda.update();// Panda
	btnBear.update();// Bear
	btnRetryDialog.update();// RetyDialog

	// Animals
	if(0 < animals.length){
		for(let i=animals.length-1; 0<=i; i--){
			const animal = animals[i];
			if(animal.isByebye()){// Delete
				animals.splice(i, 1);
				continue;
			}
			animal.update();// Update
		}
	}

	TWEEN.update();// Tween
}

function mousePressed(){
	if(FLG_MOBILE) return;
	touchStarted();
}

function touchStarted(){
	if(mouseY < 0) return;

	// Animals
	for(const animal of animals){
		if(animal.contains(mouseX, mouseY)){
			cntScore++;// Score
			const x = animal.x;
			const y = 0;
			animal.openAndByebye(gSize*2, x, y, 120);
			return;
		}
	}

	btnPanda.touch(mouseX, mouseY);// Panda
	btnBear.touch(mouseX, mouseY);// Bear
	btnRetryDialog.touch(mouseX, mouseY);// RetryDialog
}

function actionPanda(){
	console.log("actionPanda!!");
}

function actionBear(){
	console.log("actionBear!!");
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
	textSize(gSize * 2.0); 
	textAlign(CENTER, CENTER);
	text(cntScore, x, y);
}

function loadScore(){
	const num = localStorage.getItem(KEY_HIGH);
	if(num == null) return 0;
	return num;
}

function saveScore(){
	localStorage.setItem(KEY_HIGH, cntTap);
}