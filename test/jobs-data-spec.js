var expect = require("chai").expect;
var mongoose = require('mongoose');
var jobModel = require('../models/job');
var Promise = require('bluebird');

function resetJobs() {
  return new Promise(function(resolve, reject) {
    mongoose.connection.collections['jobs'].drop(resolve, reject);
  })

}

var connectDB = Promise.promisify(mongoose.connect, mongoose);

function findJobs(query){
    return Promise.cast(mongoose.model('job').find(query).exec());
}

describe('get jobs', function() {
  it('Should neerr be empty', function(done) {
        connectDB('mongodb://localhost/jobfinder')
            .then(resetJobs)
            .then(jobModel.seedJobs)
            .then(findJobs)
            .then(function(jobsList) {
                expect(jobsList.length).to.be.at.least(1);
                done();
              });
          
    });
});