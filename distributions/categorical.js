
var distribution = require('../helpers/distribution');

module.exports = function(probs) {
  return distribution({
    pdf: probs
  });
};
