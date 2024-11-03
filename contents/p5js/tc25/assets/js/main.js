console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;
const KEY_HIGH  = "tc25";

const FILES_IMG = [
	"a_panda.png", "a_bear.png"
];

let font, cW, cH, cX, cY;
let cntScore, cntHigh;
let btnRetryDialog, btnX;

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

	// Score
	cntScore = 0;
	cntHigh = loadHigh();

	// RetryDialog
	btnRetryDialog = new Button(cX, cY+gSize*11, gSize*6, gSize*2.2, 
		"RETRY", "#ff595e", true, ()=>{showRetryDialog();});

	// X
	btnX = new Button(cX, cY, gSize*6, gSize*2.2, 
		"Xでシェア", "#1da1f2", true, ()=>{shareWithX();});
}

function draw(){
	background("#333333");
	noStroke(); fill("#cccccc");
	textSize(FONT_SIZE); textAlign(CENTER, CENTER);
	drawGrids();// Grids

	drawMsg("スコア:"+cntScore, gSize, gSize*1.5, gSize*1.4, LEFT);// Score
	drawMsg("ハイ:"+cntHigh, gSize, gSize*3.0, gSize*1.0, LEFT, "#ff595e");// High

	btnRetryDialog.update();// RetyDialog
	btnX.update();// X

	TWEEN.update();// Tween
}

function mousePressed(){
	if(FLG_MOBILE) return;
	touchStarted();
}

function touchStarted(){
	if(mouseY < 0) return;
	btnRetryDialog.touch(mouseX, mouseY);// RetryDialog
	btnX.touch(mouseX, mouseY);// X
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

function drawMsg(msg, x, y, size, align, color="#ffffff"){
	fill(color);
	textSize(size);
	textAlign(align, CENTER);
	text(msg, x, y);
}

function loadHigh(){
	const num = localStorage.getItem(KEY_HIGH);
	if(num == null) return 0;
	return num;
}

function saveHigh(){
	cntHigh = max(cntHigh, cntScore);
	localStorage.setItem(KEY_HIGH, cntHigh);
}

function shareWithX(){
	console.log("shareWithX");
	const api = "https://twitter.com/share";
	const params = {
		"url": "https://sdkfz181tiger.github.io/ExpPiyoApps/contents/p5js/panda/",
		"text": "パンダロンダリングで" + cntScore + "点取りました!!(最高得点は" + cntHigh + "です)",
		"hashtags": ["ahoge", "gamedev", "パンダロンダリング"]
	}
	const query =  new URLSearchParams(params).toString();
	location.href = api + "?" + query;
}