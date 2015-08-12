var MersenneTwister = require('mersennetwister');

var mt = new MersenneTwister();

module.exports = function (min, max) {
  if (max === undefined) {
    max = min;
  }
  if (min === undefined) {
    min = 0;
    max = 1;
  }
  var interval = max - min;

  return {
    pdf : function (x) {
      return x >= min && x <= max ? 1/interval : 0;
    },

    sample: function (n) {
      var result = [];
      for (var i=0; i < n; i++) {
        result.push(min + (mt.rndHiRes() * interval));
      }
      return result;
    },
	
	mean: (min + max) / 2,
	
	variance: Math.pow(max - min, 2) / 12
  };
};
