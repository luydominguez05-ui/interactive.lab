
(() => {
  const codeNode = document.getElementById("code-source");
  const fileNameNode = document.getElementById("code-filename");
  const languageNode = document.getElementById("code-language");
  const tabs = [...document.querySelectorAll(".code-tab")];
  const files = {
    app: { path: "js/app.js", label: "js/app.js", language: "JAVASCRIPT · SOURCE" },
    logic: { path: "js/logic-chamber.js", label: "js/logic-chamber.js", language: "JAVASCRIPT · SOURCE" },
    data: { path: "js/data-universe.js", label: "js/data-universe.js", language: "JAVASCRIPT · SOURCE" },
    html: { path: "index.html", label: "index.html", language: "HTML · SOURCE" },
    css: { path: "css/style.css", label: "css/style.css", language: "CSS · SOURCE" }
  };

  async function displayFile(key) {
    const file = files[key];
    if (!file) return;
    tabs.forEach(tab => {
      const active = tab.dataset.file === key;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    fileNameNode.textContent = file.label;
    languageNode.textContent = file.language;
    codeNode.textContent = "Loading source…";
    try {
      const response = await fetch(file.path);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      // textContent prevents the fetched source from being interpreted as HTML.
      codeNode.textContent = await response.text();
    } catch (error) {
      codeNode.textContent = `Could not load this file (${error.message}).\\n\\nRun interactive lab through a local HTTP server, such as VS Code Live Server or: python -m http.server 8000`;
    }
  }

  tabs.forEach(tab => tab.addEventListener("click", () => displayFile(tab.dataset.file)));
  displayFile("app");
})();
