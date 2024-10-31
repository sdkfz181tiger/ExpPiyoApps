console.log("main.js!!");

const FONT_SIZE = 28;
const CANVAS_W  = 320;// 480
const CANVAS_H  = 480;// 720 - 110

const FILES_IMG = [
	"caret-l-b.png", "caret-r-b.png"
];

let font, cX, cY;
let rMng;

function preload(){
	font = loadFont("../../assets/fonts/nicokaku_v2.ttf");
	for(let file of FILES_IMG) ImgLoader.loadImg(file);
}

function setup(){

	const cW = (CANVAS_W < 0) ? window.innerWidth:CANVAS_W;
	const cH = (CANVAS_H < 0) ? window.innerHeight:CANVAS_H;
	const canvas = createCanvas(cW, cH);
	canvas.parent("game");
	textFont(font);
	frameRate(4);
	noSmooth();

	cX = Math.floor(width * 0.5);
	cY = Math.floor(height * 0.5);

	const gSize = (width<height)?width/COLS:height/ROWS;
	const sX = cX - (gSize * COLS) * 0.5;
	const sY = cY - (gSize * ROWS) * 0.5;

	// ReversiManager
	rMng = new ReversiManager(sX, sY, gSize);
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);

	// ReversiManager
	rMng.update();

	// Text
	fill("#333333"); noStroke();
	textSize(FONT_SIZE); textAlign(CENTER, TOP);
	text("リバーのシ", cX, FONT_SIZE * 0.5);
}

function mousePressed(){
	if(FLG_MOBILE) return;
	touchBoard();
}

function touchStarted(){
	touchBoard();
}

function touchBoard(){
	rMng.thinkPlayer(mouseX, mouseY);// Player
}

function drawCircle(x, y, r){
	noFill();
	stroke("darkred");
	strokeWeight(10);
	circle(x+r/2, y+r/2, r/2);
}

function drawCross(x, y, s){
	noFill();
	stroke("darkblue");
	strokeWeight(10);
	const cX = x + s/2;
	const cY = y + s/2;
	line(cX, cY, cX-s/4, cY-s/4);
	line(cX, cY, cX+s/4, cY-s/4);
	line(cX, cY, cX-s/4, cY+s/4);
	line(cX, cY, cX+s/4, cY+s/4);
}