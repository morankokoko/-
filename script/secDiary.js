function secDiary(){
	var sec = document.getElementsByTagName('section')[5];
	var art = sec.getElementsByTagName('article');
	var oUl = art[0].getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');
	art.aH2 = art[2].getElementsByTagName('h2')[0];
	art.aP = art[2].getElementsByTagName('p')[0];
	art.delSpan = art[2].getElementsByTagName('span')[1];
	art.cloSpan = art[2].getElementsByTagName('span')[0];
	sec.input = art[1].getElementsByTagName('input')[0];
	sec.areatext = art[1].getElementsByTagName('textarea')[0];
	sec.spanBtn = art[1].getElementsByTagName('span')[2];
	sec.spanCloseAll = art[1].getElementsByTagName('span')[3];

	//载入系统中已经存在的localStorage数据
	oUl.innerHTML='';
	for(let i=0;window.localStorage.getItem('title'+i);i++){
		creatLi(i);
	}
	art.cloSpan.onclick = function (){	//关闭article3
		art[2].style.display = 'none';
	}
	sec.spanCloseAll.onclick = function (){	//删除所有localStorage数据
		window.localStorage.clear();
		art[2].style.display = 'none';
		oUl.innerHTML='';
		sec.input.value='';
		sec.areatext.value='';
		alert('删除成功');
	}
	sec.spanBtn.onclick = function (){	//保存span按钮
		sec.iNow = aLi.length;
		window.localStorage.setItem('title' + sec.iNow,sec.input.value);
		window.localStorage.setItem('ta'+ sec.iNow,sec.areatext.value);
		creatLi(sec.iNow);
		sec.input.value = '';
		sec.areatext.value = '';
	}
	function creatLi(num){ //创建Li
		let oLi = document.createElement('li');
		oLi.innerHTML = window.localStorage.getItem('title'+num);
		oUl.appendChild(oLi);
		showLi();
	}
	function showLi(){  //显示Li
		let len=aLi.length;
		for(let i=0;i<len;i++){
			aLi[i].onclick = function (){	//点击列表中的Li
				aLi[i].index =i;
				let _this = this;
				art[2].style.display = 'block';
				art.aH2.innerHTML = window.localStorage.getItem('title' + this.index);
				art.aP.innerHTML = window.localStorage.getItem('ta'+this.index);	
				art.delSpan.onclick = function (){	//删除当前数据
					oUl.innerHTML='';
					//重置oUl、aLi
					for(let j=0;j<len;j++){
						if(j >= _this.index){
							window.localStorage.setItem('title' + j,window.localStorage.getItem('title' + (j+1)));
							window.localStorage.setItem('ta' + j,window.localStorage.getItem('ta' +  (j+1)));
						}
						if(j != len-1) creatLi(j);
					}
					//删除最后一组数据							
					window.localStorage.removeItem('title'+(len-1));
					window.localStorage.removeItem('ta'+(len-1));
					art[2].style.display = 'none';
					alert('删除成功');
				}
			}
		}
	}
}