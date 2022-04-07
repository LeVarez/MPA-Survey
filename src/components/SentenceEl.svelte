<script lang="ts">
  export let highlightColor: string;
  export let text: string;
  export let onMouseDown: (el: EventTarget & HTMLSpanElement) => void;
  export let onMouseEnter: (el: EventTarget & HTMLSpanElement) => void;

  const onMouseDownSpan = (e: MouseEvent & { currentTarget: EventTarget & HTMLSpanElement }) => {
    onMouseDown(e.currentTarget);
  };

  const onMouseEnterSpan = (e: MouseEvent & { currentTarget: EventTarget & HTMLSpanElement }) => {
    onMouseEnter(e.currentTarget);
  };

</script>

<span
  class="sentence"
  style="background: {highlightColor};"
  on:mousedown={onMouseDownSpan}
  on:mouseenter={onMouseEnterSpan}
>
  {@html text}
</span>

<style lang="scss">
  @media (hover: hover) and (pointer: fine) {
    .sentence:hover {
        background: #eaf9fd;
        cursor: pointer;
    }
  }
</style>