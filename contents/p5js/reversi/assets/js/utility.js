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
	if(elem.classList.contains("show")) return;
	const modal = new bootstrap.Modal(elem);
	bootstrap.Modal.getInstance(elem).show();
});

const btnRetry = document.getElementById("btn_retry");
btnRetry.addEventListener("click", ()=>{
	location.reload();// Reload
});

//==========
// Reversi
const ROWS    = 6;
const COLS    = ROWS;

const T_NONE  = 0;
const T_WHITE = 1;
const T_BLACK = 2;
const T_DIRS  = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
const T_DEPTH = 6;
const T_WAIT  = 2000;

const T_BONUS_TBL = [
	[ 99,-22,  0,  0,-22, 99],
	[-22,-33,  0,  0,-33,-22],
	[  0,  0,  0,  0,  0,  0],
	[  0,  0,  0,  0,  0,  0],
	[-22,-33,  0,  0,-33,-22],
	[ 99,-22,  0,  0,-22, 99]
];

class ReversiManager{

	constructor(sX, sY, gSize){

		// Board
		this._board = Array.from(new Array(ROWS), ()=>new Array(COLS).fill(0));
		this._board[ROWS/2-1][COLS/2-1] = T_WHITE;// 1, 1
		this._board[ROWS/2][COLS/2]     = T_WHITE;// 2, 2
		this._board[ROWS/2][COLS/2-1]   = T_BLACK;// 2, 1
		this._board[ROWS/2-1][COLS/2]   = T_BLACK;// 1, 2
		
		// Turn
		this._turn = T_WHITE;// First
		this._you  = (Math.random() < 0.5) ? T_WHITE:T_BLACK;
		this._com  = this.nextTurn(this._you);

		// Message
		this._msgTurn = "";
		this._msgResult = "";

		// Checker
		this._bdManager = new BoardManager(sX, sY, gSize);
		this._availables = this._bdManager.getAvailables(this._board, this._turn);
		//this._bdManager.trace(this._board);// Trace

		// Pass
		this.checkPass(this._board, this._turn);
	}

	checkPass(board, turn){
		console.log("checkPass:", turn);

		// Available
		if(this._bdManager.isAvailable(board, turn)){
			if(turn != this._com) return;
			setTimeout(()=>{// Timeout
				this.thinkCom(board, this._turn, this._availables);
			}, T_WAIT);
		}else{
			if(this._bdManager.isFinished(board)){
				console.log("Finished!!");
				const result = this._bdManager.judgeBoard(board);
				this._msgResult = "";
				if(result == T_NONE){
					this._msgResult += "Even...";
				}else if(result == this._you){
					this._msgResult += "You win!!";
				}else if(result == this._com){
					this._msgResult += "You lose...";
				}else{
					this._msgResult += "Error...";
				}
				console.log(this._msgResult);
				return;
			}
			// Pass
			console.log("Pass:", turn);
			const nextTurn = this.nextTurn(turn);
			const nextAvailables = this._bdManager.getAvailables(board, nextTurn);
			this._turn = nextTurn;
			this._availables = nextAvailables;
			if(this._turn != this._com) return;
			setTimeout(()=>{// Timeout
				this.thinkCom(board, this._turn, this._availables);
			}, T_WAIT);
		}
	}

	thinkPlayer(x, y){
		if(this._turn != this._you) return;
		const pos = this._bdManager.getRC(this._availables, x, y);
		if(!pos) return;
		console.log("thinkPlayer");
		const nextBoard = this._bdManager.putDisk(this._board, this._turn, pos.r, pos.c);
		const nextTurn = this.nextTurn(this._turn);
		const nextAvailables = this._bdManager.getAvailables(nextBoard, nextTurn);
		// Change
		this._board = nextBoard;
		this._turn = nextTurn;
		this._availables = nextAvailables;
		//this._bdManager.trace(this._board);
		// Pass
		this.checkPass(this._board, this._turn);
	}

	thinkCom(board, turn, availables){
		if(turn != this._com) return;
		console.log("thinkCom");
		let bestScore = Infinity * -1;
		let choise = {r: -1, c: -1};
		for(let available of availables){
			const r = available[0];
			const c = available[1];
			const nextBoard = this._bdManager.putDisk(board, turn, r, c);
			const nextTurn = this.nextTurn(turn);
			const nextAvailables = this._bdManager.getAvailables(nextBoard, nextTurn);
			// MinMax
			const score = this.alphabeta(nextBoard, nextTurn, nextAvailables, 1, -Infinity, Infinity);
			console.log("com:", r, c, score);
			if(bestScore < score){
				bestScore = score;
				choise.r = r;
				choise.c = c;
			}
		}
		console.log("Choise:", choise.r, choise.c, "Score:", bestScore);

		const nextBoard = this._bdManager.putDisk(board, this._turn, choise.r, choise.c);
		const nextTurn = this.nextTurn(this._turn);
		const nextAvailables = this._bdManager.getAvailables(nextBoard, nextTurn);
		// Change
		this._board = nextBoard;
		this._turn = nextTurn;
		this._availables = nextAvailables;
		//this._bdManager.trace(this._board);
		// Pass
		this.checkPass(this._board, this._turn);
	}

	alphabeta(board, turn, availables, depth, alpha, beta){
		if(T_DEPTH < depth) return 0;// Strength
		//console.log("alphabeta[" + turn + "]", "Depth:", depth);

		// Not available
		if(!this._bdManager.isAvailable(board, turn)){
			// Finished or Pass
			if(!this._bdManager.isAvailable(board, this.nextTurn(turn))){
				// Finished
				const result = this._bdManager.judgeBoard(board);
				const score = 999 - depth;// Score
				if(result == 0) return 0;
				if(result == this._you) return -score;
				if(result == this._com) return score;
			}else{
				// Pass
				const nextTurn = this.nextTurn(turn);
				const nextAvailables = this._bdManager.getAvailables(board, nextTurn);
				return this.alphabeta(board, nextTurn, nextAvailables, depth, alpha, beta);
			}
		}

		// Com or You
		if(turn == this._com){
			for(let available of availables){
				const r = available[0];
				const c = available[1];
				const nextBoard = this._bdManager.putDisk(board, turn, r, c);
				const nextTurn = this.nextTurn(turn);
				const nextAvailables = this._bdManager.getAvailables(nextBoard, nextTurn);
				// MinMax
				let score = this.alphabeta(nextBoard, nextTurn, nextAvailables, depth+1, alpha, beta);
				score += this._bdManager.evaluateBoard(nextBoard, depth, r, c, 1);
				alpha = Math.max(alpha, score);// Max
				if(beta <= alpha) break;// Alpha cut!!
			}
			return alpha;
		}else{
			for(let available of availables){
				const r = available[0];
				const c = available[1];
				const nextBoard = this._bdManager.putDisk(board, turn, r, c);
				const nextTurn = this.nextTurn(turn);
				const nextAvailables = this._bdManager.getAvailables(nextBoard, nextTurn);
				// MinMax
				let score = this.alphabeta(nextBoard, nextTurn, nextAvailables, depth+1, alpha, beta);
				score += this._bdManager.evaluateBoard(nextBoard, depth, r, c, -1);
				beta = Math.min(beta, score);// Min
				if(beta <= alpha) break;// Beta cut!!
			}
			return beta;
		}
	}

	nextTurn(turn){
		return (turn == T_WHITE) ? T_BLACK:T_WHITE;
	}

	update(){
		this._bdManager.drawBoard(this._board);// Board
		this._bdManager.drawAvailables(this._availables, (this._turn==this._you));// Availables
		this.drawMsg();// Message
	}

	drawMsg(){

		fill("#333333"); noStroke();
		textSize(FONT_SIZE); textAlign(CENTER, TOP);
		const gSize = this._bdManager.gSize;

		// Turn
		const msgTurn = (this._turn == this._you) ? "You":"Com";
		textAlign(LEFT, TOP);
		text(msgTurn, 10, cY+gSize*3+10);

		// Result
		const msgResult = "***";
		textAlign(RIGHT, TOP);
		text(this._msgResult, width-10, cY+gSize*3+10);
	}
}

class BoardManager{

	constructor(sX, sY, gSize){
		this._sX = sX;
		this._sY = sY;
		this._gSize = gSize;
	}

	judgeBoard(board){

		let cntWhite = 0;
		let cntBlack = 0;
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				if(board[r][c] == T_WHITE) cntWhite++;
				if(board[r][c] == T_BLACK) cntBlack++;
			}
		}
		if(cntBlack < cntWhite) return T_WHITE;// White win
		if(cntWhite < cntBlack) return T_BLACK;// Black win
		return 0;// Even
	}

	isFinished(board){
		if(this.isAvailable(board, T_WHITE)) return false;// not finished
		if(this.isAvailable(board, T_BLACK)) return false;// not finished
		return true;
	}

	isAvailable(board, turn){
		return 0 < this.getAvailables(board, turn).length;
	}

	getAvailables(board, turn){
		const availables = [];
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				if(board[r][c] != T_NONE) continue;
				let flg = false;
				for(let dir of T_DIRS){
					const cnt = this.checkDisk(board, turn, r, c, dir, 0);
					if(cnt <= 0) continue;
					flg = true;
				}
				if(flg) availables.push([r, c]);// Push
			}
		}
		return availables;
	}

	putDisk(board, turn, r, c){
		if(r < 0 || c < 0) return board;
		if(ROWS-1 < r || COLS-1 < c) return board;

		// Copy
		const nextBoard = JSON.parse(JSON.stringify(board));
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				nextBoard[r][c] = board[r][c];
			}
		}
		// Put
		nextBoard[r][c] = turn;
		for(let dir of T_DIRS){
			const cnt = this.checkDisk(nextBoard, turn, r, c, dir, 0);
			if(cnt <= 0) continue;
			for(let i=0; i<cnt; i++){
				const oR = r + dir[0] * (i+1);
				const oC = c + dir[1] * (i+1);
				nextBoard[oR][oC] = turn;// Turn
			}
		}
		return nextBoard;
	}

	checkDisk(board, turn, r, c, dir, cnt){
		const oR = r + dir[0];
		const oC = c + dir[1];
		if(oR < 0 || ROWS-1<oR) return 0;
		if(oC < 0 || COLS-1<oC) return 0;
		const type = board[oR][oC];
		if(type == T_NONE) return 0;
		if(type != turn){
			return this.checkDisk(board, turn, oR, oC, dir, cnt+1);
		}
		if(type == turn && 0 < cnt) return cnt;
		return 0;
	}

	evaluateBoard(board, depth, r, c, flg){
		let score = T_BONUS_TBL[r][c] * flg * 3;
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				if(board[r][c] == T_NONE) continue;
				score += T_BONUS_TBL[r][c] * flg;
			}
		}
		return score;
	}

	trace(board){
		// Trace
		let str = "== Board ==\n";
		for(let r=0; r<ROWS; r++){
			str += "| ";
			for(let c=0; c<COLS; c++) str += board[r][c] + " ";
			str += "|\n";
		}
		str += "===========";
		console.log(str);
	}

	getRC(availables, x, y){
		if(x < this._sX) return null;
		if(y < this._sY) return null;
		if(this._sX + COLS*this._gSize < x) return null;
		if(this._sY + ROWS*this._gSize < y) return null;
		const r = Math.floor((y-this._sY)/this._gSize);
		const c = Math.floor((x-this._sX)/this._gSize);
		for(let available of availables){
			if(available[0] != r) continue;
			if(available[1] != c) continue;
			return {r: r, c: c};
		}
		return null;
	}

	get sX(){return this._sX;}
	get sY(){return this._sY;}
	get gSize(){return this._gSize;}

	drawBoard(board){
		// Board
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				const x = this._sX + this._gSize*c;
				const y = this._sY + this._gSize*r;
				fill("#008800");
				noStroke();
				square(x, y, this._gSize-2);
				if(board[r][c] == T_NONE) continue;
				const color = (board[r][c] == T_WHITE) ? "#ffffff":"#000000";
				fill(color);
				circle(x+this._gSize/2, y+this._gSize/2, this._gSize/2);
			}
		}
	}

	drawAvailables(availables, flg){
		// Availables
		for(let available of availables){
			const x = this._sX + this._gSize * available[1];
			const y = this._sY + this._gSize * available[0];
			const color = (flg) ? "#dddd00":"#99cc99";
			fill(color);
			square(x, y, this._gSize-2);
		}
	}
}