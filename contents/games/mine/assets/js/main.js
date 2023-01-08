console.log("main.js!!");

const TITLE = "マインスイーパー";

const MS_GRIDS = 10;
const MS_MINES = 10;

const FONT_SIZE = 24;

let font, btnHome;
let gSize, mMng, tiles;

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
	textFont(font);
	frameRate(8);
	noSmooth();

	// MineSweeper
	gSize = Math.floor((width<height) ? width*0.08:height*0.08);
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
	textSize(28); textAlign(RIGHT, BASELINE);
	text(TITLE, width - 12, 32);
	btnHome.drawBtn();

	// Frame
	fill("#DDDDDD");
	//rect(cX-rSize*T_COLS/2, cY-rSize*T_ROWS/2, rSize*T_COLS, rSize*T_ROWS);

	// Title
	for(let tile of tiles) tile.draw();
}

function mousePressed(){
	btnHome.checkBtn();
	checkTiles();
}

function touchStarted(){
	btnHome.checkBtn();
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