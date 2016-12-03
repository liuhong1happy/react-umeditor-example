import React from 'react';
import Editor from 'react-umeditor';

class SampleIcons extends React.Component {
	getIcons(){
		return [
				"source | undo redo | bold italic underline strikethrough fontborder | ",
				"paragraph fontfamily fontsize | superscript subscript | ",
				"forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
				"cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
				"horizontal date time  | image formula spechars | inserttable"
			]
	}
	render() {
		var icons = this.getIcons();
		return (<Editor ref="editor" icons={icons} />)
	}
}

export default SampleIcons;