(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var createWithHandler = function createWithHandler(attribute, result) {
    return function (content) {
        var att = document.createAttribute(attribute);
        att.value = content;
        result.setAttributeNode(att);
        return result;
    };
};

var withHandler = {
    get: function get(target, attr) {
        if (typeof target[attr] == 'undefined') {
            var result = createWithHandler(attr, target.result);
            target[attr] = result;
            return result;
        } else {
            return target[attr];
        }
    }
};

var createNode = function createNode(tag, content) {
    var result = document.createElement(tag);
    if (content != undefined) {
        result.appendChild(document.createTextNode(content));
    }
    result.withValue = function (inputValue) {
        result.value = inputValue;
        return result;
    };
    result.content = function (textContent) {
        result.innerHTML = textContent;
        return result;
    };
    result.with = new Proxy({ result: result }, withHandler);
    return result;
};

var createTagHandler = function createTagHandler(tag) {
    return {
        id: function id(domId) {
            var result = createNode(tag);
            result.setAttribute("id", domId);
            return result;
        },
        content: function content(textContent) {
            return createNode(tag, textContent);
        },
        empty: function empty() {
            return createNode(tag);
        }
    };
};

var tagHandler = {
    get: function get(target, tag) {
        if (typeof target[tag] == 'undefined') {
            var result = createTagHandler(tag);
            target[tag] = result;
            return result;
        } else {
            return target[tag];
        }
    }
};

var Create = function Create() {
    _classCallCheck(this, Create);
};

module.exports = new Proxy(new Create(), tagHandler);

},{}],2:[function(require,module,exports){
'use strict';

var behaviors = {
    remove: 'Removes the Node completely from the DOM',
    disappear: 'Adds display:none to the Node Style',
    invisble: 'Hides the node'
};
var Behavior = function () {
    var currentBehaviour = behaviors.remove;
    return {
        get: function get() {
            return currentBehaviour;
        },
        nodesWillBeRemoved: function nodesWillBeRemoved() {
            currentBehaviour = behaviors.remove;
        },
        nodesWillDisappear: function nodesWillDisappear() {
            currentBehaviour = behaviors.disappear;
        },
        nodesWillBeInvisible: function nodesWillBeInvisible() {
            currentBehaviour = behaviors.invisble;
        }
    };
}();

module.exports = {
    from: function from(domNode) {
        var behaviour = this.behavior.get();
        if (behaviour == behaviors.remove) {
            domNode.parentNode.removeChild(domNode);
        } else if (behaviour == behaviors.disappear) {
            domNode.style.display = 'none';
        } else if (behaviour == behaviors.invisble) {
            domNode.style.visibility = 'hidden';
        }
    },
    behavior: Behavior
};

},{}],3:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var nodeToAppend = void 0;
module.exports = {
    intoBody: function intoBody(node) {
        document.body.appendChild(node);
    },
    into: function into(domNode) {
        nodeToAppend = domNode;
        return {
            values: function values(content) {
                if (typeof content == 'string') {
                    nodeToAppend.innerHTML = nodeToAppend.innerHTML + content;
                } else if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) == 'object') {
                    nodeToAppend.appendChild(content);
                }
                return content;
            }
        };
    }
};

},{}],4:[function(require,module,exports){
"use strict";

/**
 * TODO: Create fancy error wrapper
 */

var transferResult = function transferResult(result) {
    return result.length == 0 ? undefined : result.length == 1 ? attachAfterAndBeforeHandler(result[0]) : attachAfterAndBeforeHandler(result);
};

var attachAfterAndBeforeHandler = function attachAfterAndBeforeHandler(result) {
    var checkPosition = function checkPosition(beforeElement, expectedPosition) {
        if (Array.isArray(result)) {
            var filtered = result.filter(function (entry) {
                return entry.compareDocumentPosition(beforeElement) == expectedPosition;
            });
            return transferResult(filtered);
        } else {
            return result.compareDocumentPosition(beforeElement) == expectedPosition ? result : undefined;
        }
    };
    result.before = function (beforeElement) {
        return checkPosition(beforeElement, 4);
    };
    result.after = function (beforeElement) {
        return checkPosition(beforeElement, 2);
    };
    return result;
};

var searchByInnerHTML = function searchByInnerHTML(tagToSearch, query) {
    var tags = Array.from(document.getElementsByTagName(tagToSearch));
    var result = tags.filter(function (tag) {
        return tag.textContent.match(query) != null;
    });
    return transferResult(result);
};

var searchByAttributes = function searchByAttributes(tag, attr, operator, value) {
    var selector = tag + "[" + attr + operator + "'" + value + "']";
    return transferResult(Array.from(document.querySelectorAll(selector)));
};

module.exports = function () {
    if (arguments.length == 2) {
        return searchByInnerHTML(arguments[0], arguments[1]);
    } else if (arguments.length == 4) {
        return searchByAttributes(arguments[0], arguments[1], arguments[2], arguments[3]);
    } else if (arguments.length == 1) {
        return document.querySelector(arguments[0]);
    }
};

},{}],5:[function(require,module,exports){
'use strict';

var selectCommand = require("./searchInDOM");

var createAttributeHandler = function createAttributeHandler(tag, attr) {
    return {
        contains: function contains(query) {
            var result = selectCommand(tag, attr, '*=', query);
            return result;
        },
        startsWith: function startsWith(query) {
            return selectCommand(tag, attr, '^⁼', query);
        },
        endsWith: function endsWith(query) {
            return selectCommand(tag, attr, '$=', query);
        },
        is: function is(query) {
            return selectCommand(tag, attr, '=', query);
        }
    };
};

var createTagHandler = function createTagHandler(tag) {
    var whereHandler = {
        get: function get(target, attribute) {
            if (typeof target[attribute] == 'undefined') {
                var result = createAttributeHandler(target.tag, attribute);
                target[attribute] = result;
                return result;
            } else {
                return target[attribute];
            }
        }
    };
    return {
        all: function all() {
            return Array.from(document.getElementsByTagName(tag));
        },
        byInnerHTML: function byInnerHTML(query) {
            return selectCommand(tag, query);
        },
        where: new Proxy({ tag: tag }, whereHandler),
        byId: function byId(query) {
            return document.querySelector(tag + '[id=' + query + ']');
        }
    };
};
var selectHandler = {
    get: function get(target, attribute) {
        if (typeof target[attribute] == 'undefined') {
            var result = createTagHandler(attribute);
            target[attribute] = result;
            return result;
        } else {
            return target[attribute];
        }
    }
};

module.exports = new Proxy({}, selectHandler);

},{"./searchInDOM":4}],6:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var contentToUpdate = void 0;
var updateContent = function updateContent(content, attr) {
    contentToUpdate = content;
    return {
        where: function where(domNode) {
            domNode[attr] = contentToUpdate;
        }
    };
};
var updateStyle = function updateStyle(style, attr) {
    contentToUpdate = style;
    return {
        where: function where(domNode) {
            domNode.style[attr] = contentToUpdate;
        }
    };
};

var updateClass = function updateClass(className, operation) {
    contentToUpdate = className;
    return {
        where: function where(domNode) {
            domNode.classList[operation](contentToUpdate);
        }
    };
};

var updateAttribute = function updateAttribute(attribute, value) {
    contentToUpdate = value;
    return {
        where: function where(domNode) {
            domNode.setAttribute(attribute, contentToUpdate);
        }
    };
};

var updateEventListener = function updateEventListener(event, handler) {
    contentToUpdate = handler;
    return {
        where: function where(domNode) {
            domNode.addEventListener(event, handler);
        }
    };
};

var style = {};
var createStyleHandler = function createStyleHandler(nameOfStyle) {
    return function (contentToUpdate) {
        return updateStyle(contentToUpdate, nameOfStyle);
    };
};
var styleHandler = {
    get: function get(target, style) {
        if (typeof target[style] == 'undefined') {
            var result = createStyleHandler(style);
            target[style] = result;
            return result;
        } else {
            return target[style];
        }
    }
};
var events = {};
var createEventHandler = function createEventHandler(_event) {
    return {
        event: function event(handler) {
            return updateEventListener(_event, handler);
        }
    };
};
var eventHandler = {
    get: function get(target, event) {
        if (typeof target[event] == 'undefined') {
            var result = createEventHandler(event);
            target[event] = result;
            return result;
        } else {
            return target[event];
        }
    }
};
var attributes = {};
var createAttributeHandler = function createAttributeHandler(attr) {
    return {
        set: function set(contentToUpdate) {
            return updateAttribute(attr, contentToUpdate);
        }
    };
};
var attributeHandler = {
    get: function get(target, attr) {
        if (typeof target[attr] == 'undefined') {
            var result = createAttributeHandler(attr);
            target[attr] = result;
            return result;
        } else {
            return target[attr];
        }
    }
};

var Update = function Update() {
    _classCallCheck(this, Update);

    this.attribute = new Proxy(attributes, attributeHandler);
    this.style = new Proxy(style, styleHandler);
    this.set = {
        innerHTML: function innerHTML(contentToUpdate) {
            return updateContent(contentToUpdate, 'innerHTML');
        },
        value: function value(contentToUpdate) {
            return updateContent(contentToUpdate, 'value');
        }
    };
    this.class = {
        add: function add(className) {
            return updateClass(className, 'add');
        },
        remove: function remove(className) {
            return updateClass(className, 'remove');
        },
        toggle: function toggle(className) {
            return updateClass(className, 'toggle');
        }
    };
};

module.exports = new Proxy(new Update(), eventHandler);

},{}],7:[function(require,module,exports){
"use strict";

var search = require("./searchInDOM");

var currentSearchArguments = void 0;

var fetchResult = function fetchResult(args) {
    return new Promise(function (resolve) {
        var checkExist = setInterval(function () {
            var result = search(args);
            if (result != null) {
                clearInterval(checkExist);
                resolve(result);
            }
        }, 50);
    });
};

var wait = function wait() {
    var args = Object.values(arguments).map(function (arg) {
        var b = arg + '';
        return b;
    });
    return fetchResult(args);
};

module.exports = wait;

},{"./searchInDOM":4}],8:[function(require,module,exports){
(function (global){
"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var selectCommand = require("./commands/select");
var updateCommand = require("./commands/update");
var insertCommand = require("./commands/insert");
var deleteCommand = require("./commands/delete");
var createCommand = require("./commands/create");
var waitForCommand = require("./commands/waitFor");

var wrapper = require("./wrapTagsAndAttributes");

var DomSQL = function DomSQL() {
    _classCallCheck(this, DomSQL);

    this.select = wrapper(require("./commands/searchInDOM"));
    this.insert = insertCommand;
    this.update = updateCommand;
    this.delete = deleteCommand;
    this.create = createCommand;
    this.waitFor = wrapper(require("./commands/waitFor"));

    this.useZombie = function (browser) {
        var targetFunc = null;
        if (typeof browser.visit != 'undefined') {
            browser.visitOld = browser['visit'];
            browser.visit = function (uri) {
                return browser.visitOld(uri).then(function (data) {
                    global.document = browser.document.body;

                    return data;
                });
            };
        }
        return browser;
    };
};

var testClass = new DomSQL();
module.exports = testClass;
if (typeof window !== 'undefined') {
    window.domsql = testClass;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./commands/create":1,"./commands/delete":2,"./commands/insert":3,"./commands/searchInDOM":4,"./commands/select":5,"./commands/update":6,"./commands/waitFor":7,"./wrapTagsAndAttributes":9}],9:[function(require,module,exports){
'use strict';

var wrapper = function wrapper(selectCommand) {

    var createAttributeHandler = function createAttributeHandler(tag, attr) {
        return {
            contains: function contains(query) {
                var result = selectCommand(tag, attr, '*=', query);
                return result;
            },
            startsWith: function startsWith(query) {
                return selectCommand(tag, attr, '^⁼', query);
            },
            endsWith: function endsWith(query) {
                return selectCommand(tag, attr, '$=', query);
            },
            is: function is(query) {
                return selectCommand(tag, attr, '=', query);
            }
        };
    };

    var createTagHandler = function createTagHandler(tag) {
        var whereHandler = {
            get: function get(target, attribute) {
                if (typeof target[attribute] == 'undefined') {
                    var result = createAttributeHandler(target.tag, attribute);
                    target[attribute] = result;
                    return result;
                } else {
                    return target[attribute];
                }
            }
        };
        return {
            all: function all() {
                return Array.from(document.getElementsByTagName(tag));
            },
            byInnerHTML: function byInnerHTML(query) {
                return selectCommand(tag, query);
            },
            where: new Proxy({ tag: tag }, whereHandler),
            byId: function byId(query) {
                return selectCommand(tag + '[id=' + query + ']');
            }
        };
    };
    var selectHandler = {
        get: function get(target, attribute) {
            if (typeof target[attribute] == 'undefined') {
                var result = createTagHandler(attribute);
                target[attribute] = result;
                return result;
            } else {
                return target[attribute];
            }
        }
    };
    return new Proxy({}, selectHandler);
};
module.exports = wrapper;

},{}]},{},[8]);
