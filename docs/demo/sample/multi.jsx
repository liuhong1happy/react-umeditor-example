import React from 'react';
import Editor from 'react-umeditor';

class SampleMulti extends React.Component {
	getIcons(){
		return [
				"source | undo redo | bold italic underline strikethrough fontborder | ",
				"paragraph fontfamily fontsize | superscript subscript | ",
				"forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
				"cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
				"horizontal date time  | image formula spechars | inserttable"
			]
	}
	getDefaultUploader(){
		return {
			url:'/api/upload',
			name:"file",
			request: "url"
		}
	}
	getQiniuUploader(){
		return {
			url:'http://upload.qiniu.com',
			type:'qiniu',
			name:"file",
			request: "url",
			qiniu:{
				app:{
					Bucket:"liuhong1happy",
					AK:"l9vEBNTqrz7H03S-SC0qxNWmf0K8amqP6MeYHNni",
					SK:"eizTTxuA0Kq1YSe2SRdOexJ-tjwGpRnzztsSrLKj"
				},
                domain:"http://o9sa2vijj.bkt.clouddn.com",
                genKey:function(options){
                    return options.file.type +"-"+ options.file.size +"-"+ options.file.lastModifiedDate.valueOf() +"-"+ new Date().valueOf()+"-"+options.file.name;
                }
			}
		}
	}
	render() {
		let icons = this.getIcons();
		let uploader = this.getQiniuUploader();
		let plugins = {
			image:{
				uploader:uploader
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

export default SampleMulti;