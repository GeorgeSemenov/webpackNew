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
            plugins: [
                new extractCss({
                    filename: '[name].[contenthash].css',//Теперь генерируемый файл стилей будет иметь в названии хэш, чтобы не подвергаться кэшированию браузером клиента.
                }),
                new HtmlWebpackPlugin({
                    title: 'webpack Boilerplate',
                    template: path.resolve(__dirname, './src/template.html'), // шаблон
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
                    }
                ]
            }
        },
        devserver()
    )
}