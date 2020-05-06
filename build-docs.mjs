#!/usr/bin/env -S node --experimental-modules

import fs from 'fs-extra';
import path from 'path';

import request from 'request';

import pretty from 'pretty';
import yaml from 'js-yaml';
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
    id: 'pico',

    templates: 'templates',
    partials: 'partials',
    files: 'files',

    index:'index.hbs',
    chapter:'chapter.hbs',
    changelog:'changelog.hbs',
  },

  src:{
    path: 'db',
    index: 'index.yaml',
  },

  data:{
    json: 'dist/warrior.json',
    changelog: 'dist/changelog.html',
  },

  docs:{
    path: 'docs',
    images: 'docs/images',
    missing:'docs/404.html',
    index:'docs/index.html',
    changelog:'docs/changelog.html',
  }

}




function download(src, dest){
  return new Promise(async function(resolve, reject) {
    if(await fs.pathExists(dest)) {
      //console.log('already downloaded, exit early',dest);
      resolve();
      return;
    }else{
      //console.log('Downloading %s into %s', src, dest);
    }
    request(src).pipe(fs.createWriteStream(dest)).on('close', function(err){
      if (err) {
        reject(err);
        return;
      }
      resolve()
    });
  });
}


async function main(){



  const templateRoot = path.resolve(path.join(options.template.templates, options.template.id));
  fs.copySync(path.join(templateRoot, options.template.files), path.resolve(options.docs.path))

  // Load Partials
  fs.readdirSync(path.join(templateRoot, options.template.partials))
  .filter(name=>name.endsWith('.hbs'))
  .map(file=>({file, name: path.basename(file, '.hbs')}))
  .map(o=>({...o, path: path.join(templateRoot, options.template.partials, o.file)}))
  .map(o=>({...o, content: fs.readFileSync(o.path).toString()}))
  // .map(o=>{console.log(o); return o})
  .forEach(o=>handlebars.registerPartial(o.name, o.content))

  // Load Templates
  const indexTemplate = handlebars.compile( fs.readFileSync(path.join(templateRoot, options.template.index)).toString() );
  const changelogTemplate = handlebars.compile( fs.readFileSync(path.join(templateRoot, options.template.changelog)).toString() );
  const chapterTemplate = handlebars.compile( fs.readFileSync(path.join(templateRoot, options.template.chapter)).toString() );






  // Load Data
  const book = JSON.parse( fs.readFileSync(path.resolve(options.data.json)).toString() );
  const changelog = fs.readFileSync(path.resolve(options.data.changelog)).toString()

  // Generate Index File
  const indexFileName ='index.html';
  const indexFullPath = path.resolve(path.join(options.docs.path, indexFileName));
  const links = [];

  // Download New Images
  for(let chapter of book){
      for(let video of chapter.data.filter(o=>o.type === 'youtube')){
      const thumbnailFilename = `yid-${video.id}.jpg`;
      const thumbnailFullpath = path.resolve(path.join(options.docs.images, thumbnailFilename));
      if(!fs.pathExistsSync(thumbnailFullpath)){
        console.log('Downloading Thumbnail',thumbnailFullpath)
        download(`https://img.youtube.com/vi/${video.id}/0.jpg`, thumbnailFullpath);
      }
    }
  }

  //Generate Chapter Files
  for(let chapter of book){
    const chapterFileName = chapter.name + '.html';
    const chapterFullPath = path.resolve(path.join(options.docs.path, chapterFileName));
    links.push({title:chapter.title, href:chapterFileName})
    const chapterHtml = pretty(chapterTemplate({title:chapter.title, sections:chapter.data, next:chapter.next,previous:chapter.previous}),{ocd:true});
    fs.writeFileSync(chapterFullPath, chapterHtml);
  }

  const indexHtml = pretty(indexTemplate({links, changelog}),{ocd:true});
  fs.writeFileSync(path.resolve(options.docs.index), indexHtml);
  fs.writeFileSync(path.resolve(options.docs.missing), indexHtml);

  const changelogHtml = pretty(changelogTemplate({changelog}),{ocd:true});
  fs.writeFileSync(path.resolve(options.docs.changelog), changelogHtml);

  // Schema
  const schema = {};
  console.log('Database Schema');
  for(let chapter of book){
    for(let section of chapter.data){
      if(!schema[section.type]){
        schema[section.type] = {keys: new Set(Object.keys(section))}
      }else{
        for (let elem of (new Set(Object.keys(section)))) schema[section.type].keys.add(elem)
      }
    }
  }
  for(let key in schema){schema[key].keys.delete('type')}
  for(let type in schema){
    console.log(`${type}: ${Array.from(schema[type].keys).join(', ')}.`);
  }

} // main

main();
