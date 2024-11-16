console.log("game.js!!");

//==========
// Card
class Card{

	constructor(fileClose, fileOpen, x, y, size){
		this._sprClose = new MySprite(fileClose, x, y, size);
		this._sprOpen = new MySprite(fileOpen, x, y, size);
		this._sprCurrent = this._sprClose;
		this._num = Number(fileOpen.split("_")[2].split(".")[0]);
	}

	get x(){return this._sprCurrent.x;}
	get y(){return this._sprCurrent.y;}
	get num(){return this._num;}

	contains(x, y){return this._sprCurrent.contains(x, y);}

	setPosition(x, y){
		this._sprClose.x = x;
		this._sprClose.y = y;
		this._sprOpen.x = x;
		this._sprOpen.y = y;
	}

	adaptPosition(){
		this.setPosition(this._sprCurrent.x, this._sprCurrent.y);
	}

	isOpened(){return this._sprCurrent == this._sprOpen;}

	isClosed(){return this._sprCurrent == this._sprClose;}

	open(jumpH){
		if(this.isOpened()) return;
		this._sprCurrent = this._sprOpen;
		this._sprCurrent.jump(jumpH, ()=>{
			this.adaptPosition();// Adapt
			console.log("opened:", this._num);
		});
	}

	close(shakeW){
		if(this.isClosed()) return;
		this._sprCurrent = this._sprClose;
		this._sprCurrent.shake(shakeW, ()=>{
			this.adaptPosition();// Adapt
			console.log("closed:", this._num);
		});
	}

	moveTo(x, y, delay, onFinished=null){
		this._sprCurrent.moveTo(x, y, delay, ()=>{
			this.adaptPosition();// Adapt
			if(onFinished) onFinished();
		});
	}

	update(){
		this._sprCurrent.update();
	}
}

// Mark
class Mark{

	constructor(fileBkg, fileNg, fileOk, x, y, size){
		this._sprBkg = new MySprite(fileBkg, x, y, size);
		this._sprNg = new MySprite(fileNg, x, y, size);
		this._sprOk = new MySprite(fileOk, x, y, size);
		this._sprCurrent = this._sprBkg;
		this._finishFlg = true;
	}

	get x(){return this._sprCurrent.x;}
	get y(){return this._sprCurrent.y;}

	contains(x, y){return this._sprCurrent.contains(x, y);}

	isFinished(){return this._finishFlg;}

	setPosition(x, y){
		this._sprBkg.x = x;
		this._sprBkg.y = y;
		this._sprNg.x = x;
		this._sprNg.y = y;
		this._sprOk.x = x;
		this._sprOk.y = y;
	}

	adaptPosition(){
		this.setPosition(this._sprCurrent.x, this._sprCurrent.y);
	}

	jumpNG(jumpH, wait=1200){
		if(this._finishFlg == false) return;
		this._finishFlg = false;
		this._sprCurrent = this._sprNg;
		this._sprCurrent.shake(jumpH, ()=>{
			this.adaptPosition();// Adapt
			setTimeout(()=>{this._finishFlg = true;}, wait);
			console.log("NG");
		});
	}

	jumpOK(jumpH, wait=1200){
		if(this._finishFlg == false) return;
		this._finishFlg = false;
		this._sprCurrent = this._sprOk;
		this._sprCurrent.jump(jumpH, ()=>{
			this.adaptPosition();// Adapt
			setTimeout(()=>{this._finishFlg = true;}, wait);
			console.log("OK");
		});
	}

	reset(){
		this._finishFlg = false;
		this._sprCurrent = this._sprBkg;
	}

	update(){
		this._sprCurrent.update();
	}
}