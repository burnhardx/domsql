const selectCommand = require("./commands/select");
const updateCommand= require("./commands/update");
const insertCommand= require("./commands/insert");
const deleteCommand = require("./commands/delete");
const createCommand = require("./commands/create");
const scheme = require("./htmlscheme");
const allUsedTags = scheme.tags;
const allPossibleAttributes=scheme.attributes;


const attatchTagsAndAttributes = ()=>{
    var result={byInnerHTML:function(query){
        return selectCommand(query);
    }};
    allUsedTags.forEach((tag,index) => {
        var attributes ={}
        allPossibleAttributes.forEach(attr=>{
            attributes[attr]= {
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
        });

        result[tag] = {
            all:function(){
                  return Array.from(document.getElementsByTagName(tag));
            },
            byInnerHTML: function(query){
                return selectCommand(tag, query);
            },
            where: attributes,
            byId: query=>{return document.querySelector(tag+'[id='+query+']')}
        }
    })
    return result;
}


class DomSQL {
    constructor() {
        this.select =attatchTagsAndAttributes();
        this.insert = insertCommand;
        this.update = updateCommand;
        this.delete = deleteCommand;
        this.create = createCommand;

        this.useZombie = function(browser){
            var targetFunc = null;
            if(typeof browser.visit !='undefined'){
                browser.visitOld = browser['visit'];
                browser.visit = function(uri){
                    return browser.visitOld(uri).then(data=>{
                        global.document = browser.document.body;
                        return data;
                    });
                }

            }
            /**
            if(typeof browser['init'] != 'undefined'){
                const jsdom = require("jsdom");
                const { JSDOM } = jsdom;
                browser.addCommand("funky", function async (customVar) {
                    return this.getSource().then(function(urlResult) {
                        global.document = new JSDOM(urlResult).window.document;
                        console.log("====="+customVar());
                        console.log(browser);
                        if(!customVar()){
                            throw new Error("ssdsd");
                        }
                        return true;
                    }).call(done);
                });
            }
             **/
            return browser;
        }


    }

    registerCustomAttribute(customAttribute){
        allPossibleAttributes.push(customAttribute);
        this.select=attatchTagsAndAttributes();
    }
}

const testClass = new DomSQL();
module.exports = testClass;
if (typeof(window) !== 'undefined') {
    window.domsql = testClass;
}
