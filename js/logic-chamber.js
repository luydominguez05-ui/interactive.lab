/* LOGIC CHAMBER
 * A small, deterministic challenge engine. Each challenge stores its prompt,
 * answer options, correct answer and explanatory feedback as data.
 */
window.LogicChamber = (() => {
  const challenges = [
    {
      category: "PATTERN RECOGNITION",
      prompt: "What number completes the sequence?",
      sequence: "2  —  4  —  8  —  16  —  ?",
      options: ["24", "30", "32", "36"],
      answer: "32",
      explanation: "Correct. Each term is multiplied by 2: 2, 4, 8, 16, 32."
    },
    {
      category: "CONDITIONAL LOGIC",
      prompt: "A system grants access only when BOTH conditions are true: user is verified AND the access code is valid. The user is verified, but the code is invalid. What happens?",
      sequence: "verified = TRUE  /  codeValid = FALSE",
      options: ["Access granted", "Access denied", "System restarts", "Cannot determine"],
      answer: "Access denied",
      explanation: "Correct. The AND operator returns true only when both conditions are true."
    },
    {
      category: "ALGORITHMIC THINKING",
      prompt: "A process must run steps A, B and C in order. Step C depends on the result of B. Which order is valid?",
      sequence: "A → ? → ?",
      options: ["C → A → B", "B → C → A", "A → B → C", "A → C → B"],
      answer: "A → B → C",
      explanation: "Correct. A runs first, B produces the input needed by C, and then C can execute."
    }
  ];

  function render(container) {
    let current = 0;
    let score = 0;
    let selected = null;
    let locked = false;

    function draw() {
      const item = challenges[current];
      const complete = current >= challenges.length;
      if (complete) {
        container.innerHTML = `
          <div class="challenge-meta"><span>CHAMBER COMPLETE</span><span>${score} / ${challenges.length} CORRECT</span></div>
          <h3 class="challenge-prompt">${score === 3 ? "Excellent work, explorer." : "Challenge sequence complete."}</h3>
          <p class="feedback good">You worked through pattern recognition, conditional logic and algorithmic sequencing. These are foundational tools for breaking problems into clear, testable steps.</p>
          <div class="action-row"><button class="primary-button" id="logic-restart">RUN AGAIN</button><button class="secondary-button" id="logic-home">BACK TO NEXUS</button></div>`;
        container.querySelector("#logic-restart").addEventListener("click", () => { current = 0; score = 0; selected = null; locked = false; draw(); });
        container.querySelector("#logic-home").addEventListener("click", closeModal);
        return;
      }

      container.innerHTML = `
        <div class="challenge-meta"><span>CHALLENGE ${String(current + 1).padStart(2, "0")} / ${challenges.length}</span><span>${score} POINT${score === 1 ? "" : "S"}</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${(current / challenges.length) * 100}%"></div></div>
        <div class="module-index">${item.category}</div>
        <p class="challenge-prompt">${item.prompt}</p>
        <div class="control" style="margin-bottom:16px;text-align:center"><strong style="font:500 18px var(--mono);color:var(--cyan)">${item.sequence}</strong></div>
        <div class="answer-grid">${item.options.map(option => `<button class="answer-option" data-answer="${option.replace(/"/g, "&quot;")}">${option}</button>`).join("")}</div>
        <p class="feedback" id="logic-feedback" aria-live="polite">Select an answer, then check your reasoning.</p>
        <div class="action-row"><button class="primary-button" id="logic-check" disabled>CHECK ANSWER</button><button class="secondary-button" id="logic-next" hidden>NEXT CHALLENGE →</button></div>`;

      const check = container.querySelector("#logic-check");
      const feedback = container.querySelector("#logic-feedback");
      container.querySelectorAll("[data-answer]").forEach(button => {
        button.addEventListener("click", () => {
          if (locked) return;
          selected = button.dataset.answer;
          container.querySelectorAll("[data-answer]").forEach(b => b.classList.toggle("selected", b === button));
          check.disabled = false;
        });
      });
      check.addEventListener("click", () => {
        if (!selected || locked) return;
        locked = true;
        const correct = selected === item.answer;
        if (correct) score++;
        feedback.textContent = (correct ? "✓ " : "↗ ") + item.explanation;
        feedback.className = "feedback " + (correct ? "good" : "bad");
        check.hidden = true;
        container.querySelector("#logic-next").hidden = false;
      });
      container.querySelector("#logic-next").addEventListener("click", () => {
        current++; selected = null; locked = false; draw();
      });
    }
    draw();
  }
  return { render };
})();
