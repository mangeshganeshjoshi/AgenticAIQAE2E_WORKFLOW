const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), 'tests');
const changes = [
  ["page.getByLabel('First Name')", "page.locator('[data-test=firstName]')"],
  ["page.getByLabel('Last Name')", "page.locator('[data-test=lastName]')"],
  ["page.getByLabel('Zip/Postal Code')", "page.locator('[data-test=postalCode]')"],
  ["page.locator('text=Sauce Labs Bolt T-Shirt')", "page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bolt T-Shirt' })"],
  ["page.locator('text=Sauce Labs Backpack')", "page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' })"],
  ["page.locator('text=Sauce Labs Bike Light')", "page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bike Light' })"],
  ["page.locator('text=Sauce Labs Fleece Jacket')", "page.locator('.inventory_item_name', { hasText: 'Sauce Labs Fleece Jacket' })"],
];

function walk(dir) {
  fs.readdirSync(dir).forEach((name) => {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) return walk(p);
    if (p.endsWith('.ts')) {
      let text = fs.readFileSync(p, 'utf8');
      let newText = text;
      changes.forEach(([oldv, newv]) => {
        newText = newText.split(oldv).join(newv);
      });
      if (newText !== text) {
        fs.writeFileSync(p, newText, 'utf8');
        console.log('Updated', p);
      }
    }
  });
}

walk(root);
