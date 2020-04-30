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
}

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
  response.push({title, name, data:sections});
}
fs.ensureDirSync( path.resolve(path.join(options.destination)) );
fs.writeFileSync( path.resolve(path.join(options.destination, options.json)), JSON.stringify(response, null, '  '));
fs.writeFileSync( path.resolve(path.join(options.destination, options.yaml)), yaml.dump(response, null, '  '));
