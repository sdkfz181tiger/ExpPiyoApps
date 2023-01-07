console.log("main.js!!");

const TITLE = "テトリス";

const ROWS   = 20;
const COLS   = 10;
const MINOS  = [MINO_I, MINO_L, MINO_J, MINO_O, MINO_S, MINO_Z, MINO_T];
const COLORS = ["#A7C957", "#F2E8CF", "#386641", "#6A994E", "#BC4749"];
const R_SIZE = 18;
let cX, cY, tMng;

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
	colorMode(RGB);
	frameRate(32);
	noSmooth();

	// Tetris
	cX = width / 2;
	cY = height / 2;
	tMng = new TetrisManager();
}

function draw(){
	background("whitesmoke");
	noStroke(); fill(33, 33, 33);
	textSize(28); textAlign(RIGHT, BASELINE);
	text(TITLE, width - 12, 32);
	btnHome.drawBtn();

	// Tetris
	let data = tMng.check();
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			let sX = cX - (R_SIZE*COLS) / 2;
			let sY = cY - (R_SIZE*ROWS) / 2;
			let n = data[r*COLS+c];
			if(n == 0) continue;
			let x = sX + R_SIZE * c;
			let y = sY + R_SIZE * r;
			fill(COLORS[n%COLORS.length]);
			square(x, y, R_SIZE);
		}
	}
	// Frame
	fill("silver");
	rect(cX-R_SIZE*COLS/2, cY-R_SIZE*ROWS/2, R_SIZE*COLS, R_SIZE/-5);
	rect(cX-R_SIZE*COLS/2, cY+R_SIZE*ROWS/2, R_SIZE*COLS, R_SIZE/5);
	rect(cX-R_SIZE*COLS/2, cY-R_SIZE*ROWS/2, R_SIZE/-5, R_SIZE*ROWS);
	rect(cX+R_SIZE*COLS/2, cY-R_SIZE*ROWS/2, R_SIZE/5,  R_SIZE*ROWS);
	
	// Title
	textAlign(CENTER);
	textSize(R_SIZE*1.5);
	text("TETRIS", cX, cY-R_SIZE*ROWS/2-R_SIZE*1.0);
	textSize(R_SIZE*0.8);
	text("LEFT key: move left.\nRIGHT key: move right.\nUP key: rotate.\n",
		cX, cY+R_SIZE*ROWS/2+R_SIZE*1.5);
}

function mousePressed(){
	btnHome.checkBtn();
}

function touchStarted(){
	btnHome.checkBtn();
}