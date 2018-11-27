import React from 'react';
import ReactDOM from 'react-dom';
import Editor from 'react-umeditor';

import QiniuUploader from './qiniu/QiniuUploader'
import QiniuConfig from './qiniu/QiniuConfig'

class PluginUpload extends React.Component {
	render() {
		var plugins = {
			image:{
				uploader: QiniuConfig(),
                customUploader: QiniuUploader
			}
		}
		return (<Editor ref="editor" plugins={plugins} />)
	}
}

export default PluginUpload;