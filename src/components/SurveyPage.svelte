<script lang="ts">
  import SurveyContent from './SurveyContent.svelte';
  import { chapter } from '../text';
  import UserSelector from './UserSelector.svelte';
  import { feedback, updateFeedback } from '../stores';
  import Button from './Button.svelte';
  import { sendReview, UserPersona } from 'src/api';
  import Page from './Page.svelte';
  import { openModal, closeModal } from 'svelte-modals';
  import Modal from './Modal.svelte';
  import AdjectiveDefinition from './AdjectiveDefinition.svelte';
  import { Relevance, highlightColors, relevanceOptions } from "src/relevance";

  const setCookie = (name, value, days = 7, path = '/') => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path;
  };

  const getCookie = (name) => {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  };

  const deleteCookie = (name, path) => {
    setCookie(name, '', -1, path);
  };

  let currentChapter: number;
  let chapterCookie = getCookie('chapter');
  currentChapter = parseInt(chapterCookie);
  if(chapterCookie === '') {
    currentChapter = Math.floor(Math.random() * 3);
    setCookie('chapter', currentChapter);
  }

  let fb = getCookie('feedback');
  if(fb !== '')updateFeedback(JSON.parse(fb));

  const description = "Important! The chapter you’re about to read a draft, it has yet to be revised and copyedited. \
  It’s not intended for distribution. Because the objective of our platform is enabling your decision-making, we want \
  to understand what content is the most relevant for your job.";

  const adjectiveData : [Relevance, string][] = [
    [
      Relevance.Irrelevant,
      'If you don’t really need this information because it’s obvious or doesn’t apply to you.'
    ],
    [
      Relevance.Interesting,
      'If it’s something that’s worth mentioning or reminding but is not necessarily surprising or needed.'
    ],
    [
      Relevance.Relevant,
      'If it’s information that helps you solve a problem or make a better decision.'
    ],
    [
      Relevance.Crucial,
      `If it’s something fundamental to your decision making,
      that can change the way you though about the question or problem.`
    ],
  ];

  let userPersona:string[];
  let userPersonaSelected = false;
  let submitting = false;

  $: {
    setCookie('feedback', JSON.stringify($feedback));
  }
  const sendResults = async () => {
    submitting = true;
    openModal(Modal, {
      message: 'Are you sure you wish to submit your review?',
      onConfirm: async () => {
        closeModal();
        try {
          await sendReview({userPersona: UserPersona.TEST, review:  {...$feedback}, madlib: userPersona, chapterId: currentChapter});
          window.location.href = './thankyou.html';
        } catch (err) {
          console.error(err);
          // TODO: display error
          submitting = false;
        }
      },
      onCancel: () => {
        closeModal();
        submitting = false;
      },
      onClose() {
        submitting = false;
      }
    });
  };
</script>

<Page>
  <main>
    {#if !userPersonaSelected}
      <UserSelector bind:userPersona={userPersona} bind:selectionCompleted={userPersonaSelected}/>
    {:else}
      {#each adjectiveData as [relevance, definition]}
        <AdjectiveDefinition
          color={highlightColors[relevance]}
          option={relevanceOptions[relevance]}
          {definition}
        />
      {/each}
      <div class="disclaimer">
        <div class="content">{description}</div>
      </div>
      <SurveyContent content={chapter[currentChapter]}/>
      <div class="center">
        <Button on:click={sendResults} loading={submitting}>Submit</Button>
      </div>
    {/if}
  </main>
</Page>

<style>
  .center {
    text-align: center;
    margin-bottom: 50px;
    margin-top: 50px;
  }
  .disclaimer{
    font-size: 1.1125rem;
    line-height: 1.667rem;
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 80px;
    margin-top: 10px;
    background-color: rgb(209, 209, 209);
  }
  .disclaimer .content{
    padding: 10px;
  }
</style>
