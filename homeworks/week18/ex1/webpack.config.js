const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/script.js', // 進入的檔案可以不只一個
  output: {
    path: path.resolve(__dirname, 'dist'), // 指定資料夾輸出，如果沒有這個資料夾也會自動建一個
    filename: 'bundle.[hash:6].js', // 輸出後的檔名，hash:6 代表 hash 出 6 個字就好（預設 20），也可以不設，存放位置不同 hash 也會不同
  },
  module: {
    rules: [{
      test: /\.(scss|sass)$/, // 找字尾是 scss 或 sass 檔案
      use: [
        MiniCssExtractPlugin.loader, // 最後把 CSS 從 JS 中抽出來，要由下往上看
        'css-loader', // 再把 CSS 載入 JS
        'sass-loader', // 先把 SASS 轉譯成 CSS
      ],
    },
    {
      test: /\.js$/, // 找字尾是 js 檔案
      use: [{
        loader: 'babel-loader', // 轉成 ES5 語法
        options: {
          presets: ['@babel/preset-env'],
        },
      }],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.[hash:6].css', // CSS 輸出想要變什麼檔名，hash 會和 js 相同
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ // 壓縮 JS，不過 Webpack v4 本來就預設好了可以刪掉
        cache: true,
        parallel: true, // 開啟並行壓縮
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}), // 把抽出的 CSS 壓縮
    ],
  },
};
