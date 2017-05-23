const selectCommand = require("./commands/select");
const updateCommand= require("./commands/update");
const insertCommand= require("./commands/insert");
const deleteCommand = require("./commands/delete");
const createCommand = require("./commands/create");
const waitForCommand = require("./commands/waitFor");

const wrapper = require("./wrapTagsAndAttributes")

class DomSQL {
    constructor() {
        this.select =wrapper(require("./commands/searchInDOM"));
        this.insert = insertCommand;
        this.update = updateCommand;
        this.delete = deleteCommand;
        this.create = createCommand;
        this.waitFor = wrapper(require("./commands/waitFor"));

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
            return browser;
        }


    }
}

const testClass = new DomSQL();
module.exports = testClass;
if (typeof(window) !== 'undefined') {
    window.domsql = testClass;
}
