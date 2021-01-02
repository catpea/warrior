#!/usr/bin/env bash

# create
./bin/cover/cover.mjs

# resize
find ./docs/images -type f -name 'warrior-*-cover.jpg' -exec sh -c './bin/cover/resize.sh "$1"' _ {} \;
