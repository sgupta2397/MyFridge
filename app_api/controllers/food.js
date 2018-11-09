// Including the model
var mongoose = require('mongoose'); // gives the controllers access to the database connection

 // brings in the Food model so that we can interact 
 var Food = mongoose.model('Food');

//  create a sendJsonResponse function
var sendJsonResponse =  function(res, status, content) {
 res.status(status);
 res.json(content);
};

// function to get the entire foodList
module.exports.foodList = function(req, res){
	Food.find()
	.exec(function(err, foodList){
		if(!foodList || foodList.length == 0){
			sendJsonResponse(res, 404, {
					"message": "No food items in list"
				});
				return;
		}
		else if(err){
			console.log(err);
			sendJsonResponse(res, 404, err);
			return;
		}
		console.log(foodList);
		sendJsonResponse(res, 200, foodList);
	});
}

/* GET one food item by the id */
module.exports.foodReadOne = function(req, res) {
    console.log('Finding food details', req.params);
    if (req.params && req.params.foodid) {
      Food
        .findById(req.params.foodid)
        .exec(function(err, foodItem) {
          if (!foodItem) {
            sendJsonResponse(res, 404, {
              "message": "foodID not found"
            });
            return;
          } else if (err) {
            console.log(err);
            sendJsonResponse(res, 404, err);
            return;
          }
          console.log(foodItem);
          sendJsonResponse(res, 200, foodItem);
        });
    } else {
      console.log('No foodID specified');
      sendJsonResponse(res, 404, {
        "message": "No foodID in request"
      });
    }
  };

// POST method to create a food Item
module.exports.foodCreate = function(req, res) {
    console.log(req.body);
    Food.create({
      name: req.body.name,
      date: req.body.date,
      expiry: req.body.expiry,
      left_overs: req.body.left_overs,
      quantity: req.body.quantity
    }, function(err, foodItem) {
      if (err) {
        console.log(err);
        sendJsonResponse(res, 400, err);
      } else {
        console.log(foodItem);
        sendJsonResponse(res, 201, foodItem);
      }
    });
  };


// PUT method to edit an existing food Item
module.exports.foodUpdateOne = function(req, res) {
    if (!req.params.foodid) {
        sendJsonResponse(res, 404, {
        "message": "Not found, foodid is required"
      });
      return;
    }
    Food
      .findById(req.params.foodid)
      .exec(
        function(err, foodItem) {
          if (!foodItem) {
            sendJsonResponse(res, 404, {
              "message": "foodid not found"
            });
            return;
          } else if (err) {
            sendJsonResponse(res, 400, err);
            return;
          }
          foodItem.name = req.body.name ? req.body.name : foodItem.name;
          foodItem.date = req.body.date ? req.body.date: foodItem.date;
          foodItem.expiry = req.body.expiry? req.body.expiry: undefined;
          foodItem.left_overs = req.body.left_overs ? req.body.left_overs: foodItem.left_overs;
          foodItem.quantity = req.body.quantity ? req.body.quantity : foodItem.quantity;
              
          foodItem.save(function(err, foodItem) {
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                sendJsonResponse(res, 200, foodItem);
            }
          });
        }
    );
  };

  // DELETE method to delete one FoodItem
module.exports.foodDeleteOne = function (req, res) 
{ 
    var foodid = req.params.foodid;
    if(foodid) {
			Food
				.findById(req.params.foodid)
				.exec(function(err, foodItem) {
					if(!foodItem) {
						sendJsonResponse(res, 404, {
							"message": "No food item found with specified ID"
						});
						return;
					}
					else if(err){
						console.log(err);
						sendJsonResponse(res, 404, err);
						return;
					}
					if(foodItem.quantity > 1) {
						foodItem.quantity--;
						foodItem.save(function(err, foodItem) {
							if(err) {
								sendJsonResponse(res, 400, err);
							}
							else {
								sendJsonResponse(res, 200, foodItem);
							}
						});
					}
					else{
						food.findByIdAndRemove(foodid)
						.exec(
							function(err, foodItem){
								if(err){
									sendJsonResponse(res, 404, err);
									return;
								}
								console.log("Food ID " + foodid + " deleted");
								sendJsonResponse(res, 204, null);
							});
					}
				});
    } else {
        sendJsonResponse(res, 404, {
        "message": "No foodID"
        });
    }
};