const getCrunchyrollThemeElements = () => ([
  [ // Primary-colored elements
    ...document.getElementsByTagName('body'),
  ],
  [ // Secondary-colored elements
    ...document.getElementsByClassName('site-header'),
    ...document.getElementsByClassName('template-container')
  ],
  [ // Tertiary-colored elements
    ...[...document.getElementsByClassName('group-item')].flatMap(
      (item) => [...item.getElementsByTagName('a')]
    ),
    ...document.getElementsByClassName('white-wrapper'),
    ...document.getElementsByClassName('header-searchbox'),
    ...document.getElementsByClassName('availability-notes-low'),
    ...document.getElementsByClassName('guestbook-form'),
    ...document.getElementsByClassName('guestbook-sort-bar'),
    ...document.getElementsByClassName('message-container'),
    ...document.getElementsByClassName('reply-form'),
  ],
]);

const getCurrentCrunchyrollTheme = async () => {
  const getThemeColors = () => {
    const rgb2hex = (rgb) => {
      const rgbArray = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*.?\d+))?\)$/);
      const hex = (x) => ("0" + parseInt(x).toString(16)).slice(-2);
      // Currently ignores alpha value
      return "#" + hex(rgbArray[1]) + hex(rgbArray[2]) + hex(rgbArray[3]);
    };
    return getCrunchyrollThemeElements()
      .map((elements) => elements[0])
      .map((element) => getComputedStyle(element).backgroundColor)
      .map((color) => color.includes('rgb') ? rgb2hex(color) : color);
  };

  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const themes = await chrome.tabs.executeScript(
    tabs[0].id,
    { code: '(' + getThemeColors.toString() + ')();' },
  );

  return themes[0];
}

const changeTheme = (theme) => {
  getCrunchyrollThemeElements().forEach((elements, idx) => {
    elements.forEach((element) => {
      element.style.backgroundColor = theme[idx];
    })
  });
};

const changeCrunchyrollTheme = (theme) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: `theme = ${JSON.stringify(theme)};` },
      () => chrome.tabs.executeScript(
        tabs[0].id,
        { code: '(' + (() => changeTheme(theme)).toString() + ')();' },
      )
    );
  });
};

