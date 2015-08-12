
var distribution = require('../helpers/distribution');
var gamma = require('../helpers/gamma');

module.exports = function(alpha, beta) {
  var gamma_alpha = gamma(alpha);

  return distribution({
    pdf: function(x) {
      return x > 0 ?
            (Math.pow(beta, -alpha) * Math.pow(x, alpha-1) * Math.exp(-x / beta)) /
             gamma_alpha : 0;
    },
	
	mean: alpha * beta,
	
	variance: alpha * Math.pow(beta, 2)
  });
};
