Raven.config("@@sentryUrl", {
  tags: { version: "@@version" }
}).install();
