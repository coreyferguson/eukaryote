
var TypeValidator = require('./type-validator');

var CrossoverStrategy = {};

/**
 * Crossover two genotypes of type 'string'. Replace similar segments of
 * string genotypes.
 *
 * @param options {
 *     numberOfOffspring: optional, integer, default: 2, range: 1 <= o
 *     chromosomeLengthAsPercentOfGenotype: optional, float, default: 50, range: 0 < n < 100
 * }
 * 
 * Examples: 
 * - 'abc'  + 'xyz'  = 'xbc'  & 'ayz'
 * - 'abcd' + 'xyz'  = 'aycd' & 'xbz'
 * - 'abc'  + 'wxyz' = 'aby'  & 'wxcz'
 */
CrossoverStrategy.SimilarStrings = function(options) {
	// defaults
	options = options || {};
	if (!TypeValidator.isDefined(options.numberOfOffspring)) {
		options.numberOfOffspring = 2;
	} else if (options.numberOfOffspring < 1) {
		throw new Error('Illegal argument: numberOfOffspring range: 1 <= o');
	}
	if (!TypeValidator.isDefined(options.chromosomeLengthAsPercentOfGenotype)) { options.chromosomeLengthAsPercentOfGenotype = 50; }
	// validation
	if (!TypeValidator.isNumber(options.numberOfOffspring)) {
		throw new Error("Option 'numberOfOffspring' must be a number. Found the " + 
			typeName(options.numberOfOffspring) + ": " + options.numberOfOffspring);
	}
	if (options.numberOfOffspring <= 0) {
		throw new Error("Option 'numberOfOffspring' must be larger than 0.");
	}
	if (!TypeValidator.isNumber(options.chromosomeLengthAsPercentOfGenotype)) {
		throw new Error("Option 'chromosomeLengthAsPercentOfGenotype' must be a number. Found the " + 
			typeName(options.chromosomeLengthAsPercentOfGenotype) + ": " + options.chromosomeLengthAsPercentOfGenotype);
	}
	if (options.chromosomeLengthAsPercentOfGenotype < 1 || options.chromosomeLengthAsPercentOfGenotype > 100) {
		throw new Error("Option 'chromosomeLengthAsPercentOfGenotype' must be > 0 and <= 100");
	}
	return function(genotypes) {
		// validate all genotypes are of type 'string'
		genotypes.forEach(function(genotype) {
			if (!TypeValidator.isString(genotype)) {
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

};

module.exports = CrossoverStrategy;
