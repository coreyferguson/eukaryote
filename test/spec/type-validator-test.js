var TypeValidator = require('../../src/utility/type-validator');

describe('TypeValidator', function() {

	it('isDefined', function() {
		expect(TypeValidator.isDefined(null)).toBe(false);
		expect(TypeValidator.isDefined(undefined)).toBe(false);
		expect(TypeValidator.isDefined(true)).toBe(true);
		expect(TypeValidator.isDefined(false)).toBe(true);
		expect(TypeValidator.isDefined(1)).toBe(true);
		expect(TypeValidator.isDefined(1.5)).toBe(true);
		expect(TypeValidator.isDefined('asdf')).toBe(true);
		expect(TypeValidator.isDefined([])).toBe(true);
		expect(TypeValidator.isDefined({})).toBe(true);
		expect(TypeValidator.isDefined(function() {})).toBe(true);
	});

	it('isBoolean', function() {
		expect(TypeValidator.isBoolean(null)).toBe(false);
		expect(TypeValidator.isBoolean(undefined)).toBe(false);
		expect(TypeValidator.isBoolean(true)).toBe(true);
		expect(TypeValidator.isBoolean(false)).toBe(true);
		expect(TypeValidator.isBoolean(1)).toBe(false);
		expect(TypeValidator.isBoolean(0)).toBe(false);
		expect(TypeValidator.isBoolean(1.5)).toBe(false);
		expect(TypeValidator.isBoolean('asdf')).toBe(false);
		expect(TypeValidator.isBoolean([])).toBe(false);
		expect(TypeValidator.isBoolean({})).toBe(false);
		expect(TypeValidator.isBoolean(function() {})).toBe(false);
	});

	it('isString', function() {
		expect(TypeValidator.isString(null)).toBe(false);
		expect(TypeValidator.isString(undefined)).toBe(false);
		expect(TypeValidator.isString(true)).toBe(false);
		expect(TypeValidator.isString(false)).toBe(false);
		expect(TypeValidator.isString(1)).toBe(false);
		expect(TypeValidator.isString(1.5)).toBe(false);
		expect(TypeValidator.isString('asdf')).toBe(true);
		expect(TypeValidator.isString([])).toBe(false);
		expect(TypeValidator.isString({})).toBe(false);
		expect(TypeValidator.isString(function() {})).toBe(false);
	});

	it('isNumber', function() {
		expect(TypeValidator.isNumber(null)).toBe(false);
		expect(TypeValidator.isNumber(undefined)).toBe(false);
		expect(TypeValidator.isNumber(true)).toBe(false);
		expect(TypeValidator.isNumber(false)).toBe(false);
		expect(TypeValidator.isNumber(1)).toBe(true);
		expect(TypeValidator.isNumber(1.5)).toBe(true);
		expect(TypeValidator.isNumber('asdf')).toBe(false);
		expect(TypeValidator.isNumber([])).toBe(false);
		expect(TypeValidator.isNumber({})).toBe(false);
		expect(TypeValidator.isNumber(function() {})).toBe(false);
	});

	it('isInteger', function() {
		expect(TypeValidator.isInteger(null)).toBe(false);
		expect(TypeValidator.isInteger(undefined)).toBe(false);
		expect(TypeValidator.isInteger(true)).toBe(false);
		expect(TypeValidator.isInteger(false)).toBe(false);
		expect(TypeValidator.isInteger(1)).toBe(true);
		expect(TypeValidator.isInteger(1.5)).toBe(false);
		expect(TypeValidator.isInteger('asdf')).toBe(false);
		expect(TypeValidator.isInteger([])).toBe(false);
		expect(TypeValidator.isInteger({})).toBe(false);
		expect(TypeValidator.isInteger(function() {})).toBe(false);
	});

	it('isArray', function() {
		expect(TypeValidator.isArray(null)).toBe(false);
		expect(TypeValidator.isArray(undefined)).toBe(false);
		expect(TypeValidator.isArray(true)).toBe(false);
		expect(TypeValidator.isArray(false)).toBe(false);
		expect(TypeValidator.isArray(1)).toBe(false);
		expect(TypeValidator.isArray(1.5)).toBe(false);
		expect(TypeValidator.isArray('asdf')).toBe(false);
		expect(TypeValidator.isArray([])).toBe(true);
		expect(TypeValidator.isArray({})).toBe(false);
		expect(TypeValidator.isArray(function() {})).toBe(false);
	});

	it('isObject', function() {
		expect(TypeValidator.isObject(null)).toBe(false);
		expect(TypeValidator.isObject(undefined)).toBe(false);
		expect(TypeValidator.isObject(true)).toBe(false);
		expect(TypeValidator.isObject(false)).toBe(false);
		expect(TypeValidator.isObject(1)).toBe(false);
		expect(TypeValidator.isObject(1.5)).toBe(false);
		expect(TypeValidator.isObject('asdf')).toBe(false);
		expect(TypeValidator.isObject([])).toBe(false);
		expect(TypeValidator.isObject({})).toBe(true);
		expect(TypeValidator.isObject(function() {})).toBe(false);

		function CustomObject() {}
		var customObject = new CustomObject();
		expect(TypeValidator.isObject(customObject)).toBe(false);

		var customAnonymousObject = function() {};
		expect(TypeValidator.isObject(customAnonymousObject)).toBe(false);
	});

	it('isFunction', function() {
		expect(TypeValidator.isFunction(null)).toBe(false);
		expect(TypeValidator.isFunction(undefined)).toBe(false);
		expect(TypeValidator.isFunction(true)).toBe(false);
		expect(TypeValidator.isFunction(false)).toBe(false);
		expect(TypeValidator.isFunction(1)).toBe(false);
		expect(TypeValidator.isFunction(1.5)).toBe(false);
		expect(TypeValidator.isFunction('asdf')).toBe(false);
		expect(TypeValidator.isFunction([])).toBe(false);
		expect(TypeValidator.isFunction({})).toBe(false);
		expect(TypeValidator.isFunction(function() {})).toBe(true);
	});

});
