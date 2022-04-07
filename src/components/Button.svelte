<script>
  import LoadingSpinner from "./LoadingSpinner.svelte";
  export let disabled = false;
  export let loading = false;
</script>

<button class="button" class:loading={loading} {disabled} on:click>
  {#if loading}
    <div class="spinner"><LoadingSpinner /></div>
  {/if}
  <div class="button-content">
    <slot/>
  </div>
</button>

<style lang="scss">
  button {
    position: relative;
    display: inline-block;
    border: 1px solid #747474;
    border-radius: 0.12em;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-size: 2rem;
    color: #575757;
    text-align: center;
    transition: all 0.2s;
    cursor: pointer;

    &:disabled {
      pointer-events: none;
    }

    &:hover {
      color: #000000;
      background-color: #FFFFFF;
    }

    &.loading .button-content {
      visibility: hidden;
    }
  }

  .button-content {
    padding: 0.35em 1.2em;
  }

  .spinner {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(0.4);
  }
</style>
