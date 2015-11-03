define(function() { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	var CrossoverStrategy = __webpack_require__(1);
	// console.log('CrossoverStrategy:', CrossoverStrategy);

	module.exports = CrossoverStrategy;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	var TypeValidator = __webpack_require__(2);

	var CrossoverStrategy = {};

	/**
	 * Crossover two genotypes of type 'string'. Replace similar segments of
	 * string genotypes.
	 *
	 * @param options {
	 *     numberOfOffspring: optional, integer, default: 2, range: 1 <= o
	 *     chromosomeLengthAsPercentOfGenotype: optional, float, default: 50, range: 0 < n < 100
	 * }
	 * 
	 * Examples: 
	 * - 'abc'  + 'xyz'  = 'xbc'  & 'ayz'
	 * - 'abcd' + 'xyz'  = 'aycd' & 'xbz'
	 * - 'abc'  + 'wxyz' = 'aby'  & 'wxcz'
	 */
	CrossoverStrategy.SimilarStrings = function(options) {
		// defaults
		options = options || {};
		if (!TypeValidator.isDefined(options.numberOfOffspring)) {
			options.numberOfOffspring = 2;
		} else if (options.numberOfOffspring < 1) {
			throw new Error('Illegal argument: numberOfOffspring range: 1 <= o');
		}
		if (!TypeValidator.isDefined(options.chromosomeLengthAsPercentOfGenotype)) { options.chromosomeLengthAsPercentOfGenotype = 50; }
		// validation
		if (!TypeValidator.isNumber(options.numberOfOffspring)) {
			throw new Error("Option 'numberOfOffspring' must be a number. Found the " + 
				typeName(options.numberOfOffspring) + ": " + options.numberOfOffspring);
		}
		if (options.numberOfOffspring <= 0) {
			throw new Error("Option 'numberOfOffspring' must be larger than 0.");
		}
		if (!TypeValidator.isNumber(options.chromosomeLengthAsPercentOfGenotype)) {
			throw new Error("Option 'chromosomeLengthAsPercentOfGenotype' must be a number. Found the " + 
				typeName(options.chromosomeLengthAsPercentOfGenotype) + ": " + options.chromosomeLengthAsPercentOfGenotype);
		}
		if (options.chromosomeLengthAsPercentOfGenotype < 1 || options.chromosomeLengthAsPercentOfGenotype > 100) {
			throw new Error("Option 'chromosomeLengthAsPercentOfGenotype' must be > 0 and <= 100");
		}
		return function(genotypes) {
			// validate all genotypes are of type 'string'
			genotypes.forEach(function(genotype) {
				if (!TypeValidator.isString(genotype)) {
					throw new Error("genotypes provided to CrossoverStrategy.SimilarStrings must be of type 'string'");
				}
			});
			// identify chromosome length
			var smallestGenotype = genotypes[0];
			genotypes.forEach(function(genotype) {
				if (genotype.length < smallestGenotype.length) {
					smallestGenotype = genotype;
				}
			});
			var chromosomeLength = Math.floor(smallestGenotype.length * options.chromosomeLengthAsPercentOfGenotype / 100);
			var minIndex = 0;
			var maxIndex = smallestGenotype.length - chromosomeLength;
			// retrieve similar chromosomes
			var randomIndex = Math.floor( Math.random() * (maxIndex+1) );
			if (randomIndex === 0) { randomIndex++; }
			var section1 = [];
			var section2 = [];
			var section3 = [];
			genotypes.forEach(function(genotype) {
				section1.push( genotype.substring(0, randomIndex) );
				section2.push( genotype.substring(randomIndex, randomIndex+chromosomeLength) );
				section3.push( genotype.substring(randomIndex+chromosomeLength, genotype.length) );
			});
			// create offspring from random chromosomes
			var offspring = [];
			for (var c=0; c<options.numberOfOffspring; c++) {
				var randomIndex1 = Math.floor( Math.random()*section1.length );
				var randomIndex2 = Math.floor( Math.random()*section2.length );
				var randomIndex3 = Math.floor( Math.random()*section3.length );
				var newIndividual = section1[randomIndex1] + section2[randomIndex2] + section3[randomIndex3];
				offspring.push(newIndividual);
			}
			return offspring;
		};

	};

	module.exports = CrossoverStrategy;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var typeName = __webpack_require__(3);
		
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

	module.exports = TypeValidator;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * type-name - Just a reasonable typeof
	 * 
	 * https://github.com/twada/type-name
	 *
	 * Copyright (c) 2014-2015 Takuto Wada
	 * Licensed under the MIT license.
	 *   http://twada.mit-license.org/2014-2015
	 */
	'use strict';

	var toStr = Object.prototype.toString;

	function funcName (f) {
	    return f.name ? f.name : /^\s*function\s*([^\(]*)/im.exec(f.toString())[1];
	}

	function ctorName (obj) {
	    var strName = toStr.call(obj).slice(8, -1);
	    if (strName === 'Object' && obj.constructor) {
	        return funcName(obj.constructor);
	    }
	    return strName;
	}

	function typeName (val) {
	    var type;
	    if (val === null) {
	        return 'null';
	    }
	    type = typeof(val);
	    if (type === 'object') {
	        return ctorName(val);
	    }
	    return type;
	}

	module.exports = typeName;


/***/ }
/******/ ])});;