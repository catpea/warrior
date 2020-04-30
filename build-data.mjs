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

let index = 0;
for(let name of toc){

  let title = startCase(name);

  let previousIndex = index-1;
  let nextIndex = index+1;

  let previous;
  let next;

  if(previousIndex<0){
    previous = undefined;//{name:'index', title:'Table of Contents'};
  }else{
    previous = {
      name: toc[previousIndex],
      title: startCase(toc[previousIndex])
    }
  }

  if((nextIndex+1)>toc.length){
    next = undefined;//{name:'index', title:'Table of Contents'};
  }else{
    next = {
      name: toc[nextIndex],
      title: startCase(toc[nextIndex])
    }
  }

  const sections = yaml.safeLoad(fs.readFileSync(path.resolve(path.join(options.directory, name, options.index))));

  for(let section of sections){
    if(section.text){
      section.text = pretty(marked(fs.readFileSync(path.resolve(path.join(options.directory, name, section.text))).toString()), {ocd:true});
    }
  }

  const element = {title, name, data:sections};
  if(previous) element.previous = previous;
  if(next) element.next = next;

  response.push(element);
  index++;
}
fs.ensureDirSync( path.resolve(path.join(options.destination)) );

// Create Data Files
fs.writeFileSync( path.resolve(path.join(options.destination, options.json)), JSON.stringify(response, null, '  '));
fs.writeFileSync( path.resolve(path.join(options.destination, options.yaml)), yaml.dump(response, null, '  '));

// Create Changelog
const changelog = pretty(marked(fs.readFileSync(path.resolve(options.log)).toString()).replace(/\n/g,' '), {ocd:true});
fs.writeFileSync( path.resolve(path.join(options.destination, options.changelog)), changelog);
