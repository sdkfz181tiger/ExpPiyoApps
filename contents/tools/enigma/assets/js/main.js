console.log("main.js!!");

const FONT_SIZE = 28;
const CANVAS_W  = 320;// 480
const CANVAS_H  = 480;// 720 - 110

const FILES_IMG = [
	"caret-l-b.png", "caret-r-b.png", "btn_keyboard.png"
];

let font, cX, cY;
let enigma, btns
let circles, history;
let strFrom, strTo;

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
	reset();
	console.log(enigma.getInfo());

	// Buttons
	btns = [];
	const keys = [
		["A", "B", "C", "D", "E", "F"],
		["G", "H", "I", "J", "K", "L"],
		["M", "N", "O", "P", "Q", "R"],
		["S", "T", "U", "V", "W", "X"],
		["Y", "Z",null,null,null,"Cl"]
	];
	const padB = 36;
	const sBX = cX - padB * (keys[0].length-1) * 0.5;
	const sBY = 290;
	for(let r=0; r<keys.length; r++){
		for(let c=0; c<keys[0].length; c++){
			if(keys[r][c] == null) continue;
			const x = sBX + padB * c;
			const y = sBY + padB * r;
			const btn = new Button("btn_keyboard.png", 
				x, y, 1, keys[r][c], (key)=>{
				if(key == "Cl"){
					reset();
					return;
				}
				// History
				history = enigma.decode(key);
				console.log("History:", history);
				// Result
				strFrom += history[0];
				strTo += history[history.length-1];
				console.log("Result:", strFrom, "->", strTo);
			});
			btns.push(btn);
		}
	}

	function reset(){
		enigma.init(0, 0, 0);// Reset
		circles = [];
		history = [];
		strFrom = "";
		strTo   = "";
		// Circles
		const roters = enigma.getRoters();
		const padC = width * 0.32;
		const sCX = cX - padC * (roters.length-1) * 0.5;
		const sCY = 160;
		for(let i=0; i<roters.length; i++){
			const x = sCX + padC * i;
			const y = sCY;
			const circle = new MyCircle(x, y, 45, roters[i]);
			circles.push(circle);
		}
	}
}

function draw(){
	background("#EFEFEF");
	noStroke(); fill("#333333");
	textSize(FONT_SIZE); textAlign(RIGHT, BASELINE);

	// Buttons, Circles
	for(let btn of btns) btn.update();
	for(let circle of circles) circle.update();

	if(0 < history.length){
		// History
		textSize(FONT_SIZE*0.5); textAlign(CENTER, CENTER);
		text(history.join("->"), cX, 80);
		// Result
		textSize(FONT_SIZE*0.8);
		text(strFrom, cX, cY - 12);
		text(strTo, cX, cY + 12);
		// Path
		drawPath();
	}else{
		textSize(FONT_SIZE*0.5); textAlign(CENTER, CENTER);
		text("...", cX, 80);
		textSize(FONT_SIZE*0.8);
		text("...", cX, cY - 12);
		text("...", cX, cY + 12);
	}

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
	// Buttons, Circles
	for(let btn of btns) btn.press(mouseX, mouseY);
	for(let circle of circles) circle.press(mouseX, mouseY);
}

function drawPath(){
	// Route
	strokeWeight(2);
	for(let i=0; i<circles.length; i++){
		if(i == 0){
			const forA = circles[i].getCharPos(history[0]);
			const forB = circles[i].getCharPos(history[1]);
			const forC = circles[i+1].getCharPos(history[1]);
			stroke("#ff3333");
			line(forA.x, forA.y, forB.x, forB.y);
			line(forB.x, forB.y, forC.x, forC.y);
			const backA = circles[i].getCharPos(history[6]);
			const backB = circles[i].getCharPos(history[7]);
			stroke("#3333ff");
			line(backA.x, backA.y, backB.x, backB.y);
			continue;
		}
		if(i == 1){
			const forA = circles[i].getCharPos(history[1]);
			const forB = circles[i].getCharPos(history[2]);
			const forC = circles[i+1].getCharPos(history[2]);
			stroke("#ff3333");
			line(forA.x, forA.y, forB.x, forB.y);
			line(forB.x, forB.y, forC.x, forC.y);
			const backA = circles[i].getCharPos(history[5]);
			const backB = circles[i].getCharPos(history[6]);
			const backC = circles[i-1].getCharPos(history[6]);
			stroke("#3333ff");
			line(backA.x, backA.y, backB.x, backB.y);
			line(backB.x, backB.y, backC.x, backC.y);
			continue;
		}
		if(i == 2){
			const forwardA = circles[i].getCharPos(history[2]);
			const forwardB = circles[i].getCharPos(history[3]);
			stroke("#ff3333");
			line(forwardA.x, forwardA.y, forwardB.x, forwardB.y);
			const refA = circles[i].getCharPos(history[3]);
			const refB = circles[i].getCharPos(history[4]);
			stroke("#33ff33");
			line(refA.x, refA.y, refB.x, refB.y);
			const backA = circles[i].getCharPos(history[4]);
			const backB = circles[i].getCharPos(history[5]);
			const backC = circles[i-1].getCharPos(history[5]);
			stroke("#3333ff");
			line(backA.x, backA.y, backB.x, backB.y);
			line(backB.x, backB.y, backC.x, backC.y);
			continue;
		}
	}
}