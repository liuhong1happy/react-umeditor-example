# 使用 Webpack 和 ES6 进行 React 开发

工欲善其事必先利其器，在进行 React 的开发时，通常会结合 Webpack 和 ES6 一起进行。本文讲的正是如何使用 React + Webpack + ES6 进行组合开发。关于 React 的入门，后面另开一文。

本文最终的输出是一个 Hello World 。

本文所涉及的代码在 [这里][1] ，可以直接作为一个种子项目使用：

```
git clone https://github.com/huangtengfei/react-webpack-es6.git
cd react-webpack-es6
npm install
npm run dev
```

如果你使用 sublime 开发，可以安装 [sublime-react][2] 插件。

## 安装依赖项

在项目目录下 ，初始化一个 `package.json` 文件，执行：

    npm init

安装 `react` 和 `react-dom` 依赖：

    npm install react react-dom --save

安装 `webpack` 和 `webpack-dev-server` 依赖：

    npm install webpack webpack-dev-server --save-dev 

安装 `babel` 依赖：

    npm install babel-loader babel-core babel-preset-react babel-preset-es2015 --save-dev

## 代码编写

本文示例最终的目录结构是这样的：

```
--your project
  |--components（组件目录）
    |--Hello（组件1）
      |--imgs
        |--bg.png
      |--index.jsx
      |--index.less
    |--World（组件2）
      |--index.jsx
      |--index.less
    |--index.js（入口文件）
  |--build（输出目录）
    |--index.html
    |--bundle.js（输出文件，由 webpack 打包后生成的）
  |--package.json
  |--webpack.config.js
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

在 build 目录下创建一个 HTML 页面，来使用前面创建的两个组件。

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
      loaders: ['babel-loader?presets[]=es2015,presets[]=react']
    }]
  }
}
```

最后，需要将编译打包后的文件 `bundle.js` 引入到 `index.html` 中：

```html
<body>
  ...
  <script src="./bundle.js"></script>
</body>
```

## 构建和启动

### 构建

前面的开发完成后，需要执行 `webpack.config.js` 中的构建任务，生成 `bundle.js`，这个操作可以在 `package.json` 中配置：

```javascript
"scripts": {
  "build": "webpack"
}
```

执行 `npm run build` 完成构建，此时打开 `index.html` ，即可看到效果。

### 启动服务器

但这种方式显得略 low，一是它是双击以文件的形式打开 HTML 页面，二是每次有更改都要手动执行 `npm run build` 重新打包。

一种更好的方式是启动一个静态资源服务器，监听文件内容修改并自动打包。在这里用的是前面安装好的 `webpack-dev-server` ，在 `package.json` 中配置：

```javascript
"scripts": {
  "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build"
}
```

简单解释一下 dev 中各个参数的含义：`webpack-dev-server` 在 `localhost:8080` 建立一个 Web 服务器；`--devtool eval` 映射编译好的源码，用于调试；`--progress` 显示代码打包进度；`--colors` 表示在命令行中显示颜色； `--content-base` 来指定 server 启动后的内容目录。

执行 `npm run dev` 启动 server，此时打开 `http://localhost:8080` ，即可看到效果。修改一下 Hello 或者 World 组件中的内容，刷新页面，你会发现浏览器中内容也相应改变了。

### 自动刷新

前面实现了对文件修改的监听和自动打包，但浏览器还需要手动刷新。其实可以在 Webpack 的配置文件中增加一个入口点，实现自动刷新。

```javascript
···
    entry: [
    'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      APP_PATH
  ],
···
```

这样，应用在修改后，浏览器就会自动刷新了。

## 更完整的种子

其实讲到这里本文已经可以结束了，不过为了让种子更完整，并体现 Webpack 的强大，再加上点样式和图片吧。

### 处理样式

不管什么类型的资源，Webpack 都需要相应的 loader 来处理。对于普通的 css，需要 `css-loader` 和 `style-loader` 两种 loader，前者会遍历所有 css 并对 `url()` 处理，后者将样式插入到页面的 style 标签中。对于预编译 css 语言，还需要额外的 loader，比如 `less-loader` 或 `sass-loader`，这里用 [less][3] 举例。

首先，安装 loader ：

```
npm install less-loader css-loader style-loader --save-dev
```

然后，在 `webpack.config.js` 中配置 loader，注意 loader 的处理顺序是从右到左的：

```javascript
...
{
    test: /\.less$/,
    loader: 'style!css!less'
}
...
```

配置完之后要重新运行一下 `npm run dev` 

接着，在 Hello 和 World 组件中各添加一个样式文件，这里用 `Hello/index.less` 举例：

```less
@lightgrey: #ccc;

h1 {
  background: @lightgrey;
}
```

最后，在 `components/index.js` 中引入 less 文件：

```javascript
import './Hello/index.less';
import './World/index.less';
```

切换到浏览器，看一下是不是有变化了呢~

### 处理图片

为了减轻网络请求的压力，有时候会有将小图片转成 BASE64 字符串的需求，这个可以通过 `url-loader` 来实现。

同处理样式中的操作，首先安装 `url-loader` ：

```
npm install url-loader --save-dev
```

然后配置 `webpack.config.js` ：

```javascript
...
{
    test: /\.(png|jpg)$/,
    loader: 'url?limit=50000'
}
...
```

重新重新运行一下 `npm run dev` 

接着，在 Hello 组件下建一个 `imgs` 文件夹，并放入一张小于 50K 的 `bg.png` 做背景图片，然后修改 `Hello/index.less` 文件：

```less
h1 {
  background: url('./img/bg.png');
}
```

切换到浏览器，审查元素，看一下图片是不是转成 BASE64 字符串了呢~

到此为止，这已经是一个较为完整的种子了。想对 React 、Webpack 和 ES6 各自做深入了解的，请自行查阅资料~

## 补充

### loader 的写法

在使用 Webpack 打包小节 `webpack.config.js` 的编写中，`babel-loader` 最初我是这样写的：

```javascript
loaders: [{
    test: /\.jsx?$/,
    loader: 'babel-loader',
    query: {
        presets: ['es2015', 'react']
    }
}]
```

后来为了使用热加载，引入了 `react-hot` ，loader 要改为 loaders，即：

```javascript
...
    loaders: ['babel-loader', 'babel-loader'],
    query: {
        presets: ['es2015', 'react']
    }
...    
```

这时在执行构建的时候，会报错 [Error: Cannot define 'query' and multiple loaders in loaders list][4]，于是改成这种写法。不过后来直接用 webpack-dev-server 的 `--hot` 选项，也没引入 `react-hot` 了，但此处写法仍保留，便于后面扩展 loader 。

### 安装 less-loader 报错

如果在安装样式的几个 loader 的时候，报以下错误：

```
UNMET PEER DEPENDENCY less@^2.3.1
```

不妨试试用 cnpm 单独安装 less ：

```
tnpm i less@^2.3.1
```

## 参考

[React Webpack 小书][5]

[Setting up React for ES6 with Webpack and Babel][6]

[Webpack傻瓜式指南][7]


  [1]: https://github.com/huangtengfei/react-webpack-es6
  [2]: https://github.com/facebookarchive/sublime-react
  [3]: http://less.bootcss.com/
  [4]: http://stackoverflow.com/questions/35266706/webpack-error-cannot-define-query-and-multiple-loaders-in-loaders-list
  [5]: https://fakefish.github.io/react-webpack-cookbook
  [6]: https://www.twilio.com/blog/2015/08/setting-up-react-for-es6-with-webpack-and-babel-2.html
  [7]: https://zhuanlan.zhihu.com/p/20367175