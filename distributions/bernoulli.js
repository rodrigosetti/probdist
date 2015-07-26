
var distribution = require('../helpers/distribution');

module.exports = function(p) {
  return distribution({
    pdf: {0: 1-p, 1: p}
  });
};
