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
          name: 'moment',
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

  const doyMethods = root.find(j.CallExpression, { callee: { property: { name: 'dayOfYear' } } });

  if (doyMethods.__paths.length > 0) {
    addPluginAndExtend(root, j, 'dayOfYear');
  }

  return root.toSource({ quote: 'single' });
};

module.exports.type = 'js';
