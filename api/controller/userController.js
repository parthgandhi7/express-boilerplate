/* globals exp */
var User = exp.models.User;
var q = require('q');

var user = {
  create: function(req) {
    var deferred = q.defer();
    var userObj = req.body;

    User.create(userObj, function(err, user) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(user);
      }
    });

    return deferred.promise;
  },

  getAll: function() {
    var deferred = q.defer();
    User.find().exec(function(err, users) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(users);
      }
    });

    return deferred.promise;
  },

  getByName: function(req) {
    var deferred = q.defer();
    User.findByName(req.params.name, function(err, users) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(users);
      }
    });

    return deferred.promise;
  },

  getById: function(req) {
    var deferred = q.defer();
    console.log(req.params.userid);
    User.findOne({
      _id: req.params.userid
    }, function(err, users) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(users);
      }
    });

    return deferred.promise;
  },

  update: function(req) {
    var deferred = q.defer();

    User.findOneAndUpdate({
      _id: req.params.userid
    }, {
      $set: req.body
    }, {
      new: true
    }, function(err, doc) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(doc);
      }

    });

    return deferred.promise;
  }
};

module.exports = user;
