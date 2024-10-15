console.log("main.js!!");

const FONT_SIZE = 28;
const CANVAS_W  = 320;// 480
const CANVAS_H  = 480;// 720 - 110

const FILES_IMG = [
	"caret-l-b.png", "caret-r-b.png"
];

const T_NUMS = 4;
const T_COLORS = [
	"#FFFFFF", "#FF9800", "#FFC107", "#FFEB3B", "#CDDC39", "#8BC34A", 
	"#4CAF50", "#009688", "#00BCD4", "#03A9f4", "#2196F3", "#3F51B5",
	"#673Ab7", "#9C27B0", "#E91E63", "#F44336", "#FF5722", "#795548"];

let font, cX, cY;
let flkManager, my2048;
let tilePad, tileSize, tileCorner;
let sX, sY, tiles, lockFlg;

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
	frameRate(60);
	noSmooth();

	cX = Math.floor(width * 0.5);
	cY = Math.floor(height * 0.5);

	// FlickManager
	flkManager = new FlickManager(6, e=>{
		//console.log("Flicked:", e);
		if(e.dir == "left") actionLeft();
		if(e.dir == "right") actionRight();
		if(e.dir == "up") actionUp();
		if(e.dir == "down") actionDown();
	});

	// 2048
	my2048 = new Smz2048();
	my2048.randomPut();
	my2048.randomPut();
	my2048.consoleBoard();

	// Padding, Size
	if(width < height){
		tilePad = width * 0.2;
		tileSize = tilePad * 0.95;
	}else{
		tilePad = height * 0.15;
		tileSize = tilePad * 0.95;
	}
	tileCorner = tileSize * 0.1;

	sX = width*0.5  - tilePad*T_NUMS*0.5;
	sY = height*0.5 - tilePad*T_NUMS*0.5;
	lockFlg = false;

	// Reflesh
	this.refleshBoard();
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);

	// Board
	fill("#DDDDDD");
	square(sX, sY, tilePad*T_NUMS, tileCorner);
	for(let r=0; r<T_NUMS; r++){
		for(let c=0; c<T_NUMS; c++){
			if(tiles[r][c]) tiles[r][c].draw();
		}
	}

	// Title
	fill("#333333");
	textSize(FONT_SIZE); textAlign(CENTER, TOP);
	text("2048", cX, FONT_SIZE * 0.5);
	// Score
	textSize(FONT_SIZE*0.8);
	text("SCORE:"+my2048.getScore(), width*0.5, 70);
	// Howto
	textSize(FONT_SIZE*0.8);
	text("Flick/Keyboard", cX, cY + 160);
	text("←↑→↓", cX, cY + 190);
}

function mousePressed(){
	if(FLG_MOBILE) return;
	if(flkManager) flkManager.touchStarted();
}

function mouseMoved(){
	if(FLG_MOBILE) return;
	if(flkManager) flkManager.touchMoved();
}

function mouseEnded(){
	if(FLG_MOBILE) return;
	if(flkManager) flkManager.touchEnded();
}

function touchStarted(){
	if(flkManager) flkManager.touchStarted();
}

function touchMoved(){
	if(flkManager) flkManager.touchMoved();
}

function touchEnded(){
	if(flkManager) flkManager.touchEnded();
}

function keyPressed(){
	if(key == "ArrowLeft") actionLeft();
	if(key == "ArrowRight") actionRight();
	if(key == "ArrowUp") actionUp();
	if(key == "ArrowDown") actionDown();
}

function actionLeft(){
	if(lockFlg) return;
	if(!my2048.slideLeft()) return;
	lockFlg = true;
	my2048.consoleBoard();
	updateBoard();
}

function actionRight(){
	if(lockFlg) return;
	if(!my2048.slideRight()) return;
	lockFlg = true;
	my2048.consoleBoard();
	updateBoard();
}

function actionUp(){
	if(lockFlg) return;
	if(!my2048.slideUp()) return;
	lockFlg = true;
	my2048.consoleBoard();
	updateBoard();
}

function actionDown(){
	if(lockFlg) return;
	if(!my2048.slideDown()) return;
	lockFlg = true;
	my2048.consoleBoard();
	updateBoard();
}

function refleshBoard(){
	lockFlg = false;
	let board = my2048.getBoard();
	tiles = [];
	for(let r=0; r<T_NUMS; r++){
		let line = [];
		for(let c=0; c<T_NUMS; c++){
			let n = board[r][c];
			let x = sX + tilePad * c;
			let y = sY + tilePad * r;
			if(n != 0){
				line.push(new Tile(n, x, y, T_COLORS[Math.log2(n)]));
			}else{
				line.push(null);
			}
		}
		tiles.push(line);
	}
}

function updateBoard(){
	// Move
	for(let r=0; r<T_NUMS; r++){
		for(let c=0; c<T_NUMS; c++){
			let move = my2048.getMove(r, c);
			if(move == null) continue;
			tiles[r][c].moveTo(move.gR, move.gC);
		}
	}
	// Reflesh
	setTimeout(()=>{
		my2048.randomPut();
		refleshBoard();
	}, 250);
}