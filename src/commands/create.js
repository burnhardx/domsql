const scheme = require("./../htmlscheme");
const tags = scheme.tags;
const attributes = scheme.attributes;


const createNode = (tag, content)=>{
    var result = document.createElement(tag);
    if(content!=undefined){
        result.appendChild(document.createTextNode(content));
    }
    result.with ={};
    result.withValue =inputValue=>{
        result.value = inputValue;
        return result;
    }
    result.content=textContent=>{
        result.innerHTML = textContent;
        return result;
    }
    attributes.forEach(attribute=>{
        result.with[attribute]= content=>{
            let att=document.createAttribute(attribute);
            att.value=content;
            result.setAttributeNode(att);
            return result;
        }
    })
    return result;
}

class Create {
    constructor(){
        tags.forEach(tag=> {
            this[tag]={
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
        })
    }
}

module.exports = new Create();