

- Use webpack to transpile to amd-es5 with sourcemaps in `build/` folder. Include these files in Karma. Take advantage of [externals](https://webpack.github.io/docs/configuration.html#externals) to require in files from `build/` folder.








# Eukaryote

## Install

```
git clone git@github.com:coreyferguson/eukaryote.git
cd eukaryote
npm install && bower install
```

## Usage

### Build and test in PhantomJS

```
grunt
```

### Continuous testing with Karma

```
grunt test:continuous
```

## Contribution

[View contribution documentation](CONTRIBUTE.md)
