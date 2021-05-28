// https://astexplorer.net/#/gist/7598ca87108e752f21bee9bffbd58ec2/149bbcbeebac06f6dd2290d75e775ec44578694c
/*
 * References:
 * https://ottonova.tech/why-we-switched-from-moment-js-to-day-js/
 * https://medium.datadriveninvestor.com/https-medium-com-sabesan96-why-you-should-choose-day-js-instead-of-moment-js-9cf7bb274bbd
 */

const { getParser } = require('codemod-cli').jscodeshift;
//const { getOptions } = require('codemod-cli');

const unitsMap = {
  years: 'year',
  days: 'day',
};

// change diff units to singular form
function toSingularUnits(root, j, methodName) {
  root.find(j.CallExpression, { callee: { property: { name: methodName } } }).forEach((node) => {
    const diffArgs = node.value.arguments;
    if (diffArgs.length > 1) {
      diffArgs[1].value = unitsMap[diffArgs[1].value] || diffArgs[1].value;
    }
  });
}

module.exports = function transformer(file, api) {
  const j = getParser(api);
  //const options = getOptions();

  // Change moment() to dayjs()
  const root = j(file.source);

  root.find(j.CallExpression, { callee: { name: 'moment' } }).forEach((path) => {
    path.value.callee.name = 'dayjs';
  });

  toSingularUnits(root, j, 'diff');
  toSingularUnits(root, j, 'add');
  toSingularUnits(root, j, 'subtract');

  // change seconds() to second() / set('second')
  root.find(j.CallExpression, { callee: { property: { name: 'seconds' } } }).forEach((node) => {
    if (node.value.arguments.length > 0) {
      const [seconds] = node.value.arguments;

      const newStatement = j.expressionStatement(
        j.callExpression(
          j.memberExpression(
            j.callExpression(j.identifier('dayjs'), []),
            j.identifier('set'),
            false
          ),
          [j.literal('second'), j.literal(seconds.value)]
        )
      );

      node.parent.replace(newStatement);
    } else {
      node.value.callee.property.name = 'second';
    }
  });

  // change hours() to hour() / set('hour')
  root.find(j.CallExpression, { callee: { property: { name: 'hours' } } }).forEach((node) => {
    if (node.value.arguments.length > 0) {
      const [hours] = node.value.arguments;

      const newStatement = j.expressionStatement(
        j.callExpression(
          j.memberExpression(
            j.callExpression(j.identifier('dayjs'), []),
            j.identifier('set'),
            false
          ),
          [j.literal('hour'), hours]
        )
      );

      node.parent.replace(newStatement);
    } else {
      node.value.callee.property.name = 'hour';
    }
  });

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

  return root.toSource({ quote: 'single' });
};

module.exports.type = 'js';
