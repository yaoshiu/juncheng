<script lang="ts" module>
  import Database from '@tauri-apps/plugin-sql';

  const db = await Database.load('sqlite:test.db');

  await db.execute(`CREATE TABLE IF NOT EXISTS bills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  await db.execute(`CERATE TABLE IF NOT EXISTS products (
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

  const bills = await db.select('SELECT * FROM bills ORDER BY modified DESC');

  console.log(bills);
</script>

<script lang="ts">
  $effect(() => {
    return () => {
      db.close();
    };
  });
</script>
