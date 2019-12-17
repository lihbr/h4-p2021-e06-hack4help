const logger = require("consola").withScope("apollo:watch-loading");

export default (isLoading, countModifier, nuxtContext) => {
  loading += countModifier;
  logger.log("Global loading", loading, countModifier);
};
