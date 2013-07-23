jQuery Queue
===================

For browserify. Shamlessly adapted from @maccman https://gist.github.com/maccman/5790509 http://blog.alexmaccaw.com/queuing-ajax-requests

## Install
NPM or bower. NOTE: not published yet. You'll need to manually install.

`npm i --save git+ssh://git@github.com:joeybaker/jquery-queue.git`

or

`bower install joeybaker/jquery-queue`

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
