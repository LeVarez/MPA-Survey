<script lang="ts">
  import { getIcon } from "src/svg";

  export var name: string;

  const icon = getIcon(name);
</script>

{@html icon}
