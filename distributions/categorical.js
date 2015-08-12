
var distribution = require('../helpers/distribution');

module.exports = function(probs) {
  var expectedValue = 0,
	  expectedValueSquared = 0,
	  variance = 0,
	  allValuesNumbers = true,
	  val;
  
  for (val in probs) {
	  if (probs.hasOwnProperty(val)) {
		  if (isNaN(val) || val === '') {
			allValuesNumbers = false;
			break;  
		  }
	  }
  }
  
  if (allValuesNumbers) {
	for (val in probs) {
		if (probs.hasOwnProperty(val)) {
			expectedValue += val * probs[val];
			expectedValueSquared += Math.pow(val, 2) * probs[val];
		}
	}
	variance = expectedValueSquared - Math.pow(expectedValue, 2);
  } else {
	  expectedValue = undefined;
	  variance = undefined;
  }
  
  return distribution({
    pdf: probs,
	
	mean: expectedValue,
	
	variance: variance
  });
};
