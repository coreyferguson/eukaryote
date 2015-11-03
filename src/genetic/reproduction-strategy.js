
var TypeValidator = require('../utility/type-validator');

/**
 * @memberof Eukaryote.Genetic
 * @namespace ReproductionStrategy
 * 
 * @description Reproduction strategies determine which individuals reproduce. 
 * The individuals chosen here will be passed into [crossover strategy]{@link Eukaryote.Genetic.CrossoverStrategy}
 * if it was specified.
 * 
 * @example
 * new Eukaryote.Genetic.Environment({
 *   fitness: function(individual) { ... },
 *   mutate: function(individual) { ... },
 *   reproduction: Eukaryote.Genetic.ReproductionStrategy.Random()
 * });
 */
var ReproductionStrategy = {};

/**
 * @memberof Eukaryote.Genetic.ReproductionStrategy
 * @function Random
 * @static
 *
 * @description
 * X number of individuals chosen at random for reproduction.
 *
 * @param {integer} [options.numberOfIndividuals=2] range: 1 <= n <= population.length
 * @returns {Eukaryote.Genetic.ReproductionStrategy~strategy}
 */
ReproductionStrategy.Random = function(options) {
	options = options || {};
	if (!TypeValidator.isDefined(options.numberOfIndividuals)) {
		options.numberOfIndividuals = 2;
	} else if (options.numberOfIndividuals < 1) {
		throw new Error('Illegal argument: numberOfIndividuals range: 1 <= i <= population.length; actual: ' + options.numberOfIndividuals);
	}
	return {
		begin: function() { },
		reproduce: function(population) {
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
 * @memberof Eukaryote.Genetic.ReproductionStrategy
 * @function Sequential
 * @static
 *
 * @description
 * Individuals chosen sequentially from population ordered by fitness starting with most fit individual.
 *
 * @param {integer} [options.numberOfIndividuals=2] range: 1 <= n <= population.length
 * @returns {Eukaryote.Genetic.ReproductionStrategy~strategy}
 */
ReproductionStrategy.Sequential = function(options) {
	options = options || {};
	if (!TypeValidator.isDefined(options.numberOfIndividuals)) {
		options.numberOfIndividuals = 2;
	} else if (options.numberOfIndividuals < 1) {
		throw new Error('Illegal argument: numberOfIndividuals range: 1 <= i <= population.length');
	}
	var currentIndex;
	return {
		begin: function() {
			currentIndex = 0;
		},
		reproduce: function(population) {
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
 * @memberof Eukaryote.Genetic.ReproductionStrategy
 * @function SequentialRandom
 * @static
 *
 * @description
 * Father is chosen sequentially from population ordered by fitness starting with the most fit individual. 
 * Mother is chosen randomly.
 *
 * @param {integer} [options.numberOfIndividuals=2] range: 2 <= n <= population.length
 * @returns {Eukaryote.Genetic.ReproductionStrategy~strategy}
 */
ReproductionStrategy.SequentialRandom = function(options) {
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
		reproduce: function(population) {
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

module.exports = ReproductionStrategy;

/**
 * @typedef {Object} Eukaryote.Genetic.ReproductionStrategy~strategy
 * @property {Eukaryote.Genetic.ReproductionStrategy~begin} begin Called once at beginning of generation.
 * @property {Eukaryote.Genetic.ReproductionStrategy~reproduce} reproduce Individuals to reproduce. Can be called multiple times.
 * @property {Eukaryote.Genetic.ReproductionStrategy~end} end Called once at end of generation.
 */

/**
 * @callback Eukaryote.Genetic.ReproductionStrategy~begin
 * @description Executed once at the beginning of each generation.
 */

/**
 * @callback Eukaryote.Genetic.ReproductionStrategy~reproduce
 * @description Choose individuals from the given population to reproduce.
 * Called as many times as necessary until the population is full.
 * @param {Object[]} population
 * @returns {Object[]} individuals
 */

/**
 * @callback Eukaryote.Genetic.ReproductionStrategy~end
 * @description Executed once at the end of each generation.
 */