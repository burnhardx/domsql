const should = require("chai").should();
const loadGlobalDocumentFromPath = require('./loadTestDom')
const systemUnderTest = require("./../src/domsql");

const selectQueryField = ()=>{return systemUnderTest.select.input.byId('query')};
describe("Assert that DOMSQL can delete", () => {
    it("nodes completely from dom", () => {
        loadGlobalDocumentFromPath('./showcase/index.html');
        systemUnderTest.delete.behavior.nodesWillBeRemoved();
        systemUnderTest.delete.from(selectQueryField());
        should.not.exist(selectQueryField());
    });
    it("and make nodes disappear from dom", () => {
        loadGlobalDocumentFromPath('./showcase/index.html');
        systemUnderTest.delete.behavior.nodesWillDisappear();
        systemUnderTest.delete.from(selectQueryField());
        selectQueryField().style.display.should.equal("none");
    });
    it("and make nodes invisible", () => {
        loadGlobalDocumentFromPath('./showcase/index.html');
        systemUnderTest.delete.behavior.nodesWillBeInvisible();
        systemUnderTest.delete.from(selectQueryField());
        selectQueryField().style.visibility.should.equal("hidden");
    });

});
