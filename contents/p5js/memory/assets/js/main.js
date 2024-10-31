console.log("main.js!!");

const FONT_SIZE = 28;
const A_RACIO   = 3/4;
const AD_HEIGHT = 120;
const KEY_HIGH  = "memory";

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
let cntTap, selectedNum, btnRetryDialog;

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
	selected = [];// Selected

	// RetryDialog
	btnRetryDialog = new Button(cX, cY+gSize*12, gSize*6, gSize*2.2, 
		"RETRY", "#ff595e", true, ()=>{showRetryDialog();});

	// Trump(13 x 4)
	for(let i=0; i<13; i++){
		for(let s=SUITS.length-1; 0<=s; s--){
			const rdm = floor(random(s));
			[SUITS[s], SUITS[rdm]] = [SUITS[rdm], SUITS[s]];
		}
		for(const suit of SUITS){
			const file = "card_" + suit + "_" + String(i+1).padStart(2, "0") + ".png";
			const card = new Card("card_back_03.png", file, -gSize, -gSize, gSize*4);
			trump.push(card);
		}
	}

	// Shuffle with 2 pairs
	for(let i=24; 0<=i; i--){
		const rdm = floor(random(i));
		[trump[i*2], trump[rdm*2]] = [trump[rdm*2], trump[i*2]];
		[trump[i*2+1], trump[rdm*2+1]] = [trump[rdm*2+1], trump[i*2+1]];
	}

	// Pickup cards and shuffle them
	const rows = 3;
	const cols = 4;
	for(let i=0; i<rows*cols; i++){
		cards.push(trump[i]);
	}
	for(let i=cards.length-1; 0<=i; i--){
		const rdm = floor(random(i));
		[cards[i], cards[rdm]] = [cards[rdm], cards[i]];
	}

	// Set positions
	const padW = gSize * 4.5;
	const padH = gSize * 6.0;
	const sX = cX - padW * (cols-1)/2;
	const sY = cY - padH * (rows-1)/2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const x = sX + padW * c;
			const y = sY + padH * r;
			const i = r * cols + c;
			const card = cards[i];
			card.setPosition(x, y);
		}
	}
}

function draw(){
	background("#333333");
	noStroke(); fill("#cccccc");
	textSize(FONT_SIZE); textAlign(CENTER, CENTER);
	drawGrids();// Grids

	drawMsgCounter(cX, cY-gSize*11);// Counter
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

	btnRetryDialog.touch(mouseX, mouseY);// RetryDialog

	// Cards
	if(1 < selected.length) return;
	for(const card of cards){
		if(card.contains(mouseX, mouseY)){
			if(card.isOpened() || card.isFinished()) continue;
			card.open(gSize*2);// Open
			cntTap++;
			selected.push(card);// Selected
			saveCounter();
		}
	}
	if(1 < selected.length){
		// Finish
		if(selected[0].num == selected[1].num){
			selected[0].finish();
			selected[1].finish();
		}
		// Close
		setTimeout(()=>{
			for(const card of cards){
				if(card.isFinished()) continue;
				card.close(gSize);// Close
			}
			selected = [];
		}, 1200);
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