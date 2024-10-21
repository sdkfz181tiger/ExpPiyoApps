console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;

const FILES_IMG = [
	"caret-l-b.png", "caret-r-b.png"
];

let font, cW, cH, cX, cY;
let gSize, rows, cols;

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
	rows = floor(cH / gSize);
	cols = floor(cW / gSize);

	const canvas = createCanvas(cW, cH);
	canvas.parent("game");
	textFont(font);
	frameRate(8);
	noSmooth();
}

function draw(){
	background("#333333");
	noStroke(); fill("#cccccc");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);
	drawGrids();// Grids
}

function mousePressed(){
	if(FLG_MOBILE) return;
	console.log("mousePressed!!");
}

function touchStarted(){
	console.log("touchStarted!!");
}

function drawGrids(){
	stroke("gray"); strokeWeight(1);
	for(let r=0; r<rows+1; r++){
		const y = r * gSize;
		line(0, y, cW, y);
		for(let c=0; c<cols+1; c++){
			const x = c * gSize;
			line(x, 0, x, cH);
		}
	}
}