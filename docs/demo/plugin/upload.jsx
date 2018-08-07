import React from 'react';
import ReactDOM from 'react-dom';
import Editor from 'react-umeditor';
class PluginUpload extends React.Component {
	render() {
		var plugins = {
			image:{
				uploader:{
					url:'/upload',
					name:"file",
					filter:(res)=> res.url
				}
			}
		}
		return (<Editor ref="editor" plugins={plugins} />)
	}
}

export default PluginUpload;