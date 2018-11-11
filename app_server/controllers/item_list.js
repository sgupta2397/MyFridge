var request = require('request');
var apiOptions = {
    server: "http://localhost:3000"
};
var renderHomepage = function(req, res, responseBody) {
    var message;
    if(!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    }
    else{
        if(responseBody.length == 0) {
            message = "No food items found";
        }
    } 
    res.render('item_list', { title: 'Food Items', foodItems: responseBody, message: message });
}

module.exports.foodList = function(req, res) {
    var requestOptions, path;
    path = '/api/food';
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function(err, response, body) {
            renderHomepage(req, res, body);
        }
    ); 
};