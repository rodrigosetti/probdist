
var assert = require("assert");
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

  it('Uniform sample', function () {

    var distribution = distributions.uniform(-2, 20);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'uniform_-2_20'));
  });

  it('Uniform probability density function', function () {

    var distribution = distributions.uniform(); // defaults to 0-1

    assert.equal(distribution.pdf(-100), 0);
    assert.equal(distribution.pdf(-10), 0);
    assert.equal(distribution.pdf(-1), 0);
    assert.equal(distribution.pdf(0), 1);
    assert.equal(distribution.pdf(0.1), 1);
    assert.equal(distribution.pdf(0.25), 1);
    assert.equal(distribution.pdf(0.5), 1);
    assert.equal(distribution.pdf(0.75), 1);
    assert.equal(distribution.pdf(1), 1);
    assert.equal(distribution.pdf(2), 0);
    assert.equal(distribution.pdf(10), 0);
    assert.equal(distribution.pdf(100), 0);
  });

  it('Gaussian sample', function () {
    var distribution = distributions.gaussian(1, 4);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'gaussian_1_4'));
  });

  it('Gaussian sample default', function () {
    var distribution = distributions.gaussian(); // should default to 0,1
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'normal'));
  });

  it('Poisson sample', function () {
    var distribution = distributions.poisson(3);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'poisson_3'));
  });

  it('Poisson probability distribuion function', function () {
    var distribution = distributions.poisson(5);

    assert.equal(distribution.pdf(0), 1);
    assert.ok(Math.abs(distribution.pdf(1) - 1.839397205857212) < 0.01);
    assert.ok(Math.abs(distribution.pdf(2) - 1.6916910404576588) < 0.01);
    assert.ok(Math.abs(distribution.pdf(3) - 1.0372305909971657) < 0.01);
    assert.ok(Math.abs(distribution.pdf(4) - 0.4769697627274527) < 0.01);
    assert.ok(Math.abs(distribution.pdf(5) -  0.17546736976785074) < 0.01);

  });

  it('Bernoulli sample', function () {
    var distribution = distributions.bernoulli(0.8);
    var sample = distribution.sample(10000);
    var counts = categoryCount(sample);

    assert.ok( Math.abs(counts[0] / sample.length - 0.2) < 0.01 );
    assert.ok( Math.abs(counts[1] / sample.length - 0.8) < 0.01 );
  });

  it('Categorical sample', function () {
    var distribution = distributions.categorical({ a: 0.1, b: 0.5, c: 0.2, d: 0.2});
    var sample = distribution.sample(10000);
    var counts = categoryCount(sample);

    assert.ok( Math.abs(counts.a / sample.length - 0.1) < 0.01 );
    assert.ok( Math.abs(counts.b / sample.length - 0.5) < 0.01 );
    assert.ok( Math.abs(counts.c / sample.length - 0.2) < 0.01 );
    assert.ok( Math.abs(counts.d / sample.length - 0.2) < 0.01 );
  });

  it('Chi-Squared sample', function () {
    var distribution = distributions.chisquare(2);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'chisquare_2'));
  });

  it('Beta sample', function () {
    var distribution = distributions.beta(2, 1);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'beta_2_1'));
  });

  it('Pareto sample', function () {
      var distribution = distributions.pareto(3, 0.75);
      var sample = distribution.sample(100);

      assert.ok(isDrawnFromDistribution(sample, 'pareto_3_.75'));
  });

  it('Gamma sample', function () {
      var distribution = distributions.gamma(4, 2);
      var sample = distribution.sample(100);

      assert.ok(isDrawnFromDistribution(sample, 'gamma_4_2'));
  });

  it('Rayleigh sample', function () {
      var distribution = distributions.rayleigh(1);
      var sample = distribution.sample(100);

      assert.ok(isDrawnFromDistribution(sample, 'rayleigh_1'));
  });

  it("Student's T sample", function () {
      var distribution = distributions.t(0.5);
      var sample = distribution.sample(100);

      assert.ok(isDrawnFromDistribution(sample, 't_.5'));

      distribution = distributions.t(7);
      sample = distribution.sample(100);

      assert.ok(isDrawnFromDistribution(sample, 't_7'));
  });
});
