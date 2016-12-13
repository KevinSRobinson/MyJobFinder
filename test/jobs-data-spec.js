var expect = require("chai").expect;
var mongoose = require('mongoose');
var jobModel = require('../models/job');
var Promise = require('bluebird');
var jobsData = require('../jobs-data.js');

function resetJobs() {
  return new Promise(function(resolve, reject) {
    mongoose.connection.collections['jobs'].drop(resolve, reject);
  })

}

var connectDB = Promise.promisify(mongoose.connect, mongoose);

// function findJobs(query){
//     return Promise.cast(mongoose.model('job').find(query).exec());
// }

describe('get jobs', function() {
    var jobs = [];
    
    before(function(done){
        connectDB('mongodb://localhost/jobfinder')
            .then(resetJobs)
            .then(jobModel.seedJobs)
            .then(jobsData.findJobs)
            .then(function(collection) {
                jobs = collection;
                done();
              });
          
    });
    
    it('Should neerr be empty', function() {
        expect(jobs.length).to.be.at.least(1);
    }); 
    
    it('should have a title', function(){
       expect(jobs[0].title).to.not.be.empty;
    });
    
     it('should have a description', function(){
       expect(jobs[0].description).to.not.be.empty;
    });
});