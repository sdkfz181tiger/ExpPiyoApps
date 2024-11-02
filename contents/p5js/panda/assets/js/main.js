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
let cntTap, animal;
let btnNext;
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

	// Counter
	cntTap = loadCounter();

	// Animal
	animal = new Animal(
		"reimu_good_01.png", "reimu_bad_01.png",
		cX, cY, gSize*5);

	// Next
	btnNext = new Button(cX, cY+gSize*6, gSize*6, gSize*2.2, 
		"NEXT", "#5e59ff", true, ()=>{nextAnimal();});

	// RetryDialog
	btnRetryDialog = new Button(cX, cY+gSize*12, gSize*6, gSize*2.2, 
		"RETRY", "#ff595e", true, ()=>{showRetryDialog();});
}

function draw(){
	background("#333333");
	noStroke(); fill("#cccccc");
	textSize(FONT_SIZE); textAlign(CENTER, CENTER);
	drawGrids();// Grids

	drawMsgCounter(cX, cY-gSize*11);// Counter

	animal.update();// Animal
	btnNext.update();// Next
	btnRetryDialog.update();// RetyDialog

	TWEEN.update();// Tween
}

function mousePressed(){
	if(FLG_MOBILE) return;
	touchStarted();
}

function touchStarted(){
	if(mouseY < 0) return;

	btnNext.touch(mouseX, mouseY);// Next
	btnRetryDialog.touch(mouseX, mouseY);// RetryDialog

	if(animal.contains(mouseX, mouseY)){
		animal.toggle(gSize*2, gSize);
	}
}

function nextAnimal(){
	console.log("nextAnimal!!");
	const x = random(cW);
	const y = random(cH);
	animal.moveTo(x, y, 100, (pos)=>{
		console.log("moved:", pos);
	});
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

function drawMsgCounter(x, y){
	fill("#ffffff");
	textSize(gSize * 2.0); 
	textAlign(CENTER, CENTER);
	text(cntTap, x, y);
}

function loadCounter(){
	const num = localStorage.getItem(KEY_HIGH);
	if(num == null) return 0;
	return num;
}

function saveCounter(){
	localStorage.setItem(KEY_HIGH, cntTap);
}