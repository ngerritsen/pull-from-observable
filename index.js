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
      callback(next, event)
      ready = false
    }

    buffer.push(event)
  })

  function next() {
    ready = true

    if (buffer.length > 0) {
      callback(next, buffer.shift())
      ready = false
    }
  }
}

module.exports = pull
