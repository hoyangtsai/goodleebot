const { router, telegram } = require('bottender/router');
const handleLineMessage = require('./telegram/message.js');

module.exports = async function App() {
  return router([telegram.message(handleLineMessage)]);
};
