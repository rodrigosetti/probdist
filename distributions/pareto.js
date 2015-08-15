
var distribution = require('../helpers/distribution');

module.exports = function(xm, alpha) {
  var variance; 
  if (1 < alpha && alpha <= 2) {
	  variance = Number.POSITIVE_INFINITY;
  } else if (alpha > 2) {
	  variance = Math.pow(xm, 2) * alpha / (Math.pow(alpha - 1, 2) * (alpha - 2));
  } else {
	  variance = undefined;
  }
  
  return distribution({
    pdf: function(x) {
      return x >= xm ?
             Math.pow(alpha * xm, alpha) / Math.pow(x, alpha + 1) : 0;
    },
	
	mean: alpha <= 1 ? Number.POSITIVE_INFINITY : alpha * xm / (alpha - 1),
	
	variance: variance
  });
};
