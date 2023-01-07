console.log("utility.js!!");

//==========
// ServiceWorker
navigator.serviceWorker.register("./pwa_sw.js");

//==========
// MyButton

class MyButton{

	constructor(file, onPressed=null){
		this._img = loadImage("./assets/images/" + file);
		this._onPressed = onPressed;
		this.setPos(24, 24);// Default
	}

	setPos(x, y, size=32){
		this._size = size;
		this._x = x - this._size*0.5;
		this._y = y - this._size*0.5;
		this._corner = this._size * 0.1;
		this._sizeC = this._size * 0.6;
		this._xC = this._x + this._size*0.5 - this._sizeC*0.5;
		this._yC = this._y + this._size*0.5 - this._sizeC*0.5;
	}

	checkBtn(){
		if(mouseX < this._x) return;
		if(mouseY < this._y) return;
		if(this._x + this._size < mouseX) return;
		if(this._y + this._size < mouseY) return;
		if(this._onPressed) this._onPressed();
	}

	drawBtn(){
		fill("#0D6EFD");
		square(this._x, this._y, this._size, this._corner);
		image(this._img, this._xC, this._yC, this._sizeC, this._sizeC);
	}
}

//==========
// Tetris

let MINO_I = [
	[0, 1, 0, 0,
	 0, 1, 0, 0,
	 0, 1, 0, 0,
	 0, 1, 0, 0],
	[0, 0, 0, 0,
	 1, 1, 1, 1,
	 0, 0, 0, 0,
	 0, 0, 0, 0]
];

let MINO_L = [
	[0, 2, 0, 0,
	 0, 2, 0, 0,
	 0, 2, 2, 0,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 2, 2, 2,
	 0, 2, 0, 0,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 2, 2, 0,
	 0, 0, 2, 0,
	 0, 0, 2, 0],
	[0, 0, 0, 0,
	 0, 0, 2, 0,
	 2, 2, 2, 0,
	 0, 0, 0, 0]
];

let MINO_J = [
	[0, 0, 3, 0,
	 0, 0, 3, 0,
	 0, 3, 3, 0,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 3, 0, 0,
	 0, 3, 3, 3,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 3, 3, 0,
	 0, 3, 0, 0,
	 0, 3, 0, 0],
	[0, 0, 0, 0,
	 3, 3, 3, 0,
	 0, 0, 3, 0,
	 0, 0, 0, 0]
];

let MINO_O = [
	[0, 0, 0, 0,
	 0, 4, 4, 0,
	 0, 4, 4, 0,
	 0, 0, 0, 0]
];

let MINO_Z = [
	[0, 0, 0, 0,
	 0, 5, 5, 0,
	 0, 0, 5, 5,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 0, 5, 0,
	 0, 5, 5, 0,
	 0, 5, 0, 0]
];

let MINO_S = [
	[0, 0, 0, 0,
	 0, 6, 6, 0,
	 6, 6, 0, 0,
	 0, 0, 0, 0],
	[0, 6, 0, 0,
	 0, 6, 6, 0,
	 0, 0, 6, 0,
	 0, 0, 0, 0]
];

let MINO_T = [
	[0, 0, 0, 0,
	 0, 7, 0, 0,
	 7, 7, 7, 0,
	 0, 0, 0, 0],
	[0, 7, 0, 0,
	 0, 7, 7, 0,
	 0, 7, 0, 0,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 7, 7, 7,
	 0, 0, 7, 0,
	 0, 0, 0, 0],
	[0, 0, 7, 0,
	 0, 7, 7, 0,
	 0, 0, 7, 0,
	 0, 0, 0, 0]
];

const T_ROWS   = 20;
const T_COLS   = 10;
const T_MINOS  = [MINO_I, MINO_L, MINO_J, MINO_O, MINO_S, MINO_Z, MINO_T];
const T_COLORS = [
	"#FFFFFF", "#F44336", "#E91E63", "#9C27B0", "#673Ab7", "#3F51B5", 
	"#2196F3", "#03A9f4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", 
	"#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548"];

class TetrisManager{

	constructor(){
		this._grids = [];
		this._mino  = null;
		this.init();
	}

	init(){
		let total = T_ROWS * T_COLS;
		for(let t=0; t<total; t++){
			this._grids.push(0);
		}
		this.createMino();
		this.updateTetris();// Update
	}

	updateTetris(){
		this.stepDown();
		if(this.checkCollision()){
			this.stepUp();
			this.fixMino();
			this.createMino();
		}
		this.checkLines(T_ROWS-1);
		setTimeout(()=>{this.updateTetris();}, 1000);
	}

	createMino(){
		this._mino = new Mino(0, 3);
	}

	fixMino(){
		let size = this._mino.size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				let iR = r+this._mino.r;
				let iC = c+this._mino.c;
				let i = iR*T_COLS + iC;
				if(iR < 0 || iC < 0) continue;
				if(T_ROWS < iR) continue;
				if(T_COLS < iC) continue;
				if(this._mino.getGrid(r, c) == 0) continue;
				if(this._grids[i] != 0) continue;
				this._grids[i] = this._mino.getGrid(r, c);
			}
		}
	}

	checkCollision(){
		let size = this._mino.size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				let iR = r+this._mino.r;
				let iC = c+this._mino.c;
				let i = iR*T_COLS + iC;
				if(this._mino.getGrid(r, c) == 0) continue;
				if(this._grids[i] != 0) return true;
				if(T_ROWS-1 < iR) return true;
			}
		}
		return false;
	}

	checkWallL(){
		let size = this._mino.size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				let iC = c+this._mino.c-1;
				if(this._mino.getGrid(r, c) == 0) continue;
				if(iC < 0) return true;
			}
		}
		return false;
	}

	checkWallR(){
		let size = this._mino.size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				let iC = c+this._mino.c+1;
				if(this._mino.getGrid(r, c) == 0) continue;
				if(T_COLS <= iC) return true;
			}
		}
		return false;
	}

	checkRotation(){
		if(this._mino.c < 0){
			this._mino.c = -this._mino.getLIndex();
		}
		if(T_COLS < this._mino.c+this._mino.size){
			this._mino.c = (T_COLS-1) - this._mino.getRIndex();
		}
	}

	checkLines(last){
		for(let r=last; 0<=r; r--){
			let filled = true;
			for(let c=0; c<T_COLS; c++){
				let n = this._grids[r*T_COLS+c];
				if(n != 0) continue;
				filled = false;
			}
			if(filled == true){
				this._grids.splice(r*T_COLS, T_COLS);// Delete and fill
				for(let i=0; i<T_COLS; i++) this._grids.unshift(0);
				this.checkLines(r);// Recursive
			}
		}
	}

	stepUp(){
		this._mino.stepUp();
	}

	stepDown(){
		this._mino.stepDown();
	}

	stepLeft(){
		this._mino.stepLeft();
	}

	stepRight(){
		this._mino.stepRight();
	}

	rotateL(){
		this._mino.rotateL();
	}

	rotateR(){
		this._mino.rotateR();
	}

	check(){
		let data = [];
		for(let n of this._grids) data.push(n);
		let size = this._mino.size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				let iR = r+this._mino.r;
				let iC = c+this._mino.c;
				let i = iR*T_COLS + iC;
				if(iR < 0 || iC < 0) continue;
				if(T_ROWS < iR) continue;
				if(T_COLS <= iC) continue;
				if(this._mino.getGrid(r, c) == 0) continue;
				if(data[i] != 0) continue;
				data[i] = this._mino.getGrid(r, c);
			}
		}
		let str = "=======================\n";
		for(let r=0; r<T_ROWS; r++){
			let line = "| ";
			for(let c=0; c<T_COLS; c++){
				let iG = r*T_COLS + c;
				line += (data[iG]==0) ? "  ":data[iG]+" ";
			}
			str += line + "|\n";
		}
		str += "=======================\n";
		//console.clear();
		//console.log(str);
		return data;
	}
}

class Mino{

	constructor(r, c){
		this._r = r;
		this._c = c;
		this._s = 4;
		this._i = 0;
		this._j = 0;
		this._m = null;
		this.init();
	}

	set r(n){this._r=n;}
	set c(n){this._c=n;}
	get r(){return this._r;}
	get c(){return this._c;}
	get size(){return this._s;}

	init(){
		this._i = floor(Math.random()*T_MINOS.length);
		this._j = floor(Math.random()*T_MINOS[this._i].length);
		this._m = T_MINOS[this._i][this._j];
	}

	getGrid(r, c){
		let i = r*this._s + c;
		return this._m[i];
	}

	stepUp(){this._r--;}

	stepDown(){this._r++;}

	stepLeft(){this._c--;}

	stepRight(){this._c++;}

	rotateL(){
		this._j--;
		if(this._j < 0) this._j = T_MINOS[this._i].length - 1;
		this._m = T_MINOS[this._i][this._j];
	}

	rotateR(){
		this._j++;
		if(MINOS[this._i].length <= this._j) this._j = 0;
		this._m = T_MINOS[this._i][this._j];
	}

	getLIndex(){
		for(let c=0; c<this._s; c++){
			for(let r=0; r<this._s; r++){
				let i = r*this._s + c;
				if(this._m[i] != 0) return c;
			}
		}
		return 0;
	}

	getRIndex(){
		for(let c=this._s-1; 0<=c; c--){
			for(let r=this._s-1; 0<=r; r--){
				let i = r*this._s + c;
				if(this._m[i] != 0) return c;
			}
		}
		return 0;
	}
}