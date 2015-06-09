var config = require("grunt-settings");

module.exports = function (grunt) {
  var envMode = (grunt.option("environment") || "development"),
      pkg = grunt.file.readJSON("package.json");

  config.init(grunt);

  config.set("pkg", pkg);
  config.set("envMode", envMode);

  config.set("requirejs.compile.options", {
    name: "main",
    baseUrl: "./src/js",
    out: "dist/js/main.js",
    generateSourceMaps: true,
    preserveLicenseComments: false,
    optimize: "none",
    onBuildWrite: function (moduleName, path, singleContents) {
      return singleContents.replace(/jsx!/g, "");
    },
    paths: {
      "fluxo": "vendor/fluxo/dist/fluxo",
      "react": "vendor/react/react-with-addons",
      "JSXTransformer": "vendor/react/JSXTransformer",
      "jsx": "vendor/requirejs-react-jsx/jsx",
      "underscore": "vendor/underscore-amd/underscore",
      "app": "app"
    },
    shim: {
      "react": {
        "exports": "React"
      },
      "JSXTransformer": "JSXTransformer"
    },
    config: {
      jsx: {
        fileExtension: ".jsx"
      }
    }
  });

  config.set("copy.expand", {
    expand: true,
    cwd: "src/",
    src: [
      "**",
      "!js/**",
      "js/vendor/requirejs/require.js",
      "js/vendor/raven-js/dist/raven.js",
      "js/global.js"
    ],
    dest: "dist/",
    options: {
      mode: true
    }
  });

  config.set("clean.src", ["dist"]);

  config.set("env.src", ".<%= envMode %>-env");

  config.set("watch", {
    files: ["src/**/*.*", "Gruntfile.js"],
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
      {
        expand: true,
        src: [
          "dist/js/global.js",
          "dist/js/main.js",
          "dist/manifest.json"
        ]
      }
    ]
  });

  config.set("shell.zip", {
    command: "cd dist && zip -r basecamp_notifier_<%= pkg.version %>_<%= envMode %>.zip *"
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks("grunt-replace");
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-env");

  var buildSteps = [
    "env",
    "clean",
    "copy",
    "requirejs",
    "replace"
  ];

  config.registerTask("build", buildSteps);
  config.registerTask("pack", buildSteps.concat(["shell:zip"]));
};
