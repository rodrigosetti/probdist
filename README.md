# probdist

[![Build Status](https://travis-ci.org/rodrigosetti/probdist.svg?branch=master)](https://travis-ci.org/rodrigosetti/probdist) [![Coverage Status](https://coveralls.io/repos/rodrigosetti/probdist/badge.svg?branch=master&service=github)](https://coveralls.io/github/rodrigosetti/probdist?branch=master)

[![NPM](https://nodei.co/npm/probdist.png)](https://npmjs.org/package/probdist)

Probability Distributions implementations in Javascript.

The following distributions are implemented:

 * Uniform
 * Discrete Uniform
 * Bernoulli
 * Binomial
 * Negative Binomial
 * Geometric
 * Gaussian
 * Cauchy
 * Categorical
 * Poisson
 * Exponential
 * Chi-squared
 * Beta
 * Pareto
 * Gamma
 * Rayleigh
 * Student's T
 * Snedecor's F

Example of usage:

```javascript
var distributions = require('probdist');
var X = distributions.gaussian(0, 1);

X.sample(10);
// [ 0.5658508553376578,
//   0.028141615149934296,
//   0.35359657318758764,
//   -0.5021456049431663,
//   0.7315022110154814,
//   0.12995158841761167,
//   0.6366737204564288,
//   -0.7940757196582808,
//   0.8273505445946512,
//   -2.352834867962656 ]
```
