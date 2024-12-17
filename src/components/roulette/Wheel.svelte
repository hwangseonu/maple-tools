<script lang="ts">
  import { jobColors } from "$lib/jobs";

  export let items: { [key: string]: number };
  export let isSpinning = false;

  $: sum = Object.values(items).reduce((acc, prev) => acc + prev, 0);

  const radius = 50;
  const center = 50;
  const labelRadius = radius * 0.6;

  let startAngle = 0;
  let wheelElement: SVGElement;
  let currentRotation = 0;
  let spinTransition = "";

  function getRandomSpins() {
    // 최소 15바퀴에서 25바퀴 사이로 늘림
    return 5400 + Math.floor(Math.random() * 3600); // 15~25 회전
  }

  function getRandomAngle() {
    return Math.floor(Math.random() * 360);
  }

  function resetWheel() {
    spinTransition = "none";
    currentRotation = 0;
    // Force reflow
    void wheelElement.offsetHeight;
  }

  function spinWheel() {
    const spins = getRandomSpins() + getRandomAngle();
    // 회전 시간을 8초로 늘리고, 탄력있는 감속을 위해 cubic-bezier 값 수정
    spinTransition = `transform 8s cubic-bezier(0.32, 0, 0.23, 0.99)`;
    currentRotation = spins;
  }

  function toggleSpin() {
    isSpinning = !isSpinning;
    if (isSpinning) {
      resetWheel();
      setTimeout(spinWheel, 0);
    }
  }

  function calculatePathData(percentage: number) {
    const endAngle = startAngle + percentage * 2 * Math.PI;
    const largeArcFlag = percentage > 0.5 ? 1 : 0;

    const startX = center + radius * Math.cos(startAngle);
    const startY = center + radius * Math.sin(startAngle);
    const endX = center + radius * Math.cos(endAngle);
    const endY = center + radius * Math.sin(endAngle);

    const pathData = `M ${center} ${center} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

    const middleAngle = startAngle + percentage * Math.PI;
    const labelX = center + labelRadius * Math.cos(middleAngle);
    const labelY = center + labelRadius * Math.sin(middleAngle);

    startAngle = endAngle;

    return {
      path: pathData,
      labelX,
      labelY,
      angle: (middleAngle * 180) / Math.PI,
    };
  }
</script>

<div class="wheel-container">
  <svg bind:this={wheelElement} width="400" height="400" viewBox="0 0 100 100">
    <g
      class="wheel"
      style="transform: rotate({currentRotation}deg); transition: {spinTransition}"
    >
      {#each Object.entries(items) as [key, value]}
        {@const segment = calculatePathData(value / sum)}
        <path d={segment.path} fill={jobColors[key]} />

        <text
          x={segment.labelX}
          y={segment.labelY}
          text-anchor="middle"
          dominant-baseline="middle"
          fill="white"
          font-size="4"
          transform="rotate({segment.angle > 90 && segment.angle < 270
            ? segment.angle + 180
            : segment.angle}, {segment.labelX}, {segment.labelY})"
        >
          {key}
        </text>
      {/each}
    </g>
  </svg>
</div>

<button
  on:click={toggleSpin}
  disabled={currentRotation > 0 && spinTransition !== "none"}
>
  {isSpinning ? "Spinning..." : "Spin"}
</button>

<style>
  .wheel-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }

  text {
    font-family: Arial, sans-serif;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  }

  .wheel {
    transform-origin: center;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s;
  }

  button:hover:not(:disabled) {
    background-color: #45a049;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
