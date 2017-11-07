//沉浸状态栏
var immersed = 0;
(function(w) {
	document.addEventListener('plusready', function() {
//		console.log("Immersed-UserAgent: " + navigator.userAgent);
	}, false);

	var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
	if (ms && ms.length >= 3) {
		immersed = parseFloat(ms[2]);
	}
	w.immersed = immersed;

	if (!immersed) {
		return;
	}
//	else {
//		mui.toast("immersed:" + immersed);
//	}
	
	var headerClass = document.querySelector('.mui-bar.mui-bar-nav');
	headerClass && (headerClass.style.paddingTop = immersed + 'px', headerClass.style.height = immersed + 44 + 'px');
	
	var contentClass = document.querySelector('.mui-bar-nav ~ .mui-content');
	contentClass && (contentClass.style.top = immersed + 44 + 'px');
	
})(window);

//获取验证码-倒计时
var _waitTime = 60;
function countdown(e) {
	if (_waitTime == 0) {
		e.removeAttribute('disabled');
		e.value = '获取验证码';
		_waitTime = 60;
	} else {
		e.setAttribute('disabled', true);
		e.value = '重新发送(' + _waitTime + 's)';
		_waitTime--;
		setTimeout(function() {
			countdown(e);
		}, 1000);
	};
};

/**
 * @description 左滑删除消息
 * @param {String} popid 需要关闭的弹窗的id
 * @param {String} target 需要移除的父元素的id
 * @param {String} callback 返回删除的条目的id
 * @example slideRemoveMsg({String}, {String}, {callback});
 */
function slideRemoveMsg(popid, target, callback) {
	mui(popid).popover('toggle');
	var removeDom = document.getElementById(target).getElementsByClassName('mui-selected')[0];
	removeDom.parentNode.removeChild(removeDom);
	return callback(removeDom.id);
};

/**
 * @description 新开窗口
 * @param {string} target 需要打开的页面的地址
 * @example openNew({string});
 * */
function openNew(target) {
	mui.openWindow({
		url: target,
		id: target,
		show: {
			aniShow: 'slide-in-right',
			duration: 150
		},
		waiting: {
			autoShow: false
		}
	});
};

//验证用户输入
var checkInput = {
	/**
	 * @description 验证手机号
	 * @param {String} str 要验证的手机号码字符串
	 * @param {Function.fn} callback 回调函数，验证成功返回空，否则失败
	 */
	mytel: function(str, callback) {
		if (str.length == 0) {
			return callback('手机号码不能为空');
		} else {
			return callback((!/^[1][3,4,5,8][0-9]{9}$/.test(str)) ? '请输入正确的手机号码' : '');
		}
	},
	/**
	 * @description 验证密码
	 * @param {String} str 要验证的密码字符串
	 * @param {Function.fn} callback 回调函数，验证成功返回空，否则失败
	 */
	mypass: function(str, callback) {
		if (str.length < 6) {
			return callback('密码至少需要6位');
		} else {
			return callback((!/^.*[A-Za-z0-9\\w_-]+.*$/.test(str)) ? '请输入正确的密码：\n密码至少6位,仅允许英文字母和数字' : '');
			//TODO 已知bug，该正则无法验证中文密码但是中间包含阿拉伯数字或者英文字母的密码，如：用来测试的2密码
			//BUG
		}
	},
	/**
	 * @description 验证车牌号
	 * @param {String} str 要验证的车牌号字符串
	 * @param {Function.fn} callback 回调函数，验证成功返回空，否则失败
	 */
	myplate: function(str, callback) {
		return callback((!/^[\u4e00-\u9fa5]{1}[a-zA-Z_0-9]{6}$/.test(str)) ? '请输入正确的车牌号' : '');
	},
	/**
	 * @description 验证车架号
	 * @param {String} str 要验证的车架号字符串
	 * @param {Function.fn} callback 回调函数，验证成功返回空，否则失败
	 */
	myvin: function(str, callback) {
		return callback((!/^[a-zA-Z_0-9]{17}$/.test(str)) ? '请输入正确的车架号' : '');
	},
	/**
	 * @description 验证发动机号
	 * @param {String} str 要验证的发动机号字符串
	 * @param {Function.fn} callback 回调函数，验证成功返回空，否则失败
	 */
	mywmi: function(str, callback) {
		return callback((!/^[a-zA-Z0-9]{6,}$/.test(str)) ? '请输入正确的发动机号' : '');
	},
	/**
	 * @description 验证车辆类型
	 * @param {String} str 要验证的车辆类型字符串
	 * @param {Function.fn} callback 回调函数，验证成功返回空，否则失败
	 */
	myvds: function(str, callback) {
		return callback((!/[\w\u4E00-\u9FA5]/g.test(str)) ? '请输入正确的车辆类型' : '');
	},
	/**
	 * @description 验证身份证号
	 * @param {String} str 要验证的身份证号字符串
	 * @param {Function.fn} callback 回调函数，验证成功返回空，否则失败
	 */
	mysfzh: function(str, callback) {
		return callback((!/^\d{15}|\d{}18$/.test(str)) ? '请输入正确的身份号' : '');
	},
	/**
	 * @description 检查验证码
	 * @param {String} str 要检查的验证码字符串
	 * @param {Function.fn} callback 回调函数，验证成功返回空，否则失败
	 */
	mycode:function(str,callback){
		if (str.length == 0) {
			return callback('验证码不能为空');
		} else {
			return callback((!/^[a-z0-9A-Z]{4}$/.test(str)) ? '请输入正确的验证码' : '');
		}
	}
};

//时间
var mklog = function() {
	return new Date().getTime()
};

//返回所有webview
var mkwv = function() {
	var wvs = plus.webview.all(); //循环显示当前webv
	var t1 = "|debug:当前共有" + wvs.length + "个webview\n";
	var t2 = "";
	for (var i = 0; i < wvs.length; i++) {
		t2 += "|webview" + i + "|" + wvs[i].id + "..@--" + wvs[i].getURL().substr(82) + '\n';
	}
	return t1 + t2;
}

//定义设备绑定状态
//此变量放在这里是为了静态页面中模拟，生产环境应当写入localstorage
//box.js和home.js两个文件都读取了myCxbStatus对象
var myCxbStatus = {
	binded: true, //设备绑定状态
	connect: false, //是否连接设备
	online: false //已经连接：行驶中=true，熄火=false
};