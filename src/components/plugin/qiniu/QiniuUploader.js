var QiniuUtils =  require('./QiniuUtils');

var getError = function(options,xhr){
    var  msg = 'cannot post '+options.url+":"+xhr.status;
    var err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = options.url;
    return err;
}
var getBody = function(xhr){
    var text = xhr.responseText || xhr.response;
    if(!text){
        return text;
    }
    
    try{
        return JSON.parse(text);
    }catch(e){
        return text;
    }
}

var Uploader = {
    post: function(options){
			if(typeof XMLHttpRequest === 'undefined'){
					return;
			}
			
			var xhr = new XMLHttpRequest();
			if(xhr.upload){
					xhr.upload.onprogress = function(e){
						if(e.total>0){
							e.percent = e.loaded / e.total*100;
						}
						options.onLoad(e);
					}
			}
			var formData = new FormData();
			
			if(options.data){
					for(var i in options.data){
							formData.append(i,options.data[i]);
					}
			}

			var key = options.qiniu.key || options.qiniu.genKey(options);
			formData.append("token",options.qiniu.upload_token ? options.qiniu.upload_token : QiniuUtils.Utils.genUploadToken(key,options.qiniu.app));
			formData.append("key", key);
			options.filename = "file";
			
			formData.append(options.filename,options.file);
		
        xhr.onerror = function(e){
            options.onEnd(e);
            options.onError(e);
        }
        xhr.onload = function(e){
            if(xhr.status !== 200){
                options.onEnd(e);
                return options.onError(getError(options,xhr),getBody(xhr));
            }
            options.onEnd(e);

            var res = getBody(xhr);
            var body = {};
            body.success = true;
            body.url = options.qiniu.domain +"/"+ key;
            options.onSuccess(body);
        }
    
        xhr.open('post',options.url,true);
        xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
        xhr.send(formData);
    }
}

export default {
    uploadFile:function(options){
          options.url = options.url || "/upload";
          options.filename = options.filename || "file";
          options.beforeUpload = options.beforeUpload || function(e){ return true; };
          options.onSuccess = options.onSuccess || function(e){};
          options.onError = options.onError || function(e){};
          options.onLoad = options.onLoad || function(e){};
          options.onStart = options.onStart || function(e){};
          options.onEnd = options.onEnd || function(e){};
          
         if(options.beforeUpload(options)){
             options.onStart(options);
             // 开始上传文件
             Uploader.post(options);
         }
    },
    uploadFiles:function(options){
        
    }
}