console.log("utility.js!!");

//==========
// ServiceWorker
navigator.serviceWorker.register("./pwa_sw.js");

//==========
// Toast
function showToast(title, sub, msg, autohide=true, delay=400){
	// Object
	if(typeof(msg) == "object"){
		const props = Object.getOwnPropertyNames(msg);
		for(let prop of props){
			setTimeout(()=>popToast(title, sub, msg[prop], autohide), delay);
			delay += delay;
		}
		return;
	}
	setTimeout(()=>popToast(title, sub, msg, autohide), delay);
}

function popToast(title, sub, msg, autohide=true){
	if(typeof(msg) == "object") return;
	if(100 < msg.length) return;
	// Clone
	const base = document.querySelector(".toast");
	const clone = base.cloneNode(true);
	clone.querySelector("strong").innerText = title;
	clone.querySelector("small").innerText = sub;
	clone.querySelector(".toast-body").innerText = msg;
	// Event
	clone.addEventListener("shown.bs.toast", ()=>{
		//console.log("shown");
	});
	clone.addEventListener("hidden.bs.toast", ()=>{
		//console.log("hidden");
		clone.remove();// Remove
	});
	clone.classList.remove("d-none");
	// Append
	const container = document.querySelector(".toast-container");
	container.appendChild(clone);
	// Toast
	const toast = new bootstrap.Toast(clone, {autohide: autohide});
	toast.show();
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
// Notification
function sendNotification(title, body, timeout=12000){
	console.log("sendNotification:", title);
	if(!Push.Permission.has()){
		Push.Permission.request(()=>{
			console.log("onGranted!!");
			const status = Push.Permission.get();// Status
			console.log(status);
			createNotification(title, body, timeout);
		}, ()=>{
			console.log("onDenied!!");
			const status = Push.Permission.get();// Status
			console.log(status);
		});
		return;
	}
	createNotification(title, body, timeout);
}

function createNotification(title, body, timeout=12000){

	Push.create(title, {
		body: body,
		icon: "./assets/images/logo.png",
		tag: "myTag",
		timeout: timeout,
		vibrate: [100, 100, 100],
		onClick: function(e){
			console.log("onClick", e);
		},
		onShow: function(e){
			console.log("onShow", e);
		},
		onClose: function(e){
			console.log("onClose", e);
		},
		onError: function(e){
			console.log("onError", e);
		}
	});
}

//==========
// Calculator
const ST_VAL1 = 1;// 値1状態
const ST_VAL2 = 2;// 値2状態

class CalcManager{

	constructor(){
		console.log("CalcManager");

		this._state = null;
		this._val1  = null;
		this._val2  = null;
		this._op    = null;
		this.clear();
	}

	clear(){
		this._state = ST_VAL1;
		this._val1  = "0";
		this._val2  = "";
		this._op    = "";
	}

	put(value){

		// 数値1状態
		if(this._state == ST_VAL1){
			if(this.isNumeric(value)){// 数値の場合
				this._val1 += value;
				if(1 < this._val1.length && this._val1[0] == 0){
					this._val1 = this._val1.substr(1);
				}
			}
			if(this.isFlg(value)){// +-反転の場合
				this._val1 = this.changeFlg(this._val1);// 符号反転
			}
			if(this.isOperator(value)){// 演算子の場合
				this._op = value;
				this._state = ST_VAL2;// 数値2状態へ
			}
			if(this.isClear(value)){// Cボタン
				this.clear();
			}

			if(this._state == ST_VAL1) return this._val1;
			if(this._state == ST_VAL2) return (this._val2.length<=0)?this._val1:this._val2;
			return null;
		}

		// 数値2状態
		if(this._state == ST_VAL2){
			if(this.isNumeric(value)){// 数値の場合
				this._val2 += value;
				if(1 < this._val2.length && this._val2[0] == 0){
					this._val2 = this._val2.substr(1);
				}
			}
			if(this.isFlg(value)){// +-反転の場合
				if(this._val2.length <= 0){
					this._val1 = this.changeFlg(this._val1);
				}else{
					this._val2 = this.changeFlg(this._val2);
				}
			}
			if(this.isOperator(value)){// 演算子の場合
				if(this._val2.length <= 0){
					this._op = value;
				}else{
					this._val1 = this.calc(this._val1, this._val2, this._op).toString();// 計算処理
					this._val2 = "";
					this._op   = value;
				}
			}
			if(this.isEqual(value)){// =の場合
				this._val1 = this.calc(this._val1, this._val2, this._op).toString();// 計算処理
				this._val2 = "";
				this._op   = "";
				this._state = ST_VAL1;// 数値1状態へ
			}
			if(this.isClear(value)){// Cボタン
				this.clear();
			}
			
			if(this._state == ST_VAL1) return this._val1;
			if(this._state == ST_VAL2) return (this._val2.length<=0)?this._val1:this._val2;
			return null;
		}

		return null;
	}

	calc(v1, v2, op){
		const n1 = parseInt(v1);
		const n2 = parseInt(v2);
		if(op == "+") return n1 + n2;
		if(op == "-") return n1 - n2;
		if(op == "*") return n1 * n2;
		if(op == "/" && n2 != 0) return n1 / n2;
		return 0;
	}

	isNumeric(n){
		return !isNaN(n);
	}

	isOperator(op){
		if(op == "+") return true;
		if(op == "-") return true;
		if(op == "*") return true;
		if(op == "/") return true;
		return false;
	}

	isEqual(e){
		return e == "=";
	}

	isClear(c){
		return c == "C";
	}

	isFlg(op){
		if(op == "+/-") return true;
		return false;
	}

	changeFlg(n){
		let num = "";
		if(this.isNumeric(n[0])){
			num = "-" + n;
		}else{
			num = n.substr(1);
		}
		return num;
	}
}