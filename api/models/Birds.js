/* globals exp */

var mongoose = exp.mongoose;

var birdsSchema = mongoose.Schema({
  name: String,
  legs: Number
});

birdsSchema.statics.findByName = function(name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

var Birds = mongoose.model('Birds', birdsSchema);
if (!global.exp.models) {
  global.exp.models = {};
}

global.exp.models.Birds = Birds;
