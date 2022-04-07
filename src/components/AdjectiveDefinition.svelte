<script type="ts">
  export let color: string;
  export let option: string;
  export let definition: string;
</script>

<div>

  <div class="adj-input">
    <div class="adj-color" style="background: {color};"></div>
    <div class="adj-name">{option}: </div>
    <div class="adj-description">{definition}</div>
  </div>

</div>

<style>
  .adj-input {
    font-size: 1.1125rem;
    line-height: 1.667rem;
    font-weight: 300;
    display: inline-block;
    padding: 5px;
  }
  .adj-color {
    width: 15px;
    height: 15px;
    display: inline-flex;
    border-radius: 3px;
    border: solid 0.5px gray;
    vertical-align: middle;

  }
  .adj-name {
    font-weight: bold;
    display: inline;
    padding-bottom: 5px;
  }
  .adj-description {
    display: inline;
    padding-bottom: 5px;
  }
</style>