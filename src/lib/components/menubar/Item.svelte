<script lang="ts" module>
  interface Shortcut {
    modifiers: ('ctrl' | 'meta' | 'shift' | 'alt')[];
    key: string;
  }

  export function parseShortcut(shortcut: string): Shortcut | null {
    const match = shortcut.match(/^<(.*)>$/);
    if (match) {
      const content = match[1];
      const parts = content.split('-');
      if (parts.length === 0) return null;

      const key = parts.pop()!;
      let modifiers = parts;

      if (/^[A-Z]$/.test(key)) {
        modifiers = [...modifiers, 's'];
      }

      const mappedModifiers = modifiers
        .map((modifier) => {
          switch (modifier.toLowerCase()) {
            case 'c':
              return /Mac/.test(navigator.userAgent) ? 'meta' : 'ctrl';
            case 'm':
              return 'alt';
            case 's':
              return 'shift';
            default:
              return null;
          }
        })
        .filter((m) => m !== null);

      return {
        modifiers: Array.from(new Set(mappedModifiers)).sort(),
        key: key.toLowerCase(),
      };
    } else {
      if (shortcut.length !== 1) return null;
      const isUppercase = /^[A-Z]$/.test(shortcut);
      return {
        modifiers: isUppercase ? ['shift'] : [],
        key: shortcut.toLowerCase(),
      };
    }
  }
</script>

<script lang="ts">
  import {
    ArrowBigUp,
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    ChevronUp,
    CornerDownLeft,
    Delete,
    Option,
    Space,
    type Icon,
  } from 'lucide-svelte';
  import DeleteKey from './DeleteKey.svelte';
  import type { Component } from 'svelte';
  import { MenubarItem, MenubarShortcut } from '$lib/components/ui/menubar';

  interface Props {
    name: string;
    shortcut: string;
    action: () => void;
  }

  const { name, shortcut, action, ...props }: Props = $props();

  const icons: { [key: string]: typeof Icon | Component } = {
    ctrl: ChevronUp,
    meta: ChevronUp,
    shift: ArrowBigUp,
    alt: Option,
    space: Space,
    cr: CornerDownLeft,
    bs: Delete,
    del: DeleteKey,
    up: ArrowUp,
    down: ArrowDown,
    right: ArrowRight,
    left: ArrowLeft,
  };

  const iconProps = { size: 14 };

  const parsed = parseShortcut(shortcut);

  if (!parsed) {
    console.warn(`Invalid shortcut: ${shortcut}`);
  }
</script>

{#if !parsed}
  <MenubarItem {...props}>{name}</MenubarItem>
{:else}
  {@const { modifiers, key } = parsed}
  <MenubarItem {...props} onSelect={action}>
    {name}
    <MenubarShortcut class="flex items-center gap-1">
      {#each modifiers as modifier}
        {@const Icon = icons[modifier]}
        {#if Icon}
          <Icon {...iconProps} />
        {/if}
      {/each}
      {#if key in icons}
        {@const Icon = icons[key]}
        <Icon {...iconProps} />
      {:else}
        {key.toUpperCase()}
      {/if}
    </MenubarShortcut>
  </MenubarItem>
{/if}
