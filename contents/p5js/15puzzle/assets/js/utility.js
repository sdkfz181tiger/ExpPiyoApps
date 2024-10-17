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
			pid:params["pid"], mid:params["mid"], asid:params["asid"], 
			type:"banner", display:"inline", elementid:id});
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
// Reset
const btnReset = document.getElementById("btn_reset");
btnReset.addEventListener("click", ()=>{
	xdialog.open({title: "RESET?",
		buttons: {
			ok: {text: "RESET", style: "border-radius: 8px; background: orange;"},
			cancel: {text: "CANCEL", style: "border-radius: 8px; background: orange;"}
		},
		body: '<p>リセットしますか?</p>',
		style: "width: 80%; height: auto;",
		onok: ()=>{
			location.reload();// Reload
		}
	});
});

//==========
// Tile

const T_COLORS = [
	"#FFFFFF", "#F44336", "#E91E63", "#9C27B0", "#673Ab7", "#3F51B5", 
	"#2196F3", "#03A9f4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", 
	"#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548"];
const F_COLORS = [
	"#333", "#FFF", "#FFF", "#FFF", "#FFF", "#FFF", 
	"#333", "#333", "#333", "#FFF", "#FFF", "#FFF", 
	"#333", "#333", "#333", "#333", "#FFF", "#FFF"];

class Tile{

	constructor(num, r, c, pad, size, corner){
		this._num    = num;
		this._r      = r;
		this._c      = c;
		this._pad    = pad;
		this._size   = size;
		this._corner = corner;

		this._x   = sX + pad * c;
		this._y   = sY + pad * r;
		this._dX  = this._x;
		this._dY  = this._y;
	}

	get num(){return this._num;}
	get r(){return this._r;}
	get c(){return this._c;}

	set num(n){this._num = n;}
	set r(n){this._r = r;}
	set c(n){this._c = c;}

	change(r, c){
		this._r = r;
		this._c = c;
		this._dX = sX + this._pad * c;
		this._dY = sY + this._pad * r;
	}

	contains(x, y){
		if(x < this._x) return false;
		if(y < this._y) return false;
		if(this._x + this._size < x) return false;
		if(this._y + this._size < y) return false;
		return true;
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
		if(this._num != 0){
			let i = Math.floor(this._num%T_COLORS.length);
			// Background
			noStroke(); fill(T_COLORS[i]);
			square(this._x, this._y, this._size, this._size, this._corner);
			// Font
			fill(F_COLORS[i]); textSize(this._size*0.5); textAlign(CENTER);
			text(this._num, this._x+this._size/2, this._y+this._size*0.7);
		}
	}

	calcDistance(){
		let x = this._dX - this._x;
		let y = this._dY - this._y;
		return x*x+y*y;
	}
}

//==========
// FpzManager

const D_LEFT  = 0;
const D_RIGHT = 1;
const D_UP    = 2;
const D_DOWN  = 3;

class FpzManager{

	constructor(){
		this._grids = 4;
		this._board = [
			[ 1, 2, 3, 4],
			[ 5, 6, 7, 8],
			[ 9,10,11,12],
			[13,14,15, 0]
		];
		this._histories = [];
		this.wanderGrid(3, 3, -1, 100);
	}

	getGrids(){return this._grids;}

	getBoard(){return this._board;}

	pushHistory(fR, fC, tR, tC){
		let history = {fR:fR, fC:fC, tR:tR, tC:tC};
		this._histories.push(history);
	}

	popHistory(){
		let l = this._histories.length - 1;
		if(l < 0) return null;
		let history = this._histories[l];
		this._histories.splice(l, 1);
		return history;
	}

	checkVH(r, c){
		if(this.checkZero(r-1, c)) return this.swapGrid(r, c, r-1, c);
		if(this.checkZero(r+1, c)) return this.swapGrid(r, c, r+1, c);
		if(this.checkZero(r, c-1)) return this.swapGrid(r, c, r, c-1);
		if(this.checkZero(r, c+1)) return this.swapGrid(r, c, r, c+1);
		return {r:-1, c:-1};
	}

	checkZero(r, c){
		if(r < 0) return false;
		if(c < 0) return false;
		if(this._grids-1 < r) return false;
		if(this._grids-1 < c) return false;
		if(this._board[r][c] != 0) return false;
		return true;
	}

	wanderGrid(r, c, prev, cnt){
		if(cnt <= 0) return;
		let dirs = [];
		for(let i=0; i<4; i++) dirs.push(i);
		for(let i=dirs.length-1; 0<i; i--){
			let rdm = Math.floor(Math.random()*i);
			let tmp = dirs[rdm];
			dirs[rdm] = dirs[i];
			dirs[i] = tmp;
		}
		for(let i=0; i<dirs.length; i++){
			let dir = dirs[i];
			let rev = -1;
			if(prev == D_LEFT) rev = D_RIGHT;
			if(prev == D_RIGHT) rev = D_LEFT;
			if(prev == D_UP) rev = D_DOWN;
			if(prev == D_DOWN) rev = D_UP;
			if(dir == rev) continue;
			let oR = 0;
			let oC = 0;
			if(dir == D_LEFT){
				if(c-1<0) continue;
				oC--;
			}
			if(dir == D_RIGHT){
				if(this._grids-1<c+1) continue;
				oC++;
			}
			if(dir == D_UP){
				if(r-1<0) continue;
				oR--;
			}
			if(dir == D_DOWN){
				if(this._grids-1<r+1) continue;
				oR++;
			}
			this._histories.push({fR:r, fC:c, tR:r+oR, tC:c+oC});
			this.swapGrid(r, c, r+oR, c+oC);
			this.wanderGrid(r+oR, c+oC, dir, cnt-1);
			return;
		}
	}

	swapGrid(fR, fC, tR, tC){
		let tmp = this._board[tR][tC];
		this._board[tR][tC] = this._board[fR][fC];
		this._board[fR][fC] = tmp;
		return {r:tR, c:tC};
	}
}