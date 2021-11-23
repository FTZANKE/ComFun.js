// 为元素添加on方法
Element.prototype.on = Element.prototype.addEventListener;
NodeList.prototype.on = function (event, fn) {
    []['forEach'].call(this, function (el) {
        el.on(event, fn);
    });
    return this;
};


// 为元素添加trigger方法
Element.prototype.trigger = function (type, data) {
    var event = document.createEvent("HTMLEvents");
    event.initEvent(type, true, true);
    event.data = data || {};
    event.eventName = type;
    event.target = this;
    this.dispatchEvent(event);
    return this;
};
NodeList.prototype.trigger = function (event) {
    []["forEach"].call(this, function (el) {
        el["trigger"](event);
    });
    return this;
};


// 转义html标签
function HtmlEncode(text) {
    return text
        .replace(/&/g, "&")
        .replace(/\"/g, '"')
        .replace(/</g, "<")
        .replace(/>/g, ">");
}


// HTML标签转义
function SaferHTML(templateData) {
    var s = templateData[0];
    for (var i = 1; i < arguments.length; i++) {
        var arg = String(arguments[i]);
        s += arg
            .replace(/&/g, "&")
            .replace(/</g, "<")
            .replace(/>/g, ">");
        s += templateData[i];
    }
    return s;
}
// 调用
// var html = SaferHTML`<p>这是关于字符串模板的介绍</p>`;


// 加入收藏夹
function addFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}