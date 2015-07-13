var Eukaryote = require('../../src/eukaryote');

function isDefined(o) {
	return o !== null && o !== undefined;
}

var HelloWorld = function(options) {
	options = options || {};
	this.availableGenes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()-=_+`~\'" ';
	this.targetMessage = options.targetMessage || 'Hello world!';
	this.probabilities = {
		mutateExistingGene: 0.15,
		newGene: 0.06,
		removeGene: 0.06
	};
	if (isDefined(options.logging)) {
		this.logging = options.logging;
	} else {
		this.logging = true;
	}
};

/**
 * Calculate the fitness of an individual relative to targetMessage.
 * Apply pressure on correctness of each character and length of string.
 */
HelloWorld.prototype.fitness = function(individual) {
	var fitness = 0;
	for (var c=0; c<individual.genotype.length; c++) {
		if (this.targetMessage.length > c) {
			if (individual.genotype[c] === this.targetMessage[c]) {
				fitness += 1;
			}
		}
	}
	fitness -= Math.abs(this.targetMessage.length - individual.genotype.length);
	individual.fitness = fitness;
	return fitness;
};

/**
 * Loop through genes in an indivual's genotype and mutate based on probability.
 */
HelloWorld.prototype.mutate = function(individual) {
	for (var c=0; c<individual.genotype.length; c++) {
		if (Math.random() <= this.probabilities.mutateExistingGene) {
			this.mutateExistingGene(individual, c);
		}
	}
	if (Math.random() <= this.probabilities.newGene) {
		this.newGene(individual);
	}
	if (Math.random() <= this.probabilities.removeGene) {
		this.removeGene(individual);
	}
};

HelloWorld.prototype.crossover = function(father, mother) {
	var offspringGenotypes = Eukaryote.CrossoverStrategy.SimilarStrings(father.genotype, mother.genotype);
	father.genotype = offspringGenotypes[0];
	mother.genotype = offspringGenotypes[1];
	return [father, mother];
};

/**
 * Choose one new gene at random from string of availableGenes.
 * @return the new gene added to genotype
 */
HelloWorld.prototype.newGene = function(individual) {
	var newGeneIndex = Math.floor( Math.random()*this.availableGenes.length );
	var newGene = this.availableGenes[newGeneIndex];
	if (isDefined(individual)) {
		var geneIndex = Math.floor( Math.random()*individual.genotype.length );
		individual.genotype = individual.genotype.substring(0, geneIndex) +
				newGene + 
				individual.genotype.substring(geneIndex, individual.genotype.length);
	}
	return newGene;
};

/**
 * Remove one random gene from given individual.
 */
HelloWorld.prototype.removeGene = function(individual) {
	var geneIndex = Math.floor( Math.random()*individual.genotype.length );
	individual.genotype = individual.genotype.substring(0, geneIndex) +
			individual.genotype.substring(geneIndex+1, individual.genotype.length);
};

/**
 * Mutate given individual's gene at the given index.
 */
HelloWorld.prototype.mutateExistingGene = function(individual, index) {
	individual.genotype = individual.genotype.substring(0, index) +
			this.newGene() + 
			individual.genotype.substring(index+1, individual.genotype.length);
};

/**
 * Evolve a string of characters until it resembles the given targetMessage
 */
HelloWorld.prototype.seed = function() {
	var that = this;
	var eukaryote = new Eukaryote({
		callbacks: {
			fitness: function(individual) { return that.fitness(individual); },
			mutate: function(individual) { that.mutate(individual); },
			crossover: function(father, mother) { return that.crossover(father, mother); },
			generation: function(generation) {
				var fittestIndividual = eukaryote.population[0];
				if (that.logging) {
					console.log(generation + ': ', fittestIndividual);
				}
				if (fittestIndividual.genotype === that.targetMessage) {
					return true;
				} else {
					return false;
				}
			}
		},
		config: {
			populationSize: 100,
			numberOfGenerations: 500
		}
	});
	eukaryote.seed({genotype: this.newGene()}); // seed the world with single gene individuals
	return eukaryote.population[0];
};

/**
 * Node.js module export
 */
module.exports = HelloWorld;
