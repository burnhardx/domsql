const should = require("chai").should();
const loadGlobalDocumentFromPath = require('./loadTestDom')
const systemUnderTest = require("./../src/domsql");

const testTextContent = 'SuperTerrorist';
const testContent = '<h1>'+testTextContent+'</h1>';
describe("Assert that DOMSQL can update nodes", () => {

    loadGlobalDocumentFromPath('./showcase/index.html');

    it("innerHTML", () => {
        systemUnderTest.update.set.innerHTML(testContent).where(document.getElementById("sampleContent"));
        const addedContent =systemUnderTest.select.h1.byInnerHTML(testTextContent);
        addedContent.textContent.should.equal(testTextContent);
    });

    it("values", () => {
        var queryField = systemUnderTest.select.input.byId('query');
        systemUnderTest.update.set.value(testTextContent).where(queryField);
        queryField.value.should.equal(testTextContent);
    });

    it("styles", ()=>{
        var wannaTry =systemUnderTest.select.h2.byInnerHTML("Wanna");
        var border = '1px solid black';
        wannaTry.style.border.should.equal("")
        systemUnderTest.update.style.border(border).where(wannaTry);
        wannaTry.style.border.should.equal(border)
    })

    it("attributes", ()=>{
        var h1 = systemUnderTest.select.h1.byInnerHTML("Rulez");
        systemUnderTest.update.attribute.dropzone.set('ficken').where(h1);
        h1.getAttribute("dropzone").should.equal("ficken");
    })

    it("events", ()=>{
        systemUnderTest.insert.intoBody(systemUnderTest.create.input.id('foo').with.type('text'));
        var clickhandler = function(evt){
            evt.target.title=testTextContent;
        };
        var input = systemUnderTest.select.input.byId('foo');
        input.getAttribute('type').should.equal('text');
        systemUnderTest.update.click.event(clickhandler).where(input);
        input.click();
        input.getAttribute('title').should.equal(testTextContent);
    })

    it("classes", ()=>{
        var wannaTry =systemUnderTest.select.h2.byInnerHTML("Wanna");
        var testClass = 'herbert';
        systemUnderTest.update.class.add(testClass).where(wannaTry);
        wannaTry.classList.contains(testClass).should.equal(true);

        systemUnderTest.update.class.remove(testClass).where(wannaTry);
        wannaTry.classList.contains(testClass).should.equal(false);

        systemUnderTest.update.class.toggle(testClass).where(wannaTry);
        wannaTry.classList.contains(testClass).should.equal(true);
        systemUnderTest.update.class.toggle(testClass).where(wannaTry);
        wannaTry.classList.contains(testClass).should.equal(false);
    })


});
