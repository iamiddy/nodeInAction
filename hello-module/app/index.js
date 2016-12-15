// app/index.js
var Currency = require('./currency');
var express = require('express')
var router = express.Router()
var url = require('url')

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

var changeToday = 0.91;

var currency = new Currency(changeToday);

// define the home page route :userId/books/:bookId
router.get('/:from/:to/:amount', function (req, res) {
   var query = url.parse(req.url,true).query;
    var from = req.params.from;
    var to = req.params.to;
    var amount = req.params.amount;
     console.log(query)
     if(query.size) console.log(query.size);
    var change = from == 'CN'? currency.canadianToUs(amount): currency.canadianToUs(amount);
  res.json({
      "message" : `exchange ${amount} from ${from} to ${to}`,
      "change" : change

  })
})
// define the about route
router.get('/', function (req, res) {
    console.log(url.parse(req.url,true).query)
  res.send('About exchange rates');
})

module.exports = router