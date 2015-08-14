
var distribution = require('../helpers/distribution'),
	factorial = require('../helpers/factorial'),
	geometric = require('./geometric');
	
function generateRandomNegativeBinomial(r, p) {
	//Negative Binomial random variable is the sum of 
	//r independent Geometric random variables
	var geosample = geometric(p, true).sample(r),
		sum = 0,
		i;
	
	for (i = 0; i < r; i += 1) {
		sum += geosample[i];
	}
	return sum;
}	
	
module.exports = function(r, p) {
	var k,
		rm1factorial = factorial(r - 1),
		cache = {};
		
	return distribution({
		pdf: function(k) {
			if (k !== parseInt(k) || k < 0) {
				return 0;
			}
			if (k in cache) {
				return cache[k];
			} else {
				cache[k] = (factorial(k + r - 1) / (factorial(k) * rm1factorial)) *
							Math.pow(p, k) * Math.pow(1 - p, r);
				return cache[k];
			}
		},
		
		sample: function(n) {
			var result = [];
			for (var i = 0; i < n; i += 1) {
				result.push(generateRandomNegativeBinomial(r, p));
			}
			return result;
		},
		
		mean: p * r / (1 - p),
		
		variance: p * r / Math.pow(1 - p, 2)
	});
};