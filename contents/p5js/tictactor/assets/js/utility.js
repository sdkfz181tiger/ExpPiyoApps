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
// Axios
function loadAxios(url, onSuccess, onError){
	const option = {responseType: "blob"};
	axios.get(url, option).then(res=>{
		res.data.text().then(str=>{
			onSuccess(JSON.parse(str));
		});
	}).catch(err=>{
		onError(err);
	});
}

//==========
// imobile
function loadImobile(path){
	// Axios
	loadAxios(path, json=>{
		const type = (navigator.userAgent.match(/iPhone|Android.+Mobile/))?"sp":"pc";
		const places = [
			{"ad": "banner", "id": "ad_banner"},
			{"ad": "rectangle", "id": "ad_rectangle"}];
		for(place of places){
			const ad = place["ad"];
			const id = place["id"];
			const params = json[ad][type];
			(window.adsbyimobile=window.adsbyimobile||[]).push({
				pid:params["pid"], mid:params["mid"], asid:params["asid"], 
				type:"banner", display:"inline", elementid:id});
		}
		const elem = document.getElementsByTagName("body")[0];
		const imobile = document.createElement("script");
		imobile.src = "//imp-adedge.i-mobile.co.jp/script/v1/spot.js?20220104";
		imobile.setAttribute("async", "true");
		elem.appendChild(imobile);
	}, (err)=>{
		showToast("Error", "0 min ago", "通信エラーです");
	});
}

//==========
// Modal
const btnModal = document.getElementById("btn_modal");
btnModal.addEventListener("click", ()=>{
	const elem = document.getElementById("myModal");
	const modal = new bootstrap.Modal(elem);
	bootstrap.Modal.getInstance(elem).show();
});

const btnRetry = document.getElementById("btn_retry");
btnRetry.addEventListener("click", ()=>{
	location.reload();// Reload
});

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
			const score = alphabeta(board, next, 0, -Infinity, Infinity);
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

function alphabeta(board, turn, depth, alpha, beta){
	const point = 100 - depth;// Point
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
		const next = nextTurn(turn);
		for(let r=0; r<SIZE; r++){
			for(let c=0; c<SIZE; c++){
				if(board[r][c] != MARK_N) continue;
				board[r][c] = turn;// COM
				const score = alphabeta(board, next, depth+1, alpha, beta);
				alpha = Math.max(alpha, score);// Max
				board[r][c] = MARK_N;// Reset
				if(beta <= alpha) break;// Beta cut!!
			}
		}
		return alpha;
	}else{
		const next = nextTurn(turn);
		for(let r=0; r<SIZE; r++){
			for(let c=0; c<SIZE; c++){
				if(board[r][c] != MARK_N) continue;
				board[r][c] = turn;// Player
				const score = alphabeta(board, next, depth+1, alpha, beta);
				beta = Math.min(beta, score);// Min
				board[r][c] = MARK_N;// Reset
				if(beta <= alpha) break;// Alpha cut!!
			}
		}
		return beta;
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