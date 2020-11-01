const CompressionPlugin = require('compression-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const path = require('path');

module.exports = {
  transpileDependencies: ['vuex-module-decorators'],
  configureWebpack: {
    plugins: [
      // new PrerenderSPAPlugin({
      //   staticDir: path.join(__dirname, 'dist'),
      //   routes: ['/'],
      //   minify: {
      //     collapseBooleanAttributes: true,
      //     collapseWhitespace: true,
      //     decodeEntities: true,
      //     keepClosingSlash: true,
      //     sortAttributes: true
      //   },
      //   captureAfterElementExists: '.view-visable'
      // })
    ],
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        name: false,
        chunks: 'all'
      }
    }
  },
  chainWebpack(config) {
    config.plugin('CompressionPlugin').use(CompressionPlugin);
    config.plugins.delete('prefetch');
    config.resolve.alias
      .set('@components', path.resolve(__dirname, 'src/components'))
      .set('@views', path.resolve(__dirname, 'src/views'))
      .set('@mixins', path.resolve(__dirname, 'src/mixins'))
      .set('@plugins', path.resolve(__dirname, 'src/plugins'))
      .set('@scss', path.resolve(__dirname, 'src/assets/scss'))
      .set('@images', path.resolve(__dirname, 'src/assets/images'))
      .set('@fonts', path.resolve(__dirname, 'src/assets/fonts'));

    // remove old images loader rule
    const imagesRule = config.module.rule('images');
    imagesRule.uses.clear();

    // use responsive-loader for images rule
    imagesRule
      .use('responsive-loader')
      .loader('responsive-loader')
      .tap((option) => {
        const newOption = {
          adapter: require('responsive-loader/sharp'), // use sharp
          // sizes: [320, 640, 800, 1024, 1366],
          min: 480,
          max: 1280,
          steps: 5,
          placeholder: false, // if true image convert to uri base64
          name: 'images/[name]-[width].[ext]'
        };
        return { ...option, ...newOption };
      })
      .end();
  }
};
