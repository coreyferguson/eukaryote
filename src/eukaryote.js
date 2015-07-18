
var lodash = require('lodash');
var typeName = require('type-name');

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
		selection: options.strategy.selection || Eukaryote.SelectionStrategy.TopXPercent(),
		mating: options.strategy.mating || Eukaryote.MatingStrategy.Random()
	};

	// Properties
	this.population = [];

};

/**
 * Selection strategies used to eliminate unfit individuals.
 * @param {
 * 	  numberOfIndividuals: optional, integer, default: 1, range: 1
 * }
 */
Eukaryote.SelectionStrategy = {

	/**
	 * X number of individuals survive for reproduction.
	 * @param {}
	 *   numberOfIndividuals: optional, integer, default: 1, range: 0 < i <= population.length
	 * }
	 */
	TopX: function(options) {
		options = options || {};
		options.numberOfIndividuals = options.numberOfIndividuals || 1;
		return function(population) {
			var numberOfCasualties = population.length - options.numberOfIndividuals;
			population.splice(options.numberOfIndividuals, numberOfCasualties);
		};

	},

	/**
	 * Only top 10 percent of individuals survive to reproduce.
	 * @param options {
	 *   probability: optional, float, default: 0.1, range: 0 < f <= population.length
	 * }
	 */
	TopXPercent: function(options) {
		options = options || {};
		options.probability = options.probability || 0.1;
		return function(population) {
			var numberOfSuvivors = Math.floor(population.length * options.probability);
			if (numberOfSuvivors <= 0) numberOfSuvivors++;
			var numberOfCasualties = population.length - numberOfSuvivors;
			population.splice(numberOfSuvivors, numberOfCasualties);
		};
	},

	/**
	 * For each individual in a population starting with the most fit individual,
	 * x% probability of death where x grows as the individuals get less and less fit.
	 */
	RandomWeightedByRank: function() {
		return function(population) {
			for (var index=population.length; index>=0; index--) {
				var sumOfSeries = ( population.length * (population.length + 1) ) / 2;
				var probabilityOfDeath = (index+1) / sumOfSeries;
				var randomProbability = Math.floor( Math.random()*101 );
				if (randomProbability <= probabilityOfDeath && population.length > 1) {
					population.splice(index, 1);
				}
			}
		};
	}

};

/**
 * Mating strategies can be thought of as sexual selection. These strategies choose 
 * which individuals crossover genes during replication (after selection).
 */
Eukaryote.MatingStrategy = {

	/**
	 * Individuals chosen at random.
	 */
	Random: function(options) {
		options = options || {};
		if (!isDefined(options.numberOfIndividuals)) {
			options.numberOfIndividuals = 2;
		}
		return {
			begin: function() { },
			mate: function(population) {
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
	},

	/**
	 * Individuals chosen sequentially from population ordered by fitness starting with most fit individual.
	 */
	Sequential: function(options) {
		options = options || {};
		if (!isDefined(options.numberOfIndividuals)) {
			options.numberOfIndividuals = 2;
		}
		var currentIndex;
		return {
			begin: function() {
				currentIndex = 0;
			},
			mate: function(population) {
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
	},

	/**
	 * Father is chosen sequentially from population ordered by fitness starting with the most fit individual. 
	 * Mother is chosen randomly.
	 */
	SequentialRandom: function(options) {
		options = options || {};
		if (!isDefined(options.numberOfIndividuals)) {
			options.numberOfIndividuals = 2;
		}
		var currentIndex;
		return {
			begin: function() {
				currentIndex = 0;
			},
			mate: function(population) {
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
	 * @param options {
	 *     numberOfOffspring: optional, integer, default: 2
	 *     chromosomeLengthAsPercentOfGenotype: optional, float, default: 50, range: 0 < n < 100
	 * }
	 * 
	 * Examples: 
	 * - 'abc'  + 'xyz'  = 'xbc'  & 'ayz'
	 * - 'abcd' + 'xyz'  = 'aycd' & 'xbz'
	 * - 'abc'  + 'wxyz' = 'aby'  & 'wxcz'
	 */
	SimilarStrings: function(options) {
		// defaults
		options = options || {};
		if (!isDefined(options.numberOfOffspring)) { options.numberOfOffspring = 2; }
		if (!isDefined(options.chromosomeLengthAsPercentOfGenotype)) { options.chromosomeLengthAsPercentOfGenotype = 50; }
		// validation
		if (!isNumber(options.numberOfOffspring)) {
			throw new Error("Option 'numberOfOffspring' must be a number. Found the " + 
				typeName(options.numberOfOffspring) + ": " + options.numberOfOffspring);
		}
		if (options.numberOfOffspring <= 0) {
			throw new Error("Option 'numberOfOffspring' must be larger than 0.");
		}
		if (!isNumber(options.chromosomeLengthAsPercentOfGenotype)) {
			throw new Error("Option 'chromosomeLengthAsPercentOfGenotype' must be a number. Found the " + 
				typeName(options.chromosomeLengthAsPercentOfGenotype) + ": " + options.chromosomeLengthAsPercentOfGenotype);
		}
		if (options.chromosomeLengthAsPercentOfGenotype < 1 || options.chromosomeLengthAsPercentOfGenotype > 100) {
			throw new Error("Option 'chromosomeLengthAsPercentOfGenotype' must be > 0 and <= 100");
		}
		return function(genotypes) {
			// validate all genotypes are of type 'string'
			genotypes.forEach(function(genotype) {
				if (!isString(genotype)) {
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
		this.shufflePopulation();
		this.sortPopulationByFitness();
		this.applySelection();

		// generation callback and optionally stop
		if (isDefined(this.callbacks.generation)) {
			shouldStop = this.callbacks.generation(g);
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
 * Shuffle the population. This is used because individuals with the same fitness may not have the same 
 * genotype; fitness should be calculated from phenotype. When applying selection pressures against a population
 * we don't want to have bias against those individuals who were arbitrarily created first.
 */
Eukaryote.prototype.shufflePopulation = function() {
	this.population = lodash.shuffle(this.population);
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
		this.strategy.mating.begin();
		while (this.population.length < this.config.populationSize) {

			// mate
			var individuals = this.strategy.mating.mate(this.population);
			individuals = cloneIndividuals(individuals);

			// crossover
			var offspring = this.callbacks.crossover(individuals);

			// validation
			if (!Array.isArray(offspring)) {
				throw new Error("offspring returned from 'crossover' API function must be an array");
			}
			if (!isDefined(offspring) || offspring.length !== 2) {
				throw new Error("2 offspring must be returned from 'crossover' API function");
			}

			// repopulate
			this.spawn(offspring[0]);
			if (this.population.length < this.config.populationSize) {
				this.spawn(offspring[1]);
			}

		}
		this.strategy.mating.end();
	} else {
		for (var c=numberOfSuvivors; c<this.config.populationSize; c++) {
			var randomSurvivorIndex = Math.floor( Math.random()*numberOfSuvivors );
			var randomSurvivor = this.population[randomSurvivorIndex];
			this.spawn(lodash.clone(randomSurvivor, true));
		}
	}
};

/**
 * Perform a deep copy of individuals.
 * @param array of individuals to copy
 * @return array of new individuals
 */
function cloneIndividuals(individuals) {
	var newIndividuals = [];
	individuals.forEach(function(individual) {
		newIndividuals.push( lodash.clone(individual, true) );
	});
	return newIndividuals;
}

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
 * Validate object is a real number (not NaN or Infinity)
 */
function isNumber(o) {
	var type = typeName(o);	
	return type === 'number' && !isNaN(o) && o !== Infinity;
}

/**
 * Node.js module export.
 */
module.exports = Eukaryote;