#!/usr/bin/env -S node --experimental-modules

import { exec } from 'child_process' ;
import inquirer from 'inquirer';
const prompt = inquirer.prompt;
let operate = 1;
const questions = [
  {
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      // {
      //   key: 'a',
      //   name: 'Add New Chapter',
      //   value: './bin/new/index.mjs'
      // },
      {
        key: 'u',
        name: '1) Make Data',
        value: './bin/make/data.mjs'
      },
      {
        key: 'u',
        name: '2) Make Docs',
        value: './bin/make/docs.mjs'
      },
      {
        key: 'u',
        name: '3) Make Feed',
        value: './bin/make/feed.mjs'
      },
      {
        key: 'p',
        name: 'Publish To Github',
        value: './bin/publish/index.sh'
      },
      // {
      //   key: 'j',
      //   name: 'Resize Images',
      //   value: './bin/resize/index.sh'
      // },
      // {
      //   key: 'j',
      //   name: 'Convert PNG to JPG',
      //   value: './bin/tojpg/index.sh'
      // },
      {
        key: 'x',
        name: 'Exit Menu',
        value: 'exit-menu',
      },

    ],
  },
];

function execute(answers){
  return new Promise(function(OK, NO){
    if(answers.action === 'exit-menu'){
      operate = false;
      return OK();
    }
    console.log(`Executing ${answers.action}`);
    exec(answers.action, (err, stdout, stderr) => {
      if (err) {
        if(stderr) console.log(`${stderr}`);
        NO(err);
      } else {
       if(stdout) console.log(`${stdout}`);
       if(stderr) console.log(`${stderr}`);
      }
    })
    .on('exit', (code) => {
      console.log('');
      operate++;
      OK();
    });
  });
}

async function main(){
  await execute({action: './bin/banner/index.mjs'})
  while(operate){
    const anwsers = await prompt(questions);
    await execute(anwsers);
  }
}

main();
