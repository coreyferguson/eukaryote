<a name="Eukaryote"></a>
## Eukaryote : <code>object</code>
Eukaryote, an evolutionary algorithm library and tutorial.

**Kind**: global namespace  

* [Eukaryote](#Eukaryote) : <code>object</code>
    * [.Genetic](#Eukaryote.Genetic) : <code>object</code>
        * [.Environment](#Eukaryote.Genetic.Environment)
            * _instance_
                * [.seed(individual, callback)](#Eukaryote.Genetic.Environment+seed)
                * [._generation(g, callback)](#Eukaryote.Genetic.Environment+_generation) ℗
                * [._seedIndividual(individual)](#Eukaryote.Genetic.Environment+_seedIndividual) ℗
                * [._clone(individual)](#Eukaryote.Genetic.Environment+_clone) ⇒ <code>Object</code> ℗
                * [._applySelectionStrategy()](#Eukaryote.Genetic.Environment+_applySelectionStrategy) ℗
                * [._getClonesOfReproductionStrategy()](#Eukaryote.Genetic.Environment+_getClonesOfReproductionStrategy) ⇒ <code>Array.&lt;Object&gt;</code> ℗
                * [._crossover(individuals, callback)](#Eukaryote.Genetic.Environment+_crossover) ℗
                * [._mutate(individuals, callback)](#Eukaryote.Genetic.Environment+_mutate) ℗
                * [._spawnIndividuals(individuals)](#Eukaryote.Genetic.Environment+_spawnIndividuals) ℗
                * [._sortPopulationByFitness(callback)](#Eukaryote.Genetic.Environment+_sortPopulationByFitness) ℗
            * _inner_
                * [~seedCallback](#Eukaryote.Genetic.Environment..seedCallback) : <code>function</code>
                * [~_generationCallback](#Eukaryote.Genetic.Environment.._generationCallback) : <code>function</code>
                * [~_crossoverCallback](#Eukaryote.Genetic.Environment.._crossoverCallback) : <code>function</code>
                * [~_mutateCallback](#Eukaryote.Genetic.Environment.._mutateCallback) : <code>function</code>
                * [~_sortPopulationByFitnessCallback](#Eukaryote.Genetic.Environment.._sortPopulationByFitnessCallback) : <code>function</code>
                * [~fitness](#Eukaryote.Genetic.Environment..fitness) : <code>function</code>
                * [~fitnessCallback](#Eukaryote.Genetic.Environment..fitnessCallback) : <code>function</code>
                * [~fitnessSync](#Eukaryote.Genetic.Environment..fitnessSync) ⇒ <code>float</code>
                * [~mutate](#Eukaryote.Genetic.Environment..mutate) : <code>function</code>
                * [~mutateCallback](#Eukaryote.Genetic.Environment..mutateCallback) : <code>function</code>
                * [~mutateSync](#Eukaryote.Genetic.Environment..mutateSync) : <code>function</code>
                * [~crossover](#Eukaryote.Genetic.Environment..crossover) : <code>function</code>
                * [~crossoverCallback](#Eukaryote.Genetic.Environment..crossoverCallback) : <code>function</code>
                * [~crossoverSync](#Eukaryote.Genetic.Environment..crossoverSync) : <code>function</code>
                * [~generation](#Eukaryote.Genetic.Environment..generation) : <code>function</code>
                * [~generationCallback](#Eukaryote.Genetic.Environment..generationCallback) : <code>function</code>
                * [~generationSync](#Eukaryote.Genetic.Environment..generationSync) ⇒ <code>boolean</code>
        * [.CrossoverStrategy](#Eukaryote.Genetic.CrossoverStrategy) : <code>object</code>
            * [.SimilarStrings()](#Eukaryote.Genetic.CrossoverStrategy.SimilarStrings)
        * [.ReproductionStrategy](#Eukaryote.Genetic.ReproductionStrategy) : <code>object</code>
            * _static_
                * [.Random()](#Eukaryote.Genetic.ReproductionStrategy.Random) ⇒ <code>[strategy](#Eukaryote.Genetic.ReproductionStrategy..strategy)</code>
                * [.Sequential()](#Eukaryote.Genetic.ReproductionStrategy.Sequential) ⇒ <code>[strategy](#Eukaryote.Genetic.ReproductionStrategy..strategy)</code>
                * [.SequentialRandom()](#Eukaryote.Genetic.ReproductionStrategy.SequentialRandom) ⇒ <code>[strategy](#Eukaryote.Genetic.ReproductionStrategy..strategy)</code>
            * _inner_
                * [~strategy](#Eukaryote.Genetic.ReproductionStrategy..strategy) : <code>Object</code>
                * [~begin](#Eukaryote.Genetic.ReproductionStrategy..begin) : <code>function</code>
                * [~reproduce](#Eukaryote.Genetic.ReproductionStrategy..reproduce) ⇒ <code>Array.&lt;Object&gt;</code>
                * [~end](#Eukaryote.Genetic.ReproductionStrategy..end) : <code>function</code>
        * [.SelectionStrategy](#Eukaryote.Genetic.SelectionStrategy) : <code>object</code>
            * _static_
                * [.TopX()](#Eukaryote.Genetic.SelectionStrategy.TopX) ⇒ <code>[strategy](#Eukaryote.Genetic.SelectionStrategy..strategy)</code>
                * [.TopXPercent()](#Eukaryote.Genetic.SelectionStrategy.TopXPercent) ⇒ <code>[strategy](#Eukaryote.Genetic.SelectionStrategy..strategy)</code>
                * [.RandomWeightedByRank()](#Eukaryote.Genetic.SelectionStrategy.RandomWeightedByRank) ⇒ <code>[strategy](#Eukaryote.Genetic.SelectionStrategy..strategy)</code>
            * _inner_
                * [~strategy](#Eukaryote.Genetic.SelectionStrategy..strategy) : <code>function</code>
    * [.Utility](#Eukaryote.Utility) : <code>object</code>
        * [.TypeValidator](#Eukaryote.Utility.TypeValidator) : <code>object</code>
            * [.isDefined(property)](#Eukaryote.Utility.TypeValidator.isDefined)
            * [.isBoolean(property)](#Eukaryote.Utility.TypeValidator.isBoolean)
            * [.isString(property)](#Eukaryote.Utility.TypeValidator.isString)
            * [.isNumber(property)](#Eukaryote.Utility.TypeValidator.isNumber)
            * [.isNumber(property)](#Eukaryote.Utility.TypeValidator.isNumber)
            * [.isArray(property)](#Eukaryote.Utility.TypeValidator.isArray)
            * [.isObject(property)](#Eukaryote.Utility.TypeValidator.isObject)
            * [.isFunction(property)](#Eukaryote.Utility.TypeValidator.isFunction)

<a name="Eukaryote.Genetic"></a>
### Eukaryote.Genetic : <code>object</code>
**Kind**: static namespace of <code>[Eukaryote](#Eukaryote)</code>  

* [.Genetic](#Eukaryote.Genetic) : <code>object</code>
    * [.Environment](#Eukaryote.Genetic.Environment)
        * _instance_
            * [.seed(individual, callback)](#Eukaryote.Genetic.Environment+seed)
            * [._generation(g, callback)](#Eukaryote.Genetic.Environment+_generation) ℗
            * [._seedIndividual(individual)](#Eukaryote.Genetic.Environment+_seedIndividual) ℗
            * [._clone(individual)](#Eukaryote.Genetic.Environment+_clone) ⇒ <code>Object</code> ℗
            * [._applySelectionStrategy()](#Eukaryote.Genetic.Environment+_applySelectionStrategy) ℗
            * [._getClonesOfReproductionStrategy()](#Eukaryote.Genetic.Environment+_getClonesOfReproductionStrategy) ⇒ <code>Array.&lt;Object&gt;</code> ℗
            * [._crossover(individuals, callback)](#Eukaryote.Genetic.Environment+_crossover) ℗
            * [._mutate(individuals, callback)](#Eukaryote.Genetic.Environment+_mutate) ℗
            * [._spawnIndividuals(individuals)](#Eukaryote.Genetic.Environment+_spawnIndividuals) ℗
            * [._sortPopulationByFitness(callback)](#Eukaryote.Genetic.Environment+_sortPopulationByFitness) ℗
        * _inner_
            * [~seedCallback](#Eukaryote.Genetic.Environment..seedCallback) : <code>function</code>
            * [~_generationCallback](#Eukaryote.Genetic.Environment.._generationCallback) : <code>function</code>
            * [~_crossoverCallback](#Eukaryote.Genetic.Environment.._crossoverCallback) : <code>function</code>
            * [~_mutateCallback](#Eukaryote.Genetic.Environment.._mutateCallback) : <code>function</code>
            * [~_sortPopulationByFitnessCallback](#Eukaryote.Genetic.Environment.._sortPopulationByFitnessCallback) : <code>function</code>
            * [~fitness](#Eukaryote.Genetic.Environment..fitness) : <code>function</code>
            * [~fitnessCallback](#Eukaryote.Genetic.Environment..fitnessCallback) : <code>function</code>
            * [~fitnessSync](#Eukaryote.Genetic.Environment..fitnessSync) ⇒ <code>float</code>
            * [~mutate](#Eukaryote.Genetic.Environment..mutate) : <code>function</code>
            * [~mutateCallback](#Eukaryote.Genetic.Environment..mutateCallback) : <code>function</code>
            * [~mutateSync](#Eukaryote.Genetic.Environment..mutateSync) : <code>function</code>
            * [~crossover](#Eukaryote.Genetic.Environment..crossover) : <code>function</code>
            * [~crossoverCallback](#Eukaryote.Genetic.Environment..crossoverCallback) : <code>function</code>
            * [~crossoverSync](#Eukaryote.Genetic.Environment..crossoverSync) : <code>function</code>
            * [~generation](#Eukaryote.Genetic.Environment..generation) : <code>function</code>
            * [~generationCallback](#Eukaryote.Genetic.Environment..generationCallback) : <code>function</code>
            * [~generationSync](#Eukaryote.Genetic.Environment..generationSync) ⇒ <code>boolean</code>
    * [.CrossoverStrategy](#Eukaryote.Genetic.CrossoverStrategy) : <code>object</code>
        * [.SimilarStrings()](#Eukaryote.Genetic.CrossoverStrategy.SimilarStrings)
    * [.ReproductionStrategy](#Eukaryote.Genetic.ReproductionStrategy) : <code>object</code>
        * _static_
            * [.Random()](#Eukaryote.Genetic.ReproductionStrategy.Random) ⇒ <code>[strategy](#Eukaryote.Genetic.ReproductionStrategy..strategy)</code>
            * [.Sequential()](#Eukaryote.Genetic.ReproductionStrategy.Sequential) ⇒ <code>[strategy](#Eukaryote.Genetic.ReproductionStrategy..strategy)</code>
            * [.SequentialRandom()](#Eukaryote.Genetic.ReproductionStrategy.SequentialRandom) ⇒ <code>[strategy](#Eukaryote.Genetic.ReproductionStrategy..strategy)</code>
        * _inner_
            * [~strategy](#Eukaryote.Genetic.ReproductionStrategy..strategy) : <code>Object</code>
            * [~begin](#Eukaryote.Genetic.ReproductionStrategy..begin) : <code>function</code>
            * [~reproduce](#Eukaryote.Genetic.ReproductionStrategy..reproduce) ⇒ <code>Array.&lt;Object&gt;</code>
            * [~end](#Eukaryote.Genetic.ReproductionStrategy..end) : <code>function</code>
    * [.SelectionStrategy](#Eukaryote.Genetic.SelectionStrategy) : <code>object</code>
        * _static_
            * [.TopX()](#Eukaryote.Genetic.SelectionStrategy.TopX) ⇒ <code>[strategy](#Eukaryote.Genetic.SelectionStrategy..strategy)</code>
            * [.TopXPercent()](#Eukaryote.Genetic.SelectionStrategy.TopXPercent) ⇒ <code>[strategy](#Eukaryote.Genetic.SelectionStrategy..strategy)</code>
            * [.RandomWeightedByRank()](#Eukaryote.Genetic.SelectionStrategy.RandomWeightedByRank) ⇒ <code>[strategy](#Eukaryote.Genetic.SelectionStrategy..strategy)</code>
        * _inner_
            * [~strategy](#Eukaryote.Genetic.SelectionStrategy..strategy) : <code>function</code>

<a name="Eukaryote.Genetic.Environment"></a>
#### Genetic.Environment
**Kind**: static class of <code>[Genetic](#Eukaryote.Genetic)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options.fitness | <code>[fitness](#Eukaryote.Genetic.Environment..fitness)</code> |  | Calculate the fitness of an individual |
| options.fitnessSync | <code>[fitnessSync](#Eukaryote.Genetic.Environment..fitnessSync)</code> |  | Calculate the fitness of an individual |
| options.mutate | <code>[mutate](#Eukaryote.Genetic.Environment..mutate)</code> |  | Mutate an individual's genome |
| options.mutateSync | <code>[mutateSync](#Eukaryote.Genetic.Environment..mutateSync)</code> |  | Mutate an individual's genome |
| [options.crossover] | <code>[crossover](#Eukaryote.Genetic.Environment..crossover)</code> |  | Recombine genotypes of given individuals |
| [options.crossoverSync] | <code>[crossoverSync](#Eukaryote.Genetic.Environment..crossoverSync)</code> |  | Recombine genotypes of given individuals |
| [options.generation] | <code>[generation](#Eukaryote.Genetic.Environment..generation)</code> |  | Executed after every generation |
| [options.generationSync] | <code>[generationSync](#Eukaryote.Genetic.Environment..generationSync)</code> |  | Executed after every generation |
| [options.populationSize] | <code>integer</code> | <code>250</code> | maximum population size allowed in this environment |
| [options.numberOfGenerations] | <code>integer</code> | <code>500</code> | number of generations to evolve before stopping execution of algorithm |

**Example**  
```js
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

* [.Environment](#Eukaryote.Genetic.Environment)
    * _instance_
        * [.seed(individual, callback)](#Eukaryote.Genetic.Environment+seed)
        * [._generation(g, callback)](#Eukaryote.Genetic.Environment+_generation) ℗
        * [._seedIndividual(individual)](#Eukaryote.Genetic.Environment+_seedIndividual) ℗
        * [._clone(individual)](#Eukaryote.Genetic.Environment+_clone) ⇒ <code>Object</code> ℗
        * [._applySelectionStrategy()](#Eukaryote.Genetic.Environment+_applySelectionStrategy) ℗
        * [._getClonesOfReproductionStrategy()](#Eukaryote.Genetic.Environment+_getClonesOfReproductionStrategy) ⇒ <code>Array.&lt;Object&gt;</code> ℗
        * [._crossover(individuals, callback)](#Eukaryote.Genetic.Environment+_crossover) ℗
        * [._mutate(individuals, callback)](#Eukaryote.Genetic.Environment+_mutate) ℗
        * [._spawnIndividuals(individuals)](#Eukaryote.Genetic.Environment+_spawnIndividuals) ℗
        * [._sortPopulationByFitness(callback)](#Eukaryote.Genetic.Environment+_sortPopulationByFitness) ℗
    * _inner_
        * [~seedCallback](#Eukaryote.Genetic.Environment..seedCallback) : <code>function</code>
        * [~_generationCallback](#Eukaryote.Genetic.Environment.._generationCallback) : <code>function</code>
        * [~_crossoverCallback](#Eukaryote.Genetic.Environment.._crossoverCallback) : <code>function</code>
        * [~_mutateCallback](#Eukaryote.Genetic.Environment.._mutateCallback) : <code>function</code>
        * [~_sortPopulationByFitnessCallback](#Eukaryote.Genetic.Environment.._sortPopulationByFitnessCallback) : <code>function</code>
        * [~fitness](#Eukaryote.Genetic.Environment..fitness) : <code>function</code>
        * [~fitnessCallback](#Eukaryote.Genetic.Environment..fitnessCallback) : <code>function</code>
        * [~fitnessSync](#Eukaryote.Genetic.Environment..fitnessSync) ⇒ <code>float</code>
        * [~mutate](#Eukaryote.Genetic.Environment..mutate) : <code>function</code>
        * [~mutateCallback](#Eukaryote.Genetic.Environment..mutateCallback) : <code>function</code>
        * [~mutateSync](#Eukaryote.Genetic.Environment..mutateSync) : <code>function</code>
        * [~crossover](#Eukaryote.Genetic.Environment..crossover) : <code>function</code>
        * [~crossoverCallback](#Eukaryote.Genetic.Environment..crossoverCallback) : <code>function</code>
        * [~crossoverSync](#Eukaryote.Genetic.Environment..crossoverSync) : <code>function</code>
        * [~generation](#Eukaryote.Genetic.Environment..generation) : <code>function</code>
        * [~generationCallback](#Eukaryote.Genetic.Environment..generationCallback) : <code>function</code>
        * [~generationSync](#Eukaryote.Genetic.Environment..generationSync) ⇒ <code>boolean</code>

<a name="Eukaryote.Genetic.Environment+seed"></a>
##### environment.seed(individual, callback)
Seed the given individual into a population and run genetic algorithm.

**Kind**: instance method of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  

| Param | Type |
| --- | --- |
| individual | <code>Object</code> | 
| callback | <code>[seedCallback](#Eukaryote.Genetic.Environment..seedCallback)</code> | 

<a name="Eukaryote.Genetic.Environment+_generation"></a>
##### environment._generation(g, callback) ℗
Call the `generation` function if it was provided to constructor.

**Kind**: instance method of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  
**Access:** private  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | Number of generations that have passed. |
| callback | <code>[_generationCallback](#Eukaryote.Genetic.Environment.._generationCallback)</code> |  |

<a name="Eukaryote.Genetic.Environment+_seedIndividual"></a>
##### environment._seedIndividual(individual) ℗
Spawn a population with clones of the given individual.

**Kind**: instance method of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  
**Access:** private  

| Param | Type |
| --- | --- |
| individual | <code>Object</code> | 

<a name="Eukaryote.Genetic.Environment+_clone"></a>
##### environment._clone(individual) ⇒ <code>Object</code> ℗
Perform a deep clone on the given individual.

**Kind**: instance method of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  
**Returns**: <code>Object</code> - the clone  
**Access:** private  

| Param | Type |
| --- | --- |
| individual | <code>Object</code> | 

<a name="Eukaryote.Genetic.Environment+_applySelectionStrategy"></a>
##### environment._applySelectionStrategy() ℗
Apply selection strategy on the current population.

**Kind**: instance method of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  
**Access:** private  
<a name="Eukaryote.Genetic.Environment+_getClonesOfReproductionStrategy"></a>
##### environment._getClonesOfReproductionStrategy() ⇒ <code>Array.&lt;Object&gt;</code> ℗
Retrieve individuals chosen from reproduction strategy. Return clones of those individuals.

**Kind**: instance method of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  
**Returns**: <code>Array.&lt;Object&gt;</code> - individuals  
**Access:** private  
<a name="Eukaryote.Genetic.Environment+_crossover"></a>
##### environment._crossover(individuals, callback) ℗
Perform crossover strategy on the given individuals.

**Kind**: instance method of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  
**Access:** private  

| Param | Type |
| --- | --- |
| individuals | <code>Array.&lt;Object&gt;</code> | 
| callback | <code>[_crossoverCallback](#Eukaryote.Genetic.Environment.._crossoverCallback)</code> | 

<a name="Eukaryote.Genetic.Environment+_mutate"></a>
##### environment._mutate(individuals, callback) ℗
Mutate the genotypes of all given individuals.

**Kind**: instance method of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  
**Access:** private  

| Param | Type |
| --- | --- |
| individuals | <code>Array.&lt;Object&gt;</code> | 
| callback | <code>[_mutateCallback](#Eukaryote.Genetic.Environment.._mutateCallback)</code> | 

<a name="Eukaryote.Genetic.Environment+_spawnIndividuals"></a>
##### environment._spawnIndividuals(individuals) ℗
Add all individuals to the population up to the maximum populationSize.

**Kind**: instance method of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  
**Access:** private  

| Param | Type |
| --- | --- |
| individuals | <code>Array.&lt;Object&gt;</code> | 

<a name="Eukaryote.Genetic.Environment+_sortPopulationByFitness"></a>
##### environment._sortPopulationByFitness(callback) ℗
Sort the population by fitness, descending, where the most fit individual is at population[0].
Use the [fitness](#Eukaryote.Genetic.Environment..fitness) callback to determine each individual's 
fitness.

**Kind**: instance method of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  
**Access:** private  

| Param | Type |
| --- | --- |
| callback | <code>[_sortPopulationByFitnessCallback](#Eukaryote.Genetic.Environment.._sortPopulationByFitnessCallback)</code> | 

<a name="Eukaryote.Genetic.Environment..seedCallback"></a>
##### Environment~seedCallback : <code>function</code>
Callback used when genetic algorithm has completed or an error has occurred.

**Kind**: inner typedef of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Not null if an error has occurred. |

<a name="Eukaryote.Genetic.Environment.._generationCallback"></a>
##### Environment~_generationCallback : <code>function</code>
Callback used when generation has completed or an error has occurred.

**Kind**: inner typedef of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Not null if an error has occurred. |
| shouldContinue | <code>boolean</code> | Indicates if generations should continue. |

<a name="Eukaryote.Genetic.Environment.._crossoverCallback"></a>
##### Environment~_crossoverCallback : <code>function</code>
Callback used when crossover has completed or an error has occurred.

**Kind**: inner typedef of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Not null if an error has occurred. |

<a name="Eukaryote.Genetic.Environment.._mutateCallback"></a>
##### Environment~_mutateCallback : <code>function</code>
Callback used when mutate has completed or an error has occurred.

**Kind**: inner typedef of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Not null if an error has occurred. |

<a name="Eukaryote.Genetic.Environment.._sortPopulationByFitnessCallback"></a>
##### Environment~_sortPopulationByFitnessCallback : <code>function</code>
Callback used when sort has completed or an error has occurred.

**Kind**: inner typedef of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Not null if an error has occurred. |

<a name="Eukaryote.Genetic.Environment..fitness"></a>
##### Environment~fitness : <code>function</code>
Calculate fitness score of an individual's phenotype. Higher fitness is better.

**Kind**: inner typedef of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  

| Param | Type | Description |
| --- | --- | --- |
| individual | <code>Object</code> | The individual whose fitness should be calculated. |
| callback | <code>[fitnessCallback](#Eukaryote.Genetic.Environment..fitnessCallback)</code> | To be used when asynchronous calculation of fitness score is complete. |

<a name="Eukaryote.Genetic.Environment..fitnessCallback"></a>
##### Environment~fitnessCallback : <code>function</code>
Callback used when asynchronously calculating [fitness](#Eukaryote.Genetic.Environment..fitness) score.

**Kind**: inner typedef of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Not null if an error has occurred. |
| Fitness | <code>float</code> | score. |

<a name="Eukaryote.Genetic.Environment..fitnessSync"></a>
##### Environment~fitnessSync ⇒ <code>float</code>
Calculate fitness score of an individual's phenotype. Higher fitness is better.

**Kind**: inner typedef of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  
**Returns**: <code>float</code> - Fitness score.  

| Param | Type | Description |
| --- | --- | --- |
| individual | <code>Object</code> | The individual whose fitness should be calculated. |

<a name="Eukaryote.Genetic.Environment..mutate"></a>
##### Environment~mutate : <code>function</code>
Mutate an individual's genotype. Chance of mutation based on a probability. 
However, when a mutation does occur, the resulting mutant gene should give all possibilities
equal opportunity.

**Kind**: inner typedef of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  

| Param | Type | Description |
| --- | --- | --- |
| individual | <code>Object</code> | The individual whose genome should be mutated. |
| callback | <code>[mutateCallback](#Eukaryote.Genetic.Environment..mutateCallback)</code> | To be used when performing asynchronous mutation. |

<a name="Eukaryote.Genetic.Environment..mutateCallback"></a>
##### Environment~mutateCallback : <code>function</code>
Callback used when asynchronously [mutating](#Eukaryote.Genetic.Environment..mutate).

**Kind**: inner typedef of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Not null if an error has occurred. |

<a name="Eukaryote.Genetic.Environment..mutateSync"></a>
##### Environment~mutateSync : <code>function</code>
Mutate an individual's genotype. Chance of mutation based on a probability. 
However, when a mutation does occur, the resulting mutant gene should give all possibilities
equal opportunity.

**Kind**: inner typedef of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  

| Param | Type | Description |
| --- | --- | --- |
| individual | <code>Object</code> | The individual whose genome should be mutated. |

<a name="Eukaryote.Genetic.Environment..crossover"></a>
##### Environment~crossover : <code>function</code>
Recombine similar stretches of genes between given individuals' genotypes.

**Kind**: inner typedef of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  

| Param | Type | Description |
| --- | --- | --- |
| individuals | <code>Array.&lt;Object&gt;</code> | The individuals whose genomes should be recombined. |
| callback | <code>[crossoverCallback](#Eukaryote.Genetic.Environment..crossoverCallback)</code> | To be used when performing asynchronous crossover. |

<a name="Eukaryote.Genetic.Environment..crossoverCallback"></a>
##### Environment~crossoverCallback : <code>function</code>
Callback used when asynchronously performing [crossover](#Eukaryote.Genetic.Environment..crossover).

**Kind**: inner typedef of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Not null if an error has occurred. |

<a name="Eukaryote.Genetic.Environment..crossoverSync"></a>
##### Environment~crossoverSync : <code>function</code>
Recombine similar stretches of genes between given individuals' genotypes.

**Kind**: inner typedef of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  

| Param | Type | Description |
| --- | --- | --- |
| individuals | <code>Array.&lt;Object&gt;</code> | The individuals whose genomes should be recombined. |

<a name="Eukaryote.Genetic.Environment..generation"></a>
##### Environment~generation : <code>function</code>
Executed every generation. Return true to halt further generations. 
For example when a solution is found (maximum fitness achieved).

**Kind**: inner typedef of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  

| Param | Type |
| --- | --- |
| individuals | <code>Array.&lt;Object&gt;</code> | 
| callback | <code>[generationCallback](#Eukaryote.Genetic.Environment..generationCallback)</code> | 

<a name="Eukaryote.Genetic.Environment..generationCallback"></a>
##### Environment~generationCallback : <code>function</code>
Callback used when asynchronously performing [generation](#Eukaryote.Genetic.Environment..generation).

**Kind**: inner typedef of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Not null if an error has occurred. |
| shouldContinue | <code>boolean</code> | Indicates whether genetic alogirthm should continue. |

<a name="Eukaryote.Genetic.Environment..generationSync"></a>
##### Environment~generationSync ⇒ <code>boolean</code>
Executed every generation. Return true to halt further generations. 
For example when a solution is found (maximum fitness achieved).

**Kind**: inner typedef of <code>[Environment](#Eukaryote.Genetic.Environment)</code>  

| Param | Type |
| --- | --- |
| individuals | <code>Array.&lt;Object&gt;</code> | 

<a name="Eukaryote.Genetic.CrossoverStrategy"></a>
#### Genetic.CrossoverStrategy : <code>object</code>
Crossover strategies determine how genes from individuals are recombined during replication.

**Kind**: static namespace of <code>[Genetic](#Eukaryote.Genetic)</code>  
**Example**  
```js
var individuals = [
  { genotype: 'abc' },
  { genotype: 'xyz' }
];
// get array of strings from 'genotype' property within each individual
var genotypes = individuals.map(function(individual) {
  return individual.genotype;
});
// crossover
var strategy = Eukaryote.Genetic.CrossoverStrategy.SimilarStrings()
var offspringGenotypes = strategy(genotypes);
// update offspring genotypes
individuals[0].genotype = offspringGenotypes[0];
individuals[1].genotype = offspringGenotypes[1];
```
<a name="Eukaryote.Genetic.CrossoverStrategy.SimilarStrings"></a>
##### CrossoverStrategy.SimilarStrings()
Crossover two genotypes of type 'string'. Replace similar segments of
string genotypes.

**Kind**: static method of <code>[CrossoverStrategy](#Eukaryote.Genetic.CrossoverStrategy)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.numberOfOffspring] | <code>integer</code> | <code>2</code> | range: 1 <= n |
| [options.chromosomeLengthAsPercentOfGenotype] | <code>float</code> | <code>50</code> | range: 0 < n < 100 |

**Example**  
```js
'abc'  + 'xyz'  =>  'xbc'  & 'ayz'
'abcd' + 'xyz'  =>  'aycd' & 'xbz'
'abc'  + 'wxyz' =>  'aby'  & 'wxcz'
```
<a name="Eukaryote.Genetic.ReproductionStrategy"></a>
#### Genetic.ReproductionStrategy : <code>object</code>
Reproduction strategies determine which individuals reproduce. 
The individuals chosen here will be passed into [crossover strategy](#Eukaryote.Genetic.CrossoverStrategy)
if it was specified.

**Kind**: static namespace of <code>[Genetic](#Eukaryote.Genetic)</code>  
**Example**  
```js
new Eukaryote.Genetic.Environment({
  fitness: function(individual) { ... },
  mutate: function(individual) { ... },
  reproduction: Eukaryote.Genetic.ReproductionStrategy.Random()
});
```

* [.ReproductionStrategy](#Eukaryote.Genetic.ReproductionStrategy) : <code>object</code>
    * _static_
        * [.Random()](#Eukaryote.Genetic.ReproductionStrategy.Random) ⇒ <code>[strategy](#Eukaryote.Genetic.ReproductionStrategy..strategy)</code>
        * [.Sequential()](#Eukaryote.Genetic.ReproductionStrategy.Sequential) ⇒ <code>[strategy](#Eukaryote.Genetic.ReproductionStrategy..strategy)</code>
        * [.SequentialRandom()](#Eukaryote.Genetic.ReproductionStrategy.SequentialRandom) ⇒ <code>[strategy](#Eukaryote.Genetic.ReproductionStrategy..strategy)</code>
    * _inner_
        * [~strategy](#Eukaryote.Genetic.ReproductionStrategy..strategy) : <code>Object</code>
        * [~begin](#Eukaryote.Genetic.ReproductionStrategy..begin) : <code>function</code>
        * [~reproduce](#Eukaryote.Genetic.ReproductionStrategy..reproduce) ⇒ <code>Array.&lt;Object&gt;</code>
        * [~end](#Eukaryote.Genetic.ReproductionStrategy..end) : <code>function</code>

<a name="Eukaryote.Genetic.ReproductionStrategy.Random"></a>
##### ReproductionStrategy.Random() ⇒ <code>[strategy](#Eukaryote.Genetic.ReproductionStrategy..strategy)</code>
X number of individuals chosen at random for reproduction.

**Kind**: static method of <code>[ReproductionStrategy](#Eukaryote.Genetic.ReproductionStrategy)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.numberOfIndividuals] | <code>integer</code> | <code>2</code> | range: 1 <= n <= population.length |

<a name="Eukaryote.Genetic.ReproductionStrategy.Sequential"></a>
##### ReproductionStrategy.Sequential() ⇒ <code>[strategy](#Eukaryote.Genetic.ReproductionStrategy..strategy)</code>
Individuals chosen sequentially from population ordered by fitness starting with most fit individual.

**Kind**: static method of <code>[ReproductionStrategy](#Eukaryote.Genetic.ReproductionStrategy)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.numberOfIndividuals] | <code>integer</code> | <code>2</code> | range: 1 <= n <= population.length |

<a name="Eukaryote.Genetic.ReproductionStrategy.SequentialRandom"></a>
##### ReproductionStrategy.SequentialRandom() ⇒ <code>[strategy](#Eukaryote.Genetic.ReproductionStrategy..strategy)</code>
Father is chosen sequentially from population ordered by fitness starting with the most fit individual. 
Mother is chosen randomly.

**Kind**: static method of <code>[ReproductionStrategy](#Eukaryote.Genetic.ReproductionStrategy)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.numberOfIndividuals] | <code>integer</code> | <code>2</code> | range: 2 <= n <= population.length |

<a name="Eukaryote.Genetic.ReproductionStrategy..strategy"></a>
##### ReproductionStrategy~strategy : <code>Object</code>
**Kind**: inner typedef of <code>[ReproductionStrategy](#Eukaryote.Genetic.ReproductionStrategy)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| begin | <code>[begin](#Eukaryote.Genetic.ReproductionStrategy..begin)</code> | Called once at beginning of generation. |
| reproduce | <code>[reproduce](#Eukaryote.Genetic.ReproductionStrategy..reproduce)</code> | Individuals to reproduce. Can be called multiple times. |
| end | <code>[end](#Eukaryote.Genetic.ReproductionStrategy..end)</code> | Called once at end of generation. |

<a name="Eukaryote.Genetic.ReproductionStrategy..begin"></a>
##### ReproductionStrategy~begin : <code>function</code>
Executed once at the beginning of each generation.

**Kind**: inner typedef of <code>[ReproductionStrategy](#Eukaryote.Genetic.ReproductionStrategy)</code>  
<a name="Eukaryote.Genetic.ReproductionStrategy..reproduce"></a>
##### ReproductionStrategy~reproduce ⇒ <code>Array.&lt;Object&gt;</code>
Choose individuals from the given population to reproduce.
Called as many times as necessary until the population is full.

**Kind**: inner typedef of <code>[ReproductionStrategy](#Eukaryote.Genetic.ReproductionStrategy)</code>  
**Returns**: <code>Array.&lt;Object&gt;</code> - individuals  

| Param | Type |
| --- | --- |
| population | <code>Array.&lt;Object&gt;</code> | 

<a name="Eukaryote.Genetic.ReproductionStrategy..end"></a>
##### ReproductionStrategy~end : <code>function</code>
Executed once at the end of each generation.

**Kind**: inner typedef of <code>[ReproductionStrategy](#Eukaryote.Genetic.ReproductionStrategy)</code>  
<a name="Eukaryote.Genetic.SelectionStrategy"></a>
#### Genetic.SelectionStrategy : <code>object</code>
Selection strategies are designed to kill off some number of individuals within your population. 
This is to make room for those who will reproduce.
All functions within this namespace return a [Strategy](#Eukaryote.Genetic.SelectionStrategy..strategy) implementation.

**Kind**: static namespace of <code>[Genetic](#Eukaryote.Genetic)</code>  
**Example**  
```js
new Eukaryote.Genetic.Environment({
  fitness: function(individual) { ... },
  mutate: function(individual) { ... },
  selection: Eukaryote.Genetic.SelectionStrategy.TopXPercent()
});
```

* [.SelectionStrategy](#Eukaryote.Genetic.SelectionStrategy) : <code>object</code>
    * _static_
        * [.TopX()](#Eukaryote.Genetic.SelectionStrategy.TopX) ⇒ <code>[strategy](#Eukaryote.Genetic.SelectionStrategy..strategy)</code>
        * [.TopXPercent()](#Eukaryote.Genetic.SelectionStrategy.TopXPercent) ⇒ <code>[strategy](#Eukaryote.Genetic.SelectionStrategy..strategy)</code>
        * [.RandomWeightedByRank()](#Eukaryote.Genetic.SelectionStrategy.RandomWeightedByRank) ⇒ <code>[strategy](#Eukaryote.Genetic.SelectionStrategy..strategy)</code>
    * _inner_
        * [~strategy](#Eukaryote.Genetic.SelectionStrategy..strategy) : <code>function</code>

<a name="Eukaryote.Genetic.SelectionStrategy.TopX"></a>
##### SelectionStrategy.TopX() ⇒ <code>[strategy](#Eukaryote.Genetic.SelectionStrategy..strategy)</code>
X number of individuals survive for reproduction.

**Kind**: static method of <code>[SelectionStrategy](#Eukaryote.Genetic.SelectionStrategy)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.numberOfIndividuals] | <code>integer</code> | <code>1</code> | range: 0 < i <= population.length |

<a name="Eukaryote.Genetic.SelectionStrategy.TopXPercent"></a>
##### SelectionStrategy.TopXPercent() ⇒ <code>[strategy](#Eukaryote.Genetic.SelectionStrategy..strategy)</code>
Only top X percent of individuals survive to reproduce.

**Kind**: static method of <code>[SelectionStrategy](#Eukaryote.Genetic.SelectionStrategy)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.probability] | <code>float</code> | <code>0.1</code> | range: 0 < f < 1 |

<a name="Eukaryote.Genetic.SelectionStrategy.RandomWeightedByRank"></a>
##### SelectionStrategy.RandomWeightedByRank() ⇒ <code>[strategy](#Eukaryote.Genetic.SelectionStrategy..strategy)</code>
For each individual in a population starting with the most fit individual,
x% probability of death where x grows as the individuals get less fit.

**Kind**: static method of <code>[SelectionStrategy](#Eukaryote.Genetic.SelectionStrategy)</code>  
<a name="Eukaryote.Genetic.SelectionStrategy..strategy"></a>
##### SelectionStrategy~strategy : <code>function</code>
Remove individuals from the given population.

**Kind**: inner typedef of <code>[SelectionStrategy](#Eukaryote.Genetic.SelectionStrategy)</code>  

| Param | Type | Description |
| --- | --- | --- |
| population | <code>Array.&lt;Object&gt;</code> | population from which to select individuals |

<a name="Eukaryote.Utility"></a>
### Eukaryote.Utility : <code>object</code>
**Kind**: static namespace of <code>[Eukaryote](#Eukaryote)</code>  

* [.Utility](#Eukaryote.Utility) : <code>object</code>
    * [.TypeValidator](#Eukaryote.Utility.TypeValidator) : <code>object</code>
        * [.isDefined(property)](#Eukaryote.Utility.TypeValidator.isDefined)
        * [.isBoolean(property)](#Eukaryote.Utility.TypeValidator.isBoolean)
        * [.isString(property)](#Eukaryote.Utility.TypeValidator.isString)
        * [.isNumber(property)](#Eukaryote.Utility.TypeValidator.isNumber)
        * [.isNumber(property)](#Eukaryote.Utility.TypeValidator.isNumber)
        * [.isArray(property)](#Eukaryote.Utility.TypeValidator.isArray)
        * [.isObject(property)](#Eukaryote.Utility.TypeValidator.isObject)
        * [.isFunction(property)](#Eukaryote.Utility.TypeValidator.isFunction)

<a name="Eukaryote.Utility.TypeValidator"></a>
#### Utility.TypeValidator : <code>object</code>
Property type validation.

**Kind**: static namespace of <code>[Utility](#Eukaryote.Utility)</code>  

* [.TypeValidator](#Eukaryote.Utility.TypeValidator) : <code>object</code>
    * [.isDefined(property)](#Eukaryote.Utility.TypeValidator.isDefined)
    * [.isBoolean(property)](#Eukaryote.Utility.TypeValidator.isBoolean)
    * [.isString(property)](#Eukaryote.Utility.TypeValidator.isString)
    * [.isNumber(property)](#Eukaryote.Utility.TypeValidator.isNumber)
    * [.isNumber(property)](#Eukaryote.Utility.TypeValidator.isNumber)
    * [.isArray(property)](#Eukaryote.Utility.TypeValidator.isArray)
    * [.isObject(property)](#Eukaryote.Utility.TypeValidator.isObject)
    * [.isFunction(property)](#Eukaryote.Utility.TypeValidator.isFunction)

<a name="Eukaryote.Utility.TypeValidator.isDefined"></a>
##### TypeValidator.isDefined(property)
Validate object is not null or undefined.

**Kind**: static method of <code>[TypeValidator](#Eukaryote.Utility.TypeValidator)</code>  

| Param | Type |
| --- | --- |
| property | <code>\*</code> | 

<a name="Eukaryote.Utility.TypeValidator.isBoolean"></a>
##### TypeValidator.isBoolean(property)
Validate object is a boolean.

**Kind**: static method of <code>[TypeValidator](#Eukaryote.Utility.TypeValidator)</code>  

| Param | Type |
| --- | --- |
| property | <code>\*</code> | 

<a name="Eukaryote.Utility.TypeValidator.isString"></a>
##### TypeValidator.isString(property)
Validate object is a string.

**Kind**: static method of <code>[TypeValidator](#Eukaryote.Utility.TypeValidator)</code>  

| Param | Type |
| --- | --- |
| property | <code>\*</code> | 

<a name="Eukaryote.Utility.TypeValidator.isNumber"></a>
##### TypeValidator.isNumber(property)
Validate object is a real number (not NaN or Infinity)

**Kind**: static method of <code>[TypeValidator](#Eukaryote.Utility.TypeValidator)</code>  

| Param | Type |
| --- | --- |
| property | <code>\*</code> | 

<a name="Eukaryote.Utility.TypeValidator.isNumber"></a>
##### TypeValidator.isNumber(property)
Validate object is a whole number.

**Kind**: static method of <code>[TypeValidator](#Eukaryote.Utility.TypeValidator)</code>  

| Param | Type |
| --- | --- |
| property | <code>\*</code> | 

<a name="Eukaryote.Utility.TypeValidator.isArray"></a>
##### TypeValidator.isArray(property)
Validate object is an array.

**Kind**: static method of <code>[TypeValidator](#Eukaryote.Utility.TypeValidator)</code>  

| Param | Type |
| --- | --- |
| property | <code>\*</code> | 

<a name="Eukaryote.Utility.TypeValidator.isObject"></a>
##### TypeValidator.isObject(property)
Validate given object is an object literal.

**Kind**: static method of <code>[TypeValidator](#Eukaryote.Utility.TypeValidator)</code>  

| Param | Type |
| --- | --- |
| property | <code>\*</code> | 

<a name="Eukaryote.Utility.TypeValidator.isFunction"></a>
##### TypeValidator.isFunction(property)
Validate object is a function.

**Kind**: static method of <code>[TypeValidator](#Eukaryote.Utility.TypeValidator)</code>  

| Param | Type |
| --- | --- |
| property | <code>\*</code> | 

