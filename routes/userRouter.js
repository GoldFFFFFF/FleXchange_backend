const express = require('express');

const userRouter = express.Router();
const {
    newUser,
    checkUser,
    checkUser1,
    addforsaleList,
    addSoldList,
    addcartList,
    addPurchasedList,
    findid
} = require('../controller/userController');

userRouter.post('/post', newUser);
userRouter.get('/:id', checkUser);
userRouter.get('/', checkUser1);
userRouter.get('/sold/:id', addSoldList)
userRouter.get('/forsale/:id/:id2', addforsaleList);
userRouter.get('/purchased/:id/:id2', addPurchasedList);
userRouter.get('/cart/:id/:id2', addcartList);
userRouter.post('/get/findid',findid);

module.exports = userRouter;
