
var distribution = require('../helpers/distribution');
var gamma = require('../helpers/gamma');

module.exports = function(k) {
  if (k === undefined) {
    k = 1;
  }
  var denom = Math.pow(2, k/2) * gamma(k/2);

  return distribution({
    pdf: function(x) {
      return x >= 0 ?
             (Math.pow(x, (k/2) - 1) * Math.exp(-x/2)) / denom : 0;
    }
  });
};
