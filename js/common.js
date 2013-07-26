require.config({
  baseUrl: "js",
  paths: {
    "jquery": "vendor/jquery/jquery",
    "underscore": "vendor/underscore-amd/underscore",
    "backbone": "vendor/backbone-amd/backbone",
    "backbone.deferred": "vendor/backbone.deferred/index",
    "text": "vendor/text/text",
    "easytab": "vendor/easytabs/lib/jquery.easytabs",
    "app": "app"
  },
  shim: {
    "backbone.deferred": {
      deps: ["underscore", "backbone"],
      exports: "deferred"
    },
    "easytab": {
      deps: ["jquery"]
    },
    "backbone.dual_storage": {
      deps: ["underscore", "backbone"],
      exports: "DualStorage"
    }
  }
});
