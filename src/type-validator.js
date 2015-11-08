var typeName = require('type-name');
	
var TypeValidator = {};

/**
 * Validate object is not null or undefined.
 */
TypeValidator.isDefined = function(o) {
	return o !== null && o !== undefined;
};

/**
 * Validate object is a boolean.
 */
TypeValidator.isBoolean = function(o) {
	var type = typeName(o);
	return type === 'boolean' || type === 'Boolean';
};

/**
 * Validate object is a string.
 */
TypeValidator.isString = function(o) {
	var type = typeName(o);
	return type === 'string' || type === 'String';
};

/**
 * Validate object is a real number (not NaN or Infinity)
 */
TypeValidator.isNumber = function(o) {
	var type = typeName(o);
	return type === 'number' && !isNaN(o) && o !== Infinity;
};

/**
 * Validate object is a whole number.
 */
TypeValidator.isInteger = function(o) {
	if (TypeValidator.isNumber(o)) {
		return (o % 1 === 0);
	} else {
		return false;
	}
};

TypeValidator.isArray = function(o) {
	var type = typeName(o);
	return type === 'Array';
};

TypeValidator.isObject = function(o) {
	var type = typeName(o);
	return type === 'Object';
};

module.exports = TypeValidator;
