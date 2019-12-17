const logger = require("consola").withScope("apollo:error");

export default (error, nuxtContext) => {
  logger.error(error);
};
