const User = require('../models/User');
const Item = require('../models/Item');

const newUser = (req, res) => {
  User.create(req.body).then(newUser => res.json({
    User: newUser,
    logmessage: 'new user create',
  })).catch((err) => {
    res.status(400).json({
      logmessage: 'Error',
    });
    throw new Error(err);
  });
}

const checkUser1 = (req, res) => {
  User.findOne(req.query).then((resultMessage) => {
    if (!resultMessage) {
      return res.status(404).json({
        message: 'No user found',
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
  })
}

const checkUser = (req, res) => {
  const { id } = req.params
  User.findById({ _id: id }).then((resultMessage) => {
    if (!resultMessage) {
      return res.status(404).json({
        message: 'No user found',
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
  })
}

const addforsaleList = (req, res) => {
  const { id, id2 } = req.params
  User.findByIdAndUpdate({ _id: id }, { $addToSet: { Forsaleitemlist: id2 } }).then((resultMessage) => {
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
}

const addSoldList = (req, res) => {
  const { id } = req.params
  var id2
  Item.findByIdAndUpdate({ _id: id }, { status: false }).then(resultMessage => {
    id2 = resultMessage.user
  })
  setTimeout(function () {
    User.findByIdAndUpdate({ _id: id2 }, { $addToSet: { Soldlist: id } }).then((resultMessage) => {
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
    })
  }, 1000)
}

const addPurchasedList = (req, res) => {
  const { id, id2 } = req.params
  console.log(id)
  console.log(id2)
  Item.findByIdAndUpdate(id2, { $set: { status: false } }, function () {})
  User.findByIdAndUpdate({ _id: id }, { $addToSet: { Purchaseditemlist: id2 } }).then((resultMessage) => {
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
}

const addcartList = (req, res) => {
  const { id, id2 } = req.params
  User.findByIdAndUpdate({ _id: id }, { $addToSet: { Shoppingcart: id2 } }).then((resultMessage) => {
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
}


const findid = (req, res) => {
  console.log(req.query)
  User.find({ username: req.query.username }).then(resultmessage => {
    if (resultmessage.length == 0) {
      res.write(
        "no id find"
      )
    }
    else {
      res.json(
        resultmessage
      )
    }
  })
}

module.exports = {
  newUser,
  checkUser,
  findid,
  checkUser1,
  addforsaleList,
  addSoldList,
  addPurchasedList,
  addcartList,
};