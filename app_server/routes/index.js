var express = require('express');
var router = express.Router();

var ctrlMain = require('../controllers/main');
var ctrlItemList = require('../controllers/item_list');
var ctrlAddEdit = require('../controllers/add');

router.get('/', ctrlMain.index);
router.get('/item_list', ctrlItemList.foodList);
router.get('/add', ctrlAddEdit.foodCreate);
router.post('/add', ctrlAddEdit.doFoodCreate);

module.exports = router;