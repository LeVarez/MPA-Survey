<script lang="ts">
  import { scaleLinear } from 'd3-scale';
  import type { Token } from "src/text/parse";
  import Content from "./Content.svelte";
  import Page from "./Page.svelte";
  import { chapter } from '../text';
  import AnalysisUserSelector from './AnalysisUserSelector.svelte';
  import { getReviews, ServerReview, UserPersona } from '../api';
  import { onMount } from 'svelte';
  import { Relevance } from 'src/relevance';

  const scores: Record<Relevance, number> = {
    [Relevance.Irrelevant]: -1,
    [Relevance.Interesting]: 1,
    [Relevance.Relevant]: 2,
    [Relevance.Crucial]: 3,
  };

  const sentenceColor = scaleLinear<string>()
    .domain([-1, 3])
    .range(["#ed143daa", "#008000aa"]);

  let selectedUserPersona: UserPersona;
  let analysisDataset: ServerReview[];
  let chapterNum: number; // TODO: implement chapter selection
  let content: Token[] = chapter[0];
  let sentenceHighlights: Content['$$prop_def']['sentenceHighlights'] = {};

  onMount(async () =>{
    analysisDataset = await getReviews();
  });

  $: selectedUserPersona && analysisDataset && generateAnalysis();

  function generateAnalysis() {
    const submissions = analysisDataset.filter(review => review.userPersona === selectedUserPersona);

    const allFeedback: [string, Relevance][] = submissions
      .map(({review}) => Object.entries(review))
      .reduce((acc, curr) => acc.concat(curr), []);

    const scoresGrouped: { [id: string]: number[] } = {};
    allFeedback.forEach(([id, relevance]) => {
      scoresGrouped[id] = [...(scoresGrouped[id] || []), scores[relevance]];
    });

    const sentenceColors: {[id: string]: string} = {};
    Object.entries(scoresGrouped).forEach(([id, scores]) => {
      sentenceColors[id] = sentenceColor(scores.reduce((acc, curr) => acc + curr, 0) / scores.length);
    });

    sentenceHighlights = sentenceColors;
    content = content;
  }
</script>

<Page>
  <AnalysisUserSelector bind:chapter={chapterNum} bind:userPersona={selectedUserPersona}/>
  <Content {content} sentenceHighlights={sentenceHighlights}/>
</Page>
