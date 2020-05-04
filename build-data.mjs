#!/usr/bin/env -S node --experimental-modules

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
const turndownService = new TurndownService({
  //linkStyle: 'referenced'
})

const options = {

  directory: 'data',
  index: 'index.yaml',

  destination: 'dist',

  json: 'warrior.json',
  yaml: 'warrior.yaml',

  log: 'changelog',
  changelogHtml: 'changelog.html',
  changelogMd: 'CHANGELOG.md',
}


async function main(){

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
const changelog = fs.readdirSync(path.resolve(options.log),{withFileTypes:true})
.filter(o=>o.isFile())
.map(o=>o.name)
.filter(s=>s.endsWith('.md'))
.sort()
.map(s=>({s, path:path.join(options.log, s)}))
.map(o=>({...o, raw: fs.readFileSync(o.path).toString()}))
.map(o=>({...o, ...matter(o.raw)}))
.map(o=>({...o, html: marked(o.content)}))
.reverse()

const htmlVersion = changelog
.map(o=>`
  <section class="log-entry">
    <div itemscope itemtype="http://schema.org/CreativeWork"><meta itemprop="dateCreated" datetime="${(new Date(o.data.date)).toISOString()}"></div>
    <h4>${moment((new Date(o.data.date))).tz("America/Detroit").format("MMMM Do YYYY, h:mm:ss a z")}</h4>
    ${o.html}
  </section>`)


const mdVersion = changelog
.map(o=>`
### ${moment((new Date(o.data.date))).tz("America/Detroit").format("MMMM Do YYYY, h:mm:ss a z")}
${turndownService.turndown(o.html)}
`)


fs.writeFileSync( path.resolve(path.join(options.destination, options.changelogHtml)), pretty(htmlVersion.join('\n\n'), {ocd:true}));
fs.writeFileSync( path.resolve(path.join('.',options.changelogMd)), `#WARRIOR\n##CHANGELOG\n\n`+mdVersion.join('\n'));

}

main();
