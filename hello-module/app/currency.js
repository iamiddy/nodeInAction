// currency.js

const canadianDollar = 0.91;

function roundTwoDecimals(amount) {
    return Math.round(amount*100)/100;
}

function canadianToUs(canadian) {
    return roundTwoDecimals(canadian * canadianDollar);
}

function USToCanadian(us) {
  return roundTwoDecimals(us/canadianDollar);
}
 module.exports.USToCanadian = USToCanadian; 
 module.exports.canadianToUs = canadianToUs; 