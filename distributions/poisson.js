
var factorial = require('../helpers/factorial');
var distribution = require('../helpers/distribution');
var uniform = require('./uniform');

var STEP = 500;
var e_STEP = Math.exp(STEP);

function knuthPoissonSample(lambda) {
  var uvar = uniform(0, 1);

  return function() {
    var lambdaLeft = lambda;
    var k = 0;
    var p = 1;
    while (true) {
      k ++;
      p *= uvar.sample(1)[0];
      if (p < Math.exp(1) && lambdaLeft > 0) {
        if (lambdaLeft > STEP) {
          p *= e_STEP;
          lambdaLeft -= STEP;
        } else {
          p *= Math.exp(lambdaLeft);
          lambdaLeft = -1;
        }
      }
      if (p <= 1) {
        break;
      }
    }
    return k - 1;
  };
}

module.exports = function (lambda) {
  var sampleOne = knuthPoissonSample(lambda);

  return distribution({
    pdf : function (k) {
      k = Math.round(k);
      return (Math.pow(lambda, k) * Math.exp(-k)) / factorial(k);
    },

    sample: function (n) {
      var r = [];
      for (var i=0; i < n; i++) {
        r.push(sampleOne());
      }
      return r;
    },
	
	mean: lambda,
	
	variance: lambda
  });
};
