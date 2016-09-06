/* globals exp */

var router = exp.Router();
var Birds = exp.models.Birds;

var logger = require('../../config/logger.js');

router.post('/', function(req, res) {
  var birdsObj = req.body;
  Birds.create(birdsObj, function(err, bird) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(bird);
    }
  });
});

router.get('/', function(req, res) {
  Birds.find().exec(function(err, birds) {
    if (err) {
      logger.error('Some error occured: ', err);
      res.status(500).send(err);
    } else {
      logger.info('All Birds retreived %s', birds);
      res.status(200).send(birds);
    }
  });
});

router.get('/:birdid', function(req, res) {

  Birds.findOne({
    _id: req.params.birdid
  }, function(err, birds) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(birds);
    }
  });
});

router.post('/:birdid', function(req, res) {
  var birdsObj = req.body;

  Birds.findOneAndUpdate({
    _id: req.params.birdid
  }, {
    $set: birdsObj
  }, {
    new: true
  }, function(err, doc) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(doc);
    }

  });
});

module.exports = router;
