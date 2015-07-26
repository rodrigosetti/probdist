
var constants = require('./constants');

function productFactorial(n) {
  var r = 1;
  for (var i=1; i <= n; i++) {
    r *= i;
  }
  return r;
}

function stirlingApproximation(n) {
  return Math.round(Math.sqrt(constants.two_pi * n) *
                    Math.pow(n / constants.e, n));
}

module.exports = function (n) {
  if (Math.abs(n) < 100) {
    return productFactorial(n);
  } else {
    return stirlingApproximation(n);
  }
};
