const express = require('express');
const config = require('./config/config');;
const dotenv = require('dotenv');
const app = express();
const passport = require('passport');
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.keys' });

require('./config/passport.js');
app.use(passport.initialize());
app.use(passport.session());

module.exports = require('./config/express')(app, config);

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});
