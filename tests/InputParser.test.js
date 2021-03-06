// Winter 2

var assert = require('chai').assert,
	InputParser = require('../libs/InputParser');

suite('Sample test', function() {

	var Instance;

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

	test('Test "getResult" method', function() {
		// Simply test splitting
		assert.isArray(new InputParser('a').getResult());
		assert.isArray(new InputParser('a,b,c').getResult());
		assert.isArray(new InputParser('a,,d,,h,').getResult());

		// Test correct length
		assert.strictEqual(new InputParser('a').getResult().length, 1);
		assert.strictEqual(new InputParser('a,b,c').getResult().length, 3);
		assert.strictEqual(new InputParser('a,,d,,h,').getResult().length, 3);
	});

	test('Check action detector (multiline)', function() {
		assert.isFalse(new InputParser('a')._isMultiline);
		assert.isTrue(new InputParser("a\na")._isMultiline);
		assert.isFalse(new InputParser("a\n")._isMultiline);
		assert.isFalse(new InputParser("\na\n")._isMultiline);
		assert.isFalse(new InputParser("\na")._isMultiline);
		assert.isTrue(new InputParser("\na\na\n")._isMultiline);
		assert.strictEqual(new InputParser("\na\na\n").getResult().length, 2);
		assert.isArray(new InputParser("\na,b\na\n").getResult()[0]);
		assert.strictEqual(new InputParser("\na\na\n").getResult().length, 2);
	});
});
