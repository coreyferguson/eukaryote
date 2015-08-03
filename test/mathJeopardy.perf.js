var MathJeopardy = require('../examples/mathJeopardy/mathJeopardy.js');

var mathJeopardy;

module.exports = {

	setUp: function(callback) {
		mathJeopardy = new MathJeopardy({
			logging: false,
			target: 1234.25,
			quitWhenSolutionFound: false
		});
		callback();
	},

	fitness: function(test) {
		var before = new Date().getTime();
		var individual = {
			genotype: '4***-*5--+7/-/+93*725/23944*6+7**43+1-7/477719*-175/***/-*15*5+*/-+1*1'
		};
		for (var c=0; c<1500; c++) {
			mathJeopardy.fitness(individual);
		}
		var after = new Date().getTime();
		var diff = after - before;
		test.ok(diff <= 1000, 'expected 1 second or less, actual time in ms: ' + diff);
		test.done();
	}

};
