console.log("main.js!!");

const FONT_SIZE = 28;
const CANVAS_W  = 320;// 480
const CANVAS_H  = 480;// 720 - 110

const FILES_IMG = [
	"caret-l-w.png", "caret-r-w.png",
	"fb_bird_01.png", "fb_bird_02.png", "fb_bird_02.png",
	"fb_bkg.png", "fb_btn_play.png", "fb_btn_retry.png", "fb_grd.png",
	"fb_logo_over.png", "fb_logo_ready.png",
];

const SCR_SPD_X = 0.4;

let font, cX, cY, score;

let bkgs, grds;
let logoReady, logoOver;
let bird;

function preload(){
	font = loadFont("./assets/fonts/nicokaku_v2.ttf");
	for(let file of FILES_IMG) ImgLoader.loadImg(file);
}

function setup(){

	const cW = (CANVAS_W < 0) ? window.innerWidth:CANVAS_W;
	const cH = (CANVAS_H < 0) ? window.innerHeight:CANVAS_H;
	const canvas = createCanvas(cW, cH);
	textFont(font);
	frameRate(48);
	noSmooth();

	cX = Math.floor(width * 0.5);
	cY = Math.floor(height * 0.5);
	score = 999;

	// Backgrounds
	bkgs = [];
	createBkgs("fb_bkg.png", 0, height-100);

	// Grounds
	grds = [];
	createGrds("fb_grd.png", 0, height);

	// Get Ready
	logoReady = new Button("fb_logo_ready.png", cX, cY, ()=>{
		console.log("Start!!");
	});
	logoReady.visible = true;
	logoReady.show(cX, cY);

	// Game Over
	logoOver = new Button("fb_logo_over.png", cX, cY, ()=>{
		console.log("Retry!!");
	});
	logoOver.visible = false;
	//logoOver.show(cX, cY);

	// Bird
	bird = new MyBird("fb_bird_01.png", cX, cY);
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);

	// Sprite
	for(let bkg of bkgs) bkg.update();
	for(let grd of grds) grd.update();
	logoReady.update();
	logoOver.update();
	bird.update();

	// Score
	fill("#333333");
	textSize(FONT_SIZE); textAlign(CENTER, TOP);
	text("SCORE:" + score, cX, FONT_SIZE * 0.5);
}

function mousePressed(){
	actionJump();
}

function touchStarted(){
	actionJump();
}

function actionJump(){
	//console.log("Jump!!");

	logoReady.press(mouseX, mouseY);
	logoOver.press(mouseX, mouseY);

	bird.jump();// Test
}

function createBkgs(img, x, y){
	const bkg1 = new MyScroller(img, x, y);
	const bkg2 = new MyScroller(img, bkg1.rect.x+bkg1.rect.w, y);
	const bkg3 = new MyScroller(img, bkg2.rect.x+bkg2.rect.w, y);
	const bkg4 = new MyScroller(img, bkg3.rect.x+bkg3.rect.w, y);
	bkg1.startMove(SCR_SPD_X/-2, 0);
	bkg2.startMove(SCR_SPD_X/-2, 0);
	bkg3.startMove(SCR_SPD_X/-2, 0);
	bkg4.startMove(SCR_SPD_X/-2, 0);
	bkgs.push(bkg1);
	bkgs.push(bkg2);
	bkgs.push(bkg3);
	bkgs.push(bkg4);
}

function createGrds(img, x, y){
	const grd1 = new MyScroller(img, x, y);
	const grd2 = new MyScroller(img, grd1.rect.x+grd1.rect.w, y);
	const grd3 = new MyScroller(img, grd2.rect.x+grd2.rect.w, y);
	const grd4 = new MyScroller(img, grd3.rect.x+grd3.rect.w, y);
	grd1.startMove(-SCR_SPD_X, 0);
	grd2.startMove(-SCR_SPD_X, 0);
	grd3.startMove(-SCR_SPD_X, 0);
	grd4.startMove(-SCR_SPD_X, 0);
	grds.push(grd1);
	grds.push(grd2);
	grds.push(grd3);
	grds.push(grd4);
}