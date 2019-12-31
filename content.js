// This content script will be executed on page load of matching sites
(async () => {
  let storedTheme;

  await chrome.storage.sync.get('colors', ({ colors }) => {
    storedTheme = colors;
  });

  changeTheme(storedTheme);
})();