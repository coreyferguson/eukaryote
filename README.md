
# Eukaryote

## Summary

Eukaryote is an evolutionary algorithm tutorial and library written in JavaScript.

Tutorial can be found [here](examples/TUTORIAL.md).

Examples can be found [here](examples/README.md).

API Documentation can be found [here](src/README.md).

## Usage

```javascript
var eukaryote = new Eukaryote({
	callbacks: {
		fitness: function(individual) {
			// calculate fitness score for individual
			return fitness;
		},
		mutate: function(individual) {
			// mutate this individual's genes
		},
		// optional but recommended
		crossover: function(father, mother) {
			// perform crossover of similar chromosomes
			return [son, daughter];
		}
	}
});

// create a population from individual and begin evolution
eukaryote.seed(individual);
```

## Build

```bash
git clone git@github.com:coreyferguson/eukaryote.git
cd eukaryote
npm install
grunt
```
