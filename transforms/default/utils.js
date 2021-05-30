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

function addPluginAndExtend(root, j, plugin) {
  let body = root.get().value.program.body;
  const importDecl = j.importDeclaration(
    [j.importDefaultSpecifier(j.identifier(plugin))],
    j.stringLiteral(plugin)
  );
  const extendStatement = j.expressionStatement(
    j.callExpression(j.memberExpression(j.identifier('dayjs'), j.identifier('extend'), false), [
      j.identifier(plugin),
    ])
  );

  let allImports = root.find(j.ImportDeclaration);
  let oldImport = allImports.find(j.ImportDefaultSpecifier, {
    local: { name: plugin },
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
module.exports = {
  toSingularUnits,
  transformUTC,
  transformGetSet,
  addPluginAndExtend,
};
