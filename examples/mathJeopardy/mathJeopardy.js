
// external dependencies
var mathjs = require('mathjs');
var lodash = require('lodash');
var chalk = require('chalk');

// internal dependencies
var Eukaryote = require('../../src/eukaryote.js');

var MathJeopardy = function(options) {
	// configuration
	options = options || {};
	this.target = options.target || 100;
	this.probabilities = {
		mutateExistingGene: 0.15,
		newGene: 0.075,
		removeGene: 0.0375
	};
	if (!isDefined(options.quitWhenSolutionFound)) {
		this.quitWhenSolutionFound = true;
	} else {
		this.quitWhenSolutionFound = options.quitWhenSolutionFound;
	}
	if (isDefined(options.logging)) {
		this.logging = options.logging;
	} else {
		this.logging = true;
	}
	this.possibleNumbers = '123456789';
	this.possibleSymbols = '-+*/';

	// find multiplication factor to increase fitness appropriately even for smaller fractions
	// this is necessary for appropriately weighting parsimonious selection pressure
	this.multiplicationFactor = 1;
	var targetString = '' + this.target;
	var index = targetString.indexOf('.');
	if (index >= 0) {
		var numbersAfterDecimal = (targetString.length-1) - targetString.indexOf('.');
		for (var c=0; c<numbersAfterDecimal; c++) {
			this.multiplicationFactor *= 10;
		}
	}

	// chalk themes (color output to console)
	this.chalkGeneration = chalk.bold.red;
	this.chalkGenotype = chalk.bold.green;
	this.chalkPhenotype = chalk.bold.yellow;
	this.chalkFitness = chalk.bold.blue;
	this.chalkSolution = chalk.bold.magenta;

};

MathJeopardy.prototype.fitness = function(individual) {

	////
	// decode phenotype from genotype
	////

	var phenotype = '';
	var numbers = individual.genotype.match(/\d/g);
	if (!isDefined(numbers)) { numbers = []; }
	var symbols = individual.genotype.match(/\D/g);
	if (!isDefined(symbols)) { symbols = []; }
	if (numbers.length === 0) {
		phenotype = '0';
	} else {
		var numberIndex = 0;
		var symbolIndex = 0;
		phenotype += numbers[numberIndex++];
		while (symbols.length > symbolIndex && numbers.length > numberIndex) {
			phenotype += symbols[symbolIndex++];
			phenotype += numbers[numberIndex++];
		}
	}

	////
	// evaluate expression, e.g. 9+1 => 10
	////

	var solution = mathjs.eval(phenotype);

	////
	// fitness
	////

	var fitness = 0;

	// fitness pressure: solution accuracy
	var adjustedSolution = solution * this.multiplicationFactor;
	var adjustedTarget = this.target * this.multiplicationFactor;
	fitness -= Math.abs(adjustedSolution - adjustedTarget);

	// fitness pressure: parsimonious phenotypes (least number of characters)
	fitness -= phenotype.length * 0.001;

	////
	// update individual
	////

	individual.phenotype = phenotype;
	individual.fitness = fitness;
	individual.solution = solution;

	return fitness;
};

MathJeopardy.prototype.mutate = function(individual) {
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

MathJeopardy.prototype.crossover = function(individuals) {
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

MathJeopardy.prototype.newGene = function(individual) {
	var random = Math.random();
	var possibleGenes;
	if (random <= 0.5) { possibleGenes = this.possibleNumbers; } 
	else { possibleGenes = this.possibleSymbols; }
	var randomIndex = Math.floor( Math.random()*possibleGenes.length );
	var newGene = possibleGenes[randomIndex];
	if (individual !== null && individual !== undefined) {
		var geneIndex = Math.floor( Math.random()*individual.genotype.length );
		individual.genotype = individual.genotype.substring(0, geneIndex) +
				newGene + 
				individual.genotype.substring(geneIndex, individual.genotype.length);
	}
	return newGene;
};

MathJeopardy.prototype.removeGene = function(individual) {
	var geneIndex = Math.floor( Math.random()*individual.genotype.length );
	individual.genotype = individual.genotype.substring(0, geneIndex) +
			individual.genotype.substring(geneIndex+1, individual.genotype.length);
};

MathJeopardy.prototype.mutateExistingGene = function(individual, index) {
	individual.genotype = individual.genotype.substring(0, index) +
			this.newGene() + 
			individual.genotype.substring(index+1, individual.genotype.length);
};

MathJeopardy.prototype.generation = function(eukaryote, generation) {		
	var fittestIndividual = eukaryote.population[0];
	this.printRow(generation, fittestIndividual);
	if (this.quitWhenSolutionFound && fittestIndividual.solution == this.target) {
		return true;
	} else {
		return false;
	}
};

MathJeopardy.prototype.seed = function() {
	var that = this;
	var eukaryote = new Eukaryote({
		callbacks: {
			fitness: function(individual) { return that.fitness(individual); },
			mutate: function(individual) { that.mutate(individual); },
			crossover: function(father, mother) { return that.crossover(father, mother); },
			generation: function(generation) { return that.generation(eukaryote, generation); }
		},
		config: {
			populationSize: 500,
			numberOfGenerations: 500
		},
		strategy: {
			mating: Eukaryote.MatingStrategy.SequentialRandom()
		}
	});
	this.printHeader();
	eukaryote.seed({genotype: this.newGene()}); // seed the world with single gene individuals
	this.printResults(eukaryote.population[0]);
	return eukaryote.population[0];
};

MathJeopardy.prototype.printHeader = function() {
	if (this.logging) {
		var header = this.chalkGeneration('Generation');
		header += ' .. ';
		header += this.chalkGenotype('Genotype');
		header += ' .. ';
		header += this.chalkPhenotype('Phenotype');
		header += ' .. ';
		header += this.chalkFitness('Fitness');
		header += ' .. ';
		header += this.chalkSolution('Solution');
		console.log(header);
	}
};

MathJeopardy.prototype.printRow = function(generation, individual) {
	if (this.logging) {
		var row = this.chalkGeneration(generation);
		row += ' .. ';
		row += this.chalkGenotype(individual.genotype);
		row += ' .. ';
		row += this.chalkPhenotype(individual.phenotype);
		row += ' .. ';
		row += this.chalkFitness(individual.fitness);
		row += ' .. ';
		row += this.chalkSolution(individual.solution);
		console.log(row);
	}
};

MathJeopardy.prototype.printResults = function(individual) {
	if (this.logging) {
		var results = 'Finished. Fittest individual: ';
		results += this.chalkPhenotype(individual.phenotype);
		results += ' = ';
		results += this.chalkSolution(individual.solution);
		console.log(results);
	}
};

function isDefined(o) {
	return o !== null && o !== undefined;
}

/**
 * Node.js module export
 */
module.exports = MathJeopardy;