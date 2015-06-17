#!/bin/sh

echo "[$(date)] build started"

# Load "build vars"
. .${BUILD_ENV:="development"}-env

# copy src (without app javascript) to dist folder
rm -rf dist
cp -r src dist
rm -rf dist/js/*

# copy javascript that shouldn't be compiled
cp src/js/vendor/raven-js/dist/raven.js dist/js/raven.js
cp src/js/global.js dist/js/global.js

# compile using Browserfiy with Babelfiy (Babel.js, ES6, you know)
NODE_PATH='src/js' \
node_modules/.bin/browserify src/js/main.js \
                             --extension=.jsx \
                             -t [ babelify --ignore /vendor/ ] \
                             -o dist/js/main.js

# search placeholders and replace with build vars
gsed -i -e "s|@@basecampClientId|${BASECAMP_CLIENT_ID}|g" \
        -e "s|@@basecampSecret|${BASECAMP_SECRET}|g" \
        -e "s|@@version|${npm_package_version}|g" \
        -e "s|@@description|${npm_package_description}|g" \
        -e "s|@@sentryUrl|${SENTRY_URL}|g" \
        -e "s|@@contactSupportEndpoint|${CONTACT_SUPPORT_ENDPOINT}|g" \
        {dist/js/main.js,dist/manifest.json,dist/js/global.js}

echo "[$(date)] build finished"
