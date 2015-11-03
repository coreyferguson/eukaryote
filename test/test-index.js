
// require all modules ending in "_test" from the
// current directory and all subdirectories
var testsContext = require.context(".", true, /-test$/);
testsContext.keys().forEach(testsContext);
