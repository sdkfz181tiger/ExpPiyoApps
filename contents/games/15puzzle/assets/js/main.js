console.log("main.js!!");

const FONT_SIZE = 28;
const CANVAS_W  = 320;// 480
const CANVAS_H  = 480;// 720 - 110

const FILES_IMG = [
	"caret-l-w.png", "caret-r-w.png",
	"fb_bird_01.png", "fb_bird_02.png", "fb_bird_03.png",
	"fb_bkg.png", "fb_btn_play.png", "fb_btn_retry.png", 
	"fb_coin.png", "fb_grd.png",
	"fb_logo_over.png", "fb_logo_ready.png",
	"fb_tunnel.png"
];

let font, cX, cY;

function preload(){
	font = loadFont("./assets/fonts/nicokaku_v2.ttf");
	for(let file of FILES_IMG) ImgLoader.loadImg(file);
}

function setup(){

	const cW = (CANVAS_W < 0) ? window.innerWidth:CANVAS_W;
	const cH = (CANVAS_H < 0) ? window.innerHeight:CANVAS_H;
	const canvas = createCanvas(cW, cH);
	textFont(font);
	frameRate(60);
	noSmooth();

	cX = Math.floor(width * 0.5);
	cY = Math.floor(height * 0.5);
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);

	// Score
	fill("#333333");
	textSize(FONT_SIZE); textAlign(CENTER, TOP);
	text("SCORE:000", cX, FONT_SIZE * 0.5);
}