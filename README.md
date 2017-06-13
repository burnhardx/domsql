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
domsql.create.h1.content('My Headline');
domsql.create.div.id('content').with.class('important-stuff');
```

## Insert

```js
domsql.insert.into(domsql.select.div.byId('content')).values('text content');
domsql.insert.into(domsql.select.div.byId('content')).values(domsql.create.p.content('New Paragraph'));
```

## Update


```js
domsql.update.set.innerHTML('new headline').where(domsql.select.h1.byInnerHTML('old headline'));
domsql.update.set.value('secret').where(domsql.select.input.byId('password'));
domsql.update.style.border('1px solid blue').where(domsql.select.p.all());
domsql.update.attribute.row.set(5).where(domsql.select.textare.byId('userinput'));
domsql.update.click.event(e=>{console.log('clicked')}).where(domsql.select.button.byId('clickbutton'));
domsql.update.class.add('highlight').where(domsql.select.h1.where.class.is('no-highlight'));
domsql.update.class.remove('highlight').where(domsql.select.h1.where.class.contains('highlight'));
domsql.update.class.toggle('toggleClass').where(domsql.select.button.byId('mybutton'));
```

## Delete


```js
domsql.delete.behavior.nodesWillBeRemoved();
domsql.delete.nodesWillDisappear();
domsql.delete.nodesWillBeInvisible();
domsql.delete.from(domsql.select.h1.byId('tempHeader'));
```
