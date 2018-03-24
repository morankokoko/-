function secNews(){
	//前端资讯标题
	var oUl = document.getElementsByTagName('section')[4].getElementsByTagName('ul')[0];
	var oSpan = document.getElementsByClassName('sec_5_span')[0];
	oUl.arr = ['HTML5.2有哪些新内容','如何有效地做算法题','字符编码的故事','Ant Design色板生成算法演进之路','Chrome Devtools-性能监控','webpack为什么这么难用？'];
	// 前端资讯链接地址
	oUl.arrUrl = ['http://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651227645&idx=1&sn=64ebca98ff7b26b2fb4cf858b4154d26&chksm=bd495c798a3ed56ff8fcca8e3a154f9dbb0bdf6a182c5e9b1452efb7d561ada1f465e0b13eb8&mpshare=1&scene=1&srcid=01223UAoQYwJClwFH7L4f5H1#rd',
	'http://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651227607&idx=1&sn=00f9adba3ebdb1f4e9e982148fbfc151&chksm=bd495c538a3ed545fcd1d7120836a9985046b837ec4c3f501ea23e1f8e08e39de730fd55c502&mpshare=1&scene=1&srcid=0122cRgRh7uJUGwmrCrs13IQ#rd',
	'http://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651227606&idx=1&sn=7d296c6779f32470737f56c8eeed394e&chksm=bd495c528a3ed544c6cdbef5cb6e21d6e74d03d993fd602b3a785d19956d1182fbd3f54fb991&mpshare=1&scene=1&srcid=0122uoni1wTdRTYD03FlGLln#rd',
	'http://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651227557&idx=1&sn=830c8e02a41051924a3dc584656b3034&chksm=bd495c218a3ed5379ce5b7a7b789266faa1fd61ebfc4bca7b694e4d9efee0a27fc73702ae58d&mpshare=1&scene=1&srcid=0122eRsu1vpgX4XzIP5yvKFh#rd',
	'http://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651227541&idx=1&sn=9f3849e83ba2a3e9626983c3d2390a11&chksm=bd495c118a3ed5074de88e34b7ce63515640f4522fb82e08c597fce181369fa8717c2dbc6a84&mpshare=1&scene=1&srcid=0122IQ0DOX1xturYZbzoz3RW#rd',
	'http://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651227486&idx=1&sn=f51896245be0d0325384a97fc353bd55&chksm=bd495cda8a3ed5cc1d760b88c6eaa3ddce9558de41b71a70c64514f572e1b846fba735d1a62f&mpshare=1&scene=1&srcid=0122rqui7R3Pf5c5PzL2iHTB#rd'];			
	oUl.len = oUl.arr.length;
	// 少于等于4篇文章时，隐藏span标签，设置ul的长度为一整行
	if(oUl.len <= 4){				
		oSpan.style.display = 'none';
		oUl.style.margin = '0 25px';
		creatSec5Li(oUl,oUl.len);
	}else {
		var onOff= true;				
		oSpan.style.display = 'inline-block';
		oSpan.innerHTML = '展开';
		oUl.style.margin = '0 120px 0 25px';
		creatSec5Li(oUl,4);
		oSpan.onclick = function (){
			onOff = !onOff;
			if(!onOff){
				this.innerHTML = '关闭';
				creatSec5Li(oUl,oUl.len);
			}else{
				this.innerHTML = '展开';
				creatSec5Li(oUl,4);
			}
		}
	}//大于4篇文章时，显示span标签，点击span标签，显示/隐藏多余4篇之外的文章标题
	function creatSec5Li(oUl,arrLen){
		oUl.innerHTML = '';
		for(let i=0;i<arrLen;i++){
			let oLi = document.createElement('li');
			let oSpan = document.createElement('span');
			let oA = document.createElement('a');
			oLi.appendChild(oSpan);
			oLi.appendChild(oA);
			oUl.appendChild(oLi);
			oSpan.innerHTML = i+1+'、';
			oA.innerHTML = oUl.arr[i];
			oA.href = 'javascript:;';
			oLi.onclick =function (){
				window.open(oUl.arrUrl[i]);
			}
		}
	}
}