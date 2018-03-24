function secHomeImg(){
	var aSecA = document.getElementsByTagName('section')[0].getElementsByTagName('a'),
	oDiv = document.getElementsByTagName('section')[0].getElementsByTagName('div')[0],
	oDivImg = oDiv.getElementsByTagName('img');
	oDiv.arrImg=['img/section0_img/1.jpg','img/section0_img/2.jpg','img/section0_img/3.jpg','img/section0_img/4.jpg','img/section0_img/5.jpg'];			
	oDiv.index=0;
	oDivImg[0].index=0;
	oDivImg[1].index=0;
	oDiv.timer=null;
	//初始化a标签的背景图片
	aSecA[0].style.background = 'url(img/section0_img/picButton.png)';
	aSecA[1].style.background = 'url(img/section0_img/picButton.png) -52px';
	//初始化轮播图两个div的背景图片
	oDivImg[0].src = oDiv.arrImg[0];
	oDivImg[1].src = oDiv.arrImg[1];
	//鼠标离开oDiv,轮播图自动播放
	oDiv.onmouseout = function (){
		clearInterval(oDiv.timer);
		oDiv.timer=setInterval(function(){timerFn();},3000);
	}
	//开定时器使图片自动播放
	oDiv.timer=setInterval(function(){timerFn();},3000);	
	//点击aSecA[0],aSecA[1]
	aSecA[0].onclick=function(){aOnclick(704);}
	aSecA[1].onclick=function(){aOnclick(-699);}
	//定时器函数
	function timerFn(){
		//重置oDivImg[1]
		reDivImg_1('704','0s');
		setDivImg(oDivImg[0].src);
		setTimeout(function(){
			//重置oDivImg[1]
			reDivImg_1('5','1.5s');
			setTimeout(function(){
				//重置oDivImg[1]
				reDivImg_1('704','0s');
				setDivImg(oDivImg[1].src);
			},1200);
		},14);
	}
	//a标签点击函数
	function aOnclick(starPoint){
		aSecAOnclickOnoff(starPoint);
		aSecAOnclickOnoff=null;
		setTimeout(function(){
			aSecAOnclickOnoff = aSecAOnclick;
		},1500);
	}
	//aSecA[0],aSecA[1]点击控制函数
	function aSecAOnclickOnoff(starPoint){};
	aSecAOnclickOnoff = aSecAOnclick;
	//aSecA[0],aSecA[1]点击执行函数
	function aSecAOnclick(starPoint){
		clearInterval(oDiv.timer);
		//重置oDivImg[1]
		reDivImg_1(starPoint,'0s');
		setTimeout(function(){
			//重置oDivImg[1]
			reDivImg_1('5','1.5s');
			setTimeout(function(){
				//重置oDivImg[1]
				reDivImg_1(starPoint,'0s');
				setDivImg(oDivImg[1].src);
			},1200);
		},14);
	}
	//重置oDivImg[1]位置reDivImg_1
	function reDivImg_1(rePoint,traTime){
		oDivImg[1].style.transition = traTime;
		oDivImg[1].style.left=Number(rePoint)+'px';
	}
	//设置oDivImg[1]动画方向
	function setDivImg(oDivImgSrc){
		oDiv.index = cutImgName(oDivImgSrc)-1;
		oDivImg[0].index = oDiv.index;
		oDiv.index!=4?oDivImg[1].index=oDiv.index+1:oDivImg[1].index=0;
		oDivImg[0].src=oDiv.arrImg[oDivImg[0].index];
		oDivImg[1].src=oDiv.arrImg[oDivImg[1].index];
	}
	//切割图片src，取得index
	function cutImgName(imgName){
		return imgName.substring(imgName.length-4,imgName.length-5);
	}
}