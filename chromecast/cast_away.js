(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Generated by CoffeeScript 1.7.1
(function() {
  var CastAway, CustomReceiver, EventEmitter, MediaControls, Session,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  EventEmitter = require('./event_emitter');

  Session = require('./session');

  MediaControls = require('./media-controls');

  CustomReceiver = require('./custom-receiver');

  CastAway = (function(_super) {
    __extends(CastAway, _super);

    function CastAway(_arg) {
      var _ref;
      _ref = _arg != null ? _arg : {}, this.applicationID = _ref.applicationID, this.namespace = _ref.namespace;
      if (!((typeof chrome !== "undefined" && chrome !== null ? chrome.cast : void 0) || cast)) {
        throw "chrome.cast namespace not found";
      }
      this.cast = (typeof chrome !== "undefined" && chrome !== null ? chrome.cast : void 0) || cast;
    }

    CastAway.prototype.initialize = function(cb) {
      return window['__onGCastApiAvailable'] = (function(_this) {
        return function(loaded, errorInfo) {
          var apiConfig, app, error, sessionRequest, success;
          if (loaded) {
            app = _this.applicationID || _this.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
            sessionRequest = new _this.cast.SessionRequest(app);
            apiConfig = new _this.cast.ApiConfig(sessionRequest, function() {
              var data;
              data = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              return _this.sessionListener.apply(_this, data);
            }, function() {
              var data;
              data = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              return _this.receiverListener.apply(_this, data);
            });
            success = function(data) {
              return cb(null, data);
            };
            error = function(err) {
              return cb(err);
            };
            return _this.cast.initialize(apiConfig, success, error);
          }
        };
      })(this);
    };

    CastAway.prototype.receive = function(config) {
      if (config == null) {
        config = {};
      }
      this.receiver = new CustomReceiver(config, this);
      this.receiver.start();
      return this.receiver;
    };

    CastAway.prototype.sessionListener = function(session) {
      if (session.media.length !== 0) {
        this.currentSession = session;
        session.addUpdateListener(this.sessionUpdateListener);
        return this.emit('existingMediaFound', new Session(this.currentSession, this), new MediaControls(this.currentSession.media[0], this));
      }
    };

    CastAway.prototype.receiverListener = function(receiver) {
      var available, state;
      available = this.cast.ReceiverAvailability.AVAILABLE;
      console.log("receiver === " + receiver);
      state = receiver === available ? 'available' : 'unavailable';
      return this.emit("receivers:" + state);
    };

    CastAway.prototype.sessionUpdateListener = function(isAlive) {
      if (!isAlive) {
        return this.currentSession = null;
      }
    };

    CastAway.prototype.requestSession = function(cb) {
      var onError, onSuccess;
      onSuccess = (function(_this) {
        return function(session) {
          return cb(null, new Session(session, _this));
        };
      })(this);
      onError = function(err) {
        return cb(err);
      };
      return this.cast.requestSession(onSuccess, onError);
    };

    return CastAway;

  })(EventEmitter);

  window.CastAway = CastAway;

}).call(this);

},{"./custom-receiver":2,"./event_emitter":3,"./media-controls":4,"./session":5}],2:[function(require,module,exports){
// Generated by CoffeeScript 1.7.1
(function() {
  var CustomReceiver, DEFAULT_MAX_INACTIVITY, DEFAULT_STATUS_TEXT, EventEmitter,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EventEmitter = require("./event_emitter");

  DEFAULT_STATUS_TEXT = "Ready";

  DEFAULT_MAX_INACTIVITY = 60;

  module.exports = CustomReceiver = (function(_super) {
    __extends(CustomReceiver, _super);

    function CustomReceiver(config, castAway) {
      this.castAway = castAway;
      this.onMessage = __bind(this.onMessage, this);
      this.namespace = this.castAway.namespace || "urn:x-cast:json";
      this.config = new cast.receiver.CastReceiverManager.Config();
      this.config.statusText = config.statusText || DEFAULT_STATUS_TEXT;
      this.config.maxInactivity = config.maxInactivity || DEFAULT_MAX_INACTIVITY;
    }

    CustomReceiver.prototype.start = function() {
      var bus, manager;
      manager = cast.receiver.CastReceiverManager.getInstance();
      bus = manager.getCastMessageBus(this.namespace);
      bus.onMessage = this.onMessage;
      return manager.start(this.config);
    };

    CustomReceiver.prototype.onMessage = function(event) {
      var data, msgName, payload;
      data = JSON.parse(event.data);
      msgName = data._name;
      payload = data._payload;
      return this.emit(msgName, payload);
    };

    return CustomReceiver;

  })(EventEmitter);

}).call(this);

},{"./event_emitter":3}],3:[function(require,module,exports){
/*!
 * EventEmitter v4.2.7 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function () {
  'use strict';

  /**
   * Class for managing events.
   * Can be extended to provide event functionality in other classes.
   *
   * @class EventEmitter Manages event registering and emitting.
   */
  function EventEmitter() {}

  // Shortcuts to improve speed and size
  var proto = EventEmitter.prototype;
  var exports = this;
  var originalGlobalValue = exports.EventEmitter;

  /**
   * Finds the index of the listener for the event in it's storage array.
   *
   * @param {Function[]} listeners Array of listeners to search through.
   * @param {Function} listener Method to look for.
   * @return {Number} Index of the specified listener, -1 if not found
   * @api private
   */
  function indexOfListener(listeners, listener) {
    var i = listeners.length;
    while (i--) {
      if (listeners[i].listener === listener) {
        return i;
      }
    }

    return -1;
  }

  /**
   * Alias a method while keeping the context correct, to allow for overwriting of target method.
   *
   * @param {String} name The name of the target method.
   * @return {Function} The aliased method
   * @api private
   */
  function alias(name) {
    return function aliasClosure() {
      return this[name].apply(this, arguments);
    };
  }

  /**
   * Returns the listener array for the specified event.
   * Will initialise the event object and listener arrays if required.
   * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
   * Each property in the object response is an array of listener functions.
   *
   * @param {String|RegExp} evt Name of the event to return the listeners from.
   * @return {Function[]|Object} All listener functions for the event.
   */
  proto.getListeners = function getListeners(evt) {
    var events = this._getEvents();
    var response;
    var key;

    // Return a concatenated array of all matching events if
    // the selector is a regular expression.
    if (evt instanceof RegExp) {
      response = {};
      for (key in events) {
        if (events.hasOwnProperty(key) && evt.test(key)) {
          response[key] = events[key];
        }
      }
    }
    else {
      response = events[evt] || (events[evt] = []);
    }

    return response;
  };

  /**
   * Takes a list of listener objects and flattens it into a list of listener functions.
   *
   * @param {Object[]} listeners Raw listener objects.
   * @return {Function[]} Just the listener functions.
   */
  proto.flattenListeners = function flattenListeners(listeners) {
    var flatListeners = [];
    var i;

    for (i = 0; i < listeners.length; i += 1) {
      flatListeners.push(listeners[i].listener);
    }

    return flatListeners;
  };

  /**
   * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
   *
   * @param {String|RegExp} evt Name of the event to return the listeners from.
   * @return {Object} All listener functions for an event in an object.
   */
  proto.getListenersAsObject = function getListenersAsObject(evt) {
    var listeners = this.getListeners(evt);
    var response;

    if (listeners instanceof Array) {
      response = {};
      response[evt] = listeners;
    }

    return response || listeners;
  };

  /**
   * Adds a listener function to the specified event.
   * The listener will not be added if it is a duplicate.
   * If the listener returns true then it will be removed after it is called.
   * If you pass a regular expression as the event name then the listener will be added to all events that match it.
   *
   * @param {String|RegExp} evt Name of the event to attach the listener to.
   * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.addListener = function addListener(evt, listener) {
    var listeners = this.getListenersAsObject(evt);
    var listenerIsWrapped = typeof listener === 'object';
    var key;

    for (key in listeners) {
      if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
        listeners[key].push(listenerIsWrapped ? listener : {
          listener: listener,
          once: false
        });
      }
    }

    return this;
  };

  /**
   * Alias of addListener
   */
  proto.on = alias('addListener');

  /**
   * Semi-alias of addListener. It will add a listener that will be
   * automatically removed after it's first execution.
   *
   * @param {String|RegExp} evt Name of the event to attach the listener to.
   * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.addOnceListener = function addOnceListener(evt, listener) {
    return this.addListener(evt, {
      listener: listener,
      once: true
    });
  };

  /**
   * Alias of addOnceListener.
   */
  proto.once = alias('addOnceListener');

  /**
   * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
   * You need to tell it what event names should be matched by a regex.
   *
   * @param {String} evt Name of the event to create.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.defineEvent = function defineEvent(evt) {
    this.getListeners(evt);
    return this;
  };

  /**
   * Uses defineEvent to define multiple events.
   *
   * @param {String[]} evts An array of event names to define.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.defineEvents = function defineEvents(evts) {
    for (var i = 0; i < evts.length; i += 1) {
      this.defineEvent(evts[i]);
    }
    return this;
  };

  /**
   * Removes a listener function from the specified event.
   * When passed a regular expression as the event name, it will remove the listener from all events that match it.
   *
   * @param {String|RegExp} evt Name of the event to remove the listener from.
   * @param {Function} listener Method to remove from the event.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.removeListener = function removeListener(evt, listener) {
    var listeners = this.getListenersAsObject(evt);
    var index;
    var key;

    for (key in listeners) {
      if (listeners.hasOwnProperty(key)) {
        index = indexOfListener(listeners[key], listener);

        if (index !== -1) {
          listeners[key].splice(index, 1);
        }
      }
    }

    return this;
  };

  /**
   * Alias of removeListener
   */
  proto.off = alias('removeListener');

  /**
   * Adds listeners in bulk using the manipulateListeners method.
   * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
   * You can also pass it a regular expression to add the array of listeners to all events that match it.
   * Yeah, this function does quite a bit. That's probably a bad thing.
   *
   * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
   * @param {Function[]} [listeners] An optional array of listener functions to add.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.addListeners = function addListeners(evt, listeners) {
    // Pass through to manipulateListeners
    return this.manipulateListeners(false, evt, listeners);
  };

  /**
   * Removes listeners in bulk using the manipulateListeners method.
   * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
   * You can also pass it an event name and an array of listeners to be removed.
   * You can also pass it a regular expression to remove the listeners from all events that match it.
   *
   * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
   * @param {Function[]} [listeners] An optional array of listener functions to remove.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.removeListeners = function removeListeners(evt, listeners) {
    // Pass through to manipulateListeners
    return this.manipulateListeners(true, evt, listeners);
  };

  /**
   * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
   * The first argument will determine if the listeners are removed (true) or added (false).
   * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
   * You can also pass it an event name and an array of listeners to be added/removed.
   * You can also pass it a regular expression to manipulate the listeners of all events that match it.
   *
   * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
   * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
   * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
    var i;
    var value;
    var single = remove ? this.removeListener : this.addListener;
    var multiple = remove ? this.removeListeners : this.addListeners;

    // If evt is an object then pass each of it's properties to this method
    if (typeof evt === 'object' && !(evt instanceof RegExp)) {
      for (i in evt) {
        if (evt.hasOwnProperty(i) && (value = evt[i])) {
          // Pass the single listener straight through to the singular method
          if (typeof value === 'function') {
            single.call(this, i, value);
          }
          else {
            // Otherwise pass back to the multiple function
            multiple.call(this, i, value);
          }
        }
      }
    }
    else {
      // So evt must be a string
      // And listeners must be an array of listeners
      // Loop over it and pass each one to the multiple method
      i = listeners.length;
      while (i--) {
        single.call(this, evt, listeners[i]);
      }
    }

    return this;
  };

  /**
   * Removes all listeners from a specified event.
   * If you do not specify an event then all listeners will be removed.
   * That means every event will be emptied.
   * You can also pass a regex to remove all events that match it.
   *
   * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.removeEvent = function removeEvent(evt) {
    var type = typeof evt;
    var events = this._getEvents();
    var key;

    // Remove different things depending on the state of evt
    if (type === 'string') {
      // Remove all listeners for the specified event
      delete events[evt];
    }
    else if (evt instanceof RegExp) {
      // Remove all events matching the regex.
      for (key in events) {
        if (events.hasOwnProperty(key) && evt.test(key)) {
          delete events[key];
        }
      }
    }
    else {
      // Remove all listeners in all events
      delete this._events;
    }

    return this;
  };

  /**
   * Alias of removeEvent.
   *
   * Added to mirror the node API.
   */
  proto.removeAllListeners = alias('removeEvent');

  /**
   * Emits an event of your choice.
   * When emitted, every listener attached to that event will be executed.
   * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
   * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
   * So they will not arrive within the array on the other side, they will be separate.
   * You can also pass a regular expression to emit to all events that match it.
   *
   * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
   * @param {Array} [args] Optional array of arguments to be passed to each listener.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.emitEvent = function emitEvent(evt, args) {
    var listeners = this.getListenersAsObject(evt);
    var listener;
    var i;
    var key;
    var response;

    for (key in listeners) {
      if (listeners.hasOwnProperty(key)) {
        i = listeners[key].length;

        while (i--) {
          // If the listener returns true then it shall be removed from the event
          // The function is executed either with a basic call or an apply if there is an args array
          listener = listeners[key][i];

          if (listener.once === true) {
            this.removeListener(evt, listener.listener);
          }

          response = listener.listener.apply(this, args || []);

          if (response === this._getOnceReturnValue()) {
            this.removeListener(evt, listener.listener);
          }
        }
      }
    }

    return this;
  };

  /**
   * Alias of emitEvent
   */
  proto.trigger = alias('emitEvent');

  /**
   * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
   * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
   *
   * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
   * @param {...*} Optional additional arguments to be passed to each listener.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.emit = function emit(evt) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.emitEvent(evt, args);
  };

  /**
   * Sets the current value to check against when executing listeners. If a
   * listeners return value matches the one set here then it will be removed
   * after execution. This value defaults to true.
   *
   * @param {*} value The new value to check for when executing listeners.
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  proto.setOnceReturnValue = function setOnceReturnValue(value) {
    this._onceReturnValue = value;
    return this;
  };

  /**
   * Fetches the current value to check against when executing listeners. If
   * the listeners return value matches this one then it should be removed
   * automatically. It will return true by default.
   *
   * @return {*|Boolean} The current value to check for or the default, true.
   * @api private
   */
  proto._getOnceReturnValue = function _getOnceReturnValue() {
    if (this.hasOwnProperty('_onceReturnValue')) {
      return this._onceReturnValue;
    }
    else {
      return true;
    }
  };

  /**
   * Fetches the events object and creates one if required.
   *
   * @return {Object} The events storage object.
   * @api private
   */
  proto._getEvents = function _getEvents() {
    return this._events || (this._events = {});
  };

  /**
   * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
   *
   * @return {Function} Non conflicting EventEmitter class.
   */
  EventEmitter.noConflict = function noConflict() {
    exports.EventEmitter = originalGlobalValue;
    return EventEmitter;
  };

  // Expose the class either via AMD, CommonJS or the global object
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return EventEmitter;
    });
  }
  else if (typeof module === 'object' && module.exports){
    module.exports = EventEmitter;
  }
  else {
    this.EventEmitter = EventEmitter;
  }
  module.exports = EventEmitter;
}.call(this));

},{}],4:[function(require,module,exports){
// Generated by CoffeeScript 1.7.1
(function() {
  var MediaControls;

  MediaControls = (function() {
    function MediaControls(session, castAway) {
      this.session = session;
      this.castAway = castAway;
      if (!this.session) {
        throw "No session passed";
      }
      if (!this.castAway.cast) {
        throw "CastAway instance not found";
      }
      this.cast = this.castAway.cast;
    }

    MediaControls.prototype.play = function(cb) {
      if (cb == null) {
        cb = function() {};
      }
      return this.session.play(null, function(data) {
        return cb(null, data);
      }, function(err) {
        return cb(err);
      });
    };

    MediaControls.prototype.pause = function(cb) {
      if (cb == null) {
        cb = function() {};
      }
      return this.session.pause(null, function(data) {
        return cb(null, data);
      }, function(err) {
        return cb(err);
      });
    };

    MediaControls.prototype.stop = function(cb) {
      if (cb == null) {
        cb = function() {};
      }
      return this.session.stop(null, function(data) {
        return cb(null, data);
      }, function(err) {
        return cb(err);
      });
    };

    MediaControls.prototype.seek = function(time, cb) {
      var seekRequest;
      if (cb == null) {
        cb = function() {};
      }
      seekRequest = this.cast.session.SeekRequest(time);
      return this.session.seek(seekRequest, function(data) {
        return cb(null, data);
      }, function(err) {
        return cb(err);
      });
    };

    return MediaControls;

  })();

  module.exports = MediaControls;

}).call(this);

},{}],5:[function(require,module,exports){
// Generated by CoffeeScript 1.7.1
(function() {
  var EventEmitter, MediaControls, Session, assignMetadata,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EventEmitter = require('./event_emitter');

  MediaControls = require('./media-controls');

  Session = (function(_super) {
    __extends(Session, _super);

    function Session(session, castAway) {
      this.session = session;
      this.castAway = castAway;
      if (!this.castAway.cast) {
        throw "CastAway instance not found";
      }
      this.cast = this.castAway.cast;
      this.namespace = this.castAway.namespace || "urn:x-cast:json";
      if (this.session.media[0]) {
        this.session.media[0].addUpdateListener((function(_this) {
          return function() {
            return _this.sessionUpdateListener();
          };
        })(this));
      }
    }

    Session.prototype.displayName = function() {
      return this.session.displayName;
    };

    Session.prototype.receiverName = function() {
      return this.session.receiver.friendlyName;
    };

    Session.prototype.send = function(name, payload, cb) {
      var data, onError, onSuccess;
      if (payload == null) {
        payload = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      onSuccess = function(data) {
        return cb(null, data);
      };
      onError = function(err) {
        return cb(err);
      };
      data = JSON.stringify({
        _name: name,
        _payload: payload
      });
      return this.session.sendMessage(this.namespace, data, onSuccess, onError);
    };

    Session.prototype.load = function(mediaInfo, cb) {
      var onError, onSuccess, request;
      if (cb == null) {
        cb = function() {};
      }
      request = new chrome.cast.media.LoadRequest(mediaInfo);
      onSuccess = (function(_this) {
        return function(media) {
          var controls;
          media.addUpdateListener(function() {
            return _this.sessionUpdateListener();
          });
          controls = new MediaControls(media, _this.castAway);
          return cb(null, controls);
        };
      })(this);
      onError = function(err) {
        return cb(err);
      };
      return this.session.loadMedia(request, onSuccess, onError);
    };

    Session.prototype.sessionUpdateListener = function() {
      var event, media;
      media = this.session.media[0];
      event = (function() {
        switch (media.playerState) {
          case 'PLAYING':
            return 'play';
          case 'PAUSED':
            return 'pause';
          case 'STOPPED':
            return 'stop';
          case 'SEEKING':
            return 'seek';
          case 'ERROR':
            return 'error';
          case 'IDLE':
            return 'idle';
          case 'LOADING':
            return 'load';
        }
      })();
      return this.emit(event);
    };

    Session.prototype.music = function(config, cb) {
      var mediaInfo, metadata;
      if (config == null) {
        config = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      if (!config.url) {
        throw "Url required for music";
      }
      if (!config.contentType) {
        throw "Content-type required for music";
      }
      mediaInfo = new chrome.cast.media.MediaInfo(config.url, config.contentType);
      metadata = new chrome.cast.media.MusicTrackMediaMetadata();
      metadata.metadataType = chrome.cast.media.MetadataType.MUSIC_TRACK;
      mediaInfo.metadata = assignMetadata(metadata, config);
      return this.load(mediaInfo, cb);
    };

    Session.prototype.tvShow = function(config, cb) {
      var mediaInfo, metadata;
      if (config == null) {
        config = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      if (!config.url) {
        throw "Url required for tv show";
      }
      if (!config.contentType) {
        throw "Content-type required for tv show";
      }
      mediaInfo = new chrome.cast.media.MediaInfo(config.url, config.contentType);
      metadata = new chrome.cast.media.TvShowMediaMetadata();
      metadata.metadataType = chrome.cast.media.MetadataType.TV_SHOW;
      mediaInfo.metadata = assignMetadata(metadata, config);
      return this.load(mediaInfo, cb);
    };

    Session.prototype.movie = function(config, cb) {
      var mediaInfo, metadata;
      if (config == null) {
        config = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      if (!config.url) {
        throw "Url required for movie";
      }
      if (!config.contentType) {
        throw "Content-type required for movie";
      }
      mediaInfo = new chrome.cast.media.MediaInfo(config.url, config.contentType);
      metadata = new chrome.cast.media.MovieMediaMetadata();
      metadata.metadataType = chrome.cast.media.MetadataType.MOVIE;
      mediaInfo.metadata = assignMetadata(metadata, config);
      return this.load(mediaInfo, cb);
    };

    Session.prototype.photo = function(config, cb) {
      var mediaInfo, metadata;
      if (config == null) {
        config = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      if (!config.url) {
        throw "Url required for photo";
      }
      if (!config.contentType) {
        throw "Content-type required for photo";
      }
      mediaInfo = new chrome.cast.media.MediaInfo(config.url, config.contentType);
      metadata = new chrome.cast.media.PhotoMediaMetadata();
      metadata.metadataType = chrome.cast.media.MetadataType.PHOTO;
      mediaInfo.metadata = assignMetadata(metadata, config);
      return this.load(mediaInfo, cb);
    };

    Session.prototype.release = function(cb) {
      if (cb == null) {
        cb = function() {};
      }
      if (!this.session) {
        return;
      }
      this.emit('release');
      return this.session.stop((function(data) {
        return cb(null, data);
      }), (function(err) {
        return cb(err);
      }));
    };

    return Session;

  })(EventEmitter);

  assignMetadata = function(metadata, config) {
    var image, key, value;
    for (key in config) {
      value = config[key];
      if (key === 'images') {
        value = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = value.length; _i < _len; _i++) {
            image = value[_i];
            _results.push(new chrome.cast.Image(image));
          }
          return _results;
        })();
      }
      metadata[key] = value;
    }
    return metadata;
  };

  module.exports = Session;

}).call(this);

},{"./event_emitter":3,"./media-controls":4}]},{},[1])