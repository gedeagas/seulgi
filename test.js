const franc = require('franc');

const lang = franc('can i marry you', { minLength: 3, whitelist: ['eng', 'ind'] });
console.log(lang);