console.log("main.js!!");

const FONT_SIZE = 28;
const CANVAS_W  = -1;// 320
const CANVAS_H  = -1;// 480

const FILES_IMG = [
	"caret-l-b.png", "caret-r-b.png"
];

let font, cX, cY;
let gSize, sX, sY;

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
	frameRate(8);
	noSmooth();
}

function draw(){
	background("#333366");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);
}

function mousePressed(){
	if(FLG_MOBILE) return;
	console.log("mousePressed!!");
}

function touchStarted(){
	console.log("touchStarted!!");
}

function drawCircle(x, y, r){
	noFill();
	stroke("darkred");
	strokeWeight(10);
	circle(x+r/2, y+r/2, r/2);
}