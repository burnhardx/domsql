const should = require("chai").should();
const loadGlobalDocumentFromPath = require('./loadTestDom')
const systemUnderTest = require("./../src/domsql");

describe("Assert that DOMSQL can select nodes", () => {
    it("only by their tag", ()=>{
        loadGlobalDocumentFromPath('./showcase/index.html');
        systemUnderTest.select.h1.all().should.have.lengthOf(1);
    });
    it("by their innerHTML Value", () => {
        var h1 = systemUnderTest.select.h1.byInnerHTML("Rulez").textContent;
        h1.should.be.a('string');
        h1.should.equal('DOMSQL Rulez');
    });

    it("by their attributes", ()=>{

        var commandList = systemUnderTest.select.ul.where.class.contains('com');
        commandList.children.should.have.lengthOf(4);
        commandList.children[0].textContent.should.be.a('string');
        commandList.children[0].textContent.should.equal("Select");
    });
    it("by selected nodes before", ()=>{
        var spanSqlCommand = systemUnderTest.select.span.where.class.is('highlight')
            .before(systemUnderTest.select.ul.where.class.is('commands'));
        spanSqlCommand.textContent.should.equals("SQL Commands")
    });

    it("by custom registered attributes", ()=>{
        var spanByCustomAttribute=systemUnderTest.select.span.where['data-domsql'].is('custom attribute')
            .before(systemUnderTest.select.input.byId('query'));
        spanByCustomAttribute.textContent.should.equal('DOMSQL Select Query');
    })

});
