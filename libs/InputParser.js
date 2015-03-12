var InputParser = function(inputValue) {
	this.init(inputValue);
	return this.result;
};

InputParser.MIN_LENGTH = 1;

/**
 * Construct
 */
InputParser.prototype.init = function(value) {
	this.inputValue = value;
	this.result = undefined;

	this.validateInput();
};

InputParser.prototype.validateInput = function() {

	// Trim first
	this.inputValue = this.inputValue.trim();

	// Validation for empty input
	if (
		typeof this.inputValue !== 'string' ||
		this.inputValue.length < InputParser.MIN_LENGTH
	) {
		throw Error();
	}
};

module.exports = InputParser;
