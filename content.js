(async () => {
  let storedTheme;

  await chrome.storage.sync.get('colors', ({ colors }) => {
    storedTheme = colors;
  });

  changeTheme(storedTheme);
})();