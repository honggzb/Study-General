module.exports = {
    entry: {
        app: './src/app.ts' //入口文件，若不配置webpack4将自动查找src目录下的index.js文件
    },
    output: {
        filename: '[name].[hash:5].js'
        //输出文件名，[name]表示入口文件js名, 可将出口文件名和入口文件名一一对应
        //添加hash可以防止文件缓存，每次都会生成5位的hash串
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', {
                            targets: {
                                browsers: ['>1%', ' last 2 versions']
                            }
                        }]
                    }
                },
                exclude: /node_modules/
            }
         ]
    }
}
