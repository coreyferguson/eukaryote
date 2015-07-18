var Eukaryote = require('../src/eukaryote');
var lodash = require('lodash');

module.exports = {

	/**
	 * Validate successful instantiation.
	 */
	constructor_success: function(test) {
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; }
			}
		});
		test.done();
	},

	/**
	 * Validate fitness function required and proper exception message.
	 */
	constructor_requireFitnessFunction: function(test) {
		test.throws(function() {
			var eukaryote = new Eukaryote({
				callbacks: {
					mutate: function(individual) { }
				}
			});
		});
		test.done();
	},

	/**
	 * Validate mutation function required and proper exception message.
	 */
	constructor_requireMutationFunction: function(test) {
		test.throws(function() {
			var eukaryote = new Eukaryote({
				callbacks: {
					fitness: function(individual) { return 0; }
				}
			});
		});
		test.done();
	},

	/**
	 * Validate successful spawning of individual into population.
	 */
	spawn_success: function(test) {
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; }
			}
		});
		eukaryote.spawn('individual');
		test.equal(eukaryote.population[0], 'individual');
		test.done();
	},

	/**
	 * Validate 'mutate' callback for all individuals in a population.
	 */
	mutatePopulation_callback: function(test) {
		var numberOfMutateCalls = 0;
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { numberOfMutateCalls++; },
				fitness: function(individual) { return 0; }
			}
		});
		eukaryote.spawn('individual1');
		eukaryote.spawn('individual2');
		eukaryote.spawn('individual3');
		eukaryote.mutatePopulation();
		test.equal(numberOfMutateCalls, 3, 'mutate callback not executed for all individuals in population');
		test.done();
	},

	/**
	 * Validate shuffle of population.
	 */
	shufflePopulation: function(test) {
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; }
			}
		});
		var originalPopulation = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
		eukaryote.population = lodash.clone(originalPopulation);
		eukaryote.shufflePopulation();
		var shuffled = false;
		for (var c=0; c<originalPopulation.length; c++) {
			if (eukaryote.population[c] !== originalPopulation[c]) {
				shuffled = true;
				break;
			}
		}
		test.done();
	},

	/**
	 * Validate descending sort by 'fitness' API callback.
	 */
	sortPopulationByFitness_descending: function(test) {
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return individual; }
			}
		});
		eukaryote.spawn(1);
		eukaryote.spawn(3);
		eukaryote.spawn(2);
		eukaryote.sortPopulationByFitness();
		test.equal(eukaryote.population[0], 3, 'individuals should be sorted by fitness score, descending');
		test.equal(eukaryote.population[1], 2, 'individuals should be sorted by fitness score, descending');
		test.equal(eukaryote.population[2], 1, 'individuals should be sorted by fitness score, descending');
		test.done();
	},

	/**
	 * Validate population restored after applying selection to individuals without crossover.
	 */
	applySelection_noCrossover_populationRestored: function(test) {
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; }
			},
			config: { populationSize: 10 }
		});
		for (var c=1; c<=10; c++) {
			eukaryote.spawn(c);
		}
		eukaryote.applySelection();
		test.equal(
			eukaryote.population.length, 
			eukaryote.config.populationSize, 
			'population should be restored after selection');
		test.done();
	},

	/**
	 * Validate population restored after applying selection to individuals with crossover.
	 */
	applySelection_crossover_populationRestored: function(test) {
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; },
				crossover: function(father, mother) {
					return [father, mother];
				}
			},
			config: { populationSize: 10 }
		});
		for (var c=1; c<=10; c++) {
			eukaryote.spawn(c);
		}
		eukaryote.applySelection();
		test.equal(
			eukaryote.population.length, 
			eukaryote.config.populationSize, 
			'population should be restored after selection');
		test.done();
	},

	/**
	 * Validate exception thrown when 'crossover' API function provided but offspring are not returned.
	 */
	applySelection_crossover_noOffspring: function(test) {
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; },
				crossover: function(father, mother) { return []; }
			},
			config: { populationSize: 9 }
		});
		for (var c=1; c<=9; c++) {
			eukaryote.spawn(c);
		}
		test.throws(function() {
			eukaryote.applySelection();
		});
		test.done();
	},

	/**
	 * Validate exception thrown when 'crossover' API function provided but only 1 offspring is returned.
	 */
	applySelection_crossover_oneOffspring: function(test) {
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; },
				crossover: function(father, mother) {
					return [father];
				}
			},
			config: { populationSize: 9 }
		});
		for (var c=1; c<=9; c++) {
			eukaryote.spawn(c);
		}
		test.throws(function() {
			eukaryote.applySelection();
		});
		test.done();
	},

	/**
	 * Validate exception thrown when 'crossover' API function provided but only 1 offspring is returned.
	 */
	applySelection_crossover_threeOffspring: function(test) {
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; },
				crossover: function(father, mother) {
					return [father, mother, {}];
				}
			},
			config: { populationSize: 9 }
		});
		for (var c=1; c<=9; c++) {
			eukaryote.spawn(c);
		}
		test.throws(function() {
			eukaryote.applySelection();
		});
		test.done();
	},

	/**
	 * Validate exception thrown when 'crossover' API function provided but invalid object returned.
	 */
	applySelection_crossover_invalidOffspring: function(test) {
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; },
				crossover: function(father, mother) {
					return { length: 2 };
				}
			},
			config: { populationSize: 9 }
		});
		for (var c=1; c<=9; c++) {
			eukaryote.spawn(c);
		}
		test.throws(function() {
			eukaryote.applySelection();
		});
		test.done();
	},

	/**
	 * Validate top 10 individuals survive selection from a population of 100 individuals.
	 */
	SelectionStrategy_Top10: function(test) {
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; }
			},
			config: { populationSize: 100 }
		});
		var fitness;
		for (fitness=100; fitness>=1; fitness--) {
			eukaryote.spawn(fitness);
		}
		var strategy = Eukaryote.SelectionStrategy.TopX({numberOfIndividuals: 10});
		strategy(eukaryote.population);
		test.equal(eukaryote.population.length, 10, 'expecting only 10 to survive but found ' + eukaryote.population.length);
		fitness=100;
		for (var index=0; index<10; index++) {
			test.equal(eukaryote.population[index], fitness);
			fitness--;
		}
		test.done();
	},

	/**
	 * Validate 1 individual survives selection from a population of 9 individuals.
	 */
	SelectionStrategy_Top1_9_individuals: function(test) {
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; }
			},
			config: { populationSize: 9 }
		});
		for (var fitness=9; fitness>=1; fitness--) {
			eukaryote.spawn(fitness);
		}
		var strategy = Eukaryote.SelectionStrategy.TopX({numberOfIndividuals: 1});
		strategy(eukaryote.population);
		test.equal(eukaryote.population.length, 1);
		test.equal(eukaryote.population[0], 9);
		test.done();
	},


	/**
	 * Validate top 10 percent fittest individuals survive selection from a population of 100 individuals.
	 */
	SelectionStrategy_Top10Percent: function(test) {
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; }
			},
			config: { populationSize: 100 }
		});
		for (var fitness=100; fitness>=1; fitness--) {
			eukaryote.spawn(fitness);
		}
		var strategy = Eukaryote.SelectionStrategy.TopXPercent({probability: 0.1});
		strategy(eukaryote.population);
		// validate number of survivors
		test.equal(eukaryote.population.length, 10);
		// validate fittest survivors
		var individual = 100;
		for (var index=0; index<10; index++) {
			test.equal(eukaryote.population[index], individual--);
		}
		test.done();
	},

	/**
	 * Validate 1 fit individual survives selection from a population of 9 individuals.
	 */
	SelectionStrategy_Top10Percent_9_individuals: function(test) {
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; }
			},
			config: { populationSize: 9 }
		});
		for (var fitness=9; fitness>=1; fitness--) {
			eukaryote.spawn(fitness);
		}
		var strategy = Eukaryote.SelectionStrategy.TopXPercent({probability: 0.1});
		strategy(eukaryote.population);
		test.equal(eukaryote.population.length, 1);
		test.equal(eukaryote.population[0], 9);
		test.done();
	},

	/**
	 * Validate at least 1 individual survives extinction (even if highly unlikely to actually happen).
	 */
	SelectionStrategy_RandomWeightedByRank_no_extinction: function(test) {
		// mock
		var _random = Math.random;
		Math.random = function() { return 0; };
		// test
		var populationSize = 20;
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; }
			},
			config: { populationSize: populationSize }
		});
		for (var fitness=populationSize; fitness>=1; fitness--) {
			eukaryote.spawn(fitness);
		}
		var strategy = Eukaryote.SelectionStrategy.RandomWeightedByRank();
		strategy(eukaryote.population);
		test.equal(eukaryote.population.length, 1, 'expecting 1 survivor');
		// un-mock
		Math.random = _random;
		test.done();
	},

	/**
	 * Validate no individual is killed when God is looking on favorably (0% chance of death).
	 */
	SelectionStrategy_RandomWeightedByRank_no_casualties: function(test) {
		// mock
		var _random = Math.random;
		Math.random = function() { return 0.999; };
		// test
		var populationSize = 20;
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; }
			},
			config: { populationSize: populationSize }
		});
		for (var fitness=populationSize; fitness>=1; fitness--) {
			eukaryote.spawn(fitness);
		}
		var strategy = Eukaryote.SelectionStrategy.RandomWeightedByRank();
		strategy(eukaryote.population);
		test.equal(eukaryote.population.length, 20, 'expecting all individuals to survive');
		// un-mock
		Math.random = _random;
		test.done();
	},

	/**
	 * Crossover two genotypes of equal length: abc + xyz.
	 */
	CrossoverStrategy_SimilarStrings_allGenesAccountedFor_similarLengths: function(test) {
		var father = 'abc';
		var mother = 'xyz';
		var offspring = Eukaryote.CrossoverStrategy.SimilarStrings({numberOfOffspring: 2})([father, mother]);
		// all genes are accounted for
		var actualGenes = offspring[0] + offspring[1];
		test.equal(actualGenes.length, 6, 'expected same number of genes in offspring as came from parents');
		test.ok(!/[^abcxyz]+/.test(actualGenes), 'genes found in offspring that were not in parents');
		test.done();
	},

	/**
	 * Crossover two genotypes of unequal length: abcd + xyz.
	 */
	CrossoverStrategy_SimilarStrings_allGenesAccountedFor_differentLengths: function(test) {
		var father = 'abcd';
		var mother = 'xyz';
		var crossoverStrategy = Eukaryote.CrossoverStrategy.SimilarStrings({numberOfOffspring: 2});
		var offspring = crossoverStrategy([father, mother]);
		var actualGenes = offspring[0] + offspring[1];
		test.ok(actualGenes.length >= 6 || actualGenes.length <= 8, 
			'expected same number of genes in offspring as came from parents');
		test.ok(!/[^abcdxyz]+/.test(actualGenes), 'genes found in offspring that were not in parents');
		offspring = crossoverStrategy([mother, father]);
		actualGenes = offspring[0] + offspring[1];
		test.ok(actualGenes.length >= 6 || actualGenes.length <= 8, 
			'expected same number of genes in offspring as came from parents');
		test.ok(!/[^abcdxyz]+/.test(actualGenes), 'genes found in offspring that were not in parents');
		test.done();
	},

	/**
	 * Exception thrown when non-string provided.
	 */
	CrossoverStrategy_SimilarStrings_notStringType: function(test) {
		test.throws(function() {
			Eukaryote.CrossoverStrategy.SimilarStrings({numberOfOffspring: 2})([1, 'two']);
		});
		test.throws(function() {
			Eukaryote.CrossoverStrategy.SimilarStrings({numberOfOffspring: 2})(['one', 2]);
		});
		test.done();
	},

	/**
	 * Number of offspring returned.
	 */
	CrossoverStrategy_SimilarStrings_numberOfOffspring: function(test) {
		var father = 'abc';
		var mother = 'xyz';
		var offspring = Eukaryote.CrossoverStrategy.SimilarStrings({numberOfOffspring: 2})([father, mother]);
		test.equal(offspring.length, 2, 'expected 2 offspring');
		offspring = Eukaryote.CrossoverStrategy.SimilarStrings({numberOfOffspring: 3})([father, mother]);
		test.equal(offspring.length, 3, 'expected 3 offspring');
		offspring = Eukaryote.CrossoverStrategy.SimilarStrings({numberOfOffspring: 4})([father, mother]);
		test.equal(offspring.length, 4, 'expected 4 offspring');
		test.done();
	},

	/**
	 * Genes from parents can be used multiple times to generate multiple offspring.
	 */
	CrossoverStrategy_SimilarStrings_moreOffspringThanParents: function(test) {
		var offspring = Eukaryote.CrossoverStrategy.SimilarStrings({numberOfOffspring: 3})(['abc', 'xyz']);
		test.equal(offspring.length, 3, 'expected 3 offspring');
		var actualGenes = offspring[0] + offspring[1] + offspring[2];
		test.equal(actualGenes.length, 9, 'expected same number of genes in offspring as in parents');
		test.ok(!/[^abcxyz]+/.test(actualGenes), 'genes found in offspring that were not in parents');
		test.done();
	},

	/**
	 * numberOfOffspring is a number.
	 */
	CrossoverStrategy_SimilarStrings_numberOfOffspringTypeValidation: function(test) {
		test.throws(function() {
			Eukaryote.CrossoverStrategy.SimilarStrings({numberOfOffspring: '3'})(['abc', 'xyz']);
		});
		test.done();
	},

	/**
	 * numberOfOffspring >= 1.
	 */
	CrossoverStrategy_SimilarStrings_numberOfOffspringRangeValidation: function(test) {
		test.throws(function() {
			Eukaryote.CrossoverStrategy.SimilarStrings({numberOfOffspring: 0})(['abc', 'xyz']);
		});
		test.done();
	},

	/**
	 * numberOfOffspring >= 1.
	 */
	CrossoverStrategy_SimilarStrings_chromosomeLengthAsPercentOfGenotypeTypeValidation: function(test) {
		test.throws(function() {
			Eukaryote.CrossoverStrategy.SimilarStrings({chromosomeLengthAsPercentOfGenotype: '50'})(['abc', 'xyz']);
		});
		test.done();
	},

	/**
	 * chromosomeLengthAsPercentOfGenotype range validation
	 */
	CrossoverStrategy_SimilarStrings_chromosomeLengthAsPercentOfGenotypeRangeValidation: function(test) {
		test.throws(function() {
			Eukaryote.CrossoverStrategy.SimilarStrings({chromosomeLengthAsPercentOfGenotype: 0})(['abc', 'xyz']);
		});
		test.throws(function() {
			Eukaryote.CrossoverStrategy.SimilarStrings({chromosomeLengthAsPercentOfGenotype: 101})(['abc', 'xyz']);
		});
		test.done();
	},

	MatingStrategy_Random: function(test) {
		var population = [ 1, 2, 3, 4, 5 ];
		var strategy = Eukaryote.MatingStrategy.Random({numberOfIndividuals: 2});
		strategy.begin();
		var parents = strategy.mate(population);
		strategy.end();
		test.equal(parents.length, 2);
		parents.forEach(function(parent) {
			test.ok(population.indexOf(parent) >= 0, 'no such individual in population');
		});
		test.done();
	},

	MatingStrategy_Sequential: function(test) {
		var population = [ 1, 2, 3, 4, 5 ];
		var strategy = Eukaryote.MatingStrategy.Sequential({numberOfIndividuals: 2});
		strategy.begin();
		var parents = strategy.mate(population);
		test.equal(1, parents[0]);
		test.equal(2, parents[1]);
		parents = strategy.mate(population);
		test.equal(3, parents[0]);
		test.equal(4, parents[1]);
		parents = strategy.mate(population);
		test.equal(5, parents[0]);
		test.equal(1, parents[1]);
		strategy.end();
		test.done();
	},

	MatingStrategy_Sequential_numberOfIndividuals: function(test) {
		var population = [ 1, 2, 3, 4, 5 ];
		var strategy = Eukaryote.MatingStrategy.Sequential({numberOfIndividuals: 3});
		strategy.begin();
		var parents = strategy.mate(population);
		test.equal(1, parents[0]);
		test.equal(2, parents[1]);
		test.equal(3, parents[2]);
		parents = strategy.mate(population);
		test.equal(4, parents[0]);
		test.equal(5, parents[1]);
		test.equal(1, parents[2]);
		parents = strategy.mate(population);
		test.equal(2, parents[0]);
		test.equal(3, parents[1]);
		test.equal(4, parents[2]);
		strategy.end();
		test.done();
	},

	MatingStrategy_SequentialRandom: function(test) {
		var population = [ 1, 2, 3, 4, 5 ];
		var strategy = Eukaryote.MatingStrategy.SequentialRandom({numberOfIndividuals: 2});
		strategy.begin();
		var parents = strategy.mate(population);
		test.equal(1, parents[0]);
		test.ok(population.indexOf(parents[1]) >= 0, 'no such individual in population');
		parents = strategy.mate(population);
		test.equal(2, parents[0]);
		test.ok(population.indexOf(parents[1]) >= 0, 'no such individual in population');
		strategy.end();
		test.done();
	},

	MatingStrategy_SequentialRandom_numberOfIndividuals: function(test) {
		var population = [ 1, 2, 3, 4, 5 ];
		var strategy = Eukaryote.MatingStrategy.SequentialRandom({numberOfIndividuals: 3});
		strategy.begin();
		var parents = strategy.mate(population);
		test.equal(1, parents[0]);
		test.ok(population.indexOf(parents[1]) >= 0, 'no such individual in population');
		test.ok(population.indexOf(parents[2]) >= 0, 'no such individual in population');
		parents = strategy.mate(population);
		test.equal(2, parents[0]);
		test.ok(population.indexOf(parents[1]) >= 0, 'no such individual in population');
		test.ok(population.indexOf(parents[2]) >= 0, 'no such individual in population');
		strategy.end();
		test.done();
	},

	/**
	 * Callbacks are executed the correct number of times.
	 */
	seed_callbackCounts: function(test) {
		var populationSize  = 50;
		var numberOfGenerations = 50;
		var mutateCalls = 0;
		var fitnessCalls = 0;
		var crossoverCalls = 0;
		var generationCalls = 0;
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { mutateCalls++; },
				fitness: function(individual) { fitnessCalls++; return 0; },
				crossover: function(father, mother) { crossoverCalls++; return [father, mother]; },
				generation: function(generation) { generationCalls++; return false; }
			},
			config: {
				populationSize: populationSize,
				numberOfGenerations: numberOfGenerations
			}
		});
		eukaryote.seed({});
		test.equal(mutateCalls, populationSize*numberOfGenerations);
		test.equal(fitnessCalls, populationSize*numberOfGenerations);
		test.equal(crossoverCalls, (Math.floor(populationSize*0.9/2)+1)*numberOfGenerations);
		test.equal(generationCalls, numberOfGenerations);
		test.done();
	},

	/**
	 * Exception thrown when seed is called without providing an individual.
	 */
	seed_noParam: function(test) {
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; }
			}
		});
		test.throws(function() {
			eukaryote.seed();
		});
		test.done();
	},

	/**
	 * Exception thrown when nothing is returned from 'generation' API callback.
	 */
	seed_generation_noReturn: function(test) {
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; },
				generation: function() { }
			}
		});
		test.throws(function() {
			eukaryote.seed({});
		});
		test.done();
	},

	/**
	 * Exception thrown when nothing is returned from 'generation' API callback.
	 */
	seed_generation_invalidReturn: function(test) {
		var eukaryote = new Eukaryote({
			callbacks: {
				mutate: function(individual) { },
				fitness: function(individual) { return 0; },
				generation: function() { return 'notvalid'; }
			}
		});
		test.throws(function() {
			eukaryote.seed({});
		});
		test.done();
	}

};
