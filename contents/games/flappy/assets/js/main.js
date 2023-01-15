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

const SCR_SPD_X = 1.8;

const MODE_INIT  = 0;
const MODE_READY = 1;
const MODE_GAME  = 2;
const MODE_OVER  = 3;

let font, cX, cY, score, mode;

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
	frameRate(60);
	noSmooth();

	cX = Math.floor(width * 0.5);
	cY = Math.floor(height * 0.5);
	score = 999;
	mode = MODE_INIT;

	// Backgrounds
	bkgs = [];
	createBkgs("fb_bkg.png", 0, height-100);

	// Grounds
	grds = [];
	createGrds("fb_grd.png", 0, height);

	// Get Ready
	logoReady = new Button("fb_logo_ready.png", cX, cY, startGame);
	logoReady.visible = false;

	// Game Over
	logoOver = new Button("fb_logo_over.png", cX, cY, startReady);
	logoOver.visible = false;

	// Bird
	bird = new MyBird("fb_bird_01.png", cX, cY);

	startReady();// Ready
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);

	if(mode == MODE_READY) updateReady();
	if(mode == MODE_GAME) updateGame();
	if(mode == MODE_OVER) updateOver();

	// Score
	fill("#333333");
	textSize(FONT_SIZE); textAlign(CENTER, TOP);
	text("SCORE:" + score, cX, FONT_SIZE * 0.5);
}

function startReady(){
	if(mode != MODE_INIT && mode != MODE_OVER) return;
	mode = MODE_READY;
	logoReady.show(cX, cY);
	logoOver.hide();
	bird.reset(cX, cY);
}

function startGame(){
	if(mode != MODE_READY) return;
	mode = MODE_GAME;
	logoReady.hide();
}

function startOver(){
	if(mode != MODE_GAME) return;
	mode = MODE_OVER;
	logoOver.show(cX, cY);
}

function updateReady(){
	// Sprite
	for(let bkg of bkgs) bkg.draw();
	for(let grd of grds) grd.draw();
	logoReady.draw();
	logoOver.draw();
	bird.draw();
}

function updateGame(){
	// Sprite
	for(let bkg of bkgs) bkg.update();
	for(let grd of grds){
		grd.update();
		if(grd.intersects(bird)) startOver();
	}
	logoReady.draw();
	logoOver.draw();
	if(mode == MODE_GAME) bird.update();
}

function updateOver(){
	// Sprite
	for(let bkg of bkgs) bkg.draw();
	for(let grd of grds) grd.draw();
	logoReady.draw();
	logoOver.draw();
	bird.draw();
}

function mousePressed(){
	actionJump();
}

function actionJump(){
	logoReady.press(mouseX, mouseY);
	logoOver.press(mouseX, mouseY);
	if(mode == MODE_GAME) bird.jump();// Jump
}

function createBkgs(img, x, y){
	const bkg1 = new MyScroller(img, x, y);
	const bkg2 = new MyScroller(img, bkg1.x+bkg1.w, y);
	const bkg3 = new MyScroller(img, bkg2.x+bkg2.w, y);
	const bkg4 = new MyScroller(img, bkg3.x+bkg3.w, y);
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
	const grd2 = new MyScroller(img, grd1.x+grd1.w, y);
	const grd3 = new MyScroller(img, grd2.x+grd2.w, y);
	const grd4 = new MyScroller(img, grd3.x+grd3.w, y);
	grd1.startMove(-SCR_SPD_X, 0);
	grd2.startMove(-SCR_SPD_X, 0);
	grd3.startMove(-SCR_SPD_X, 0);
	grd4.startMove(-SCR_SPD_X, 0);
	grds.push(grd1);
	grds.push(grd2);
	grds.push(grd3);
	grds.push(grd4);
}