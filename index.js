var express = require('express');
var dotenv = require('dotenv');
var app = express();

dotenv.load();

var server = app.listen(process.env.PORT || 8080, function() {
    console.log('Listening on port :', server.address().port)
});

app.get('/*', function(req, res) {
    res.sendFile('index.html', {
        root: './public'
    });
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
