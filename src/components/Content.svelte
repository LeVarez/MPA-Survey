<script lang="ts">
  import type { Token } from "src/text/parse";
  import SentenceEl from "./SentenceEl.svelte";

  type SentenceFn = (sentenceId: string, el: HTMLSpanElement) => void;

  export let onMouseDownSentence: SentenceFn = () => null;
  export let onMouseEnterSentence: SentenceFn = () => null;

  export let content: Token[];
  export let sentenceHighlights: {[gid: string]: string};

  const getSentenceProps = ({text, gid}: {text: string, gid: string}): SentenceEl['$$prop_def'] => {
    return {
      text: text,
      highlightColor: sentenceHighlights[gid] || null,
      onMouseDown: onMouseDownSentence.bind(null, gid),
      onMouseEnter: onMouseEnterSentence.bind(null, gid),
    };
  };
</script>

<div class="content">
  {#each content as token}

    {#if token.type === 'heading'}
      {#if token.depth === 1}
        <h1><SentenceEl {...getSentenceProps(token)} /></h1>
      {:else if token.depth === 2}
        <h2><SentenceEl {...getSentenceProps(token)} /></h2>
      {:else}
        <h3><SentenceEl {...getSentenceProps(token)} /></h3>
      {/if}

    {:else if token.type === 'paragraph'}
    <p>
      {#each token.children as child, i}
        {#if child.type === 'sentence'}
          <SentenceEl {...getSentenceProps(child)} />
        {/if}
        {#if i < token.children.length - 1 }{' '}{/if}
      {/each}
    </p>

    {:else if token.type === 'ul'}
      <ul>
        {#each token.children as child}
          {#if child.type === 'li'}
            <li>
              <SentenceEl {...getSentenceProps(child)} />
            </li>
          {/if}
        {/each}
      </ul>
    {/if}

  {/each}



</div>


<style lang="scss">
  .content {
    font-size: 18px;
    line-height: 1.6;
    user-select: none;
    h1 {
      font-weight: 500;
    }
    h2 {
      font-weight: 500;
    }
  }
</style>