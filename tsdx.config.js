const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const image = require('@rollup/plugin-image')
const copy = require('rollup-plugin-copy-assets');

module.exports = {
  rollup(config, options) {
    console.warn('hehe')
    config.plugins = [
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: false,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: !!options.writeMeta,
      }),
      image({include:['**/*.png','**/*.jpg']}),
      copy({
        assets:["src/assets"]
      }),
      ...config.plugins
    ]
    return config;
  },
};