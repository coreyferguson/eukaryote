# Crossover Strategies

Crossover strategies are used to crossover genotypes of multiple individuals into new offspring.

## SimilarStrings

Crossover similar stretches of genes (chromosomes) between two genotypes of type `string`. Chromosomes are half the size of the genotype (rounded down) and occur in a random location within the genotype.

Examples: 
- **a**bc  + **x**yz  -> **x**bc  & **a**yz
- a**bc**d + x**y**z  -> a**y**cd & x**b**z
- ab**c**  + wx**y**z -> ab**y**  & wx**c**z

### Options

#### numberOfOffspring

Number of offspring genotypes to return.

Type    | Required | Default | Range
------- | -------- | ------- | -----
integer | optional | 2       | 0 < n < Infinity

#### chromosomeLengthAsPercentOfGenotype

Length of genotype segments to be swapped.

Type    | Required | Default | Range
------- | -------- | ------- | -----
float   | optional | 50      | 0 < n < 100

### Usage

```javascript
var crossover = function(individuals) {
	// get array of strings from 'genotype' property within each individual
	var genotypes = individuals.map(function(individual) {
		return individual.genotype;
	});
	// crossover
	var offspringGenotypes = Eukaryote.CrossoverStrategy.SimilarStrings(genotypes);
	// offspring
	var son = { genotype: offspringGenotypes[0] };
	var daughter = { genotype: offspringGenotypes[1] };
	return [son, daughter];
};
```
