let express = require('express');
let mongoose = require('mongoose');
let path    = require("path");

let bodyParser = require('body-parser');

let app = express();

var port = process.env.PORT || 8085;

let apiRoutes = require('./routes/api');

app.use(bodyParser.urlencoded({
    extended: true
 }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/integro');

var db = mongoose.connection;

app.get('/', function(req, res){
    res.render('index.html');
})
app.use('/api', apiRoutes);

app.listen(port, function() {
    console.log('Running localhost:'+port);
})