
var TypeValidator = require('./type-validator');

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
