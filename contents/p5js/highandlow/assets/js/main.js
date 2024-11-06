console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;
const KEY_HIGH  = "highandlow";

const FILES_IMG = [
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
let cntTap, cardSelected;
let btnHigh, btnLow;
let btnRetryDialog;

const trump = [];
const cards = [];

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

	cntTap = loadCounter();// Counter
	cardSelected = [];// Selected

	// Button
	btnHigh = new Button(cX-gSize*4, cY+gSize*7, gSize*6, gSize*2.2, 
		"HIGH", "#ff595e", true, ()=>{onTouchBtn();});

	btnLow = new Button(cX+gSize*4, cY+gSize*7, gSize*6, gSize*2.2, 
		"LOW", "#595eff", true, ()=>{onTouchBtn();});

	// RetryDialog
	btnRetryDialog = new Button(cX, cY+gSize*12, gSize*6, gSize*2.2, 
		"RETRY", "#ff595e", true, ()=>{showRetryDialog();});

	// Trump
	for(let i=0; i<13; i++){
		for(let s=SUITS.length-1; 0<=s; s--){
			const rdm = floor(random(s));
			[SUITS[s], SUITS[rdm]] = [SUITS[rdm], SUITS[s]];
		}
		for(const suit of SUITS){
			const file = "card_" + suit + "_" + String(i+1).padStart(2, "0") + ".png";
			const card = new Card("card_back_03.png", file, cX, cY, gSize*4);
			trump.push(card);
		}
	}

	// Shuffle with 2 pairs
	for(let i=24; 0<=i; i--){
		const rdm = floor(random(i));
		[trump[i*2], trump[rdm*2]] = [trump[rdm*2], trump[i*2]];
		[trump[i*2+1], trump[rdm*2+1]] = [trump[rdm*2+1], trump[i*2+1]];
	}
}

function draw(){
	background("#333333");
	noStroke(); fill("#cccccc");
	textSize(FONT_SIZE); textAlign(CENTER, CENTER);
	drawGrids();// Grids

	drawMsgCounter(cX, cY-gSize*11);// Counter
	btnHigh.update();// High
	btnLow.update();// Low
	btnRetryDialog.update();// RetyDialog
	for(const card of cards){
		card.update();// Cards
	}

	TWEEN.update();// Tween
}

function mousePressed(){
	if(FLG_MOBILE) return;
	touchStarted();
}

function touchStarted(){
	if(mouseY < 0) return;

	cntTap++;// Counter

	btnHigh.touch(mouseX, mouseY);// High
	btnLow.touch(mouseX, mouseY);// Low
	btnRetryDialog.touch(mouseX, mouseY);// RetryDialog
}

function onTouchBtn(){
	console.log("onTouchBtn");

	// Pickup card
	cards.push(trump[trump.length-1]);
	trump.splice(trump.length-1, 1);

	// Slide
	const card = cards[cards.length-1];
	card.open(gSize);
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