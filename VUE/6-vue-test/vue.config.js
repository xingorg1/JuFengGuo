module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/myBlog/' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/_var.scss";
        `
      }
    }
  }
}
