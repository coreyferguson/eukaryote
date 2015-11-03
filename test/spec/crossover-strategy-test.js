var CrossoverStrategy = require('../../src/genetic/crossover-strategy');

describe('CrossoverStrategy', function() {

	////////////////////
	// SimilarStrings //
	////////////////////

	describe('SimilarStrings', function() {

		it('should only use genes from parents', function() {
			var strategy = CrossoverStrategy.SimilarStrings({
				numberOfOffspring: 50,
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

		it('should throw error when numberOfOffspring is not an integer', function() {
			expect(function() {
				var strategy = CrossoverStrategy.SimilarStrings({
					numberOfOffspring: 'asdf'
				});
			}).toThrowError(/Illegal argument.*numberOfOffspring/);
			expect(function() {
				var strategy = CrossoverStrategy.SimilarStrings({
					numberOfOffspring: {}
				});
			}).toThrowError(/Illegal argument.*numberOfOffspring/);
			expect(function() {
				var strategy = CrossoverStrategy.SimilarStrings({
					numberOfOffspring: 3.5
				});
			}).toThrowError(/Illegal argument.*numberOfOffspring/);
		});

		it('should have chromosomeLengthAsPercentOfGenotype as 50 by default', function() {
			var strategy = CrossoverStrategy.SimilarStrings({
				numberOfOffspring: 1
			});
			var genotypes = ['abc', 'xyz'];
			var offspring = strategy(genotypes);
			// With 3 genes, 50% chromosome length should mean only a single gene is crossed over
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

		it('should throw error when chromosomeLengthAsPercentOfGenotype <= 0', function() {
			expect(function() {
				var strategy = CrossoverStrategy.SimilarStrings({
					chromosomeLengthAsPercentOfGenotype: 0
				});
			}).toThrowError(/Illegal argument.*chromosomeLengthAsPercentOfGenotype/);
			expect(function() {
				var strategy = CrossoverStrategy.SimilarStrings({
					chromosomeLengthAsPercentOfGenotype: -1
				});
			}).toThrowError(/Illegal argument.*chromosomeLengthAsPercentOfGenotype/);
		});

		it('should throw error when chromosomeLengthAsPercentOfGenotype >= 100', function() {
			expect(function() {
				var strategy = CrossoverStrategy.SimilarStrings({
					chromosomeLengthAsPercentOfGenotype: 100
				});
			}).toThrowError(/Illegal argument.*chromosomeLengthAsPercentOfGenotype/);
			expect(function() {
				var strategy = CrossoverStrategy.SimilarStrings({
					chromosomeLengthAsPercentOfGenotype: 101
				});
			}).toThrowError(/Illegal argument.*chromosomeLengthAsPercentOfGenotype/);
		});

		it('should throw error when chromosomeLengthAsPercentOfGenotype is not a number', function() {
			expect(function() {
				var strategy = CrossoverStrategy.SimilarStrings({
					chromosomeLengthAsPercentOfGenotype: 'asdf'
				});
			}).toThrowError(/Illegal argument.*chromosomeLengthAsPercentOfGenotype/);
			expect(function() {
				var strategy = CrossoverStrategy.SimilarStrings({
					chromosomeLengthAsPercentOfGenotype: {}
				});
			}).toThrowError(/Illegal argument.*chromosomeLengthAsPercentOfGenotype/);
		});

		it('should throw error when genotypes are not an array strings', function() {
			expect(function() {
				var strategy = CrossoverStrategy.SimilarStrings();
				var genotypes = [1, 2];
				var offspring = strategy(genotypes);
			}).toThrowError(/Illegal argument.*genotypes/);
			expect(function() {
				var strategy = CrossoverStrategy.SimilarStrings();
				var genotypes = [{}, {}];
				var offspring = strategy(genotypes);
			}).toThrowError(/Illegal argument.*genotypes/);
			expect(function() {
				var strategy = CrossoverStrategy.SimilarStrings();
				var genotypes = null;
				var offspring = strategy(genotypes);
			}).toThrowError(/Illegal argument.*genotypes/);
			expect(function() {
				var strategy = CrossoverStrategy.SimilarStrings();
				var genotypes = 'not an array';
				var offspring = strategy(genotypes);
			}).toThrowError(/Illegal argument.*genotypes/);
		});

		it('should crossover genotypes of differeng lengths', function() {
			var strategy = CrossoverStrategy.SimilarStrings({
				numberOfOffspring: 50
			});
			var genotypes = ['abc', 'xy'];
			var offspring = strategy(genotypes);
			var allPossibleOffspring = [
				'abc',
				'ayc',
				'xbc',
				'xyc',
				'ab',
				'ay',
				'xb',
				'xy'
			];
			expect(allPossibleOffspring).toEqual(jasmine.arrayContaining(genotypes));
			genotypes = ['xy', 'abc'];
			offspring = strategy(genotypes);
			expect(allPossibleOffspring).toEqual(jasmine.arrayContaining(genotypes));
		});

	}); // End SimilarStrings

}); // End CrossoverStrategy
