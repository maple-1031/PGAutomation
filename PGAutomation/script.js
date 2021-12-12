function hoge() {
    console.log("oxoxoxo");
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("onmessage:", request);
        if (request == "Action") {
            console.log("Action");
            hoge();
        }
    });

$(window).on("load", function () {
    // window.open("192.168.1.18:8090", "child", "width=1600,height=900");
});