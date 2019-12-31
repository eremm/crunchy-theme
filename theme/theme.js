// TODO: Get theme hex colors based on active tab's url
const getThemeColors = () => {
  return getCrunchyrollThemeElements()
    .map((elements) => elements[0])
    .map((element) => getComputedStyle(element).backgroundColor)
    .map((color) => color.includes('rgb') ? rgb2hex(color) : color);
};

// Query content script's listeners for page's current theme
const getCurrentCrunchyrollTheme = async () => {
  const themes = [];
  const tab = (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
  await chrome.tabs.sendMessage(tab.id, { type: 'GET_CURRENT_THEME' }, (response) => {
    themes.push(response.data);
  });
  return themes[0]; // Just need the active tab's theme; message was only sent to 1 tab (the active one)
}


// TODO: Apply theme specified for url; currently only/always attempts Crunchyroll
const changeTheme = (theme) => {
  getCrunchyrollThemeElements().forEach((elements, idx) => {
    elements.forEach((element) => {
      element.style.backgroundColor = theme[idx];
    })
  });
};

// Send message from popup to content script's listeners, to change the theme
const popupChangeTheme = async (theme) => {
  const tab = (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
  await chrome.tabs.sendMessage(tab.id, { type: 'CHANGE_THEME', theme });
};

