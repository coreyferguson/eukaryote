#  Mating Strategies

Mating strategies can be thought of as sexual selection. These strategies choose which individuals crossover genes during replication (after selection).

Mating strategies can be specified in the Eukaryote constructor:

```javascript
new Eukaryote({
	callbacks: {
		fitness: function(individual) { ... },
		mutate: function(individual) { ... }
	},
	strategy: {
		mating: Eukaryote.MatingStrategy.Random()
	}
});
```

## Provided Implementations

###  Random

Both individuals chosen at random.

###  Sequential

Individuals chosen sequentially from population ordered by fitness starting with most fit individual.

###  SequentialRandom

Father is chosen sequentially from population ordered by fitness starting with the most fit individual. Mother is chosen randomly.

## Custom Implementations

### API

TODO: API Documentation

 - begin
 - mate
 - end