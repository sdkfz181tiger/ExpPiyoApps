console.log("main.js!!");

const SS_GOOGLE = "https://docs.google.com/spreadsheets/d/";
const SS_ID     = "1CzccPnNKqIEgTPyvq83w28H0t5ycmuhe_EBarAdy4xY";
const SS_CSV    = "/export?format=csv";
const SS_URL    = SS_GOOGLE + SS_ID + SS_CSV;

const MODE_LOADING = 0;
const MODE_TITLE   = 1;
const MODE_QUIZ    = 2;
const MODE_RESULT  = 3;
const MODE_DETAIL  = 4;

const myData = {
	mode:      MODE_LOADING,
	quizes:    null,
	quiz:      null,
	quizIndex: null,
	answerFlg: null,
	lifeMax:   null,
	lifeNum:   null,
	piyoImg:   null,
	piyoMsg:   null,
	markBkg:   null,
	markOK:    null,
	markNG:    null,
	scores:    null,
	details:   null,
	sndOK:     null,
	sndNG:     null,
}

const app = Vue.createApp({
	data(){
		return myData;
	},
	created(){
		console.log("created!!");
		initStorage();// Storage
		// SpreadSheet
		loadSpreadSheet(SS_URL, arr=>{
			this.quizes = arr;// JSON
			for(let quiz of this.quizes){
				quiz.key    = this.replaceBR(quiz.btnA);// Key
				quiz.answer = quiz.btnA;// Answer
				quiz.btns   = [quiz.btnA, quiz.btnB, quiz.btnC, quiz.btnD];
			}
			this.init();// Initialize
		}, err=>{
			console.log(err);
		});
	},
	methods:{
		init(){
			// Initialize
			this.mode      = MODE_TITLE;
			this.quiz      = null;
			this.quizIndex = 0;
			this.answerFlg = false;
			this.lifeMax   = 3;
			this.lifeNum   = this.lifeMax;
			this.piyoImg   = "./images/piyo_ok.png";
			this.piyoMsg   = "クイズに答えられるかな!?";
			this.markBkg   = "./images/mark_bkg.png";
			this.markOK    = "./images/mark_ok.png";
			this.markNG    = "./images/mark_ng.png";
			this.scores    = [];
			this.details   = [];
			this.sndOK = new Howl({
				src: "./sounds/se_ok.mp3", 
				loop: false, volume: 1.0
			});
			this.sndNG = new Howl({
				src: "./sounds/se_ng.mp3", 
				loop: false, volume: 1.0
			});
		},
		readyQuiz(){
			// Ready
			this.loadReport();// Report
			this.shuffleQuiz();// Shuffle
			this.readQuiz();// Read
		},
		shuffleQuiz(){
			// Shuffle
			for(let i=this.quizes.length-1; 0<=i; i--){
				const rdm = Math.floor(Math.random() * i);
				const tmp = this.quizes[rdm];
				this.quizes[rdm] = this.quizes[i];
				this.quizes[i] = tmp;
			}
			// Sort
			this.quizes.sort((a, b)=>{
				const cntA = a.ok + a.ng;
				const cntB = b.ok + b.ng;
				if(cntA == cntB) return 0;
				if(cntA < cntB) return -1;
				return 1;
			});
		},
		readQuiz(){
			console.log("readQuiz:", this.quizIndex);
			// Read
			this.piyoImg = "./images/piyo_quiz.png";// Piyo
			this.piyoMsg = "次は" + (this.quizIndex + 1) + "問目だよ!!";
			this.quiz    = this.quizes[this.quizIndex];
			// Buttons
			const btns   = this.quiz.btns;
			const index  = Math.floor(Math.random()*(btns.length-1)) + 1;
			for(let i=btns.length-1; 0<i; i--){
				if(i == index) continue;
				btns.splice(i, 1);
			}
			// Shuffle
			if(Math.random() < 0.5){
				const tmp = btns[0];
				btns[0] = btns[1];
				btns[1] = tmp;
			}
		},
		loadReport(){
			if(this.quizes.length <= 0) return null;
			loadStorage(this.quizes);// Load
		},
		saveReport(flg){
			if(!this.quiz) return;
			saveStorage(this.quiz.key, flg);// Save
		},
		loadChart(){
			console.log("loadChart");
			// Data
			const labels = ["ストラテジ", "マネジメント", "テクノロジ"];
			const data   = [0, 0, 0];
			for(const quiz of this.quizes){
				let index = 0;
				for(let i=0; i<labels.length; i++){
					if(labels[i] != quiz.genre) continue;
					index = i;
				}
				data[index] += quiz.ok;
				data[index] -= quiz.ng;
			}
			// Chart
			setTimeout(()=>{
				showChart(labels, data);
			}, 300);
		},
		clickStart(){
			console.log("clickStart");
			if(!this.quizes) return;
			this.mode = MODE_QUIZ;// To Quiz
			this.readyQuiz();
		},
		clickAnswer(btn){
			console.log("clickAnswer");
			if(this.answerFlg == true) return;
			this.answerFlg = true;// Show
			if(this.quiz.answer == btn){
				this.piyoImg = "./images/piyo_ok.png";// OK
				this.piyoMsg = "あたり!!";
				this.scores.push(true);// OK
				this.lifeNum += 0;// Life
				this.saveReport(true);// OK
				this.popup(true);// Popup
			}else{
				this.piyoImg = "./images/piyo_ng.png";// NG
				this.piyoMsg = "はずれ!!";
				this.scores.push(false);// NG
				this.lifeNum -= 1;// Life
				this.saveReport(false);// NG
				this.popup(false);// Popup
			}	
		},
		clickNext(){
			console.log("clickNext");
			if(this.answerFlg == false) return;
			this.answerFlg = false;// Hide
			this.quizIndex++;// Next
			this.readQuiz();// Read
		},
		clickResult(){
			console.log("clickResult");
			if(!this.quizes) return;
			this.mode = MODE_RESULT;// To Result
			const cntOK = this.getCntOK();
			const cntNG = this.getCntNG();
			if(cntOK < 10){
				this.piyoImg = "./images/piyo_pc_confuse.png";// Piyo
			}else if(cntOK < 20){
				this.piyoImg = "./images/piyo_pc_cry.png";// Piyo
			}else if(cntOK < 40){
				this.piyoImg = "./images/piyo_pc_night.png";// Piyo
			}else{
				this.piyoImg = "./images/piyo_pc_wink.png";// Piyo
			}
			this.loadReport();// Report
		},
		clickRetry(){
			// Retry
			console.log("clickReset");
			if(!this.quizes) return;
			this.mode = MODE_TITLE;// To Title
			this.init();// Reset
		},
		clickDetail(){
			// Detail
			console.log("clickDetail");
			if(!this.quizes) return;
			this.mode = MODE_DETAIL;// To Detail
			this.loadReport();// Report
			this.loadChart();// Chart
			// Filter
			this.details = this.quizes.filter((quiz)=>{
				return 0<quiz.ok || 0<quiz.ng;
			});
			// Sort
			this.details.sort((a, b)=>{
				const cntA = a.ok + a.ng;
				const cntB = b.ok + b.ng;
				if(cntA == cntB) return 0;
				if(cntA < cntB) return -1;
				return 1;
			});
		},
		clickDetailAll(){
			// Filter
			console.log("clickDetailAll");
			// Filter
			this.details = this.quizes.filter((quiz)=>{
				return 0<quiz.ok || 0<quiz.ng;
			});
		},
		clickDetailFilter(flg){
			// Filter
			console.log("clickDetailFilter");
			// Filter
			if(flg){
				this.details = this.quizes.filter((quiz)=>{
					return quiz.ng < quiz.ok;
				});
			}else{
				this.details = this.quizes.filter((quiz)=>{
					return quiz.ok < quiz.ng;
				});
			}
			// Sort
			this.details.sort((a, b)=>{
				const cntA = a.ok + a.ng;
				const cntB = b.ok + b.ng;
				if(cntA == cntB) return 0;
				if(cntA < cntB) return -1;
				return 1;
			});
		},
		clickCheck(title, text){
			// Dialog
			console.log("clickCheck");
			showDialog(this.replaceBR(title), text);// Dialog
		},
		popup(flg){
			// GSAP
			if(flg){
				this.sndOK.play();
				const id = "#l-popup-ok";
				const tlPopup = gsap.timeline();
				tlPopup.to(id, {display:"block", opacity: 1.0});
				tlPopup.to(id, {duration: 0.1, ease: "power1", y: -20});
				tlPopup.to(id, {duration: 0.4, ease: "bounce", y: 0});
				tlPopup.to(id, {duration: 0.5, display: "none", opacity: 0.0});
				const tlPiyo = gsap.timeline();
				tlPiyo.to("#l-float", {duration: 0.2, ease: "power1", y: -40});
				tlPiyo.to("#l-float", {duration: 0.4, ease: "bounce", y: 0});
			}else{
				this.sndNG.play();
				const id = "#l-popup-ng";
				const tlPopup = gsap.timeline();
				tlPopup.to(id, {display:"block", opacity: 1.0});
				tlPopup.to(id, {duration: 0.1, ease: "power1", y: -20});
				tlPopup.to(id, {duration: 0.4, ease: "bounce", y: 0});
				tlPopup.to(id, {duration: 0.5, display: "none", opacity: 0.0});
				const tlPiyo = gsap.timeline({repeat: 1});
				tlPiyo.to("#l-float", {duration: 0.1, ease: "power1", x: -10});
				tlPiyo.to("#l-float", {duration: 0.1, ease: "power1", x: 0});
			}
		},
		getCntOK(){
			let cnt = 0;
			for(let score of this.scores){
				if(score) cnt++;
			}
			return cnt;
		},
		getCntNG(){
			let cnt = 0;
			for(let score of this.scores){
				if(!score) cnt++;
			}
			return cnt;
		},
		getResults(){
			const results = this.quizes.filter((quiz, index)=>{
				if(index < this.scores.length){
					if(this.scores[index]){
						quiz.mark = "./images/mark_ok.png";
					}else{
						quiz.mark = "./images/mark_ng.png";
					}
					return true;
				}
				return false;
			});
			return results;
		},
		replaceBR(str){
			return str.replaceAll("<br>", "");
		}
	}
});

// Components
app.component("cmp-pwd", {
	template: "#tmp-pwd",
	data(){
		return {
			pwdTitle: "宿題メール",
			pwdURL: "https://www.mag2.com/m/0000001414"
		}
	}
});

app.mount("#app");