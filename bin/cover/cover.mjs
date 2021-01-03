#!/usr/bin/env -S node --experimental-modules
import {exec} from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import pretty from 'pretty';
import marked from 'marked';
import yaml from 'js-yaml';
import kebabCase from 'lodash/kebabCase.js';
import startCase from 'lodash/startCase.js';
import matter from 'gray-matter';
import moment from 'moment';
import tz from 'moment-timezone';
import TurndownService from 'turndown';

const turndownService = new TurndownService();

const options = {
  directory: 'db',
  index: 'index.yaml',
  destination: 'dist',
  json: 'warrior.json',
  yaml: 'warrior.yaml',
  log: 'changelog',
  changelogHtml: 'changelog.html',
  changelogMd: 'CHANGELOG.md',
}

function execShellCommand(cmd) {

 return new Promise((resolve, reject) => {
  exec(cmd, (error, stdout, stderr) => {
   if (error) {
    console.warn(error);
   }
   resolve(stdout? stdout : stderr);
  });
 });
}

async function main() {

  const toc = yaml.safeLoad(fs.readFileSync(path.resolve(path.join(options.directory, options.index))));
  for (let {name, date} of toc) {
    const sections = yaml.safeLoad(fs.readFileSync(path.resolve(path.join(options.directory, name, options.index))));

    let images = [];
    for (let section of sections) {
      if(section.type == 'youtube'){
        images.push(`docs/images/yid-${section.id}.jpg`);
      } else if(section.type == 'image'){
        images.push(`docs/images/${section.url}`);
      } else if(section.type == 'business'){
        images.push(`docs/images/${section.url}`);
      }
    } // for each section

    // console.log(images.length, images);
    if(images.length){

      let filePath = path.join('docs/images', 'warrior-' + kebabCase(name) + '-cover.jpg')
      let coverPath = path.join('docs/images', kebabCase(name) + '-illustration.jpg')

      const files = images.filter(i=>'.gif'!==path.extname(i)).map(i=>`"${i}"`).join(" ")

      if(!fs.pathExistsSync(filePath)){
        console.log(`Creating Cover Image for ${name}`);
        // console.log(`montage ${files} ${filePath}`);
        let tile = 3;
        if(images.length > 17) tile = 3;
        if(images.length > 25) tile = 4;
        if(images.length > 35) tile = 5;
        if(images.length < 9) tile = 2;
        if(images.length < 4) tile = 1;

        await execShellCommand(`montage -background '#212529' ${files} -geometry 320x230 -tile ${tile}x ${filePath}`);
        //await execShellCommand(`convert -define jpeg:size=1000x1000 ${filePath}  -thumbnail 500x500^ -gravity center -extent 1000x1000 -quality 80 ${coverPath};`);
        //break;
      }
    }

  } // for each chapter

} // main

main();
