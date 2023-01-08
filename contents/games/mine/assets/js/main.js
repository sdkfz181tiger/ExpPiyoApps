console.log("main.js!!");

const TITLE = "マインスイーパー";

let rSize, cX, cY, tMng;
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
	frameRate(32);
	noSmooth();

	// Tetris
	rSize = Math.floor(height * 0.032);
	cX = width / 2;
	cY = height / 2 - rSize * 1;
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(28); textAlign(RIGHT, BASELINE);
	text(TITLE, width - 12, 32);
	btnHome.drawBtn();

	// Frame
	fill("#DDDDDD");
	//rect(cX-rSize*T_COLS/2, cY-rSize*T_ROWS/2, rSize*T_COLS, rSize*T_ROWS);

	// Title
	// fill("#333333");
	// textSize(28); textAlign(CENTER);
	// text("SCORE:"+tMng.getScore(), cX, cY-rSize*T_ROWS/2-rSize*1.0);
}

function mousePressed(){
	btnHome.checkBtn();
}

function touchStarted(){
	btnHome.checkBtn();
}
