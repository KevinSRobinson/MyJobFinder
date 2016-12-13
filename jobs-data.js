var mongoose = require('mongoose');
var Promise = require('bluebird');

exports.findJobs = function(query){
    return Promise.cast(mongoose.model('job').find(query).exec());
}