# Basecamp Chrome Notifier

Extension for Google Chrome which notifies the activity in your Basecamp Accounts with desktop notifications.

Feel free to help us improve the extension.

**[Extension on Chrome Store](https://chrome.google.com/webstore/detail/basecamp-notifier/fihjmkangcncdhnbnenfipalmcegljii)**

![image](demo.jpg)

##Instructions

1. `npm install && bower install`

2. Register an app in **[http://integrate.37signals.com](http://integrate.37signals.com)**.

3. Run `cp .default-env .development-env` and update the app credentials on `.development-env`.

4. Run `grunt build` and load the extension as an [unpacked version on Chrome](http://superuser.com/a/247654/235416) from `dist/` folder.

##To pack

1. Run all steps above if you didn't.

2. Run `cp .development-env .production-env` and update the infos case you use a diferent registered app on 37signals for the production version.

3. Run `grunt pack --environment=production`

4. Publish the `dist/basecamp_notifier_<version>_production.zip` on Chrome Store.

## Tests

To run the test suite you need run the specs inside Chrome because the Chrome Extension API, for this, when you [install the extension in unpacked mode](http://superuser.com/a/247654/235416) access:

`chrome-extension://<you-chrome-extension-id>/spec_runner.html`.

## To-do
**[In issues =D](https://github.com/samuelsimoes/Chrome-Basecamp-Notifier/issues?state=open)**

-----------------------------------------

**Samuel Simões ~ [@samuelsimoes](https://twitter.com/samuelsimoes) ~ [samuelsimoes.com](http://samuelsimoes.com)**
