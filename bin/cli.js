#!/usr/bin/env node
'use strict';

require('codemod-cli').runTransform(
  __dirname,
  'default',
  process.argv.slice(3) /* paths or globs */
);
