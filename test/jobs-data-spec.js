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


describe('get jobs', function() {
  it('Should neerr be empty', function(done) {
        connectDB('mongodb://localhost/jobfinder').then(function(){
                resetJobs()
             .then(jobModel.seedJobs)
         .then(function() {
              mongoose.model('job').find({}).exec(function(error, jobsList) {
                  console.log(error);
                  console.log(jobsList);
                expect(jobsList.length).to.be.at.least(1);
                done();
              });
          });
        });
    });
});