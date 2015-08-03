var MathJeopardy = require('./mathJeopardy');
var mathJeopardy = new MathJeopardy({
	target: process.argv[2] || 100
});
var fittestIndividual = mathJeopardy.seed();
module.exports = fittestIndividual;
