console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;
const KEY_HIGH  = "memory";

const FILES_IMG = [
	"card_back_01.png", "card_back_02.png", "card_back_03.png", "card_back_04.png"
];

const TILE_COLORS = [
	"#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"
];

let font, cW, cH, cX, cY;
let card, cntTap;

function preload(){
	font = loadFont("../../assets/fonts/nicokaku_v2.ttf");
	for(let file of FILES_IMG) ImgLoader.loadImg(file);
}

function setup(){
	const main = document.querySelector("main");
	cH = main.clientHeight - AD_HEIGHT;
	cW = min(main.clientWidth, cH*A_RACIO);
	cX = cW / 2;
	cY = cH / 2;
	gSize = floor(cW / 20);
	gRows = floor(cH / gSize);
	gCols = floor(cW / gSize);

	// Canvas
	const canvas = createCanvas(cW, cH);
	canvas.parent("game");
	textFont(font);
	frameRate(48);
	noSmooth();

	card = new Card("card_back_01.png", cX, cY, gSize*4);// Card
	cntTap = loadCounter();// Counter
}

function draw(){
	background("#333333");
	noStroke(); fill("#cccccc");
	textSize(FONT_SIZE); textAlign(CENTER, CENTER);
	drawGrids();// Grids

	card.update();// Card
	drawMsgCounter(cX, cY-gSize*10);// Counter

	TWEEN.update();// Tween
}

function mousePressed(){
	if(FLG_MOBILE) return;
	touchStarted();
}

function touchStarted(){
	if(mouseY < 0) return;
	// Shake
	if(card.contains(mouseX, mouseY)){
		card.shake(gSize/2);
		cntTap++;
		saveCounter();
		randomDialog();
	}
}

function drawGrids(){
	stroke("#111111"); strokeWeight(1);
	for(let r=0; r<gRows+1; r++){
		const y = r * gSize;
		line(0, y, cW, y);
		for(let c=0; c<gCols+1; c++){
			const x = c * gSize;
			line(x, 0, x, cH);
		}
	}
}

function drawMsgCounter(x, y){
	fill("#ffffff");
	textSize(gSize * 2.0); 
	textAlign(CENTER, CENTER);
	text(cntTap, x, y);
}

function loadCounter(){
	const num = localStorage.getItem(KEY_HIGH);
	if(num == null) return 0;
	return num;
}

function saveCounter(){
	localStorage.setItem(KEY_HIGH, cntTap);
}

function randomDialog(){
	if(1 < random(1000)) return; 
	const elem = document.getElementById("myModal");
	if(elem.classList.contains("show")) return;
	const modal = new bootstrap.Modal(elem);
	bootstrap.Modal.getInstance(elem).show();
}