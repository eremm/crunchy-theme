const getCurrentCrunchyrollTheme = async () => {
  const getThemeColors = () => {
    const rgb2hex = (rgb) => {
      const rgbArray = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+.?\d+))?\)$/);
      const hex = (x) => ("0" + parseInt(x).toString(16)).slice(-2);
      // Currently ignores alpha value
      return "#" + hex(rgbArray[1]) + hex(rgbArray[2]) + hex(rgbArray[3]);
    };
    const primaryColor = getComputedStyle(document.body).backgroundColor;
    const secondaryColor = '#ff0000';
    return [primaryColor, secondaryColor].map(
      (c) => c.includes('rgb') ? rgb2hex(c) : c
    );
  };

  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const themes = await chrome.tabs.executeScript(
    tabs[0].id,
    { code: '(' + getThemeColors.toString() + ')();' },
  );

  return themes[0];
}

const changeCrunchyrollBackground = (color) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: 'document.body.style.backgroundColor = "' + color + '";' }
    );
  });
};

