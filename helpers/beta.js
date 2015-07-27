
var gamma = require('./gamma');

module.exports = function(x, y) {
  return (gamma(x) * gamma(y)) / gamma(x + y);
};
