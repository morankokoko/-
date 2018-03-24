// 从0-249中随机抽取10个不相等的数字，放入数组arr中
function secMovie(){
	var oSection = document.getElementsByTagName('section')[3];
	var oA = oSection.getElementsByTagName('a')[0];
	oA.onclick = function (){
		alert('豆瓣API提供的刷新次数不能满足此功能需求，不实现');
		//creatSctipt();
	}
	oSection.arr = [];
	for(let i = 0;i < 10;i = oSection.arr.length){
		oSection.arr.push(addNumToArr(oSection.arr));
	}
	creatSctipt(oSection);
}
function addNumToArr(arr){				
	let num = Math.floor(Math.random()*250);
	for(let i=0;i<arr.length;i++){
		if(arr[i] == num){
			 addNumToArr(arr);
			 break;
		}
	}
	return num;
}
//创建script标签函数
function creatSctipt(oSection){
	var oUl = document.getElementsByTagName('section')[3].getElementsByTagName('ul')[0];
	oUl.innerHTML = '';
	for(let i=0;i<10;i++){				
		var oScript = document.createElement('script');
		oScript.src = 'http://api.douban.com/v2/movie/top250?start='+ oSection.arr[i] +'&count=1&callback=callbackFn';
		document.body.appendChild(oScript);		
	}
}
function callbackFn(data) {
	var oUl = document.getElementsByTagName('section')[3].getElementsByTagName('ul')[0];
	// 创建li、img、p标签
	let li = document.createElement('li');
	let img = document.createElement('img');
	let p = document.createElement('p');
	oUl.appendChild(li);
	li.appendChild(img);
	li.appendChild(p);
	//添加img的src和P的innerHTML
	img.src = data.subjects[0].images.large;
	p.innerHTML = data.subjects[0].title;
}
