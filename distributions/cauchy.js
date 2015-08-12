
var distribution = require('../helpers/distribution');

module.exports = function(x0, lambda) {
	if (lambda === undefined) {
		lambda = 1;
	} 
	if (x0 === undefined) {
		x0 = 0;
	}
	
	return distribution({
		pdf: function(x) {
			return 1 / (Math.PI * lambda * (1 + Math.pow((x - x0) / lambda, 2)));
		},
		
		mean: undefined,
		
		variance: undefined
	});
};