#!/usr/bin/env -S node --experimental-modules

import fs from 'fs-extra';
import path from 'path';

import pretty from 'pretty';
import marked from 'marked';

import handlebars from 'handlebars';

import kebabCase from 'lodash/kebabCase.js';
import startCase from 'lodash/startCase.js';
//
// const template = handlebars.compile("Name: {{name}}");
// console.log(template({ name: "Nils" }));

const options = {

  template: {
    index:'tmpl/index.hbs',
    chapter:'tmpl/chapter.hbs',
  },

  data:{
    json: 'dist/warrior.json',
    changelog: 'dist/changelog.html',

  },

  docs:{
    path: 'docs'
  }

}

// Load Templates
const warrior = JSON.parse( fs.readFileSync(path.resolve(options.data.json)).toString() );

// Load Data
const warrior = JSON.parse( fs.readFileSync(path.resolve(options.data.json)).toString() );

// Generate Index File
const indexFileName ='index.html';
const indexFullPath = path.resolve(path.join(options.docs.path, indexFileName));
const indexLinks = [];

//Generate Chapter Files
for(let chapter of warrior){
  const chapterFileName = chapter.name + '.html';
  const chapterFullPath = path.resolve(path.join(options.docs.path, chapterFileName));
  indexLinks.push({name:chapter.name, href:chapterFileName})


  for(let section of chapter.data){
  }

  console.log(chapterFullPath);
  console.log(chapterFullPath);

}

console.log(indexLinks);
