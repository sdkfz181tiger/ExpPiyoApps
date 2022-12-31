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
// Preload
function preloadImages(flags){
	console.log("preloadImages:", flags.length);
	for(let flag of flags){
		const img = new Image();
		img.src = flag.src;
		img.addEventListener("load", (e)=>{
			//console.log("load:", e);
		});
	}
}

//==========
// Howler
class MyHowler{

	constructor(){
		this._se = {};
		this._bgm = {};
	}

	playSE(src, volume=1.0, loop=false){
		if(src in this._se){
			this._se[src].play();
			return;
		}
		const sound = new Howl({
			src: src, 
			volume: volume, 
			loop: loop
		});
		this._se[src] = sound;
		this._se[src].play();
	}

	playBGM(src, volume=1.0, loop=true){
		if(src in this._bgm){
			this._bgm[src].play();
			return;
		}
		const sound = new Howl({
			src: src, 
			volume: volume, 
			loop: loop
		});
		this._bgm[src] = sound;
		this._bgm[src].play();
	}

	stopBGM(){
		for(let key in this._bgm){
			this._bgm[key].stop();
		}
	}
}
