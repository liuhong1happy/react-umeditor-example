import React from 'react';
import ReactDOM from 'react-dom';
import {RouteHistory} from 'similar-react-router';

class SimpleIndex extends React.Component {
	handleLoadFrame(){
		var frame = ReactDOM.findDOMNode(this.refs.frame);
		frame.contentDocument.body.innerHTML += '<style>pre{tab-size:2;}</style>';
		if(frame.contentDocument.body.offsetHeight){
			frame.style.minHeight = (frame.contentDocument.body.childNodes[0].clientHeight +30) + "px";
		}
		console.log(frame);
	}
	render (){
		var hash = RouteHistory.curHash.hash;
		var jsFile = "."+hash.split('?')[0]+".jsx";
		var title = this.props.title ? decodeURIComponent(this.props.title) : '';
		return (<div className="simple-index main-content">
				<h4>{title}</h4>
				{this.props.children}
				<h4>源代码<a href={jsFile} target="_blank">here</a></h4>
				<iframe ref="frame" onLoad={this.handleLoadFrame.bind(this)} src={jsFile} 
				style={{"border":"0px", "borderLeft":"4px solid #ddd","width": "100%","minHeight":"360px","backgroundColor": "#f0f0f0" }} />
			</div>)
	}
}

export default SimpleIndex;