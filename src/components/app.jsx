import React from 'react';
import {Router,Route,RouteHistory,Link} from 'similar-react-router';
import FormIndex from './form/index.jsx';
import FormBase from './form/base.jsx';
import SampleIndex from './sample/index.jsx';
import SampleBase from './sample/base.jsx';
import SampleIcon from './sample/icon.jsx';
import SampleUpload from './sample/upload.jsx';

class TopHeader extends React.Component{
	render(){
		var hash = RouteHistory.curHash.hash;

		return (<div className="top-navbar">
				<ul className="navbar">
					<li className="nav-item"> 
						<a role="button" className={"item-title"+(hash.indexOf("docs")!=-1?" active":"")} >
							文档
						</a>
						<a role="button" className={"item-title"+(hash.indexOf("demo")!=-1?" active":"")}>
							示例
						</a>
						<a role="button" className="item-title" href="https://github.com/liuhong1happy/react-umeditor">
							Github
						</a>
					</li>
				</ul>
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
							基础示例
						</div>
						<ul className="sub-navbar">
							<li className="nav-item">
								<Link className={ hash.indexOf('/sample/base')!=-1?"active":"" } to="/demo/sample/base" anchor={true} role="button">最简单示例</Link>
							</li>
							<li className="nav-item">
								<Link className={ hash.indexOf('/sample/icon')!=-1?"active":"" } to="/demo/sample/icon" anchor={true} role="button">自定义功能</Link>
							</li>
							<li className="nav-item">
								<Link className={ hash.indexOf('/sample/upload')!=-1?"active":"" } to="/demo/sample/upload" anchor={true} role="button">文件上传</Link>
							</li>
						</ul>
					</li>
					<li className="nav-item"> 
						<div className="item-title">表单示例</div>
						<ul className="sub-navbar">
							<li className="nav-item">
								<Link className={ hash.indexOf('/form/base')!=-1?"active":"" } to="/demo/form/base" anchor={true} role="button">简单的表单</Link>
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
			<Router defaultRoute="/demo/sample/base" path="/" component={UmeditorApp}>
				<Route path="demo/sample" component={SampleIndex}>
					<Route path="base" component={SampleBase}></Route>
					<Route path="icon" component={SampleIcon}></Route>
					<Route path="upload" component={SampleUpload}></Route>
				</Route>
				<Route path="demo/form" component={FormIndex}>
					<Route path="base" component={FormBase}></Route>
				</Route>
			</Router>
		)
	}
}
export default RouterApp;