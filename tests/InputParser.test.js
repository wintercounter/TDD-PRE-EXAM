// Winter 2

var assert = require('chai').assert,
	InputParser = require('../libs/InputParser');

suite('Sample test', function() {
	setup(function() {

	});

	test('Setting value and validation', function() {
		// Empty value
		assert.throws(function(){new InputParser()}, Error);
	});
});
