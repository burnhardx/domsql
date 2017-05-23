const search = require("./searchInDOM");

let currentSearchArguments;

var fetchResult = args=>{
    return new Promise((resolve)=>{
        var checkExist = setInterval(function() {
            var result=search(args);
            if (result!=null) {
                clearInterval(checkExist);
                resolve(result)
            }
        }, 50);
    })
}

var wait = function () {
    var args = Object.values(arguments).map(arg => {
        const b = arg + '';
        return b
    })
    return fetchResult(args);

}

module.exports = wait;