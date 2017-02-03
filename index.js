'use strict'

/**
 * @param {Observable} observable
 * @param {Function}   callback
 */
function pull(observable, callback) {
  var buffer = []
  var ready = true

  observable.subscribe(function (event) {
    if (ready) {
      ready = false
      callback(next, event)
      return;
    }

    buffer.push(event)
  })

  function next() {
    ready = true

    if (buffer.length > 0) {
      ready = false
      callback(next, buffer.shift())
    }
  }
}

module.exports = pull
