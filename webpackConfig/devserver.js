const path = require('path')
module.exports = function(){
  return{
    devServer: {
<<<<<<< HEAD
      watchFiles: ["src/*.html"],//Если не вписать эту строку, то devserver будет следить только за обновлениями в файлах js и scss(если они import'ы к ним прописаны в js)
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
=======
        watchFiles: ["*.html"],//Если не вписать эту строку, то devserver будет следить только за обновлениями в файлах js и scss(если они import'ы к ним прописаны в js)
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
>>>>>>> 52e2d1aa488d3bb9b8445a36acf983afe406d55b
    }
  }
}