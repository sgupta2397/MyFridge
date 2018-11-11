var request = require('request');
var apiOptions = {
    server: "http://localhost:3000"
};
var renderForm = function(req, res) {
    res.render('add', { title: 'Add Food Items' });
}

module.exports.foodCreate = function(req, res) {
    renderForm(req, res);
};

module.exports.doFoodCreate = function(req, res) {
  var requestOptions, path, postdata;
  path = "/api/food";
  postdata = {
    name: req.body.name,
    date: req.body.date,
    expiry: req.body.expiry ? req.body.expiry : undefined,
    left_overs: req.body.left_overs,
    quantity: req.body.quantity
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
request(
  requestOptions,
  function(err, response, body) {
    if (response.statusCode === 201) {
      res.redirect('/item_list');
    } else if(err) {
      console.log(err);
    }
  });
};