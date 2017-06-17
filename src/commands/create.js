var createWithHandler = (attribute,result) =>{
    return content=>{
        let att=document.createAttribute(attribute);
        att.value=content;
        result.setAttributeNode(att);
        return result;
    };
}

var withHandler = {
    get(target, attr) {
        if(typeof target[attr] == 'undefined'){
            var result = createWithHandler(attr,target.result);
            target[attr]=result;
            return result;
        }else{
            return target[attr];
        }
    }
};

const createNode = (tag, content)=>{
    var result = document.createElement(tag);
    if(content!=undefined){
        result.appendChild(document.createTextNode(content));
    }
    result.withValue =inputValue=>{
        result.value = inputValue;
        return result;
    }
    result.content=textContent=>{
        result.textContent = textContent;
        return result;
    }
    result.withChild=children=>{
        result.appendChild(children);
        return result;
    }
    result.with = new Proxy({result:result}, withHandler);
    return result;
}

var createTagHandler = tag =>{
    return {
        id: domId=>{
            var result = createNode(tag);
            result.setAttribute("id",domId);
            return result;
        },
        content:textContent=>{
            return createNode(tag, textContent);
        },
        empty:()=>{
            return createNode(tag);
        }
    }
}

var tagHandler = {
    get(target, tag) {
        if(typeof target[tag] == 'undefined'){
            var result = createTagHandler(tag);
            target[tag]=result;
            return result;
        }else{
            return target[tag];
        }
    }
};

class Create {
}

module.exports = new Proxy(new Create(), tagHandler);