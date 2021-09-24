const env = require('dotenv').config({ path: '.env' }).parsed;
const envLocal = require('dotenv').config({ path: '.env.local' }).parsed;

module.exports = {
  ...env,
  ...envLocal
};
