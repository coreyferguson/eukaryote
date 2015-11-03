var SelectionStrategy = require('../../src/selection-strategy');

describe('SelectionStrategy', function() {

	//////////
	// TopX //
	//////////

	describe('TopX', function() {

		it('should select top individual', function() {
			// by default
			var strategy = SelectionStrategy.TopX();
			var population = [1, 2, 3, 4, 5];
			strategy(population);
			expect(population.length).toBe(1);
			expect(population[0]).toBe(1);
			// when chosen
			strategy = SelectionStrategy.TopX({
				numberOfIndividuals: 1
			});
			population = [1, 2, 3, 4, 5];
			strategy(population);
			expect(population.length).toBe(1);
			expect(population[0]).toBe(1);
		});

		it('should throw error when numberOfIndividuals too low', function() {
			expect(function() {
				var strategy = SelectionStrategy.TopX({
					numberOfIndividuals: 0
				});
			}).toThrowError(/Illegal argument.*numberOfIndividuals/);
			expect(function() {
				var strategy = SelectionStrategy.TopX({
					numberOfIndividuals: -1
				});
			}).toThrowError(/Illegal argument.*numberOfIndividuals/);
		});

		it('should throw error when numberOfIndividuals is too high', function() {
			var strategy = SelectionStrategy.TopX({
				numberOfIndividuals: 5
			});
			var population = [1, 2, 3, 4];
			expect(function() {
				strategy(population);
			}).toThrowError(/Illegal argument.*numberOfIndividuals/);
		});

		it('should throw error when numberOfIndividuals is wrong type', function() {
			expect(function() {
				SelectionStrategy.TopX({
					numberOfIndividuals: 'asdf'
				});
			}).toThrowError(/Illegal argument.*numberOfIndividuals/);
		});

		it('should throw error when numberOfIndividuals is floating point number', function() {
			expect(function() {
				SelectionStrategy.TopX({
					numberOfIndividuals: 1.5
				});
			}).toThrowError(/Illegal argument.*numberOfIndividuals/);
		});

	}); // End TopX

	/////////////////
	// TopXPercent //
	/////////////////

	describe('TopXPercent', function() {

		it('should select top individual', function() {
			// by default
			var strategy = SelectionStrategy.TopXPercent();
			var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			strategy(population);
			expect(population.length).toBe(1);
			expect(population[0]).toBe(1);
			// when chosen
			strategy = SelectionStrategy.TopXPercent({
				probability: 0.1
			});
			population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			strategy(population);
			expect(population.length).toBe(1);
			expect(population[0]).toBe(1);
		});

		it('should throw error when probability too low', function() {
			expect(function() {
				SelectionStrategy.TopXPercent({
					probability: 0
				});
			}).toThrowError(/Illegal argument.*probability/);
			expect(function() {
				SelectionStrategy.TopXPercent({
					probability: -1
				});
			}).toThrowError(/Illegal argument.*probability/);
		});

		it('should throw error when probability too high', function() {
			expect(function() {
				SelectionStrategy.TopXPercent({
					probability: 1
				});
			}).toThrowError(/Illegal argument.*probability/);
			expect(function() {
				SelectionStrategy.TopXPercent({
					probability: 2
				});
			}).toThrowError(/Illegal argument.*probability/);
		});

	}); // End TopXPercent

  //////////////////////////
	// RandomWeightedByRank //
  //////////////////////////

	describe('RandomWeightedByRank', function() {

		it('should kill appropriate percent of individuals by rank', function() {
			var survivorCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			var iterations = 100000;
			for (var i=0; i<iterations; i++) {
				var population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
				var strategy = SelectionStrategy.RandomWeightedByRank();
				strategy(population);
				for (var p=0; p<population.length; p++) {
					survivorCounts[population[p]-1]++;
				}
			}
			// Validate fitter individuals are more likely to survive
			for (var s=1; s<survivorCounts.length; s++) {
				expect(survivorCounts[s]).toBeLessThan(survivorCounts[s-1]);
			}
			// Validate approximate percentage of survivors for each ranking
			expect(survivorCounts[0]).toBeGreaterThan(95000);
			expect(survivorCounts[1]).toBeGreaterThan(93000);
			expect(survivorCounts[2]).toBeGreaterThan(91000);
			expect(survivorCounts[3]).toBeGreaterThan(89000);
			expect(survivorCounts[4]).toBeGreaterThan(88000);
			expect(survivorCounts[5]).toBeGreaterThan(86000);
			expect(survivorCounts[6]).toBeGreaterThan(84000);
			expect(survivorCounts[7]).toBeGreaterThan(82000);
			expect(survivorCounts[8]).toBeGreaterThan(81000);
			expect(survivorCounts[9]).toBeGreaterThan(79000);
		});

	}); // End RandomWeightedByRank

}); // End SelectionStrategy
