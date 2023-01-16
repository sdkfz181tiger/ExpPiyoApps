console.log("main.js!!");

const FONT_SIZE = 28;
const CANVAS_W  = 320;// 480
const CANVAS_H  = 480;// 720 - 110

const FILES_IMG = [
	"caret-l-b.png", "caret-r-b.png"
];

const MS_GRIDS = 8;
const MS_MINES = 8;

let font, cX, cY;
let gSize, mMng, tiles;

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

	// MineSweeper
	gSize = Math.floor((width<height) ? width*0.1:height*0.1);
	mMng = new MineSweeperManager(MS_GRIDS, MS_GRIDS, MS_MINES);
	//mMng.consoleAll();

	// Tiles
	tiles = [];
	let mine = mMng.getMine();
	let sensor = mMng.getSensor();
	let total = MS_GRIDS**2;
	for(let t=0; t<total; t++){
		let r = Math.floor(t / MS_GRIDS);
		let c = Math.floor(t % MS_GRIDS);
		let m = mine[r][c];
		let s = sensor[r][c];
		let tile = new Tile(r, c, gSize, m, s);
		tiles.push(tile);
	}
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);

	// Title
	for(let tile of tiles) tile.draw();

	// Mine
	fill("#333333");
	textSize(FONT_SIZE); textAlign(CENTER, TOP);
	text("マインスイーパ", cX, FONT_SIZE * 0.5);
}

function mousePressed(){
	checkTiles();
}

function touchStarted(){
	checkTiles();
}

function checkTiles(){
	for(let tile of tiles){
		if(tile.mousePressed(mouseX, mouseY)){
			mineSweep(tile.getR(), tile.getC());
			break;
		}
	}
}

function mineSweep(r, c){
	// Minesweeper
	if(!mMng.sweep(r, c)){
		console.log("CONTINUE!!");
		for(let t=0; t<tiles.length; t++){
			let r = Math.floor(t / MS_GRIDS);
			let c = Math.floor(t % MS_GRIDS);
			let search = mMng.getSearch();
			if(search[r][c] == 1){
				tiles[t].open();
			}
		}
	}else{
		console.log("GAME OVER!!");
		let t = r * MS_GRIDS + c;
		tiles[t].open();
	}
}