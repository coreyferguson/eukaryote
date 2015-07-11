
# Evolutionary Algorithm Tutorial



## Summary

Genetic algorithms are a type of evolutinary algorithm in which the computer solves a problem by applying
concepts from the field of evolutionary genetics. This involves *replication*, *selection*, *mutation* and 
*recombination* within a population of individuals. These concepts lead to adaptive evolution which
can help us solve a wide range of problems using an *intelligent brute force* algorithm.



## Background

Before discussing implementation details of a genetic algorithm, let's talk about some of these concepts in the context of living organisms we find on Earth...

**Replication**

All organisms replicate, the process by which an organism copies it's own genotype into a new individual.

**Selection**

As Charles Darwin learned from Thomas Malthus, organisms replicate faster than their environment will support. This leads to competition between individuals in a population. This is the foundation for evolution by natural selection. This is also the most important (and likely most difficult) part of a genetic algorithm. Selection occurs by replacing unfit individuals with (more) fit individuals. Fitness is calculated using the `fitness` function (see API documentation below).

Fitness is not a boolean value. It should scale so that organisms can be ranked relative to each other.

**Mutation**

Mutation is facilitated by the `mutation` API function. The implementation details of a mutation depend on how you define your organisms *genotype*. Essentially, mutation is the random change of one or more genes within an organism.

**Recombination**

Recombination is the act of transfering genes between individuals. This exchange can happen in multiple ways:

1) Horizontal gene transfer: this is done in prokaryotes (bacteria) when one individual inserts it's genes into another individual directly.

2) Vertical gene transfer: this is done in eukaryotes (plants and animals) during replication where the offspring get a combination of their parents genes.

**Organism/Species vs. Individual/Population**

The terms 'organism' and 'individual' are mostly interchangeable. Generally, 'organism' is used in the context of living organisms on Earth whereas 'individual' is used in the broader context of genetic algorithms.

The terms 'species' and 'population' are also mostly interchangeable. A species is a collection of organisms in the same way that a population is a collection of individuals.

**Genotype/Phenotype**

An individual's **genotype** are the instructions used to "make" an individual. Often times, the genotype contains information that is not used. In living organisms on Earth, we have a significant amount of "uncoded" DNA which is not expressed. The reasons for this uncoded DNA is debatable; some theories include obsolete DNA left over from our ancestors, padding to make sure some protein is synthesized at a specific rate, and others.

An individual's **phenotype** are those attributes which are decoded from the genotype. These are the genes which are expressed within an individual and used to determine fitness.

For example, let's say we're writing an algorithm which comes up with an equation to match a given number. Let's say we want the computer to generate an equation that evaluates to the number 10.

A fit individual's genotype can be a string that looks like this: `1+3*2+2`. Because of random mutation, these numbers and symbols (the genes) can actually be mixed up into a nonsensical equation like this: `+1+*3*2+2`. To calculate the fitness of this individual, we need to decode it's genotype into a phenotype (a valid equation). `+1+*3*2+2` can be decoded by eliminating invalid characters (such as the first `+` and `*` symbols in the genotype) into the phenotype `1+3*2+2`.

**Intelligent Brute Force**

In the summary, I used the phrase "intelligent brute force". What does that mean?

Mutation in an individual is random. The occurence of some type of mutation is based on a probability, however the mutation itself (one gene converted into another gene) is random. Gene-A may be mutated into Gene-B or Gene-C or so on at random. This random effect is why I say "brute force" because these mutations result in the testing of all possible solutions. Unlike normal "brute force" methods, however, the fitness of an individual determines how likely it is to replicate. Unfit individuals within a population will be replaced by fit individuals. This gives the fit individuals a higher probability of carrying their genes into the future.

