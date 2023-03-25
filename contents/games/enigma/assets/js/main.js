console.log("main.js!!");

const FONT_SIZE = 28;
const CANVAS_W  = 320;// 480
const CANVAS_H  = 480;// 720 - 110

const FILES_IMG = [
	"caret-l-b.png", "caret-r-b.png", "btn_keyboard.png"
];

let font, cX, cY;
let enigma, btns;

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
	frameRate(8);
	noSmooth();

	cX = Math.floor(width * 0.5);
	cY = Math.floor(height * 0.5);

	// Enigma
	enigma = new Enigma();
	enigma.init(1, 2, 3);
	console.log(enigma.getInfo());

	// Buttons
	btns = [];
	const keys = [
		["a", "b", "c", "d", "e", "f"],
		["g", "h", "i", "j", "k", "l"],
		["m", "n", "o", "p", "q", "r"],
		["s", "t", "u", "v", "w", "x"],
		["y", "z",null,null,null, "C"]
	];
	const pad = 36;
	const sX = cX - pad * (keys[0].length-1) * 0.5;
	const sY = 290;
	for(let r=0; r<keys.length; r++){
		for(let c=0; c<keys[0].length; c++){
			if(keys[r][c] == null) continue;
			const x = sX + pad * c;
			const y = sY + pad * r;
			const btn = new Button("btn_keyboard.png", 
				x, y, 1, keys[r][c], (key)=>{
				console.log("key:", key);
			});
			btns.push(btn);
		}
	}
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);

	// Buttons
	for(let btn of btns) btn.update();

	// Text
	fill("#333333"); noStroke();
	textSize(FONT_SIZE); textAlign(CENTER, TOP);
	text("エニグマ暗号機", cX, FONT_SIZE * 0.5);
}

function mousePressed(){
	if(FLG_MOBILE) return;
	touchBoard();
}

function touchStarted(){
	touchBoard();
}

function touchBoard(){
	//console.log("mouse:", mouseX, mouseY);
	// Buttons
	for(let btn of btns) btn.press(mouseX, mouseY);
}

function drawCircle(x, y, r){
	noFill();
	stroke("darkred");
	strokeWeight(10);
	circle(x+r/2, y+r/2, r/2);
}

function drawCross(x, y, s){
	noFill();
	stroke("darkblue");
	strokeWeight(10);
	const cX = x + s/2;
	const cY = y + s/2;
	line(cX, cY, cX-s/4, cY-s/4);
	line(cX, cY, cX+s/4, cY-s/4);
	line(cX, cY, cX-s/4, cY+s/4);
	line(cX, cY, cX+s/4, cY+s/4);
}