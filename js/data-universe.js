/* DATA UNIVERSE
 * A deterministic illustrative model (not real company data).
 * The sliders change the assumptions; metrics and chart are recalculated.
 */
window.DataUniverse = (() => {
  let chart = null;

  function calculate(volume, processing, quality) {
    // Illustrative efficiency model. Values are intentionally bounded by the UI.
    const capacity = volume * (60 / processing);
    const efficiency = Math.min(100, Math.round((quality / 100) * 100 * (60 / processing) / 2.4));
    const completed = Math.round(capacity * (quality / 100));
    const errorRate = 100 - quality;
    return { capacity: Math.round(capacity), efficiency, completed, errorRate };
  }

  function render(container) {
    container.innerHTML = `
      <p class="chart-note" style="margin-top:0">Adjust the variables to explore how operational assumptions affect a simulated workflow. This is an illustrative model, not real business data.</p>
      <div class="data-controls">
        <div class="control"><label for="volume">INCOMING TASKS <output id="volume-value">120</output></label><input id="volume" type="range" min="40" max="240" step="10" value="120"></div>
        <div class="control"><label for="processing">PROCESSING TIME <output id="processing-value">5 min</output></label><input id="processing" type="range" min="2" max="12" step="1" value="5"></div>
        <div class="control"><label for="quality">QUALITY RATE <output id="quality-value">92%</output></label><input id="quality" type="range" min="60" max="100" step="1" value="92"></div>
        <div class="control"><label>MODEL STATUS</label><strong style="color:var(--green);font:11px var(--mono)">● LIVE RECALCULATION</strong><p style="color:var(--muted);font-size:10px;margin-bottom:0">Change any slider to update the model.</p></div>
      </div>
      <div class="metrics">
        <div class="metric"><span>EST. CAPACITY</span><strong id="capacity">—</strong><small>TASKS / HR</small></div>
        <div class="metric"><span>COMPLETED</span><strong id="completed">—</strong><small>TASKS / HR</small></div>
        <div class="metric"><span>EFFICIENCY INDEX</span><strong id="efficiency">—</strong><small id="error-rate">— ERROR RATE</small></div>
      </div>
      <div class="chart-wrap"><canvas id="universe-chart" aria-label="Simulated workflow output chart"></canvas></div>
      <p class="chart-note">Model logic: estimated capacity = incoming tasks × (60 ÷ processing time). Completed tasks are adjusted by the quality rate. The efficiency index is a simplified comparative indicator.</p>
      <div class="action-row" style="margin-top:15px"><button class="secondary-button" id="data-reset">RESET PARAMETERS</button></div>`;

    const get = id => container.querySelector("#" + id);
    const inputs = ["volume", "processing", "quality"];
    const update = () => {
      const volume = Number(get("volume").value);
      const processing = Number(get("processing").value);
      const quality = Number(get("quality").value);
      get("volume-value").textContent = volume;
      get("processing-value").textContent = processing + " min";
      get("quality-value").textContent = quality + "%";
      const result = calculate(volume, processing, quality);
      get("capacity").textContent = result.capacity.toLocaleString();
      get("completed").textContent = result.completed.toLocaleString();
      get("efficiency").textContent = result.efficiency + "%";
      get("error-rate").textContent = result.errorRate + "% ERROR RATE";
      const baseline = [volume * 0.75, volume * 0.88, result.completed, result.capacity];
      if (chart) {
        chart.data.datasets[0].data = baseline;
        chart.update();
      } else if (window.Chart) {
        chart = new Chart(get("universe-chart"), {
          type: "line",
          data: {
            labels: ["Baseline A", "Baseline B", "Completed", "Capacity"],
            datasets: [{ data: baseline, borderColor: "#65e4ff", backgroundColor: "rgba(101,228,255,.12)", fill: true, tension: .35, pointRadius: 4, pointBackgroundColor: "#a99aff" }]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { backgroundColor: "#142238", titleColor: "#e9f1ff", bodyColor: "#e9f1ff" } },
            scales: {
              x: { ticks: { color: "#91a1b9", font: { family: "DM Mono", size: 9 } }, grid: { color: "rgba(145,161,185,.08)" } },
              y: { beginAtZero: true, ticks: { color: "#91a1b9", font: { family: "DM Mono", size: 9 } }, grid: { color: "rgba(145,161,185,.08)" } }
            }
          }
        });
      }
    };
    inputs.forEach(id => get(id).addEventListener("input", update));
    get("data-reset").addEventListener("click", () => {
      get("volume").value = 120; get("processing").value = 5; get("quality").value = 92; update();
    });
    update();
  }

  function destroy() {
    if (chart) { chart.destroy(); chart = null; }
  }
  return { render, destroy };
})();
