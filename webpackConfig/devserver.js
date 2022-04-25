const path = require('path')
module.exports = function(){
  return{
    devServer: {
        watchFiles: ["*.html"],//Если не вписать эту строку, то devserver будет следить только за обновлениями в файлах js и scss(если они import'ы к ним прописаны в js)
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    }
  }
}