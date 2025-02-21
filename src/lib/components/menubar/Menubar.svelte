<script lang="ts">
  import {
    Menubar,
    MenubarContent,
    MenubarMenu,
    MenubarTrigger,
  } from '$lib/components/ui/menubar';
  import Item from './Item.svelte';

  interface Props {
    editable: boolean;
  }

  const { editable }: Props = $props();

  const file = [
    {
      name: '新建标签页',
      shortcut: '<c-t>',
      action() {
        console.log('新建标签页');
      },
    },
    {
      name: '新建窗口',
      shortcut: '<c-n>',
      action() {},
    },
    {
      name: '保存',
      shortcut: '<c-s>',
      disabled: !editable,
      action() {},
    },
    {
      name: '另存为',
      shortcut: '<c-S>',
      disabled: !editable,
      action() {},
    },
  ];

  const edit = [
    {
      name: '撤销',
      shortcut: '<c-z>',
      disabled: !editable,
      action() {},
    },
    {
      name: '重做',
      shortcut: '<c-Z>',
      disabled: !editable,
      action() {},
    },
  ];
</script>

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>文件</MenubarTrigger>
    <MenubarContent>
      {#each file as props}
        <Item {...props} />
      {/each}
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>编辑</MenubarTrigger>
    <MenubarContent>
      {#each edit as props}
        <Item {...props} />
      {/each}
    </MenubarContent>
  </MenubarMenu>
</Menubar>
