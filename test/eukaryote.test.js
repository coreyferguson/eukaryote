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
		}, /'fitness' API function must be provided/, 'expected error when fitness function not provided');
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
		}, /'mutate' API function must be provided/, 'expected error when mutate function not provided');
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
		}, /2 offspring must be returned from 'crossover' API function/);
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
		}, /2 offspring must be returned from 'crossover' API function/);
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
		}, /2 offspring must be returned from 'crossover' API function/);
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
		}, /offspring returned from 'crossover' API function must be an array/);
		test.done();
	},

	/**
	 * Validate top 10 percent fittest individuals survive selection.
	 */
	SelectionStrategy_Top10Percent_100_individuals: function(test) {
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
		Eukaryote.SelectionStrategy.Top10Percent(eukaryote.population);
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
	 * Validate top 10 percent fittest individuals survive selection
	 * even with small population.
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
		Eukaryote.SelectionStrategy.Top10Percent(eukaryote.population);
		test.equal(eukaryote.population.length, 1);
		test.equal(eukaryote.population[0], 9);
		test.done();
	},

	/**
	 * Crossover two genotypes of equal length: abc + xyz
	 */
	CrossoverStrategy_SimilarStrings_matchingGenotypeLengths: function(test) {
		var father = 'abc';
		var mother = 'xyz';
		var offspring = Eukaryote.CrossoverStrategy.SimilarStrings(father, mother);
		// all genes are accounted for
		var actualGenes = offspring[0] + offspring[1];
		test.equal(actualGenes.length, 6, 'expected same number of genes in offspring as came from parents');
		// offspring gene stretches were swapped correctly
		var possibleOutcomes = [ 'xbcayz', 'aycxbz', 'abzxyc', 'ayzxbc', 'xbzayc', 'xycabz' ];
		var isWithinRangeOfPossibleOutcomes = false;
		for (var c=0; c<possibleOutcomes.length; c++) {
			if (actualGenes === possibleOutcomes[c]) {
				isWithinRangeOfPossibleOutcomes = true;
			}
		}
		test.ok(isWithinRangeOfPossibleOutcomes, 'similar stretches of genes were not properly crossed over');
		test.done();
	},

	/**
	 * Crossover two genotypes of unequal length: abcd + xyz
	 */
	CrossoverStrategy_SimilarStrings_fatherHasLongerGenotype: function(test) {
		var father = 'abcd';
		var mother = 'xyz';
		var offspring = Eukaryote.CrossoverStrategy.SimilarStrings(father, mother);
		// all genes are accounted for
		var actualGenes = offspring[0] + offspring[1];
		test.equal(actualGenes.length, 7, 'expected same number of genes in offspring as came from parents');
		// offspring gene stretches were swapped correctly
		var possibleOutcomes = [ 'xbcdayz', 'aycdxbz', 'abzdxyc', 'ayzxbcd', 'xbzaycd', 'xycabzd' ];
		var isWithinRangeOfPossibleOutcomes = false;
		for (var c=0; c<possibleOutcomes.length; c++) {
			if (actualGenes === possibleOutcomes[c]) {
				isWithinRangeOfPossibleOutcomes = true;
			}
		}
		test.ok(isWithinRangeOfPossibleOutcomes, 'similar stretches of genes were not properly crossed over');
		test.done();
	},

	/**
	 * Crossover two genotypes of unequal length: abc + wxyz
	 */
	CrossoverStrategy_SimilarStrings_motherHasLongerGenotype: function(test) {
		var father = 'abc';
		var mother = 'wxyz';
		var offspring = Eukaryote.CrossoverStrategy.SimilarStrings(father, mother);
		// all genes are accounted for
		var actualGenes = offspring[0] + offspring[1];
		test.equal(actualGenes.length, 7, 'expected same number of genes in offspring as came from parents');
		// offspring gene stretches were swapped correctly
		var possibleOutcomes = [ 'wbcaxyz', 'axcwbyz', 'abywxcz', 'axyzwbc', 'wbyzaxc', 'wxczaby' ];
		var isWithinRangeOfPossibleOutcomes = false;
		for (var c=0; c<possibleOutcomes.length; c++) {
			if (actualGenes === possibleOutcomes[c]) {
				isWithinRangeOfPossibleOutcomes = true;
			}
		}
		test.ok(isWithinRangeOfPossibleOutcomes, 'similar stretches of genes were not properly crossed over');
		test.done();
	},

	/**
	 * Validate exception thrown when non-string provided
	 */
	CrossoverStrategy_SimilarStrings_notStringType: function(test) {
		test.throws(function() {
			Eukaryote.CrossoverStrategy.SimilarStrings(1, 'two');
		}, /first parameter of CrossoverStrategy.SimilarStrings must be of type 'string'/);
		test.throws(function() {
			Eukaryote.CrossoverStrategy.SimilarStrings('one', 2);
		}, /second parameter of CrossoverStrategy.SimilarStrings must be of type 'string'/);
		test.done();
	},

	/**
	 * Validate callbacks are executed the correct number of times.
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
	 * Validate exception thrown when seed is called without providing an individual.
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
		}, /'individual' must be specified/);
		test.done();
	},

	/**
	 * Validate exception thrown when nothing is returned from 'generation' API callback.
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
		}, /'generation' API function should return a boolean/);
		test.done();
	},

	/**
	 * Validate exception thrown when nothing is returned from 'generation' API callback.
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
		}, /'generation' API function should return a boolean/);
		test.done();
	}

};
