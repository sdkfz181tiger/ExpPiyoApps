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
function loadImobile(path, ad, id){
	// Axios
	loadAxios(path, json=>{
		const type = (navigator.userAgent.match(/iPhone|Android.+Mobile/))?"sp":"pc";
		const params = json[ad][type];
		console.log(params);
		(window.adsbyimobile=window.adsbyimobile||[]).push({
			pid:params["pid"], mid:params["mid"], asid:params["asid"], type:"banner", display:"inline",
			elementid:id});
		const elem = document.getElementById(id);
		const imobile = document.createElement("script");
		imobile.src = "//imp-adedge.i-mobile.co.jp/script/v1/spot.js?20220104";
		imobile.setAttribute("async", "true");
		elem.after(imobile);
	}, (err)=>{
		showToast("Error", "0 min ago", "通信エラーです");
	});
}

//==========
// Flick

class FlickManager{

	constructor(thre, onFlicked){
		this._thre = thre**2;
		this._onFlicked = onFlicked;
		this._touchFlg = false;
		this._fX = 0;
		this._fY = 0;
	}

	touchStarted(){
		//console.log("touchStarted");
		if(this._touchFlg) return;
		this._touchFlg = true;
		this._fX = mouseX;
		this._fY = mouseY;
	}

	touchMoved(){
		//console.log("touchMoved");
		if(!this._touchFlg) return;

		const dist = (this._fX-mouseX)**2 + (this._fY-mouseY)**2;
		if(this._thre < dist){
			const rad = Math.atan2(mouseY-this._fY, mouseX-this._fX);
			const deg = (Math.floor(rad*180/Math.PI)+360) % 360;
			//console.log(deg, mouseY-this._fY, mouseX-this._fX);
			if(deg < 45){
				//console.log(deg, dist, "right");
				this._onFlicked({dir:"right", fX:this._fX, fY:this._fY});
			}else if(deg < 135){
				//console.log(deg, dist, "down");
				this._onFlicked({dir:"down", fX:this._fX, fY:this._fY});
			}else if(deg < 225){
				//console.log(deg, dist, "left");
				this._onFlicked({dir:"left", fX:this._fX, fY:this._fY});
			}else if(deg < 315){
				//console.log(deg, dist, "up");
				this._onFlicked({dir:"up", fX:this._fX, fY:this._fY});
			}else{
				//console.log(deg, dist, "right");
				this._onFlicked({dir:"right", fX:this._fX, fY:this._fY});
			}
		}
		this._fX = mouseX;
		this._fY = mouseY;
	}

	touchEnded(){
		//console.log("touchEnded");
		this._touchFlg = false;
		this._fX = mouseX;
		this._fY = mouseY;
	}
}

//==========
// 2048

class Tile{

	constructor(n, x, y, c){
		this._n = n;
		this._x = x;
		this._y = y;
		this._c = c;
		this._dX = x;
		this._dY = y;
	}

	moveTo(gR, gC){
		this._dX = this._x + gC * tilePad;
		this._dY = this._y + gR * tilePad;
	}

	draw(){
		// Move
		if(this.calcDistance() < 4){
			this._x = this._dX;
			this._y = this._dY;
		}else{
			this._x += (this._dX - this._x) / 2;
			this._y += (this._dY - this._y) / 2;
		}
		if(this._n == 0) return;
		// Background
		noStroke(); fill(this._c);
		square(this._x, this._y, tileSize, tileCorner);
		// Font
		let size = tileSize * 0.6;
		if(this._n.toString().length == 2) size = tileSize * 0.5;
		if(this._n.toString().length == 3) size = tileSize * 0.4;
		if(this._n.toString().length == 4) size = tileSize * 0.3;
		if(this._n.toString().length == 5) size = tileSize * 0.2;
		if(5 < this._n.toString().length) size = tileSize * 0.1;
		fill("#333333"); textSize(size); textAlign(CENTER, CENTER);
		text(this._n, this._x+tileSize/2, this._y+tileSize/2-size*0.1);
	}

	calcDistance(){
		let x = this._dX - this._x;
		let y = this._dY - this._y;
		return x*x+y*y;
	}
}

class Smz2048{

	constructor(){
		this._size = 4;
		this._board = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		];
		this._copy = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		];
		this._moves = [];
		this._history = [];
		this.copyBoard();
	}

	slideLeft(){
		this._moves = [];
		this.copyBoard();
		for(let r=0; r<this._size; r++){
			this.slideCells(r, 0, 0, 1);
		}
		return this.isChanged();
	}

	slideRight(){
		this._moves = [];
		this.copyBoard();
		for(let r=0; r<this._size; r++){
			this.slideCells(r, this._size-1, 0, -1);
		}
		return this.isChanged();
	}

	slideUp(){
		this._moves = [];
		this.copyBoard();
		for(let c=0; c<this._size; c++){
			this.slideCells(0, c, 1, 0);
		}
		return this.isChanged();
	}

	slideDown(){
		this._moves = [];
		this.copyBoard();
		for(let c=0; c<this._size; c++){
			this.slideCells(this._size-1, c, -1, 0);
		}
		return this.isChanged();
	}

	getSize(){return this._size;}

	getBoard(){return this._board;}

	getScore(){
		let size = this._size;
		let score = 0;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				score += this._board[r][c];
			}
		}
		return score;
	}

	getMove(r, c){
		for(let i=0; i<this._moves.length; i++){
			let move = this._moves[i];
			if(move.tR == r && move.tC == c) return move;
		}
		return null;
	}

	slideCells(r, c, dR, dC){
		if(dR == 0 && dC == 0) return;
		if(!this.isInside(r)) return;
		if(!this.isInside(c)) return;
		if(!this.isInside(r+dR)) return;
		if(!this.isInside(c+dC)) return;
		//console.log("=> slideCells[", r, c, "]");
		if(this.browCells(r, c, dR, dC)){
			this.slideCells(r, c, dR, dC);
		}else{
			this.slideCells(r+dR, c+dC, dR, dC);
		}
	}

	browCells(r, c, dR, dC){
		let tR = r + dR;
		let tC = c + dC;
		while(this.isInside(tR) && this.isInside(tC)){
			if(this._board[r][c] == 0){
				if(this._board[tR][tC] != 0){
					//console.log("swap[", tR, tC, "]->[", r, c, "]");
					this.swapCells(tR, tC, r, c);
					this._moves.push({gR:r-tR, gC:c-tC, tR:tR, tC:tC});
					return true;
				}
			}else{
				if(this._board[r][c] == this._board[tR][tC]){
					//console.log("combine[", tR, tC, "]->[", r, c, "]");
					this.combineCells(tR, tC, r, c);
					this._moves.push({gR:r-tR, gC:c-tC, tR:tR, tC:tC});
					return false;
				}
				if(this._board[tR][tC] != 0){
					//console.log("pass[", tR, tC, "]->[", r, c, "]");
					return false;
				}
			}
			tR += dR;
			tC += dC;
		}
		return false;
	}

	combineCells(fromR, fromC, toR, toC){
		this._board[toR][toC] += this._board[fromR][fromC];
		this._board[fromR][fromC] = 0;
	}

	swapCells(fromR, fromC, toR, toC){
		let tmp = this._board[toR][toC];
		this._board[toR][toC] = this._board[fromR][fromC];
		this._board[fromR][fromC] = tmp;
	}

	isInside(n){
		if(n < 0) return false;
		if(this._size <= n) return false;
		return true;
	}

	isChanged(){
		let size = this._size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				if(this._board[r][c] != this._copy[r][c]) return true;
			}
		}
		return false;
	}

	copyBoard(){
		let size = this._size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				this._copy[r][c] = this._board[r][c];
			}
		}
	}

	randomPut(n = 2){
		let size = this._size;
		let arr = [];
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				if(this._board[r][c] == 0) arr.push({r:r, c:c});
			}
		}
		if(arr.length <= 0) return false;
		let i = Math.floor(Math.random() * arr.length);
		let r = arr[i].r;
		let c = arr[i].c;
		this._last = {r:r, c:c};
		this._board[r][c] = n;
		return true;
	}

	checkGameOver(){
		let size = this._size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				if(this._board[r][c] == 0) return false;
				if(r < size-1){
					if(this._board[r][c] == this._board[r+1][c]){
						return false;
					}
				}
				if(c < size-1){
					if(this._board[r][c] == this._board[r][c+1]){
						return false;
					}
				}
			}
		}
		return true;
	}

	pushHistory(){
		let arr = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		];
		let size = this._size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				arr[r][c] = this._board[r][c];
			}
		}
		this._history.push(arr);
	}

	popHistory(){
		if(this._history.length < 2) return;
		this._history.pop();
		let arr = this._history.pop();
		let size = this._size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				this._board[r][c] = arr[r][c];
			}
		}
		this.pushHistory();
		this.consoleBoard();
	}

	consoleBoard(){
		let size = this._size;
		let line = "SCORE:" + this.getScore();
		while(line.length < 17){
			line = line + "-";
			if(line.length < 17) line = "-" + line;
		}
		line += "\n";
		for(let r=0; r<size; r++){
			line += "|";
			for(let c=0; c<size; c++){
				let n = this._board[r][c];
				if(n < 10){
					line += "  " + n;
				}else if(n < 100){
					line += " " + n;
				}else{
					line += n;
				}
				if(c < size-1) line += ",";
			}
			line += "|\n";
		}
		line += "-----------------";
		console.log(line);
	}
}