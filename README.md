
# Eukaryote

## Usage - NPM

Install:

```bash
npm install eukaryote --save-dev
```

Require:

```javascript
var Eukaryote = require('eukaryote');
```

Use:

```javascript
var environment = new Eukaryote.Genetic.Environment({
  fitnessSync: function(individual) {
    // calculate fitness score for individual
    return fitness;
  },
  mutateSync: function(individual) {
    // mutate this individuals' genes
  }
});

// create a population from individual and begin evolution
var individual = { ... }; // create individual to seed environment
environment.seed(individual, function(error) {
  if (error) console.error('Unexpected error has occurred: ', error);
  else {
    // genetic algorithm has completed successfully
    console.log('Most fit individual:', environment.population[0]);
  }
});
```

## Usage - Browser

Distribution files are provided for browser support within the [`dist/`](dist/) folder.

## Documentation

API documentation can be viewed in [markdown](dist/api) format and html format after generating with `grunt` in `dist/api/index.html`.

## Examples

Coming soon...

## Tutorial

Tutorial can be seen [here](TUTORIAL.md).