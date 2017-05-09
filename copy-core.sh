#!/bin/sh
set -e

# Builds and copies the Airbitz core libraries into `node_modules`.
copy_build () {
  (
    cd ../$1/
    npm run build
  )
  cp ../$1/package.json node_modules/$1/
  cp -r ../$1/lib/ node_modules/$1/lib/
}

copy_build airbitz-core-js
copy_build airbitz-cli

# Disklet isn't compatible with React Native, so hack around that:
mkdir -p node_modules/path
mkdir -p node_modules/fs
echo "module.exports = null" > node_modules/fs/index.js
echo "module.exports = null" > node_modules/path/index.js
