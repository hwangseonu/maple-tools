<script lang="ts">
  import { jobColors } from "$lib/jobs";

  export let items: { [key: string]: number };
  export let isSpinning = false;

  $: sum = Object.values(items).reduce((acc, prev) => acc + prev, 0);

  const radius = 50;
  const center = 50;
  const labelRadius = radius * 0.6;

  let startAngle = -1/2 * Math.PI;
  let wheelElement: SVGElement;
  let currentRotation = 0;
  let spinTransition = "";

  let selected: string | undefined = undefined;

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
    if (isSpinning) return; // 이미 회전 중이면 아무 동작도 하지 않음
    isSpinning = true;
    resetWheel();
    setTimeout(spinWheel, 0);
    setTimeout(() => isSpinning = false, 8000); // 8초 후에 회전 완료
    setTimeout(() => console.log(getItemAtCurrentRotation()), 8000)
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

  function getItemAtCurrentRotation() {
    const anglePerSegment = 360 / sum; // 각 세그먼트가 차지하는 각도 (전체 각도 360도를 sum으로 나눔)
    const adjustedRotation = (currentRotation % 360 + 360) % 360; // currentRotation을 0~360 범위로 조정

    let accumulatedAngle = 0;

    // 각 아이템의 각도를 누적하여 현재 회전 각도에 해당하는 아이템을 찾음
    for (const [key, value] of Object.entries(items)) {
      const percentage = value / sum;
      const segmentAngle = percentage * 360;
      accumulatedAngle += segmentAngle;

      // 현재 회전 각도가 해당 세그먼트 범위에 속하는지 확인
      if (adjustedRotation >= accumulatedAngle - segmentAngle && adjustedRotation < accumulatedAngle) {
        return key; // 현재 회전 각도에 해당하는 아이템 반환
      }
    }

    return null; // 해당 아이템을 찾지 못한 경우
  }
</script>

<p>{ selected }</p>

<div class="wheel-container">
  <svg bind:this={wheelElement} width="400" height="400" viewBox="0 0 100 100">
    <g
      class="wheel"
      style="transform: rotate({currentRotation}deg); transition: {spinTransition}"
    >
      {#each Object.entries(items) as [key, value]}
        {@const segment = calculatePathData(value / sum)}
        <path d={segment.path} fill={jobColors[key]}/>

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
  disabled={currentRotation > 0 && spinTransition !== "none"}>
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
