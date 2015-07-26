
var assert = require("assert")
var fs = require('fs');
var distributions = require('../index.js');

function empiricalPDF(x) {
    return function(t) {
        var i;
        for (i=0; i < x.length; i++) {
          if (x[i] > t) {
            break;
          }
        }
        return i / x.length;
    };
}

var C_ALPHA = 1.95;

function kolmogorovSmirnovTest(x, y) {
  var pdfx = empiricalPDF(x);
  var pdfy = empiricalPDF(y);

  var i = 0;
  var j = 0;
  var D = 0;
  while (i < x.length || j < y.length) {
      var t;
      if (i >= x.length) {
        t = y[j++];
      } else if (j >= y.length) {
        t = x[i++];
      } else if (x[i] < y[j]) {
        t = x[i++];
      } else {
        t = y[j++];
      }

      D = Math.max(Math.abs(pdfx(t) - pdfy(t)), D);
  }
  return D > C_ALPHA * Math.sqrt((x.length + y.length) /  (x.length * y.length));
}

function isDrawnFromDistribution(sample, name) {
  var y = JSON.parse(fs.readFileSync('test/fixtures/' + name + '.json'));
  sample.sort();
  y.sort();

  return !kolmogorovSmirnovTest(sample, y);
}

describe('Distributions', function() {

  it('Uniform distribution', function () {

    var distribution = distributions.uniform(-2, 20);
    var sample = distribution.sample(10);

    assert.ok(isDrawnFromDistribution(sample, 'uniform_-2_20'));
  });

  it('Normal distribution', function () {
    var distribution = distributions.normal(1, 4);
    var sample = distribution.sample(10);

    assert.ok(isDrawnFromDistribution(sample, 'normal_1_4'));
  });
});
