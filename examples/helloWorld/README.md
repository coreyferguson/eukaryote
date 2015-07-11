
# Example - Hello Evolution

## Usage

Start the node shell by simply executing:

```bash
node
```

And then...

```javascript
var HelloWorld = require('./examples/helloWorld');
var helloWorld = new HelloWorld();
helloWorld.seed();
```

## Constructor

```javascript
new HelloWorld(options);
```

### Options

#### targetMessage

String message with highest possible fitness value. Used to calculate fitness score of evolving genotype. Default value is `Hello world!`.

#### probabilities

Name | Type | Description
---- | ---- | -----------
mutateExistingGene | Float `0 >= f < 1` | Chance of mutation on each gene (not individual).
newGene | Float `0 >= f < 1` | Chance of creating new gene and inserting randomly into genotype.
removeGene | Float `0 >= f < 1` | Chance of removing a random gene from genotype.

#### logging

Default is true. Can disable for things like unit tests.
