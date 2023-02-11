console.log("utility.js!!");

//==========
// ServiceWorker
navigator.serviceWorker.register("./pwa_sw.js");

//==========
// Mobile
const FLG_MOBILE = "ontouchstart" in window || 0<navigator.maxTouchPoints;

//==========
// Button

class Button extends Sprite{

	constructor(file, x, y, s, onPressed=null){
		super(file, x, y, s);
		this._onPressed = onPressed;
		this._tween     = null;
	}

	press(x, y){
		if(!this.visible) return;
		if(!this.contains(x, y)) return;
		if(this._onPressed) this._onPressed();// Callback
	}
}

//==========
// TicTacTor

const MARK_N = 0;// none
const MARK_O = 1;// o
const MARK_X = 2;// x
const SIZE   = 3;

let turn     = MARK_O;
const player = (Math.random()<0.5)?MARK_O:MARK_X;
const com    = nextTurn(player);

function think(board){
	if(turn != com) return;
	if(isFilled(board)) return;

	// MinMax
	let bestScore = Infinity * -1;
	let choise = {r: -1, c: -1};
	for(let r=0; r<SIZE; r++){
		for(let c=0; c<SIZE; c++){
			if(board[r][c] != MARK_N) continue;
			board[r][c] = com;// Put
			const next = nextTurn(com);// Next
			const score = minmax(board, next, 0);
			if(bestScore < score){
				bestScore = score;
				choise.r = r;
				choise.c = c;
			}
			board[r][c] = MARK_N;// Reset
		}
	}
	// Choise
	console.log("Choise:", choise.r, choise.c);
	board[choise.r][choise.c] = com;// Put
	consoleBoard(board);// Console
	turn = nextTurn(com);// Next
}

function minmax(board, turn, depth){
	const point = 10 - depth;// Point
	// Win / Lose
	if(isWon(board, MARK_O)){
		return (MARK_O==com)?point:-point;
	}
	if(isWon(board, MARK_X)){
		return (MARK_X==com)?point:-point;
	}
	if(isFilled(board)) return 0;// Even

	// COM / Player
	if(turn == com){
		let bestScore = Infinity * -1;
		const next = nextTurn(turn);
		for(let r=0; r<SIZE; r++){
			for(let c=0; c<SIZE; c++){
				if(board[r][c] != MARK_N) continue;
				board[r][c] = turn;// COM
				const score = minmax(board, next, depth+1);
				bestScore = Math.max(bestScore, score);// Max
				board[r][c] = MARK_N;// Reset
			}
		}
		return bestScore;
	}else{
		let bestScore = Infinity;
		const next = nextTurn(turn);
		for(let r=0; r<SIZE; r++){
			for(let c=0; c<SIZE; c++){
				if(board[r][c] != MARK_N) continue;
				board[r][c] = turn;// Player
				const score = minmax(board, next, depth+1);
				bestScore = Math.min(bestScore, score);// Min
				board[r][c] = MARK_N;// Reset
			}
		}
		return bestScore;
	}
}

function isFinished(board){
	if(isWon(board, player)) return true;
	if(isWon(board, com)) return true;
	if(isFilled(board)) return true;
	return false;
}

function isWon(board, turn){

	// Row
	for(let r=0; r<SIZE; r++){
		let flg = true;
		for(let c=0; c<SIZE; c++){
			if(board[r][c] != turn) flg = false;
		}
		if(flg) return true;
	}
	// Col
	for(let c=0; c<SIZE; c++){
		let flg = true;
		for(let r=0; r<SIZE; r++){
			if(board[r][c] != turn) flg = false;
		}
		if(flg) return true;
	}
	// LT -> RB
	let flgLT = true;
	for(let i=0; i<SIZE; i++){
		if(board[i][i] != turn) flgLT = false;
	}
	if(flgLT) return true;
	// RT -> LB
	let flgRT = true;
	for(let i=0; i<SIZE; i++){
		if(board[i][SIZE-1-i] != turn) flgRT = false;
	}
	if(flgRT) return true;

	return false;
}

function nextTurn(turn){
	return (turn==MARK_O) ? MARK_X:MARK_O;
}

function isFilled(board){
	for(let r=0; r<SIZE; r++){
		for(let c=0; c<SIZE; c++){
			if(board[r][c] == MARK_N) return false;
		}
	}
	return true;
}

function consoleBoard(board){
	let line = "";
	for(let r=0; r<SIZE; r++){
		for(let c=0; c<SIZE; c++){
			if(board[r][c] == MARK_N) line += "_";
			if(board[r][c] == MARK_O){
				line += "o";
			}
			if(board[r][c] == MARK_X){
				line += "x";
			}
			if(c < SIZE-1) line += " ";
		}
		line += "\n";
	}
	console.log(line);
}