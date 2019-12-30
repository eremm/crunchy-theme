const colorWell = document.getElementById('color-well');
const [saveButton, cancelButton] = document.getElementsByTagName('button');
document.style
const lighter = (color) => pSBC(0.5, color);
let currentColor;
let storedColor;

(async () => {
  currentColor = (await getCurrentCrunchyrollTheme())[0];
  alert(currentTheme);
  await chrome.storage.sync.get('color', ({ color }) => {
    storedColor = color;
  });

  colorWell.value = currentColor;
  colorWell.style.backgroundColor = lighter(currentColor);
  saveButton.style.backgroundColor = lighter(currentColor);
  saveButton.style.borderColor = currentColor;

  cancelButton.style.backgroundColor = lighter(storedColor);
  cancelButton.style.borderColor = storedColor;

  const handleEvent = (event) => {
    const color = event.target.value;
    if (currentColor != color) {
      currentColor = color;
      colorWell.style.backgroundColor = lighter(currentColor);
      saveButton.style.backgroundColor = lighter(currentColor);
      saveButton.style.borderColor = currentColor;
      changeCrunchyrollBackground(currentColor);
    }
  };

  colorWell.oninput = (event) => handleEvent(event);
  colorWell.onchange = (event) => handleEvent(event);

  saveButton.onclick = () => {
    if (storedColor != currentColor) {
      // changeCrunchyrollBackground(currentColor);
      chrome.storage.sync.set({ color: currentColor })
      storedColor = currentColor;
    }
    window.close();
  };

  cancelButton.onclick = () => {
    if (currentColor != storedColor) {
      changeCrunchyrollBackground(storedColor);
    }
    window.close();
  };

})();
