<script lang="ts">
  import type { Token } from '../text/parse';
  import FeedbackPopup from './FeedbackPopup.svelte';
  import { Relevance, highlightColors, selectColor } from '../relevance';
  import { feedback } from '../stores';
  import Content from './Content.svelte';

  export let content: Token[];

  let selectedSentence: { ids: Set<string>, x: number, y: number, selecting?: boolean };

  const getXY = (el: HTMLElement) => {
    const { left, right, top } = el.getBoundingClientRect();
    const mid = (left + right) / 2;
    return {
      x: mid + window.scrollX,
      y: top + window.scrollY,
    };
  };

  const addToSelection = (id: string, el: HTMLSpanElement) => {
    selectedSentence.ids.add(id);
    const { x, y } = getXY(el);
    if (y < selectedSentence.y) {
      selectedSentence = {
        ...selectedSentence,
        x, y
      };
    }
  };

  const onClickGlobal = () => {
    if (selectedSentence && selectedSentence.selecting && selectedSentence.ids.size > 0) {
      selectedSentence.selecting = false;
    }
    else {
      selectedSentence = null;
    }
    content = content;
  };

  const onRecvFeedback = (ids: string[], type: Relevance) => {
    ids.forEach(id => {
      if (type === null) {
        feedback.clear(id);
      }
      else {
        feedback.set(id, type);
      }
    });
    selectedSentence = null;
    content = content;
  };

  const onMouseDownSentence: Content['$$prop_def']['onMouseDownSentence'] = (sentenceId, el) => {
    selectedSentence = {
      ids: new Set<string>([sentenceId]),
      selecting: true,
      ...getXY(el)
    };
    content = content;
  };

  const onMouseEnterSentence: Content['$$prop_def']['onMouseEnterSentence'] = (sentenceId, el) => {
    if (selectedSentence && selectedSentence.selecting) {
      addToSelection(sentenceId, el);
      content = content;
    }
  };

  const hasFeedback = (_selectedSentence: typeof selectedSentence) => {
    return [..._selectedSentence.ids].some(id => !!$feedback[id]);
  };

  const onMouseDownText = () => {
    if (!selectedSentence) {
      selectedSentence = {
        ids: new Set<string>(),
        x: Infinity,
        y: Infinity,
        selecting: true,
      };
    }
    content = content;
  };

  let sentenceHighlights: Content['$$prop_def']['sentenceHighlights'] = {};
  $: {
    sentenceHighlights = {};
    Object.entries($feedback).forEach(([gid, highlight]) => {
      sentenceHighlights[gid] = highlightColors[highlight];
    });
    if (selectedSentence) {
      selectedSentence.ids.forEach((id) => {
        sentenceHighlights[id] = selectColor;
      });
    }
    content = content;
  }


</script>

<svelte:window on:click={onClickGlobal} />

<div class="text" on:mousedown={onMouseDownText}>
  <Content {content} {sentenceHighlights} {onMouseDownSentence} {onMouseEnterSentence} />
</div>

{#if selectedSentence && !selectedSentence.selecting}
  <FeedbackPopup
    {...selectedSentence}
    on:feedback={e => onRecvFeedback([...selectedSentence.ids], e.detail.type)}
    hasFeedback={hasFeedback(selectedSentence)}
  />
{/if}
