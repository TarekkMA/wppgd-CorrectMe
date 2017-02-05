chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method === "replaceText") {
		var sel, range;
		if (window.getSelection) {
			sel = window.getSelection();
			if (sel.rangeCount) {
				range = sel.getRangeAt(0);
				range.deleteContents();
				range.insertNode(document.createTextNode(request.replacementText));
			}
		} else if (document.selection && document.selection.createRange) {
			range = document.selection.createRange();
			range.text = request.replacementText;
		}
	} else {
		sendResponse({});
	}
});