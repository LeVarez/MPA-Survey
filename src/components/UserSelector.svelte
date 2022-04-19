<script lang="ts">
  import Button from "./Button.svelte";
  import { setCookie, getCookie } from "src/util";
  import DropdownSelector from "./DropdownSelector.svelte";

  export var userPersona: string[];
  export var selectionCompleted: boolean;

  const userPersonaItems = ['an MPA planner', 'an MPA manager', 'a community organizer', 'LMMA practitioner'];
  const objectiveItems = ['answers', 'examples', 'case studies', 'tools'];
  const objectiveVerbItems = ['enable', 'evaluate'];
  const actionSubjectItems = ['I need to make','my team will make','my government needs to make'];

  let typeUser: string;
  let objective: string;
  let objectiveVerb: string;
  let actionSubject: string;
  let userPersonaCookie = getCookie('userPersona');
  console.log(userPersonaCookie);
  if(userPersonaCookie !== '') {
    let tempParsedCookie = JSON.parse(userPersonaCookie);
    typeUser = tempParsedCookie[0];
    objective = tempParsedCookie[1];
    objectiveVerb = tempParsedCookie[2];
    actionSubject = tempParsedCookie[3];
  }
  $: userPersona = [typeUser, objective, objectiveVerb, actionSubject];

</script>

<div class="content">
  <div class="text">
    I am <DropdownSelector bind:value={typeUser} items={userPersonaItems}/> and
    want help finding <DropdownSelector bind:value={objective} items={objectiveItems}/> to
    <DropdownSelector bind:value={objectiveVerb} items={objectiveVerbItems}/> decisions
    <DropdownSelector bind:value={actionSubject} items={actionSubjectItems}/> .
  </div>

  <Button on:click={() => {selectionCompleted = true; setCookie('userPersona', JSON.stringify(userPersona));}}>Next</Button>
</div>

  <style lang="scss">

    .content {
      text-align: center;
    }

    .text {
      font-weight: 100;
      font-size: 1.2rem;
      padding-left: 10px;
      font-size: 18px;
      line-height: 3;
      margin-bottom: 50px;
    }

  </style>
