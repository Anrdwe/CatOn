//alert("cat")
chrome.runtime.onMessage.addListener(function (request) {
    alert(request)
})