
var Eukaryote = require('../../src/eukaryote');
var SelectionStrategy = require('../../src/selection-strategy');
var MatingStrategy = require('../../src/mating-strategy');
var CrossoverStrategy = require('../../src/crossover-strategy');
var lodash = {
	clone: require('lodash.clone')
};

var lodash = {
	clone: require('lodash.clone')
};

describe('Eukaryote', function() {

	/////////////////
	// constructor //
	/////////////////

	describe('constructor', function() {

		it('should not throw error on valid constructor options', function() {
			var eukaryote = new Eukaryote({
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				}
			});
		});

		it('should throw error when constructor missing required options', function() {
			expect(function() {
				var eukaryote = new Eukaryote();
			}).toThrowError(/Illegal argument/);
		});

		it('should throw error when fitness function not provided', function() {
			expect(function() {
				var eukaryote = new Eukaryote({
					callbacks: {
						mutate: function(individual) {}
					}
				});
			}).toThrowError(/Illegal argument.*fitness/);
		});

		it('should throw error when mutate function not provided', function() {
			expect(function() {
				var eukaryote = new Eukaryote({
					callbacks: {
						fitness: function(individual) { return 0; }
					}
				});
			}).toThrowError(/Illegal argument.*mutate/);
		});

		it('should throw error when config is not an object', function() {
			expect(function() {
				var eukaryote = new Eukaryote({
					config: 'asdf',
					callbacks: {
						fitness: function(individual) { return 0; },
						mutate: function(individual) {}
					}
				});
			}).toThrowError(/Illegal argument.*config/);
		});

		it('should throw error when populationSize is not an integer', function() {
			expect(function() {
				var eukaryote = new Eukaryote({
					config: {
						populationSize: 'not an integer'
					},
					callbacks: {
						fitness: function(individual) { return 0; },
						mutate: function(individual) {}
					}
				});
			}).toThrowError(/Illegal argument.*config\.populationSize/);
		});

		it('should throw error when populationSize < 2', function() {
			expect(function() {
				var eukaryote = new Eukaryote({
					config: {
						populationSize: 1
					},
					callbacks: {
						fitness: function(individual) { return 0; },
						mutate: function(individual) {}
					}
				});
			}).toThrowError(/Illegal argument.*config\.populationSize/);
			expect(function() {
				var eukaryote = new Eukaryote({
					config: {
						populationSize: -5
					},
					callbacks: {
						fitness: function(individual) { return 0; },
						mutate: function(individual) {}
					}
				});
			}).toThrowError(/Illegal argument.*config\.populationSize/);
		});

		it('should throw error when numberOfGenerations is not an integer', function() {
			expect(function() {
				var eukaryote = new Eukaryote({
					config: {
						numberOfGenerations: 'not an integer'
					},
					callbacks: {
						fitness: function(individual) { return 0; },
						mutate: function(individual) {}
					}
				});
			}).toThrowError(/Illegal argument.*config\.numberOfGenerations/);
		});

		it('should throw error when numberOfGenerations < 1', function() {
			expect(function() {
				var eukaryote = new Eukaryote({
					config: {
						numberOfGenerations: 0
					},
					callbacks: {
						fitness: function(individual) { return 0; },
						mutate: function(individual) {}
					}
				});
			}).toThrowError(/Illegal argument.*config\.numberOfGenerations/);
			expect(function() {
				var eukaryote = new Eukaryote({
					config: {
						numberOfGenerations: -1
					},
					callbacks: {
						fitness: function(individual) { return 0; },
						mutate: function(individual) {}
					}
				});
			}).toThrowError(/Illegal argument.*config\.numberOfGenerations/);
		});

		it('should throw error when strategy is not an object', function() {
			expect(function() {
				var eukaryote = new Eukaryote({
					callbacks: {
						fitness: function(individual) { return 0; },
						mutate: function(individual) {}
					},
					strategy: 'not an object'
				});
			}).toThrowError(/Illegal argument.*strategy/);
		});

		it('should allow selection strategy override', function() {
			var eukaryote = new Eukaryote({
					callbacks: {
						fitness: function(individual) { return 0; },
						mutate: function(individual) {}
					},
					strategy: {
						selection: SelectionStrategy.TopX()
					}
			});
		});

		it('should allow mating strategy override', function() {
			var eukaryote = new Eukaryote({
					callbacks: {
						fitness: function(individual) { return 0; },
						mutate: function(individual) {}
					},
					strategy: {
						mating: MatingStrategy.Sequential()
					}
			});
		});

		it('should throw error when selection strategy is not a function', function() {
			expect(function() {
				new Eukaryote({
						callbacks: {
							fitness: function(individual) { return 0; },
							mutate: function(individual) {}
						},
						strategy: {
							selection: 'not a function'
						}
				});
			}).toThrowError(/Illegal argument.*selection/);
		});

		it('should throw error when mating strategy is not a function', function() {
			expect(function() {
				new Eukaryote({
						callbacks: {
							fitness: function(individual) { return 0; },
							mutate: function(individual) {}
						},
						strategy: {
							mating: 'not a function'
						}
				});
			}).toThrowError(/Illegal argument.*mating/);
		});

	}); // End constructor

  ////////////////////
	// seedIndividual //
  ////////////////////

	describe('seedIndividual', function() {

		it('should fill entire population with clones of the same individual', function() {
			var eukaryote = new Eukaryote({
				config: {
					populationSize: 10
				},
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				}
			});
			eukaryote.seedIndividual({name: 'corey'});
			expect(eukaryote.population.length).toBe(10);
			eukaryote.population.forEach(function(individual) {
				expect(individual).toEqual({name: 'corey'});
			});
		});

		it('should throw error when individual is not an object', function() {
			var eukaryote = new Eukaryote({
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				}
			});
			expect(function() {
				eukaryote.seedIndividual('not an object');
			}).toThrowError(/Illegal argument.*individual/);
		});

	}); // End seedIndividual

	///////////
	// clone //
	///////////

	describe('clone', function() {
		it('should perform a deep clone', function() {
			var eukaryote = new Eukaryote({
				config: {
					populationSize: 10
				},
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				}
			});
			var individual = {
				name: 'Corey',
				properties: {
					awesome: true,
					humble: 'check',
				},
				synonyms: ['handsome', 'intelligent', 'funny']
			};
			var clone = eukaryote.clone(individual);
			expect(clone).not.toBe(individual); // different object reference
			expect(clone).toEqual(individual); // same property values
			expect(clone.properties).not.toBe(individual.properties); // differest nested object reference
			clone.name = 'Someone else';
			expect(individual.name).not.toBe('Someone else');
			clone.synonyms.push('liar');
			expect(individual.synonyms).not.toEqual(['handsome', 'intelligent', 'funny', 'liar']);
		});
	}); // End clone

	////////////////////////////
	// applySelectionStrategy //
	////////////////////////////

	describe('applySelectionStrategy', function() {

		it('should kill 50% of the population', function() {
			var eukaryote = new Eukaryote({
				config: {
					populationSize: 100
				},
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				},
				strategy: {
					selection: SelectionStrategy.TopXPercent({ probability: 0.5 })
				}
			});
			eukaryote.seedIndividual({ name: 'Corey' });
			eukaryote.applySelectionStrategy();
			expect(eukaryote.population.length).toBe(50);
		});

		it('should allow 1 individual to survive', function() {
			var eukaryote = new Eukaryote({
				config: {
					populationSize: 20
				},
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				},
				strategy: {
					selection: SelectionStrategy.TopX({ numberOfIndividuals: 1 })
				}
			});
			eukaryote.seedIndividual({ name: 'Corey' });
			eukaryote.applySelectionStrategy();
			expect(eukaryote.population.length).toBe(1);
		});

	}); // End applySelectionStrategy

	///////////////////////////////
	// getClonesOfMatingStrategy //
	///////////////////////////////

	describe('getClonesOfMatingStrategy', function() {

		it('should retrieve 1 clone', function() {
			var matingStrategy = MatingStrategy.Sequential({ numberOfIndividuals: 1 });
			var eukaryote = new Eukaryote({
				config: { populationSize: 2 },
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				},
				strategy: {
					mating: matingStrategy
				}
			});
			var individual = { name: 'Corey' };
			eukaryote.seedIndividual(individual);
			matingStrategy.begin();
			var clones = eukaryote.getClonesOfMatingStrategy();
			matingStrategy.end();
			expect(clones.length).toBe(1);
			expect(clones[0]).not.toBe(individual);
			expect(clones[0]).toEqual(individual);
		});

		it('should retrieve 2 clones', function() {
			var matingStrategy = MatingStrategy.Sequential({ numberOfIndividuals: 2 });
			var eukaryote = new Eukaryote({
				config: { populationSize: 2 },
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				},
				strategy: {
					mating: matingStrategy
				}
			});
			var individual = { name: 'Corey' };
			eukaryote.seedIndividual(individual);
			matingStrategy.begin();
			var clones = eukaryote.getClonesOfMatingStrategy();
			matingStrategy.end();
			expect(clones.length).toBe(2);
			expect(clones[0]).not.toBe(individual);
			expect(clones[0]).toEqual(individual);
			expect(clones[1]).not.toBe(individual);
			expect(clones[1]).toEqual(individual);
		});

		it('should retrieve 3 clones', function() {
			var matingStrategy = MatingStrategy.Sequential({ numberOfIndividuals: 3 });
			var eukaryote = new Eukaryote({
				config: { populationSize: 2 },
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				},
				strategy: {
					mating: matingStrategy
				}
			});
			var individual = { name: 'Corey' };
			eukaryote.seedIndividual(individual);
			matingStrategy.begin();
			var clones = eukaryote.getClonesOfMatingStrategy();
			matingStrategy.end();
			expect(clones.length).toBe(3);
			expect(clones[0]).not.toBe(individual);
			expect(clones[0]).toEqual(individual);
			expect(clones[1]).not.toBe(individual);
			expect(clones[1]).toEqual(individual);
			expect(clones[2]).not.toBe(individual);
			expect(clones[2]).toEqual(individual);
		});

	}); // End getClonesOfMatingStrategy

	///////////////
	// crossover //
	///////////////

	describe('crossover', function() {

		it('should return same results when crossover strategy is undefined', function() {
			var eukaryote = new Eukaryote({
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				}
			});
			var individuals = ['abc', 'xyz'];
			var newIndividuals = eukaryote.crossover(individuals);
			expect(newIndividuals).toBe(individuals);
		});

		it('should perform crossover strategy when defined', function() {
			var eukaryote = new Eukaryote({
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {},
					crossover: function(individuals) {
						individuals.forEach(function(individual) {
							individual.genotype += '_crossover';
						});
						return individuals;
					}
				}
			});
			var individuals = [{genotype: 'abc'}, {genotype: 'abc'}];
			var newIndividuals = eukaryote.crossover(individuals);
			newIndividuals.forEach(function(individual) {
				expect(individual.genotype).toBe('abc_crossover');
			});
		});

	}); // End crossover

	////////////
	// mutate //
	////////////

	describe('mutate', function() {

		it('should execute mutate callback on all given individuals', function() {
			var eukaryote = new Eukaryote({
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {
						return individual.genotype += '_mutation';
					}
				}
			});
			var individuals = [];
			for (var c=0; c<10; c++) {
				individuals.push({ genotype: 'genotype' });
			}
			var mutatedIndividuals = eukaryote.mutate(lodash.clone(individuals, true));
			mutatedIndividuals.forEach(function(individual) {
				expect(individual.genotype).toBe('genotype_mutation');
			});

		});

	}); // End mutate

	//////////////////////
	// spawnIndividuals //
	//////////////////////

	describe('spawnIndividuals', function() {

		it('should add all individuals', function() {
			var eukaryote = new Eukaryote({
				config: {
					populationSize: 5
				},
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				}
			});
			eukaryote.population = [
				{ genotype: 'abc' }, { genotype: 'abc' }
			];
			var individuals = [
				{ genotype: 'xyz' }, { genotype: 'xyz' }
			];
			eukaryote.spawnIndividuals(individuals);
			expect(eukaryote.population.length).toBe(4);
		});

		it('should not add more than population supports', function() {
			var eukaryote = new Eukaryote({
				config: {
					populationSize: 5
				},
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				}
			});
			eukaryote.population = [
				{ genotype: 'abc' }, { genotype: 'abc' }, { genotype: 'abc' }
			];
			var individuals = [
				{ genotype: 'xyz' }, { genotype: 'xyz' }, { genotype: 'xyz' }
			];
			eukaryote.spawnIndividuals(individuals);
			expect(eukaryote.population.length).toBe(5);

		});

	}); // End spawnIndividuals

	///////////////////////
	// shufflePopulation //
	///////////////////////

	describe('shufflePopulation', function() {

		it('should shuffle', function() {
			var eukaryote = new Eukaryote({
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				}
			});
			var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			eukaryote.population = lodash.clone(population);
			eukaryote.shufflePopulation();
			expect(population).not.toEqual(eukaryote.population);
			expect(population.length).toBe(eukaryote.population.length);
			expect(population).toEqual(jasmine.arrayContaining(eukaryote.population));
		});

	}); // End shufflePopulation

	/////////////////////////////
	// sortPopulationByFitness //
	/////////////////////////////

	describe('sortPopulationByFitness', function() {

		it('should sort by fitness, descending', function() {
			var eukaryote = new Eukaryote({
				callbacks: {
					fitness: function(individual) { return individual; },
					mutate: function(individual) {}
				}
			});
			eukaryote.population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			eukaryote.sortPopulationByFitness();
			expect(eukaryote.population.length).toBe(10);
			expect(eukaryote.population).toEqual([
				10, 9, 8, 7, 6, 5, 4, 3, 2, 1
			]);
		});

	}); // End sortPopulationByFitness

	//////////
	// seed //
	//////////

	describe('seed', function() {

		it('should mutate all individuals once per generation', function() {
			var mutateCalls = 0;
			var fitnessCalls = 0;
			var generationCalls = 0;
			var eukaryote = new Eukaryote({
				config: {
					numberOfGenerations: 10,
					populationSize: 10
				},
				callbacks: {
					fitness: function(individual) {
						fitnessCalls++;
						return 0;
					},
					mutate: function(individual) {
						mutateCalls++;
					},
					generation: function(generation) {
						generationCalls++;
					}
				}
			});
			eukaryote.seed({genotype: 'corey'});
			expect(eukaryote.population.length).toBe(10);
			expect(mutateCalls).toBe(100);
			expect(fitnessCalls).toBe(100);
			expect(generationCalls).toBe(10);
		});

		it('should run without optional callbacks', function() {
			var eukaryote = new Eukaryote({
				config: {
					numberOfGenerations: 10,
					populationSize: 10
				},
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				}
			});
			eukaryote.seed({genotype: 'corey'});
			expect(eukaryote.population.length).toBe(10);
		});

		it('should throw error when crossover strategy returns not enough individuals', function() {
			expect(function() {
				var eukaryote = new Eukaryote({
					callbacks: {
						fitness: function(individual) { return 0; },
						mutate: function(individual) {},
						crossover: function(individuals) {
							return [];
						}
					}
				});
				eukaryote.seed({genotype: 'corey'});
			}).toThrowError(/Illegal return.*array/);
		});

		it('should throw error when crossover strategy returns undefined', function() {
			expect(function() {
				var eukaryote = new Eukaryote({
					callbacks: {
						fitness: function(individual) { return 0; },
						mutate: function(individual) {},
						crossover: function(individuals) {
							return undefined;
						}
					}
				});
				eukaryote.seed({genotype: 'corey'});
			}).toThrowError(/Illegal return.*undefined/);
		});

		it('should throw error when crossover strategy doesn\'t return array', function() {
			expect(function() {
				var eukaryote = new Eukaryote({
					callbacks: {
						fitness: function(individual) { return 0; },
						mutate: function(individual) {},
						crossover: function(individuals) {
							return null;
						}
					}
				});
				eukaryote.seed({genotype: 'corey'});
			}).toThrowError(/Illegal return.*null/);
		});

	}); // End seed

}); // End Eukaryote