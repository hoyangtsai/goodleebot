const { router, telegram, line } = require('bottender/router');
const handleTelegramMessage = require('./telegram/message.js');
const handleLineMessage = require('./line/message.js');

module.exports = async function App() {
  return router([
    telegram.message(handleTelegramMessage),
    line.message(handleLineMessage),
  ]);
};
