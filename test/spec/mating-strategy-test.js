var MatingStrategy = require('../../src/mating-strategy');

describe('MatingStrategy', function() {

	////////////
	// Random //
	////////////

  describe('Random', function() {

    it('should choose two individuals from population', function() {
      var strategy = MatingStrategy.Random({
        numberOfIndividuals: 2
      });
      var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      strategy.begin();
      var individuals = strategy.mate(population);
      strategy.end();
      expect(individuals.length).toBe(2);
      expect(population).toEqual(jasmine.arrayContaining(individuals));
    });

    it('should choose two individuals from population by default', function() {
      var strategy = MatingStrategy.Random();
      var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      strategy.begin();
      var individuals = strategy.mate(population);
      strategy.end();
      expect(individuals.length).toBe(2);
      expect(population).toEqual(jasmine.arrayContaining(individuals));
    });

    it('should throw error when numberOfIndividuals too low', function() {
      expect(function() {
        MatingStrategy.Random({
          numberOfIndividuals: 1
        });
      }).toThrowError(/Illegal argument.*numberOfIndividuals/);
      expect(function() {
        MatingStrategy.Random({
          numberOfIndividuals: 0
        });
      }).toThrowError(/Illegal argument.*numberOfIndividuals/);
      expect(function() {
        MatingStrategy.Random({
          numberOfIndividuals: -1
        });
      }).toThrowError(/Illegal argument.*numberOfIndividuals/);
    });

    it('should throw error when numberOfIndividuals too high', function() {
      expect(function() {
        var strategy = MatingStrategy.Random({
          numberOfIndividuals: 11
        });
        var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        strategy.begin();
        var individuals = strategy.mate(population);
        strategy.end();
      }).toThrowError(/Illegal argument.*numberOfIndividuals/);
    });

    it('should allow more than two individuals to mate', function() {
      // 3 individuals
      var strategy = MatingStrategy.Random({
        numberOfIndividuals: 3
      });
      var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      strategy.begin();
      var individuals = strategy.mate(population);
      strategy.end();
      expect(individuals.length).toBe(3);
      expect(population).toEqual(jasmine.arrayContaining(individuals));
      // all individuals
      strategy = MatingStrategy.Random({
        numberOfIndividuals: 10
      });
      strategy.begin();
      individuals = strategy.mate(population);
      strategy.end();
      expect(individuals.length).toBe(10);
      expect(population).toEqual(jasmine.arrayContaining(individuals));
    });

  }); // End Random

	////////////////
	// Sequential //
	////////////////

	describe('Sequential', function() {

		it('should choose two individuals sequentially', function() {
			var strategy = MatingStrategy.Sequential({
				numberOfIndividuals: 2
			});
			var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			strategy.begin();
			var individuals = strategy.mate(population);
			strategy.end();
			expect(individuals.length).toBe(2);
			expect(individuals[0]).toBe(1);
			expect(individuals[1]).toBe(2);
		});

		it('should choose two individuals sequentially by default', function() {
			var strategy = MatingStrategy.Sequential();
			var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			strategy.begin();
			var individuals = strategy.mate(population);
			strategy.end();
			expect(individuals.length).toBe(2);
			expect(individuals[0]).toBe(1);
			expect(individuals[1]).toBe(2);
		});

		it('should remember the last two individuals chosen on second mate call', function() {
			var strategy = MatingStrategy.Sequential({
				numberOfIndividuals: 2
			});
			var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			strategy.begin();
			var individuals = strategy.mate(population);
			expect(individuals.length).toBe(2);
			expect(individuals[0]).toBe(1);
			expect(individuals[1]).toBe(2);
			var newIndividuals = strategy.mate(population);
			expect(individuals.length).toBe(2);
			expect(newIndividuals[0]).toBe(3);
			expect(newIndividuals[1]).toBe(4);
			strategy.end();
		});

		it('should choose individuals twice if entire population has already been chosen to mate', function() {
			var strategy = MatingStrategy.Sequential({
				numberOfIndividuals: 2
			});
			var population = [1, 2, 3, 4];
			strategy.begin();
			var individuals = strategy.mate(population);
			expect(individuals[0]).toBe(1);
			expect(individuals[1]).toBe(2);
			individuals = strategy.mate(population);
			expect(individuals[0]).toBe(3);
			expect(individuals[1]).toBe(4);
			individuals = strategy.mate(population);
			expect(individuals[0]).toBe(1);
			expect(individuals[1]).toBe(2);
			strategy.end();
		});

		it('should allow more than 2 individuals to mate', function() {
			// 3 individuals
			var strategy = MatingStrategy.Sequential({
				numberOfIndividuals: 3
			});
			var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			strategy.begin();
			var individuals = strategy.mate(population);
			strategy.end();
			expect(individuals.length).toBe(3);
			expect(population).toEqual(jasmine.arrayContaining(individuals));
			// all individuals
			strategy = MatingStrategy.Sequential({
				numberOfIndividuals: 10
			});
			population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			strategy.begin();
			individuals = strategy.mate(population);
			strategy.end();
			expect(individuals.length).toBe(10);
			expect(population).toEqual(jasmine.arrayContaining(individuals));
		});

		it('should throw an error when numberOfIndividuals is too low', function() {
			expect(function() {
				var strategy = MatingStrategy.Sequential({
					numberOfIndividuals: 1
				});
			}).toThrowError(/Illegal argument.*numberOfIndividuals/);
			expect(function() {
				var strategy = MatingStrategy.Sequential({
					numberOfIndividuals: 0
				});
			}).toThrowError(/Illegal argument.*numberOfIndividuals/);
			expect(function() {
				var strategy = MatingStrategy.Sequential({
					numberOfIndividuals: -1
				});
			}).toThrowError(/Illegal argument.*numberOfIndividuals/);
		});

		it('should throw an error when numberOfIndividuals is too high', function() {
			expect(function() {
				var strategy = MatingStrategy.Sequential({
					numberOfIndividuals: 11
				});
				var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
				strategy.begin();
				var individuals = strategy.mate(population);
				strategy.end();
			}).toThrowError(/Illegal argument.*numberOfIndividuals/);
		});

	}); // End Sequential

	//////////////////////
	// SequentialRandom //
	//////////////////////

	describe('SequentialRandom', function() {

		it('should choose two individuals', function() {
			var strategy = MatingStrategy.SequentialRandom({
				numberOfIndividuals: 2
			});
			var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			strategy.begin();
			var individuals = strategy.mate(population);
			strategy.end();
			expect(individuals.length).toBe(2);
			expect(population).toEqual(jasmine.arrayContaining(individuals));
			if (individuals[0] !== 1 && individuals[1] !== 1) {
				fail('At least one chosen individual should have been chosen sequentially.');
			}
		});

		it('should choose two individuals by default', function() {
			var strategy = MatingStrategy.SequentialRandom();
			var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			strategy.begin();
			var individuals = strategy.mate(population);
			strategy.end();
			expect(individuals.length).toBe(2);
			expect(population).toEqual(jasmine.arrayContaining(individuals));
		});

		it('should remember the last sequential individual on the second mate call', function() {
			var strategy = MatingStrategy.SequentialRandom({
				numberOfIndividuals: 2
			});
			var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			strategy.begin();
			var individuals = strategy.mate(population);
			expect(individuals.length).toBe(2);
			expect(population).toEqual(jasmine.arrayContaining(individuals));
			individuals = strategy.mate(population);
			expect(individuals.length).toBe(2);
			expect(population).toEqual(jasmine.arrayContaining(individuals));
			if (individuals[0] !== 2 && individuals[1] !== 2) {
				fail('At least one chosen individual should have been chosen sequentially.');
			}
			strategy.end();
		});

		it('should choose individuals twice if the entire population has already been chosen to mate', function() {
			var strategy = MatingStrategy.SequentialRandom({
				numberOfIndividuals: 2
			});
			var population = [1, 2, 3, 4];
			strategy.begin();
			var assertOneIndividual = function(individuals, i) {
				if (individuals[0] !== i && individuals[1] !== i) {
					fail('At least one chosen individual should have been chosen sequentially.');
				}
			};
			var individuals = strategy.mate(population);
			assertOneIndividual(individuals, 1);
			individuals = strategy.mate(population);
			assertOneIndividual(individuals, 2);
			individuals = strategy.mate(population);
			assertOneIndividual(individuals, 3);
			individuals = strategy.mate(population);
			assertOneIndividual(individuals, 4);
			individuals = strategy.mate(population);
			assertOneIndividual(individuals, 1);
			strategy.end();
		});

		it('should allow more than two individuals to mate', function() {
			// 3 individuals
			var strategy = MatingStrategy.SequentialRandom({
				numberOfIndividuals: 3
			});
			var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			strategy.begin();
			var individuals = strategy.mate(population);
			strategy.end();
			expect(individuals.length).toBe(3);
			expect(population).toEqual(jasmine.arrayContaining(individuals));
			// all individuals
			strategy = MatingStrategy.SequentialRandom({
				numberOfIndividuals: 10
			});
			population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			strategy.begin();
			individuals = strategy.mate(population);
			strategy.end();
			expect(individuals.length).toBe(10);
			expect(population).toEqual(jasmine.arrayContaining(individuals));
		});

		it('should throw an error when numberOfIndividuals is too low', function() {
			expect(function() {
				MatingStrategy.SequentialRandom({
					numberOfIndividuals: 1
				});
			}).toThrowError(/Illegal argument.*numberOfIndividuals/);
			expect(function() {
				MatingStrategy.SequentialRandom({
					numberOfIndividuals: 0
				});
			}).toThrowError(/Illegal argument.*numberOfIndividuals/);
			expect(function() {
				MatingStrategy.SequentialRandom({
					numberOfIndividuals: -1
				});
			}).toThrowError(/Illegal argument.*numberOfIndividuals/);
		});

		it('should throw an error when numberOfIndividuals is too high', function() {
			expect(function() {
				var strategy = MatingStrategy.SequentialRandom({
					numberOfIndividuals: 11
				});
				var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
				strategy.begin();
				strategy.mate(population);
				strategy.end();
			}).toThrowError(/Illegal argument.*numberOfIndividuals/);
		});

	}); // End SequentialRandom

}); // End MatingStrategy
