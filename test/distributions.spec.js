
var assert = require("assert");
var fs = require('fs');
var distributions = require('../index.js');

function empiricalPDF(x) {
    return function(t) {
        var i, n = x.length;
        for (i=0; i < n; i++) {
          if (parseFloat(x[i], 10) > t) {
            break;
          }
        }
        return i / n;
    };
}

function numberSort(a, b) {  return a - b; }

var C_ALPHA = 1.95; //equates to alpha level .001

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

  //return if we failed to reject the null hypothesis that
  //y and sample came from the same distribution
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
  this.timeout(10000);

  it('Uniform sample', function () {

    var distribution = distributions.uniform(-2, 20);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'uniform_-2_20'));
	assert.equal(distribution.mean, 9);
	assert.equal(distribution.variance, 22 * 22 / 12);
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
	assert.equal(distribution.mean, 0.5);
	assert.equal(distribution.variance, 1 / 12);
  });
  
  it('Discrete uniform sample', function () {
	var distribution = distributions.discreteuniform(1, 20); 
	var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'discreteuniform_1_20'));
	assert.equal(distribution.mean, 21 / 2);
	assert.equal(distribution.variance, 399 / 12);
  });
  
  it('Binomial sample', function () {
	var distribution = distributions.binomial(10, 0.3);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'binomial_10_.3'));
	assert.equal(distribution.mean, 3);
	assert.equal(distribution.variance, 10 * 0.3 * 0.7); 
  });
  
  it('Negative binomial sample', function () {
	var distribution = distributions.negativebinomial(4, 0.2);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'negativebinomial_4_.2'));
	assert.equal(distribution.mean, 1);
	assert.equal(distribution.variance.toFixed(2), 1.25); 
  });
  
  it('Shifted Geometric sample', function () {
	var distribution = distributions.geometric(0.1, true);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'geometric_.1'));
	assert.equal(distribution.mean, 9);
	assert.equal(distribution.variance.toFixed(2), 90); 
  });

  it('Gaussian sample', function () {
    var distribution = distributions.gaussian(1, 4);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'gaussian_1_4'));
	assert.equal(distribution.mean, 1);
	assert.equal(distribution.variance, 16);
  });

  it('Gaussian sample default', function () {
    var distribution = distributions.gaussian(); // should default to 0,1
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'normal'));
	assert.equal(distribution.mean, 0);
	assert.equal(distribution.variance, 1);
  });

  it('Poisson sample', function () {
    var distribution = distributions.poisson(3);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'poisson_3'));
	assert.equal(distribution.mean, 3);
	assert.equal(distribution.variance, 3);
  });

  it('Poisson probability distribution function', function () {
    var distribution = distributions.poisson(5);

    assert.equal(distribution.pdf(0), 1);
    assert.ok(Math.abs(distribution.pdf(1) - 1.839397205857212) < 0.01);
    assert.ok(Math.abs(distribution.pdf(2) - 1.6916910404576588) < 0.01);
    assert.ok(Math.abs(distribution.pdf(3) - 1.0372305909971657) < 0.01);
    assert.ok(Math.abs(distribution.pdf(4) - 0.4769697627274527) < 0.01);
    assert.ok(Math.abs(distribution.pdf(5) -  0.17546736976785074) < 0.01);
	assert.equal(distribution.mean, 5);
	assert.equal(distribution.variance, 5);
  });

  it('Bernoulli sample', function () {
    var distribution = distributions.bernoulli(0.8);
    var sample = distribution.sample(10000);
    var counts = categoryCount(sample);

    assert.ok( Math.abs(counts[0] / sample.length - 0.2) < 0.01 );
    assert.ok( Math.abs(counts[1] / sample.length - 0.8) < 0.01 );
	assert.equal(distribution.mean, 0.8);
	assert.equal(distribution.variance.toFixed(2), (0.8 * 0.2).toFixed(2));
  });

  it('Categorical sample', function () {
    var distribution = distributions.categorical({ a: 0.1, b: 0.5, c: 0.2, d: 0.2});
    var sample = distribution.sample(10000);
    var counts = categoryCount(sample);

    assert.ok( Math.abs(counts.a / sample.length - 0.1) < 0.01 );
    assert.ok( Math.abs(counts.b / sample.length - 0.5) < 0.01 );
    assert.ok( Math.abs(counts.c / sample.length - 0.2) < 0.01 );
    assert.ok( Math.abs(counts.d / sample.length - 0.2) < 0.01 );
	assert.equal(distribution.mean, undefined);
	assert.equal(distribution.variance, undefined);
  });
  
  it('Categorical mean and variance', function () {
	  var distribution = distributions.categorical({0: 0.5, '1': 0.25, '2': 0.25});
	  assert.equal(distribution.mean, 0.75);
	  assert.equal(distribution.variance, 0.6875); 
  });

  it('Chi-Squared sample', function () {
    var distribution = distributions.chisquare(2);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'chisquare_2'));
	assert.equal(distribution.mean, 2);
	assert.equal(distribution.variance, 4);
  });

  it('Beta sample', function () {
    var distribution = distributions.beta(2, 1);
    var sample = distribution.sample(100);

    assert.ok(isDrawnFromDistribution(sample, 'beta_2_1'));
	assert.equal(distribution.mean, 2 / 3);
	assert.equal(distribution.variance, 2 / (9*4));
  });

  it('Pareto sample', function () {
      var distribution = distributions.pareto(3, 0.75);
      var sample = distribution.sample(100);
	  
      assert.ok(isDrawnFromDistribution(sample, 'pareto_3_.75'));
	  assert.equal(distribution.mean, Number.POSITIVE_INFINITY);
	  assert.equal(distribution.variance, undefined);
  });

  it('Gamma sample', function () {
      var distribution = distributions.gamma(4, 2);
      var sample = distribution.sample(100);

      assert.ok(isDrawnFromDistribution(sample, 'gamma_4_2'));
	  assert.equal(distribution.mean, 8);
	  assert.equal(distribution.variance, 16);
  });

  it('Rayleigh sample', function () {
      var distribution = distributions.rayleigh(1);
      var sample = distribution.sample(100);

      assert.ok(isDrawnFromDistribution(sample, 'rayleigh_1'));
	  assert.equal(distribution.mean, Math.sqrt(Math.PI / 2));
	  assert.equal(distribution.variance, (4 - Math.PI) / 2);
  });

  it("Student's T sample", function () {
      var distribution = distributions.t(0.5);
      var sample = distribution.sample(100);

      assert.ok(isDrawnFromDistribution(sample, 't_.5'));
	  assert.equal(distribution.mean, undefined);
	  assert.equal(distribution.variance, undefined);
	  
      distribution = distributions.t(7);
      sample = distribution.sample(100);

      assert.ok(isDrawnFromDistribution(sample, 't_7'));
	  assert.equal(distribution.mean, 0);
	  assert.equal(distribution.variance, 1.4);
  });
  
  it("Snedecor's F sample", function () {
      var distribution = distributions.f(5, 5);
      var sample = distribution.sample(100);
	
      assert.ok(isDrawnFromDistribution(sample, 'F_5_5'));
	  assert.equal(distribution.mean.toFixed(2), 1.67);
	  assert.equal(distribution.variance.toFixed(2), 8.89);
  });
  
  it("Snedecor's F mean and variance", function () {
	  var distribution = distributions.f(4, 3);
	  
	  assert.equal(distribution.mean, 3);
	  assert.equal(distribution.variance, undefined);
	  
	  distribution = distributions.f(2, 1);
	  
	  assert.equal(distribution.mean, undefined);
	  assert.equal(distribution.variance, undefined);
  });
  
});
