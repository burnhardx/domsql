let contentToUpdate;
const updateContent = (content, attr)=>{
    contentToUpdate=content;
    return {
        where: function(domNode){
            domNode[attr]=contentToUpdate;
        }
    }
};
const updateStyle = (style, attr)=>{
    contentToUpdate=style;
    return {
        where: function(domNode){
            domNode.style[attr]=contentToUpdate;
        }
    }
}

const updateClass = (className,operation)=>{
    contentToUpdate=className;
    return {
        where: domNode=>{
            domNode.classList[operation](contentToUpdate);
        }
    }
}

const updateAttribute = (attribute,value)=>{
    contentToUpdate=value;
    return {
        where: domNode=>{
            domNode.setAttribute(attribute,contentToUpdate);
        }
    }
}

const updateEventListener = (event,handler)=>{
    contentToUpdate=handler;
    return {
        where: domNode=>{
            domNode.addEventListener(event, handler);
        }
    }
}

var style={};
var createStyleHandler = nameOfStyle =>{
    return contentToUpdate=>{return updateStyle(contentToUpdate, nameOfStyle)};
}
var styleHandler ={
    get(target, style) {
        if(typeof target[style] == 'undefined'){
            var result = createStyleHandler(style);
            target[style]=result;
            return result;
        }else{
            return target[style];
        }
    }
}
var events={};
var createEventHandler = event=>{
    return {
        event: handler=> {return updateEventListener(event, handler);}
    }
}
var eventHandler ={
    get(target, event) {
        if(typeof target[event] == 'undefined'){
            var result = createEventHandler(event);
            target[event]=result;
            return result;
        }else{
            return target[event];
        }
    }
};
var attributes={};
var createAttributeHandler = attr=>{
    return {
        set: contentToUpdate=>{return updateAttribute(attr, contentToUpdate)}
    }
}
var attributeHandler ={
    get(target, attr) {
        if(typeof target[attr] == 'undefined'){
            var result = createAttributeHandler(attr);
            target[attr]=result;
            return result;
        }else{
            return target[attr];
        }
    }
};

class Update {
    constructor(){
        this.attribute=new Proxy(attributes, attributeHandler);
        this.style=new Proxy(style,styleHandler);
        this.set={
            innerHTML: contentToUpdate=>{return updateContent(contentToUpdate, 'innerHTML')},
            value: contentToUpdate=> {return updateContent(contentToUpdate, 'value')}
        }
        this.class = {
            add:className=>{return updateClass(className, 'add')},
            remove:className=>{return updateClass(className, 'remove')},
            toggle:className=>{return updateClass(className, 'toggle')}
        }
    }

}

module.exports= new Proxy(new Update(), eventHandler);