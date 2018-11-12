import React from 'react';
import Editor from 'react-umeditor';

class FormMulti extends React.Component {
    state = {
        editorValues: ["", "", "", ""]
    }
	getIcons(){
		return [
				"source | undo redo | bold italic underline strikethrough fontborder | ",
				"paragraph fontfamily fontsize | superscript subscript | ",
				"forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
				"cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
				"horizontal date time  | image formula spechars | inserttable"
			]
    }
    
    handleChange(value, index) {
        const { editorValues } = this.state;
        editorValues[index] = value;
        this.setState({
            editorValues
        })
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
        let {editorValues} = this.state;
		for(let i=0;i<editorValues.length;i++){
			editors.push({
				icons: icons,
                plugins: plugins,
                value: editorValues[i]
			})
		}

		return (<div>
				{
					editors.map((ele,pos)=>{
						return (<Editor value={ele.value} onChange={(value)=> this.handleChange(value, pos)} key={pos} icons={ele.icons} plugins={ele.plugins} />)
					})
				}
			 </div>)
	}
}

export default FormMulti;