var chalk = require('chalk');

var Eukaryote = require('../../src/eukaryote');

function isDefined(o) {
	return o !== null && o !== undefined;
}

var HelloWorld = function(options) {
	options = options || {};

	// One gene used when creating and modifying genes.
	this.genePool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()-=_+`~\'" ';

	// The ideal (most fit individual), used for calculating fitness
	this.targetMessage = options.targetMessage || 'Hello world!';

	// Mutation probabilities
	this.probabilities = {
		mutateExistingGene: 0.15,
		newGene: 0.06,
		removeGene: 0.06
	};

	// Logging
	if (isDefined(options.logging)) {
		this.logging = options.logging;
	} else {
		this.logging = true;
	}

	// chalk themes (terminal output coloring)
	this.chalkGeneration = chalk.bold.blue;
	this.chalkGenotype = chalk.bold.green;
	this.chalkFitness = chalk.bold.yellow;
};

/**
 * Calculate the fitness of an individual relative to targetMessage.
 * Apply pressure on correctness of each character and length of string.
 * @return fitness score
 */
HelloWorld.prototype.fitness = function(individual) {
	// 1 point for each gene in the correction location.
	var fitness = 0;
	for (var c=0; c<individual.genotype.length; c++) {
		if (this.targetMessage.length > c) {
			if (individual.genotype[c] === this.targetMessage[c]) {
				fitness += 1;
			}
		}
	}

	// -1 point for each missing or extra genes
	fitness -= Math.abs(this.targetMessage.length - individual.genotype.length);

	// [optional] Update individual for logging purposes
	individual.fitness = fitness;

	// Return fitness score per Eukaryote API specifications.
	return fitness;
};

/**
 * Loop through genes in an indivual's genotype and mutate based on probability.
 */
HelloWorld.prototype.mutate = function(individual) {
	// Change existing genes
	for (var c=0; c<individual.genotype.length; c++) {
		if (Math.random() <= this.probabilities.mutateExistingGene) {
			this.mutateExistingGene(individual, c);
		}
	}
	// Add a new gene to genotype
	if (Math.random() <= this.probabilities.newGene) {
		this.newGene(individual);
	}
	// Remove gene from genotype
	if (Math.random() <= this.probabilities.removeGene) {
		this.removeGene(individual);
	}
};

/**
 * Chromosome crossover: swap segments of genotype to produce two new offspring using SimilarStrings
 * crossover strategy provided by Eukaryote.
 * @return [son, daughter] 
 */
HelloWorld.prototype.crossover = function(individuals) {
	// get array of strings from 'genotype' property within each individual
	var genotypes = individuals.map(function(individual) {
		return individual.genotype;
	});
	// crossover
	var offspringGenotypes = Eukaryote.CrossoverStrategy.SimilarStrings()(genotypes);
	// offspring
	var son = { genotype: offspringGenotypes[0] };
	var daughter = { genotype: offspringGenotypes[1] };
	return [son, daughter];
};

/**
 * Choose one new gene at random from gene pool.
 * @param [optional] individual on which to insert new gene
 * @return the new gene added to genotype
 */
HelloWorld.prototype.newGene = function(individual) {
	var newGeneIndex = Math.floor( Math.random()*this.genePool.length );
	var newGene = this.genePool[newGeneIndex];
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
 * Mutate one gene from given individual at the given index.
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
				// Logging
				var fittestIndividual = eukaryote.population[0];
				that.printRow(generation, fittestIndividual);
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
	this.printHeader();
	eukaryote.seed({genotype: this.newGene()}); // seed the world with single gene individuals
	return eukaryote.population[0];
};

HelloWorld.prototype.printHeader = function() {
	if (this.logging) {
		var header = this.chalkGeneration('Generation');
		header += ' .. ';
		header += this.chalkGenotype('Genotype');
		header += ' .. ';
		header += this.chalkFitness('Fitness');
		console.log(header);
	}
};

HelloWorld.prototype.printRow = function(generation, individual) {
	if (this.logging) {
		var row = this.chalkGeneration(generation);
		row += ' .. ';
		row += this.chalkGenotype(individual.genotype);
		row += ' .. ';
		row += this.chalkFitness(individual.fitness);
		console.log(row);
	}
};

/**
 * Node.js module export
 */
module.exports = HelloWorld;
