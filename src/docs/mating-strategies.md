#  Mating Strategies

Mating strategies can be thought of as sexual selection. These strategies choose which individuals crossover genes during replication (after selection).

Mating strategies can be specified in the Eukaryote constructor, for example:



## Provided Implementations

###  Random

Both individuals chosen at random.

```javascript
new Eukaryote({
	callbacks: { ... },
	strategy: {
		mating: Eukaryote.MatingStrategy.Random()
	}
});
```

**Options:**

Option | Required | Type | Short Description
------ | -------- | ---- | -----------------
numberOfIndividuals | Optional | Integer | Number of individuals to return.

###  Sequential

Individuals chosen sequentially from population ordered by fitness starting with most fit individual.

```javascript
new Eukaryote({
	callbacks: { ... },
	strategy: {
		mating: Eukaryote.MatingStrategy.Sequential()
	}
});
```

**Options:**

Option | Required | Type | Short Description
------ | -------- | ---- | -----------------
numberOfIndividuals | Optional | Integer | Number of individuals to return.

###  SequentialRandom

Father is chosen sequentially from population ordered by fitness starting with the most fit individual. Mother is chosen randomly.

```javascript
new Eukaryote({
	callbacks: { ... },
	strategy: {
		mating: Eukaryote.MatingStrategy.SequentialRandom()
	}
});
```

**Options:**

Option | Required | Type | Short Description
------ | -------- | ---- | -----------------
numberOfIndividuals | Optional | Integer | Number of individuals to return.

## Custom Implementations

### API

Mating strategies are json objects with the following functions:

```javascript
{
	begin: function() { },
	mate: function(population) {
		return individuals;
	},
	end: function() { }
}
```

#### begin & end

These functions are called at the beginning and end of each generation. The `mate` function may be called multiple times per generation so these functions are useful if you want to save some information between calls; for example if you wanted to guarantee all individuals chosen within a generation are unique.

#### mate

The mate function is responsible for choosing two individuals from a population with the intent of mating. This function only returns existing individuals; actual mating (crossover of genotypes) are handled by the [Crossover Strategies](./crossover-strategies.md).

`population`: array of individuals to choose from

Returns array of chosen individuals to mate.
