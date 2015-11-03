var typeName = require('type-name');

/**
 * @memberof Eukaryote.Utility
 * @namespace TypeValidator
 * @description Property type validation.
 */
var TypeValidator = {};

/**
 * @memberof Eukaryote.Utility.TypeValidator
 * @function isDefined
 * @static
 * @description Validate object is not null or undefined.
 * @param {*} property
 */
TypeValidator.isDefined = function(o) {
	return o !== null && o !== undefined;
};

/**
 * @memberof Eukaryote.Utility.TypeValidator
 * @function isBoolean
 * @static
 * @description Validate object is a boolean.
 * @param {*} property
 */
TypeValidator.isBoolean = function(o) {
	var type = typeName(o);
	return type === 'boolean' || type === 'Boolean';
};

/**
 * @memberof Eukaryote.Utility.TypeValidator
 * @function isString
 * @static
 * @description Validate object is a string.
 * @param {*} property
 */
TypeValidator.isString = function(o) {
	var type = typeName(o);
	return type === 'string' || type === 'String';
};

/**
 * @memberof Eukaryote.Utility.TypeValidator
 * @function isNumber
 * @static
 * @description Validate object is a real number (not NaN or Infinity)
 * @param {*} property
 */
TypeValidator.isNumber = function(o) {
	var type = typeName(o);
	return type === 'number' && !isNaN(o) && o !== Infinity;
};

/**
 * @memberof Eukaryote.Utility.TypeValidator
 * @function isNumber
 * @static
 * @description Validate object is a whole number.
 * @param {*} property
 */
TypeValidator.isInteger = function(o) {
	if (TypeValidator.isNumber(o)) {
		return (o % 1 === 0);
	} else {
		return false;
	}
};

/**
 * @memberof Eukaryote.Utility.TypeValidator
 * @function isArray
 * @static
 * @description Validate object is an array.
 * @param {*} property
 */
TypeValidator.isArray = function(o) {
	var type = typeName(o);
	return type === 'Array';
};

/**
 * @memberof Eukaryote.Utility.TypeValidator
 * @function isObject
 * @static
 * @description Validate object is an object.
 * @param {*} property
 */
TypeValidator.isObject = function(o) {
	var type = typeName(o);
	return type === 'Object';
};

/**
 * @memberof Eukaryote.Utility.TypeValidator
 * @function isFunction
 * @static
 * @description Validate object is a function.
 * @param {*} property
 */
TypeValidator.isFunction = function(o) {
	var type = typeName(o);
	return type === 'function';
};

module.exports = TypeValidator;
