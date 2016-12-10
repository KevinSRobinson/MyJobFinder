var express = require('express');
var mongoose = require('mongoose');
var errorHandler = require('./errorHandler')();
var app = express();
var jobModel = require('./models/Job');


app.set('view engine', 'jade');
app.set('views', __dirname);

app.use(express.static(__dirname + '/public/'));
app.use(errorHandler.init);



app.get('/api/jobs', function(req, res) {
  mongoose.model('job').find({}).exec(function(error, collection) {
    res.send(collection);
  });
})




app.get('*', function(req, res) {

  res.render('index');


});

mongoose.connect('mongodb://user1:Eastwood44@ds127878.mlab.com:27878/myjobfinder');


var con = mongoose.connection;

con.once('open', function() {
  console.log('connected to mongodb');
  jobModel.seedJobs();
})


app.listen(process.env.PORT, process.env.IP);
