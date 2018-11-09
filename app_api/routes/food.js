var express = require('express');
var router = express.Router();

var ctrlFood = require('../controllers/food'); // include the food.js controller

// food functions 
router.get('/food', ctrlFood.foodList); // to fetch all the footItems
router.post('/food', ctrlFood.foodCreate); // to creat a foodItem
router.get('/food/:foodid', ctrlFood.foodReadOne); // to fetch one specific foodItem by ID
router.put('/food/:foodid', ctrlFood.foodUpdateOne); // to edit one specific foodItem by ID
router.delete('/food/:foodid', ctrlFood.foodDeleteOne); // to delete a foodItem by ID

module.exports = router;