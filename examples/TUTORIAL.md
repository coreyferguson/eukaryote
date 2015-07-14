
# Genetic Algorithm Tutorial



## Summary

Genetic algorithms are a type of evolutinary algorithm in which the computer solves a problem by applying
concepts from the field of evolutionary genetics. This involves *replication*, *selection*, *mutation* and 
*crossover* within a population of individuals. These concepts lead to adaptive evolution which
can help us solve a wide range of problems using an *intelligent brute force* algorithm.



## Background / Vocabulary

Before discussing implementation details of a genetic algorithm, let's talk about some of these concepts in the context of living organisms we find on Earth...

**Replication**

All organisms replicate, the process by which an organism copies it's own genotype into a new individual.

**Selection**

As Charles Darwin learned from Thomas Malthus, organisms replicate faster than their environment will support. This leads to competition between individuals in a population. This is the foundation for evolution by natural selection. This is also the most important (and likely most difficult) part of a genetic algorithm. Selection occurs by replacing unfit individuals with (more) fit individuals. Fitness is calculated using the `fitness` function (see API documentation below).

Fitness is not a boolean value. It should scale so that organisms can be ranked relative to each other.

**Mutation**

Mutation is facilitated by the `mutation` API function. The implementation details of a mutation depend on how you define your organisms *genotype*. Essentially, mutation is the random change of one or more genes within an organism.

**Crossover**

Crossover is the act of transfering genes between individuals. This exchange can happen in multiple ways:

1) Horizontal gene transfer: this is done in prokaryotes (bacteria) when one individual inserts it's genes into another individual directly.

2) Vertical gene transfer: this is done in eukaryotes (plants and animals) during replication where the offspring get a combination of their parents genes.

**Organism/Species vs. Individual/Population**

The terms 'organism' and 'individual' are mostly interchangeable. In this tutorial, when referring to an 'organism' it is meant in the context of living organisms on Earth whereas 'individual' is used in the broader context of genetic algorithms.

The terms 'species' and 'population' are also mostly interchangeable. A species is a collection of organisms in the same way that a population is a collection of individuals.

**Genotype/Phenotype**

An individual's **genotype** are the instructions used to 'make' an individual. Often times, the genotype contains information that is not used. In living organisms on Earth, we have a significant amount of 'uncoded' DNA which is not expressed. The reasons for this uncoded DNA is debatable; some theories include obsolete DNA left over from our ancestors, padding to make sure some protein is synthesized at a specific rate, and others.

An individual's **phenotype** are those attributes which are decoded from the genotype. These are the genes which are expressed within an individual and used to determine fitness.

For example, let's say we're writing an algorithm that takes a number as input and gives us an equation of single digit numbers separated by `+`, `-`, `*`, and `/` symbols (no order of operations). We'll call this **[Math Jeopardy](mathJeopardy)**. Let's say we want the computer to generate an equation that evaluates to the number 10.

A fit individual's genotype can be a string that looks like this: `1+3*2+2`. Because of random mutation, these numbers and symbols (the genes) can actually be mixed up into a nonsensical equation like this: `+1+*3*2+2`. To calculate the fitness of this individual, we need to decode it's genotype into a phenotype (a valid equation). `+1+*3*2+2` can be decoded by:

1. Grab the first number
2. Grab the first symbol
3. Grab the second number
4. Perform operation
5. Repeat 1-3 on the result of 4

`+1+*3*2+2` becomes `1+3+2*2 = 12`

Yes, there are a few missing symbols: `*` and a `+`. Let's call these uncoded genes :) If the length of the genome is important you can apply fitness pressures to encourage shorter lengths.

**Intelligent Brute Force**

In the summary, I used the phrase 'intelligent brute force'. What does that mean?

Mutation in an individual is random. The occurence of some type of mutation is based on a probability, however the mutation itself (one gene converted into another gene) is random. Gene-A may be mutated into Gene-B or Gene-C or so on at random. This random effect is why I say 'brute force' because these mutations result in the testing of all possible solutions. Unlike normal 'brute force' methods, however, the fitness of an individual determines how likely it is to replicate. Unfit individuals within a population will be replaced by fit individuals. This gives the fit individuals a higher probability of carrying their genes into the future.



## Tutorial

We now have the vocabulary to talk about how a genetic algorithm can work. Let's use the [Hello World](helloWorld) example where we want to evolve a string of random characters into the message 'Hello world!'. This example is obviously arbitrary since we already know the answer. Of course, the same can be said of any 'Hello World' tutorial. The goal here is to keep it simple while revealing the magic of a genetic algorithm.

What do we need for evolution to occur? As stated in the summary: **replication**, **selection**, **mutation** and **crossover**.

 - **Replication** is easy enough in JavaScript... just clone the individual in question. The included [Eukaryote](../src) library will do this work for us.
 - **Selection** can take multiple forms but the basic idea is to kill off some individuals in a population to make room for others. In the [Hello World](helloWorld) example, we use `Eukaryote.SelectionStrategy.Top10Percent` which allows the top 10% of the population to survive. The bottom 90% will be eliminated. This begs the question: what does "top 10%" mean? Individuals are ranked in a population according to their 'fitness'. Fitness is a value that allows an individual to be ranked relative to other individuals. Selection will be handled automatically by [Eukaryote](../src), but it will need you to define a fitness score for each individual. Here, you'll use the `fitness` API callback.
 - **Mutation** is the act of mutating each individual's genotype. What is a gene in terms of the [Hello World](helloWorld) example? A gene is simply an alphanumeric character. The entire string we'll refer to as the 'genotype'. For example, 'a' can be a gene, 'b' can be a gene, etc. 'Herro' would be a genotype. When mutating a genotype, we can add genes, remove genes or modify existing genes. Each can have their own probability of occurence which will affect your algorithm. This can be done in the `mutate` callback.
 - **Crossover** is used in sexual reproduction where multiple individuals contribute parts of their genotype into a new individual. In the context of [Hello World](helloWorld), for example, two individuals '**abcd**' and 'wxyz' would crossover to make two new individuals '**ab**yz' and 'wx**cd**'. You can implement the `crossover` API callback to do this. You can also take advantage of [Eukaryote's](../src) `Eukaryote.CrossoverStrategy.SimilarStrings` crossover strategy to swap segments on a string genotype.

In summary, we need to implement three callbacks: `fitness`, `mutate`, and `crossover`. There is one additional callback used for logging, `generation`, which is called every generation. You can get the most fit individual in a population by calling `eukaryote.population[0]`. Reference the [API Documentation](../src/README.md) to implement the callbacks above to generate the string `HelloWorld!`. Use the [Hello World](helloWorld) example as a cheat sheet.

