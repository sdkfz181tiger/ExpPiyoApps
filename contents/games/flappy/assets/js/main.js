console.log("main.js!!");

const TITLE = "Flappy";
const FONT_SIZE = 28;

let font, btnHome;

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
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);
	text(TITLE, width - 12, 32);
	btnHome.drawBtn();
	// Score
	// fill("#333333");
	// textSize(FONT_SIZE); textAlign(CENTER, BASELINE);
	// text("MINES:" + MS_MINES, 
	// 	width*0.5, height*0.5-gSize*MS_GRIDS*0.5 - FONT_SIZE);
}

function mousePressed(){
	btnHome.checkBtn();
}

function touchStarted(){
	btnHome.checkBtn();
}