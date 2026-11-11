/* Application shell: navigation, dialog lifecycle and personal links. */
(() => {
  const backdrop = document.getElementById("modal-backdrop");
  const content = document.getElementById("modal-content");
  const title = document.getElementById("modal-title");
  const kicker = document.getElementById("modal-kicker");
  const closeButton = document.getElementById("close-modal");

  const PROFILE = {
    github: "https://github.com/luydominguez05-ui",
    email: "lucydominguezperales@icloud.com"
  };
  document.getElementById("github-link").href = PROFILE.github;
  document.getElementById("email-link").href = "mailto:" + PROFILE.email;

  window.closeModal = () => {
    backdrop.hidden = true;
    content.innerHTML = "";
    if (window.DataUniverse) DataUniverse.destroy();
  };

  function openModule(module) {
    backdrop.hidden = false;
    if (module === "logic") {
      kicker.textContent = "MODULE 01 / THINK & SOLVE";
      title.textContent = "Logic Chamber";
      LogicChamber.render(content);
    } else if (module === "data") {
      kicker.textContent = "MODULE 02 / MODEL & EXPLORE";
      title.textContent = "Data Universe";
      DataUniverse.render(content);
    }
    closeButton.focus();
  }

  document.querySelectorAll("[data-open]").forEach(button => {
    button.addEventListener("click", () => openModule(button.dataset.open));
  });
  closeButton.addEventListener("click", closeModal);
  backdrop.addEventListener("click", event => {
    if (event.target === backdrop) closeModal();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !backdrop.hidden) closeModal();
  });
})();
