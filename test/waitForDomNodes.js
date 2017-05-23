const should = require("chai").should();
const loadGlobalDocumentFromPath = require('./loadTestDom')
const systemUnderTest = require("./../src/domsql");

const selectQueryField = ()=>{return systemUnderTest.select.input.byId('query')};

describe("Assert that DOMSQL can wait", () => {
    it("for DOM Nodes to appear", done => {
        loadGlobalDocumentFromPath('./showcase/index.html');
        const testId='willi';
        const testContent="Bin ein Knoten"
        setTimeout(()=>{
            systemUnderTest.insert.intoBody(systemUnderTest.create.p.id(testId).content(testContent));
        }, 100);

        systemUnderTest.waitFor.p.byId(testId).then(()=>{
            systemUnderTest.select.p.byId(testId).textContent.should.equal(testContent);
            done();
        });
    });
});
