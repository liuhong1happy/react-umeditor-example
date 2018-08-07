import React from 'react';
import Editor from 'react-umeditor';

class FormBase extends React.Component {
	constructor(props){
        super(props)
		this.state = {
			form_data: {
				text: "123",
				editor: "<p>789</p>"
			}
		}
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
	handleFormChange(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var value = target.value;
		var editor = this.refs.editor.getContent();
		var form_data = this.state.form_data;
		form_data.text = value;
		form_data.editor = editor;
		this.setState({
			form_data: form_data
		})
	}
	handleSubmitForm(){
		var form_data = this.state.form_data;
		alert(form_data.editor);
	}
	render() {
		let icons = this.getIcons();
		let plugins = {
			image:{
				uploader: {
					url:'/api/upload',
					name:"file",
					filter: (res)=> res.url
				}
			}
		}

		let form_data = this.state.form_data;
		return (<div>
				<Editor ref="editor" icons={icons} plugins={plugins} value={form_data.editor}/>
				<input type="text" value={form_data.text} onChange={this.handleFormChange.bind(this)}/>
				<input type="submit" value="提交" onClick={this.handleSubmitForm.bind(this)} />
			   </div>)
	}
}

export default FormBase;