const mongoose = require('mongoose');

const schema = mongoose.Schema;
/*  user: ObjectId for user
    content: the content of message
    location: loaction of user
    tag: tag of user
    anony: whether anony
    createAt: create time of the message(automatic setting)
    imgUrl: url of image that user upload
*/
const ItemModel = schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: String,
  price: String,
  type: [{
    type: String,
    _id: false,
  }],
  description: String,
  imgUrl: [{
    type: String,
    _id: false,
  }],
  status: Boolean
});


const Item = mongoose.model('Item', ItemModel);

module.exports = Item;
