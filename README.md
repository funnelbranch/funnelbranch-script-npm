# Funnelbranch Script NPM

This is the official source code repository for the NPM [Funnelbranch script](https://github.com/funnelbranch/funnelbranch-script) wrapper, made suitable for SPA frameworks like React and Angular.

For more information, please visit [www.funnelbranch.com](https://www.funnelbranch.com).

## Installation

Install the NPM package via `yarn` or `npm`.

```
yarn add @funnelbranch/script

npm install @funnelbranch/script
```

## Usage

```ts
import { Funnelbranch } from '@funnelbranch/script';

Funnelbranch.initialize('<PROJECT_ID'>)
  .then(funnelbranch => {
    console.log('Funnelbranch initialized');
  });
```

For more information on the exact Funnelbranch API, as well as various initialization options,
please refer to the [Funnelbranch Script](https://github.com/funnelbranch/funnelbranch-script) source code repository.
