var Eukaryote = require('../src/eukaryote.js')
var eukaryote = new Eukaryote()

module.exports = {
	test1: function(test) {
		var sum = eukaryote.add(1, 2)
		test.ok(sum === 3, 'some failure message?')
		test.done()
	}
}

