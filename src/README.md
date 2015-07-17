
# Eukaryote API Documentation

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
			// perform crossover of similar stretches of genes
			return [son, daughter];
		}
	}
});

// create a population from individual and begin evolution
eukaryote.seed(individual);
```

## Constructor

```javascript
new Eukaryote(options);
```

### Options

```javascript
var options = {
	config: {
		populationSize: 250,
		numberOfGenerations: 500
	},
	callbacks: {
		fitness: function(individual) { return ...; }, // calculate fitness
		mutate: function(individual) { ... }, // mutate genes
	}
}
```

#### Config


Configuration | Required | Type | Short Description
------------- | -------- | ---- | -----------------
populationSize | Optional | Integer | The name says it all...
numberOfGenerations | Optional | Integer | Number of generations to evolve before stopping execution of algorithm.

#### Callbacks

Function                  | Required | Return Type     | Short Description
------------------------- | -------- | --------------- | -----------------
fitness(individual)       | Required | Float           | Calculate fitness score of individual's phenotype. Higher fitness is better.
mutate(individual)        | Required | Void            | Mutate individual's genotype. Chance of mutation based on probability but all possibilities are given equal opportunity.
crossover(father, mother) | Optional | [son, daughter] | Recombine similar stretches of genes between father and mother's genotypes.
generation(generation)    | Optional | Boolean         | Executed every generation. Return true to halt further generations. For example when a solution is found (maximum fitness achieved).

## Seed

Seed your individual and start evolutionary process. The `individual` parameter you pass into the seed function can be any json object you want.

```javascript
eukaryote.seed({ genotype: '1111' });
```

## Instance Properties

The eukaryote instance has some additional properties you can reference:

```javascript
function generation(generation) {
	console.log('Generation #' + generation + ' .. Population ' + eukaryote.population);
}
```

Property   | Type                 | Short Description
---------- | -------------------- | -----------------
population | Array of individuals | Sorted by fittest individual descending. Most fit individual === `population[0]`.

## Strategies

Eukaryote comes with a number of strategies for your evolutionary algorithm to take advantage of.

### Selection Strategies

```javascript
new Eukaryote({
	callbacks: {
		fitness: function(individual) { ... },
		mutate: function(individual) { ... }
	},
	strategy: {
		selection: Eukaryote.SelectionStrategy.TopXPercent()
	}
});
```

All selection strategies are designed to kill off some number of individuals within your population. This is to make room for those who will reproduce.

#### TopXPercent

Top `x` percent of population survive to reproduce. `x` is given with the option `probability`.

Default: 0.1

```javascript
// 50% of population survives for replication
Eukaryote.SelectionStrategy.TopXPercent({ probability: 0.5 })
```

#### Fittest

**TODO** Single most fit individual survives to reproduce.

### Crossover Strategies

All Crossover Strategy contracts are the same:

Function                       | Return Type
------------------------------ | -----------
StrategyName(father, mother)   | [son, daughter]

```javascript
var crossover = function(father, mother) {
	var offspringGenotypes = 
			Eukaryote.CrossoverStrategy.SimilarStrings(father.genotype, mother.genotype);
	father.genotype = offspringGenotypes[0];
	mother.genotype = offspringGenotypes[1];
	return [father, mother];
};
```

#### SimilarStrings

Crossover similar stretches of genes (chromosomes) between two genotypes of type `string`. Chromosomes are half the size of the genotype (rounded down) and occur in a random location within the genotype.

Examples: 
- **a**bc  + **x**yz  -> **x**bc  & **a**yz
- a**bc**d + x**y**z  -> a**y**cd & x**b**z
- ab**c**  + wx**y**z -> ab**y**  & wx**c**z

