<script lang="ts">
  import { Modals } from 'svelte-modals';
  import AnalysisPage from './components/AnalysisPage.svelte';
  import SurveyPage from './components/SurveyPage.svelte';

  const getHashBang = () => {
    return window.location.hash.substr(1);
  };

</script>

{#if getHashBang() === 'analysis'}
  <AnalysisPage />
{:else}
  <SurveyPage />
{/if}

<Modals>
  <div
    slot="backdrop"
    class="backdrop"
  />
</Modals>

<style lang="scss">
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.60)
  }
</style>