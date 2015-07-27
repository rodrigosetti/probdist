
var distribution = require('../helpers/distribution');

module.exports = function(sigma) {
  return distribution({
    pdf: function(x) {
      return x >= 0 ?
             (x / Math.pow(sigma, 2)) * Math.exp(-Math.pow(x, 2) / (2 * Math.pow(sigma, 2))) : 0;
    }
  });
};
