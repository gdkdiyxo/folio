/**
 * Burno.js v0.3
 * https://github.com/brunosimon/burno.js
 *
 * Released under the MIT license
 * https://github.com/brunosimon/burno.js/blob/master/LICENSE.txt
 *
 * Date: Mon Jan 18 2016 19:29:05 GMT+0100 (CET)
 */

( function( window, document, undefined )
{
    'use strict';
/*
 * classList.js: Cross-browser full element.classList implementation.
 * 2014-07-23
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

if ("document" in self) {

// Full polyfill for browsers with no classList support
if (!("classList" in document.createElement("_"))) {

(function (view) {

"use strict";

if (!('Element' in view)) return;

var
    classListProp = "classList"
  , protoProp = "prototype"
  , elemCtrProto = view.Element[protoProp]
  , objCtr = Object
  , strTrim = String[protoProp].trim || function () {
    return this.replace(/^\s+|\s+$/g, "");
  }
  , arrIndexOf = Array[protoProp].indexOf || function (item) {
    var
        i = 0
      , len = this.length
    ;
    for (; i < len; i++) {
      if (i in this && this[i] === item) {
        return i;
      }
    }
    return -1;
  }
  // Vendors: please allow content code to instantiate DOMExceptions
  , DOMEx = function (type, message) {
    this.name = type;
    this.code = DOMException[type];
    this.message = message;
  }
  , checkTokenAndGetIndex = function (classList, token) {
    if (token === "") {
      throw new DOMEx(
          "SYNTAX_ERR"
        , "An invalid or illegal string was specified"
      );
    }
    if (/\s/.test(token)) {
      throw new DOMEx(
          "INVALID_CHARACTER_ERR"
        , "String contains an invalid character"
      );
    }
    return arrIndexOf.call(classList, token);
  }
  , ClassList = function (elem) {
    var
        trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
      , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
      , i = 0
      , len = classes.length
    ;
    for (; i < len; i++) {
      this.push(classes[i]);
    }
    this._updateClassName = function () {
      elem.setAttribute("class", this.toString());
    };
  }
  , classListProto = ClassList[protoProp] = []
  , classListGetter = function () {
    return new ClassList(this);
  }
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
  return this[i] || null;
};
classListProto.contains = function (token) {
  token += "";
  return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
  var
      tokens = arguments
    , i = 0
    , l = tokens.length
    , token
    , updated = false
  ;
  do {
    token = tokens[i] + "";
    if (checkTokenAndGetIndex(this, token) === -1) {
      this.push(token);
      updated = true;
    }
  }
  while (++i < l);

  if (updated) {
    this._updateClassName();
  }
};
classListProto.remove = function () {
  var
      tokens = arguments
    , i = 0
    , l = tokens.length
    , token
    , updated = false
    , index
  ;
  do {
    token = tokens[i] + "";
    index = checkTokenAndGetIndex(this, token);
    while (index !== -1) {
      this.splice(index, 1);
      updated = true;
      index = checkTokenAndGetIndex(this, token);
    }
  }
  while (++i < l);

  if (updated) {
    this._updateClassName();
  }
};
classListProto.toggle = function (token, force) {
  token += "";

  var
      result = this.contains(token)
    , method = result ?
      force !== true && "remove"
    :
      force !== false && "add"
  ;

  if (method) {
    this[method](token);
  }

  if (force === true || force === false) {
    return force;
  } else {
    return !result;
  }
};
classListProto.toString = function () {
  return this.join(" ");
};

if (objCtr.defineProperty) {
  var classListPropDesc = {
      get: classListGetter
    , enumerable: true
    , configurable: true
  };
  try {
    objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
  } catch (ex) { // IE 8 doesn't support enumerable:true
    if (ex.number === -0x7FF5EC54) {
      classListPropDesc.enumerable = false;
      objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
    }
  }
} else if (objCtr[protoProp].__defineGetter__) {
  elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

} else {
// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

(function () {
  "use strict";

  var testElement = document.createElement("_");

  testElement.classList.add("c1", "c2");

  // Polyfill for IE 10/11 and Firefox <26, where classList.add and
  // classList.remove exist but support only one argument at a time.
  if (!testElement.classList.contains("c2")) {
    var createMethod = function(method) {
      var original = DOMTokenList.prototype[method];

      DOMTokenList.prototype[method] = function(token) {
        var i, len = arguments.length;

        for (i = 0; i < len; i++) {
          token = arguments[i];
          original.call(this, token);
        }
      };
    };
    createMethod('add');
    createMethod('remove');
  }

  testElement.classList.toggle("c3", false);

  // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
  // support the second argument.
  if (testElement.classList.contains("c3")) {
    var _toggle = DOMTokenList.prototype.toggle;

    DOMTokenList.prototype.toggle = function(token, force) {
      if (1 in arguments && !this.contains(token) === !force) {
        return force;
      } else {
        return _toggle.call(this, token);
      }
    };

  }

  testElement = null;
}());

}

}
// ECMA-262, Edition 5, 15.4.4.18
// R??f??rence: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

    var T, k;

    if (this == null) {
      throw new TypeError(' this vaut null ou n est pas d??fini');
    }

    // 1. Soit O le r??sultat de l'appel ?? ToObject
    //    auquel on a pass?? |this| en argument.
    var O = Object(this);

    // 2. Soit lenValue le r??sultat de l'appel de la m??thode
    //    interne Get sur O avec l'argument "length".
    // 3. Soit len la valeur ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. Si IsCallable(callback) est false, on l??ve une TypeError.
    // Voir : http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' n est pas une fonction');
    }

    // 5. Si thisArg a ??t?? fourni, soit T ce thisArg ;
    //    sinon soit T ??gal ?? undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Soit k ??gal ?? 0
    k = 0;

    // 7. On r??p??te tant que k < len
    while (k < len) {

      var kValue;

      // a. Soit Pk ??gal ToString(k).
      //   (implicite pour l'op??rande gauche de in)
      // b. Soit kPresent le r??sultat de l'appel de la
      //    m??thode interne HasProperty de O avec l'argument Pk.
      //    Cette ??tape peut ??tre combin??e avec c
      // c. Si kPresent vaut true, alors
      if (k in O) {

        // i. Soit kValue le r??sultat de l'appel de la
        //    m??thode interne Get de O avec l'argument Pk.
        kValue = O[k];

        // ii. On appelle la m??thode interne Call de callback
        //     avec T comme valeur this et la liste des arguments
        //     qui contient kValue, k, et O.
        callback.call(T, kValue, k, O);
      }
      // d. On augmente k de 1.
      k++;
    }
    // 8. on renvoie undefined
  };
}
if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}
if( !window.HTMLElement )
    window.HTMLElement = window.Element;

// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {

    var k;

    // 1. Let O be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of O with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}
// From MDN - https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/create
if (typeof Object.create != 'function') {
  Object.create = (function() {
    var Temp = function() {};
    return function (prototype) {
      if (arguments.length > 1) {
        throw Error('Cette proth??se ne supporte pas le second argument');
      }
      if (typeof prototype != 'object') {
        throw TypeError('L\'argument doit ??tre un objet');
      }
      Temp.prototype = prototype;
      var result = new Temp();
      Temp.prototype = null;
      return result;
    };
  })();
}
// From MDN - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function () {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik M??ller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// Simple structure
var B =
{
    Core       : {},
    Tools      : {},
    Components : {}
};

/**
 * Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/blog/simple-javascript-inheritance/
 * MIT Licensed.
 * Inspired by base2 and Prototype
 */
B.copy = function( object )
{
    var c = null;

    // Simple object (exclude jQuery object, HTML Element, THREE js, ...)
    if(
        typeof object === 'undefined' ||
        ( object && object.constructor === Object )
    )
    {
        c = {};

        for( var key in object )
            c[ key ] = B.copy( object[ key ] );

        return c;
    }

    // Array
    else if( object instanceof Array )
    {
        c = [];

        for( var i = 0, l = object.length; i < l; i++ )
            c[ i ] = B.copy( object[ i ] );

        return c;
    }

    // Other
    else
    {
        return object;
    }
};

B.merge = function( original, extended )
{
    for( var key in extended )
    {
        var ext = extended[ key ];

        if( ext.constructor === Object )
        {
            if( !original[ key ] )
                original[ key ] = {};

            // ext = Object.create( ext );

            original[ key ] = B.merge( original[ key ], ext );
        }
        else
        {
            original[ key ] = ext;
        }
    }

    return original;
};

var initializing = false,
    fnTest       = /xyz/.test( function()
    {
        xyz;
    } ) ? /\b_super\b/ : /.*/;

B.Class = function(){};

var inject = function( prop )
{
    var proto  = this.prototype,
        _super = {};

    for( var name in prop )
    {
        if( typeof prop[ name ] === 'function' && typeof proto[ name ] === 'function' && fnTest.test( prop[ name ] ) )
        {
            _super[ name ] = proto[ name ];
            proto[ name ]  = ( function( name, fn )
            {
                return function()
                {
                    var tmp     = this._super;
                    this._super = _super[ name ];
                    var ret     = fn.apply( this, arguments );
                    this._super = tmp;
                    return ret;
                };
            } )( name, prop[ name ] );
        }

        else
        {
            proto[ name ] = prop[ name ];
        }
    }
};

B.Class.extend = function( prop )
{
    var _super    = this.prototype;
    initializing  = true;
    var prototype = new this();
    initializing  = false;

    for( var name in prop )
    {
        if( typeof prop[ name ] === 'function' && typeof _super[ name ] === 'function' && fnTest.test( prop[ name ] ) )
        {
            prototype[ name ] = ( function( name, fn )
            {
                return function()
                {
                    var tmp     = this._super;
                    this._super = _super[ name ];
                    var ret     = fn.apply( this, arguments );
                    this._super = tmp;

                    return ret;
                };
            } )( name, prop[ name ] );
        }
        else
        {
            if( name === 'options' )
            {
                if( typeof prototype[ name ] === 'undefined' )
                    prototype[ name ] = {};

                var prototype_copy = B.copy( prototype[ name ] ),
                    prop_copy      = B.copy( prop[ name ] );

                prototype[ name ] = B.merge( prototype_copy, prop_copy );
            }
            else
            {
                prototype[ name ] = prop[ name ];
            }
        }
    }

    function Class()
    {
        if( !initializing )
        {
            if( this.static_instantiate )
            {
                var obj = this.static_instantiate.apply( this, arguments );
                if( obj )
                    return obj;
            }

            for( var p in this )
            {
                if( typeof this[ p ] === 'object' )
                {
                    this[ p ] = B.copy( this[ p ] );
                }
            }

            if( this.construct )
            {
                this.construct.apply( this, arguments );
            }
            else if( this.init )
            {
                this.init.apply( this, arguments );
            }
        }
        return this;
    }

    Class.prototype             = prototype;
    Class.prototype.constructor = Class;
    Class.extend                = B.Class.extend;
    Class.inject                = inject;

    return Class;
};

/**
 * @class  Resizer
 * @author Bruno SIMON / http://bruno-simon.com
 */
B.Core.Abstract = B.Class.extend(
{
    options : {},
    static  : false,

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct : function( options )
    {
        if( typeof options === 'undefined' )
            options = {};

        B.merge( this.options, options );

        this.$ = {};

        // Create statics container
        if( typeof B.Statics !== 'object' )
            B.Statics = {};

        // Register
        if( options.register && typeof options.register === 'string' )
        {
            var registry = new B.Tools.Registry();
            registry.set( options.register, this );
        }

        // Static
        if( this.static && typeof this.static === 'string' )
        {
            // Add instance to statics
            B.Statics[ this.static ] = this;
        }
    },

    /**
     * True constructur used first to return class if static
     * @return {class|null} Return class if static or null if default
     */
    static_instantiate : function()
    {
        if( B.Statics && B.Statics[ this.static ] )
            return B.Statics[ this.static ];
        else
            return null;
    },

    /**
     * Destroy
     */
    destroy : function()
    {

    }
} );

/**
 * @class  Resizer
 * @author Bruno SIMON / http://bruno-simon.com
 */
B.Core.EventEmitter = B.Core.Event_Emitter = B.Core.Abstract.extend(
{
    static  : false,
    options : {},

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct : function( options )
    {
        this._super( options );

        this.callbacks      = {};
        this.callbacks.base = {};
    },

    /**
     * Start listening specified events
     * @param  {string}   names    Events names (can contain namespace)
     * @param  {function} callback Function to apply if events are triggered
     * @return {object}            Context
     * @example
     *
     *     on( 'event-1.namespace event-2.namespace event-3', function( value )
     *     {
     *         console.log( 'fire !', value );
     *     } );
     */
    on : function( names, callback )
    {
        var that  = this;

        // Errors
        if( typeof names === 'undefined' || names === '' )
        {
            console.warn( 'wrong names' );
            return false;
        }

        if( typeof callback === 'undefined' )
        {
            console.warn( 'wrong callback' );
            return false;
        }

        // Resolve names
        names = this.resolve_names( names );

        // Each name
        names.forEach( function( name )
        {
            // Resolve name
            name = that.resolve_name( name );

            // Create namespace if not exist
            if( !( that.callbacks[ name.namespace ] instanceof Object ) )
                that.callbacks[ name.namespace ] = {};

            // Create callback if not exist
            if( !( that.callbacks[ name.namespace ][ name.value ] instanceof Array ) )
                that.callbacks[ name.namespace ][ name.value ] = [];

            // Add callback
            that.callbacks[ name.namespace ][ name.value ].push( callback );
        });

        return this;
    },

    /**
     * Stop listening specified events
     * @param  {string}   names Events names (can contain namespace or be the namespace only)
     * @return {object}         Context
     * @example
     *
     *     off( 'event-1 event-2' );
     *
     *     off( 'event-3.namespace' );
     *
     *     off( '.namespace' );
     *
     */
    off : function( names )
    {
        var that = this;

        // Errors
        if( typeof names === 'undefined' || names === '' )
        {
            console.warn( 'wrong name' );
            return false;
        }

        // Resolve names
        names = this.resolve_names( names );

        // Each name
        names.forEach( function( name )
        {
            // Resolve name
            name = that.resolve_name( name );

            // Remove namespace
            if( name.namespace !== 'base' && name.value === '' )
            {
                delete that.callbacks[ name.namespace ];
            }

            // Remove specific callback in namespace
            else
            {
                // Default
                if( name.namespace === 'base' )
                {
                    // Try to remove from each namespace
                    for( var namespace in that.callbacks )
                    {
                        if( that.callbacks[ namespace ] instanceof Object && that.callbacks[ namespace ][ name.value ] instanceof Array )
                        {
                            delete that.callbacks[ namespace ][ name.value ];

                            // Remove namespace if empty
                            if( Object.keys(that.callbacks[ namespace ] ).length === 0 )
                                delete that.callbacks[ namespace ];
                        }
                    }
                }

                // Specified namespace
                else if( that.callbacks[ name.namespace ] instanceof Object && that.callbacks[ name.namespace ][ name.value ] instanceof Array )
                {
                    delete that.callbacks[ name.namespace ][ name.value ];

                    // Remove namespace if empty
                    if( Object.keys( that.callbacks[ name.namespace ] ).length === 0 )
                        delete that.callbacks[ name.namespace ];
                }
            }
        });

        return this;
    },

    /**
     * Fires event
     * @param  {string} name Event name (single)
     * @param  {array} args  Arguments to send to callbacks
     * @return {boolean}     First value sent by the callbacks applieds
     */
    trigger : function( name, args )
    {
        // Errors
        if( typeof name === 'undefined' || name === '' )
        {
            console.warn( 'wrong name' );
            return false;
        }

        var that         = this,
            final_result,
            result;

        // Default args
        if( !( args instanceof Array ) )
            args = [];

        // Resolve names (should on have one event)
        name = this.resolve_names( name );

        // Resolve name
        name = that.resolve_name( name[ 0 ] );

        // Default namespace
        if( name.namespace === 'base' )
        {
            // Try to find callback in each namespace
            for( var namespace in that.callbacks )
            {
                if( that.callbacks[ namespace ] instanceof Object && that.callbacks[ namespace ][ name.value ] instanceof Array )
                {
                    that.callbacks[ namespace ][ name.value ].forEach( function( callback )
                    {
                        result = callback.apply( that,args );

                        if( typeof final_result === 'undefined' )
                            final_result = result;
                    } );
                }
            }
        }

        // Specified namespace
        else if( this.callbacks[ name.namespace ] instanceof Object )
        {
            if( name.value === '' )
            {
                console.warn( 'wrong name' );
                return this;
            }

            that.callbacks[ name.namespace ][ name.value ].forEach( function( callback )
            {
                result = callback.apply( that, args );

                if( typeof final_result === 'undefined' )
                    final_result = result;
            });
        }

        return final_result;
    },

    /**
     * Trigga wut say wut
     */
    trigga : function( name, args )
    {
        return this.trigger( name, args );
    },

    /**
     * Dispatch
     */
    dispatch : function( name, args )
    {
        return this.trigger( name, args );
    },

    /**
     * Fire everything !
     * https://www.youtube.com/watch?v=1Io0OQ2zPS4
     */
    fire : function( name, args )
    {
        return this.trigger( name, args );
    },

    /**
     * Resolve events names
     * @param  {string} names Events names
     * @return {array}        Array of names (with namespace included in name)
     */
    resolve_names : function( names )
    {
        names = names.replace( /[^a-zA-Z0-9 ,\/.]/g, '' );
        names = names.replace( /[,\/]+/g, ' ' );
        names = names.split( ' ' );

        return names;
    },

    /**
     * Resolve event name
     * @param  {string} name Event name
     * @return {object}      Event object containing original name, real event name and namespace
     */
    resolve_name : function( name )
    {
        var new_name = {},

        parts = name.split( '.' );

        new_name.original  = name;
        new_name.value     = parts[ 0 ];
        new_name.namespace = 'base'; // Base namespace

        // Specified namespace
        if( parts.length > 1 && parts[ 1 ] !== '' )
            new_name.namespace = parts[ 1 ];

        return new_name;
    }
} );

/**
 * @class    Breakpoints
 * @author   Bruno SIMON / http://bruno-simon.com
 * @fires    update
 * @fires    change
 * @requires B.Tools.Viewport
 */
B.Tools.Breakpoints = B.Core.Event_Emitter.extend(
{
    static  : 'breakpoints',
    options :
    {
        breakpoints : []
    },

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct : function( options )
    {
        this._super( options );

        // Set up
        this.viewport   = new B.Tools.Viewport();
        this.all        = {};
        this.actives    = {};
        this.first_test = true;

        // Initial breakpoints
        this.add( this.options.breakpoints );

        // Init
        this.init_events();
    },

    /**
     * Listen to events
     * @return {object} Context
     */
    init_events : function()
    {
        var that = this;

        // Viewport resize event
        this.viewport.on( 'resize', function()
        {
            // Test breakpoints
            that.test();
        } );

        return this;
    },

    /**
     * Add one breakpoint
     * @param {object} breakpoint Breakpoint informations
     * @return {object}           Context
     * @example
     *     add( {
     *         name  : 'large',
     *         width :
     *         {
     *             value    : 960,
     *             extreme  : 'min',
     *             included : false
     *         }
     *     } )
     * @example
     *     add_breakpoints( [
     *          {
     *              name  : 'large',
     *              width :
     *              {
     *                  value    : 960,
     *                  extreme  : 'min',
     *                  included : false
     *              }
     *          },
     *          {
     *              name  : 'medium',
     *              width :
     *              {
     *                  value    : 960,
     *                  extreme  : 'max',
     *                  included : true
     *              }
     *          },
     *          {
     *              name  : 'small',
     *              width :
     *              {
     *                  value    : 500,
     *                  extreme  : 'max',
     *                  included : true
     *              },
     *              height :
     *              {
     *                  value    : 500,
     *                  extreme  : 'max',
     *                  included : true
     *              }
     *          }
     *     ] )
     *
     */
    add : function( breakpoints, silent )
    {
        // Default
        silent = typeof silent === 'undefined' ? true : false;

        // Force array
        if( !( breakpoints instanceof Array ) )
            breakpoints = [ breakpoints ];

        // Add each one to breakpoints
        for( var i = 0; i < breakpoints.length; i++ )
        {
            var breakpoint = breakpoints[ i ];
            this.all[ breakpoint.name ] = breakpoint;
        }

        // Test breakpoints
        if( !silent )
            this.test();

        return this;
    },

    /**
     * Remove one breakpoint
     * @param  {string} breakpoint Breakpoint name (can be the breakpoint object itself)
     * @return {object}            Context
     */
    remove : function( breakpoints, silent )
    {
        // Force array
        if( !( breakpoints instanceof Array ) )
            breakpoints = [ breakpoints ];

        // Object breakpoint
        if( typeof breakpoint === 'object' && typeof breakpoint.name === 'string' )
            breakpoint = breakpoint.name;

        // Default
        silent = typeof silent === 'undefined' ? false : true;

        // Add each one to breakpoints
        for( var i = 0; i < breakpoints.length; i++ )
        {
            delete this.all[ breakpoints[ i ] ];
        }

        // Test breakpoints
        if( !silent )
            this.test();

        return this;
    },

    /**
     * Test every breakpoint and trigger 'update' event if current breakpoint changed
     * @return {object} Context
     */
    test : function()
    {
        // Set up
        var current_breakpoints = {},
            all_names           = Object.keys( this.all );

        // Each breakpoint
        for( var i = 0, len = all_names.length; i < len; i++ )
        {
            // Set up
            var breakpoint = this.all[ all_names[ i ] ],
                width      = !breakpoint.width,
                height     = !breakpoint.height;

            // Width must be tested
            if( !width )
            {
                // Min
                if( breakpoint.width.extreme === 'min' )
                {
                    if(
                        // Included
                        ( breakpoint.width.included && this.viewport.width >= breakpoint.width.value ) ||

                        // Not included
                        ( !breakpoint.width.included && this.viewport.width > breakpoint.width.value )
                    )
                        width = true;
                }

                // Max
                else
                {
                    if(
                        // Included
                        ( breakpoint.width.included && this.viewport.width <= breakpoint.width.value ) ||

                        // Not included
                        ( !breakpoint.width.included && this.viewport.width < breakpoint.width.value )
                    )
                        width = true;
                }
            }

            // Height must be tested
            if( !height )
            {
                // Min
                if( breakpoint.height.extreme === 'min' )
                {
                    if(
                        // Included
                        ( breakpoint.height.included && this.viewport.height >= breakpoint.height.value ) ||

                        // Not included
                        ( !breakpoint.height.included && this.viewport.height > breakpoint.height.value )
                    )
                        height = true;
                }

                // Max
                else
                {
                    if(
                        // Included
                        ( breakpoint.height.included && this.viewport.height <= breakpoint.height.value ) ||

                        // Not included
                        ( !breakpoint.height.included && this.viewport.height < breakpoint.height.value )
                    )
                        height = true;
                }
            }

            if( width && height )
            {
                current_breakpoints[ breakpoint.name ] = breakpoint;
            }
        }

        // Set up
        var current_names = Object.keys( current_breakpoints ),
            old_names     = Object.keys( this.actives ),
            difference    = this.get_arrays_differences( current_names, old_names );

        if( difference.length || this.first_test )
        {
            // Set actives
            this.actives = current_breakpoints;

            this.first_test = false;

            // Trigger
            this.trigger( 'update change', [ this.actives ] );
        }

        return this;
    },

    /**
     * Test if breakpoint is active
     * @param  {string}  breakpoint Breakpoint name (can be the breakpoint object itself)
     * @return {boolean}            True or false depending on if the breakpoint is active
     */
    is_active : function( breakpoint )
    {
        // Object breakpoint
        if( typeof breakpoint === 'object' && typeof breakpoint.name === 'string' )
            breakpoint = breakpoint.name;

        return typeof this.actives[ breakpoint ] !== 'undefined';
    },

    /**
     * Get differences between two arrays
     * @param  {array} a First array
     * @param  {array} b Second array
     * @return {array}   Items in one but not in the other
     */
    get_arrays_differences : function( a, b )
    {
        var a_new = [],
            diff  = [];

        for( var i = 0; i < a.length; i++ )
            a_new[ a[ i ] ] = true;

        for( i = 0; i < b.length; i++ )
        {
            if( a_new[ b[ i ] ] )
                delete a_new[ b[ i ] ];
            else
                a_new[ b[ i ] ] = true;
        }

        for( var k in a_new )
            diff.push( k );

        return diff;
    }
} );

/**
 * @class    Colors
 * @author   Bruno SIMON / http://bruno-simon.com
 */
B.Tools.Colors = B.Core.Abstract.extend(
{
    static  : 'colors',
    options :
    {
        gradients :
        {
            parse   : true,
            target  : document.body,
            classes :
            {
                to_convert : 'b-gradient-text',
                converted  : 'b-gradient-text-converted'
            }
        }
    },
    names   :
    {
        'aliceblue'            : 'F0F8FF',
        'antiquewhite'         : 'FAEBD7',
        'aqua'                 : '00FFFF',
        'aquamarine'           : '7FFFD4',
        'azure'                : 'F0FFFF',
        'beige'                : 'F5F5DC',
        'bisque'               : 'FFE4C4',
        'black'                : '000000',
        'blanchedalmond'       : 'FFEBCD',
        'blue'                 : '0000FF',
        'blueviolet'           : '8A2BE2',
        'brown'                : 'A52A2A',
        'burlywood'            : 'DEB887',
        'cadetblue'            : '5F9EA0',
        'chartreuse'           : '7FFF00',
        'chocolate'            : 'D2691E',
        'coral'                : 'FF7F50',
        'cornflowerblue'       : '6495ED',
        'cornsilk'             : 'FFF8DC',
        'crimson'              : 'DC143C',
        'cyan'                 : '00FFFF',
        'darkblue'             : '00008B',
        'darkcyan'             : '008B8B',
        'darkgoldenrod'        : 'B8860B',
        'darkgray'             : 'A9A9A9',
        'darkgreen'            : '006400',
        'darkkhaki'            : 'BDB76B',
        'darkmagenta'          : '8B008B',
        'darkolivegreen'       : '556B2F',
        'darkorange'           : 'FF8C00',
        'darkorchid'           : '9932CC',
        'darkred'              : '8B0000',
        'darksalmon'           : 'E9967A',
        'darkseagreen'         : '8FBC8F',
        'darkslateblue'        : '483D8B',
        'darkslategray'        : '2F4F4F',
        'darkturquoise'        : '00CED1',
        'darkviolet'           : '9400D3',
        'deeppink'             : 'FF1493',
        'deepskyblue'          : '00BFFF',
        'dimgray'              : '696969',
        'dodgerblue'           : '1E90FF',
        'firebrick'            : 'B22222',
        'floralwhite'          : 'FFFAF0',
        'forestgreen'          : '228B22',
        'fuchsia'              : 'FF00FF',
        'gainsboro'            : 'DCDCDC',
        'ghostwhite'           : 'F8F8FF',
        'gold'                 : 'FFD700',
        'goldenrod'            : 'DAA520',
        'gray'                 : '808080',
        'green'                : '008000',
        'greenyellow'          : 'ADFF2F',
        'honeydew'             : 'F0FFF0',
        'hotpink'              : 'FF69B4',
        'indianred'            : 'CD5C5C',
        'indigo'               : '4B0082',
        'ivory'                : 'FFFFF0',
        'khaki'                : 'F0E68C',
        'lavender'             : 'E6E6FA',
        'lavenderblush'        : 'FFF0F5',
        'lawngreen'            : '7CFC00',
        'lemonchiffon'         : 'FFFACD',
        'lightblue'            : 'ADD8E6',
        'lightcoral'           : 'F08080',
        'lightcyan'            : 'E0FFFF',
        'lightgoldenrodyellow' : 'FAFAD2',
        'lightgray'            : 'D3D3D3',
        'lightgreen'           : '90EE90',
        'lightpink'            : 'FFB6C1',
        'lightsalmon'          : 'FFA07A',
        'lightseagreen'        : '20B2AA',
        'lightskyblue'         : '87CEFA',
        'lightslategray'       : '778899',
        'lightsteelblue'       : 'B0C4DE',
        'lightyellow'          : 'FFFFE0',
        'lime'                 : '00FF00',
        'limegreen'            : '32CD32',
        'linen'                : 'FAF0E6',
        'magenta'              : 'FF00FF',
        'maroon'               : '800000',
        'mediumaquamarine'     : '66CDAA',
        'mediumblue'           : '0000CD',
        'mediumorchid'         : 'BA55D3',
        'mediumpurple'         : '9370DB',
        'mediumseagreen'       : '3CB371',
        'mediumslateblue'      : '7B68EE',
        'mediumspringgreen'    : '00FA9A',
        'mediumturquoise'      : '48D1CC',
        'mediumvioletred'      : 'C71585',
        'midnightblue'         : '191970',
        'mintcream'            : 'F5FFFA',
        'mistyrose'            : 'FFE4E1',
        'moccasin'             : 'FFE4B5',
        'navajowhite'          : 'FFDEAD',
        'navy'                 : '000080',
        'oldlace'              : 'FDF5E6',
        'olive'                : '808000',
        'olivedrab'            : '6B8E23',
        'orange'               : 'FFA500',
        'orangered'            : 'FF4500',
        'orchid'               : 'DA70D6',
        'palegoldenrod'        : 'EEE8AA',
        'palegreen'            : '#98FB98',
        'paleturquoise'        : '#AFEEEE',
        'palevioletred'        : '#DB7093',
        'papayawhip'           : '#FFEFD5',
        'peachpuff'            : '#FFDAB9',
        'peru'                 : '#CD853F',
        'pink'                 : '#FFC0CB',
        'plum'                 : '#DDA0DD',
        'powderblue'           : '#B0E0E6',
        'purple'               : '#800080',
        'rebeccapurple'        : '#663399',
        'red'                  : '#FF0000',
        'rosybrown'            : '#BC8F8F',
        'royalblue'            : '#4169E1',
        'saddlebrown'          : '#8B4513',
        'salmon'               : '#FA8072',
        'sandybrown'           : '#F4A460',
        'seagreen'             : '#2E8B57',
        'seashell'             : '#FFF5EE',
        'sienna'               : '#A0522D',
        'silver'               : '#C0C0C0',
        'skyblue'              : '#87CEEB',
        'slateblue'            : '#6A5ACD',
        'slategray'            : '#708090',
        'snow'                 : '#FFFAFA',
        'springgreen'          : '#00FF7F',
        'steelblue'            : '#4682B4',
        'tan'                  : '#D2B48C',
        'teal'                 : '#008080',
        'thistle'              : '#D8BFD8',
        'tomato'               : '#FF6347',
        'turquoise'            : '#40E0D0',
        'violet'               : '#EE82EE',
        'wheat'                : '#F5DEB3',
        'white'                : '#FFFFFF',
        'whitesmoke'           : '#F5F5F5',
        'yellow'               : '#FFFF00',
        'yellowgreen'          : '#9ACD32'
    },

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct : function( options )
    {
        this._super( options );

        if( this.options.gradients.parse )
            this.parse();
    },

    /**
     * Try to convert any data to RGB object
     * @param  {any}     Any color format
     * @return {object}  RGB object
     */
    any_to_rgb : function( input )
    {
        input = '' + input;            // String
        input = input.toLowerCase();   // Lower case
        input = input.replace(/[\s-]/g,''); // No spaces

        // Name
        if( typeof this.names[ input ] !== 'undefined' )
        {
            return this.hexa_to_rgb( this.names[ input ] );
        }

        // '0x' Hexa type
        if( input.indexOf( '0x' ) === 0 )
        {
            return this.hexa_to_rgb( input.replace( '0x', '' ) );
        }

        // '#' Hexa type
        if( input.indexOf( '#' ) === 0 )
        {
            input = input.replace( '#', '' );
        }

        // XXXXXX hexa type
        if( input.length === 6 )
        {
            return this.hexa_to_rgb( input );
        }

        // XXX hexa type
        if( input.length === 3 )
        {
            var new_input = '';
            for( var i = 0; i < input.length; i++ )
                new_input += input[ i ] + input[ i ];

            return this.hexa_to_rgb( new_input );
        }

        // Objects
        try
        {
            input  = JSON.parse( input );

            if( typeof input.r !== 'undefined' && typeof input.g !== 'undefined' && typeof input.b !== 'undefined' )
            {
                return input;
            }
            else if( typeof input.h !== 'undefined' && typeof input.s !== 'undefined' && typeof input.l !== 'undefined' )
            {
                return this.hsl_to_rgb( input );
            }
        }
        catch( e ){}

        // No type found
        console.warn( 'Wrong color value : ' + input );

        return { r : 0, g : 0, b : 0 };
    },

    /**
     * Parse the target looking for text to convert to gradients
     * @param  {HTMLElement} target   HTML target (default body)
     * @param  {string}      selector Query selector
     * @return {object}               Context
     */
    parse : function( target, selector )
    {
        // Defaults
        target   = target   || this.options.gradients.target;
        selector = selector || this.options.gradients.classes.to_convert;

        var that     = this,
            elements = target.querySelectorAll( '.' + selector );

        // Each element
        for( var i = 0, i_len = elements.length; i < i_len; i++ )
        {
            var element    = elements[ i ];

            if( !element.classList.contains( this.options.gradients.classes.converted ) )
            {
                var beautified = '',
                    text       = element.textContent,
                    start      = element.getAttribute( 'data-gradient-start' ),
                    end        = element.getAttribute( 'data-gradient-end' ),
                    steps      = null;

                if( !start )
                    start = '#47add9';

                if( !end )
                    end = '#3554e9';

                steps = that.get_steps_colors( start, end, text.length, 'rgb' );

                for( var j = 0, j_len = text.length; j < j_len; j++ )
                {
                    beautified += '<span style="color:rgb(' + steps[ j ].r + ',' + steps[ j ].g + ',' + steps[ j ].b + ')">' + text[ j ] + '</span>';
                }

                element.innerHTML = beautified;
            }
        }


        // $texts.each( function()
        // {
        //     var $text    = $( this ),
        //         new_text = '',
        //         text     = $text.text(),
        //         start    = $text.data( 'gradient-start' ),
        //         end      = $text.data( 'gradient-end' ),
        //         steps    = null;

        //     if( !start )
        //         start = '#47add9';

        //     if( !end )
        //         end = '#3554e9';

        //     steps = that.get_steps_colors( start, end, text.length, 'rgb' );

        //     for( var i = 0; i < text.length; i++ )
        //     {
        //         new_text += '<span style="color:rgb(' + steps[ i ].r + ',' + steps[ i ].g + ',' + steps[ i ].b + ')">' + text[ i ] + '</span>';
        //     }

        //     $text.html( new_text );
        // } );

        return this;
    },

    /**
     * Retrieve every step color between the start and end color
     * @param  {any}     start  Any color format
     * @param  {any}     end    Any color format
     * @param  {integer} count  Number of steps
     * @param  {string}  format 'rgb' or 'hsl'
     * @return {array}          Array of HSL or RGB objects
     */
    get_steps_colors : function( start, end, count, format )
    {
        if( typeof count !== 'number' || count < 2 )
            count = 2;

        start = this.rgb_to_hsl( this.any_to_rgb( start ) );
        end   = this.rgb_to_hsl( this.any_to_rgb( end ) );

        var steps = [],
            ratio = 0,
            step  = {};

        for( var i = 0; i < count + 1; i++ )
        {
            ratio = i / count;

            step.h = start.h + ( end.h - start.h ) * ratio;
            step.s = start.s + ( end.s - start.s ) * ratio;
            step.l = start.l + ( end.l - start.l ) * ratio;

            if( format === 'rgb' )
                step = this.hsl_to_rgb( step );

            steps.push( step );
        }

        return steps;
    },


    /**
     * Convert from hexa to RGB
     * @param  {string} input Hexa code in 6 char length format
     * @return {object}       RGB object
     */
    hexa_to_rgb : function( input )
    {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( input );

        return {
            r : parseInt( result[ 1 ], 16 ),
            g : parseInt( result[ 2 ], 16 ),
            b : parseInt( result[ 3 ], 16 )
        };
    },

    /**
     * Convert from RGB to HSL
     * @param  {object} input RGB object
     * @return {object}       HSL object
     */
    rgb_to_hsl : function( input )
    {
        input.r /= 255;
        input.g /= 255;
        input.b /= 255;

        var max       = Math.max( input.r, input.g, input.b ),
            min       = Math.min( input.r, input.g, input.b ),
            color_hsl = {};

        color_hsl.h = ( max + min ) / 2;
        color_hsl.s = ( max + min ) / 2;
        color_hsl.l = ( max + min ) / 2;

        if( max === min )
        {
            color_hsl.h = 0;
            color_hsl.s = 0;
        }
        else
        {
            var d = max - min;

            color_hsl.s = color_hsl.l > 0.5 ? d / ( 2 - max - min ) : d / ( max + min );

            switch( max )
            {
                case input.r :
                    color_hsl.h = ( input.g - input.b ) / d + ( input.g < input.b ? 6 : 0 );
                    break;

                case input.g :
                    color_hsl.h = ( input.b - input.r ) / d + 2;
                    break;

                case input.b :
                    color_hsl.h = ( input.r - input.g ) / d + 4;
                    break;
            }

            color_hsl.h /= 6;
        }

        return color_hsl;
    },

    /**
     * Convert from HSL to RGB
     * @param  {object} input HSL object
     * @return {object}       RGB object
     */
    hsl_to_rgb : function( input )
    {
        var color_rgb = {};

        if( input.s === 0 )
        {
            color_rgb.r = input.l;
            color_rgb.g = input.l;
            color_rgb.b = input.l;
        }
        else
        {
            var hue2rgb = function hue2rgb( p, q, t )
            {
                if( t < 0 ) t += 1;
                if( t > 1 ) t -= 1;
                if( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
                if( t < 1 / 2 ) return q;
                if( t < 2 / 3 ) return p + ( q - p ) * ( 2 / 3 - t ) * 6;
                return p;
            };

            var q = input.l < 0.5 ? input.l * (1 + input.s) : input.l + input.s - input.l * input.s;
            var p = 2 * input.l - q;

            color_rgb.r = hue2rgb( p, q, input.h  + 1 / 3 );
            color_rgb.g = hue2rgb( p, q, input.h );
            color_rgb.b = hue2rgb( p, q, input.h  - 1 / 3 );
        }

        color_rgb.r = Math.round( color_rgb.r * 255 );
        color_rgb.g = Math.round( color_rgb.g * 255 );
        color_rgb.b = Math.round( color_rgb.b * 255 );

        return color_rgb;
    }
} );

/**
 * @class    Css
 * @author   Bruno SIMON / http://bruno-simon.com
 * @requires B.Tools.Detector
 */
B.Tools.Css = B.Core.Abstract.extend(
{
    static  : 'css',
    options :
    {
        prefixes : [ 'webkit', 'moz', 'o', 'ms', '' ]
    },

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct : function( options )
    {
        this._super( options );

        this.detector = new B.Tools.Detector();
        this.strings  = new B.Tools.Strings();
    },

    /**
     * Apply css on target and add every prefixes
     * @param  {HTMLElement} target   HTML element that need to be applied
     * @param  {object}      style    CSS style
     * @param  {array}       prefixes Array of prefixes (default from options)
     * @param  {boolean}     clean    Should clean the style
     * @return {HTMLElement}     Modified element
     */
    apply : function( target, style, prefixes, clean )
    {
        // jQuery handling
        if( typeof jQuery !== 'undefined' && target instanceof jQuery)
            target = target.toArray();

        // Force array
        if( typeof target.length === 'undefined' )
            target = [ target ];

        // Prefixes
        if( typeof prefixes === 'undefined' )
            prefixes = false;

        if( prefixes === true )
            prefixes = this.options.prefixes;

        // Clean
        if( typeof clean === 'undefined' || clean )
            style = this.clean_style( style );

        // Add prefix
        if( prefixes instanceof Array )
        {
            var new_style = {};
            for( var property in style )
            {
                for( var prefix in prefixes )
                {
                    var new_property = null;

                    if( prefixes[ prefix??] )
                        new_property = prefixes[ prefix??] + ( property.charAt( 0 ).toUpperCase() + property.slice( 1 ) );
                    else
                        new_property = property;

                    new_style[ new_property ] = style[ property ];
                }
            }

            style = new_style;
        }

        // Apply style on each element
        for( var element in target )
        {
            element = target[ element ];

            if( element instanceof HTMLElement )
            {
                for( var _property in style )
                {
                    element.style[ _property ] = style[ _property ];
                }
            }
        }

        return target;
    },

    /**
     * Clean style
     * @param  {object} value Style to clean
     * @return {object}       Cleaned style
     */
    clean_style : function( style )
    {
        var new_style = {};

        // Each property
        for( var property in style )
        {
            var value = style[ property ];

            // Clean property and value
            new_style[ this.clean_property( property ) ] = this.clean_value( value );
        }

        return new_style;
    },

    /**
     * Clean property by removing prefixes and converting to camelCase
     * @param {string} value Property to clean
     */
    clean_property : function( value )
    {
        // Remove prefixes
        value = value.replace( /(webkit|moz|o|ms)?/i, '' );
        value = this.strings.convert_case( value, 'camel' );

        return value;
    },

    /**
     * Clean value
     * @param {string} value Property to fix
     */
    clean_value : function( value )
    {
        // IE 9
        if( this.detector.browser.ie === 9 )
        {
            // Remove translateZ
            if( /translateZ/.test( value ) )
                value = value.replace( /translateZ\([^)]*\)/g, '' );

            // Replace translate3d by translateX and translateY
            if( /   /.test( value ) )
                value = value.replace( /translate3d\(([^,]*),([^,]*),([^)])*\)/g, 'translateX($1) translateY($2)' );
        }

        return value;
    }
} );

/**
 * @class  Detector
 * @author Bruno SIMON / http://bruno-simon.com
 */
B.Tools.Detector = B.Core.Event_Emitter.extend(
{
    static  : 'detector',
    options :
    {
        targets : [ 'html' ]
    },

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct : function( options )
    {
        this._super( options );

        // Init
        this.init_detection();
        this.init_classes();
    },

    /**
     * Detect engine, browser, system and feature in a specified list and store in 'detect' property
     * @return {object} Context
     */
    init_detection : function()
    {
        // Prepare
        var engine = {
            ie      : 0,
            gecko   : 0,
            webkit  : 0,
            khtml   : 0,
            opera   : 0,
            version : 0,
        };

        var browser = {
            ie      : 0,
            firefox : 0,
            safari  : 0,
            konq    : 0,
            opera   : 0,
            chrome  : 0,
            version : 0,
        };

        var system = {
            windows        : false,
            mac            : false,
            osx            : false,
            iphone         : false,
            ipod           : false,
            ipad           : false,
            ios            : false,
            blackberry     : false,
            android        : false,
            opera_mini     : false,
            windows_mobile : false,
            wii            : false,
            ps             : false,
        };

        var features = {
            touch       : false,
            media_query : false
        };

        // Detect
        var user_agent = navigator.userAgent;
        if( window.opera )
        {
            engine.version = browser.version = window.opera.version();
            engine.opera   = browser.opera   = parseInt( engine.version );
        }
        else if( /AppleWebKit\/(\S+)/.test( user_agent ) || /AppleWebkit\/(\S+)/.test( user_agent ) )
        {
            engine.version = RegExp.$1;
            engine.webkit  = parseInt( engine.version );

            // figure out if it's Chrome or Safari
            if( /Chrome\/(\S+)/.test( user_agent ) )
            {
                browser.version = RegExp.$1;
                browser.chrome  = parseInt( browser.version );
            }
            else if( /Version\/(\S+)/.test( user_agent ) )
            {
                browser.version = RegExp.$1;
                browser.safari  = parseInt( browser.version );
            }
            else
            {
                // Approximate version
                var safariVersion = 1;

                if( engine.webkit < 100 )
                    safariVersion = 1;
                else if( engine.webkit < 312 )
                    safariVersion = 1.2;
                else if( engine.webkit < 412 )
                    safariVersion = 1.3;
                else
                    safariVersion = 2;

                browser.safari = browser.version = safariVersion;
            }
        }
        else if( /KHTML\/(\S+)/.test( user_agent ) || /Konqueror\/([^;]+)/.test( user_agent ) )
        {
            engine.version = browser.version = RegExp.$1;
            engine.khtml   = browser.konq    = parseInt( engine.version );
        }
        else if( /rv:([^\)]+)\) Gecko\/\d{8}/.test( user_agent ) )
        {
            engine.version = RegExp.$1;
            engine.gecko   = parseInt( engine.version );

            // Determine if it's Firefox
            if ( /Firefox\/(\S+)/.test( user_agent ) )
            {
                browser.version = RegExp.$1;
                browser.firefox = parseInt( browser.version );
            }
        }
        else if( /MSIE ([^;]+)/.test( user_agent ) )
        {
            engine.version = browser.version = RegExp.$1;
            engine.ie      = browser.ie      = parseInt( engine.version );
        }
        else if( /Trident.*rv[ :]*(11[\.\d]+)/.test( user_agent ) )
        {
            engine.version = browser.version = RegExp.$1;
            engine.ie      = browser.ie      = parseInt( engine.version );
        }

        // Detect browsers
        browser.ie    = engine.ie;
        browser.opera = engine.opera;

        // Detect platform (using navigator.plateform)
        var plateform  = navigator.platform;
        // system.windows = plateform.indexOf( 'Win' ) === 0;
        // system.mac     = plateform.indexOf( 'Mac' ) === 0;
        // system.x11     = ( plateform === 'X11' ) || ( plateform.indexOf( 'Linux' ) === 0);

        // Detect platform (using navigator.userAgent)
        system.windows = !!user_agent.match( /Win/ );
        system.mac     = !!user_agent.match( /Mac/ );
        // system.x11     = ( plateform === 'X11' ) || ( plateform.indexOf( 'Linux' ) === 0);

        // Detect windows operating systems
        if( system.windows )
        {
            if( /Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test( user_agent ) )
            {
                if( RegExp.$1 === 'NT' )
                {
                    switch( RegExp.$2 )
                    {
                        case '5.0':
                            system.windows = '2000';
                            break;

                        case '5.1':
                            system.windows = 'XP';
                            break;

                        case '6.0':
                            system.windows = 'Vista';
                            break;

                        default:
                            system.windows = 'NT';
                            break;
                    }
                }
                else if( RegExp.$1 === '9x' )
                {
                    system.windows = 'ME';
                }
                else
                {
                    system.windows = RegExp.$1;
                }
            }
        }

        // Detect mobile (mix between OS and device)
        system.nokia          = !!user_agent.match( /Nokia/i );
        system.kindle_fire    = !!user_agent.match( /Silk/ );
        system.iphone         = !!user_agent.match( /iPhone/ );
        system.ipod           = !!user_agent.match( /iPod/ );
        system.ipad           = !!user_agent.match( /iPad/ );
        system.blackberry     = !!user_agent.match( /BlackBerry/ ) || !!user_agent.match( /BB[0-9]+/ ) || !!user_agent.match( /PlayBook/ );
        system.android        = !!user_agent.match( /Android/ );
        system.opera_mini     = !!user_agent.match( /Opera Mini/i );
        system.windows_mobile = !!user_agent.match( /IEMobile/i );

        // iOS / OS X exception
        system.ios = system.iphone || system.ipod || system.ipad;
        system.osx = !system.ios && !!user_agent.match( /OS X/ );

        // Detect gaming systems
        system.wii         = user_agent.indexOf( 'Wii' ) > -1;
        system.playstation = /playstation/i.test( user_agent );

        //Detect features (Not as reliable as Modernizr)
        features.touch       = !!( ( 'ontouchstart' in window ) || window.DocumentTouch && document instanceof DocumentTouch );
        features.media_query = !!( window.matchMedia || window.msMatchMedia );

        // Set up
        this.user_agent = user_agent;
        this.plateform  = plateform;
        this.browser    = browser;
        this.engine     = engine;
        this.system     = system;
        this.features   = features;
        this.categories = [ 'engine', 'browser', 'system', 'features' ];
    },

    /**
     * Add detected informations to the DOM (on <html> by default)
     * @return {object} Context
     */
    init_classes : function()
    {
        // Don't add
        if( !this.options.targets || this.options.targets.length === 0 )
            return false;

        // Set up
        var targets = [],
            target  = null;

        // Each element that need to add classes
        for( var i = 0, len = this.options.targets.length; i < len; i++ )
        {
            // Target
            target = this.options.targets[ i ];

            // String
            if( typeof target === 'string' )
            {
                // Target
                switch( target )
                {
                    case 'html' :
                        targets.push( document.documentElement );
                        break;

                    case 'body' :
                        targets.push( document.body );
                        break;

                    default :
                        var temp_targets = document.querySelectorAll( target );

                        for( var j = 0; j < temp_targets.length; j++ )
                            targets.push( temp_targets[ j ] );

                        break;
                }
            }
            // DOM Element
            else if( target instanceof Element )
            {
                targets.push( target );
            }

            // Targets found
            if( targets.length )
            {
                this.classes = [];

                // Each category
                for( var category in this )
                {
                    // Allowed
                    if( this.categories.indexOf( category ) !== -1 )
                    {
                        // Each property in category
                        for( var property in this[ category ] )
                        {
                            var value = this[ category ][ property ];

                            // Ignore version
                            if( property !== 'version' )
                            {
                                // Feature
                                if( category === 'features' )
                                {
                                    this.classes.push( category + '-' + ( value ? '' : 'no-' ) + property );
                                }

                                // Not feature
                                else
                                {
                                    if( value )
                                    {
                                        this.classes.push( category + '-' + property );
                                        if( category === 'browser'  )
                                            this.classes.push( category + '-' + property + '-' + value );
                                    }
                                }
                            }
                        }
                    }
                }

                // Add classes
                for( var j = 0; j < targets.length; j++ )
                    targets[ j ].classList.add.apply( targets[ j ].classList, this.classes );
            }
        }

        return this;
    }
} );

/**
 * @class    GA_Tags
 * @author   Bruno SIMON / http://bruno-simon.com
 * @fires    send
 */
B.Tools.GATags = B.Tools.GA_Tags = B.Core.Event_Emitter.extend(
{
    static  : 'ga_tags',
    options :
    {
        testing            : false,
        send               : true,
        parse              : true,
        true_link_duration : 300,
        target  : document.body,
        classes :
        {
            to_tag : 'b-tag',
            tagged : 'b-tagged'
        },
        logs :
        {
            warnings : false,
            send     : false
        }
    },

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct : function( options )
    {
        this._super( options );

        this.unique_sent = [];

        if( this.options.parse )
            this.parse();
    },

    /**
     * Parse the target looking for tags
     * @param  {HTMLElement} target   HTML target (default body)
     * @param  {string}      selector Query selector
     * @return {object}               Context
     */
    parse : function( target, selector )
    {
        target   = target   || this.options.target;
        selector = selector || this.options.classes.to_tag;

        var that     = this,
            elements = target.querySelectorAll( '.' + selector );

        function click_handle( e )
        {
            e = e || window.event;

            // Set variables
            var element   = this,
                true_link = element.getAttribute( 'data-tag-true-link' ),
                datas     = {};

            // True link interpretation
            if( !true_link || [ '0', 'false', 'nop', 'no' ].indexOf( true_link.toLowerCase() ) !== -1 )
                true_link = false;
            else
                true_link = true;

            // Set options that will be sent
            datas.category = element.getAttribute( 'data-tag-category' );
            datas.action   = element.getAttribute( 'data-tag-action' );
            datas.label    = element.getAttribute( 'data-tag-label' );
            datas.value    = element.getAttribute( 'data-tag-value' );
            datas.unique   = element.getAttribute( 'data-tag-unique' );

            // Send
            that.send( datas );

            // True link that should act as a normal click
            if( true_link )
            {
                // Set variables
                var href   = element.getAttribute( 'href' ),
                    target = element.getAttribute( 'target' );

                // Default target
                if( !target )
                    target = '_self';

                // Other than _blank, need to wait
                if( target !== '_blank' )
                {
                    // Wait
                    window.setTimeout( function()
                    {
                        window.open( href , target );
                    }, that.options.true_link_duration );

                    // Prevent default
                    if( e.preventDefault )
                        e.preventDefault();
                    else
                        e.returnValue = false;
                }
            }
        }

        // Each element
        for( var i = 0, len = elements.length; i < len; i++ )
        {
            var element = elements[ i ];

            if( !element.classList.contains( this.options.classes.tagged ) )
            {
                // Listen
                element.onclick = click_handle;

                // Set tagged class
                element.classList.add( this.options.classes.tagged );
            }
        }

        return this;
    },

    /**
     * Send to Analytics
     * @param  {object} datas Datas to send
     * @return {object}       Context
     * @example
     *
     *     send( {
     *         category : 'foo',
     *         action   : 'bar',
     *         label    : 'lorem',
     *         value    : 'ipsum'
     *     } )
     *
     */
    send : function( datas )
    {
        var send = [],
            sent = false;

        // Error
        if( typeof datas !== 'object' )
        {
            // Logs
            if( this.options.logs.warnings )
                console.warn( 'tag wrong datas' );

            return false;
        }

        // Unique
        if( datas.unique && this.unique_sent.indexOf( datas.unique ) !== -1 )
        {
            // Logs
            if( this.options.logs.warnings )
                console.warn( 'tag prevent : ' + datas.unique );

            return false;
        }

        // Send
        if( this.options.send )
        {
            // Category
            if( typeof datas.category !== 'undefined' )
            {
                send.push( datas.category );

                // Action
                if( typeof datas.action !== 'undefined' )
                {
                    send.push( datas.action );

                    // Label
                    if( typeof datas.label !== 'undefined' )
                    {
                        send.push( datas.label );

                        // Value
                        if( typeof datas.value !== 'undefined' )
                        {
                            send.push( datas.value );
                        }
                    }

                    // Send only if category and action set
                    // _gaq
                    if( typeof _gaq !== 'undefined' )
                    {
                        _gaq.push( [ '_trackEvent' ].concat( send ) );

                        sent = true;
                    }

                    // ga
                    else if( typeof ga !== 'undefined' )
                    {
                        ga.apply( ga, [ 'send', 'event' ].concat( send ) );

                        sent = true;
                    }

                    // Testing
                    else if( this.options.testing )
                    {
                        sent = true;
                    }

                    else
                    {
                        // Logs
                        if( this.options.logs.warnings )
                            console.warn( 'tag _gaq not defined' );
                    }

                    // Logs
                    if( this.options.logs.send )
                        console.log( 'tag', send );
                }
                else
                {
                    // Logs
                    if( this.options.logs.warnings )
                        console.warn( 'tag missing action' );
                }
            }
            else
            {
                // Logs
                if( this.options.logs.warnings )
                    console.warn( 'tag missing category' );
            }
        }

        // Well sent
        if( sent )
        {
            // Save in unique_sent array
            if( datas.unique )
                this.unique_sent.push( datas.unique );

            this.trigger( 'send', [ send ] );
        }

        return this;
    }
} );

/**
 * @class  Keyboard
 * @author Bruno SIMON / http://bruno-simon.com
 * @fires  down
 * @fires  up
 */
B.Tools.Keyboard = B.Core.Event_Emitter.extend(
{
    static        : 'keyboard',
    options       : {},
    keycode_names :
    {
        91 : 'cmd',
        17 : 'ctrl',
        32 : 'space',
        16 : 'shift',
        18 : 'alt',
        20 : 'caps',
        9  : 'tab',
        13 : 'enter',
        8  : 'backspace',
        38 : 'up',
        39 : 'right',
        40 : 'down',
        37 : 'left',
        27 : 'esc'
    },

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct : function( options )
    {
        this._super( options );

        // Set up
        this.downs = [];

        // Init
        this.listen_to_events();
    },

    /**
     * Listen to events
     * @return {object} Context
     */
    listen_to_events : function()
    {
        var that = this;

        // Down
        function keydown_handle( e )
        {
            var character = that.keycode_to_character( e.keyCode );

            if( that.downs.indexOf( character ) === -1 )
                that.downs.push( character );

            // Trigger and prevend default if asked by return false on callback
            if( that.trigger( 'down', [??e.keyCode, character ] ) === false )
            {
                e = e || window.event;

                if( e.preventDefault )
                    e.preventDefault();
                else
                    e.returnValue = false;
            }
        }

        // Up
        function keyup_handle( e )
        {
            var character = that.keycode_to_character( e.keyCode );

            if( that.downs.indexOf( character ) !== -1 )
                that.downs.splice( that.downs.indexOf( character ), 1 );

            that.trigger( 'up', [??e.keyCode, character ] );
        }


        // Listen
        if (document.addEventListener)
        {
            document.addEventListener( 'keydown', keydown_handle, false );
            document.addEventListener( 'keyup', keyup_handle, false );
        }
        else
        {
            document.attachEvent( 'onkeydown', keydown_handle, false );
            document.attachEvent( 'onkeyup', keyup_handle, false );
        }

        return this;
    },

    /**
     * Convert a keycode to a char
     * @param  {integer} input Original keycode
     * @return {string}        Output
     */
    keycode_to_character : function( input )
    {
        var output = this.keycode_names[ input ];

        if( !output )
            output = String.fromCharCode( input ).toLowerCase();

        return output;
    },

    /**
     * Test if keys are down
     * @param  {array} inputs Array of char to test as strings
     * @return {boolean}      True if every keys are down
     */
    are_down : function( inputs )
    {
        var down = true;

        for( var i = 0; i < inputs.length; i++ )
        {
            var key = inputs[ i ];

            if( typeof key === 'number' )
                key = this.keycode_to_character( key );

            if( this.downs.indexOf( key ) === -1 )
                down = false;
        }

        return down;
    },

    /**
     * Test if key is down
     * @param  {string}  input Char as string
     * @return {boolean}       True if key is down
     */
    is_down : function( input )
    {
        return this.are_down( [ input ] );
    }
} );

/**
 * @class    Strings
 * @author   Bruno SIMON / http://bruno-simon.com
 */
B.Tools.KonamiCode = B.Tools.Konami_Code = B.Core.Event_Emitter.extend(
{
    static  : 'konami_code',
    options :
    {
        reset_duration : 1000,
        sequence :
        [
            'up',
            'up',
            'down',
            'down',
            'left',
            'right',
            'left',
            'right',
            'b',
            'a'
        ]
    },

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct : function( options )
    {
        this._super( options );

        // Set up
        this.index    = 0;
        this.timeout  = null;
        this.keyboard = new B.Tools.Keyboard();

        // Init
        this.listen_to_events();
    },

    /**
     * Listen to events
     * @return {object} Context
     */
    listen_to_events : function()
    {
        var that = this;

        // Listen keyboard down
        this.keyboard.on( 'down', function( keycode, character )
        {
            // Reset timeout
            if( that.timeout )
                window.clearTimeout( that.timeout );

            // Test char
            if( character === that.options.sequence[ that.index ] )
            {
                // Progress
                that.index++;

                // Timeout
                that.timeout = window.setTimeout( function()
                {
                    // Trigger
                    that.trigger( 'timeout', [ that.index ] );

                    // Reset
                    that.index = 0;
                }, that.options.reset_duration );
            }
            else
            {
                // Trigger
                if( that.index )
                    that.trigger( 'wrong', [ that.index ] );

                // Reset
                that.index = 0;
            }

            // Complete
            if( that.index >= that.options.sequence.length )
            {
                // Trigger
                that.trigger( 'used' );

                // Reset
                that.index = 0;

                // Reset timeout
                window.clearTimeout( that.timeout );
            }
        } );
    }
} );

/**
 * @class    Mouse
 * @author   Bruno SIMON / http://bruno-simon.com
 * @fires    down
 * @fires    up
 * @fires    move
 * @fires    wheel
 * @requires B.Tools.Viewport
 */
B.Tools.Mouse = B.Core.Event_Emitter.extend(
{
    static  : 'mouse',
    options : {},

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct : function( options )
    {
        this._super( options );

        this.viewport         = new B.Tools.Viewport();
        this.down             = false;
        this.position         = {};
        this.position.x       = 0;
        this.position.y       = 0;
        this.position.ratio   = {};
        this.position.ratio.x = 0;
        this.position.ratio.y = 0;
        this.wheel            = {};
        this.wheel.delta      = 0;

        this.listen_to_events();
    },

    /**
     * Listen to events
     * @return {object} Context
     */
    listen_to_events : function()
    {
        var that = this;

        // Down
        function mouse_down_handle( e )
        {
            that.down = true;

            if( that.trigger( 'down', [ that.position, e.target ] ) === false )
            {
                e.preventDefault();
            }
        }

        // Up
        function mouse_up_handle( e )
        {
            that.down = false;

            that.trigger( 'up', [ that.position, e.target ] );
        }

        // Move
        function mouse_move_handle( e )
        {
            that.position.x = e.clientX;
            that.position.y = e.clientY;

            that.position.ratio.x = that.position.x / that.viewport.width;
            that.position.ratio.y = that.position.y / that.viewport.height;

            that.trigger( 'move', [ that.position, e.target ] );
        }

        // Wheel
        function mouse_wheel_handle( e )
        {
            that.wheel.delta = e.wheelDeltaY || e.wheelDelta || - e.detail;

            if( that.trigger( 'wheel', [ that.wheel ] ) === false )
            {
                e.preventDefault();
                return false;
            }
        }

        // Listen
        if (document.addEventListener)
        {
            document.addEventListener( 'mousedown', mouse_down_handle, false );
            document.addEventListener( 'mouseup', mouse_up_handle, false );
            document.addEventListener( 'mousemove', mouse_move_handle, false );
            document.addEventListener( 'mousewheel', mouse_wheel_handle, false );
            document.addEventListener( 'DOMMouseScroll', mouse_wheel_handle, false );
        }
        else
        {
            document.attachEvent( 'onmousedown', mouse_down_handle, false );
            document.attachEvent( 'onmouseup', mouse_up_handle, false );
            document.attachEvent( 'onmousemove', mouse_move_handle, false );
            document.attachEvent( 'onmousewheel', mouse_wheel_handle, false );
        }

        return this;
    }
} );

/**
 * @class    Offline
 * @author   Bruno SIMON / http://bruno-simon.com
 * @fires    online
 * @fires    offline
 * @fires    change
 */
B.Tools.Offline = B.Core.Event_Emitter.extend(
{
    static  : 'offline',
    options :
    {
        classes :
        {
            active  : true,
            target  : document.body,
            offline : 'offline',
            online  : 'online'
        }
    },

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct : function( options )
    {
        this._super( options );

        this.status = null;

        this.listen_to_events();
    },

    /**
     * Listen to events
     * @return {object} Context
     */
    listen_to_events : function()
    {
        var that = this;

        function change()
        {
            // Online
            if( navigator.onLine )
            {
                // Update classes
                if( that.options.classes.active )
                {
                    that.options.classes.target.classList.remove( that.options.classes.offline );
                    that.options.classes.target.classList.add( that.options.classes.online );
                }

                // Update status
                that.status = 'online';

                // Trigger
                that.trigger( 'online' );
                that.trigger( 'change', [ that.status ] );
            }

            // Offline
            else
            {
                // Update classes
                if( that.options.classes.active )
                {
                    that.options.classes.target.classList.remove( that.options.classes.online );
                    that.options.classes.target.classList.add( that.options.classes.offline );
                }

                // Update status
                that.status = 'online';

                // Trigger
                that.trigger( 'offline' );
                that.trigger( 'change', [ that.status ] );
            }
        }

        // Listen
        if( window.addEventListener )
        {
            window.addEventListener( 'online',  change, false );
            window.addEventListener( 'offline', change, false );
        }
        else
        {
            document.body.ononline  = change;
            document.body.onoffline = change;
        }

        change();

        return this;
    }
} );

/**
 * @class    Registry
 * @author   Bruno SIMON / http://bruno-simon.com
 */
B.Tools.Registry = B.Core.Event_Emitter.extend(
{
    static  : 'registry',
    options : {},

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct : function( options )
    {
        this._super( options );

        this.items = {};
    },

    /**
     * Try to retrieve stored value for specified key
     * @param  {string} key Key for the value
     * @return {any}        Stored value (undefined if not found)
     */
    get : function( key, callback )
    {
        // Found
        if( typeof this.items[ key ] !== 'undefined' )
            return this.items[ key ];

        // Not found but callback provided
        if( typeof callback === 'function' )
            return callback.apply( this );

        // Otherwise
        return undefined;
    },

    /**
     * Set value width specified key (will override previous value)
     * @param {string} key   Key for the value
     * @param {any}    value Anything to store
     */
    set : function( key, value )
    {
        // Set
        this.items[ key ] = value;

        // Trigger
        this.trigger( 'update', [ key, value ] );

        return value;
    }
} );

/**
 * @class    Resizer
 * @author   Bruno SIMON / http://bruno-simon.com
 * @requires B.Tools.Browser
 */
B.Tools.Resizer = B.Core.Abstract.extend(
{
    static  : 'resizer',
    options :
    {
        force_style : true,
        parse       : true,
        target      : document.body,
        auto_resize : true,
        classes     :
        {
            to_resize : 'b-resize',
            content   : 'b-content'
        }
    },

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct : function( options )
    {
        this._super( options );

        // Set up
        this.elements = [];

        // Parse
        if( this.options.parse )
            this.parse();

        // Auto resize
        if( this.options.auto_resize )
            this.init_auto_resize();
    },

    /**
     * Initialise auto resize
     * @return {object} Context
     */
    init_auto_resize : function()
    {
        var that = this;

        // Set up
        this.viewport = new B.Tools.Viewport();

        // Viewport resize event
        this.viewport.on( 'resize', function()
        {
            that.resize_all();
        } );

        return this;
    },

    /**
     * Parse the target looking for elements to resize
     * @param  {HTMLElement} target    HTML target (default body)
     * @param  {string}      selector  Query selector
     * @return {object}                Context
     */
    parse : function( target, selector )
    {
        // Default
        target   = target   || this.options.target;
        selector = selector || this.options.classes.to_resize;

        // Elements
        this.elements = [];
        var containers = target.querySelectorAll( '.' + selector );

        // Each element
        for( var i = 0, len = containers.length; i < len; i++ )
        {
            var container = containers[ i ],
                content   = container.querySelector( '.' + this.options.classes.content );

            // Content found
            if( content )
            {
                // Add to elements
                this.elements.push(
                {
                    container : container,
                    content   : content
                } );
            }
        }

        return this;
    },

    /**
     * Apply resize on each element
     * @return {object} Context
     */
    resize_all : function()
    {
        for( var i = 0, len = this.elements.length; i < len; i++ )
        {
            var element = this.elements[ i ];

            this.resize( element.container, element.content );
        }

        return this;
    },

    /**
     * Apply resize on HTML target
     * @param  {HTMLElement} container   HTML element outside
     * @param  {HTMLElement} content     HTML element inside
     * @param  {boolean}     force_style Force minimum CSS to make the resize work (position and overflow)
     * @return {object}                  Context
     */
    resize : function( container, content, force_style )
    {
        // Errors
        var errors = [];

        if( !( container instanceof HTMLElement) )
            errors.push( 'wrong container parameter' );

        if( !( content instanceof HTMLElement) )
            errors.push( 'wrong content parameter' );

        if( errors.length )
        {
            for( var i = 0; i < errors.length; i++ )
                console.warn( errors[ i ] );

            return false;
        }

        // Parameters
        var parameters = {};
        parameters.container_width  = container.getAttribute( 'data-width' )  || container.getAttribute( 'width' )  || container.offsetWidth;
        parameters.container_height = container.getAttribute( 'data-height' ) || container.getAttribute( 'height' ) || container.offsetHeight;
        parameters.content_width    = content.getAttribute( 'data-width' )    || content.getAttribute( 'width' )    || content.offsetWidth;
        parameters.content_height   = content.getAttribute( 'data-height' )   || content.getAttribute( 'height' )   || content.offsetHeight;
        parameters.fit_type         = content.getAttribute( 'data-fit-type' );
        parameters.align_x          = content.getAttribute( 'data-align-x' );
        parameters.align_y          = content.getAttribute( 'data-align-y' );
        parameters.rounding         = content.getAttribute( 'data-rounding' );

        // Get sizes
        var sizes = this.get_sizes( parameters );

        // Error
        if( !sizes )
            return false;

        // Default force style
        force_style = typeof force_style === 'undefined' ? this.options.force_style : force_style;

        // Force style
        if( force_style )
        {
            // Test current style
            var container_style = window.getComputedStyle( container ),
                content_style   = window.getComputedStyle( content );

            // Force positioning
            if( container_style.position !== 'fixed' && container_style.position !== 'relative' && container_style.position !== 'absolute' )
                container.style.position = 'relative';

            if( content_style.position !== 'fixed' && content_style.position !== 'relative' && content_style.position !== 'absolute' )
                content.style.position = 'absolute';

            // Force overflow
            if( container_style.overflow !== 'hidden' )
                container.style.overflow = 'hidden';
        }

        // Apply style
        content.style.top    = sizes.css.top;
        content.style.left   = sizes.css.left;
        content.style.width  = sizes.css.width;
        content.style.height = sizes.css.height;

        return this;
    },

    /**
     * Retrieve the sizes for a content to fit inside a container
     * @param  {object} parameters Parameters
     * @return {object}            Sizes
     * @example
     *
     *     get_sizes( {
     *         content_width    : 200.4,
     *         content_height   : 300.5,
     *         container_width  : 600.6,
     *         container_height : 400.7,
     *         fit_type         : 'fit',
     *         alignment_x      : 'center',
     *         alignment_y      : 'center',
     *         rounding         : 'floor'
     *     } )
     *
     */
    get_sizes : function( parameters, format )
    {
        // Errors
        var errors = [];

        if( typeof parameters.content_width === 'undefined' || parseInt( parameters.content_width, 10 ) === 0 )
            errors.push('content width must be specified');

        if( typeof parameters.content_height === 'undefined' || parseInt( parameters.content_height, 10 ) === 0 )
            errors.push('content height must be specified');

        if( typeof parameters.container_width === 'undefined' || parseInt( parameters.container_width, 10 ) === 0 )
            errors.push('container width must be specified');

        if( typeof parameters.container_height === 'undefined' || parseInt( parameters.container_height, 10 ) === 0 )
            errors.push('container height must be specified');

        if( errors.length )
            return false;

        // Default format
        if( typeof format === 'undefined' )
            format = 'both';

        // Defaults parameters
        parameters.fit_type = parameters.fit_type || 'fill';
        parameters.align_x  = parameters.align_x  || 'center';
        parameters.align_y  = parameters.align_y  || 'center';
        parameters.rounding = parameters.rounding || 'ceil';

        var content_ratio   = parameters.content_width / parameters.content_height,
            container_ratio = parameters.container_width / parameters.container_height,
            width           = 0,
            height          = 0,
            x               = 0,
            y               = 0,
            fit_in          = null;

        // To lower case
        parameters.fit_type = parameters.fit_type.toLowerCase();
        parameters.align_x  = parameters.align_x.toLowerCase();
        parameters.align_y  = parameters.align_y.toLowerCase();
        parameters.rounding = parameters.rounding.toLowerCase();

        // align
        if( typeof parameters.align_x === 'undefined' || [ 'left', 'center', 'middle', 'right' ].indexOf( parameters.align_x ) === -1 )
            parameters.align_x = 'center';
        if( typeof parameters.align_y === 'undefined' || [ 'top', 'center', 'middle', 'bottom' ].indexOf( parameters.align_y ) === -1 )
            parameters.align_y = 'center';

        // Functions
        var set_full_width = function()
        {
            width  = parameters.container_width;
            height = ( parameters.container_width / parameters.content_width ) * parameters.content_height;
            x      = 0;
            fit_in = 'width';

            switch( parameters.align_y )
            {
                case 'top':
                    y = 0;
                    break;

                case 'middle':
                case 'center':
                    y = ( parameters.container_height - height ) / 2;
                    break;

                case 'bottom':
                    y = parameters.container_height - height;
                    break;
            }
        };
        var set_full_height = function()
        {
            height = parameters.container_height;
            width  = ( parameters.container_height / parameters.content_height ) * parameters.content_width;
            y      = 0;
            fit_in = 'height';

            switch( parameters.align_x )
            {
                case 'left':
                    x = 0;
                    break;

                case 'middle':
                case 'center':
                    x = ( parameters.container_width - width ) / 2;
                    break;

                case 'right':
                    x = parameters.container_width - width;
                    break;
            }
        };

        // Content should fill the container
        if( [ 'fill', 'full', 'cover' ].indexOf( parameters.fit_type ) !== -1 )
        {
            if( content_ratio < container_ratio )
                set_full_width();
            else
                set_full_height();
        }

        // Content should fit in the container
        else if( [ 'fit', 'i sits', 'contain' ].indexOf( parameters.fit_type ) !== -1 )
        {
            if( content_ratio < container_ratio )
                set_full_height();
            else
                set_full_width();
        }

        // Rounding
        if( [ 'ceil', 'floor', 'round' ].indexOf( parameters.rounding ) !== -1 )
        {
            width  = Math[ parameters.rounding ].call( this,width );
            height = Math[ parameters.rounding ].call( this,height );
            x      = Math[ parameters.rounding ].call( this,x );
            y      = Math[ parameters.rounding ].call( this,y );
        }

        // Returned sizes
        var sizes = {};

        // Cartesian
        sizes.cartesian        = {};
        sizes.cartesian.width  = width;
        sizes.cartesian.height = height;
        sizes.cartesian.x      = x;
        sizes.cartesian.y      = y;

        // CSS
        sizes.css        = {};
        sizes.css.width  = width + 'px';
        sizes.css.height = height + 'px';
        sizes.css.left   = x + 'px';
        sizes.css.top    = y + 'px';

        // Fit in
        sizes.fit_in = fit_in;

        if( format === 'both' )
            return sizes;
        else if( format === 'cartesian' )
            return sizes.cartesian;
        else if( format === 'css' )
            return sizes.css;
    }
} );

/**
 * @class    Strings
 * @author   Bruno SIMON / http://bruno-simon.com
 */
B.Tools.Strings = B.Core.Abstract.extend(
{
    static  : 'strings',
    options : {},
    cases   :
    {
        camel          : [ 'camel', 'camelback', 'compoundnames' ],
        pascal         : [ 'pascal', 'uppercamelcase', 'bumpycaps', 'camelcaps', 'capitalizedwords', 'capwords' ],
        snake          : [ 'snake', 'underscore', 'plissken' ],
        titlesnake     : [ 'titlesnake', 'capitalsnake' ],
        screamingsnake : [ 'screamingsnake', 'uppersnake' ],
        dash           : [ 'dash', 'dashed', 'hyphen', 'kebab', 'spinal' ],
        train          : [ 'train' ],
        space          : [ 'space' ],
        title          : [ 'title' ],
        dot            : [ 'dot' ],
        slash          : [ 'slash', 'forwardslash', 'path' ],
        backslash      : [ 'backslash', 'hack', 'whack', 'escape', 'reverseslash', 'slosh', 'backslant', 'downhill', 'backwhack' ],
        lower          : [ 'lower' ],
        upper          : [ 'upper' ],
        studlycaps     : [ 'studlycaps' ],
        burno          : [ 'burno', 'lol', 'yolo' ]
    },
    negatives :
    [
        '0',
        'false',
        'nop',
        ':(',

        'nee',
        'jo',
        'na??',
        'laa',
        'votch',
        'xeyir',
        'ez',
        'h?? nie', 'nie',
        'na',
        'a??lle',
        'ne',
        'nann',
        'n??',
        'ma hoke phu', 'hmar te',
        'no',
        'tla', 'hla',
        'p?? shi',
        'n??',
        'nej',
        'ei',
        'nei',
        'non',
        'nanni',
        'ara',
        'nein',
        'ohi',
        'nah??niri',
        '??aole', 'aole',
        'lo',
        'nahin',
        'nem',
        'mba',
        'tidak',
        'ii??',
        'ala',
        'thay',
        'oya',
        'ahneo',
        'na',
        'bo',
        'minime',
        'n??',
        'te',
        'neen',
        '????', 'he',
        'tsia',
        'le',
        'kaore',
        'ugui', 'y??v??',
        'nennin', 'nenn',
        '??????',
        'kheyr',
        'nie',
        'n??o',
        'nu',
        '??????', 'niet',
        'ag',
        'aiwa',
        'nae',
        'a??',
        'siyo', 'hapana',
        'hindi', 'po',
        'aita',
        'lla',
        'illa??',
        'yuk',
        'kadhu',
        '?????????', 'ma??',
        'hayir',
        'oevoel', 'ug',
        '????', 'ni',
        '????????',
        'neni',
        'nage',
        'awa',
        'd??ed??et',
        'rara',
        'cha'
    ],

    /**
     * Convert a value to any case listed above
     * Return base value if case not found
     * @param  {string} value  Any string value
     * @param  {string} format Any case listed above (allow 'case' at the end and other chars than letters like camEl-CasE)
     * @return {string}        Covnerted value
     */
    convert_case : function( value, format )
    {
        // Clean value
        value = this.trim( value );

        // Clean format
        format = format.toLowerCase();               // To lower
        format = format.replace( /[^[a-z]]*/g, '' ); // normalize
        format = format.replace( /case/g, '' );      // Remove 'case'

        // Find format
        var true_format = null;
        for( var original_name in this.cases )
        {
            for( var synonym_name_key in this.cases[ original_name ] )
            {
                var synonym_name = this.cases[ original_name ][ synonym_name_key ];

                if( synonym_name === format )
                    true_format = synonym_name;
            }
        }

        // Format not found
        if( !true_format )
            return value;

        // Convert case variation to dashes
        value = value.replace( /([a-z])([A-Z])/g, "$1-$2" );
        value = value.toLowerCase();

        // Get parts
        var parts = value.split( /[-_ .\/\\]/g );

        // Convert
        var new_value = null,
            i         = null,
            len       = null;

        switch( true_format )
        {
            case 'camel' :
                for( i = 0, len = parts.length; i < len; i++ )
                {
                    if( i !== 0 )
                        parts[ i ] = parts[ i ].charAt( 0 ).toUpperCase() + parts[ i ].slice( 1 );
                }
                new_value = parts.join( '' );
                break;
            case 'pascal' :
                for( i = 0, len = parts.length; i < len; i++ )
                    parts[ i ] = parts[ i ].charAt( 0 ).toUpperCase() + parts[ i ].slice( 1 );
                new_value = parts.join( '' );
                break;
            case 'snake' :
                new_value = parts.join( '_' );
                break;
            case 'titlesnake' :
                for( i = 0, len = parts.length; i < len; i++ )
                    parts[ i ] = parts[ i ].charAt( 0 ).toUpperCase() + parts[ i ].slice( 1 );
                new_value = parts.join( '_' );
                break;
            case 'screamingsnake' :
                new_value = parts.join( '_' );
                new_value = new_value.toUpperCase();
                break;
            case 'dash' :
                new_value = parts.join( '-' );
                break;
            case 'train' :
                for( i = 0, len = parts.length; i < len; i++ )
                    parts[ i ] = parts[ i ].charAt( 0 ).toUpperCase() + parts[ i ].slice( 1 );
                new_value = parts.join( '-' );
                break;
            case 'space' :
                new_value = parts.join( ' ' );
                break;
            case 'title' :
                for( i = 0, len = parts.length; i < len; i++ )
                    parts[ i ] = parts[ i ].charAt( 0 ).toUpperCase() + parts[ i ].slice( 1 );
                new_value = parts.join( ' ' );
                break;
            case 'dot' :
                new_value = parts.join( '.' );
                break;
            case 'slash' :
                new_value = parts.join( '/' );
                break;
            case 'backslash' :
                new_value = parts.join( '\\' );
                break;
            case 'lower' :
                new_value = parts.join( '' );
                break;
            case 'upper' :
                new_value = parts.join( '' );
                new_value = new_value.toUpperCase();
                break;
            case 'studlycaps' :
                new_value = parts.join( '' );
                for( i = 0, len = new_value.length; i < len; i++ )
                {
                    if( Math.random() > 0.5 )
                        new_value = new_value.substr( 0, i ) + new_value[ i ].toUpperCase() + new_value.substr( i + 1 );
                }
                break;
            case 'burno' :
                for( i = 0, len = parts.length; i < len; i++ )
                    parts[ i ] = 'burno';
                new_value = parts.join( ' ' );
                break;
        }

        return new_value;
    },

    /**
     * Smartly convert to boolean
     * @return {[type]} [description]
     */
    to_boolean : function( value )
    {
        // Undefined or null
        if( typeof value === 'undefined' || value === null )
            return false;

        // Clean
        value = '' + value;          // To string
        value = this.trim( value );  // Trim
        value = value.toLowerCase(); // To lower case

        return this.negatives.indexOf( value ) === -1;
    },

    /**
     * Remove start and trailing white spaces
     * @param  {string} value      Value to trim
     * @param  {string} characters Characters to trim
     * @return {string}            Trimed value
     */
    trim : function( value, characters )
    {
        if( typeof characters === 'undefined' )
        {
            return value.replace( /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '' );
        }
        else
        {
            value = value.replace( new RegExp( '^[' + characters + ']+' ), '' );
            value = value.replace( new RegExp( '[' + characters + ']+$' ), '' );
            return value;
        }
    },

    /**
     * Convert to slug
     * @param  {string} value Value to convert
     * @return {string}       Converted value
     */
    to_slug : function( value )
    {
        // Clean
        value = this.trim( value );  // Trim
        value = value.toLowerCase(); // To lower case

        // Remove accents and special letters
        var from = '?????????????????????????????????????????????????????/,:;',
            to   = 'aaaaaeeeeeiiiiooooouuuunc-----';

        for( var i = 0, len = from.length; i < len; i++ )
            value = value.replace( new RegExp( from.charAt( i ), 'g' ), to.charAt( i ) );

        value = value.replace( /[^a-z0-9 _-]/g, '' ); // Remove invalid resting chars
        value = value.replace( /\s+/g, '-' );        // Collapse whitespace and replace by -
        value = value.replace( /-+/g, '-' );         // Collapse dashes
        value = this.trim( value, '-' );             // Final trim

        return value;
    },

    /**
     * Convert to slug ('to_slug' alias)
     * @param  {string} value Value to convert
     * @return {string}       Converted value
     */
    slugify : function( value )
    {
        return this.to_slug( value );
    }
} );

/**
 * @class    Resizer
 * @author   Bruno SIMON / http://bruno-simon.com
 */
B.Tools.Ticker = B.Core.Event_Emitter.extend(
{
    static  : 'ticker',
    options :
    {
        auto_run : true
    },

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct : function( options )
    {
        this._super( options );

        this.reseted                = false;
        this.running                = false;
        this.time                   = {};
        this.time.start             = 0;
        this.time.elapsed           = 0;
        this.time.delta             = 0;
        this.time.current           = 0;
        this.waits                  = {};
        this.waits.before           = [];
        this.waits.after            = [];
        this.intervals              = {};

        if( this.options.auto_run )
            this.run();
    },

    /**
     * Reset the ticker by setting time infos to 0
     * @param  {boolean} run Start the ticker
     * @return {object}      Context
     */
    reset : function( run )
    {
        this.reseted = true;

        this.time.start   = + ( new Date() );
        this.time.current = this.time.start;
        this.time.elapsed = 0;
        this.time.delta   = 0;

        if( run )
            this.run();

        return this;
    },

    /**
     * Run the ticker
     * @return {object} Context
     */
    run : function()
    {
        var that = this;

        // Already running
        if( this.running )
            return;

        this.running = true;

        var loop = function()
        {
            if(that.running)
                window.requestAnimationFrame( loop );

            that.tick();
        };

        loop();

        return this;
    },

    /**
     * Stop ticking
     * @return {object} Context
     */
    stop : function()
    {
        this.running = false;

        return this;
    },

    /**
     * Tick (or is it tack ?)
     * @return {object} Context
     */
    tick : function()
    {
        // Reset if needed
        if( !this.reseted )
            this.reset();

        // Set time infos
        this.time.current = + ( new Date() );
        this.time.delta   = this.time.current - this.time.start - this.time.elapsed;
        this.time.elapsed = this.time.current - this.time.start;

        var i    = 0,
            len  = this.waits.before.length,
            wait = null;

        // Do next (before trigger)
        for( ; i < len; i++ )
        {
            // Set up
            wait = this.waits.before[ i ];

            // Frame count down to 0
            if( --wait.frames_count === 0 )
            {
                // Apply action
                wait.action.apply( this, [ this.time ] );

                // Remove from actions
                this.waits.before.splice( i, 1 );

                // Update loop indexes
                i--;
                len--;
            }
        }

        // Trigger
        this.trigger( 'tick', [ this.time ] );

        // Trigger intervals
        this.trigger_intervals();

        // Do next (after trigger)
        i   = 0;
        len = this.waits.after.length;
        for( ; i < len; i++ )
        {
            // Set up
            wait = this.waits.after[ i ];

            // Frame count down to 0
            if( --wait.frames_count === 0 )
            {
                // Apply action
                wait.action.apply( this, [ this.time ] );

                // Remove from actions
                this.waits.after.splice( i, 1 );

                // Update loop indexes
                i--;
                len--;
            }
        }

        return this;
    },

    /**
     * Apply function on X frames
     * @param  {number}   frames_count How many frames before applying the function
     * @param  {function} action       Function to apply
     * @param  {boolean}  after        Should apply the function after the 'tick' event is triggered
     * @return {object}                Context
     */
    wait : function( frames_count, action, after )
    {
        // Errors
        if( typeof action !== 'function' )
            return false;

        if( typeof frames_count !== 'number' )
            return false;

        this.waits[ after ? 'after' : 'before' ].push( {
            frames_count : frames_count,
            action       : action
        } );

        return this;
    },

    /**
     * Create interval
     * @param  {integer} interval Milliseconds between each tick
     * @return {object}           Context
     */
    create_interval : function( interval )
    {
        this.intervals[ interval ] = {
            interval     : interval,
            next_trigger : interval,
            start        : this.time.elapsed,
            last_trigger : this.time.elapsed,
        };

        return this;
    },

    /**
     * Destroy interval
     * @param  {integer} interval Milliseconds between each tick
     * @return {object}           Context
     */
    destroy_interval : function( interval )
    {
        delete this.intervals[ interval ];

        return this;
    },

    /**
     * Trigger intervals
     * @return {object}           Context
     */
    trigger_intervals : function()
    {
        // Each interval
        for( var _key in this.intervals )
        {
            var interval = this.intervals[ _key ];

            // Test if interval should trigger
            if( this.time.elapsed - interval.last_trigger > interval.next_trigger  )
            {
                // Update next trigger to stay as close as possible to the interval
                interval.next_trigger = interval.interval - ( this.time.elapsed - interval.start ) % interval.interval;

                interval.last_trigger = this.time.elapsed;
                this.trigger( 'tick-' + interval.interval, [ this.time, interval ] );
            }
        }

        return this;
    },

    /**
     * Start listening specified events
     * @param  {string}   names    Events names (can contain namespace)
     * @param  {function} callback Function to apply if events are triggered
     * @return {object}            Context
     */
    on : function( names, callback )
    {
        // Set up
        var that           = this,
            resolved_names = this.resolve_names( names );

        // Each resolved name
        resolved_names.forEach( function( name )
        {
            // Has interval interval
            if( name.match( /^tick([0-9]+)$/) )
            {
                // Extract interval interval
                var interval = parseInt( name.replace( /^tick([0-9]+)$/, '$1' ) );

                // Create interval
                if( interval )
                    that.create_interval( interval );
            }
        } );

        return this._super( names, callback );
    },

    /**
     * Stop listening specified events
     * @param  {string}   names Events names (can contain namespace or be the namespace only)
     * @return {object}         Context
     */
    off : function( names )
    {
        // Set up
        var that           = this,
            resolved_names = this.resolve_names( names );

        // Each resolved name
        resolved_names.forEach( function( name )
        {
            // Has interval interval
            if( name.match( /^tick([0-9]+)$/) )
            {
                // Extract interval interval
                var interval = parseInt( name.replace( /^tick([0-9]+)$/, '$1' ) );

                // Create interval
                if( interval )
                    that.destroy_interval( interval );
            }
        } );

        return this._super( names );
    },
} );

/**
 * @class    Viewport
 * @author   Bruno SIMON / http://bruno-simon.com
 * @fires    resize
 * @fires    scroll
 * @requires B.Tools.Ticker
 */
B.Tools.Viewport = B.Core.Event_Emitter.extend(
{
    static  : 'viewport',
    options :
    {
        disable_hover_on_scroll : false,
        initial_triggers        : [ 'resize', 'scroll' ]
    },

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct : function( options )
    {
        this._super( options );

        // Set up
        this.ticker             = new B.Tools.Ticker();
        this.detector           = new B.Tools.Detector();
        this.top                = 0;
        this.left               = 0;
        this.y                  = 0;
        this.x                  = 0;
        this.scroll             = {};
        this.scroll.delta       = {};
        this.scroll.delta.top   = 0;
        this.scroll.delta.left  = 0;
        this.scroll.delta.y     = 0;
        this.scroll.delta.x     = 0;
        this.scroll.direction   = {};
        this.scroll.direction.x = null;
        this.scroll.direction.y = null;
        this.width              = window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth;
        this.height             = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.pixel_ratio        = window.devicePixelRatio || 1;

        // Init
        this.init_disabling_hover_on_scroll();
        this.init_events();
    },

    /**
     * Init events
     * @return {object} Context
     */
    init_events : function()
    {
        var that = this;

        // Callbacks
        function resize_callback()
        {
            that.resize_handler();
        }
        function scroll_callback()
        {
            that.scroll_handler();
        }

        // Listeing to events
        if( window.addEventListener )
        {
            window.addEventListener( 'resize', resize_callback );
            window.addEventListener( 'scroll', scroll_callback );
        }
        else
        {
            window.attachEvent( 'onresize', resize_callback );
            window.attachEvent( 'onscroll', scroll_callback );
        }

        // Initial trigger
        if( this.options.initial_triggers.length )
        {
            // Do next frame
            this.ticker.wait( 1, function()
            {
                // Each initial trigger
                for( var i = 0; i < that.options.initial_triggers.length; i++ )
                {
                    // Set up
                    var action = that.options.initial_triggers[ i ],
                        method = that[ action + '_handler' ];

                    // Method exist
                    if( typeof method === 'function' )
                    {
                        // Trigger
                        method.apply( that );
                    }
                }
            } );
        }

        return this;
    },

    /**
     * Handle the resize event
     * @return {object} Context
     */
    resize_handler : function()
    {
        // Set up
        this.width  = window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth;
        this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        // Trigger
        this.trigger( 'resize', [ this.width, this.height ] );

        return this;
    },

    /**
     * Handle the scroll event
     * @return {object} Context
     */
    scroll_handler : function()
    {
        // Set up
        var top  = typeof window.pageYOffset !== 'undefined' ? window.pageYOffset : window.document.documentElement.scrollTop,
            left = typeof window.pageXOffset !== 'undefined' ? window.pageXOffset : window.document.documentElement.scrollLeft;

        this.scroll.direction.y = top  > this.top  ? 'down'  : 'up';
        this.scroll.direction.x = left > this.left ? 'right' : 'left';
        this.scroll.delta.top   = top  - this.top;
        this.scroll.delta.left  = left - this.left;
        this.top                = top;
        this.left               = left;

        // Alias
        this.y              = this.top;
        this.x              = this.left;
        this.scroll.delta.y = this.scroll.delta.top;
        this.scroll.delta.x = this.scroll.delta.left;

        // Trigger
        this.trigger( 'scroll', [ this.top, this.left, this.scroll ] );

        return this;
    },

    /**
     * Disable pointer events on body when scrolling for performance
     * @return {object} Context
     */
    init_disabling_hover_on_scroll : function()
    {
        // Set up
        var that    = this,
            timeout = null,
            active  = false;

        // Scroll event
        this.on( 'scroll', function()
        {
            if( !that.options.disable_hover_on_scroll )
                return;

            // Clear timeout if exist
            if( timeout )
                window.clearTimeout( timeout );

            // Not active
            if( !active )
            {
                // Activate
                active = true;
                document.body.style.pointerEvents = 'none';
            }

            timeout = window.setTimeout( function()
            {
                // Deactivate
                active = false;
                document.body.style.pointerEvents = 'auto';
            }, 60 );
        } );

        return this;
    },

    /**
     * Test media and return false if not compatible
     * @param  {string} condition Condition to test
     * @return {boolean}          Match
     */
    match_media : function( condition )
    {
        if( !this.detector.features.media_query || typeof condition !== 'string' || condition === '' )
            return false;

        return !!window.matchMedia( condition ).matches;
    }
} );

// UMD support
if( typeof define === 'function' && define.amd )
    define( function() { return B; } );
else if( typeof module === 'object' && module.exports )
    module.exports = B;
else
    window.Burno = window.B = B;

} )( window, document );
