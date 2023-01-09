console.log("main.js!!");

const TITLE = "Flappy";
const FONT_SIZE = 28;
const ASPECT_W = 9;
const ASPECT_H = 16;

const GRAVITY = 0.8;
const P_COIN_X = 150;
const P_TNL_Y = 50;

let font, btnHome;
let cX, cY, sX, sY;
let gWidth, gHeight;

let bkgGroup, coinGroup, tnlGroup, grdGroup;
let sndJump, sndCoin, sndOmg;
let ready, bird, score;

function preload(){
	font = loadFont("./assets/fonts/nicokaku_v2.ttf");
	
	// Animation
	loadAni("ready", "./assets/images/fb_ready.png");
	loadAni("fly", "./assets/images/fb_bird_01.png", 3);
	loadAni("bkg", "./assets/images/fb_bkg.png");
	loadAni("grd", "./assets/images/fb_grd.png");
	loadAni("tunnel", "./assets/images/fb_tunnel.png");
	loadAni("coin", "./assets/images/fb_coin.png");

	// Group
	bkgGroup = new Group();
	coinGroup = new Group();
	tnlGroup = new Group();
	grdGroup = new Group();
}

function setup(){
	console.log("setup");
	const W = window.innerWidth;
	const H = window.innerHeight;
	const canvas = createCanvas(W, H);
	btnHome = new MyButton("caret-l-w.png", 24, 24, 32, ()=>{
		window.location.replace("../../../");
	});
	textFont(font);
	noLoop();
	noSmooth();

	// GameArea
	cX = Math.floor(width * 0.5);
	cY = Math.floor(height * 0.5);
	gHeight = Math.floor(height * 0.65);
	gWidth = Math.floor(gHeight * ASPECT_W / ASPECT_H);
	sX = Math.floor(cX - gWidth * 0.5);
	sY = Math.floor(cY - gHeight * 0.5);
	
	// All sprites
	allSprites.collider = "static";
	allSprites.shapeColor = color("silver");

	// Background
	createBkg();

	// Ready
	ready = new Sprite("ready", cX, cY, 16, "none");

	// Bird
	bird = new Sprite("fly", cX, cY, 16, "dynamic");
	bird.rotationLock = true;
	bird.rotation = 90;

	// Ground
	createGrd();
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);
	text(TITLE, width - 12, 32);
	btnHome.drawBtn();

	// Left
	const left = camera.x - gWidth * 1.5;

	// Gravity
	bird.vel.y += GRAVITY;
	bird.rotation = bird.vel.y * 4;

	// Camera
	camera.on();
	camera.x = bird.x;
	camera.off();
	
	// GameArea
	fill("#DDDDDD");
	rect(sX, sY, gWidth, gHeight);

	// Background
	for(let bkg of bkgGroup){
		if(bkg.x < left) bkg.x += bkg.width * 4;
	}

	// Ground
	for(let grd of grdGroup){
		if(grd.x < left) grd.x += grd.width * 4;
	}

	// Score
	fill("#333333");
	textSize(FONT_SIZE); textAlign(CENTER, BASELINE);
	text("SCORE:888", cX, cY-gHeight*0.5 - FONT_SIZE);
}

function mousePressed(){
	btnHome.checkBtn();
	actionJump();
}

function touchStarted(){
	btnHome.checkBtn();
	actionJump();
}

function actionJump(){
	console.log("actionJump");

	// Tap to start
	if(!isLooping()){
		loop();
	}

	// Jump
	if(isLooping()){
		bird.vel.x = 2;
		bird.vel.y = -8;
	}
}

function createCoinAndTunnel(x){
	// Coin, Tunnel
	const y = random(150, height-150);
	const coin = new coinGroup.Sprite("coin", x, y, 12, 16);
	const tnla = new tnlGroup.Sprite("tunnel", x, y-P_TNL_Y-180, 52, 360);
	tnla.tag = "a";// Tag
	const tnlb = new tnlGroup.Sprite("tunnel", x, y+P_TNL_Y+180, 52, 360);
	tnlb.tag = "b";// Tag
}

function createBkg(){
	// Background
	const x = cX + gWidth * -1.0;
	const y = cY + gHeight * 0.25;
	const bkg1 = new bkgGroup.Sprite("bkg", x, y, "none");
	const bkg2 = new bkgGroup.Sprite("bkg", bkg1.x+bkg1.width, y, "none");
	const bkg3 = new bkgGroup.Sprite("bkg", bkg2.x+bkg1.width, y, "none");
	const bkg4 = new bkgGroup.Sprite("bkg", bkg3.x+bkg1.width, y, "none");
}

function createGrd(){
	// Ground
	const x = cX + gWidth * -1.0;
	const y = cY + gHeight * 0.5;
	const grd1 = new grdGroup.Sprite("grd", x, y);
	const grd2 = new grdGroup.Sprite("grd", grd1.x+grd1.width, y);
	const grd3 = new grdGroup.Sprite("grd", grd2.x+grd2.width, y);
	const grd4 = new grdGroup.Sprite("grd", grd3.x+grd3.width, y);
}

function drawTitle(){
	fill(255);
	// Title
	textAlign(CENTER, TOP);
	textSize(40);
	text(TITLE, cX, 20);
	// Score
	textAlign(CENTER, TOP);
	textSize(60);
	text(score, cX, 80);
}

function gameOver(){
	fill(255);
	textAlign(CENTER, CENTER);
	textSize(20);
	text("Game Over", cX, cY);
	noLoop();
}