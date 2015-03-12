var InputParser = function(inputValue) {
	this.init(inputValue);
};

InputParser.MIN_LENGTH        = 1;
InputParser.DEFAULT_DELIMITER = ',';
InputParser.NEWLINE_CHAR      = '\n';

/**
 * Construct
 */
InputParser.prototype.init = function(value) {
	this.inputValue   = value;
	this._resultValue = this.inputValue;
	this._isMultiline = false;

	this._setDelimiter();
	this._validateInput();
	this._clearInput();
	this._detectActions();
	this._parseInput();
};

// Detect action based on format
InputParser.prototype._detectActions = function(){
	// Is multi-line?
	if (this._resultValue.indexOf(InputParser.NEWLINE_CHAR) !== -1) {
		this._isMultiline = true;
		this._setDelimiter(InputParser.NEWLINE_CHAR);
	}
};

// Detect action based on format
InputParser.prototype._setDelimiter = function(delimiter){
	this._currentDelimiter = delimiter || InputParser.DEFAULT_DELIMITER;
};

InputParser.prototype._clearInput = function() {
	this._resultValue = this._resultValue
		//Replace multiple delimiter
		.replace(new RegExp('[' + this._currentDelimiter + ']+', 'g'), this._currentDelimiter)
		// Trim whitespace
		.trim()
		// Trim delimiter
		.replace(new RegExp('^' + this._currentDelimiter + '+|' + this._currentDelimiter + '+$', 'g'), '');

	// Re-validate, maybe we're not valid after cleaning also
	this._validateInput();
};

InputParser.prototype._parseInput = function(value) {
	this._resultValue = this._resultValue.split(this._currentDelimiter);

	if (this._isMultiline) {
		this._resultValue.forEach(function(value, index){
			try {
				this._resultValue[index] = new InputParser(value).getResult();
			}
			catch(Error) {
				throw Error;
			}
		}.bind(this));
	}
};

InputParser.prototype._validateInput = function() {
	// Validation for empty input
	if (
		typeof this._resultValue !== 'string' ||
		this._resultValue.length < InputParser.MIN_LENGTH
	) {
		throw Error();
	}
};

InputParser.prototype.getResult = function() {
	return this._resultValue;
};

module.exports = InputParser;
