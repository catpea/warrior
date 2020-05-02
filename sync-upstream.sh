#!/bin/bash
if [ $(git remote | grep upstream | wc -l) -eq 1 ]; then
  if [ "$1" == "confirm" ]; then
    git checkout master
    git fetch upstream
    git rebase upstream/master
    git push origin master
  else
    echo "WARNING"
    echo "To prevent accidental execution the first argument must be confirm."
    echo "#example: $0 confirm"
  fi;
else
  echo "WARNING"
  echo "The upstream remote was not found, this command should run from a fork only";
  echo "If this is a fork you should add the upstream remote before using this program:";
  echo "#execute: git remote add upstream git://github.com/catpea/warrior.git";
fi;
