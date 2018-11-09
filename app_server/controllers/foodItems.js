var request = require('request'); //  include request into the file

var apiOptions = {
    server : "http://localhost:3000" // give the local location
   };
   if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://getting-mean-loc8r.herokuapp.com"; // give the live location if its in production
   } 

   var renderHomepage = function(req, res, responseBody){
        res.render('locations-list', {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
        title: 'Loc8r',
        strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        locations: responseBody
        });
   };

   module.exports.homelist = function(req, res){
        var requestOptions, path;
        path = '/api/locations';
        requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {},
        qs : {
        lng : -0.7992599,
        lat : 51.378091,
        maxDistance : 20
        }
        };
        request(
        requestOptions,
        function(err, response, body) {
            renderHomepage(req, res, body);
        }
        );
   };