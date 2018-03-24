function navStyle(){	
	var oNav = document.getElementsByTagName('nav')[0];
	var aNavA = oNav.getElementsByTagName('a');
	var aSection = document.getElementsByTagName('section');
	aNavA[0].timer = null;
	//设置nav标签为绝对定位，跟着屏幕滚动
	oNav.style.position = 'fixed';	
	//初始化nav标签height
	navHeight(oNav);
	//窗口大小被调整时发生，动态改变nav标签的height
	window.onresize = function (){
		navHeight(oNav);
		if (Number(getClientWidth())<975){
			
			let nav = document.getElementsByTagName('nav')[0];
			nav.style.display = 'none';
			var oAside = document.getElementsByClassName('aside_1')[0];
			oAside.style.width = 755+'px';	

			var aSection = document.getElementsByTagName('section');
			var aFooter = document.getElementsByTagName('footer')[0];
			aFooter.style.marginLeft = 0;
			for(let i=0,len=aSection.length;i<len;i++)	{
				aSection[i].style.marginLeft=0;
			};
		}else{
			let oAside = document.getElementsByTagName('aside')[0];			
			oAside.style.width = 975+'px';
			var nav = document.getElementsByTagName('nav')[0];
			nav.style.display = 'block';
			
			var section = document.getElementsByTagName('section');
			var footer = document.getElementsByTagName('footer')[0];
			footer.style.marginLeft = 220+'px';
			for(let i=0,len=section.length;i<len;i++){
				section[i].style.marginLeft=220+'px';
			};
		}
	}
	//给每个a标签加入鼠标移入事件
	for(let i=1,oALen = aNavA.length;i<oALen;i++){
		aNavA[i].onmouseover = function (){
			//改变鼠标移入的当前a标签的背景颜色为#1f1f21
			this.style.backgroundColor = "#1f1f21";
			//点击当前a标签时,重置除了当前标签外的所有a标签背景颜色为#2e2e2e，onOff属性false；当前a标签背景颜色为#1f1f21,onOff为true.
			this.onmousedown = function (){						
				for(let j=1;j<oALen;j++){
					if(i != j){
						aNavA[j].onOff = false;
						aNavA[j].style.backgroundColor = "#2e2e2e";
					} 
				}
				this.onOff = true;
				this.style.backgroundColor = "#1f1f21";
			}
			//当前a标签的onOff为false时（即没有发生onmousedown的所有a标签），鼠标抬起时，重置颜色为背景颜色，即#2e2e2e
			aNavA[i].onmouseout = function (){
				if(!this.onOff){
					this.style.backgroundColor = "#2e2e2e";
				}
			}
		}				
	}
	//跳转到描点的动画效果
	//给nav里每个a标签添加点击事件
	for(let i=1,aALen = aNavA.length;i<aALen;i++){
		aNavA[i].onclick = function (){
			this.index = i;
			_this = this;
			clearInterval(aNavA[0].timer);
			aAOnclick(aNavA,aSection,_this.index,aALen);
		}
	}
}
//a标签点击事件
function aAOnclick(aNavA,aSection,i,aALen){
	aNavA[0].nowPoint = getScrollTop();
	aNavA[0].num = 0;	
	aNavA[0].scr = 0;
	aNavA[0].tar = aSection[i-1].offsetTop;
	aNavA[0].dis = aNavA[0].tar - aNavA[0].nowPoint;
	//如果当前位置与目标位置的距离为0时，return
	if(aNavA[0].dis == 0) return;
	//在窗口顶端的时候，移动前改变scrollTop为1，解决chrome下无法出发定时器的问题
	if(aNavA[0].nowPoint == 0){
		setScrollTop(1);
	}
	//开启定时器
	aNavA[0].timer  = setInterval(function (){
		setScrollTop(getScrollTop()+aNavA[0].dis/20);
		//设置关闭定时器的条件
		// document.body.onmousewheel = function(event) {
		//     event = event || window.event;
		// 	clearInterval(timer);
		// };
		// document.documentElement.onmousewheel = function(event) {
		//     event = event || window.event;
		// 	clearInterval(timer);
		// };
		// document.body.onmousedown = function(event) {
		//     event = event || window.event;
		// 	clearInterval(timer);
		// };
		// document.documentElement.onmousedown = function(event) {
		//     event = event || window.event;
		// 	clearInterval(timer);
		// };
		// window.addEventListener("onmousescroll", function (){
		// 	alert(9);
		// 	clearInterval(aNavA[0].timer);});
		if(i==(aALen-1) && aSection[aALen-2].offsetHeight <= getClientHeight()){
			console.log(getScrollTop());
			if(aNavA[0].num != getScrollTop()){
				aNavA[0].num = getScrollTop();
			}else{
				stopTimer(aNavA[0].tar,aNavA[0].timer);
			}

			//aNavA[0].num != getScrollTop() ? aNavA[0].num = getScrollTop() : stopTimer(aNavA[0].tar,aNavA[0].timer);
		}else if(aNavA[0].dis > 0 && getScrollTop()+aNavA[0].dis/50 >= aNavA[0].tar){
				stopTimer(aNavA[0].tar,aNavA[0].timer);					
		}else if(aNavA[0].dis < 0 && getScrollTop()+aNavA[0].dis/50 <= aNavA[0].tar){
				stopTimer(aNavA[0].tar,aNavA[0].timer);						
		}
		
	},20)
}
//停止定时器
function stopTimer1(timer){
	clearInterval(timer);
}
function stopTimer(tar,timer){
	setScrollTop(tar);
	clearInterval(timer);
}
//高度为自适应屏幕高度
function navHeight(oNav){
	oNav.navHeight = document.documentElement.clientHeight || document .body.clientHeight;
		oNav.style.height = oNav.navHeight + 'px';
}
//兼容获取scrollTop
function getScrollTop() {  
    var scrollTop = document.documentElement.scrollTop|| document.body.scrollTop || window.pageYOffset;  
    return scrollTop;  
}  
//兼容获取clientHeight
function getClientHeight() {  
    var clientHeight = document.documentElement.clientHeight  || document.body.clientHeight;  
    return clientHeight;  
}		
//兼容设置scrollTop  
function setScrollTop(scroll_top) {  
    document.documentElement.scrollTop = scroll_top;  
    window.pageYOffset = scroll_top;  
    document.body.scrollTop = scroll_top;  
}
function getClientWidth() {  
    var clientWidth = document.documentElement.clientWidth  || document.body.clientWidth;  
    return clientWidth;  
}