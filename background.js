var ar = "ذضصثقفغعهخحجدشسيبلاتنمكطئءؤرﻻىةوزظ";
var en = "`qwertyuiop[]asdfghjkl;'zxcvbnm,./";

function sendNotification(title, body) {

}

function isAr(str) {
	var arC = 0,
		enC = 0;

	for (var i = 0, len = str.length; i < len; i++) {
		var enIndex = en.indexOf(str[i]);
		var arIndex = ar.indexOf(str[i]);
		if (enIndex > 0) enC++;
		if (arIndex > 0) arC++;
	}

	if (arC > enC) return 'ar';
	if (arC < enC) return 'en';
	return 'none';
}

function copyToClipboard(str) {
	document.oncopy = function(event) {
		event.clipboardData.setData('text/plain', str);
		event.preventDefault();
	};
	document.execCommand("Copy", false, null);
}

function replaceSelectedText(str, tab) {
	chrome.tabs.sendRequest(tab.id, {
		method: "replaceText",
		replacementText: str
	}, function(response) {
		console.log(response.data);
	});

}

function convertStr(str) {
	var wrongWord = str;

	var lang = isAr(wrongWord);
	//console.log(lang);

	if (lang == 'none') {

	} else {
		var rightWord = "";
		console.log("Word " + wrongWord + " was clicked.");
		for (var i = 0, len = wrongWord.length; i < len; i++) {
			var c = wrongWord[i];
			var index = (lang == 'ar' ? ar : en).indexOf(c);
			if (index != -1) {
				rightWord += (lang == 'ar' ? en : ar)[index];
				//console.log(ar[index]);
			} else {
				rightWord += c;
				//console.log("no match c:"+c);
			}
			//console.log("c:"+c+" ,index:"+index);
		}
		return rightWord;
	}
}


function correctMe(info, tab) {
	var before = info.selectionText;
	var after = convertStr(info.selectionText);
	if (info.editable) {
		//replaceSelectedText(after, tab);
	} else {
		copyToClipboard(after);
	}

	chrome.tabs.sendRequest(tab.id, {
		method: "showBubble",
		afterText: after,
		beforeText:before
	});

}

chrome.contextMenus.create({
	title: "wppgd - CorrectMe",
	contexts: ["selection"],
	onclick: correctMe,
});