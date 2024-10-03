console.log("Preload script has loaded!"); // This will log if the preload script is loaded

window.addEventListener('DOMContentLoaded', () => {
  console.log("DOM content has loaded!");

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
