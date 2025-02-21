<script lang="ts">
  import Menubar from '$lib/components/menubar';
  import { Tabs, TabsContent } from '$lib/components/ui/tabs';

  let tab = $state.raw('main');

  let tabs = $state([]);
</script>

<Menubar editable={tab !== 'main'} />
<Tabs bind:value={tab}>
  <TabsContent value="main"></TabsContent>
</Tabs>
