var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('url', req.protocol + '://' + req.get('host') + req.originalUrl );
  
  res.render('mgrisole/index', { title: 'Maxime Grisole' });
});

module.exports = router;
