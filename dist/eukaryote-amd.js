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
	var MatingStrategy = __webpack_require__(4);
	var SelectionStrategy = __webpack_require__(5);
	var TypeValidator = __webpack_require__(2);

	/**
	 * Eukaryote constructor.
	 * @options {
	 *   config: {
	 *     populationSize: optional, integer, default: 250, range: 2 <= p
	 *     numberOfGenerations: optional, integer, default: 500, range: 1 <= g
	 *   }
	 * }
	 */
	var Eukaryote = function(options) {

		options = options || {};
		options.callbacks = options.callbacks || {};
		if (!TypeValidator.isDefined(options.callbacks.fitness)) {
			throw new Error("Illegal argument: required 'fitness' function undefined");
		}
		if (!TypeValidator.isDefined(options.callbacks.mutate)) {
			throw new Error("Illegal argument: required 'mutate' function undefined");
		}

		// API
		this.callbacks = {
			fitness: options.callbacks.fitness,
			mutate: options.callbacks.mutate,
			crossover: options.callbacks.crossover,
			generation: options.callbacks.generation
		};

		// Configuration
		options.config = options.config || {};
		if (!TypeValidator.isObject(options.config)) {
			throw new Error('Illegal argument: config must be an object; actual: ' + options.config);
		}
		if (!TypeValidator.isDefined(options.config.populationSize)) {
			options.config.populationSize = 250;
		} else if (!TypeValidator.isInteger(options.config.populationSize)) {
			throw new Error('Illegal argument: config.populationSize not an integer; actual: ' + options.config.populationSize);
		} else if (options.config.populationSize < 2) {
			throw new Error('Illegal argument: config.populationSize range: 2 <= p');
		}
		if (!TypeValidator.isDefined(options.config.numberOfGenerations)) {
			options.config.numberOfGenerations = 500;
		} else if (!TypeValidator.isInteger(options.config.numberOfGenerations)) {
			throw new Error('Illegal argument: config.numberOfGenerations not an integer; actual: ' + options.numberOfGenerations);
		} else if (options.config.numberOfGenerations < 1) {
			throw new Error('Illegal argument: config.numberOfGenerations range: 1 <= g');
		}
		this.config = options.config;

		// Strategies
		options.strategy = options.strategy || {};
		this.strategy = {
			selection: options.strategy.selection || SelectionStrategy.TopXPercent(),
			mating: options.strategy.mating || MatingStrategy.Random()
		};

		// Properties
		this.population = [];

	};

	/**
	 * Creates a population of individuals copied from the given individual.
	 * 
	 * Evolutionary engine begins running against this population using the provided
	 * API functions.
	 */
	Eukaryote.prototype.seed = function(individual) {
		this.population = [];
		if (!TypeValidator.isDefined(individual)) {
			throw new Error("'individual' must be specified");
		}
		// Create population of individuals
		for (var c=0; c<this.config.populationSize; c++) {
			this.spawn(lodash.clone(individual, true));
		}
		// Loop through numberOfGenerations
		var shouldStop = false;
		this.shufflePopulation();
		this.sortPopulationByFitness();
		for (var g=0; g<this.config.numberOfGenerations && !shouldStop; g++) {
			this.selection();
			this.shufflePopulation();
			this.sortPopulationByFitness();

			// generation callback and optionally stop
			if (TypeValidator.isDefined(this.callbacks.generation)) {
				shouldStop = this.callbacks.generation(g);
				if ( !TypeValidator.isDefined(shouldStop) || !TypeValidator.isBoolean(shouldStop) ) {
					throw new Error("'generation' API function should return a boolean");
				}
			}
		}
	};


	module.exports = Eukaryote;


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
		// Set defaults + validation
		options = options || {};
		if (!TypeValidator.isDefined(options.numberOfOffspring)) {
			options.numberOfOffspring = 2;
		} else if (!TypeValidator.isInteger(options.numberOfOffspring)) {
			throw new Error('Illegal argument: numberOfOffspring must be an integer; actual: ' + options.numberOfOffspring);
		} else if (options.numberOfOffspring < 1) {
			throw new Error('Illegal argument: numberOfOffspring range: 1 <= o; actual: ' + options.numberOfOffspring);
		}
		if (!TypeValidator.isDefined(options.chromosomeLengthAsPercentOfGenotype)) {
			options.chromosomeLengthAsPercentOfGenotype = 50;
		} else if (!TypeValidator.isNumber(options.chromosomeLengthAsPercentOfGenotype)) {
			throw new Error('Illegal argument: chromosomeLengthAsPercentOfGenotype must be an integer; actual: ' + options.chromosomeLengthAsPercentOfGenotype);
		} else if (options.chromosomeLengthAsPercentOfGenotype < 1 || options.chromosomeLengthAsPercentOfGenotype > 99) {
			throw new Error('Illegal argument: chromosomeLengthAsPercentOfGenotype range: 0 < n < 100; actual: ' + options.chromosomeLengthAsPercentOfGenotype);
		}

		return function(genotypes) {
			// validate genotypes
			if (!TypeValidator.isDefined(genotypes) || !TypeValidator.isArray(genotypes)) {
				throw new Error('Illegal argument: genotypes must be an array of strings; actual: ' + genotypes);
			}
			genotypes.forEach(function(genotype) {
				if (!TypeValidator.isString(genotype)) {
					throw new Error('Illegal argument: genotypes must be strings; actual: ' + genotypes);
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

	TypeValidator.isArray = function(o) {
		var type = typeName(o);
		return type === 'Array';
	};

	TypeValidator.isObject = function(o) {
		var type = typeName(o);
		return type === 'Object';
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	var TypeValidator = __webpack_require__(2);

	var MatingStrategy = {};

	/**
	 * X number of individuals chosen at random for reproduction.
	 * @param options {
	 *   numberOfIndividuals: optional, integer, default: 2, range: 2 <= i <= population.length
	 * }
	 */
	MatingStrategy.Random = function(options) {
		options = options || {};
		if (!TypeValidator.isDefined(options.numberOfIndividuals)) {
			options.numberOfIndividuals = 2;
		} else if (options.numberOfIndividuals < 2) {
			throw new Error('Illegal argument: numberOfIndividuals range: 2 <= i <= population.length');
		}
		return {
			begin: function() { },
			mate: function(population) {
				if (options.numberOfIndividuals > population.length) {
					throw new Error('Illegal argument: numberOfIndividuals range: 2 <= i <= population.length');
				}
				var individuals = [];
				for (var c=0; c<options.numberOfIndividuals; c++) {
					var randomIndividualIndex = Math.floor( Math.random()*population.length );
					var randomIndividual = population[randomIndividualIndex];
					individuals.push(randomIndividual);
				}
				return individuals;
			},
			end: function() { }
		};
	};

	/**
	 * Individuals chosen sequentially from population ordered by fitness starting with most fit individual.
	 * @param {
	 *   numberOfIndividuals: optional, integer, default: 2, range: 2 <= i <= population.length
	 * }
	 */
	MatingStrategy.Sequential = function(options) {
		options = options || {};
		if (!TypeValidator.isDefined(options.numberOfIndividuals)) {
			options.numberOfIndividuals = 2;
		} else if (options.numberOfIndividuals < 2) {
			throw new Error('Illegal argument: numberOfIndividuals range: 2 <= i <= population.length');
		}
		var currentIndex;
		return {
			begin: function() {
				currentIndex = 0;
			},
			mate: function(population) {
				if (options.numberOfIndividuals > population.length) {
					throw new Error('Illegal argument: numberOfIndividuals range: 2 <= i <= population.length');
				}
				var individuals = [];
				for (var c=0; c<options.numberOfIndividuals; c++) {
					if (currentIndex >= population.length) {
						currentIndex = 0;
					}
					individuals.push(population[currentIndex++]);
				}
				return individuals;
			},
			end: function() { }
		};
	};


	/**
	 * Father is chosen sequentially from population ordered by fitness starting with the most fit individual. 
	 * Mother is chosen randomly.
	 * @param {
	 *   numberOfIndividuals: optional, integer, default: 2, range: 2 <= i <= population.length
	 * }
	 */
	MatingStrategy.SequentialRandom = function(options) {
		options = options || {};
		if (!TypeValidator.isDefined(options.numberOfIndividuals)) {
			options.numberOfIndividuals = 2;
		} else if (options.numberOfIndividuals < 2) {
			throw new Error('Illegal argument: numberOfIndividuals range: 2 <= i <= population.length');
		}
		var currentIndex;
		return {
			begin: function() {
				currentIndex = 0;
			},
			mate: function(population) {
				if (options.numberOfIndividuals > population.length) {
					throw new Error('Illegal argument: numberOfIndividuals range: 2 <= i <= population.length');
				}
				var individuals = [];
				if (currentIndex >= population.length) {
					currentIndex = 0;
				}
				individuals.push(population[currentIndex++]);
				for (var c=0; c<options.numberOfIndividuals-1; c++) {
					var randomIndividualIndex = Math.floor( Math.random()*population.length );
					individuals.push(population[randomIndividualIndex]);
				}
				return individuals;
			},
			end: function() { }
		};
	};

	module.exports = MatingStrategy;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var TypeValidator = __webpack_require__(2);

	var SelectionStrategy = {};

	/**
	 * X number of individuals survive for reproduction.
	 * @param options {
	 *   numberOfIndividuals: optional, integer, default: 1, range: 0 < i <= population.length
	 * }
	 */
	SelectionStrategy.TopX = function(options) {
		options = options || {};
		if (!TypeValidator.isDefined(options.numberOfIndividuals)) {
			options.numberOfIndividuals = 1;
		} else if (options.numberOfIndividuals <= 0) {
			throw new Error("Illegal argument: numberOfIndividuals range: 0 < i <= population.length");		
		} else if (!TypeValidator.isInteger(options.numberOfIndividuals)) {
			throw new Error('Illegal argument: numberOfIndividuals must be a valid integer');
		}
		return function(population) {
			if (options.numberOfIndividuals > population.length) {
				throw new Error("Illegal argument: numberOfIndividuals range: 0 < i <= population.length");
			}
			var numberOfCasualties = population.length - options.numberOfIndividuals;
			population.splice(options.numberOfIndividuals, numberOfCasualties);
		};
	};

		/**
		 * Only top X percent of individuals survive to reproduce.
		 * @param options {
		 *   probability: optional, float, default: 0.1, range: 0 < f < 1
		 * }
		 */
	SelectionStrategy.TopXPercent = function(options) {
			options = options || {};
			if (options.probability === null || options.probability === undefined) {
				options.probability = 0.1;
			} else if (options.probability <= 0 || options.probability >= 1) {
				throw new Error("Illegal argument: probability range: 0 < f < 1");
			}
			return function(population) {
				var numberOfSuvivors = Math.floor(population.length * options.probability);
				if (numberOfSuvivors <= 0) numberOfSuvivors++;
				var numberOfCasualties = population.length - numberOfSuvivors;
				population.splice(numberOfSuvivors, numberOfCasualties);
			};
	};

	/**
	 * For each individual in a population starting with the most fit individual,
	 * x% probability of death where x grows as the individuals get less and less fit.
	 */
	SelectionStrategy.RandomWeightedByRank = function() {
		return function(population) {
			var summation = population.length*(population.length+1)/2;
			for (var index=population.length; index>=0; index--) {
				var probabilityOfDeath = (index+1) / summation;
				var randomProbability = Math.random();
				if (randomProbability <= probabilityOfDeath && population.length > 1) {
					population.splice(index, 1);
				}
			}
		};
	};

	module.exports = SelectionStrategy;


/***/ }
/******/ ])});;