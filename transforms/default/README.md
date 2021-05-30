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
* [dayofyear](#dayofyear)
* [format](#format)
* [is-between](#is-between)
* [isLeapYear](#isLeapYear)
* [isoWeeksInYear](#isoWeeksInYear)
* [minmax](#minmax)
* [relativetime](#relativetime)
* [utc-with-imports](#utc-with-imports)
* [weekOfYear](#weekOfYear)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/default/__testfixtures__/basic.input.js)</small>):
```js
import moment from 'moment';

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

moment.isDate(new Date());

```

**Output** (<small>[basic.output.js](transforms/default/__testfixtures__/basic.output.js)</small>):
```js
import dayjs from 'dayjs';

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

dayjs(new Date()).isValid();

```
---
<a id="dayofyear">**dayofyear**</a>

**Input** (<small>[dayofyear.input.js](transforms/default/__testfixtures__/dayofyear.input.js)</small>):
```js
import moment from 'moment';
moment().dayOfYear();
moment().dayOfYear(277);

```

**Output** (<small>[dayofyear.output.js](transforms/default/__testfixtures__/dayofyear.output.js)</small>):
```js
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
dayjs.extend(dayOfYear);
dayjs().dayOfYear();
dayjs().dayOfYear(277);

```
---
<a id="format">**format**</a>

**Input** (<small>[format.input.js](transforms/default/__testfixtures__/format.input.js)</small>):
```js
import moment from 'moment';

moment().format('dddd, MMMM Do YYYY, h:mm:ss A');
moment().format('ddd, hA');

```

**Output** (<small>[format.output.js](transforms/default/__testfixtures__/format.output.js)</small>):
```js
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

dayjs().format('dddd, MMMM Do YYYY, h:mm:ss A');
dayjs().format('ddd, hA');

```
---
<a id="is-between">**is-between**</a>

**Input** (<small>[is-between.input.js](transforms/default/__testfixtures__/is-between.input.js)</small>):
```js
import moment from 'moment';

moment('2019–10–05').isBetween('2019–10–04', '2019–10–06');

```

**Output** (<small>[is-between.output.js](transforms/default/__testfixtures__/is-between.output.js)</small>):
```js
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

dayjs('2019–10–05').isBetween('2019–10–04', '2019–10–06');

```
---
<a id="isLeapYear">**isLeapYear**</a>

**Input** (<small>[isLeapYear.input.js](transforms/default/__testfixtures__/isLeapYear.input.js)</small>):
```js
import moment from 'moment';

moment([2020]).isLeapYear();

```

**Output** (<small>[isLeapYear.output.js](transforms/default/__testfixtures__/isLeapYear.output.js)</small>):
```js
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
dayjs.extend(isLeapYear);

dayjs([2020]).isLeapYear();

```
---
<a id="isoWeeksInYear">**isoWeeksInYear**</a>

**Input** (<small>[isoWeeksInYear.input.js](transforms/default/__testfixtures__/isoWeeksInYear.input.js)</small>):
```js
import moment from 'moment';
moment().isoWeeksInYear();

```

**Output** (<small>[isoWeeksInYear.output.js](transforms/default/__testfixtures__/isoWeeksInYear.output.js)</small>):
```js
import dayjs from 'dayjs';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
dayjs.extend(isoWeeksInYear);
dayjs().isoWeeksInYear();

```
---
<a id="minmax">**minmax**</a>

**Input** (<small>[minmax.input.js](transforms/default/__testfixtures__/minmax.input.js)</small>):
```js
import moment from 'moment';

const array = [
  new Date(1996, 10, 06),
  new Date(1994, 6, 18),
  new Date(1993, 5, 25),
  new Date(1959, 10, 4),
];

moment.max(array.map((a) => moment(a)));
moment.min(array.map((a) => moment(a)));

```

**Output** (<small>[minmax.output.js](transforms/default/__testfixtures__/minmax.output.js)</small>):
```js
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
dayjs.extend(minMax);

const array = [
  new Date(1996, 10, 06),
  new Date(1994, 6, 18),
  new Date(1993, 5, 25),
  new Date(1959, 10, 4),
];

dayjs.max(array.map((a) => dayjs(a)));
dayjs.min(array.map((a) => dayjs(a)));

```
---
<a id="relativetime">**relativetime**</a>

**Input** (<small>[relativetime.input.js](transforms/default/__testfixtures__/relativetime.input.js)</small>):
```js
import moment from 'moment';

const a = moment('2000-01-01');
moment(1568751159000).fromNow();
moment(1568751159000).from(a);
moment(1568751159000).to(a);
moment(1568751159000).toNow();

```

**Output** (<small>[relativetime.output.js](transforms/default/__testfixtures__/relativetime.output.js)</small>):
```js
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const a = dayjs('2000-01-01');
dayjs(1568751159000).fromNow();
dayjs(1568751159000).from(a);
dayjs(1568751159000).to(a);
dayjs(1568751159000).toNow();

```
---
<a id="utc-with-imports">**utc-with-imports**</a>

**Input** (<small>[utc-with-imports.input.js](transforms/default/__testfixtures__/utc-with-imports.input.js)</small>):
```js
import moment from 'moment';

moment('2019-07-12T15:37:01+02:00').utc().format();

```

**Output** (<small>[utc-with-imports.output.js](transforms/default/__testfixtures__/utc-with-imports.output.js)</small>):
```js
import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs-plugin-utc';
dayjs.extend(dayjsPluginUTC);

dayjs('2019-07-12T15:37:01+02:00').utc().format();

```
---
<a id="weekOfYear">**weekOfYear**</a>

**Input** (<small>[weekOfYear.input.js](transforms/default/__testfixtures__/weekOfYear.input.js)</small>):
```js
import moment from 'moment';

moment().week();
moment().week(41);

```

**Output** (<small>[weekOfYear.output.js](transforms/default/__testfixtures__/weekOfYear.output.js)</small>):
```js
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);

dayjs().week();
dayjs().week(41);

```
<!--FIXTURES_CONTENT_END-->