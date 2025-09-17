<script>
  export let breaks = [0, 100, 500, 1000, 5000, 10000, 20000, 36200];
  export let colors = [
    '#faebdd',
    '#f9b282',
    '#e34a33',
    '#b0175a',
    '#6a176e',
    '#2c105c',
    '#000004'
  ];
  export let legendValue = null;

  const min = breaks[0];
  const max = breaks[breaks.length - 1];

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function percentOfRange(v) {
    if (max === min) return 0;
    return ((v - min) / (max - min)) * 100;
  }

  // 🔑 Compute tick position using actual hovered value
  $: tickPercent =
    legendValue != null ? clamp(percentOfRange(Number(legendValue)), 0, 100) : null;

  // build smooth gradient (stops at class midpoints for visual consistency)
  $: gradient = (() => {
    const stops = [];
    for (let i = 0; i < colors.length; i++) {
      const mid = (breaks[i] + breaks[i + 1]) / 2;
      const p = clamp(percentOfRange(mid), 0, 100);
      stops.push(`${colors[i]} ${p.toFixed(2)}%`);
    }
    return `linear-gradient(to right, ${colors[0]} 0%, ${stops.join(", ")}, ${colors[colors.length - 1]} 100%)`;
  })();

  function formatNumber(num) {
    if (num == null) return "0";
    const n = parseInt(num, 10);
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    return n.toLocaleString();
  }

  $: console.debug("Legend props:", { min, max, legendValue, tickPercent });
</script>

<div class="legend" role="img" aria-label="Legend">
  <!-- 🔹 Title -->
  <div class="legend-title">Fire Activities – Aug. 26 to 28, 2025</div>
  <div class="legend-bar" style="background: {gradient}">
    {#each breaks as b}
      <div
        class="legend-break"
        style="left: {percentOfRange(b)}%"
        aria-hidden="true"
      ></div>
    {/each}

    {#if tickPercent !== null}
      <div
        class="legend-tick"
        style="left: {tickPercent}%"
        aria-hidden="true"
      >▼</div>
    {/if}
  </div>

  <div class="legend-labels" aria-hidden="true">
    <span>{formatNumber(min)}</span>
    <span>{formatNumber(max)}</span>
  </div>
</div>

<style>
  .legend {
    position: relative; /* instead of absolute */
    margin: 0 auto;
    width: 60%;
    font-family: "Courier New", Courier, monospace;
    pointer-events: none;
    text-align: center;
  }

  .legend-bar {
    position: relative;
    height: 14px;
    border-radius: 6px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.08);
    overflow: visible;
  }

  .legend-break {
    position: absolute;
    top: -3px;
    width: 1px;
    height: 20px;
    background: rgba(255,255,255,0.6);
    transform: translateX(-50%);
    pointer-events: none;
    opacity: 0.6;
  }

  .legend-tick {
    position: absolute;
    bottom: 100%; /* snug above bar */
    transform: translateX(-50%) translateY(-2px);
    font-size: 18px;
    color: #111;
    text-shadow: 0 1px 2px rgba(255,255,255,0.8);
    transition: left 160ms ease;
    z-index: 40;
    pointer-events: none;
  }

  .legend-labels {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-top: 6px;
    color: #333;
    pointer-events: none;
  }

  .legend-title {
    font-family: "Courier New", Courier, monospace;
    font-size: 14px;
    font-weight: normal;
    margin-bottom: 4px;
    text-align: center;
    color: #222;
    white-space: nowrap;       /* prevent wrapping */
    overflow: hidden;          /* hide overflow if text is too long */
    text-overflow: ellipsis;   /* show "..." if it’s too long */
  }

  @media (max-width: 768px) {
  .legend-title {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .legend-title {
    font-size: 11px;
  }
}
</style>