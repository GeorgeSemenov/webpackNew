const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devserver = require('./webpackConfig/devserver')
const extractCss = require('mini-css-extract-plugin')
// const merge = require('webpack-merge')
//Информацию о настройке многостраничности брал отсюда : https://dev.to/marcinwosinek/tutorial-for-building-multipage-website-with-webpack-4gdk
const pages = [//Моссив страниц
            `index`,
            `about-bomj`,
            ];

module.exports = function(env, argv){
    console.log(`Знаешь ли ты что mode = ${argv.mode}`);
    return Object.assign({},
        {
            entry: pages.reduce((config,page)=>{//reduce перебирает все значения массива и в каждой итерации может использовать значение из предыдущей итерации. Возвращает массив.
                config[page] = `./src/pages/${page}/${page}.js`;
                return config;
            },{}),//вторым аргументом reduce является первоначальной значение т.е. изначально config = {}, а затем этот объект наполняется свойствами, которые содержат адреса страниц
            // entry: { // Это старая конфигурация, для одной странички
            //     main: path.resolve(__dirname, './src/index.js'),
            // },
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
                // new HtmlWebpackPlugin({//Старая конфигурация для одной странички
                //     title: 'webpack Boilerplate',
                //     // template: path.resolve(__dirname, './src/template.html'), // шаблон
                //     template: path.resolve(__dirname, './src/index.pug'), // шаблон
                //     filename: 'index.html', // название выходного файла
                // }),
            ].concat(
                pages.map(
                        (page)=>{
                            return new HtmlWebpackPlugin({
                                template:  `./src/pages/${page}/${page}.pug`,
                                filename:  `${page}.html`,
                                chunks: [page],//Эта запись выбирает повторяющиеся зависимости из файлов и выписывает его в отдельный файл
                            })
                        }
                    )
                ),
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