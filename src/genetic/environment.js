
// external dependencies
var lodash = {
  clone: require('lodash.clone'),
  sortBy: require('lodash.sortby')
};

var async = require('async');

var TypeValidator = require('../utility/type-validator');
var SelectionStrategy = require('./selection-strategy');
var ReproductionStrategy = require('./reproduction-strategy');

/**
 * @memberOf Eukaryote.Genetic
 *
 * @class
 * Environment in which individuals in a population compete for survival.
 * [Seed]{@link Eukaryote.Genetic.Environment#seed} an individual into the environment to start the algorithm.
 *
 * @constructor
 * @param {Eukaryote.Genetic.Environment~fitness} options.fitness Calculate the fitness of an individual
 * @param {Eukaryote.Genetic.Environment~fitnessSync} options.fitnessSync Calculate the fitness of an individual
 * @param {Eukaryote.Genetic.Environment~mutate} options.mutate Mutate an individual's genome
 * @param {Eukaryote.Genetic.Environment~mutateSync} options.mutateSync Mutate an individual's genome
 * @param {Eukaryote.Genetic.Environment~crossover} [options.crossover] Recombine genotypes of given individuals
 * @param {Eukaryote.Genetic.Environment~crossoverSync} [options.crossoverSync] Recombine genotypes of given individuals
 * @param {Eukaryote.Genetic.Environment~generation} [options.generation] Executed after every generation
 * @param {Eukaryote.Genetic.Environment~generationSync} [options.generationSync] Executed after every generation
 *
 * @param {integer} [options.populationSize=250] maximum population size allowed in this environment
 * @param {integer} [options.numberOfGenerations=500] number of generations to evolve before stopping execution of algorithm
 *
 * @example
 * var environment = new Eukaryote.Genetic.Environment({
 *   fitnessSync: function(individual) {
 *     // calculate fitness score for individual
 *     return fitness;
 *   },
 *   mutateSync: function(individual) {
 *     // mutate this individuals' genes
 *   }
 * });
 * 
 * // create a population from individual and begin evolution
 * var individual = { ... }; // create individual to seed environment
 * environment.seed(individual, function(error) {
 *   if (error) console.error('Unexpected error has occurred: ', error);
 *   else {
 *     // genetic algorithm has completed successfully
 *     console.log('Most fit individual:', environment.population[0]);
 *   }
 * });
 */
var Environment = function(options) {

  // Input validation
  options = options || {};
  if (!TypeValidator.isDefined(options.fitness) && !TypeValidator.isDefined(options.fitnessSync)) {
    throw new Error('Illegal argument: required `fitness` or `fitnessSync` functions undefined');
  } else if (TypeValidator.isDefined(options.fitness) && TypeValidator.isDefined(options.fitnessSync)) {
    throw new Error('Illegal argument: only one function required, `fitness` or `fitnessSync`');
  }
  if (!TypeValidator.isDefined(options.mutate) && !TypeValidator.isDefined(options.mutateSync)) {
    throw new Error('Illegal argument: required `mutate` or `mutateSync` functions undefined');
  } else if (TypeValidator.isDefined(options.mutate) && TypeValidator.isDefined(options.mutateSync)) {
    throw new Error('Illegal argument: only one function required, `mutate` or `mutateSync`');
  }
  if (TypeValidator.isDefined(options.crossover) && TypeValidator.isDefined(options.crossoverSync)) {
    throw new Error('Illegal argument: only one function required, `crossover` or `crossoverSync`');
  }
  if (TypeValidator.isDefined(options.generation) && TypeValidator.isDefined(options.generationSync)) {
    throw new Error('Illegal argument: only one function required, `generation` or `generationSync`');
  }

  // Callbacks
  this.fitness = options.fitness;
  this.fitnessSync = options.fitnessSync;
  this.mutate = options.mutate;
  this.mutateSync = options.mutateSync;
  this.crossover = options.crossover;
  this.crossoverSync = options.crossoverSync;
  this.generation = options.generation;
  this.generationSync = options.generationSync;

  // Configuration
  if (!TypeValidator.isDefined(options.populationSize)) {
    this.populationSize = 250;
  } else if (!TypeValidator.isInteger(options.populationSize)) {
    throw new Error('Illegal argument: populationSize not an integer; actual: ' + options.populationSize);
  } else if (options.populationSize < 2) {
    throw new Error('Illegal argument: populationSize range: 2 <= p');
  } else {
    this.populationSize = options.populationSize;
  }
  if (!TypeValidator.isDefined(options.numberOfGenerations)) {
    this.numberOfGenerations = 500;
  } else if (!TypeValidator.isInteger(options.numberOfGenerations)) {
    throw new Error('Illegal argument: numberOfGenerations not an integer; actual: ' + options.numberOfGenerations);
  } else if (options.numberOfGenerations < 1) {
    throw new Error('Illegal argument: numberOfGenerations range: 1 <= g');
  } else {
    this.numberOfGenerations = options.numberOfGenerations;
  }

  // Strategies
  if (!TypeValidator.isDefined(options.selection)) {
    this.selection = SelectionStrategy.TopXPercent();
  } else if (!TypeValidator.isFunction(options.selection)) {
    throw new Error('Illegal argument: selection is not a function; actual: ' + options.selection);
  } else {
    this.selection = options.selection;
  }
  if (!TypeValidator.isDefined(options.reproduction)) {
    this.reproduction = ReproductionStrategy.Random();
  } else if (!TypeValidator.isObject(options.reproduction)) {
    throw new Error('Illegal argument: reproduction is not an Object; actual: ' + options.reproduction);
  } else {
    this.reproduction = options.reproduction;
  }

  // Properties
  this.population = [];

};

/**
 * @callback Eukaryote.Genetic.Environment~seedCallback
 * @description
 * Callback used when genetic algorithm has completed or an error has occurred.
 * @param {Error} error Not null if an error has occurred.
 */

/**
 * Seed the given individual into a population and run genetic algorithm.
 * @param {Object} individual
 * @param {Eukaryote.Genetic.Environment~seedCallback} callback
 */
Environment.prototype.seed = function(individual, callback) {
  var that = this;
  // fill population with clones of reproduction strategy
  var fillPopulation = function(callback) {
    var individuals = that._getClonesOfReproductionStrategy();
    async.series([
        function(callback) { that._crossover(individuals, callback); },
        function(callback) { that._mutate(individuals, callback); }
    ], function(error) {
      if (error) callback(error);
      else {
        that._spawnIndividuals(individuals);
        if (that.population.length < that.populationSize) {
          fillPopulation(callback);
        } else {
          callback();
        }
      }
    });
  };
  // perform on generation
  var shouldContinue = true;
  var executeGeneration = function(g, callback) {
    that._applySelectionStrategy();
    async.series([
        fillPopulation,
        function(callback) { that._sortPopulationByFitness(callback); },
        function(callback) { that._generation(g, callback); }
    ], function(error, results) {
      if (error) callback(error);
      else {
        shouldContinue = results[2];
        callback();
      }
    });
  };
  // loop through all generations
  this._seedIndividual(individual);
  var loopGenerationsInSequence = function(g) {
    if (g < that.numberOfGenerations && shouldContinue) {
      executeGeneration(g, function(error) {
        if (error) callback(error);
        else loopGenerationsInSequence(g+1);
      });
    } else {
      callback();
    }
  };
  loopGenerationsInSequence(0, true);
};

/**
 * @callback Eukaryote.Genetic.Environment~_generationCallback
 * @description
 * Callback used when generation has completed or an error has occurred.
 * @param {Error} error Not null if an error has occurred.
 * @param {boolean} shouldContinue Indicates if generations should continue.
 */

/**
 * @private
 * @description
 * Call the `generation` function if it was provided to constructor.
 * @param {number} g Number of generations that have passed.
 * @param {Eukaryote.Genetic.Environment~_generationCallback} callback
 */
Environment.prototype._generation = function(g, callback) {
  // asynchronous
  if (TypeValidator.isDefined(this.generation)) {
    this.generation(g, function(error, shouldContinue) {
      if (!TypeValidator.isDefined(shouldContinue)) {
        shouldContinue = true;
      }
      callback(error, shouldContinue);
    });
  }
  // synchronous
  else if (TypeValidator.isDefined(this.generationSync)) {
    try {
      var shouldContinue = this.generationSync(g);
      if (!TypeValidator.isDefined(shouldContinue)) {
        shouldContinue = true;
      }
      callback(null, shouldContinue);
    } catch (e) {
      callback(e);
    }
  } else { // `generation` function not required
    callback(null, true);
  }
};

/**
 * @private
 * @description Spawn a population with clones of the given individual.
 * @param {Object} individual
 */
Environment.prototype._seedIndividual = function(individual) {
  if (!TypeValidator.isObject(individual)) {
    throw new Error('Illegal argument: individual is not an object.');
  }
  this.population = [];
  for (var c=0; c<this.populationSize; c++) {
    this.population.push(this._clone(individual));
  }
};

/**
 * @private
 * @description Perform a deep clone on the given individual.
 * @param {Object} individual
 * @returns {Object} the clone
 */
Environment.prototype._clone = function(individual) {
  return lodash.clone(individual, true);
};

/**
 * @private
 * @description Apply selection strategy on the current population.
 */
Environment.prototype._applySelectionStrategy = function() {
  this.selection(this.population);
};

/**
 * @private
 * @description Retrieve individuals chosen from reproduction strategy. Return clones of those individuals.
 * @returns {Object[]} individuals
 */
Environment.prototype._getClonesOfReproductionStrategy = function() {
  var individuals = this.reproduction.reproduce(this.population);
  var clones = [];
  var that = this;
  individuals.forEach(function(individual) {
    clones.push(that._clone(individual));
  });
  return clones;
};

/**
 * @callback Eukaryote.Genetic.Environment~_crossoverCallback
 * @description
 * Callback used when crossover has completed or an error has occurred.
 * @param {Error} error Not null if an error has occurred.
 */

/**
 * @private
 * @description Perform crossover strategy on the given individuals.
 * @param {Object[]} individuals
 * @param {Eukaryote.Genetic.Environment~_crossoverCallback} callback
 */
Environment.prototype._crossover = function(individuals, callback) {
  // asynchronous
  if (TypeValidator.isDefined(this.crossover)) {
    this.crossover(individuals, callback);
  }
  // synchronous
  else if (TypeValidator.isDefined(this.crossoverSync)) {
    try {
      this.crossoverSync(individuals);
      callback();
    } catch (e) {
      callback(e);
    }
  }
  // crossover strategy not required
  else {
    callback();
  }
};

/**
 * @callback Eukaryote.Genetic.Environment~_mutateCallback
 * @description
 * Callback used when mutate has completed or an error has occurred.
 * @param {Error} error Not null if an error has occurred.
 */

/**
 * @private
 * @description Mutate the genotypes of all given individuals.
 * @param {Object[]} individuals
 * @param {Eukaryote.Genetic.Environment~_mutateCallback} callback
 */
Environment.prototype._mutate = function(individuals, callback) {
  var that = this;
  // asynchronous
  if (TypeValidator.isDefined(this.mutate)) {
    async.map(individuals, this.mutate, function(error) {
      if (error) callback(error);
      else callback(null);
    });
  }
  // synchronous
  else if (TypeValidator.isDefined(this.mutateSync)) {
    try {
      individuals.forEach(function(individual) {
        that.mutateSync(individual);
      });
      callback();
    } catch (e) {
      callback(e);
    }
  }
};

/**
 * @private
 * @description Add all individuals to the population up to the maximum populationSize.
 * @param {Object[]} individuals
 */
Environment.prototype._spawnIndividuals = function(individuals) {
  while (individuals.length > 0 && this.population.length < this.populationSize) {
    var individual = individuals.splice(0, 1)[0];
    this.population.push(individual);
  }
};

/**
 * @callback Eukaryote.Genetic.Environment~_sortPopulationByFitnessCallback
 * @description
 * Callback used when sort has completed or an error has occurred.
 * @param {Error} error Not null if an error has occurred.
 */

/**
 * @private
 * @description 
 * Sort the population by fitness, descending, where the most fit individual is at population[0].
 * Use the {@link Eukaryote.Genetic.Environment~fitness} callback to determine each individual's 
 * fitness.
 * @param {Eukaryote.Genetic.Environment~_sortPopulationByFitnessCallback} callback
 */
Environment.prototype._sortPopulationByFitness = function(callback) {
  var that = this;
  // asynchronous
  if (TypeValidator.isDefined(this.fitness)) {
    async.map(this.population, this.fitness, function(error, fitnessScores) {
      if (error) callback(error);
      else {
        that.population = lodash.sortBy(that.population, function(individual, index) {
          return fitnessScores[index] * -1;
        });
        callback();
      }
    });
  }
  // synchronous
  else if (TypeValidator.isDefined(this.fitnessSync)) {
    try {
      that.population = lodash.sortBy(that.population, function(individual) {
        return that.fitnessSync(individual) * -1;
      });
      callback();
    } catch (e) {
      callback(e);
    }
  }
};

module.exports = Environment;

/**
 * @callback Eukaryote.Genetic.Environment~fitness
 * @description
 * Calculate fitness score of an individual's phenotype. Higher fitness is better.
 * @param {Object} individual The individual whose fitness should be calculated.
 * @param {Eukaryote.Genetic.Environment~fitnessCallback} callback To be used when asynchronous calculation of fitness score is complete.
 */

/**
 * @callback Eukaryote.Genetic.Environment~fitnessCallback
 * @description
 * Callback used when asynchronously calculating [fitness]{@link Eukaryote.Genetic.Environment~fitness} score.
 * @param {Error} error Not null if an error has occurred.
 * @param {float} Fitness score.
 */

/**
 * @callback Eukaryote.Genetic.Environment~fitnessSync
 * @description
 * Calculate fitness score of an individual's phenotype. Higher fitness is better.
 * @param {Object} individual The individual whose fitness should be calculated.
 * @returns {float} Fitness score.
 */

 /**
  * @callback Eukaryote.Genetic.Environment~mutate
  * @description
  * Mutate an individual's genotype. Chance of mutation based on a probability. 
  * However, when a mutation does occur, the resulting mutant gene should give all possibilities
  * equal opportunity.
  * @param {Object} individual The individual whose genome should be mutated.
  * @param {Eukaryote.Genetic.Environment~mutateCallback} callback To be used when performing asynchronous mutation.
  */

/**
 * @callback Eukaryote.Genetic.Environment~mutateCallback
 * @description
 * Callback used when asynchronously [mutating]{@link Eukaryote.Genetic.Environment~mutate}.
 * @param {Error} error Not null if an error has occurred.
 */

 /**
  * @callback Eukaryote.Genetic.Environment~mutateSync
  * @description
  * Mutate an individual's genotype. Chance of mutation based on a probability. 
  * However, when a mutation does occur, the resulting mutant gene should give all possibilities
  * equal opportunity.
  * @param {Object} individual The individual whose genome should be mutated.
  */

 /**
  * @callback Eukaryote.Genetic.Environment~crossover
  * @description
  * Recombine similar stretches of genes between given individuals' genotypes.
  * @param {Object[]} individuals The individuals whose genomes should be recombined.
  * @param {Eukaryote.Genetic.Environment~crossoverCallback} callback To be used when performing asynchronous crossover.
  */

/**
 * @callback Eukaryote.Genetic.Environment~crossoverCallback
 * @description
 * Callback used when asynchronously performing [crossover]{@link Eukaryote.Genetic.Environment~crossover}.
 * @param {Error} error Not null if an error has occurred.
 */

 /**
  * @callback Eukaryote.Genetic.Environment~crossoverSync
  * @description
  * Recombine similar stretches of genes between given individuals' genotypes.
  * @param {Object[]} individuals The individuals whose genomes should be recombined.
  */

 /**
  * @callback Eukaryote.Genetic.Environment~generation
  * @description
  * Executed every generation. Return true to halt further generations. 
  * For example when a solution is found (maximum fitness achieved).
  * @param {Object[]} individuals
  * @param {Eukaryote.Genetic.Environment~generationCallback} callback
  */

/**
 * @callback Eukaryote.Genetic.Environment~generationCallback
 * @description
 * Callback used when asynchronously performing [generation]{@link Eukaryote.Genetic.Environment~generation}.
 * @param {Error} error Not null if an error has occurred.
 * @param {boolean} shouldContinue Indicates whether genetic alogirthm should continue.
 */

 /**
  * @callback Eukaryote.Genetic.Environment~generationSync
  * @description
  * Executed every generation. Return true to halt further generations. 
  * For example when a solution is found (maximum fitness achieved).
  * @param {Object[]} individuals
  * @returns {boolean}
  */
