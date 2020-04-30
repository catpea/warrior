#!/usr/bin/env -S node --experimental-modules

import fs from 'fs-extra';
import path from 'path';

import pretty from 'pretty';
import marked from 'marked';

import handlebars from 'handlebars';
import handlebarsHelpers from 'handlebars-helpers';

import kebabCase from 'lodash/kebabCase.js';
import startCase from 'lodash/startCase.js';
//
// const template = handlebars.compile("Name: {{name}}");
// console.log(template({ name: "Nils" }));


var helpers = handlebarsHelpers({
  handlebars: handlebars
});



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
    path: 'docs',
    index:'docs/index.html',
  }

}

// Schema
const schema = {};

// Load Templates
const indexTemplate = handlebars.compile( fs.readFileSync(path.resolve(options.template.index)).toString() );
const chapterTemplate = handlebars.compile( fs.readFileSync(path.resolve(options.template.chapter)).toString() );

// Load Data
const warrior = JSON.parse( fs.readFileSync(path.resolve(options.data.json)).toString() );
const changelog = fs.readFileSync(path.resolve(options.data.changelog)).toString()

// Generate Index File
const indexFileName ='index.html';
const indexFullPath = path.resolve(path.join(options.docs.path, indexFileName));
const links = [];

//Generate Chapter Files
for(let chapter of warrior){
  const chapterFileName = chapter.name + '.html';
  const chapterFullPath = path.resolve(path.join(options.docs.path, chapterFileName));
  links.push({title:chapter.title, href:chapterFileName})

  //
  for(let section of chapter.data){
    if(!schema[section.type]){
      schema[section.type] = {keys: new Set(Object.keys(section))}
    }else{
      for (let elem of (new Set(Object.keys(section)))) schema[section.type].keys.add(elem)
    }
  }

  const chapterHtml = pretty(chapterTemplate({title:chapter.title, sections:chapter.data}),{ocd:true});
  fs.writeFileSync(chapterFullPath, chapterHtml);

}

const indexHtml = pretty(indexTemplate({links, changelog}),{ocd:true});
fs.writeFileSync(path.resolve(options.docs.index), indexHtml);

for(let key in schema){
  schema[key].keys.delete('type')
}


console.log('Database Schema');
console.log(schema);
