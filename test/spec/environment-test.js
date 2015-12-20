
var Environment = require('../../src/genetic/environment');
var ReproductionStrategy = require('../../src/genetic/reproduction-strategy');
var SelectionStrategy = require('../../src/genetic/selection-strategy');

var lodash = {
  clone: require('lodash.clone')
};

describe('Environment', function() {

  /////////////////
  // constructor //
  /////////////////

  describe('constructor', function() {

    it('should not throw error on valid constructor options', function() {
      var environment = new Environment({
        fitnessSync: function(individual) { return 0; },
        mutateSync: function(individual) {}
      });
    });

    it('should throw error when constructor missing required options', function() {
      expect(function() {
        var environment = new Environment();
      }).toThrowError(/Illegal argument/);
    });

    it('should accept `fitness` without `fitnessSync` function', function() {
      var environment = new Environment({
        fitness: function(individual, callback) { callback(null, 0); },
        mutateSync: function(individual) {}
      });
    });

    it('should accept `fitnessSync` without `fitness` function', function() {
      var environment = new Environment({
        fitnessSync: function(individual) { return 0; },
        mutateSync: function(individual) {}
      });
    });

    it('should throw error when both `fitness` and `fitnessSync` functions provided', function() {
      expect(function() {
        var environment = new Environment({
          fitness: function(individual, callback) { callback(null, 0); },
          fitnessSync: function(individual) { return 0; },
          mutateSync: function(individual) {}
        });
      }).toThrowError(/Illegal argument.*fitness.*fitnessSync/);
    });

    it('should throw error when `fitness` and `fitnessSync` functions not provided', function() {
      expect(function() {
        var environment = new Environment({
          mutateSync: function(individual) {}
        });
      }).toThrowError(/Illegal argument.*fitness.*fitnessSync/);
    });

    it('should accept `mutate` without `mutateSync` function', function() {
      var environment = new Environment({
        fitness: function(individual, callback) { callback(null, 0); },
        mutate: function(individual, callback) { callback(); }
      });
    });

    it('should accept `mutateSync` without `mutate` function', function() {
      var environment = new Environment({
        fitness: function(individual) { callback(null, 0); },
        mutateSync: function(individual) {}
      });
    });

    it('should throw error when both `mutate` and `mutateSync` functions provided', function() {
      expect(function() {
        var environment = new Environment({
          fitness: function(individual, callback) { callback(null, 0); },
          mutate: function(individual, callback) { callback(null); },
          mutateSync: function(individual) {}
        });
      }).toThrowError(/Illegal argument.*mutate.*mutateSync/);
    });

    it('should throw error when `mutate` and `mutateSync` functions not provided', function() {
      expect(function() {
        var environment = new Environment({
          fitness: function(individual, callback) { callback(null, 0); }
        });
      }).toThrowError(/Illegal argument.*mutate.*mutateSync/);
    });

    it('should throw error when both `crossover` and `crossoverSync` functions provided', function() {
      expect(function() {
        var environment = new Environment({
          fitness: function(individual, callback) { callback(null, 0); },
          mutate: function(individual, callback) { callback(null); },
          crossover: function(individuals, callback) { callback(null); },
          crossoverSync: function(individuals) { }
        });
      }).toThrowError(/Illegal argument.*crossover.*crossoverSync/);
    });

    it('should throw error when both `generation` and `generationSync` functions provided', function() {
      expect(function() {
        var environment = new Environment({
          fitness: function(individual, callback) { callback(null, 0); },
          mutate: function(individual, callback) { callback(null); },
          generation: function(g, callback) { callback(null); },
          generationSync: function(g) { }
        });
      }).toThrowError(/Illegal argument.*generation.*generationSync/);
    });

    it('should throw error when populationSize is not an integer', function() {
      expect(function() {
        var environment = new Environment({
          populationSize: 'not an integer',
          fitnessSync: function(individual) { return 0; },
          mutateSync: function(individual) {}
        });
      }).toThrowError(/Illegal argument.*populationSize/);
    });

    it('should throw error when populationSize < 2', function() {
      expect(function() {
        var environment = new Environment({
          populationSize: 1,
          fitnessSync: function(individual) { return 0; },
          mutateSync: function(individual) {}
        });
      }).toThrowError(/Illegal argument.*populationSize/);
      expect(function() {
        var environment = new Environment({
          populationSize: -5,
          fitnessSync: function(individual) { return 0; },
          mutateSync: function(individual) {}
        });
      }).toThrowError(/Illegal argument.*populationSize/);
    });

    it('should throw error when numberOfGenerations is not an integer', function() {
      expect(function() {
        var environment = new Environment({
          numberOfGenerations: 'not an integer',
          fitnessSync: function(individual) { return 0; },
          mutateSync: function(individual) {}
        });
      }).toThrowError(/Illegal argument.*numberOfGenerations/);
    });

    it('should throw error when numberOfGenerations < 1', function() {
      expect(function() {
        var environment = new Environment({
          numberOfGenerations: 0,
          fitnessSync: function(individual) { return 0; },
          mutateSync: function(individual) {}
        });
      }).toThrowError(/Illegal argument.*numberOfGenerations/);
      expect(function() {
        var environment = new Environment({
          numberOfGenerations: -1,
          fitnessSync: function(individual) { return 0; },
          mutateSync: function(individual) {}
        });
      }).toThrowError(/Illegal argument.*numberOfGenerations/);
    });

    it('should allow selection strategy override', function() {
      var environment = new Environment({
          fitnessSync: function(individual) { return 0; },
          mutateSync: function(individual) {},
          selection: SelectionStrategy.TopX()
      });
    });

    it('should allow reproduction strategy override', function() {
      var environment = new Environment({
          fitnessSync: function(individual) { return 0; },
          mutateSync: function(individual) {},
          reproduction: ReproductionStrategy.Sequential()
      });
    });

    it('should throw error when selection strategy is not a function', function() {
      expect(function() {
        new Environment({
          fitnessSync: function(individual) { return 0; },
          mutateSync: function(individual) {},
          selection: 'not a function'
        });
      }).toThrowError(/Illegal argument.*selection/);
    });

    it('should throw error when reproduction strategy is not a function', function() {
      expect(function() {
        new Environment({
          fitnessSync: function(individual) { return 0; },
          mutateSync: function(individual) {},
          reproduction: 'not a function'
        });
      }).toThrowError(/Illegal argument.*reproduction/);
    });

  }); // End constructor

  /////////////////////
  // _seedIndividual //
  /////////////////////

  describe('_seedIndividual', function() {

    it('should fill entire population with clones of the same individual', function() {
      var environment = new Environment({
        populationSize: 10,
        fitnessSync: function(individual) { return 0; },
        mutateSync: function(individual) {}
      });
      environment._seedIndividual({name: 'corey'});
      expect(environment.population.length).toBe(10);
      environment.population.forEach(function(individual) {
        expect(individual).toEqual({name: 'corey'});
      });
    });

    it('should throw error when individual is not an object', function() {
      var environment = new Environment({
        fitnessSync: function(individual) { return 0; },
        mutateSync: function(individual) {}
      });
      expect(function() {
        environment._seedIndividual('not an object');
      }).toThrowError(/Illegal argument.*individual/);
    });

  }); // End _seedIndividual

  ////////////
  // _clone //
  ////////////

  describe('_clone', function() {

    it('should perform a deep clone', function() {
      var environment = new Environment({
        populationSize: 10,
        fitnessSync: function(individual) { return 0; },
        mutateSync: function(individual) {}
      });
      var individual = {
        name: 'Corey',
        properties: {
          awesome: true,
          humble: 'check',
        },
        synonyms: ['handsome', 'intelligent', 'funny']
      };
      var clone = environment._clone(individual);
      expect(clone).not.toBe(individual); // different object reference
      expect(clone).toEqual(individual); // same property values
      expect(clone.properties).not.toBe(individual.properties); // differest nested object reference
      clone.name = 'Someone else';
      expect(individual.name).not.toBe('Someone else');
      clone.synonyms.push('liar');
      expect(individual.synonyms).not.toEqual(['handsome', 'intelligent', 'funny', 'liar']);
    });

  }); // End _clone

  /////////////////////////////
  // _applySelectionStrategy //
  /////////////////////////////

  describe('_applySelectionStrategy', function() {

    it('should kill 50% of the population', function() {
      var environment = new Environment({
        populationSize: 100,
        fitnessSync: function(individual) { return 0; },
        mutateSync: function(individual) {},
        selection: SelectionStrategy.TopXPercent({ probability: 0.5 })
      });
      environment._seedIndividual({ name: 'Corey' });
      environment._applySelectionStrategy();
      expect(environment.population.length).toBe(50);
    });

    it('should allow 1 individual to survive', function() {
      var environment = new Environment({
        populationSize: 20,
        fitnessSync: function(individual) { return 0; },
        mutateSync: function(individual) {},
        selection: SelectionStrategy.TopX({ numberOfIndividuals: 1 })
      });
      environment._seedIndividual({ name: 'Corey' });
      environment._applySelectionStrategy();
      expect(environment.population.length).toBe(1);
    });

  }); // End applySelectionStrategy

  //////////////////////////////////////
  // _getClonesOfReproductionStrategy //
  //////////////////////////////////////

  describe('_getClonesOfReproductionStrategy', function() {

    it('should retrieve 1 clone', function() {
      var reproductionStrategy = ReproductionStrategy.Sequential({ numberOfIndividuals: 1 });
      var environment = new Environment({
        populationSize: 2,
        fitnessSync: function(individual) { return 0; },
        mutateSync: function(individual) {},
        reproduction: reproductionStrategy
      });
      var individual = { name: 'Corey' };
      environment._seedIndividual(individual);
      reproductionStrategy.begin();
      var clones = environment._getClonesOfReproductionStrategy();
      reproductionStrategy.end();
      expect(clones.length).toBe(1);
      expect(clones[0]).not.toBe(individual);
      expect(clones[0]).toEqual(individual);
    });

    it('should retrieve 2 clones', function() {
      var reproductionStrategy = ReproductionStrategy.Sequential({ numberOfIndividuals: 2 });
      var environment = new Environment({
        populationSize: 2,
        fitnessSync: function(individual) { return 0; },
        mutateSync: function(individual) {},
        reproduction: reproductionStrategy
      });
      var individual = { name: 'Corey' };
      environment._seedIndividual(individual);
      reproductionStrategy.begin();
      var clones = environment._getClonesOfReproductionStrategy();
      reproductionStrategy.end();
      expect(clones.length).toBe(2);
      expect(clones[0]).not.toBe(individual);
      expect(clones[0]).toEqual(individual);
      expect(clones[1]).not.toBe(individual);
      expect(clones[1]).toEqual(individual);
    });

    it('should retrieve 3 clones', function() {
      var reproductionStrategy = ReproductionStrategy.Sequential({ numberOfIndividuals: 3 });
      var environment = new Environment({
        populationSize: 2,
        fitnessSync: function(individual) { return 0; },
        mutateSync: function(individual) {},
        reproduction: reproductionStrategy
      });
      var individual = { name: 'Corey' };
      environment._seedIndividual(individual);
      reproductionStrategy.begin();
      var clones = environment._getClonesOfReproductionStrategy();
      reproductionStrategy.end();
      expect(clones.length).toBe(3);
      expect(clones[0]).not.toBe(individual);
      expect(clones[0]).toEqual(individual);
      expect(clones[1]).not.toBe(individual);
      expect(clones[1]).toEqual(individual);
      expect(clones[2]).not.toBe(individual);
      expect(clones[2]).toEqual(individual);
    });

  }); // End _getClonesOfReproductionStrategy

  ////////////////
  // _crossover //
  ////////////////

  describe('_crossover', function() {

    it('should do nothing when crossover strategy is undefined', function(done) {
      var environment = new Environment({
        fitnessSync: function(individual) { return 0; },
        mutateSync: function(individual) {}
      });
      var individuals = ['abc', 'xyz'];
      var newIndividuals = lodash.clone(individuals, true);
      environment._crossover(newIndividuals, function(error) {
        expect(error).not.toEqual(jasmine.anything());
        expect(newIndividuals).toEqual(individuals);
        done();
      });
    });

    define('crossoverSync', function() {

      it('should perform crossover when defined', function(done) {
        var environment = new Environment({
          fitnessSync: function(individual) { return 0; },
          mutateSync: function(individual) {},
          crossoverSync: function(individuals) {
            individuals.forEach(function(individual) {
              individual.genotype += '_crossover';
            });
          }
        });
        var individuals = [{genotype: 'abc'}, {genotype: 'abc'}];
        var newIndividuals = lodash.clone(individuals, true);
        environment._crossover(newIndividuals, function(error) {
          expect(error).not.toEqual(jasmine.anything());
          newIndividuals.forEach(function(individual) {
            expect(individual.genotype).toBe('abc_crossover');
            done();
          });
        });
      });

      it('should have error', function(done) {
        var environment = new Environment({
          fitnessSync: function(individual) { return 0; },
          mutateSync: function(individual) {},
          crossoverSync: function(individuals) {
            throw new Error('something bad happened');
          }
        });
        var individuals = [{genotype: 'abc'}, {genotype: 'abc'}];
        var newIndividuals = lodash.clone(individuals, true);
        environment._crossover(newIndividuals, function(error) {
          expect(error).toEqual(jasmine.anything());
          done();
        });

      });

    }); // End crossoverSync

    define('crossover', function() {

      it('should perform crossover when defined', function(done) {
        var environment = new Environment({
          fitnessSync: function(individual) { return 0; },
          mutateSync: function(individual) {},
          crossover: function(individuals, callback) {
            individuals.forEach(function(individual) {
              individual.genotype += '_crossover';
            });
            callback();
          }
        });
        var individuals = [{genotype: 'abc'}, {genotype: 'abc'}];
        var newIndividuals = lodash.clone(individuals, true);
        environment._crossover(newIndividuals, function(error) {
          expect(error).not.toEqual(jasmine.anything());
          newIndividuals.forEach(function(individual) {
            expect(individual.genotype).toBe('abc_crossover');
          });
          done();
        });
      });

      it('should have error', function(done) {
        var environment = new Environment({
          fitnessSync: function(individual) { return 0; },
          mutateSync: function(individual) {},
          crossover: function(individuals, callback) {
            callback(new Error('something bad happened'));
          }
        });
        var individuals = [{genotype: 'abc'}, {genotype: 'abc'}];
        var newIndividuals = lodash.clone(individuals, true);
        environment._crossover(newIndividuals, function(error) {
          expect(error).toEqual(jasmine.anything());
          done();
        });
      });

    }); // End crossover


  }); // End _crossover

  /////////////
  // _mutate //
  /////////////

  describe('_mutate', function() {

    describe('mutate', function() {

      it('should execute mutate callback on all given individuals', function(done) {
        var environment = new Environment({
          fitnessSync: function(individual) { return 0; },
          mutate: function(individual, callback) {
            individual.genotype += '_mutation';
            callback();
          }
        });
        var individuals = [];
        for (var c=0; c<10; c++) {
          individuals.push({ genotype: 'genotype' });
        }
        var mutatedIndividuals = lodash.clone(individuals, true);
        environment._mutate(mutatedIndividuals, function(error) {
          expect(error).not.toEqual(jasmine.anything());
          mutatedIndividuals.forEach(function(individual) {
            expect(individual.genotype).toEqual('genotype_mutation');
          });
          done();
        });
      });

      it('should have an error', function(done) {
        var environment = new Environment({
          fitness: function(individual, callback) { callback(null, 0); },
          mutate: function(individual, callback) { callback(new Error('something bad happened')); }
        });
        var individuals = [];
        for (var c=0; c<10; c++) {
          individuals.push({ genotype: 'genotype' });
        }
        var mutatedIndividuals = lodash.clone(individuals, true);
        environment._mutate(mutatedIndividuals, function(error) {
          expect(error).toEqual(jasmine.anything());
          done();
        });
      });

    }); // End mutate

    describe('mutateSync', function() {

      it('should execute mutate callback on all given individuals', function(done) {
        var environment = new Environment({
          fitnessSync: function(individual) { return 0; },
          mutateSync: function(individual) {
            return individual.genotype += '_mutation';
          }
        });
        var individuals = [];
        for (var c=0; c<10; c++) {
          individuals.push({ genotype: 'genotype' });
        }
        var mutatedIndividuals = lodash.clone(individuals, true);
        environment._mutate(mutatedIndividuals, function(error) {
          expect(error).not.toEqual(jasmine.anything());
          mutatedIndividuals.forEach(function(individual) {
            expect(individual.genotype).toEqual('genotype_mutation');
          });
          done();
        });
      });

      it('should have an error', function(done) {
        var environment = new Environment({
          fitness: function(individual, callback) { callback(null, 0); },
          mutateSync: function(individual) { throw new Error('something bad happened'); }
        });
        var individuals = [];
        for (var c=0; c<10; c++) {
          individuals.push({ genotype: 'genotype' });
        }
        var mutatedIndividuals = lodash.clone(individuals, true);
        environment._mutate(mutatedIndividuals, function(error) {
          expect(error).toEqual(jasmine.anything());
          done();
        });
      });

    }); // End mutateSync


  }); // End _mutate

  ///////////////////////
  // _spawnIndividuals //
  ///////////////////////

  describe('_spawnIndividuals', function() {

    it('should add all individuals', function() {
      var environment = new Environment({
        populationSize: 5,
        fitnessSync: function(individual) { return 0; },
        mutateSync: function(individual) {}
      });
      environment.population = [
        { genotype: 'abc' }, { genotype: 'abc' }
      ];
      var individuals = [
        { genotype: 'xyz' }, { genotype: 'xyz' }
      ];
      environment._spawnIndividuals(individuals);
      expect(environment.population.length).toBe(4);
    });

    it('should not add more than population supports', function() {
      var environment = new Environment({
        populationSize: 5,
        fitnessSync: function(individual) { return 0; },
        mutateSync: function(individual) {}
      });
      environment.population = [
        { genotype: 'abc' }, { genotype: 'abc' }, { genotype: 'abc' }
      ];
      var individuals = [
        { genotype: 'xyz' }, { genotype: 'xyz' }, { genotype: 'xyz' }
      ];
      environment._spawnIndividuals(individuals);
      expect(environment.population.length).toBe(5);

    });

  }); // End _spawnIndividuals

  //////////////////////////////
  // _sortPopulationByFitness //
  //////////////////////////////

  describe('_sortPopulationByFitness', function() {

    describe('fitnessSync', function() {

      it('should sort by fitness, descending', function(done) {
        var environment = new Environment({
          fitnessSync: function(individual) { return individual; },
          mutateSync: function(individual) {}
        });
        environment.population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        environment._sortPopulationByFitness(function(error) {
          expect(error).not.toEqual(jasmine.anything());
          expect(environment.population.length).toBe(10);
          expect(environment.population).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
          done();
        });
      });

      it('should have an error', function(done) {
        var environment = new Environment({
          fitnessSync: function(individual) { throw new Error('something bad happened'); },
          mutateSync: function(individual) {}
        });
        environment.population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        environment._sortPopulationByFitness(function(error) {
          expect(error).toEqual(jasmine.anything());
          done();
        });
      });

    });

    describe('fitness', function() {

      it('should sort by fitness, descending', function(done) {
        var environment = new Environment({
          fitness: function(individual, callback) { callback(null, individual); },
          mutateSync: function(individual) {}
        });
        environment.population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        environment._sortPopulationByFitness(function(error) {
          expect(error).not.toEqual(jasmine.anything());
          expect(environment.population.length).toBe(10);
          expect(environment.population).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
          done();
        });
      });

      it('should have an error', function(done) {
        var environment = new Environment({
          fitness: function(individual, callback) { callback(new Error('something bad happened')); },
          mutateSync: function(individual) {}
        });
        environment.population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        environment._sortPopulationByFitness(function(error) {
          expect(error).toEqual(jasmine.anything());
          done();
        });
      });

    });

  }); // End _sortPopulationByFitness

  /////////////////
  // _generation //
  /////////////////

  describe('_generation', function() {

    describe('generation', function() {

      it('should continue generations', function(done) {
        var environment = new Environment({
          fitness: function(individual, callback) { callback(null, individual); },
          mutate: function(individual, callback) { callback(); },
          generation: function(individuals, callback) {
            callback(null, true);
          }
        });
        environment._generation(0, function(error, shouldContinue) {
          expect(error).not.toEqual(jasmine.anything());
          expect(shouldContinue).toBe(true);
          done();
        });
      });

      it('should not continue generations', function(done) {
        var environment = new Environment({
          fitness: function(individual, callback) { callback(null, individual); },
          mutate: function(individual, callback) { callback(); },
          generation: function(individuals, callback) {
            callback(null, false);
          }
        });
        environment._generation(0, function(error, shouldContinue) {
          expect(error).not.toEqual(jasmine.anything());
          expect(shouldContinue).toBe(false);
          done();
        });
      });

      it('should have an error', function(done) {
        var environment = new Environment({
          fitness: function(individual, callback) { callback(null, individual); },
          mutate: function(individual, callback) { callback(); },
          generation: function(individuals, callback) {
            callback(new Error('something bad happened'));
          }
        });
        environment._generation(0, function(error, shouldContinue) {
          expect(error).toEqual(jasmine.anything());
          done();
        });
      });

      it('should translate no return value as true', function(done) {
        var environment = new Environment({
          fitness: function(individual, callback) { callback(null, individual); },
          mutate: function(individual, callback) { callback(); },
          generation: function(individuals, callback) {
            callback();
          }
        });
        environment._generation(0, function(error, shouldContinue) {
          expect(error).not.toEqual(jasmine.anything());
          expect(shouldContinue).toBe(true);
          done();
        });
      });

    }); // End generation

    describe('generationSync', function() {

      it('should continue generations', function(done) {
        var environment = new Environment({
          fitness: function(individual, callback) { callback(null, individual); },
          mutate: function(individual, callback) { callback(); },
          generationSync: function(individuals) {
            return true;
          }
        });
        environment._generation(0, function(error, shouldContinue) {
          expect(error).not.toEqual(jasmine.anything());
          expect(shouldContinue).toBe(true);
          done();
        });
      });

      it('should not continue generations', function(done) {
        var environment = new Environment({
          fitness: function(individual, callback) { callback(null, individual); },
          mutate: function(individual, callback) { callback(); },
          generationSync: function(individuals) {
            return false;
          }
        });
        environment._generation(0, function(error, shouldContinue) {
          expect(error).not.toEqual(jasmine.anything());
          expect(shouldContinue).toBe(false);
          done();
        });
      });

      it('should have an error', function(done) {
        var environment = new Environment({
          fitness: function(individual, callback) { callback(null, individual); },
          mutate: function(individual, callback) { callback(); },
          generationSync: function(individuals) {
            throw new Error('something bad happened');
          }
        });
        environment._generation(0, function(error, shouldContinue) {
          expect(error).toEqual(jasmine.anything());
          done();
        });
      });

      it('should translate no return value as true', function(done) {
        var environment = new Environment({
          fitness: function(individual, callback) { callback(null, individual); },
          mutate: function(individual, callback) { callback(); },
          generationSync: function(individuals) {}
        });
        environment._generation(0, function(error, shouldContinue) {
          expect(error).not.toEqual(jasmine.anything());
          expect(shouldContinue).toBe(true);
          done();
        });
      });

    }); // End generationSync

  }); // End _generation

  ///////////
  // .seed //
  ///////////

  describe('.seed', function() {

    it('should mutate all individuals once per generation', function(done) {
      var mutateCalls = 0;
      var fitnessCalls = 0;
      var generationCalls = 0;
      var environment = new Environment({
        numberOfGenerations: 10,
        populationSize: 10,
        fitnessSync: function(individual) {
          fitnessCalls++;
          return 0;
        },
        mutateSync: function(individual) {
          mutateCalls++;
        },
        generationSync: function(generation) {
          generationCalls++;
        }
      });
      environment.seed({genotype: 'corey'}, function(error) {
        expect(error).not.toEqual(jasmine.anything);
        expect(environment.population.length).toBe(10);
        expect(mutateCalls).toBe(100);
        expect(fitnessCalls).toBe(100);
        expect(generationCalls).toBe(10);
        done();
      });
    });

    it('should run without optional callbacks', function(done) {
      var environment = new Environment({
        numberOfGenerations: 10,
        populationSize: 10,
        fitnessSync: function(individual) { return 0; },
        mutateSync: function(individual) {}
      });
      environment.seed({genotype: 'corey'}, function(error) {
        expect(error).not.toEqual(jasmine.anything());
        expect(environment.population.length).toBe(10);
        done();
      });
    });

    it('should have an error with `fitnessSync` function', function(done) {
      var environment = new Environment({
        numberOfGenerations: 10,
        populationSize: 10,
        fitnessSync: function(individual) { throw new Error('something bad happened'); },
        mutateSync: function(individual) {}
      });
      environment.seed({genotype: 'corey'}, function(error) {
        expect(error).toEqual(jasmine.anything());
        done();
      });
    });

    it('should have an error with `mutateSync` function', function(done) {
      var environment = new Environment({
        numberOfGenerations: 10,
        populationSize: 10,
        fitnessSync: function(individual) { return 0; },
        mutateSync: function(individual) { throw new Error('something bad happened'); }
      });
      environment.seed({genotype: 'corey'}, function(error) {
        expect(error).toEqual(jasmine.anything());
        done();
      });
    });

    it('should throw error when individual is not object literal', function() {
      var environment = new Environment({
        fitness: function(individual, callback) { callback(null, 0); },
        mutate: function(individual, callback) { callback(); }
      });
      function Individual() {}
      var individual = new Individual();
      environment.seed(individual, function(error) {
        expect(error).toMatch(/Illegal argument.*individual/);
      });
      var AnonymousIndividual = function() {};
      var anonymousIndividual = new AnonymousIndividual();
      environment.seed(anonymousIndividual, function(error) {
        expect(error).toMatch(/Illegal argument.*individual/);
      });
    });

  }); // End .seed

}); // End Environment