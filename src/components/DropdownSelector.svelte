<script lang="ts">
    import Select from 'svelte-select';

    export var items: string[];
    export var value = items[0];

    function handleSelect(event) {
      value = event.detail.value;
    }
</script>


<div class="selector">
    <form>
        <Select {items} {value} isClearable={false} isSearchable={false} on:select={handleSelect}></Select>
    </form>
</div>


<style lang="scss">

.selector {
  --background: #efe2c1;
  --borderRadius: 6px;
  --listRight: 200;
  --selectedItemPadding: 0 20px 0 0;
  --indicatorColor: black;
  display: inline-block;
  line-height: 1.6;
}

form {
  background: #f4f4f4;
  border-radius: 4px;
  font-weight: bold;
  display: inline-block;
  position:relative !important;
}

</style>