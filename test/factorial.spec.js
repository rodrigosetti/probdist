
var assert = require("assert");
var factorial = require('../helpers/factorial');

describe('Factorial', function() {

    it('should work with small numbers', function() {
        assert.equal(factorial(0)  , 1);
        assert.equal(factorial(1)  , 1);
        assert.equal(factorial(2)  , 2);
        assert.equal(factorial(3)  , 6);
        assert.equal(factorial(4)  , 24);
        assert.equal(factorial(5)  , 120);
        assert.equal(factorial(6)  , 720);
        assert.equal(factorial(7)  , 5040);
        assert.equal(factorial(8)  , 40320);
        assert.equal(factorial(9)  , 362880);
        assert.equal(factorial(10) , 3628800);
        assert.equal(factorial(11) , 39916800);
        assert.equal(factorial(12) , 479001600);
        assert.equal(factorial(13) , 6227020800);
        assert.equal(factorial(14) , 87178291200);
        assert.equal(factorial(15) , 1307674368000);
        assert.equal(factorial(16) , 20922789888000);
        assert.equal(factorial(17) , 355687428096000);
        assert.equal(factorial(18) , 6402373705728000);
        assert.equal(factorial(19) , 121645100408832000);
        assert.equal(factorial(20) , 2432902008176640000);
        assert.equal(factorial(21) , 51090942171709440000);
        assert.equal(factorial(22) , 1124000727777607680000);
        assert.equal(factorial(23) , 25852016738884976640000);
        assert.equal(factorial(24) , 620448401733239439360000);
        assert.equal(factorial(25) , 15511210043330985984000000);
    });

    it('for big numbers, is just infinity...', function() {
        assert.equal(factorial(500)   , Infinity);
        assert.equal(factorial(1000)  , Infinity);
        assert.equal(factorial(10000) , Infinity);
    });
});

