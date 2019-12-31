const rgb2hex = (rgb) => {
  const rgbArray = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*.?\d+))?\)$/);
  const hex = (x) => ("0" + parseInt(x).toString(16)).slice(-2);
  // Currently ignores alpha value
  return "#" + hex(rgbArray[1]) + hex(rgbArray[2]) + hex(rgbArray[3]);
};