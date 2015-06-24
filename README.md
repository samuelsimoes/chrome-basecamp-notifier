# Basecamp Chrome Notifier

Extension for Google Chrome that notifies about activity on your Basecamp Accounts with desktop notifications, events type filter and projects filter.

Feel free to help us to improve the extension.

**[Extension on Chrome Store](https://chrome.google.com/webstore/detail/basecamp-notifier/fihjmkangcncdhnbnenfipalmcegljii)**

![image](demo.jpg)

##Contributing

To contribute you need be familiar with [React.js](http://facebook.github.io/react/) and [Fluxo](https://github.com/samuelsimoes/fluxo). The app also uses [Babel.js](http://babeljs.io)
to give us the possibility to use ES6 features. :metal:

##Building

1. `npm install && bower install`

2. Register an app in **[http://integrate.37signals.com](http://integrate.37signals.com)**.

3. Run `cp .default-env .development-env` and update the app credentials on `.development-env`.

4. Run `npm run build` and load the extension as an [unpacked version on Chrome](http://superuser.com/a/247654/235416) from `dist/` folder.

##To pack

1. Run all steps above if you didn't.

2. Run `cp .development-env .production-env` and update the infos case you use a diferent registered app on 37signals for the production version.

3. Run `BUILD_ENV=production npm run pack`

4. Publish the `dist/basecamp_notifier_<version>_production.zip` on Chrome Store.

-----------------------------------------

**Samuel Simões ~ [@samuelsimoes](https://twitter.com/samuelsimoes) ~ [samuelsimoes.com](http://samuelsimoes.com)**
