'use strict';

const unitsMap = {
  years: 'year',
  days: 'day',
  months: 'month',
  weeks: 'week',
  hours: 'hour',
  minutes: 'minute',
  seconds: 'second',
  milliseconds: 'millisecond',
};

const pluginMethods = [
  {
    method: 'fromNow',
    plugin: 'dayjs/plugin/relativeTime',
    importName: 'relativeTime',
    filter: filter('fromNow'),
  },
  {
    method: 'from',
    plugin: 'dayjs/plugin/relativeTime',
    importName: 'relativeTime',
    filter: filter('from'),
  },
  {
    method: 'toNow',
    plugin: 'dayjs/plugin/relativeTime',
    importName: 'relativeTime',
    filter: filter('toNow'),
  },
  {
    method: 'to',
    plugin: 'dayjs/plugin/relativeTime',
    importName: 'relativeTime',
    filter: filter('to'),
  },
  {
    method: 'isBetween',
    plugin: 'dayjs/plugin/isBetween',
    importName: 'isBetween',
    filter: filter('isBetween'),
  },
  {
    method: 'isLeapYear',
    plugin: 'dayjs/plugin/isLeapYear',
    importName: 'isLeapYear',
    filter: filter('isLeapYear'),
  },
  {
    method: 'format',
    plugin: 'dayjs/plugin/customParseFormat',
    importName: 'customParseFormat',
    filter: filter('format'),
  },
  {
    method: 'isoWeeksInYear',
    plugin: 'dayjs/plugin/isoWeeksInYear',
    importName: 'isoWeeksInYear',
    filter: filter('isoWeeksInYear'),
  },
  {
    method: 'min',
    plugin: 'dayjs/plugin/minMax',
    importName: 'minMax',
    filter: filterMinMax('min'),
  },
  {
    method: 'max',
    plugin: 'dayjs/plugin/minMax',
    importName: 'minMax',
    filter: filterMinMax('max'),
  },
  {
    method: 'week',
    plugin: 'dayjs/plugin/weekOfYear',
    importName: 'weekOfYear',
    filter: filter('week'),
  },
  {
    method: 'dayOfYear',
    plugin: 'dayjs/plugin/dayOfYear',
    importName: 'dayOfYear',
    filter: filter('dayOfYear'),
  },
];

function filter(method) {
  return {
    callee: {
      object: { callee: { name: 'dayjs' } },
      property: { name: method },
    },
  };
}

function filterMinMax(method) {
  return {
    callee: {
      object: { name: 'dayjs' },
      property: { name: method },
    },
  };
}

// change diff units to singular form
function toSingularUnits(root, j, methodName) {
  root.find(j.CallExpression, { callee: { property: { name: methodName } } }).forEach((node) => {
    const diffArgs = node.value.arguments;
    if (diffArgs.length > 1) {
      diffArgs[1].value = unitsMap[diffArgs[1].value] || diffArgs[1].value;
    }
  });
}

// change utc methods
function transformUTC(root, j) {
  const utcMethods = root.find(j.CallExpression, {
    callee: {
      object: {
        callee: {
          object: {
            callee: {
              name: 'dayjs',
            },
          },

          property: {
            name: 'utc',
          },
        },
      },

      property: {
        name: 'format',
      },
    },
  });

  //console.log(utcMethods);

  let body = root.get().value.program.body;

  if (utcMethods.__paths.length > 0) {
    const importDecl = j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier('dayjsPluginUTC'))],
      j.stringLiteral('dayjs-plugin-utc')
    );
    const extendStatement = j.expressionStatement(
      j.callExpression(j.memberExpression(j.identifier('dayjs'), j.identifier('extend'), false), [
        j.identifier('dayjsPluginUTC'),
      ])
    );

    let allImports = root.find(j.ImportDeclaration);
    let oldImport = allImports.find(j.ImportDefaultSpecifier, {
      local: { name: 'dayjsPluginUTC' },
    });
    if (oldImport.length === 0) {
      let lastImport = allImports.at(allImports.length - 1);
      if (lastImport.__paths.length > 0) {
        lastImport.insertAfter(extendStatement);
        lastImport.insertAfter(importDecl);
      } else {
        body.unshift(extendStatement);
        body.unshift(importDecl);
      }
    }
  }
}

function addPluginAndExtend(root, j, importName, plugin) {
  let body = root.get().value.program.body;
  const importDecl = j.importDeclaration(
    [j.importDefaultSpecifier(j.identifier(importName))],
    j.stringLiteral(plugin)
  );
  const extendStatement = j.expressionStatement(
    j.callExpression(j.memberExpression(j.identifier('dayjs'), j.identifier('extend'), false), [
      j.identifier(importName),
    ])
  );

  let allImports = root.find(j.ImportDeclaration);
  let oldImport = allImports.find(j.ImportDefaultSpecifier, {
    local: { name: importName },
  });
  if (oldImport.length === 0) {
    let lastImport = allImports.at(allImports.length - 1);
    if (lastImport.__paths.length > 0) {
      lastImport.insertAfter(extendStatement);
      lastImport.insertAfter(importDecl);
    } else {
      body.unshift(extendStatement);
      body.unshift(importDecl);
    }
  }
}

function transformGetSet(root, j, unit) {
  root.find(j.CallExpression, { callee: { property: { name: unit } } }).forEach((node) => {
    if (node.value.arguments.length > 0) {
      const [seconds] = node.value.arguments;

      const newStatement = j.expressionStatement(
        j.callExpression(
          j.memberExpression(
            j.callExpression(j.identifier('dayjs'), []),
            j.identifier('set'),
            false
          ),
          [j.literal(unitsMap[unit]), j.literal(seconds.value)]
        )
      );

      node.parent.replace(newStatement);
    } else {
      node.value.callee.property.name = unitsMap[unit];
    }
  });
}

function transformPluginMethods(root, j) {
  pluginMethods.forEach((pm) => {
    const _methods = root.find(j.CallExpression, pm.filter);

    if (_methods.__paths.length > 0) {
      addPluginAndExtend(root, j, pm.importName, pm.plugin);
    }
  });
}

module.exports = {
  toSingularUnits,
  transformUTC,
  transformGetSet,
  addPluginAndExtend,
  transformPluginMethods,
};
