module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/SCSS/main.scss";`
      }
    }
  }
};