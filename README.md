# moment-dayjs-codemod

![Build and Deploy](https://github.com/rajasegar/moment-dayjs-codemod/workflows/CI/badge.svg)
[![npm version](http://img.shields.io/npm/v/moment-dayjs-codemod.svg?style=flat)](https://npmjs.org/package/moment-dayjs-codemod "View this project on npm")

A collection of codemods for migrating from [moment.js](https://momentjs.com/) to [day.js](https://day.js.org/)

## Usage

To run a specific codemod from this project, you would run the following:

```
npx moment-dayjs-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js

# or

yarn global add moment-dayjs-codemod
moment-dayjs-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Local Usage
```
node ./bin/cli.js <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Transforms

<!--TRANSFORMS_START-->
* [default](transforms/default/README.md)
* [utc](transforms/utc/README.md)
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`
