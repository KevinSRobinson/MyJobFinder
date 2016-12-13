var mongoose = require('mongoose');
var Promise = require('bluebird');

var jobSchema = mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  }
})

var job = mongoose.model('job', jobSchema);

var jobs = [
  {
    title: 'Sales Person',
    description: 'you will fight dragons'
  },
  {
    title: 'Accoutant',
    description: 'you will use the keyboard'
  },
  {
    title: 'Programmer',
    description: 'you will be mindlessly typing for...'
  },
  {
    title: 'Axe Maker',
    description: 'We need many axes made... so many...'
  }
];


function findJobs(query){
    return Promise.cast(mongoose.model('job').find(query).exec());
}

var createJob = Promise.promisify(job.create, job);

exports.seedJobs = function() {

  return  findJobs({}).then(function(collection) {
      if (collection.length === 0) {
        return Promise.map(jobs, function(job){
          return createJob(job);
        })
      }
    });
  
};
