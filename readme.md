# Broken Webpack Sass compilation test

This repository contains a minimal test case demonstrating how Sass bundles created with Webpack may be broken when using configuration to resolve dependencies installed using Bower.

This issue occurs due to the Sass `@import` being resolved to a JavaScript file:

```sh
Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):
ModuleBuildError: Module build failed (from ./node_modules/sass-loader/lib/loader.js):
Invalid CSS after "...
```

The underlying `node-sass` module is capable of resolving the Bower dependency itself so it is currently unclear to me why the addition of resolver configuration intended for JavaScript has an effect.


## Installation

After cloning this repository:

1. Run `npm install` to install of the required dependencies. This should also trigger a `bower install` step.
2. Build the test bundle with `npm run build` or `webpack`
3. Observe the errors
