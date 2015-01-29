var config = require("grunt-settings");

module.exports = function (grunt) {
  var envMode = (grunt.option("environment") || "development"),
      pkg = grunt.file.readJSON("package.json");

  config.init(grunt);

  config.set("pkg", pkg);
  config.set("envMode", envMode);

  config.set("copy.expand", {
    expand: true,
    cwd: "src/",
    src: [
      "**",
      "!js/vendor/**",
      "js/vendor/requirejs/require.js",
      "js/vendor/jquery/jquery.js",
      "js/vendor/underscore-amd/underscore.js",
      "js/vendor/backbone-amd/backbone.js",
      "js/vendor/text/text.js",
      "js/vendor/easytabs/lib/jquery.easytabs.js",
      "js/vendor/raven-js/dist/1.0.8/raven.js"
    ],
    dest: "dist/",
    options: {
      mode: true
    }
  });

  config.set("clean.src", ["dist"]);

  config.set("env.src", ".<%= envMode %>-env");

  config.set("watch", {
    files: ["src/**/*.*"],
    tasks: ["build"],
    options: {
      spawn: false
    }
  });

  config.set("replace.files", {
    options: {
      variables: {
        "basecampClientId": "<%= process.env['BASECAMP_CLIENT_ID'] %>",
        "basecampSecret": "<%= process.env['BASECAMP_SECRET'] %>",
        "sentryUrl": "<%= process.env['SENTRY_URL'] %>",
        "version": "<%= pkg.version %>",
        "description": "<%= pkg.description %>"
      }
    },
    files: [
      { expand: true, src: ["dist/js/config_keys.js", "dist/manifest.json"] }
    ]
  });

  config.set("shell.zip", {
    command: "cd dist && zip -r basecamp_notifier_<%= pkg.version %>_<%= envMode %>.zip *"
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-replace");
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-env");

  var buildSteps = [
    "env",
    "clean",
    "copy",
    "replace"
  ];

  config.registerTask("build", buildSteps);
  config.registerTask("pack", buildSteps.concat(["shell:zip"]));
};
