
var distribution = require('../helpers/distribution');
var gamma = require('../helpers/gamma');

module.exports = function(alpha, beta) {
  var inv_beta = gamma(alpha + beta) / (gamma(alpha) * gamma(beta));

  return distribution({
    pdf: function(x) {
      return x >= 0 && x <= 1 ?
             inv_beta * Math.pow(x, alpha-1) * Math.pow(1 - x, beta - 1) : 0;
    },
	
	mean: alpha / (alpha + beta),
	
	variance: (alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1))
  });
};
