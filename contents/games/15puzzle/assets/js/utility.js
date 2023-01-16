console.log("utility.js!!");

//==========
// ServiceWorker
navigator.serviceWorker.register("./pwa_sw.js");

//==========
// ImgLoader

class ImgLoader{

	static dir = "./assets/images/";
	static imgs = {};
	
	static loadImg(file){
		this.imgs[file] = loadImage(this.dir + file);
	}

	static getImg(file){
		return this.imgs[file];
	}
}