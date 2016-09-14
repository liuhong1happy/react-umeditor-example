import React from 'react';

class SampleIndex extends React.Component {
	render (){
		return (<div className="sample-index">
				{this.props.children}
			</div>)
	}
}

export default SampleIndex;