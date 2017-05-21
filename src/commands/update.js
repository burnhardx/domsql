let contentToUpdate;
let scheme = require("./../htmlscheme");
const allPossibleStyleAttributes=scheme.styles;
const allPossibleEvents = scheme.events;
const allPossibleAttributes = scheme.attributes;
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

class Update {
    constructor(){
        this.attribute={};
        allPossibleAttributes.forEach(attr=>{
            this.attribute[attr]={
                set: contentToUpdate=>{return updateAttribute(attr, contentToUpdate)}
            }
        })
        this.style={};
        allPossibleStyleAttributes.forEach(attr=>{
            this.style[attr]=contentToUpdate=>{return updateStyle(contentToUpdate, attr)}
        })
        allPossibleEvents.forEach(event=>{
            this[event]={
                event: handler=> {return updateEventListener(event, handler);}
            }
        })
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

module.exports= new Update();