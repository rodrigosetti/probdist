
var distribution = require('../helpers/distribution');

var TWO_PI = 6.28318530718;

module.exports = function(mean, stddev) {
  if (mean === undefined) {
    mean = 0;
  }
  if (stddev === undefined) {
    stddev = 1;
  }

  return distribution({
    pdf: function(x) {
      return (1 / (stddev * Math.sqrt(TWO_PI))) *
             Math.exp(- Math.pow(x - mean, 2) / (2 * Math.pow(stddev, 2)));
    }
  });
};
