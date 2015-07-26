
var distribution = require('./distribution');

module.exports = function(p) {
  return distribution({
    pdf: [[1-p, 0], [p, 1]]
  });
};
