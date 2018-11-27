import React from 'react';
import {Router,Route,RouteHistory,Link} from 'similar-react-router';

import FormIndex from './form/index.jsx';
import FormBase from './form/base.jsx';
import FormChange from './form/change.jsx';
import FormMulti from './form/multi.jsx';

import SimpleIndex from './simple/index.jsx';
import SimpleBase from './simple/base.jsx';
import SimpleIcon from './simple/icon.jsx';
import SimpleMulti from './simple/multi.jsx'

import PluginIndex from './plugin/index.jsx';
import PluginUpload from './plugin/upload.jsx';
import PluginQiniu from './plugin/qiniu.jsx'
import PluginToolbar from './plugin/toolbar.jsx';
import PluginFormula from './plugin/formula.jsx';

class TopHeader extends React.Component{
	render(){
		var hash = RouteHistory.curHash.hash;

		return (<div className="top-navbar">
				<div className="navbar">
					<div className="nav-item"> 
						<a role="button">
							<div className="header-logo"></div>
						</a>
						<a role="button" className={"item-title"+(hash.indexOf("docs")!=-1?" active":"")} title="暂未开放，敬情期待">
							文档
						</a>
						<a role="button" className={"item-title"+(hash.indexOf("demo")!=-1?" active":"")}>
							示例
						</a>
						<a role="button" className="item-title" href="https://github.com/liuhong1happy/react-umeditor" target="_blank">
							Github
						</a>
					</div>
				</div>
			</div>)
	}
}
class RightNavbar extends React.Component {
	render () {
		var hash = RouteHistory.curHash.hash;
		return (
			<div className="left-navbar">
				<ul className="navbar">
					<li className="nav-item"> 
						<div className="item-title">
							<span className="icon-base"></span>
							<span className="icon-title">基础示例</span>
						</div>
						<ul className="sub-navbar">
							<li className={["nav-item", hash.indexOf('/simple/base')!=-1?"active":""].join(" ")}>
								<Link to="/demo/simple/base?title=基础示例 > 最简单示例" anchor={true} role="button">
									<span className="icon-simple"></span>
									<span className="icon-title">最简单示例</span>
								</Link>
							</li>
							<li className={["nav-item", hash.indexOf('/simple/icon')!=-1?"active":""].join(" ")}>
								<Link to="/demo/simple/icon?title=基础示例 > 自定义功能" anchor={true} role="button">
									<span className="icon-icons"></span>
									<span className="icon-title">自定义功能</span>
								</Link>
							</li>
							<li className={["nav-item", hash.indexOf('/simple/multi')!=-1?"active":""].join(" ")}>
								<Link to="/demo/simple/multi?title=基础示例 > 同时渲染更多" anchor={true} role="button">
									<span className="icon-more"></span>
									<span className="icon-title">同时渲染更多</span>
								</Link>
							</li>
						</ul>
					</li>
					<li className="nav-item"> 
						<div className="item-title">
							<span className="icon-plugin"></span>
							<span className="icon-title">插件示例</span>
						</div>
						<ul className="sub-navbar">
							<li className={["nav-item", hash.indexOf('/plugin/upload')!=-1?"active":""].join(" ")}>
								<Link to="/demo/plugin/upload?title=插件示例 > 文件上传" anchor={true} role="button">
									<span className="icon-upload"></span>
									<span className="icon-title">图片上传</span>
								</Link>
							</li>
							<li className={["nav-item", hash.indexOf('/plugin/qiniu')!=-1?"active":""].join(" ")}>
								<Link to="/demo/plugin/qiniu?title=插件示例 > 文件上传" anchor={true} role="button">
									<span className="icon-upload"></span>
									<span className="icon-title">七牛上传</span>
								</Link>
							</li>
							<li className={["nav-item", hash.indexOf('/plugin/toolbar')!=-1?"active":""].join(" ")}>
								<Link to="/demo/plugin/toolbar?title=插件示例 > 自定义功能按钮" anchor={true} role="button">
									<span className="icon-link"></span>
									<span className="icon-title">自定义功能按钮</span>
								</Link>
							</li>
							<li className={["nav-item", hash.indexOf('/plugin/formula')!=-1?"active":""].join(" ")}>
								<Link to="/demo/plugin/formula?title=插件示例 > 公式编辑" anchor={true} role="button">
									<span className="icon-link"></span>
									<span className="icon-title">公式编辑</span>
								</Link>
							</li>
						</ul>
					</li>
					<li className="nav-item"> 
						<div className="item-title">
							<span className="icon-form"></span>
							<span className="icon-title">表单示例</span>
						</div>
						<ul className="sub-navbar">
							<li className={["nav-item", hash.indexOf('/form/base')!=-1?"active":""].join(" ") }>
								<Link to="/demo/form/base?title=表单示例 > 简单的表单" anchor={true} role="button">
									<span className="icon-simple-form"></span>
									<span className="icon-title">简单的表单</span>
								</Link>
							</li>
							<li className={["nav-item", hash.indexOf('/form/change')!=-1?"active":""].join(" ")}>
								<Link to="/demo/form/change?title=表单示例 > 内容更改事件" anchor={true} role="button">
									<span className="icon-change-form"></span>
									<span className="icon-title">内容更改事件</span>
								</Link>
							</li>
							<li className={["nav-item", hash.indexOf('/form/multi')!=-1?"active":""].join(" ")}>
								<Link to="/demo/form/multi?title=表单示例 > 同时渲染更多" anchor={true} role="button">
									<span className="icon-more"></span>
									<span className="icon-title">同时渲染更多</span>
								</Link>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		)
	}
}

class UmeditorApp extends React.Component {
	render(){
		return (<div className="ueditor-app">
			<TopHeader />
			<RightNavbar />	
			<div className="right-content">
				{this.props.children}
			</div>
		</div>)
	}
}

class RouterApp extends React.Component {
	render(){
		return (
			<Router defaultRoute="/demo/simple/base" path="/" component={UmeditorApp}>
				<Route path="demo/simple" component={SimpleIndex}>
					<Route path="base" component={SimpleBase}></Route>
					<Route path="icon" component={SimpleIcon}></Route>
					<Route path="multi" component={SimpleMulti}></Route>
				</Route>
				<Route path="demo/plugin" component={PluginIndex}>
					<Route path="upload" component={PluginUpload}></Route>
					<Route path="qiniu" component={PluginQiniu}></Route>
					<Route path="toolbar" component={PluginToolbar}></Route>
					<Route path="formula" component={PluginFormula}></Route>
				</Route>
				<Route path="demo/form" component={FormIndex}>
					<Route path="base" component={FormBase}></Route>
					<Route path="change" component={FormChange}></Route>
					<Route path="multi" component={FormMulti}></Route>
				</Route>
			</Router>
		)
	}
}
export default RouterApp;