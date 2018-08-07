import React from 'react';
import ReactDOM from 'react-dom';
import Editor from 'react-umeditor';

import LinkDialog from './plugins/LinkDialog';
import EditorSelection from 'react-umeditor/lib/utils/EditorSelection'
import EditorDOM from 'react-umeditor/lib/utils/EditorDOM'

class PluginUpload extends React.Component {
	getIcons(){
		return [
				"source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
				"paragraph fontfamily fontsize | superscript subscript | ",
				"forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
				"cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
				"horizontal date time  | image spechars | inserttable | link"
			]
	}
	render() {
		var plugins = {
			image:{
				uploader:{
					url:'/upload',
					name:"file",
					filter:(res)=> res.url
				}
            },
			toolbar: {
				icons: [{
					name: 'link',
					component: LinkDialog,
					onIconClick:({ editarea, root, ref })=> {
						EditorSelection.storeRange();
						ref.toggle((link) => {
							editarea.focus();
							EditorSelection.restoreRange();
							if (link) {
								if (EditorSelection.range && EditorSelection.validateRange(root, EditorSelection.range)) {
									if (EditorSelection.range.pasteHTML) {
										EditorSelection.range.pasteHTML('<a href="'+link.url+'" target="'+link.target+'">' + link.title + '</a>');
									} else {
										let a = EditorDOM.createNodeByTag('a', link.title);
										a.target = link.target;
										a.href = link.url;
										EditorSelection.range.deleteContents();
										EditorSelection.insertNode(a);
									}
								} else {
									editarea.innerHTML += '<a href="'+link.url+'" target="'+link.target+'">' + link.title + '</a>';
								}
							}
						})
					},
					mapRangeState: (rangeState, selection)=> {
						var parentElement = selection.range.startContainer.parentNode;
						rangeState["link"] = { active:false, icon:"link"}
						while((parentElement.tagName || parentElement.nodeName).toUpperCase()!="DIV"){
							var tagName = parentElement.tagName || parentElement.nodeName;
							switch(tagName.toUpperCase()){
								case "A":
									rangeState["link"] = { active:true,icon:"link"}
									break;
							}
							parentElement = parentElement.parentNode;
						}
						return rangeState;
					}
				}]
			}
		}
		return (<Editor icons={this.getIcons()} ref="editor" plugins={plugins} />)
	}
}

export default PluginUpload;