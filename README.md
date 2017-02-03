[![Build Status](https://travis-ci.org/ngerritsen/pull-from-observable.svg?branch=master)](https://travis-ci.org/ngerritsen/pull-from-observable)

# pull-from-observable

_Allows you get events from an observable in a pull-based manner._

Observables are push based, they keep pushing events to you. If you need to do some async work before you can handle the next event, you are pretty much out of luck. There are some solutions to apply buffering, but in the end, the observable source controls the data flow.

Pull from observable buffers the incoming values for you, and allows you to run `next()` when you are ready to process the next value. If there are no values, they will be provided when available.

## Installation

With npm:

```bash
npm install pull-from-observable
```

With yarn:

```bash
yarn add pull-from-observable
```

## Usage

Example with Rx observables:

```js
const Rx = require('rxjs')
const pull = require('pull-from-observable')

const observable = Rx.Observable.interval(100).take(5) // Push values every 100ms, 5 times

pull(observable, (next, value) => {
  setTimeout(() => { // Do some async work that takes longer than the interval
    console.log(value)
    next() // Ready to pull next value
  }, 200)
})

// Output:
//
// 0
// 1
// 2
// 3
// 4
```
