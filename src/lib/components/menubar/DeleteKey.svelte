<script lang="ts">
  import { cn } from '$lib/utils';
  import { Delete, type IconProps } from 'lucide-svelte';
  const { class: className, ...props }: IconProps = $props();
</script>

<Delete class={cn(className, 'transform rotate-180')} {...props} />
