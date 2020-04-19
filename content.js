//alert('Grrr.')
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

	console.log(res)
	sendResponse({url: res});
})