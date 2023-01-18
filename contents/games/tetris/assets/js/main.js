console.log("main.js!!");

const FONT_SIZE = 28;
const CANVAS_W  = 320;// 480
const CANVAS_H  = 480;// 720 - 110

const FILES_IMG = [
	"caret-l-b.png", "caret-r-b.png", 
	"caret-u-b.png", "caret-d-b.png",
	"arrow-roll-l-b.png", "arrow-roll-r-b.png"
];

let font, cX, cY;
let tMng, rSize;
let btnLeft, btnRight, btnDown, btnRoll;

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

	// Tetris
	tMng = new TetrisManager();
	rSize = Math.floor(height * 0.035);

	// Controller
	btnLeft = new Button("caret-l-b.png", cX-120, cY+190, 0.2, actionLeft);
	btnRight = new Button("caret-r-b.png", cX-20, cY+190, 0.2, actionRight);
	btnDown = new Button("caret-d-b.png", cX-70, cY+220, 0.2, actionDown);
	btnRoll = new Button("arrow-roll-r-b.png", cX+110, cY+200, 0.2, actionRoll);
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);

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

	// Controller
	btnLeft.draw();
	btnRight.draw();
	btnDown.draw();
	btnRoll.draw();

	// Title
	fill("#333333");
	textSize(FONT_SIZE); textAlign(CENTER, TOP);
	text("テトリス", cX, FONT_SIZE * 0.5);
	// Score
	textSize(FONT_SIZE*0.8);
	text("SCORE:" + tMng.getScore(), cX, 50);
}

function mousePressed(){
	if(FLG_MOBILE) return;// Important
	btnLeft.press(mouseX, mouseY);
	btnRight.press(mouseX, mouseY);
	btnDown.press(mouseX, mouseY);
	btnRoll.press(mouseX, mouseY);
}

function touchStarted(){
	btnLeft.press(mouseX, mouseY);
	btnRight.press(mouseX, mouseY);
	btnDown.press(mouseX, mouseY);
	btnRoll.press(mouseX, mouseY);
}

function keyPressed(){
	if(keyCode == LEFT_ARROW) actionLeft();
	if(keyCode == RIGHT_ARROW) actionRight();
	if(keyCode == DOWN_ARROW) actionDown();
	if(keyCode == UP_ARROW) actionRoll();
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

function actionDown(){
	tMng.stepDown();
	if(tMng.checkCollision()){
		tMng.stepUp();
		tMng.fixMino();
		tMng.createMino();
	}
}

function actionRoll(){
	tMng.rotateL();
	if(tMng.checkCollision()){
		tMng.rotateR();
	}else{
		tMng.checkRotation();
	}
}