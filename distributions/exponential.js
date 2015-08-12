
var distribution = require('../helpers/distribution'),
	gamma = require('./gamma');

module.exports = function(lambda) {
	return gamma(1, 1 / lambda);
	// return distribution({
		// pdf: function(x) {
				// return x >= 0 ?
				// lambda * Math.exp(-lambda * x) :
				// 0;
		// },
		
		// mean: 1 / lambda,
		
		// variance: 1 / (lambda * lambda)
	// });
};