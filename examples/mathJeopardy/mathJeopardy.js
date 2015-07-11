
var Eukaryote = require('../../src/eukaryote.js');

function isDefined(o) {
	return o !== null && o !== undefined;
}

var MathJeopardy = function(options) {
	options = options || {};
	this.target = options.target || 9.5;
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
	this.possibleNumbers = '123456789';
	this.possibleSymbols = '-+*/';
};

MathJeopardy.prototype.fitness = function(individual) {
	var numbers = individual.genotype.match(/\d/g);
	var symbols = individual.genotype.match(/\D/g);

	// calculate phenotype
	var phenotype = '';
	var phenotypeSolution;
	if (isDefined(numbers) && numbers.length > 0) {
		phenotype += numbers[0];
		phenotypeSolution = parseInt(numbers[0], 10);

		var symbolIndex = 0;
		for (var n=1; n<numbers.length; n++) {
			var number = parseInt(numbers[n], 10);
			if (!isDefined(symbols) || symbolIndex >= symbols.length) {
				break;
			} else {
				var symbol = symbols[symbolIndex++];
				if (symbol === '+') {
					phenotype += symbol;
					phenotype += number;
					phenotypeSolution += number;
				} else if (symbol === '-') {
					phenotype += symbol;
					phenotype += number;
					phenotypeSolution -= number;
				} else if (symbol === '*') {
					phenotype += symbol;
					phenotype += number;
					phenotypeSolution *= number;
				} else if (symbol === '/' && number !== 0) {
					phenotype += symbol;
					phenotype += number;
					phenotypeSolution /= number;
				}
			}
		}
	} else {
		phenotype += 0;
		phenotypeSolution = 0;
	}

	// calculate fitnes
	var fitness = Math.abs(phenotypeSolution - this.target) * -1;
	fitness -= phenotype.length * 0.001;
	individual.phenotype = phenotype;
	individual.fitness = fitness;
	individual.solution = phenotypeSolution;
	return fitness;
};

MathJeopardy.prototype.mutate = function(individual) {
	for (var c=0; c<this.target.length; c++) {
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

MathJeopardy.prototype.crossover = function(father, mother) {
	var offspringGenotypes = Eukaryote.CrossoverStrategy.SimilarStrings(father.genotype, mother.genotype);
	father.genotype = offspringGenotypes[0];
	mother.genotype = offspringGenotypes[1];
	return [father, mother];
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

MathJeopardy.prototype.seed = function() {
	var that = this;
	var eukaryote = new Eukaryote({
		callbacks: {
			fitness: function(individual) { return that.fitness(individual); },
			mutate: function(individual) { that.mutate(individual); },
			crossover: function(father, mother) { return that.crossover(father, mother); },
			generation: function(generation) {
				var fittestIndividual = eukaryote.population[0];
				if (that.logging) {
					console.log('Generation ' + generation + 
						'  ..  Genotype: ' + fittestIndividual.genotype + 
						'  ..  Fitness: ' + fittestIndividual.fitness);
				}
				if (fittestIndividual.solution === that.target) {
					return true;
				} else {
					return false;
				}
			}
		},
		config: {
			populationSize: 250,
			numberOfGenerations: 500
		}
	});
	eukaryote.seed({genotype: this.newGene()}); // seed the world with single gene individuals
	if (that.logging) {
		console.log('Finished. Fittest individual: ' + 
			eukaryote.population[0].phenotype + 
			' = ' + 
			eukaryote.population[0].solution);
	}
	return eukaryote.population[0];
};

/**
 * Node.js module export
 */
module.exports = MathJeopardy;