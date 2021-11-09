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
    return arrJ.filter(function (item) {
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}
// *******************************************************************************************************


function flatNum(arr, falsTruE) {
    // 数组扁平化=>调用方法:flatNum(arr)    tip:形参是多维数组且，
    // 第二个值为true时，可将返回数组去重后的结果(不能去除空对象);
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