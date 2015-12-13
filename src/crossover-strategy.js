
var TypeValidator = require('./type-validator');

class CrossoverStrategya {
  static SimilarStrings(options) {

    // Set defaults + validation
    options = options || {};
    if (!TypeValidator.isDefined(options.numberOfOffspring)) {
      options.numberOfOffspring = 2;
    } else if (!TypeValidator.isInteger(options.numberOfOffspring)) {
      throw new Error('Illegal argument: numberOfOffspring must be an integer; actual: ' + options.numberOfOffspring);
    } else if (options.numberOfOffspring < 1) {
      throw new Error('Illegal argument: numberOfOffspring range: 1 <= o; actual: ' + options.numberOfOffspring);
    }
    if (!TypeValidator.isDefined(options.chromosomeLengthAsPercentOfGenotype)) {
      options.chromosomeLengthAsPercentOfGenotype = 50;
    } else if (!TypeValidator.isNumber(options.chromosomeLengthAsPercentOfGenotype)) {
      throw new Error('Illegal argument: chromosomeLengthAsPercentOfGenotype must be an integer; actual: ' + options.chromosomeLengthAsPercentOfGenotype);
    } else if (options.chromosomeLengthAsPercentOfGenotype < 1 || options.chromosomeLengthAsPercentOfGenotype > 99) {
      throw new Error('Illegal argument: chromosomeLengthAsPercentOfGenotype range: 0 < n < 100; actual: ' + options.chromosomeLengthAsPercentOfGenotype);
    }

    return function(genotypes) {
      // validate genotypes
      if (!TypeValidator.isDefined(genotypes) || !TypeValidator.isArray(genotypes)) {
        throw new Error('Illegal argument: genotypes must be an array of strings; actual: ' + genotypes);
      }
      genotypes.forEach(function(genotype) {
        if (!TypeValidator.isString(genotype)) {
          throw new Error('Illegal argument: genotypes must be strings; actual: ' + genotypes);
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
}

module.exports = CrossoverStrategy;
