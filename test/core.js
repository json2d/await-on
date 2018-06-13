const tap = require('tap')
const {handler,on} = require('../lib/await-on')

const ANSWER = 42
const ERROR = new Error('Need more time to figure that out')

let waitOne = () => new Promise(resolve => setTimeout(()=>resolve(ANSWER),1000))
let waitOneAndThrow = () => new Promise( (resolve,reject) => setTimeout(() => reject(ERROR),1000))

tap.test("on", async function (t) {
  t.plan(2)

	const [err,res] = await on(waitOne())

	t.notOk(err)
	t.equal(res,ANSWER)
})

tap.test("@handler", async function (t) {
  t.plan(2)

	const waitOneHandle = handler(waitOne)

	const [err,res] = await waitOneHandle()

	t.notOk(err)
	t.equal(res,ANSWER)
})

tap.test("Promise.prototype.handle", async function (t) {
  t.plan(2)

	const [err,res] = await waitOne().handle()

	t.notOk(err)
	t.equal(res,ANSWER)
})

tap.test("Promise.prototype.handle (chaining)", async function (t) {
  t.plan(3)

	const [err,res] = await waitOne().then(res => {
		t.equal(res,ANSWER)
		return Promise.resolve(res)
	}).handle()

	t.notOk(err)
	t.equal(res,ANSWER)
})

tap.test("handling errors", async function (t) {
  t.plan(2)

	const [err,res] = await on(waitOneAndThrow())

	t.equal(err,ERROR)
	t.notOk(res)

})

tap.test("fuzzy type passthrough", async function (t) {
  t.plan(2)

	const [err,res] = await on(ANSWER)

	t.notOk(err)
	t.equal(res,ANSWER)

})
