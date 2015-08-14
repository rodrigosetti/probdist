
var factorial = require('../helpers/factorial'),
	distribution = require('../helpers/distribution'),
	uniform = require('./uniform')();
	
function generateRandomGeometric(p, shifted) {
	var uvar = uniform.sample(1)[0];
	return shifted ? 
		Math.floor(Math.log(uvar) / Math.log(1 - p)) :
		Math.floor(Math.log(uvar) / Math.log(1 - p)) + 1;
}

/**
* @param {Number} p the geometric parameter 0 < p < 1
* @param {Boolean} shifted false for 1 indexed shifted true for 0 indexed
*/	
module.exports = function(p, shifted) {
	var cache = {};
	shifted = shifted || false;
	cache[0] = shifted ? p : 0;
	
	return distribution({	
		pdf: function(k) {
			if (k !== parseInt(k) || k < 0) {
				return 0;
			}
			if (k in cache) {
				return cache[k];
			} else {
				cache[k] = shifted ? 
					Math.pow(1 - p, k) * p : 
					Math.pow(1 - p, k - 1) * p;
				return cache[k];
			}
		},
		
		sample: function(n) {
			var r = [];
			for (var i = 0; i < n; i += 1) {
				r.push(generateRandomGeometric(p, shifted));
			}
			return r;
		},
		
		mean: shifted ? (1 - p) / p : 1 / p,
		
		variance: (1 - p) / Math.pow(p, 2)
	});
};