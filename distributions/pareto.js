
var distribution = require('../helpers/distribution');

module.exports = function(xm, alpha) {
  return distribution({
    pdf: function(x) {
      return x >= xm ?
             Math.pow(alpha * xm, alpha) / Math.pow(x, alpha + 1) : 0;
    }
  });
};
