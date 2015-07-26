
var distribution = require('./distribution');

module.exports = function(probs) {
  return distribution({
    pdf: probs
  });
};
