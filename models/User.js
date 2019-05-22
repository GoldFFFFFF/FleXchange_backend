const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = schema({
  openid: String,
  Soldlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  }],
  Shoppingcart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  }],
  Purchaseditemlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  }],
  Forsaleitemlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  }],
  username: String,
  imgUrl: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
