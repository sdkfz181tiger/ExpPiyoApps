console.log("main.js!!");

const TITLE = "Flappy";
const FONT_SIZE = 28;
const ASPECT_W = 10;
const ASPECT_H = 16;

const BIRD_GRAVITY = 0.4;
const BIRD_VEL     = 1.2;
const BIRD_JUMP    = 5;
const COIN_MIN_Y   = -100;
const COIN_MAX_Y   = 10;
const PAD_NEXT_X   = 120;
const PAD_TNL_Y    = 70;

let font, btnHome;
let cX, cY, sX, sY;
let gWidth, gHeight;

let bkgGroup, coinGroup, tnlGroup, grdGroup;
let sndJump, sndCoin, sndOmg;
let score, logoReady, logoOver, bird;

function preload(){
	font = loadFont("./assets/fonts/nicokaku_v2.ttf");
	
	// Animation
	loadAni("ready",  "./assets/images/fb_ready.png");
	loadAni("over",   "./assets/images/fb_over.png");
	loadAni("fly",    "./assets/images/fb_bird_01.png", 3);
	loadAni("bkg",    "./assets/images/fb_bkg.png");
	loadAni("grd",    "./assets/images/fb_grd.png");
	loadAni("tunnel", "./assets/images/fb_tunnel.png");
	loadAni("coin",   "./assets/images/fb_coin.png");

	// Group
	bkgGroup  = new Group();
	coinGroup = new Group();
	tnlGroup  = new Group();
	grdGroup  = new Group();
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
	allSprites.shapeColor = color("#AAAAAA");

	// Background
	createBkg();

	// Score
	score = 0;

	// Ready, Over
	logoReady = new Sprite("ready", cX, cY, 16, "none");
	logoReady.visible = true;
	logoOver = new Sprite("over", cX, cY, 16, "none");
	logoOver.visible = false;

	// Bird
	bird = new Sprite("fly", cX, cY, 16, "dynamic");
	bird.rotationLock = true;
	bird.rotation = 90;

	// Coin x Bird
	coinGroup.overlap(bird, (a, b)=>{
		console.log("Coin x Bird");
		if(!a.visible) return;
		a.visible = false;// Invisible
		score += 1;// Score
	});

	// Tunnel x Bird
	tnlGroup.collide(bird, (a, b)=>{
		console.log("Tunnel x Bird");
		gameOver();// GameOver
	});

	// Ground x Bird
	grdGroup.collide(bird, (a, b)=>{
		console.log("Ground x Bird");
		gameOver();// GameOver
	});

	// Coin and Tunnel
	createCoinAndTunnel(cX + PAD_NEXT_X * 1);
	createCoinAndTunnel(cX + PAD_NEXT_X * 2);
	createCoinAndTunnel(cX + PAD_NEXT_X * 3);
	createCoinAndTunnel(cX + PAD_NEXT_X * 4);
	createCoinAndTunnel(cX + PAD_NEXT_X * 5);

	// Ground
	createGrd();
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);
	text(TITLE, width - 12, 32);
	btnHome.drawBtn();

	// GameArea
	fill("#DDDDDD");
	rect(sX, sY, gWidth, gHeight);

	// Left
	const left = camera.x - gWidth * 1.0;

	// Gravity
	bird.vel.y += BIRD_GRAVITY;
	bird.rotation = bird.vel.y * 4;

	// Camera
	camera.on();
	camera.x = bird.x;
	camera.off();

	// Background
	for(let bkg of bkgGroup){
		if(bkg.x < left) bkg.x += bkg.width * 4;
	}

	// Coin
	let nextY = cY;
	for(let coin of coinGroup){
		if(coin.x < left){
			nextY += random(COIN_MIN_Y, COIN_MAX_Y);// Random
			coin.x += PAD_NEXT_X * 5;
			coin.y = nextY;
			coin.visible = true;
		}
	}

	// Tunnel
	const padY = random(160, 190);
	for(let tnl of tnlGroup){
		if(tnl.x < left){
			tnl.x += PAD_NEXT_X * 5;
			if(tnl.tag == "a"){
				tnl.y = nextY - PAD_TNL_Y - padY;
			}
			if(tnl.tag == "b"){
				tnl.y = nextY + PAD_TNL_Y + padY;
			}
		}
	}

	// Ground
	for(let grd of grdGroup){
		if(grd.x < left) grd.x += grd.width * 4;
	}

	// Score
	fill("#333333");
	textSize(FONT_SIZE); textAlign(CENTER, BASELINE);
	text("SCORE:" + score, cX, cY-gHeight*0.5 - FONT_SIZE);
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
		logoReady.visible = false;
		logoOver.visible = false;
		loop();
	}

	// Jump
	if(isLooping()){
		bird.vel.x = BIRD_VEL;
		bird.vel.y = BIRD_JUMP * -1.0;
	}
}

function createCoinAndTunnel(x){
	// Coin, Tunnel
	const y = cY + random(COIN_MIN_Y, COIN_MAX_Y);
	const coin = new coinGroup.Sprite("coin", x, y, 12, 16);
	const tnla = new tnlGroup.Sprite("tunnel", x, y-PAD_TNL_Y-180, 52, 360);
	tnla.tag = "a";// Tag
	const tnlb = new tnlGroup.Sprite("tunnel", x, y+PAD_TNL_Y+180, 52, 360);
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

function gameOver(){
	logoOver.x = camera.x;
	logoOver.visible = true;
	setTimeout(()=>{
		noLoop();
	}, 10);
}