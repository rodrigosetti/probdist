
var distribution = require('../helpers/distribution');

module.exports = function(mean, stddev) {
  if (mean === undefined) {
    mean = 0;
  }
  if (stddev === undefined) {
    stddev = 1;
  }

  return distribution({
    pdf: function(x) {
      return (1 / (stddev * Math.sqrt(2 * Math.PI))) *
             Math.exp(- Math.pow(x - mean, 2) / (2 * Math.pow(stddev, 2)));
    },
	
	mean: mean,
	
	variance: Math.pow(stddev, 2)
  });
};
