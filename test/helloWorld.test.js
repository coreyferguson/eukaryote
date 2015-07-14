var HelloWorld = require('../examples/helloWorld/helloWorld.js');

var helloWorld;

module.exports = {

	setUp: function(callback) {
		helloWorld = new HelloWorld({
			logging: false
		});
		callback();
	},

	newGene_withIndividual: function(test) {
		var individual = { genotype: 'abcd' };
		var newGene = helloWorld.newGene(individual);
		test.equal(individual.genotype.length, 5, 'expected one additional gene');
		test.ok(/a/.test(individual.genotype), 'missing original character: a');
		test.ok(/b/.test(individual.genotype), 'missing original character: b');
		test.ok(/c/.test(individual.genotype), 'missing original character: c');
		test.ok(/d/.test(individual.genotype), 'missing original character: d');
		test.ok(individual.genotype.indexOf(newGene) >= 0, 'missing new gene from genotype: ' + individual.genotype);
		test.done();
	},

	newGene_withoutIndividual: function(test) {
		var helloWorld = new HelloWorld();
		var newGene = helloWorld.newGene();
		test.equal(newGene.length, 1, 'expected one new gene to be created');
		test.done();
	},

	removeGene: function(test) {
		var individual = { genotype: 'abcd' };
		helloWorld.removeGene(individual);
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
		// remove a, b, c and d from available genes
		helloWorld.genePool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZefghijklmnopqrstuvwxyz1234567890!@#$%^&*()-=_+`~\'" ';
		// test removal of first gene 'a'
		individual = { genotype: 'abcd' };
		helloWorld.mutateExistingGene(individual, 0);
		test.equal(individual.genotype.length, 4, 'expected same number of genes in genotype: ' + individual.genotype);
		test.ok(/[^a]bcd$/.test(individual.genotype), "expected 'a' gene to be modified in genotype: " + individual.genotype);
		// test removal of second gene 'b'
		individual = { genotype: 'abcd' };
		helloWorld.mutateExistingGene(individual, 1);
		test.equal(individual.genotype.length, 4, 'expected same number of genes in genotype: ' + individual.genotype);
		test.ok(/^a[^b]cd$/.test(individual.genotype), "expected 'b' gene to be modified in genotype: " + individual.genotype);
		// test removal of second gene 'c'
		individual = { genotype: 'abcd' };
		helloWorld.mutateExistingGene(individual, 2);
		test.equal(individual.genotype.length, 4, 'expected same number of genes in genotype: ' + individual.genotype);
		test.ok(/^ab[^c]d$/.test(individual.genotype), "expected 'c' gene to be modified in genotype: " + individual.genotype);
		// test removal of second gene 'd'
		individual = { genotype: 'abcd' };
		helloWorld.mutateExistingGene(individual, 3);
		test.equal(individual.genotype.length, 4, 'expected same number of genes in genotype: ' + individual.genotype);
		test.ok(/^abc[^d]$/.test(individual.genotype), "expected 'd' gene to be modified in genotype: " + individual.genotype);
		test.done();
	},

	seed: function(test) {
		var numberOfAttempts = 10;
		var numberOfSuccesses = 0;
		for (var c=0; c<numberOfAttempts; c++) {
			var hw = new HelloWorld({logging: false});
			var fittestIndividual = hw.seed();
			if (fittestIndividual.genotype === hw.targetMessage) {
				numberOfSuccesses++;
			}
		}
		var percentSuccess = numberOfSuccesses / numberOfAttempts;
		test.ok(percentSuccess > 0.9);
		test.done();
	}

};
