const express = require('express');

const itemRouter = express.Router();
const {
  createItem,
  findItemBytype,
  findItemByShoppingCart,
  deleteIteminshoppingcart,
  findItemByForsalelist,
  findItemBySoldlist,
  findItemByPurchasedlist,
  findItemById,
  findAllItem,
  deleteItem,
} = require('../controller/itemController');

itemRouter.post('/post', createItem);
itemRouter.get('/:id', findItemById);
itemRouter.get('/type/type', findItemBytype);
itemRouter.get('/sold/:id', findItemBySoldlist);
itemRouter.get('/cart/:id', findItemByShoppingCart);
itemRouter.get('/forsale/:id', findItemByForsalelist);
itemRouter.get('/purchased/:id', findItemByPurchasedlist);
itemRouter.get('/', findAllItem);
itemRouter.delete('/cartd/:id/:id2', deleteIteminshoppingcart);
//itemRouter.delete('/:id', deleteItem);

module.exports = itemRouter;
