import pathlib

root = pathlib.Path('tests')
changes = [
    ("page.getByLabel('First Name')", "page.locator('[data-test=firstName]')"),
    ("page.getByLabel('Last Name')", "page.locator('[data-test=lastName]')"),
    ("page.getByLabel('Zip/Postal Code')", "page.locator('[data-test=postalCode]')"),
    ("page.locator('text=Sauce Labs Bolt T-Shirt')", "page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bolt T-Shirt' })"),
]

for path in root.rglob('*.ts'):
    text = path.read_text(encoding='utf-8')
    new_text = text
    for old, new in changes:
        new_text = new_text.replace(old, new)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        print(f'Updated {path}')
