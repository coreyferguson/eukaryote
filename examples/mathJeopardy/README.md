
# Example - Math Jeopardy

*If you haven't yet looked at the [Hello World!](../helloWorld/README.md) example, it is recommended you start with the [Tutorial](../TUTORIAL.md)*

## Usage

Start the node shell by simply executing:

```bash
node
```

And then...

```javascript
var MathJeopardy = require('./examples/mathJeopardy');
var mathJeopardy = new MathJeopardy();
mathJeopardy.seed();
```

## Constructor

```javascript
new MathJeopardy(options);
```

### Options

#### target

Float (although integers work best) to which output calculation will equal. Used to calculate fitness score of evolving genotype. Default value is `9.5`.

#### probabilities

Name | Type | Description
---- | ---- | -----------
mutateExistingGene | Float `0 >= f <= 1` | Chance of mutation on each gene (not individual).
newGene | Float `0 >= f <= 1` | Chance of creating new gene and inserting randomly into genotype.
removeGene | Float `0 >= f <= 1` | Chance of removing a random gene from genotype.

#### logging

Default is true. Can disable for things like unit tests.
