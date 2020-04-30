#!/usr/bin/env -S node --experimental-modules

import fs from 'fs-extra';
import path from 'path';
import pretty from 'pretty';
import marked from 'marked';
import yaml from 'js-yaml';
import kebabCase from 'lodash/kebabCase.js';
import startCase from 'lodash/startCase.js';

const options = {

  source: 'dist',
  changelog: 'changelog.html',
  json: 'warrior.json',

  destination: 'docs',
}

// Load Data

const warrior = JSON.parse( fs.readFileSync(path.resolve(path.join(options.source, options.json))).toString() );

// Generate Index File

//Generate Chapter Files
for(let chapter of warrior){
  for(let section of chapter.data){
    const fileName = chapter.name + '.html';
  }
}
