console.log("main.js!!");

const TITLE = "テトリス";
const FONT_SIZE = 28;

let rSize, cX, cY, tMng;
let font, btnHome;
let btnLeft, btnRight, btnDown, btnRoll;

function preload(){
	font = loadFont("./assets/fonts/nicokaku_v2.ttf");
}

function setup(){
	console.log("setup");
	const W = window.innerWidth;
	const H = window.innerHeight;
	const canvas = createCanvas(W, H);
	btnHome = new MyButton("caret-l-w.png", ()=>{
		window.location.replace("../../../");
	});
	btnLeft = new MyButton("caret-l-w.png", ()=>{
		actionLeft();
	});
	btnRight = new MyButton("caret-r-w.png", ()=>{
		actionRight();
	});
	btnDown = new MyButton("caret-d-w.png", ()=>{
		actionDown();
	});
	btnRoll = new MyButton("arrow-roll-r-w.png", ()=>{
		actionRoll();
	});
	textFont(font);
	frameRate(32);
	noSmooth();

	// Tetris
	rSize = Math.floor(height * 0.032);
	cX = width / 2;
	cY = height / 2 - rSize * 1;
	tMng = new TetrisManager();

	// Reposition
	btnLeft.setPos(cX-rSize*5.5, cY+rSize*(T_ROWS+4)*0.5, rSize * 1.5);
	btnRight.setPos(cX-rSize*2.5, cY+rSize*(T_ROWS+4)*0.5, rSize * 1.5);
	btnDown.setPos(cX-rSize*4, cY+rSize*(T_ROWS+7)*0.5, rSize * 1.5);
	btnRoll.setPos(cX+rSize*4.5, cY+rSize*(T_ROWS+5)*0.5, rSize * 3);
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);
	text(TITLE, width - 12, 32);
	btnHome.drawBtn();
	btnLeft.drawBtn();
	btnRight.drawBtn();
	btnDown.drawBtn();
	btnRoll.drawBtn();

	// Frame
	fill("#DDDDDD");
	rect(cX-rSize*T_COLS/2, cY-rSize*T_ROWS/2, rSize*T_COLS, rSize*T_ROWS);

	// Tetris
	let data = tMng.check();
	for(let r=0; r<T_ROWS; r++){
		for(let c=0; c<T_COLS; c++){
			let sX = cX - (rSize*T_COLS) / 2;
			let sY = cY - (rSize*T_ROWS) / 2;
			let n = data[r*T_COLS+c];
			if(n == 0) continue;
			let x = sX + rSize * c;
			let y = sY + rSize * r;
			fill(T_COLORS[n%T_COLORS.length]);
			square(x, y, rSize);
		}
	}

	// Title
	fill("#333333");
	textSize(FONT_SIZE); textAlign(CENTER, BASELINE);
	text("SCORE:"+tMng.getScore(), cX, cY-rSize*T_ROWS/2-FONT_SIZE);
}

function mousePressed(){
	btnHome.checkBtn();
	btnLeft.checkBtn();
	btnRight.checkBtn();
	btnDown.checkBtn();
	btnRoll.checkBtn();
}

function touchStarted(){
	btnHome.checkBtn();
	btnLeft.checkBtn();
	btnRight.checkBtn();
	btnDown.checkBtn();
	btnRoll.checkBtn();
}

function keyPressed(){
	if(keyCode == LEFT_ARROW) actionLeft();
	if(keyCode == RIGHT_ARROW) actionRight();
	if(keyCode == UP_ARROW) actionRoll();
	if(keyCode == DOWN_ARROW) actionDown();
}

function actionLeft(){
	if(tMng.checkWallL()) return;
	tMng.stepLeft();
	if(tMng.checkCollision()) tMng.stepRight();
}

function actionRight(){
	if(tMng.checkWallR()) return;
	tMng.stepRight();
	if(tMng.checkCollision()) tMng.stepLeft();
}

function actionRoll(){
	tMng.rotateL();
	if(tMng.checkCollision()){
		tMng.rotateR();
	}else{
		tMng.checkRotation();
	}
}

function actionDown(){
	tMng.stepDown();
	if(tMng.checkCollision()){
		tMng.stepUp();
		tMng.fixMino();
		tMng.createMino();
	}
}
