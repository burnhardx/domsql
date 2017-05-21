let nodeToAppend;
module.exports= {
    intoBody: node=>{
      document.body.appendChild(node);
    },
    into: function(domNode){
        nodeToAppend=domNode;
        return {
            values: function(content){
                if(typeof content == 'string'){
                    nodeToAppend.innerHTML= nodeToAppend.innerHTML+content;
                }else if(typeof content == 'object'){
                    nodeToAppend.appendChild(content);
                }
                return content;
            }
        }
    }
}