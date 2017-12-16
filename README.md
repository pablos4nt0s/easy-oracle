# easy-oracle [![Build Status](https://travis-ci.org/sorocred/easy-oracle.svg?branch=master)](https://travis-ci.org/sorocred/easy-oracle)

A simplified API for faster development using capabilities of [oracledb](https://www.npmjs.com/package/oracledb).

Write with ES6 in order to have compatibility with all node versions.

```js
var easyoracle = require('easy-oracle')

var p1 = 10;
var p2 = 'my-variable';

var result = easyoracle.query(` SELECT * FROM TABLE WHERE COLUMN_1 = :p1 AND COLUMN_2 = :p2 `, [p1, p2]);
```

## Installation

In order to use this library, just run the following npm install command:

```bash
$ npm install --save easy-oracle
```

## Examples

To view the examples, clone the repo and install the dependencies:

```js
$ git clone git://github.com/sorocred/easy-oracle.git
$ cd easy-oracle
$ npm install
```

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm run test
```

## People

The current lead maintainer is [Pablo Souza](https://github.com/rectius)

[List of all contributors](https://github.com/sorocred/easy-oracle/graphs/contributors)

## License

[Apache 2](LICENSE)
