var TypeValidator = require('./type-validator');

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
