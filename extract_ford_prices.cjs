const fs = require('fs');

const data = fs.readFileSync('ford_prices.html', 'utf8');
const models = [];
const regex = /<tr[^>]*>[\s\S]*?<td[^>]*>[\s\S]*?(?:<a[^>]*>)?\s*([^<]+?)\s*(?:<\/a>)?\s*<\/td>[\s\S]*?<td[^>]*>([\d,]+)\s*บาท<\/td>[\s\S]*?<\/tr>/g;
let match;
while ((match = regex.exec(data)) !== null) {
    const name = match[1].trim();
    const price = parseInt(match[2].replace(/,/g, ''), 10);
    if (name && price > 100000 && !models.find(m => m.name === name) && !name.includes('บาท')) {
        models.push({ name, price });
    }
}
console.log(JSON.stringify(models, null, 2));
console.log(`Total models found: ${models.length}`);
