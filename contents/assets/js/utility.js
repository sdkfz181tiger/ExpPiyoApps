console.log("utility.js!!");

//==========
// ServiceWorker
navigator.serviceWorker.register("./pwa_sw.js");

//==========
// BeforeInstall
let beforeInstalled = false;
window.addEventListener("beforeinstallprompt", (e)=>{
	beforeInstalled = true;
});