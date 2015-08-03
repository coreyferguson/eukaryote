var MathJeopardy = require('../examples/mathJeopardy/mathJeopardy.js');

var mathJeopardy;

module.exports = {

	setUp: function(callback) {
		mathJeopardy = new MathJeopardy({
			logging: false,
			target: 9.5
		});
		callback();
	},

	newGene_withIndividual: function(test) {
		var individual = { genotype: 'abcd' };
		var newGene = mathJeopardy.newGene(individual);
		test.equal(individual.genotype.length, 5, 'expected one additional gene');
		test.ok(/a/.test(individual.genotype), 'missing original character: a');
		test.ok(/b/.test(individual.genotype), 'missing original character: b');
		test.ok(/c/.test(individual.genotype), 'missing original character: c');
		test.ok(/d/.test(individual.genotype), 'missing original character: d');
		test.ok(individual.genotype.indexOf(newGene) >= 0, 'missing new gene from genotype: ' + individual.genotype);
		test.done();
	},

	newGene_withoutIndividual: function(test) {
		var newGene = mathJeopardy.newGene();
		test.equal(newGene.length, 1, 'expected one new gene to be created');
		test.done();
	},

	removeGene: function(test) {
		var individual = { genotype: 'abcd' };
		mathJeopardy.removeGene(individual);
		test.equal(individual.genotype.length, 3, 'expected one less gene in genotype: ' + individual.genotype);
		var originalGenesLeftOver = 0;
		if (/a/.test(individual.genotype)) { originalGenesLeftOver++; }
		if (/b/.test(individual.genotype)) { originalGenesLeftOver++; }
		if (/c/.test(individual.genotype)) { originalGenesLeftOver++; }
		if (/d/.test(individual.genotype)) { originalGenesLeftOver++; }
		var percentOfOriginalGenotype = originalGenesLeftOver / 4;
		test.ok(percentOfOriginalGenotype === 0.75, 'expected only one gene to to change in genotype: ' + individual.genotype);
		test.done();
	},

	mutateExistingGene: function(test) {
		var individual;
		// remove numbers and symbols so it's obvious what gene was placed
		mathJeopardy.possibleNumbers = 'abcd';
		mathJeopardy.possibleSymbols = 'wxyz';
		// test removal of first gene 'a'
		individual = { genotype: '1+2' };
		mathJeopardy.mutateExistingGene(individual, 0);
		test.equal(individual.genotype.length, 3, 'expected same number of genes in genotype: ' + individual.genotype);
		test.ok(/[^1]+2$/.test(individual.genotype), "expected '1' gene to be modified in genotype: " + individual.genotype);
		// test removal of second gene 'b'
		individual = { genotype: '1+2' };
		mathJeopardy.mutateExistingGene(individual, 1);
		test.equal(individual.genotype.length, 3, 'expected same number of genes in genotype: ' + individual.genotype);
		test.ok(/^1[^\+]2$/.test(individual.genotype), "expected '+' gene to be modified in genotype: " + individual.genotype);
		// test removal of second gene 'c'
		individual = { genotype: '1+2' };
		mathJeopardy.mutateExistingGene(individual, 2);
		test.equal(individual.genotype.length, 3, 'expected same number of genes in genotype: ' + individual.genotype);
		test.ok(/^1\+[^2]$/.test(individual.genotype), "expected 'c' gene to be modified in genotype: " + individual.genotype);
		test.done();
	},

	seed: function(test) {
		var numberOfAttempts = 5;
		var numberOfSuccesses = 0;
		for (var c=0; c<numberOfAttempts; c++) {
			var mj = new MathJeopardy({logging: false});
			var fittestIndividual = mj.seed();
			if (fittestIndividual.solution === mj.target) {
				numberOfSuccesses++;
			}
		}
		var percentSuccess = numberOfSuccesses / numberOfAttempts;
		test.ok(percentSuccess >= 0.8, 'success rate too low: ' + percentSuccess);
		test.done();
	},

	fitness: function(test) {
		var individual = { genotype: '+912/' };
		var fitness = mathJeopardy.fitness(individual);
		test.equal(-0.005, fitness);
		test.done();
	},

	generation_quitWhenSolutionFound: function(test) {
		mathJeopardy.quitWhenSolutionFound = true;
		var result = mathJeopardy.generation({
			population: [ { solution: mathJeopardy.target } ]
		});
		test.ok(result, 'expected evolution to end when solution found');
		test.done();
	}

};
