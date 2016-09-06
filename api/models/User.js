/* globals exp */

var mongoose = exp.mongoose;

var userSchema = mongoose.Schema({
  name: String
});

userSchema.statics.findByName = function(name, cb) {
  return this.find({
    name: new RegExp(name, 'i')
  }, cb);
};

var User = mongoose.model('User', userSchema);
if (!global.exp.models) {
  global.exp.models = {};
}

global.exp.models.User = User;
