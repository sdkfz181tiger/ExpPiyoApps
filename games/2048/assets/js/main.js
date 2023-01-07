console.log("main.js!!");

const TITLE = "2048";
const TILE_NUMS = 4;
const TILE_COLORS = [
	"#FFFFFF", "#F44336", "#E91E63", "#9C27B0", "#673Ab7", "#3F51B5", 
	"#2196F3", "#03A9f4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", 
	"#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548"];

let font, btnHome, flkManager;
let my2048;
let tilePad, tileSize, tileCorner, tileColor;
let sX, sY, tiles, lockFlg;

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
	flkManager = new FlickManager(6, e=>{
		//console.log("Flicked:", e);
		if(e.dir == "left") actionLeft();
		if(e.dir == "right") actionRight();
		if(e.dir == "up") actionUp();
		if(e.dir == "down") actionDown();
	});
	textFont(font);
	frameRate(32);
	noSmooth();

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
	tileColor = TILE_COLORS[Math.floor(Math.random() * TILE_COLORS.length)];

	sX = width*0.5  - tilePad*TILE_NUMS*0.5;
	sY = height*0.5 - tilePad*TILE_NUMS*0.5;
	lockFlg = false;

	// Reflesh
	this.refleshBoard();
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(28); textAlign(RIGHT, BASELINE);
	text(TITLE, width - 12, 32);
	btnHome.drawBtn();
	// Board
	fill("#333333");
	textSize(28); textAlign(CENTER, BASELINE);
	text("SCR:"+my2048.getScore(), width*0.5, sY-tilePad*0.4);
	fill("#DDDDDD");
	square(sX, sY, tilePad*TILE_NUMS, tileCorner);
	for(let r=0; r<TILE_NUMS; r++){
		for(let c=0; c<TILE_NUMS; c++){
			if(tiles[r][c]) tiles[r][c].draw();
		}
	}
}

function mousePressed(){
	btnHome.checkBtn();
	if(flkManager) flkManager.touchStarted();
}

function mouseMoved(){
	if(flkManager) flkManager.touchMoved();
}

function mouseEnded(){
	if(flkManager) flkManager.touchEnded();
}

function touchStarted(){
	btnHome.checkBtn();
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
	for(let r=0; r<TILE_NUMS; r++){
		let line = [];
		for(let c=0; c<TILE_NUMS; c++){
			let n = board[r][c];
			let x = sX + tilePad * c;
			let y = sY + tilePad * r;
			if(n != 0){
				line.push(new Tile(n, x, y, tileColor));
			}else{
				line.push(null);
			}
		}
		tiles.push(line);
	}
}

function updateBoard(){
	// Move
	for(let r=0; r<TILE_NUMS; r++){
		for(let c=0; c<TILE_NUMS; c++){
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