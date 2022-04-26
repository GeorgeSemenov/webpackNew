const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devserver = require('./webpackConfig/devserver')
const extractCss = require('mini-css-extract-plugin')
// const merge = require('webpack-merge')


module.exports = function(env, argv){
    console.log(`Знаешь ли ты что mode = ${argv.mode}`);
    return Object.assign({},
        {
            entry: {
                main: path.resolve(__dirname, './src/index.js'),
            },
            output: {
                path: path.resolve(__dirname, './dist'),
                filename: '[name].bundle.js',
                assetModuleFilename: "assets/[hash][ext][query]",//Все ресурсы помеченные как type:asset будут сохраняться теперь в папку assets в папке dist
                clean: true,//Теперь при создании папка dist вначале будет удаляться, а затем будет наполняться.
            },
            devtool: 'source-map',//Будет создаваться сорсмап, это значит, что когда ты вызовешь инструмент разработчика в браузере и посмотрищь на свойства элемента, то там будет прописанно, в каком конкретно файле прописанно это свойства, если не указать сорсмап, то все свйоства будут храниться в inline, т.к. в режиме разработки мы сохраняем их туда.
            plugins: [
                new extractCss({
                    filename: '[name].[contenthash].css',//Теперь генерируемый файл стилей будет иметь в названии хэш, чтобы не подвергаться кэшированию браузером клиента.
                }),
                new HtmlWebpackPlugin({
                    title: 'webpack Boilerplate',
                    // template: path.resolve(__dirname, './src/template.html'), // шаблон
                    template: path.resolve(__dirname, './src/index.pug'), // шаблон
                    filename: 'index.html', // название выходного файла
                }),
            ],
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: [
                            extractCss.loader,
                            'css-loader'
                        ]
                    },
                    {
                        test: /\.jpg$/i,
                        type: 'asset/resource'
                    },
                    {
                        test: /\.pug$/,
                        loader: 'pug-loader',
                        exclude: /(node_modules|bower_components)/,//Не удалось найти, что значит эта строка, но наверное, она исключает какой-то набор файлов, которые не нужно будет подгружать через pug-loader
                    }
                ]
            }
        },
        devserver()
    )
}