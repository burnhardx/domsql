# DOMSQL
### DOMSQL is set of commands in the style of SQL, to select, create, update, insert or delete DOM Nodes.

```js
// Mock Browser
const { JSDOM } = require("jsdom");
global.document = new JSDOM('`<!DOCTYPE html><p class="important">DOMSQL Rulez</span></p>`').window.document;

var domsql = require('domsql');
console.log(domsql.select.p.where.class.is('important').textContent);
```

## Installation

### Debug
```js
<script src="https://raw.githubusercontent.com/burnhardx/domsql/master/dist/domsql.js"></script>
```
### Minified
```js
<script src="https://raw.githubusercontent.com/burnhardx/domsql/master/dist/domsql.min.js"></script>
```

## Following Commands are yet implemented.

* [Select](#select)
* [Create](#create)
* [Insert](#insert)
* [Update](#update)
* [Delete](#delete)

## Select

```js

domsql.select.a.byId();
domsql.select.a.byInnerHTML('regex');
domsql.select.a.all();

domsql.select.div.where[any attribute].is();
domsql.select.span.where[any attribute].contains();
domsql.select.table.where[any attribute].startsWith();
domsql.select.ul.where[any attribute].endsWith();

domsql.select.a.byInnerHTML('foo').before(domsql.select.a.byId('id');
```

## Create

```js
TODO
```

## Insert

```js
TODO
```

## Update


```js
TODO
```

## Delete


```js
TODO
```
