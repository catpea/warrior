#!/usr/bin/env bash

year=$(date +"%Y");
chapters=$(ls -1 -d db/[a-z]*/| wc -l);

git add .;
git commit -m "System updates year $year, chapter count: $chapters";
npm version patch; # this does add and commit too.
git push;
