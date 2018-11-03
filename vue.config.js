var data = require('./data.json');
var path = require('path');
var seller = data.seller;
var goods = data.goods;
var ratings = data.ratings;
module.exports = {
  lintOnSave: 'error',
  baseUrl: './',
  devServer: {
    host: '0.0.0.0',
    before(app) {
      app.get('/api/seller', function(req, res) {
        res.json({
          errno: 0,
          data: seller
        });
      });
      app.get('/api/goods', function(req, res) {
        res.json({
          errno: 0,
          data: goods
        });
      });
      app.get('/api/ratings', function(req, res) {
        res.json({
          errno: 0,
          data: ratings
        });
      });
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@@': path.join(__dirname, '/src/components'),
        common: path.join(__dirname, '/src/common')
      }
    }
  }
};
