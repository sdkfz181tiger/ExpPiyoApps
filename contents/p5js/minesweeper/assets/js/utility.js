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
// Retry
const btnRetry = document.getElementById("btn_retry");
btnRetry.addEventListener("click", ()=>{
	xdialog.open({title: "RETRY?",
		buttons: {
			ok: {text: "RETRY", style: "border-radius: 8px; background: orange;"}
		},
		body: "<p>リトライしますか?</p>",
		style: "max-width: 80%; height: auto;",
		onok: ()=>{
			location.reload();// Reload
		}
	});
});

//==========
// MineSweeper
class Tile{

	constructor(r, c, g, m, s){
		this._r = r;
		this._c = c;
		this._g = g * 0.95;
		this._m = m;
		this._s = s;
		this._x = c * g + width / 2 - g * MS_GRIDS / 2;
		this._y = r * g + height / 2 - g * MS_GRIDS / 2;
		this._opened = false;
	}

	getR(){return this._r;}

	getC(){return this._c;}

	isMine(){return this._m==1;}
	
	isOpened(){return this._opened;}

	open(){this._opened = true;}

	close(){this._opened = false;}

	draw(){
		if(!this._opened){
			this.drawClosed();
		}else{
			this.drawOpened();
		}
	}

	mousePressed(x, y){
		if(x < this._x) return false;
		if(y < this._y) return false;
		if(this._x + this._g < x) return false;
		if(this._y + this._g < y) return false;
		return true;
	}

	drawClosed(){
		// Background
		fill("#AAAAAA"); noStroke();
		square(this._x, this._y, this._g, 5);
	}

	drawOpened(){
		// Background
		let tColor = (this._m == 1) ? color("#FF9999") : color("#CCCCCC");
		fill(tColor); noStroke();
		square(this._x, this._y, this._g, 5);
		// Font
		let str = "";
		if(this._m == 1) str = "X";
		if(this._s != 0) str = this._s;
		fill("#333333"); textSize(this._g*0.8); textAlign(CENTER, BASELINE);
		text(str, this._x+this._g/2, this._y+this._g*0.75);
	}
}

class MineSweeperManager{

	constructor(rows, cols, mines){
		this._rows      = rows;
		this._cols      = cols;
		this._tblMine   = [];
		this._tblSensor = [];
		this._tblSearch = [];
		this.initTrap(mines);
		this.initSensor();
		this.initSearch();
	}

	getMine(){return this._tblMine;}
	getSensor(){return this._tblSensor;}
	getSearch(){return this._tblSearch;}

	initTrap(mines){
		this._tblMine = [];
		for(let r=0; r<this._rows; r++){
			let line = [];
			for(let c=0; c<this._cols; c++){
				line.push(0);
			}
			this._tblMine.push(line);
		}
		let arr = [];
		let total = this._rows*this._cols;
		for(let b=0; b<total; b++){
			if(b < mines){
				arr.push(1);
			}else{
				arr.push(0);
			}
		}
		for(let b=total-1; 0<b; b--){
			let rdm = Math.floor(Math.random() * (b-1));
			let tmp = arr[rdm];
			arr[rdm] = arr[b];
			arr[b] = tmp;
		}
		for(let b=0; b<total; b++){
			let r = Math.floor(b / this._cols);
			let c = Math.floor(b % this._cols);
			this._tblMine[r][c] = arr[b];
		}
	}

	initSensor(){
		this._tblSensor = [];
		for(let r=0; r<this._rows; r++){
			let line = [];
			for(let c=0; c<this._cols; c++){
				line.push(0);
			}
			this._tblSensor.push(line);
		}
		for(let r=0; r<this._rows; r++){
			for(let c=0; c<this._cols; c++){
				if(this.checkTrap(r, c, -1, -1)) this._tblSensor[r][c]++;
				if(this.checkTrap(r, c, -1, 0))  this._tblSensor[r][c]++;
				if(this.checkTrap(r, c, -1, 1))  this._tblSensor[r][c]++;
				if(this.checkTrap(r, c, 0, -1))  this._tblSensor[r][c]++;
				if(this.checkTrap(r, c, 0, 1))   this._tblSensor[r][c]++;
				if(this.checkTrap(r, c, 1, -1))  this._tblSensor[r][c]++;
				if(this.checkTrap(r, c, 1, 0))   this._tblSensor[r][c]++;
				if(this.checkTrap(r, c, 1, 1))   this._tblSensor[r][c]++;
			}
		}
	}

	initSearch(){
		this._tblSearch = [];
		for(let r=0; r<this._rows; r++){
			let line = [];
			for(let c=0; c<this._cols; c++){
				line.push(0);
			}
			this._tblSearch.push(line);
		}
	}

	sweep(r, c){
		this.initSearch();
		if(this._tblMine[r][c] == 1) return true;
		this.recursive(r, c);
		return false;
	}

	recursive(r, c){
		if(this._tblSearch[r][c] == 1) return;
		this._tblSearch[r][c] = 1;
		if(this._tblSensor[r][c] != 0) return;
		if(this.checkSpace(r, c, 1, 0))  this.recursive(r+1, c);
		if(this.checkSpace(r, c, -1, 0)) this.recursive(r-1, c);
		if(this.checkSpace(r, c, 0, 1))  this.recursive(r, c+1);
		if(this.checkSpace(r, c, 0, -1)) this.recursive(r, c-1);
	}

	checkSpace(r, c, x, y){
		let cR = r + x;
		let cC = c + y;
		if(cR < 0) return false;
		if(cC < 0) return false;
		if(this._rows <= cR) return false;
		if(this._cols <= cC) return false;
		if(this._tblMine[cR][cC] == 1) return false;
		return true;
	}

	checkTrap(r, c, x, y){
		let cR = r + x;
		let cC = c + y;
		if(cR < 0) return false;
		if(cC < 0) return false;
		if(this._rows <= cR) return false;
		if(this._cols <= cC) return false;
		if(this._tblMine[r][c] == 1) return false;
		if(this._tblMine[cR][cC] == 0) return false;
		return true;
	}

	consoleAll(){
		console.log("=Mine=");
		this.consoleTable(this._tblMine);
		console.log("=Sensor=");
		this.consoleTable(this._tblSensor);
		console.log("=Search=");
		this.consoleTable(this._tblSearch);
	}

	consoleTable(table){
		let line = "";
		for(let c=0; c<this._cols*2; c++) line += "-";
		line += "-\n";
		for(let r=0; r<this._rows; r++){
			line += "|";
			for(let c=0; c<this._cols; c++){
				let n = table[r][c];
				line += n;
				if(c < this._cols-1) line += ",";
			}
			line += "|\n";
		}
		for(let c=0; c<this._cols*2; c++) line += "-";
		line += "-\n";
		console.log(line);
	}
}