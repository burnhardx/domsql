/**
 * TODO: Create fancy error wrapper
 */
const transferResult = result =>{
    return result.length == 0 ? undefined : result.length == 1 ? attachAfterAndBeforeHandler(result[0]) : attachAfterAndBeforeHandler(result);
}

const attachAfterAndBeforeHandler = result=>{
    const checkPosition = (beforeElement, expectedPosition) => {
        if(Array.isArray(result)){
            var filtered= result.filter(entry=>{
                return entry.compareDocumentPosition(beforeElement)==expectedPosition;
            });
            return transferResult(filtered);
        }else{
            return result.compareDocumentPosition(beforeElement)==expectedPosition ? result : undefined;
        }
    }
    result.before = function(beforeElement){
        return checkPosition(beforeElement,4);
    }
    result.after = function(beforeElement){
        return checkPosition(beforeElement,2);
    }
    return result;
}

const searchByInnerHTML = (tagToSearch, query)=>  {
    const tags = Array.from(document.getElementsByTagName(tagToSearch));
    let result = tags.filter(tag => {
        return tag.textContent.match(query) != null
    });
    return transferResult(result);
}

const searchByAttributes = (tag, attr, operator, value)=>{
    const selector = tag+"["+attr+operator+"'"+value+"']";
    return transferResult(Array.from(document.querySelectorAll(selector)));
}

module.exports = function(){
    if(arguments.length==2){
        return searchByInnerHTML(arguments[0], arguments[1]);
    }else if(arguments.length==4){
        return searchByAttributes(arguments[0], arguments[1], arguments[2], arguments[3])
    }else if(arguments.length==1){
        return searchByInnerHTML('*', arguments[1]);
    }
};
