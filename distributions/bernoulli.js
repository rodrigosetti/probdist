
var distribution = require('../helpers/distribution');

module.exports = function(p) {
  return distribution({
    pdf: {0: 1-p, 1: p},
	
	mean: p,
	
	variance: (1 - p) * p	
  });
};
