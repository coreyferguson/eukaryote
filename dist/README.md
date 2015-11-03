
# Distribution

## Summary

The files within can be used for distribution in various environments. Below are a summary of each available file.

## Files

### AMD

**eukaryote-amd.js:** Eukaryote encapsulated as a standalone AMD module.

Usage:

```javascript
require(['./eukaryote'], function(Eukaryote) {
	console.info('Eukaryote loaded:', Eukaryote);
});
```

See [AMD example](./example-amd.html).

**eukaryote-amd.min.js:** Uglified (minified) version of `eukaryote-amd.js`.

### this

**eukaryote-this.js:** Eukaryote placed on the `this` variable. When included in browser as script tag Eukaryote will be loaded on `this`, and `window`.

Usage:

```html
<script src='eukaryote-this.js'></script>
<script>
	console.info('Eukaryote loaded:', 
		Eukaryote, 
		this.Eukaryote, 
		window.Eukaryote);
</script>
```

See [this example](./example-this.html).

**eukaryote-this.js:** Uglified (minified) version of `eukaryote-this.js`.
