<script lang="ts">
  import type { UserPersona } from "src/api";

  import DropdownSelector from "./DropdownSelector.svelte";

  export var userPersona: UserPersona;
  export var chapter: number;

  const userPersonaItems = ['-1','1', '2', '3', '4', '5', '6', '7', '8'];
  const chapterItems = ['A', 'B', 'C'];

  let selectedUserPersona: string;
  let selectedChapter: string = 'A';

  $: userPersona = parseInt(selectedUserPersona);
  $: chapter = parseInt(selectedChapter);
</script>

<div class="content">
  <div class="controls">
    <div>
      <span>USER PERSONA</span>
      <DropdownSelector bind:value={selectedUserPersona} items={userPersonaItems}/>
    </div>
    <div>
      <span>CHAPTER</span>
      <DropdownSelector bind:value={selectedChapter} items={chapterItems}/>
    </div>
  </div>
</div>


<style lang="scss">
  .content {
    text-align:center;
  }

  .controls {
    display: flex;
    column-gap: 40px;
    justify-content: center;
    font-weight: 100;
    font-size: 1.2rem;
    padding-left: 10px;
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 20px;
    > div {
      display: flex;
      column-gap: 20px;
      align-items: center;
    }
  }
</style>