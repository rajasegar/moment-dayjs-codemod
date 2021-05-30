const { getParser } = require('codemod-cli').jscodeshift;
//const { getOptions } = require('codemod-cli');

const { toSingularUnits, transformUTC, transformGetSet, addPluginAndExtend } = require('./utils');

module.exports = function transformer(file, api) {
  const j = getParser(api);
  //const options = getOptions();

  const root = j(file.source);

  // Change imports
  root
    .find(j.ImportDeclaration, {
      source: {
        value: 'moment',
      },
    })
    .replaceWith(() => {
      return j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier('dayjs'))],
        j.stringLiteral('dayjs')
      );
    });

  // Change moment() to dayjs()
  root.find(j.CallExpression, { callee: { name: 'moment' } }).forEach((path) => {
    path.value.callee.name = 'dayjs';
  });

  // Change moment.xyz() to dayjs.xyz()
  root.find(j.CallExpression, { callee: { object: { name: 'moment' } } }).forEach((path) => {
    path.value.callee.object.name = 'dayjs';
  });

  toSingularUnits(root, j, 'diff');
  toSingularUnits(root, j, 'add');
  toSingularUnits(root, j, 'subtract');

  // change seconds() to second() / set('second')
  transformGetSet(root, j, 'seconds');
  // change hours() to hour() / set('hour')
  transformGetSet(root, j, 'hours');

  // change date() to  set('date')
  root.find(j.CallExpression, { callee: { property: { name: 'date' } } }).forEach((node) => {
    if (node.value.arguments.length > 0) {
      const [date] = node.value.arguments;

      const newStatement = j.expressionStatement(
        j.callExpression(
          j.memberExpression(
            j.callExpression(j.identifier('dayjs'), []),
            j.identifier('set'),
            false
          ),
          [j.literal('date'), date]
        )
      );

      node.parent.replace(newStatement);
    }
  });

  // change day() to  set('day')
  root.find(j.CallExpression, { callee: { property: { name: 'day' } } }).forEach((node) => {
    if (node.value.arguments.length > 0) {
      const [day] = node.value.arguments;

      const newStatement = j.expressionStatement(
        j.callExpression(
          j.memberExpression(
            j.callExpression(j.identifier('dayjs'), []),
            j.identifier('set'),
            false
          ),
          [j.literal('day'), day]
        )
      );

      node.parent.replace(newStatement);
    }
  });

  // replace moment.isDate
  root
    .find(j.CallExpression, {
      callee: {
        object: {
          name: 'dayjs',
        },

        property: {
          name: 'isDate',
        },
      },
    })
    .replaceWith((path) => {
      return j.callExpression(
        j.memberExpression(
          j.callExpression(j.identifier('dayjs'), path.value.arguments),
          j.identifier('isValid'),
          false
        ),
        []
      );
    });

  transformUTC(root, j);

  // day of year
  const doyMethods = root.find(j.CallExpression, { callee: { property: { name: 'dayOfYear' } } });

  if (doyMethods.__paths.length > 0) {
    addPluginAndExtend(root, j, 'dayOfYear', 'dayjs/plugin/dayOfYear');
  }

  // week of year
  const woyMethods = root.find(j.CallExpression, { callee: { property: { name: 'week' } } });

  if (woyMethods.__paths.length > 0) {
    addPluginAndExtend(root, j, 'weekOfYear', 'dayjs/plugin/weekOfYear');
  }

  // isoWeeksInYear
  const isoWeeksInYear = root.find(j.CallExpression, {
    callee: { property: { name: 'isoWeeksInYear' } },
  });

  if (isoWeeksInYear.__paths.length > 0) {
    addPluginAndExtend(root, j, 'isoWeeksInYear', 'dayjs/plugin/isoWeeksInYear');
  }

  // min max
  const minMethods = root.find(j.CallExpression, {
    callee: {
      object: { name: 'dayjs' },
      property: { name: 'min' },
    },
  });

  const maxMethods = root.find(j.CallExpression, {
    callee: {
      object: { name: 'dayjs' },
      property: { name: 'max' },
    },
  });

  if (minMethods.__paths.length > 0 || maxMethods.__paths.length > 0) {
    addPluginAndExtend(root, j, 'minMax', 'dayjs/plugin/minMax');
  }

  // format
  const formatMethods = root.find(j.CallExpression, {
    callee: {
      object: { callee: { name: 'dayjs' } },
      property: { name: 'format' },
    },
  });

  if (formatMethods.__paths.length > 0) {
    addPluginAndExtend(root, j, 'customParseFormat', 'dayjs/plugin/customParseFormat');
  }

  // fromNow
  const fromNowMethods = root.find(j.CallExpression, {
    callee: {
      object: { callee: { name: 'dayjs' } },
      property: { name: 'fromNow' },
    },
  });

  const fromMethods = root.find(j.CallExpression, {
    callee: {
      object: { callee: { name: 'dayjs' } },
      property: { name: 'from' },
    },
  });

  const toMethods = root.find(j.CallExpression, {
    callee: {
      object: { callee: { name: 'dayjs' } },
      property: { name: 'to' },
    },
  });

  const toNowMethods = root.find(j.CallExpression, {
    callee: {
      object: { callee: { name: 'dayjs' } },
      property: { name: 'toNow' },
    },
  });

  if (
    fromNowMethods.__paths.length > 0 ||
    fromMethods.__paths.length > 0 ||
    toMethods.__paths.length > 0 ||
    toNowMethods.__paths.length > 0
  ) {
    addPluginAndExtend(root, j, 'relativeTime', 'dayjs/plugin/relativeTime');
  }

  // isBetween
  const isBetweenMethods = root.find(j.CallExpression, {
    callee: {
      object: { callee: { name: 'dayjs' } },
      property: { name: 'isBetween' },
    },
  });

  if (isBetweenMethods.__paths.length > 0) {
    addPluginAndExtend(root, j, 'isBetween', 'dayjs/plugin/isBetween');
  }

  // isLeapYear
  const isLeapYearMethods = root.find(j.CallExpression, {
    callee: {
      object: { callee: { name: 'dayjs' } },
      property: { name: 'isLeapYear' },
    },
  });

  if (isLeapYearMethods.__paths.length > 0) {
    addPluginAndExtend(root, j, 'isLeapYear', 'dayjs/plugin/isLeapYear');
  }

  // Return the modified code
  return root.toSource({ quote: 'single' });
};

module.exports.type = 'js';
