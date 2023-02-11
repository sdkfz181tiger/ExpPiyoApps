console.log("main.js!!");

const FONT_SIZE = 28;
const CANVAS_W  = 320;// 480
const CANVAS_H  = 480;// 720 - 110

const FILES_IMG = [
	"caret-l-b.png", "caret-r-b.png"
];

let font, cX, cY;
let gSize, sX, sY;

const board  = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
];

function preload(){
	font = loadFont("../../assets/fonts/nicokaku_v2.ttf");
	for(let file of FILES_IMG) ImgLoader.loadImg(file);
}

function setup(){

	const cW = (CANVAS_W < 0) ? window.innerWidth:CANVAS_W;
	const cH = (CANVAS_H < 0) ? window.innerHeight:CANVAS_H;
	const canvas = createCanvas(cW, cH);
	canvas.parent("game");
	textFont(font);
	frameRate(8);
	noSmooth();

	cX = Math.floor(width * 0.5);
	cY = Math.floor(height * 0.5);
	gSize = (width<height)?width/4:height/4;
	sX = cX - (gSize * SIZE) * 0.5;
	sY = cY - (gSize * SIZE) * 0.5;

	if(turn == com) think(board);// Com
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);

	// Board
	for(let r=0; r<SIZE; r++){
		for(let c=0; c<SIZE; c++){
			const x = sX + gSize*c;
			const y = sY + gSize*r;
			fill("silver");
			noStroke();
			square(x, y, gSize-2);
			if(board[r][c] == MARK_O) drawCircle(x, y, gSize);
			if(board[r][c] == MARK_X) drawCross(x, y, gSize);
		}
	}

	// Text
	fill("#333333"); noStroke();
	textSize(FONT_SIZE); textAlign(CENTER, TOP);
	text("oxゲーム", cX, FONT_SIZE * 0.5);

	// You
	if(player == MARK_O){
		text("You:o", cX, FONT_SIZE*0.5 + 64);
	}else{
		text("You:x", cX, FONT_SIZE*0.5 + 64);
	}

	if(isWon(board, player)){
		text("You win!!", cX, cY+gSize*2);
		return;
	}
	if(isWon(board, com)){
		text("You lose...", cX, cY+gSize*2);
		return;
	}
	if(isFilled(board)){
		text("Even", cX, cY+gSize*2);
		return;
	}
}

function mousePressed(){
	if(FLG_MOBILE) return;
	touchBoard();
}

function touchStarted(){
	touchBoard();
}

function touchBoard(){
	const r = Math.floor((mouseY-sY) / gSize);
	const c = Math.floor((mouseX-sX) / gSize);
	if(r < 0 || SIZE-1<r) return;
	if(c < 0 || SIZE-1<c) return;
	// Player
	if(turn != player) return;
	if(board[r][c] != MARK_N) return;
	if(isFinished(board)) return;// Finished
	board[r][c] = player;// Put
	console.log(r, c);
	turn = nextTurn(player);// Next
	if(!isFinished(board)) think(board);// Com
}

function drawCircle(x, y, r){
	noFill();
	stroke("darkred");
	strokeWeight(10);
	circle(x+r/2, y+r/2, r/2);
}

function drawCross(x, y, s){
	noFill();
	stroke("darkblue");
	strokeWeight(10);
	const cX = x + s/2;
	const cY = y + s/2;
	line(cX, cY, cX-s/4, cY-s/4);
	line(cX, cY, cX+s/4, cY-s/4);
	line(cX, cY, cX-s/4, cY+s/4);
	line(cX, cY, cX+s/4, cY+s/4);
}