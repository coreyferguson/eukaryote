
var Eukaryote = require('../../src/eukaryote');

describe('Eukaryote', function() {

	it('should not throw error on valid constructor options', function() {
		var eukaryote = new Eukaryote({
			callbacks: {
				fitness: function(individual) { return 0; },
				mutate: function(individual) {}
			}
		});
	});

	it('should throw error when constructor missing required options', function() {
		expect(function() {
			var eukaryote = new Eukaryote();
		}).toThrowError(/Illegal argument/);
	});

	it('should throw error when fitness function not provided', function() {
		expect(function() {
			var eukaryote = new Eukaryote({
				callbacks: {
					mutate: function(individual) {}
				}
			});
		}).toThrowError(/Illegal argument.*fitness/);
	});

	it('should throw error when mutate function not provided', function() {
		expect(function() {
			var eukaryote = new Eukaryote({
				callbacks: {
					fitness: function(individual) { return 0; }
				}
			});
		}).toThrowError(/Illegal argument.*mutate/);
	});

	it('should throw error when config is not an object', function() {
		expect(function() {
			var eukaryote = new Eukaryote({
				config: 'asdf',
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				}
			});
		}).toThrowError(/Illegal argument.*config/);
	});

	it('should throw error when populationSize is not an integer', function() {
		expect(function() {
			var eukaryote = new Eukaryote({
				config: {
					populationSize: 'not an integer'
				},
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				}
			});
		}).toThrowError(/Illegal argument.*config\.populationSize/);
	});

	it('should throw error when populationSize < 2', function() {
		expect(function() {
			var eukaryote = new Eukaryote({
				config: {
					populationSize: 1
				},
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				}
			});
		}).toThrowError(/Illegal argument.*config\.populationSize/);
		expect(function() {
			var eukaryote = new Eukaryote({
				config: {
					populationSize: -5
				},
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				}
			});
		}).toThrowError(/Illegal argument.*config\.populationSize/);
	});

	it('should throw error when numberOfGenerations is not an integer', function() {
		expect(function() {
			var eukaryote = new Eukaryote({
				config: {
					numberOfGenerations: 'not an integer'
				},
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				}
			});
		}).toThrowError(/Illegal argument.*config\.numberOfGenerations/);
	});

	it('should throw error when numberOfGenerations < 1', function() {
		expect(function() {
			var eukaryote = new Eukaryote({
				config: {
					numberOfGenerations: 0
				},
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				}
			});
		}).toThrowError(/Illegal argument.*config\.numberOfGenerations/);
		expect(function() {
			var eukaryote = new Eukaryote({
				config: {
					numberOfGenerations: -1
				},
				callbacks: {
					fitness: function(individual) { return 0; },
					mutate: function(individual) {}
				}
			});
		}).toThrowError(/Illegal argument.*config\.numberOfGenerations/);
	});

});