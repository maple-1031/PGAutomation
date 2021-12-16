
chrome.browserAction.onClicked.addListener(function(tab) {
    window.open("http://127.0.0.1:8090", "child", "width=1440,height=900");
	chrome.tabs.sendMessage(tab.id, "Action");
});