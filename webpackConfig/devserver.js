const path = require('path')
module.exports = function(){
  return{
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    }
  }
}