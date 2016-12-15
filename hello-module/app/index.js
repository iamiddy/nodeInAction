// app/index.js
var Currency = require('./currency');

var changeToday = 0.91;

var currency = new Currency(changeToday);

var change = currency.canadianToUs(100);

console.log(`100 Canadian Dollar equal to this amount of USD ${change} `);






