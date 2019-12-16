const logger = require("./logger");

module.exports = function(moduleOptions) {
  this.nuxt.hook("build:before", () => {
    this.options.build.extractCSS = true;

    this.options.build.loaders.sass = this.options.build.loaders.sass || {};
    this.options.build.loaders.sass.implementation = require("sass");
    this.options.build.loaders.sass.fiber = require("fibers");

    // this.options.build.hardSource = {
    //   info: {
    //     level: "warn"
    //   }
    // };
  });

  logger.success("Build module initialized\n");
};
