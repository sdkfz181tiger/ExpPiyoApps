console.log("main.js!!");

const TITLE = "15パズル";
const FONT_SIZE = 28;

let font, btnHome, btnAuto;
let pad, size, corner;
let fMng, sX, sY, tiles;

function preload(){
	font = loadFont("./assets/fonts/nicokaku_v2.ttf");
}

function setup(){
	console.log("setup");
	const W = window.innerWidth;
	const H = window.innerHeight;
	const canvas = createCanvas(W, H);
	btnHome = new MyButton("caret-l-w.png", 24, 24, 32, ()=>{
		window.location.replace("../../../");
	});
	frameRate(32);
	textFont(font);
	noSmooth();

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
	btnAuto = new MyButton("caret-r-w.png", 
		width*0.5, sY + pad*(fMng.getGrids()+0.5), size*0.5, ()=>{
		setTimeout(autoMove, 300);
	});
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT);
	text(TITLE, width - 12, 32);
	btnHome.drawBtn();
	btnAuto.drawBtn();
	// 15Puzzle
	fill("#DDDDDD");
	square(sX, sY, pad*fMng.getGrids(), corner);
	for(let tile of tiles) tile.draw();
}

function mousePressed(){
	btnHome.checkBtn();
	btnAuto.checkBtn();
	checkTiles();
}

function touchStarted(){
	btnHome.checkBtn();
	btnAuto.checkBtn();
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