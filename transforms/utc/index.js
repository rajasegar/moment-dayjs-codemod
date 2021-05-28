const { getParser } = require('codemod-cli').jscodeshift;
//const { getOptions } = require('codemod-cli');

module.exports = function transformer(file, api) {
  const j = getParser(api);
  //const options = getOptions();

  const root = j(file.source);

  root.find(j.CallExpression, { callee: { name: 'moment' } }).forEach((path) => {
    path.value.callee.name = 'dayjs';
  });

  // change utc methods
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

  return root.toSource({ quote: 'single' });
};

module.exports.type = 'js';
