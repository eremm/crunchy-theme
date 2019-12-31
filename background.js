chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ colors: ['#3aa757', '#ff0000', '#000000'] }, function () {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'www.crunchyroll.com', schemes: ['https'] },
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});