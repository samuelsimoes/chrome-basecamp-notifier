#!/bin/sh
./build.sh
cd dist && zip -r basecamp_notifier_${npm_package_version}_${BUILD_ENV:="development"}.zip *
