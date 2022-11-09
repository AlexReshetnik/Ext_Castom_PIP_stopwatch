function injectedFunction() {
    document.body.style.backgroundColor = 'orange';
    alert("dfg")
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: injectedFunction
    });
});