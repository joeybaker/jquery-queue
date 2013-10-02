jQuery Queue
===================

For browserify. Shamlessly adapted from @maccman https://gist.github.com/maccman/5790509 http://blog.alexmaccaw.com/queuing-ajax-requests

## Install
Bower.

`bower install jquery-queue`

## Usage

Include with browserify.

```js
var $ = require('jquery')
require('jquery-queue')

$.ajax({
  url: '/example'
  , queue: 'my queue'
})

```

## Test
None yet.

## Changelog

### 0.1.0
Init
