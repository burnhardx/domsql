const selectCommand = require("./searchInDOM");

const createAttributeHandler= (tag,attr)=>{
    return {
        contains:query=>{
            let result = selectCommand(tag, attr, '*=', query);
            return result;
        },
        startsWith:query=>{
            return selectCommand(tag, attr, '^⁼', query);
        },
        endsWith:query=>{
            return selectCommand(tag, attr, '$=', query);
        },
        is:query=>{
            return selectCommand(tag, attr, '=', query);
        }
    }
}

const createTagHandler = tag=>{
    const whereHandler = {
        get(target, attribute) {
            if(typeof target[attribute] == 'undefined'){
                var result = createAttributeHandler(target.tag, attribute);
                target[attribute]=result;
                return result;
            }else{
                return target[attribute];
            }
        }
    };
    return {
        all:function(){
            return Array.from(document.getElementsByTagName(tag));
        },
        byInnerHTML: function(query){
            return selectCommand(tag, query);
        },
        where: new Proxy({tag:tag}, whereHandler),
        byId: query=>{return document.querySelector(tag+'[id='+query+']')}
    };
}
var selectHandler = {
    get(target, attribute) {
        if(typeof target[attribute] == 'undefined'){
            var result = createTagHandler(attribute);
            target[attribute]=result;
            return result;
        }else{
            return target[attribute];
        }
    }
}

module.exports = new Proxy({}, selectHandler);