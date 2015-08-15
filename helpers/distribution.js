
var uniform = require('../distributions/uniform');

var SAMPLE_MIN = -1000;
var SAMPLE_MAX = 1000;

function rejectionSample(pdf) {
  var xuni = uniform(SAMPLE_MIN, SAMPLE_MAX);
  var yuni = uniform(0, 1);

  return function(n) {
    if (n === undefined) {
      n = 1;
    }
    var result = [];
    while (result.length < n) {
      var x = xuni.sample(1)[0];
      var y = yuni.sample(1)[0];
      if (y <= pdf(x)) {
        result.push(x);
      }
    }
    return result;
  };
}

function finiteDiscreteSample(pdf) {
  var uvar = uniform(0, 1);

  return function (n) {
    if (n === undefined) {
      n = 1;
    }
    var result = [];
    for (var i = 0; i < n; i++) {
      var x = uvar.sample(1)[0];
      var accum = 0;
      for (var value in pdf) {
        if (pdf.hasOwnProperty(value)) {
          var prob = pdf[value];
          accum += prob;

          if (accum >= x) {
            result.push(value);
            break;
          }
        }
      }
    }
    return result;
  };
}

module.exports = function(d) {
    var pdf = d.pdf;
    var sample = d.sample;

    if (!sample) {
      if (typeof(pdf) === 'function') {
        sample = rejectionSample(pdf);
      } else {
        sample = finiteDiscreteSample(pdf);
      }
    }

    return {
        pdf    : pdf,
        sample : sample,
		mean   : d.mean,
		variance : d.variance
    };
};
