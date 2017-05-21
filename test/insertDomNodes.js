const should = require("chai").should();
const loadGlobalDocumentFromPath = require('./loadTestDom')
const systemUnderTest = require("./../src/domsql");


const testTextContent = 'Schmierfink';
const testContent = '<h1>'+testTextContent+'</h1>';

describe("Assert that DOMSQL can insert nodes", () => {

    loadGlobalDocumentFromPath('./showcase/index.html');

    it("by their innerHTML Value", () => {
        systemUnderTest.insert.into(systemUnderTest.select.div.byId('sampleContent')).values(testContent);
        const addedContent = systemUnderTest.select.h1.byInnerHTML(testTextContent);
        addedContent.textContent.should.equal(testTextContent);
    });

    it("directly to the DOM", ()=>{
        systemUnderTest.insert.intoBody(systemUnderTest.create.div.id("test").content(testTextContent));
        systemUnderTest.select.div.byId("test").textContent.should.equal(testTextContent);
    });

    it("can create really new nodes", ()=>{
        var p=document.createElement("p");
        p.appendChild(document.createTextNode("Herbert"));
        document.body.appendChild(p);
        systemUnderTest.select.p.byInnerHTML("Herb").textContent.should.equal("Herbert");
    });

});
