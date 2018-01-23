/*
 * Copyright 2005-2014 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * 
 * JavaScript - Common
 * Version: 4.0
 */

var shopxx = {
	base: "",
	locale: "zh_CN",
	theme: "default"
};

var setting = {
	priceScale: 2,
	priceRoundType: "roundHalfUp",
	currencySign: "￥",
	currencyUnit: "元",
	uploadImageExtension: "jpg,jpeg,bmp,gif,png",
	uploadFlashExtension: "swf,flv",
	uploadMediaExtension: "swf,flv,mp3,wav,avi,rm,rmvb",
	uploadFileExtension: "zip,rar,7z,doc,docx,xls,xlsx,ppt,pptx"
};

var messages = {
	"shop.message.success": "操作成功",
	"shop.message.error": "操作错误",
	"shop.dialog.ok": "确 定",
	"shop.dialog.cancel": "取 消",
	"shop.dialog.deleteConfirm": "您确定要删除吗？",
	"shop.dialog.clearConfirm": "您确定要清空吗？",
	"shop.validate.required": "必填",
	"shop.validate.email": "E-mail格式错误",
	"shop.validate.url": "网址格式错误",
	"shop.validate.date": "日期格式错误",
	"shop.validate.dateISO": "日期格式错误",
	"shop.validate.pointcard": "信用卡格式错误",
	"shop.validate.number": "只允许输入数字",
	"shop.validate.digits": "只允许输入零或正整数",
	"shop.validate.minlength": "长度不允许小于{0}",
	"shop.validate.maxlength": "长度不允许大于{0}",
	"shop.validate.rangelength": "长度必须在{0}-{1}之间",
	"shop.validate.min": "不允许小于{0}",
	"shop.validate.max": "不允许大于{0}",
	"shop.validate.range": "必须在{0}-{1}之间",
	"shop.validate.accept": "输入后缀错误",
	"shop.validate.equalTo": "两次输入不一致",
	"shop.validate.remote": "输入错误",
	"shop.validate.integer": "只允许输入整数",
	"shop.validate.positive": "只允许输入正数",
	"shop.validate.negative": "只允许输入负数",
	"shop.validate.decimal": "数值超出了允许范围",
	"shop.validate.pattern": "格式错误",
	"shop.validate.extension": "文件格式错误"
};

// 添加Cookie
function addCookie(name, value, options) {
	if (arguments.length > 1 && name != null) {
		if (options == null) {
			options = {};
		}
		if (value == null) {
			options.expires = -1;
		}
		if (typeof options.expires == "number") {
			var time = options.expires;
			var expires = options.expires = new Date();
			expires.setTime(expires.getTime() + time * 1000);
		}
		if (options.path == null) {
			options.path = "/";
		}
		if (options.domain == null) {
			options.domain = "";
		}
		document.cookie = encodeURIComponent(String(name)) + "=" + encodeURIComponent(String(value)) + (options.expires != null ? "; expires=" + options.expires.toUTCString() : "") + (options.path != "" ? "; path=" + options.path : "") + (options.domain != "" ? "; domain=" + options.domain : "") + (options.secure != null ? "; secure" : "");
	}
}

// 获取Cookie
function getCookie(name) {
	if (name != null) {
		var value = new RegExp("(?:^|; )" + encodeURIComponent(String(name)) + "=([^;]*)").exec(document.cookie);
		return value ? decodeURIComponent(value[1]) : null;
	}
}

// 移除Cookie
function removeCookie(name, options) {
	addCookie(name, null, options);
}

// Html转义
function escapeHtml(str) {
	return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// 字符串缩略
function abbreviate(str, width, ellipsis) {
	if ($.trim(str) == "" || width == null) {
		return str;
	}
	var i = 0;
	for (var strWidth = 0; i < str.length; i++) {
		strWidth = /^[\u4e00-\u9fa5\ufe30-\uffa0]$/.test(str.charAt(i)) ? strWidth + 2 : strWidth + 1;
		if (strWidth >= width) {
			break;
		}
	}
	return ellipsis != null && i < str.length - 1 ? str.substring(0, i) + ellipsis : str.substring(0, i);
}

// 货币格式化
function currency(value, showSign, showUnit) {
	if (value != null) {
		var price;
		if (setting.priceRoundType == "roundHalfUp") {
			price = (Math.round(value * Math.pow(10, setting.priceScale)) / Math.pow(10, setting.priceScale)).toFixed(setting.priceScale);
		} else if (setting.priceRoundType == "roundUp") {
			price = (Math.ceil(value * Math.pow(10, setting.priceScale)) / Math.pow(10, setting.priceScale)).toFixed(setting.priceScale);
		} else {
			price = (Math.floor(value * Math.pow(10, setting.priceScale)) / Math.pow(10, setting.priceScale)).toFixed(setting.priceScale);
		}
		if (showSign) {
			price = setting.currencySign + price;
		}
		if (showUnit) {
			price += setting.currencyUnit;
		}
		return price;
	}
}

// 多语言
function message(code) {
	if (code != null) {
		var content = messages[code] != null ? messages[code] : code;
		if (arguments.length == 1) {
			return content;
		} else {
			if ($.isArray(arguments[1])) {
				$.each(arguments[1], function(i, n) {
					content = content.replace(new RegExp("\\{" + i + "\\}", "g"), n);
				});
				return content;
			} else {
				$.each(Array.prototype.slice.apply(arguments).slice(1), function(i, n) {
					content = content.replace(new RegExp("\\{" + i + "\\}", "g"), n);
				});
				return content;
			}
		}
	}
}



(function($) {

	var zIndex = 100;
	
	// 检测登录
	$.checkLogin = function() {
		var result = false;
		$.ajax({
			url: shopxx.base + "/login/check.jhtml",
			type: "GET",
			dataType: "json",
			cache: false,
			async: false,
			success: function(data) {
				result = data;
			}
		});
		return result;
	}
	
	// 跳转登录
	$.redirectLogin = function (redirectUrl, message) {
		var href = shopxx.base + "/login.jhtml";
		if (redirectUrl != null) {
			href += "?redirectUrl=" + encodeURIComponent(redirectUrl);
		}
		if (message != null) {
			$.message("warn", message);
			setTimeout(function() {
				location.href = href;
			}, 1000);
		} else {
			location.href = href;
		}
	}
	
	// 消息框
	var $message;
	var messageTimer;
	$.message = function() {
		var message = {};
		if ($.isPlainObject(arguments[0])) {
			message = arguments[0];
		} else if (typeof arguments[0] === "string" && typeof arguments[1] === "string") {
			message.type = arguments[0];
			message.content = arguments[1];
		} else {
			return false;
		}
		
		if (message.type == null || message.content == null) {
			return false;
		}
		
		if ($message == null) {
			$message = $('<div class="xxMessage"><div class="messageContent message' + escapeHtml(message.type) + 'Icon"><\/div><\/div>');
			if (!window.XMLHttpRequest) {
				$message.append('<iframe class="messageIframe"><\/iframe>');
			}
			$message.appendTo("body");
		}
		
		$message.children("div").removeClass("messagewarnIcon messageerrorIcon messagesuccessIcon").addClass("message" + message.type + "Icon").html(message.content);
		$message.css({"margin-left": - parseInt($message.outerWidth() / 2), "z-index": zIndex ++}).show();
		
		clearTimeout(messageTimer);
		messageTimer = setTimeout(function() {
			$message.hide();
		}, 3000);
		return $message;
	}

})(jQuery);

$().ready(function() {
	


	var $window = $(window);
	var $goTop = $('<div class="goTop"><\/div>').appendTo("body");
	var $top = $('<a href="javascript:;" class="gotoTop">&nbsp;<\/a>').appendTo($goTop);
	var $addFavorite = $('<a href="javascript:;" class="favourite">&nbsp;<\/a>').appendTo($goTop);
	var $qqTalk = $('<a class="qq-talk" target="_blank" href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODAyODczNF8zMjIwNzVfNDAwNzAwMzQ1Nl8yXw">&nbsp;<\/a>').appendTo($goTop);
	var $headerCartQuantity = $("#headerCart span");
	// 返回顶部
	$window.scroll(function() {
		if($window.scrollTop() > 100) {
			$goTop.fadeIn();
		} else {
			$goTop.fadeOut();
		}
	});
	
	// 返回顶部
	$top.click(function() {
		$("body, html").animate({scrollTop: 0});
	});
	
	// 添加收藏
	$addFavorite.click(function() {
		var title = document.title;
		var url = document.url;
		if (document.all) {
			window.external.addFavorite(url, title);
		} else if (window.sidebar && window.sidebar.addPanel) {
			window.sidebar.addPanel(title, url, "");
		} else {
			alert("请使用 Ctrl+D 进行添加");
		}
	});
	
	// 显示购物车数量
	function showHeaderCartQuantity() {
		if ($headerCartQuantity.size() == 0) {
			return;
		}
		var cartQuantity = getCookie("cartQuantity");
		if (cartQuantity == null) {
			$.ajax({
				url: shopxx.base + "/cart/quantity.jhtml",
				type: "GET",
				dataType: "json",
				cache: false,
				global: false,
				success: function(data) {
					if ($headerCartQuantity.text() != data.quantity && "opacity" in document.documentElement.style) {
						$headerCartQuantity.fadeOut(function() {
							$headerCartQuantity.text(data.quantity).fadeIn();
						});
					} else {
						$headerCartQuantity.text(data.quantity);
					}
					addCookie("cartQuantity", data.quantity);
				}
			});
		} else {
			$headerCartQuantity.text(cartQuantity);
		}
	}
	
	showHeaderCartQuantity();
	
	// AJAX全局设置
	$.ajaxSetup({
		traditional: true
	});
	
	// 令牌
	$(document).ajaxSend(function(event, request, settings) {
		if (!settings.crossDomain && settings.type != null && settings.type.toLowerCase() == "post") {
			var token = getCookie("token");
			if (token != null) {
				request.setRequestHeader("token", token);
			}
		}
	});
	
	// 令牌
	$("form").submit(function() {
		var $this = $(this);
		if ($this.attr("method") != null && $this.attr("method").toLowerCase() == "post" && $this.find("input[name='token']").size() == 0) {
			var token = getCookie("token");
			if (token != null) {
				$this.append('<input type="hidden" name="token" value="' + token + '" \/>');
			}
		}
	});
	
	// 状态、购物车数量
	$(document).ajaxComplete(function(event, request, settings) {
		var tokenStatus = request.getResponseHeader("tokenStatus");
		var validateStatus = request.getResponseHeader("validateStatus");
		var loginStatus = request.getResponseHeader("loginStatus");
		if (tokenStatus == "accessDenied") {
			var token = getCookie("token");
			if (token != null) {
				$.extend(settings, {
					global: false,
					headers: {token: token}
				});
				$.ajax(settings);
			}
		} else if (validateStatus == "accessDenied") {
			$.message("warn", "非法字符");
		} else if (loginStatus == "accessDenied") {
			$.redirectLogin(location.href, "请登录后再进行操作");
		} else {
			var url = settings.url.indexOf("/") == 0 ? settings.url : location.pathname.substring(0, location.pathname.lastIndexOf("/")) + "/" + settings.url;
			if (url.indexOf(shopxx.base + "/register/") == 0 || url.indexOf(shopxx.base + "/login/") == 0 || url.indexOf(shopxx.base + "/cart/") == 0 || url.indexOf(shopxx.base + "/order/") == 0) {
				showHeaderCartQuantity();
			}
		}
	});

});

// 验证消息
if ($.validator != null) {

	$.extend($.validator.messages, {
		required: message("shop.validate.required"),
		email: message("shop.validate.email"),
		url: message("shop.validate.url"),
		date: message("shop.validate.date"),
		dateISO: message("shop.validate.dateISO"),
		pointcard: message("shop.validate.pointcard"),
		number: message("shop.validate.number"),
		digits: message("shop.validate.digits"),
		minlength: $.validator.format(message("shop.validate.minlength")),
		maxlength: $.validator.format(message("shop.validate.maxlength")),
		rangelength: $.validator.format(message("shop.validate.rangelength")),
		min: $.validator.format(message("shop.validate.min")),
		max: $.validator.format(message("shop.validate.max")),
		range: $.validator.format(message("shop.validate.range")),
		accept: message("shop.validate.accept"),
		equalTo: message("shop.validate.equalTo"),
		remote: message("shop.validate.remote"),
		integer: message("shop.validate.integer"),
		positive: message("shop.validate.positive"),
		negative: message("shop.validate.negative"),
		decimal: message("shop.validate.decimal"),
		pattern: message("shop.validate.pattern"),
		extension: message("shop.validate.extension")
	});
	
	$.validator.setDefaults({
		errorClass: "fieldError",
		ignore: ".ignore",
		ignoreTitle: true,
		errorPlacement: function(error, element) {
			var fieldSet = element.closest("span.fieldSet");
			if (fieldSet.size() > 0) {
				error.appendTo(fieldSet);
			} else {
				error.insertAfter(element);
			}
		},
		submitHandler: function(form) {
			$(form).find("input:submit").prop("disabled", true);
			form.submit();
		}
	});

}