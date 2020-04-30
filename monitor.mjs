#!/usr/bin/env -S node --experimental-modules

import fs from 'fs-extra';
import path from 'path';
import pretty from 'pretty';
import marked from 'marked';
import yaml from 'js-yaml';
import kebabCase from 'lodash/kebabCase.js';
import startCase from 'lodash/startCase.js';

const options = {

    directory: 'data',
  index: 'index.yaml',

  destination: 'dist',

  json: 'warrior.json',
  yaml: 'warrior.yaml',

  log: './CHANGELOG.md',
  changelog: 'changelog.html',
}

// Parse Data
const response = [];
const toc = yaml.safeLoad(fs.readFileSync(path.resolve(path.join(options.directory, options.index))));
for(let name of toc){
  let title = startCase(name);

  const sections = yaml.safeLoad(fs.readFileSync(path.resolve(path.join(options.directory, name, options.index))));

  for(let section of sections){
    if(section.text){
      section.text = pretty(marked(fs.readFileSync(path.resolve(path.join(options.directory, name, section.text))).toString()), {ocd:true});
    }
  }

  let data = yaml.dump( chapter.data, {lineWidth: 10000} );
  data = data.replace(/- type: /g, '\n- type: ').trim()
  fs.writeFileSync( path.resolve(path.join(options.directory, options.index)), data)
}
