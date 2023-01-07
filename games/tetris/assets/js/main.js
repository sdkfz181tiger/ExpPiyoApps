console.log("main.js!!");

const TITLE = "テトリス";

const ROWS   = 20;
const COLS   = 10;
const MINOS  = [MINO_I, MINO_L, MINO_J, MINO_O, MINO_S, MINO_Z, MINO_T];
const COLORS = ["#A7C957", "#F2E8CF", "#386641", "#6A994E", "#BC4749"];
let cX, cY, rSize, tMng;

let font, btnHome;

function preload(){
	font = loadFont("./assets/fonts/nicokaku_v2.ttf");
}

function setup(){
	console.log("setup");
	const W = window.innerWidth;
	const H = window.innerHeight;
	const canvas = createCanvas(W, H);
	btnHome = new MyButton("caret-l-w.png", ()=>{
		window.location.replace("../../");
	});
	textFont(font);
	frameRate(32);
	noSmooth();

	// Tetris
	cX = width / 2;
	cY = height / 2;
	rSize = height * 0.025;
	tMng = new TetrisManager();
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(28); textAlign(RIGHT, BASELINE);
	text(TITLE, width - 12, 32);
	btnHome.drawBtn();

	// Frame
	fill("#DDDDDD");
	rect(cX-rSize*COLS/2, cY-rSize*ROWS/2, rSize*COLS, rSize*ROWS);
	
	// Tetris
	let data = tMng.check();
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			let sX = cX - (rSize*COLS) / 2;
			let sY = cY - (rSize*ROWS) / 2;
			let n = data[r*COLS+c];
			if(n == 0) continue;
			let x = sX + rSize * c;
			let y = sY + rSize * r;
			fill(COLORS[n%COLORS.length]);
			square(x, y, rSize);
		}
	}

	// Title
	fill("#333333");
	textSize(rSize*1.5); textAlign(CENTER);
	text("TETRIS", cX, cY-rSize*ROWS/2-rSize*1.0);
	textSize(rSize*0.8); textAlign(CENTER);
	text("LEFT key: move left.\nRIGHT key: move right.\nUP key: rotate.\n",
		cX, cY+rSize*ROWS/2+rSize*1.5);
}

function mousePressed(){
	btnHome.checkBtn();
}

function touchStarted(){
	btnHome.checkBtn();
}

function keyPressed(){
	if(keyCode == LEFT_ARROW){
		if(tMng.checkWallL()) return;
		tMng.stepLeft();
		if(tMng.checkCollision()) tMng.stepRight();
	}
	if(keyCode == RIGHT_ARROW){
		if(tMng.checkWallR()) return;
		tMng.stepRight();
		if(tMng.checkCollision()) tMng.stepLeft();
	}
	if(keyCode == UP_ARROW){
		tMng.rotateL();
		if(tMng.checkCollision()){
			tMng.rotateR();
		}else{
			tMng.checkRotation();
		}
	}
	if(keyCode == DOWN_ARROW){
		tMng.stepDown();
		if(tMng.checkCollision()){
			tMng.stepUp();
			tMng.fixMino();
			tMng.createMino();
		}
	}
}