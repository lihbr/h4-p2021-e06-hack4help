module.exports = async () => {
  const env = await require("./env").config();

  const script = [];

  return {
    /*
     ** Application mode
     */
    mode: "spa",

    /*
     ** Application directory
     */
    srcDir: "src/",

    /*
     ** Headers of the page, see in ./config
     */
    head: {
      title: env.APP_NAME,
      titleTemplate: `%s - ${env.APP_NAME}`,
      htmlAttrs: {
        lang: env.APP_LANG,
        class: ""
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, user-scalable=no"
        },
        {
          hid: "description",
          name: "description",
          content: env.APP_DESC
        },
        { name: "msapplication-TileColor", content: "#da532c" },
        { name: "theme-color", content: "#feeeee" }
      ],
      script,
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png"
        },
        {
          rel: "manifest",
          href: "/site.webmanifest"
        },
        {
          rel: "mask-icon",
          href: "/safari-pinned-tab.svg",
          color: "#e84311"
        }
      ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: "#000000" },

    /*
     ** Global CSS
     */
    css: ["~/assets/sass/style.sass"],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [],

    /*
     ** Nuxt.js modules
     */
    modules: [],

    /*
     ** Nuxt.js build modules
     */
    buildModules: [
      "@nuxtjs/eslint-module",
      "~/modules/build",
      "~/modules/components",
      "~/modules/tailwindcss",
      "@nuxtjs/style-resources",
      "@nuxtjs/sitemap",
      ["@nuxtjs/netlify-files", { existingFilesDirectory: __dirname }],
      [
        "@nuxtjs/google-tag-manager",
        {
          id: env.GTM_ID,
          pageTracking: true,
          respectDoNotTrack: env.GTM_FRIENDLY,
          dev: env.GTM_DEV
        }
      ],
      "@nuxtjs/apollo",
      "nuxt-svg-loader"
    ],

    /*
     ** Style resources
     */
    styleResources: {
      sass: "~/assets/sass/core.sass"
    },

    /*
     ** Sitemap
     */
    sitemap: {
      hostname: env.APP_URL,
      gzip: true,
      exclude: []
    },

    /*
     ** Apollo
     */
    apollo: {
      tokenName: env.GQL_TOKEN_NAME,
      cookieAttributes: {
        expires: 7,
        path: "/",
        // domain: "example.com",
        secure: !env.DEV
      },
      watchLoading: "~/plugins/apollo-watch-loading-handler.js",
      errorHandler: "~/plugins/apollo-error-handler.js",
      clientConfigs: {
        default: {
          httpEndpoint: env.GQL_HTTP_URL,
          wsEndpoint: env.GQL_WS_URL,
          tokenName: env.GQL_TOKEN_NAME
        },
        spacex: {
          httpEndpoint: "https://api.spacex.land/graphql/"
        }
      }
    },

    /*
     ** Env
     */
    env,

    /*
     ** Generate
     */
    generate: {
      fallback: true
    },

    /*
     ** Server configuration
     */
    server: {
      host: env.APP_HOST,
      port: env.APP_PORT
    }
  };
};
