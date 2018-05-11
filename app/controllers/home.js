var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    location = mongoose.model('location');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  location.find(function (err, items) {
    if (err) {
      return next(err);
    } else {
      res.render('index', {
        title: 'AED 위치 리스트',
        items: items
      });
    }
  });
});

router.get('/add', function (req, res, next) {
  res.render('add', {
    title: 'AED 위치 추가'
  });
});

router.post('/add', function (req, res, next) {
  var add = new location({
    title: req.body.title,
    address: req.body.address,
    coords: [req.body.lat, req.body.lng]
  });

  add.save(function (err) {
    if (err) {
      return next(err);
    } else {
      res.json(true);
    }
  });
});
router.post('/nearbyme', function (req, res, next) {
  var formData = [];
  formData[0] = req.body.lng;
  formData[1] = req.body.lat;
  location.findOne({
    coords: {
      '$near': {
        '$geometry': {
          type: 'Point',
          coordinates: formData
        },
        '$maxDistance': 10 * 1609.34 // 10km 이내 10 * 야드
      }
    }
  }).exec(function (err, item) {
    if (err) {
      return next(err);
    } else if (item) {
      res.json({result: true, item: item});
    } else {
      res.json({result: false});
    }
  });
});

router.get('/keyboard', (req, res) => {
  var menu = {
      type: 'buttons',
      buttons: ["AED 위치 찾기"]
  };
  res.json(menu);
});

router.post('/message', (req,res) =>{
  var msg = req.body.content;

  var send= {
    "message_button": {
      "label":"현재 위치 확인",
      "url":"https://woosungweb.herokuapp.com/"
    }

  };
  res.send(send);
