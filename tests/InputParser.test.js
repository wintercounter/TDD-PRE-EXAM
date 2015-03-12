// Winter 2

var assert = require('chai').assert,
	InputParser = require('../libs/InputParser');

suite('Sample test', function() {
	setup(function() {

	});

	test('Setting value and validate', function() {

		// Invalid
		assert.throws(function(){new InputParser()}, Error);
		assert.throws(function(){new InputParser('')}, Error);
		assert.throws(function(){new InputParser(false)}, Error);
		assert.throws(function(){new InputParser(null)}, Error);
		assert.throws(function(){new InputParser(undefined)}, Error);
		assert.throws(function(){new InputParser(3)}, Error);
		assert.throws(function(){new InputParser(' ')}, Error);
		assert.throws(function(){new InputParser('   ')}, Error);
		assert.throws(function(){new InputParser('\n')}, Error);
		assert.throws(function(){new InputParser('\n\n')}, Error);
		assert.throws(function(){new InputParser('\t')}, Error);
		assert.throws(function(){new InputParser('\t\t')}, Error);

		// Valid
		assert.doesNotThrow(function(){new InputParser('a')}, Error);
		assert.doesNotThrow(function(){new InputParser('a,a')}, Error);
		assert.doesNotThrow(function(){new InputParser('  a')}, Error);
		assert.doesNotThrow(function(){new InputParser('a  ')}, Error);
		assert.doesNotThrow(function(){new InputParser('0')}, Error);
		assert.doesNotThrow(function(){new InputParser('743  \n')}, Error);
	});
});
