import React from 'react';
import Editor from 'react-umeditor';

class SimpleMulti extends React.Component {
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
		let icons = this.getIcons();
		let plugins = {
			image:{
				uploader:{
					url:'/upload',
					name:"file",
					filter:(res)=> res.url
				}
			}
		}
		let count = 100;
		let editors = [];
		for(let i=0;i<count;i++){
			editors.push({
				icons: icons,
				plugins: plugins
			})
		}

		return (<div>
				{
					editors.map(function(ele,pos){
						return (<Editor key={pos} icons={ele.icons} plugins={ele.plugins} />)
					})
				}
			 </div>)
	}
}

export default SimpleMulti;