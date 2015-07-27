
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

function numberSort(a, b) {  return a - b; }

var C_ALPHA = 1.95;

function kolmogorovSmirnovTest(x, y) {
  var pdfx = empiricalPDF(x);
  var pdfy = empiricalPDF(y);
  var xy = x.concat(y);
  xy.sort(numberSort);

  var D = 0;
  for (var i=0; i < xy.length; i++) {
      var t = xy[i];
      D = Math.max(Math.abs(pdfx(t) - pdfy(t)), D);
  }
  return D > C_ALPHA * Math.sqrt((x.length + y.length) /  (x.length * y.length));
}

function isDrawnFromDistribution(sample, name) {
  var y = JSON.parse(fs.readFileSync('test/fixtures/' + name + '.json'));
  sample.sort(numberSort);
  y.sort(numberSort);

  return !kolmogorovSmirnovTest(sample, y);
}

function categoryCount(sample) {
  var counts = {};
  for (var i=0; i < sample.length; i++) {
    var x = sample[i];
    if (counts[x] === undefined) {
      counts[x] = 0;
    }
    counts[x] ++;
  }
  return counts;
}

describe('Distributions', function() {

  it('Uniform distribution', function () {

    var distribution = distributions.uniform(-2, 20);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'uniform_-2_20'));
  });

  it('Gaussian distribution', function () {
    var distribution = distributions.gaussian(1, 4);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'normal_1_4'));
  });

  it('Poisson distribution', function () {
    var distribution = distributions.poisson(3);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'poisson_3'));
  });

  it('Bernoulli distribution', function () {
    var distribution = distributions.bernoulli(.8);
    var sample = distribution.sample(10000);
    var counts = categoryCount(sample);

    assert.ok( Math.abs(counts[0] / sample.length - .2) < .01 );
    assert.ok( Math.abs(counts[1] / sample.length - .8) < .01 );
  });

  it('Categorical distribution', function () {
    var distribution = distributions.categorical({ a: .1, b: .5, c: .2, d: .2});
    var sample = distribution.sample(10000);
    var counts = categoryCount(sample);

    assert.ok( Math.abs(counts.a / sample.length - .1) < .01 );
    assert.ok( Math.abs(counts.b / sample.length - .5) < .01 );
    assert.ok( Math.abs(counts.c / sample.length - .2) < .01 );
    assert.ok( Math.abs(counts.d / sample.length - .2) < .01 );
  });

  it('Chi-Squared distribution', function () {
    var distribution = distributions.chisquare(2);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'chisquare_2'));
  });

  it('Beta distribution', function () {
    var distribution = distributions.beta(2, 1);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'beta_2_1'));
  });

  it('Pareto distribution', function () {
      var distribution = distributions.pareto(3, .75);
      var sample = distribution.sample(100);

      assert.ok(isDrawnFromDistribution(sample, 'pareto_3_.75'));
    });
});
