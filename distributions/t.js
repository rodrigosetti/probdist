
var distribution = require('../helpers/distribution');
var beta = require('../helpers/beta');

module.exports = function(nu) {
  var beta_term = Math.sqrt(nu) * beta(nu / 2, 0.5),
	  variance;
  if (nu > 2) {
	  variance = nu / (nu - 2);
  } else if (1 < nu && nu <= 2) {
	  variance = Math.POSITIVE_INFINITY;
  } else {
	  variance = undefined;
  }
  
  return distribution({
    pdf: function(t) {
      return (Math.pow(nu / (Math.pow(t, 2) + nu), (nu + 1) / 2)) /
              beta_term;
    },
	
	mean: nu > 1 ? 0 : undefined,
	
	variance: variance
  });
};
