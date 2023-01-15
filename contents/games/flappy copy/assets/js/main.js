console.log("main.js!!");

const FONT_SIZE    = 28;
const CANVAS_W     = 320;// 480
const CANVAS_H     = 480;// 720 - 110

const BIRD_GRAVITY = 0.4;
const BIRD_VEL     = 1.2;
const BIRD_JUMP    = 5;
const COIN_MIN_Y   = -100;
const COIN_MAX_Y   = 10;
const PAD_NEXT_X   = 120;
const PAD_TNL_Y    = 70;

let font, cX, cY;

let bkgGroup, coinGroup, tnlGroup, grdGroup;
let score, logoReady, logoOver, bird, btnRetry;

function preload(){
	font = loadFont("./assets/fonts/nicokaku_v2.ttf");
	
	// Animation
	loadAni("bird",       "./assets/images/fb_bird_01.png", 3);
	loadAni("btn_play",   "./assets/images/fb_btn_play.png");
	loadAni("btn_retry",  "./assets/images/fb_btn_retry.png");
	loadAni("bkg",        "./assets/images/fb_bkg.png");
	loadAni("coin",       "./assets/images/fb_coin.png");
	loadAni("grd",        "./assets/images/fb_grd.png");
	loadAni("logo_over",  "./assets/images/fb_logo_over.png");
	loadAni("logo_ready", "./assets/images/fb_logo_ready.png");
	loadAni("logo_tap",   "./assets/images/fb_logo_tap.png");
	loadAni("tunnel",     "./assets/images/fb_tunnel.png");

	// Group
	bkgGroup  = new Group();
	coinGroup = new Group();
	tnlGroup  = new Group();
	grdGroup  = new Group();
}

function setup(){

	const cW = (CANVAS_W < 0) ? window.innerWidth:CANVAS_W;
	const cH = (CANVAS_H < 0) ? window.innerHeight:CANVAS_H;
	const canvas = createCanvas(cW, cH);
	textFont(font);
	noLoop();
	noSmooth();

	cX = Math.floor(width * 0.5);
	cY = Math.floor(height * 0.5);

	// All sprites
	allSprites.collider = "static";
	allSprites.shapeColor = color("#AAAAAA");

	// Background
	createBkg();

	// Score
	score = 0;

	// Coin and Tunnel
	createCoinAndTunnel(cX + PAD_NEXT_X * 1);
	createCoinAndTunnel(cX + PAD_NEXT_X * 2);
	createCoinAndTunnel(cX + PAD_NEXT_X * 3);
	createCoinAndTunnel(cX + PAD_NEXT_X * 4);
	createCoinAndTunnel(cX + PAD_NEXT_X * 5);

	// Ground
	createGrd();

	// Ready, Over
	logoReady = new Sprite("logo_ready", cX, cY, 16, "none");
	logoReady.visible = true;
	logoOver = new Sprite("logo_over", cX, cY-60, 16, "none");
	logoOver.visible = true;

	// Retry
	btnRetry = new Sprite("btn_retry", cX, 0, "none");
	p5.tween.manager.addTween(btnRetry, "moveto")
			.addMotions([{key:"x", target: cX}, {key:"y", target: cY}], 1000)
			.startTween();

	// Bird
	bird = new Sprite("bird", cX, cY, 16, "dynamic");
	bird.rotationLock = true;
	bird.rotation = 90;

	// Coin x Bird
	coinGroup.overlap(bird, (a, b)=>{
		if(!a.visible) return;
		a.visible = false;// Invisible
		score += 1;// Score
	});

	// Tunnel x Bird
	tnlGroup.collide(bird, (a, b)=>{
		gameOver();// GameOver
	});

	// Ground x Bird
	grdGroup.collide(bird, (a, b)=>{
		gameOver();// GameOver
	});
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);

	// Left
	const left = camera.x - width * 0.5;

	// Bird
	bird.vel.y += BIRD_GRAVITY;
	bird.rotation = bird.vel.y * 4;

	// Camera
	camera.on();
	camera.x = bird.x;
	camera.off();

	// Background
	for(let bkg of bkgGroup){
		if(left < bkg.x+bkg.width*0.5) continue
		bkg.x += bkg.width * 4;
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
		if(left < grd.x+grd.width*0.5) continue;
		grd.x += grd.width * 4;
	}

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

	if(isSpritePressed(btnRetry)){
		console.log("Retry!!");
	}

	// Tap to start
	// if(!isLooping()){
	// 	logoReady.visible = false;
	// 	logoOver.visible = false;
	// 	btnRetry.visible = false;
	// 	loop();
	// }

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
	const x = 0;
	const y = cY + height * 0.25;
	const bkg1 = new bkgGroup.Sprite("bkg", x, y, "none");
	const bkg2 = new bkgGroup.Sprite("bkg", bkg1.x+bkg1.width, y, "none");
	const bkg3 = new bkgGroup.Sprite("bkg", bkg2.x+bkg1.width, y, "none");
	const bkg4 = new bkgGroup.Sprite("bkg", bkg3.x+bkg1.width, y, "none");
}

function createGrd(){
	// Ground
	const x = 0;
	const y = cY + height * 0.5;
	const grd1 = new grdGroup.Sprite("grd", x, y);
	const grd2 = new grdGroup.Sprite("grd", grd1.x+grd1.width, y);
	const grd3 = new grdGroup.Sprite("grd", grd2.x+grd2.width, y);
	const grd4 = new grdGroup.Sprite("grd", grd3.x+grd3.width, y);
}

function gameOver(){
	logoOver.x = camera.x;
	logoOver.visible = true;
	btnRetry.x = camera.x;
	btnRetry.y = 0;
	btnRetry.visible = true;
	setTimeout(()=>{
		noLoop();
	}, 10);
}

function isSpritePressed(spr){
	if(!spr.visible) return false;
	if(mouseX < spr.x-spr.hw) return false;
	if(spr.x+spr.hw < mouseX) return false;
	if(mouseY < spr.y-spr.hh) return false;
	if(spr.y+spr.hh < mouseY) return false;
	return true;
}