<script lang="ts">
  import Menubar from '$lib/components/menubar';
  import { Tabs, TabsContent } from '$lib/components/ui/tabs';

  import Main from './Main.svelte';

  let tab = $state.raw('main');

  let tabs = $state([]);
</script>

<Menubar editable={tab !== 'main'} />
<Tabs bind:value={tab}>
  <TabsContent value="main"><Main /></TabsContent>
</Tabs>
