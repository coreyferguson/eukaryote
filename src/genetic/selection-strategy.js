
var TypeValidator = require('../utility/type-validator');

/**
 * @memberof Eukaryote.Genetic
 * @namespace SelectionStrategy
 *
 * @description Selection strategies are designed to kill off some number of individuals within your population. 
 * This is to make room for those who will reproduce.
 * All functions within this namespace return a [Strategy]{@link Eukaryote.Genetic.SelectionStrategy~strategy} implementation.
 *
 * @example
 * new Eukaryote.Genetic.Environment({
 *   fitness: function(individual) { ... },
 *   mutate: function(individual) { ... },
 *   selection: Eukaryote.Genetic.SelectionStrategy.TopXPercent()
 * });
 */
var SelectionStrategy = {};

/**
 * @memberof Eukaryote.Genetic.SelectionStrategy
 * @function TopX
 * @static
 *
 * @description
 * X number of individuals survive for reproduction.
 *
 * @param {integer} [options.numberOfIndividuals=1] range: 0 < i <= population.length
 * @returns {Eukaryote.Genetic.SelectionStrategy~strategy}
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
 * @memberof Eukaryote.Genetic.SelectionStrategy
 * @function TopXPercent
 * @static
 *
 * @description
 * Only top X percent of individuals survive to reproduce.
 *
 * @param {float} [options.probability=0.1] range: 0 < f < 1
 * @returns {Eukaryote.Genetic.SelectionStrategy~strategy}
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
 * @memberof Eukaryote.Genetic.SelectionStrategy
 * @function RandomWeightedByRank
 * @static
 *
 * @description
 * For each individual in a population starting with the most fit individual,
 * x% probability of death where x grows as the individuals get less fit.
 *
 * @returns {Eukaryote.Genetic.SelectionStrategy~strategy}
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

/**
 * @callback Eukaryote.Genetic.SelectionStrategy~strategy
 * @description
 * Remove individuals from the given population.
 * @param {Object[]} population population from which to select individuals
 */
