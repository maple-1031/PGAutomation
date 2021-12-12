
chrome.browserAction.onClicked.addListener(function(tab) {
    window.open("http://192.168.1.18:8090", "child", "width=1440,height=900");
	chrome.tabs.sendMessage(tab.id, "Action");
});