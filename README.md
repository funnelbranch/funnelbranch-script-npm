# Funnelbranch NPM Script Wrapper

This is the official source code repository for the NPM [`funnelbranch.js`](https://github.com/funnelbranch/funnelbranch-script) script wrapper, made suitable for SPA frameworks like React and Angular.

For more information, please visit [www.funnelbranch.com](www.funnelbranch.com).

## Installation

Install the NPM package via `yarn` or `npm`.

```
yarn add @funnelbranch/funnelbranch

npm install @funnelbranch/funnelbranch
```

## Usage

Check the following code sample on how to load the `funnelbranch.js` script.

```ts
import { Funnelbranch } from '@funnelbranch/funnelbranch';

Funnelbranch.initialize('<PROJECT_ID'>)
  .then(funnelbranch => {
    console.log('Funnelbranch initialized');
  });
```

For more information on the exact Funnelbranch API, as well as various initialization options,
please refer to the [Funnelbranch Script](https://github.com/funnelbranch/funnelbranch-script) source code repository.
