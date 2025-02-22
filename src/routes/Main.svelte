<script lang="ts">
  import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card';
  import Database from '@tauri-apps/plugin-sql';

  interface Bill {
    id: number;
    name: string;
    modified: string;
  }

  let database: Database | null = null;

  Database.load('sqlite:database.db').then(async (db) => {
    database = db;

    await db.execute(`CREATE TABLE IF NOT EXISTS bills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      modified DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    await db.execute(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )`);

    await db.execute(`CREATE TABLE IF NOT EXISTS bill_products (
      bill_id INTEGER,
      product_id INTEGER,
      price DECIMAL(10, 2),
      quantity INTEGER DEFAULT 1,
      PRIMARY KEY (bill_id, product_id),
      FOREIGN KEY (bill_id) REFERENCES bills(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )`);
  });
</script>

{#if database}
  {#await database.select<Bill[]>('SELECT * FROM bills ORDER BY modified DESC') then bills}
    {#each bills as bill}
      <Card>
        <CardHeader>
          <CardTitle>{bill.name}</CardTitle>
        </CardHeader>
        <CardFooter>
          <p>{bill.modified}</p>
        </CardFooter>
      </Card>
    {/each}
  {/await}
{/if}
