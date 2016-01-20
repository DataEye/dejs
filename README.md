#dejs

A collection of utility libraries used by other DataEye JS projects.

[![Build Status](https://semaphoreci.com/api/v1/projects/feb269cb-570b-4836-a5a8-c9eec1d324eb/665759/badge.svg)](https://semaphoreci.com/damngoto/dejs)

[![codecov.io](https://codecov.io/github/DataEye/dejs/coverage.svg?branch=master)](https://codecov.io/github/DataEye/dejs?branch=master)

## Component List

> * ajax (based on superagent)
> * chart (build charts more easier, based on highcharts)
> * error (an error tip for react)
> * footer
> * loading (a react component for display loading effect)
> * mock (baseon on superagent-mocker)
> * no-data (no data tips for query result)
> * redux-ajax-middleware
> * reduxis (help us build redux based component easily)
> * timer
> * utils

## Usage

```js
import reduxis from 'dejs/lib/reduxis'
import Loading from 'dejs/lib/loading'
import ajax, {get, post} from 'dejs/lib/ajax'

// jQuery like
ajax({
  url: '/',
  data: {},
  success: (json, res) => {
    // success
  },
  error: (err, res) => {
    // error
  },
  complete: () => {
    // complete
  }
})

// Promise
ajax({
  url: '/',
  method: 'post'
}).then(function(res) {
  console.log(res.body)
})
```
