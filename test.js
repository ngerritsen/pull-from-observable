import test from 'ava'
import sinon from 'sinon'
import Rx from 'rxjs'

import pull from './index.js'

test('Pulls data from an observable.', t => {
  const subject = new Rx.Subject()

  const spy = sinon.spy((next, data) => {
    next()
  })

  pull(subject, spy)

  subject.next('a')
  subject.next('b')
  subject.next('c')

  t.is(spy.firstCall.args[1], 'a')
  t.is(spy.secondCall.args[1], 'b')
  t.is(spy.thirdCall.args[1], 'c')
})

test('Asynchronously pulls data from an observable.', t => {
  const observable = Rx.Observable.interval(2).take(3)

  const spy = sinon.spy((next, data) => {
    setTimeout(() => {
      next()
    }, 10)
  })

  pull(observable, spy)

  return new Promise(resolve => {
    setTimeout(() => {
      t.is(spy.firstCall.args[1], 0)
      t.is(spy.secondCall.args[1], 1)
      t.is(spy.thirdCall.args[1], 2)

      resolve()
    }, 70)
  })
})
