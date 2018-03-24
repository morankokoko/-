function secMessage(){
	let oSection = document.getElementsByTagName('section')[6];


	let aSpanNum = oSection.getElementsByTagName('span')[0];
	let aUl = oSection.getElementsByTagName('ul')[0];
	let aLi = oSection.getElementsByTagName('ul')[0].getElementsByTagName('li');
	let aInput = oSection.getElementsByTagName('article')[0].getElementsByTagName('article')[0].getElementsByTagName('input')[0];
	let aTextarea = oSection.getElementsByTagName('article')[0].getElementsByTagName('article')[1].getElementsByTagName('textarea')[0];
	let aSpan = oSection.getElementsByTagName('article')[0].getElementsByTagName('span')[2];

	//ajax调用已经存在服务器中的留言
	let xhr = new XMLHttpRequest();
	let xhrArr = 0;
	xhr.open("get",'message/message.txt',true);	
	xhr.send();
	xhr.onreadystatechange=function (){
		if(xhr.readyState == 4 && xhr.status == 200){
			// 将取出来的字符串类型数据变成数组 
			xhrArr = xhr.responseText.split("],[");
			xhrArr[0]=xhrArr[0].split("[[")[1];
			xhrArr[xhrArr.length-1]=xhrArr[xhrArr.length-1].split("]]")[0];			
			let xhrArrLen = xhrArr.length;
			for(let i=0;i<xhrArrLen;i++){
				xhrArr[i]=xhrArr[i].split("','");
				let len = xhrArr[i].length;
				xhrArr[i][0]=xhrArr[i][0].split("'")[1];
				xhrArr[i][2]=xhrArr[i][2].split("'")[0];				
			}
			//添加数据至页面
			for(var i=0;i<xhrArrLen;i++){
				let oSpanInnerHTML = (i+1) +'.'+xhrArr[i][0]+' | '+xhrArr[i][2];
				let oPInnerHTML = xhrArr[i][1];
				creatElementFn(oSpanInnerHTML,oPInnerHTML);
			}
			aSpanNum.innerHTML = xhrArrLen+'条评论';
		}
	}	
	//点击‘提交’，上传留言到网页中；没有做上传至服务器的功能
	aSpan.onclick = function (){
		//检测用户是否输入了名称及内容
		if(!aInput.value){
			alert('请输入"名称"');
			return;
		}
		if(!aTextarea.value) {
			alert('请输入内容');
			return;
		}
		let num = aLi.length;
		let oSpanInnerHTML = (num+1) +'.'+aInput.value+' | '+nowTime();
		let oPInnerHTML = aTextarea.value;
		creatElementFn(oSpanInnerHTML,oPInnerHTML);
		aSpanNum.innerHTML = (num+1)+'条评论';		
	}
	function creatElementFn(oSpanInnerHTML,oPInnerHTML){
		let oSpan = document.createElement('span');
		let oP = document.createElement('p');
		let oLi = document.createElement('li');
		oLi.appendChild(oSpan);
		oLi.appendChild(oP);
		aUl.appendChild(oLi);
		oSpan.innerHTML = oSpanInnerHTML;
		oP.innerHTML = oPInnerHTML;
	}
	function nowTime(){
		let date = new Date();
		let myHour = date.getHours();
		let myMin = date.getMinutes();
		let myYear = date.getFullYear();
		let myMon = date.getMonth()+1;
		let myDay = date.getDate();

		return myYear+'-'+myMon+'-'+myDay+' '+myHour+':'+myMin;
	}
}