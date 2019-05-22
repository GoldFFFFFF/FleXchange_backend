const itemRouter = require('./itemRouter')
const userRouter = require('./userRouter')

const setRouter = (app) => {
  app.use('/api/item', itemRouter);
};

const setRouter2 = (app) => {
  app.use('/api/user', userRouter);
};

module.exports = {
  setRouter,
  setRouter2
};
