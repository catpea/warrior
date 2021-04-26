#!/usr/bin/env -S node --experimental-modules

import fs from 'fs-extra';
import path from 'path';

import request from 'request';
import moment from 'moment';

import cheerio from 'cheerio';
import pretty from 'pretty';
import yaml from 'js-yaml';
import marked from 'marked';
import lodash from 'lodash';

import handlebars from 'handlebars';
import handlebarsHelpers from 'handlebars-helpers';

import kebabCase from 'lodash/kebabCase.js';
import startCase from 'lodash/startCase.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

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

  },

  src:{
    path: 'db',
    index: 'index.yaml',
  },

  data:{
    json: 'dist/warrior.json',
    feed: 'dist/server-object/westland-warrior.json',

  },

  docs:{
    path: 'docs',
    images: 'docs/images',
    missing:'docs/404.html',
    index:'docs/index.html',

  }

}







async function main(){


  // Load Data
  const data = JSON.parse( fs.readFileSync(path.resolve(options.data.json)).toString() );




  const template = handlebars.compile(fs.readFileSync(path.join(__dirname,'bootstrap-template.hbs')).toString());



  const texting = {};
  texting.text = ({type,title,text})=>`${title}: ${text}`;
  texting.quote = ({type,author,url,text})=>`${author}: ${text}`;
  texting.youtube = ({type,id,title })=>`${title}`;
  texting.poem = ({type,title,author,text})=>`${title} by ${author}: ${text}`;
  texting.image = ({type,url,title,text})=>`${title}: ${text}`;
  texting.subtitle = ({type,title})=>`${title}`;
  texting.link = ({type,url,title})=>`${title}`;
  texting.business = ({type,url,title,text})=>`${title}: ${text}`;

  function redable(element){
    let plain = "";
    const baseline = texting[element.type](element);
    const $ = cheerio.load(baseline);
    return $.text().replace(/\n+/g, ' ') + ", ";
  }
  function links(element){
    let plain = "";
    const baseline = texting[element.type](element);
    const $ = cheerio.load(baseline);
    const list = $('a')
    .filter(function (i, el){ return $(this).attr('href').startsWith('http')})
    .map(function (i, el) { return {title: ($(this).attr('title')||$(this).text()).replace(/\s+/g, ' '), url: $(this).attr('href'), hostname:new URL($(this).attr('href')).hostname} }).get();
    return list;
  }
  function links2(html){
    let plain = "";
    const $ = cheerio.load(html);
    const list = $('a')
    .filter(function (i, el){ return $(this).attr('href').startsWith('http')})
    .map(function (i, el) { return {title: ($(this).attr('title')||$(this).text()).replace(/\s+/g, ' '), url: $(this).attr('href'), hostname:new URL($(this).attr('href')).hostname} }).get();
    return list;
  }


  function listLinks(html) {
    const $ = cheerio.load(html);
    const list = $("a")
      .map(function (i, el) {
        //console.log($(el).html());
        return {
          title: $(this).attr("title") || $(this).text(),
          url: $(this).attr("href"),
        };
      })
      .get()
      .map((i) => {
        i.hostname = "local";
        try {
          i.hostname = new URL(i.url).hostname;
        } catch (e) {
          // borked.
        }
        return i;
      });
    return list;
  }

  function dependencies(html) {

    const localFiles = listLinks_2(html).filter(i=>i.hostname == 'local');


    const list = [].concat(localFiles);
    return list;
  }

  function listLinks_2(html) {
    const $ = cheerio.load(html);
    let unique = new Set();

    const list = $("a")
      .map(function (i, el) {

        const title = ($(this).attr("title") || $(this).text() || '').trim().replace(/\s+/g, ' ');
        const url = ($(this).attr("href") || '').trim();



        const id = title + url;

        if(title && url){
          if(unique.has(id)){
            //console.log(id);
            // already tracking
          }else{
            unique.add(id);
            return { title, url };
          }
        }

      })
      .get()
      .filter(i=>i)

      .map((i) => {
        i.hostname = "local";
        try {
          let hostname = new URL(i.url).hostname;
          i.hostname = hostname;
          //console.log(hostname);
        } catch (e) {
          // borked.
        }
        return i;
      })
      //.filter(i=>!i.hostname.includes('youtube'))
      .filter(i=>i);




    return list;
  }


  const object = {
    format: 'v1',
    name: "westland-warrior",
    title: "Westland Warrior",
    subtitle: "A Path To Greatness",
    description: "A small video book about the twisty little passages of growing up.",
    icon: "collection-play",
    links:{
      "Source Code":"https://github.com/westland-valhalla/warrior",
      "Mirror":"https://westland-valhalla.github.io/warrior/",
      "Bugs":"https://github.com/westland-valhalla/warrior/issues"
    },

    // coverImages: false,
    // contactSheet: true,
    // audioVersion: false,
    // localAssets: true,
    // yamlDatabase: true,

    plugins: {
      coverImages: {},
      resizeCoverImage: {},
      //convertAudioToVideo: {},
      createMirror: {},
      createWebsite: {},
      localAssets: {},
      yamlDatabase: {},
      createContactSheetImage: {},
      downloadVideoThumbnails: {},
    },

    order: "latest",
  };

  // convert feed to server friendly format
  object.data = data.map((item,index)=>{
    const entry = {};

    // object should not hold this entry.bookName = object.name;
    // object should not hold this entry.bookTitle = object.title;

    entry.id = `${object.name}-${item.name}`;
    entry.title = item.title;

    entry.date = item.date;
    // no entry.timestamp = moment(entry.date).format('dddd, MMMM Do YYYY, h:mm:ss a');

    entry.images = [];
    entry.links = [];


    entry.image = `warrior-${item.name}-cover.jpg`;
    entry.html = '';
    entry.text = '';

    for( let element of item.data ){
      entry.html += template(element);
      entry.text += redable(element);
      // entry.links = []; // listLinks(entry.html);
      //console.log('Making links');
      entry.links = listLinks_2(entry.html);
      //entry.dependencies = dependencies(entry.html);
      //entry.yaml = yamlExport(element)
    }

    entry.html = pretty(entry.html, {ocd: true});
    entry.text = entry.text.replace(/ +/g, ' ');
    // server should truncate this not data... entry.text = lodash.truncate(entry.text, {'length': 512, 'separator': /,? +/});

    return entry;
  });



  // SAVE
  fs.ensureDirSync( path.dirname(options.data.feed) );
  fs.writeFileSync( path.resolve(options.data.feed), JSON.stringify(object, null, '  ') );


} // main

main();
