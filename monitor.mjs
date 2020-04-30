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
}

// FIX BROKEN IMAGES
const response = [];
const toc = yaml.safeLoad(fs.readFileSync(path.resolve(path.join(options.directory, options.index))));

for(let name of toc){



  const sections = yaml.safeLoad(fs.readFileSync(path.resolve(path.join(options.directory, name, options.index))));
  for(let section of sections){
    if((section.type === 'image')&&(1)){
      section.url = path.basename(section.url);
    }
    if((section.type === 'business')&&(1)){
      section.url = path.basename(section.url);
    }
  }
  let data = yaml.dump( sections, {lineWidth: 10000} );
  data = data.replace(/- type: /g, '\n- type: ').trim()
  fs.writeFileSync( path.resolve(path.join(options.directory, name, options.index)), data);



}
