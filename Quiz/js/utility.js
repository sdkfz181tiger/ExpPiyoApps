console.log("utility.js!!");

//==========
// ServiceWorker
navigator.serviceWorker.register("./pwa_sw.js");

//==========
// SpreadSheet

function loadSpreadSheet(path, onLoad, onError){
	// Axios
	const option = {responseType: "blob"};
	axios.get(path, option).then(res=>{
		res.data.text().then(str=>{
			onLoad(csv2json(str));// CSV -> JSON
		});
	}).catch(err=>{
		onError(err);
	});
}

function csv2json(csv){
	const json = [];
	const lines = csv.split("\r\n");
	const keys = lines[0].split(",");
	for(let i=1; i<lines.length; i++){
		const items = lines[i].split(",");
		const obj = new Object();
		for(let j=0; j<keys.length; j++){
			obj[keys[j]] = items[j];
		}
		json.push(obj);
	}
	return json;
}

//==========
// LocalStorage

function initStorage(){
	console.log("initStorage");
	const json = localStorage.getItem("report");
	if(!json) localStorage.setItem("report", JSON.stringify({}));
}

function loadStorage(quizes){
	console.log("loadStorage");
	const json = localStorage.getItem("report");
	if(!json) return;
	const obj = JSON.parse(json);
	for(let quiz of quizes){
		if(!obj[quiz.key]){
			quiz["ok"] = 0;
			quiz["ng"] = 0;
			continue;
		}
		quiz["ok"] = obj[quiz.key]["ok"];
		quiz["ng"] = obj[quiz.key]["ng"];
	}
}

function saveStorage(key, flg){
	console.log("saveStorage:", key, flg);
	const json = localStorage.getItem("report");
	if(!json) return;
	const obj = JSON.parse(json);
	if(!obj[key]) obj[key] = {"ok": 0, "ng": 0};
	if(flg){
		obj[key]["ok"]++;
	}else{
		obj[key]["ng"]++;
	}
	localStorage.setItem("report", JSON.stringify(obj));
}

//==========
// Dialog

function showDialog(title, text){
	// X-Dialog
	xdialog.open({
		title: title,
		buttons: {
			ok: {
				text: "ok",
				style: "border-radius: 8px; background: orange;"
			}
		},
		body: text,
		style: "width: 90%; height: auto;"
	});
}

//==========
// Chart

function showChart(labels, data){

	const ctx = document.getElementById("my-chart").getContext("2d");
	const myChart = new Chart(ctx, {
		type: "bar",// グラフの種類
		data: {
			labels: labels,// ラベル
			datasets: [{
				label: "ジャンル別解答数",// タイトル
				data: data,// データ
				backgroundColor: [
					"rgba(255, 100, 100, 0.2)",// 背景の色
					"rgba(100, 255, 100, 0.2)",
					"rgba(100, 100, 255, 0.2)",
					"rgba(255, 255, 100, 0.2)",
					"rgba(100, 255, 255, 0.2)",
					"rgba(255, 100, 255, 0.2)"
				],
				borderColor: [
					"rgba(255, 100, 100, 1)",// 枠線の色
					"rgba(100, 255, 100, 1)",
					"rgba(100, 100, 255, 1)",
					"rgba(255, 255, 100, 1)",
					"rgba(100, 255, 255, 1)",
					"rgba(255, 100, 255, 1)"
				],
				borderWidth: 1// 枠線の太さ
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});
}
