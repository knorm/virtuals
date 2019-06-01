# @knorm/field-name-to-column-name

[![npm version](https://badge.fury.io/js/%40knorm%2Ffield-name-to-column-name.svg)](https://badge.fury.io/js/%40knorm%2Fhttps://travis-ci.org/knorm)
[![build status](https://travis-ci.org/knorm/field-name-to-column-name.svg?branch=master)](https://travis-ci.org/knorm/field-name-to-column-name)
[![coverage status](https://coveralls.io/repos/github/knorm/field-name-to-column-name/badge.svg?branch=master)](https://coveralls.io/github/knorm/field-name-to-column-name?branch=master)
[![dependency status](https://david-dm.org/knorm/field-name-to-column-name.svg)](https://david-dm.org/knorm/field-name-to-column-name)

Plugin for [@knorm/knorm](https://www.npmjs.com/package/@knorm/knorm) that helps
generate column names from field names.

## Installation

```bash
npm install --save @knorm/knorm @knorm/field-name-to-column-name
```

> @knorm/field-name-to-column-name has a peer dependency on
> [@knorm/knorm](https://www.npmjs.com/package/@knorm/knorm)

## Usage

```js
const knorm = require('@knorm/knorm');
const knormFieldNameToColumnName = require('@knorm/field-name-to-column-name');

const orm = knorm({
  // @knorm/knorm options
}).use(
  knormFieldNameToColumnName({
    // @knorm/field-name-to-column-name options
  })
);
```

## Options

| Option                | Type     | Default                     | Description                                                                                                                                                                                                                             |
| --------------------- | -------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                  | string   | `field-name-to-column-name` | The name of the plugin, allows accessing the plugin instance via Knorm's plugin registry                                                                                                                                                |
| fieldNameToColumnName | function | `undefined`                 | The function to return a field's column-name. This function is called with the field's config object as the first parameter and the field's model class as the second. It should return a string, representing the field's column name. |

**NOTE:** If the field config already has a `column` set, it is not overwritten
and `fieldNameToColumnName` is not called.

For example:

```js
const { snakeCase } = require('lodash');
orm.use(knormFieldNameToColumnName({
  fieldNameToColumnName: ({ name }) => snakeCase(name)
}));
```
