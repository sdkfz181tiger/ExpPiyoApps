console.log("main.js!!");

const FONT_SIZE = 28;
const CANVAS_W  = 320;// 480
const CANVAS_H  = 480;// 720 - 110

const FILES_IMG = [
	"caret-l-b.png", "caret-r-b.png"
];

const palette = ["#233D4D", "#FE7F2D", "#FCCA46"];

let font, cX, cY;
let cMng;

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
	frameRate(32);
	noSmooth();

	cX = Math.floor(width * 0.5);
	cY = Math.floor(height * 0.5);

	const sX = cX - (T_SIZE * COLS) * 0.5;
	const sY = cY - (T_SIZE * ROWS) * 0.5 + T_SIZE;

	// CandyCrasher
	cMng = new CandyManager(sX, sY, palette.length);
	cMng.traceMtx();// Trace
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);

	// CandyCrasher
	let mtx = cMng.getMtx();
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			let tile = mtx[r][c];
			if(tile == null) continue;
			tile.update();// Update
		}
	}
	TWEEN.update();// Tween

	// Text
	fill("#333333"); noStroke();
	textSize(FONT_SIZE); textAlign(CENTER, TOP);
	text("キャンディ壊し", cX, FONT_SIZE * 0.5);
}

function mousePressed(){
	if(FLG_MOBILE) return;
	touchBoard();
}

function touchStarted(){
	touchBoard();
}

function touchBoard(){
	// CandyCrasher
	cMng.touchTiles(mouseX, mouseY);
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