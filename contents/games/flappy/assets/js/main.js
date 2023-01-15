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
let logoReady, logoOver, btnRetry;
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

	// Backgrounds
	bkgs = [];
	createBkgs("fb_bkg.png", 0, height-100);

	// Grounds
	grds = [];
	createGrds("fb_grd.png", 0, height);

	// Logo
	logoReady = new MyLogo("fb_logo_ready.png", cX, cY);
	logoReady.visible = true;
	logoOver = new MyLogo("fb_logo_over.png", cX, cY-50);
	logoOver.visible = false;
	btnRetry = new Button("fb_btn_retry.png", cX, cY+20, ()=>{
		console.log("Retry!!");
	});
	btnRetry.visible = false;

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
	logoReady.draw();
	logoOver.draw();
	btnRetry.draw();
	bird.draw();

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

	if(btnRetry.onPressed(mouseX, mouseY)){
		console.log("Inside!!");

		logoReady.show(cX, cY);
		logoReady.hide();// Test

		bird.x = cX;
		bird.y = cY;
		bird.moveTo(0, 0, 1000);
	}else{
		console.log("Outside!!");
	}
}

function createBkgs(img, x, y){
	const bkg1 = new MyScroller(img, x, y, SCR_SPD_X/2);
	const bkg2 = new MyScroller(img, bkg1.x+bkg1.w, y, SCR_SPD_X/2);
	const bkg3 = new MyScroller(img, bkg2.x+bkg2.w, y, SCR_SPD_X/2);
	const bkg4 = new MyScroller(img, bkg3.x+bkg3.w, y, SCR_SPD_X/2);
	bkgs.push(bkg1);
	bkgs.push(bkg2);
	bkgs.push(bkg3);
	bkgs.push(bkg4);
}

function createGrds(img, x, y){
	const grd1 = new MyScroller(img, x, y, SCR_SPD_X);
	const grd2 = new MyScroller(img, grd1.x+grd1.w, y, SCR_SPD_X);
	const grd3 = new MyScroller(img, grd2.x+grd2.w, y, SCR_SPD_X);
	const grd4 = new MyScroller(img, grd3.x+grd3.w, y, SCR_SPD_X);
	grds.push(grd1);
	grds.push(grd2);
	grds.push(grd3);
	grds.push(grd4);
}