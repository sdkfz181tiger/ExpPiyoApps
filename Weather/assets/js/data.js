
// WeatherAPIファイル名変換表
const WEATHER_AREA = {
	"北海道": {
		"宗谷地方": "011000.json",
		"上川・留萌地方": "012000.json",
		"網走・北見・紋別地方": "013000.json",
		//"十勝地方": "014030.json",
		"釧路・根室地方": "014100.json",
		"胆振・日高地方": "015000.json",
		"石狩・空知・後志地方": "016000.json",
		"渡島・檜山地方": "017000.json"
	},
	"東北": {
		"青森県": "020000.json",
		"岩手県": "030000.json",
		"宮城県": "040000.json",
		"秋田県": "050000.json",
		"山形県": "060000.json",
		"福島県": "070000.json"
	},
	"関東甲信": {
		"茨城県": "080000.json",
		"栃木県": "090000.json",
		"群馬県": "100000.json",
		"埼玉県": "110000.json",
		"千葉県": "120000.json",
		"東京都": "130000.json",
		"神奈川県": "140000.json",
		"山梨県": "190000.json",
		"長野県": "200000.json"
	},
	"北陸": {
		"新潟県": "150000.json",
		"富山県": "160000.json",
		"石川県": "170000.json",
		"福井県": "180000.json"
	},
	"東海": {
		"岐阜県": "210000.json",
		"静岡県": "220000.json",
		"愛知県": "230000.json",
		"三重県": "240000.json"
	},
	"近畿": {
		"滋賀県": "250000.json",
		"京都府": "260000.json",
		"大阪府": "270000.json",
		"兵庫県": "280000.json",
		"奈良県": "290000.json",
		"和歌山県": "300000.json"
	},
	"中国": {
		"鳥取県": "310000.json",
		"島根県": "320000.json",
		"岡山県": "330000.json",
		"広島県": "340000.json"
	},
	"四国": {
		"徳島県": "360000.json",
		"香川県": "370000.json",
		"愛媛県": "380000.json",
		"高知県": "390000.json"
	},
	"九州北部": {
		"山口県": "350000.json",
		"福岡県": "400000.json",
		"佐賀県": "410000.json",
		"長崎県": "420000.json",
		"熊本県": "430000.json",
		"大分県": "440000.json"
	},
	"九州南部": {
		"宮崎県": "450000.json",
		"鹿児島県": "460000.json",
		"鹿児島県": "460100.json",
		//"奄美地方": "460040.json"
	},
	"沖縄県": {
		"沖縄本島": "471000.json",
		"大東島地方": "472000.json",
		"宮古島地方": "473000.json",
		"八重山地方": "474000.json"
	}
}

// WeatherAPIアイコン変換表
const WEATHER_ICON = {
	"100": [
		"100.svg",
		"500.svg",
		"100",
		"晴",
		"CLEAR"
	],
	"101": [
		"101.svg",
		"501.svg",
		"100",
		"晴時々曇",
		"PARTLY CLOUDY"
	],
	"102": [
		"102.svg",
		"502.svg",
		"300",
		"晴一時雨",
		"CLEAR, OCCASIONAL SCATTERED SHOWERS"
	],
	"103": [
		"102.svg",
		"502.svg",
		"300",
		"晴時々雨",
		"CLEAR, FREQUENT SCATTERED SHOWERS"
	],
	"104": [
		"104.svg",
		"504.svg",
		"400",
		"晴一時雪",
		"CLEAR, SNOW FLURRIES"
	],
	"105": [
		"104.svg",
		"504.svg",
		"400",
		"晴時々雪",
		"CLEAR, FREQUENT SNOW FLURRIES"
	],
	"106": [
		"102.svg",
		"502.svg",
		"300",
		"晴一時雨か雪",
		"CLEAR, OCCASIONAL SCATTERED SHOWERS OR SNOW FLURRIES"
	],
	"107": [
		"102.svg",
		"502.svg",
		"300",
		"晴時々雨か雪",
		"CLEAR, FREQUENT SCATTERED SHOWERS OR SNOW FLURRIES"
	],
	"108": [
		"102.svg",
		"502.svg",
		"300",
		"晴一時雨か雷雨",
		"CLEAR, OCCASIONAL SCATTERED SHOWERS AND/OR THUNDER"
	],
	"110": [
		"110.svg",
		"510.svg",
		"100",
		"晴後時々曇",
		"CLEAR, PARTLY CLOUDY LATER"
	],
	"111": [
		"110.svg",
		"510.svg",
		"100",
		"晴後曇",
		"CLEAR, CLOUDY LATER"
	],
	"112": [
		"112.svg",
		"512.svg",
		"300",
		"晴後一時雨",
		"CLEAR, OCCASIONAL SCATTERED SHOWERS LATER"
	],
	"113": [
		"112.svg",
		"512.svg",
		"300",
		"晴後時々雨",
		"CLEAR, FREQUENT SCATTERED SHOWERS LATER"
	],
	"114": [
		"112.svg",
		"512.svg",
		"300",
		"晴後雨",
		"CLEAR,RAIN LATER"
	],
	"115": [
		"115.svg",
		"515.svg",
		"400",
		"晴後一時雪",
		"CLEAR, OCCASIONAL SNOW FLURRIES LATER"
	],
	"116": [
		"115.svg",
		"515.svg",
		"400",
		"晴後時々雪",
		"CLEAR, FREQUENT SNOW FLURRIES LATER"
	],
	"117": [
		"115.svg",
		"515.svg",
		"400",
		"晴後雪",
		"CLEAR,SNOW LATER"
	],
	"118": [
		"112.svg",
		"512.svg",
		"300",
		"晴後雨か雪",
		"CLEAR, RAIN OR SNOW LATER"
	],
	"119": [
		"112.svg",
		"512.svg",
		"300",
		"晴後雨か雷雨",
		"CLEAR, RAIN AND/OR THUNDER LATER"
	],
	"120": [
		"102.svg",
		"502.svg",
		"300",
		"晴朝夕一時雨",
		"OCCASIONAL SCATTERED SHOWERS IN THE MORNING AND EVENING, CLEAR DURING THE DAY"
	],
	"121": [
		"102.svg",
		"502.svg",
		"300",
		"晴朝の内一時雨",
		"OCCASIONAL SCATTERED SHOWERS IN THE MORNING, CLEAR DURING THE DAY"
	],
	"122": [
		"112.svg",
		"512.svg",
		"300",
		"晴夕方一時雨",
		"CLEAR, OCCASIONAL SCATTERED SHOWERS IN THE EVENING"
	],
	"123": [
		"100.svg",
		"500.svg",
		"100",
		"晴山沿い雷雨",
		"CLEAR IN THE PLAINS, RAIN AND THUNDER NEAR MOUTAINOUS AREAS"
	],
	"124": [
		"100.svg",
		"500.svg",
		"100",
		"晴山沿い雪",
		"CLEAR IN THE PLAINS, SNOW NEAR MOUTAINOUS AREAS"
	],
	"125": [
		"112.svg",
		"512.svg",
		"300",
		"晴午後は雷雨",
		"CLEAR, RAIN AND THUNDER IN THE AFTERNOON"
	],
	"126": [
		"112.svg",
		"512.svg",
		"300",
		"晴昼頃から雨",
		"CLEAR, RAIN IN THE AFTERNOON"
	],
	"127": [
		"112.svg",
		"512.svg",
		"300",
		"晴夕方から雨",
		"CLEAR, RAIN IN THE EVENING"
	],
	"128": [
		"112.svg",
		"512.svg",
		"300",
		"晴夜は雨",
		"CLEAR, RAIN IN THE NIGHT"
	],
	"130": [
		"100.svg",
		"500.svg",
		"100",
		"朝の内霧後晴",
		"FOG IN THE MORNING, CLEAR LATER"
	],
	"131": [
		"100.svg",
		"500.svg",
		"100",
		"晴明け方霧",
		"FOG AROUND DAWN, CLEAR LATER"
	],
	"132": [
		"101.svg",
		"501.svg",
		"100",
		"晴朝夕曇",
		"CLOUDY IN THE MORNING AND EVENING, CLEAR DURING THE DAY"
	],
	"140": [
		"102.svg",
		"502.svg",
		"300",
		"晴時々雨で雷を伴う",
		"CLEAR, FREQUENT SCATTERED SHOWERS AND THUNDER"
	],
	"160": [
		"104.svg",
		"504.svg",
		"400",
		"晴一時雪か雨",
		"CLEAR, SNOW FLURRIES OR OCCASIONAL SCATTERED SHOWERS"
	],
	"170": [
		"104.svg",
		"504.svg",
		"400",
		"晴時々雪か雨",
		"CLEAR, FREQUENT SNOW FLURRIES OR SCATTERED SHOWERS"
	],
	"181": [
		"115.svg",
		"515.svg",
		"400",
		"晴後雪か雨",
		"CLEAR, SNOW OR RAIN LATER"
	],
	"200": [
		"200.svg",
		"200.svg",
		"200",
		"曇",
		"CLOUDY"
	],
	"201": [
		"201.svg",
		"601.svg",
		"200",
		"曇時々晴",
		"MOSTLY CLOUDY"
	],
	"202": [
		"202.svg",
		"202.svg",
		"300",
		"曇一時雨",
		"CLOUDY, OCCASIONAL SCATTERED SHOWERS"
	],
	"203": [
		"202.svg",
		"202.svg",
		"300",
		"曇時々雨",
		"CLOUDY, FREQUENT SCATTERED SHOWERS"
	],
	"204": [
		"204.svg",
		"204.svg",
		"400",
		"曇一時雪",
		"CLOUDY, OCCASIONAL SNOW FLURRIES"
	],
	"205": [
		"204.svg",
		"204.svg",
		"400",
		"曇時々雪",
		"CLOUDY FREQUENT SNOW FLURRIES"
	],
	"206": [
		"202.svg",
		"202.svg",
		"300",
		"曇一時雨か雪",
		"CLOUDY, OCCASIONAL SCATTERED SHOWERS OR SNOW FLURRIES"
	],
	"207": [
		"202.svg",
		"202.svg",
		"300",
		"曇時々雨か雪",
		"CLOUDY, FREQUENT SCCATERED SHOWERS OR SNOW FLURRIES"
	],
	"208": [
		"202.svg",
		"202.svg",
		"300",
		"曇一時雨か雷雨",
		"CLOUDY, OCCASIONAL SCATTERED SHOWERS AND/OR THUNDER"
	],
	"209": [
		"200.svg",
		"200.svg",
		"200",
		"霧",
		"FOG"
	],
	"210": [
		"210.svg",
		"610.svg",
		"200",
		"曇後時々晴",
		"CLOUDY, PARTLY CLOUDY LATER"
	],
	"211": [
		"210.svg",
		"610.svg",
		"200",
		"曇後晴",
		"CLOUDY, CLEAR LATER"
	],
	"212": [
		"212.svg",
		"212.svg",
		"300",
		"曇後一時雨",
		"CLOUDY, OCCASIONAL SCATTERED SHOWERS LATER"
	],
	"213": [
		"212.svg",
		"212.svg",
		"300",
		"曇後時々雨",
		"CLOUDY, FREQUENT SCATTERED SHOWERS LATER"
	],
	"214": [
		"212.svg",
		"212.svg",
		"300",
		"曇後雨",
		"CLOUDY, RAIN LATER"
	],
	"215": [
		"215.svg",
		"215.svg",
		"400",
		"曇後一時雪",
		"CLOUDY, SNOW FLURRIES LATER"
	],
	"216": [
		"215.svg",
		"215.svg",
		"400",
		"曇後時々雪",
		"CLOUDY, FREQUENT SNOW FLURRIES LATER"
	],
	"217": [
		"215.svg",
		"215.svg",
		"400",
		"曇後雪",
		"CLOUDY, SNOW LATER"
	],
	"218": [
		"212.svg",
		"212.svg",
		"300",
		"曇後雨か雪",
		"CLOUDY, RAIN OR SNOW LATER"
	],
	"219": [
		"212.svg",
		"212.svg",
		"300",
		"曇後雨か雷雨",
		"CLOUDY, RAIN AND/OR THUNDER LATER"
	],
	"220": [
		"202.svg",
		"202.svg",
		"300",
		"曇朝夕一時雨",
		"OCCASIONAL SCCATERED SHOWERS IN THE MORNING AND EVENING, CLOUDY DURING THE DAY"
	],
	"221": [
		"202.svg",
		"202.svg",
		"300",
		"曇朝の内一時雨",
		"CLOUDY OCCASIONAL SCCATERED SHOWERS IN THE MORNING"
	],
	"222": [
		"212.svg",
		"212.svg",
		"300",
		"曇夕方一時雨",
		"CLOUDY, OCCASIONAL SCCATERED SHOWERS IN THE EVENING"
	],
	"223": [
		"201.svg",
		"601.svg",
		"200",
		"曇日中時々晴",
		"CLOUDY IN THE MORNING AND EVENING, PARTLY CLOUDY DURING THE DAY,"
	],
	"224": [
		"212.svg",
		"212.svg",
		"300",
		"曇昼頃から雨",
		"CLOUDY, RAIN IN THE AFTERNOON"
	],
	"225": [
		"212.svg",
		"212.svg",
		"300",
		"曇夕方から雨",
		"CLOUDY, RAIN IN THE EVENING"
	],
	"226": [
		"212.svg",
		"212.svg",
		"300",
		"曇夜は雨",
		"CLOUDY, RAIN IN THE NIGHT"
	],
	"228": [
		"215.svg",
		"215.svg",
		"400",
		"曇昼頃から雪",
		"CLOUDY, SNOW IN THE AFTERNOON"
	],
	"229": [
		"215.svg",
		"215.svg",
		"400",
		"曇夕方から雪",
		"CLOUDY, SNOW IN THE EVENING"
	],
	"230": [
		"215.svg",
		"215.svg",
		"400",
		"曇夜は雪",
		"CLOUDY, SNOW IN THE NIGHT"
	],
	"231": [
		"200.svg",
		"200.svg",
		"200",
		"曇海上海岸は霧か霧雨",
		"CLOUDY, FOG OR DRIZZLING ON THE SEA AND NEAR SEASHORE"
	],
	"240": [
		"202.svg",
		"202.svg",
		"300",
		"曇時々雨で雷を伴う",
		"CLOUDY, FREQUENT SCCATERED SHOWERS AND THUNDER"
	],
	"250": [
		"204.svg",
		"204.svg",
		"400",
		"曇時々雪で雷を伴う",
		"CLOUDY, FREQUENT SNOW AND THUNDER"
	],
	"260": [
		"204.svg",
		"204.svg",
		"400",
		"曇一時雪か雨",
		"CLOUDY, SNOW FLURRIES OR OCCASIONAL SCATTERED SHOWERS"
	],
	"270": [
		"204.svg",
		"204.svg",
		"400",
		"曇時々雪か雨",
		"CLOUDY, FREQUENT SNOW FLURRIES OR SCATTERED SHOWERS"
	],
	"281": [
		"215.svg",
		"215.svg",
		"400",
		"曇後雪か雨",
		"CLOUDY, SNOW OR RAIN LATER"
	],
	"300": [
		"300.svg",
		"300.svg",
		"300",
		"雨",
		"RAIN"
	],
	"301": [
		"301.svg",
		"701.svg",
		"300",
		"雨時々晴",
		"RAIN, PARTLY CLOUDY"
	],
	"302": [
		"302.svg",
		"302.svg",
		"300",
		"雨時々止む",
		"SHOWERS THROUGHOUT THE DAY"
	],
	"303": [
		"303.svg",
		"303.svg",
		"400",
		"雨時々雪",
		"RAIN,FREQUENT SNOW FLURRIES"
	],
	"304": [
		"300.svg",
		"300.svg",
		"300",
		"雨か雪",
		"RAINORSNOW"
	],
	"306": [
		"300.svg",
		"300.svg",
		"300",
		"大雨",
		"HEAVYRAIN"
	],
	"308": [
		"308.svg",
		"308.svg",
		"300",
		"雨で暴風を伴う",
		"RAINSTORM"
	],
	"309": [
		"303.svg",
		"303.svg",
		"400",
		"雨一時雪",
		"RAIN,OCCASIONAL SNOW"
	],
	"311": [
		"311.svg",
		"711.svg",
		"300",
		"雨後晴",
		"RAIN,CLEAR LATER"
	],
	"313": [
		"313.svg",
		"313.svg",
		"300",
		"雨後曇",
		"RAIN,CLOUDY LATER"
	],
	"314": [
		"314.svg",
		"314.svg",
		"400",
		"雨後時々雪",
		"RAIN, FREQUENT SNOW FLURRIES LATER"
	],
	"315": [
		"314.svg",
		"314.svg",
		"400",
		"雨後雪",
		"RAIN,SNOW LATER"
	],
	"316": [
		"311.svg",
		"711.svg",
		"300",
		"雨か雪後晴",
		"RAIN OR SNOW, CLEAR LATER"
	],
	"317": [
		"313.svg",
		"313.svg",
		"300",
		"雨か雪後曇",
		"RAIN OR SNOW, CLOUDY LATER"
	],
	"320": [
		"311.svg",
		"711.svg",
		"300",
		"朝の内雨後晴",
		"RAIN IN THE MORNING, CLEAR LATER"
	],
	"321": [
		"313.svg",
		"313.svg",
		"300",
		"朝の内雨後曇",
		"RAIN IN THE MORNING, CLOUDY LATER"
	],
	"322": [
		"303.svg",
		"303.svg",
		"400",
		"雨朝晩一時雪",
		"OCCASIONAL SNOW IN THE MORNING AND EVENING, RAIN DURING THE DAY"
	],
	"323": [
		"311.svg",
		"711.svg",
		"300",
		"雨昼頃から晴",
		"RAIN, CLEAR IN THE AFTERNOON"
	],
	"324": [
		"311.svg",
		"711.svg",
		"300",
		"雨夕方から晴",
		"RAIN, CLEAR IN THE EVENING"
	],
	"325": [
		"311.svg",
		"711.svg",
		"300",
		"雨夜は晴",
		"RAIN, CLEAR IN THE NIGHT"
	],
	"326": [
		"314.svg",
		"314.svg",
		"400",
		"雨夕方から雪",
		"RAIN, SNOW IN THE EVENING"
	],
	"327": [
		"314.svg",
		"314.svg",
		"400",
		"雨夜は雪",
		"RAIN,SNOW IN THE NIGHT"
	],
	"328": [
		"300.svg",
		"300.svg",
		"300",
		"雨一時強く降る",
		"RAIN, EXPECT OCCASIONAL HEAVY RAINFALL"
	],
	"329": [
		"300.svg",
		"300.svg",
		"300",
		"雨一時みぞれ",
		"RAIN, OCCASIONAL SLEET"
	],
	"340": [
		"400.svg",
		"400.svg",
		"400",
		"雪か雨",
		"SNOWORRAIN"
	],
	"350": [
		"300.svg",
		"300.svg",
		"300",
		"雨で雷を伴う",
		"RAIN AND THUNDER"
	],
	"361": [
		"411.svg",
		"811.svg",
		"400",
		"雪か雨後晴",
		"SNOW OR RAIN, CLEAR LATER"
	],
	"371": [
		"413.svg",
		"413.svg",
		"400",
		"雪か雨後曇",
		"SNOW OR RAIN, CLOUDY LATER"
	],
	"400": [
		"400.svg",
		"400.svg",
		"400",
		"雪",
		"SNOW"
	],
	"401": [
		"401.svg",
		"801.svg",
		"400",
		"雪時々晴",
		"SNOW, FREQUENT CLEAR"
	],
	"402": [
		"402.svg",
		"402.svg",
		"400",
		"雪時々止む",
		"SNOWTHROUGHOUT THE DAY"
	],
	"403": [
		"403.svg",
		"403.svg",
		"400",
		"雪時々雨",
		"SNOW,FREQUENT SCCATERED SHOWERS"
	],
	"405": [
		"400.svg",
		"400.svg",
		"400",
		"大雪",
		"HEAVYSNOW"
	],
	"406": [
		"406.svg",
		"406.svg",
		"400",
		"風雪強い",
		"SNOWSTORM"
	],
	"407": [
		"406.svg",
		"406.svg",
		"400",
		"暴風雪",
		"HEAVYSNOWSTORM"
	],
	"409": [
		"403.svg",
		"403.svg",
		"400",
		"雪一時雨",
		"SNOW, OCCASIONAL SCCATERED SHOWERS"
	],
	"411": [
		"411.svg",
		"811.svg",
		"400",
		"雪後晴",
		"SNOW,CLEAR LATER"
	],
	"413": [
		"413.svg",
		"413.svg",
		"400",
		"雪後曇",
		"SNOW,CLOUDY LATER"
	],
	"414": [
		"414.svg",
		"414.svg",
		"400",
		"雪後雨",
		"SNOW,RAIN LATER"
	],
	"420": [
		"411.svg",
		"811.svg",
		"400",
		"朝の内雪後晴",
		"SNOW IN THE MORNING, CLEAR LATER"
	],
	"421": [
		"413.svg",
		"413.svg",
		"400",
		"朝の内雪後曇",
		"SNOW IN THE MORNING, CLOUDY LATER"
	],
	"422": [
		"414.svg",
		"414.svg",
		"400",
		"雪昼頃から雨",
		"SNOW, RAIN IN THE AFTERNOON"
	],
	"423": [
		"414.svg",
		"414.svg",
		"400",
		"雪夕方から雨",
		"SNOW, RAIN IN THE EVENING"
	],
	"425": [
		"400.svg",
		"400.svg",
		"400",
		"雪一時強く降る",
		"SNOW, EXPECT OCCASIONAL HEAVY SNOWFALL"
	],
	"426": [
		"400.svg",
		"400.svg",
		"400",
		"雪後みぞれ",
		"SNOW, SLEET LATER"
	],
	"427": [
		"400.svg",
		"400.svg",
		"400",
		"雪一時みぞれ",
		"SNOW, OCCASIONAL SLEET"
	],
	"450": [
		"400.svg",
		"400.svg",
		"400",
		"雪で雷を伴う",
		"SNOW AND THUNDER"
	]
}

// MUNI変換表(旧地理院地図より)
const GSI = {};
GSI.MUNI_ARRAY = {};
GSI.MUNI_ARRAY["1100"] = '1,北海道,1100,札幌市';
GSI.MUNI_ARRAY["1101"] = '1,北海道,1101,札幌市　中央区';
GSI.MUNI_ARRAY["1102"] = '1,北海道,1102,札幌市　北区';
GSI.MUNI_ARRAY["1103"] = '1,北海道,1103,札幌市　東区';
GSI.MUNI_ARRAY["1104"] = '1,北海道,1104,札幌市　白石区';
GSI.MUNI_ARRAY["1105"] = '1,北海道,1105,札幌市　豊平区';
GSI.MUNI_ARRAY["1106"] = '1,北海道,1106,札幌市　南区';
GSI.MUNI_ARRAY["1107"] = '1,北海道,1107,札幌市　西区';
GSI.MUNI_ARRAY["1108"] = '1,北海道,1108,札幌市　厚別区';
GSI.MUNI_ARRAY["1109"] = '1,北海道,1109,札幌市　手稲区';
GSI.MUNI_ARRAY["1110"] = '1,北海道,1110,札幌市　清田区';
GSI.MUNI_ARRAY["1202"] = '1,北海道,1202,函館市';
GSI.MUNI_ARRAY["1203"] = '1,北海道,1203,小樽市';
GSI.MUNI_ARRAY["1204"] = '1,北海道,1204,旭川市';
GSI.MUNI_ARRAY["1205"] = '1,北海道,1205,室蘭市';
GSI.MUNI_ARRAY["1206"] = '1,北海道,1206,釧路市';
GSI.MUNI_ARRAY["1207"] = '1,北海道,1207,帯広市';
GSI.MUNI_ARRAY["1208"] = '1,北海道,1208,北見市';
GSI.MUNI_ARRAY["1209"] = '1,北海道,1209,夕張市';
GSI.MUNI_ARRAY["1210"] = '1,北海道,1210,岩見沢市';
GSI.MUNI_ARRAY["1211"] = '1,北海道,1211,網走市';
GSI.MUNI_ARRAY["1212"] = '1,北海道,1212,留萌市';
GSI.MUNI_ARRAY["1213"] = '1,北海道,1213,苫小牧市';
GSI.MUNI_ARRAY["1214"] = '1,北海道,1214,稚内市';
GSI.MUNI_ARRAY["1215"] = '1,北海道,1215,美唄市';
GSI.MUNI_ARRAY["1216"] = '1,北海道,1216,芦別市';
GSI.MUNI_ARRAY["1217"] = '1,北海道,1217,江別市';
GSI.MUNI_ARRAY["1218"] = '1,北海道,1218,赤平市';
GSI.MUNI_ARRAY["1219"] = '1,北海道,1219,紋別市';
GSI.MUNI_ARRAY["1220"] = '1,北海道,1220,士別市';
GSI.MUNI_ARRAY["1221"] = '1,北海道,1221,名寄市';
GSI.MUNI_ARRAY["1222"] = '1,北海道,1222,三笠市';
GSI.MUNI_ARRAY["1223"] = '1,北海道,1223,根室市';
GSI.MUNI_ARRAY["1224"] = '1,北海道,1224,千歳市';
GSI.MUNI_ARRAY["1225"] = '1,北海道,1225,滝川市';
GSI.MUNI_ARRAY["1226"] = '1,北海道,1226,砂川市';
GSI.MUNI_ARRAY["1227"] = '1,北海道,1227,歌志内市';
GSI.MUNI_ARRAY["1228"] = '1,北海道,1228,深川市';
GSI.MUNI_ARRAY["1229"] = '1,北海道,1229,富良野市';
GSI.MUNI_ARRAY["1230"] = '1,北海道,1230,登別市';
GSI.MUNI_ARRAY["1231"] = '1,北海道,1231,恵庭市';
GSI.MUNI_ARRAY["1233"] = '1,北海道,1233,伊達市';
GSI.MUNI_ARRAY["1234"] = '1,北海道,1234,北広島市';
GSI.MUNI_ARRAY["1235"] = '1,北海道,1235,石狩市';
GSI.MUNI_ARRAY["1236"] = '1,北海道,1236,北斗市';
GSI.MUNI_ARRAY["1303"] = '1,北海道,1303,当別町';
GSI.MUNI_ARRAY["1304"] = '1,北海道,1304,新篠津村';
GSI.MUNI_ARRAY["1331"] = '1,北海道,1331,松前町';
GSI.MUNI_ARRAY["1332"] = '1,北海道,1332,福島町';
GSI.MUNI_ARRAY["1333"] = '1,北海道,1333,知内町';
GSI.MUNI_ARRAY["1334"] = '1,北海道,1334,木古内町';
GSI.MUNI_ARRAY["1337"] = '1,北海道,1337,七飯町';
GSI.MUNI_ARRAY["1343"] = '1,北海道,1343,鹿部町';
GSI.MUNI_ARRAY["1345"] = '1,北海道,1345,森町';
GSI.MUNI_ARRAY["1346"] = '1,北海道,1346,八雲町';
GSI.MUNI_ARRAY["1347"] = '1,北海道,1347,長万部町';
GSI.MUNI_ARRAY["1361"] = '1,北海道,1361,江差町';
GSI.MUNI_ARRAY["1362"] = '1,北海道,1362,上ノ国町';
GSI.MUNI_ARRAY["1363"] = '1,北海道,1363,厚沢部町';
GSI.MUNI_ARRAY["1364"] = '1,北海道,1364,乙部町';
GSI.MUNI_ARRAY["1367"] = '1,北海道,1367,奥尻町';
GSI.MUNI_ARRAY["1370"] = '1,北海道,1370,今金町';
GSI.MUNI_ARRAY["1371"] = '1,北海道,1371,せたな町';
GSI.MUNI_ARRAY["1391"] = '1,北海道,1391,島牧村';
GSI.MUNI_ARRAY["1392"] = '1,北海道,1392,寿都町';
GSI.MUNI_ARRAY["1393"] = '1,北海道,1393,黒松内町';
GSI.MUNI_ARRAY["1394"] = '1,北海道,1394,蘭越町';
GSI.MUNI_ARRAY["1395"] = '1,北海道,1395,ニセコ町';
GSI.MUNI_ARRAY["1396"] = '1,北海道,1396,真狩村';
GSI.MUNI_ARRAY["1397"] = '1,北海道,1397,留寿都村';
GSI.MUNI_ARRAY["1398"] = '1,北海道,1398,喜茂別町';
GSI.MUNI_ARRAY["1399"] = '1,北海道,1399,京極町';
GSI.MUNI_ARRAY["1400"] = '1,北海道,1400,倶知安町';
GSI.MUNI_ARRAY["1401"] = '1,北海道,1401,共和町';
GSI.MUNI_ARRAY["1402"] = '1,北海道,1402,岩内町';
GSI.MUNI_ARRAY["1403"] = '1,北海道,1403,泊村';
GSI.MUNI_ARRAY["1404"] = '1,北海道,1404,神恵内村';
GSI.MUNI_ARRAY["1405"] = '1,北海道,1405,積丹町';
GSI.MUNI_ARRAY["1406"] = '1,北海道,1406,古平町';
GSI.MUNI_ARRAY["1407"] = '1,北海道,1407,仁木町';
GSI.MUNI_ARRAY["1408"] = '1,北海道,1408,余市町';
GSI.MUNI_ARRAY["1409"] = '1,北海道,1409,赤井川村';
GSI.MUNI_ARRAY["1423"] = '1,北海道,1423,南幌町';
GSI.MUNI_ARRAY["1424"] = '1,北海道,1424,奈井江町';
GSI.MUNI_ARRAY["1425"] = '1,北海道,1425,上砂川町';
GSI.MUNI_ARRAY["1427"] = '1,北海道,1427,由仁町';
GSI.MUNI_ARRAY["1428"] = '1,北海道,1428,長沼町';
GSI.MUNI_ARRAY["1429"] = '1,北海道,1429,栗山町';
GSI.MUNI_ARRAY["1430"] = '1,北海道,1430,月形町';
GSI.MUNI_ARRAY["1431"] = '1,北海道,1431,浦臼町';
GSI.MUNI_ARRAY["1432"] = '1,北海道,1432,新十津川町';
GSI.MUNI_ARRAY["1433"] = '1,北海道,1433,妹背牛町';
GSI.MUNI_ARRAY["1434"] = '1,北海道,1434,秩父別町';
GSI.MUNI_ARRAY["1436"] = '1,北海道,1436,雨竜町';
GSI.MUNI_ARRAY["1437"] = '1,北海道,1437,北竜町';
GSI.MUNI_ARRAY["1438"] = '1,北海道,1438,沼田町';
GSI.MUNI_ARRAY["1452"] = '1,北海道,1452,鷹栖町';
GSI.MUNI_ARRAY["1453"] = '1,北海道,1453,東神楽町';
GSI.MUNI_ARRAY["1454"] = '1,北海道,1454,当麻町';
GSI.MUNI_ARRAY["1455"] = '1,北海道,1455,比布町';
GSI.MUNI_ARRAY["1456"] = '1,北海道,1456,愛別町';
GSI.MUNI_ARRAY["1457"] = '1,北海道,1457,上川町';
GSI.MUNI_ARRAY["1458"] = '1,北海道,1458,東川町';
GSI.MUNI_ARRAY["1459"] = '1,北海道,1459,美瑛町';
GSI.MUNI_ARRAY["1460"] = '1,北海道,1460,上富良野町';
GSI.MUNI_ARRAY["1461"] = '1,北海道,1461,中富良野町';
GSI.MUNI_ARRAY["1462"] = '1,北海道,1462,南富良野町';
GSI.MUNI_ARRAY["1463"] = '1,北海道,1463,占冠村';
GSI.MUNI_ARRAY["1464"] = '1,北海道,1464,和寒町';
GSI.MUNI_ARRAY["1465"] = '1,北海道,1465,剣淵町';
GSI.MUNI_ARRAY["1468"] = '1,北海道,1468,下川町';
GSI.MUNI_ARRAY["1469"] = '1,北海道,1469,美深町';
GSI.MUNI_ARRAY["1470"] = '1,北海道,1470,音威子府村';
GSI.MUNI_ARRAY["1471"] = '1,北海道,1471,中川町';
GSI.MUNI_ARRAY["1472"] = '1,北海道,1472,幌加内町';
GSI.MUNI_ARRAY["1481"] = '1,北海道,1481,増毛町';
GSI.MUNI_ARRAY["1482"] = '1,北海道,1482,小平町';
GSI.MUNI_ARRAY["1483"] = '1,北海道,1483,苫前町';
GSI.MUNI_ARRAY["1484"] = '1,北海道,1484,羽幌町';
GSI.MUNI_ARRAY["1485"] = '1,北海道,1485,初山別村';
GSI.MUNI_ARRAY["1486"] = '1,北海道,1486,遠別町';
GSI.MUNI_ARRAY["1487"] = '1,北海道,1487,天塩町';
GSI.MUNI_ARRAY["1511"] = '1,北海道,1511,猿払村';
GSI.MUNI_ARRAY["1512"] = '1,北海道,1512,浜頓別町';
GSI.MUNI_ARRAY["1513"] = '1,北海道,1513,中頓別町';
GSI.MUNI_ARRAY["1514"] = '1,北海道,1514,枝幸町';
GSI.MUNI_ARRAY["1516"] = '1,北海道,1516,豊富町';
GSI.MUNI_ARRAY["1517"] = '1,北海道,1517,礼文町';
GSI.MUNI_ARRAY["1518"] = '1,北海道,1518,利尻町';
GSI.MUNI_ARRAY["1519"] = '1,北海道,1519,利尻富士町';
GSI.MUNI_ARRAY["1520"] = '1,北海道,1520,幌延町';
GSI.MUNI_ARRAY["1543"] = '1,北海道,1543,美幌町';
GSI.MUNI_ARRAY["1544"] = '1,北海道,1544,津別町';
GSI.MUNI_ARRAY["1545"] = '1,北海道,1545,斜里町';
GSI.MUNI_ARRAY["1546"] = '1,北海道,1546,清里町';
GSI.MUNI_ARRAY["1547"] = '1,北海道,1547,小清水町';
GSI.MUNI_ARRAY["1549"] = '1,北海道,1549,訓子府町';
GSI.MUNI_ARRAY["1550"] = '1,北海道,1550,置戸町';
GSI.MUNI_ARRAY["1552"] = '1,北海道,1552,佐呂間町';
GSI.MUNI_ARRAY["1555"] = '1,北海道,1555,遠軽町';
GSI.MUNI_ARRAY["1559"] = '1,北海道,1559,湧別町';
GSI.MUNI_ARRAY["1560"] = '1,北海道,1560,滝上町';
GSI.MUNI_ARRAY["1561"] = '1,北海道,1561,興部町';
GSI.MUNI_ARRAY["1562"] = '1,北海道,1562,西興部村';
GSI.MUNI_ARRAY["1563"] = '1,北海道,1563,雄武町';
GSI.MUNI_ARRAY["1564"] = '1,北海道,1564,大空町';
GSI.MUNI_ARRAY["1571"] = '1,北海道,1571,豊浦町';
GSI.MUNI_ARRAY["1575"] = '1,北海道,1575,壮瞥町';
GSI.MUNI_ARRAY["1578"] = '1,北海道,1578,白老町';
GSI.MUNI_ARRAY["1581"] = '1,北海道,1581,厚真町';
GSI.MUNI_ARRAY["1584"] = '1,北海道,1584,洞爺湖町';
GSI.MUNI_ARRAY["1585"] = '1,北海道,1585,安平町';
GSI.MUNI_ARRAY["1586"] = '1,北海道,1586,むかわ町';
GSI.MUNI_ARRAY["1601"] = '1,北海道,1601,日高町';
GSI.MUNI_ARRAY["1602"] = '1,北海道,1602,平取町';
GSI.MUNI_ARRAY["1604"] = '1,北海道,1604,新冠町';
GSI.MUNI_ARRAY["1607"] = '1,北海道,1607,浦河町';
GSI.MUNI_ARRAY["1608"] = '1,北海道,1608,様似町';
GSI.MUNI_ARRAY["1609"] = '1,北海道,1609,えりも町';
GSI.MUNI_ARRAY["1610"] = '1,北海道,1610,新ひだか町';
GSI.MUNI_ARRAY["1631"] = '1,北海道,1631,音更町';
GSI.MUNI_ARRAY["1632"] = '1,北海道,1632,士幌町';
GSI.MUNI_ARRAY["1633"] = '1,北海道,1633,上士幌町';
GSI.MUNI_ARRAY["1634"] = '1,北海道,1634,鹿追町';
GSI.MUNI_ARRAY["1635"] = '1,北海道,1635,新得町';
GSI.MUNI_ARRAY["1636"] = '1,北海道,1636,清水町';
GSI.MUNI_ARRAY["1637"] = '1,北海道,1637,芽室町';
GSI.MUNI_ARRAY["1638"] = '1,北海道,1638,中札内村';
GSI.MUNI_ARRAY["1639"] = '1,北海道,1639,更別村';
GSI.MUNI_ARRAY["1641"] = '1,北海道,1641,大樹町';
GSI.MUNI_ARRAY["1642"] = '1,北海道,1642,広尾町';
GSI.MUNI_ARRAY["1643"] = '1,北海道,1643,幕別町';
GSI.MUNI_ARRAY["1644"] = '1,北海道,1644,池田町';
GSI.MUNI_ARRAY["1645"] = '1,北海道,1645,豊頃町';
GSI.MUNI_ARRAY["1646"] = '1,北海道,1646,本別町';
GSI.MUNI_ARRAY["1647"] = '1,北海道,1647,足寄町';
GSI.MUNI_ARRAY["1648"] = '1,北海道,1648,陸別町';
GSI.MUNI_ARRAY["1649"] = '1,北海道,1649,浦幌町';
GSI.MUNI_ARRAY["1661"] = '1,北海道,1661,釧路町';
GSI.MUNI_ARRAY["1662"] = '1,北海道,1662,厚岸町';
GSI.MUNI_ARRAY["1663"] = '1,北海道,1663,浜中町';
GSI.MUNI_ARRAY["1664"] = '1,北海道,1664,標茶町';
GSI.MUNI_ARRAY["1665"] = '1,北海道,1665,弟子屈町';
GSI.MUNI_ARRAY["1667"] = '1,北海道,1667,鶴居村';
GSI.MUNI_ARRAY["1668"] = '1,北海道,1668,白糠町';
GSI.MUNI_ARRAY["1691"] = '1,北海道,1691,別海町';
GSI.MUNI_ARRAY["1692"] = '1,北海道,1692,中標津町';
GSI.MUNI_ARRAY["1693"] = '1,北海道,1693,標津町';
GSI.MUNI_ARRAY["1694"] = '1,北海道,1694,羅臼町';
GSI.MUNI_ARRAY["1695"] = '1,北海道,1695,色丹村';
GSI.MUNI_ARRAY["1696"] = '1,北海道,1696,泊村';
GSI.MUNI_ARRAY["1697"] = '1,北海道,1697,留夜別村';
GSI.MUNI_ARRAY["1698"] = '1,北海道,1698,留別村';
GSI.MUNI_ARRAY["1699"] = '1,北海道,1699,紗那村';
GSI.MUNI_ARRAY["1700"] = '1,北海道,1700,蘂取村';
GSI.MUNI_ARRAY["2201"] = '2,青森県,2201,青森市';
GSI.MUNI_ARRAY["2202"] = '2,青森県,2202,弘前市';
GSI.MUNI_ARRAY["2203"] = '2,青森県,2203,八戸市';
GSI.MUNI_ARRAY["2204"] = '2,青森県,2204,黒石市';
GSI.MUNI_ARRAY["2205"] = '2,青森県,2205,五所川原市';
GSI.MUNI_ARRAY["2206"] = '2,青森県,2206,十和田市';
GSI.MUNI_ARRAY["2207"] = '2,青森県,2207,三沢市';
GSI.MUNI_ARRAY["2208"] = '2,青森県,2208,むつ市';
GSI.MUNI_ARRAY["2209"] = '2,青森県,2209,つがる市';
GSI.MUNI_ARRAY["2210"] = '2,青森県,2210,平川市';
GSI.MUNI_ARRAY["2301"] = '2,青森県,2301,平内町';
GSI.MUNI_ARRAY["2303"] = '2,青森県,2303,今別町';
GSI.MUNI_ARRAY["2304"] = '2,青森県,2304,蓬田村';
GSI.MUNI_ARRAY["2307"] = '2,青森県,2307,外ヶ浜町';
GSI.MUNI_ARRAY["2321"] = '2,青森県,2321,鰺ヶ沢町';
GSI.MUNI_ARRAY["2323"] = '2,青森県,2323,深浦町';
GSI.MUNI_ARRAY["2343"] = '2,青森県,2343,西目屋村';
GSI.MUNI_ARRAY["2361"] = '2,青森県,2361,藤崎町';
GSI.MUNI_ARRAY["2362"] = '2,青森県,2362,大鰐町';
GSI.MUNI_ARRAY["2367"] = '2,青森県,2367,田舎館村';
GSI.MUNI_ARRAY["2381"] = '2,青森県,2381,板柳町';
GSI.MUNI_ARRAY["2384"] = '2,青森県,2384,鶴田町';
GSI.MUNI_ARRAY["2387"] = '2,青森県,2387,中泊町';
GSI.MUNI_ARRAY["2401"] = '2,青森県,2401,野辺地町';
GSI.MUNI_ARRAY["2402"] = '2,青森県,2402,七戸町';
GSI.MUNI_ARRAY["2405"] = '2,青森県,2405,六戸町';
GSI.MUNI_ARRAY["2406"] = '2,青森県,2406,横浜町';
GSI.MUNI_ARRAY["2408"] = '2,青森県,2408,東北町';
GSI.MUNI_ARRAY["2411"] = '2,青森県,2411,六ヶ所村';
GSI.MUNI_ARRAY["2412"] = '2,青森県,2412,おいらせ町';
GSI.MUNI_ARRAY["2423"] = '2,青森県,2423,大間町';
GSI.MUNI_ARRAY["2424"] = '2,青森県,2424,東通村';
GSI.MUNI_ARRAY["2425"] = '2,青森県,2425,風間浦村';
GSI.MUNI_ARRAY["2426"] = '2,青森県,2426,佐井村';
GSI.MUNI_ARRAY["2441"] = '2,青森県,2441,三戸町';
GSI.MUNI_ARRAY["2442"] = '2,青森県,2442,五戸町';
GSI.MUNI_ARRAY["2443"] = '2,青森県,2443,田子町';
GSI.MUNI_ARRAY["2445"] = '2,青森県,2445,南部町';
GSI.MUNI_ARRAY["2446"] = '2,青森県,2446,階上町';
GSI.MUNI_ARRAY["2450"] = '2,青森県,2450,新郷村';
GSI.MUNI_ARRAY["3201"] = '3,岩手県,3201,盛岡市';
GSI.MUNI_ARRAY["3202"] = '3,岩手県,3202,宮古市';
GSI.MUNI_ARRAY["3203"] = '3,岩手県,3203,大船渡市';
GSI.MUNI_ARRAY["3205"] = '3,岩手県,3205,花巻市';
GSI.MUNI_ARRAY["3206"] = '3,岩手県,3206,北上市';
GSI.MUNI_ARRAY["3207"] = '3,岩手県,3207,久慈市';
GSI.MUNI_ARRAY["3208"] = '3,岩手県,3208,遠野市';
GSI.MUNI_ARRAY["3209"] = '3,岩手県,3209,一関市';
GSI.MUNI_ARRAY["3210"] = '3,岩手県,3210,陸前高田市';
GSI.MUNI_ARRAY["3211"] = '3,岩手県,3211,釜石市';
GSI.MUNI_ARRAY["3213"] = '3,岩手県,3213,二戸市';
GSI.MUNI_ARRAY["3214"] = '3,岩手県,3214,八幡平市';
GSI.MUNI_ARRAY["3215"] = '3,岩手県,3215,奥州市';
GSI.MUNI_ARRAY["3216"] = '3,岩手県,3216,滝沢市';
GSI.MUNI_ARRAY["3301"] = '3,岩手県,3301,雫石町';
GSI.MUNI_ARRAY["3302"] = '3,岩手県,3302,葛巻町';
GSI.MUNI_ARRAY["3303"] = '3,岩手県,3303,岩手町';
GSI.MUNI_ARRAY["3321"] = '3,岩手県,3321,紫波町';
GSI.MUNI_ARRAY["3322"] = '3,岩手県,3322,矢巾町';
GSI.MUNI_ARRAY["3366"] = '3,岩手県,3366,西和賀町';
GSI.MUNI_ARRAY["3381"] = '3,岩手県,3381,金ケ崎町';
GSI.MUNI_ARRAY["3402"] = '3,岩手県,3402,平泉町';
GSI.MUNI_ARRAY["3441"] = '3,岩手県,3441,住田町';
GSI.MUNI_ARRAY["3461"] = '3,岩手県,3461,大槌町';
GSI.MUNI_ARRAY["3482"] = '3,岩手県,3482,山田町';
GSI.MUNI_ARRAY["3483"] = '3,岩手県,3483,岩泉町';
GSI.MUNI_ARRAY["3484"] = '3,岩手県,3484,田野畑村';
GSI.MUNI_ARRAY["3485"] = '3,岩手県,3485,普代村';
GSI.MUNI_ARRAY["3501"] = '3,岩手県,3501,軽米町';
GSI.MUNI_ARRAY["3503"] = '3,岩手県,3503,野田村';
GSI.MUNI_ARRAY["3506"] = '3,岩手県,3506,九戸村';
GSI.MUNI_ARRAY["3507"] = '3,岩手県,3507,洋野町';
GSI.MUNI_ARRAY["3524"] = '3,岩手県,3524,一戸町';
GSI.MUNI_ARRAY["4100"] = '4,宮城県,4100,仙台市';
GSI.MUNI_ARRAY["4101"] = '4,宮城県,4101,仙台市　青葉区';
GSI.MUNI_ARRAY["4102"] = '4,宮城県,4102,仙台市　宮城野区';
GSI.MUNI_ARRAY["4103"] = '4,宮城県,4103,仙台市　若林区';
GSI.MUNI_ARRAY["4104"] = '4,宮城県,4104,仙台市　太白区';
GSI.MUNI_ARRAY["4105"] = '4,宮城県,4105,仙台市　泉区';
GSI.MUNI_ARRAY["4202"] = '4,宮城県,4202,石巻市';
GSI.MUNI_ARRAY["4203"] = '4,宮城県,4203,塩竈市';
GSI.MUNI_ARRAY["4205"] = '4,宮城県,4205,気仙沼市';
GSI.MUNI_ARRAY["4206"] = '4,宮城県,4206,白石市';
GSI.MUNI_ARRAY["4207"] = '4,宮城県,4207,名取市';
GSI.MUNI_ARRAY["4208"] = '4,宮城県,4208,角田市';
GSI.MUNI_ARRAY["4209"] = '4,宮城県,4209,多賀城市';
GSI.MUNI_ARRAY["4211"] = '4,宮城県,4211,岩沼市';
GSI.MUNI_ARRAY["4212"] = '4,宮城県,4212,登米市';
GSI.MUNI_ARRAY["4213"] = '4,宮城県,4213,栗原市';
GSI.MUNI_ARRAY["4214"] = '4,宮城県,4214,東松島市';
GSI.MUNI_ARRAY["4215"] = '4,宮城県,4215,大崎市';
GSI.MUNI_ARRAY["4216"] = '4,宮城県,4216,富谷市';
GSI.MUNI_ARRAY["4301"] = '4,宮城県,4301,蔵王町';
GSI.MUNI_ARRAY["4302"] = '4,宮城県,4302,七ケ宿町';
GSI.MUNI_ARRAY["4321"] = '4,宮城県,4321,大河原町';
GSI.MUNI_ARRAY["4322"] = '4,宮城県,4322,村田町';
GSI.MUNI_ARRAY["4323"] = '4,宮城県,4323,柴田町';
GSI.MUNI_ARRAY["4324"] = '4,宮城県,4324,川崎町';
GSI.MUNI_ARRAY["4341"] = '4,宮城県,4341,丸森町';
GSI.MUNI_ARRAY["4361"] = '4,宮城県,4361,亘理町';
GSI.MUNI_ARRAY["4362"] = '4,宮城県,4362,山元町';
GSI.MUNI_ARRAY["4401"] = '4,宮城県,4401,松島町';
GSI.MUNI_ARRAY["4404"] = '4,宮城県,4404,七ヶ浜町';
GSI.MUNI_ARRAY["4406"] = '4,宮城県,4406,利府町';
GSI.MUNI_ARRAY["4421"] = '4,宮城県,4421,大和町';
GSI.MUNI_ARRAY["4422"] = '4,宮城県,4422,大郷町';
GSI.MUNI_ARRAY["4423"] = '4,宮城県,4423,富谷市';
GSI.MUNI_ARRAY["4424"] = '4,宮城県,4424,大衡村';
GSI.MUNI_ARRAY["4444"] = '4,宮城県,4444,色麻町';
GSI.MUNI_ARRAY["4445"] = '4,宮城県,4445,加美町';
GSI.MUNI_ARRAY["4501"] = '4,宮城県,4501,涌谷町';
GSI.MUNI_ARRAY["4505"] = '4,宮城県,4505,美里町';
GSI.MUNI_ARRAY["4581"] = '4,宮城県,4581,女川町';
GSI.MUNI_ARRAY["4606"] = '4,宮城県,4606,南三陸町';
GSI.MUNI_ARRAY["5201"] = '5,秋田県,5201,秋田市';
GSI.MUNI_ARRAY["5202"] = '5,秋田県,5202,能代市';
GSI.MUNI_ARRAY["5203"] = '5,秋田県,5203,横手市';
GSI.MUNI_ARRAY["5204"] = '5,秋田県,5204,大館市';
GSI.MUNI_ARRAY["5206"] = '5,秋田県,5206,男鹿市';
GSI.MUNI_ARRAY["5207"] = '5,秋田県,5207,湯沢市';
GSI.MUNI_ARRAY["5209"] = '5,秋田県,5209,鹿角市';
GSI.MUNI_ARRAY["5210"] = '5,秋田県,5210,由利本荘市';
GSI.MUNI_ARRAY["5211"] = '5,秋田県,5211,潟上市';
GSI.MUNI_ARRAY["5212"] = '5,秋田県,5212,大仙市';
GSI.MUNI_ARRAY["5213"] = '5,秋田県,5213,北秋田市';
GSI.MUNI_ARRAY["5214"] = '5,秋田県,5214,にかほ市';
GSI.MUNI_ARRAY["5215"] = '5,秋田県,5215,仙北市';
GSI.MUNI_ARRAY["5303"] = '5,秋田県,5303,小坂町';
GSI.MUNI_ARRAY["5327"] = '5,秋田県,5327,上小阿仁村';
GSI.MUNI_ARRAY["5346"] = '5,秋田県,5346,藤里町';
GSI.MUNI_ARRAY["5348"] = '5,秋田県,5348,三種町';
GSI.MUNI_ARRAY["5349"] = '5,秋田県,5349,八峰町';
GSI.MUNI_ARRAY["5361"] = '5,秋田県,5361,五城目町';
GSI.MUNI_ARRAY["5363"] = '5,秋田県,5363,八郎潟町';
GSI.MUNI_ARRAY["5366"] = '5,秋田県,5366,井川町';
GSI.MUNI_ARRAY["5368"] = '5,秋田県,5368,大潟村';
GSI.MUNI_ARRAY["5434"] = '5,秋田県,5434,美郷町';
GSI.MUNI_ARRAY["5463"] = '5,秋田県,5463,羽後町';
GSI.MUNI_ARRAY["5464"] = '5,秋田県,5464,東成瀬村';
GSI.MUNI_ARRAY["6201"] = '6,山形県,6201,山形市';
GSI.MUNI_ARRAY["6202"] = '6,山形県,6202,米沢市';
GSI.MUNI_ARRAY["6203"] = '6,山形県,6203,鶴岡市';
GSI.MUNI_ARRAY["6204"] = '6,山形県,6204,酒田市';
GSI.MUNI_ARRAY["6205"] = '6,山形県,6205,新庄市';
GSI.MUNI_ARRAY["6206"] = '6,山形県,6206,寒河江市';
GSI.MUNI_ARRAY["6207"] = '6,山形県,6207,上山市';
GSI.MUNI_ARRAY["6208"] = '6,山形県,6208,村山市';
GSI.MUNI_ARRAY["6209"] = '6,山形県,6209,長井市';
GSI.MUNI_ARRAY["6210"] = '6,山形県,6210,天童市';
GSI.MUNI_ARRAY["6211"] = '6,山形県,6211,東根市';
GSI.MUNI_ARRAY["6212"] = '6,山形県,6212,尾花沢市';
GSI.MUNI_ARRAY["6213"] = '6,山形県,6213,南陽市';
GSI.MUNI_ARRAY["6301"] = '6,山形県,6301,山辺町';
GSI.MUNI_ARRAY["6302"] = '6,山形県,6302,中山町';
GSI.MUNI_ARRAY["6321"] = '6,山形県,6321,河北町';
GSI.MUNI_ARRAY["6322"] = '6,山形県,6322,西川町';
GSI.MUNI_ARRAY["6323"] = '6,山形県,6323,朝日町';
GSI.MUNI_ARRAY["6324"] = '6,山形県,6324,大江町';
GSI.MUNI_ARRAY["6341"] = '6,山形県,6341,大石田町';
GSI.MUNI_ARRAY["6361"] = '6,山形県,6361,金山町';
GSI.MUNI_ARRAY["6362"] = '6,山形県,6362,最上町';
GSI.MUNI_ARRAY["6363"] = '6,山形県,6363,舟形町';
GSI.MUNI_ARRAY["6364"] = '6,山形県,6364,真室川町';
GSI.MUNI_ARRAY["6365"] = '6,山形県,6365,大蔵村';
GSI.MUNI_ARRAY["6366"] = '6,山形県,6366,鮭川村';
GSI.MUNI_ARRAY["6367"] = '6,山形県,6367,戸沢村';
GSI.MUNI_ARRAY["6381"] = '6,山形県,6381,高畠町';
GSI.MUNI_ARRAY["6382"] = '6,山形県,6382,川西町';
GSI.MUNI_ARRAY["6401"] = '6,山形県,6401,小国町';
GSI.MUNI_ARRAY["6402"] = '6,山形県,6402,白鷹町';
GSI.MUNI_ARRAY["6403"] = '6,山形県,6403,飯豊町';
GSI.MUNI_ARRAY["6426"] = '6,山形県,6426,三川町';
GSI.MUNI_ARRAY["6428"] = '6,山形県,6428,庄内町';
GSI.MUNI_ARRAY["6461"] = '6,山形県,6461,遊佐町';
GSI.MUNI_ARRAY["7201"] = '7,福島県,7201,福島市';
GSI.MUNI_ARRAY["7202"] = '7,福島県,7202,会津若松市';
GSI.MUNI_ARRAY["7203"] = '7,福島県,7203,郡山市';
GSI.MUNI_ARRAY["7204"] = '7,福島県,7204,いわき市';
GSI.MUNI_ARRAY["7205"] = '7,福島県,7205,白河市';
GSI.MUNI_ARRAY["7207"] = '7,福島県,7207,須賀川市';
GSI.MUNI_ARRAY["7208"] = '7,福島県,7208,喜多方市';
GSI.MUNI_ARRAY["7209"] = '7,福島県,7209,相馬市';
GSI.MUNI_ARRAY["7210"] = '7,福島県,7210,二本松市';
GSI.MUNI_ARRAY["7211"] = '7,福島県,7211,田村市';
GSI.MUNI_ARRAY["7212"] = '7,福島県,7212,南相馬市';
GSI.MUNI_ARRAY["7213"] = '7,福島県,7213,伊達市';
GSI.MUNI_ARRAY["7214"] = '7,福島県,7214,本宮市';
GSI.MUNI_ARRAY["7301"] = '7,福島県,7301,桑折町';
GSI.MUNI_ARRAY["7303"] = '7,福島県,7303,国見町';
GSI.MUNI_ARRAY["7308"] = '7,福島県,7308,川俣町';
GSI.MUNI_ARRAY["7322"] = '7,福島県,7322,大玉村';
GSI.MUNI_ARRAY["7342"] = '7,福島県,7342,鏡石町';
GSI.MUNI_ARRAY["7344"] = '7,福島県,7344,天栄村';
GSI.MUNI_ARRAY["7362"] = '7,福島県,7362,下郷町';
GSI.MUNI_ARRAY["7364"] = '7,福島県,7364,檜枝岐村';
GSI.MUNI_ARRAY["7367"] = '7,福島県,7367,只見町';
GSI.MUNI_ARRAY["7368"] = '7,福島県,7368,南会津町';
GSI.MUNI_ARRAY["7402"] = '7,福島県,7402,北塩原村';
GSI.MUNI_ARRAY["7405"] = '7,福島県,7405,西会津町';
GSI.MUNI_ARRAY["7407"] = '7,福島県,7407,磐梯町';
GSI.MUNI_ARRAY["7408"] = '7,福島県,7408,猪苗代町';
GSI.MUNI_ARRAY["7421"] = '7,福島県,7421,会津坂下町';
GSI.MUNI_ARRAY["7422"] = '7,福島県,7422,湯川村';
GSI.MUNI_ARRAY["7423"] = '7,福島県,7423,柳津町';
GSI.MUNI_ARRAY["7444"] = '7,福島県,7444,三島町';
GSI.MUNI_ARRAY["7445"] = '7,福島県,7445,金山町';
GSI.MUNI_ARRAY["7446"] = '7,福島県,7446,昭和村';
GSI.MUNI_ARRAY["7447"] = '7,福島県,7447,会津美里町';
GSI.MUNI_ARRAY["7461"] = '7,福島県,7461,西郷村';
GSI.MUNI_ARRAY["7464"] = '7,福島県,7464,泉崎村';
GSI.MUNI_ARRAY["7465"] = '7,福島県,7465,中島村';
GSI.MUNI_ARRAY["7466"] = '7,福島県,7466,矢吹町';
GSI.MUNI_ARRAY["7481"] = '7,福島県,7481,棚倉町';
GSI.MUNI_ARRAY["7482"] = '7,福島県,7482,矢祭町';
GSI.MUNI_ARRAY["7483"] = '7,福島県,7483,塙町';
GSI.MUNI_ARRAY["7484"] = '7,福島県,7484,鮫川村';
GSI.MUNI_ARRAY["7501"] = '7,福島県,7501,石川町';
GSI.MUNI_ARRAY["7502"] = '7,福島県,7502,玉川村';
GSI.MUNI_ARRAY["7503"] = '7,福島県,7503,平田村';
GSI.MUNI_ARRAY["7504"] = '7,福島県,7504,浅川町';
GSI.MUNI_ARRAY["7505"] = '7,福島県,7505,古殿町';
GSI.MUNI_ARRAY["7521"] = '7,福島県,7521,三春町';
GSI.MUNI_ARRAY["7522"] = '7,福島県,7522,小野町';
GSI.MUNI_ARRAY["7541"] = '7,福島県,7541,広野町';
GSI.MUNI_ARRAY["7542"] = '7,福島県,7542,楢葉町';
GSI.MUNI_ARRAY["7543"] = '7,福島県,7543,富岡町';
GSI.MUNI_ARRAY["7544"] = '7,福島県,7544,川内村';
GSI.MUNI_ARRAY["7545"] = '7,福島県,7545,大熊町';
GSI.MUNI_ARRAY["7546"] = '7,福島県,7546,双葉町';
GSI.MUNI_ARRAY["7547"] = '7,福島県,7547,浪江町';
GSI.MUNI_ARRAY["7548"] = '7,福島県,7548,葛尾村';
GSI.MUNI_ARRAY["7561"] = '7,福島県,7561,新地町';
GSI.MUNI_ARRAY["7564"] = '7,福島県,7564,飯舘村';
GSI.MUNI_ARRAY["8201"] = '8,茨城県,8201,水戸市';
GSI.MUNI_ARRAY["8202"] = '8,茨城県,8202,日立市';
GSI.MUNI_ARRAY["8203"] = '8,茨城県,8203,土浦市';
GSI.MUNI_ARRAY["8204"] = '8,茨城県,8204,古河市';
GSI.MUNI_ARRAY["8205"] = '8,茨城県,8205,石岡市';
GSI.MUNI_ARRAY["8207"] = '8,茨城県,8207,結城市';
GSI.MUNI_ARRAY["8208"] = '8,茨城県,8208,龍ケ崎市';
GSI.MUNI_ARRAY["8210"] = '8,茨城県,8210,下妻市';
GSI.MUNI_ARRAY["8211"] = '8,茨城県,8211,常総市';
GSI.MUNI_ARRAY["8212"] = '8,茨城県,8212,常陸太田市';
GSI.MUNI_ARRAY["8214"] = '8,茨城県,8214,高萩市';
GSI.MUNI_ARRAY["8215"] = '8,茨城県,8215,北茨城市';
GSI.MUNI_ARRAY["8216"] = '8,茨城県,8216,笠間市';
GSI.MUNI_ARRAY["8217"] = '8,茨城県,8217,取手市';
GSI.MUNI_ARRAY["8219"] = '8,茨城県,8219,牛久市';
GSI.MUNI_ARRAY["8220"] = '8,茨城県,8220,つくば市';
GSI.MUNI_ARRAY["8221"] = '8,茨城県,8221,ひたちなか市';
GSI.MUNI_ARRAY["8222"] = '8,茨城県,8222,鹿嶋市';
GSI.MUNI_ARRAY["8223"] = '8,茨城県,8223,潮来市';
GSI.MUNI_ARRAY["8224"] = '8,茨城県,8224,守谷市';
GSI.MUNI_ARRAY["8225"] = '8,茨城県,8225,常陸大宮市';
GSI.MUNI_ARRAY["8226"] = '8,茨城県,8226,那珂市';
GSI.MUNI_ARRAY["8227"] = '8,茨城県,8227,筑西市';
GSI.MUNI_ARRAY["8228"] = '8,茨城県,8228,坂東市';
GSI.MUNI_ARRAY["8229"] = '8,茨城県,8229,稲敷市';
GSI.MUNI_ARRAY["8230"] = '8,茨城県,8230,かすみがうら市';
GSI.MUNI_ARRAY["8231"] = '8,茨城県,8231,桜川市';
GSI.MUNI_ARRAY["8232"] = '8,茨城県,8232,神栖市';
GSI.MUNI_ARRAY["8233"] = '8,茨城県,8233,行方市';
GSI.MUNI_ARRAY["8234"] = '8,茨城県,8234,鉾田市';
GSI.MUNI_ARRAY["8235"] = '8,茨城県,8235,つくばみらい市';
GSI.MUNI_ARRAY["8236"] = '8,茨城県,8236,小美玉市';
GSI.MUNI_ARRAY["8302"] = '8,茨城県,8302,茨城町';
GSI.MUNI_ARRAY["8309"] = '8,茨城県,8309,大洗町';
GSI.MUNI_ARRAY["8310"] = '8,茨城県,8310,城里町';
GSI.MUNI_ARRAY["8341"] = '8,茨城県,8341,東海村';
GSI.MUNI_ARRAY["8364"] = '8,茨城県,8364,大子町';
GSI.MUNI_ARRAY["8442"] = '8,茨城県,8442,美浦村';
GSI.MUNI_ARRAY["8443"] = '8,茨城県,8443,阿見町';
GSI.MUNI_ARRAY["8447"] = '8,茨城県,8447,河内町';
GSI.MUNI_ARRAY["8521"] = '8,茨城県,8521,八千代町';
GSI.MUNI_ARRAY["8542"] = '8,茨城県,8542,五霞町';
GSI.MUNI_ARRAY["8546"] = '8,茨城県,8546,境町';
GSI.MUNI_ARRAY["8564"] = '8,茨城県,8564,利根町';
GSI.MUNI_ARRAY["9201"] = '9,栃木県,9201,宇都宮市';
GSI.MUNI_ARRAY["9202"] = '9,栃木県,9202,足利市';
GSI.MUNI_ARRAY["9203"] = '9,栃木県,9203,栃木市';
GSI.MUNI_ARRAY["9204"] = '9,栃木県,9204,佐野市';
GSI.MUNI_ARRAY["9205"] = '9,栃木県,9205,鹿沼市';
GSI.MUNI_ARRAY["9206"] = '9,栃木県,9206,日光市';
GSI.MUNI_ARRAY["9208"] = '9,栃木県,9208,小山市';
GSI.MUNI_ARRAY["9209"] = '9,栃木県,9209,真岡市';
GSI.MUNI_ARRAY["9210"] = '9,栃木県,9210,大田原市';
GSI.MUNI_ARRAY["9211"] = '9,栃木県,9211,矢板市';
GSI.MUNI_ARRAY["9213"] = '9,栃木県,9213,那須塩原市';
GSI.MUNI_ARRAY["9214"] = '9,栃木県,9214,さくら市';
GSI.MUNI_ARRAY["9215"] = '9,栃木県,9215,那須烏山市';
GSI.MUNI_ARRAY["9216"] = '9,栃木県,9216,下野市';
GSI.MUNI_ARRAY["9301"] = '9,栃木県,9301,上三川町';
GSI.MUNI_ARRAY["9342"] = '9,栃木県,9342,益子町';
GSI.MUNI_ARRAY["9343"] = '9,栃木県,9343,茂木町';
GSI.MUNI_ARRAY["9344"] = '9,栃木県,9344,市貝町';
GSI.MUNI_ARRAY["9345"] = '9,栃木県,9345,芳賀町';
GSI.MUNI_ARRAY["9361"] = '9,栃木県,9361,壬生町';
GSI.MUNI_ARRAY["9364"] = '9,栃木県,9364,野木町';
GSI.MUNI_ARRAY["9384"] = '9,栃木県,9384,塩谷町';
GSI.MUNI_ARRAY["9386"] = '9,栃木県,9386,高根沢町';
GSI.MUNI_ARRAY["9407"] = '9,栃木県,9407,那須町';
GSI.MUNI_ARRAY["9411"] = '9,栃木県,9411,那珂川町';
GSI.MUNI_ARRAY["10201"] = '10,群馬県,10201,前橋市';
GSI.MUNI_ARRAY["10202"] = '10,群馬県,10202,高崎市';
GSI.MUNI_ARRAY["10203"] = '10,群馬県,10203,桐生市';
GSI.MUNI_ARRAY["10204"] = '10,群馬県,10204,伊勢崎市';
GSI.MUNI_ARRAY["10205"] = '10,群馬県,10205,太田市';
GSI.MUNI_ARRAY["10206"] = '10,群馬県,10206,沼田市';
GSI.MUNI_ARRAY["10207"] = '10,群馬県,10207,館林市';
GSI.MUNI_ARRAY["10208"] = '10,群馬県,10208,渋川市';
GSI.MUNI_ARRAY["10209"] = '10,群馬県,10209,藤岡市';
GSI.MUNI_ARRAY["10210"] = '10,群馬県,10210,富岡市';
GSI.MUNI_ARRAY["10211"] = '10,群馬県,10211,安中市';
GSI.MUNI_ARRAY["10212"] = '10,群馬県,10212,みどり市';
GSI.MUNI_ARRAY["10344"] = '10,群馬県,10344,榛東村';
GSI.MUNI_ARRAY["10345"] = '10,群馬県,10345,吉岡町';
GSI.MUNI_ARRAY["10366"] = '10,群馬県,10366,上野村';
GSI.MUNI_ARRAY["10367"] = '10,群馬県,10367,神流町';
GSI.MUNI_ARRAY["10382"] = '10,群馬県,10382,下仁田町';
GSI.MUNI_ARRAY["10383"] = '10,群馬県,10383,南牧村';
GSI.MUNI_ARRAY["10384"] = '10,群馬県,10384,甘楽町';
GSI.MUNI_ARRAY["10421"] = '10,群馬県,10421,中之条町';
GSI.MUNI_ARRAY["10424"] = '10,群馬県,10424,長野原町';
GSI.MUNI_ARRAY["10425"] = '10,群馬県,10425,嬬恋村';
GSI.MUNI_ARRAY["10426"] = '10,群馬県,10426,草津町';
GSI.MUNI_ARRAY["10428"] = '10,群馬県,10428,高山村';
GSI.MUNI_ARRAY["10429"] = '10,群馬県,10429,東吾妻町';
GSI.MUNI_ARRAY["10443"] = '10,群馬県,10443,片品村';
GSI.MUNI_ARRAY["10444"] = '10,群馬県,10444,川場村';
GSI.MUNI_ARRAY["10448"] = '10,群馬県,10448,昭和村';
GSI.MUNI_ARRAY["10449"] = '10,群馬県,10449,みなかみ町';
GSI.MUNI_ARRAY["10464"] = '10,群馬県,10464,玉村町';
GSI.MUNI_ARRAY["10521"] = '10,群馬県,10521,板倉町';
GSI.MUNI_ARRAY["10522"] = '10,群馬県,10522,明和町';
GSI.MUNI_ARRAY["10523"] = '10,群馬県,10523,千代田町';
GSI.MUNI_ARRAY["10524"] = '10,群馬県,10524,大泉町';
GSI.MUNI_ARRAY["10525"] = '10,群馬県,10525,邑楽町';
GSI.MUNI_ARRAY["11100"] = '11,埼玉県,11100,さいたま市';
GSI.MUNI_ARRAY["11101"] = '11,埼玉県,11101,さいたま市　西区';
GSI.MUNI_ARRAY["11102"] = '11,埼玉県,11102,さいたま市　北区';
GSI.MUNI_ARRAY["11103"] = '11,埼玉県,11103,さいたま市　大宮区';
GSI.MUNI_ARRAY["11104"] = '11,埼玉県,11104,さいたま市　見沼区';
GSI.MUNI_ARRAY["11105"] = '11,埼玉県,11105,さいたま市　中央区';
GSI.MUNI_ARRAY["11106"] = '11,埼玉県,11106,さいたま市　桜区';
GSI.MUNI_ARRAY["11107"] = '11,埼玉県,11107,さいたま市　浦和区';
GSI.MUNI_ARRAY["11108"] = '11,埼玉県,11108,さいたま市　南区';
GSI.MUNI_ARRAY["11109"] = '11,埼玉県,11109,さいたま市　緑区';
GSI.MUNI_ARRAY["11110"] = '11,埼玉県,11110,さいたま市　岩槻区';
GSI.MUNI_ARRAY["11201"] = '11,埼玉県,11201,川越市';
GSI.MUNI_ARRAY["11202"] = '11,埼玉県,11202,熊谷市';
GSI.MUNI_ARRAY["11203"] = '11,埼玉県,11203,川口市';
GSI.MUNI_ARRAY["11206"] = '11,埼玉県,11206,行田市';
GSI.MUNI_ARRAY["11207"] = '11,埼玉県,11207,秩父市';
GSI.MUNI_ARRAY["11208"] = '11,埼玉県,11208,所沢市';
GSI.MUNI_ARRAY["11209"] = '11,埼玉県,11209,飯能市';
GSI.MUNI_ARRAY["11210"] = '11,埼玉県,11210,加須市';
GSI.MUNI_ARRAY["11211"] = '11,埼玉県,11211,本庄市';
GSI.MUNI_ARRAY["11212"] = '11,埼玉県,11212,東松山市';
GSI.MUNI_ARRAY["11214"] = '11,埼玉県,11214,春日部市';
GSI.MUNI_ARRAY["11215"] = '11,埼玉県,11215,狭山市';
GSI.MUNI_ARRAY["11216"] = '11,埼玉県,11216,羽生市';
GSI.MUNI_ARRAY["11217"] = '11,埼玉県,11217,鴻巣市';
GSI.MUNI_ARRAY["11218"] = '11,埼玉県,11218,深谷市';
GSI.MUNI_ARRAY["11219"] = '11,埼玉県,11219,上尾市';
GSI.MUNI_ARRAY["11221"] = '11,埼玉県,11221,草加市';
GSI.MUNI_ARRAY["11222"] = '11,埼玉県,11222,越谷市';
GSI.MUNI_ARRAY["11223"] = '11,埼玉県,11223,蕨市';
GSI.MUNI_ARRAY["11224"] = '11,埼玉県,11224,戸田市';
GSI.MUNI_ARRAY["11225"] = '11,埼玉県,11225,入間市';
GSI.MUNI_ARRAY["11227"] = '11,埼玉県,11227,朝霞市';
GSI.MUNI_ARRAY["11228"] = '11,埼玉県,11228,志木市';
GSI.MUNI_ARRAY["11229"] = '11,埼玉県,11229,和光市';
GSI.MUNI_ARRAY["11230"] = '11,埼玉県,11230,新座市';
GSI.MUNI_ARRAY["11231"] = '11,埼玉県,11231,桶川市';
GSI.MUNI_ARRAY["11232"] = '11,埼玉県,11232,久喜市';
GSI.MUNI_ARRAY["11233"] = '11,埼玉県,11233,北本市';
GSI.MUNI_ARRAY["11234"] = '11,埼玉県,11234,八潮市';
GSI.MUNI_ARRAY["11235"] = '11,埼玉県,11235,富士見市';
GSI.MUNI_ARRAY["11237"] = '11,埼玉県,11237,三郷市';
GSI.MUNI_ARRAY["11238"] = '11,埼玉県,11238,蓮田市';
GSI.MUNI_ARRAY["11239"] = '11,埼玉県,11239,坂戸市';
GSI.MUNI_ARRAY["11240"] = '11,埼玉県,11240,幸手市';
GSI.MUNI_ARRAY["11241"] = '11,埼玉県,11241,鶴ヶ島市';
GSI.MUNI_ARRAY["11242"] = '11,埼玉県,11242,日高市';
GSI.MUNI_ARRAY["11243"] = '11,埼玉県,11243,吉川市';
GSI.MUNI_ARRAY["11245"] = '11,埼玉県,11245,ふじみ野市';
GSI.MUNI_ARRAY["11301"] = '11,埼玉県,11301,伊奈町';
GSI.MUNI_ARRAY["11324"] = '11,埼玉県,11324,三芳町';
GSI.MUNI_ARRAY["11326"] = '11,埼玉県,11326,毛呂山町';
GSI.MUNI_ARRAY["11327"] = '11,埼玉県,11327,越生町';
GSI.MUNI_ARRAY["11341"] = '11,埼玉県,11341,滑川町';
GSI.MUNI_ARRAY["11342"] = '11,埼玉県,11342,嵐山町';
GSI.MUNI_ARRAY["11343"] = '11,埼玉県,11343,小川町';
GSI.MUNI_ARRAY["11346"] = '11,埼玉県,11346,川島町';
GSI.MUNI_ARRAY["11347"] = '11,埼玉県,11347,吉見町';
GSI.MUNI_ARRAY["11348"] = '11,埼玉県,11348,鳩山町';
GSI.MUNI_ARRAY["11349"] = '11,埼玉県,11349,ときがわ町';
GSI.MUNI_ARRAY["11361"] = '11,埼玉県,11361,横瀬町';
GSI.MUNI_ARRAY["11362"] = '11,埼玉県,11362,皆野町';
GSI.MUNI_ARRAY["11363"] = '11,埼玉県,11363,長瀞町';
GSI.MUNI_ARRAY["11365"] = '11,埼玉県,11365,小鹿野町';
GSI.MUNI_ARRAY["11369"] = '11,埼玉県,11369,東秩父村';
GSI.MUNI_ARRAY["11381"] = '11,埼玉県,11381,美里町';
GSI.MUNI_ARRAY["11383"] = '11,埼玉県,11383,神川町';
GSI.MUNI_ARRAY["11385"] = '11,埼玉県,11385,上里町';
GSI.MUNI_ARRAY["11408"] = '11,埼玉県,11408,寄居町';
GSI.MUNI_ARRAY["11442"] = '11,埼玉県,11442,宮代町';
GSI.MUNI_ARRAY["11246"] = '11,埼玉県,11246,白岡市';
GSI.MUNI_ARRAY["11464"] = '11,埼玉県,11464,杉戸町';
GSI.MUNI_ARRAY["11465"] = '11,埼玉県,11465,松伏町';
GSI.MUNI_ARRAY["12100"] = '12,千葉県,12100,千葉市';
GSI.MUNI_ARRAY["12101"] = '12,千葉県,12101,千葉市　中央区';
GSI.MUNI_ARRAY["12102"] = '12,千葉県,12102,千葉市　花見川区';
GSI.MUNI_ARRAY["12103"] = '12,千葉県,12103,千葉市　稲毛区';
GSI.MUNI_ARRAY["12104"] = '12,千葉県,12104,千葉市　若葉区';
GSI.MUNI_ARRAY["12105"] = '12,千葉県,12105,千葉市　緑区';
GSI.MUNI_ARRAY["12106"] = '12,千葉県,12106,千葉市　美浜区';
GSI.MUNI_ARRAY["12202"] = '12,千葉県,12202,銚子市';
GSI.MUNI_ARRAY["12203"] = '12,千葉県,12203,市川市';
GSI.MUNI_ARRAY["12204"] = '12,千葉県,12204,船橋市';
GSI.MUNI_ARRAY["12205"] = '12,千葉県,12205,館山市';
GSI.MUNI_ARRAY["12206"] = '12,千葉県,12206,木更津市';
GSI.MUNI_ARRAY["12207"] = '12,千葉県,12207,松戸市';
GSI.MUNI_ARRAY["12208"] = '12,千葉県,12208,野田市';
GSI.MUNI_ARRAY["12210"] = '12,千葉県,12210,茂原市';
GSI.MUNI_ARRAY["12211"] = '12,千葉県,12211,成田市';
GSI.MUNI_ARRAY["12212"] = '12,千葉県,12212,佐倉市';
GSI.MUNI_ARRAY["12213"] = '12,千葉県,12213,東金市';
GSI.MUNI_ARRAY["12215"] = '12,千葉県,12215,旭市';
GSI.MUNI_ARRAY["12216"] = '12,千葉県,12216,習志野市';
GSI.MUNI_ARRAY["12217"] = '12,千葉県,12217,柏市';
GSI.MUNI_ARRAY["12218"] = '12,千葉県,12218,勝浦市';
GSI.MUNI_ARRAY["12219"] = '12,千葉県,12219,市原市';
GSI.MUNI_ARRAY["12220"] = '12,千葉県,12220,流山市';
GSI.MUNI_ARRAY["12221"] = '12,千葉県,12221,八千代市';
GSI.MUNI_ARRAY["12222"] = '12,千葉県,12222,我孫子市';
GSI.MUNI_ARRAY["12223"] = '12,千葉県,12223,鴨川市';
GSI.MUNI_ARRAY["12224"] = '12,千葉県,12224,鎌ケ谷市';
GSI.MUNI_ARRAY["12225"] = '12,千葉県,12225,君津市';
GSI.MUNI_ARRAY["12226"] = '12,千葉県,12226,富津市';
GSI.MUNI_ARRAY["12227"] = '12,千葉県,12227,浦安市';
GSI.MUNI_ARRAY["12228"] = '12,千葉県,12228,四街道市';
GSI.MUNI_ARRAY["12229"] = '12,千葉県,12229,袖ケ浦市';
GSI.MUNI_ARRAY["12230"] = '12,千葉県,12230,八街市';
GSI.MUNI_ARRAY["12231"] = '12,千葉県,12231,印西市';
GSI.MUNI_ARRAY["12232"] = '12,千葉県,12232,白井市';
GSI.MUNI_ARRAY["12233"] = '12,千葉県,12233,富里市';
GSI.MUNI_ARRAY["12234"] = '12,千葉県,12234,南房総市';
GSI.MUNI_ARRAY["12235"] = '12,千葉県,12235,匝瑳市';
GSI.MUNI_ARRAY["12236"] = '12,千葉県,12236,香取市';
GSI.MUNI_ARRAY["12237"] = '12,千葉県,12237,山武市';
GSI.MUNI_ARRAY["12238"] = '12,千葉県,12238,いすみ市';
GSI.MUNI_ARRAY["12322"] = '12,千葉県,12322,酒々井町';
GSI.MUNI_ARRAY["12329"] = '12,千葉県,12329,栄町';
GSI.MUNI_ARRAY["12342"] = '12,千葉県,12342,神崎町';
GSI.MUNI_ARRAY["12347"] = '12,千葉県,12347,多古町';
GSI.MUNI_ARRAY["12349"] = '12,千葉県,12349,東庄町';
GSI.MUNI_ARRAY["12239"] = '12,千葉県,12239,大網白里市';
GSI.MUNI_ARRAY["12403"] = '12,千葉県,12403,九十九里町';
GSI.MUNI_ARRAY["12409"] = '12,千葉県,12409,芝山町';
GSI.MUNI_ARRAY["12410"] = '12,千葉県,12410,横芝光町';
GSI.MUNI_ARRAY["12421"] = '12,千葉県,12421,一宮町';
GSI.MUNI_ARRAY["12422"] = '12,千葉県,12422,睦沢町';
GSI.MUNI_ARRAY["12423"] = '12,千葉県,12423,長生村';
GSI.MUNI_ARRAY["12424"] = '12,千葉県,12424,白子町';
GSI.MUNI_ARRAY["12426"] = '12,千葉県,12426,長柄町';
GSI.MUNI_ARRAY["12427"] = '12,千葉県,12427,長南町';
GSI.MUNI_ARRAY["12441"] = '12,千葉県,12441,大多喜町';
GSI.MUNI_ARRAY["12443"] = '12,千葉県,12443,御宿町';
GSI.MUNI_ARRAY["12463"] = '12,千葉県,12463,鋸南町';
GSI.MUNI_ARRAY["13101"] = '13,東京都,13101,千代田区';
GSI.MUNI_ARRAY["13102"] = '13,東京都,13102,中央区';
GSI.MUNI_ARRAY["13103"] = '13,東京都,13103,港区';
GSI.MUNI_ARRAY["13104"] = '13,東京都,13104,新宿区';
GSI.MUNI_ARRAY["13105"] = '13,東京都,13105,文京区';
GSI.MUNI_ARRAY["13106"] = '13,東京都,13106,台東区';
GSI.MUNI_ARRAY["13107"] = '13,東京都,13107,墨田区';
GSI.MUNI_ARRAY["13108"] = '13,東京都,13108,江東区';
GSI.MUNI_ARRAY["13109"] = '13,東京都,13109,品川区';
GSI.MUNI_ARRAY["13110"] = '13,東京都,13110,目黒区';
GSI.MUNI_ARRAY["13111"] = '13,東京都,13111,大田区';
GSI.MUNI_ARRAY["13112"] = '13,東京都,13112,世田谷区';
GSI.MUNI_ARRAY["13113"] = '13,東京都,13113,渋谷区';
GSI.MUNI_ARRAY["13114"] = '13,東京都,13114,中野区';
GSI.MUNI_ARRAY["13115"] = '13,東京都,13115,杉並区';
GSI.MUNI_ARRAY["13116"] = '13,東京都,13116,豊島区';
GSI.MUNI_ARRAY["13117"] = '13,東京都,13117,北区';
GSI.MUNI_ARRAY["13118"] = '13,東京都,13118,荒川区';
GSI.MUNI_ARRAY["13119"] = '13,東京都,13119,板橋区';
GSI.MUNI_ARRAY["13120"] = '13,東京都,13120,練馬区';
GSI.MUNI_ARRAY["13121"] = '13,東京都,13121,足立区';
GSI.MUNI_ARRAY["13122"] = '13,東京都,13122,葛飾区';
GSI.MUNI_ARRAY["13123"] = '13,東京都,13123,江戸川区';
GSI.MUNI_ARRAY["13201"] = '13,東京都,13201,八王子市';
GSI.MUNI_ARRAY["13202"] = '13,東京都,13202,立川市';
GSI.MUNI_ARRAY["13203"] = '13,東京都,13203,武蔵野市';
GSI.MUNI_ARRAY["13204"] = '13,東京都,13204,三鷹市';
GSI.MUNI_ARRAY["13205"] = '13,東京都,13205,青梅市';
GSI.MUNI_ARRAY["13206"] = '13,東京都,13206,府中市';
GSI.MUNI_ARRAY["13207"] = '13,東京都,13207,昭島市';
GSI.MUNI_ARRAY["13208"] = '13,東京都,13208,調布市';
GSI.MUNI_ARRAY["13209"] = '13,東京都,13209,町田市';
GSI.MUNI_ARRAY["13210"] = '13,東京都,13210,小金井市';
GSI.MUNI_ARRAY["13211"] = '13,東京都,13211,小平市';
GSI.MUNI_ARRAY["13212"] = '13,東京都,13212,日野市';
GSI.MUNI_ARRAY["13213"] = '13,東京都,13213,東村山市';
GSI.MUNI_ARRAY["13214"] = '13,東京都,13214,国分寺市';
GSI.MUNI_ARRAY["13215"] = '13,東京都,13215,国立市';
GSI.MUNI_ARRAY["13218"] = '13,東京都,13218,福生市';
GSI.MUNI_ARRAY["13219"] = '13,東京都,13219,狛江市';
GSI.MUNI_ARRAY["13220"] = '13,東京都,13220,東大和市';
GSI.MUNI_ARRAY["13221"] = '13,東京都,13221,清瀬市';
GSI.MUNI_ARRAY["13222"] = '13,東京都,13222,東久留米市';
GSI.MUNI_ARRAY["13223"] = '13,東京都,13223,武蔵村山市';
GSI.MUNI_ARRAY["13224"] = '13,東京都,13224,多摩市';
GSI.MUNI_ARRAY["13225"] = '13,東京都,13225,稲城市';
GSI.MUNI_ARRAY["13227"] = '13,東京都,13227,羽村市';
GSI.MUNI_ARRAY["13228"] = '13,東京都,13228,あきる野市';
GSI.MUNI_ARRAY["13229"] = '13,東京都,13229,西東京市';
GSI.MUNI_ARRAY["13303"] = '13,東京都,13303,瑞穂町';
GSI.MUNI_ARRAY["13305"] = '13,東京都,13305,日の出町';
GSI.MUNI_ARRAY["13307"] = '13,東京都,13307,檜原村';
GSI.MUNI_ARRAY["13308"] = '13,東京都,13308,奥多摩町';
GSI.MUNI_ARRAY["13361"] = '13,東京都,13361,大島町';
GSI.MUNI_ARRAY["13362"] = '13,東京都,13362,利島村';
GSI.MUNI_ARRAY["13363"] = '13,東京都,13363,新島村';
GSI.MUNI_ARRAY["13364"] = '13,東京都,13364,神津島村';
GSI.MUNI_ARRAY["13381"] = '13,東京都,13381,三宅村';
GSI.MUNI_ARRAY["13382"] = '13,東京都,13382,御蔵島村';
GSI.MUNI_ARRAY["13401"] = '13,東京都,13401,八丈町';
GSI.MUNI_ARRAY["13402"] = '13,東京都,13402,青ヶ島村';
GSI.MUNI_ARRAY["13421"] = '13,東京都,13421,小笠原村';
GSI.MUNI_ARRAY["14100"] = '14,神奈川県,14100,横浜市';
GSI.MUNI_ARRAY["14101"] = '14,神奈川県,14101,横浜市　鶴見区';
GSI.MUNI_ARRAY["14102"] = '14,神奈川県,14102,横浜市　神奈川区';
GSI.MUNI_ARRAY["14103"] = '14,神奈川県,14103,横浜市　西区';
GSI.MUNI_ARRAY["14104"] = '14,神奈川県,14104,横浜市　中区';
GSI.MUNI_ARRAY["14105"] = '14,神奈川県,14105,横浜市　南区';
GSI.MUNI_ARRAY["14106"] = '14,神奈川県,14106,横浜市　保土ケ谷区';
GSI.MUNI_ARRAY["14107"] = '14,神奈川県,14107,横浜市　磯子区';
GSI.MUNI_ARRAY["14108"] = '14,神奈川県,14108,横浜市　金沢区';
GSI.MUNI_ARRAY["14109"] = '14,神奈川県,14109,横浜市　港北区';
GSI.MUNI_ARRAY["14110"] = '14,神奈川県,14110,横浜市　戸塚区';
GSI.MUNI_ARRAY["14111"] = '14,神奈川県,14111,横浜市　港南区';
GSI.MUNI_ARRAY["14112"] = '14,神奈川県,14112,横浜市　旭区';
GSI.MUNI_ARRAY["14113"] = '14,神奈川県,14113,横浜市　緑区';
GSI.MUNI_ARRAY["14114"] = '14,神奈川県,14114,横浜市　瀬谷区';
GSI.MUNI_ARRAY["14115"] = '14,神奈川県,14115,横浜市　栄区';
GSI.MUNI_ARRAY["14116"] = '14,神奈川県,14116,横浜市　泉区';
GSI.MUNI_ARRAY["14117"] = '14,神奈川県,14117,横浜市　青葉区';
GSI.MUNI_ARRAY["14118"] = '14,神奈川県,14118,横浜市　都筑区';
GSI.MUNI_ARRAY["14130"] = '14,神奈川県,14130,川崎市';
GSI.MUNI_ARRAY["14131"] = '14,神奈川県,14131,川崎市　川崎区';
GSI.MUNI_ARRAY["14132"] = '14,神奈川県,14132,川崎市　幸区';
GSI.MUNI_ARRAY["14133"] = '14,神奈川県,14133,川崎市　中原区';
GSI.MUNI_ARRAY["14134"] = '14,神奈川県,14134,川崎市　高津区';
GSI.MUNI_ARRAY["14135"] = '14,神奈川県,14135,川崎市　多摩区';
GSI.MUNI_ARRAY["14136"] = '14,神奈川県,14136,川崎市　宮前区';
GSI.MUNI_ARRAY["14137"] = '14,神奈川県,14137,川崎市　麻生区';
GSI.MUNI_ARRAY["14150"] = '14,神奈川県,14150,相模原市';
GSI.MUNI_ARRAY["14151"] = '14,神奈川県,14151,相模原市　緑区';
GSI.MUNI_ARRAY["14152"] = '14,神奈川県,14152,相模原市　中央区';
GSI.MUNI_ARRAY["14153"] = '14,神奈川県,14153,相模原市　南区';
GSI.MUNI_ARRAY["14201"] = '14,神奈川県,14201,横須賀市';
GSI.MUNI_ARRAY["14203"] = '14,神奈川県,14203,平塚市';
GSI.MUNI_ARRAY["14204"] = '14,神奈川県,14204,鎌倉市';
GSI.MUNI_ARRAY["14205"] = '14,神奈川県,14205,藤沢市';
GSI.MUNI_ARRAY["14206"] = '14,神奈川県,14206,小田原市';
GSI.MUNI_ARRAY["14207"] = '14,神奈川県,14207,茅ヶ崎市';
GSI.MUNI_ARRAY["14208"] = '14,神奈川県,14208,逗子市';
GSI.MUNI_ARRAY["14210"] = '14,神奈川県,14210,三浦市';
GSI.MUNI_ARRAY["14211"] = '14,神奈川県,14211,秦野市';
GSI.MUNI_ARRAY["14212"] = '14,神奈川県,14212,厚木市';
GSI.MUNI_ARRAY["14213"] = '14,神奈川県,14213,大和市';
GSI.MUNI_ARRAY["14214"] = '14,神奈川県,14214,伊勢原市';
GSI.MUNI_ARRAY["14215"] = '14,神奈川県,14215,海老名市';
GSI.MUNI_ARRAY["14216"] = '14,神奈川県,14216,座間市';
GSI.MUNI_ARRAY["14217"] = '14,神奈川県,14217,南足柄市';
GSI.MUNI_ARRAY["14218"] = '14,神奈川県,14218,綾瀬市';
GSI.MUNI_ARRAY["14301"] = '14,神奈川県,14301,葉山町';
GSI.MUNI_ARRAY["14321"] = '14,神奈川県,14321,寒川町';
GSI.MUNI_ARRAY["14341"] = '14,神奈川県,14341,大磯町';
GSI.MUNI_ARRAY["14342"] = '14,神奈川県,14342,二宮町';
GSI.MUNI_ARRAY["14361"] = '14,神奈川県,14361,中井町';
GSI.MUNI_ARRAY["14362"] = '14,神奈川県,14362,大井町';
GSI.MUNI_ARRAY["14363"] = '14,神奈川県,14363,松田町';
GSI.MUNI_ARRAY["14364"] = '14,神奈川県,14364,山北町';
GSI.MUNI_ARRAY["14366"] = '14,神奈川県,14366,開成町';
GSI.MUNI_ARRAY["14382"] = '14,神奈川県,14382,箱根町';
GSI.MUNI_ARRAY["14383"] = '14,神奈川県,14383,真鶴町';
GSI.MUNI_ARRAY["14384"] = '14,神奈川県,14384,湯河原町';
GSI.MUNI_ARRAY["14401"] = '14,神奈川県,14401,愛川町';
GSI.MUNI_ARRAY["14402"] = '14,神奈川県,14402,清川村';
GSI.MUNI_ARRAY["15100"] = '15,新潟県,15100,新潟市';
GSI.MUNI_ARRAY["15101"] = '15,新潟県,15101,新潟市　北区';
GSI.MUNI_ARRAY["15102"] = '15,新潟県,15102,新潟市　東区';
GSI.MUNI_ARRAY["15103"] = '15,新潟県,15103,新潟市　中央区';
GSI.MUNI_ARRAY["15104"] = '15,新潟県,15104,新潟市　江南区';
GSI.MUNI_ARRAY["15105"] = '15,新潟県,15105,新潟市　秋葉区';
GSI.MUNI_ARRAY["15106"] = '15,新潟県,15106,新潟市　南区';
GSI.MUNI_ARRAY["15107"] = '15,新潟県,15107,新潟市　西区';
GSI.MUNI_ARRAY["15108"] = '15,新潟県,15108,新潟市　西蒲区';
GSI.MUNI_ARRAY["15202"] = '15,新潟県,15202,長岡市';
GSI.MUNI_ARRAY["15204"] = '15,新潟県,15204,三条市';
GSI.MUNI_ARRAY["15205"] = '15,新潟県,15205,柏崎市';
GSI.MUNI_ARRAY["15206"] = '15,新潟県,15206,新発田市';
GSI.MUNI_ARRAY["15208"] = '15,新潟県,15208,小千谷市';
GSI.MUNI_ARRAY["15209"] = '15,新潟県,15209,加茂市';
GSI.MUNI_ARRAY["15210"] = '15,新潟県,15210,十日町市';
GSI.MUNI_ARRAY["15211"] = '15,新潟県,15211,見附市';
GSI.MUNI_ARRAY["15212"] = '15,新潟県,15212,村上市';
GSI.MUNI_ARRAY["15213"] = '15,新潟県,15213,燕市';
GSI.MUNI_ARRAY["15216"] = '15,新潟県,15216,糸魚川市';
GSI.MUNI_ARRAY["15217"] = '15,新潟県,15217,妙高市';
GSI.MUNI_ARRAY["15218"] = '15,新潟県,15218,五泉市';
GSI.MUNI_ARRAY["15222"] = '15,新潟県,15222,上越市';
GSI.MUNI_ARRAY["15223"] = '15,新潟県,15223,阿賀野市';
GSI.MUNI_ARRAY["15224"] = '15,新潟県,15224,佐渡市';
GSI.MUNI_ARRAY["15225"] = '15,新潟県,15225,魚沼市';
GSI.MUNI_ARRAY["15226"] = '15,新潟県,15226,南魚沼市';
GSI.MUNI_ARRAY["15227"] = '15,新潟県,15227,胎内市';
GSI.MUNI_ARRAY["15307"] = '15,新潟県,15307,聖籠町';
GSI.MUNI_ARRAY["15342"] = '15,新潟県,15342,弥彦村';
GSI.MUNI_ARRAY["15361"] = '15,新潟県,15361,田上町';
GSI.MUNI_ARRAY["15385"] = '15,新潟県,15385,阿賀町';
GSI.MUNI_ARRAY["15405"] = '15,新潟県,15405,出雲崎町';
GSI.MUNI_ARRAY["15461"] = '15,新潟県,15461,湯沢町';
GSI.MUNI_ARRAY["15482"] = '15,新潟県,15482,津南町';
GSI.MUNI_ARRAY["15504"] = '15,新潟県,15504,刈羽村';
GSI.MUNI_ARRAY["15581"] = '15,新潟県,15581,関川村';
GSI.MUNI_ARRAY["15586"] = '15,新潟県,15586,粟島浦村';
GSI.MUNI_ARRAY["16201"] = '16,富山県,16201,富山市';
GSI.MUNI_ARRAY["16202"] = '16,富山県,16202,高岡市';
GSI.MUNI_ARRAY["16204"] = '16,富山県,16204,魚津市';
GSI.MUNI_ARRAY["16205"] = '16,富山県,16205,氷見市';
GSI.MUNI_ARRAY["16206"] = '16,富山県,16206,滑川市';
GSI.MUNI_ARRAY["16207"] = '16,富山県,16207,黒部市';
GSI.MUNI_ARRAY["16208"] = '16,富山県,16208,砺波市';
GSI.MUNI_ARRAY["16209"] = '16,富山県,16209,小矢部市';
GSI.MUNI_ARRAY["16210"] = '16,富山県,16210,南砺市';
GSI.MUNI_ARRAY["16211"] = '16,富山県,16211,射水市';
GSI.MUNI_ARRAY["16321"] = '16,富山県,16321,舟橋村';
GSI.MUNI_ARRAY["16322"] = '16,富山県,16322,上市町';
GSI.MUNI_ARRAY["16323"] = '16,富山県,16323,立山町';
GSI.MUNI_ARRAY["16342"] = '16,富山県,16342,入善町';
GSI.MUNI_ARRAY["16343"] = '16,富山県,16343,朝日町';
GSI.MUNI_ARRAY["17201"] = '17,石川県,17201,金沢市';
GSI.MUNI_ARRAY["17202"] = '17,石川県,17202,七尾市';
GSI.MUNI_ARRAY["17203"] = '17,石川県,17203,小松市';
GSI.MUNI_ARRAY["17204"] = '17,石川県,17204,輪島市';
GSI.MUNI_ARRAY["17205"] = '17,石川県,17205,珠洲市';
GSI.MUNI_ARRAY["17206"] = '17,石川県,17206,加賀市';
GSI.MUNI_ARRAY["17207"] = '17,石川県,17207,羽咋市';
GSI.MUNI_ARRAY["17209"] = '17,石川県,17209,かほく市';
GSI.MUNI_ARRAY["17210"] = '17,石川県,17210,白山市';
GSI.MUNI_ARRAY["17211"] = '17,石川県,17211,能美市';
GSI.MUNI_ARRAY["17212"] = '17,石川県,17212,野々市市';
GSI.MUNI_ARRAY["17324"] = '17,石川県,17324,川北町';
GSI.MUNI_ARRAY["17361"] = '17,石川県,17361,津幡町';
GSI.MUNI_ARRAY["17365"] = '17,石川県,17365,内灘町';
GSI.MUNI_ARRAY["17384"] = '17,石川県,17384,志賀町';
GSI.MUNI_ARRAY["17386"] = '17,石川県,17386,宝達志水町';
GSI.MUNI_ARRAY["17407"] = '17,石川県,17407,中能登町';
GSI.MUNI_ARRAY["17461"] = '17,石川県,17461,穴水町';
GSI.MUNI_ARRAY["17463"] = '17,石川県,17463,能登町';
GSI.MUNI_ARRAY["18201"] = '18,福井県,18201,福井市';
GSI.MUNI_ARRAY["18202"] = '18,福井県,18202,敦賀市';
GSI.MUNI_ARRAY["18204"] = '18,福井県,18204,小浜市';
GSI.MUNI_ARRAY["18205"] = '18,福井県,18205,大野市';
GSI.MUNI_ARRAY["18206"] = '18,福井県,18206,勝山市';
GSI.MUNI_ARRAY["18207"] = '18,福井県,18207,鯖江市';
GSI.MUNI_ARRAY["18208"] = '18,福井県,18208,あわら市';
GSI.MUNI_ARRAY["18209"] = '18,福井県,18209,越前市';
GSI.MUNI_ARRAY["18210"] = '18,福井県,18210,坂井市';
GSI.MUNI_ARRAY["18322"] = '18,福井県,18322,永平寺町';
GSI.MUNI_ARRAY["18382"] = '18,福井県,18382,池田町';
GSI.MUNI_ARRAY["18404"] = '18,福井県,18404,南越前町';
GSI.MUNI_ARRAY["18423"] = '18,福井県,18423,越前町';
GSI.MUNI_ARRAY["18442"] = '18,福井県,18442,美浜町';
GSI.MUNI_ARRAY["18481"] = '18,福井県,18481,高浜町';
GSI.MUNI_ARRAY["18483"] = '18,福井県,18483,おおい町';
GSI.MUNI_ARRAY["18501"] = '18,福井県,18501,若狭町';
GSI.MUNI_ARRAY["19201"] = '19,山梨県,19201,甲府市';
GSI.MUNI_ARRAY["19202"] = '19,山梨県,19202,富士吉田市';
GSI.MUNI_ARRAY["19204"] = '19,山梨県,19204,都留市';
GSI.MUNI_ARRAY["19205"] = '19,山梨県,19205,山梨市';
GSI.MUNI_ARRAY["19206"] = '19,山梨県,19206,大月市';
GSI.MUNI_ARRAY["19207"] = '19,山梨県,19207,韮崎市';
GSI.MUNI_ARRAY["19208"] = '19,山梨県,19208,南アルプス市';
GSI.MUNI_ARRAY["19209"] = '19,山梨県,19209,北杜市';
GSI.MUNI_ARRAY["19210"] = '19,山梨県,19210,甲斐市';
GSI.MUNI_ARRAY["19211"] = '19,山梨県,19211,笛吹市';
GSI.MUNI_ARRAY["19212"] = '19,山梨県,19212,上野原市';
GSI.MUNI_ARRAY["19213"] = '19,山梨県,19213,甲州市';
GSI.MUNI_ARRAY["19214"] = '19,山梨県,19214,中央市';
GSI.MUNI_ARRAY["19346"] = '19,山梨県,19346,市川三郷町';
GSI.MUNI_ARRAY["19364"] = '19,山梨県,19364,早川町';
GSI.MUNI_ARRAY["19365"] = '19,山梨県,19365,身延町';
GSI.MUNI_ARRAY["19366"] = '19,山梨県,19366,南部町';
GSI.MUNI_ARRAY["19368"] = '19,山梨県,19368,富士川町';
GSI.MUNI_ARRAY["19384"] = '19,山梨県,19384,昭和町';
GSI.MUNI_ARRAY["19422"] = '19,山梨県,19422,道志村';
GSI.MUNI_ARRAY["19423"] = '19,山梨県,19423,西桂町';
GSI.MUNI_ARRAY["19424"] = '19,山梨県,19424,忍野村';
GSI.MUNI_ARRAY["19425"] = '19,山梨県,19425,山中湖村';
GSI.MUNI_ARRAY["19429"] = '19,山梨県,19429,鳴沢村';
GSI.MUNI_ARRAY["19430"] = '19,山梨県,19430,富士河口湖町';
GSI.MUNI_ARRAY["19442"] = '19,山梨県,19442,小菅村';
GSI.MUNI_ARRAY["19443"] = '19,山梨県,19443,丹波山村';
GSI.MUNI_ARRAY["20201"] = '20,長野県,20201,長野市';
GSI.MUNI_ARRAY["20202"] = '20,長野県,20202,松本市';
GSI.MUNI_ARRAY["20203"] = '20,長野県,20203,上田市';
GSI.MUNI_ARRAY["20204"] = '20,長野県,20204,岡谷市';
GSI.MUNI_ARRAY["20205"] = '20,長野県,20205,飯田市';
GSI.MUNI_ARRAY["20206"] = '20,長野県,20206,諏訪市';
GSI.MUNI_ARRAY["20207"] = '20,長野県,20207,須坂市';
GSI.MUNI_ARRAY["20208"] = '20,長野県,20208,小諸市';
GSI.MUNI_ARRAY["20209"] = '20,長野県,20209,伊那市';
GSI.MUNI_ARRAY["20210"] = '20,長野県,20210,駒ヶ根市';
GSI.MUNI_ARRAY["20211"] = '20,長野県,20211,中野市';
GSI.MUNI_ARRAY["20212"] = '20,長野県,20212,大町市';
GSI.MUNI_ARRAY["20213"] = '20,長野県,20213,飯山市';
GSI.MUNI_ARRAY["20214"] = '20,長野県,20214,茅野市';
GSI.MUNI_ARRAY["20215"] = '20,長野県,20215,塩尻市';
GSI.MUNI_ARRAY["20217"] = '20,長野県,20217,佐久市';
GSI.MUNI_ARRAY["20218"] = '20,長野県,20218,千曲市';
GSI.MUNI_ARRAY["20219"] = '20,長野県,20219,東御市';
GSI.MUNI_ARRAY["20220"] = '20,長野県,20220,安曇野市';
GSI.MUNI_ARRAY["20303"] = '20,長野県,20303,小海町';
GSI.MUNI_ARRAY["20304"] = '20,長野県,20304,川上村';
GSI.MUNI_ARRAY["20305"] = '20,長野県,20305,南牧村';
GSI.MUNI_ARRAY["20306"] = '20,長野県,20306,南相木村';
GSI.MUNI_ARRAY["20307"] = '20,長野県,20307,北相木村';
GSI.MUNI_ARRAY["20309"] = '20,長野県,20309,佐久穂町';
GSI.MUNI_ARRAY["20321"] = '20,長野県,20321,軽井沢町';
GSI.MUNI_ARRAY["20323"] = '20,長野県,20323,御代田町';
GSI.MUNI_ARRAY["20324"] = '20,長野県,20324,立科町';
GSI.MUNI_ARRAY["20349"] = '20,長野県,20349,青木村';
GSI.MUNI_ARRAY["20350"] = '20,長野県,20350,長和町';
GSI.MUNI_ARRAY["20361"] = '20,長野県,20361,下諏訪町';
GSI.MUNI_ARRAY["20362"] = '20,長野県,20362,富士見町';
GSI.MUNI_ARRAY["20363"] = '20,長野県,20363,原村';
GSI.MUNI_ARRAY["20382"] = '20,長野県,20382,辰野町';
GSI.MUNI_ARRAY["20383"] = '20,長野県,20383,箕輪町';
GSI.MUNI_ARRAY["20384"] = '20,長野県,20384,飯島町';
GSI.MUNI_ARRAY["20385"] = '20,長野県,20385,南箕輪村';
GSI.MUNI_ARRAY["20386"] = '20,長野県,20386,中川村';
GSI.MUNI_ARRAY["20388"] = '20,長野県,20388,宮田村';
GSI.MUNI_ARRAY["20402"] = '20,長野県,20402,松川町';
GSI.MUNI_ARRAY["20403"] = '20,長野県,20403,高森町';
GSI.MUNI_ARRAY["20404"] = '20,長野県,20404,阿南町';
GSI.MUNI_ARRAY["20407"] = '20,長野県,20407,阿智村';
GSI.MUNI_ARRAY["20409"] = '20,長野県,20409,平谷村';
GSI.MUNI_ARRAY["20410"] = '20,長野県,20410,根羽村';
GSI.MUNI_ARRAY["20411"] = '20,長野県,20411,下條村';
GSI.MUNI_ARRAY["20412"] = '20,長野県,20412,売木村';
GSI.MUNI_ARRAY["20413"] = '20,長野県,20413,天龍村';
GSI.MUNI_ARRAY["20414"] = '20,長野県,20414,泰阜村';
GSI.MUNI_ARRAY["20415"] = '20,長野県,20415,喬木村';
GSI.MUNI_ARRAY["20416"] = '20,長野県,20416,豊丘村';
GSI.MUNI_ARRAY["20417"] = '20,長野県,20417,大鹿村';
GSI.MUNI_ARRAY["20422"] = '20,長野県,20422,上松町';
GSI.MUNI_ARRAY["20423"] = '20,長野県,20423,南木曽町';
GSI.MUNI_ARRAY["20425"] = '20,長野県,20425,木祖村';
GSI.MUNI_ARRAY["20429"] = '20,長野県,20429,王滝村';
GSI.MUNI_ARRAY["20430"] = '20,長野県,20430,大桑村';
GSI.MUNI_ARRAY["20432"] = '20,長野県,20432,木曽町';
GSI.MUNI_ARRAY["20446"] = '20,長野県,20446,麻績村';
GSI.MUNI_ARRAY["20448"] = '20,長野県,20448,生坂村';
GSI.MUNI_ARRAY["20450"] = '20,長野県,20450,山形村';
GSI.MUNI_ARRAY["20451"] = '20,長野県,20451,朝日村';
GSI.MUNI_ARRAY["20452"] = '20,長野県,20452,筑北村';
GSI.MUNI_ARRAY["20481"] = '20,長野県,20481,池田町';
GSI.MUNI_ARRAY["20482"] = '20,長野県,20482,松川村';
GSI.MUNI_ARRAY["20485"] = '20,長野県,20485,白馬村';
GSI.MUNI_ARRAY["20486"] = '20,長野県,20486,小谷村';
GSI.MUNI_ARRAY["20521"] = '20,長野県,20521,坂城町';
GSI.MUNI_ARRAY["20541"] = '20,長野県,20541,小布施町';
GSI.MUNI_ARRAY["20543"] = '20,長野県,20543,高山村';
GSI.MUNI_ARRAY["20561"] = '20,長野県,20561,山ノ内町';
GSI.MUNI_ARRAY["20562"] = '20,長野県,20562,木島平村';
GSI.MUNI_ARRAY["20563"] = '20,長野県,20563,野沢温泉村';
GSI.MUNI_ARRAY["20583"] = '20,長野県,20583,信濃町';
GSI.MUNI_ARRAY["20588"] = '20,長野県,20588,小川村';
GSI.MUNI_ARRAY["20590"] = '20,長野県,20590,飯綱町';
GSI.MUNI_ARRAY["20602"] = '20,長野県,20602,栄村';
GSI.MUNI_ARRAY["21201"] = '21,岐阜県,21201,岐阜市';
GSI.MUNI_ARRAY["21202"] = '21,岐阜県,21202,大垣市';
GSI.MUNI_ARRAY["21203"] = '21,岐阜県,21203,高山市';
GSI.MUNI_ARRAY["21204"] = '21,岐阜県,21204,多治見市';
GSI.MUNI_ARRAY["21205"] = '21,岐阜県,21205,関市';
GSI.MUNI_ARRAY["21206"] = '21,岐阜県,21206,中津川市';
GSI.MUNI_ARRAY["21207"] = '21,岐阜県,21207,美濃市';
GSI.MUNI_ARRAY["21208"] = '21,岐阜県,21208,瑞浪市';
GSI.MUNI_ARRAY["21209"] = '21,岐阜県,21209,羽島市';
GSI.MUNI_ARRAY["21210"] = '21,岐阜県,21210,恵那市';
GSI.MUNI_ARRAY["21211"] = '21,岐阜県,21211,美濃加茂市';
GSI.MUNI_ARRAY["21212"] = '21,岐阜県,21212,土岐市';
GSI.MUNI_ARRAY["21213"] = '21,岐阜県,21213,各務原市';
GSI.MUNI_ARRAY["21214"] = '21,岐阜県,21214,可児市';
GSI.MUNI_ARRAY["21215"] = '21,岐阜県,21215,山県市';
GSI.MUNI_ARRAY["21216"] = '21,岐阜県,21216,瑞穂市';
GSI.MUNI_ARRAY["21217"] = '21,岐阜県,21217,飛騨市';
GSI.MUNI_ARRAY["21218"] = '21,岐阜県,21218,本巣市';
GSI.MUNI_ARRAY["21219"] = '21,岐阜県,21219,郡上市';
GSI.MUNI_ARRAY["21220"] = '21,岐阜県,21220,下呂市';
GSI.MUNI_ARRAY["21221"] = '21,岐阜県,21221,海津市';
GSI.MUNI_ARRAY["21302"] = '21,岐阜県,21302,岐南町';
GSI.MUNI_ARRAY["21303"] = '21,岐阜県,21303,笠松町';
GSI.MUNI_ARRAY["21341"] = '21,岐阜県,21341,養老町';
GSI.MUNI_ARRAY["21361"] = '21,岐阜県,21361,垂井町';
GSI.MUNI_ARRAY["21362"] = '21,岐阜県,21362,関ケ原町';
GSI.MUNI_ARRAY["21381"] = '21,岐阜県,21381,神戸町';
GSI.MUNI_ARRAY["21382"] = '21,岐阜県,21382,輪之内町';
GSI.MUNI_ARRAY["21383"] = '21,岐阜県,21383,安八町';
GSI.MUNI_ARRAY["21401"] = '21,岐阜県,21401,揖斐川町';
GSI.MUNI_ARRAY["21403"] = '21,岐阜県,21403,大野町';
GSI.MUNI_ARRAY["21404"] = '21,岐阜県,21404,池田町';
GSI.MUNI_ARRAY["21421"] = '21,岐阜県,21421,北方町';
GSI.MUNI_ARRAY["21501"] = '21,岐阜県,21501,坂祝町';
GSI.MUNI_ARRAY["21502"] = '21,岐阜県,21502,富加町';
GSI.MUNI_ARRAY["21503"] = '21,岐阜県,21503,川辺町';
GSI.MUNI_ARRAY["21504"] = '21,岐阜県,21504,七宗町';
GSI.MUNI_ARRAY["21505"] = '21,岐阜県,21505,八百津町';
GSI.MUNI_ARRAY["21506"] = '21,岐阜県,21506,白川町';
GSI.MUNI_ARRAY["21507"] = '21,岐阜県,21507,東白川村';
GSI.MUNI_ARRAY["21521"] = '21,岐阜県,21521,御嵩町';
GSI.MUNI_ARRAY["21604"] = '21,岐阜県,21604,白川村';
GSI.MUNI_ARRAY["22100"] = '22,静岡県,22100,静岡市';
GSI.MUNI_ARRAY["22101"] = '22,静岡県,22101,静岡市　葵区';
GSI.MUNI_ARRAY["22102"] = '22,静岡県,22102,静岡市　駿河区';
GSI.MUNI_ARRAY["22103"] = '22,静岡県,22103,静岡市　清水区';
GSI.MUNI_ARRAY["22130"] = '22,静岡県,22130,浜松市';
GSI.MUNI_ARRAY["22131"] = '22,静岡県,22131,浜松市　中区';
GSI.MUNI_ARRAY["22132"] = '22,静岡県,22132,浜松市　東区';
GSI.MUNI_ARRAY["22133"] = '22,静岡県,22133,浜松市　西区';
GSI.MUNI_ARRAY["22134"] = '22,静岡県,22134,浜松市　南区';
GSI.MUNI_ARRAY["22135"] = '22,静岡県,22135,浜松市　北区';
GSI.MUNI_ARRAY["22136"] = '22,静岡県,22136,浜松市　浜北区';
GSI.MUNI_ARRAY["22137"] = '22,静岡県,22137,浜松市　天竜区';
GSI.MUNI_ARRAY["22203"] = '22,静岡県,22203,沼津市';
GSI.MUNI_ARRAY["22205"] = '22,静岡県,22205,熱海市';
GSI.MUNI_ARRAY["22206"] = '22,静岡県,22206,三島市';
GSI.MUNI_ARRAY["22207"] = '22,静岡県,22207,富士宮市';
GSI.MUNI_ARRAY["22208"] = '22,静岡県,22208,伊東市';
GSI.MUNI_ARRAY["22209"] = '22,静岡県,22209,島田市';
GSI.MUNI_ARRAY["22210"] = '22,静岡県,22210,富士市';
GSI.MUNI_ARRAY["22211"] = '22,静岡県,22211,磐田市';
GSI.MUNI_ARRAY["22212"] = '22,静岡県,22212,焼津市';
GSI.MUNI_ARRAY["22213"] = '22,静岡県,22213,掛川市';
GSI.MUNI_ARRAY["22214"] = '22,静岡県,22214,藤枝市';
GSI.MUNI_ARRAY["22215"] = '22,静岡県,22215,御殿場市';
GSI.MUNI_ARRAY["22216"] = '22,静岡県,22216,袋井市';
GSI.MUNI_ARRAY["22219"] = '22,静岡県,22219,下田市';
GSI.MUNI_ARRAY["22220"] = '22,静岡県,22220,裾野市';
GSI.MUNI_ARRAY["22221"] = '22,静岡県,22221,湖西市';
GSI.MUNI_ARRAY["22222"] = '22,静岡県,22222,伊豆市';
GSI.MUNI_ARRAY["22223"] = '22,静岡県,22223,御前崎市';
GSI.MUNI_ARRAY["22224"] = '22,静岡県,22224,菊川市';
GSI.MUNI_ARRAY["22225"] = '22,静岡県,22225,伊豆の国市';
GSI.MUNI_ARRAY["22226"] = '22,静岡県,22226,牧之原市';
GSI.MUNI_ARRAY["22301"] = '22,静岡県,22301,東伊豆町';
GSI.MUNI_ARRAY["22302"] = '22,静岡県,22302,河津町';
GSI.MUNI_ARRAY["22304"] = '22,静岡県,22304,南伊豆町';
GSI.MUNI_ARRAY["22305"] = '22,静岡県,22305,松崎町';
GSI.MUNI_ARRAY["22306"] = '22,静岡県,22306,西伊豆町';
GSI.MUNI_ARRAY["22325"] = '22,静岡県,22325,函南町';
GSI.MUNI_ARRAY["22341"] = '22,静岡県,22341,清水町';
GSI.MUNI_ARRAY["22342"] = '22,静岡県,22342,長泉町';
GSI.MUNI_ARRAY["22344"] = '22,静岡県,22344,小山町';
GSI.MUNI_ARRAY["22424"] = '22,静岡県,22424,吉田町';
GSI.MUNI_ARRAY["22429"] = '22,静岡県,22429,川根本町';
GSI.MUNI_ARRAY["22461"] = '22,静岡県,22461,森町';
GSI.MUNI_ARRAY["23100"] = '23,愛知県,23100,名古屋市';
GSI.MUNI_ARRAY["23101"] = '23,愛知県,23101,名古屋市　千種区';
GSI.MUNI_ARRAY["23102"] = '23,愛知県,23102,名古屋市　東区';
GSI.MUNI_ARRAY["23103"] = '23,愛知県,23103,名古屋市　北区';
GSI.MUNI_ARRAY["23104"] = '23,愛知県,23104,名古屋市　西区';
GSI.MUNI_ARRAY["23105"] = '23,愛知県,23105,名古屋市　中村区';
GSI.MUNI_ARRAY["23106"] = '23,愛知県,23106,名古屋市　中区';
GSI.MUNI_ARRAY["23107"] = '23,愛知県,23107,名古屋市　昭和区';
GSI.MUNI_ARRAY["23108"] = '23,愛知県,23108,名古屋市　瑞穂区';
GSI.MUNI_ARRAY["23109"] = '23,愛知県,23109,名古屋市　熱田区';
GSI.MUNI_ARRAY["23110"] = '23,愛知県,23110,名古屋市　中川区';
GSI.MUNI_ARRAY["23111"] = '23,愛知県,23111,名古屋市　港区';
GSI.MUNI_ARRAY["23112"] = '23,愛知県,23112,名古屋市　南区';
GSI.MUNI_ARRAY["23113"] = '23,愛知県,23113,名古屋市　守山区';
GSI.MUNI_ARRAY["23114"] = '23,愛知県,23114,名古屋市　緑区';
GSI.MUNI_ARRAY["23115"] = '23,愛知県,23115,名古屋市　名東区';
GSI.MUNI_ARRAY["23116"] = '23,愛知県,23116,名古屋市　天白区';
GSI.MUNI_ARRAY["23201"] = '23,愛知県,23201,豊橋市';
GSI.MUNI_ARRAY["23202"] = '23,愛知県,23202,岡崎市';
GSI.MUNI_ARRAY["23203"] = '23,愛知県,23203,一宮市';
GSI.MUNI_ARRAY["23204"] = '23,愛知県,23204,瀬戸市';
GSI.MUNI_ARRAY["23205"] = '23,愛知県,23205,半田市';
GSI.MUNI_ARRAY["23206"] = '23,愛知県,23206,春日井市';
GSI.MUNI_ARRAY["23207"] = '23,愛知県,23207,豊川市';
GSI.MUNI_ARRAY["23208"] = '23,愛知県,23208,津島市';
GSI.MUNI_ARRAY["23209"] = '23,愛知県,23209,碧南市';
GSI.MUNI_ARRAY["23210"] = '23,愛知県,23210,刈谷市';
GSI.MUNI_ARRAY["23211"] = '23,愛知県,23211,豊田市';
GSI.MUNI_ARRAY["23212"] = '23,愛知県,23212,安城市';
GSI.MUNI_ARRAY["23213"] = '23,愛知県,23213,西尾市';
GSI.MUNI_ARRAY["23214"] = '23,愛知県,23214,蒲郡市';
GSI.MUNI_ARRAY["23215"] = '23,愛知県,23215,犬山市';
GSI.MUNI_ARRAY["23216"] = '23,愛知県,23216,常滑市';
GSI.MUNI_ARRAY["23217"] = '23,愛知県,23217,江南市';
GSI.MUNI_ARRAY["23219"] = '23,愛知県,23219,小牧市';
GSI.MUNI_ARRAY["23220"] = '23,愛知県,23220,稲沢市';
GSI.MUNI_ARRAY["23221"] = '23,愛知県,23221,新城市';
GSI.MUNI_ARRAY["23222"] = '23,愛知県,23222,東海市';
GSI.MUNI_ARRAY["23223"] = '23,愛知県,23223,大府市';
GSI.MUNI_ARRAY["23224"] = '23,愛知県,23224,知多市';
GSI.MUNI_ARRAY["23225"] = '23,愛知県,23225,知立市';
GSI.MUNI_ARRAY["23226"] = '23,愛知県,23226,尾張旭市';
GSI.MUNI_ARRAY["23227"] = '23,愛知県,23227,高浜市';
GSI.MUNI_ARRAY["23228"] = '23,愛知県,23228,岩倉市';
GSI.MUNI_ARRAY["23229"] = '23,愛知県,23229,豊明市';
GSI.MUNI_ARRAY["23230"] = '23,愛知県,23230,日進市';
GSI.MUNI_ARRAY["23231"] = '23,愛知県,23231,田原市';
GSI.MUNI_ARRAY["23232"] = '23,愛知県,23232,愛西市';
GSI.MUNI_ARRAY["23233"] = '23,愛知県,23233,清須市';
GSI.MUNI_ARRAY["23234"] = '23,愛知県,23234,北名古屋市';
GSI.MUNI_ARRAY["23235"] = '23,愛知県,23235,弥富市';
GSI.MUNI_ARRAY["23236"] = '23,愛知県,23236,みよし市';
GSI.MUNI_ARRAY["23237"] = '23,愛知県,23237,あま市';
GSI.MUNI_ARRAY["23238"] = '23,愛知県,23238,長久手市';
GSI.MUNI_ARRAY["23302"] = '23,愛知県,23302,東郷町';
GSI.MUNI_ARRAY["23342"] = '23,愛知県,23342,豊山町';
GSI.MUNI_ARRAY["23361"] = '23,愛知県,23361,大口町';
GSI.MUNI_ARRAY["23362"] = '23,愛知県,23362,扶桑町';
GSI.MUNI_ARRAY["23424"] = '23,愛知県,23424,大治町';
GSI.MUNI_ARRAY["23425"] = '23,愛知県,23425,蟹江町';
GSI.MUNI_ARRAY["23427"] = '23,愛知県,23427,飛島村';
GSI.MUNI_ARRAY["23441"] = '23,愛知県,23441,阿久比町';
GSI.MUNI_ARRAY["23442"] = '23,愛知県,23442,東浦町';
GSI.MUNI_ARRAY["23445"] = '23,愛知県,23445,南知多町';
GSI.MUNI_ARRAY["23446"] = '23,愛知県,23446,美浜町';
GSI.MUNI_ARRAY["23447"] = '23,愛知県,23447,武豊町';
GSI.MUNI_ARRAY["23501"] = '23,愛知県,23501,幸田町';
GSI.MUNI_ARRAY["23561"] = '23,愛知県,23561,設楽町';
GSI.MUNI_ARRAY["23562"] = '23,愛知県,23562,東栄町';
GSI.MUNI_ARRAY["23563"] = '23,愛知県,23563,豊根村';
GSI.MUNI_ARRAY["24201"] = '24,三重県,24201,津市';
GSI.MUNI_ARRAY["24202"] = '24,三重県,24202,四日市市';
GSI.MUNI_ARRAY["24203"] = '24,三重県,24203,伊勢市';
GSI.MUNI_ARRAY["24204"] = '24,三重県,24204,松阪市';
GSI.MUNI_ARRAY["24205"] = '24,三重県,24205,桑名市';
GSI.MUNI_ARRAY["24207"] = '24,三重県,24207,鈴鹿市';
GSI.MUNI_ARRAY["24208"] = '24,三重県,24208,名張市';
GSI.MUNI_ARRAY["24209"] = '24,三重県,24209,尾鷲市';
GSI.MUNI_ARRAY["24210"] = '24,三重県,24210,亀山市';
GSI.MUNI_ARRAY["24211"] = '24,三重県,24211,鳥羽市';
GSI.MUNI_ARRAY["24212"] = '24,三重県,24212,熊野市';
GSI.MUNI_ARRAY["24214"] = '24,三重県,24214,いなべ市';
GSI.MUNI_ARRAY["24215"] = '24,三重県,24215,志摩市';
GSI.MUNI_ARRAY["24216"] = '24,三重県,24216,伊賀市';
GSI.MUNI_ARRAY["24303"] = '24,三重県,24303,木曽岬町';
GSI.MUNI_ARRAY["24324"] = '24,三重県,24324,東員町';
GSI.MUNI_ARRAY["24341"] = '24,三重県,24341,菰野町';
GSI.MUNI_ARRAY["24343"] = '24,三重県,24343,朝日町';
GSI.MUNI_ARRAY["24344"] = '24,三重県,24344,川越町';
GSI.MUNI_ARRAY["24441"] = '24,三重県,24441,多気町';
GSI.MUNI_ARRAY["24442"] = '24,三重県,24442,明和町';
GSI.MUNI_ARRAY["24443"] = '24,三重県,24443,大台町';
GSI.MUNI_ARRAY["24461"] = '24,三重県,24461,玉城町';
GSI.MUNI_ARRAY["24470"] = '24,三重県,24470,度会町';
GSI.MUNI_ARRAY["24471"] = '24,三重県,24471,大紀町';
GSI.MUNI_ARRAY["24472"] = '24,三重県,24472,南伊勢町';
GSI.MUNI_ARRAY["24543"] = '24,三重県,24543,紀北町';
GSI.MUNI_ARRAY["24561"] = '24,三重県,24561,御浜町';
GSI.MUNI_ARRAY["24562"] = '24,三重県,24562,紀宝町';
GSI.MUNI_ARRAY["25201"] = '25,滋賀県,25201,大津市';
GSI.MUNI_ARRAY["25202"] = '25,滋賀県,25202,彦根市';
GSI.MUNI_ARRAY["25203"] = '25,滋賀県,25203,長浜市';
GSI.MUNI_ARRAY["25204"] = '25,滋賀県,25204,近江八幡市';
GSI.MUNI_ARRAY["25206"] = '25,滋賀県,25206,草津市';
GSI.MUNI_ARRAY["25207"] = '25,滋賀県,25207,守山市';
GSI.MUNI_ARRAY["25208"] = '25,滋賀県,25208,栗東市';
GSI.MUNI_ARRAY["25209"] = '25,滋賀県,25209,甲賀市';
GSI.MUNI_ARRAY["25210"] = '25,滋賀県,25210,野洲市';
GSI.MUNI_ARRAY["25211"] = '25,滋賀県,25211,湖南市';
GSI.MUNI_ARRAY["25212"] = '25,滋賀県,25212,高島市';
GSI.MUNI_ARRAY["25213"] = '25,滋賀県,25213,東近江市';
GSI.MUNI_ARRAY["25214"] = '25,滋賀県,25214,米原市';
GSI.MUNI_ARRAY["25383"] = '25,滋賀県,25383,日野町';
GSI.MUNI_ARRAY["25384"] = '25,滋賀県,25384,竜王町';
GSI.MUNI_ARRAY["25425"] = '25,滋賀県,25425,愛荘町';
GSI.MUNI_ARRAY["25441"] = '25,滋賀県,25441,豊郷町';
GSI.MUNI_ARRAY["25442"] = '25,滋賀県,25442,甲良町';
GSI.MUNI_ARRAY["25443"] = '25,滋賀県,25443,多賀町';
GSI.MUNI_ARRAY["26100"] = '26,京都府,26100,京都市';
GSI.MUNI_ARRAY["26101"] = '26,京都府,26101,京都市　北区';
GSI.MUNI_ARRAY["26102"] = '26,京都府,26102,京都市　上京区';
GSI.MUNI_ARRAY["26103"] = '26,京都府,26103,京都市　左京区';
GSI.MUNI_ARRAY["26104"] = '26,京都府,26104,京都市　中京区';
GSI.MUNI_ARRAY["26105"] = '26,京都府,26105,京都市　東山区';
GSI.MUNI_ARRAY["26106"] = '26,京都府,26106,京都市　下京区';
GSI.MUNI_ARRAY["26107"] = '26,京都府,26107,京都市　南区';
GSI.MUNI_ARRAY["26108"] = '26,京都府,26108,京都市　右京区';
GSI.MUNI_ARRAY["26109"] = '26,京都府,26109,京都市　伏見区';
GSI.MUNI_ARRAY["26110"] = '26,京都府,26110,京都市　山科区';
GSI.MUNI_ARRAY["26111"] = '26,京都府,26111,京都市　西京区';
GSI.MUNI_ARRAY["26201"] = '26,京都府,26201,福知山市';
GSI.MUNI_ARRAY["26202"] = '26,京都府,26202,舞鶴市';
GSI.MUNI_ARRAY["26203"] = '26,京都府,26203,綾部市';
GSI.MUNI_ARRAY["26204"] = '26,京都府,26204,宇治市';
GSI.MUNI_ARRAY["26205"] = '26,京都府,26205,宮津市';
GSI.MUNI_ARRAY["26206"] = '26,京都府,26206,亀岡市';
GSI.MUNI_ARRAY["26207"] = '26,京都府,26207,城陽市';
GSI.MUNI_ARRAY["26208"] = '26,京都府,26208,向日市';
GSI.MUNI_ARRAY["26209"] = '26,京都府,26209,長岡京市';
GSI.MUNI_ARRAY["26210"] = '26,京都府,26210,八幡市';
GSI.MUNI_ARRAY["26211"] = '26,京都府,26211,京田辺市';
GSI.MUNI_ARRAY["26212"] = '26,京都府,26212,京丹後市';
GSI.MUNI_ARRAY["26213"] = '26,京都府,26213,南丹市';
GSI.MUNI_ARRAY["26214"] = '26,京都府,26214,木津川市';
GSI.MUNI_ARRAY["26303"] = '26,京都府,26303,大山崎町';
GSI.MUNI_ARRAY["26322"] = '26,京都府,26322,久御山町';
GSI.MUNI_ARRAY["26343"] = '26,京都府,26343,井手町';
GSI.MUNI_ARRAY["26344"] = '26,京都府,26344,宇治田原町';
GSI.MUNI_ARRAY["26364"] = '26,京都府,26364,笠置町';
GSI.MUNI_ARRAY["26365"] = '26,京都府,26365,和束町';
GSI.MUNI_ARRAY["26366"] = '26,京都府,26366,精華町';
GSI.MUNI_ARRAY["26367"] = '26,京都府,26367,南山城村';
GSI.MUNI_ARRAY["26407"] = '26,京都府,26407,京丹波町';
GSI.MUNI_ARRAY["26463"] = '26,京都府,26463,伊根町';
GSI.MUNI_ARRAY["26465"] = '26,京都府,26465,与謝野町';
GSI.MUNI_ARRAY["27100"] = '27,大阪府,27100,大阪市';
GSI.MUNI_ARRAY["27102"] = '27,大阪府,27102,大阪市　都島区';
GSI.MUNI_ARRAY["27103"] = '27,大阪府,27103,大阪市　福島区';
GSI.MUNI_ARRAY["27104"] = '27,大阪府,27104,大阪市　此花区';
GSI.MUNI_ARRAY["27106"] = '27,大阪府,27106,大阪市　西区';
GSI.MUNI_ARRAY["27107"] = '27,大阪府,27107,大阪市　港区';
GSI.MUNI_ARRAY["27108"] = '27,大阪府,27108,大阪市　大正区';
GSI.MUNI_ARRAY["27109"] = '27,大阪府,27109,大阪市　天王寺区';
GSI.MUNI_ARRAY["27111"] = '27,大阪府,27111,大阪市　浪速区';
GSI.MUNI_ARRAY["27113"] = '27,大阪府,27113,大阪市　西淀川区';
GSI.MUNI_ARRAY["27114"] = '27,大阪府,27114,大阪市　東淀川区';
GSI.MUNI_ARRAY["27115"] = '27,大阪府,27115,大阪市　東成区';
GSI.MUNI_ARRAY["27116"] = '27,大阪府,27116,大阪市　生野区';
GSI.MUNI_ARRAY["27117"] = '27,大阪府,27117,大阪市　旭区';
GSI.MUNI_ARRAY["27118"] = '27,大阪府,27118,大阪市　城東区';
GSI.MUNI_ARRAY["27119"] = '27,大阪府,27119,大阪市　阿倍野区';
GSI.MUNI_ARRAY["27120"] = '27,大阪府,27120,大阪市　住吉区';
GSI.MUNI_ARRAY["27121"] = '27,大阪府,27121,大阪市　東住吉区';
GSI.MUNI_ARRAY["27122"] = '27,大阪府,27122,大阪市　西成区';
GSI.MUNI_ARRAY["27123"] = '27,大阪府,27123,大阪市　淀川区';
GSI.MUNI_ARRAY["27124"] = '27,大阪府,27124,大阪市　鶴見区';
GSI.MUNI_ARRAY["27125"] = '27,大阪府,27125,大阪市　住之江区';
GSI.MUNI_ARRAY["27126"] = '27,大阪府,27126,大阪市　平野区';
GSI.MUNI_ARRAY["27127"] = '27,大阪府,27127,大阪市　北区';
GSI.MUNI_ARRAY["27128"] = '27,大阪府,27128,大阪市　中央区';
GSI.MUNI_ARRAY["27140"] = '27,大阪府,27140,堺市';
GSI.MUNI_ARRAY["27141"] = '27,大阪府,27141,堺市　堺区';
GSI.MUNI_ARRAY["27142"] = '27,大阪府,27142,堺市　中区';
GSI.MUNI_ARRAY["27143"] = '27,大阪府,27143,堺市　東区';
GSI.MUNI_ARRAY["27144"] = '27,大阪府,27144,堺市　西区';
GSI.MUNI_ARRAY["27145"] = '27,大阪府,27145,堺市　南区';
GSI.MUNI_ARRAY["27146"] = '27,大阪府,27146,堺市　北区';
GSI.MUNI_ARRAY["27147"] = '27,大阪府,27147,堺市　美原区';
GSI.MUNI_ARRAY["27202"] = '27,大阪府,27202,岸和田市';
GSI.MUNI_ARRAY["27203"] = '27,大阪府,27203,豊中市';
GSI.MUNI_ARRAY["27204"] = '27,大阪府,27204,池田市';
GSI.MUNI_ARRAY["27205"] = '27,大阪府,27205,吹田市';
GSI.MUNI_ARRAY["27206"] = '27,大阪府,27206,泉大津市';
GSI.MUNI_ARRAY["27207"] = '27,大阪府,27207,高槻市';
GSI.MUNI_ARRAY["27208"] = '27,大阪府,27208,貝塚市';
GSI.MUNI_ARRAY["27209"] = '27,大阪府,27209,守口市';
GSI.MUNI_ARRAY["27210"] = '27,大阪府,27210,枚方市';
GSI.MUNI_ARRAY["27211"] = '27,大阪府,27211,茨木市';
GSI.MUNI_ARRAY["27212"] = '27,大阪府,27212,八尾市';
GSI.MUNI_ARRAY["27213"] = '27,大阪府,27213,泉佐野市';
GSI.MUNI_ARRAY["27214"] = '27,大阪府,27214,富田林市';
GSI.MUNI_ARRAY["27215"] = '27,大阪府,27215,寝屋川市';
GSI.MUNI_ARRAY["27216"] = '27,大阪府,27216,河内長野市';
GSI.MUNI_ARRAY["27217"] = '27,大阪府,27217,松原市';
GSI.MUNI_ARRAY["27218"] = '27,大阪府,27218,大東市';
GSI.MUNI_ARRAY["27219"] = '27,大阪府,27219,和泉市';
GSI.MUNI_ARRAY["27220"] = '27,大阪府,27220,箕面市';
GSI.MUNI_ARRAY["27221"] = '27,大阪府,27221,柏原市';
GSI.MUNI_ARRAY["27222"] = '27,大阪府,27222,羽曳野市';
GSI.MUNI_ARRAY["27223"] = '27,大阪府,27223,門真市';
GSI.MUNI_ARRAY["27224"] = '27,大阪府,27224,摂津市';
GSI.MUNI_ARRAY["27225"] = '27,大阪府,27225,高石市';
GSI.MUNI_ARRAY["27226"] = '27,大阪府,27226,藤井寺市';
GSI.MUNI_ARRAY["27227"] = '27,大阪府,27227,東大阪市';
GSI.MUNI_ARRAY["27228"] = '27,大阪府,27228,泉南市';
GSI.MUNI_ARRAY["27229"] = '27,大阪府,27229,四條畷市';
GSI.MUNI_ARRAY["27230"] = '27,大阪府,27230,交野市';
GSI.MUNI_ARRAY["27231"] = '27,大阪府,27231,大阪狭山市';
GSI.MUNI_ARRAY["27232"] = '27,大阪府,27232,阪南市';
GSI.MUNI_ARRAY["27301"] = '27,大阪府,27301,島本町';
GSI.MUNI_ARRAY["27321"] = '27,大阪府,27321,豊能町';
GSI.MUNI_ARRAY["27322"] = '27,大阪府,27322,能勢町';
GSI.MUNI_ARRAY["27341"] = '27,大阪府,27341,忠岡町';
GSI.MUNI_ARRAY["27361"] = '27,大阪府,27361,熊取町';
GSI.MUNI_ARRAY["27362"] = '27,大阪府,27362,田尻町';
GSI.MUNI_ARRAY["27366"] = '27,大阪府,27366,岬町';
GSI.MUNI_ARRAY["27381"] = '27,大阪府,27381,太子町';
GSI.MUNI_ARRAY["27382"] = '27,大阪府,27382,河南町';
GSI.MUNI_ARRAY["27383"] = '27,大阪府,27383,千早赤阪村';
GSI.MUNI_ARRAY["28100"] = '28,兵庫県,28100,神戸市';
GSI.MUNI_ARRAY["28101"] = '28,兵庫県,28101,神戸市　東灘区';
GSI.MUNI_ARRAY["28102"] = '28,兵庫県,28102,神戸市　灘区';
GSI.MUNI_ARRAY["28105"] = '28,兵庫県,28105,神戸市　兵庫区';
GSI.MUNI_ARRAY["28106"] = '28,兵庫県,28106,神戸市　長田区';
GSI.MUNI_ARRAY["28107"] = '28,兵庫県,28107,神戸市　須磨区';
GSI.MUNI_ARRAY["28108"] = '28,兵庫県,28108,神戸市　垂水区';
GSI.MUNI_ARRAY["28109"] = '28,兵庫県,28109,神戸市　北区';
GSI.MUNI_ARRAY["28110"] = '28,兵庫県,28110,神戸市　中央区';
GSI.MUNI_ARRAY["28111"] = '28,兵庫県,28111,神戸市　西区';
GSI.MUNI_ARRAY["28201"] = '28,兵庫県,28201,姫路市';
GSI.MUNI_ARRAY["28202"] = '28,兵庫県,28202,尼崎市';
GSI.MUNI_ARRAY["28203"] = '28,兵庫県,28203,明石市';
GSI.MUNI_ARRAY["28204"] = '28,兵庫県,28204,西宮市';
GSI.MUNI_ARRAY["28205"] = '28,兵庫県,28205,洲本市';
GSI.MUNI_ARRAY["28206"] = '28,兵庫県,28206,芦屋市';
GSI.MUNI_ARRAY["28207"] = '28,兵庫県,28207,伊丹市';
GSI.MUNI_ARRAY["28208"] = '28,兵庫県,28208,相生市';
GSI.MUNI_ARRAY["28209"] = '28,兵庫県,28209,豊岡市';
GSI.MUNI_ARRAY["28210"] = '28,兵庫県,28210,加古川市';
GSI.MUNI_ARRAY["28212"] = '28,兵庫県,28212,赤穂市';
GSI.MUNI_ARRAY["28213"] = '28,兵庫県,28213,西脇市';
GSI.MUNI_ARRAY["28214"] = '28,兵庫県,28214,宝塚市';
GSI.MUNI_ARRAY["28215"] = '28,兵庫県,28215,三木市';
GSI.MUNI_ARRAY["28216"] = '28,兵庫県,28216,高砂市';
GSI.MUNI_ARRAY["28217"] = '28,兵庫県,28217,川西市';
GSI.MUNI_ARRAY["28218"] = '28,兵庫県,28218,小野市';
GSI.MUNI_ARRAY["28219"] = '28,兵庫県,28219,三田市';
GSI.MUNI_ARRAY["28220"] = '28,兵庫県,28220,加西市';
GSI.MUNI_ARRAY["28221"] = '28,兵庫県,28221,丹波篠山市';
GSI.MUNI_ARRAY["28222"] = '28,兵庫県,28222,養父市';
GSI.MUNI_ARRAY["28223"] = '28,兵庫県,28223,丹波市';
GSI.MUNI_ARRAY["28224"] = '28,兵庫県,28224,南あわじ市';
GSI.MUNI_ARRAY["28225"] = '28,兵庫県,28225,朝来市';
GSI.MUNI_ARRAY["28226"] = '28,兵庫県,28226,淡路市';
GSI.MUNI_ARRAY["28227"] = '28,兵庫県,28227,宍粟市';
GSI.MUNI_ARRAY["28228"] = '28,兵庫県,28228,加東市';
GSI.MUNI_ARRAY["28229"] = '28,兵庫県,28229,たつの市';
GSI.MUNI_ARRAY["28301"] = '28,兵庫県,28301,猪名川町';
GSI.MUNI_ARRAY["28365"] = '28,兵庫県,28365,多可町';
GSI.MUNI_ARRAY["28381"] = '28,兵庫県,28381,稲美町';
GSI.MUNI_ARRAY["28382"] = '28,兵庫県,28382,播磨町';
GSI.MUNI_ARRAY["28442"] = '28,兵庫県,28442,市川町';
GSI.MUNI_ARRAY["28443"] = '28,兵庫県,28443,福崎町';
GSI.MUNI_ARRAY["28446"] = '28,兵庫県,28446,神河町';
GSI.MUNI_ARRAY["28464"] = '28,兵庫県,28464,太子町';
GSI.MUNI_ARRAY["28481"] = '28,兵庫県,28481,上郡町';
GSI.MUNI_ARRAY["28501"] = '28,兵庫県,28501,佐用町';
GSI.MUNI_ARRAY["28585"] = '28,兵庫県,28585,香美町';
GSI.MUNI_ARRAY["28586"] = '28,兵庫県,28586,新温泉町';
GSI.MUNI_ARRAY["29201"] = '29,奈良県,29201,奈良市';
GSI.MUNI_ARRAY["29202"] = '29,奈良県,29202,大和高田市';
GSI.MUNI_ARRAY["29203"] = '29,奈良県,29203,大和郡山市';
GSI.MUNI_ARRAY["29204"] = '29,奈良県,29204,天理市';
GSI.MUNI_ARRAY["29205"] = '29,奈良県,29205,橿原市';
GSI.MUNI_ARRAY["29206"] = '29,奈良県,29206,桜井市';
GSI.MUNI_ARRAY["29207"] = '29,奈良県,29207,五條市';
GSI.MUNI_ARRAY["29208"] = '29,奈良県,29208,御所市';
GSI.MUNI_ARRAY["29209"] = '29,奈良県,29209,生駒市';
GSI.MUNI_ARRAY["29210"] = '29,奈良県,29210,香芝市';
GSI.MUNI_ARRAY["29211"] = '29,奈良県,29211,葛城市';
GSI.MUNI_ARRAY["29212"] = '29,奈良県,29212,宇陀市';
GSI.MUNI_ARRAY["29322"] = '29,奈良県,29322,山添村';
GSI.MUNI_ARRAY["29342"] = '29,奈良県,29342,平群町';
GSI.MUNI_ARRAY["29343"] = '29,奈良県,29343,三郷町';
GSI.MUNI_ARRAY["29344"] = '29,奈良県,29344,斑鳩町';
GSI.MUNI_ARRAY["29345"] = '29,奈良県,29345,安堵町';
GSI.MUNI_ARRAY["29361"] = '29,奈良県,29361,川西町';
GSI.MUNI_ARRAY["29362"] = '29,奈良県,29362,三宅町';
GSI.MUNI_ARRAY["29363"] = '29,奈良県,29363,田原本町';
GSI.MUNI_ARRAY["29385"] = '29,奈良県,29385,曽爾村';
GSI.MUNI_ARRAY["29386"] = '29,奈良県,29386,御杖村';
GSI.MUNI_ARRAY["29401"] = '29,奈良県,29401,高取町';
GSI.MUNI_ARRAY["29402"] = '29,奈良県,29402,明日香村';
GSI.MUNI_ARRAY["29424"] = '29,奈良県,29424,上牧町';
GSI.MUNI_ARRAY["29425"] = '29,奈良県,29425,王寺町';
GSI.MUNI_ARRAY["29426"] = '29,奈良県,29426,広陵町';
GSI.MUNI_ARRAY["29427"] = '29,奈良県,29427,河合町';
GSI.MUNI_ARRAY["29441"] = '29,奈良県,29441,吉野町';
GSI.MUNI_ARRAY["29442"] = '29,奈良県,29442,大淀町';
GSI.MUNI_ARRAY["29443"] = '29,奈良県,29443,下市町';
GSI.MUNI_ARRAY["29444"] = '29,奈良県,29444,黒滝村';
GSI.MUNI_ARRAY["29446"] = '29,奈良県,29446,天川村';
GSI.MUNI_ARRAY["29447"] = '29,奈良県,29447,野迫川村';
GSI.MUNI_ARRAY["29449"] = '29,奈良県,29449,十津川村';
GSI.MUNI_ARRAY["29450"] = '29,奈良県,29450,下北山村';
GSI.MUNI_ARRAY["29451"] = '29,奈良県,29451,上北山村';
GSI.MUNI_ARRAY["29452"] = '29,奈良県,29452,川上村';
GSI.MUNI_ARRAY["29453"] = '29,奈良県,29453,東吉野村';
GSI.MUNI_ARRAY["30201"] = '30,和歌山県,30201,和歌山市';
GSI.MUNI_ARRAY["30202"] = '30,和歌山県,30202,海南市';
GSI.MUNI_ARRAY["30203"] = '30,和歌山県,30203,橋本市';
GSI.MUNI_ARRAY["30204"] = '30,和歌山県,30204,有田市';
GSI.MUNI_ARRAY["30205"] = '30,和歌山県,30205,御坊市';
GSI.MUNI_ARRAY["30206"] = '30,和歌山県,30206,田辺市';
GSI.MUNI_ARRAY["30207"] = '30,和歌山県,30207,新宮市';
GSI.MUNI_ARRAY["30208"] = '30,和歌山県,30208,紀の川市';
GSI.MUNI_ARRAY["30209"] = '30,和歌山県,30209,岩出市';
GSI.MUNI_ARRAY["30304"] = '30,和歌山県,30304,紀美野町';
GSI.MUNI_ARRAY["30341"] = '30,和歌山県,30341,かつらぎ町';
GSI.MUNI_ARRAY["30343"] = '30,和歌山県,30343,九度山町';
GSI.MUNI_ARRAY["30344"] = '30,和歌山県,30344,高野町';
GSI.MUNI_ARRAY["30361"] = '30,和歌山県,30361,湯浅町';
GSI.MUNI_ARRAY["30362"] = '30,和歌山県,30362,広川町';
GSI.MUNI_ARRAY["30366"] = '30,和歌山県,30366,有田川町';
GSI.MUNI_ARRAY["30381"] = '30,和歌山県,30381,美浜町';
GSI.MUNI_ARRAY["30382"] = '30,和歌山県,30382,日高町';
GSI.MUNI_ARRAY["30383"] = '30,和歌山県,30383,由良町';
GSI.MUNI_ARRAY["30390"] = '30,和歌山県,30390,印南町';
GSI.MUNI_ARRAY["30391"] = '30,和歌山県,30391,みなべ町';
GSI.MUNI_ARRAY["30392"] = '30,和歌山県,30392,日高川町';
GSI.MUNI_ARRAY["30401"] = '30,和歌山県,30401,白浜町';
GSI.MUNI_ARRAY["30404"] = '30,和歌山県,30404,上富田町';
GSI.MUNI_ARRAY["30406"] = '30,和歌山県,30406,すさみ町';
GSI.MUNI_ARRAY["30421"] = '30,和歌山県,30421,那智勝浦町';
GSI.MUNI_ARRAY["30422"] = '30,和歌山県,30422,太地町';
GSI.MUNI_ARRAY["30424"] = '30,和歌山県,30424,古座川町';
GSI.MUNI_ARRAY["30427"] = '30,和歌山県,30427,北山村';
GSI.MUNI_ARRAY["30428"] = '30,和歌山県,30428,串本町';
GSI.MUNI_ARRAY["31201"] = '31,鳥取県,31201,鳥取市';
GSI.MUNI_ARRAY["31202"] = '31,鳥取県,31202,米子市';
GSI.MUNI_ARRAY["31203"] = '31,鳥取県,31203,倉吉市';
GSI.MUNI_ARRAY["31204"] = '31,鳥取県,31204,境港市';
GSI.MUNI_ARRAY["31302"] = '31,鳥取県,31302,岩美町';
GSI.MUNI_ARRAY["31325"] = '31,鳥取県,31325,若桜町';
GSI.MUNI_ARRAY["31328"] = '31,鳥取県,31328,智頭町';
GSI.MUNI_ARRAY["31329"] = '31,鳥取県,31329,八頭町';
GSI.MUNI_ARRAY["31364"] = '31,鳥取県,31364,三朝町';
GSI.MUNI_ARRAY["31370"] = '31,鳥取県,31370,湯梨浜町';
GSI.MUNI_ARRAY["31371"] = '31,鳥取県,31371,琴浦町';
GSI.MUNI_ARRAY["31372"] = '31,鳥取県,31372,北栄町';
GSI.MUNI_ARRAY["31384"] = '31,鳥取県,31384,日吉津村';
GSI.MUNI_ARRAY["31386"] = '31,鳥取県,31386,大山町';
GSI.MUNI_ARRAY["31389"] = '31,鳥取県,31389,南部町';
GSI.MUNI_ARRAY["31390"] = '31,鳥取県,31390,伯耆町';
GSI.MUNI_ARRAY["31401"] = '31,鳥取県,31401,日南町';
GSI.MUNI_ARRAY["31402"] = '31,鳥取県,31402,日野町';
GSI.MUNI_ARRAY["31403"] = '31,鳥取県,31403,江府町';
GSI.MUNI_ARRAY["32201"] = '32,島根県,32201,松江市';
GSI.MUNI_ARRAY["32202"] = '32,島根県,32202,浜田市';
GSI.MUNI_ARRAY["32203"] = '32,島根県,32203,出雲市';
GSI.MUNI_ARRAY["32204"] = '32,島根県,32204,益田市';
GSI.MUNI_ARRAY["32205"] = '32,島根県,32205,大田市';
GSI.MUNI_ARRAY["32206"] = '32,島根県,32206,安来市';
GSI.MUNI_ARRAY["32207"] = '32,島根県,32207,江津市';
GSI.MUNI_ARRAY["32209"] = '32,島根県,32209,雲南市';
GSI.MUNI_ARRAY["32343"] = '32,島根県,32343,奥出雲町';
GSI.MUNI_ARRAY["32386"] = '32,島根県,32386,飯南町';
GSI.MUNI_ARRAY["32441"] = '32,島根県,32441,川本町';
GSI.MUNI_ARRAY["32448"] = '32,島根県,32448,美郷町';
GSI.MUNI_ARRAY["32449"] = '32,島根県,32449,邑南町';
GSI.MUNI_ARRAY["32501"] = '32,島根県,32501,津和野町';
GSI.MUNI_ARRAY["32505"] = '32,島根県,32505,吉賀町';
GSI.MUNI_ARRAY["32525"] = '32,島根県,32525,海士町';
GSI.MUNI_ARRAY["32526"] = '32,島根県,32526,西ノ島町';
GSI.MUNI_ARRAY["32527"] = '32,島根県,32527,知夫村';
GSI.MUNI_ARRAY["32528"] = '32,島根県,32528,隠岐の島町';
GSI.MUNI_ARRAY["33100"] = '33,岡山県,33100,岡山市';
GSI.MUNI_ARRAY["33101"] = '33,岡山県,33101,岡山市　北区';
GSI.MUNI_ARRAY["33102"] = '33,岡山県,33102,岡山市　中区';
GSI.MUNI_ARRAY["33103"] = '33,岡山県,33103,岡山市　東区';
GSI.MUNI_ARRAY["33104"] = '33,岡山県,33104,岡山市　南区';
GSI.MUNI_ARRAY["33202"] = '33,岡山県,33202,倉敷市';
GSI.MUNI_ARRAY["33203"] = '33,岡山県,33203,津山市';
GSI.MUNI_ARRAY["33204"] = '33,岡山県,33204,玉野市';
GSI.MUNI_ARRAY["33205"] = '33,岡山県,33205,笠岡市';
GSI.MUNI_ARRAY["33207"] = '33,岡山県,33207,井原市';
GSI.MUNI_ARRAY["33208"] = '33,岡山県,33208,総社市';
GSI.MUNI_ARRAY["33209"] = '33,岡山県,33209,高梁市';
GSI.MUNI_ARRAY["33210"] = '33,岡山県,33210,新見市';
GSI.MUNI_ARRAY["33211"] = '33,岡山県,33211,備前市';
GSI.MUNI_ARRAY["33212"] = '33,岡山県,33212,瀬戸内市';
GSI.MUNI_ARRAY["33213"] = '33,岡山県,33213,赤磐市';
GSI.MUNI_ARRAY["33214"] = '33,岡山県,33214,真庭市';
GSI.MUNI_ARRAY["33215"] = '33,岡山県,33215,美作市';
GSI.MUNI_ARRAY["33216"] = '33,岡山県,33216,浅口市';
GSI.MUNI_ARRAY["33346"] = '33,岡山県,33346,和気町';
GSI.MUNI_ARRAY["33423"] = '33,岡山県,33423,早島町';
GSI.MUNI_ARRAY["33445"] = '33,岡山県,33445,里庄町';
GSI.MUNI_ARRAY["33461"] = '33,岡山県,33461,矢掛町';
GSI.MUNI_ARRAY["33586"] = '33,岡山県,33586,新庄村';
GSI.MUNI_ARRAY["33606"] = '33,岡山県,33606,鏡野町';
GSI.MUNI_ARRAY["33622"] = '33,岡山県,33622,勝央町';
GSI.MUNI_ARRAY["33623"] = '33,岡山県,33623,奈義町';
GSI.MUNI_ARRAY["33643"] = '33,岡山県,33643,西粟倉村';
GSI.MUNI_ARRAY["33663"] = '33,岡山県,33663,久米南町';
GSI.MUNI_ARRAY["33666"] = '33,岡山県,33666,美咲町';
GSI.MUNI_ARRAY["33681"] = '33,岡山県,33681,吉備中央町';
GSI.MUNI_ARRAY["34100"] = '34,広島県,34100,広島市';
GSI.MUNI_ARRAY["34101"] = '34,広島県,34101,広島市　中区';
GSI.MUNI_ARRAY["34102"] = '34,広島県,34102,広島市　東区';
GSI.MUNI_ARRAY["34103"] = '34,広島県,34103,広島市　南区';
GSI.MUNI_ARRAY["34104"] = '34,広島県,34104,広島市　西区';
GSI.MUNI_ARRAY["34105"] = '34,広島県,34105,広島市　安佐南区';
GSI.MUNI_ARRAY["34106"] = '34,広島県,34106,広島市　安佐北区';
GSI.MUNI_ARRAY["34107"] = '34,広島県,34107,広島市　安芸区';
GSI.MUNI_ARRAY["34108"] = '34,広島県,34108,広島市　佐伯区';
GSI.MUNI_ARRAY["34202"] = '34,広島県,34202,呉市';
GSI.MUNI_ARRAY["34203"] = '34,広島県,34203,竹原市';
GSI.MUNI_ARRAY["34204"] = '34,広島県,34204,三原市';
GSI.MUNI_ARRAY["34205"] = '34,広島県,34205,尾道市';
GSI.MUNI_ARRAY["34207"] = '34,広島県,34207,福山市';
GSI.MUNI_ARRAY["34208"] = '34,広島県,34208,府中市';
GSI.MUNI_ARRAY["34209"] = '34,広島県,34209,三次市';
GSI.MUNI_ARRAY["34210"] = '34,広島県,34210,庄原市';
GSI.MUNI_ARRAY["34211"] = '34,広島県,34211,大竹市';
GSI.MUNI_ARRAY["34212"] = '34,広島県,34212,東広島市';
GSI.MUNI_ARRAY["34213"] = '34,広島県,34213,廿日市市';
GSI.MUNI_ARRAY["34214"] = '34,広島県,34214,安芸高田市';
GSI.MUNI_ARRAY["34215"] = '34,広島県,34215,江田島市';
GSI.MUNI_ARRAY["34302"] = '34,広島県,34302,府中町';
GSI.MUNI_ARRAY["34304"] = '34,広島県,34304,海田町';
GSI.MUNI_ARRAY["34307"] = '34,広島県,34307,熊野町';
GSI.MUNI_ARRAY["34309"] = '34,広島県,34309,坂町';
GSI.MUNI_ARRAY["34368"] = '34,広島県,34368,安芸太田町';
GSI.MUNI_ARRAY["34369"] = '34,広島県,34369,北広島町';
GSI.MUNI_ARRAY["34431"] = '34,広島県,34431,大崎上島町';
GSI.MUNI_ARRAY["34462"] = '34,広島県,34462,世羅町';
GSI.MUNI_ARRAY["34545"] = '34,広島県,34545,神石高原町';
GSI.MUNI_ARRAY["35201"] = '35,山口県,35201,下関市';
GSI.MUNI_ARRAY["35202"] = '35,山口県,35202,宇部市';
GSI.MUNI_ARRAY["35203"] = '35,山口県,35203,山口市';
GSI.MUNI_ARRAY["35204"] = '35,山口県,35204,萩市';
GSI.MUNI_ARRAY["35206"] = '35,山口県,35206,防府市';
GSI.MUNI_ARRAY["35207"] = '35,山口県,35207,下松市';
GSI.MUNI_ARRAY["35208"] = '35,山口県,35208,岩国市';
GSI.MUNI_ARRAY["35210"] = '35,山口県,35210,光市';
GSI.MUNI_ARRAY["35211"] = '35,山口県,35211,長門市';
GSI.MUNI_ARRAY["35212"] = '35,山口県,35212,柳井市';
GSI.MUNI_ARRAY["35213"] = '35,山口県,35213,美祢市';
GSI.MUNI_ARRAY["35215"] = '35,山口県,35215,周南市';
GSI.MUNI_ARRAY["35216"] = '35,山口県,35216,山陽小野田市';
GSI.MUNI_ARRAY["35305"] = '35,山口県,35305,周防大島町';
GSI.MUNI_ARRAY["35321"] = '35,山口県,35321,和木町';
GSI.MUNI_ARRAY["35341"] = '35,山口県,35341,上関町';
GSI.MUNI_ARRAY["35343"] = '35,山口県,35343,田布施町';
GSI.MUNI_ARRAY["35344"] = '35,山口県,35344,平生町';
GSI.MUNI_ARRAY["35502"] = '35,山口県,35502,阿武町';
GSI.MUNI_ARRAY["36201"] = '36,徳島県,36201,徳島市';
GSI.MUNI_ARRAY["36202"] = '36,徳島県,36202,鳴門市';
GSI.MUNI_ARRAY["36203"] = '36,徳島県,36203,小松島市';
GSI.MUNI_ARRAY["36204"] = '36,徳島県,36204,阿南市';
GSI.MUNI_ARRAY["36205"] = '36,徳島県,36205,吉野川市';
GSI.MUNI_ARRAY["36206"] = '36,徳島県,36206,阿波市';
GSI.MUNI_ARRAY["36207"] = '36,徳島県,36207,美馬市';
GSI.MUNI_ARRAY["36208"] = '36,徳島県,36208,三好市';
GSI.MUNI_ARRAY["36301"] = '36,徳島県,36301,勝浦町';
GSI.MUNI_ARRAY["36302"] = '36,徳島県,36302,上勝町';
GSI.MUNI_ARRAY["36321"] = '36,徳島県,36321,佐那河内村';
GSI.MUNI_ARRAY["36341"] = '36,徳島県,36341,石井町';
GSI.MUNI_ARRAY["36342"] = '36,徳島県,36342,神山町';
GSI.MUNI_ARRAY["36368"] = '36,徳島県,36368,那賀町';
GSI.MUNI_ARRAY["36383"] = '36,徳島県,36383,牟岐町';
GSI.MUNI_ARRAY["36387"] = '36,徳島県,36387,美波町';
GSI.MUNI_ARRAY["36388"] = '36,徳島県,36388,海陽町';
GSI.MUNI_ARRAY["36401"] = '36,徳島県,36401,松茂町';
GSI.MUNI_ARRAY["36402"] = '36,徳島県,36402,北島町';
GSI.MUNI_ARRAY["36403"] = '36,徳島県,36403,藍住町';
GSI.MUNI_ARRAY["36404"] = '36,徳島県,36404,板野町';
GSI.MUNI_ARRAY["36405"] = '36,徳島県,36405,上板町';
GSI.MUNI_ARRAY["36468"] = '36,徳島県,36468,つるぎ町';
GSI.MUNI_ARRAY["36489"] = '36,徳島県,36489,東みよし町';
GSI.MUNI_ARRAY["37201"] = '37,香川県,37201,高松市';
GSI.MUNI_ARRAY["37202"] = '37,香川県,37202,丸亀市';
GSI.MUNI_ARRAY["37203"] = '37,香川県,37203,坂出市';
GSI.MUNI_ARRAY["37204"] = '37,香川県,37204,善通寺市';
GSI.MUNI_ARRAY["37205"] = '37,香川県,37205,観音寺市';
GSI.MUNI_ARRAY["37206"] = '37,香川県,37206,さぬき市';
GSI.MUNI_ARRAY["37207"] = '37,香川県,37207,東かがわ市';
GSI.MUNI_ARRAY["37208"] = '37,香川県,37208,三豊市';
GSI.MUNI_ARRAY["37322"] = '37,香川県,37322,土庄町';
GSI.MUNI_ARRAY["37324"] = '37,香川県,37324,小豆島町';
GSI.MUNI_ARRAY["37341"] = '37,香川県,37341,三木町';
GSI.MUNI_ARRAY["37364"] = '37,香川県,37364,直島町';
GSI.MUNI_ARRAY["37386"] = '37,香川県,37386,宇多津町';
GSI.MUNI_ARRAY["37387"] = '37,香川県,37387,綾川町';
GSI.MUNI_ARRAY["37403"] = '37,香川県,37403,琴平町';
GSI.MUNI_ARRAY["37404"] = '37,香川県,37404,多度津町';
GSI.MUNI_ARRAY["37406"] = '37,香川県,37406,まんのう町';
GSI.MUNI_ARRAY["38201"] = '38,愛媛県,38201,松山市';
GSI.MUNI_ARRAY["38202"] = '38,愛媛県,38202,今治市';
GSI.MUNI_ARRAY["38203"] = '38,愛媛県,38203,宇和島市';
GSI.MUNI_ARRAY["38204"] = '38,愛媛県,38204,八幡浜市';
GSI.MUNI_ARRAY["38205"] = '38,愛媛県,38205,新居浜市';
GSI.MUNI_ARRAY["38206"] = '38,愛媛県,38206,西条市';
GSI.MUNI_ARRAY["38207"] = '38,愛媛県,38207,大洲市';
GSI.MUNI_ARRAY["38210"] = '38,愛媛県,38210,伊予市';
GSI.MUNI_ARRAY["38213"] = '38,愛媛県,38213,四国中央市';
GSI.MUNI_ARRAY["38214"] = '38,愛媛県,38214,西予市';
GSI.MUNI_ARRAY["38215"] = '38,愛媛県,38215,東温市';
GSI.MUNI_ARRAY["38356"] = '38,愛媛県,38356,上島町';
GSI.MUNI_ARRAY["38386"] = '38,愛媛県,38386,久万高原町';
GSI.MUNI_ARRAY["38401"] = '38,愛媛県,38401,松前町';
GSI.MUNI_ARRAY["38402"] = '38,愛媛県,38402,砥部町';
GSI.MUNI_ARRAY["38422"] = '38,愛媛県,38422,内子町';
GSI.MUNI_ARRAY["38442"] = '38,愛媛県,38442,伊方町';
GSI.MUNI_ARRAY["38484"] = '38,愛媛県,38484,松野町';
GSI.MUNI_ARRAY["38488"] = '38,愛媛県,38488,鬼北町';
GSI.MUNI_ARRAY["38506"] = '38,愛媛県,38506,愛南町';
GSI.MUNI_ARRAY["39201"] = '39,高知県,39201,高知市';
GSI.MUNI_ARRAY["39202"] = '39,高知県,39202,室戸市';
GSI.MUNI_ARRAY["39203"] = '39,高知県,39203,安芸市';
GSI.MUNI_ARRAY["39204"] = '39,高知県,39204,南国市';
GSI.MUNI_ARRAY["39205"] = '39,高知県,39205,土佐市';
GSI.MUNI_ARRAY["39206"] = '39,高知県,39206,須崎市';
GSI.MUNI_ARRAY["39208"] = '39,高知県,39208,宿毛市';
GSI.MUNI_ARRAY["39209"] = '39,高知県,39209,土佐清水市';
GSI.MUNI_ARRAY["39210"] = '39,高知県,39210,四万十市';
GSI.MUNI_ARRAY["39211"] = '39,高知県,39211,香南市';
GSI.MUNI_ARRAY["39212"] = '39,高知県,39212,香美市';
GSI.MUNI_ARRAY["39301"] = '39,高知県,39301,東洋町';
GSI.MUNI_ARRAY["39302"] = '39,高知県,39302,奈半利町';
GSI.MUNI_ARRAY["39303"] = '39,高知県,39303,田野町';
GSI.MUNI_ARRAY["39304"] = '39,高知県,39304,安田町';
GSI.MUNI_ARRAY["39305"] = '39,高知県,39305,北川村';
GSI.MUNI_ARRAY["39306"] = '39,高知県,39306,馬路村';
GSI.MUNI_ARRAY["39307"] = '39,高知県,39307,芸西村';
GSI.MUNI_ARRAY["39341"] = '39,高知県,39341,本山町';
GSI.MUNI_ARRAY["39344"] = '39,高知県,39344,大豊町';
GSI.MUNI_ARRAY["39363"] = '39,高知県,39363,土佐町';
GSI.MUNI_ARRAY["39364"] = '39,高知県,39364,大川村';
GSI.MUNI_ARRAY["39386"] = '39,高知県,39386,いの町';
GSI.MUNI_ARRAY["39387"] = '39,高知県,39387,仁淀川町';
GSI.MUNI_ARRAY["39401"] = '39,高知県,39401,中土佐町';
GSI.MUNI_ARRAY["39402"] = '39,高知県,39402,佐川町';
GSI.MUNI_ARRAY["39403"] = '39,高知県,39403,越知町';
GSI.MUNI_ARRAY["39405"] = '39,高知県,39405,梼原町';
GSI.MUNI_ARRAY["39410"] = '39,高知県,39410,日高村';
GSI.MUNI_ARRAY["39411"] = '39,高知県,39411,津野町';
GSI.MUNI_ARRAY["39412"] = '39,高知県,39412,四万十町';
GSI.MUNI_ARRAY["39424"] = '39,高知県,39424,大月町';
GSI.MUNI_ARRAY["39427"] = '39,高知県,39427,三原村';
GSI.MUNI_ARRAY["39428"] = '39,高知県,39428,黒潮町';
GSI.MUNI_ARRAY["40100"] = '40,福岡県,40100,北九州市';
GSI.MUNI_ARRAY["40101"] = '40,福岡県,40101,北九州市　門司区';
GSI.MUNI_ARRAY["40103"] = '40,福岡県,40103,北九州市　若松区';
GSI.MUNI_ARRAY["40105"] = '40,福岡県,40105,北九州市　戸畑区';
GSI.MUNI_ARRAY["40106"] = '40,福岡県,40106,北九州市　小倉北区';
GSI.MUNI_ARRAY["40107"] = '40,福岡県,40107,北九州市　小倉南区';
GSI.MUNI_ARRAY["40108"] = '40,福岡県,40108,北九州市　八幡東区';
GSI.MUNI_ARRAY["40109"] = '40,福岡県,40109,北九州市　八幡西区';
GSI.MUNI_ARRAY["40130"] = '40,福岡県,40130,福岡市';
GSI.MUNI_ARRAY["40131"] = '40,福岡県,40131,福岡市　東区';
GSI.MUNI_ARRAY["40132"] = '40,福岡県,40132,福岡市　博多区';
GSI.MUNI_ARRAY["40133"] = '40,福岡県,40133,福岡市　中央区';
GSI.MUNI_ARRAY["40134"] = '40,福岡県,40134,福岡市　南区';
GSI.MUNI_ARRAY["40135"] = '40,福岡県,40135,福岡市　西区';
GSI.MUNI_ARRAY["40136"] = '40,福岡県,40136,福岡市　城南区';
GSI.MUNI_ARRAY["40137"] = '40,福岡県,40137,福岡市　早良区';
GSI.MUNI_ARRAY["40202"] = '40,福岡県,40202,大牟田市';
GSI.MUNI_ARRAY["40203"] = '40,福岡県,40203,久留米市';
GSI.MUNI_ARRAY["40204"] = '40,福岡県,40204,直方市';
GSI.MUNI_ARRAY["40205"] = '40,福岡県,40205,飯塚市';
GSI.MUNI_ARRAY["40206"] = '40,福岡県,40206,田川市';
GSI.MUNI_ARRAY["40207"] = '40,福岡県,40207,柳川市';
GSI.MUNI_ARRAY["40210"] = '40,福岡県,40210,八女市';
GSI.MUNI_ARRAY["40211"] = '40,福岡県,40211,筑後市';
GSI.MUNI_ARRAY["40212"] = '40,福岡県,40212,大川市';
GSI.MUNI_ARRAY["40213"] = '40,福岡県,40213,行橋市';
GSI.MUNI_ARRAY["40214"] = '40,福岡県,40214,豊前市';
GSI.MUNI_ARRAY["40215"] = '40,福岡県,40215,中間市';
GSI.MUNI_ARRAY["40216"] = '40,福岡県,40216,小郡市';
GSI.MUNI_ARRAY["40217"] = '40,福岡県,40217,筑紫野市';
GSI.MUNI_ARRAY["40218"] = '40,福岡県,40218,春日市';
GSI.MUNI_ARRAY["40219"] = '40,福岡県,40219,大野城市';
GSI.MUNI_ARRAY["40220"] = '40,福岡県,40220,宗像市';
GSI.MUNI_ARRAY["40221"] = '40,福岡県,40221,太宰府市';
GSI.MUNI_ARRAY["40223"] = '40,福岡県,40223,古賀市';
GSI.MUNI_ARRAY["40224"] = '40,福岡県,40224,福津市';
GSI.MUNI_ARRAY["40225"] = '40,福岡県,40225,うきは市';
GSI.MUNI_ARRAY["40226"] = '40,福岡県,40226,宮若市';
GSI.MUNI_ARRAY["40227"] = '40,福岡県,40227,嘉麻市';
GSI.MUNI_ARRAY["40228"] = '40,福岡県,40228,朝倉市';
GSI.MUNI_ARRAY["40229"] = '40,福岡県,40229,みやま市';
GSI.MUNI_ARRAY["40230"] = '40,福岡県,40230,糸島市';
GSI.MUNI_ARRAY["40231"] = '40,福岡県,40231,那珂川市';
GSI.MUNI_ARRAY["40341"] = '40,福岡県,40341,宇美町';
GSI.MUNI_ARRAY["40342"] = '40,福岡県,40342,篠栗町';
GSI.MUNI_ARRAY["40343"] = '40,福岡県,40343,志免町';
GSI.MUNI_ARRAY["40344"] = '40,福岡県,40344,須恵町';
GSI.MUNI_ARRAY["40345"] = '40,福岡県,40345,新宮町';
GSI.MUNI_ARRAY["40348"] = '40,福岡県,40348,久山町';
GSI.MUNI_ARRAY["40349"] = '40,福岡県,40349,粕屋町';
GSI.MUNI_ARRAY["40381"] = '40,福岡県,40381,芦屋町';
GSI.MUNI_ARRAY["40382"] = '40,福岡県,40382,水巻町';
GSI.MUNI_ARRAY["40383"] = '40,福岡県,40383,岡垣町';
GSI.MUNI_ARRAY["40384"] = '40,福岡県,40384,遠賀町';
GSI.MUNI_ARRAY["40401"] = '40,福岡県,40401,小竹町';
GSI.MUNI_ARRAY["40402"] = '40,福岡県,40402,鞍手町';
GSI.MUNI_ARRAY["40421"] = '40,福岡県,40421,桂川町';
GSI.MUNI_ARRAY["40447"] = '40,福岡県,40447,筑前町';
GSI.MUNI_ARRAY["40448"] = '40,福岡県,40448,東峰村';
GSI.MUNI_ARRAY["40503"] = '40,福岡県,40503,大刀洗町';
GSI.MUNI_ARRAY["40522"] = '40,福岡県,40522,大木町';
GSI.MUNI_ARRAY["40544"] = '40,福岡県,40544,広川町';
GSI.MUNI_ARRAY["40601"] = '40,福岡県,40601,香春町';
GSI.MUNI_ARRAY["40602"] = '40,福岡県,40602,添田町';
GSI.MUNI_ARRAY["40604"] = '40,福岡県,40604,糸田町';
GSI.MUNI_ARRAY["40605"] = '40,福岡県,40605,川崎町';
GSI.MUNI_ARRAY["40608"] = '40,福岡県,40608,大任町';
GSI.MUNI_ARRAY["40609"] = '40,福岡県,40609,赤村';
GSI.MUNI_ARRAY["40610"] = '40,福岡県,40610,福智町';
GSI.MUNI_ARRAY["40621"] = '40,福岡県,40621,苅田町';
GSI.MUNI_ARRAY["40625"] = '40,福岡県,40625,みやこ町';
GSI.MUNI_ARRAY["40642"] = '40,福岡県,40642,吉富町';
GSI.MUNI_ARRAY["40646"] = '40,福岡県,40646,上毛町';
GSI.MUNI_ARRAY["40647"] = '40,福岡県,40647,築上町';
GSI.MUNI_ARRAY["41201"] = '41,佐賀県,41201,佐賀市';
GSI.MUNI_ARRAY["41202"] = '41,佐賀県,41202,唐津市';
GSI.MUNI_ARRAY["41203"] = '41,佐賀県,41203,鳥栖市';
GSI.MUNI_ARRAY["41204"] = '41,佐賀県,41204,多久市';
GSI.MUNI_ARRAY["41205"] = '41,佐賀県,41205,伊万里市';
GSI.MUNI_ARRAY["41206"] = '41,佐賀県,41206,武雄市';
GSI.MUNI_ARRAY["41207"] = '41,佐賀県,41207,鹿島市';
GSI.MUNI_ARRAY["41208"] = '41,佐賀県,41208,小城市';
GSI.MUNI_ARRAY["41209"] = '41,佐賀県,41209,嬉野市';
GSI.MUNI_ARRAY["41210"] = '41,佐賀県,41210,神埼市';
GSI.MUNI_ARRAY["41327"] = '41,佐賀県,41327,吉野ヶ里町';
GSI.MUNI_ARRAY["41341"] = '41,佐賀県,41341,基山町';
GSI.MUNI_ARRAY["41345"] = '41,佐賀県,41345,上峰町';
GSI.MUNI_ARRAY["41346"] = '41,佐賀県,41346,みやき町';
GSI.MUNI_ARRAY["41387"] = '41,佐賀県,41387,玄海町';
GSI.MUNI_ARRAY["41401"] = '41,佐賀県,41401,有田町';
GSI.MUNI_ARRAY["41423"] = '41,佐賀県,41423,大町町';
GSI.MUNI_ARRAY["41424"] = '41,佐賀県,41424,江北町';
GSI.MUNI_ARRAY["41425"] = '41,佐賀県,41425,白石町';
GSI.MUNI_ARRAY["41441"] = '41,佐賀県,41441,太良町';
GSI.MUNI_ARRAY["42201"] = '42,長崎県,42201,長崎市';
GSI.MUNI_ARRAY["42202"] = '42,長崎県,42202,佐世保市';
GSI.MUNI_ARRAY["42203"] = '42,長崎県,42203,島原市';
GSI.MUNI_ARRAY["42204"] = '42,長崎県,42204,諫早市';
GSI.MUNI_ARRAY["42205"] = '42,長崎県,42205,大村市';
GSI.MUNI_ARRAY["42207"] = '42,長崎県,42207,平戸市';
GSI.MUNI_ARRAY["42208"] = '42,長崎県,42208,松浦市';
GSI.MUNI_ARRAY["42209"] = '42,長崎県,42209,対馬市';
GSI.MUNI_ARRAY["42210"] = '42,長崎県,42210,壱岐市';
GSI.MUNI_ARRAY["42211"] = '42,長崎県,42211,五島市';
GSI.MUNI_ARRAY["42212"] = '42,長崎県,42212,西海市';
GSI.MUNI_ARRAY["42213"] = '42,長崎県,42213,雲仙市';
GSI.MUNI_ARRAY["42214"] = '42,長崎県,42214,南島原市';
GSI.MUNI_ARRAY["42307"] = '42,長崎県,42307,長与町';
GSI.MUNI_ARRAY["42308"] = '42,長崎県,42308,時津町';
GSI.MUNI_ARRAY["42321"] = '42,長崎県,42321,東彼杵町';
GSI.MUNI_ARRAY["42322"] = '42,長崎県,42322,川棚町';
GSI.MUNI_ARRAY["42323"] = '42,長崎県,42323,波佐見町';
GSI.MUNI_ARRAY["42383"] = '42,長崎県,42383,小値賀町';
GSI.MUNI_ARRAY["42391"] = '42,長崎県,42391,佐々町';
GSI.MUNI_ARRAY["42411"] = '42,長崎県,42411,新上五島町';
GSI.MUNI_ARRAY["43100"] = '43,熊本県,43100,熊本市';
GSI.MUNI_ARRAY["43101"] = '43,熊本県,43101,熊本市　中央区';
GSI.MUNI_ARRAY["43102"] = '43,熊本県,43102,熊本市　東区';
GSI.MUNI_ARRAY["43103"] = '43,熊本県,43103,熊本市　西区';
GSI.MUNI_ARRAY["43104"] = '43,熊本県,43104,熊本市　南区';
GSI.MUNI_ARRAY["43105"] = '43,熊本県,43105,熊本市　北区';
GSI.MUNI_ARRAY["43202"] = '43,熊本県,43202,八代市';
GSI.MUNI_ARRAY["43203"] = '43,熊本県,43203,人吉市';
GSI.MUNI_ARRAY["43204"] = '43,熊本県,43204,荒尾市';
GSI.MUNI_ARRAY["43205"] = '43,熊本県,43205,水俣市';
GSI.MUNI_ARRAY["43206"] = '43,熊本県,43206,玉名市';
GSI.MUNI_ARRAY["43208"] = '43,熊本県,43208,山鹿市';
GSI.MUNI_ARRAY["43210"] = '43,熊本県,43210,菊池市';
GSI.MUNI_ARRAY["43211"] = '43,熊本県,43211,宇土市';
GSI.MUNI_ARRAY["43212"] = '43,熊本県,43212,上天草市';
GSI.MUNI_ARRAY["43213"] = '43,熊本県,43213,宇城市';
GSI.MUNI_ARRAY["43214"] = '43,熊本県,43214,阿蘇市';
GSI.MUNI_ARRAY["43215"] = '43,熊本県,43215,天草市';
GSI.MUNI_ARRAY["43216"] = '43,熊本県,43216,合志市';
GSI.MUNI_ARRAY["43348"] = '43,熊本県,43348,美里町';
GSI.MUNI_ARRAY["43364"] = '43,熊本県,43364,玉東町';
GSI.MUNI_ARRAY["43367"] = '43,熊本県,43367,南関町';
GSI.MUNI_ARRAY["43368"] = '43,熊本県,43368,長洲町';
GSI.MUNI_ARRAY["43369"] = '43,熊本県,43369,和水町';
GSI.MUNI_ARRAY["43403"] = '43,熊本県,43403,大津町';
GSI.MUNI_ARRAY["43404"] = '43,熊本県,43404,菊陽町';
GSI.MUNI_ARRAY["43423"] = '43,熊本県,43423,南小国町';
GSI.MUNI_ARRAY["43424"] = '43,熊本県,43424,小国町';
GSI.MUNI_ARRAY["43425"] = '43,熊本県,43425,産山村';
GSI.MUNI_ARRAY["43428"] = '43,熊本県,43428,高森町';
GSI.MUNI_ARRAY["43432"] = '43,熊本県,43432,西原村';
GSI.MUNI_ARRAY["43433"] = '43,熊本県,43433,南阿蘇村';
GSI.MUNI_ARRAY["43441"] = '43,熊本県,43441,御船町';
GSI.MUNI_ARRAY["43442"] = '43,熊本県,43442,嘉島町';
GSI.MUNI_ARRAY["43443"] = '43,熊本県,43443,益城町';
GSI.MUNI_ARRAY["43444"] = '43,熊本県,43444,甲佐町';
GSI.MUNI_ARRAY["43447"] = '43,熊本県,43447,山都町';
GSI.MUNI_ARRAY["43468"] = '43,熊本県,43468,氷川町';
GSI.MUNI_ARRAY["43482"] = '43,熊本県,43482,芦北町';
GSI.MUNI_ARRAY["43484"] = '43,熊本県,43484,津奈木町';
GSI.MUNI_ARRAY["43501"] = '43,熊本県,43501,錦町';
GSI.MUNI_ARRAY["43505"] = '43,熊本県,43505,多良木町';
GSI.MUNI_ARRAY["43506"] = '43,熊本県,43506,湯前町';
GSI.MUNI_ARRAY["43507"] = '43,熊本県,43507,水上村';
GSI.MUNI_ARRAY["43510"] = '43,熊本県,43510,相良村';
GSI.MUNI_ARRAY["43511"] = '43,熊本県,43511,五木村';
GSI.MUNI_ARRAY["43512"] = '43,熊本県,43512,山江村';
GSI.MUNI_ARRAY["43513"] = '43,熊本県,43513,球磨村';
GSI.MUNI_ARRAY["43514"] = '43,熊本県,43514,あさぎり町';
GSI.MUNI_ARRAY["43531"] = '43,熊本県,43531,苓北町';
GSI.MUNI_ARRAY["44201"] = '44,大分県,44201,大分市';
GSI.MUNI_ARRAY["44202"] = '44,大分県,44202,別府市';
GSI.MUNI_ARRAY["44203"] = '44,大分県,44203,中津市';
GSI.MUNI_ARRAY["44204"] = '44,大分県,44204,日田市';
GSI.MUNI_ARRAY["44205"] = '44,大分県,44205,佐伯市';
GSI.MUNI_ARRAY["44206"] = '44,大分県,44206,臼杵市';
GSI.MUNI_ARRAY["44207"] = '44,大分県,44207,津久見市';
GSI.MUNI_ARRAY["44208"] = '44,大分県,44208,竹田市';
GSI.MUNI_ARRAY["44209"] = '44,大分県,44209,豊後高田市';
GSI.MUNI_ARRAY["44210"] = '44,大分県,44210,杵築市';
GSI.MUNI_ARRAY["44211"] = '44,大分県,44211,宇佐市';
GSI.MUNI_ARRAY["44212"] = '44,大分県,44212,豊後大野市';
GSI.MUNI_ARRAY["44213"] = '44,大分県,44213,由布市';
GSI.MUNI_ARRAY["44214"] = '44,大分県,44214,国東市';
GSI.MUNI_ARRAY["44322"] = '44,大分県,44322,姫島村';
GSI.MUNI_ARRAY["44341"] = '44,大分県,44341,日出町';
GSI.MUNI_ARRAY["44461"] = '44,大分県,44461,九重町';
GSI.MUNI_ARRAY["44462"] = '44,大分県,44462,玖珠町';
GSI.MUNI_ARRAY["45201"] = '45,宮崎県,45201,宮崎市';
GSI.MUNI_ARRAY["45202"] = '45,宮崎県,45202,都城市';
GSI.MUNI_ARRAY["45203"] = '45,宮崎県,45203,延岡市';
GSI.MUNI_ARRAY["45204"] = '45,宮崎県,45204,日南市';
GSI.MUNI_ARRAY["45205"] = '45,宮崎県,45205,小林市';
GSI.MUNI_ARRAY["45206"] = '45,宮崎県,45206,日向市';
GSI.MUNI_ARRAY["45207"] = '45,宮崎県,45207,串間市';
GSI.MUNI_ARRAY["45208"] = '45,宮崎県,45208,西都市';
GSI.MUNI_ARRAY["45209"] = '45,宮崎県,45209,えびの市';
GSI.MUNI_ARRAY["45341"] = '45,宮崎県,45341,三股町';
GSI.MUNI_ARRAY["45361"] = '45,宮崎県,45361,高原町';
GSI.MUNI_ARRAY["45382"] = '45,宮崎県,45382,国富町';
GSI.MUNI_ARRAY["45383"] = '45,宮崎県,45383,綾町';
GSI.MUNI_ARRAY["45401"] = '45,宮崎県,45401,高鍋町';
GSI.MUNI_ARRAY["45402"] = '45,宮崎県,45402,新富町';
GSI.MUNI_ARRAY["45403"] = '45,宮崎県,45403,西米良村';
GSI.MUNI_ARRAY["45404"] = '45,宮崎県,45404,木城町';
GSI.MUNI_ARRAY["45405"] = '45,宮崎県,45405,川南町';
GSI.MUNI_ARRAY["45406"] = '45,宮崎県,45406,都農町';
GSI.MUNI_ARRAY["45421"] = '45,宮崎県,45421,門川町';
GSI.MUNI_ARRAY["45429"] = '45,宮崎県,45429,諸塚村';
GSI.MUNI_ARRAY["45430"] = '45,宮崎県,45430,椎葉村';
GSI.MUNI_ARRAY["45431"] = '45,宮崎県,45431,美郷町';
GSI.MUNI_ARRAY["45441"] = '45,宮崎県,45441,高千穂町';
GSI.MUNI_ARRAY["45442"] = '45,宮崎県,45442,日之影町';
GSI.MUNI_ARRAY["45443"] = '45,宮崎県,45443,五ヶ瀬町';
GSI.MUNI_ARRAY["46201"] = '46,鹿児島県,46201,鹿児島市';
GSI.MUNI_ARRAY["46203"] = '46,鹿児島県,46203,鹿屋市';
GSI.MUNI_ARRAY["46204"] = '46,鹿児島県,46204,枕崎市';
GSI.MUNI_ARRAY["46206"] = '46,鹿児島県,46206,阿久根市';
GSI.MUNI_ARRAY["46208"] = '46,鹿児島県,46208,出水市';
GSI.MUNI_ARRAY["46210"] = '46,鹿児島県,46210,指宿市';
GSI.MUNI_ARRAY["46213"] = '46,鹿児島県,46213,西之表市';
GSI.MUNI_ARRAY["46214"] = '46,鹿児島県,46214,垂水市';
GSI.MUNI_ARRAY["46215"] = '46,鹿児島県,46215,薩摩川内市';
GSI.MUNI_ARRAY["46216"] = '46,鹿児島県,46216,日置市';
GSI.MUNI_ARRAY["46217"] = '46,鹿児島県,46217,曽於市';
GSI.MUNI_ARRAY["46218"] = '46,鹿児島県,46218,霧島市';
GSI.MUNI_ARRAY["46219"] = '46,鹿児島県,46219,いちき串木野市';
GSI.MUNI_ARRAY["46220"] = '46,鹿児島県,46220,南さつま市';
GSI.MUNI_ARRAY["46221"] = '46,鹿児島県,46221,志布志市';
GSI.MUNI_ARRAY["46222"] = '46,鹿児島県,46222,奄美市';
GSI.MUNI_ARRAY["46223"] = '46,鹿児島県,46223,南九州市';
GSI.MUNI_ARRAY["46224"] = '46,鹿児島県,46224,伊佐市';
GSI.MUNI_ARRAY["46225"] = '46,鹿児島県,46225,姶良市';
GSI.MUNI_ARRAY["46303"] = '46,鹿児島県,46303,三島村';
GSI.MUNI_ARRAY["46304"] = '46,鹿児島県,46304,十島村';
GSI.MUNI_ARRAY["46392"] = '46,鹿児島県,46392,さつま町';
GSI.MUNI_ARRAY["46404"] = '46,鹿児島県,46404,長島町';
GSI.MUNI_ARRAY["46452"] = '46,鹿児島県,46452,湧水町';
GSI.MUNI_ARRAY["46468"] = '46,鹿児島県,46468,大崎町';
GSI.MUNI_ARRAY["46482"] = '46,鹿児島県,46482,東串良町';
GSI.MUNI_ARRAY["46490"] = '46,鹿児島県,46490,錦江町';
GSI.MUNI_ARRAY["46491"] = '46,鹿児島県,46491,南大隅町';
GSI.MUNI_ARRAY["46492"] = '46,鹿児島県,46492,肝付町';
GSI.MUNI_ARRAY["46501"] = '46,鹿児島県,46501,中種子町';
GSI.MUNI_ARRAY["46502"] = '46,鹿児島県,46502,南種子町';
GSI.MUNI_ARRAY["46505"] = '46,鹿児島県,46505,屋久島町';
GSI.MUNI_ARRAY["46523"] = '46,鹿児島県,46523,大和村';
GSI.MUNI_ARRAY["46524"] = '46,鹿児島県,46524,宇検村';
GSI.MUNI_ARRAY["46525"] = '46,鹿児島県,46525,瀬戸内町';
GSI.MUNI_ARRAY["46527"] = '46,鹿児島県,46527,龍郷町';
GSI.MUNI_ARRAY["46529"] = '46,鹿児島県,46529,喜界町';
GSI.MUNI_ARRAY["46530"] = '46,鹿児島県,46530,徳之島町';
GSI.MUNI_ARRAY["46531"] = '46,鹿児島県,46531,天城町';
GSI.MUNI_ARRAY["46532"] = '46,鹿児島県,46532,伊仙町';
GSI.MUNI_ARRAY["46533"] = '46,鹿児島県,46533,和泊町';
GSI.MUNI_ARRAY["46534"] = '46,鹿児島県,46534,知名町';
GSI.MUNI_ARRAY["46535"] = '46,鹿児島県,46535,与論町';
GSI.MUNI_ARRAY["47201"] = '47,沖縄県,47201,那覇市';
GSI.MUNI_ARRAY["47205"] = '47,沖縄県,47205,宜野湾市';
GSI.MUNI_ARRAY["47207"] = '47,沖縄県,47207,石垣市';
GSI.MUNI_ARRAY["47208"] = '47,沖縄県,47208,浦添市';
GSI.MUNI_ARRAY["47209"] = '47,沖縄県,47209,名護市';
GSI.MUNI_ARRAY["47210"] = '47,沖縄県,47210,糸満市';
GSI.MUNI_ARRAY["47211"] = '47,沖縄県,47211,沖縄市';
GSI.MUNI_ARRAY["47212"] = '47,沖縄県,47212,豊見城市';
GSI.MUNI_ARRAY["47213"] = '47,沖縄県,47213,うるま市';
GSI.MUNI_ARRAY["47214"] = '47,沖縄県,47214,宮古島市';
GSI.MUNI_ARRAY["47215"] = '47,沖縄県,47215,南城市';
GSI.MUNI_ARRAY["47301"] = '47,沖縄県,47301,国頭村';
GSI.MUNI_ARRAY["47302"] = '47,沖縄県,47302,大宜味村';
GSI.MUNI_ARRAY["47303"] = '47,沖縄県,47303,東村';
GSI.MUNI_ARRAY["47306"] = '47,沖縄県,47306,今帰仁村';
GSI.MUNI_ARRAY["47308"] = '47,沖縄県,47308,本部町';
GSI.MUNI_ARRAY["47311"] = '47,沖縄県,47311,恩納村';
GSI.MUNI_ARRAY["47313"] = '47,沖縄県,47313,宜野座村';
GSI.MUNI_ARRAY["47314"] = '47,沖縄県,47314,金武町';
GSI.MUNI_ARRAY["47315"] = '47,沖縄県,47315,伊江村';
GSI.MUNI_ARRAY["47324"] = '47,沖縄県,47324,読谷村';
GSI.MUNI_ARRAY["47325"] = '47,沖縄県,47325,嘉手納町';
GSI.MUNI_ARRAY["47326"] = '47,沖縄県,47326,北谷町';
GSI.MUNI_ARRAY["47327"] = '47,沖縄県,47327,北中城村';
GSI.MUNI_ARRAY["47328"] = '47,沖縄県,47328,中城村';
GSI.MUNI_ARRAY["47329"] = '47,沖縄県,47329,西原町';
GSI.MUNI_ARRAY["47348"] = '47,沖縄県,47348,与那原町';
GSI.MUNI_ARRAY["47350"] = '47,沖縄県,47350,南風原町';
GSI.MUNI_ARRAY["47353"] = '47,沖縄県,47353,渡嘉敷村';
GSI.MUNI_ARRAY["47354"] = '47,沖縄県,47354,座間味村';
GSI.MUNI_ARRAY["47355"] = '47,沖縄県,47355,粟国村';
GSI.MUNI_ARRAY["47356"] = '47,沖縄県,47356,渡名喜村';
GSI.MUNI_ARRAY["47357"] = '47,沖縄県,47357,南大東村';
GSI.MUNI_ARRAY["47358"] = '47,沖縄県,47358,北大東村';
GSI.MUNI_ARRAY["47359"] = '47,沖縄県,47359,伊平屋村';
GSI.MUNI_ARRAY["47360"] = '47,沖縄県,47360,伊是名村';
GSI.MUNI_ARRAY["47361"] = '47,沖縄県,47361,久米島町';
GSI.MUNI_ARRAY["47362"] = '47,沖縄県,47362,八重瀬町';
GSI.MUNI_ARRAY["47375"] = '47,沖縄県,47375,多良間村';
GSI.MUNI_ARRAY["47381"] = '47,沖縄県,47381,竹富町';
GSI.MUNI_ARRAY["47382"] = '47,沖縄県,47382,与那国町';