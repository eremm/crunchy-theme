const colorWells = [...document.getElementsByTagName('input')];
const [saveButton, cancelButton] = document.getElementsByTagName('button');

const lighter = (color) => pSBC(0.5, color);

let currentTheme;
let storedTheme;

(async () => {
  currentTheme = await getCurrentCrunchyrollTheme();
  await chrome.storage.sync.get('colors', ({ colors }) => {
    storedTheme = colors;
  });

  colorWells.forEach((well, idx) => {
    well.value = currentTheme[idx];
    well.style.backgroundColor = lighter(currentTheme[idx]);
  });

  saveButton.style.backgroundColor = lighter(currentTheme[0]);
  saveButton.style.borderColor = currentTheme[0];

  cancelButton.style.backgroundColor = lighter(storedTheme[0]);
  cancelButton.style.borderColor = storedTheme[0];

  const handleEvent = (event) => {
    const color = event.target.value;
    const idx = event.target.id.slice(-1);
    if (currentTheme[idx] != color) {
      currentTheme[idx] = color;
      colorWells[idx].style.backgroundColor = lighter(color);
      if (idx == 0) {
        saveButton.style.backgroundColor = lighter(color);
        saveButton.style.borderColor = color;
      }
      changeCrunchyrollTheme(currentTheme);
    }
  };

  colorWells.forEach((well) => {
    well.oninput = (event) => handleEvent(event);
    well.onchange = (event) => handleEvent(event);
  });

  saveButton.onclick = () => {
    if (JSON.stringify(storedTheme) !== JSON.stringify(currentTheme)) {
      chrome.storage.sync.set({ colors: currentTheme })
      storedTheme = currentTheme;
    }
    window.close();
  };

  cancelButton.onclick = () => {
    if (JSON.stringify(currentTheme) !== JSON.stringify(storedTheme)) {
      changeCrunchyrollTheme(storedTheme);
    }
    window.close();
  };

})();
