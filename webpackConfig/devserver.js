const path = require('path')
module.exports = function(){
  return{
    devServer: {
      static: {
        directory: './src',
        watch: true,
      },
      compress: true,
      port: 9000,
    }
  }
}