
var distribution = require('../helpers/distribution');

module.exports = function(min, max) {
	if (max === undefined) {
		max = min;
		min = 1;
	}
	min = parseInt(min, 10);
	max = parseInt(max, 10);
	var pdf = {},
		prob = 1 / (max - min + 1),
		x;
		
	for (x = min; x <= max; x += 1) {
		pdf[x] = prob;
	}

	return distribution({
		pdf : pdf,
		
		mean: (min + max) / 2,
		
		variance: (Math.pow(max - min + 1, 2) - 1) / 12
	});
};