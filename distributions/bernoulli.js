
var distribution = require('../helpers/distribution');

module.exports = function(p) {
  return distribution({
    pdf: [[1-p, 0], [p, 1]]
  });
};
