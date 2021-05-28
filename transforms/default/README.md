# default


## Usage

```
npx moment-dayjs-codemod default path/of/files/ or/some**/*glob.js

# or

yarn global add moment-dayjs-codemod
moment-dayjs-codemod default path/of/files/ or/some**/*glob.js
```

## Local Usage
```
node ./bin/cli.js default path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/default/__testfixtures__/basic.input.js)</small>):
```js
const now = moment();
const day = moment('2021-05-28');

const date1 = moment('2019-07-11');
const date2 = moment('2019-07-10');
date1.diff(date2, 'years');
date1.diff(date2, 'days');

moment().seconds();
moment().seconds(30);

moment().hours();
moment().hours(13);

moment().date();
moment().date(6);

moment().day();
moment().day(-14);

moment().add(7, 'days');
moment().subtract(7, 'days');

```

**Output** (<small>[basic.output.js](transforms/default/__testfixtures__/basic.output.js)</small>):
```js
const now = dayjs();
const day = dayjs('2021-05-28');

const date1 = dayjs('2019-07-11');
const date2 = dayjs('2019-07-10');
date1.diff(date2, 'year');
date1.diff(date2, 'day');

dayjs().second();
dayjs().set('second', 30);

dayjs().hour();
dayjs().set('hour', 13);

dayjs().date();
dayjs().set('date', 6);

dayjs().day();
dayjs().set('day', -14);

dayjs().add(7, 'day');
dayjs().subtract(7, 'day');

```
<!--FIXTURES_CONTENT_END-->