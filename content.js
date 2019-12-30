(async () => {
  let storedColor;

  await chrome.storage.sync.get('color', ({ color }) => {
    storedColor = color;
  });

  // document.body.style.backgroundColor = storedColor;

  [
    document.body,
    document.getElementsByClassName('site-header')[0],
  ]
    .forEach((element) => element.style.backgroundColor = storedColor);



})();