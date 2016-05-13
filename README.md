# 使用 Webpack 和 ES6 进行 React 开发

本文主要是讲 React + Webpack + ES6 组合开发时，环境的搭建。关于 React 的入门，后面另开一文。

本文最终的输出是一个 Hello World 。

如果你使用 sublime 开发，可以安装 [sublime-react][1] 插件。

## 安装依赖项

在项目目录下 ，初始化一个 `package.json` 文件，执行 

    npm init

安装 `react` 和 `react-dom` 依赖

    npm install react react-dom --save

安装 `webpack` 和 `webpack-dev-server` 依赖：

    npm install webpack webpack-dev-server --save-dev 

安装 `babel` 依赖：

    npm install babel-loader babel-core babel-preset-react babel-preset-es2015 --save-dev

## 代码编写

本文示例最终的目录结构是这样的：

```
--your project
  |--components
    |--Hello（组件1）
      |--index.jsx
    |--World（组件2）
      |--index.jsx  
    |--index.js（入口文件）
  |--build（该文件夹及其中文件是 webpack 打包后生成的）
    |--bundle.js（输出文件）
  |--package.json
  |--webpack.config.js
  |--index.html
```

### 创建 React 组件

按照前面的目录结构，新建一个 components 文件夹，存放所有组件。

在 components 下建一个 Hello 文件夹，用来存放 Hello 组件的逻辑和样式。

`Hello/index.js` 的代码如下：

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
	render() {
		return <h1>Hello</h1>
	}
}

ReactDOM.render(<Hello />, document.getElementById('hello'));
```

World 组件的开发同上，略去。

### 创建页面

创建一个 HTML 页面，来使用前面创建的两个组件。

`index.html` 的代码如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World</title>
  </head>
  <body>
    <div id="hello"></div>
    <div id="world"></div>
  </body>
</html>
```

## 使用 Webpack 打包

Webpack 是一个前端模块加载兼打包工具，可以对 JS、CSS 和 图片 等都作为模块来使用和处理。对不同类型的需要编译的文件，需要使用相应的加载器（比如用 babel 转译 ES6）。

另外，由于 Webpack 需要一个入口文件来进行分析和处理，需要先将 React 组件引入到一个主文件。

从前文的目录结构可以看出，`components/index.js` 就是这个主文件，它的代码如下：

```javascript
import Hello from './Hello/index.jsx';
import World from './World/index.jsx';
```

下面就是 Webpack 配置文件 `webpack.config.js` 的编写，代码如下：

```javascript
var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(__dirname, './components/index.js');
var BUILD_PATH = path.resolve(__dirname, './build');

module.exports = {
	entry: APP_PATH,
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react']
			}
		}]
	}
}
```

最后，需要将编译打包后的文件 `bundle.js` 引入到 `index.html`

```html
<body>
  ...
  <script src="./build/bundle.js"></script>
</body>
```

## 构建和启动

前面的开发完成后，需要执行 `webpack.config.js` 中的构建任务，生成 `bundle.js`，这个操作可以在 `package.json` 中配置：

```javascript
"scripts": {
  "build": "webpack"
}
```

执行 `npm run build` 完成构建，此时打开 `index.html` ，即可看到效果。

这种方式显得略 low，一种更好的方式是启动一个静态资源服务器，在这里用的是前面安装好的 `webpack-dev-server` ，在 `package.json` 中配置：

```javascript
"scripts": {
  "dev": "webpack-dev-server --devtool eval --progress --colors"
}
```

简单解释一下 dev 中各个参数的含义：`webpack-dev-server` 在 `localhost:8080` 建立一个 Web 服务器；`--devtool eval` 映射编译好的源码，用于调试；`--progress` 显示代码打包进度；`--colors` 表示在命令行中显示颜色。另外这里还可以用 `--content-base` 来指定 server 启动后的内容目录（比如 build 或 dist，缺省为当前目录）。

执行 `npm run dev` 启动 server，此时打开 `http://localhost:8080` ，即可看到效果。


  [1]: https://github.com/facebookarchive/sublime-react