mui.init();

//初始化区域滚动
mui('.mui-scroll-wrapper').scroll();

var cid = undefined; //当前点击加油卡的id
mui.ready(function() {
	mui('#oilCardList').on('tap', 'a', function() {
		cid = this.getAttribute('name');
		mui('#' + this.getAttribute('data-href') + '').popover('toggle');
	});

}); //MUI READY END

//删除
document.getElementById('submitDelete').addEventListener('tap', function() {
	slideRemoveMsg('#popDelete', 'oilCardList', function(msgid) {
		console.log('已删除' + msgid); //TODO ajax {msgid:msgid}
	});
});

//监听加油卡卡号输入
document.getElementById('inputOilCard').addEventListener('input', function() {
	if (this.value.length == 19) {
		document.getElementById('submitAddCardBtn').disabled = false; //添加按钮
		document.getElementById('checkCard').style.display = 'block';
	} else {
		document.getElementById('submitAddCardBtn').disabled = true; //添加按钮
		document.getElementById('checkCard').style.display = 'none';
	}
}, false);

//添加加油卡弹窗-添加按钮
document.getElementById('submitAddCardBtn').addEventListener('tap', function() {
	var check = document.getElementById('inputOilCard').value;
	var carType = document.getElementById('CNPC').checked ? 'CNPC' : 'SINOPEC';

	if (check.length != 19 || check == "") {
		mui.toast('请输入正确的油卡号码');
		return;
	} else {
		if (this.innerHTML == '添加') {
			document.getElementById('showCardInfo').style.display = 'block';
			document.getElementById('submitAddCardBtn').innerHTML = '确认';
			return;
		}
		if (this.innerHTML == '确认') {
			var ajaxcheck = true; //TODO
			if (ajaxcheck) {
				mui('#popAddCard').popover('hide');
				document.getElementById('submitAddCardBtn').innerHTML = '添加';
				document.getElementById('submitAddCardBtn').disabled = true; //添加按钮
				console.log('添加油卡:NEED AJAX:-->T:|' + carType + '|V:' + check); //TODO 
				document.getElementById('inputOilCard').value = ""; //重置默认值
				document.getElementById('checkCard').style.display = 'none'; //隐藏check结果
				document.getElementById('showCardInfo').style.display = 'none'; //隐藏卡信息
				mui.toast('添加成功');
	
				var dom = document.getElementById("oilCardList");
				var li = document.createElement('li');
				li.className = 'mui-table-view-cell';
				li.innerHTML = addCardList();
				//新纪录插到最前面
				dom.insertBefore(li, dom.firstChild);
			}
		}
	}
});

//监听修改加油卡卡号输入
document.getElementById('inputEditRov').addEventListener('input', function() {
	if (this.value.length == 19) {
		document.getElementById('submitEditCardBtn').disabled = false; //添加按钮
		document.getElementById('checkEditCard').style.display = 'inline-block';
//		document.getElementById('owner').style.display = 'inline-block';
	} else {
		document.getElementById('submitEditCardBtn').disabled = true; //添加按钮
		document.getElementById('checkEditCard').style.display = 'none';
//		document.getElementById('owner').style.display = 'none';
	}
}, false);

//修改加油卡弹窗-修改按钮
document.getElementById('submitEditCardBtn').addEventListener('tap', function() {
	var check = document.getElementById('inputEditRov').value;
	var carType = document.getElementById('CNPC').checked ? 'CNPC' : 'SINOPEC';
	var img = carType == 'CNPC' ? 'ico_zsy.png' : 'ico_zsh.png';
	if (check.length != 19 || check == "") {
		mui.toast('请输入正确的油卡号码');
		return;
	} else {
		if (this.innerHTML == '修改') {
			document.getElementById('submitEditCardBtn').innerHTML = '确认';
			return;
		}
		if (this.innerHTML == '确认') {
			var ajaxcheck = true; //TODO
			var data = {
				type: '中石油加油卡',
				owener: '王老五',
				pin: '9847489309712354267',
				info: '已到账111元&nbsp;&nbsp;未到账222元'
	
			};
			if (ajaxcheck) {
				console.log('修改油卡：NEED AJAX:-->T:|' + carType + '|V:' + check); //TODO 
	
				document.getElementById(cid).innerHTML =
					'<span class="pic"><img src="../../images/oil/' + img + '"></span>' +
					'<p>' + data.type + '（持卡人：' + data.owener + '）</p>' +
					'<p>' + data.pin + '</p>' +
					'<p>' + data.info + '</p>';
				mui('#popEditCard').popover('toggle');
				document.getElementById('submitEditCardBtn').innerHTML = '修改';
				mui.toast('修改成功');
			}
		}
	}
});

/**
 * @description 输入对象返回内容
 * @param {Object} o 传入的对象
 * @example  var txt = addCardList(object);
 */
function addCardList(o) {
	var txt =
		'<div class="mui-slider-right mui-disabled">'+
		'	<a name="oilCardLi3" data-href="popDelete" class="mui-btn mui-btn-red">删除</a>'+
		'</div>'+
		'<div class="mui-slider-handle">'+
		'	<a name="oilCardLi3" data-href="popEditCard" class="mui-navigate-right">'+
		'		<div id="oilCardLi3" class="oil_card_info clearfix">'+
		'			<span class="pic"><img src="../../images/oil/ico_zsh.png"></span>'+
		'			<p>中石化加油卡（持卡人：张某）</p>'+
		'			<p>1222000088886666456</p>'+
		'			<p>已到账XXX元&nbsp;&nbsp;未到账XXX元</p>'+
		'		</div>'+
		'	</a>'+
		'</div>';
	return txt;
};