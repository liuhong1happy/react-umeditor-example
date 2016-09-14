import React from 'react';

class FormIndex extends React.Component {
	render (){
		return (<div className="form-index">
				{this.props.children}
			</div>)
	}
}

export default FormIndex;