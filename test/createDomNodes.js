const should = require("chai").should();
const loadGlobalDocumentFromPath = require('./loadTestDom')
const systemUnderTest = require("./../src/domsql");


const title = 'Hallo DomSQL';
describe("Assert that DOMSQL can create Nodes", () => {

    loadGlobalDocumentFromPath('./showcase/index.html');
    it("by standard tags and content", () => {
        var p = systemUnderTest.create.p.content(title);
        p.textContent.should.equal(title);
    });

    it("by standard tags and add attributes", () => {
        var p = systemUnderTest.create.p.content(title).with.class('herbert').with.draggable(true);
        p.textContent.should.equal(title);
        p.getAttribute("draggable").should.equal("true");
    });
});

describe("Assert that created Nodes", () => {

    it("can create node and insert to dom", () => {
        let heroHeadline = systemUnderTest.create.h1.content(title);
        systemUnderTest.insert.into(systemUnderTest.select.div.byId('sampleContent')).values(heroHeadline);
        systemUnderTest.select.h1.byInnerHTML(title).textContent.should.equal(title);
    })

    it("can create node with ids and insert to dom", () => {
        const testId = "molotov"
        let heroHeadline = systemUnderTest.create.h1.id(testId).content(title);
        systemUnderTest.insert.into(systemUnderTest.select.div.byId('sampleContent')).values(heroHeadline);
        systemUnderTest.select.h1.byId(testId).textContent.should.equal(title);
    })
    it("can create node with children insert to dom", () => {
        const testId = "molotov"
        let children = systemUnderTest.create.span.id('child').content('children');
        let heroHeadline = systemUnderTest.create.h1.id(testId).content(title)
            .withChild(
                children
            );
        systemUnderTest.insert.into(systemUnderTest.select.div.byId('sampleContent')).values(heroHeadline);
        systemUnderTest.select.h1.byId(testId).textContent.should.equal(title);
        should.exist(systemUnderTest.select.span.byId('child'));
    })
    it("can create inputs with values", () => {
        const testId = "molotov"
        let input = systemUnderTest.create.input.id(testId).withValue(title);
        systemUnderTest.insert.into(systemUnderTest.select.div.byId('sampleContent')).values(input);
        systemUnderTest.select.input.byId(testId).value.should.equal(title);
    })

})
