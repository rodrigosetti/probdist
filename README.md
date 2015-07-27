# distributions

[![Build Status](https://travis-ci.org/rodrigosetti/distributions.svg)](https://travis-ci.org/rodrigosetti/distributions)

Probability Distributions implementations in Javascript.

The following distributions are implemented:

 * Uniform
 * Bernoulli
 * Gaussian
 * Categorical
 * Poisson
 * Chi-squared
 * Beta
 * Pareto
 * Gamma
 * Rayleigh
 * Student's T

Example of usage:

```javascript
var distributions = require('distributions');
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
