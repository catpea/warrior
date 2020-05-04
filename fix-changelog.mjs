#!/usr/bin/env -S node --experimental-modules

import fs from 'fs-extra';
import path from 'path';
import pretty from 'pretty';
import moment from 'moment';
import marked from 'marked';
import yaml from 'js-yaml';
import kebabCase from 'lodash/kebabCase.js';
import startCase from 'lodash/startCase.js';

const options = {
    changelog: 'old-changelog.md',
}

const months = 'January February March April May June July August September October November December'.split(' ');

const result = [];
const data = fs.readFileSync(path.resolve(path.join(options.changelog))).toString();
const lines = data.split(/\n/);

lines.forEach(line=>{

  if(line.startsWith('### ')){
    //line = '### July 22nd 1978, 8:00:00 pm'
    const parsed = line.match(/### (?<month>\w+) (?<day>\d+)\w+ (?<year>\d+), (?<hour>\d+):(?<minute>\d+):(?<second>\d+) (?<a>\w+)/)
    //console.log(parsed);
    let {year, month, day, hour, minute, second, a} = parsed.groups;

      year = parseInt(year);
      month = months.indexOf(month);
      day = parseInt(day);
      hour = parseInt(hour);
      minute = parseInt(minute);
      second = parseInt(second);

      if ( (a === 'pm') && (hour !== 12) ) {
        //hour += 12;
      }

      if( (a == 'pm') && (hour !== 12) ){
        hour = hour + 12;
        // if(hour > 12){
        //   hour = hour + 2;
        //   //hour = hour + 12;
        // }else{
        // }
      }else if( (a == 'am') && (hour === 12) ){
        hour = 0;

      }

    //console.log({year, month, day, hour, minute, second});
    const object = new Date(year, month, day, hour, minute, second);

    const dateText = '### ' + moment(object).format('MMMM Do YYYY, h:mm:ss a'); // April 29th 2020, 6:16:31 pm

    if(dateText != line){
      console.log('original: ',line);
      console.log('  parsed: ',dateText);
      throw new Error('Date Parsing Failure')
    }else{
      // console.log('original: ',line);
      // console.log('  parsed: ',dateText);
    }

    //console.log(object);
    //console.log(object.toISOString());
    result.push(line)
    result.push(`<div itemscope itemtype="http://schema.org/CreativeWork"><meta itemprop="dateCreated" datetime="${object.toISOString()}"></div>`);
  }else{
    result.push(line)
  }



});

console.log(result.join('\n'))

// const response = [];
// const toc = yaml.safeLoad(fs.readFileSync(path.resolve(path.join(options.directory, options.index))));

// FIX BROKEN IMAGES
// for(let name of toc){
//   const sections = yaml.safeLoad(fs.readFileSync(path.resolve(path.join(options.directory, name, options.index))));
//   for(let section of sections){
//     if((section.type === 'image')&&(1)){
//       section.url = path.basename(section.url);
//     }
//     if((section.type === 'business')&&(1)){
//       section.url = path.basename(section.url);
//     }
//   }
//   let data = yaml.dump( sections, {lineWidth: 10000} );
//   data = data.replace(/- type: /g, '\n- type: ').trim()
//   fs.writeFileSync( path.resolve(path.join(options.directory, name, options.index)), data);
// }

// RENAME youtube.video to youtube.id
// for(let name of toc){
//   const sections = yaml.safeLoad(fs.readFileSync(path.resolve(path.join(options.directory, name, options.index))));
//   const videos = sections.filter(o=>o.type === 'youtube');
//   for(let video of videos){
//
//     const type = video.type;
//     const id = video.video;
//     const title = video.title;
//
//     delete video.type;
//     delete video.video;
//     delete video.title;
//
//     video.type = type;
//     video.id = id;
//     video.title = title;
//
//     console.log(video);
//   }
//   let data = yaml.dump( sections, {lineWidth: 10000} );
//   data = data.replace(/- type: /g, '\n- type: ').trim();
//   fs.writeFileSync( path.resolve(path.join(options.directory, name, options.index)), data);
// }
