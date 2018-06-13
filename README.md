# 😪 await-on
![npm](https://img.shields.io/npm/v/await-on.svg)
![node](https://img.shields.io/node/v/await-on.svg)
![npm](https://img.shields.io/npm/l/await-on.svg)
![npm](https://img.shields.io/npm/dt/await-on.svg)
![Travis](https://img.shields.io/travis/bitstrider/await-on.svg)
![Coveralls github](https://img.shields.io/coveralls/github/bitstrider/await-on.svg)

really simple error handling with await/async

inspired by [`await-to-js`](https://github.com/scopsy/await-to-js) whose creator [Dima Grossman](http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/) originally blogged about using destructuring array assignment

## Overview
This package basically provides 2 main syntaxes to choose from:
```javascript
const on = require('await-on');

const fetchData = () => new Promise(/*...*/);

const [err, data] = await on(fetchData());
const [err, data] = await fetchData().handle(); //prototype extension
```

The goal is to avoid the built-in approach using the `try`/`catch` block pattern:

```javascript
try{
	const data = await fetchData();
	res.send(data);
}catch(err) {
	res.send(err);
}
```

## Quick Usage

using `on` with the function `fetchData` which returns a Promise that resolve to some result `data`:
```javascript
const {on} = require('await-on');
const fetchData = () => new Promise(/*...*/);

async function foo(req,res) {
	const [err, data] = await on(fetchData());
	if(err) res.send(err);
	else res.send(data);
}
```

using the prototype extension `handle` on Promise types is a bit cleaner, and its potentially more readable because its also using the same chaining pattern already standard for working with Promises 🌟 :

```javascript
require('await-on');

async function foo(req,res) {
	const [err, data] = await fetchData().handle();
	!err ? res.send(data) : res.send(err);
}
```


## Type fuzziness
Non-promises will passthrough same as the behavior of the native `await`

```javascript
const [err,answer] = await on(42); //not a promise but ok no big deal
console.log(answer) //> 42
```


## Decorator approach
A decorator `on.handler` is also provided to wrap promise bearing functions with the handling functionalities:

```javascript
const {handler} = require('await-on');
let fetchData = () => new Promise(/*...*/);
fetchDataAndHandle = handler(fetchData);

async function foo(req,res) {
	const [err, data] = await fetchDataAndHandle();
	!err ? res.send(data) : res.send(err);
}
```

## License
MIT License. See [License](https://github.com/bitstrider/await-on/blob/master/LICENSE) in the repository.
