const pkg = require("./package");
require("dotenv").config();

const config = async () => {
  // Getting global content from CMS
  const CMS_CONTENT = {}; // TODO: Get content from CMS

  // Defining site general variables
  const DEV = process.env.NODE_ENV === "development";
  const COMMIT_REF = process.env.COMMIT_REF
    ? process.env.COMMIT_REF
    : "unknow commit reference";

  const APP_NAME = process.env.APP_NAME || pkg.name;
  const APP_DESC = process.env.APP_DESC || pkg.description;
  const APP_HOST = process.env.APP_HOST || "0.0.0.0";
  const APP_PORT = process.env.APP_PORT || 3000;
  const APP_URL = process.env.APP_URL || `http://${APP_HOST}:${APP_PORT}`;
  const APP_LANG = process.env.APP_LANG || "en";

  const GTM_ID = process.env.GTM_ID || "";
  const GTM_FRIENDLY = process.env.GTM_FRIENDLY || false;
  const GTM_DEV = process.env.GTM_DEV || false;

  return {
    DEV,
    COMMIT_REF,

    APP_NAME,
    APP_DESC,
    APP_HOST,
    APP_PORT,
    APP_URL,
    APP_LANG,

    GTM_ID,
    GTM_FRIENDLY,
    GTM_DEV,

    CMS_CONTENT
  };
};

module.exports = { config };
