# webpack-react

## 安装本地 webpack
`$ yarn webpack webpack-cli webpack-dev-server -D`

## 配置运行脚本
```js
  "scripts": {
    "dev": "webpack-dev-server --mode development",
    "build": "webpack --mode production"
  },
```

## inline-source-map 源码映射文件
> webpack 打包的文件难以查找和阅读，source-map 会帮你定位到报错的位置

## plugin 之 html 打包
`$ yarn add html-webpack-plugin -D`

## css 抽离
`$ yarn add mini-css-extract-plugin -D`

> 依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html

## postcss-loader && autoprefixer
$ yarn add postcss-loader autoprefixer

- autoprefixer 自动添加前缀

- ./postcss.config.js

**注意顺序**
```js
    module: {
        rules: [
            {
                test: /\.styl/,
                use: [
                    'style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'
                ]
            }
        ]
    }
```


## babel 配置
`$ yarn babel-core babel-loader babel-preset-env babel-preset-react -D`

