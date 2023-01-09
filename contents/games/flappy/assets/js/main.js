console.log("main.js!!");

const TITLE = "Flappy";
const FONT_SIZE = 28;
const ASPECT_W = 9;
const ASPECT_H = 16;

let font, btnHome;
let cX, cY, sX, sY;
let gWidth, gHeight;

function preload(){
	font = loadFont("./assets/fonts/nicokaku_v2.ttf");
}

function setup(){
	console.log("setup");
	const W = window.innerWidth;
	const H = window.innerHeight;
	const canvas = createCanvas(W, H);
	btnHome = new MyButton("caret-l-w.png", ()=>{
		window.location.replace("../../../");
	});
	textFont(font);
	frameRate(8);
	noSmooth();

	// GameArea
	cX = Math.floor(width * 0.5);
	cY = Math.floor(height * 0.5);
	gHeight = Math.floor(height * 0.5);
	gWidth = Math.floor(gHeight * ASPECT_W / ASPECT_H);
	sX = Math.floor(cX - gWidth * 0.5);
	sY = Math.floor(cY - gHeight * 0.5);
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);
	text(TITLE, width - 12, 32);
	btnHome.drawBtn();

	// GameArea
	fill("#DDDDDD");
	rect(sX, sY, gWidth, gHeight);

	// Score
	fill("#333333");
	textSize(FONT_SIZE); textAlign(CENTER, BASELINE);
	text("SCORE:000", cX, cY-gHeight*0.5 - FONT_SIZE);
}

function mousePressed(){
	btnHome.checkBtn();
}

function touchStarted(){
	btnHome.checkBtn();
}