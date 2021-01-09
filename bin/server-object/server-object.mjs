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

  /*
  {
    "title": "Foreword",
    "name": "foreword",
    DATE HAS BEEN ADDED HERE!!!!!!!!!!!!!111
    "data": [
      {
        "type": "text",
        "title": "A Warrior is She that thrives and triumphs where’er She be",
        "text": "<p><a href=\"audio/id145.mp3\">Listen</a></p>\n<p><br><br></p>\n<p>A Warrior is She that thrives and triumphs where’er She be.</p>\n<p>You cannot be broken, you must use your misfortune to light your way.</p>\n<p><br><br></p>\n<p>You can learn anything you want, there are no smarter.</p>\n<p>They are just actors, with a handful of fragile lessons, crafted to impress.</p>\n<p><br><br></p>\n<p>There is nothing that can break you, there are no stronger.</p>\n<p>Look to the source of the pain, it comes from Innocence.</p>\n<p><br><br></p>\n<p>Nothing rooted in Innocence is ugly, all lessons that come from being tricked,</p>\n<p>add up to make you more beautiful, enable your insight and foresight, and fuel your authenticity.</p>\n<p><br><br></p>\n<p>When the regrets come at night, that&#39;s just you brain asking you,</p>\n<p>to think harder, to comprehend your beauty in full,</p>\n<p><br><br></p>\n<p>No one can trick you, not for long enough. So, don&#39;t be scared.</p>\n<p>Memoirs, Audio-books, Lectures will show you how many better people there are.</p>\n<p><br><br></p>\n<p>We all have to Enlarge our Worlds daily.</p>\n<p>Audiobooks, and Lectures, will show you that all you have met thus far were just the same type of person.</p>\n<p><br><br></p>\n<p>Do not be afraid to rise.</p>\n<p>The people, or person you have long though about, exist.</p>\n<p>But before they can see you, you have to rise, and shine, and be seen.</p>\n<p><br><br></p>\n<p>Don&#39;t be scared.</p>\n<p><br><br></p>\n<p>Those who will use your Love, Innocence, Endurance and Generosity against you,</p>\n<p>have long been lost, they are blinded, and fractured, and damaged, and broken.</p>\n<p><br><br></p>\n<p>They hold no power over you.</p>\n<p><br><br></p>\n<p>If their attacks continue they will grind themselves to dust,</p>\n<p>and all the experiences that will be left in their wake, will make you stronger and better.</p>\n<p><br><br></p>\n<p>Battles make you stronger, smarter, more beautiful.</p>\n<p>You are a Warrior, that&#39;s the oldest name for it.</p>\n<p><br><br></p>\n<p>A Warrior is She that uses the harm that came her way as energy,</p>\n<p>who understands none can stay a child and all must grow, and enlarge their worlds.</p>\n<p><br><br></p>\n<p>A Warrior can never be damaged, or hurt -- a Warrior Learns.</p>\n<p>A Warrior resists tears in the rain, just like she can resist weakness.</p>\n<p><br><br></p>\n<p>We live in a fragile world, full of fragile people, with fragile egos,</p>\n<p>they speak fragile advice, with fragile words; from their fragile hills.</p>\n<p><br><br></p>\n<p>A Warrior does not wait to be taught.</p>\n<p>A Warrior learns fastest on her own.</p>\n<p><br><br></p>\n<p>Learn in the sequence that fits you best,</p>\n<p>learn at the pace that helps you most.</p>\n<p><br><br></p>\n<p>Push the dark imaginings back,</p>\n<p>and rise.</p>\n<p><br><br></p>\n<p>Move your hand.</p>\n<p><br><br></p>\n<p>And push up.</p>\n<p><br><br></p>\n<p>And stand up.</p>\n<p><br><br></p>\n<p>Get ready to walk,</p>\n<p>and then run, day, after day, slightly longer.</p>\n<p><br><br></p>\n<p>And then lift your weights, the way you learned to run,</p>\n<p>and then lift for longer,\n  and never rest.</p>\n<p><br><br></p>\n<p>And then, with your sweetest audio-book.</p>\n<p><br><br></p>\n<p>Step.</p>\n<p><br><br></p>\n<p>Step Up.</p>\n<p><br><br></p>\n<p>Rise Up.</p>\n<p><br><br></p>\n<p>To No End.</p>\n<p><br><br></p>\n<p>This is The Life Of A Warrior.</p>\n<p><br><br></p>\n<p>Nothing Can Crush You,</p>\n<p>Nothing Can Hold You.</p>\n<p><br><br></p>\n<p>Don&#39;t You See?</p>\n<p><br><br></p>\n<p>Everything Makes You Stronger,</p>\n<p>Everything Makes You Fight Longer.</p>\n<p><br><br></p>\n<p>You,</p>\n<p>Are A Warrior.</p>"
      }
    ],
    "next": {
      "name": "introduction",
      "title": "Introduction"
    }
  },
  */



  // Create dist/feed/feed.json

  /*
    {
      "title": "The Squirrels Attack",
      "date": "2020-03-28T22:31:17.209Z",
      "timestamp": "Saturday, March 28th 2020, 6:31:17 pm",
      "id": "poetry-0016",
      "data": {
        "text": "Captain's Log, Day Twelve of Quarantine.\n\nI ordered some trail-mix from the internet, mailman dropped it off by the door.\n\nAnd all the local Squirrels I've been feeding came over.\n\nThey ripped the box open, and ate it all without me.\n\nHow rude, I probably shouldn't have been feeding them all this time.",
        "html": "<section>\n  <p>Captain&apos;s Log, Day Twelve of Quarantine.</p>\n</section>\n\n<section>\n  <p>I ordered some trail-mix from the internet, mailman dropped it off by the door.</p>\n</section>\n\n<section>\n  <p>And all the local Squirrels I&apos;ve been feeding came over.</p>\n</section>\n\n<section>\n  <p>They ripped the box open, and ate it all without me.</p>\n</section>\n\n<section>\n  <p>How rude, I probably shouldn&apos;t have been feeding them all this time.</p>\n</section>",
        "page": "<html>\n\n  <head>\n    <title>The Squirrels Attack</title>\n\n  </head>\n\n  <body>\n    <section><img src=\"image/undefined\"></section>\n    <section>\n      <p><a href=\"audio/undefined\">Audio Version</a></p>\n    </section>\n    <section>\n      <p>Captain&apos;s Log, Day Twelve of Quarantine.</p>\n    </section>\n\n    <section>\n      <p>I ordered some trail-mix from the internet, mailman dropped it off by the door.</p>\n    </section>\n\n    <section>\n      <p>And all the local Squirrels I&apos;ve been feeding came over.</p>\n    </section>\n\n    <section>\n      <p>They ripped the box open, and ate it all without me.</p>\n    </section>\n\n    <section>\n      <p>How rude, I probably shouldn&apos;t have been feeding them all this time.</p>\n    </section>\n\n\n\n  </body>\n\n</html>"
      },
      "counter": 1,
      "isNewest": false,
      "isOldest": true,
      "olderId": "poetry-0190",
      "newerId": "poetry-0017",
      "newestId": "poetry-0190",
      "oldestId": "poetry-0016"
    },
  */


  const template = handlebars.compile(fs.readFileSync(path.join(__dirname,'html-template.hbs')).toString());



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
    return $.text().replace(/\n+/g, ' ') + " ";
  }



  //
  // const feed = data.map((item,index)=>{
  //
  //   if(!item.previous){
  //     item.previous = {
  //       name: 'warrior-'+ data[data.length-1].name
  //     }
  //   }
  //   if(!item.next){
  //     item.next = {
  //       name: 'warrior-'+ data[0].name
  //     }
  //   }
  //
  //   let html = "";
  //   let text = "";
  //
  //   for( let element of item.data ){
  //
  //     html += template(element);
  //     text += redable(element);
  //   }
  //   html = pretty(html, {ocd: true});
  //   text = text.replace(/ +/g, ' ');
  //
  //   const formatted = {
  //         "title": item.title,
  //         "date": "2019-2020",
  //         "timestamp": "2019-2020",
  //         "id": `warrior-${item.name}`,
  //
  //         "data": {
  //           html,
  //           "page": `<html><head><title>${item.title}</title></head><body>${html}</body></html>`,
  //           text,
  //         },
  //
  //         "counter": index+1,
  //         "isNewest": (index+1)===data.length?true:false,
  //         "isOldest": index===0?true:false,
  //
  //         "olderId": 'warrior-' + item.previous.name,
  //         "newerId": 'warrior-' + item.next.name,
  //
  //         "newestId": `warrior-${data[data.length-1].name}`,
  //         "oldestId": `warrior-${data[0].name}`,
  //
  //       };
  //
  //   return formatted;
  // })




  // function upgradeEntries(listOfBooks){
  //
  //
  //   // FAKE TIME STAMPS
  //   listOfBooks.filter(i=>i.name == 'westland-warrior').forEach(book=>{
  //     let startDate = moment(`2020-12-28`);
  //     console.log(rnd(1,4));
  //     book.data.reverse().forEach(entry=>{
  //       startDate = startDate.subtract(7, 'days');
  //       entry.date = moment(`${moment(startDate).format('YYYY-MM-DD')}T0${rnd(1,4)}:${rnd(10,59)}:${rnd(10,59)}.${rnd(100,999)}Z`).toISOString();
  //       entry.timestamp = moment(entry.date).format('dddd, MMMM Do YYYY, h:mm:ss a');;
  //       //console.log(entry);
  //     })
  //     book.data.reverse()
  //   })
  //
  // }


  const object = {
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
