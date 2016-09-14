import React from 'react';
import {Router,Route,RouteHistory,Link} from './base/react-router';

class RightNavbar extends React.Component {
	render () {
		return (
			<div className="left-navbar">
				<ul className="navbar">
					<li className="nav-item"> 
						<div className="item-title">基础示例</div>
						<ul className="sub-navbar">
							<li className="nav-item">最简单示例</li>
							<li className="nav-item">自定义功能</li>
						</ul>
					</li>
					<li className="nav-item"> 
						<div className="item-title">表单示例</div>
						<ul className="sub-navbar">
							<li className="nav-item">简单的表单</li>
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
			<Router defaultRoute="/sample/base" path="/" component={UmeditorApp}>
				
			</Router>
		)
	}
}
export default UmeditorApp;