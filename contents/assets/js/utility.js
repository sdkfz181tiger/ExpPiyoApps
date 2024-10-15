console.log("utility.js!!");

//==========
// ServiceWorker
navigator.serviceWorker.register("./pwa_sw.js");

//==========
// BeforeInstall
window.addEventListener("beforeinstallprompt", (prompt)=>{
	prompt.preventDefault();
	const elem = document.getElementById("btn-install");
	elem.classList.remove("invisible");
	elem.addEventListener("click", (e)=>{
		e.preventDefault();
		prompt.prompt();// Prompt
		prompt.userChoice.then((choice)=>{
			if(choice.outcome === "accepted"){
				console.log("Accepted");
			}else{
				console.log("Dismissed");
			}
			e.target.classList.add("invisible");
		});
	});
});

window.addEventListener("appinstalled", ()=>{
	showToast("Success", "0 min ago.", "installed!!");
});

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