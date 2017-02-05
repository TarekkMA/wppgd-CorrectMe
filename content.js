// Add bubble to the top of the page.
var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'wppgd_bubble');
document.body.appendChild(bubbleDOM);

// Listen for messages from background script
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method === "showBubble") {
		var sel, range;
		if (window.getSelection) {
			sel = window.getSelection();
			if (sel.rangeCount) {
				range = sel.getRangeAt(0);
				rect = range.getBoundingClientRect();
				console.log(rect);
				renderBubble(rect.left, rect.top + window.pageYOffset - 25 , request.afterText);
				//range.deleteContents();
				//range.insertNode(document.createTextNode(request.text));
			}
		} else if (document.selection && document.selection.createRange) {
			console.log("OLD");
		}
	}
});

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, selection) {
	console.log("OK SHOWING IT");
	bubbleDOM.innerHTML = selection;
	bubbleDOM.style.top = mouseY + 'px';
	bubbleDOM.style.left = mouseX + 'px';
	bubbleDOM.style.visibility = 'visible';
}

//Close the bubble when we click outside the bubble.
document.addEventListener('mousedown', function(e) {
	if (bubbleDOM.contains(e.target) == false) {
		bubbleDOM.style.visibility = 'hidden';
	}
}, false);


// Lets listen to mouseup DOM events.
//document.addEventListener('mouseup', function(e) {
//	var selection = window.getSelection().toString();
//	if (bubbleDOM.contains(e.target) == false) {
//		if (selection.length > 0) {
//			renderBubble(e.clientX, e.clientY, selection);
//		}
//	}
//}, false);