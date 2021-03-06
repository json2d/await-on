"use strict";

/**
 * Handler which takes a promise and returns array signature with `[err, data]`.
 * @param  {Promise} promise    Promise to handle
 * @return {Array}              Array with signature `[err, data]`
 */
function on(promise) {
  if(promise && typeof promise.then === 'function') {
    return promise.then(data => {
      return [null, data];
    })
    .catch(err => [err]);

  }else{
    return [null,promise]
  }
}

/**
 * Decorator which takes a promise bearing function and returns that function wrapped with `on`.
 * @param  {Function} wrapped    Function to be decorated
 * @return {Function}            Function decorated
 */
on.handler = (wrapped) => (...args) => on(wrapped(...args))

//Promise type extension
global.Promise.prototype.handle = function() {
  return on(this)
}

module.exports = on
