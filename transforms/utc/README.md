# utc


## Usage

```
npx moment-dayjs-codemod utc path/of/files/ or/some**/*glob.js

# or

yarn global add moment-dayjs-codemod
moment-dayjs-codemod utc path/of/files/ or/some**/*glob.js
```

## Local Usage
```
node ./bin/cli.js utc path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
* [utc-with-imports](#utc-with-imports)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/utc/__testfixtures__/basic.input.js)</small>):
```js
moment('2019-07-12T15:37:01+02:00').utc().format();

```

**Output** (<small>[basic.output.js](transforms/utc/__testfixtures__/basic.output.js)</small>):
```js
import dayjsPluginUTC from 'dayjs-plugin-utc';
dayjs.extend(dayjsPluginUTC);
dayjs('2019-07-12T15:37:01+02:00').utc().format();

```
---
<a id="utc-with-imports">**utc-with-imports**</a>

**Input** (<small>[utc-with-imports.input.js](transforms/utc/__testfixtures__/utc-with-imports.input.js)</small>):
```js
import moment from 'moment';

moment('2019-07-12T15:37:01+02:00').utc().format();

```

**Output** (<small>[utc-with-imports.output.js](transforms/utc/__testfixtures__/utc-with-imports.output.js)</small>):
```js
import moment from 'moment';

import dayjsPluginUTC from 'dayjs-plugin-utc';
dayjs.extend(dayjsPluginUTC);

dayjs('2019-07-12T15:37:01+02:00').utc().format();

```
<!--FIXTURES_CONTENT_END-->