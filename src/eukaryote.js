
var CrossoverStrategy = require('./crossover-strategy');
var MatingStrategy = require('./mating-strategy');
var SelectionStrategy = require('./selection-strategy');
var TypeValidator = require('./type-validator');

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
