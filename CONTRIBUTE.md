
# Contribute

## Installation

```bash
git clone git@github.com:coreyferguson/eukaryote.git
cd eukaryote
npm install
```

## Build

To build the project, simply execute:

```bash
grunt
```

Some grunt tasks executed:

Task | Description
---- | -----------
clean | Clean old build files.
[JSHint][] | Validate JavaScript syntax.
test:single | Run integration tests within chrome and firefox using [Karma][].
[webpack][] | Build and bundle source files into [distribution][dist/] packages.
[JSDoc][] | Generates documentation from JSDoc written into source.
[sizediff][] | Compare distribution file sizes between feature change and `master` branch.

[JSHint]: http://jshint.com/about/ 
[Karma]: http://karma-runner.github.io/0.13/index.html
[webpack]: http://webpack.github.io/docs/what-is-webpack.html
[JSDoc]: http://usejsdoc.org/
[sizediff]: https://github.com/sindresorhus/grunt-sizediff

## Testing

**Integration tests** are automatically run with `grunt` command. In addition, some tasks can be manually executed for development purposes:

Task | Description
---- | -----------
`test:single` | Run integration tests once against chrome and firefox.
`test:continuous` | Watch source files for changes and automatically run integration tests.

**Code coverage** summary is seen at the end of `grunt` build. Line coverage can be seen in `coverage/coverage-html/index.html` after a `grunt` build.

## Documentation

Documentation is automatically generated from source files using [JSDoc][http://usejsdoc.org/]. It is compiled into [markdown](dist/api) and checked into git. It's also compiled into html (although not checked into git) and can be seen in `dist/api/index.html` after building with `grunt`.

## Release

- Verify build process: `grunt`.
- Bump the version with `grunt bump`.
- Push to github with `git push` and `git push --tags`.
- Push to npm with `npm publish`
