# moment-dayjs-codemod


A collection of codemods for moment-dayjs-codemod.

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