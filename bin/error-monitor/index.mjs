#!/usr/bin/env -S node --experimental-modules
// --redirect-warnings=/dev/null

import fs from 'fs-extra';
import path from 'path';

import cheerio from 'cheerio';
import pretty from 'pretty';


import yaml from 'js-yaml';
import marked from 'marked';

import startCase from 'lodash/startCase.js';



const options = {
  directory: 'db',
  index: 'index.yaml',
}

async function main(){

  const toc = yaml.safeLoad(fs.readFileSync(path.resolve(path.join(options.directory, options.index))));

  let index = 0;
  for (let {name, date} of toc) {
    let title = startCase(name);
    const sections = yaml.safeLoad(fs.readFileSync(path.resolve(path.join(options.directory, name, options.index))));
    for (let section of sections) {


      if (section.text) {
        const location = path.resolve(path.join(options.directory, name, section.text));

        section.text = pretty(marked(fs.readFileSync(path.resolve(path.join(options.directory, name, section.text))).toString()), {
          ocd: true
        });

        //console.log(section.text);
        const $ = cheerio.load(`<html><body>` + section.text + `</body><html>` );
        $('a').each(function (i, elem) {
          let href = $(this).attr('href');
          if(href.match(/^https*:\/\//)){
          }else{
            console.log('a: %s (%s)', href, location );
          }
        });

        $('img').each(function (i, elem) {
          let src = $(this).attr('src');
          if(src.match(/^https*:\/\//)){
          }else{
            console.log('img: %s (%s)', src, location );
          }
        });

      }



    } // for sections of a post
  } // for index entries
} // main











  // const texts = fs.readdirSync(path.resolve(options.sourceDatabasePath), { withFileTypes: true })
  // .filter(o => o.isFile())
  // .map(o => o.name)
  // .filter(s => s.endsWith(options.extension))
  // .sort() // sorted by id which is specially formatted: db/poetry-000n.xxx
  // .map(name => ({
  //   location: path.join(options.sourceDatabasePath, name),
  // }));
  //
  // for (const entry of texts) {
  //
  //     const code = fs.readFileSync(entry.location).toString();
  //     const $ = cheerio.load(code);
  //     console.log(entry.location);
  //     //
  //     // fixImages($);
  //     // fixSectionTags($);
  //     // fixLinks($);
  //     //
  //     // save(entry.location, $)
  //
  // };



  //console.log(texts);






main();


// function fixImages($){
//   let fixed = false;
//   $('img').each(function (i, elem) {
//     let src = $(this).attr('src');
//     if(src.match(/^image\//)){
//       src = '/'+src;
//       $(this).attr('src', src);
//       fixed = true;
//     }
//   });
// }
//
// function fixSectionTags($){
//   $('section').each(function (i, elem) {
//     this.tagName = 'div';
//     $(this).addClass('section');
//   });
// }
//
// function fixLinks($){
//   //
//   // $('a').each(function (i, elem) {
//   //   let href = $(this).attr('href');
//   // });
// }

//
// function save(location, $){
//   let updated =  pretty($.html(), {ocd:true});
//   updated = updated.replace(/&apos;/gi, '\'');
//   updated = updated.replace(/&quot;/gi, '"');
//   updated = updated.replace(/&amp;/gi, '&');
//   fs.writeFileSync(location, updated);
// }
