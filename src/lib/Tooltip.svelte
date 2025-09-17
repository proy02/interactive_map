<script>
    export let x = 0;
    export let y = 0;
    export let content = "";
  
    const OFFSET = 12; // distance from cursor
</script>
  
{#if content}
    <div
        class="tooltip"
        style="
        top: {Math.min(
            y + OFFSET,
            window.innerHeight - 40  // keep inside bottom edge
        )}px;
        left: {Math.min(
            x + OFFSET,
            window.innerWidth - 160  // keep inside right edge
        )}px;
        "
    >
        {content}
    </div>
{/if}

<style>
    .tooltip {
        position: fixed;
        max-width: 150px;
        padding: 6px 10px;
        font-size: 13px;
        line-height: 1.4;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        border-radius: 4px;
        pointer-events: none;
        z-index: 100;
        white-space: normal;
    }
</style>