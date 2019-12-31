// Establishes a listener to react upon receiving a theme change event
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'GET_CURRENT_THEME': {
      const theme = getThemeColors();
      sendResponse({ data: theme });
      break;
    }
    case 'CHANGE_THEME': {
      const { theme } = message;
      changeTheme(theme);
      sendResponse({ message: 'Theme updated!', theme });
      break;
    }
  }
});