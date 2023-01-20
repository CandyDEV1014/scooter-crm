module.exports = {
  transpileDependencies: ["vuetify", "vuex-persist"],
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "~@/styles/variables.scss";',
      },
    },
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: "false",
    },
    electronBuilder: {
      externals: ["pg", "sqlite3", "tedious", "pg-hstore"],
      preload: "src/preload.js",
      mainProcessWatch: [
        "src/modules/AuthUtility.js",
        "src/modules/DatabaseUtility.js",
        "src/modules/FileSystemUtility.js",
      ],
      // builderOptions: {
      //   productName: "Scooter",
      //   appId: "ai.scooter",
      //   directories: {
      //     output: "release",
      //     buildResources: "public",
      //   },
      //   win: {
      //     icon: "public/icon.ico",
      //     target: ["nsis"],
      //     publish: [
      //       {
      //         provider: "github",
      //         owner: "scooter-ai",
      //         repo: "Scooter",
      //         releaseType: "prerelease",
      //       },
      //     ],
      //   },
      // },
    },
  },
  devServer: {
    disableHostCheck: true,
  },
};
