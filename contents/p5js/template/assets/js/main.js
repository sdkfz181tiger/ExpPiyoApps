console.log("main.js!!");

const FONT_SIZE = 28;
const GAME_W = 320;
const GAME_H = 480;

const FILES_IMG = [
	"caret-l-b.png", "caret-r-b.png"
];

let font, cX, cY, sX, sY;

function preload(){
	font = loadFont("../../assets/fonts/nicokaku_v2.ttf");
	for(let file of FILES_IMG) ImgLoader.loadImg(file);
}

function setup(){
	const cW = window.innerWidth;
	const cH = window.innerHeight;
	const canvas = createCanvas(cW, cH);
	canvas.parent("game");
	textFont(font);
	frameRate(8);
	noSmooth();

	cX = cW / 2;
	cY = cH / 2;
	sX = cX - GAME_W / 2;
	sY = cY - GAME_H / 2;
}

function draw(){
	background("#333366");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);
	rect(sX, sY, GAME_W, GAME_H);
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