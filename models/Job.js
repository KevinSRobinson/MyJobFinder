var mongoose = require('mongoose');

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

exports.seedJobs = function() {

  job.find({}).exec(function(error, collection) {

    if (collection.length === 0) {
      job.create(jobs[0]);
      job.create(jobs[1]);
      job.create(jobs[2]);
      job.create(jobs[3]);
    }

  });
}