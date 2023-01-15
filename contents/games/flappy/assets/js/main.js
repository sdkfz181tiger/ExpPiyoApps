console.log("main.js!!");

const FONT_SIZE = 28;
const CANVAS_W  = 320;// 480
const CANVAS_H  = 480;// 720 - 110

const FILES_IMG = [
	"caret-l-w.png", "caret-r-w.png",
	"fb_bird_01.png", "fb_bird_02.png", "fb_bird_02.png",
	"fb_bkg.png", "fb_grd.png"
];

let font, cX, cY, score;

let bkgs, grds;
let bird, btn;

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

	// Sprite
	bird = new MyBird("fb_bird_01.png", cX, cY);

	// Button
	btn = new Button("caret-l-w.png", 20, 20, ()=>{
		console.log("Caret!!");
	});
	btn.setScale(0.1);
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);

	for(let bkg of bkgs) bkg.draw();
	for(let grd of grds) grd.draw();

	// Sprite
	bird.draw();
	btn.draw();

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

	if(btn.onPressed(mouseX, mouseY)){
		console.log("Inside!!");
	}else{
		console.log("Outside!!");
	}

	// Test
	bird.setPos(cX, cY);
	bird.moveTo(0, 0, 1000);
}

function createBkgs(img, x, y){
	const bkg1 = new Sprite(img, x, y);
	const bkg2 = new Sprite(img, bkg1.x+bkg1.w, y);
	const bkg3 = new Sprite(img, bkg2.x+bkg2.w, y);
	const bkg4 = new Sprite(img, bkg3.x+bkg3.w, y);
	bkgs.push(bkg1);
	bkgs.push(bkg2);
	bkgs.push(bkg3);
	bkgs.push(bkg4);
}

function createGrds(img, x, y){
	const grd1 = new Sprite(img, x, y);
	const grd2 = new Sprite(img, grd1.x+grd1.w, y);
	const grd3 = new Sprite(img, grd2.x+grd2.w, y);
	const grd4 = new Sprite(img, grd3.x+grd3.w, y);
	grds.push(grd1);
	grds.push(grd2);
	grds.push(grd3);
	grds.push(grd4);
}

function gameOver(){

	setTimeout(()=>{
		noLoop();
	}, 10);
}