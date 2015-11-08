
// external dependencies
var lodash = {
	clone: require('lodash.clone'),
 	shuffle: require('lodash.shuffle'),
 	sortBy: require('lodash.sortby')
};
// internal dependencies
var CrossoverStrategy = require('./crossover-strategy');
var MatingStrategy = require('./mating-strategy');
var SelectionStrategy = require('./selection-strategy');
var TypeValidator = require('./type-validator');

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
	if (!TypeValidator.isDefined(options.strategy)) {
		options.strategy = {};
	} else if (!TypeValidator.isObject(options.strategy)) {
		throw new Error('Illegal argument: strategy not an object; actual: ' + options.strategy);
	}
	if (!TypeValidator.isDefined(options.strategy.selection)) {
		options.strategy.selection = SelectionStrategy.TopXPercent();
	} else if (!TypeValidator.isFunction(options.strategy.selection)) {
		throw new Error('Illegal argument: strategy.selection is not a function; actual: ' + options.strategy.selection);
	}
	if (!TypeValidator.isDefined(options.strategy.mating)) {
		options.strategy.mating = MatingStrategy.Random();
	} else if (!TypeValidator.isObject(options.strategy.mating)) {
		throw new Error('Illegal argument: strategy.mating is not an Object; actual: ' + options.strategy.mating);
	}
	this.strategy = options.strategy;

	// Properties
	this.population = [];

};

/**
 * Seed the given individual into a population and run genetic algorithm.
 */
Eukaryote.prototype.seed = function(individual) {
	this.seedIndividual(individual);
	for (var g=0; g<this.config.numberOfGenerations; g++) {
		this.applySelectionStrategy();
		while (this.population.length < this.config.populationSize) {
			var individuals = this.getClonesOfMatingStrategy();
			individuals = this.crossover(individuals);
			if (!TypeValidator.isDefined(individuals) || !TypeValidator.isArray(individuals)) {
				throw new Error('Illegal return: crossover callback returns null or undefined');
			} else if (!TypeValidator.isArray(individuals)) {
				throw new Error('Illegal return: crossover callback returns non-array; actual: ' + individuals);
			} else if (individuals.length === 0) {
				throw new Error('Illegal return: crossover callback returns empty array.');
			}
			individuals = this.mutate(individuals);
			this.spawnIndividuals(individuals);
		}
		this.shufflePopulation();
		this.sortPopulationByFitness();
		if (TypeValidator.isDefined(this.callbacks.generation)) {
			this.callbacks.generation(g);
		}
	}
};

/**
 * Spawn a population with clones of the given individual.
 */
Eukaryote.prototype.seedIndividual = function(individual) {
	if (!TypeValidator.isObject(individual)) {
		throw new Error('Illegal argument: individual is not an object.');
	}
	this.population = [];
	for (var c=0; c<this.config.populationSize; c++) {
		this.population.push(this.clone(individual));
	}
};

/**
 * Perform a deep clone on the given individual. Return the clone.
 */
Eukaryote.prototype.clone = function(individual) {
	return lodash.clone(individual, true);
};

/**
 * Apply selection strategy on the current population.
 */
Eukaryote.prototype.applySelectionStrategy = function() {
	this.strategy.selection(this.population);
};

/**
 * Retrieve individuals chosen from mating strategy. Return clones of those individuals.
 */
Eukaryote.prototype.getClonesOfMatingStrategy = function() {
	var individuals = this.strategy.mating.mate(this.population);
	var clones = [];
	var that = this;
	individuals.forEach(function(individual) {
		clones.push(that.clone(individual));
	});
	return clones;
};

/**
 * Perform crossover strategy on the given individuals. Return the updated individuals.
 */
Eukaryote.prototype.crossover = function(individuals) {
	if (TypeValidator.isDefined(this.callbacks.crossover)) {
		individuals = this.callbacks.crossover(individuals);
	}
	return individuals;
};

/**
 * Mutate the genotypes of all given individuals. Return the updated individuals.
 */
Eukaryote.prototype.mutate = function(individuals) {
	var that = this;
	individuals.forEach(function(individual) {
		that.callbacks.mutate(individual);
	});
	return individuals;
};

/**
 * Add all individuals to the population up to the maximum config.populationSize.
 */
Eukaryote.prototype.spawnIndividuals = function(individuals) {
	while (individuals.length > 0 && this.population.length < this.config.populationSize) {
		var individual = individuals.splice(0, 1)[0];
		this.population.push(individual);
	}
};

/**
 * Shuffles the population into a random order. This is done before sorting the population so that
 * order is not arbitrarily maintained if two individuals coincidentally have the same fitness.
 */
Eukaryote.prototype.shufflePopulation = function() {
	this.population = lodash.shuffle(this.population);
};

/**
 * Sort the population by fitness, descending, where the most fit individual is at population[0].
 * Use the 'fitness' callback to determine each individual's fitness.
 */
Eukaryote.prototype.sortPopulationByFitness = function() {
	var that = this;
	that.population = lodash.sortBy(that.population, function(individual) {
		return that.callbacks.fitness(individual) * -1;
	});
};

module.exports = Eukaryote;
