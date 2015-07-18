# Selection Strategies

Selection strategies are designed to kill off some number of individuals within your population. This is to make room for those who will reproduce.

Selection strategies can be specified in the Eukaryote constructor:

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

## TopX (Selection Strategy)

Top `x` individuals survive to reproduce.

### Options

#### numberOfIndividuals

Number of individuals to survive.

Type    | Required | Default | Range
------- | -------- | ------- | -----
integer | optional | 1       | 0 < i <= population.length

### Usage

```javascript
// Top 2 fittest individuals survive for replication
Eukaryote.SelectionStrategy.TopX({ numberOfIndividuals: 2 })
```

## TopXPercent (Selection Strategy)

Top `x` percent of population survive to reproduce.

### Options

#### probability

Percent of individuals to survive.

Type    | Required | Default | Range
------- | -------- | ------- | -----
float   | optional | 0.1     | 0 < f <= 1

### Usage

```javascript
// 50% of population survives for replication
Eukaryote.SelectionStrategy.TopXPercent({ probability: 0.5 })
```

## RandomWeightedByRank (Selection Strategy)

For each individual in a population starting with the most fit individual, x% probability of death where x grows as the individuals become less fit.

### Usage

```javascript
Eukaryote.SelectionStrategy.RandomWeightedByRank()
```
