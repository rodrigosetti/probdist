
var distribution = require('../helpers/distribution');
var beta = require('../helpers/beta');

module.exports = function(nu) {
  var beta_term = Math.sqrt(nu) * beta(nu / 2, 0.5);

  return distribution({
    pdf: function(t) {
      return (Math.pow(nu / (Math.pow(t, 2) + nu), (nu + 1) / 2)) /
              beta_term;
    }
  });
};
