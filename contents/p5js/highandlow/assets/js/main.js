console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;
const KEY_HIGH  = "highandlow";

const FILES_IMG = [
	"mark_bkg.png", "mark_ng.png", "mark_ok.png",
	"card_back_01.png",  "card_back_02.png",  "card_back_04.png",    "card_back_03.png",
	"card_spade_01.png", "card_heart_01.png", "card_diamond_01.png", "card_club_01.png",
	"card_spade_02.png", "card_heart_02.png", "card_diamond_02.png", "card_club_02.png",
	"card_spade_03.png", "card_heart_03.png", "card_diamond_03.png", "card_club_03.png",
	"card_spade_04.png", "card_heart_04.png", "card_diamond_04.png", "card_club_04.png",
	"card_spade_05.png", "card_heart_05.png", "card_diamond_05.png", "card_club_05.png",
	"card_spade_06.png", "card_heart_06.png", "card_diamond_06.png", "card_club_06.png",
	"card_spade_07.png", "card_heart_07.png", "card_diamond_07.png", "card_club_07.png",
	"card_spade_08.png", "card_heart_08.png", "card_diamond_08.png", "card_club_08.png",
	"card_spade_09.png", "card_heart_09.png", "card_diamond_09.png", "card_club_09.png",
	"card_spade_10.png", "card_heart_10.png", "card_diamond_10.png", "card_club_10.png",
	"card_spade_11.png", "card_heart_11.png", "card_diamond_11.png", "card_club_11.png",
	"card_spade_12.png", "card_heart_12.png", "card_diamond_12.png", "card_club_12.png",
	"card_spade_13.png", "card_heart_13.png", "card_diamond_13.png", "card_club_13.png"
];

const SUITS = ["spade", "heart", "diamond", "club"];

let font, cW, cH, cX, cY;
let score, high;
let btnHigh, btnLow;
let btnRetryDialog;

let posLeft = {x: 0, y: 0}
let posRight = {x: 0, y: 0}
let numFirst = 0;
let numSecond = 0;
let gameOverFlg = false;

let mark;
const stockCards = [];
const readyCards = [];

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
	frameRate(32);
	noSmooth();

	score = 0;// Score
	high = loadHighScore();// High

	// Button
	btnHigh = new Button(cX-gSize*4, cH-gSize*4, gSize*6, gSize*2.2, 
		"大きい", "#ff595e", true, ()=>{onTouchHigh();});

	btnLow = new Button(cX+gSize*4, cH-gSize*4, gSize*6, gSize*2.2, 
		"小さい", "#595eff", true, ()=>{onTouchLow();});

	// RetryDialog
	btnRetryDialog = new Button(cX, cH-gSize*4, gSize*6, gSize*2.2, 
		"RETRY", "#ff595e", true, ()=>{showRetryDialog();});

	// Positions
	posLeft.x = cX - gSize * 5;
	posLeft.y = cY - gSize * 1;
	posRight.x = cX + gSize * 5;
	posRight.y = cY - gSize * 1;

	// Mark
	mark = new Mark("mark_bkg.png", "mark_ng.png", "mark_ok.png", 
		cX, cY-gSize, gSize*3);

	// StockCards
	for(let i=0; i<13; i++){
		for(let s=SUITS.length-1; 0<=s; s--){
			const rdm = floor(random(s));
			[SUITS[s], SUITS[rdm]] = [SUITS[rdm], SUITS[s]];
		}
		for(const suit of SUITS){
			const file = "card_" + suit + "_" + String(i+1).padStart(2, "0") + ".png";
			const card = new Card("card_back_03.png", file, cX, 0, gSize*6);
			stockCards.push(card);
		}
	}

	// Shuffle
	for(let i=stockCards.length-1; 0<i; i--){
		const rdm = floor(random(i));
		[stockCards[i], stockCards[rdm]] = [stockCards[rdm], stockCards[i]];
	}

	// Set first
	readyCards.push(stockCards[stockCards.length-1]);
	stockCards.splice(stockCards.length-1, 1);
	const first = readyCards[readyCards.length-1];
	first.moveTo(posLeft.x, posLeft.y, 250, ()=>{first.open(gSize);});
	numFirst = first.num;

	// Set second
	readyCards.push(stockCards[stockCards.length-1]);
	stockCards.splice(stockCards.length-1, 1);
	const second = readyCards[readyCards.length-1];
	second.moveTo(posRight.x, posRight.y, 250);
	numSecond = "?";
}

function draw(){
	background("#333333");
	noStroke(); fill("#cccccc");
	textSize(FONT_SIZE); textAlign(CENTER, CENTER);
	drawGrids();// Grids

	drawMsg("SC:"+score, gSize, cY-gSize*12, 1.4, "#ffffff", LEFT);
	drawMsg("HI:"+high, cW-gSize, cY-gSize*12, 1.4, "#ff595e", RIGHT);
	drawMsg(numFirst, posLeft.x, cY-gSize*7);
	drawMsg(numSecond, posRight.x, cY-gSize*7);
	drawMsg("次のカード", posRight.x, cY+gSize*4.2, 1.0);

	if(!gameOverFlg){
		drawMsg("次のカードが大か小か当ててね", cX, cY+gSize*6.8, 1.2);
	}else{
		drawMsg("残念、ゲームオーバー!!", cX, cY+gSize*6.8, 1.2);
	}

	if(!gameOverFlg){
		btnHigh.update();// High
		btnLow.update();// Low
	}else{
		btnRetryDialog.update();// RetyDialog
	}

	mark.update();// Mark

	// Cards
	for(let i=max(stockCards.length-2, 0); i<stockCards.length; i++){
		stockCards[i].update();
	}
	for(let i=max(readyCards.length-3, 0); i<readyCards.length; i++){
		readyCards[i].update();
	}

	TWEEN.update();// Tween
}

function mousePressed(){
	if(FLG_MOBILE) return;
	touchStarted();
}

function touchStarted(){
	if(mouseY < 0) return;

	if(!gameOverFlg){
		btnHigh.touch(mouseX, mouseY);// High
		btnLow.touch(mouseX, mouseY);// Low
	}else{
		btnRetryDialog.touch(mouseX, mouseY);// RetryDialog
	}
}

function onTouchHigh(){
	console.log("onTouchHigh");
	openAndCheck(true);
}

function onTouchLow(){
	console.log("onTouchLow");
	openAndCheck(false);
}

function openAndCheck(highFlg){
	if(gameOverFlg) return;
	if(readyCards.length <= 1) return;

	if(!mark.isFinished()) return;

	const first = readyCards[readyCards.length-2];
	const second = readyCards[readyCards.length-1];
	second.open(gSize);
	numSecond = second.num;

	if(highFlg){
		if(first.num <= second.num){
			mark.jumpOK(gSize);
			score++;
		}else{
			mark.jumpNG(gSize);
			gameOverFlg = true;
		}
	}else{
		if(second.num <= first.num){
			mark.jumpOK(gSize);
			score++;
		}else{
			mark.jumpNG(gSize);
			gameOverFlg = true;
		}
	}

	// HighScore
	if(high < score){
		high = score;
		saveHighScore();
	}

	if(gameOverFlg) return;
	setTimeout(()=>{readyNext();}, 800);
}

function readyNext(){
	if(stockCards.length <= 0) return;

	// Reset
	mark.reset();

	// Ready
	readyCards.push(stockCards[stockCards.length-1]);
	stockCards.splice(stockCards.length-1, 1);

	// First
	const first = readyCards[readyCards.length-2];
	first.moveTo(posLeft.x, posLeft.y, 250);
	numFirst = first.num;

	// Second
	const second = readyCards[readyCards.length-1];
	second.moveTo(posRight.x, posRight.y, 250);
	numSecond = "?";
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

function drawMsg(msg, x, y, size=2.0, 
	color="#ffffff", alignX=CENTER, alignY=CENTER){
	fill(color);
	textSize(gSize * size); 
	textAlign(alignX, alignY);
	text(msg, x, y);
}

function loadHighScore(){
	const num = localStorage.getItem(KEY_HIGH);
	if(num == null) return 0;
	return num;
}

function saveHighScore(){
	localStorage.setItem(KEY_HIGH, high);
}