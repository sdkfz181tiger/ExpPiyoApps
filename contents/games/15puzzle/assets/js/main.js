console.log("main.js!!");

const FONT_SIZE = 28;
const CANVAS_W  = 320;// 480
const CANVAS_H  = 480;// 720 - 110

const FILES_IMG = [
	"caret-l-b.png", "caret-r-b.png"
];

let font, cX, cY;
let pad, size, corner;
let fMng, sX, sY, tiles, btnAuto;

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

	// Padding, Size, Corner
	if(width < height){
		pad = width * 0.2;
		size = pad * 0.95;
	}else{
		pad = height * 0.15;
		size = pad * 0.95;
	}
	corner = size * 0.1;

	// 15Puzzle
	fMng = new FpzManager();

	sX = width / 2 - pad * fMng.getGrids() / 2;
	sY = height / 2 - pad * (fMng.getGrids()+0.5) / 2;

	// Tiles
	tiles = [];
	let board = fMng.getBoard();
	for(let r=0; r<fMng.getGrids(); r++){
		for(let c=0; c<fMng.getGrids(); c++){
			tiles.push(new Tile(board[r][c], r, c, pad, size, corner));
		}
	}

	// Auto
	btnAuto = new Button("caret-r-b.png", cX, cY+160, 0.2, autoMove);
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);

	// 15Puzzle
	fill("#DDDDDD");
	square(sX, sY, pad*fMng.getGrids(), corner);
	for(let tile of tiles) tile.draw();

	btnAuto.draw();// Auto

	// Score
	fill("#333333");
	textSize(FONT_SIZE); textAlign(CENTER, TOP);
	text("15パズル", cX, FONT_SIZE * 0.5);
}

function mousePressed(){
	if(FLG_MOBILE) return;
	btnAuto.press(mouseX, mouseY);
	checkTiles();
}

function touchStarted(){
	btnAuto.press(mouseX, mouseY);
	checkTiles();
}

function checkTiles(){
	for(let tile of tiles){
		if(tile.contains(mouseX, mouseY)){
			let target = fMng.checkVH(tile.r, tile.c);
			if(target.r < 0 || target.c < 0) return;
			fMng.pushHistory(tile.r, tile.c, target.r, target.c);
			swapTiles(tile.r, tile.c, target.r, target.c);
			return;
		}
	}
}

function autoMove(){
	let history = fMng.popHistory();
	if(!history) return;
	fMng.swapGrid(history.tR, history.tC, history.fR, history.fC);
	swapTiles(history.tR, history.tC, history.fR, history.fC);
	setTimeout(autoMove, 300);
}

function swapTiles(fR, fC, tR, tC){
	let f = fR * fMng.getGrids() + fC;
	let t = tR * fMng.getGrids() + tC;
	tiles[f].change(tR, tC);
	tiles[t].change(fR, fC);
	let tmp = tiles[t];
	tiles[t] = tiles[f];
	tiles[f] = tmp;
}