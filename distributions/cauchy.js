
var distribution = require('../helpers/distribution');

module.exports = function(x0, gamma) {
	if (gamma === undefined) {
		gamma = 1;
	}
	if (x0 === undefined) {
		x0 = 0;
	}
	
	return distribution({
		pdf: function(x) {
			return 1 / (Math.PI * gamma * (1 + Math.pow((x - x0) / gamma, 2)));
		},
		
		mean: undefined,
		
		variance: undefined
	});
};