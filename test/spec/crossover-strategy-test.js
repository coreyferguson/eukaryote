var CrossoverStrategy = require('../../src/crossover-strategy');

describe('CrossoverStrategy', function() {

	////////////////////
	// SimilarStrings //
	////////////////////

	describe('SimilarStrings', function() {

		it('should only use genes from parents', function() {
			var strategy = CrossoverStrategy.SimilarStrings({
				numberOfOffspring: 2,
				chromosomeLengthAsPercentOfGenotype: 50
			});
			var genotypes = ['abc', 'xyz'];
			var offspring = strategy(genotypes);
			var allPossibleOffspring = [
				'abc',
				'abz',
				'ayc',
				'ayz',
				'xbc',
				'xbz',
				'xyc',
				'xyz'
			];
			expect(allPossibleOffspring).toEqual(jasmine.arrayContaining(offspring));
		});

		it('should produce 2 offspring by default', function() {
			var strategy = CrossoverStrategy.SimilarStrings();
			var genotypes = ['abc', 'xyz'];
			var offspring = strategy(genotypes);
			expect(offspring.length).toBe(2);
		});

		it('should throw error when numberOfOffspring < 1', function() {
			expect(function() {
				var strategy = CrossoverStrategy.SimilarStrings({
					numberOfOffspring: 0
				});
			}).toThrowError(/Illegal argument.*numberOfOffspring/);
			expect(function() {
				var strategy = CrossoverStrategy.SimilarStrings({
					numberOfOffspring: -1
				});
			}).toThrowError(/Illegal argument.*numberOfOffspring/);
		});

	}); // End SimilarStrings

}); // End CrossoverStrategy
