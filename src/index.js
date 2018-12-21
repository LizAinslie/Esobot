const Bot = require('./bot');
const config = require('./bot.config');

const eso = new Bot(config);

eso.start();