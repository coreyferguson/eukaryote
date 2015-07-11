
var lodash = require('lodash');
var typeName = require('type-name');

/**
 * Validate object is not null or undefined.
 */
function isDefined(o) {
	return o !== null && o !== undefined;
}

/**
 * Validate object is a boolean.
 */
function isBoolean(o) {
	var type = typeName(o);
	return type === 'boolean' || type === 'Boolean';
}

/**
 * Validate object is a string.
 */
function isString(o) {
	var type = typeName(o);
	return type === 'string' || type === 'String';
}

/**
 * Eukaryote constructor.
 */
var Eukaryote = function(options) {

	options = options || {};
	options.callbacks = options.callbacks || {};
	if (!isDefined(options.callbacks.fitness)) {
		throw new Error("'fitness' API function must be provided");
	}
	if (!isDefined(options.callbacks.mutate)) {
		throw new Error("'mutate' API function must be provided");
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
	this.config = options.config;
	this.config.populationSize = options.config.populationSize || 250;
	this.config.numberOfGenerations = options.config.numberOfGenerations || 500;

	// Strategies
	options.strategy = options.strategy || {};
	this.strategy = {
		selection: options.strategy.selection || Eukaryote.SelectionStrategy.Top10Percent
	};

	// Properties
	this.population = [];

};

/**
 * Selection strategies used to eliminate unfit individuals.
 */
Eukaryote.SelectionStrategy = {

	/**
	 * Only top 10 percent of individuals survive to reproduce.
	 */
	Top10Percent: function(population) {
		var numberOfSuvivors = Math.floor(population.length / 10);
		if (numberOfSuvivors === 0) numberOfSuvivors++;
		var numberOfCasualties = population.length - numberOfSuvivors;
		population.splice(numberOfSuvivors, numberOfCasualties);
	}

};

/**
 * Crossover strategies used to recombine genes from two individuals.
 */
Eukaryote.CrossoverStrategy = {

	/**
	 * Crossover two genotypes of type 'string'. Replace similar segments of
	 * string genotypes.
	 *
	 * Examples: 
	 * - 'abc'  + 'xyz'  = 'xbc'  & 'ayz'
	 * - 'abcd' + 'xyz'  = 'aycd' & 'xbz'
	 * - 'abc'  + 'wxyz' = 'aby'  & 'wxcz'
	 */
	SimilarStrings: function(father, mother) {
		if (!isString(father)) {
			throw new Error("first parameter of CrossoverStrategy.SimilarStrings must be of type 'string'");
		}
		if (!isString(mother)) {
			throw new Error("second parameter of CrossoverStrategy.SimilarStrings must be of type 'string'");
		}

		var offspring = [];

		// identify similar stretches of genes
		var minIndex = 0;
		var chromosomeLength, maxIndex;
		if (father.length < mother.length) {
			chromosomeLength = Math.floor(father.length / 2);
			maxIndex = father.length - chromosomeLength;
		} else {
			chromosomeLength = Math.floor(mother.length / 2);
			maxIndex = mother.length - chromosomeLength;
		}

		// recombine similar stretches of genotype
		var randomIndex = Math.floor( Math.random() * (maxIndex+1) );
		var fg1 = father.substring(0, randomIndex);
		var fg2 = father.substring(randomIndex, randomIndex+chromosomeLength);
		var fg3 = father.substring(randomIndex+chromosomeLength, father.length);
		var mg1 = mother.substring(0, randomIndex);
		var mg2 = mother.substring(randomIndex, randomIndex+chromosomeLength);
		var mg3 = mother.substring(randomIndex+chromosomeLength, mother.length);
		offspring[0] = fg1 + mg2 + fg3;
		offspring[1] = mg1 + fg2 + mg3;
		return offspring;
	}

};

/**
 * Creates a population of individuals copied from the given individual.
 * 
 * Evolutionary engine begins running against this population using the provided
 * API functions.
 */
Eukaryote.prototype.seed = function(individual) {
	this.population = [];
	if (!isDefined(individual)) {
		throw new Error("'individual' must be specified");
	}
	// Create population of individuals
	for (var c=0; c<this.config.populationSize; c++) {
		this.spawn(lodash.clone(individual, true));
	}
	// Loop through numberOfGenerations
	var shouldStop = false;
	for (var g=0; g<this.config.numberOfGenerations && !shouldStop; g++) {
		this.mutatePopulation();
		this.sortPopulationByFitness();
		this.applySelection();

		// generation callback and optionally stop
		if (isDefined(this.callbacks.generation)) {
			shouldStop = this.callbacks.generation(g);
			var shouldStopType = typeName(shouldStop);
			if ( !isDefined(shouldStop) || !isBoolean(shouldStop) ) {
				throw new Error("'generation' API function should return a boolean");
			}
		}
	}
};

/**
 * Places the given individual into the population.
 */
Eukaryote.prototype.spawn = function(individual) {
	this.population.push(individual);
};

/**
 * Execute 'mutate' API callback for each individual within the population.
 */
Eukaryote.prototype.mutatePopulation = function() {
	var that = this;
	that.population.forEach(function(individual) {
		that.callbacks.mutate(individual);
	});
};

/**
 * Sort population by score returned from 'fitness' API callback.
 */
Eukaryote.prototype.sortPopulationByFitness = function() {
	var that = this;
	that.population = lodash.sortBy(that.population, function(individual) {
		return that.callbacks.fitness(individual) * -1;
	});
};

/**
 * Apply selection pressure to individuals within the population.
 * Selection (top 10% fittest individuals survive to reproduce).
 */
Eukaryote.prototype.applySelection = function() {
	this.strategy.selection(this.population);
	var numberOfSuvivors = this.population.length;
	if (isDefined(this.callbacks.crossover)) {
		while (this.population.length < this.config.populationSize) {
			var randomIndividualIndex1 = Math.floor( Math.random()*this.population.length );
			var randomIndividualIndex2 = Math.floor( Math.random()*this.population.length );
			var randomIndividual1 = this.population[randomIndividualIndex1];
			var randomIndividual2 = this.population[randomIndividualIndex2];
			var offspring = this.callbacks.crossover(
				lodash.clone(randomIndividual1, true), 
				lodash.clone(randomIndividual2, true));
			if (!Array.isArray(offspring)) {
				throw new Error("offspring returned from 'crossover' API function must be an array");
			}
			if (offspring === null || offspring.length !== 2) {
				throw new Error("2 offspring must be returned from 'crossover' API function");
			}
			this.spawn(offspring[0]);
			if (this.population.length < this.config.populationSize) {
				this.spawn(offspring[1]);
			}
		}
	} else {
		for (var c=numberOfSuvivors; c<this.config.populationSize; c++) {
			var randomSurvivorIndex = Math.floor( Math.random()*numberOfSuvivors );
			var randomSurvivor = this.population[randomSurvivorIndex];
			this.spawn(lodash.clone(randomSurvivor, true));
		}
	}
};

/**
 * Node.js module export.
 */
module.exports = Eukaryote;