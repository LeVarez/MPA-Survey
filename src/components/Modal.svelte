<script lang="ts">
  import { onDestroy } from "svelte";
  import Button from "./Button.svelte";

  export let isOpen: boolean;
  export let title: string = null;
  export let message: string;
  export let onConfirm: () => void;
  export let onCancel: () => void;
  export let onClose: () => void;

  onDestroy(() => {
    onClose();
  });

</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
      {#if title}
        <h2>{title}</h2>
      {/if}
      <p>{message}</p>
      <div class="actions">
        <Button on:click="{onConfirm}">OK</Button>
        <Button on:click="{onCancel}">Cancel</Button>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    /* allow click-through to backdrop */
    pointer-events: none;
  }

  .contents {
    min-width: 240px;
    border-radius: 6px;
    padding: 20px 30px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
  }

  h2 {
    text-align: center;
    font-size: 24px;
  }

  p {
    text-align: center;
    margin-top: 16px;
    font-size: 20px;
    line-height: 1.5;
  }

  .actions {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    column-gap: 20px;
    > :global(.button) {
      flex: 1;
      font-size: 1.5rem;
    }
  }
</style>