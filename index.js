// Run server with one route to output data after scraping, simply.js app uses that endpoint to spit it out

var express = require('express'),
app = express(),
request = require('request'),
c = require('cheerio'),
serveStatic = require('serve-static');


var getSite = function(cb) {
	request('http://abc.net.au/news', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    cb(body);
	  }
	})
}

var getTitles = function(arr, $) {
	var titles = [];
	for(var i = 0; i < arr.length; i++) {
		titles.push($(arr[i]).text().replace('        ', '').replace(/\W+/g, " "));
	}
	return titles;
}

app.use(serveStatic('public'));

app.get('/', function (req, res) {
	getSite(function(body){
		$ = c.load(body);
		var headings = $('body').find('.module-body h3');
		var titles = getTitles(headings, $);
		res.json({titles: titles});
	});
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening on http://%s:%s', host, port)

});