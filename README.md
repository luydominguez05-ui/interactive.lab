# Interactive Lab

A compact, English-language interactive web experience featuring two modules:
- **Logic Chamber:** three short challenges covering pattern recognition, conditional logic and algorithmic sequencing.
- **Data Universe:** an illustrative operational simulation with adjustable parameters, live metrics and a Chart.js visualization.

## Run locally

No build tools or package installation are required.

1. Download and extract the project.
2. Open the project folder in Visual Studio Code (recommended).
3. Start a local static server. With the VS Code **Live Server** extension, right-click `index.html` and choose **Open with Live Server**.
4. Alternatively, if Python is installed, run this command from the project folder:

   ```bash
   python -m http.server 8000
   ```

   Then visit `http://localhost:8000`.

Opening `index.html` directly may work, but a local server is recommended for consistent browser behavior.

## Test checklist

- Open both modules from the landing page.
- Complete all three Logic Chamber challenges; verify the final score and restart button.
- In Data Universe, move each slider and confirm the metrics and chart update.
- Reset the Data Universe controls.
- Close the dialog using the close button, clicking the backdrop, and pressing Escape.
- Test at a narrow mobile viewport.

## Personalize before publishing

Open `js/app.js` and update:

```js
const PROFILE = {
  github: "https://github.com/YOUR_USERNAME",
  email: "YOUR_EMAIL@example.com"
};
```

You can also edit the page title, closing copy and footer in `index.html`.

## Publish with GitHub Pages

1. Create a GitHub repository, for example `interactive-lab`.
2. Upload the contents of this folder to the repository root (so `index.html` is at the root).
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Wait for GitHub Pages to publish and open the generated URL.
7. Test the published URL on a phone before generating the QR code.

## Technical notes

- The project uses vanilla JavaScript and separates the application shell from each interactive module.
- Data Universe loads Chart.js from jsDelivr. An internet connection is required for the chart library; the metrics still update in the browser.
- The simulation uses synthetic, illustrative values. It does not represent real company or customer data.
- No personal data is collected and no backend is required.
- The Google Fonts and Chart.js CDN references can be replaced with local assets if a fully offline build is needed.

## Suggested next improvements

1. Add keyboard focus management and a more complete accessible dialog pattern.
2. Add a short completion summary and optional progress persistence.
3. Add automated tests for the challenge logic and calculation model.
4. Add a small technical "How it works" panel to make the implementation decisions visible to reviewers.


## Source code viewer

The page includes a read-only source explorer. It fetches `app.js`, `logic-chamber.js`, `data-universe.js`, `index.html` and `style.css` from the same origin and renders them with `textContent`, so the code is displayed as text and is not executed by the viewer. It requires a local HTTP server or GitHub Pages; it will not work reliably when opening the HTML file directly from the filesystem.


## Technical Breakdown section

The landing page includes a Technical Breakdown section with four expandable cards: (1) Logic Chamber challenge engine and state flow, (2) Data Universe input-to-metric calculation flow, (3) application file structure and separation of concerns, and (4) engineering principles, scope and limitations. The section documents the current implementation and distinguishes synthetic simulation values from real operational data.
