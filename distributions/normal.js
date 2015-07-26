
var distribution = require('../helpers/distribution');
var constants = require('../helpers/constants');

module.exports = function(mean, stddev) {
  if (mean === undefined) {
    mean = 0;
  }
  if (stddev === undefined) {
    stddev = 1;
  }

  return distribution({
    pdf: function(x) {
      return (1 / (stddev * Math.sqrt(constants.two_pi))) *
             Math.exp(- Math.pow(x - mean, 2) / (2 * Math.pow(stddev, 2)));
    }
  });
};
