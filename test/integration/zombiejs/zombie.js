process.env.NODE_ENV = 'test';
var Browser = require('zombie');
var http = require("http");
var app = require("./../../../startShowcase");
var domsql = require("./../../../src/domsql");
var select = domsql.select;

describe('Zombie JS', ()=>{
    before(function() {
        this.server = http.createServer(app).listen(9921);
        browser = new Browser({ site: 'http://localhost:9921' });
        domsql.useZombie(browser);
        return browser.visit('/');
    });

    it("can evaluate DOMSQL Showcase",done=>{
        browser.assert.className( 'ul[accesskey=edgar]','commands');
        browser.assert.text('title','DOMSQL - ShowCase');
        browser.assert.text(select.h1.byInnerHTML('Rulez'), 'DOMSQL Rulez');
        done();
    })

    after(function(done){
        this.server.close(done);
    })

})

