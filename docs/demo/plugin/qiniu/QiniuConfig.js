export default ()=> {
    return {
        url:'http://up-z2.qiniup.com',
        name:"file",
        qiniu:{
            app:{
                Bucket:"codemall",
                AK:"l9vEBNTqrz7H03S-SC0qxNWmf0K8amqP6MeYHNni",
                SK:"eizTTxuA0Kq1YSe2SRdOexJ-tjwGpRnzztsSrLKj"
            },
            domain:"http://p8ki4jz85.bkt.clouddn.com",
            genKey:function(options){
                return options.file.type +"-"+ options.file.size +"-"+ options.file.lastModifiedDate.valueOf() +"-"+ new Date().valueOf()+"-"+options.file.name;
            }
        },
        filter:(res)=> res.url
    }
    
}