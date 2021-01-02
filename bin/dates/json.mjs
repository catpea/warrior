#!/usr/bin/env -S node --experimental-modules

import {exec} from 'child_process';

import fs from 'fs-extra';
import path from 'path';

import moment from 'moment';
import request from 'request';

import cheerio from 'cheerio';
import pretty from 'pretty';
import yaml from 'js-yaml';
import marked from 'marked';
import lodash from 'lodash';

import handlebars from 'handlebars';
import handlebarsHelpers from 'handlebars-helpers';

import kebabCase from 'lodash/kebabCase.js';
import startCase from 'lodash/startCase.js';
import rnd from 'random-inclusive';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

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

function kludge(response){
  const oldestVersion = '2020-04-29';

  const doc = yaml.load(fs.readFileSync('db/old-index.yaml'));
  const newIndex = [];

  doc.forEach(item=>{
    newIndex.push({
      name: item,
      date: response[item],
    })
  })

  console.log(newIndex);
  let startDate = moment(oldestVersion);
  newIndex.filter(i=>i.date.startsWith(oldestVersion)).reverse().forEach(entry=>{
    startDate = startDate.subtract(7, 'days');
    entry.date = moment(`${moment(startDate).format('YYYY-MM-DD')}T0${rnd(1,4)}:${rnd(10,59)}:${rnd(10,59)}.${rnd(100,999)}Z`).toISOString();
    // entry.timestamp = moment(entry.date).format('dddd, MMMM Do YYYY, h:mm:ss a');;
    //console.log(entry);
  })










  console.log(yaml.dump(newIndex));
}

async function main(){
  const response = {};
  const text = await execShellCommand('bin/dates/list.sh');
  const list = text.split('\n');
  list.map(i=>i.trim()).filter(i=>i).map(line=>{
    const [file, date] = line.split(': ',2);
    response[path.basename(path.dirname(file))] = new Date(date).toISOString();
  });

  console.log(response);
  kludge(response)











}

main();
