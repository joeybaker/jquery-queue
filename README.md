jQuery Queue
===================

For browserify. Shamlessly adapted from @maccman https://gist.github.com/maccman/5790509 http://blog.alexmaccaw.com/queuing-ajax-requests

## Install
NPM or bower. NOTE: not on NPM yet. You'll need to manually install.

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
