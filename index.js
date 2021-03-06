// shameless adapated from https://gist.github.com/maccman/5790509 for browserify
'use strict';
var $ = require('jquery')
  , queues = {}
  , running = false

function queue(name) {
  if (name === true) name = '_default'
  return queues[name] || (queues[name] = [])
}

function next (name) {
  var deferred, list, options, _ref

  list = queue(name)
  if (!list.length) {
    running = false
    return
  }
  _ref = list.shift(), options = _ref[0], deferred = _ref[1]
  return $.ajax(options).always(function() {
    return next(name)
  }).done(function() {
    return deferred.resolve.apply(deferred, arguments)
  }).fail(function() {
    return deferred.reject.apply(deferred, arguments)
  })
}

function push(name, options) {
  var deferred, list

  list = queue(name)
  deferred = $.Deferred()
  list.push([options, deferred])
  if (!running) next(name)
  running = true
  return deferred.promise()
}

function remove(name, options) {
  var i, list, value, _, _i, _len, _ref, _results

  list = queue(name)
  _results = []
  for (i = _i = 0, _len = list.length; _i < _len; i = ++_i) {
    _ref = list[i], value = _ref[0], _ = _ref[1]
    if (value !== options) continue
    list.splice(i, 1)
    break
  }
  return _results
}

$.ajaxTransport('+*', function(options) {
  var queuedOptions

  if (options.queue) {
    queuedOptions = $.extend({}, options)
    queuedOptions.queue = false
    queuedOptions.processData = false
    return {
      send: function(headers, complete) {
        return push(options.queue, queuedOptions).done(function(data, textStatus, jqXHR) {
          return complete(jqXHR.status, jqXHR.statusText, {
            text: jqXHR.responseText
          }, jqXHR.getAllResponseHeaders())
        }).fail(function(jqXHR, textStatus, err) {
          console.error(err)
          return complete(jqXHR.status, jqXHR.statusText, {
            text: jqXHR.responseText
          }, jqXHR.getAllResponseHeaders())
        })
      },
      abort: function() {
        return remove(options.queue, queuedOptions)
      }
    }
  }
})

module.exports = $
exports.queue = queues
