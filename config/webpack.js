
module.exports = {
  amd: {
    entry: "./src/eukaryote.js",
    output: {
      filename: "./dist/eukaryote-amd.js",
      libraryTarget: 'amd'
    }
  },
  this: {
    entry: "./src/eukaryote.js",
    output: {
      filename: "./dist/eukaryote-this.js",
      library: 'Eukaryote',
      libraryTarget: 'this'
    }
  }
};
