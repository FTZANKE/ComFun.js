function ragRandomNum(min, max) {
	// 生成指定范围随机数=>调用方法:randromNum(min,max)
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function toStrKNum(n) {
	// 数字千分位分隔=>调用方法:thousandthsToStrNum(num)
	let num = n.toString();
	let len = num.length;
	if (len <= 3) {
		return num;
	} else {
		let temp = '';
		let remainder = len % 3;
		if (remainder > 0) {
			return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp;
		} else {
			return num.slice(0, len).match(/\d{3}/g).join(',') + temp;
		}
	}
}


function arrSo(arr) {
	// 数组乱序=>调用方法:arrSo(arr)    tip:形参是个数组
	for (let i = 0; i < arr.length; i++) {
		const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
		[arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
	}
	return arr;
}


// *******************************************************************************************************
function repArr(arr) { // 简单数组去重 不对外使用
	var arrJ = [...new Set(arr)];
	var obj = {};
	return arrJ.filter(function(item) {
		return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
	})
}
// *******************************************************************************************************


function flatNum(arr, falsTruE) {
	// 数组扁平化=>调用方法:flatNum(arr)    tip:形参是多维数组且，
	// 第二个值为true时，可将返回数组去重后的结果;
	let result = [];
	for (let i = 0; i < arr.length; i++) {
		if (Array.isArray(arr[i])) {
			result = result.concat(flatNum(arr[i]));
		} else {
			result.push(arr[i]);
		}
	}
	if (falsTruE == true) {
		return repArr(result);
	} else {
		return result;
	}
}


function randromArrNum(arr, falsTruE) {
	// 数组中获取随机数=>调用方法:randromArrNum(arr)    tip:形参是数组
	// 如果数组为多维数组,且只想要一个多维数组的随机值，那么就加上第二个 true;
	if (falsTruE == true) {
		var arrJ = flatNum(arr);
		return arrJ[Math.floor(Math.random() * arrJ.length)];
	} else {
		return arr[Math.floor(Math.random() * arr.length)];
	}
}


function randomString(len) {
	// 生成随机字符串=>调用方法:randomString(len)    tip:形参是字符串的长度
	let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
	let strLen = chars.length;
	let randomStr = '';
	for (let i = 0; i < len; i++) {
		randomStr += chars.charAt(Math.floor(Math.random() * strLen));
	}
	return randomStr;
}


function firstLetterUpper(str) {
	// 字符串首字母大写=>调用方法:firstLetterUpper(str)    tip:形参是声明的变量
	return str.charAt(0).toUpperCase() + str.slice(1);
}


function telFormat(tel) {
	// 手机号中间四位变成*=>调用方法:telFormat(tel)    tip:形参是声明的变量
	tel = String(tel);
	return tel.substr(0, 3) + "****" + tel.substr(7);
}


function digitUppercase(n) {
	// 金额转大写=>调用方法:digitUppercase(n)    tip:形参是number类型 金额
	const fraction = ['角', '分'];
	const digit = [
		'零', '壹', '贰', '叁', '肆',
		'伍', '陆', '柒', '捌', '玖'
	];
	const unit = [
		['元', '万', '亿'],
		['', '拾', '佰', '仟']
	];
	n = Math.abs(n);
	let s = '';
	for (let i = 0; i < fraction.length; i++) {
		s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
	}
	s = s || '整';
	n = Math.floor(n);
	for (let i = 0; i < unit[0].length && n > 0; i++) {
		let p = '';
		for (let j = 0; j < unit[1].length && n > 0; j++) {
			p = digit[n % 10] + unit[1][j] + p;
			n = Math.floor(n / 10);
		}
		s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
	}
	return s.replace(/(零.)*零元/, '元')
		.replace(/(零.)+/g, '零')
		.replace(/^整$/, '零元整');
}


function intToChinese(n) {
	// 阿拉伯数字转化为中文数字=>调用方法:intToChinese(n)    tip:形参是number类型
	const str = String(n);
	const len = str.length - 1;
	const idxs = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
	const num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
	return str.replace(/([1-9]|0+)/g, ($, $1, idx, full) => {
		let pos = 0;
		if ($1[0] !== '0') {
			pos = len - idx;
			if (idx == 0 && $1[0] == 1 && idxs[len - idx] == '十') {
				return idxs[len - idx];
			}
			return num[$1[0]] + idxs[len - idx];
		} else {
			let left = len - idx;
			let right = len - idx + $1.length;
			if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
				pos = left - left % 4;
			}
			if (pos) {
				return idxs[pos] + num[$1[0]];
			} else if (idx + $1.length >= len) {
				return '';
			} else {
				return num[$1[0]]
			}
		}
	});
}


// 当前时间=>函数末尾是调用方法
Date.prototype.format = function(formatStr) {
	var str = formatStr;
	var Week = ["日", "一", "二", "三", "四", "五", "六"];
	str = str.replace(/yyyy|YYYY/, this.getFullYear());
	str = str.replace(
		/yy|YY/,
		this.getYear() % 100 > 9 ?
		(this.getYear() % 100).toString() :
		"0" + (this.getYear() % 100)
	);
	str = str.replace(
		/MM/,
		this.getMonth() + 1 > 9 ?
		(this.getMonth() + 1).toString() :
		"0" + (this.getMonth() + 1)
	);
	str = str.replace(/M/g, this.getMonth() + 1);
	str = str.replace(/w|W/g, Week[this.getDay()]);
	str = str.replace(
		/dd|DD/,
		this.getDate() > 9 ? this.getDate().toString() : "0" + this.getDate()
	);
	str = str.replace(/d|D/g, this.getDate());
	str = str.replace(
		/hh|HH/,
		this.getHours() > 9 ? this.getHours().toString() : "0" + this.getHours()
	);
	str = str.replace(/h|H/g, this.getHours());
	str = str.replace(
		/mm/,
		this.getMinutes() > 9 ?
		this.getMinutes().toString() :
		"0" + this.getMinutes()
	);
	str = str.replace(/m/g, this.getMinutes());
	str = str.replace(
		/ss|SS/,
		this.getSeconds() > 9 ?
		this.getSeconds().toString() :
		"0" + this.getSeconds()
	);
	str = str.replace(/s|S/g, this.getSeconds());
	return str;
};
// 或
Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(), //day
		"h+": this.getHours(), //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		S: this.getMilliseconds() //millisecond
	};
	if (/(y+)/.test(format))
		format = format.replace(
			RegExp.$1,
			(this.getFullYear() + "").substr(4 - RegExp.$1.length)
		);
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(
				RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
			);
	}
	return format;
};
// 各种格式均可
console.log(new Date().format("yyyy"));
console.log(new Date().format("yyyy-MM"));
console.log(new Date().format("yyyy-MM-dd"));
console.log(new Date().format("yyyy-MM-dd hh"));
console.log(new Date().format("yyyy-MM-dd hh:mm"));
console.log(new Date().format("yyyy-MM-dd hh:mm:ss"));


// 计算数组总和  数组支持多维数组比如: sumCount([1, 2, 3, [1, 2, [1, 2, [1,2,4],3]]])  ==>>计算得22
function sumCount(arr) {
	let result = [];
	for (let i = 0; i < arr.length; i++) {
		if (Array.isArray(arr[i])) {
			result = result.concat(sumCount(arr[i]));
		} else {
			result.push(arr[i]);
		}
	}
	return result.reduce((prev, curr) => {
		const value = Number(curr);
		if (!isNaN(value)) {
			return prev + curr;
		} else {
			return prev;
		}
	}, 0);
}
