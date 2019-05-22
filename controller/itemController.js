const Item = require('../models/Item');
const User = require('../models/User')

const createItem = (req, res) => {
  Item.create(req.body).then(newItem => res.json({
    Item: newItem,
    logmessage: 'new item create',
  })).catch((err) => {
    res.status(400).json({
      logmessage: 'Error',
    });
    throw new Error(err);
  });
};

const findItemBytype = (req, res) => {
  console.log(req.query)
  Item.find({ status: true }).find(req.query).then((resultMessage) => {
    res.json({
      resultMessage
    })
  })
}

const deleteIteminshoppingcart = (req, res) => {
  const id = req.params.id
  const id2 = req.params.id2
  var newcart = []
  User.findOne({ _id: id }).then(resultMessage => {
    for (i = 0; i < resultMessage.Shoppingcart.length; i++) {
      if (resultMessage.Shoppingcart[i] == id2) {
        newcart = resultMessage.Shoppingcart.splice(i, 1)
        break
      }
    }
  }).then(resultMessage => {
    res.json({
      resultMessage
    })
  })
  setTimeout(function () {
    User.findOneAndUpdate({ _id: id }, { $pull: { Shoppingcart: newcart[0] } }, function (err) {
    })
  }, 1000)
}

const findItemByShoppingCart = (req, res) => {
  const { id } = req.params
  var cart = []
  var recart = []
  User.findOne({ _id: id }, { Shoppingcart: true }, function (err, Users) {
    if (!err) {
      cart = Users.Shoppingcart
      console.log(cart)
    }
  }).then(function () {
    for (i = 0; i < cart.length; i++) {
      Item.findOne({ _id: cart[i], status: true }).then((resultMessage) => {
        if (resultMessage != null) {
          recart.push(resultMessage)
        }
      })
    }
  })
  setTimeout(function () {
    return res.json({
      recart
    })
  }, 1000)
}

const findItemByForsalelist = (req, res) => {
  const { id } = req.params
  Item.find({ user: id, status: true }).then(resultMessage => {
    res.json({
      resultMessage
    })
  })
}

const findItemByPurchasedlist = (req, res) => {
  const { id } = req.params
  var cart = []
  var recart = []
  User.findOne({ _id: id }, { Purchaseditemlist: true }, function (err, Users) {
    if (!err) {
      cart = Users.Purchaseditemlist
    }
  }).then(function () {
    for (i = 0; i < cart.length; i++) {
      Item.findById({ _id: cart[i] }).then((resultMessage) => {
        recart.push(resultMessage)
        console.log(cart)
      })
    }
  })
  setTimeout(function () {
    console.log(recart)
    return res.json({
      recart
    })
  }, 1000)
}

const findItemById = (req, res) => {
  const { id } = req.params;
  Item.findOne({ _id: id, status: true }).then((resultMessage) => {
    if (!resultMessage) {
      return res.status(404).json({
        message: 'No item found',
      });
    }
    return res.json({
      resultMessage,
    });
  }).catch((err) => {
    res.status(400).json({
      logmessage: 'Error',
    });
    throw new Error(err);
  });
};

const findItemBySoldlist = (req, res) => {
  const { id } = req.params
  Item.find({ user: id, status: false }).then(resultMessage => {
    res.json({
      resultMessage
    })
  })
}

const findAllItem = (req, res) => {
  Item.find({ status: true }).then((resultMessage) => {
    if (!resultMessage) {
      return res.status(404).json({
        message: 'No item',
      });
    }
    return res.json({
      resultMessage,
    })
  }).catch((err) => {
    res.status(400).json({
      logmessage: 'Error',
    });
    throw new Error(err);
  });
};

const deleteItem = (req, res) => {
  const { id } = req.params;
  Item.findOneAndUpdate({ _id: id }, { status: false })
    .then((deletedItem) => {
      if (!deletedItem) {
        return res.status(404).json({
          message: 'No item found',
        });
      }
      return res.json({
        deletedItem,
        message: 'Item delete',
      });
    })
    .catch((err) => {
      res.status(400).json({
        logmessage: 'Error',
      });
      throw new Error(err);
    });
};


module.exports = {
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
};
