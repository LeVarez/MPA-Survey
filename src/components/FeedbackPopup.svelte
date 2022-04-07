<script lang="ts">
  import { highlightColors, Relevance, relevanceOptions } from "src/relevance";

  export let x: number;
  export let y: number;
  export let hasFeedback: boolean;

  import { createEventDispatcher } from "svelte";
  import Icon from "./Icon.svelte";

  const dispatch = createEventDispatcher<{
    feedback: { type: Relevance }
  }>();

  const onClick = (type: Relevance) => {
    dispatch('feedback', {type});
  };

  const popupOptions = [
    Relevance.Irrelevant,
    Relevance.Interesting,
    Relevance.Relevant,
    Relevance.Crucial,
  ];

</script>

<div class="highlight-popup" style="left: {x}px; top: {y}px;">
  <div class="feedback-options">
    {#each popupOptions as relevance}
      <div style="--color: {highlightColors[relevance]}" on:click={() => onClick(relevance)}>{relevanceOptions[relevance]}</div>
    {/each}
  </div>
  {#if hasFeedback}
    <div class="clear-container">
      <div class="clear" on:click={() => onClick(null)}>
        <Icon name="trash" />
      </div>
    </div>
  {/if}
</div>

<style lang="scss">

  .feedback-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    > div {
      padding: 4px 7px;
      cursor: pointer;
      border-radius: 4px;
      display: flex;
      align-items: center;
      column-gap: 4px;
      &:before {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 1px;
        margin-bottom: 2px;
        background: var(--color);
      }


      &:hover {
        background: #444;
      }
    }
  }

  .clear-container {
    border-left: 1px solid #ffffff1a;
    padding: 5px;
    display: flex;
  }

  .clear {
    width: 20px;
    padding: 15px 10px;
    align-self: center;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    &:hover {
      background: #444;
    }
  }

  .highlight-popup {
    position: absolute;
    background: #333;
    border-radius: 4px;

    display: flex;
    column-gap: 5px;

    font-size: 18px;
    line-height: 1.4;
    padding: 5px;
    color: white;
    transform: translate(-50%, calc(-100% - 10px));
    z-index: 10;
    white-space: nowrap;

    &:after {
      content: '';
      display: block;
      z-index: 9;
      position: absolute;
      top: calc(100% - 1px);
      left: 50%;
      transform: translateX(-50%);

      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid #333;
    }

  }
</style>
