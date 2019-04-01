/*! pxtnDecoder v0.0.1 http://git.io/pxtnDecoder */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":8}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":9}],3:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _promise = require("../core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};
},{"../core-js/promise":2}],4:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],5:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":1}],6:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":75}],7:[function(require,module,exports){

},{}],8:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":17,"../../modules/es6.object.define-property":69}],9:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/_core').Promise;
},{"../modules/_core":17,"../modules/es6.object.to-string":70,"../modules/es6.promise":71,"../modules/es6.string.iterator":72,"../modules/web.dom.iterable":73}],10:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],11:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],12:[function(require,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],13:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":34}],14:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":59,"./_to-iobject":61,"./_to-length":62}],15:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":16,"./_wks":66}],16:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],17:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],18:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":10}],19:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],20:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":24}],21:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":26,"./_is-object":34}],22:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],23:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , ctx       = require('./_ctx')
  , hide      = require('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":17,"./_ctx":18,"./_global":26,"./_hide":28}],24:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],25:[function(require,module,exports){
var ctx         = require('./_ctx')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , anObject    = require('./_an-object')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method')
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"./_an-object":13,"./_ctx":18,"./_is-array-iter":33,"./_iter-call":35,"./_to-length":62,"./core.get-iterator-method":67}],26:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],27:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],28:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":20,"./_object-dp":44,"./_property-desc":49}],29:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":26}],30:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":20,"./_dom-create":21,"./_fails":24}],31:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],32:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":16}],33:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":40,"./_wks":66}],34:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],35:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":13}],36:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":28,"./_object-create":43,"./_property-desc":49,"./_set-to-string-tag":53,"./_wks":66}],37:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":23,"./_has":27,"./_hide":28,"./_iter-create":36,"./_iterators":40,"./_library":41,"./_object-gpo":46,"./_redefine":51,"./_set-to-string-tag":53,"./_wks":66}],38:[function(require,module,exports){
var ITERATOR     = require('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":66}],39:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],40:[function(require,module,exports){
module.exports = {};
},{}],41:[function(require,module,exports){
module.exports = true;
},{}],42:[function(require,module,exports){
var global    = require('./_global')
  , macrotask = require('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./_cof')(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"./_cof":16,"./_global":26,"./_task":58}],43:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":13,"./_dom-create":21,"./_enum-bug-keys":22,"./_html":29,"./_object-dps":45,"./_shared-key":54}],44:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":13,"./_descriptors":20,"./_ie8-dom-define":30,"./_to-primitive":64}],45:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":13,"./_descriptors":20,"./_object-dp":44,"./_object-keys":48}],46:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":27,"./_shared-key":54,"./_to-object":63}],47:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":14,"./_has":27,"./_shared-key":54,"./_to-iobject":61}],48:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":22,"./_object-keys-internal":47}],49:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],50:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};
},{"./_hide":28}],51:[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":28}],52:[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , core        = require('./_core')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_core":17,"./_descriptors":20,"./_global":26,"./_object-dp":44,"./_wks":66}],53:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":27,"./_object-dp":44,"./_wks":66}],54:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":55,"./_uid":65}],55:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":26}],56:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./_an-object')
  , aFunction = require('./_a-function')
  , SPECIES   = require('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":10,"./_an-object":13,"./_wks":66}],57:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":19,"./_to-integer":60}],58:[function(require,module,exports){
var ctx                = require('./_ctx')
  , invoke             = require('./_invoke')
  , html               = require('./_html')
  , cel                = require('./_dom-create')
  , global             = require('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":16,"./_ctx":18,"./_dom-create":21,"./_global":26,"./_html":29,"./_invoke":31}],59:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":60}],60:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],61:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":19,"./_iobject":32}],62:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":60}],63:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":19}],64:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":34}],65:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],66:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":26,"./_shared":55,"./_uid":65}],67:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":15,"./_core":17,"./_iterators":40,"./_wks":66}],68:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":11,"./_iter-define":37,"./_iter-step":39,"./_iterators":40,"./_to-iobject":61}],69:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":20,"./_export":23,"./_object-dp":44}],70:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],71:[function(require,module,exports){
'use strict';
var LIBRARY            = require('./_library')
  , global             = require('./_global')
  , ctx                = require('./_ctx')
  , classof            = require('./_classof')
  , $export            = require('./_export')
  , isObject           = require('./_is-object')
  , aFunction          = require('./_a-function')
  , anInstance         = require('./_an-instance')
  , forOf              = require('./_for-of')
  , speciesConstructor = require('./_species-constructor')
  , task               = require('./_task').set
  , microtask          = require('./_microtask')()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":10,"./_an-instance":12,"./_classof":15,"./_core":17,"./_ctx":18,"./_export":23,"./_for-of":25,"./_global":26,"./_is-object":34,"./_iter-detect":38,"./_library":41,"./_microtask":42,"./_redefine-all":50,"./_set-species":52,"./_set-to-string-tag":53,"./_species-constructor":56,"./_task":58,"./_wks":66}],72:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":37,"./_string-at":57}],73:[function(require,module,exports){
require('./es6.array.iterator');
var global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , TO_STRING_TAG = require('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":26,"./_hide":28,"./_iterators":40,"./_wks":66,"./es6.array.iterator":68}],74:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

},{}],75:[function(require,module,exports){
(function (global){
// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./runtime":76}],76:[function(require,module,exports){
(function (global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = arg;

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],77:[function(require,module,exports){
(function (global){
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory();
	} else {
		window.idleCallbackShim = factory();
	}
}(function(){
	'use strict';
	var scheduleStart, throttleDelay, lazytimer, lazyraf;
	var root = typeof window != 'undefined' ?
		window :
		typeof global != undefined ?
			global :
			this || {};
	var requestAnimationFrame = root.cancelRequestAnimationFrame && root.requestAnimationFrame || setTimeout;
	var cancelRequestAnimationFrame = root.cancelRequestAnimationFrame || clearTimeout;
	var tasks = [];
	var runAttempts = 0;
	var isRunning = false;
	var remainingTime = 7;
	var minThrottle = 35;
	var throttle = 125;
	var index = 0;
	var taskStart = 0;
	var tasklength = 0;
	var IdleDeadline = {
		get didTimeout(){
			return false;
		},
		timeRemaining: function(){
			var timeRemaining = remainingTime - (Date.now() - taskStart);
			return timeRemaining < 0 ? 0 : timeRemaining;
		},
	};
	var setInactive = debounce(function(){
		remainingTime = 22;
		throttle = 66;
		minThrottle = 0;
	});

	function debounce(fn){
		var id, timestamp;
		var wait = 99;
		var check = function(){
			var last = (Date.now()) - timestamp;

			if (last < wait) {
				id = setTimeout(check, wait - last);
			} else {
				id = null;
				fn();
			}
		};
		return function(){
			timestamp = Date.now();
			if(!id){
				id = setTimeout(check, wait);
			}
		};
	}

	function abortRunning(){
		if(isRunning){
			if(lazyraf){
				cancelRequestAnimationFrame(lazyraf);
			}
			if(lazytimer){
				clearTimeout(lazytimer);
			}
			isRunning = false;
		}
	}

	function onInputorMutation(){
		if(throttle != 125){
			remainingTime = 7;
			throttle = 125;
			minThrottle = 35;

			if(isRunning) {
				abortRunning();
				scheduleLazy();
			}
		}
		setInactive();
	}

	function scheduleAfterRaf() {
		lazyraf = null;
		lazytimer = setTimeout(runTasks, 0);
	}

	function scheduleRaf(){
		lazytimer = null;
		requestAnimationFrame(scheduleAfterRaf);
	}

	function scheduleLazy(){

		if(isRunning){return;}
		throttleDelay = throttle - (Date.now() - taskStart);

		scheduleStart = Date.now();

		isRunning = true;

		if(minThrottle && throttleDelay < minThrottle){
			throttleDelay = minThrottle;
		}

		if(throttleDelay > 9){
			lazytimer = setTimeout(scheduleRaf, throttleDelay);
		} else {
			throttleDelay = 0;
			scheduleRaf();
		}
	}

	function runTasks(){
		var task, i, len;
		var timeThreshold = remainingTime > 9 ?
			9 :
			1
		;

		taskStart = Date.now();
		isRunning = false;

		lazytimer = null;

		if(runAttempts > 2 || taskStart - throttleDelay - 50 < scheduleStart){
			for(i = 0, len = tasks.length; i < len && IdleDeadline.timeRemaining() > timeThreshold; i++){
				task = tasks.shift();
				tasklength++;
				if(task){
					task(IdleDeadline);
				}
			}
		}

		if(tasks.length){
			scheduleLazy();
		} else {
			runAttempts = 0;
		}
	}

	function requestIdleCallbackShim(task){
		index++;
		tasks.push(task);
		scheduleLazy();
		return index;
	}

	function cancelIdleCallbackShim(id){
		var index = id - 1 - tasklength;
		if(tasks[index]){
			tasks[index] = null;
		}
	}

	if(!root.requestIdleCallback || !root.cancelIdleCallback){
		root.requestIdleCallback = requestIdleCallbackShim;
		root.cancelIdleCallback = cancelIdleCallbackShim;

		if(root.document && document.addEventListener){
			root.addEventListener('scroll', onInputorMutation, true);
			root.addEventListener('resize', onInputorMutation);

			document.addEventListener('focus', onInputorMutation, true);
			document.addEventListener('mouseover', onInputorMutation, true);
			['click', 'keypress', 'touchstart', 'mousedown'].forEach(function(name){
				document.addEventListener(name, onInputorMutation, {capture: true, passive: true});
			});

			if(root.MutationObserver){
				new MutationObserver( onInputorMutation ).observe( document.documentElement, {childList: true, subtree: true, attributes: true} );
			}
		}
	} else {
		try{
			root.requestIdleCallback(function(){}, {timeout: 0});
		} catch(e){
			(function(rIC){
				var timeRemainingProto, timeRemaining;
				root.requestIdleCallback = function(fn, timeout){
					if(timeout && typeof timeout.timeout == 'number'){
						return rIC(fn, timeout.timeout);
					}
					return rIC(fn);
				};
				if(root.IdleCallbackDeadline && (timeRemainingProto = IdleCallbackDeadline.prototype)){
					timeRemaining = Object.getOwnPropertyDescriptor(timeRemainingProto, 'timeRemaining');
					if(!timeRemaining || !timeRemaining.configurable || !timeRemaining.get){return;}
					Object.defineProperty(timeRemainingProto, 'timeRemaining', {
						value:  function(){
							return timeRemaining.get.call(this);
						},
						enumerable: true,
						configurable: true,
					});
				}
			})(root.requestIdleCallback)
		}
	}

	return {
		request: requestIdleCallbackShim,
		cancel: cancelIdleCallbackShim,
	};
}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],78:[function(require,module,exports){
module.exports = require("./zen-observable.js").Observable;

},{"./zen-observable.js":79}],79:[function(require,module,exports){
'use strict'; (function(fn, name) { if (typeof exports !== 'undefined') fn(exports, module); else if (typeof self !== 'undefined') fn(name === '*' ? self : (name ? self[name] = {} : {})); })(function(exports, module) { // === Symbol Support ===

function hasSymbol(name) {

    return typeof Symbol === "function" && Boolean(Symbol[name]);
}

function getSymbol(name) {

    return hasSymbol(name) ? Symbol[name] : "@@" + name;
}

// === Abstract Operations ===

function getMethod(obj, key) {

    var value = obj[key];

    if (value == null)
        return undefined;

    if (typeof value !== "function")
        throw new TypeError(value + " is not a function");

    return value;
}

function getSpecies(ctor) {

    var symbol = getSymbol("species");
    return symbol ? ctor[symbol] : ctor;
}

function addMethods(target, methods) {

    Object.keys(methods).forEach(function(k) {

        var desc = Object.getOwnPropertyDescriptor(methods, k);
        desc.enumerable = false;
        Object.defineProperty(target, k, desc);
    });
}

function cleanupSubscription(subscription) {

    // Assert:  observer._observer is undefined

    var cleanup = subscription._cleanup;

    if (!cleanup)
        return;

    // Drop the reference to the cleanup function so that we won't call it
    // more than once
    subscription._cleanup = undefined;

    // Call the cleanup function
    cleanup();
}

function subscriptionClosed(subscription) {

    return subscription._observer === undefined;
}

function closeSubscription(subscription) {

    if (subscriptionClosed(subscription))
        return;

    subscription._observer = undefined;
    cleanupSubscription(subscription);
}

function cleanupFromSubscription(subscription) {
    return function(_) { subscription.unsubscribe() };
}

function Subscription(observer, subscriber) {

    // Assert: subscriber is callable

    // The observer must be an object
    if (Object(observer) !== observer)
        throw new TypeError("Observer must be an object");

    this._cleanup = undefined;
    this._observer = observer;

    var start = getMethod(observer, "start");

    if (start)
        start.call(observer, this);

    if (subscriptionClosed(this))
        return;

    observer = new SubscriptionObserver(this);

    try {

        // Call the subscriber function
        var cleanup$0 = subscriber.call(undefined, observer);

        // The return value must be undefined, null, a subscription object, or a function
        if (cleanup$0 != null) {

            if (typeof cleanup$0.unsubscribe === "function")
                cleanup$0 = cleanupFromSubscription(cleanup$0);
            else if (typeof cleanup$0 !== "function")
                throw new TypeError(cleanup$0 + " is not a function");

            this._cleanup = cleanup$0;
        }

    } catch (e) {

        // If an error occurs during startup, then attempt to send the error
        // to the observer
        observer.error(e);
        return;
    }

    // If the stream is already finished, then perform cleanup
    if (subscriptionClosed(this))
        cleanupSubscription(this);
}

addMethods(Subscription.prototype = {}, {
    get closed() { return subscriptionClosed(this) },
    unsubscribe: function() { closeSubscription(this) },
});

function SubscriptionObserver(subscription) {
    this._subscription = subscription;
}

addMethods(SubscriptionObserver.prototype = {}, {

    get closed() { return subscriptionClosed(this._subscription) },

    next: function(value) {

        var subscription = this._subscription;

        // If the stream is closed, then return undefined
        if (subscriptionClosed(subscription))
            return undefined;

        var observer = subscription._observer;
        var m = getMethod(observer, "next");

        // If the observer doesn't support "next", then return undefined
        if (!m)
            return undefined;

        // Send the next value to the sink
        return m.call(observer, value);
    },

    error: function(value) {

        var subscription = this._subscription;

        // If the stream is closed, throw the error to the caller
        if (subscriptionClosed(subscription))
            throw value;

        var observer = subscription._observer;
        subscription._observer = undefined;

        try {

            var m$0 = getMethod(observer, "error");

            // If the sink does not support "error", then throw the error to the caller
            if (!m$0)
                throw value;

            value = m$0.call(observer, value);

        } catch (e) {

            try { cleanupSubscription(subscription) }
            finally { throw e }
        }

        cleanupSubscription(subscription);
        return value;
    },

    complete: function(value) {

        var subscription = this._subscription;

        // If the stream is closed, then return undefined
        if (subscriptionClosed(subscription))
            return undefined;

        var observer = subscription._observer;
        subscription._observer = undefined;

        try {

            var m$1 = getMethod(observer, "complete");

            // If the sink does not support "complete", then return undefined
            value = m$1 ? m$1.call(observer, value) : undefined;

        } catch (e) {

            try { cleanupSubscription(subscription) }
            finally { throw e }
        }

        cleanupSubscription(subscription);
        return value;
    },

});

function Observable(subscriber) {

    // The stream subscriber must be a function
    if (typeof subscriber !== "function")
        throw new TypeError("Observable initializer must be a function");

    this._subscriber = subscriber;
}

addMethods(Observable.prototype, {

    subscribe: function(observer) { for (var args = [], __$0 = 1; __$0 < arguments.length; ++__$0) args.push(arguments[__$0]); 

        if (typeof observer === 'function') {

            observer = {
                next: observer,
                error: args[0],
                complete: args[1],
            };
        }

        return new Subscription(observer, this._subscriber);
    },

    forEach: function(fn) { var __this = this; 

        return new Promise(function(resolve, reject) {

            if (typeof fn !== "function")
                return Promise.reject(new TypeError(fn + " is not a function"));

            __this.subscribe({

                _subscription: null,

                start: function(subscription) {

                    if (Object(subscription) !== subscription)
                        throw new TypeError(subscription + " is not an object");

                    this._subscription = subscription;
                },

                next: function(value) {

                    var subscription = this._subscription;

                    if (subscription.closed)
                        return;

                    try {

                        return fn(value);

                    } catch (err) {

                        reject(err);
                        subscription.unsubscribe();
                    }
                },

                error: reject,
                complete: resolve,
            });

        });
    },

    map: function(fn) { var __this = this; 

        if (typeof fn !== "function")
            throw new TypeError(fn + " is not a function");

        var C = getSpecies(this.constructor);

        return new C(function(observer) { return __this.subscribe({

            next: function(value) {

                if (observer.closed)
                    return;

                try { value = fn(value) }
                catch (e) { return observer.error(e) }

                return observer.next(value);
            },

            error: function(e) { return observer.error(e) },
            complete: function(x) { return observer.complete(x) },
        }); });
    },

    filter: function(fn) { var __this = this; 

        if (typeof fn !== "function")
            throw new TypeError(fn + " is not a function");

        var C = getSpecies(this.constructor);

        return new C(function(observer) { return __this.subscribe({

            next: function(value) {

                if (observer.closed)
                    return;

                try { if (!fn(value)) return undefined }
                catch (e) { return observer.error(e) }

                return observer.next(value);
            },

            error: function(e) { return observer.error(e) },
            complete: function() { return observer.complete() },
        }); });
    },

    reduce: function(fn) { var __this = this; 

        if (typeof fn !== "function")
            throw new TypeError(fn + " is not a function");

        var C = getSpecies(this.constructor),
            hasSeed = arguments.length > 1,
            hasValue = false,
            seed = arguments[1],
            acc = seed;

        return new C(function(observer) { return __this.subscribe({

            next: function(value) {

                if (observer.closed)
                    return;

                var first = !hasValue;
                hasValue = true;

                if (!first || hasSeed) {

                    try { acc = fn(acc, value) }
                    catch (e) { return observer.error(e) }

                } else {

                    acc = value;
                }
            },

            error: function(e) { observer.error(e) },

            complete: function() {

                if (!hasValue && !hasSeed) {
                    observer.error(new TypeError("Cannot reduce an empty sequence"));
                    return;
                }

                observer.next(acc);
                observer.complete();
            },

        }); });
    },

    flatMap: function(fn) { var __this = this; 

        if (typeof fn !== "function")
            throw new TypeError(fn + " is not a function");

        var C = getSpecies(this.constructor);

        return new C(function(observer) {

            var completed = false,
                subscriptions = [];

            // Subscribe to the outer Observable
            var outer = __this.subscribe({

                next: function(value) {

                    if (fn) {

                        try {

                            value = fn(value);

                        } catch (x) {

                            observer.error(x);
                            return;
                        }
                    }

                    // Subscribe to the inner Observable
                    Observable.from(value).subscribe({

                        _subscription: null,

                        start: function(s) { subscriptions.push(this._subscription = s) },
                        next: function(value) { observer.next(value) },
                        error: function(e) { observer.error(e) },

                        complete: function() {

                            var i = subscriptions.indexOf(this._subscription);

                            if (i >= 0)
                                subscriptions.splice(i, 1);

                            closeIfDone();
                        }
                    });
                },

                error: function(e) {

                    return observer.error(e);
                },

                complete: function() {

                    completed = true;
                    closeIfDone();
                }
            });

            function closeIfDone() {

                if (completed && subscriptions.length === 0)
                    observer.complete();
            }

            return function(_) {

                subscriptions.forEach(function(s) { return s.unsubscribe(); });
                outer.unsubscribe();
            };
        });
    }

});

Object.defineProperty(Observable.prototype, getSymbol("observable"), {
    value: function() { return this },
    writable: true,
    configurable: true,
});

addMethods(Observable, {

    from: function(x) {

        var C = typeof this === "function" ? this : Observable;

        if (x == null)
            throw new TypeError(x + " is not an object");

        var method = getMethod(x, getSymbol("observable"));

        if (method) {

            var observable$0 = method.call(x);

            if (Object(observable$0) !== observable$0)
                throw new TypeError(observable$0 + " is not an object");

            if (observable$0.constructor === C)
                return observable$0;

            return new C(function(observer) { return observable$0.subscribe(observer); });
        }

        if (hasSymbol("iterator") && (method = getMethod(x, getSymbol("iterator")))) {

            return new C(function(observer) {

                for (var __$0 = (method.call(x))[Symbol.iterator](), __$1; __$1 = __$0.next(), !__$1.done;) { var item$0 = __$1.value; 

                    observer.next(item$0);

                    if (observer.closed)
                        return;
                }

                observer.complete();
            });
        }

        if (Array.isArray(x)) {

            return new C(function(observer) {

                for (var i$0 = 0; i$0 < x.length; ++i$0) {

                    observer.next(x[i$0]);

                    if (observer.closed)
                        return;
                }

                observer.complete();
            });
        }

        throw new TypeError(x + " is not observable");
    },

    of: function() { for (var items = [], __$0 = 0; __$0 < arguments.length; ++__$0) items.push(arguments[__$0]); 

        var C = typeof this === "function" ? this : Observable;

        return new C(function(observer) {

            for (var i$1 = 0; i$1 < items.length; ++i$1) {

                observer.next(items[i$1]);

                if (observer.closed)
                    return;
            }

            observer.complete();
        });
    },

});

Object.defineProperty(Observable, getSymbol("species"), {
    get: function() { return this },
    configurable: true,
});

exports.Observable = Observable;


}, "*");
},{}],80:[function(require,module,exports){
!function(){function Ba(a){eval.call(null,a)}function r(a,c){a||G("Assertion failed: "+c)}function Ca(a,c){c=c||"i8";"*"===c.charAt(c.length-1)&&(c="i32");switch(c){case "i1":return H[a>>0];case "i8":return H[a>>0];case "i16":return M[a>>1];case "i32":return p[a>>2];case "i64":return p[a>>2];case "float":return X[a>>2];case "double":return Y[a>>3];default:G("invalid type for setValue: "+c)}return null}function x(a,c,b,d){var g,k;"number"===typeof a?(g=!0,k=a):(g=!1,k=a.length);var l="string"===typeof c?
c:null;b=4==b?d:["function"===typeof I?I:h.B,h.A,h.B,h.u][void 0===b?2:b](Math.max(k,l?1:c.length));if(g){d=b;r(0==(b&3));for(a=b+(k&-4);d<a;d+=4)p[d>>2]=0;for(a=b+k;d<a;)H[d++>>0]=0;return b}if("i8"===l)return a.subarray||a.slice?q.set(a,b):q.set(new Uint8Array(a),b),b;d=0;for(var t,f;d<k;){var n=a[d];"function"===typeof n&&(n=h.ga(n));g=l||c[d];if(0===g)d++;else{"i64"==g&&(g="i32");var y=b+d,m=g,m=m||"i8";"*"===m.charAt(m.length-1)&&(m="i32");switch(m){case "i1":H[y>>0]=n;break;case "i8":H[y>>0]=
n;break;case "i16":M[y>>1]=n;break;case "i32":p[y>>2]=n;break;case "i64":tempI64=[n>>>0,(tempDouble=n,1<=+pb(tempDouble)?0<tempDouble?(qb(+rb(tempDouble/4294967296),4294967295)|0)>>>0:~~+sb((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)];p[y>>2]=tempI64[0];p[y+4>>2]=tempI64[1];break;case "float":X[y>>2]=n;break;case "double":Y[y>>3]=n;break;default:G("invalid type for setValue: "+m)}f!==g&&(t=h.o(g),f=g);d+=t}}return b}function Ea(a){var c;if(0===c||!a)return"";for(var e=0,d,g=0;;){d=q[a+g>>
0];e|=d;if(0==d&&!c)break;g++;if(c&&g==c)break}c||(c=g);d="";if(128>e){for(;0<c;)e=String.fromCharCode.apply(String,q.subarray(a,a+Math.min(c,1024))),d=d?d+e:e,a+=1024,c-=1024;return d}return b.UTF8ToString(a)}function Fa(a,c,b,d){if(0<d){d=b+d-1;for(var g=0;g<a.length;++g){var k=a.charCodeAt(g);55296<=k&&57343>=k&&(k=65536+((k&1023)<<10)|a.charCodeAt(++g)&1023);if(127>=k){if(b>=d)break;c[b++]=k}else{if(2047>=k){if(b+1>=d)break;c[b++]=192|k>>6}else{if(65535>=k){if(b+2>=d)break;c[b++]=224|k>>12}else{if(2097151>=
k){if(b+3>=d)break;c[b++]=240|k>>18}else{if(67108863>=k){if(b+4>=d)break;c[b++]=248|k>>24}else{if(b+5>=d)break;c[b++]=252|k>>30;c[b++]=128|k>>24&63}c[b++]=128|k>>18&63}c[b++]=128|k>>12&63}c[b++]=128|k>>6&63}c[b++]=128|k&63}}c[b]=0}}function Ga(a){for(var c=0,b=0;b<a.length;++b){var d=a.charCodeAt(b);55296<=d&&57343>=d&&(d=65536+((d&1023)<<10)|a.charCodeAt(++b)&1023);127>=d?++c:c=2047>=d?c+2:65535>=d?c+3:2097151>=d?c+4:67108863>=d?c+5:c+6}return c}function tb(a){return a.replace(/__Z[\w\d_]+/g,function(a){var e;
a:{var d=b.___cxa_demangle||b.__cxa_demangle;if(d)try{var g=a.substr(1),k=Ga(g)+1,l=I(k);Fa(g,q,l,k);var t=I(4),f=d(l,0,0,t);if(0===Ca(t,"i32")&&f){e=Ea(f);break a}}catch(n){}finally{l&&v(l),t&&v(t),f&&v(f)}else h.h("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");e=a}return a===e?a:a+" ["+e+"]"})}function ub(){var a;a:{a=Error();if(!a.stack){try{throw Error(0);}catch(c){a=c}if(!a.stack){a="(no stack trace available)";break a}}a=a.stack.toString()}b.extraStackTrace&&
(a+="\n"+b.extraStackTrace());return tb(a)}function oa(){G("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+N+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which adjusts the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}function S(a){for(;0<a.length;){var c=a.shift();
if("function"==typeof c)c();else{var e=c.w;"number"===typeof e?void 0===c.k?b.dynCall_v(e):b.dynCall_vi(e,c.k):e(void 0===c.k?null:c.k)}}}function vb(a){Ha.unshift(a)}function Ia(a){var c=Array(Ga(a)+1);Fa(a,c,0,c.length);return c}function Ja(){for(var a=Array(256),c=0;256>c;++c)a[c]=String.fromCharCode(c);Ka=a}function z(a){for(var c="";q[a];)c+=Ka[q[a++]];return c}function pa(a){if(void 0===a)return"_unknown";a=a.replace(/[^a-zA-Z0-9_]/g,"$");var c=a.charCodeAt(0);return 48<=c&&57>=c?"_"+a:a}function qa(a,
c){a=pa(a);return(new Function("body","return function "+a+'() {\n    "use strict";    return body.apply(this, arguments);\n};\n'))(c)}function ca(a,c){var b=qa(c,function(a){this.name=c;this.message=a;a=Error(a).stack;void 0!==a&&(this.stack=this.toString()+"\n"+a.replace(/^Error(:[^\n]*)?\n/,""))});b.prototype=Object.create(a.prototype);b.prototype.constructor=b;b.prototype.toString=function(){return void 0===this.message?this.name:this.name+": "+this.message};return b}function A(a){throw new La(a);
}function ra(a){throw new Ma(a);}function Na(a,c,b){function d(c){c=b(c);c.length!==a.length&&ra("Mismatched type converter count");for(var d=0;d<a.length;++d)D(a[d],c[d])}a.forEach(function(a){da[a]=c});var g=Array(c.length),k=[],l=0;c.forEach(function(a,c){T.hasOwnProperty(a)?g[c]=T[a]:(k.push(a),U.hasOwnProperty(a)||(U[a]=[]),U[a].push(function(){g[c]=T[a];++l;l===k.length&&d(g)}))});0===k.length&&d(g)}function D(a,c,b){b=b||{};if(!("argPackAdvance"in c))throw new TypeError("registerType registeredInstance requires argPackAdvance");
var d=c.name;a||A('type "'+d+'" must have a positive integer typeid pointer');if(T.hasOwnProperty(a)){if(b.P)return;A("Cannot register type '"+d+"' twice")}T[a]=c;delete da[a];U.hasOwnProperty(a)&&(c=U[a],delete U[a],c.forEach(function(a){a()}))}function ea(a){switch(a){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+a);}}function sa(){return!!sa.a}function Z(){var a=u.p;if(!a)return(f.setTempRet0(0),0)|0;var c=u.c[a],e=c.type;if(!e)return(f.setTempRet0(0),
a)|0;var d=Array.prototype.slice.call(arguments);b.___cxa_is_pointer_type(e);Z.buffer||(Z.buffer=I(4));p[Z.buffer>>2]=a;for(var a=Z.buffer,g=0;g<d.length;g++)if(d[g]&&b.___cxa_can_catch(d[g],e,a))return a=p[a>>2],c.F=a,(f.setTempRet0(d[g]),a)|0;a=p[a>>2];return(f.setTempRet0(e),a)|0}function v(){}function I(a){return h.u(a+8)+8&4294967288}function fa(a){return this.fromWireType(E[a>>2])}function aa(a,c){aa.a||(aa.a={});a in aa.a||(b.dynCall_v(c),aa.a[a]=1)}function ga(a){if(null===a)return"null";
var c=typeof a;return"object"===c||"array"===c||"function"===c?a.toString():""+a}function Oa(a,c,b){switch(c){case 0:return b?function(a){return H[a]}:function(a){return q[a]};case 1:return b?function(a){return M[a>>1]}:function(a){return ha[a>>1]};case 2:return b?function(a){return p[a>>2]}:function(a){return E[a>>2]};default:throw new TypeError("Unknown integer type: "+a);}}function Pa(a){b.exit(a)}function Qa(a){4<a&&0===--F[a].g&&(F[a]=void 0,ta.push(a))}function Ra(){for(var a=0,c=5;c<F.length;++c)void 0!==
F[c]&&++a;return a}function Sa(){for(var a=5;a<F.length;++a)if(void 0!==F[a])return F[a];return null}function Ta(){b.count_emval_handles=Ra;b.get_first_emval=Sa}function Ua(a){switch(a){case void 0:return 1;case null:return 2;case !0:return 3;case !1:return 4;default:var c=ta.length?ta.pop():F.length;F[c]={g:1,value:a};return c}}function Va(a,c){switch(c){case 2:return function(a){return this.fromWireType(X[a>>2])};case 3:return function(a){return this.fromWireType(Y[a>>3])};default:throw new TypeError("Unknown float type: "+
a);}}function ia(a,c){O.push(function(){b.dynCall_vi(a,c)});ia.level=O.length}function Wa(a,c){if(!(a instanceof Function))throw new TypeError("new_ called with constructor type "+typeof a+" which is not a function");var b=qa(a.name||"unknownFunctionName",function(){});b.prototype=a.prototype;var b=new b,d=a.apply(b,c);return d instanceof Object?d:b}function Xa(a){for(;a.length;){var c=a.pop();a.pop()(c)}}function Ya(a,c,b,d,g){var k=c.length;2>k&&A("argTypes array size mismatch! Must at least get return value and 'this' types!");
var l=null!==c[1]&&null!==b,f="",h="";for(b=0;b<k-2;++b)f+=(0!==b?", ":"")+"arg"+b,h+=(0!==b?", ":"")+"arg"+b+"Wired";a="return function "+pa(a)+"("+f+") {\nif (arguments.length !== "+(k-2)+") {\nthrowBindingError('function "+a+" called with ' + arguments.length + ' arguments, expected "+(k-2)+" args!');\n}\n";var n=!1;for(b=1;b<c.length;++b)if(null!==c[b]&&void 0===c[b].d){n=!0;break}n&&(a+="var destructors = [];\n");var m=n?"destructors":"null",f="throwBindingError invoker fn runDestructors retType classParam".split(" ");
d=[A,d,g,Xa,c[0],c[1]];l&&(a+="var thisWired = classParam.toWireType("+m+", this);\n");for(b=0;b<k-2;++b)a+="var arg"+b+"Wired = argType"+b+".toWireType("+m+", arg"+b+"); // "+c[b+2].name+"\n",f.push("argType"+b),d.push(c[b+2]);l&&(h="thisWired"+(0<h.length?", ":"")+h);k="void"!==c[0].name;a+=(k?"var rv = ":"")+"invoker(fn"+(0<h.length?", ":"")+h+");\n";if(n)a+="runDestructors(destructors);\n";else for(b=l?1:2;b<c.length;++b)l=1===b?"thisWired":"arg"+(b-2)+"Wired",null!==c[b].d&&(a+=l+"_dtor("+l+
"); // "+c[b].name+"\n",f.push(l+"_dtor"),d.push(c[b].d));k&&(a+="var ret = retType.fromWireType(rv);\nreturn ret;\n");f.push(a+"}\n");return Wa(Function,f).apply(null,d)}function Za(a,b,e){if(void 0===a[b].b){var d=a[b];a[b]=function(){a[b].b.hasOwnProperty(arguments.length)||A("Function '"+e+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+a[b].b+")!");return a[b].b[arguments.length].apply(this,arguments)};a[b].b=[];a[b].b[d.G]=d}}function $a(a,c,e){b.hasOwnProperty(a)?
((void 0===e||void 0!==b[a].b&&void 0!==b[a].b[e])&&A("Cannot register public name '"+a+"' twice"),Za(b,a,a),b.hasOwnProperty(e)&&A("Cannot register multiple overloads of a function with the same number of arguments ("+e+")!"),b[a].b[e]=c):(b[a]=c,void 0!==e&&(b[a].na=e))}function ab(a,b){for(var e=[],d=0;d<a;d++)e.push(p[(b>>2)+d]);return e}function bb(a,c,e){b.hasOwnProperty(a)||ra("Replacing nonexistant public symbol");void 0!==b[a].b&&void 0!==e?b[a].b[e]=c:(b[a]=c,b[a].G=e)}function cb(a,c){a=
z(a);var e;if(void 0!==b["FUNCTION_TABLE_"+a])e=b["FUNCTION_TABLE_"+a][c];else if("undefined"!==typeof FUNCTION_TABLE)e=FUNCTION_TABLE[c];else{e=f["dynCall_"+a];void 0===e&&(e=f["dynCall_"+a.replace(/f/g,"d")],void 0===e&&A("No dynCall invoker for signature: "+a));for(var d=[],g=1;g<a.length;++g)d.push("a"+g);g="return function "+("dynCall_"+a+"_"+c)+"("+d.join(", ")+") {\n";g+="    return dynCall(rawFunction"+(d.length?", ":"")+d.join(", ")+");\n";e=(new Function("dynCall","rawFunction",g+"};\n"))(e,
c)}"function"!==typeof e&&A("unknown function pointer with signature "+a+": "+c);return e}function db(a){a=wb(a);var b=z(a);v(a);return b}function eb(a,b){function e(a){g[a]||T[a]||(da[a]?da[a].forEach(e):(d.push(a),g[a]=!0))}var d=[],g={};b.forEach(e);throw new fb(a+": "+d.map(db).join([", "]));}function J(a,c){m.f=c;try{var e=m.get(),d=m.get(),g=m.get(),k=0;J.buffer||(J.a=[null,[],[]],J.t=function(a,c){var d=J.a[a];r(d);if(0===c||10===c){var e=1===a?b.print:b.printErr,g;a:{for(var k=g=0;d[k];)++k;
if(16<k-g&&d.subarray&&gb)g=gb.decode(d.subarray(g,k));else for(var f,l,h,t,n,m,k="";;){f=d[g++];if(!f){g=k;break a}f&128?(l=d[g++]&63,192==(f&224)?k+=String.fromCharCode((f&31)<<6|l):(h=d[g++]&63,224==(f&240)?f=(f&15)<<12|l<<6|h:(t=d[g++]&63,240==(f&248)?f=(f&7)<<18|l<<12|h<<6|t:(n=d[g++]&63,248==(f&252)?f=(f&3)<<24|l<<18|h<<12|t<<6|n:(m=d[g++]&63,f=(f&1)<<30|l<<24|h<<18|t<<12|n<<6|m))),65536>f?k+=String.fromCharCode(f):(f-=65536,k+=String.fromCharCode(55296|f>>10,56320|f&1023)))):k+=String.fromCharCode(f)}}e(g);
d.length=0}else d.push(c)});for(var f=0;f<g;f++){for(var h=p[d+8*f>>2],Da=p[d+(8*f+4)>>2],n=0;n<Da;n++)J.t(e,q[h+n]);k+=Da}return k}catch(y){return"undefined"!==typeof FS&&y instanceof FS.r||G(y),-y.v}}function V(a){this.name="ExitStatus";this.message="Program terminated with exit("+a+")";this.status=a}function hb(a){function c(){if(!b.calledRun&&(b.calledRun=!0,!ja)){ka||(ka=!0,S(ua));S(xb);if(b.onRuntimeInitialized)b.onRuntimeInitialized();b._main&&ib&&b.callMain(a);if(b.postRun)for("function"==
typeof b.postRun&&(b.postRun=[b.postRun]);b.postRun.length;){var c=b.postRun.shift();jb.unshift(c)}S(jb)}}a=a||b.arguments;null===kb&&(kb=Date.now());if(!(0<lb)){if(b.preRun)for("function"==typeof b.preRun&&(b.preRun=[b.preRun]);b.preRun.length;)vb(b.preRun.shift());S(Ha);0<lb||b.calledRun||(b.setStatus?(b.setStatus("Running..."),setTimeout(function(){setTimeout(function(){b.setStatus("")},1);c()},1)):c())}}function mb(a,c){if(!c||!b.noExitRuntime){if(!b.noExitRuntime&&(ja=!0,B=yb,S(O),b.onExit))b.onExit(a);
P?process.exit(a):la&&"function"===typeof quit&&quit(a);throw new V(a);}}function G(a){void 0!==a?(b.print(a),b.q(a),a=JSON.stringify(a)):a="";ja=!0;var c="abort("+a+") at "+ub()+"\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";nb&&nb.forEach(function(b){c=b(c,a)});throw c;}var b;b||(b=eval("(function() { try { return Module || {} } catch(e) { return {} } })()"));var ba={},K;for(K in b)b.hasOwnProperty(K)&&(ba[K]=b[K]);var W=!1,Q=!1,P=!1,la=!1;if(b.ENVIRONMENT)if("WEB"===
b.ENVIRONMENT)W=!0;else if("WORKER"===b.ENVIRONMENT)Q=!0;else if("NODE"===b.ENVIRONMENT)P=!0;else if("SHELL"===b.ENVIRONMENT)la=!0;else throw Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.");else W="object"===typeof window,Q="function"===typeof importScripts,P="object"===typeof process&&"function"===typeof require&&!W&&!Q,la=!W&&!P&&!Q;if(P){b.print||(b.print=console.log);b.printErr||(b.printErr=console.warn);var va,wa;b.read=function(a,b){va||
(va=require("fs"));wa||(wa=require("path"));a=wa.normalize(a);var e=va.readFileSync(a);return b?e:e.toString()};b.readBinary=function(a){a=b.read(a,!0);a.buffer||(a=new Uint8Array(a));r(a.buffer);return a};b.load=function(a){Ba(read(a))};b.thisProgram||(b.thisProgram=1<process.argv.length?process.argv[1].replace(/\\/g,"/"):"unknown-program");b.arguments=process.argv.slice(2);"undefined"!==typeof module&&(module.exports=b);process.on("uncaughtException",function(a){if(!(a instanceof V))throw a;});
b.inspect=function(){return"[Emscripten Module object]"}}else if(la)b.print||(b.print=print),"undefined"!=typeof printErr&&(b.printErr=printErr),b.read="undefined"!=typeof read?read:function(){throw"no read() available";},b.readBinary=function(a){if("function"===typeof readbuffer)return new Uint8Array(readbuffer(a));a=read(a,"binary");r("object"===typeof a);return a},"undefined"!=typeof scriptArgs?b.arguments=scriptArgs:"undefined"!=typeof arguments&&(b.arguments=arguments),eval("if (typeof gc === 'function' && gc.toString().indexOf('[native code]') > 0) var gc = undefined");
else if(W||Q)b.read=function(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.send(null);return b.responseText},b.readAsync=function(a,b,e){var d=new XMLHttpRequest;d.open("GET",a,!0);d.responseType="arraybuffer";d.onload=function(){200==d.status||0==d.status&&d.response?b(d.response):e()};d.onerror=e;d.send(null)},"undefined"!=typeof arguments&&(b.arguments=arguments),"undefined"!==typeof console?(b.print||(b.print=function(a){console.log(a)}),b.printErr||(b.printErr=function(a){console.warn(a)})):
b.print||(b.print=function(){}),Q&&(b.load=importScripts),"undefined"===typeof b.setWindowTitle&&(b.setWindowTitle=function(a){document.title=a});else throw"Unknown runtime environment. Where are we?";!b.load&&b.read&&(b.load=function(a){Ba(b.read(a))});b.print||(b.print=function(){});b.printErr||(b.printErr=b.print);b.arguments||(b.arguments=[]);b.thisProgram||(b.thisProgram="./this.program");b.print=b.print;b.q=b.printErr;b.preRun=[];b.postRun=[];for(K in ba)ba.hasOwnProperty(K)&&(b[K]=ba[K]);var ba=
void 0,h={S:function(a){tempRet0=a},N:function(){return tempRet0},U:function(){return B},T:function(a){B=a},o:function(a){switch(a){case "i1":case "i8":return 1;case "i16":return 2;case "i32":return 4;case "i64":return 8;case "float":return 4;case "double":return 8;default:return"*"===a[a.length-1]?h.j:"i"===a[0]?(a=parseInt(a.substr(1)),r(0===a%8),a/8):0}},L:function(a){return Math.max(h.o(a),h.j)},V:16,oa:function(a,b){"double"===b||"i64"===b?a&7&&(r(4===(a&7)),a+=4):r(0===(a&3));return a},da:function(a,
b,e){return e||"i64"!=a&&"double"!=a?a?Math.min(b||(a?h.L(a):0),h.j):Math.min(b,8):8},m:function(a,c,e){return e&&e.length?b["dynCall_"+a].apply(null,[c].concat(e)):b["dynCall_"+a].call(null,c)},i:[],C:function(a){for(var b=0;b<h.i.length;b++)if(!h.i[b])return h.i[b]=a,2*(1+b);throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.";},Q:function(a){h.i[(a-2)/2]=null},h:function(a){h.h.a||(h.h.a={});h.h.a[a]||(h.h.a[a]=1,b.q(a))},n:{},fa:function(a,b){r(b);
h.n[b]||(h.n[b]={});var e=h.n[b];e[a]||(e[a]=1===b.length?function(){return h.m(b,a)}:2===b.length?function(d){return h.m(b,a,[d])}:function(){return h.m(b,a,Array.prototype.slice.call(arguments))});return e[a]},ea:function(){throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work";},A:function(a){var b=B;B=B+a|0;B=B+15&-16;return b},B:function(a){var b=C;C=C+a|0;C=C+15&-16;return b},u:function(a){var b=p[R>>2];a=(b+a+15|0)&
-16;p[R>>2]=a;if(a=a>=N)oa(),a=!0;return a?(p[R>>2]=b,0):b},s:function(a,b){return Math.ceil(a/(b?b:16))*(b?b:16)},ma:function(a,b,e){return e?+(a>>>0)+4294967296*+(b>>>0):+(a>>>0)+4294967296*+(b|0)},e:8,j:4,W:0};h.addFunction=h.C;h.removeFunction=h.Q;var ja=0;b.getValue=Ca;var gb="undefined"!==typeof TextDecoder?new TextDecoder("utf8"):void 0;"undefined"!==typeof TextDecoder&&new TextDecoder("utf-16le");var w,H,q,M,ha,p,E,X,Y,xa,C,ya,B,ma,za,R;xa=C=ya=B=ma=za=R=0;for(var ob=b.TOTAL_STACK||5242880,
N=b.TOTAL_MEMORY||16777216,L=65536;L<N||L<2*ob;)L=16777216>L?2*L:L+16777216;L!==N&&(N=L);b.buffer?w=b.buffer:w=new ArrayBuffer(N);b.HEAP8=H=new Int8Array(w);b.HEAP16=M=new Int16Array(w);b.HEAP32=p=new Int32Array(w);b.HEAPU8=q=new Uint8Array(w);b.HEAPU16=ha=new Uint16Array(w);b.HEAPU32=E=new Uint32Array(w);b.HEAPF32=X=new Float32Array(w);b.HEAPF64=Y=new Float64Array(w);p[0]=1668509029;M[1]=25459;if(115!==q[2]||99!==q[3])throw"Runtime error: expected the system to be little-endian!";b.HEAP=void 0;b.buffer=
w;b.HEAP8=H;b.HEAP16=M;b.HEAP32=p;b.HEAPU8=q;b.HEAPU16=ha;b.HEAPU32=E;b.HEAPF32=X;b.HEAPF64=Y;var Ha=[],ua=[],xb=[],O=[],jb=[],ka=!1;Math.imul&&-5===Math.imul(4294967295,5)||(Math.imul=function(a,b){var e=a&65535,d=b&65535;return e*d+((a>>>16)*d+e*(b>>>16)<<16)|0});Math.ja=Math.imul;Math.clz32||(Math.clz32=function(a){a=a>>>0;for(var b=0;32>b;b++)if(a&1<<31-b)return b;return 32});Math.Z=Math.clz32;Math.trunc||(Math.trunc=function(a){return 0>a?Math.ceil(a):Math.floor(a)});Math.trunc=Math.trunc;var pb=
Math.abs,sb=Math.ceil,rb=Math.floor,zb=Math.pow,qb=Math.min,lb=0;b.preloadedImages={};b.preloadedAudios={};xa=8;C=xa+66464;ua.push({w:function(){Ab()}},{w:function(){Bb()}});x([0,0,0,0,0,0,0,0,0,0,0,0,0,0,224,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,248,63,0,0,0,0,0,0,4,64,0,0,0,0,0,0,18,64,0,0,0,0,0,0,33,64,0,0,0,0,0,128,48,64,0,0,0,4,107,244,52,66,0,0,0,0,0,0,0,0,0,0,0,0,0,0,224,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,248,63,0,0,0,0,0,0,0,64,0,0,0,0,0,0,4,64,0,0,0,0,0,0,18,64,0,0,0,0,0,0,33,64,0,0,0,4,107,244,
52,66,0,0,0,0,0,0,112,63,0,0,0,0,0,0,128,63,0,0,0,0,0,0,144,63,0,0,0,0,0,0,160,63,0,0,0,0,0,0,176,63,0,0,0,0,0,0,192,63,0,0,0,0,0,0,208,63,0,0,0,0,0,0,224,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,64,0,0,0,0,0,0,16,64,0,0,0,0,0,0,32,64,0,0,0,0,0,0,48,64,0,0,0,0,0,0,64,64,0,0,0,0,0,0,80,64,0,0,0,0,0,0,96,64,192,233,0,0,37,241,0,0,0,0,0,0,1,0,0,0,200,1,0,0,0,0,0,0,192,233,0,0,230,240,0,0,0,0,0,0,1,0,0,0,200,1,0,0,0,0,0,0,192,233,0,0,129,240,0,0,0,0,0,0,1,0,0,0,200,1,0,0,0,0,0,0,84,233,0,0,110,240,0,0,84,
233,0,0,79,240,0,0,84,233,0,0,118,239,0,0,84,233,0,0,87,239,0,0,84,233,0,0,56,239,0,0,84,233,0,0,25,239,0,0,84,233,0,0,250,238,0,0,84,233,0,0,149,239,0,0,84,233,0,0,180,239,0,0,84,233,0,0,211,239,0,0,84,233,0,0,242,239,0,0,84,233,0,0,17,240,0,0,84,233,0,0,48,240,0,0,84,233,0,0,192,240,0,0,84,233,0,0,111,251,0,0,124,233,0,0,207,251,0,0,232,1,0,0,0,0,0,0,124,233,0,0,124,251,0,0,248,1,0,0,0,0,0,0,84,233,0,0,157,251,0,0,124,233,0,0,170,251,0,0,216,1,0,0,0,0,0,0,124,233,0,0,213,252,0,0,232,1,0,0,0,0,0,
0,124,233,0,0,177,252,0,0,16,2,0,0,0,0,0,0,124,233,0,0,247,252,0,0,232,1,0,0,0,0,0,0,164,233,0,0,31,253,0,0,164,233,0,0,33,253,0,0,164,233,0,0,35,253,0,0,164,233,0,0,37,253,0,0,164,233,0,0,39,253,0,0,164,233,0,0,41,253,0,0,164,233,0,0,43,253,0,0,164,233,0,0,45,253,0,0,164,233,0,0,47,253,0,0,164,233,0,0,49,253,0,0,164,233,0,0,51,253,0,0,164,233,0,0,53,253,0,0,164,233,0,0,55,253,0,0,124,233,0,0,57,253,0,0,216,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,3,0,0,0,7,0,0,0,15,0,0,0,31,0,0,0,63,0,0,0,127,0,0,0,255,0,0,
0,255,1,0,0,255,3,0,0,255,7,0,0,255,15,0,0,255,31,0,0,255,63,0,0,255,127,0,0,255,255,0,0,255,255,1,0,255,255,3,0,255,255,7,0,255,255,15,0,255,255,31,0,255,255,63,0,255,255,127,0,255,255,255,0,255,255,255,1,255,255,255,3,255,255,255,7,255,255,255,15,255,255,255,31,255,255,255,63,255,255,255,127,255,255,255,255,0,0,0,0,183,29,193,4,110,59,130,9,217,38,67,13,220,118,4,19,107,107,197,23,178,77,134,26,5,80,71,30,184,237,8,38,15,240,201,34,214,214,138,47,97,203,75,43,100,155,12,53,211,134,205,49,10,160,
142,60,189,189,79,56,112,219,17,76,199,198,208,72,30,224,147,69,169,253,82,65,172,173,21,95,27,176,212,91,194,150,151,86,117,139,86,82,200,54,25,106,127,43,216,110,166,13,155,99,17,16,90,103,20,64,29,121,163,93,220,125,122,123,159,112,205,102,94,116,224,182,35,152,87,171,226,156,142,141,161,145,57,144,96,149,60,192,39,139,139,221,230,143,82,251,165,130,229,230,100,134,88,91,43,190,239,70,234,186,54,96,169,183,129,125,104,179,132,45,47,173,51,48,238,169,234,22,173,164,93,11,108,160,144,109,50,212,
39,112,243,208,254,86,176,221,73,75,113,217,76,27,54,199,251,6,247,195,34,32,180,206,149,61,117,202,40,128,58,242,159,157,251,246,70,187,184,251,241,166,121,255,244,246,62,225,67,235,255,229,154,205,188,232,45,208,125,236,119,112,134,52,192,109,71,48,25,75,4,61,174,86,197,57,171,6,130,39,28,27,67,35,197,61,0,46,114,32,193,42,207,157,142,18,120,128,79,22,161,166,12,27,22,187,205,31,19,235,138,1,164,246,75,5,125,208,8,8,202,205,201,12,7,171,151,120,176,182,86,124,105,144,21,113,222,141,212,117,219,
221,147,107,108,192,82,111,181,230,17,98,2,251,208,102,191,70,159,94,8,91,94,90,209,125,29,87,102,96,220,83,99,48,155,77,212,45,90,73,13,11,25,68,186,22,216,64,151,198,165,172,32,219,100,168,249,253,39,165,78,224,230,161,75,176,161,191,252,173,96,187,37,139,35,182,146,150,226,178,47,43,173,138,152,54,108,142,65,16,47,131,246,13,238,135,243,93,169,153,68,64,104,157,157,102,43,144,42,123,234,148,231,29,180,224,80,0,117,228,137,38,54,233,62,59,247,237,59,107,176,243,140,118,113,247,85,80,50,250,226,
77,243,254,95,240,188,198,232,237,125,194,49,203,62,207,134,214,255,203,131,134,184,213,52,155,121,209,237,189,58,220,90,160,251,216,238,224,12,105,89,253,205,109,128,219,142,96,55,198,79,100,50,150,8,122,133,139,201,126,92,173,138,115,235,176,75,119,86,13,4,79,225,16,197,75,56,54,134,70,143,43,71,66,138,123,0,92,61,102,193,88,228,64,130,85,83,93,67,81,158,59,29,37,41,38,220,33,240,0,159,44,71,29,94,40,66,77,25,54,245,80,216,50,44,118,155,63,155,107,90,59,38,214,21,3,145,203,212,7,72,237,151,10,255,
240,86,14,250,160,17,16,77,189,208,20,148,155,147,25,35,134,82,29,14,86,47,241,185,75,238,245,96,109,173,248,215,112,108,252,210,32,43,226,101,61,234,230,188,27,169,235,11,6,104,239,182,187,39,215,1,166,230,211,216,128,165,222,111,157,100,218,106,205,35,196,221,208,226,192,4,246,161,205,179,235,96,201,126,141,62,189,201,144,255,185,16,182,188,180,167,171,125,176,162,251,58,174,21,230,251,170,204,192,184,167,123,221,121,163,198,96,54,155,113,125,247,159,168,91,180,146,31,70,117,150,26,22,50,136,173,
11,243,140,116,45,176,129,195,48,113,133,153,144,138,93,46,141,75,89,247,171,8,84,64,182,201,80,69,230,142,78,242,251,79,74,43,221,12,71,156,192,205,67,33,125,130,123,150,96,67,127,79,70,0,114,248,91,193,118,253,11,134,104,74,22,71,108,147,48,4,97,36,45,197,101,233,75,155,17,94,86,90,21,135,112,25,24,48,109,216,28,53,61,159,2,130,32,94,6,91,6,29,11,236,27,220,15,81,166,147,55,230,187,82,51,63,157,17,62,136,128,208,58,141,208,151,36,58,205,86,32,227,235,21,45,84,246,212,41,121,38,169,197,206,59,104,
193,23,29,43,204,160,0,234,200,165,80,173,214,18,77,108,210,203,107,47,223,124,118,238,219,193,203,161,227,118,214,96,231,175,240,35,234,24,237,226,238,29,189,165,240,170,160,100,244,115,134,39,249,196,155,230,253,9,253,184,137,190,224,121,141,103,198,58,128,208,219,251,132,213,139,188,154,98,150,125,158,187,176,62,147,12,173,255,151,177,16,176,175,6,13,113,171,223,43,50,166,104,54,243,162,109,102,180,188,218,123,117,184,3,93,54,181,180,64,247,177,92,7,0,0,220,7,0,0,220,8,0,0,220,10,0,0,220,14,0,
0,220,22,0,0,220,38,0,0,220,70,0,0,24,0,120,58,76,70,11,60,242,204,192,60,116,252,59,61,86,73,154,61,241,93,228,61,248,163,29,62,180,231,78,62,54,157,130,62,78,220,159,62,193,174,190,62,65,132,222,62,173,194,254,62,186,101,15,63,248,0,31,63,29,233,45,63,249,219,59,63,45,162,72,63,160,17,84,63,38,15,94,63,46,143,102,63,112,149,109,63,174,51,115,63,159,135,119,63,66,184,122,63,196,242,124,63,75,103,126,63,196,69,127,63,241,186,127,63,217,237,127,63,162,253,127,63,248,255,127,63,168,9,120,57,17,119,
11,59,135,139,193,59,74,113,61,60,148,82,156,60,94,8,233,60,42,83,34,61,74,118,87,61,138,227,137,61,7,140,171,61,34,154,208,61,108,239,248,61,164,52,18,62,100,112,41,62,65,21,66,62,67,11,92,62,47,56,119,62,197,191,137,62,92,97,152,62,135,112,167,62,4,220,182,62,188,145,198,62,231,126,214,62,48,144,230,62,227,177,246,62,13,104,3,63,121,107,11,63,98,89,19,63,42,40,27,63,137,206,34,63,166,67,42,63,49,127,49,63,126,121,56,63,153,43,63,63,92,143,69,63,127,159,75,63,165,87,81,63,104,180,86,63,89,179,91,
63,8,83,96,63,252,146,100,63,177,115,104,63,138,246,107,63,198,29,111,63,109,236,113,63,62,102,116,63,154,143,118,63,104,109,120,63,3,5,122,63,26,92,123,63,153,120,124,63,143,96,125,63,17,26,126,63,39,171,126,63,176,25,127,63,74,107,127,63,68,165,127,63,132,204,127,63,123,229,127,63,17,244,127,63,158,251,127,63,219,254,127,63,218,255,127,63,0,0,128,63,5,12,120,56,50,131,11,58,118,186,193,58,226,203,61,59,38,207,156,59,139,32,234,59,245,102,35,60,63,100,89,60,184,127,139,60,59,23,174,60,239,114,212,
60,96,140,254,60,45,46,22,61,114,237,46,61,155,127,73,61,220,223,101,61,123,4,130,61,159,250,145,61,71,207,162,61,38,127,180,61,173,6,199,61,16,98,218,61,63,141,238,61,244,193,1,62,185,160,12,62,128,224,23,62,182,126,35,62,166,120,47,62,116,203,59,62,34,116,72,62,141,111,85,62,107,186,98,62,83,81,112,62,180,48,126,62,110,42,134,62,252,92,141,62,9,174,148,62,138,27,156,62,100,163,163,62,112,67,171,62,119,249,178,62,54,195,186,62,93,158,194,62,147,136,202,62,118,127,210,62,154,128,218,62,142,137,226,
62,217,151,234,62,2,169,242,62,139,186,250,62,251,100,1,63,99,106,5,63,65,108,9,63,89,105,13,63,116,96,17,63,94,80,21,63,231,55,25,63,231,21,29,63,58,233,32,63,197,176,36,63,116,107,40,63,62,24,44,63,35,182,47,63,43,68,51,63,109,193,54,63,10,45,58,63,48,134,61,63,26,204,64,63,17,254,67,63,107,27,71,63,142,35,74,63,238,21,77,63,15,242,79,63,132,183,82,63,239,101,85,63,3,253,87,63,129,124,90,63,60,228,92,63,21,52,95,63,254,107,97,63,246,139,99,63,14,148,101,63,98,132,103,63,33,93,105,63,133,30,107,
63,213,200,108,63,103,92,110,63,155,217,111,63,224,64,113,63,172,146,114,63,131,207,115,63,241,247,116,63,139,12,118,63,239,13,119,63,193,252,119,63,172,217,120,63,99,165,121,63,155,96,122,63,15,12,123,63,124,168,123,63,163,54,124,63,71,183,124,63,41,43,125,63,13,147,125,63,183,239,125,63,229,65,126,63,89,138,126,63,205,201,126,63,251,0,127,63,150,48,127,63,78,89,127,63,205,123,127,63,182,152,127,63,167,176,127,63,53,196,127,63,239,211,127,63,91,224,127,63,245,233,127,63,51,241,127,63,127,246,127,
63,59,250,127,63,190,252,127,63,84,254,127,63,64,255,127,63,186,255,127,63,238,255,127,63,254,255,127,63,0,0,128,63,169,12,120,55,54,134,11,57,38,198,193,57,94,226,61,58,234,237,156,58,85,101,234,58,56,170,35,59,207,219,89,59,169,226,139,59,42,178,174,59,13,91,213,59,204,219,255,59,91,25,23,60,250,46,48,60,194,45,75,60,156,20,104,60,46,113,131,60,225,202,147,60,185,22,165,60,1,84,183,60,245,129,202,60,198,159,222,60,155,172,243,60,199,211,4,61,213,71,16,61,250,49,28,61,174,145,40,61,101,102,53,61,
141,175,66,61,140,108,80,61,193,156,94,61,133,63,109,61,41,84,124,61,252,236,133,61,26,232,141,61,13,27,150,61,110,133,158,61,212,38,167,61,210,254,175,61,245,12,185,61,200,80,194,61,209,201,203,61,146,119,213,61,139,89,223,61,51,111,233,61,2,184,243,61,105,51,254,61,106,112,4,62,214,223,9,62,171,103,15,62,153,7,21,62,77,191,26,62,116,142,32,62,181,116,38,62,184,113,44,62,34,133,50,62,149,174,56,62,178,237,62,62,21,66,69,62,92,171,75,62,30,41,82,62,243,186,88,62,112,96,95,62,40,25,102,62,170,228,
108,62,132,194,115,62,68,178,122,62,185,217,128,62,203,98,132,62,26,244,135,62,105,141,139,62,120,46,143,62,6,215,146,62,211,134,150,62,156,61,154,62,29,251,157,62,19,191,161,62,57,137,165,62,71,89,169,62,249,46,173,62,5,10,177,62,36,234,180,62,13,207,184,62,117,184,188,62,18,166,192,62,153,151,196,62,190,140,200,62,52,133,204,62,175,128,208,62,225,126,212,62,125,127,216,62,52,130,220,62,184,134,224,62,185,140,228,62,233,147,232,62,248,155,236,62,150,164,240,62,117,173,244,62,67,182,248,62,178,190,
252,62,57,99,0,63,153,102,2,63,82,105,4,63,60,107,6,63,48,108,8,63,6,108,10,63,151,106,12,63,188,103,14,63,78,99,16,63,39,93,18,63,33,85,20,63,21,75,22,63,222,62,24,63,87,48,26,63,92,31,28,63,199,11,30,63,117,245,31,63,66,220,33,63,12,192,35,63,176,160,37,63,12,126,39,63,254,87,41,63,104,46,43,63,39,1,45,63,29,208,46,63,43,155,48,63,51,98,50,63,23,37,52,63,188,227,53,63,4,158,55,63,214,83,57,63,23,5,59,63,173,177,60,63,128,89,62,63,120,252,63,63,126,154,65,63,124,51,67,63,93,199,68,63,12,86,70,63,
119,223,71,63,138,99,73,63,54,226,74,63,104,91,76,63,17,207,77,63,35,61,79,63,145,165,80,63,76,8,82,63,75,101,83,63,130,188,84,63,231,13,86,63,114,89,87,63,26,159,88,63,218,222,89,63,172,24,91,63,138,76,92,63,113,122,93,63,93,162,94,63,78,196,95,63,67,224,96,63,58,246,97,63,54,6,99,63,56,16,100,63,67,20,101,63,92,18,102,63,133,10,103,63,198,252,103,63,37,233,104,63,168,207,105,63,89,176,106,63,64,139,107,63,102,96,108,63,216,47,109,63,159,249,109,63,201,189,110,63,97,124,111,63,118,53,112,63,23,233,
112,63,81,151,113,63,53,64,114,63,212,227,114,63,61,130,115,63,131,27,116,63,184,175,116,63,238,62,117,63,56,201,117,63,171,78,118,63,90,207,118,63,90,75,119,63,192,194,119,63,162,53,120,63,21,164,120,63,48,14,121,63,8,116,121,63,182,213,121,63,79,51,122,63,235,140,122,63,162,226,122,63,139,52,123,63,191,130,123,63,85,205,123,63,102,20,124,63,9,88,124,63,88,152,124,63,106,213,124,63,88,15,125,63,58,70,125,63,41,122,125,63,62,171,125,63,143,217,125,63,54,5,126,63,75,46,126,63,228,84,126,63,27,121,
126,63,7,155,126,63,190,186,126,63,88,216,126,63,236,243,126,63,144,13,127,63,91,37,127,63,99,59,127,63,188,79,127,63,125,98,127,63,185,115,127,63,135,131,127,63,249,145,127,63,36,159,127,63,26,171,127,63,238,181,127,63,179,191,127,63,122,200,127,63,85,208,127,63,84,215,127,63,136,221,127,63,0,227,127,63,204,231,127,63,249,235,127,63,150,239,127,63,177,242,127,63,85,245,127,63,144,247,127,63,109,249,127,63,246,250,127,63,54,252,127,63,55,253,127,63,1,254,127,63,156,254,127,63,18,255,127,63,103,255,
127,63,163,255,127,63,204,255,127,63,229,255,127,63,244,255,127,63,252,255,127,63,255,255,127,63,0,0,128,63,0,0,128,63,60,12,120,54,253,134,11,56,19,201,193,56,248,231,61,57,148,245,156,57,115,118,234,57,238,186,35,58,113,249,89,58,32,251,139,58,96,216,174,58,34,148,213,58,3,23,0,59,209,82,23,59,65,125,48,59,21,150,75,59,8,157,104,59,233,200,131,59,20,58,148,59,218,161,165,59,16,0,184,59,136,84,203,59,16,159,223,59,118,223,244,59,194,138,5,60,128,32,17,60,217,48,29,60,172,187,41,60,219,192,54,60,
67,64,68,60,194,57,82,60,52,173,96,60,115,154,111,60,88,1,127,60,222,112,135,60,186,157,143,60,42,7,152,60,25,173,160,60,112,143,169,60,23,174,178,60,246,8,188,60,243,159,197,60,245,114,207,60,225,129,217,60,156,204,227,60,10,83,238,60,14,21,249,60,70,9,2,61,177,165,7,61,187,95,13,61,81,55,19,61,102,44,25,61,230,62,31,61,195,110,37,61,233,187,43,61,71,38,50,61,202,173,56,61,97,82,63,61,247,19,70,61,121,242,76,61,210,237,83,61,240,5,91,61,187,58,98,61,32,140,105,61,8,250,112,61,93,132,120,61,132,21,
128,61,249,246,131,61,130,230,135,61,19,228,139,61,159,239,143,61,26,9,148,61,119,48,152,61,169,101,156,61,163,168,160,61,88,249,164,61,186,87,169,61,186,195,173,61,76,61,178,61,95,196,182,61,230,88,187,61,209,250,191,61,18,170,196,61,152,102,201,61,85,48,206,61,56,7,211,61,48,235,215,61,47,220,220,61,34,218,225,61,248,228,230,61,161,252,235,61,11,33,241,61,35,82,246,61,217,143,251,61,13,109,0,62,105,24,3,62,247,201,5,62,174,129,8,62,133,63,11,62,113,3,14,62,104,205,16,62,96,157,19,62,79,115,22,62,
42,79,25,62,232,48,28,62,124,24,31,62,221,5,34,62,255,248,36,62,215,241,39,62,90,240,42,62,125,244,45,62,51,254,48,62,114,13,52,62,45,34,55,62,88,60,58,62,232,91,61,62,208,128,64,62,3,171,67,62,118,218,70,62,26,15,74,62,229,72,77,62,199,135,80,62,181,203,83,62,162,20,87,62,127,98,90,62,63,181,93,62,213,12,97,62,50,105,100,62,73,202,103,62,12,48,107,62,108,154,110,62,92,9,114,62,203,124,117,62,173,244,120,62,241,112,124,62,138,241,127,62,52,187,129,62,190,127,131,62,91,70,133,62,4,15,135,62,176,217,
136,62,89,166,138,62,245,116,140,62,126,69,142,62,234,23,144,62,50,236,145,62,78,194,147,62,54,154,149,62,224,115,151,62,70,79,153,62,93,44,155,62,31,11,157,62,130,235,158,62,127,205,160,62,11,177,162,62,31,150,164,62,177,124,166,62,186,100,168,62,47,78,170,62,9,57,172,62,62,37,174,62,198,18,176,62,150,1,178,62,167,241,179,62,238,226,181,62,100,213,183,62,254,200,185,62,179,189,187,62,122,179,189,62,74,170,191,62,25,162,193,62,221,154,195,62,142,148,197,62,34,143,199,62,142,138,201,62,203,134,203,
62,205,131,205,62,140,129,207,62,253,127,209,62,24,127,211,62,210,126,213,62,33,127,215,62,252,127,217,62,88,129,219,62,45,131,221,62,112,133,223,62,23,136,225,62,25,139,227,62,108,142,229,62,5,146,231,62,219,149,233,62,228,153,235,62,21,158,237,62,102,162,239,62,203,166,241,62,59,171,243,62,173,175,245,62,21,180,247,62,107,184,249,62,164,188,251,62,181,192,253,62,150,196,255,62,30,228,0,63,207,229,1,63,88,231,2,63,182,232,3,63,226,233,4,63,215,234,5,63,146,235,6,63,12,236,7,63,66,236,8,63,45,236,
9,63,202,235,10,63,19,235,11,63,4,234,12,63,151,232,13,63,200,230,14,63,145,228,15,63,239,225,16,63,220,222,17,63,84,219,18,63,81,215,19,63,208,210,20,63,202,205,21,63,61,200,22,63,34,194,23,63,117,187,24,63,50,180,25,63,85,172,26,63,215,163,27,63,182,154,28,63,236,144,29,63,117,134,30,63,77,123,31,63,110,111,32,63,214,98,33,63,126,85,34,63,100,71,35,63,130,56,36,63,212,40,37,63,87,24,38,63,5,7,39,63,219,244,39,63,213,225,40,63,239,205,41,63,36,185,42,63,113,163,43,63,209,140,44,63,64,117,45,63,188,
92,46,63,63,67,47,63,199,40,48,63,78,13,49,63,211,240,49,63,80,211,50,63,195,180,51,63,39,149,52,63,122,116,53,63,184,82,54,63,220,47,55,63,229,11,56,63,206,230,56,63,149,192,57,63,54,153,58,63,174,112,59,63,249,70,60,63,21,28,61,63,255,239,61,63,179,194,62,63,48,148,63,63,113,100,64,63,116,51,65,63,55,1,66,63,182,205,66,63,239,152,67,63,224,98,68,63,134,43,69,63,222,242,69,63,230,184,70,63,156,125,71,63,253,64,72,63,7,3,73,63,184,195,73,63,14,131,74,63,6,65,75,63,159,253,75,63,215,184,76,63,172,
114,77,63,28,43,78,63,38,226,78,63,199,151,79,63,253,75,80,63,201,254,80,63,39,176,81,63,22,96,82,63,150,14,83,63,164,187,83,63,63,103,84,63,103,17,85,63,26,186,85,63,86,97,86,63,28,7,87,63,105,171,87,63,62,78,88,63,152,239,88,63,120,143,89,63,221,45,90,63,198,202,90,63,50,102,91,63,33,0,92,63,147,152,92,63,134,47,93,63,251,196,93,63,242,88,94,63,105,235,94,63,98,124,95,63,219,11,96,63,213,153,96,63,80,38,97,63,76,177,97,63,201,58,98,63,199,194,98,63,70,73,99,63,71,206,99,63,202,81,100,63,208,211,
100,63,88,84,101,63,100,211,101,63,244,80,102,63,9,205,102,63,163,71,103,63,195,192,103,63,107,56,104,63,154,174,104,63,82,35,105,63,147,150,105,63,96,8,106,63,184,120,106,63,157,231,106,63,16,85,107,63,19,193,107,63,166,43,108,63,203,148,108,63,132,252,108,63,209,98,109,63,180,199,109,63,48,43,110,63,68,141,110,63,244,237,110,63,64,77,111,63,42,171,111,63,181,7,112,63,225,98,112,63,177,188,112,63,38,21,113,63,67,108,113,63,10,194,113,63,123,22,114,63,155,105,114,63,106,187,114,63,234,11,115,63,31,
91,115,63,9,169,115,63,172,245,115,63,9,65,116,63,35,139,116,63,252,211,116,63,151,27,117,63,245,97,117,63,26,167,117,63,8,235,117,63,193,45,118,63,72,111,118,63,159,175,118,63,202,238,118,63,201,44,119,63,161,105,119,63,84,165,119,63,228,223,119,63,85,25,120,63,168,81,120,63,226,136,120,63,3,191,120,63,16,244,120,63,11,40,121,63,247,90,121,63,215,140,121,63,173,189,121,63,125,237,121,63,73,28,122,63,20,74,122,63,226,118,122,63,181,162,122,63,144,205,122,63,118,247,122,63,107,32,123,63,112,72,123,
63,138,111,123,63,186,149,123,63,5,187,123,63,109,223,123,63,245,2,124,63,160,37,124,63,113,71,124,63,108,104,124,63,147,136,124,63,233,167,124,63,114,198,124,63,48,228,124,63,38,1,125,63,89,29,125,63,201,56,125,63,124,83,125,63,115,109,125,63,178,134,125,63,60,159,125,63,19,183,125,63,60,206,125,63,184,228,125,63,139,250,125,63,184,15,126,63,66,36,126,63,44,56,126,63,120,75,126,63,43,94,126,63,70,112,126,63,204,129,126,63,194,146,126,63,41,163,126,63,4,179,126,63,86,194,126,63,35,209,126,63,109,
223,126,63,55,237,126,63,131,250,126,63,85,7,127,63,175,19,127,63,148,31,127,63,7,43,127,63,10,54,127,63,160,64,127,63,205,74,127,63,146,84,127,63,242,93,127,63,239,102,127,63,141,111,127,63,206,119,127,63,181,127,127,63,67,135,127,63,124,142,127,63,98,149,127,63,247,155,127,63,61,162,127,63,56,168,127,63,233,173,127,63,83,179,127,63,120,184,127,63,90,189,127,63,252,193,127,63,95,198,127,63,134,202,127,63,116,206,127,63,41,210,127,63,168,213,127,63,244,216,127,63,13,220,127,63,247,222,127,63,179,
225,127,63,67,228,127,63,168,230,127,63,229,232,127,63,252,234,127,63,237,236,127,63,188,238,127,63,105,240,127,63,246,241,127,63,101,243,127,63,183,244,127,63,238,245,127,63,11,247,127,63,16,248,127,63,254,248,127,63,214,249,127,63,155,250,127,63,76,251,127,63,236,251,127,63,124,252,127,63,252,252,127,63,110,253,127,63,211,253,127,63,44,254,127,63,121,254,127,63,189,254,127,63,247,254,127,63,42,255,127,63,84,255,127,63,120,255,127,63,150,255,127,63,175,255,127,63,195,255,127,63,211,255,127,63,224,
255,127,63,234,255,127,63,241,255,127,63,246,255,127,63,250,255,127,63,253,255,127,63,254,255,127,63,255,255,127,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,171,15,120,53,24,135,11,55,225,201,193,55,107,233,61,56,128,247,156,56,187,122,234,56,24,191,35,57,213,0,90,57,56,1,140,57,229,225,174,57,88,162,213,57,60,33,0,58,24,97,23,58,175,144,48,58,243,175,75,58,212,190,104,58,159,222,131,58,143,85,148,58,48,196,165,58,119,42,184,58,90,136,203,58,204,221,223,58,191,42,245,58,148,183,5,59,124,85,17,
59,16,111,29,59,73,4,42,59,31,21,55,59,138,161,68,59,129,169,82,59,252,44,97,59,241,43,112,59,88,166,127,59,19,206,135,59,169,6,144,59,233,124,152,59,204,48,161,59,79,34,170,59,106,81,179,59,26,190,188,59,86,104,198,59,26,80,208,59,95,117,218,59,31,216,228,59,83,120,239,59,244,85,250,59,126,184,2,60,177,100,8,60,145,47,14,60,25,25,20,60,70,33,26,60,19,72,32,60,126,141,38,60,129,241,44,60,25,116,51,60,65,21,58,60,246,212,64,60,50,179,71,60,243,175,78,60,50,203,85,60,235,4,93,60,26,93,100,60,186,211,
107,60,198,104,115,60,58,28,123,60,7,119,129,60,33,111,133,60,102,118,137,60,212,140,141,60,105,178,145,60,33,231,149,60,251,42,154,60,243,125,158,60,6,224,162,60,50,81,167,60,115,209,171,60,199,96,176,60,43,255,180,60,154,172,185,60,19,105,190,60,146,52,195,60,20,15,200,60,149,248,204,60,19,241,209,60,137,248,214,60,245,14,220,60,83,52,225,60,160,104,230,60,215,171,235,60,246,253,240,60,249,94,246,60,220,206,251,60,205,166,0,61,153,109,3,61,207,59,6,61,109,17,9,61,114,238,11,61,220,210,14,61,167,
190,17,61,211,177,20,61,94,172,23,61,68,174,26,61,133,183,29,61,30,200,32,61,12,224,35,61,78,255,38,61,225,37,42,61,196,83,45,61,243,136,48,61,109,197,51,61,47,9,55,61,55,84,58,61,130,166,61,61,15,0,65,61,218,96,68,61,226,200,71,61,35,56,75,61,156,174,78,61,73,44,82,61,40,177,85,61,55,61,89,61,115,208,92,61,217,106,96,61,103,12,100,61,25,181,103,61,238,100,107,61,227,27,111,61,244,217,114,61,30,159,118,61,96,107,122,61,182,62,126,61,143,12,129,61,73,253,130,61,138,241,132,61,79,233,134,61,150,228,
136,61,94,227,138,61,167,229,140,61,109,235,142,61,175,244,144,61,109,1,147,61,164,17,149,61,83,37,151,61,120,60,153,61,17,87,155,61,30,117,157,61,155,150,159,61,136,187,161,61,226,227,163,61,169,15,166,61,218,62,168,61,116,113,170,61,116,167,172,61,218,224,174,61,162,29,177,61,205,93,179,61,87,161,181,61,62,232,183,61,130,50,186,61,32,128,188,61,22,209,190,61,98,37,193,61,2,125,195,61,245,215,197,61,57,54,200,61,203,151,202,61,169,252,204,61,211,100,207,61,68,208,209,61,252,62,212,61,249,176,214,
61,56,38,217,61,184,158,219,61,117,26,222,61,111,153,224,61,163,27,227,61,14,161,229,61,175,41,232,61,132,181,234,61,138,68,237,61,191,214,239,61,33,108,242,61,174,4,245,61,99,160,247,61,62,63,250,61,61,225,252,61,93,134,255,61,78,23,1,62,252,108,2,62,56,196,3,62,255,28,5,62,81,119,6,62,45,211,7,62,145,48,9,62,125,143,10,62,238,239,11,62,228,81,13,62,94,181,14,62,89,26,16,62,214,128,17,62,210,232,18,62,77,82,20,62,69,189,21,62,184,41,23,62,166,151,24,62,13,7,26,62,236,119,27,62,65,234,28,62,11,94,
30,62,73,211,31,62,250,73,33,62,28,194,34,62,173,59,36,62,172,182,37,62,24,51,39,62,240,176,40,62,50,48,42,62,220,176,43,62,238,50,45,62,101,182,46,62,64,59,48,62,126,193,49,62,30,73,51,62,29,210,52,62,123,92,54,62,54,232,55,62,76,117,57,62,187,3,59,62,131,147,60,62,162,36,62,62,22,183,63,62,222,74,65,62,248,223,66,62,98,118,68,62,28,14,70,62,35,167,71,62,117,65,73,62,18,221,74,62,247,121,76,62,35,24,78,62,149,183,79,62,74,88,81,62,66,250,82,62,121,157,84,62,240,65,86,62,163,231,87,62,146,142,89,
62,186,54,91,62,26,224,92,62,177,138,94,62,124,54,96,62,122,227,97,62,169,145,99,62,7,65,101,62,147,241,102,62,75,163,104,62,44,86,106,62,54,10,108,62,102,191,109,62,187,117,111,62,51,45,113,62,204,229,114,62,132,159,116,62,90,90,118,62,75,22,120,62,85,211,121,62,120,145,123,62,176,80,125,62,253,16,127,62,46,105,128,62,101,74,129,62,36,44,130,62,105,14,131,62,52,241,131,62,130,212,132,62,84,184,133,62,169,156,134,62,127,129,135,62,213,102,136,62,171,76,137,62,255,50,138,62,209,25,139,62,32,1,140,
62,233,232,140,62,46,209,141,62,236,185,142,62,34,163,143,62,208,140,144,62,244,118,145,62,142,97,146,62,156,76,147,62,29,56,148,62,17,36,149,62,118,16,150,62,76,253,150,62,144,234,151,62,67,216,152,62,99,198,153,62,239,180,154,62,230,163,155,62,71,147,156,62,17,131,157,62,67,115,158,62,219,99,159,62,218,84,160,62,60,70,161,62,3,56,162,62,43,42,163,62,181,28,164,62,160,15,165,62,233,2,166,62,145,246,166,62,149,234,167,62,245,222,168,62,176,211,169,62,197,200,170,62,50,190,171,62,246,179,172,62,17,
170,173,62,129,160,174,62,69,151,175,62,91,142,176,62,196,133,177,62,125,125,178,62,133,117,179,62,220,109,180,62,128,102,181,62,112,95,182,62,171,88,183,62,47,82,184,62,252,75,185,62,17,70,186,62,108,64,187,62,11,59,188,62,239,53,189,62,22,49,190,62,126,44,191,62,38,40,192,62,13,36,193,62,51,32,194,62,150,28,195,62,52,25,196,62,12,22,197,62,30,19,198,62,104,16,199,62,233,13,200,62,159,11,201,62,138,9,202,62,169,7,203,62,249,5,204,62,123,4,205,62,44,3,206,62,11,2,207,62,24,1,208,62,81,0,209,62,181,
255,209,62,66,255,210,62,248,254,211,62,213,254,212,62,216,254,213,62,255,254,214,62,75,255,215,62,184,255,216,62,71,0,218,62,245,0,219,62,195,1,220,62,173,2,221,62,180,3,222,62,214,4,223,62,17,6,224,62,101,7,225,62,208,8,226,62,81,10,227,62,231,11,228,62,144,13,229,62,76,15,230,62,25,17,231,62,245,18,232,62,224,20,233,62,217,22,234,62,221,24,235,62,236,26,236,62,5,29,237,62,39,31,238,62,79,33,239,62,125,35,240,62,176,37,241,62,230,39,242,62,31,42,243,62,88,44,244,62,145,46,245,62,200,48,246,62,253,
50,247,62,45,53,248,62,88,55,249,62,124,57,250,62,153,59,251,62,172,61,252,62,181,63,253,62,179,65,254,62,163,67,255,62,195,34,0,63,173,163,0,63,142,36,1,63,102,165,1,63,53,38,2,63,250,166,2,63,180,39,3,63,99,168,3,63,5,41,4,63,155,169,4,63,36,42,5,63,159,170,5,63,12,43,6,63,105,171,6,63,183,43,7,63,244,171,7,63,32,44,8,63,59,172,8,63,68,44,9,63,58,172,9,63,28,44,10,63,235,171,10,63,164,43,11,63,73,171,11,63,216,42,12,63,80,170,12,63,177,41,13,63,251,168,13,63,44,40,14,63,69,167,14,63,68,38,15,63,
41,165,15,63,243,35,16,63,162,162,16,63,53,33,17,63,172,159,17,63,5,30,18,63,65,156,18,63,95,26,19,63,94,152,19,63,61,22,20,63,252,147,20,63,155,17,21,63,24,143,21,63,116,12,22,63,173,137,22,63,195,6,23,63,182,131,23,63,133,0,24,63,46,125,24,63,179,249,24,63,18,118,25,63,74,242,25,63,91,110,26,63,69,234,26,63,6,102,27,63,159,225,27,63,14,93,28,63,84,216,28,63,111,83,29,63,95,206,29,63,36,73,30,63,188,195,30,63,40,62,31,63,102,184,31,63,119,50,32,63,90,172,32,63,14,38,33,63,146,159,33,63,230,24,34,
63,10,146,34,63,253,10,35,63,190,131,35,63,77,252,35,63,169,116,36,63,211,236,36,63,200,100,37,63,138,220,37,63,22,84,38,63,110,203,38,63,143,66,39,63,122,185,39,63,47,48,40,63,172,166,40,63,241,28,41,63,254,146,41,63,210,8,42,63,108,126,42,63,205,243,42,63,243,104,43,63,223,221,43,63,143,82,44,63,3,199,44,63,59,59,45,63,54,175,45,63,244,34,46,63,116,150,46,63,182,9,47,63,185,124,47,63,125,239,47,63,1,98,48,63,69,212,48,63,72,70,49,63,10,184,49,63,139,41,50,63,202,154,50,63,198,11,51,63,127,124,51,
63,246,236,51,63,40,93,52,63,22,205,52,63,191,60,53,63,36,172,53,63,66,27,54,63,27,138,54,63,174,248,54,63,249,102,55,63,254,212,55,63,187,66,56,63,47,176,56,63,91,29,57,63,63,138,57,63,217,246,57,63,41,99,58,63,48,207,58,63,236,58,59,63,93,166,59,63,130,17,60,63,93,124,60,63,235,230,60,63,44,81,61,63,33,187,61,63,201,36,62,63,35,142,62,63,48,247,62,63,238,95,63,63,94,200,63,63,126,48,64,63,80,152,64,63,209,255,64,63,3,103,65,63,228,205,65,63,117,52,66,63,181,154,66,63,163,0,67,63,64,102,67,63,139,
203,67,63,131,48,68,63,41,149,68,63,124,249,68,63,123,93,69,63,39,193,69,63,127,36,70,63,132,135,70,63,51,234,70,63,142,76,71,63,148,174,71,63,68,16,72,63,159,113,72,63,164,210,72,63,83,51,73,63,172,147,73,63,174,243,73,63,89,83,74,63,173,178,74,63,169,17,75,63,77,112,75,63,154,206,75,63,143,44,76,63,43,138,76,63,110,231,76,63,89,68,77,63,234,160,77,63,34,253,77,63,0,89,78,63,133,180,78,63,176,15,79,63,128,106,79,63,246,196,79,63,18,31,80,63,210,120,80,63,56,210,80,63,66,43,81,63,242,131,81,63,69,
220,81,63,61,52,82,63,217,139,82,63,24,227,82,63,252,57,83,63,131,144,83,63,174,230,83,63,123,60,84,63,236,145,84,63,0,231,84,63,183,59,85,63,16,144,85,63,12,228,85,63,170,55,86,63,235,138,86,63,206,221,86,63,83,48,87,63,121,130,87,63,66,212,87,63,172,37,88,63,184,118,88,63,101,199,88,63,180,23,89,63,164,103,89,63,53,183,89,63,104,6,90,63,59,85,90,63,175,163,90,63,197,241,90,63,123,63,91,63,210,140,91,63,201,217,91,63,97,38,92,63,154,114,92,63,115,190,92,63,237,9,93,63,7,85,93,63,194,159,93,63,29,
234,93,63,24,52,94,63,179,125,94,63,239,198,94,63,203,15,95,63,72,88,95,63,100,160,95,63,33,232,95,63,126,47,96,63,123,118,96,63,24,189,96,63,85,3,97,63,51,73,97,63,177,142,97,63,207,211,97,63,141,24,98,63,236,92,98,63,235,160,98,63,138,228,98,63,202,39,99,63,170,106,99,63,42,173,99,63,75,239,99,63,13,49,100,63,111,114,100,63,114,179,100,63,21,244,100,63,90,52,101,63,63,116,101,63,197,179,101,63,236,242,101,63,180,49,102,63,29,112,102,63,39,174,102,63,211,235,102,63,32,41,103,63,15,102,103,63,159,
162,103,63,209,222,103,63,164,26,104,63,26,86,104,63,49,145,104,63,235,203,104,63,71,6,105,63,69,64,105,63,230,121,105,63,42,179,105,63,16,236,105,63,153,36,106,63,197,92,106,63,148,148,106,63,7,204,106,63,29,3,107,63,214,57,107,63,52,112,107,63,53,166,107,63,218,219,107,63,36,17,108,63,18,70,108,63,164,122,108,63,220,174,108,63,184,226,108,63,57,22,109,63,96,73,109,63,44,124,109,63,157,174,109,63,181,224,109,63,115,18,110,63,214,67,110,63,225,116,110,63,146,165,110,63,233,213,110,63,232,5,111,63,
142,53,111,63,219,100,111,63,209,147,111,63,110,194,111,63,179,240,111,63,160,30,112,63,54,76,112,63,117,121,112,63,93,166,112,63,239,210,112,63,41,255,112,63,14,43,113,63,156,86,113,63,213,129,113,63,184,172,113,63,70,215,113,63,127,1,114,63,99,43,114,63,243,84,114,63,46,126,114,63,21,167,114,63,169,207,114,63,233,247,114,63,214,31,115,63,113,71,115,63,184,110,115,63,173,149,115,63,80,188,115,63,162,226,115,63,161,8,116,63,80,46,116,63,174,83,116,63,187,120,116,63,119,157,116,63,228,193,116,63,1,
230,116,63,206,9,117,63,76,45,117,63,123,80,117,63,92,115,117,63,238,149,117,63,51,184,117,63,42,218,117,63,211,251,117,63,48,29,118,63,64,62,118,63,3,95,118,63,122,127,118,63,166,159,118,63,134,191,118,63,27,223,118,63,101,254,118,63,101,29,119,63,27,60,119,63,135,90,119,63,169,120,119,63,131,150,119,63,19,180,119,63,91,209,119,63,91,238,119,63,20,11,120,63,132,39,120,63,174,67,120,63,145,95,120,63,46,123,120,63,132,150,120,63,149,177,120,63,96,204,120,63,231,230,120,63,41,1,121,63,38,27,121,63,
223,52,121,63,85,78,121,63,136,103,121,63,120,128,121,63,37,153,121,63,144,177,121,63,185,201,121,63,161,225,121,63,72,249,121,63,174,16,122,63,212,39,122,63,185,62,122,63,96,85,122,63,198,107,122,63,238,129,122,63,216,151,122,63,131,173,122,63,241,194,122,63,33,216,122,63,20,237,122,63,202,1,123,63,68,22,123,63,130,42,123,63,133,62,123,63,77,82,123,63,217,101,123,63,43,121,123,63,68,140,123,63,34,159,123,63,200,177,123,63,52,196,123,63,104,214,123,63,99,232,123,63,39,250,123,63,180,11,124,63,9,29,
124,63,40,46,124,63,17,63,124,63,196,79,124,63,65,96,124,63,137,112,124,63,156,128,124,63,124,144,124,63,39,160,124,63,158,175,124,63,226,190,124,63,244,205,124,63,211,220,124,63,128,235,124,63,251,249,124,63,69,8,125,63,94,22,125,63,71,36,125,63,255,49,125,63,136,63,125,63,225,76,125,63,11,90,125,63,7,103,125,63,212,115,125,63,115,128,125,63,229,140,125,63,42,153,125,63,66,165,125,63,46,177,125,63,238,188,125,63,130,200,125,63,235,211,125,63,41,223,125,63,61,234,125,63,38,245,125,63,230,255,125,
63,124,10,126,63,234,20,126,63,47,31,126,63,75,41,126,63,64,51,126,63,13,61,126,63,180,70,126,63,51,80,126,63,140,89,126,63,191,98,126,63,205,107,126,63,181,116,126,63,120,125,126,63,23,134,126,63,146,142,126,63,233,150,126,63,28,159,126,63,44,167,126,63,26,175,126,63,229,182,126,63,142,190,126,63,22,198,126,63,124,205,126,63,194,212,126,63,231,219,126,63,235,226,126,63,208,233,126,63,149,240,126,63,59,247,126,63,195,253,126,63,44,4,127,63,118,10,127,63,163,16,127,63,179,22,127,63,165,28,127,63,123,
34,127,63,52,40,127,63,210,45,127,63,83,51,127,63,186,56,127,63,5,62,127,63,53,67,127,63,75,72,127,63,72,77,127,63,42,82,127,63,243,86,127,63,163,91,127,63,58,96,127,63,185,100,127,63,32,105,127,63,111,109,127,63,166,113,127,63,199,117,127,63,208,121,127,63,196,125,127,63,161,129,127,63,104,133,127,63,25,137,127,63,182,140,127,63,61,144,127,63,176,147,127,63,14,151,127,63,89,154,127,63,143,157,127,63,179,160,127,63,195,163,127,63,192,166,127,63,171,169,127,63,132,172,127,63,74,175,127,63,255,177,
127,63,163,180,127,63,53,183,127,63,183,185,127,63,40,188,127,63,137,190,127,63,217,192,127,63,26,195,127,63,76,197,127,63,111,199,127,63,130,201,127,63,135,203,127,63,126,205,127,63,102,207,127,63,65,209,127,63,14,211,127,63,205,212,127,63,128,214,127,63,38,216,127,63,191,217,127,63,76,219,127,63,204,220,127,63,65,222,127,63,170,223,127,63,8,225,127,63,91,226,127,63,163,227,127,63,224,228,127,63,19,230,127,63,59,231,127,63,90,232,127,63,110,233,127,63,122,234,127,63,124,235,127,63,116,236,127,63,
100,237,127,63,75,238,127,63,42,239,127,63,1,240,127,63,207,240,127,63,149,241,127,63,84,242,127,63,12,243,127,63,188,243,127,63,101,244,127,63,7,245,127,63,162,245,127,63,55,246,127,63,198,246,127,63,78,247,127,63,209,247,127,63,77,248,127,63,196,248,127,63,54,249,127,63,162,249,127,63,9,250,127,63,108,250,127,63,201,250,127,63,34,251,127,63,118,251,127,63,198,251,127,63,18,252,127,63,89,252,127,63,157,252,127,63,221,252,127,63,26,253,127,63,83,253,127,63,136,253,127,63,187,253,127,63,234,253,127,
63,22,254,127,63,64,254,127,63,103,254,127,63,139,254,127,63,173,254,127,63,204,254,127,63,234,254,127,63,5,255,127,63,30,255,127,63,53,255,127,63,74,255,127,63,94,255,127,63,112,255,127,63,128,255,127,63,143,255,127,63,157,255,127,63,169,255,127,63,180,255,127,63,191,255,127,63,200,255,127,63,208,255,127,63,215,255,127,63,221,255,127,63,227,255,127,63,232,255,127,63,236,255,127,63,239,255,127,63,243,255,127,63,245,255,127,63,248,255,127,63,249,255,127,63,251,255,127,63,252,255,127,63,253,255,127,
63,254,255,127,63,255,255,127,63,255,255,127,63,255,255,127,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,204,8,120,52,171,134,11,54,79,202,193,54,190,233,61,55,238,247,156,55,192,123,234,55,43,192,35,56,161,2,90,56,189,2,140,56,76,228,174,56,227,165,213,56,199,35,0,57,168,100,23,57,134,149,48,57,104,182,75,57,64,199,104,57,7,228,131,57,105,92,148,57,191,204,165,57,6,53,184,57,65,149,203,57,105,237,223,57,120,61,245,57,184,194,5,58,166,98,17,58,134,126,
29,58,81,22,42,58,9,42,55,58,172,185,68,58,54,197,82,58,165,76,97,58,250,79,112,58,47,207,127,58,34,229,135,58,154,32,144,58,255,153,152,58,80,81,161,58,139,70,170,58,174,121,179,58,186,234,188,58,171,153,198,58,129,134,208,58,58,177,218,58,212,25,229,58,79,192,239,58,167,164,250,58,109,227,2,59,117,147,8,59,105,98,14,59,73,80,20,59,19,93,26,59,199,136,32,59,100,211,38,59,232,60,45,59,83,197,51,59,164,108,58,59,218,50,65,59,243,23,72,59,239,27,79,59,204,62,86,59,138,128,93,59,38,225,100,59,161,96,
108,59,249,254,115,59,45,188,123,59,29,204,129,59,145,201,133,59,113,214,137,59,188,242,141,59,113,30,146,59,145,89,150,59,26,164,154,59,12,254,158,59,102,103,163,59,40,224,167,59],"i8",4,h.e);x([80,104,172,59,222,255,176,59,209,166,181,59,40,93,186,59,228,34,191,59,2,248,195,59,131,220,200,59,101,208,205,59,168,211,210,59,74,230,215,59,76,8,221,59,172,57,226,59,105,122,231,59,131,202,236,59,249,41,242,59,202,152,247,59,245,22,253,59,60,82,1,60,170,32,4,60,196,246,6,60,137,212,9,60,249,185,12,60,
19,167,15,60,216,155,18,60,69,152,21,60,92,156,24,60,26,168,27,60,129,187,30,60,143,214,33,60,69,249,36,60,160,35,40,60,162,85,43,60,73,143,46,60,149,208,49,60,133,25,53,60,26,106,56,60,81,194,59,60,44,34,63,60,168,137,66,60,199,248,69,60,134,111,73,60,230,237,76,60,231,115,80,60,134,1,84,60,197,150,87,60,162,51,91,60,28,216,94,60,52,132,98,60,232,55,102,60,56,243,105,60,35,182,109,60,170,128,113,60,202,82,117,60,131,44,121,60,214,13,125,60,96,123,128,60,161,115,130,60,174,111,132,60,134,111,134,
60,40,115,136,60,149,122,138,60,205,133,140,60,206,148,142,60,152,167,144,60,44,190,146,60,136,216,148,60,173,246,150,60,154,24,153,60,78,62,155,60,202,103,157,60,13,149,159,60,23,198,161,60,231,250,163,60,125,51,166,60,217,111,168,60,249,175,170,60,223,243,172,60,137,59,175,60,247,134,177,60,40,214,179,60,29,41,182,60,213,127,184,60,80,218,186,60,140,56,189,60,138,154,191,60,74,0,194,60,202,105,196,60,11,215,198,60,12,72,201,60,205,188,203,60,77,53,206,60,140,177,208,60,137,49,211,60,69,181,213,
60,189,60,216,60,243,199,218,60,230,86,221,60,149,233,223,60,0,128,226,60,39,26,229,60,8,184,231,60,164,89,234,60,250,254,236,60,9,168,239,60,210,84,242,60,83,5,245,60,141,185,247,60,126,113,250,60,39,45,253,60,134,236,255,60,206,87,1,61,52,187,2,61,117,32,4,61,144,135,5,61,133,240,6,61,84,91,8,61,253,199,9,61,128,54,11,61,219,166,12,61,16,25,14,61,29,141,15,61,3,3,17,61,193,122,18,61,87,244,19,61,197,111,21,61,10,237,22,61,39,108,24,61,26,237,25,61,228,111,27,61,132,244,28,61,251,122,30,61,71,3,
32,61,105,141,33,61,96,25,35,61,45,167,36,61,206,54,38,61,67,200,39,61,141,91,41,61,171,240,42,61,156,135,44,61,96,32,46,61,248,186,47,61,99,87,49,61,160,245,50,61,175,149,52,61,144,55,54,61,67,219,55,61,199,128,57,61,28,40,59,61,65,209,60,61,56,124,62,61,254,40,64,61,148,215,65,61,250,135,67,61,47,58,69,61,51,238,70,61,5,164,72,61,166,91,74,61,20,21,76,61,80,208,77,61,90,141,79,61,49,76,81,61,212,12,83,61,68,207,84,61,128,147,86,61,135,89,88,61,90,33,90,61,248,234,91,61,97,182,93,61,148,131,95,61,
145,82,97,61,88,35,99,61,232,245,100,61,65,202,102,61,100,160,104,61,78,120,106,61,1,82,108,61,123,45,110,61,188,10,112,61,197,233,113,61,148,202,115,61,41,173,117,61,133,145,119,61,166,119,121,61,140,95,123,61,55,73,125,61,166,52,127,61,237,144,128,61,105,136,129,61,198,128,130,61,5,122,131,61,37,116,132,61,39,111,133,61,9,107,134,61,204,103,135,61,112,101,136,61,244,99,137,61,88,99,138,61,157,99,139,61,193,100,140,61,196,102,141,61,167,105,142,61,106,109,143,61,11,114,144,61,139,119,145,61,234,
125,146,61,40,133,147,61,67,141,148,61,61,150,149,61,20,160,150,61,201,170,151,61,92,182,152,61,203,194,153,61,24,208,154,61,66,222,155,61,72,237,156,61,42,253,157,61,233,13,159,61,132,31,160,61,250,49,161,61,76,69,162,61,122,89,163,61,130,110,164,61,101,132,165,61,35,155,166,61,188,178,167,61,47,203,168,61,124,228,169,61,162,254,170,61,163,25,172,61,124,53,173,61,47,82,174,61,187,111,175,61,31,142,176,61,92,173,177,61,113,205,178,61,94,238,179,61,35,16,181,61,192,50,182,61,52,86,183,61,127,122,184,
61,160,159,185,61,153,197,186,61,104,236,187,61,13,20,189,61,136,60,190,61,217,101,191,61,255,143,192,61,250,186,193,61,202,230,194,61,111,19,196,61,233,64,197,61,55,111,198,61,89,158,199,61,78,206,200,61,23,255,201,61,179,48,203,61,35,99,204,61,101,150,205,61,121,202,206,61,96,255,207,61,25,53,209,61,164,107,210,61,0,163,211,61,45,219,212,61,44,20,214,61,251,77,215,61,154,136,216,61,10,196,217,61,74,0,219,61,89,61,220,61,56,123,221,61,230,185,222,61,99,249,223,61,174,57,225,61,200,122,226,61,176,
188,227,61,102,255,228,61,233,66,230,61,58,135,231,61,88,204,232,61,66,18,234,61,249,88,235,61,124,160,236,61,203,232,237,61,230,49,239,61,204,123,240,61,125,198,241,61,249,17,243,61,63,94,244,61,79,171,245,61,42,249,246,61,206,71,248,61,60,151,249,61,114,231,250,61,114,56,252,61,58,138,253,61,202,220,254,61,17,24,0,62,33,194,0,62,149,108,1,62,108,23,2,62,166,194,2,62,68,110,3,62,69,26,4,62,168,198,4,62,111,115,5,62,152,32,6,62,35,206,6,62,17,124,7,62,98,42,8,62,20,217,8,62,40,136,9,62,157,55,10,
62,117,231,10,62,173,151,11,62,71,72,12,62,66,249,12,62,158,170,13,62,91,92,14,62,120,14,15,62,246,192,15,62,213,115,16,62,19,39,17,62,177,218,17,62,175,142,18,62,13,67,19,62,202,247,19,62,231,172,20,62,99,98,21,62,62,24,22,62,120,206,22,62,16,133,23,62,7,60,24,62,92,243,24,62,16,171,25,62,33,99,26,62,145,27,27,62,94,212,27,62,137,141,28,62,17,71,29,62,246,0,30,62,56,187,30,62,215,117,31,62,211,48,32,62,43,236,32,62,224,167,33,62,241,99,34,62,93,32,35,62,38,221,35,62,74,154,36,62,202,87,37,62,165,
21,38,62,219,211,38,62,108,146,39,62,88,81,40,62,159,16,41,62,64,208,41,62,59,144,42,62,144,80,43,62,63,17,44,62,72,210,44,62,170,147,45,62,102,85,46,62,122,23,47,62,232,217,47,62,175,156,48,62,206,95,49,62,69,35,50,62,21,231,50,62,61,171,51,62,189,111,52,62,148,52,53,62,195,249,53,62,73,191,54,62,38,133,55,62,91,75,56,62,230,17,57,62,199,216,57,62,255,159,58,62,141,103,59,62,113,47,60,62,171,247,60,62,59,192,61,62,31,137,62,62,89,82,63,62,232,27,64,62,204,229,64,62,5,176,65,62,146,122,66,62,115,
69,67,62,168,16,68,62,49,220,68,62,14,168,69,62,62,116,70,62,194,64,71,62,152,13,72,62,193,218,72,62,61,168,73,62,12,118,74,62,44,68,75,62,159,18,76,62,100,225,76,62,122,176,77,62,225,127,78,62,154,79,79,62,164,31,80,62,255,239,80,62,170,192,81,62,166,145,82,62,242,98,83,62,141,52,84,62,121,6,85,62,180,216,85,62,63,171,86,62,25,126,87,62,65,81,88,62,185,36,89,62,126,248,89,62,147,204,90,62,245,160,91,62,165,117,92,62,163,74,93,62,238,31,94,62,135,245,94,62,109,203,95,62,159,161,96,62,30,120,97,62,
233,78,98,62,1,38,99,62,100,253,99,62,19,213,100,62,14,173,101,62,84,133,102,62,229,93,103,62,193,54,104,62,231,15,105,62,88,233,105,62,19,195,106,62,24,157,107,62,103,119,108,62,255,81,109,62,224,44,110,62,11,8,111,62,126,227,111,62,58,191,112,62,62,155,113,62,139,119,114,62,31,84,115,62,251,48,116,62,31,14,117,62,138,235,117,62,59,201,118,62,52,167,119,62,115,133,120,62,248,99,121,62,196,66,122,62,213,33,123,62,44,1,124,62,200,224,124,62,170,192,125,62,208,160,126,62,59,129,127,62,245,48,128,62,
111,161,128,62,11,18,129,62,201,130,129,62,168,243,129,62,169,100,130,62,204,213,130,62,15,71,131,62,117,184,131,62,251,41,132,62,162,155,132,62,107,13,133,62,84,127,133,62,93,241,133,62,136,99,134,62,210,213,134,62,61,72,135,62,200,186,135,62,116,45,136,62,63,160,136,62,42,19,137,62,52,134,137,62,94,249,137,62,168,108,138,62,17,224,138,62,153,83,139,62,64,199,139,62,6,59,140,62,235,174,140,62,239,34,141,62,17,151,141,62,82,11,142,62,177,127,142,62,46,244,142,62,201,104,143,62,130,221,143,62,89,82,
144,62,78,199,144,62,96,60,145,62,143,177,145,62,220,38,146,62,70,156,146,62,205,17,147,62,113,135,147,62,50,253,147,62,16,115,148,62,9,233,148,62,32,95,149,62,82,213,149,62,161,75,150,62,12,194,150,62,146,56,151,62,53,175,151,62,243,37,152,62,204,156,152,62,193,19,153,62,209,138,153,62,252,1,154,62,66,121,154,62,163,240,154,62,31,104,155,62,181,223,155,62,101,87,156,62,48,207,156,62,21,71,157,62,20,191,157,62,45,55,158,62,96,175,158,62,172,39,159,62,18,160,159,62,145,24,160,62,41,145,160,62,218,
9,161,62,165,130,161,62,136,251,161,62,132,116,162,62,152,237,162,62,197,102,163,62,10,224,163,62,103,89,164,62,220,210,164,62,105,76,165,62,14,198,165,62,202,63,166,62,158,185,166,62,137,51,167,62,139,173,167,62,164,39,168,62,213,161,168,62,27,28,169,62,121,150,169,62,237,16,170,62,119,139,170,62,24,6,171,62,206,128,171,62,155,251,171,62,125,118,172,62,117,241,172,62,130,108,173,62,165,231,173,62,221,98,174,62,42,222,174,62,140,89,175,62,2,213,175,62,142,80,176,62,46,204,176,62,226,71,177,62,170,
195,177,62,135,63,178,62,119,187,178,62,124,55,179,62,148,179,179,62,191,47,180,62,254,171,180,62,80,40,181,62,181,164,181,62,45,33,182,62,184,157,182,62,85,26,183,62,5,151,183,62,199,19,184,62,156,144,184,62,130,13,185,62,123,138,185,62,133,7,186,62,161,132,186,62,206,1,187,62,13,127,187,62,93,252,187,62,190,121,188,62,48,247,188,62,178,116,189,62,70,242,189,62,233,111,190,62,157,237,190,62,98,107,191,62,54,233,191,62,26,103,192,62,14,229,192,62,17,99,193,62,36,225,193,62,70,95,194,62,119,221,194,
62,184,91,195,62,7,218,195,62,100,88,196,62,209,214,196,62,75,85,197,62,212,211,197,62,107,82,198,62,16,209,198,62,195,79,199,62,132,206,199,62,82,77,200,62,45,204,200,62,21,75,201,62,11,202,201,62,13,73,202,62,29,200,202,62,56,71,203,62,97,198,203,62,149,69,204,62,214,196,204,62,34,68,205,62,123,195,205,62,223,66,206,62,79,194,206,62,202,65,207,62,81,193,207,62,226,64,208,62,127,192,208,62,38,64,209,62,216,191,209,62,148,63,210,62,91,191,210,62,44,63,211,62,7,191,211,62,235,62,212,62,218,190,212,
62,210,62,213,62,211,190,213,62,222,62,214,62,242,190,214,62,15,63,215,62,53,191,215,62,99,63,216,62,154,191,216,62,217,63,217,62,32,192,217,62,112,64,218,62,199,192,218,62,38,65,219,62,140,193,219,62,250,65,220,62,112,194,220,62,236,66,221,62,112,195,221,62,250,67,222,62,139,196,222,62,34,69,223,62,192,197,223,62,100,70,224,62,14,199,224,62,189,71,225,62,115,200,225,62,46,73,226,62,239,201,226,62,181,74,227,62,127,203,227,62,79,76,228,62,36,205,228,62,253,77,229,62,219,206,229,62,190,79,230,62,164,
208,230,62,142,81,231,62,125,210,231,62,111,83,232,62,100,212,232,62,93,85,233,62,89,214,233,62,89,87,234,62,91,216,234,62,96,89,235,62,104,218,235,62,114,91,236,62,126,220,236,62,141,93,237,62,158,222,237,62,176,95,238,62,196,224,238,62,218,97,239,62,241,226,239,62,10,100,240,62,35,229,240,62,62,102,241,62,89,231,241,62,116,104,242,62,145,233,242,62,173,106,243,62,202,235,243,62,230,108,244,62,3,238,244,62,31,111,245,62,59,240,245,62,86,113,246,62,112,242,246,62,137,115,247,62,161,244,247,62,184,
117,248,62,206,246,248,62,226,119,249,62,244,248,249,62,4,122,250,62,18,251,250,62,30,124,251,62,40,253,251,62,47,126,252,62,52,255,252,62,54,128,253,62,52,1,254,62,48,130,254,62,40,3,255,62,29,132,255,62,135,2,0,63,254,66,0,63,115,131,0,63,230,195,0,63,86,4,1,63,197,68,1,63,49,133,1,63,155,197,1,63,3,6,2,63,103,70,2,63,202,134,2,63,42,199,2,63,135,7,3,63,225,71,3,63,56,136,3,63,141,200,3,63,222,8,4,63,44,73,4,63,119,137,4,63,191,201,4,63,3,10,5,63,68,74,5,63,130,138,5,63,188,202,5,63,242,10,6,63,
36,75,6,63,83,139,6,63,126,203,6,63,165,11,7,63,199,75,7,63,230,139,7,63,1,204,7,63,23,12,8,63,41,76,8,63,54,140,8,63,63,204,8,63,67,12,9,63,67,76,9,63,62,140,9,63,52,204,9,63,37,12,10,63,18,76,10,63,249,139,10,63,219,203,10,63,184,11,11,63,144,75,11,63,98,139,11,63,47,203,11,63,246,10,12,63,184,74,12,63,116,138,12,63,43,202,12,63,219,9,13,63,134,73,13,63,43,137,13,63,202,200,13,63,98,8,14,63,245,71,14,63,129,135,14,63,7,199,14,63,135,6,15,63,0,70,15,63,114,133,15,63,222,196,15,63,67,4,16,63,161,
67,16,63,249,130,16,63,73,194,16,63,147,1,17,63,213,64,17,63,17,128,17,63,69,191,17,63,114,254,17,63,151,61,18,63,181,124,18,63,203,187,18,63,218,250,18,63,225,57,19,63,225,120,19,63,216,183,19,63,200,246,19,63,176,53,20,63,143,116,20,63,103,179,20,63,54,242,20,63,253,48,21,63,188,111,21,63,114,174,21,63,32,237,21,63,197,43,22,63,98,106,22,63,246,168,22,63,129,231,22,63,3,38,23,63,125,100,23,63,237,162,23,63,84,225,23,63,178,31,24,63,7,94,24,63,83,156,24,63,149,218,24,63,206,24,25,63,253,86,25,63,
35,149,25,63,63,211,25,63,82,17,26,63,90,79,26,63,89,141,26,63,78,203,26,63,57,9,27,63,25,71,27,63,240,132,27,63,188,194,27,63,126,0,28,63,54,62,28,63,227,123,28,63,134,185,28,63,30,247,28,63,172,52,29,63,47,114,29,63,167,175,29,63,20,237,29,63,118,42,30,63,206,103,30,63,26,165,30,63,91,226,30,63,145,31,31,63,188,92,31,63,219,153,31,63,239,214,31,63,247,19,32,63,244,80,32,63,230,141,32,63,203,202,32,63,165,7,33,63,115,68,33,63,53,129,33,63,235,189,33,63,150,250,33,63,52,55,34,63,198,115,34,63,75,
176,34,63,197,236,34,63,50,41,35,63,146,101,35,63,230,161,35,63,46,222,35,63,105,26,36,63,151,86,36,63,185,146,36,63,205,206,36,63,213,10,37,63,208,70,37,63,190,130,37,63,158,190,37,63,114,250,37,63,56,54,38,63,241,113,38,63,157,173,38,63,59,233,38,63,204,36,39,63,79,96,39,63,197,155,39,63,45,215,39,63,135,18,40,63,211,77,40,63,18,137,40,63,66,196,40,63,101,255,40,63,121,58,41,63,128,117,41,63,120,176,41,63,98,235,41,63,62,38,42,63,11,97,42,63,202,155,42,63,122,214,42,63,28,17,43,63,175,75,43,63,
52,134,43,63,170,192,43,63,16,251,43,63,105,53,44,63,178,111,44,63,236,169,44,63,23,228,44,63,51,30,45,63,64,88,45,63,61,146,45,63,43,204,45,63,10,6,46,63,218,63,46,63,154,121,46,63,74,179,46,63,235,236,46,63,124,38,47,63,254,95,47,63,112,153,47,63,210,210,47,63,36,12,48,63,102,69,48,63,152,126,48,63,186,183,48,63,204,240,48,63,205,41,49,63,191,98,49,63,160,155,49,63,113,212,49,63,49,13,50,63,225,69,50,63,128,126,50,63,15,183,50,63,141,239,50,63,251,39,51,63,87,96,51,63,163,152,51,63,222,208,51,63,
8,9,52,63,34,65,52,63,42,121,52,63,33,177,52,63,7,233,52,63,219,32,53,63,159,88,53,63,81,144,53,63,242,199,53,63,129,255,53,63,255,54,54,63,108,110,54,63,198,165,54,63,16,221,54,63,71,20,55,63,109,75,55,63,129,130,55,63,131,185,55,63,116,240,55,63,82,39,56,63,30,94,56,63,217,148,56,63,129,203,56,63,23,2,57,63,155,56,57,63,13,111,57,63,108,165,57,63,185,219,57,63,244,17,58,63,28,72,58,63,50,126,58,63,53,180,58,63,38,234,58,63,4,32,59,63,207,85,59,63,135,139,59,63,45,193,59,63,192,246,59,63,64,44,60,
63,173,97,60,63,7,151,60,63,78,204,60,63,130,1,61,63,163,54,61,63,177,107,61,63,171,160,61,63,146,213,61,63,102,10,62,63,39,63,62,63,212,115,62,63,110,168,62,63,244,220,62,63,103,17,63,63,198,69,63,63,17,122,63,63,73,174,63,63,109,226,63,63,126,22,64,63,122,74,64,63,99,126,64,63,56,178,64,63,248,229,64,63,165,25,65,63,62,77,65,63,195,128,65,63,52,180,65,63,144,231,65,63,216,26,66,63,13,78,66,63,44,129,66,63,56,180,66,63,47,231,66,63,18,26,67,63,224,76,67,63,154,127,67,63,64,178,67,63,208,228,67,63,
77,23,68,63,180,73,68,63,7,124,68,63,69,174,68,63,111,224,68,63,131,18,69,63,131,68,69,63,110,118,69,63,68,168,69,63,5,218,69,63,177,11,70,63,72,61,70,63,202,110,70,63,55,160,70,63,143,209,70,63,210,2,71,63,255,51,71,63,23,101,71,63,26,150,71,63,8,199,71,63,224,247,71,63,163,40,72,63,81,89,72,63,233,137,72,63,107,186,72,63,216,234,72,63,48,27,73,63,114,75,73,63,158,123,73,63,181,171,73,63,181,219,73,63,161,11,74,63,118,59,74,63,54,107,74,63,224,154,74,63,116,202,74,63,242,249,74,63,90,41,75,63,173,
88,75,63,233,135,75,63,15,183,75,63,32,230,75,63,26,21,76,63,254,67,76,63,204,114,76,63,132,161,76,63,38,208,76,63,177,254,76,63,38,45,77,63,133,91,77,63,206,137,77,63,0,184,77,63,28,230,77,63,34,20,78,63,17,66,78,63,234,111,78,63,172,157,78,63,88,203,78,63,238,248,78,63,108,38,79,63,213,83,79,63,38,129,79,63,97,174,79,63,134,219,79,63,147,8,80,63,138,53,80,63,107,98,80,63,52,143,80,63,231,187,80,63,131,232,80,63,8,21,81,63,119,65,81,63,206,109,81,63,15,154,81,63,57,198,81,63,76,242,81,63,71,30,82,
63,44,74,82,63,250,117,82,63,177,161,82,63,81,205,82,63,218,248,82,63,76,36,83,63,166,79,83,63,234,122,83,63,22,166,83,63,44,209,83,63,42,252,83,63,17,39,84,63,224,81,84,63,153,124,84,63,58,167,84,63,196,209,84,63,54,252,84,63,146,38,85,63,214,80,85,63,2,123,85,63,24,165,85,63,22,207,85,63,252,248,85,63,204,34,86,63,131,76,86,63,36,118,86,63,172,159,86,63,30,201,86,63,120,242,86,63,186,27,87,63,229,68,87,63,248,109,87,63,244,150,87,63,216,191,87,63,165,232,87,63,90,17,88,63,248,57,88,63,126,98,88,
63,236,138,88,63,67,179,88,63,130,219,88,63,169,3,89,63,185,43,89,63,177,83,89,63,145,123,89,63,90,163,89,63,11,203,89,63,164,242,89,63,37,26,90,63,143,65,90,63,225,104,90,63,27,144,90,63,62,183,90,63,72,222,90,63,59,5,91,63,22,44,91,63,217,82,91,63,133,121,91,63,24,160,91,63,148,198,91,63,248,236,91,63,68,19,92,63,120,57,92,63,149,95,92,63,153,133,92,63,134,171,92,63,91,209,92,63,24,247,92,63,189,28,93,63,74,66,93,63,191,103,93,63,28,141,93,63,98,178,93,63,143,215,93,63,165,252,93,63,162,33,94,63,
136,70,94,63,86,107,94,63,11,144,94,63,169,180,94,63,47,217,94,63,157,253,94,63,243,33,95,63,49,70,95,63,88,106,95,63,102,142,95,63,92,178,95,63,59,214,95,63,1,250,95,63,175,29,96,63,70,65,96,63,196,100,96,63,43,136,96,63,122,171,96,63,176,206,96,63,207,241,96,63,214,20,97,63,197,55,97,63,155,90,97,63,90,125,97,63,1,160,97,63,144,194,97,63,8,229,97,63,103,7,98,63,174,41,98,63,221,75,98,63,245,109,98,63,244,143,98,63,220,177,98,63,171,211,98,63,99,245,98,63,3,23,99,63,139,56,99,63,251,89,99,63,83,
123,99,63,147,156,99,63,188,189,99,63,204,222,99,63,197,255,99,63,166,32,100,63,110,65,100,63,32,98,100,63,185,130,100,63,58,163,100,63,164,195,100,63,245,227,100,63,47,4,101,63,82,36,101,63,92,68,101,63,78,100,101,63,41,132,101,63,236,163,101,63,151,195,101,63,43,227,101,63,167,2,102,63,11,34,102,63,87,65,102,63,139,96,102,63,168,127,102,63,174,158,102,63,155,189,102,63,113,220,102,63,47,251,102,63,214,25,103,63,101,56,103,63,220,86,103,63,59,117,103,63,132,147,103,63,180,177,103,63,205,207,103,
63,206,237,103,63,184,11,104,63,138,41,104,63,69,71,104,63,233,100,104,63,116,130,104,63,233,159,104,63,69,189,104,63,139,218,104,63,185,247,104,63,207,20,105,63,207,49,105,63,182,78,105,63,135,107,105,63,64,136,105,63,225,164,105,63,108,193,105,63,223,221,105,63,59,250,105,63,127,22,106,63,172,50,106,63,195,78,106,63,193,106,106,63,169,134,106,63,121,162,106,63,51,190,106,63,213,217,106,63,96,245,106,63,212,16,107,63,48,44,107,63,118,71,107,63,165,98,107,63,188,125,107,63,189,152,107,63,167,179,
107,63,121,206,107,63,53,233,107,63,218,3,108,63,104,30,108,63,223,56,108,63,63,83,108,63,136,109,108,63,187,135,108,63,214,161,108,63,219,187,108,63,201,213,108,63,161,239,108,63,97,9,109,63,11,35,109,63,159,60,109,63,27,86,109,63,129,111,109,63,209,136,109,63,9,162,109,63,44,187,109,63,56,212,109,63,45,237,109,63,12,6,110,63,212,30,110,63,134,55,110,63,33,80,110,63,166,104,110,63,21,129,110,63,110,153,110,63,176,177,110,63,220,201,110,63,241,225,110,63,241,249,110,63,218,17,111,63,173,41,111,63,
106,65,111,63,16,89,111,63,161,112,111,63,28,136,111,63,128,159,111,63,207,182,111,63,7,206,111,63,42,229,111,63,54,252,111,63,45,19,112,63,14,42,112,63,217,64,112,63,142,87,112,63,46,110,112,63,184,132,112,63,43,155,112,63,138,177,112,63,210,199,112,63,5,222,112,63,35,244,112,63,42,10,113,63,29,32,113,63,249,53,113,63,193,75,113,63,114,97,113,63,15,119,113,63,150,140,113,63,7,162,113,63,99,183,113,63,170,204,113,63,220,225,113,63,249,246,113,63,0,12,114,63,242,32,114,63,207,53,114,63,151,74,114,
63,73,95,114,63,231,115,114,63,112,136,114,63,227,156,114,63,66,177,114,63,140,197,114,63,193,217,114,63,225,237,114,63,236,1,115,63,227,21,115,63,197,41,115,63,146,61,115,63,74,81,115,63,238,100,115,63,125,120,115,63,248,139,115,63,94,159,115,63,175,178,115,63,236,197,115,63,21,217,115,63,41,236,115,63,41,255,115,63,21,18,116,63,236,36,116,63,175,55,116,63,94,74,116,63,248,92,116,63,127,111,116,63,241,129,116,63,80,148,116,63,154,166,116,63,208,184,116,63,242,202,116,63,1,221,116,63,251,238,116,
63,226,0,117,63,181,18,117,63,116,36,117,63,31,54,117,63,183,71,117,63,59,89,117,63,171,106,117,63,8,124,117,63,81,141,117,63,135,158,117,63,169,175,117,63,184,192,117,63,179,209,117,63,155,226,117,63,112,243,117,63,50,4,118,63,224,20,118,63,123,37,118,63,3,54,118,63,120,70,118,63,217,86,118,63,40,103,118,63,100,119,118,63,140,135,118,63,162,151,118,63,165,167,118,63,149,183,118,63,114,199,118,63,61,215,118,63,245,230,118,63,154,246,118,63,44,6,119,63,172,21,119,63,26,37,119,63,117,52,119,63,189,
67,119,63,243,82,119,63,22,98,119,63,40,113,119,63,39,128,119,63,19,143,119,63,238,157,119,63,182,172,119,63,108,187,119,63,16,202,119,63,162,216,119,63,34,231,119,63,144,245,119,63,236,3,120,63,55,18,120,63,111,32,120,63,150,46,120,63,170,60,120,63,174,74,120,63,159,88,120,63,127,102,120,63,77,116,120,63,10,130,120,63,181,143,120,63,79,157,120,63,215,170,120,63,78,184,120,63,180,197,120,63,8,211,120,63,76,224,120,63,126,237,120,63,158,250,120,63,174,7,121,63,173,20,121,63,155,33,121,63,119,46,121,
63,67,59,121,63,254,71,121,63,168,84,121,63,66,97,121,63,202,109,121,63,66,122,121,63,169,134,121,63,0,147,121,63,70,159,121,63,124,171,121,63,161,183,121,63,181,195,121,63,186,207,121,63,173,219,121,63,145,231,121,63,100,243,121,63,40,255,121,63,219,10,122,63,126,22,122,63,16,34,122,63,147,45,122,63,6,57,122,63,105,68,122,63,188,79,122,63,255,90,122,63,51,102,122,63,86,113,122,63,106,124,122,63,111,135,122,63,99,146,122,63,72,157,122,63,30,168,122,63,228,178,122,63,155,189,122,63,66,200,122,63,218,
210,122,63,99,221,122,63,221,231,122,63,71,242,122,63,162,252,122,63,238,6,123,63,43,17,123,63,89,27,123,63,120,37,123,63,137,47,123,63,138,57,123,63,124,67,123,63,96,77,123,63,53,87,123,63,252,96,123,63,179,106,123,63,92,116,123,63,247,125,123,63,131,135,123,63,1,145,123,63,112,154,123,63,209,163,123,63,36,173,123,63,104,182,123,63,158,191,123,63,198,200,123,63,224,209,123,63,236,218,123,63,234,227,123,63,218,236,123,63,188,245,123,63,144,254,123,63,86,7,124,63,14,16,124,63,185,24,124,63,86,33,124,
63,230,41,124,63,104,50,124,63,220,58,124,63,67,67,124,63,156,75,124,63,232,83,124,63,39,92,124,63,88,100,124,63,124,108,124,63,147,116,124,63,157,124,124,63,153,132,124,63,137,140,124,63,107,148,124,63,65,156,124,63,9,164,124,63,197,171,124,63,116,179,124,63,22,187,124,63,172,194,124,63,52,202,124,63,176,209,124,63,32,217,124,63,131,224,124,63,217,231,124,63,35,239,124,63,97,246,124,63,146,253,124,63,183,4,125,63,208,11,125,63,221,18,125,63,221,25,125,63,209,32,125,63,185,39,125,63,150,46,125,63,
102,53,125,63,42,60,125,63,227,66,125,63,143,73,125,63,48,80,125,63,197,86,125,63,78,93,125,63,204,99,125,63,62,106,125,63,165,112,125,63,0,119,125,63,80,125,125,63,148,131,125,63,205,137,125,63,251,143,125,63,29,150,125,63,52,156,125,63,64,162,125,63,65,168,125,63,55,174,125,63,34,180,125,63,2,186,125,63,215,191,125,63,161,197,125,63,96,203,125,63,21,209,125,63,190,214,125,63,93,220,125,63,242,225,125,63,124,231,125,63,251,236,125,63,112,242,125,63,218,247,125,63,58,253,125,63,143,2,126,63,219,7,
126,63,28,13,126,63,82,18,126,63,127,23,126,63,161,28,126,63,186,33,126,63,200,38,126,63,204,43,126,63,199,48,126,63,183,53,126,63,158,58,126,63,123,63,126,63,78,68,126,63,23,73,126,63,215,77,126,63,141,82,126,63,58,87,126,63,221,91,126,63,118,96,126,63,6,101,126,63,141,105,126,63,10,110,126,63,126,114,126,63,233,118,126,63,75,123,126,63,164,127,126,63,243,131,126,63,57,136,126,63,119,140,126,63,171,144,126,63,214,148,126,63,249,152,126,63,18,157,126,63,35,161,126,63,44,165,126,63,43,169,126,63,34,
173,126,63,16,177,126,63,246,180,126,63,211,184,126,63,167,188,126,63,115,192,126,63,55,196,126,63,243,199,126,63,166,203,126,63,81,207,126,63,243,210,126,63,142,214,126,63,32,218,126,63,171,221,126,63,45,225,126,63,167,228,126,63,26,232,126,63,132,235,126,63,231,238,126,63,66,242,126,63,149,245,126,63,224,248,126,63,36,252,126,63,96,255,126,63,148,2,127,63,193,5,127,63,230,8,127,63,4,12,127,63,27,15,127,63,42,18,127,63,50,21,127,63,50,24,127,63,43,27,127,63,29,30,127,63,8,33,127,63,236,35,127,63,
201,38,127,63,158,41,127,63,109,44,127,63,53,47,127,63,246,49,127,63,175,52,127,63,99,55,127,63,15,58,127,63,181,60,127,63,83,63,127,63,236,65,127,63,125,68,127,63,8,71,127,63,141,73,127,63,11,76,127,63,131,78,127,63,244,80,127,63,95,83,127,63,195,85,127,63,33,88,127,63,121,90,127,63,203,92,127,63,23,95,127,63,92,97,127,63,155,99,127,63,213,101,127,63,8,104,127,63,54,106,127,63,93,108,127,63,127,110,127,63,155,112,127,63,177,114,127,63,193,116,127,63,203,118,127,63,208,120,127,63,207,122,127,63,201,
124,127,63,189,126,127,63,171,128,127,63,148,130,127,63,120,132,127,63,86,134,127,63,47,136,127,63,2,138,127,63,209,139,127,63,153,141,127,63,93,143,127,63,28,145,127,63,213,146,127,63,137,148,127,63,57,150,127,63,227,151,127,63,136,153,127,63,40,155,127,63,196,156,127,63,90,158,127,63,236,159,127,63,121,161,127,63,1,163,127,63,132,164,127,63,3,166,127,63,125,167,127,63,242,168,127,63,99,170,127,63,207,171,127,63,55,173,127,63,154,174,127,63,249,175,127,63,84,177,127,63,170,178,127,63,251,179,127,
63,73,181,127,63,146,182,127,63,215,183,127,63,24,185,127,63,85,186,127,63,141,187,127,63,193,188,127,63,242,189,127,63,30,191,127,63,71,192,127,63,107,193,127,63,140,194,127,63,168,195,127,63,193,196,127,63,214,197,127,63,231,198,127,63,245,199,127,63,255,200,127,63,5,202,127,63,7,203,127,63,6,204,127,63,1,205,127,63,249,205,127,63,237,206,127,63,222,207,127,63,203,208,127,63,181,209,127,63,156,210,127,63,127,211,127,63,95,212,127,63,59,213,127,63,20,214,127,63,234,214,127,63,189,215,127,63,141,
216,127,63,90,217,127,63,35,218,127,63,233,218,127,63,173,219,127,63,109,220,127,63,43,221,127,63,229,221,127,63,156,222,127,63,81,223,127,63,3,224,127,63,178,224,127,63,94,225,127,63,7,226,127,63,174,226,127,63,82,227,127,63,243,227,127,63,146,228,127,63,46,229,127,63,199,229,127,63,94,230,127,63,242,230,127,63,132,231,127,63,19,232,127,63,160,232,127,63,42,233,127,63,178,233,127,63,56,234,127,63,187,234,127,63,60,235,127,63,187,235,127,63,55,236,127,63,177,236,127,63,41,237,127,63,159,237,127,63,
18,238,127,63,132,238,127,63,243,238,127,63,96,239,127,63,204,239,127,63,53,240,127,63,156,240,127,63,1,241,127,63,101,241,127,63,198,241,127,63,37,242,127,63,131,242,127,63,222,242,127,63,56,243,127,63,144,243,127,63,231,243,127,63,59,244,127,63,142,244,127,63,223,244,127,63,46,245,127,63,124,245,127,63,200,245,127,63,19,246,127,63,91,246,127,63,163,246,127,63,233,246,127,63,45,247,127,63,111,247,127,63,177,247,127,63,240,247,127,63,47,248,127,63,108,248,127,63,167,248,127,63,225,248,127,63,26,249,
127,63,82,249,127,63,136,249,127,63,188,249,127,63,240,249,127,63,34,250,127,63,83,250,127,63,131,250,127,63,178,250,127,63,224,250,127,63,12,251,127,63,55,251,127,63,97,251,127,63,138,251,127,63,178,251,127,63,217,251,127,63,255,251,127,63,36,252,127,63,72,252,127,63,107,252,127,63,141,252,127,63,173,252,127,63,205,252,127,63,237,252,127,63,11,253,127,63,40,253,127,63,69,253,127,63,96,253,127,63,123,253,127,63,149,253,127,63,174,253,127,63,199,253,127,63,222,253,127,63,245,253,127,63,12,254,127,
63,33,254,127,63,54,254,127,63,74,254,127,63,93,254,127,63,112,254,127,63,130,254,127,63,148,254,127,63,165,254,127,63,181,254,127,63,197,254,127,63,212,254,127,63,227,254,127,63,241,254,127,63,254,254,127,63,11,255,127,63,24,255,127,63,36,255,127,63,47,255,127,63,59,255,127,63,69,255,127,63,79,255,127,63,89,255,127,63,99,255,127,63,108,255,127,63,116,255,127,63,124,255,127,63,132,255,127,63,140,255,127,63,147,255,127,63,154,255,127,63,160,255,127,63,166,255,127,63,172,255,127,63,178,255,127,63,183,
255,127,63,188,255,127,63,193,255,127,63,197,255,127,63,202,255,127,63,206,255,127,63,209,255,127,63,213,255,127,63,216,255,127,63,220,255,127,63,223,255,127,63,225,255,127,63,228,255,127,63,230,255,127,63,233,255,127,63,235,255,127,63,237,255,127,63,239,255,127,63,240,255,127,63,242,255,127,63,243,255,127,63,245,255,127,63,246,255,127,63,247,255,127,63,248,255,127,63,249,255,127,63,250,255,127,63,251,255,127,63,251,255,127,63,252,255,127,63,252,255,127,63,253,255,127,63,253,255,127,63,254,255,127,
63,254,255,127,63,254,255,127,63,255,255,127,63,255,255,127,63,255,255,127,63,255,255,127,63,255,255,127,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,198,63,120,51,98,136,11,53,151,200,193,53,80,233,61,54,183,247,156,54,46,124,234,54,153,192,35,55,244,2,90,55,56,3,140,55,227,228,174,55,177,166,213,55,108,36,0,56,146,101,23,56,201,150,48,56,18,184,75,56,81,201,104,56,
94,229,131,56,29,94,148,56,229,206,165,56,167,55,184,56,128,152,203,56,85,241,223,56,36,66,245,56,126,197,5,57,238,101,17,57,99,130,29,57,207,26,42,57,63,47,55,57,179,191,68,57,30,204,82,57,141,84,97,57,243,88,112,57,94,217,127,57,227,234,135,57,18,39,144,57,64,161,152,57,105,89,161,57,146,79,170,57,181,131,179,57,215,245,188,57,245,165,198,57,14,148,208,57,34,192,218,57,46,42,229,57,57,210,239,57,60,184,250,57,27,238,2,58,22,159,8,58,13,111,14,58,0,94,20,58,239,107,26,58,218,152,32,58,192,228,38,
58,161,79,45,58,124,217,51,58,83,130,58,58,37,74,65,58,240,48,72,58,182,54,79,58,116,91,86,58,45,159,93,58,222,1,101,58,136,131,108,58,42,36,116,58,196,227,123,58,44,225,129,58,241,223,133,58,49,238,137,58,238,11,142,58,37,57,146,58,215,117,150,58,5,194,154,58,174,29,159,58,209,136,163,58,110,3,168,58,134,141,172,58,24,39,177,58,36,208,181,58,169,136,186,58,169,80,191,58,33,40,196,58,19,15,201,58,126,5,206,58,98,11,211,58,191,32,216,58,148,69,221,58,225,121,226,58,166,189,231,58,227,16,237,58,152,
115,242,58,196,229,247,58,103,103,253,58,65,124,1,59,137,76,4,59,141,36,7,59,76,4,10,59,198,235,12,59,251,218,15,59,235,209,18,59,149,208,21,59,251,214,24,59,26,229,27,59,244,250,30,59,136,24,34,59,215,61,37,59,223,106,40,59,161,159,43,59,29,220,46,59,83,32,50,59,66,108,53,59,234,191,56,59,76,27,60,59,103,126,63,59,59,233,66,59,199,91,70,59,12,214,73,59,10,88,77,59,193,225,80,59,48,115,84,59,86,12,88,59,53,173,91,59,204,85,95,59,26,6,99,59,32,190,102,59,222,125,106,59,82,69,110,59,127,20,114,59,97,
235,117,59,251,201,121,59,76,176,125,59,41,207,128,59,8,202,130,59,194,200,132,59,87,203,134,59,198,209,136,59,17,220,138,59,55,234,140,59,55,252,142,59,18,18,145,59,199,43,147,59,87,73,149,59,194,106,151,59,6,144,153,59,37,185,155,59,30,230,157,59,241,22,160,59,158,75,162,59,37,132,164,59,134,192,166,59,192,0,169,59,212,68,171,59,193,140,173,59,137,216,175,59,41,40,178,59,163,123,180,59,245,210,182,59,33,46,185,59,38,141,187,59,4,240,189,59,186,86,192,59,73,193,194,59,177,47,197,59,242,161,199,59,
10,24,202,59,251,145,204,59,196,15,207,59,102,145,209,59,223,22,212,59,49,160,214,59,90,45,217,59,91,190,219,59,51,83,222,59,227,235,224,59,107,136,227,59,201,40,230,59,255,204,232,59,12,117,235,59,240,32,238,59,171,208,240,59,61,132,243,59,165,59,246,59,228,246,248,59,250,181,251,59,229,120,254,59,212,159,0,60,32,5,2,60,87,108,3,60,121,213,4,60,134,64,6,60,126,173,7,60,96,28,9,60,45,141,10,60,229,255,11,60,136,116,13,60,21,235,14,60,141,99,16,60,239,221,17,60,59,90,19,60,114,216,20,60,147,88,22,
60,158,218,23,60,147,94,25,60,115,228,26,60,60,108,28,60,240,245,29,60,141,129,31,60,20,15,33,60,133,158,34,60,224,47,36,60,36,195,37,60,82,88,39,60,105,239,40,60,106,136,42,60,84,35,44,60,40,192,45,60,229,94,47,60,139,255,48,60,26,162,50,60,146,70,52,60,243,236,53,60,61,149,55,60,112,63,57,60,140,235,58,60,145,153,60,60,126,73,62,60,84,251,63,60,18,175,65,60,185,100,67,60,72,28,69,60,192,213,70,60,31,145,72,60,103,78,74,60,151,13,76,60,175,206,77,60,176,145,79,60,152,86,81,60,103,29,83,60,31,230,
84,60,190,176,86,60,69,125,88,60,179,75,90,60,9,28,92,60,71,238,93,60,107,194,95,60,119,152,97,60,106,112,99,60,68,74,101,60,5,38,103,60,173,3,105,60,60,227,106,60,178,196,108,60,14,168,110,60,81,141,112,60,123,116,114,60,139,93,116,60,130,72,118,60,95,53,120,60,34,36,122,60,203,20,124,60,90,7,126,60,208,251,127,60,22,249,128,60,54,245,129,60,74,242,130,60,80,240,131,60,73,239,132,60,53,239,133,60,19,240,134,60,229,241,135,60,169,244,136,60,95,248,137,60,8,253,138,60,164,2,140,60,50,9,141,60,178,
16,142,60,37,25,143,60,139,34,144,60,226,44,145,60,44,56,146,60,104,68,147,60,150,81,148,60,182,95,149,60,201,110,150,60,205,126,151,60,196,143,152,60,172,161,153,60,135,180,154,60,83,200,155,60,17,221,156,60,193,242,157,60,98,9,159,60,245,32,160,60,122,57,161,60,241,82,162,60,89,109,163,60,178,136,164,60,253,164,165,60,57,194,166,60,103,224,167,60,134,255,168,60,151,31,170,60,152,64,171,60,139,98,172,60,111,133,173,60,68,169,174,60,10,206,175,60,193,243,176,60,105,26,178,60,2,66,179,60,139,106,180,
60,6,148,181,60,113,190,182,60,205,233,183,60,26,22,185,60,87,67,186,60,133,113,187,60,163,160,188,60,177,208,189,60,177,1,191,60,160,51,192,60,128,102,193,60,80,154,194,60,16,207,195,60,193,4,197,60,97,59,198,60,242,114,199,60,114,171,200,60,227,228,201,60,67,31,203,60,147,90,204,60,211,150,205,60,3,212,206,60,34,18,208,60,49,81,209,60,48,145,210,60,30,210,211,60,252,19,213,60,201,86,214,60,133,154,215,60,49,223,216,60,204,36,218,60,86,107,219,60,208,178,220,60,56,251,221,60,144,68,223,60,214,142,
224,60,12,218,225,60,48,38,227,60,67,115,228,60,69,193,229,60,54,16,231,60,21,96,232,60,227,176,233,60,160,2,235,60,75,85,236,60,228,168,237,60,108,253,238,60,226,82,240,60,70,169,241,60,153,0,243,60,218,88,244,60,8,178,245,60,37,12,247,60,48,103,248,60,41,195,249,60,15,32,251,60,228,125,252,60,166,220,253,60,85,60,255,60,121,78,0,61,63,255,0,61,123,176,1,61,46,98,2,61,88,20,3,61,248,198,3,61,15,122,4,61,156,45,5,61,161,225,5,61,27,150,6,61,12,75,7,61,116,0,8,61,82,182,8,61,167,108,9,61,113,35,10,
61,179,218,10,61,106,146,11,61,152,74,12,61,60,3,13,61,87,188,13,61,231,117,14,61,238,47,15,61,107,234,15,61,94,165,16,61,199,96,17,61,166,28,18,61,251,216,18,61,198,149,19,61,7,83,20,61,190,16,21,61,234,206,21,61,141,141,22,61,165,76,23,61,52,12,24,61,56,204,24,61,177,140,25,61,161,77,26,61,6,15,27,61,224,208,27,61,48,147,28,61,246,85,29,61,49,25,30,61,226,220,30,61,8,161,31,61,164,101,32,61,181,42,33,61,59,240,33,61,55,182,34,61,168,124,35,61,142,67,36,61,233,10,37,61,186,210,37,61,255,154,38,61,
186,99,39,61,234,44,40,61,143,246,40,61,168,192,41,61,55,139,42,61,59,86,43,61,180,33,44,61,161,237,44,61,4,186,45,61,219,134,46,61,38,84,47,61,231,33,48,61,28,240,48,61,198,190,49,61,229,141,50,61,120,93,51,61,127,45,52,61,251,253,52,61,236,206,53,61,81,160,54,61,42,114,55,61,120,68,56,61,58,23,57,61,112,234,57,61,27,190,58,61,58,146,59,61,204,102,60,61,211,59,61,61,79,17,62,61,62,231,62,61,161,189,63,61,120,148,64,61,195,107,65,61,130,67,66,61,181,27,67,61,92,244,67,61,118,205,68,61,4,167,69,61,
6,129,70,61,124,91,71,61,101,54,72,61,194,17,73,61,146,237,73,61,214,201,74,61,141,166,75,61,184,131,76,61,86,97,77,61,104,63,78,61,236,29,79,61,229,252,79,61,80,220,80,61,46,188,81,61,128,156,82,61,69,125,83,61,125,94,84,61,40,64,85,61,69,34,86,61,214,4,87,61,218,231,87,61,81,203,88,61,58,175,89,61,150,147,90,61,101,120,91,61,167,93,92,61,91,67,93,61,130,41,94,61,28,16,95,61,40,247,95,61,167,222,96,61,152,198,97,61,251,174,98,61,209,151,99,61,25,129,100,61,212,106,101,61,0,85,102,61,159,63,103,61,
176,42,104,61,51,22,105,61,41,2,106,61,144,238,106,61,105,219,107,61,180,200,108,61,113,182,109,61,160,164,110,61,65,147,111,61,84,130,112,61,216,113,113,61,206,97,114,61,54,82,115,61,15,67,116,61,89,52,117,61,22,38,118,61,67,24,119,61,226,10,120,61,243,253,120,61,117,241,121,61,104,229,122,61,204,217,123,61,162,206,124,61,232,195,125,61,160,185,126,61,201,175,127,61,49,83,128,61,183,206,128,61,117,74,129,61,107,198,129,61,154,66,130,61,1,191,130,61,160,59,131,61,120,184,131,61,136,53,132,61,209,
178,132,61,81,48,133,61,10,174,133,61,251,43,134,61,37,170,134,61,134,40,135,61,32,167,135,61,242,37,136,61,252,164,136,61,62,36,137,61,184,163,137,61,106,35,138,61,84,163,138,61,118,35,139,61,209,163,139,61,99,36,140,61,45,165,140,61,46,38,141,61,104,167,141,61,218,40,142,61,131,170,142,61,100,44,143,61,125,174,143,61,206,48,144,61,86,179,144,61,23,54,145,61,14,185,145,61,62,60,146,61,165,191,146,61,67,67,147,61,26,199,147,61,39,75,148,61,109,207,148,61,234,83,149,61,158,216,149,61,138,93,150,61,
173,226,150,61,7,104,151,61,153,237,151,61,98,115,152,61,99,249,152,61,155,127,153,61,10,6,154,61,176,140,154,61,142,19,155,61,163,154,155,61,239,33,156,61,114,169,156,61,44,49,157,61,29,185,157,61,69,65,158,61,165,201,158,61,59,82,159,61,8,219,159,61],"i8",4,h.e+10240);x([13,100,160,61,72,237,160,61,186,118,161,61,99,0,162,61,67,138,162,61,90,20,163,61,167,158,163,61,43,41,164,61,230,179,164,61,216,62,165,61,0,202,165,61,95,85,166,61,245,224,166,61,193,108,167,61,196,248,167,61,254,132,168,61,110,
17,169,61,20,158,169,61,241,42,170,61,4,184,170,61,78,69,171,61,206,210,171,61,133,96,172,61,113,238,172,61,149,124,173,61,238,10,174,61,126,153,174,61,67,40,175,61,63,183,175,61,114,70,176,61,218,213,176,61,120,101,177,61,77,245,177,61,88,133,178,61,152,21,179,61,15,166,179,61,187,54,180,61,158,199,180,61,182,88,181,61,4,234,181,61,137,123,182,61,67,13,183,61,50,159,183,61,88,49,184,61,179,195,184,61,68,86,185,61,11,233,185,61,7,124,186,61,57,15,187,61,160,162,187,61,61,54,188,61,16,202,188,61,24,
94,189,61,85,242,189,61,200,134,190,61,112,27,191,61,78,176,191,61,97,69,192,61,170,218,192,61,39,112,193,61,218,5,194,61,194,155,194,61,224,49,195,61,50,200,195,61,186,94,196,61,119,245,196,61,104,140,197,61,143,35,198,61,235,186,198,61,124,82,199,61,66,234,199,61,61,130,200,61,108,26,201,61,209,178,201,61,106,75,202,61,57,228,202,61,59,125,203,61,115,22,204,61,224,175,204,61,129,73,205,61,86,227,205,61,97,125,206,61,159,23,207,61,19,178,207,61,187,76,208,61,151,231,208,61,168,130,209,61,237,29,
210,61,103,185,210,61,21,85,211,61,248,240,211,61,14,141,212,61,89,41,213,61,216,197,213,61,140,98,214,61,115,255,214,61,143,156,215,61,223,57,216,61,99,215,216,61,27,117,217,61,7,19,218,61,38,177,218,61,122,79,219,61,2,238,219,61,189,140,220,61,173,43,221,61,208,202,221,61,39,106,222,61,178,9,223,61,112,169,223,61,98,73,224,61,136,233,224,61,226,137,225,61,111,42,226,61,47,203,226,61,35,108,227,61,74,13,228,61,165,174,228,61,52,80,229,61,245,241,229,61,234,147,230,61,19,54,231,61,110,216,231,61,
253,122,232,61,191,29,233,61,180,192,233,61,221,99,234,61,56,7,235,61,199,170,235,61,136,78,236,61,125,242,236,61,164,150,237,61,255,58,238,61,140,223,238,61,76,132,239,61,63,41,240,61,101,206,240,61,189,115,241,61,73,25,242,61,7,191,242,61,247,100,243,61,26,11,244,61,112,177,244,61,248,87,245,61,179,254,245,61,160,165,246,61,192,76,247,61,18,244,247,61,151,155,248,61,77,67,249,61,55,235,249,61,82,147,250,61,159,59,251,61,31,228,251,61,209,140,252,61,181,53,253,61,203,222,253,61,19,136,254,61,141,
49,255,61,57,219,255,61,140,66,0,62,148,151,0,62,181,236,0,62,238,65,1,62,65,151,1,62,173,236,1,62,49,66,2,62,206,151,2,62,132,237,2,62,83,67,3,62,59,153,3,62,59,239,3,62,84,69,4,62,134,155,4,62,209,241,4,62,52,72,5,62,176,158,5,62,68,245,5,62,242,75,6,62,183,162,6,62,150,249,6,62,141,80,7,62,156,167,7,62,196,254,7,62,5,86,8,62,94,173,8,62,207,4,9,62,89,92,9,62,252,179,9,62,183,11,10,62,138,99,10,62,118,187,10,62,122,19,11,62,150,107,11,62,203,195,11,62,24,28,12,62,125,116,12,62,250,204,12,62,144,
37,13,62,62,126,13,62,4,215,13,62,227,47,14,62,217,136,14,62,232,225,14,62,15,59,15,62,78,148,15,62,165,237,15,62,20,71,16,62,155,160,16,62,58,250,16,62,241,83,17,62,193,173,17,62,168,7,18,62,167,97,18,62,190,187,18,62,237,21,19,62,51,112,19,62,146,202,19,62,9,37,20,62,151,127,20,62,61,218,20,62,251,52,21,62,209,143,21,62,190,234,21,62,195,69,22,62,224,160,22,62,21,252,22,62,97,87,23,62,197,178,23,62,64,14,24,62,211,105,24,62,126,197,24,62,64,33,25,62,26,125,25,62,11,217,25,62,20,53,26,62,52,145,
26,62,108,237,26,62,187,73,27,62,34,166,27,62,160,2,28,62,53,95,28,62,226,187,28,62,166,24,29,62,129,117,29,62,116,210,29,62,126,47,30,62,159,140,30,62,215,233,30,62,39,71,31,62,141,164,31,62,11,2,32,62,160,95,32,62,76,189,32,62,16,27,33,62,234,120,33,62,219,214,33,62,228,52,34,62,3,147,34,62,58,241,34,62,135,79,35,62,235,173,35,62,103,12,36,62,249,106,36,62,162,201,36,62,98,40,37,62,56,135,37,62,38,230,37,62,42,69,38,62,69,164,38,62,119,3,39,62,192,98,39,62,31,194,39,62,149,33,40,62,33,129,40,62,
197,224,40,62,126,64,41,62,79,160,41,62,54,0,42,62,51,96,42,62,72,192,42,62,114,32,43,62,179,128,43,62,11,225,43,62,121,65,44,62,253,161,44,62,152,2,45,62,73,99,45,62,16,196,45,62,238,36,46,62,226,133,46,62,237,230,46,62,13,72,47,62,68,169,47,62,145,10,48,62,245,107,48,62,110,205,48,62,254,46,49,62,163,144,49,62,95,242,49,62,49,84,50,62,25,182,50,62,23,24,51,62,43,122,51,62,85,220,51,62,148,62,52,62,234,160,52,62,86,3,53,62,216,101,53,62,111,200,53,62,28,43,54,62,223,141,54,62,184,240,54,62,167,83,
55,62,171,182,55,62,197,25,56,62,245,124,56,62,59,224,56,62,150,67,57,62,7,167,57,62,141,10,58,62,41,110,58,62,219,209,58,62,162,53,59,62,126,153,59,62,112,253,59,62,120,97,60,62,149,197,60,62,199,41,61,62,15,142,61,62,108,242,61,62,222,86,62,62,102,187,62,62,3,32,63,62,181,132,63,62,125,233,63,62,90,78,64,62,75,179,64,62,83,24,65,62,111,125,65,62,160,226,65,62,231,71,66,62,66,173,66,62,179,18,67,62,57,120,67,62,211,221,67,62,131,67,68,62,71,169,68,62,33,15,69,62,15,117,69,62,18,219,69,62,42,65,70,
62,87,167,70,62,153,13,71,62,240,115,71,62,91,218,71,62,219,64,72,62,111,167,72,62,25,14,73,62,215,116,73,62,169,219,73,62,144,66,74,62,140,169,74,62,157,16,75,62,193,119,75,62,251,222,75,62,73,70,76,62,171,173,76,62,34,21,77,62,173,124,77,62,76,228,77,62,0,76,78,62,200,179,78,62,164,27,79,62,149,131,79,62,154,235,79,62,179,83,80,62,225,187,80,62,34,36,81,62,120,140,81,62,225,244,81,62,95,93,82,62,241,197,82,62,151,46,83,62,81,151,83,62,31,0,84,62,1,105,84,62,247,209,84,62,0,59,85,62,30,164,85,62,
79,13,86,62,149,118,86,62,238,223,86,62,91,73,87,62,219,178,87,62,112,28,88,62,24,134,88,62,211,239,88,62,163,89,89,62,134,195,89,62,124,45,90,62,134,151,90,62,164,1,91,62,213,107,91,62,26,214,91,62,114,64,92,62,221,170,92,62,92,21,93,62,239,127,93,62,148,234,93,62,77,85,94,62,26,192,94,62,249,42,95,62,236,149,95,62,242,0,96,62,11,108,96,62,55,215,96,62,119,66,97,62,202,173,97,62,47,25,98,62,168,132,98,62,52,240,98,62,210,91,99,62,132,199,99,62,73,51,100,62,32,159,100,62,11,11,101,62,8,119,101,62,
24,227,101,62,59,79,102,62,113,187,102,62,186,39,103,62,21,148,103,62,131,0,104,62,3,109,104,62,151,217,104,62,60,70,105,62,245,178,105,62,192,31,106,62,157,140,106,62,141,249,106,62,144,102,107,62,165,211,107,62,204,64,108,62,6,174,108,62,82,27,109,62,176,136,109,62,33,246,109,62,164,99,110,62,57,209,110,62,225,62,111,62,154,172,111,62,102,26,112,62,68,136,112,62,52,246,112,62,55,100,113,62,75,210,113,62,113,64,114,62,169,174,114,62,243,28,115,62,80,139,115,62,190,249,115,62,61,104,116,62,207,214,
116,62,115,69,117,62,40,180,117,62,239,34,118,62,200,145,118,62,179,0,119,62,175,111,119,62,189,222,119,62,221,77,120,62,14,189,120,62,80,44,121,62,165,155,121,62,10,11,122,62,130,122,122,62,10,234,122,62,164,89,123,62,80,201,123,62,13,57,124,62,219,168,124,62,186,24,125,62,171,136,125,62,173,248,125,62,192,104,126,62,228,216,126,62,26,73,127,62,96,185,127,62,220,20,128,62,16,77,128,62,77,133,128,62,147,189,128,62,225,245,128,62,55,46,129,62,150,102,129,62,253,158,129,62,109,215,129,62,229,15,130,
62,102,72,130,62,238,128,130,62,128,185,130,62,25,242,130,62,187,42,131,62,102,99,131,62,24,156,131,62,211,212,131,62,150,13,132,62,98,70,132,62,53,127,132,62,17,184,132,62,245,240,132,62,226,41,133,62,214,98,133,62,211,155,133,62,216,212,133,62,229,13,134,62,250,70,134,62,23,128,134,62,61,185,134,62,106,242,134,62,160,43,135,62,221,100,135,62,35,158,135,62,112,215,135,62,198,16,136,62,35,74,136,62,137,131,136,62,247,188,136,62,108,246,136,62,233,47,137,62,111,105,137,62,252,162,137,62,145,220,137,
62,46,22,138,62,211,79,138,62,127,137,138,62,52,195,138,62,240,252,138,62,180,54,139,62,128,112,139,62,84,170,139,62,47,228,139,62,18,30,140,62,253,87,140,62,239,145,140,62,233,203,140,62,235,5,141,62,245,63,141,62,6,122,141,62,31,180,141,62,63,238,141,62,103,40,142,62,150,98,142,62,205,156,142,62,12,215,142,62,82,17,143,62,159,75,143,62,245,133,143,62,81,192,143,62,181,250,143,62,33,53,144,62,147,111,144,62,14,170,144,62,143,228,144,62,25,31,145,62,169,89,145,62,65,148,145,62,224,206,145,62,134,
9,146,62,52,68,146,62,233,126,146,62,165,185,146,62,105,244,146,62,52,47,147,62,6,106,147,62,223,164,147,62,191,223,147,62,167,26,148,62,150,85,148,62,139,144,148,62,136,203,148,62,140,6,149,62,152,65,149,62,170,124,149,62,195,183,149,62,227,242,149,62,11,46,150,62,57,105,150,62,111,164,150,62,171,223,150,62,238,26,151,62,56,86,151,62,138,145,151,62,226,204,151,62,65,8,152,62,167,67,152,62,19,127,152,62,135,186,152,62,1,246,152,62,130,49,153,62,10,109,153,62,153,168,153,62,47,228,153,62,203,31,154,
62,110,91,154,62,24,151,154,62,200,210,154,62,127,14,155,62,61,74,155,62,2,134,155,62,205,193,155,62,158,253,155,62,119,57,156,62,85,117,156,62,59,177,156,62,39,237,156,62,25,41,157,62,18,101,157,62,18,161,157,62,24,221,157,62,36,25,158,62,55,85,158,62,80,145,158,62,112,205,158,62,150,9,159,62,195,69,159,62,246,129,159,62,47,190,159,62,111,250,159,62,180,54,160,62,1,115,160,62,83,175,160,62,172,235,160,62,11,40,161,62,112,100,161,62,219,160,161,62,77,221,161,62,196,25,162,62,66,86,162,62,198,146,
162,62,81,207,162,62,225,11,163,62,119,72,163,62,20,133,163,62,182,193,163,62,95,254,163,62,13,59,164,62,194,119,164,62,125,180,164,62,61,241,164,62,4,46,165,62,208,106,165,62,162,167,165,62,123,228,165,62,89,33,166,62,61,94,166,62,39,155,166,62,23,216,166,62,12,21,167,62,7,82,167,62,8,143,167,62,15,204,167,62,28,9,168,62,46,70,168,62,70,131,168,62,100,192,168,62,136,253,168,62,177,58,169,62,223,119,169,62,20,181,169,62,78,242,169,62,141,47,170,62,211,108,170,62,29,170,170,62,109,231,170,62,195,36,
171,62,31,98,171,62,127,159,171,62,230,220,171,62,81,26,172,62,194,87,172,62,57,149,172,62,181,210,172,62,54,16,173,62,189,77,173,62,73,139,173,62,218,200,173,62,113,6,174,62,13,68,174,62,174,129,174,62,85,191,174,62,0,253,174,62,177,58,175,62,103,120,175,62,35,182,175,62,227,243,175,62,169,49,176,62,116,111,176,62,68,173,176,62,25,235,176,62,243,40,177,62,210,102,177,62,182,164,177,62,160,226,177,62,142,32,178,62,129,94,178,62,121,156,178,62,119,218,178,62,121,24,179,62,128,86,179,62,140,148,179,
62,157,210,179,62,178,16,180,62,205,78,180,62,236,140,180,62,16,203,180,62,57,9,181,62,103,71,181,62,154,133,181,62,209,195,181,62,13,2,182,62,78,64,182,62,147,126,182,62,221,188,182,62,44,251,182,62,127,57,183,62,215,119,183,62,52,182,183,62,149,244,183,62,251,50,184,62,101,113,184,62,212,175,184,62,71,238,184,62,191,44,185,62,59,107,185,62,188,169,185,62,65,232,185,62,202,38,186,62,88,101,186,62,235,163,186,62,129,226,186,62,28,33,187,62,188,95,187,62,95,158,187,62,7,221,187,62,180,27,188,62,100,
90,188,62,25,153,188,62,210,215,188,62,143,22,189,62,80,85,189,62,22,148,189,62,223,210,189,62,173,17,190,62,127,80,190,62,85,143,190,62,47,206,190,62,13,13,191,62,239,75,191,62,213,138,191,62,191,201,191,62,173,8,192,62,159,71,192,62,149,134,192,62,143,197,192,62,141,4,193,62,143,67,193,62,148,130,193,62,158,193,193,62,171,0,194,62,188,63,194,62,209,126,194,62,234,189,194,62,6,253,194,62,38,60,195,62,74,123,195,62,113,186,195,62,157,249,195,62,204,56,196,62,254,119,196,62,52,183,196,62,110,246,196,
62,171,53,197,62,236,116,197,62,49,180,197,62,121,243,197,62,196,50,198,62,19,114,198,62,102,177,198,62,188,240,198,62,21,48,199,62,114,111,199,62,210,174,199,62,54,238,199,62,157,45,200,62,7,109,200,62,117,172,200,62,230,235,200,62,90,43,201,62,209,106,201,62,76,170,201,62,202,233,201,62,75,41,202,62,208,104,202,62,88,168,202,62,226,231,202,62,112,39,203,62,1,103,203,62,149,166,203,62,45,230,203,62,199,37,204,62,100,101,204,62,4,165,204,62,168,228,204,62,78,36,205,62,248,99,205,62,164,163,205,62,
83,227,205,62,5,35,206,62,186,98,206,62,114,162,206,62,45,226,206,62,234,33,207,62,171,97,207,62,110,161,207,62,52,225,207,62,253,32,208,62,200,96,208,62,150,160,208,62,103,224,208,62,59,32,209,62,17,96,209,62,234,159,209,62,198,223,209,62,164,31,210,62,133,95,210,62,104,159,210,62,78,223,210,62,55,31,211,62,33,95,211,62,15,159,211,62,255,222,211,62,241,30,212,62,230,94,212,62,221,158,212,62,215,222,212,62,211,30,213,62,209,94,213,62,210,158,213,62,213,222,213,62,219,30,214,62,226,94,214,62,236,158,
214,62,248,222,214,62,7,31,215,62,24,95,215,62,42,159,215,62,63,223,215,62,87,31,216,62,112,95,216,62,139,159,216,62,169,223,216,62,200,31,217,62,234,95,217,62,14,160,217,62,51,224,217,62,91,32,218,62,133,96,218,62,176,160,218,62,222,224,218,62,13,33,219,62,63,97,219,62,114,161,219,62,167,225,219,62,222,33,220,62,23,98,220,62,82,162,220,62,142,226,220,62,204,34,221,62,12,99,221,62,78,163,221,62,146,227,221,62,215,35,222,62,29,100,222,62,102,164,222,62,176,228,222,62,252,36,223,62,73,101,223,62,152,
165,223,62,232,229,223,62,58,38,224,62,142,102,224,62,227,166,224,62,57,231,224,62,145,39,225,62,234,103,225,62,69,168,225,62,161,232,225,62,255,40,226,62,94,105,226,62,190,169,226,62,32,234,226,62,131,42,227,62,231,106,227,62,76,171,227,62,179,235,227,62,27,44,228,62,132,108,228,62,238,172,228,62,90,237,228,62,199,45,229,62,52,110,229,62,163,174,229,62,19,239,229,62,133,47,230,62,247,111,230,62,106,176,230,62,222,240,230,62,83,49,231,62,202,113,231,62,65,178,231,62,185,242,231,62,50,51,232,62,172,
115,232,62,38,180,232,62,162,244,232,62,31,53,233,62,156,117,233,62,26,182,233,62,153,246,233,62,25,55,234,62,153,119,234,62,26,184,234,62,156,248,234,62,31,57,235,62,162,121,235,62,38,186,235,62,170,250,235,62,47,59,236,62,181,123,236,62,59,188,236,62,194,252,236,62,73,61,237,62,209,125,237,62,89,190,237,62,226,254,237,62,107,63,238,62,245,127,238,62,127,192,238,62,10,1,239,62,149,65,239,62,32,130,239,62,171,194,239,62,55,3,240,62,196,67,240,62,80,132,240,62,221,196,240,62,106,5,241,62,247,69,241,
62,132,134,241,62,18,199,241,62,160,7,242,62,45,72,242,62,187,136,242,62,74,201,242,62,216,9,243,62,102,74,243,62,244,138,243,62,131,203,243,62,17,12,244,62,159,76,244,62,46,141,244,62,188,205,244,62,74,14,245,62,216,78,245,62,102,143,245,62,244,207,245,62,129,16,246,62,15,81,246,62,156,145,246,62,41,210,246,62,182,18,247,62,67,83,247,62,207,147,247,62,91,212,247,62,231,20,248,62,115,85,248,62,254,149,248,62,136,214,248,62,19,23,249,62,157,87,249,62,38,152,249,62,175,216,249,62,56,25,250,62,192,89,
250,62,72,154,250,62,207,218,250,62,86,27,251,62,220,91,251,62,97,156,251,62,230,220,251,62,106,29,252,62,238,93,252,62,113,158,252,62,243,222,252,62,117,31,253,62,245,95,253,62,118,160,253,62,245,224,253,62,116,33,254,62,241,97,254,62,110,162,254,62,235,226,254,62,102,35,255,62,224,99,255,62,90,164,255,62,211,228,255,62,165,18,0,63,225,50,0,63,27,83,0,63,86,115,0,63,144,147,0,63,201,179,0,63,2,212,0,63,58,244,0,63,114,20,1,63,169,52,1,63,224,84,1,63,22,117,1,63,76,149,1,63,129,181,1,63,181,213,1,
63,233,245,1,63,28,22,2,63,78,54,2,63,128,86,2,63,178,118,2,63,226,150,2,63,18,183,2,63,65,215,2,63,112,247,2,63,157,23,3,63,203,55,3,63,247,87,3,63,35,120,3,63,78,152,3,63,120,184,3,63,161,216,3,63,202,248,3,63,242,24,4,63,25,57,4,63,63,89,4,63,101,121,4,63,137,153,4,63,173,185,4,63,208,217,4,63,243,249,4,63,20,26,5,63,52,58,5,63,84,90,5,63,115,122,5,63,145,154,5,63,173,186,5,63,202,218,5,63,229,250,5,63,255,26,6,63,24,59,6,63,48,91,6,63,72,123,6,63,94,155,6,63,116,187,6,63,136,219,6,63,155,251,
6,63,174,27,7,63,191,59,7,63,208,91,7,63,223,123,7,63,237,155,7,63,250,187,7,63,7,220,7,63,18,252,7,63,28,28,8,63,37,60,8,63,44,92,8,63,51,124,8,63,57,156,8,63,61,188,8,63,64,220,8,63,67,252,8,63,68,28,9,63,68,60,9,63,66,92,9,63,64,124,9,63,60,156,9,63,55,188,9,63,49,220,9,63,41,252,9,63,33,28,10,63,23,60,10,63,12,92,10,63,255,123,10,63,242,155,10,63,227,187,10,63,211,219,10,63,193,251,10,63,174,27,11,63,154,59,11,63,133,91,11,63,110,123,11,63,86,155,11,63,60,187,11,63,33,219,11,63,5,251,11,63,231,
26,12,63,200,58,12,63,168,90,12,63,134,122,12,63,98,154,12,63,62,186,12,63,23,218,12,63,240,249,12,63,199,25,13,63,156,57,13,63,112,89,13,63,66,121,13,63,19,153,13,63,227,184,13,63,176,216,13,63,125,248,13,63,72,24,14,63,17,56,14,63,216,87,14,63,159,119,14,63,99,151,14,63,38,183,14,63,232,214,14,63,167,246,14,63,101,22,15,63,34,54,15,63,221,85,15,63,150,117,15,63,78,149,15,63,4,181,15,63,184,212,15,63,106,244,15,63,27,20,16,63,202,51,16,63,120,83,16,63,36,115,16,63,206,146,16,63,118,178,16,63,28,
210,16,63,193,241,16,63,100,17,17,63,6,49,17,63,165,80,17,63,67,112,17,63,223,143,17,63,121,175,17,63,17,207,17,63,167,238,17,63,60,14,18,63,206,45,18,63,95,77,18,63,238,108,18,63,123,140,18,63,7,172,18,63,144,203,18,63,23,235,18,63,157,10,19,63,32,42,19,63,162,73,19,63,34,105,19,63,159,136,19,63,27,168,19,63,149,199,19,63,13,231,19,63,131,6,20,63,247,37,20,63,104,69,20,63,216,100,20,63,70,132,20,63,178,163,20,63,27,195,20,63,131,226,20,63,233,1,21,63,76,33,21,63,174,64,21,63,13,96,21,63,106,127,
21,63,197,158,21,63,31,190,21,63,117,221,21,63,202,252,21,63,29,28,22,63,109,59,22,63,188,90,22,63,8,122,22,63,82,153,22,63,153,184,22,63,223,215,22,63,34,247,22,63,100,22,23,63,162,53,23,63,223,84,23,63,26,116,23,63,82,147,23,63,136,178,23,63,187,209,23,63,237,240,23,63,28,16,24,63,73,47,24,63,115,78,24,63,155,109,24,63,193,140,24,63,228,171,24,63,6,203,24,63,36,234,24,63,65,9,25,63,91,40,25,63,115,71,25,63,136,102,25,63,155,133,25,63,171,164,25,63,185,195,25,63,197,226,25,63,206,1,26,63,213,32,
26,63,217,63,26,63,219,94,26,63,218,125,26,63,215,156,26,63,210,187,26,63,202,218,26,63,191,249,26,63,178,24,27,63,162,55,27,63,144,86,27,63,123,117,27,63,100,148,27,63,74,179,27,63,46,210,27,63,15,241,27,63,237,15,28,63,201,46,28,63,162,77,28,63,121,108,28,63,77,139,28,63,31,170,28,63,237,200,28,63,185,231,28,63,131,6,29,63,74,37,29,63,14,68,29,63,207,98,29,63,142,129,29,63,74,160,29,63,3,191,29,63,186,221,29,63,110,252,29,63,31,27,30,63,205,57,30,63,121,88,30,63,34,119,30,63,200,149,30,63,107,180,
30,63,12,211,30,63,170,241,30,63,69,16,31,63,221,46,31,63,114,77,31,63,5,108,31,63,148,138,31,63,33,169,31,63,171,199,31,63,50,230,31,63,182,4,32,63,56,35,32,63,182,65,32,63,50,96,32,63,170,126,32,63,32,157,32,63,147,187,32,63,3,218,32,63,112,248,32,63,218,22,33,63,65,53,33,63,165,83,33,63,6,114,33,63,100,144,33,63,191,174,33,63,23,205,33,63,108,235,33,63,190,9,34,63,13,40,34,63,89,70,34,63,162,100,34,63,232,130,34,63,43,161,34,63,107,191,34,63,167,221,34,63,225,251,34,63,24,26,35,63,75,56,35,63,
123,86,35,63,168,116,35,63,211,146,35,63,249,176,35,63,29,207,35,63,62,237,35,63,91,11,36,63,118,41,36,63,141,71,36,63,161,101,36,63,177,131,36,63,191,161,36,63,201,191,36,63,208,221,36,63,212,251,36,63,213,25,37,63,210,55,37,63,204,85,37,63,195,115,37,63,183,145,37,63,167,175,37,63,148,205,37,63,126,235,37,63,101,9,38,63,72,39,38,63,40,69,38,63,4,99,38,63,221,128,38,63,179,158,38,63,134,188,38,63,85,218,38,63,33,248,38,63,233,21,39,63,174,51,39,63,112,81,39,63,46,111,39,63,233,140,39,63,160,170,
39,63,84,200,39,63,4,230,39,63,178,3,40,63,91,33,40,63,1,63,40,63,164,92,40,63,67,122,40,63,223,151,40,63,120,181,40,63,12,211,40,63,158,240,40,63,43,14,41,63,182,43,41,63,60,73,41,63,192,102,41,63,63,132,41,63,187,161,41,63,52,191,41,63,169,220,41,63,26,250,41,63,136,23,42,63,242,52,42,63,89,82,42,63,188,111,42,63,28,141,42,63,119,170,42,63,208,199,42,63,36,229,42,63,117,2,43,63,194,31,43,63,12,61,43,63,82,90,43,63,148,119,43,63,211,148,43,63,14,178,43,63,69,207,43,63,120,236,43,63,168,9,44,63,212,
38,44,63,252,67,44,63,33,97,44,63,66,126,44,63,95,155,44,63,120,184,44,63,142,213,44,63,159,242,44,63,173,15,45,63,184,44,45,63,190,73,45,63,193,102,45,63,191,131,45,63,186,160,45,63,177,189,45,63,165,218,45,63,148,247,45,63,128,20,46,63,103,49,46,63,75,78,46,63,43,107,46,63,7,136,46,63,224,164,46,63,180,193,46,63,132,222,46,63,81,251,46,63,26,24,47,63,222,52,47,63,159,81,47,63,92,110,47,63,21,139,47,63,202,167,47,63,123,196,47,63,40,225,47,63,209,253,47,63,118,26,48,63,23,55,48,63,180,83,48,63,77,
112,48,63,226,140,48,63,115,169,48,63,0,198,48,63,137,226,48,63,14,255,48,63,142,27,49,63,11,56,49,63,132,84,49,63,248,112,49,63,105,141,49,63,214,169,49,63,62,198,49,63,162,226,49,63,2,255,49,63,95,27,50,63,182,55,50,63,10,84,50,63,90,112,50,63,166,140,50,63,237,168,50,63,48,197,50,63,111,225,50,63,170,253,50,63,225,25,51,63,19,54,51,63,66,82,51,63,108,110,51,63,146,138,51,63,180,166,51,63,209,194,51,63,234,222,51,63,0,251,51,63,16,23,52,63,29,51,52,63,37,79,52,63,41,107,52,63,41,135,52,63,37,163,
52,63,28,191,52,63,15,219,52,63,253,246,52,63,232,18,53,63,206,46,53,63,176,74,53,63,141,102,53,63,102,130,53,63,59,158,53,63,11,186,53,63,215,213,53,63,159,241,53,63,98,13,54,63,33,41,54,63,220,68,54,63,146,96,54,63,68,124,54,63,241,151,54,63,154,179,54,63,63,207,54,63,223,234,54,63,123,6,55,63,18,34,55,63,165,61,55,63,52,89,55,63,190,116,55,63,67,144,55,63,196,171,55,63,65,199,55,63,185,226,55,63,45,254,55,63,156,25,56,63,7,53,56,63,109,80,56,63,207,107,56,63,44,135,56,63,133,162,56,63,217,189,
56,63,40,217,56,63,115,244,56,63,186,15,57,63,252,42,57,63,57,70,57,63,114,97,57,63,166,124,57,63,214,151,57,63,1,179,57,63,40,206,57,63,74,233,57,63,103,4,58,63,128,31,58,63,148,58,58,63,163,85,58,63,174,112,58,63,180,139,58,63,182,166,58,63,179,193,58,63,171,220,58,63,159,247,58,63,142,18,59,63,120,45,59,63,94,72,59,63,63,99,59,63,27,126,59,63,243,152,59,63,197,179,59,63,148,206,59,63,93,233,59,63,34,4,60,63,226,30,60,63,157,57,60,63,84,84,60,63,5,111,60,63,178,137,60,63,91,164,60,63,254,190,60,
63,157,217,60,63,55,244,60,63,204,14,61,63,93,41,61,63,232,67,61,63,111,94,61,63,241,120,61,63,110,147,61,63,231,173,61,63,91,200,61,63,201,226,61,63,51,253,61,63,152,23,62,63,249,49,62,63,84,76,62,63,171,102,62,63,252,128,62,63,73,155,62,63,145,181,62,63,212,207,62,63,19,234,62,63,76,4,63,63,128,30,63,63,176,56,63,63,219,82,63,63,0,109,63,63,33,135,63,63,61,161,63,63,84,187,63,63,102,213,63,63,115,239,63,63,123,9,64,63,127,35,64,63,125,61,64,63,118,87,64,63,106,113,64,63,90,139,64,63,68,165,64,63,
42,191,64,63,10,217,64,63,229,242,64,63,188,12,65,63,141,38,65,63,90,64,65,63,33,90,65,63,228,115,65,63,161,141,65,63,89,167,65,63,13,193,65,63,187,218,65,63,100,244,65,63,8,14,66,63,167,39,66,63,65,65,66,63,214,90,66,63,102,116,66,63,241,141,66,63,119,167,66,63,248,192,66,63,115,218,66,63,234,243,66,63,91,13,67,63,199,38,67,63,47,64,67,63,145,89,67,63,238,114,67,63,69,140,67,63,152,165,67,63,230,190,67,63,46,216,67,63,113,241,67,63,175,10,68,63,232,35,68,63,28,61,68,63,75,86,68,63,116,111,68,63,
153,136,68,63,184,161,68,63,210,186,68,63,230,211,68,63,246,236,68,63,0,6,69,63,5,31,69,63,5,56,69,63,0,81,69,63,245,105,69,63,230,130,69,63,209,155,69,63,182,180,69,63,151,205,69,63,114,230,69,63,72,255,69,63,25,24,70,63,229,48,70,63,171,73,70,63,108,98,70,63,40,123,70,63,222,147,70,63,143,172,70,63,59,197,70,63,226,221,70,63,131,246,70,63,31,15,71,63,182,39,71,63,71,64,71,63,211,88,71,63,90,113,71,63,220,137,71,63,88,162,71,63,207,186,71,63,64,211,71,63,172,235,71,63,19,4,72,63,116,28,72,63,209,
52,72,63,39,77,72,63,121,101,72,63,197,125,72,63,11,150,72,63,77,174,72,63,137,198,72,63,191,222,72,63,240,246,72,63,28,15,73,63,66,39,73,63,99,63,73,63,127,87,73,63,149,111,73,63,166,135,73,63,177,159,73,63,183,183,73,63,183,207,73,63,178,231,73,63,168,255,73,63,152,23,74,63,131,47,74,63,104,71,74,63,72,95,74,63,34,119,74,63,247,142,74,63,199,166,74,63,145,190,74,63,85,214,74,63,20,238,74,63,206,5,75,63,130,29,75,63,49,53,75,63,218,76,75,63,126,100,75,63,28,124,75,63,181,147,75,63,72,171,75,63,213,
194,75,63,93,218,75,63,224,241,75,63,93,9,76,63,213,32,76,63,71,56,76,63,179,79,76,63,26,103,76,63,124,126,76,63,216,149,76,63,46,173,76,63,127,196,76,63,202,219,76,63,16,243,76,63,80,10,77,63,139,33,77,63,192,56,77,63,240,79,77,63,26,103,77,63,62,126,77,63,93,149,77,63,118,172,77,63,137,195,77,63,151,218,77,63,160,241,77,63,163,8,78,63,160,31,78,63,151,54,78,63,137,77,78,63,118,100,78,63,93,123,78,63,62,146,78,63,25,169,78,63,239,191,78,63,192,214,78,63,138,237,78,63,79,4,79,63,15,27,79,63,201,49,
79,63,125,72,79,63,43,95,79,63,212,117,79,63,119,140,79,63,21,163,79,63,172,185,79,63,63,208,79,63,203,230,79,63,82,253,79,63,211,19,80,63,79,42,80,63,197,64,80,63,53,87,80,63,159,109,80,63,4,132,80,63,99,154,80,63,189,176,80,63,16,199,80,63,94,221,80,63,167,243,80,63,233,9,81,63,38,32,81,63,93,54,81,63,143,76,81,63,187,98,81,63,225,120,81,63,1,143,81,63,28,165,81,63,48,187,81,63,64,209,81,63,73,231,81,63,77,253,81,63,75,19,82,63,67,41,82,63,53,63,82,63,34,85,82,63,9,107,82,63,234,128,82,63,198,150,
82,63,155,172,82,63,107,194,82,63,53,216,82,63,250,237,82,63,185,3,83,63,113,25,83,63,37,47,83,63,210,68,83,63,121,90,83,63,27,112,83,63,183,133,83,63,77,155,83,63,222,176,83,63,104,198,83,63,237,219,83,63,108,241,83,63,230,6,84,63,89,28,84,63,199,49,84,63,46,71,84,63,145,92,84,63,237,113,84,63,67,135,84,63,148,156,84,63,223,177,84,63,35,199,84,63,99,220,84,63,156,241,84,63,207,6,85,63,253,27,85,63,37,49,85,63,71,70,85,63,99,91,85,63,121,112,85,63,138,133,85,63,149,154,85,63,153,175,85,63,152,196,
85,63,146,217,85,63,133,238,85,63,114,3,86,63,90,24,86,63,60,45,86,63,24,66,86,63,238,86,86,63,190,107,86,63,136,128,86,63,76,149,86,63,11,170,86,63,196,190,86,63,118,211,86,63,35,232,86,63,203,252,86,63,108,17,87,63,7,38,87,63,156,58,87,63,44,79,87,63,182,99,87,63,58,120,87,63,183,140,87,63,47,161,87,63,162,181,87,63,14,202,87,63,116,222,87,63,213,242,87,63,47,7,88,63,132,27,88,63,211,47,88,63,28,68,88,63,95,88,88,63,156,108,88,63,211,128,88,63,4,149,88,63,47,169,88,63,85,189,88,63,116,209,88,63,
142,229,88,63,162,249,88,63,175,13,89,63,183,33,89,63,185,53,89,63,181,73,89,63,171,93,89,63,155,113,89,63,134,133,89,63,106,153,89,63,72,173,89,63,33,193,89,63,243,212,89,63,192,232,89,63,135,252,89,63,71,16,90,63,2,36,90,63,183,55,90,63,102,75,90,63,15,95,90,63,178,114,90,63,79,134,90,63,230,153,90,63,119,173,90,63,3,193,90,63,136,212,90,63,7,232,90,63,129,251,90,63,244,14,91,63,98,34,91,63,201,53,91,63,43,73,91,63,135,92,91,63,220,111,91,63,44,131,91,63,118,150,91,63,186,169,91,63,248,188,91,63,
47,208,91,63,97,227,91,63,141,246,91,63,179,9,92,63,212,28,92,63,238,47,92,63,2,67,92,63,16,86,92,63,24,105,92,63,26,124,92,63,23,143,92,63,13,162,92,63,253,180,92,63,232,199,92,63,204,218,92,63,171,237,92,63,131,0,93,63,86,19,93,63,34,38,93,63,233,56,93,63,169,75,93,63,100,94,93,63,24,113,93,63,199,131,93,63,112,150,93,63,18,169,93,63,175,187,93,63,70,206,93,63,215,224,93,63,97,243,93,63,230,5,94,63,101,24,94,63,222,42,94,63,81,61,94,63,190,79,94,63,36,98,94,63,133,116,94,63,224,134,94,63,53,153,
94,63,132,171,94,63,205,189,94,63,16,208,94,63,77,226,94,63,132,244,94,63,181,6,95,63,224,24,95,63,5,43,95,63,36,61,95,63,61,79,95,63,80,97,95,63,93,115,95,63,101,133,95,63,102,151,95,63,97,169,95,63,86,187,95,63,69,205,95,63,46,223,95,63,18,241,95,63,239,2,96,63,198,20,96,63,151,38,96,63,98,56,96,63,40,74,96,63,231,91,96,63,160,109,96,63,84,127,96,63,1,145,96,63,168,162,96,63,73,180,96,63,229,197,96,63,122,215,96,63,10,233,96,63,147,250,96,63,22,12,97,63,148,29,97,63,11,47,97,63,125,64,97,63,232,
81,97,63,77,99,97,63,173,116,97,63,6,134,97,63,90,151,97,63,167,168,97,63,239,185,97,63,48,203,97,63,108,220,97,63,162,237,97,63,209,254,97,63,251,15,98,63,30,33,98,63,60,50,98,63,84,67,98,63,101,84,98,63,113,101,98,63,119,118,98,63,119,135,98,63,112,152,98,63,100,169,98,63,82,186,98,63,58,203,98,63,28,220,98,63,247,236,98,63,205,253,98,63,157,14,99,63,103,31,99,63,43,48,99,63,233,64,99,63,161,81,99,63,83,98,99,63,255,114,99,63,165,131,99,63,69,148,99,63,224,164,99,63,116,181,99,63,2,198,99,63,138,
214,99,63,13,231,99,63,137,247,99,63,255,7,100,63,112,24,100,63,218,40,100,63,62,57,100,63,157,73,100,63,246,89,100,63,72,106,100,63,149,122,100,63,219,138,100,63,28,155,100,63,87,171,100,63,140,187,100,63,186,203,100,63,227,219,100,63,6,236,100,63,35,252,100,63,58,12,101,63,75,28,101,63,86,44,101,63,91,60,101,63,91,76,101,63,84,92,101,63,71,108,101,63,53,124,101,63,28,140,101,63,254,155,101,63,217,171,101,63,175,187,101,63,126,203,101,63,72,219,101,63,12,235,101,63,202,250,101,63,130,10,102,63,52,
26,102,63,224,41,102,63,134,57,102,63,38,73,102,63,193,88,102,63,85,104,102,63,227,119,102,63,108,135,102,63,238,150,102,63,107,166,102,63,226,181,102,63,83,197,102,63,190,212,102,63,35,228,102,63,130,243,102,63,219,2,103,63,46,18,103,63,124,33,103,63,195,48,103,63,5,64,103,63,64,79,103,63,118,94,103,63,166,109,103,63,208,124,103,63,244,139,103,63,18,155,103,63,42,170,103,63,61,185,103,63,73,200,103,63,80,215,103,63,80,230,103,63,75,245,103,63,64,4,104,63,47,19,104,63,24,34,104,63,251,48,104,63,217,
63,104,63,176,78,104,63,130,93,104,63,78,108,104,63,20,123,104,63,212,137,104,63,142,152,104,63,66,167,104,63,240,181,104,63,153,196,104,63,60,211,104,63,217,225,104,63,112,240,104,63,1,255,104,63,140,13,105,63,17,28,105,63,145,42,105,63,11,57,105,63,127,71,105,63,237,85,105,63,85,100,105,63,183,114,105,63,20,129,105,63,106,143,105,63,187,157,105,63,6,172,105,63,75,186,105,63,139,200,105,63,196,214,105,63,248,228,105,63,38,243,105,63,78,1,106,63,112,15,106,63,141,29,106,63,163,43,106,63,180,57,106,
63,191,71,106,63,196,85,106,63,196,99,106,63,189,113,106,63,177,127,106,63,159,141,106,63,135,155,106,63,106,169,106,63,70,183,106,63,29,197,106,63,238,210,106,63,186,224,106,63,127,238,106,63,63,252,106,63,249,9,107,63,173,23,107,63,91,37,107,63,4,51,107,63,167,64,107,63,68,78,107,63,219,91,107,63,109,105,107,63,249,118,107,63,127,132,107,63,255,145,107,63,122,159,107,63,238,172,107,63,94,186,107,63,199,199,107,63,42,213,107,63,136,226,107,63,224,239,107,63,51,253,107,63,128,10,108,63,198,23,108,
63,8,37,108,63,67,50,108,63,121,63,108,63,169,76,108,63,211,89,108,63,248,102,108,63,23,116,108,63,48,129,108,63,68,142,108,63,82,155,108,63,90,168,108,63,92,181,108,63,89,194,108,63,80,207,108,63,65,220,108,63,45,233,108,63,19,246,108,63,243,2,109,63,206,15,109,63,163,28,109,63,114,41,109,63,60,54,109,63,0,67,109,63,190,79,109,63,119,92,109,63,42,105,109,63,215,117,109,63,127,130,109,63,33,143,109,63,189,155,109,63,84,168,109,63,229,180,109,63,113,193,109,63,247,205,109,63,119,218,109,63,242,230,
109,63,103,243,109,63,214,255,109,63,64,12,110,63,164,24,110,63,3,37,110,63,91,49,110,63,175,61,110,63,253,73,110,63,69,86,110,63,135,98,110,63,196,110,110,63,252,122,110,63,45,135,110,63,90,147,110,63,128,159,110,63,161,171,110,63,189,183,110,63,211,195,110,63,227,207,110,63,238,219,110,63,243,231,110,63,243,243,110,63,237,255,110,63,226,11,111,63,209,23,111,63,186,35,111,63,158,47,111,63,125,59,111,63,85,71,111,63,41,83,111,63,247,94,111,63,191,106,111,63,130,118,111,63,63,130,111,63,247,141,111,
63,169,153,111,63,86,165,111,63,253,176,111,63,159,188,111,63,59,200,111,63,210,211,111,63,99,223,111,63,239,234,111,63,117,246,111,63,246,1,112,63,114,13,112,63,231,24,112,63,88,36,112,63,195,47,112,63,40,59,112,63,137,70,112,63,227,81,112,63,56,93,112,63,136,104,112,63,210,115,112,63,23,127,112,63,87,138,112,63,145,149,112,63,197,160,112,63,244,171,112,63,30,183,112,63,66,194,112,63,97,205,112,63,123,216,112,63,143,227,112,63,157,238,112,63,167,249,112,63,171,4,113,63,169,15,113,63,162,26,113,63,
150,37,113,63,132,48,113,63,109,59,113,63,81,70,113,63,47,81,113,63,8,92,113,63,219,102,113,63,170,113,113,63,114,124,113,63,54,135,113,63,244,145,113,63,173,156,113,63,96,167,113,63,14,178,113,63,183,188,113,63,91,199,113,63,249,209,113,63,146,220,113,63,37,231,113,63,179,241,113,63,60,252,113,63,192,6,114,63,62,17,114,63,183,27,114,63,43,38,114,63,154,48,114,63,3,59,114,63,103,69,114,63,197,79,114,63,31,90,114,63,115,100,114,63,194,110,114,63,11,121,114,63,79,131,114,63,143,141,114,63,200,151,114,
63,253,161,114,63,44,172,114,63,87,182,114,63,123,192,114,63,155,202,114,63,182,212,114,63,203,222,114,63,219,232,114,63,230,242,114,63,235,252,114,63,236,6,115,63,231,16,115,63,221,26,115,63,206,36,115,63,186,46,115,63,160,56,115,63,130,66,115,63,94,76,115,63,53,86,115,63,7,96,115,63,212,105,115,63,155,115,115,63,94,125,115,63,27,135,115,63,211,144,115,63,134,154,115,63,52,164,115,63,221,173,115,63,128,183,115,63,31,193,115,63,184,202,115,63,77,212,115,63,220,221,115,63,102,231,115,63,235,240,115,
63,107,250,115,63,230,3,116,63,92,13,116,63,204,22,116,63,56,32,116,63,159,41,116,63,0,51,116,63,93,60,116,63,180,69,116,63,6,79,116,63,84,88,116,63,156,97,116,63,223,106,116,63,29,116,116,63,87,125,116,63,139,134,116,63,186,143,116,63,228,152,116,63,9,162,116,63,41,171,116,63,68,180,116,63,91,189,116,63,108,198,116,63,120,207,116,63,127,216,116,63,129,225,116,63,127,234,116,63,119,243,116,63,106,252,116,63,89,5,117,63,66,14,117,63,38,23,117,63,6,32,117,63,225,40,117,63,182,49,117,63,135,58,117,63,
83,67,117,63,26,76,117,63,220,84,117,63,153,93,117,63,81,102,117,63,4,111,117,63,179,119,117,63,92,128,117,63,1,137,117,63,160,145,117,63,59,154,117,63,209,162,117,63,98,171,117,63,239,179,117,63,118,188,117,63,249,196,117,63,118,205,117,63,239,213,117,63,99,222,117,63,210,230,117,63,61,239,117,63,162,247,117,63,3,0,118,63,95,8,118,63,182,16,118,63,8,25,118,63,86,33,118,63,159,41,118,63,227,49,118,63,34,58,118,63,92,66,118,63,146,74,118,63,195,82,118,63,239,90,118,63,22,99,118,63,57,107,118,63,86,
115,118,63,112,123,118,63,132,131,118,63,148,139,118,63,158,147,118,63,165,155,118,63,166,163,118,63,163,171,118,63,155,179,118,63,142,187,118,63,125,195,118,63,103,203,118,63,76,211,118,63,45,219,118,63,9,227,118,63,224,234,118,63,178,242,118,63,128,250,118,63,74,2,119,63,14,10,119,63,206,17,119,63,137,25,119,63,64,33,119,63,242,40,119,63,160,48,119,63,72,56,119,63,237,63,119,63,140,71,119,63,39,79,119,63,190,86,119,63,79,94,119,63,220,101,119,63,101,109,119,63,233,116,119,63,105,124,119,63,228,
131,119,63,90,139,119,63,204,146,119,63,57,154,119,63,162,161,119,63,6,169,119,63,101,176,119,63,192,183,119,63,23,191,119,63,105,198,119,63,182,205,119,63,255,212,119,63,68,220,119,63,132,227,119,63,191,234,119,63,246,241,119,63,41,249,119,63,87,0,120,63,129,7,120,63,166,14,120,63,198,21,120,63,227,28,120,63,250,35,120,63,14,43,120,63,28,50,120,63,39,57,120,63,45,64,120,63,46,71,120,63,44,78,120,63,36,85,120,63,25,92,120,63,9,99,120,63,244,105,120,63,219,112,120,63,190,119,120,63,156,126,120,63,
118,133,120,63,76,140,120,63,29,147,120,63,234,153,120,63,179,160,120,63,119,167,120,63,55,174,120,63,242,180,120,63,169,187,120,63,92,194,120,63,11,201,120,63,181,207,120,63,91,214,120,63,252,220,120,63,154,227,120,63,51,234,120,63,199,240,120,63,88,247,120,63,228,253,120,63,108,4,121,63,240,10,121,63,111,17,121,63,234,23,121,63,97,30,121,63,211,36,121,63,66,43,121,63,172,49,121,63,18,56,121,63,116,62,121,63,209,68,121,63,42,75,121,63,127,81,121,63,208,87,121,63,29,94,121,63,101,100,121,63,170,106,
121,63,234,112,121,63,38,119,121,63,93,125,121,63,145,131,121,63,193,137,121,63,236,143,121,63,19,150,121,63,54,156,121,63,85,162,121,63,112,168,121,63,134,174,121,63,153,180,121,63,167,186,121,63,178,192,121,63,184,198,121,63,186,204,121,63,184,210,121,63,178,216,121,63,168,222,121,63,154,228,121,63,135,234,121,63,113,240,121,63,87,246,121,63,56,252,121,63,22,2,122,63,239,7,122,63,197,13,122,63,150,19,122,63,100,25,122,63,45,31,122,63,243,36,122,63,180,42,122,63,113,48,122,63,43,54,122,63,224,59,
122,63,146,65,122,63,63,71,122,63,233,76,122,63,142,82,122,63,48,88,122,63,206,93,122,63,103,99,122,63,253,104,122,63,143,110,122,63,29,116,122,63,167,121,122,63,45,127,122,63,175,132,122,63,45,138,122,63,168,143,122,63,30,149,122,63,145,154,122,63,255,159,122,63,106,165,122,63,209,170,122,63,52,176,122,63,147,181,122,63,239,186,122,63,70,192,122,63,154,197,122,63,234,202,122,63,54,208,122,63,126,213,122,63,194,218,122,63,3,224,122,63,64,229,122,63,121,234,122,63,174,239,122,63],"i8",4,h.e+20480);
x([223,244,122,63,13,250,122,63,55,255,122,63,93,4,123,63,127,9,123,63,157,14,123,63,184,19,123,63,207,24,123,63,227,29,123,63,242,34,123,63,254,39,123,63,6,45,123,63,10,50,123,63,11,55,123,63,8,60,123,63,1,65,123,63,247,69,123,63,233,74,123,63,215,79,123,63,193,84,123,63,168,89,123,63,139,94,123,63,107,99,123,63,71,104,123,63,31,109,123,63,243,113,123,63,196,118,123,63,146,123,123,63,91,128,123,63,33,133,123,63,228,137,123,63,163,142,123,63,94,147,123,63,22,152,123,63,202,156,123,63,122,161,123,
63,39,166,123,63,208,170,123,63,118,175,123,63,24,180,123,63,183,184,123,63,82,189,123,63,233,193,123,63,125,198,123,63,14,203,123,63,155,207,123,63,36,212,123,63,170,216,123,63,45,221,123,63,172,225,123,63,39,230,123,63,159,234,123,63,19,239,123,63,132,243,123,63,242,247,123,63,92,252,123,63,195,0,124,63,38,5,124,63,133,9,124,63,226,13,124,63,58,18,124,63,144,22,124,63,226,26,124,63,48,31,124,63,123,35,124,63,195,39,124,63,7,44,124,63,72,48,124,63,134,52,124,63,192,56,124,63,247,60,124,63,42,65,
124,63,90,69,124,63,135,73,124,63,176,77,124,63,214,81,124,63,249,85,124,63,24,90,124,63,52,94,124,63,77,98,124,63,98,102,124,63,116,106,124,63,131,110,124,63,142,114,124,63,150,118,124,63,155,122,124,63,157,126,124,63,155,130,124,63,150,134,124,63,142,138,124,63,130,142,124,63,116,146,124,63,98,150,124,63,77,154,124,63,52,158,124,63,24,162,124,63,249,165,124,63,215,169,124,63,178,173,124,63,137,177,124,63,94,181,124,63,47,185,124,63,253,188,124,63,199,192,124,63,143,196,124,63,83,200,124,63,20,204,
124,63,211,207,124,63,141,211,124,63,69,215,124,63,250,218,124,63,171,222,124,63,90,226,124,63,5,230,124,63,173,233,124,63,82,237,124,63,244,240,124,63,147,244,124,63,46,248,124,63,199,251,124,63,93,255,124,63,239,2,125,63,127,6,125,63,11,10,125,63,148,13,125,63,27,17,125,63,158,20,125,63,30,24,125,63,155,27,125,63,21,31,125,63,140,34,125,63,0,38,125,63,114,41,125,63,224,44,125,63,75,48,125,63,179,51,125,63,24,55,125,63,122,58,125,63,217,61,125,63,54,65,125,63,143,68,125,63,229,71,125,63,56,75,125,
63,137,78,125,63,214,81,125,63,33,85,125,63,104,88,125,63,173,91,125,63,239,94,125,63,46,98,125,63,106,101,125,63,163,104,125,63,217,107,125,63,12,111,125,63,61,114,125,63,106,117,125,63,149,120,125,63,189,123,125,63,226,126,125,63,4,130,125,63,36,133,125,63,64,136,125,63,90,139,125,63,112,142,125,63,133,145,125,63,150,148,125,63,164,151,125,63,176,154,125,63,185,157,125,63,191,160,125,63,194,163,125,63,194,166,125,63,192,169,125,63,187,172,125,63,179,175,125,63,168,178,125,63,155,181,125,63,139,
184,125,63,120,187,125,63,99,190,125,63,74,193,125,63,48,196,125,63,18,199,125,63,241,201,125,63,206,204,125,63,169,207,125,63,128,210,125,63,85,213,125,63,39,216,125,63,247,218,125,63,196,221,125,63,142,224,125,63,85,227,125,63,26,230,125,63,220,232,125,63,156,235,125,63,89,238,125,63,19,241,125,63,203,243,125,63,128,246,125,63,51,249,125,63,227,251,125,63,144,254,125,63,59,1,126,63,227,3,126,63,137,6,126,63,44,9,126,63,204,11,126,63,106,14,126,63,6,17,126,63,158,19,126,63,53,22,126,63,200,24,126,
63,90,27,126,63,232,29,126,63,116,32,126,63,254,34,126,63,133,37,126,63,10,40,126,63,140,42,126,63,12,45,126,63,137,47,126,63,4,50,126,63,124,52,126,63,242,54,126,63,101,57,126,63,214,59,126,63,68,62,126,63,176,64,126,63,26,67,126,63,129,69,126,63,230,71,126,63,72,74,126,63,168,76,126,63,5,79,126,63,96,81,126,63,185,83,126,63,15,86,126,63,99,88,126,63,181,90,126,63,4,93,126,63,81,95,126,63,155,97,126,63,227,99,126,63,41,102,126,63,108,104,126,63,173,106,126,63,236,108,126,63,40,111,126,63,98,113,
126,63,154,115,126,63,208,117,126,63,3,120,126,63,51,122,126,63,98,124,126,63,142,126,126,63,184,128,126,63,224,130,126,63,5,133,126,63,40,135,126,63,73,137,126,63,104,139,126,63,132,141,126,63,159,143,126,63,183,145,126,63,204,147,126,63,224,149,126,63,241,151,126,63,0,154,126,63,13,156,126,63,24,158,126,63,32,160,126,63,38,162,126,63,42,164,126,63,44,166,126,63,44,168,126,63,41,170,126,63,37,172,126,63,30,174,126,63,21,176,126,63,10,178,126,63,253,179,126,63,238,181,126,63,220,183,126,63,201,185,
126,63,179,187,126,63,155,189,126,63,129,191,126,63,101,193,126,63,71,195,126,63,39,197,126,63,5,199,126,63,224,200,126,63,186,202,126,63,145,204,126,63,103,206,126,63,58,208,126,63,12,210,126,63,219,211,126,63,168,213,126,63,115,215,126,63,61,217,126,63,4,219,126,63,201,220,126,63,140,222,126,63,77,224,126,63,12,226,126,63,202,227,126,63,133,229,126,63,62,231,126,63,245,232,126,63,170,234,126,63,94,236,126,63,15,238,126,63,190,239,126,63,108,241,126,63,23,243,126,63,193,244,126,63,104,246,126,63,
14,248,126,63,178,249,126,63,84,251,126,63,243,252,126,63,145,254,126,63,46,0,127,63,200,1,127,63,96,3,127,63,247,4,127,63,139,6,127,63,30,8,127,63,175,9,127,63,62,11,127,63,203,12,127,63,86,14,127,63,223,15,127,63,103,17,127,63,237,18,127,63,112,20,127,63,242,21,127,63,115,23,127,63,241,24,127,63,110,26,127,63,233,27,127,63,98,29,127,63,217,30,127,63,78,32,127,63,194,33,127,63,52,35,127,63,164,36,127,63,18,38,127,63,127,39,127,63,234,40,127,63,83,42,127,63,186,43,127,63,32,45,127,63,131,46,127,63,
230,47,127,63,70,49,127,63,165,50,127,63,2,52,127,63,93,53,127,63,182,54,127,63,14,56,127,63,100,57,127,63,185,58,127,63,12,60,127,63,93,61,127,63,172,62,127,63,250,63,127,63,70,65,127,63,145,66,127,63,217,67,127,63,33,69,127,63,102,70,127,63,170,71,127,63,236,72,127,63,45,74,127,63,108,75,127,63,169,76,127,63,229,77,127,63,31,79,127,63,88,80,127,63,143,81,127,63,196,82,127,63,248,83,127,63,42,85,127,63,91,86,127,63,138,87,127,63,184,88,127,63,228,89,127,63,14,91,127,63,55,92,127,63,94,93,127,63,
132,94,127,63,169,95,127,63,203,96,127,63,237,97,127,63,12,99,127,63,42,100,127,63,71,101,127,63,98,102,127,63,124,103,127,63,148,104,127,63,171,105,127,63,192,106,127,63,212,107,127,63,230,108,127,63,247,109,127,63,6,111,127,63,20,112,127,63,33,113,127,63,44,114,127,63,53,115,127,63,61,116,127,63,68,117,127,63,73,118,127,63,77,119,127,63,79,120,127,63,80,121,127,63,80,122,127,63,78,123,127,63,75,124,127,63,70,125,127,63,64,126,127,63,57,127,127,63,48,128,127,63,38,129,127,63,27,130,127,63,14,131,
127,63,0,132,127,63,240,132,127,63,223,133,127,63,205,134,127,63,185,135,127,63,164,136,127,63,142,137,127,63,118,138,127,63,93,139,127,63,67,140,127,63,40,141,127,63,11,142,127,63,237,142,127,63,205,143,127,63,173,144,127,63,139,145,127,63,103,146,127,63,67,147,127,63,29,148,127,63,246,148,127,63,205,149,127,63,164,150,127,63,121,151,127,63,77,152,127,63,31,153,127,63,241,153,127,63,193,154,127,63,144,155,127,63,93,156,127,63,42,157,127,63,245,157,127,63,191,158,127,63,136,159,127,63,79,160,127,
63,22,161,127,63,219,161,127,63,159,162,127,63,98,163,127,63,36,164,127,63,228,164,127,63,163,165,127,63,98,166,127,63,31,167,127,63,219,167,127,63,149,168,127,63,79,169,127,63,7,170,127,63,190,170,127,63,117,171,127,63,42,172,127,63,221,172,127,63,144,173,127,63,66,174,127,63,242,174,127,63,162,175,127,63,80,176,127,63,253,176,127,63,169,177,127,63,85,178,127,63,254,178,127,63,167,179,127,63,79,180,127,63,246,180,127,63,156,181,127,63,64,182,127,63,228,182,127,63,134,183,127,63,40,184,127,63,200,
184,127,63,103,185,127,63,6,186,127,63,163,186,127,63,63,187,127,63,219,187,127,63,117,188,127,63,14,189,127,63,166,189,127,63,61,190,127,63,212,190,127,63,105,191,127,63,253,191,127,63,144,192,127,63,34,193,127,63,180,193,127,63,68,194,127,63,211,194,127,63,98,195,127,63,239,195,127,63,123,196,127,63,7,197,127,63,145,197,127,63,27,198,127,63,163,198,127,63,43,199,127,63,178,199,127,63,56,200,127,63,189,200,127,63,65,201,127,63,196,201,127,63,70,202,127,63,199,202,127,63,71,203,127,63,199,203,127,
63,69,204,127,63,195,204,127,63,64,205,127,63,187,205,127,63,54,206,127,63,177,206,127,63,42,207,127,63,162,207,127,63,26,208,127,63,144,208,127,63,6,209,127,63,123,209,127,63,239,209,127,63,98,210,127,63,213,210,127,63,70,211,127,63,183,211,127,63,39,212,127,63,150,212,127,63,4,213,127,63,114,213,127,63,222,213,127,63,74,214,127,63,181,214,127,63,32,215,127,63,137,215,127,63,242,215,127,63,89,216,127,63,192,216,127,63,39,217,127,63,140,217,127,63,241,217,127,63,85,218,127,63,184,218,127,63,27,219,
127,63,124,219,127,63,221,219,127,63,61,220,127,63,157,220,127,63,251,220,127,63,89,221,127,63,183,221,127,63,19,222,127,63,111,222,127,63,202,222,127,63,36,223,127,63,126,223,127,63,215,223,127,63,47,224,127,63,134,224,127,63,221,224,127,63,51,225,127,63,137,225,127,63,221,225,127,63,49,226,127,63,133,226,127,63,215,226,127,63,41,227,127,63,122,227,127,63,203,227,127,63,27,228,127,63,106,228,127,63,185,228,127,63,7,229,127,63,84,229,127,63,161,229,127,63,237,229,127,63,56,230,127,63,131,230,127,
63,205,230,127,63,23,231,127,63,96,231,127,63,168,231,127,63,239,231,127,63,54,232,127,63,125,232,127,63,195,232,127,63,8,233,127,63,76,233,127,63,144,233,127,63,212,233,127,63,23,234,127,63,89,234,127,63,154,234,127,63,219,234,127,63,28,235,127,63,92,235,127,63,155,235,127,63,218,235,127,63,24,236,127,63,86,236,127,63,147,236,127,63,207,236,127,63,11,237,127,63,71,237,127,63,130,237,127,63,188,237,127,63,246,237,127,63,47,238,127,63,104,238,127,63,160,238,127,63,216,238,127,63,15,239,127,63,69,239,
127,63,123,239,127,63,177,239,127,63,230,239,127,63,27,240,127,63,79,240,127,63,130,240,127,63,182,240,127,63,232,240,127,63,26,241,127,63,76,241,127,63,125,241,127,63,174,241,127,63,222,241,127,63,14,242,127,63,61,242,127,63,108,242,127,63,154,242,127,63,200,242,127,63,245,242,127,63,34,243,127,63,79,243,127,63,123,243,127,63,166,243,127,63,209,243,127,63,252,243,127,63,38,244,127,63,80,244,127,63,121,244,127,63,162,244,127,63,203,244,127,63,243,244,127,63,27,245,127,63,66,245,127,63,105,245,127,
63,143,245,127,63,181,245,127,63,219,245,127,63,0,246,127,63,37,246,127,63,73,246,127,63,109,246,127,63,145,246,127,63,180,246,127,63,215,246,127,63,250,246,127,63,28,247,127,63,62,247,127,63,95,247,127,63,128,247,127,63,160,247,127,63,193,247,127,63,225,247,127,63,0,248,127,63,31,248,127,63,62,248,127,63,93,248,127,63,123,248,127,63,152,248,127,63,182,248,127,63,211,248,127,63,240,248,127,63,12,249,127,63,40,249,127,63,68,249,127,63,95,249,127,63,122,249,127,63,149,249,127,63,175,249,127,63,202,
249,127,63,227,249,127,63,253,249,127,63,22,250,127,63,47,250,127,63,71,250,127,63,96,250,127,63,120,250,127,63,143,250,127,63,166,250,127,63,190,250,127,63,212,250,127,63,235,250,127,63,1,251,127,63,23,251,127,63,44,251,127,63,66,251,127,63,87,251,127,63,108,251,127,63,128,251,127,63,148,251,127,63,168,251,127,63,188,251,127,63,208,251,127,63,227,251,127,63,246,251,127,63,8,252,127,63,27,252,127,63,45,252,127,63,63,252,127,63,81,252,127,63,98,252,127,63,115,252,127,63,132,252,127,63,149,252,127,
63,165,252,127,63,182,252,127,63,198,252,127,63,213,252,127,63,229,252,127,63,244,252,127,63,3,253,127,63,18,253,127,63,33,253,127,63,47,253,127,63,62,253,127,63,76,253,127,63,89,253,127,63,103,253,127,63,116,253,127,63,130,253,127,63,143,253,127,63,155,253,127,63,168,253,127,63,181,253,127,63,193,253,127,63,205,253,127,63,217,253,127,63,228,253,127,63,240,253,127,63,251,253,127,63,6,254,127,63,17,254,127,63,28,254,127,63,38,254,127,63,49,254,127,63,59,254,127,63,69,254,127,63,79,254,127,63,89,254,
127,63,98,254,127,63,108,254,127,63,117,254,127,63,126,254,127,63,135,254,127,63,144,254,127,63,152,254,127,63,161,254,127,63,169,254,127,63,177,254,127,63,185,254,127,63,193,254,127,63,201,254,127,63,208,254,127,63,216,254,127,63,223,254,127,63,230,254,127,63,237,254,127,63,244,254,127,63,251,254,127,63,2,255,127,63,8,255,127,63,14,255,127,63,21,255,127,63,27,255,127,63,33,255,127,63,39,255,127,63,45,255,127,63,50,255,127,63,56,255,127,63,61,255,127,63,67,255,127,63,72,255,127,63,77,255,127,63,82,
255,127,63,87,255,127,63,92,255,127,63,96,255,127,63,101,255,127,63,105,255,127,63,110,255,127,63,114,255,127,63,118,255,127,63,122,255,127,63,126,255,127,63,130,255,127,63,134,255,127,63,138,255,127,63,142,255,127,63,145,255,127,63,149,255,127,63,152,255,127,63,155,255,127,63,159,255,127,63,162,255,127,63,165,255,127,63,168,255,127,63,171,255,127,63,174,255,127,63,176,255,127,63,179,255,127,63,182,255,127,63,184,255,127,63,187,255,127,63,189,255,127,63,192,255,127,63,194,255,127,63,196,255,127,63,
198,255,127,63,201,255,127,63,203,255,127,63,205,255,127,63,207,255,127,63,209,255,127,63,210,255,127,63,212,255,127,63,214,255,127,63,216,255,127,63,217,255,127,63,219,255,127,63,220,255,127,63,222,255,127,63,223,255,127,63,225,255,127,63,226,255,127,63,227,255,127,63,229,255,127,63,230,255,127,63,231,255,127,63,232,255,127,63,233,255,127,63,234,255,127,63,235,255,127,63,236,255,127,63,237,255,127,63,238,255,127,63,239,255,127,63,240,255,127,63,241,255,127,63,241,255,127,63,242,255,127,63,243,255,
127,63,244,255,127,63,244,255,127,63,245,255,127,63,246,255,127,63,246,255,127,63,247,255,127,63,247,255,127,63,248,255,127,63,248,255,127,63,249,255,127,63,249,255,127,63,250,255,127,63,250,255,127,63,250,255,127,63,251,255,127,63,251,255,127,63,251,255,127,63,252,255,127,63,252,255,127,63,252,255,127,63,253,255,127,63,253,255,127,63,253,255,127,63,253,255,127,63,254,255,127,63,254,255,127,63,254,255,127,63,254,255,127,63,254,255,127,63,254,255,127,63,255,255,127,63,255,255,127,63,255,255,127,63,
255,255,127,63,255,255,127,63,255,255,127,63,255,255,127,63,255,255,127,63,255,255,127,63,255,255,127,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,128,63,0,0,76,194,0,0,80,194,0,0,84,194,
0,0,88,194,0,0,92,194,0,0,96,194,0,0,100,194,0,0,104,194,0,0,108,194,0,0,112,194,0,0,116,194,0,0,120,194,0,0,124,194,0,0,128,194,0,0,130,194,0,0,132,194,0,0,134,194,0,0,136,194,0,0,138,194,0,0,140,194,0,0,142,194,0,0,144,194,0,0,146,194,0,0,148,194,0,0,150,194,0,0,152,194,0,0,154,194,0,0,156,194,0,0,160,194,0,0,162,194,0,0,164,194,0,0,166,194,0,0,168,194,0,0,170,194,0,0,172,194,0,0,174,194,0,0,176,194,0,0,176,194,0,0,178,194,0,0,178,194,0,0,180,194,0,0,182,194,0,0,182,194,0,0,184,194,0,0,186,194,
0,0,188,194,0,0,190,194,0,0,192,194,0,0,192,194,0,0,194,194,0,0,196,194,0,0,196,194,0,0,198,194,0,0,198,194,0,0,200,194,0,0,200,194,0,0,202,194,0,0,204,194,0,0,206,194,0,0,208,194,0,0,212,194,0,0,214,194,0,0,214,194,0,0,214,194,0,0,214,194,0,0,210,194,0,0,206,194,0,0,204,194,0,0,202,194,0,0,198,194,0,0,196,194,0,0,192,194,0,0,190,194,0,0,190,194,0,0,192,194,0,0,194,194,0,0,192,194,0,0,190,194,0,0,186,194,0,0,180,194,0,0,160,194,0,0,140,194,0,0,72,194,0,0,32,194,0,0,240,193,0,0,240,193,0,0,240,193,
0,0,240,193,0,0,112,194,0,0,112,194,0,0,112,194,0,0,112,194,0,0,112,194,0,0,112,194,0,0,112,194,0,0,112,194,0,0,112,194,0,0,112,194,0,0,112,194,0,0,112,194,0,0,120,194,0,0,120,194,0,0,130,194,0,0,146,194,0,0,138,194,0,0,136,194,0,0,136,194,0,0,134,194,0,0,140,194,0,0,140,194,0,0,144,194,0,0,148,194,0,0,150,194,0,0,158,194,0,0,158,194,0,0,160,194,0,0,166,194,0,0,176,194,0,0,186,194,0,0,200,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,64,194,0,0,64,194,0,0,64,194,0,0,64,194,0,0,64,194,0,0,64,194,0,0,64,194,0,0,64,194,0,0,64,194,0,0,64,194,0,0,64,194,0,0,64,194,0,0,64,194,0,0,84,194,0,0,116,194,0,0,132,194,0,0,132,194,0,0,136,194,0,0,134,194,0,0,140,194,0,0,152,194,0,0,152,194,0,0,144,194,0,0,146,194,
0,0,150,194,0,0,152,194,0,0,156,194,0,0,158,194,0,0,166,194,0,0,176,194,0,0,186,194,0,0,200,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,20,194,0,0,20,194,0,0,20,194,0,0,20,194,0,0,20,194,0,0,20,194,0,0,20,
194,0,0,20,194,0,0,24,194,0,0,32,194,0,0,40,194,0,0,56,194,0,0,64,194,0,0,84,194,0,0,92,194,0,0,120,194,0,0,130,194,0,0,104,194,0,0,96,194,0,0,96,194,0,0,116,194,0,0,112,194,0,0,130,194,0,0,134,194,0,0,138,194,0,0,142,194,0,0,154,194,0,0,154,194,0,0,156,194,0,0,160,194,0,0,164,194,0,0,168,194,0,0,176,194,0,0,186,194,0,0,196,194,0,0,212,194,0,0,224,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,200,193,0,0,200,193,0,0,200,193,0,0,200,193,0,0,200,193,0,0,200,193,0,0,200,193,0,0,200,193,0,0,200,193,0,0,208,193,0,0,216,193,0,0,232,193,0,0,0,194,0,0,24,194,0,0,64,194,0,0,80,194,0,0,80,194,0,0,72,194,0,0,64,194,0,0,64,194,0,0,76,194,0,0,80,194,0,0,88,194,0,0,112,194,0,0,134,194,0,0,134,194,0,0,132,194,0,0,136,194,0,0,138,194,0,0,146,194,0,0,146,194,0,0,152,194,0,0,160,194,0,
0,162,194,0,0,162,194,0,0,170,194,0,0,170,194,0,0,172,194,0,0,176,194,0,0,186,194,0,0,200,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,128,193,0,0,128,193,0,0,128,193,0,0,128,193,0,0,128,193,0,0,128,193,0,0,128,193,0,0,128,193,0,0,136,193,0,0,152,193,0,0,160,193,0,0,176,193,0,0,208,193,0,0,224,193,0,0,248,193,0,0,32,194,0,0,60,194,
0,0,28,194,0,0,28,194,0,0,32,194,0,0,40,194,0,0,44,194,0,0,60,194,0,0,76,194,0,0,100,194,0,0,80,194,0,0,92,194,0,0,92,194,0,0,112,194,0,0,104,194,0,0,120,194,0,0,124,194,0,0,140,194,0,0,134,194,0,0,138,194,0,0,144,194,0,0,146,194,0,0,154,194,0,0,160,194,0,0,164,194,0,0,166,194,0,0,174,194,0,0,180,194,0,0,188,194,0,0,196,194,0,0,208,194,0,0,230,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,0,193,0,0,0,193,0,0,0,
193,0,0,0,193,0,0,0,193,0,0,0,193,0,0,0,193,0,0,0,193,0,0,0,193,0,0,0,193,0,0,32,193,0,0,48,193,0,0,112,193,0,0,152,193,0,0,200,193,0,0,240,193,0,0,8,194,0,0,248,193,0,0,240,193,0,0,248,193,0,0,232,193,0,0,0,194,0,0,12,194,0,0,40,194,0,0,64,194,0,0,40,194,0,0,48,194,0,0,56,194,0,0,72,194,0,0,72,194,0,0,76,194,0,0,80,194,0,0,108,194,0,0,88,194,0,0,92,194,0,0,92,194,0,0,104,194,0,0,120,194,0,0,124,194,0,0,132,194,0,0,144,194,0,0,146,194,0,0,152,194,0,0,150,194,0,0,156,194,0,0,160,194,0,0,160,194,0,
0,162,194,0,0,168,194,0,0,176,194,0,0,180,194,0,0,188,194,0,0,196,194,0,0,202,194,0,0,212,194,0,0,220,194,0,0,132,194,0,0,132,194,0,0,132,194,0,0,132,194,0,0,132,194,0,0,132,194,0,0,132,194,0,0,132,194,0,0,132,194,0,0,132,194,0,0,132,194,0,0,132,194,0,0,132,194,0,0,134,194,0,0,134,194,0,0,134,194,0,0,152,194,0,0,144,194,0,0,142,194,0,0,148,194,0,0,152,194,0,0,152,194,0,0,150,194,0,0,156,194,0,0,158,194,0,0,158,194,0,0,162,194,0,0,166,194,0,0,172,194,0,0,178,194,0,0,186,194,0,0,194,194,0,0,200,194,
0,0,210,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,60,194,0,0,60,194,0,0,60,194,0,0,60,194,0,0,60,194,0,0,60,194,0,0,60,194,0,0,60,194,0,0,60,194,0,0,60,194,0,0,60,194,0,0,64,194,0,0,76,194,0,0,92,194,0,0,108,194,0,0,132,194,0,0,132,
194,0,0,132,194,0,0,134,194,0,0,132,194,0,0,136,194,0,0,138,194,0,0,140,194,0,0,148,194,0,0,158,194,0,0,154,194,0,0,154,194,0,0,156,194,0,0,160,194,0,0,162,194,0,0,164,194,0,0,168,194,0,0,172,194,0,0,176,194,0,0,182,194,0,0,190,194,0,0,200,194,0,0,216,194,0,0,232,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,0,16,194,0,0,16,194,0,0,16,194,0,0,16,194,0,0,16,194,0,0,16,194,0,0,16,194,0,0,16,194,0,0,16,194,0,0,20,194,0,0,20,194,0,0,36,194,0,0,48,194,0,0,64,194,0,0,76,194,0,0,104,194,0,0,120,194,0,0,112,194,0,0,100,194,0,0,108,194,0,0,108,194,0,0,112,194,0,0,124,194,0,0,130,194,0,0,144,194,0,0,142,194,0,0,140,194,0,0,144,194,0,0,148,194,0,0,154,194,0,0,152,194,0,0,156,194,0,0,162,194,0,0,162,194,0,0,160,194,0,0,166,194,0,0,172,194,0,0,182,194,0,0,192,194,0,0,200,194,0,0,210,194,0,0,220,194,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,224,193,0,0,224,193,0,0,224,193,0,0,224,193,0,0,224,193,0,0,224,193,0,0,224,193,0,0,224,193,0,0,224,193,0,0,240,193,0,0,0,194,0,0,0,194,0,0,4,194,0,0,12,194,0,0,36,194,0,0,68,194,0,0,72,194,0,0,68,194,0,0,60,194,0,0,64,194,0,0,64,194,0,0,80,194,0,0,76,194,0,0,100,194,0,0,130,194,0,0,116,194,0,0,108,194,0,0,116,
194,0,0,128,194,0,0,138,194,0,0,140,194,0,0,148,194,0,0,154,194,0,0,154,194,0,0,156,194,0,0,162,194,0,0,168,194,0,0,170,194,0,0,174,194,0,0,180,194,0,0,184,194,0,0,192,194,0,0,200,194,0,0,214,194,0,0,224,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,152,193,0,0,152,193,0,0,152,193,0,0,152,193,0,0,152,193,0,0,152,193,0,0,152,193,0,0,152,193,0,0,160,193,0,0,168,193,0,0,184,193,0,0,216,
193,0,0,240,193,0,0,12,194,0,0,16,194,0,0,36,194,0,0,56,194,0,0,48,194,0,0,40,194,0,0,32,194,0,0,36,194,0,0,36,194,0,0,44,194,0,0,64,194,0,0,92,194,0,0,84,194,0,0,80,194,0,0,84,194,0,0,96,194,0,0,108,194,0,0,104,194,0,0,112,194,0,0,134,194,0,0,132,194,0,0,138,194,0,0,142,194,0,0,144,194,0,0,150,194,0,0,158,194,0,0,162,194,0,0,168,194,0,0,174,194,0,0,180,194,0,0,186,194,0,0,194,194,0,0,202,194,0,0,214,194,0,0,228,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,0,16,193,0,0,16,193,0,0,16,193,0,0,16,193,0,0,16,193,0,0,16,193,0,0,16,193,0,0,16,193,0,0,48,193,0,0,64,193,0,0,64,193,0,0,112,193,0,0,128,193,0,0,160,193,0,0,184,193,0,0,240,193,0,0,20,194,0,0,8,194,0,0,4,194,0,0,8,194,0,0,248,193,0,0,0,194,0,0,0,194,0,0,24,194,0,0,60,194,0,0,48,194,0,0,36,194,0,0,32,194,0,0,60,194,0,0,68,194,0,0,56,194,0,0,56,194,0,0,104,194,0,0,72,194,0,0,72,194,0,0,88,194,0,0,104,194,0,0,120,194,0,0,128,194,0,0,134,194,0,0,134,194,0,0,140,194,0,0,
144,194,0,0,152,194,0,0,158,194,0,0,166,194,0,0,174,194,0,0,182,194,0,0,192,194,0,0,200,194,0,0,208,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,120,194,0,0,120,194,0,0,120,194,0,0,120,194,0,0,120,194,0,0,120,194,0,0,120,194,0,0,120,194,0,0,120,194,0,0,120,194,0,0,124,194,0,0,128,194,0,0,132,194,0,0,134,194,0,0,132,194,0,0,136,194,0,0,150,194,0,0,144,194,0,0,152,194,0,0,150,194,0,0,152,194,0,0,156,194,0,0,158,194,0,0,164,194,0,0,168,194,0,0,170,194,0,0,180,194,0,0,188,
194,0,0,202,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,108,194,0,0,108,194,0,0,108,194,0,0,108,194,0,0,108,194,0,0,108,194,0,0,108,194,0,0,108,194,0,0,108,194,0,
0,108,194,0,0,108,194,0,0,112,194,0,0,112,194,0,0,116,194,0,0,124,194,0,0,132,194,0,0,142,194,0,0,136,194,0,0,140,194,0,0,140,194,0,0,142,194,0,0,144,194,0,0,144,194,0,0,150,194,0,0,162,194,0,0,156,194,0,0,158,194,0,0,164,194,0,0,166,194,0,0,172,194,0,0,180,194,0,0,194,194,0,0,206,194,0,0,226,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,84,194,0,0,84,194,0,0,84,194,0,0,84,194,0,0,84,194,0,0,84,194,0,0,84,194,0,0,84,194,0,0,84,194,0,0,88,194,0,0,92,194,0,0,100,194,0,0,96,194,0,0,100,194,0,0,92,194,0,0,116,194,0,0,130,194,0,0,112,194,0,0,112,194,0,0,120,194,0,0,124,194,0,0,124,194,0,0,132,194,0,0,136,194,0,0,148,194,0,0,146,194,0,0,150,194,0,0,150,194,0,0,156,194,0,0,160,194,0,0,160,194,0,0,164,194,0,0,170,194,0,0,180,194,0,0,
192,194,0,0,202,194,0,0,216,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,56,194,0,0,56,194,0,0,56,194,0,0,56,194,0,0,56,194,0,0,56,194,0,0,56,194,0,0,56,194,0,0,56,194,0,0,56,194,0,0,60,194,0,0,60,194,0,0,60,194,0,0,60,194,0,0,64,194,0,0,76,194,0,0,100,194,0,0,76,194,0,0,
68,194,0,0,72,194,0,0,76,194,0,0,84,194,0,0,88,194,0,0,108,194,0,0,132,194,0,0,112,194,0,0,120,194,0,0,134,194,0,0,134,194,0,0,140,194,0,0,144,194,0,0,150,194,0,0,152,194,0,0,156,194,0,0,162,194,0,0,170,194,0,0,176,194,0,0,188,194,0,0,194,194,0,0,208,194,0,0,224,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,16,194,0,0,16,194,0,
0,16,194,0,0,16,194,0,0,16,194,0,0,16,194,0,0,16,194,0,0,16,194,0,0,28,194,0,0,36,194,0,0,40,194,0,0,40,194,0,0,28,194,0,0,24,194,0,0,36,194,0,0,44,194,0,0,80,194,0,0,48,194,0,0,32,194,0,0,28,194,0,0,20,194,0,0,20,194,0,0,32,194,0,0,60,194,0,0,88,194,0,0,72,194,0,0,64,194,0,0,72,194,0,0,92,194,0,0,116,194,0,0,108,194,0,0,120,194,0,0,132,194,0,0,132,194,0,0,132,194,0,0,138,194,0,0,138,194,0,0,146,194,0,0,148,194,0,0,148,194,0,0,150,194,0,0,154,194,0,0,158,194,0,0,164,194,0,0,174,194,0,0,182,194,0,
0,190,194,0,0,200,194,0,0,216,194,0,0,230,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,224,193,0,0,208,193,0,0,192,193,0,0,176,193,0,0,160,193,0,0,160,193,0,0,184,193,0,0,232,193,0,0,240,193,0,0,248,193,0,0,224,193,0,0,216,193,0,0,224,193,0,0,224,193,0,0,224,193,0,0,12,194,0,0,32,194,0,0,4,194,0,0,0,194,0,0,232,193,0,0,240,193,0,0,240,193,0,0,240,193,0,0,20,194,0,0,52,194,0,0,36,194,0,0,20,194,0,0,24,194,0,0,52,194,0,0,60,194,0,0,60,194,0,0,64,194,0,
0,84,194,0,0,68,194,0,0,64,194,0,0,72,194,0,0,68,194,0,0,68,194,0,0,76,194,0,0,80,194,0,0,104,194,0,0,96,194,0,0,100,194,0,0,96,194,0,0,112,194,0,0,116,194,0,0,120,194,0,0,140,194,0,0,144,194,0,0,148,194,0,0,156,194,0,0,166,194,0,0,176,194,0,0,186,194,0,0,200,194,0,0,212,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,210,194,0,0,200,194,0,0,190,194,0,0,182,194,0,0,174,194,0,0,166,194,0,0,160,194,0,0,
156,194,0,0,152,194,0,0,156,194,0,0,156,194,0,0,162,194,0,0,166,194,0,0,170,194,0,0,172,194,0,0,170,194,0,0,172,194,0,0,174,194,0,0,180,194,0,0,194,194,0,0,214,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,
192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,210,194,0,0,200,194,0,0,190,194,0,0,180,194,0,0,170,194,0,0,162,194,0,0,154,194,0,0,146,194,0,0,140,194,0,0,134,194,0,0,134,194,0,0,136,194,0,0,150,194,0,0,146,194,0,0,140,194,0,0,138,194,0,0,140,194,0,0,144,194,0,0,150,194,0,0,158,194,0,0,168,194,0,0,166,194,0,0,168,194,0,0,172,194,0,0,176,194,0,0,178,194,0,0,178,194,0,0,186,194,0,0,196,194,0,0,210,194,0,0,224,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,210,194,0,0,200,194,0,0,190,194,0,0,180,194,0,0,170,194,0,0,160,194,0,0,152,194,0,0,142,194,0,0,136,194,0,0,136,194,0,0,130,194,0,0,124,194,0,0,124,194,0,0,120,194,0,0,120,194,0,0,128,194,0,0,130,194,0,0,128,194,0,0,116,194,0,0,120,194,0,0,124,194,0,0,128,194,0,0,132,194,
0,0,136,194,0,0,146,194,0,0,146,194,0,0,148,194,0,0,150,194,0,0,152,194,0,0,162,194,0,0,166,194,0,0,170,194,0,0,176,194,0,0,178,194,0,0,184,194,0,0,190,194,0,0,200,194,0,0,216,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,160,194,0,0,150,194,0,0,142,194,0,0,136,194,0,0,130,194,0,0,124,194,
0,0,120,194,0,0,116,194,0,0,116,194,0,0,116,194,0,0,116,194,0,0,108,194,0,0,96,194,0,0,100,194,0,0,84,194,0,0,72,194,0,0,104,194,0,0,80,194,0,0,72,194,0,0,72,194,0,0,80,194,0,0,84,194,0,0,88,194,0,0,104,194,0,0,134,194,0,0,124,194,0,0,134,194,0,0,136,194,0,0,144,194,0,0,150,194,0,0,156,194,0,0,160,194,0,0,162,194,0,0,162,194,0,0,164,194,0,0,170,194,0,0,178,194,0,0,180,194,0,0,186,194,0,0,194,194,0,0,202,194,0,0,214,194,0,0,228,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,130,194,0,0,116,194,0,0,108,194,0,0,100,194,0,0,96,194,0,0,92,194,0,0,92,194,0,0,96,194,0,0,96,194,0,0,100,194,0,0,92,194,0,0,84,194,0,0,80,194,0,0,60,194,0,0,48,194,0,0,48,194,0,0,72,194,0,0,48,194,0,0,36,194,0,0,28,194,0,0,28,194,0,0,40,194,0,0,32,194,0,0,56,194,0,0,76,194,0,0,68,194,0,0,72,194,0,0,84,194,0,0,88,194,0,0,124,194,0,0,112,194,0,0,116,194,0,0,120,194,0,0,132,194,0,
0,132,194,0,0,132,194,0,0,140,194,0,0,146,194,0,0,148,194,0,0,150,194,0,0,152,194,0,0,150,194,0,0,158,194,0,0,170,194,0,0,178,194,0,0,182,194,0,0,192,194,0,0,204,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,80,194,0,0,72,194,0,0,68,194,0,0,68,194,0,0,64,194,0,0,64,194,0,0,64,194,0,0,68,194,0,0,72,194,0,0,72,194,0,0,68,194,0,0,56,194,0,0,44,194,0,0,28,194,0,0,12,194,0,0,4,194,0,0,24,194,0,0,16,194,0,0,0,194,0,0,232,193,0,0,0,
194,0,0,0,194,0,0,0,194,0,0,12,194,0,0,48,194,0,0,28,194,0,0,24,194,0,0,24,194,0,0,56,194,0,0,72,194,0,0,52,194,0,0,56,194,0,0,84,194,0,0,72,194,0,0,72,194,0,0,72,194,0,0,88,194,0,0,88,194,0,0,84,194,0,0,84,194,0,0,96,194,0,0,100,194,0,0,108,194,0,0,132,194,0,0,140,194,0,0,144,194,0,0,148,194,0,0,158,194,0,0,166,194,0,0,170,194,0,0,180,194,0,0,194,194,0,0,228,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,
0,0,210,194,0,0,200,194,0,0,190,194,0,0,180,194,0,0,172,194,0,0,160,194,0,0,150,194,0,0,150,194,0,0,158,194,0,0,160,194,0,0,158,194,0,0,160,194,0,0,162,194,0,0,164,194,0,0,176,194,0,0,190,194,0,0,206,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,216,194,0,0,206,194,0,0,196,194,0,0,186,194,0,0,176,194,0,0,166,194,0,0,158,194,0,0,156,194,0,0,150,194,0,0,142,194,0,0,134,194,0,0,136,194,0,0,146,194,0,0,146,194,0,0,144,194,0,0,146,194,0,0,150,194,0,0,154,194,0,0,160,194,0,0,164,194,0,0,176,194,0,0,186,194,0,0,200,194,0,0,214,194,0,0,228,194,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,210,194,0,0,202,194,0,0,192,194,0,0,180,194,0,0,172,194,0,0,162,194,
0,0,154,194,0,0,146,194,0,0,138,194,0,0,132,194,0,0,116,194,0,0,120,194,0,0,132,194,0,0,128,194,0,0,120,194,0,0,130,194,0,0,132,194,0,0,140,194,0,0,144,194,0,0,152,194,0,0,162,194,0,0,160,194,0,0,168,194,0,0,180,194,0,0,190,194,0,0,204,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,214,194,0,0,206,194,0,0,194,194,0,0,184,194,0,0,176,194,0,0,166,194,0,0,158,194,0,0,148,194],"i8",4,h.e+30720);x([0,0,140,194,0,0,132,194,0,0,108,194,0,0,84,194,0,0,104,194,0,0,120,194,0,0,92,194,0,0,88,194,0,0,88,194,0,0,88,194,0,0,104,194,0,0,116,194,0,0,120,194,0,0,144,194,0,0,140,194,0,0,144,194,0,0,150,194,0,0,156,194,0,0,160,194,0,0,162,194,0,0,160,
194,0,0,166,194,0,0,166,194,0,0,176,194,0,0,186,194,0,0,200,194,0,0,214,194,0,0,230,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,210,194,0,0,200,194,0,0,190,194,0,0,180,194,0,0,170,194,0,0,160,194,0,0,150,194,0,0,140,194,0,0,132,194,0,0,120,194,0,0,96,194,0,
0,64,194,0,0,48,194,0,0,64,194,0,0,56,194,0,0,56,194,0,0,44,194,0,0,56,194,0,0,64,194,0,0,64,194,0,0,76,194,0,0,104,194,0,0,104,194,0,0,108,194,0,0,112,194,0,0,120,194,0,0,120,194,0,0,116,194,0,0,116,194,0,0,130,194,0,0,128,194,0,0,130,194,0,0,136,194,0,0,140,194,0,0,148,194,0,0,150,194,0,0,156,194,0,0,162,194,0,0,172,194,0,0,190,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,0,210,194,0,0,200,194,0,0,190,194,0,0,180,194,0,0,170,194,0,0,160,194,0,0,150,194,0,0,140,194,0,0,130,194,0,0,116,194,0,0,92,194,0,0,68,194,0,0,28,194,0,0,4,194,0,0,32,194,0,0,12,194,0,0,0,194,0,0,24,194,0,0,32,194,0,0,4,194,0,0,12,194,0,0,20,194,0,0,56,194,0,0,36,194,0,0,52,194,0,0,48,194,0,0,56,194,0,0,40,194,0,0,52,194,0,0,56,194,0,0,80,194,0,0,72,194,0,0,72,194,0,0,72,194,0,0,88,194,0,0,88,194,0,0,92,194,0,0,100,194,0,0,120,194,0,0,128,194,0,0,132,194,
0,0,136,194,0,0,140,194,0,0,152,194,0,0,162,194,0,0,180,194,0,0,200,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,210,194,0,0,196,194,0,0,180,194,0,0,170,194,0,0,164,194,0,0,166,194,0,0,160,194,0,0,156,194,0,0,168,194,0,0,158,194,0,0,160,194,0,0,166,194,0,0,174,194,0,0,178,194,0,0,182,194,0,0,186,194,0,0,198,194,0,0,212,194,0,0,234,
194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,192,121,196,0,0,210,194,0,0,196,194,0,0,180,194,0,0,170,194,0,0,160,194,0,0,150,194,0,0,140,194,0,0,136,194,0,0,148,194,0,0,144,194,0,0,148,194,0,0,154,194,0,0,160,194,0,0,164,194,0,0,170,194,0,0,174,194,0,0,184,194,0,0,178,194,0,0,182,194,0,0,190,194,0,0,200,194,0,0,212,194,0,0,224,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,210,194,0,0,196,194,0,0,180,194,0,0,166,194,0,0,150,194,0,0,142,194,0,0,124,194,0,0,128,194,0,0,134,194,0,0,120,194,0,0,128,194,0,0,134,194,0,0,140,194,0,0,146,194,0,0,154,194,0,0,162,194,0,0,168,194,0,0,166,194,0,0,170,194,0,0,178,194,0,0,180,194,
0,0,186,194,0,0,196,194,0,0,208,194,0,0,218,194,0,0,228,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,206,194,0,0,192,194,
0,0,176,194,0,0,162,194,0,0,150,194,0,0,136,194,0,0,104,194,0,0,88,194,0,0,96,194,0,0,88,194,0,0,96,194,0,0,96,194,0,0,104,194,0,0,112,194,0,0,124,194,0,0,132,194,0,0,148,194,0,0,138,194,0,0,144,194,0,0,144,194,0,0,150,194,0,0,148,194,0,0,154,194,0,0,162,194,0,0,162,194,0,0,164,194,0,0,168,194,0,0,174,194,0,0,186,194,0,0,192,194,0,0,198,194,0,0,208,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,216,194,0,0,204,194,0,0,192,194,0,0,182,194,0,0,170,194,0,0,160,194,0,0,148,194,0,0,136,194,0,0,112,194,0,0,76,194,0,0,56,194,0,0,64,194,0,0,56,194,0,0,44,194,0,0,52,194,0,0,60,194,0,0,60,194,0,0,68,194,0,0,64,194,0,0,96,194,0,0,84,194,0,0,92,194,0,0,104,194,0,0,100,194,0,0,124,194,0,0,104,194,0,0,112,194,0,0,132,194,0,0,128,194,0,0,134,194,0,0,140,194,
0,0,140,194,0,0,148,194,0,0,154,194,0,0,168,194,0,0,172,194,0,0,178,194,0,0,182,194,0,0,186,194,0,0,188,194,0,0,202,194,0,0,218,194,0,0,236,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,216,194,0,0,206,194,0,0,196,194,0,0,186,194,0,0,176,194,0,0,166,194,0,0,156,194,0,0,146,194,0,0,136,194,0,0,112,194,0,0,84,194,0,0,48,194,0,0,12,194,0,0,24,194,0,0,24,194,0,0,8,194,0,0,8,194,0,0,16,194,
0,0,32,194,0,0,36,194,0,0,48,194,0,0,76,194,0,0,52,194,0,0,56,194,0,0,60,194,0,0,56,194,0,0,88,194,0,0,72,194,0,0,68,194,0,0,72,194,0,0,72,194,0,0,72,194,0,0,76,194,0,0,88,194,0,0,100,194,0,0,104,194,0,0,112,194,0,0,132,194,0,0,132,194,0,0,132,194,0,0,128,194,0,0,130,194,0,0,136,194,0,0,154,194,0,0,164,194,0,0,174,194,0,0,190,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,192,121,196,0,0,214,194,0,0,204,194,0,0,194,194,0,0,184,194,0,0,174,194,0,0,166,194,0,0,156,194,0,0,150,194,0,0,164,194,0,0,158,194,0,0,166,194,0,0,170,194,0,0,178,194,0,0,184,194,0,0,190,194,0,0,196,194,0,0,202,194,0,0,210,194,0,0,218,194,0,0,226,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,
192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,212,194,0,0,200,194,0,0,190,194,0,0,180,194,0,0,172,194,0,0,162,194,0,0,156,194,0,0,148,194,0,0,138,194,0,0,148,194,0,0,148,194,0,0,152,194,0,0,158,194,0,0,166,194,0,0,168,194,0,0,172,194,0,0,178,194,0,0,184,194,0,0,194,194,0,0,186,194,0,0,200,194,
0,0,206,194,0,0,214,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,212,194,0,0,200,194,0,0,190,
194,0,0,180,194,0,0,174,194,0,0,166,194,0,0,160,194,0,0,150,194,0,0,138,194,0,0,112,194,0,0,132,194,0,0,132,194,0,0,136,194,0,0,140,194,0,0,148,194,0,0,156,194,0,0,158,194,0,0,162,194,0,0,162,194,0,0,166,194,0,0,168,194,0,0,174,194,0,0,186,194,0,0,192,194,0,0,198,194,0,0,206,194,0,0,214,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,
192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,216,194,0,0,206,194,0,0,196,194,0,0,186,194,0,0,178,194,0,0,170,194,0,0,164,194,0,0,156,194,0,0,142,194,0,0,120,194,0,0,92,194,0,0,104,194,0,0,104,194,0,0,88,194,0,0,88,194,0,0,92,194,0,0,108,194,0,0,116,194,0,0,120,194,0,0,140,194,0,0,132,194,0,0,132,194,0,0,134,194,0,0,140,194,0,0,144,194,0,0,150,194,0,0,156,194,0,
0,168,194,0,0,168,194,0,0,168,194,0,0,176,194,0,0,182,194,0,0,180,194,0,0,190,194,0,0,196,194,0,0,204,194,0,0,206,194,0,0,212,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,216,194,0,0,206,194,0,0,196,194,0,0,188,194,0,0,180,194,0,0,174,194,0,0,164,194,0,0,158,194,0,0,146,194,0,0,134,194,0,0,104,194,0,0,
60,194,0,0,72,194,0,0,52,194,0,0,36,194,0,0,52,194,0,0,64,194,0,0,48,194,0,0,48,194,0,0,68,194,0,0,88,194,0,0,76,194,0,0,64,194,0,0,60,194,0,0,68,194,0,0,72,194,0,0,76,194,0,0,100,194,0,0,104,194,0,0,112,194,0,0,124,194,0,0,138,194,0,0,140,194,0,0,138,194,0,0,142,194,0,0,148,194,0,0,156,194,0,0,164,194,0,0,180,194,0,0,190,194,0,0,202,194,0,0,210,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,0,210,194,0,0,202,194,0,0,194,194,0,0,186,194,0,0,180,194,0,0,170,194,0,0,160,194,0,0,154,194,0,0,144,194,0,0,130,194,0,0,96,194,0,0,64,194,0,0,20,194,0,0,32,194,0,0,16,194,0,0,8,194,0,0,32,194,0,0,72,194,0,0,60,194,0,0,24,194,0,0,36,194,0,0,60,194,0,0,24,194,0,0,12,194,0,0,28,194,0,0,24,194,0,0,44,194,0,0,32,194,0,0,52,194,0,0,72,194,0,0,52,194,0,0,48,194,0,0,60,194,0,0,72,194,0,0,92,194,0,0,64,194,0,0,64,194,0,0,80,194,0,0,132,194,0,0,140,194,0,0,152,194,0,0,164,194,
0,0,180,194,0,0,194,194,0,0,210,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,216,194,0,0,206,194,0,0,196,194,0,0,186,194,0,0,172,194,0,0,158,194,0,0,152,194,0,0,166,194,0,0,162,194,0,0,170,194,0,0,174,194,0,0,178,194,0,0,186,194,0,0,196,194,0,0,204,194,0,0,214,194,0,0,224,194,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,0,216,194,0,0,206,194,0,0,196,194,0,0,186,194,0,0,172,194,0,0,158,194,0,0,142,194,0,0,154,194,0,0,148,194,0,0,154,194,0,0,158,194,0,0,162,194,0,0,168,194,0,0,170,194,0,0,180,194,0,0,184,194,0,0,186,194,0,0,184,194,0,0,196,194,0,0,202,194,0,0,216,194,0,0,224,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,216,194,0,0,206,194,0,0,196,194,0,0,186,194,0,0,174,194,0,0,156,194,0,0,136,194,0,0,130,194,0,0,132,194,0,0,120,194,0,0,130,194,0,0,134,194,0,0,140,194,0,0,146,194,0,0,150,194,0,0,156,194,0,0,164,194,0,0,164,194,0,0,166,194,0,0,168,194,0,0,182,194,0,0,186,194,
0,0,196,194,0,0,204,194,0,0,212,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,210,194,0,0,200,194,0,0,190,194,
0,0,180,194,0,0,164,194,0,0,148,194,0,0,120,194,0,0,100,194,0,0,104,194,0,0,96,194,0,0,76,194,0,0,80,194,0,0,80,194,0,0,88,194,0,0,88,194,0,0,104,194,0,0,132,194,0,0,108,194,0,0,112,194,0,0,124,194,0,0,132,194,0,0,138,194,0,0,146,194,0,0,158,194,0,0,166,194,0,0,168,194,0,0,160,194,0,0,162,194,0,0,162,194,0,0,164,194,0,0,176,194,0,0,184,194,0,0,196,194,0,0,210,194,0,0,226,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,214,194,0,0,204,194,0,0,194,194,0,0,184,194,0,0,168,194,0,0,158,194,0,0,138,194,0,0,100,194,0,0,60,194,0,0,80,194,0,0,60,194,0,0,48,194,0,0,52,194,0,0,72,194,0,0,80,194,0,0,40,194,0,0,40,194,0,0,84,194,0,0,44,194,0,0,44,194,0,0,64,194,0,0,76,194,0,0,96,194,0,0,92,194,0,0,80,194,0,0,100,194,0,0,108,194,0,0,116,194,0,0,120,194,0,0,134,194,0,0,
142,194,0,0,156,194,0,0,166,194,0,0,172,194,0,0,188,194,0,0,196,194,0,0,206,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,210,194,0,0,200,194,0,0,190,194,0,0,180,194,0,0,168,194,0,0,156,194,0,0,140,194,0,0,116,194,0,0,76,194,0,0,36,194,0,0,32,194,0,0,24,194,0,0,32,194,0,0,56,194,0,0,80,194,
0,0,76,194,0,0,36,194,0,0,32,194,0,0,56,194,0,0,32,194,0,0,24,194,0,0,24,194,0,0,36,194,0,0,56,194,0,0,36,194,0,0,56,194,0,0,60,194,0,0,44,194,0,0,44,194,0,0,52,194,0,0,36,194,0,0,52,194,0,0,96,194,0,0,134,194,0,0,136,194,0,0,166,194,0,0,174,194,0,0,180,194,0,0,190,194,0,0,204,194,0,0,214,194,0,0,226,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,0,218,194,0,0,210,194,0,0,202,194,0,0,192,194,0,0,182,194,0,0,168,194,0,0,154,194,0,0,164,194,0,0,164,194,0,0,170,194,0,0,178,194,0,0,188,194,0,0,200,194,0,0,212,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,212,194,0,0,206,194,0,0,196,194,0,0,184,194,0,0,170,194,0,0,160,194,0,0,142,194,0,0,150,194,0,0,144,194,0,0,152,194,0,0,160,194,0,0,168,194,0,0,172,194,0,0,178,194,0,0,186,194,0,0,200,194,0,0,214,194,0,0,
226,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,0,214,194,0,0,208,194,0,0,202,194,0,0,194,194,0,0,184,194,0,0,176,194,0,0,168,194,0,0,160,194,0,0,128,194,0,0,132,194,0,0,124,194,0,0,128,194,0,0,132,194,0,0,138,194,0,0,146,194,0,0,154,194,0,0,166,194,0,0,166,194,0,0,172,194,0,0,182,194,0,0,196,194,0,0,208,194,0,0,222,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,214,194,0,0,208,194,0,0,202,194,0,0,194,194,0,0,184,194,0,0,180,194,0,0,168,194,0,0,148,194,0,0,100,194,0,0,104,194,0,0,80,194,0,0,92,194,0,0,88,194,0,0,72,194,0,0,80,194,0,0,72,194,0,0,80,194,0,0,124,194,0,0,120,194,0,0,138,194,0,0,152,194,0,0,154,194,0,
0,156,194,0,0,156,194,0,0,158,194,0,0,164,194,0,0,176,194,0,0,188,194,0,0,200,194,0,0,212,194,0,0,222,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,212,194,0,0,204,194,0,0,196,194,0,0,190,194,0,0,180,194,
0,0,170,194,0,0,166,194,0,0,156,194,0,0,140,194,0,0,72,194,0,0,72,194,0,0,36,194,0,0,48,194,0,0,68,194,0,0,60,194,0,0,72,194,0,0,72,194,0,0,48,194,0,0,92,194,0,0,56,194,0,0,60,194,0,0,64,194,0,0,64,194,0,0,88,194,0,0,68,194,0,0,68,194,0,0,104,194,0,0,120,194,0,0,142,194,0,0,162,194,0,0,174,194,0,0,184,194,0,0,194,194,0,0,204,194,0,0,216,194,0,0,228,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,212,194,0,0,204,194,0,0,196,194,0,0,190,194,0,0,180,194,0,0,170,194,0,0,166,194,0,0,156,194,0,0,140,194,0,0,52,194,0,0,44,194,0,0,36,194,0,0,60,194,0,0,72,194,0,0,76,194,0,0,72,194,0,0,68,194,0,0,52,194,0,0,60,194,0,0,36,194,0,0,48,194,0,0,36,194,0,0,28,194,0,0,44,194,0,0,24,194,0,0,20,194,0,0,32,194,0,0,36,194,0,0,48,194,0,0,72,194,0,0,104,194,0,0,130,194,0,0,
146,194,0,0,158,194,0,0,170,194,0,0,184,194,0,0,194,194,0,0,202,194,0,0,210,194,0,0,218,194,0,0,226,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,214,194,0,0,200,194,0,0,190,194,0,0,174,194,0,0,162,194,0,0,170,194,0,0,166,194,0,0,176,194,0,0,186,194,0,0,200,194,
0,0,214,194,0,0,228,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,
192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,214,194,0,0,202,194,0,0,190,194,0,0,176,194,0,0,166,194,0,0,152,194,0,0,146,194,0,0,144,194,0,0,158,194,0,0,168,194,0,0,180,194,0,0,190,194,0,0,200,194,0,0,210,194,0,0,220,194,0,0,230,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,208,194,0,0,196,194,0,0,184,194,0,0,174,194,0,0,162,194,0,0,140,194,0,0,130,194,0,0,120,194,0,0,134,194,0,0,142,194,0,0,148,194,
0,0,160,194,0,0,170,194,0,0,182,194,0,0,190,194,0,0,198,194,0,0,206,194,0,0,216,194,0,0,222,194,0,0,228,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,
192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,206,194,0,0,194,194,0,0,180,194,0,0,170,194,0,0,152,194,0,0,112,194,0,0,96,194,0,0,88,194,0,0,112,194,0,0,120,194,0,0,116,194,0,0,96,194,0,0,124,194,0,0,130,194,0,0,146,194,0,0,148,194,0,0,154,194,0,0,150,194,0,0,156,194,0,0,162,194,0,0,172,194,0,0,174,194,0,0,176,194,0,0,182,194,0,0,188,194,0,0,196,194,0,0,206,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,
192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,210,194,0,0,200,194,0,0,194,194,0,0,184,194,0,0,172,194,0,0,162,194,0,0,158,194,0,0,140,194,0,0,100,194,0,0,76,194,0,0,60,194,0,0,76,194,0,0,104,194,0,0,112,194,0,0,96,194,0,0,84,194,0,0,72,194,0,0,104,194,
0,0,80,194,0,0,72,194,0,0,72,194,0,0,84,194,0,0,92,194,0,0,128,194,0,0,138,194,0,0,142,194,0,0,170,194,0,0,164,194,0,0,156,194,0,0,162,194,0,0,170,194,0,0,190,194,0,0,204,194,0,0,224,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,210,
194,0,0,200,194,0,0,194,194,0,0,184,194,0,0,170,194,0,0,166,194,0,0,158,194,0,0,144,194,0,0,68,194,0,0,32,194,0,0,44,194,0,0,44,194,0,0,88,194,0,0,96,194,0,0,76,194,0,0,72,194,0,0,32,194,0,0,44,194,0,0,24,194,0,0,16,194,0,0,12,194,0,0,20,194,0,0,24,194,0,0,20,194,0,0,48,194,0,0,88,194,0,0,112,194,0,0,100,194,0,0,112,194,0,0,140,194,0,0,150,194,0,0,168,194,0,0,184,194,0,0,206,194,0,0,224,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,204,194,0,0,190,194,0,0,178,194,0,0,164,194,0,0,166,194,0,0,168,194,0,0,180,194,0,0,184,194,0,0,198,194,0,0,214,194,0,0,226,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,214,194,0,0,202,
194,0,0,190,194,0,0,178,194,0,0,166,194,0,0,144,194,0,0,148,194,0,0,156,194,0,0,170,194,0,0,176,194,0,0,176,194,0,0,180,194,0,0,184,194,0,0,196,194,0,0,210,194,0,0,222,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,218,194,0,0,206,194,0,0,194,194,0,0,186,194,0,0,174,194,0,0,162,194,0,0,140,194,0,0,140,194,0,0,134,194,0,0,150,194,0,0,146,194,0,0,152,194,0,0,158,194,0,0,162,194,0,0,166,194,0,0,176,194,0,0,178,194,0,0,194,194,0,0,206,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,214,194,0,0,200,194,0,0,188,194,0,0,176,194,
0,0,166,194,0,0,150,194,0,0,124,194,0,0,108,194,0,0,108,194,0,0,124,194,0,0,132,194,0,0,112,194,0,0,120,194,0,0,134,194,0,0,134,194,0,0,154,194,0,0,152,194,0,0,162,194,0,0,176,194,0,0,172,194,0,0,184,194,0,0,192,194,0,0,204,194,0,0,218,194,0,0,232,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,210,194,0,0,196,194,0,0,184,194,0,0,172,194,0,0,162,194,0,0,146,194,0,0,96,194,0,0,80,194,0,0,60,194,0,0,92,194,0,0,112,194,0,0,104,194,0,0,80,194,0,0,76,194,0,0,52,194,0,0,68,194,0,0,72,194,0,0,84,194,0,0,88,194,0,0,116,194,0,0,142,194,0,0,140,194,0,0,138,194,0,0,156,194,0,0,158,194,0,0,174,194,0,0,180,194,0,0,192,
194,0,0,208,194,0,0,224,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,206,194,0,0,192,194,0,0,180,194,0,0,172,194,0,0,156,194,0,0,140,194,0,0,76,194,0,0,40,194,0,0,60,194,0,0,
64,194,0,0,92,194,0,0,88,194,0,0,88,194,0,0,84,194,0,0,40,194,0,0,12,194,0,0,224,193,0,0,4,194,0,0,24,194,0,0,20,194,0,0,48,194,0,0,60,194,0,0,68,194,0,0,88,194,0,0,124,194,0,0,136,194,0,0,156,194,0,0,164,194,0,0,178,194,0,0,188,194,0,0,198,194,0,0,208,194,0,0,218,194,0,0,228,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,200,194,0,0,180,194,0,0,158,194,0,0,170,194,0,0,162,194,0,0,164,194,0,0,164,194,0,0,178,194,0,0,188,194,0,0,198,194,0,0,206,194,0,0,218,194,0,0,230,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,210,194,0,0,194,194,0,0,170,194,0,0,144,194,0,0,148,194,0,0,140,194,0,0,140,194,0,0,140,194,0,0,152,194,0,0,170,194,
0,0,182,194,0,0,186,194,0,0,194,194,0,0,206,194,0,0,218,194,0,0,230,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,224,194,0,0,186,194,0,0,162,194,0,0,136,194,0,0,120,194,0,0,112,194,0,0,112,194,0,0,100,194,0,0,124,194,0,0,140,194,0,0,154,194,0,0,164,194,0,0,180,194,0,0,186,194,0,0,196,194,0,0,208,194,0,0,218,194,0,0,226,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,
192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,226,194,0,0,200,194,0,0,186,194,0,0,168,194,0,0,124,194,0,0,104,194,0,0,64,194,0,0,84,194,0,0,88,194,0,0,80,194,0,0,80,194,0,0,100,194,
0,0,128,194,0,0,132,194,0,0,152,194,0,0,166,194,0,0,162,194,0,0,170,194,0,0,170,194,0,0,180,194,0,0,190,194,0,0,196,194,0,0,202,194,0,0,206,194,0,0,212,194,0,0,216,194,0,0,222,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,210,194,0,0,190,194,0,0,172,194,0,0,148,194,0,0,84,194,0,0,72,194,0,0,24,194,0,0,44,194,0,0,68,194,0,0,44,194,0,0,40,194,0,0,28,194,0,0,28,194,0,0,56,194,0,0,80,194,0,0,100,194,0,0,96,194,0,0,144,194,0,0,138,194,0,0,148,194,0,0,162,194,0,0,174,194,0,0,184,194,0,0,188,194,0,0,194,194,0,0,198,194,0,0,204,194,0,0,210,194,0,0,216,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,216,194,0,0,198,194,0,0,180,194,0,0,152,194,0,0,132,194,0,0,52,194,0,0,44,194,0,0,36,194,0,0,48,194,0,0,60,194,0,0,44,194,0,0,60,194,0,0,32,194,0,0,240,193,0,0,248,193,0,0,248,193,0,0,28,194,0,0,4,194,0,0,32,194,0,0,36,
194,0,0,44,194,0,0,84,194,0,0,108,194,0,0,140,194,0,0,146,194,0,0,154,194,0,0,158,194,0,0,164,194,0,0,168,194,0,0,174,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,
192,121,196,0,192,121,196,0,0,220,194,0,0,182,194,0,0,152,194,0,0,150,194,0,0,170,194,0,0,186,194,0,0,196,194,0,0,208,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,192,121,196,0,192,121,196],"i8",4,h.e+40960);x([0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,182,194,0,0,140,194,0,0,140,194,0,0,150,194,0,0,172,194,0,0,178,194,0,0,188,194,0,0,196,194,0,0,202,194,0,0,212,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,190,194,0,0,160,194,0,0,112,194,0,0,130,194,0,0,128,194,0,0,148,194,0,0,166,194,0,0,176,194,0,0,182,194,0,0,190,194,0,0,198,194,0,0,206,194,0,0,214,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,190,194,0,0,160,194,0,0,104,194,0,0,92,194,0,0,68,194,0,0,132,194,0,0,136,194,0,0,142,194,0,0,156,194,0,0,156,194,0,0,160,194,0,0,176,194,0,0,170,194,0,0,178,194,0,0,194,194,0,0,200,194,
0,0,210,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,
192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,190,194,0,0,160,194,0,0,84,194,0,0,80,194,0,0,36,194,0,0,108,194,0,0,108,194,0,0,68,194,0,0,104,194,0,0,96,194,0,0,124,194,0,0,172,194,0,0,158,194,0,0,180,194,0,0,186,194,0,0,196,194,0,0,206,194,0,0,214,194,0,0,224,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,
192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,194,194,0,0,182,194,0,0,146,194,0,0,52,194,0,0,32,194,0,0,4,194,0,0,84,194,0,0,116,194,0,0,68,194,0,0,88,194,0,0,72,194,0,0,72,194,0,0,112,194,0,0,80,194,0,0,134,194,0,0,148,194,0,0,162,194,0,0,184,194,0,0,192,194,0,0,200,
194,0,0,210,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,226,194,
0,0,212,194,0,0,198,194,0,0,184,194,0,0,154,194,0,0,160,194,0,0,176,194,0,0,194,194,0,0,212,194,0,0,230,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,
192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,232,194,0,0,218,194,0,0,204,194,0,0,190,194,0,0,178,194,0,0,148,194,0,0,144,194,0,0,176,194,0,0,174,194,0,0,190,194,0,0,204,194,0,0,218,194,0,0,232,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,232,194,
0,0,218,194,0,0,204,194,0,0,190,194,0,0,178,194,0,0,150,194,0,0,132,194,0,0,148,194,0,0,154,194,0,0,156,194,0,0,172,194,0,0,174,194,0,0,180,194,0,0,192,194,0,0,210,194,0,0,230,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,230,194,0,0,216,194,0,0,202,194,0,0,188,194,0,0,176,194,0,0,132,194,0,0,96,194,0,0,116,194,0,0,140,194,0,0,130,194,0,0,156,194,0,0,144,194,0,0,166,194,0,0,168,194,0,0,186,194,0,0,196,194,0,0,210,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,210,
194,0,0,190,194,0,0,178,194,0,0,164,194,0,0,100,194,0,0,80,194,0,0,80,194,0,0,108,194,0,0,96,194,0,0,108,194,0,0,104,194,0,0,138,194,0,0,134,194,0,0,176,194,0,0,164,194,0,0,164,194,0,0,178,194,0,0,188,194,0,0,200,194,0,0,216,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,202,194,0,0,192,194,0,0,180,194,0,0,166,194,0,0,154,194,0,0,88,194,0,0,44,194,0,0,24,194,0,0,72,194,0,0,64,194,0,0,80,194,0,0,64,194,0,0,40,194,0,0,40,194,0,0,76,194,0,0,80,194,0,0,84,194,0,0,108,194,0,0,130,194,0,0,142,194,0,0,156,194,0,0,170,194,0,0,190,194,0,192,121,196,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,240,194,0,0,210,194,0,0,172,194,
0,0,136,194,0,0,156,194,0,0,158,194,0,0,180,194,0,0,200,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,240,194,0,0,210,194,0,0,172,194,0,0,132,194,0,0,146,194,0,0,154,194,0,0,176,194,0,0,192,194,0,0,210,194,0,0,230,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,240,194,0,0,210,194,0,
0,184,194,0,0,160,194,0,0,116,194,0,0,128,194,0,0,136,194,0,0,160,194,0,0,174,194,0,0,184,194,0,0,200,194,0,0,220,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,240,194,0,0,208,194,0,0,182,194,0,0,158,194,0,0,80,194,0,0,112,194,0,0,88,194,0,0,128,194,0,0,138,194,0,0,154,194,0,0,160,194,0,0,164,194,0,0,168,194,0,0,170,194,0,0,174,194,0,0,176,194,0,0,180,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,236,194,0,0,200,194,0,
0,174,194,0,0,154,194,0,0,68,194,0,0,72,194,0,0,48,194,0,0,104,194,0,0,116,194,0,0,116,194,0,0,134,194,0,0,130,194,0,0,120,194,0,0,120,194,0,0,120,194,0,0,130,194,0,0,136,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,230,194,0,0,196,194,0,0,168,194,0,0,120,194,0,0,68,194,0,0,48,194,0,0,24,194,0,0,56,194,0,0,68,194,0,0,68,194,0,0,56,194,0,0,28,194,0,0,20,194,0,0,28,194,0,0,32,194,0,0,40,194,0,0,44,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,176,194,
0,0,148,194,0,0,154,194,0,0,164,194,0,0,164,194,0,0,170,194,0,0,180,194,0,0,188,194,0,0,198,194,0,0,208,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,
192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,176,194,0,0,132,194,0,0,140,194,0,0,162,194,0,0,160,194,0,0,162,194,0,0,168,194,0,0,176,194,0,0,182,194,0,0,186,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,
194,0,0,176,194,0,0,116,194,0,0,124,194,0,0,140,194,0,0,142,194,0,0,148,194,0,0,154,194,0,0,160,194,0,0,166,194,0,0,170,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,172,194,0,0,120,194,0,0,124,194,0,0,120,194,0,0,120,194,0,0,104,194,0,0,80,194,0,0,72,194,0,0,72,194,0,0,80,194,0,0,88,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,236,194,
0,0,216,194,0,0,168,194,0,0,84,194,0,0,72,194,0,0,72,194,0,0,72,194,0,0,92,194,0,0,60,194,0,0,52,194,0,0,32,194,0,0,32,194,0,0,32,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,236,194,0,0,200,194,0,0,146,194,0,0,44,194,0,0,20,194,0,0,40,194,0,0,44,194,0,0,84,194,0,0,24,194,0,0,20,194,0,0,12,194,0,0,12,194,0,0,24,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,200,194,0,0,182,194,0,0,
168,194,0,0,148,194,0,0,160,194,0,0,160,194,0,0,160,194,0,0,160,194,0,0,160,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,
192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,200,194,0,0,182,194,0,0,168,194,0,0,148,194,0,0,136,194,0,0,136,194,0,0,136,194,0,0,136,194,0,0,136,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,200,
194,0,0,172,194,0,0,156,194,0,0,140,194,0,0,112,194,0,0,52,194,0,0,240,193,0,0,168,193,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,
196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,200,194,0,0,174,194,0,0,156,194,0,0,134,194,0,0,64,194,0,0,24,194,0,0,232,193,0,0,168,193,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,0,220,194,0,0,200,194,0,0,172,194,0,0,138,194,0,0,96,194,0,0,52,194,0,0,12,194,0,0,4,194,0,0,232,193,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,
121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,0,220,194,0,0,200,194,0,0,166,194,0,0,142,194,0,0,64,194,0,0,216,193,0,0,24,194,0,0,20,194,0,0,8,194,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,
0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,0,192,121,196,192,229,0,0,164,225,0,0,220,229,0,0,252,229,0,0,28,230,0,0,60,230,0,0,4,0,0,0,2,0,0,0,3,0,0,0,5,0,0,0,1,0,0,0,1,0,0,0,2,0,0,0,1,0,0,0,2,0,
0,0,3,0,0,0,1,0,0,0,62,180,228,51,9,145,243,51,139,178,1,52,60,32,10,52,35,26,19,52,96,169,28,52,167,215,38,52,75,175,49,52,80,59,61,52,112,135,73,52,35,160,86,52,184,146,100,52,85,109,115,52,136,159,129,52,252,11,138,52,147,4,147,52,105,146,156,52,50,191,166,52,63,149,177,52,147,31,189,52,228,105,201,52,173,128,214,52,54,113,228,52,166,73,243,52,136,140,1,53,192,247,9,53,6,239,18,53,118,123,28,53,192,166,38,53,55,123,49,53,218,3,61,53,94,76,73,53,59,97,86,53,185,79,100,53,252,37,115,53,138,121,129,
53,134,227,137,53,124,217,146,53,133,100,156,53,82,142,166,53,51,97,177,53,37,232,188,53,220,46,201,53,206,65,214,53,65,46,228,53,87,2,243,53,143,102,1,54,79,207,9,54,245,195,18,54,152,77,28,54,232,117,38,54,50,71,49,54,116,204,60,54,94,17,73,54,101,34,86,54,206,12,100,54,184,222,114,54,151,83,129,54,28,187,137,54,114,174,146,54,175,54,156,54,129,93,166,54,53,45,177,54,199,176,188,54,228,243,200,54,1,3,214,54,96,235,227,54,30,187,242,54,162,64,1,55,235,166,9,55,241,152,18,55,201,31,28,55,30,69,38,
55,61,19,49,55,30,149,60,55,111,214,72,55,162,227,85,55,247,201,99,55,137,151,114,55,175,45,129,55,190,146,137,55,116,131,146,55,230,8,156,55,190,44,166,55,71,249,176,55,121,121,188,55,254,184,200,55,71,196,213,55,146,168,227,55,248,115,242,55,192,26,1,56,147,126,9,56,249,109,18,56,6,242,27,56,98,20,38,56,86,223,48,56,216,93,60,56,146,155,72,56,242,164,85,56,51,135,99,56,110,80,114,56,211,7,129,56,107,106,137,56,130,88,146,56,42,219,155,56,9,252,165,56,104,197,176,56,59,66,188,56,41,126,200,56,160,
133,213,56,217,101,227,56,232,44,242,56,233,244,0,57,70,86,9,57,14,67,18,57,81,196,27,57,181,227,37,57,127,171,48,57,162,38,60,57,197,96,72,57,83,102,85,57,131,68,99,57,104,9,114,57,1,226,128,57,36,66,137,57,157,45,146,57,123,173,155,57,99,203,165,57,153,145,176,57,13,11,188,57,102,67,200,57,11,71,213,57,50,35,227,57,237,229,241,57,29,207,0,58,5,46,9,58,48,24,18,58,169,150,27,58,21,179,37,58,183,119,48,58,124,239,59,58,10,38,72,58,199,39,85,58,230,1,99,58,120,194,113,58,59,188,128,58,233,25,137,58,
198,2,146,58,219,127,155,58,203,154,165,58,216,93,176,58,239,211,187,58,179,8,200,58,136,8,213,58,159,224,226,58,7,159,241,58,92,169,0,59,208,5,9,59,94,237,17,59,15,105,27,59,132,130,37,59,253,67,48,59,103,184,59,59,97,235,71,59,77,233,84,59,93,191,98,59,156,123,113,59,127,150,128,59,186,241,136,59,249,215,145,59,71,82,155,59,65,106,165,59,39,42,176,59,226,156,187,59,18,206,199,59,23,202,212,59,32,158,226,59,53,88,241,59,166,131,0,60,167,221,8,60,152,194,17,60,130,59,27,60,1,82,37,60,84,16,48,60,
97,129,59,60,200,176,71,60,229,170,84,60,232,124,98,60,212,52,113,60,207,112,128,60,150,201,136,60,58,173,145,60,192,36,155,60,197,57,165,60,133,246,175,60,229,101,187,60,130,147,199,60,185,139,212,60,180,91,226,60,121,17,241,60,251,93,0,61,137,181,8,61,223,151,17,61,2,14,27,61,141,33,37,61,185,220,47,61,109,74,59,61,64,118,71,61,145,108,84,61,133,58,98,61,34,238,112,61,42,75,128,61,127,161,136,61,136,130,145,61,72,247,154,61,88,9,165,61,242,194,175,61,248,46,187,61,3,89,199,61,109,77,212,61,92,25,
226,61,209,202,240,61,91,56,0,62,119,141,8,62,51,109,17,62,144,224,26,62,39,241,36,62,46,169,47,62,135,19,59,62,202,59,71,62,77,46,84,62,55,248,97,62,132,167,112,62,143,37,128,62,115,121,136,62,226,87,145,62,220,201,154,62,249,216,164,62,109,143,175,62,27,248,186,62,149,30,199,62,51,15,212,62,23,215,225,62,61,132,240,62,198,18,0,63,114,101,8,63,147,66,17,63,43,179,26,63,206,192,36,63,177,117,47,63,178,220,58,63,101,1,71,63,29,240,83,63,251,181,97,63,251,96,112,63,0,0,128,63,0,0,0,0,4,0,0,0,5,0,0,
0,3,0,0,0,4,0,0,0,6,0,0,0,2,0,0,0,0,0,0,0,7,0,0,0,8,0,0,0,5,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,7,0,0,0,8,0,0,0,5,0,0,0,6,0,0,0,2,0,0,0,1,0,0,0,3,0,0,0,2,0,0,0,7,0,0,0,8,0,0,0,5,0,0,0,6,0,0,0,4,0,0,0,2,0,0,0,5,0,0,0,1,0,0,0,9,0,0,0,7,0,0,0,1,0,0,0,10,0,0,0,72,2,0,0,128,2,0,0,128,2,0,0,120,2,0,0,72,2,0,0,128,2,0,0,120,2,0,0,120,2,0,0,120,2,0,0,128,2,0,0,128,2,0,0,128,2,0,0,72,2,0,0,128,2,0,0,128,2,0,0,128,2,0,0,128,2,0,0,128,2,0,0,64,2,0,0,128,2,0,0,128,2,0,0,72,2,0,0,128,2,0,0,120,2,0,0,
120,2,0,0,120,2,0,0,120,2,0,0,128,2,0,0,128,2,0,0,1,0,0,0,128,0,0,0,2,0,0,0,128,0,0,0,3,0,0,0,128,0,0,0,4,0,0,0,128,0,0,0,5,0,0,0,128,0,0,0,6,0,0,0,128,0,0,0,7,0,0,0,128,0,0,0,8,0,0,0,128,0,0,0,9,0,0,0,128,0,0,0,10,0,0,0,128,0,0,0,11,0,0,0,128,0,0,0,12,0,0,0,128,0,0,0,13,0,0,0,128,0,0,0,14,0,0,0,128,0,0,0,15,0,0,0,128,0,0,0,16,0,0,0,128,0,0,0,1,0,0,0,128,0,0,0,3,0,0,0,128,0,0,0,5,0,0,0,128,0,0,0,7,0,0,0,128,0,0,0,9,0,0,0,128,0,0,0,11,0,0,0,128,0,0,0,13,0,0,0,128,0,0,0,15,0,0,0,128,0,0,0,0,0,0,0,0,
0,0,0,110,0,0,0,128,0,0,0,74,1,0,0,128,255,255,255,185,1,0,0,0,0,0,0,0,0,0,0,50,0,0,0,40,0,0,0,60,0,0,0,70,0,0,0,80,0,0,0,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,10,0,0,0,20,0,0,0,90,0,0,0,100,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,244,231,0,0,5,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,149,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,
0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,2,0,0,0,157,255,0,0,0,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,232,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,216,1,0,0,8,0,0,0,9,
0,0,0,10,0,0,0,11,0,0,0,5,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,2,0,0,8,0,0,0,12,0,0,0,10,0,0,0,11,0,0,0,5,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,48,2,0,0,8,0,0,0,13,0,0,0,10,0,0,0,11,0,0,0,6,0,0,0,0,0,0,0,168,2,0,0,8,0,0,0,14,0,0,0,10,0,0,0,11,0,0,0,5,0,0,0,3,0,0,0,3,0,0,0,3,0,0,0,79,103,103,83,0,118,111,114,98,105,115,0,100,101,99,111,100,101,78,111,105,115,101,0,99,114,101,97,116,101,80,120,116,111,110,101,0,114,101,108,101,97,115,101,80,120,116,111,110,101,0,103,101,116,80,120,116,111,110,101,
84,101,120,116,0,103,101,116,80,120,116,111,110,101,73,110,102,111,0,118,111,109,105,116,80,120,116,111,110,101,0,105,105,105,105,105,0,105,105,105,105,105,105,105,105,105,0,105,105,105,105,105,105,105,0,118,105,105,105,0,80,84,78,79,73,83,69,45,0,80,84,84,85,78,69,45,45,50,48,48,55,49,49,49,57,0,80,84,67,79,76,76,65,71,69,45,48,55,49,49,49,57,0,77,97,115,116,101,114,86,53,0,69,118,101,110,116,32,86,53,0,116,101,120,116,78,65,77,69,0,116,101,120,116,67,79,77,77,0,101,102,102,101,68,69,76,65,0,101,
102,102,101,79,86,69,82,0,109,97,116,101,80,67,77,32,0,109,97,116,101,80,84,86,32,0,109,97,116,101,80,84,78,32,0,109,97,116,101,79,71,71,86,0,97,115,115,105,87,79,73,67,0,110,117,109,32,85,78,73,84,0,97,115,115,105,85,78,73,84,0,112,120,116,111,110,101,78,68,0,97,110,116,105,79,80,69,82,0,80,82,79,74,69,67,84,61,0,85,78,73,84,61,61,61,61,0,109,97,116,101,80,67,77,61,0,69,86,69,78,84,61,61,61,0,69,78,68,61,61,61,61,61,0,112,120,116,110,85,78,73,84,0,101,118,101,110,77,65,83,84,0,101,118,101,110,85,
78,73,84,0,80,84,67,79,76,76,65,71,69,45,48,53,48,50,50,55,0,80,84,67,79,76,76,65,71,69,45,48,53,48,54,48,56,0,80,84,67,79,76,76,65,71,69,45,48,54,48,49,49,53,0,80,84,67,79,76,76,65,71,69,45,48,54,48,57,51,48,0,80,84,84,85,78,69,45,45,50,48,48,53,48,54,48,56,0,80,84,84,85,78,69,45,45,50,48,48,54,48,49,49,53,0,80,84,84,85,78,69,45,45,50,48,48,54,48,57,51,48,0,118,111,105,99,101,95,37,48,50,100,0,80,84,86,79,73,67,69,45,0,118,111,105,100,0,98,111,111,108,0,99,104,97,114,0,115,105,103,110,101,100,32,
99,104,97,114,0,117,110,115,105,103,110,101,100,32,99,104,97,114,0,115,104,111,114,116,0,117,110,115,105,103,110,101,100,32,115,104,111,114,116,0,105,110,116,0,117,110,115,105,103,110,101,100,32,105,110,116,0,108,111,110,103,0,117,110,115,105,103,110,101,100,32,108,111,110,103,0,102,108,111,97,116,0,100,111,117,98,108,101,0,115,116,100,58,58,115,116,114,105,110,103,0,115,116,100,58,58,98,97,115,105,99,95,115,116,114,105,110,103,60,117,110,115,105,103,110,101,100,32,99,104,97,114,62,0,115,116,100,
58,58,119,115,116,114,105,110,103,0,101,109,115,99,114,105,112,116,101,110,58,58,118,97,108,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,99,104,97,114,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,115,105,103,110,101,100,32,99,104,97,114,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,110,115,105,103,110,101,100,32,99,104,97,114,62,0,101,109,115,99,
114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,115,104,111,114,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,110,115,105,103,110,101,100,32,115,104,111,114,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,105,110,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,110,115,105,103,110,101,100,32,105,110,116,62,
0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,108,111,110,103,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,110,115,105,103,110,101,100,32,108,111,110,103,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,105,110,116,56,95,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,105,110,116,56,95,116,62,0,
101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,105,110,116,49,54,95,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,105,110,116,49,54,95,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,105,110,116,51,50,95,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,117,105,110,116,51,50,95,116,62,0,101,109,115,
99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,102,108,111,97,116,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,100,111,117,98,108,101,62,0,101,109,115,99,114,105,112,116,101,110,58,58,109,101,109,111,114,121,95,118,105,101,119,60,108,111,110,103,32,100,111,117,98,108,101,62,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,101,69,69,0,78,49,48,101,109,115,99,114,105,
112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,100,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,102,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,109,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,108,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,
105,101,119,73,106,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,105,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,116,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95],"i8",4,h.e+51200);x([118,105,101,119,73,115,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,104,69,69,0,78,49,
48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,97,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,49,49,109,101,109,111,114,121,95,118,105,101,119,73,99,69,69,0,78,49,48,101,109,115,99,114,105,112,116,101,110,51,118,97,108,69,0,78,83,116,51,95,95,50,49,50,98,97,115,105,99,95,115,116,114,105,110,103,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,119,69,69,69,69,0,78,83,
116,51,95,95,50,50,49,95,95,98,97,115,105,99,95,115,116,114,105,110,103,95,99,111,109,109,111,110,73,76,98,49,69,69,69,0,78,83,116,51,95,95,50,49,50,98,97,115,105,99,95,115,116,114,105,110,103,73,104,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,104,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,104,69,69,69,69,0,78,83,116,51,95,95,50,49,50,98,97,115,105,99,95,115,116,114,105,110,103,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,78,83,95,57,97,108,108,
111,99,97,116,111,114,73,99,69,69,69,69,0,17,0,10,0,17,17,17,0,0,0,0,5,0,0,0,0,0,0,9,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,15,10,17,17,17,3,10,7,0,1,19,9,11,11,0,0,9,6,11,0,0,11,0,6,17,0,0,0,17,17,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,10,10,17,17,17,0,10,0,0,2,0,9,11,0,0,0,9,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,13,
0,0,0,4,13,0,0,0,0,9,14,0,0,0,0,0,14,0,0,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,15,0,0,0,0,9,16,0,0,0,0,0,16,0,0,16,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,10,0,0,0,0,9,11,0,0,0,0,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,
0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,45,43,32,32,32,48,88,48,120,0,40,110,117,108,108,41,0,45,48,88,43,48,88,32,48,88,45,48,120,43,48,120,32,48,120,0,105,110,102,0,73,78,70,0,110,97,110,0,78,65,78,0,46,0,84,33,34,25,13,1,2,3,17,75,28,12,16,4,11,29,18,30,39,104,110,111,112,113,98,32,5,6,15,19,20,21,26,8,22,7,40,36,23,24,9,10,14,27,31,37,35,131,130,125,38,42,43,60,61,62,63,67,71,74,77,88,89,90,91,92,93,94,95,96,97,99,100,101,102,103,105,106,107,108,114,
115,116,121,122,123,124,0,73,108,108,101,103,97,108,32,98,121,116,101,32,115,101,113,117,101,110,99,101,0,68,111,109,97,105,110,32,101,114,114,111,114,0,82,101,115,117,108,116,32,110,111,116,32,114,101,112,114,101,115,101,110,116,97,98,108,101,0,78,111,116,32,97,32,116,116,121,0,80,101,114,109,105,115,115,105,111,110,32,100,101,110,105,101,100,0,79,112,101,114,97,116,105,111,110,32,110,111,116,32,112,101,114,109,105,116,116,101,100,0,78,111,32,115,117,99,104,32,102,105,108,101,32,111,114,32,100,105,
114,101,99,116,111,114,121,0,78,111,32,115,117,99,104,32,112,114,111,99,101,115,115,0,70,105,108,101,32,101,120,105,115,116,115,0,86,97,108,117,101,32,116,111,111,32,108,97,114,103,101,32,102,111,114,32,100,97,116,97,32,116,121,112,101,0,78,111,32,115,112,97,99,101,32,108,101,102,116,32,111,110,32,100,101,118,105,99,101,0,79,117,116,32,111,102,32,109,101,109,111,114,121,0,82,101,115,111,117,114,99,101,32,98,117,115,121,0,73,110,116,101,114,114,117,112,116,101,100,32,115,121,115,116,101,109,32,99,
97,108,108,0,82,101,115,111,117,114,99,101,32,116,101,109,112,111,114,97,114,105,108,121,32,117,110,97,118,97,105,108,97,98,108,101,0,73,110,118,97,108,105,100,32,115,101,101,107,0,67,114,111,115,115,45,100,101,118,105,99,101,32,108,105,110,107,0,82,101,97,100,45,111,110,108,121,32,102,105,108,101,32,115,121,115,116,101,109,0,68,105,114,101,99,116,111,114,121,32,110,111,116,32,101,109,112,116,121,0,67,111,110,110,101,99,116,105,111,110,32,114,101,115,101,116,32,98,121,32,112,101,101,114,0,79,112,
101,114,97,116,105,111,110,32,116,105,109,101,100,32,111,117,116,0,67,111,110,110,101,99,116,105,111,110,32,114,101,102,117,115,101,100,0,72,111,115,116,32,105,115,32,100,111,119,110,0,72,111,115,116,32,105,115,32,117,110,114,101,97,99,104,97,98,108,101,0,65,100,100,114,101,115,115,32,105,110,32,117,115,101,0,66,114,111,107,101,110,32,112,105,112,101,0,73,47,79,32,101,114,114,111,114,0,78,111,32,115,117,99,104,32,100,101,118,105,99,101,32,111,114,32,97,100,100,114,101,115,115,0,66,108,111,99,107,
32,100,101,118,105,99,101,32,114,101,113,117,105,114,101,100,0,78,111,32,115,117,99,104,32,100,101,118,105,99,101,0,78,111,116,32,97,32,100,105,114,101,99,116,111,114,121,0,73,115,32,97,32,100,105,114,101,99,116,111,114,121,0,84,101,120,116,32,102,105,108,101,32,98,117,115,121,0,69,120,101,99,32,102,111,114,109,97,116,32,101,114,114,111,114,0,73,110,118,97,108,105,100,32,97,114,103,117,109,101,110,116,0,65,114,103,117,109,101,110,116,32,108,105,115,116,32,116,111,111,32,108,111,110,103,0,83,121,109,
98,111,108,105,99,32,108,105,110,107,32,108,111,111,112,0,70,105,108,101,110,97,109,101,32,116,111,111,32,108,111,110,103,0,84,111,111,32,109,97,110,121,32,111,112,101,110,32,102,105,108,101,115,32,105,110,32,115,121,115,116,101,109,0,78,111,32,102,105,108,101,32,100,101,115,99,114,105,112,116,111,114,115,32,97,118,97,105,108,97,98,108,101,0,66,97,100,32,102,105,108,101,32,100,101,115,99,114,105,112,116,111,114,0,78,111,32,99,104,105,108,100,32,112,114,111,99,101,115,115,0,66,97,100,32,97,100,100,
114,101,115,115,0,70,105,108,101,32,116,111,111,32,108,97,114,103,101,0,84,111,111,32,109,97,110,121,32,108,105,110,107,115,0,78,111,32,108,111,99,107,115,32,97,118,97,105,108,97,98,108,101,0,82,101,115,111,117,114,99,101,32,100,101,97,100,108,111,99,107,32,119,111,117,108,100,32,111,99,99,117,114,0,83,116,97,116,101,32,110,111,116,32,114,101,99,111,118,101,114,97,98,108,101,0,80,114,101,118,105,111,117,115,32,111,119,110,101,114,32,100,105,101,100,0,79,112,101,114,97,116,105,111,110,32,99,97,110,
99,101,108,101,100,0,70,117,110,99,116,105,111,110,32,110,111,116,32,105,109,112,108,101,109,101,110,116,101,100,0,78,111,32,109,101,115,115,97,103,101,32,111,102,32,100,101,115,105,114,101,100,32,116,121,112,101,0,73,100,101,110,116,105,102,105,101,114,32,114,101,109,111,118,101,100,0,68,101,118,105,99,101,32,110,111,116,32,97,32,115,116,114,101,97,109,0,78,111,32,100,97,116,97,32,97,118,97,105,108,97,98,108,101,0,68,101,118,105,99,101,32,116,105,109,101,111,117,116,0,79,117,116,32,111,102,32,115,
116,114,101,97,109,115,32,114,101,115,111,117,114,99,101,115,0,76,105,110,107,32,104,97,115,32,98,101,101,110,32,115,101,118,101,114,101,100,0,80,114,111,116,111,99,111,108,32,101,114,114,111,114,0,66,97,100,32,109,101,115,115,97,103,101,0,70,105,108,101,32,100,101,115,99,114,105,112,116,111,114,32,105,110,32,98,97,100,32,115,116,97,116,101,0,78,111,116,32,97,32,115,111,99,107,101,116,0,68,101,115,116,105,110,97,116,105,111,110,32,97,100,100,114,101,115,115,32,114,101,113,117,105,114,101,100,0,77,
101,115,115,97,103,101,32,116,111,111,32,108,97,114,103,101,0,80,114,111,116,111,99,111,108,32,119,114,111,110,103,32,116,121,112,101,32,102,111,114,32,115,111,99,107,101,116,0,80,114,111,116,111,99,111,108,32,110,111,116,32,97,118,97,105,108,97,98,108,101,0,80,114,111,116,111,99,111,108,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,83,111,99,107,101,116,32,116,121,112,101,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,78,111,116,32,115,117,112,112,111,114,116,101,100,0,80,114,
111,116,111,99,111,108,32,102,97,109,105,108,121,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,65,100,100,114,101,115,115,32,102,97,109,105,108,121,32,110,111,116,32,115,117,112,112,111,114,116,101,100,32,98,121,32,112,114,111,116,111,99,111,108,0,65,100,100,114,101,115,115,32,110,111,116,32,97,118,97,105,108,97,98,108,101,0,78,101,116,119,111,114,107,32,105,115,32,100,111,119,110,0,78,101,116,119,111,114,107,32,117,110,114,101,97,99,104,97,98,108,101,0,67,111,110,110,101,99,116,105,111,
110,32,114,101,115,101,116,32,98,121,32,110,101,116,119,111,114,107,0,67,111,110,110,101,99,116,105,111,110,32,97,98,111,114,116,101,100,0,78,111,32,98,117,102,102,101,114,32,115,112,97,99,101,32,97,118,97,105,108,97,98,108,101,0,83,111,99,107,101,116,32,105,115,32,99,111,110,110,101,99,116,101,100,0,83,111,99,107,101,116,32,110,111,116,32,99,111,110,110,101,99,116,101,100,0,67,97,110,110,111,116,32,115,101,110,100,32,97,102,116,101,114,32,115,111,99,107,101,116,32,115,104,117,116,100,111,119,110,
0,79,112,101,114,97,116,105,111,110,32,97,108,114,101,97,100,121,32,105,110,32,112,114,111,103,114,101,115,115,0,79,112,101,114,97,116,105,111,110,32,105,110,32,112,114,111,103,114,101,115,115,0,83,116,97,108,101,32,102,105,108,101,32,104,97,110,100,108,101,0,82,101,109,111,116,101,32,73,47,79,32,101,114,114,111,114,0,81,117,111,116,97,32,101,120,99,101,101,100,101,100,0,78,111,32,109,101,100,105,117,109,32,102,111,117,110,100,0,87,114,111,110,103,32,109,101,100,105,117,109,32,116,121,112,101,0,78,
111,32,101,114,114,111,114,32,105,110,102,111,114,109,97,116,105,111,110,0,0,116,101,114,109,105,110,97,116,105,110,103,32,119,105,116,104,32,37,115,32,101,120,99,101,112,116,105,111,110,32,111,102,32,116,121,112,101,32,37,115,58,32,37,115,0,116,101,114,109,105,110,97,116,105,110,103,32,119,105,116,104,32,37,115,32,101,120,99,101,112,116,105,111,110,32,111,102,32,116,121,112,101,32,37,115,0,116,101,114,109,105,110,97,116,105,110,103,32,119,105,116,104,32,37,115,32,102,111,114,101,105,103,110,32,101,
120,99,101,112,116,105,111,110,0,116,101,114,109,105,110,97,116,105,110,103,0,117,110,99,97,117,103,104,116,0,83,116,57,101,120,99,101,112,116,105,111,110,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,115,104,105,109,95,116,121,112,101,95,105,110,102,111,69,0,83,116,57,116,121,112,101,95,105,110,102,111,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,48,95,95,115,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,99,
108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,112,116,104,114,101,97,100,95,111,110,99,101,32,102,97,105,108,117,114,101,32,105,110,32,95,95,99,120,97,95,103,101,116,95,103,108,111,98,97,108,115,95,102,97,115,116,40,41,0,99,97,110,110,111,116,32,99,114,101,97,116,101,32,112,116,104,114,101,97,100,32,107,101,121,32,102,111,114,32,95,95,99,120,97,95,103,101,116,95,103,108,111,98,97,108,115,40,41,0,99,97,110,110,111,116,32,122,101,114,111,32,111,117,116,32,116,104,114,101,97,100,32,118,97,
108,117,101,32,102,111,114,32,95,95,99,120,97,95,103,101,116,95,103,108,111,98,97,108,115,40,41,0,116,101,114,109,105,110,97,116,101,95,104,97,110,100,108,101,114,32,117,110,101,120,112,101,99,116,101,100,108,121,32,114,101,116,117,114,110,101,100,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,57,95,95,112,111,105,110,116,101,114,95,116,121,112,101,95,105,110,102,111,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,112,98,97,115,101,95,116,121,112,101,95,105,110,102,111,69,0,78,49,48,
95,95,99,120,120,97,98,105,118,49,50,51,95,95,102,117,110,100,97,109,101,110,116,97,108,95,116,121,112,101,95,105,110,102,111,69,0,118,0,98,0,99,0,104,0,97,0,115,0,116,0,105,0,106,0,108,0,109,0,102,0,100,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,49,95,95,118,109,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0],"i8",4,h.e+61440);var Cb=C;C+=16;b._i64Subtract=Db;b._i64Add=Eb;var Ka=void 0,U={},T={},da={},La=void 0,Ma=void 0;b._memset=Fb;var u={p:0,l:[],c:{},J:function(a){if(!a||
u.c[a])return a;for(var b in u.c)if(u.c[b].F===a)return b;return a},D:function(a){a&&u.c[a].g++},$:function(a){if(a){var c=u.c[a];r(0<c.g);c.g--;0!==c.g||c.R||(c.K&&b.dynCall_vi(c.K,a),delete u.c[a],___cxa_free_exception(a))}},Y:function(a){a&&(u.c[a].g=0)}};b._bitshift64Shl=Gb;b._free=v;b._malloc=I;var Hb=x([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,
0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0],"i8",2);b._llvm_cttz_i32=Ib;b.___udivmoddi4=Jb;b.___divdi3=Kb;var na={},Aa=1,ta=[],F=[{},{value:void 0},{value:null},{value:!0},{value:!1}],m={f:0,get:function(){m.f+=4;return p[m.f-
4>>2]},ha:function(){return Ea(m.get())},ba:function(){var a=m.get(),b=m.get();0<=a?r(0===b):r(-1===b);return a},ia:function(){r(0===m.get())}};b._bitshift64Lshr=Lb;b._memcpy=Mb;b.___udivdi3=Nb;var Ob=zb;b._sbrk=Pb;b._memmove=Qb;var fb=void 0;b.___uremdi3=Rb;b._llvm_bswap_i16=Sb;b._pthread_self=Tb;Ja();La=b.BindingError=ca(Error,"BindingError");Ma=b.InternalError=ca(Error,"InternalError");Ta();fb=b.UnboundTypeError=ca(Error,"UnboundTypeError");O.push(function(){var a=b._fflush;a&&a(0);if(a=J.t){var c=
J.a;c[1].length&&a(1,10);c[2].length&&a(2,10)}});R=x(1,"i32",2);ya=B=h.s(C);ma=ya+ob;za=h.s(ma);p[R>>2]=za;b.H={Math:Math,Int8Array:Int8Array,Int16Array:Int16Array,Int32Array:Int32Array,Uint8Array:Uint8Array,Uint16Array:Uint16Array,Uint32Array:Uint32Array,Float32Array:Float32Array,Float64Array:Float64Array,NaN:NaN,Infinity:Infinity};b.I={abort:G,assert:r,enlargeMemory:function(){oa()},getTotalMemory:function(){return N},abortOnCannotGrowMemory:oa,invoke_iiiiiiii:function(a,c,e,d,g,k,l,h){try{return b.dynCall_iiiiiiii(a,
c,e,d,g,k,l,h)}catch(m){if("number"!==typeof m&&"longjmp"!==m)throw m;f.setThrew(1,0)}},invoke_iiii:function(a,c,e,d){try{return b.dynCall_iiii(a,c,e,d)}catch(g){if("number"!==typeof g&&"longjmp"!==g)throw g;f.setThrew(1,0)}},invoke_viiiii:function(a,c,e,d,g,k){try{b.dynCall_viiiii(a,c,e,d,g,k)}catch(l){if("number"!==typeof l&&"longjmp"!==l)throw l;f.setThrew(1,0)}},invoke_vi:function(a,c){try{b.dynCall_vi(a,c)}catch(e){if("number"!==typeof e&&"longjmp"!==e)throw e;f.setThrew(1,0)}},invoke_vii:function(a,
c,e){try{b.dynCall_vii(a,c,e)}catch(d){if("number"!==typeof d&&"longjmp"!==d)throw d;f.setThrew(1,0)}},invoke_iiiiiii:function(a,c,e,d,g,k,l){try{return b.dynCall_iiiiiii(a,c,e,d,g,k,l)}catch(h){if("number"!==typeof h&&"longjmp"!==h)throw h;f.setThrew(1,0)}},invoke_ii:function(a,c){try{return b.dynCall_ii(a,c)}catch(e){if("number"!==typeof e&&"longjmp"!==e)throw e;f.setThrew(1,0)}},invoke_viii:function(a,c,e,d){try{b.dynCall_viii(a,c,e,d)}catch(g){if("number"!==typeof g&&"longjmp"!==g)throw g;f.setThrew(1,
0)}},invoke_v:function(a){try{b.dynCall_v(a)}catch(c){if("number"!==typeof c&&"longjmp"!==c)throw c;f.setThrew(1,0)}},invoke_iiiiiiiii:function(a,c,e,d,g,k,l,h,m){try{return b.dynCall_iiiiiiiii(a,c,e,d,g,k,l,h,m)}catch(n){if("number"!==typeof n&&"longjmp"!==n)throw n;f.setThrew(1,0)}},invoke_iiiii:function(a,c,e,d,g){try{return b.dynCall_iiiii(a,c,e,d,g)}catch(k){if("number"!==typeof k&&"longjmp"!==k)throw k;f.setThrew(1,0)}},invoke_viiiiii:function(a,c,e,d,g,k,l){try{b.dynCall_viiiiii(a,c,e,d,g,
k,l)}catch(h){if("number"!==typeof h&&"longjmp"!==h)throw h;f.setThrew(1,0)}},invoke_iii:function(a,c,e){try{return b.dynCall_iii(a,c,e)}catch(d){if("number"!==typeof d&&"longjmp"!==d)throw d;f.setThrew(1,0)}},invoke_iiiiii:function(a,c,e,d,g,k){try{return b.dynCall_iiiiii(a,c,e,d,g,k)}catch(l){if("number"!==typeof l&&"longjmp"!==l)throw l;f.setThrew(1,0)}},invoke_viiii:function(a,c,e,d,g){try{b.dynCall_viiii(a,c,e,d,g)}catch(k){if("number"!==typeof k&&"longjmp"!==k)throw k;f.setThrew(1,0)}},_pthread_cleanup_pop:function(){r(ia.level==
O.length,"cannot pop if something else added meanwhile!");O.pop();ia.level=O.length},floatReadValueFromPointer:Va,simpleReadValueFromPointer:fa,_llvm_pow_f64:Ob,_pthread_key_create:function(a){if(0==a)return 22;p[a>>2]=Aa;na[Aa]=0;Aa++;return 0},__embind_register_integer:function(a,b,e,d,g){function k(a){return a}b=z(b);-1===g&&(g=4294967295);var f=ea(e);if(0===d)var h=32-8*e,k=function(a){return a<<h>>>h};D(a,{name:b,fromWireType:k,toWireType:function(a,e){if("number"!==typeof e&&"boolean"!==typeof e)throw new TypeError('Cannot convert "'+
ga(e)+'" to '+this.name);if(e<d||e>g)throw new TypeError('Passing a number "'+ga(e)+'" from JS side to C/C++ side to an argument of type "'+b+'", which is outside the valid range ['+d+", "+g+"]!");return e|0},argPackAdvance:8,readValueFromPointer:Oa(b,f,0!==d),d:null})},throwInternalError:ra,get_first_emval:Sa,_abort:function(){b.abort()},throwBindingError:A,___gxx_personality_v0:function(){},extendError:ca,__embind_register_void:function(a,b){b=z(b);D(a,{ka:!0,name:b,argPackAdvance:0,fromWireType:function(){},
toWireType:function(){}})},___cxa_find_matching_catch:Z,getShiftFromSize:ea,__embind_register_function:function(a,b,e,d,g,f){var h=ab(b,e);a=z(a);g=cb(d,g);$a(a,function(){eb("Cannot call "+a+" due to unbound types",h)},b-1);Na([],h,function(d){d=[d[0],null].concat(d.slice(1));bb(a,Ya(a,d,null,g,f),b-1);return[]})},embind_init_charCodes:Ja,___setErrNo:function(a){b.___errno_location&&(p[b.___errno_location()>>2]=a);return a},__emval_register:Ua,___cxa_begin_catch:function(a){var b=u.c[a];b&&!b.l&&
(b.l=!0,sa.a--);b&&(b.R=!1);u.l.push(a);u.D(u.J(a));return a},_emscripten_memcpy_big:function(a,b,e){q.set(q.subarray(b,b+e),a);return a},__embind_register_bool:function(a,b,e,d,g){var f=ea(e);b=z(b);D(a,{name:b,fromWireType:function(a){return!!a},toWireType:function(a,b){return b?d:g},argPackAdvance:8,readValueFromPointer:function(a){var d;if(1===e)d=H;else if(2===e)d=M;else if(4===e)d=p;else throw new TypeError("Unknown boolean type size: "+b);return this.fromWireType(d[a>>f])},d:null})},___resumeException:function(a){u.p||
(u.p=a);throw a+" - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";},__ZSt18uncaught_exceptionv:sa,__exit:Pa,_embind_repr:ga,__embind_register_std_wstring:function(a,b,e){e=z(e);var d,g;2===b?(d=function(){return ha},g=1):4===b&&(d=function(){return E},g=2);D(a,{name:e,fromWireType:function(a){for(var b=d(),c=E[a>>2],e=Array(c),f=a+4>>g,h=0;h<c;++h)e[h]=String.fromCharCode(b[f+h]);v(a);return e.join("")},
toWireType:function(a,e){var f=d(),h=e.length,m=I(4+h*b);E[m>>2]=h;for(var p=m+4>>g,q=0;q<h;++q)f[p+q]=e.charCodeAt(q);null!==a&&a.push(v,m);return m},argPackAdvance:8,readValueFromPointer:fa,d:function(a){v(a)}})},_pthread_getspecific:function(a){return na[a]||0},createNamedFunction:qa,__embind_register_emval:function(a,b){b=z(b);D(a,{name:b,fromWireType:function(a){var b=F[a].value;Qa(a);return b},toWireType:function(a,b){return Ua(b)},argPackAdvance:8,readValueFromPointer:fa,d:null})},readLatin1String:z,
__embind_register_memory_view:function(a,b,e){function d(a){a=a>>2;var b=E;return new g(b.buffer,b[a+1],b[a])}var g=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][b];e=z(e);D(a,{name:e,fromWireType:d,argPackAdvance:8,readValueFromPointer:d},{P:!0})},throwUnboundTypeError:eb,craftInvokerFunction:Ya,__emval_decref:Qa,_pthread_once:aa,__embind_register_float:function(a,b,e){e=ea(e);b=z(b);D(a,{name:b,fromWireType:function(a){return a},toWireType:function(a,
b){if("number"!==typeof b&&"boolean"!==typeof b)throw new TypeError('Cannot convert "'+ga(b)+'" to '+this.name);return b},argPackAdvance:8,readValueFromPointer:Va(b,e),d:null})},makeLegalFunctionName:pa,___syscall54:function(a,b){m.f=b;return 0},___unlock:function(){},heap32VectorToArray:ab,init_emval:Ta,whenDependentTypesAreResolved:Na,new_:Wa,_pthread_setspecific:function(a,b){if(!(a in na))return 22;na[a]=b;return 0},integerReadValueFromPointer:Oa,registerType:D,___lock:function(){},___syscall6:function(a,
b){m.f=b;try{var e=m.M();FS.close(e);return 0}catch(d){return"undefined"!==typeof FS&&d instanceof FS.r||G(d),-d.v}},_pthread_cleanup_push:ia,ensureOverloadTable:Za,count_emval_handles:Ra,requireFunction:cb,runDestructors:Xa,getTypeName:db,___syscall140:function(a,b){m.f=b;try{var e=m.M(),d=m.get(),f=m.get(),k=m.get(),h=m.get();r(0===d);FS.la(e,f,h);p[k>>2]=e.position;e.O&&0===f&&0===h&&(e.O=null);return 0}catch(t){return"undefined"!==typeof FS&&t instanceof FS.r||G(t),-t.v}},exposePublicSymbol:$a,
_exit:function(a){Pa(a)},__embind_register_std_string:function(a,b){b=z(b);D(a,{name:b,fromWireType:function(a){for(var b=E[a>>2],c=Array(b),f=0;f<b;++f)c[f]=String.fromCharCode(q[a+4+f]);v(a);return c.join("")},toWireType:function(a,b){function c(a,b){return a[b]}function f(a,b){return a.charCodeAt(b)}b instanceof ArrayBuffer&&(b=new Uint8Array(b));var h;b instanceof Uint8Array?h=c:b instanceof Uint8ClampedArray?h=c:b instanceof Int8Array?h=c:"string"===typeof b?h=f:A("Cannot pass non-string to std::string");
var m=b.length,p=I(4+m);E[p>>2]=m;for(var n=0;n<m;++n){var r=h(b,n);255<r&&(v(p),A("String has UTF-16 code units that do not fit in 8 bits"));q[p+4+n]=r}null!==a&&a.push(v,p);return p},argPackAdvance:8,readValueFromPointer:fa,d:function(a){v(a)}})},replacePublicSymbol:bb,___syscall146:J,DYNAMICTOP_PTR:R,tempDoublePtr:Cb,ABORT:ja,STACKTOP:B,STACK_MAX:ma,cttz_i8:Hb};// EMSCRIPTEN_START_ASM
var f=(function(global,env,buffer) {
"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.DYNAMICTOP_PTR|0;var j=env.tempDoublePtr|0;var k=env.ABORT|0;var l=env.STACKTOP|0;var m=env.STACK_MAX|0;var n=env.cttz_i8|0;var o=0;var p=0;var q=0;var r=0;var s=global.NaN,t=global.Infinity;var u=0,v=0,w=0,x=0,y=0.0,z=0,A=0,B=0,C=0.0;var D=0;var E=global.Math.floor;var F=global.Math.abs;var G=global.Math.sqrt;var H=global.Math.pow;var I=global.Math.cos;var J=global.Math.sin;var K=global.Math.tan;var L=global.Math.acos;var M=global.Math.asin;var N=global.Math.atan;var O=global.Math.atan2;var P=global.Math.exp;var Q=global.Math.log;var R=global.Math.ceil;var S=global.Math.imul;var T=global.Math.min;var U=global.Math.max;var V=global.Math.clz32;var W=env.abort;var X=env.assert;var Y=env.enlargeMemory;var Z=env.getTotalMemory;var _=env.abortOnCannotGrowMemory;var $=env.invoke_iiiiiiii;var aa=env.invoke_iiii;var ba=env.invoke_viiiii;var ca=env.invoke_vi;var da=env.invoke_vii;var ea=env.invoke_iiiiiii;var fa=env.invoke_ii;var ga=env.invoke_viii;var ha=env.invoke_v;var ia=env.invoke_iiiiiiiii;var ja=env.invoke_iiiii;var ka=env.invoke_viiiiii;var la=env.invoke_iii;var ma=env.invoke_iiiiii;var na=env.invoke_viiii;var oa=env._pthread_cleanup_pop;var pa=env.floatReadValueFromPointer;var qa=env.simpleReadValueFromPointer;var ra=env._llvm_pow_f64;var sa=env._pthread_key_create;var ta=env.__embind_register_integer;var ua=env.throwInternalError;var va=env.get_first_emval;var wa=env._abort;var xa=env.throwBindingError;var ya=env.___gxx_personality_v0;var za=env.extendError;var Aa=env.__embind_register_void;var Ba=env.___cxa_find_matching_catch;var Ca=env.getShiftFromSize;var Da=env.__embind_register_function;var Ea=env.embind_init_charCodes;var Fa=env.___setErrNo;var Ga=env.__emval_register;var Ha=env.___cxa_begin_catch;var Ia=env._emscripten_memcpy_big;var Ja=env.__embind_register_bool;var Ka=env.___resumeException;var La=env.__ZSt18uncaught_exceptionv;var Ma=env.__exit;var Na=env._embind_repr;var Oa=env.__embind_register_std_wstring;var Pa=env._pthread_getspecific;var Qa=env.createNamedFunction;var Ra=env.__embind_register_emval;var Sa=env.readLatin1String;var Ta=env.__embind_register_memory_view;var Ua=env.throwUnboundTypeError;var Va=env.craftInvokerFunction;var Wa=env.__emval_decref;var Xa=env._pthread_once;var Ya=env.__embind_register_float;var Za=env.makeLegalFunctionName;var _a=env.___syscall54;var $a=env.___unlock;var ab=env.heap32VectorToArray;var bb=env.init_emval;var cb=env.whenDependentTypesAreResolved;var db=env.new_;var eb=env._pthread_setspecific;var fb=env.integerReadValueFromPointer;var gb=env.registerType;var hb=env.___lock;var ib=env.___syscall6;var jb=env._pthread_cleanup_push;var kb=env.ensureOverloadTable;var lb=env.count_emval_handles;var mb=env.requireFunction;var nb=env.runDestructors;var ob=env.getTypeName;var pb=env.___syscall140;var qb=env.exposePublicSymbol;var rb=env._exit;var sb=env.__embind_register_std_string;var tb=env.replacePublicSymbol;var ub=env.___syscall146;var vb=0.0;
// EMSCRIPTEN_START_FUNCS
function ge(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0.0,q=0,r=0.0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0.0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0;aa=l;l=l+4912|0;N=aa+1328|0;_=aa+1064|0;$=aa+804|0;R=aa+544|0;O=aa+284|0;V=aa+24|0;I=aa+20|0;J=aa+16|0;T=aa+12|0;U=aa+8|0;P=aa+4|0;Q=aa;Y=c[b+1296>>2]|0;H=c[b+1288>>2]|0;Z=c[b+1284>>2]|0;i=(Z|0)>0;if(i){f=0;do{c[_+(f<<2)>>2]=-200;f=f+1|0}while((f|0)!=(Z|0));if(i){f=0;do{c[$+(f<<2)>>2]=-200;f=f+1|0}while((f|0)!=(Z|0));if(i){il(R|0,0,Z<<2|0)|0;f=0;do{c[O+(f<<2)>>2]=1;f=f+1|0}while((f|0)!=(Z|0));if(i)il(V|0,-1,Z<<2|0)|0}}}if(!Z){j=N;k=j+56|0;do{c[j>>2]=0;j=j+4|0}while((j|0)<(k|0));c[N>>2]=0;c[N+4>>2]=H;z=H+-1|0;if((H|0)<1){f=0;v=0;u=0;t=0;s=0;q=0;o=0;n=0;m=0;k=0;j=0;i=0}else{x=Y+1112|0;y=0;f=0;v=0;u=0;t=0;s=0;q=0;w=0;n=0;m=0;k=0;j=0;i=0;while(1){p=+g[e+(y<<2)>>2];o=~~(p*7.314285755157471+1023.5);if((o|0)<=1023){if((o|0)>=1)W=17}else{o=1023;W=17}do if((W|0)==17){W=0;if(!(+g[d+(y<<2)>>2]+ +g[x>>2]>=p)){v=v+1|0;t=(S(y,y)|0)+t|0;q=y+q|0;n=(S(o,y)|0)+n|0;k=(S(o,o)|0)+k|0;i=o+i|0;break}else{f=f+1|0;u=(S(y,y)|0)+u|0;s=y+s|0;w=(S(o,y)|0)+w|0;m=(S(o,o)|0)+m|0;j=o+j|0;break}}while(0);if((y|0)<(z|0))y=y+1|0;else{o=w;break}}}c[N+8>>2]=s;c[N+12>>2]=j;c[N+16>>2]=u;c[N+20>>2]=m;c[N+24>>2]=o;c[N+28>>2]=f;c[N+32>>2]=q;c[N+36>>2]=i;c[N+40>>2]=t;c[N+44>>2]=k;c[N+48>>2]=n;c[N+52>>2]=v}else{C=Z+-1|0;if((C|0)<=0){b=0;l=aa;return b|0}D=H+-1|0;E=Y+1112|0;F=c[b>>2]|0;G=0;f=0;do{B=G;G=G+1|0;m=F;F=c[b+(G<<2)>>2]|0;i=N+(B*56|0)|0;j=i;k=j+56|0;do{c[j>>2]=0;j=j+4|0}while((j|0)<(k|0));c[i>>2]=m;c[N+(B*56|0)+4>>2]=F;z=(F|0)<(H|0)?F:D;if((z|0)<(m|0)){w=0;v=0;u=0;t=0;s=0;q=0;o=0;n=0;m=0;k=0;j=0;i=0}else{w=0;v=0;u=0;t=0;s=0;q=0;o=0;x=0;y=0;k=0;j=0;i=0;while(1){p=+g[e+(m<<2)>>2];n=~~(p*7.314285755157471+1023.5);if((n|0)<=1023){if((n|0)>=1)W=25}else{n=1023;W=25}do if((W|0)==25){W=0;if(!(+g[d+(m<<2)>>2]+ +g[E>>2]>=p)){v=v+1|0;t=(S(m,m)|0)+t|0;q=m+q|0;x=(S(n,m)|0)+x|0;k=(S(n,n)|0)+k|0;i=n+i|0;break}else{w=w+1|0;u=(S(m,m)|0)+u|0;s=m+s|0;o=(S(n,m)|0)+o|0;y=(S(n,n)|0)+y|0;j=n+j|0;break}}while(0);if((m|0)<(z|0))m=m+1|0;else{n=x;m=y;break}}}c[N+(B*56|0)+8>>2]=s;c[N+(B*56|0)+12>>2]=j;c[N+(B*56|0)+16>>2]=u;c[N+(B*56|0)+20>>2]=m;c[N+(B*56|0)+24>>2]=o;c[N+(B*56|0)+28>>2]=w;c[N+(B*56|0)+32>>2]=q;c[N+(B*56|0)+36>>2]=i;c[N+(B*56|0)+40>>2]=t;c[N+(B*56|0)+44>>2]=k;c[N+(B*56|0)+48>>2]=n;c[N+(B*56|0)+52>>2]=v;f=w+f|0}while((G|0)!=(C|0))}if(!f){b=0;l=aa;return b|0}c[I>>2]=-200;c[J>>2]=-200;he(N,Z+-1|0,I,J,Y)|0;f=c[I>>2]|0;c[_>>2]=f;c[$>>2]=f;M=c[J>>2]|0;L=$+4|0;c[L>>2]=M;K=_+4|0;c[K>>2]=M;M=(Z|0)>2;do if(M){E=Y+1112|0;F=Y+1096|0;G=Y+1100|0;H=Y+1104|0;J=2;a:while(1){C=c[b+520+(J<<2)>>2]|0;I=c[R+(C<<2)>>2]|0;D=c[O+(C<<2)>>2]|0;f=V+(I<<2)|0;b:do if((c[f>>2]|0)!=(D|0)){x=c[b+520+(I<<2)>>2]|0;y=c[b+520+(D<<2)>>2]|0;c[f>>2]=D;j=c[Y+836+(I<<2)>>2]|0;u=c[Y+836+(D<<2)>>2]|0;f=c[_+(I<<2)>>2]|0;z=$+(I<<2)|0;i=c[z>>2]|0;if((f|0)>=0)if((i|0)<0)w=f;else w=i+f>>1;else w=i;B=_+(D<<2)|0;f=c[B>>2]|0;i=c[$+(D<<2)>>2]|0;if((f|0)>=0)if((i|0)<0)v=f;else v=i+f>>1;else v=i;if((w|0)==-1|(v|0)==-1){W=41;break a}i=v-w|0;o=u-j|0;q=(i|0)/(o|0)|0;s=i>>31|1;r=+g[e+(j<<2)>>2];f=~~(r*7.314285755157471+1023.5);f=(f|0)>1023?1023:(f|0)<0?0:f;t=S(q,o)|0;t=((i|0)>-1?i:0-i|0)-((t|0)>-1?t:0-t|0)|0;i=w-f|0;i=S(i,i)|0;A=+g[E>>2];if(+g[d+(j<<2)>>2]+A>=r){p=+(w|0);r=+(f|0);if(!(p+ +g[F>>2]<r)?!(p-+g[G>>2]>r):0)W=45}else W=45;c:do if((W|0)==45){W=0;f=j+1|0;if((f|0)<(u|0)){m=f;n=0;f=1;k=w;do{ba=n+t|0;j=(ba|0)<(o|0);n=ba-(j?0:o)|0;k=k+q+(j?0:s)|0;r=+g[e+(m<<2)>>2];j=~~(r*7.314285755157471+1023.5);j=(j|0)>1023?1023:(j|0)<0?0:j;ba=k-j|0;i=(S(ba,ba)|0)+i|0;f=f+1|0;if(j|0?A+ +g[d+(m<<2)>>2]>=r:0){r=+(k|0);p=+(j|0);if(r+ +g[F>>2]<p)break c;if(r-+g[G>>2]>p)break c}m=m+1|0}while((m|0)<(u|0))}else f=1;A=+g[F>>2];p=+(f|0);r=+g[H>>2];if((!(A*A/p>r)?(A=+g[G>>2],!(A*A/p>r)):0)?+((i|0)/(f|0)|0|0)>r:0)break;c[_+(J<<2)>>2]=-200;c[$+(J<<2)>>2]=-200;break b}while(0);c[T>>2]=-200;c[U>>2]=-200;c[P>>2]=-200;c[Q>>2]=-200;i=he(N+(x*56|0)|0,C-x|0,T,U,Y)|0;f=he(N+(C*56|0)|0,y-C|0,P,Q,Y)|0;i=(i|0)!=0;if(i){c[T>>2]=w;c[U>>2]=c[P>>2]}if(f|0?(c[P>>2]=c[U>>2],c[Q>>2]=v,i):0){c[_+(J<<2)>>2]=-200;c[$+(J<<2)>>2]=-200;break}f=c[T>>2]|0;c[z>>2]=f;if(!I)c[_>>2]=f;f=c[U>>2]|0;c[_+(J<<2)>>2]=f;i=c[P>>2]|0;c[$+(J<<2)>>2]=i;j=c[Q>>2]|0;c[B>>2]=j;if((D|0)==1)c[L>>2]=j;if((i&f|0)>-1){d:do if((C|0)>0){i=C;do{i=i+-1|0;f=O+(i<<2)|0;if((c[f>>2]|0)!=(D|0))break d;c[f>>2]=J}while((i|0)>0)}while(0);f=C+1|0;if((f|0)<(Z|0))do{i=R+(f<<2)|0;if((c[i>>2]|0)!=(I|0))break b;c[i>>2]=J;f=f+1|0}while((f|0)<(Z|0))}}while(0);J=J+1|0;if((J|0)>=(Z|0)){W=71;break}}if((W|0)==41)rb(1);else if((W|0)==71){h=c[_>>2]|0;X=c[$>>2]|0;break}}else{h=f;X=f}while(0);f=Oc(a,Z<<2)|0;if((h|0)>=0){if((X|0)>=0)h=X+h>>1}else h=X;c[f>>2]=h;h=c[K>>2]|0;i=c[L>>2]|0;if((h|0)>=0){if((i|0)>=0)h=i+h>>1}else h=i;c[f+4>>2]=h;if(M)k=2;else{ba=f;l=aa;return ba|0}do{ba=k+-2|0;j=c[b+1032+(ba<<2)>>2]|0;ba=c[b+780+(ba<<2)>>2]|0;h=c[Y+836+(j<<2)>>2]|0;j=c[f+(j<<2)>>2]&32767;i=(c[f+(ba<<2)>>2]&32767)-j|0;h=(S((i|0)>-1?i:0-i|0,(c[Y+836+(k<<2)>>2]|0)-h|0)|0)/((c[Y+836+(ba<<2)>>2]|0)-h|0)|0;j=((i|0)<0?0-h|0:h)+j|0;h=c[_+(k<<2)>>2]|0;i=c[$+(k<<2)>>2]|0;if((h|0)>=0){if((i|0)>=0)h=i+h>>1}else h=i;if((h|0)<0|(j|0)==(h|0))c[f+(k<<2)>>2]=j|32768;else c[f+(k<<2)>>2]=h;k=k+1|0}while((k|0)!=(Z|0));l=aa;return f|0}function he(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var h=0.0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0,n=0,o=0,p=0.0,q=0,r=0;n=c[a>>2]|0;o=c[a+((b+-1|0)*56|0)+4>>2]|0;if((b|0)>0){m=+g[f+1108>>2];h=0.0;f=0;l=0.0;k=0.0;j=0.0;i=0.0;do{r=c[a+(f*56|0)+52>>2]|0;q=c[a+(f*56|0)+28>>2]|0;p=m*+(q+r|0)/+(q+1|0)+1.0;k=k+(+(c[a+(f*56|0)+32>>2]|0)+p*+(c[a+(f*56|0)+8>>2]|0));i=i+(+(c[a+(f*56|0)+36>>2]|0)+p*+(c[a+(f*56|0)+12>>2]|0));l=l+(+(c[a+(f*56|0)+40>>2]|0)+p*+(c[a+(f*56|0)+16>>2]|0));j=j+(+(c[a+(f*56|0)+48>>2]|0)+p*+(c[a+(f*56|0)+24>>2]|0));h=h+(+(r|0)+ +(q|0)*p);f=f+1|0}while((f|0)!=(b|0))}else{h=0.0;l=0.0;k=0.0;j=0.0;i=0.0}f=c[d>>2]|0;if((f|0)>-1){h=h+1.0;l=+(S(n,n)|0)+l;k=+(n|0)+k;j=j+ +(S(f,n)|0);i=i+ +(f|0)}f=c[e>>2]|0;if((f|0)>-1){m=h+1.0;l=+(S(o,o)|0)+l;k=+(o|0)+k;j=j+ +(S(f,o)|0);i=i+ +(f|0)}else m=h;h=m*l-k*k;if(!(h>0.0)){c[d>>2]=0;c[e>>2]=0;r=1;return r|0}l=(l*i-j*k)/h;p=(m*j-i*k)/h;c[d>>2]=~~+dk(l+ +(n|0)*p);f=~~+dk(l+ +(o|0)*p);c[e>>2]=f;a=c[d>>2]|0;if((a|0)>1023){c[d>>2]=1023;f=c[e>>2]|0;a=1023}if((f|0)>1023){c[e>>2]=1023;a=c[d>>2]|0;f=1023}if((a|0)<0){c[d>>2]=0;f=c[e>>2]|0}if((f|0)>=0){r=0;return r|0}c[e>>2]=0;r=0;return r|0}function ie(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0;j=c[b+1284>>2]|0;if(!((d|0)!=0&(e|0)!=0)){f=0;return f|0}b=Oc(a,j<<2)|0;if((j|0)<=0){f=b;return f|0}h=65536-f|0;i=0;do{l=d+(i<<2)|0;a=S(c[l>>2]&32767,h)|0;k=e+(i<<2)|0;a=a+32768+(S(c[k>>2]&32767,f)|0)>>16;g=b+(i<<2)|0;c[g>>2]=a;if(c[l>>2]&32768|0?c[k>>2]&32768|0:0)c[g>>2]=a|32768;i=i+1|0}while((i|0)!=(j|0));return b|0}function je(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0;E=l;l=l+336|0;A=E+64|0;y=E+32|0;z=E;C=c[d+1296>>2]|0;D=d+1284|0;r=c[D>>2]|0;B=c[(c[(c[b+64>>2]|0)+4>>2]|0)+28>>2]|0;v=B+1824|0;w=c[B+2848>>2]|0;if(!e){Tb(a,0,1);il(f|0,0,((c[b+36>>2]|0)/2|0)<<2|0)|0;f=0;l=E;return f|0}a:do if((r|0)>0){h=C+832|0;k=0;while(1){i=e+(k<<2)|0;j=c[i>>2]|0;g=j&32767;switch(c[h>>2]|0){case 1:{g=g>>>2;break}case 2:{g=g>>>3;break}case 3:{g=(g>>>0)/12|0;break}case 4:{g=g>>>4;break}default:{}}c[i>>2]=j&32768|g;k=k+1|0;if((k|0)==(r|0))break a}}while(0);g=c[e>>2]|0;c[A>>2]=g;h=c[e+4>>2]|0;p=A+4|0;c[p>>2]=h;q=d+1292|0;if((r|0)>2){o=2;do{j=o+-2|0;k=c[d+1032+(j<<2)>>2]|0;j=c[d+780+(j<<2)>>2]|0;i=c[C+836+(k<<2)>>2]|0;k=e+(k<<2)|0;m=e+(j<<2)|0;n=c[k>>2]&32767;g=(c[m>>2]&32767)-n|0;i=(S((g|0)>-1?g:0-g|0,(c[C+836+(o<<2)>>2]|0)-i|0)|0)/((c[C+836+(j<<2)>>2]|0)-i|0)|0;i=((g|0)<0?0-i|0:i)+n|0;g=e+(o<<2)|0;j=c[g>>2]|0;if((j&32768|0)!=0|(j|0)==(i|0)){c[g>>2]=i|32768;c[A+(o<<2)>>2]=0}else{h=(c[q>>2]|0)-i|0;h=(h|0)<(i|0)?h:i;g=j-i|0;do if((g|0)<0)if((g|0)<(0-h|0)){g=h+~g|0;break}else{g=~(g<<1);break}else if((h|0)>(g|0)){g=g<<1;break}else{g=h+g|0;break}while(0);c[A+(o<<2)>>2]=g;c[k>>2]=n;c[m>>2]=c[m>>2]&32767}o=o+1|0}while((o|0)!=(r|0));h=c[p>>2]|0;g=c[A>>2]|0}Tb(a,1,1);t=d+1308|0;c[t>>2]=(c[t>>2]|0)+1;t=(Dd((c[q>>2]|0)+-1|0)|0)<<1;u=d+1304|0;c[u>>2]=(c[u>>2]|0)+t;Tb(a,g,Dd((c[q>>2]|0)+-1|0)|0);Tb(a,h,Dd((c[q>>2]|0)+-1|0)|0);if((c[C>>2]|0)>0){p=d+1300|0;s=0;t=2;while(1){q=c[C+4+(s<<2)>>2]|0;r=c[C+128+(q<<2)>>2]|0;n=c[C+192+(q<<2)>>2]|0;o=1<<n;c[y>>2]=0;c[y+4>>2]=0;c[y+8>>2]=0;c[y+12>>2]=0;c[y+16>>2]=0;c[y+20>>2]=0;c[y+24>>2]=0;c[y+28>>2]=0;if(n|0){c[z>>2]=0;c[z+4>>2]=0;c[z+8>>2]=0;c[z+12>>2]=0;c[z+16>>2]=0;c[z+20>>2]=0;c[z+24>>2]=0;c[z+28>>2]=0;g=(n|0)==31;if(!g){i=0;do{h=c[C+320+(q<<5)+(i<<2)>>2]|0;if((h|0)<0)c[z+(i<<2)>>2]=1;else c[z+(i<<2)>>2]=c[(c[v+(h<<2)>>2]|0)+4>>2];i=i+1|0}while((i|0)<(o|0))}b:do if((r|0)>0){if(g){h=0;g=0;i=0;while(1){g=c[y+(i<<2)>>2]<<h|g;i=i+1|0;if((i|0)==(r|0))break b;else h=h+31|0}}else{k=0;g=0;m=0}while(1){j=c[A+(m+t<<2)>>2]|0;h=0;while(1){i=h+1|0;if((j|0)<(c[z+(h<<2)>>2]|0)){i=35;break}if((i|0)<(o|0))h=i;else{i=37;break}}if((i|0)==35)c[y+(m<<2)>>2]=h;else if((i|0)==37)h=c[y+(m<<2)>>2]|0;g=h<<k|g;m=m+1|0;if((m|0)==(r|0))break;else k=k+n|0}}else g=0;while(0);o=wd(w+((c[C+256+(q<<2)>>2]|0)*56|0)|0,g,a)|0;c[p>>2]=(c[p>>2]|0)+o}if((r|0)>0){h=0;do{g=c[C+320+(q<<5)+(c[y+(h<<2)>>2]<<2)>>2]|0;if((g|0)>-1?(x=c[A+(h+t<<2)>>2]|0,(x|0)<(c[w+(g*56|0)+4>>2]|0)):0){o=wd(w+(g*56|0)|0,x,a)|0;c[u>>2]=(c[u>>2]|0)+o}h=h+1|0}while((h|0)!=(r|0))}s=s+1|0;if((s|0)>=(c[C>>2]|0))break;else t=r+t|0}}v=C+832|0;i=S(c[v>>2]|0,c[e>>2]|0)|0;s=(c[B+(c[b+28>>2]<<2)>>2]|0)/2|0;if((c[D>>2]|0)>1){t=~s;g=0;u=1;k=0;while(1){j=c[d+260+(u<<2)>>2]|0;h=c[e+(j<<2)>>2]|0;if((h&32767|0)==(h|0)){r=S(c[v>>2]|0,h)|0;q=c[C+836+(j<<2)>>2]|0;h=r-i|0;m=q-k|0;n=(h|0)/(m|0)|0;o=h>>31|1;p=S(n,m)|0;p=((h|0)>-1?h:0-h|0)-((p|0)>-1?p:0-p|0)|0;h=(s|0)>(q|0)?q:s;if((h|0)>(k|0))c[f+(k<<2)>>2]=i;g=k+1|0;if((g|0)<(h|0)){k=~q;k=~((k|0)>(t|0)?k:t);h=0;while(1){h=h+p|0;j=(h|0)<(m|0);i=i+n+(j?0:o)|0;c[f+(g<<2)>>2]=i;g=g+1|0;if((g|0)==(k|0)){g=q;h=q;i=r;break}else h=h-(j?0:m)|0}}else{g=q;h=q;i=r}}else h=k;u=u+1|0;if((u|0)>=(c[D>>2]|0))break;else k=h}}else g=0;h=b+36|0;if((g|0)>=((c[h>>2]|0)/2|0|0)){f=1;l=E;return f|0}do{c[f+(g<<2)>>2]=i;g=g+1|0}while((g|0)<((c[h>>2]|0)/2|0|0));g=1;l=E;return g|0}function ke(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0;e=c[a+28>>2]|0;a=pk(96)|0;f=Yb(b,8)|0;c[a>>2]=f;g=Yb(b,16)|0;c[a+4>>2]=g;h=Yb(b,16)|0;c[a+8>>2]=h;c[a+12>>2]=Yb(b,6)|0;c[a+16>>2]=Yb(b,8)|0;d=Yb(b,4)|0;i=a+20|0;c[i>>2]=d+1;a:do if(!((f|0)<1|(g|0)<1)?!((h|0)<1|(d|0)<0):0){if((d|0)<=-1){b=a;return b|0}g=a+24|0;h=e+24|0;e=e+1824|0;f=0;do{d=Yb(b,8)|0;c[g+(f<<2)>>2]=d;if((d|0)<0)break a;if((d|0)>=(c[h>>2]|0))break a;d=c[e+(d<<2)>>2]|0;if(!(c[d+12>>2]|0))break a;f=f+1|0;if((c[d>>2]|0)<1)break a}while((f|0)<(c[i>>2]|0));return a|0}while(0);if(!a){b=0;return b|0}qk(a);b=0;return b|0}function le(a,b){a=a|0;b=b|0;a=rk(1,32)|0;c[a+4>>2]=c[b>>2];c[a>>2]=c[b+8>>2];c[a+20>>2]=b;c[a+8>>2]=rk(2,4)|0;return a|0}function me(a){a=a|0;if(a|0)qk(a);return}function ne(a){a=a|0;var b=0,d=0,e=0;if(!a)return;e=a+8|0;b=c[e>>2]|0;if(b|0){d=c[b>>2]|0;if(d){qk(d);b=c[e>>2]|0}d=c[b+4>>2]|0;if(d){qk(d);b=c[e>>2]|0}qk(b)}qk(a);return}function oe(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0.0,i=0,j=0,k=0.0;f=c[b+20>>2]|0;i=a+4|0;d=f+12|0;e=Yb(i,c[d>>2]|0)|0;if((e|0)<=0){j=0;return j|0}k=+(e|0)/+((1<<c[d>>2])+-1|0)*+(c[f+16>>2]|0);d=f+20|0;e=Yb(i,Dd(c[d>>2]|0)|0)|0;if((e|0)==-1){j=0;return j|0}if((e|0)>=(c[d>>2]|0)){j=0;return j|0}j=(c[(c[(c[(c[a+64>>2]|0)+4>>2]|0)+28>>2]|0)+2848>>2]|0)+((c[f+24+(e<<2)>>2]|0)*56|0)|0;d=b+4|0;a=Oc(a,((c[j>>2]|0)+(c[d>>2]|0)<<2)+4|0)|0;if((Bd(j,a,i,c[d>>2]|0)|0)==-1){j=0;return j|0}b=c[d>>2]|0;if((b|0)>0){e=0;h=0.0;while(1){a:do if((e|0)<(b|0)){f=c[j>>2]|0;d=e;e=0;while(1){if((e|0)>=(f|0))break a;i=a+(d<<2)|0;g[i>>2]=h+ +g[i>>2];d=d+1|0;if((d|0)<(b|0))e=e+1|0;else break}}else d=e;while(0);if((d|0)<(b|0)){e=d;h=+g[a+(d+-1<<2)>>2]}else break}}g[a+(b<<2)>>2]=k;j=a;return j|0}function pe(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0.0,i=0,j=0.0,k=0,l=0,m=0,n=0,o=0,p=0.0;l=c[b+20>>2]|0;m=c[a+28>>2]|0;n=b+8|0;f=(c[n>>2]|0)+(m<<2)|0;if(!(c[f>>2]|0)){a=c[(c[(c[(c[a+64>>2]|0)+4>>2]|0)+28>>2]|0)+(m<<2)>>2]|0;k=(a|0)/2|0;i=c[b>>2]|0;h=+(c[l+4>>2]|0)*.5;c[f>>2]=pk((k<<2)+4|0)|0;if((a|0)>1){j=h/+(k|0);h=+(i|0)/(h*9.999999747378752e-05+(+N(+(h*h*1.8499999754340024e-08))*2.240000009536743+ +N(+(h*7.399999885819852e-04))*13.100000381469727));a=c[(c[n>>2]|0)+(m<<2)>>2]|0;f=0;while(1){p=j*+(f|0);o=~~+E(+(h*(p*9.999999747378752e-05+(+N(+(p*7.399999885819852e-04))*13.100000381469727+ +N(+(p*p*1.8499999754340024e-08))*2.240000009536743))));c[a+(f<<2)>>2]=(o|0)<(i|0)?o:i+-1|0;f=f+1|0;if((f|0)>=(k|0))break;i=c[b>>2]|0}f=(k|0)>1?k:1}else{a=c[(c[n>>2]|0)+(m<<2)>>2]|0;f=0}c[a+(f<<2)>>2]=-1;c[b+12+(m<<2)>>2]=k}if(!d){il(e|0,0,c[b+12+(m<<2)>>2]<<2|0)|0;o=0;return o|0}else{o=c[b+4>>2]|0;Je(e,c[(c[n>>2]|0)+(m<<2)>>2]|0,c[b+12+(m<<2)>>2]|0,c[b>>2]|0,d,o,+g[d+(o<<2)>>2],+(c[l+16>>2]|0));o=1;return o|0}return 0}function qe(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;l=rk(1,2840)|0;i=c[a+28>>2]|0;c[l>>2]=Yb(b,24)|0;c[l+4>>2]=Yb(b,24)|0;c[l+8>>2]=(Yb(b,24)|0)+1;a=Yb(b,6)|0;j=l+12|0;c[j>>2]=a+1;h=Yb(b,8)|0;g=l+20|0;c[g>>2]=h;a:do if((h|0)>=0){if((a|0)>-1){e=l+24|0;h=0;f=0;do{a=Yb(b,3)|0;d=Yb(b,1)|0;if((d|0)<0){k=27;break a}if(d){d=Yb(b,5)|0;if((d|0)<0){k=27;break a}a=d<<3|a}c[e+(f<<2)>>2]=a;if(!a)a=0;else{d=0;do{d=(a&1)+d|0;a=a>>>1}while((a|0)!=0);a=d}h=a+h|0;f=f+1|0}while((f|0)<(c[j>>2]|0));a=(h|0)>0;if(a){d=l+280|0;f=0;do{e=Yb(b,8)|0;if((e|0)<0){k=27;break a}c[d+(f<<2)>>2]=e;f=f+1|0}while((f|0)<(h|0))}else a=0}else{a=0;h=0}g=c[g>>2]|0;b=c[i+24>>2]|0;if((g|0)<(b|0)){if(a){f=l+280|0;a=i+1824|0;e=0;do{d=c[f+(e<<2)>>2]|0;if((d|0)>=(b|0)){k=27;break a}e=e+1|0;if(!(c[(c[a+(d<<2)>>2]|0)+12>>2]|0)){k=27;break a}}while((e|0)<(h|0))}else a=i+1824|0;a=c[a+(g<<2)>>2]|0;f=c[a+4>>2]|0;a=c[a>>2]|0;if((a|0)>=1){e=c[j>>2]|0;d=1;do{d=S(e,d)|0;a=a+-1|0;if((d|0)>(f|0)){k=27;break a}}while((a|0)>0);c[l+16>>2]=d;return l|0}}else k=27}else k=27;while(0);if((k|0)==27?(l|0)==0:0){l=0;return l|0}qk(l);l=0;return l|0}function re(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;o=rk(1,44)|0;l=c[(c[a+4>>2]|0)+28>>2]|0;c[o>>2]=b;n=c[b+12>>2]|0;c[o+4>>2]=n;l=l+2848|0;m=c[l>>2]|0;c[o+12>>2]=m;m=m+((c[b+20>>2]|0)*56|0)|0;c[o+16>>2]=m;m=c[m>>2]|0;j=rk(n,4)|0;c[o+20>>2]=j;if((n|0)>0){k=b+24|0;h=b+280|0;a=0;i=0;e=0;do{b=k+(i<<2)|0;g=Dd(c[b>>2]|0)|0;if(g){e=(g|0)>(e|0)?g:e;f=j+(i<<2)|0;c[f>>2]=rk(g,4)|0;if((g|0)>0){d=c[b>>2]|0;b=0;do{if(d&1<<b){c[(c[f>>2]|0)+(b<<2)>>2]=(c[l>>2]|0)+((c[h+(a<<2)>>2]|0)*56|0);a=a+1|0}b=b+1|0}while((b|0)!=(g|0))}}i=i+1|0}while((i|0)<(n|0))}else e=0;a=o+24|0;c[a>>2]=1;f=(m|0)>0;if(f){b=1;d=0;do{b=S(b,n)|0;d=d+1|0}while((d|0)!=(m|0));c[a>>2]=b}else b=1;c[o+8>>2]=e;h=pk(b<<2)|0;c[o+28>>2]=h;if((b|0)<=0)return o|0;i=m<<2;if(f)e=0;else{a=0;do{c[h+(a<<2)>>2]=pk(i)|0;a=a+1|0}while((a|0)<(b|0));return o|0}do{d=pk(i)|0;c[h+(e<<2)>>2]=d;a=b;f=0;g=e;do{a=(a|0)/(n|0)|0;l=(g|0)/(a|0)|0;g=g-(S(l,a)|0)|0;c[d+(f<<2)>>2]=l;f=f+1|0}while((f|0)!=(m|0));e=e+1|0}while((e|0)<(b|0));return o|0}function se(a){a=a|0;if(a|0)qk(a);return}function te(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;if(!a)return;g=a+4|0;d=c[g>>2]|0;h=a+20|0;b=c[h>>2]|0;if((d|0)>0){f=0;do{e=c[b+(f<<2)>>2]|0;if(e){qk(e);d=c[g>>2]|0;b=c[h>>2]|0}f=f+1|0}while((f|0)<(d|0))}qk(b);e=a+24|0;f=a+28|0;b=c[f>>2]|0;if((c[e>>2]|0)>0){d=0;do{qk(c[b+(d<<2)>>2]|0);d=d+1|0;b=c[f>>2]|0}while((d|0)<(c[e>>2]|0))}qk(b);qk(a);return}function ue(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;if((f|0)>0){h=0;g=0}else return 0;do{if(c[e+(h<<2)>>2]|0){c[d+(g<<2)>>2]=c[d+(h<<2)>>2];g=g+1|0}h=h+1|0}while((h|0)!=(f|0));if(!g)return 0;ve(a,b,d,g,3);return 0}function ve(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;D=l;y=c[b>>2]|0;z=c[y+8>>2]|0;A=b+16|0;B=c[c[A>>2]>>2]|0;g=c[a+36>>2]>>1;x=c[y+4>>2]|0;g=((x|0)<(g|0)?x:g)-(c[y>>2]|0)|0;if((g|0)<=0){l=D;return}v=(g|0)/(z|0)|0;w=l;l=l+((1*(e<<2)|0)+15&-16)|0;x=(e|0)>0;if(x){g=((B+-1+v|0)/(B|0)|0)<<2;h=0;do{c[w+(h<<2)>>2]=Oc(a,g)|0;h=h+1|0}while((h|0)!=(e|0))}t=b+8|0;g=c[t>>2]|0;if((g|0)<=0){l=D;return}u=(v|0)>0;p=a+4|0;q=y+16|0;r=b+28|0;s=(B|0)>0;o=b+20|0;n=0;a:while(1){if(u){k=1<<n;g=0;m=0;while(1){if(!((n|0)!=0|x^1)){a=0;do{h=xd(c[A>>2]|0,p)|0;if((h|0)==-1){g=26;break a}if((h|0)>=(c[q>>2]|0)){g=26;break a}j=c[(c[r>>2]|0)+(h<<2)>>2]|0;c[(c[w+(a<<2)>>2]|0)+(m<<2)>>2]=j;a=a+1|0;if(!j){g=26;break a}}while((a|0)<(e|0))}b:do if(s&(g|0)<(v|0)){if(x)j=0;else{h=0;while(1){h=h+1|0;g=g+1|0;if(!((h|0)<(B|0)&(g|0)<(v|0)))break b}}do{a=S(g,z)|0;i=0;do{h=(c[y>>2]|0)+a|0;b=c[(c[(c[w+(i<<2)>>2]|0)+(m<<2)>>2]|0)+(j<<2)>>2]|0;if((c[y+24+(b<<2)>>2]&k|0?(C=c[(c[(c[o>>2]|0)+(b<<2)>>2]|0)+(n<<2)>>2]|0,C|0):0)?(Gb[f&7](C,(c[d+(i<<2)>>2]|0)+(h<<2)|0,p,z)|0)==-1:0){g=26;break a}i=i+1|0}while((i|0)<(e|0));j=j+1|0;g=g+1|0}while((j|0)<(B|0)&(g|0)<(v|0))}while(0);if((g|0)<(v|0))m=m+1|0;else break}g=c[t>>2]|0}n=n+1|0;if((n|0)>=(g|0)){g=26;break}}if((g|0)==26){l=D;return}}function we(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;Tb(b,c[a>>2]|0,24);Tb(b,c[a+4>>2]|0,24);Tb(b,(c[a+8>>2]|0)+-1|0,24);g=a+12|0;Tb(b,(c[g>>2]|0)+-1|0,6);Tb(b,c[a+20>>2]|0,8);if((c[g>>2]|0)<=0)return;f=a+24|0;i=0;h=0;do{d=f+(h<<2)|0;j=(Dd(c[d>>2]|0)|0)>3;e=c[d>>2]|0;if(j){Tb(b,e,3);Tb(b,1,1);Tb(b,c[d>>2]>>3,5)}else Tb(b,e,4);d=c[d>>2]|0;if(!d)d=0;else{e=0;do{e=(d&1)+e|0;d=d>>>1}while((d|0)!=0);d=e}i=d+i|0;h=h+1|0}while((h|0)<(c[g>>2]|0));if((i|0)<=0)return;d=a+280|0;e=0;do{Tb(b,c[d+(e<<2)>>2]|0,8);e=e+1|0}while((e|0)!=(i|0));return}function xe(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0.0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0.0,u=0,v=0;if((f|0)>0){h=0;g=0}else{b=0;return b|0}do{if(c[e+(h<<2)>>2]|0){c[d+(g<<2)>>2]=c[d+(h<<2)>>2];g=g+1|0}h=h+1|0}while((h|0)!=(f|0));if(!g){b=0;return b|0}p=c[b>>2]|0;q=c[p+8>>2]|0;e=c[p+12>>2]|0;r=((c[p+4>>2]|0)-(c[p>>2]|0)|0)/(q|0)|0;s=Oc(a,g<<2)|0;t=100.0/+(q|0);u=(g|0)>0;if(u){f=r<<2;h=0;do{o=Oc(a,f)|0;c[s+(h<<2)>>2]=o;il(o|0,0,f|0)|0;h=h+1|0}while((h|0)!=(g|0))}if((r|0)>0){o=(q|0)>0;j=e+-1|0;k=(j|0)>0;m=0;do{l=S(m,q)|0;l=(c[p>>2]|0)+l|0;if(u){n=0;do{if(o){f=c[d+(n<<2)>>2]|0;h=0;e=0;a=0;do{v=c[f+(l+e<<2)>>2]|0;v=(v|0)>-1?v:0-v|0;a=(v|0)>(a|0)?v:a;h=v+h|0;e=e+1|0}while((e|0)!=(q|0));i=+(h|0);e=a}else{i=0.0;e=0}h=~~(t*i);a:do if(k){f=0;do{if((e|0)<=(c[p+2328+(f<<2)>>2]|0)?(v=c[p+2584+(f<<2)>>2]|0,(v|0)<0|(h|0)<(v|0)):0)break a;f=f+1|0}while((f|0)<(j|0))}else f=0;while(0);c[(c[s+(n<<2)>>2]|0)+(m<<2)>>2]=f;n=n+1|0}while((n|0)!=(g|0))}m=m+1|0}while((m|0)!=(r|0))}v=b+40|0;c[v>>2]=(c[v>>2]|0)+1;v=s;return v|0}function ye(a,b,d,e,f,g,h,i){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;if((g|0)>0){b=0;i=0}else return 0;do{if(c[f+(b<<2)>>2]|0){c[e+(i<<2)>>2]=c[e+(b<<2)>>2];i=i+1|0}b=b+1|0}while((b|0)!=(g|0));if(!i)return 0;Ae(a,d,e,i,h);return 0}function ze(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;if((f|0)>0){h=0;g=0}else return 0;do{if(c[e+(h<<2)>>2]|0){c[d+(g<<2)>>2]=c[d+(h<<2)>>2];g=g+1|0}h=h+1|0}while((h|0)!=(f|0));if(!g)return 0;ve(a,b,d,g,4);return 0}function Ae(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0;la=l;l=l+1088|0;ia=la+1056|0;ha=la+1024|0;ja=la+512|0;ka=la;V=c[d>>2]|0;aa=c[V+8>>2]|0;da=c[V+12>>2]|0;ea=d+16|0;fa=c[c[ea>>2]>>2]|0;W=((c[V+4>>2]|0)-(c[V>>2]|0)|0)/(aa|0)|0;il(ja|0,0,512)|0;il(ka|0,0,512)|0;X=d+8|0;if((c[X>>2]|0)<=0){l=la;return}Y=(W|0)>0;Z=(f|0)>0;_=(fa|0)>1;$=d+36|0;ba=(fa|0)>0;ca=d+20|0;P=d+32|0;Q=0-fa|0;U=0;do{if(Y){R=(U|0)==0;T=1<<U;d=0;do{a:do if(R&Z){if(_)m=0;else{j=0;while(1){h=c[(c[g+(j<<2)>>2]|0)+(d<<2)>>2]|0;i=c[ea>>2]|0;if((h|0)<(c[i+4>>2]|0)){O=wd(i,h,b)|0;c[$>>2]=(c[$>>2]|0)+O}j=j+1|0;if((j|0)==(f|0))break a}}do{j=c[g+(m<<2)>>2]|0;k=1;h=c[j+(d<<2)>>2]|0;while(1){h=S(h,da)|0;i=k+d|0;if((i|0)<(W|0))i=(c[j+(i<<2)>>2]|0)+h|0;else i=h;k=k+1|0;if((k|0)==(fa|0))break;else h=i}h=c[ea>>2]|0;if((i|0)<(c[h+4>>2]|0)){O=wd(h,i,b)|0;c[$>>2]=(c[$>>2]|0)+O}m=m+1|0}while((m|0)!=(f|0))}while(0);if(ba&(d|0)<(W|0)){O=d-W|0;O=O>>>0<Q>>>0?Q:O;J=0-O|0;L=d;N=0;while(1){K=S(L,aa)|0;K=(c[V>>2]|0)+K|0;if(Z){M=0;do{i=c[g+(M<<2)>>2]|0;h=c[i+(L<<2)>>2]|0;if(R){I=ka+(h<<2)|0;c[I>>2]=(c[I>>2]|0)+aa}I=g+(M<<2)|0;if(c[V+24+(h<<2)>>2]&T|0?(ga=c[(c[(c[ca>>2]|0)+(h<<2)>>2]|0)+(U<<2)>>2]|0,ga|0):0){F=c[e+(M<<2)>>2]|0;G=c[ga>>2]|0;H=(aa|0)/(G|0)|0;if((H|0)>0){A=ga+48|0;B=ga+52|0;C=ga+44|0;D=ga+12|0;E=ga+4|0;z=G;h=0;i=0;while(1){x=(S(i,G)|0)+K|0;j=F+(x<<2)|0;t=c[A>>2]|0;u=c[B>>2]|0;v=c[C>>2]|0;s=v>>1;c[ia>>2]=0;c[ia+4>>2]=0;c[ia+8>>2]=0;c[ia+12>>2]=0;c[ia+16>>2]=0;c[ia+20>>2]=0;c[ia+24>>2]=0;c[ia+28>>2]=0;y=(z|0)>0;do if((u|0)==1){if(!y){m=0;break}n=v+-1|0;p=0;m=0;q=z;do{q=q+-1|0;o=c[F+(x+q<<2)>>2]|0;k=o-t|0;if((k|0)<(s|0))k=(s-k<<1)+-1|0;else k=k-s<<1;m=S(m,v)|0;m=((k|0)<0?0:(k|0)<(v|0)?k:n)+m|0;c[ia+(q<<2)>>2]=o;p=p+1|0}while((p|0)!=(z|0))}else{if(!y){m=0;break}n=(u>>1)-t|0;o=v+-1|0;q=0;m=0;r=z;do{r=r+-1|0;p=(n+(c[F+(x+r<<2)>>2]|0)|0)/(u|0)|0;if((p|0)<(s|0))k=(s-p<<1)+-1|0;else k=p-s<<1;m=S(m,v)|0;m=((k|0)<0?0:(k|0)<(v|0)?k:o)+m|0;c[ia+(r<<2)>>2]=(S(p,u)|0)+t;q=q+1|0}while((q|0)!=(z|0))}while(0);w=c[(c[D>>2]|0)+8>>2]|0;do if((a[w+m>>0]|0)<1){c[ha>>2]=0;c[ha+4>>2]=0;c[ha+8>>2]=0;c[ha+12>>2]=0;c[ha+16>>2]=0;c[ha+20>>2]=0;c[ha+24>>2]=0;c[ha+28>>2]=0;q=(S(v+-1|0,u)|0)+t|0;r=c[E>>2]|0;if((r|0)>0){o=-1;s=0}else break;while(1){do if((a[w+s>>0]|0)>0){if(y){n=0;k=0;do{v=(c[ha+(n<<2)>>2]|0)-(c[F+(x+n<<2)>>2]|0)|0;k=(S(v,v)|0)+k|0;n=n+1|0}while((n|0)!=(z|0))}else k=0;if(!((o|0)==-1|(k|0)<(o|0))){k=o;break};c[ia>>2]=c[ha>>2];c[ia+4>>2]=c[ha+4>>2];c[ia+8>>2]=c[ha+8>>2];c[ia+12>>2]=c[ha+12>>2];c[ia+16>>2]=c[ha+16>>2];c[ia+20>>2]=c[ha+20>>2];c[ia+24>>2]=c[ha+24>>2];c[ia+28>>2]=c[ha+28>>2];m=s}else k=o;while(0);n=c[ha>>2]|0;if((n|0)<(q|0))o=ha;else{n=ha;p=0;while(1){p=p+1|0;c[n>>2]=0;o=ha+(p<<2)|0;n=c[o>>2]|0;if((n|0)<(q|0))break;else n=o}}if((n|0)>-1){n=(c[B>>2]|0)+n|0;c[o>>2]=n}c[o>>2]=0-n;s=s+1|0;if((s|0)==(r|0))break;else o=k}}while(0);if((m|0)>-1&y){k=0;while(1){c[j>>2]=(c[j>>2]|0)-(c[ia+(k<<2)>>2]|0);k=k+1|0;if((k|0)==(z|0))break;else j=j+4|0}}h=(wd(ga,m,b)|0)+h|0;i=i+1|0;if((i|0)==(H|0))break;z=c[ga>>2]|0}i=c[I>>2]|0}else h=0;c[P>>2]=(c[P>>2]|0)+h;I=ja+(c[i+(L<<2)>>2]<<2)|0;c[I>>2]=(c[I>>2]|0)+h}M=M+1|0}while((M|0)!=(f|0))}N=N+1|0;if((N|0)==(J|0))break;else L=L+1|0}d=d-O|0}}while((d|0)<(W|0))}U=U+1|0}while((U|0)<(c[X>>2]|0));l=la;return}function Be(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;if((f|0)>0){g=0;h=0}else{b=0;return b|0}do{h=((c[e+(g<<2)>>2]|0)!=0&1)+h|0;g=g+1|0}while((g|0)!=(f|0));if(!h){b=0;return b|0}s=c[b>>2]|0;t=c[s+8>>2]|0;g=c[s+12>>2]|0;q=((c[s+4>>2]|0)-(c[s>>2]|0)|0)/(t|0)|0;r=Oc(a,4)|0;p=q<<2;o=Oc(a,p)|0;c[r>>2]=o;il(o|0,0,p|0)|0;if((q|0)>0){p=(t|0)>0;k=g+-1|0;l=(k|0)>0;m=c[r>>2]|0;n=(f|0)>1;o=0;g=(c[s>>2]|0)/(f|0)|0;while(1){if(p){i=c[d>>2]|0;h=0;j=0;e=0;do{a=c[i+(g<<2)>>2]|0;a=(a|0)>-1?a:0-a|0;e=(a|0)>(e|0)?a:e;if(n){a=1;do{u=c[(c[d+(a<<2)>>2]|0)+(g<<2)>>2]|0;u=(u|0)>-1?u:0-u|0;h=(u|0)>(h|0)?u:h;a=a+1|0}while((a|0)!=(f|0))}g=g+1|0;j=j+f|0}while((j|0)<(t|0));a=g}else{h=0;a=g;e=0}a:do if(l){g=0;do{if((e|0)<=(c[s+2328+(g<<2)>>2]|0)?(h|0)<=(c[s+2584+(g<<2)>>2]|0):0)break a;g=g+1|0}while((g|0)<(k|0))}else g=0;while(0);c[m+(o<<2)>>2]=g;o=o+1|0;if((o|0)==(q|0))break;else g=a}}u=b+40|0;c[u>>2]=(c[u>>2]|0)+1;u=r;return u|0}function Ce(a,b,d,e,f,g,h,i){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0;r=l;l=l+16|0;q=r;i=c[b+36>>2]|0;p=(i|0)/2|0;o=Oc(b,S(g<<2,p)|0)|0;c[q>>2]=o;if((g|0)<=0){l=r;return 0}i=(i|0)>1;j=0;n=0;do{b=c[e+(j<<2)>>2]|0;n=((c[f+(j<<2)>>2]|0)!=0&1)+n|0;if(i){k=0;m=j;while(1){c[o+(m<<2)>>2]=c[b+(k<<2)>>2];k=k+1|0;if((k|0)>=(p|0))break;else m=m+g|0}}j=j+1|0}while((j|0)!=(g|0));if(!n){l=r;return 0}Ae(a,d,q,1,h);l=r;return 0}function De(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;u=c[b>>2]|0;v=c[u+8>>2]|0;w=b+16|0;x=c[c[w>>2]>>2]|0;g=(S(c[a+36>>2]|0,f)|0)>>1;t=c[u+4>>2]|0;g=((t|0)<(g|0)?t:g)-(c[u>>2]|0)|0;if((g|0)<=0)return 0;s=(g|0)/(v|0)|0;t=Oc(a,((x+-1+s|0)/(x|0)|0)<<2)|0;a:do if((f|0)>0){h=0;while(1){g=h+1|0;if(c[e+(h<<2)>>2]|0){g=h;break a}if((g|0)<(f|0))h=g;else break}}else g=0;while(0);if((g|0)==(f|0))return 0;q=b+8|0;g=c[q>>2]|0;if((g|0)<=0)return 0;r=(s|0)>0;m=a+4|0;n=u+16|0;o=b+28|0;p=(x|0)>0;l=b+20|0;k=0;b:while(1){if(r){b=(k|0)==0;i=1<<k;g=0;j=0;while(1){if(b){h=xd(c[w>>2]|0,m)|0;if((h|0)==-1){g=23;break b}if((h|0)>=(c[n>>2]|0)){g=23;break b}a=c[(c[o>>2]|0)+(h<<2)>>2]|0;c[t+(j<<2)>>2]=a;if(!a){g=23;break b}}if(p&(g|0)<(s|0)){a=t+(j<<2)|0;e=0;do{h=c[(c[a>>2]|0)+(e<<2)>>2]|0;if((c[u+24+(h<<2)>>2]&i|0?(y=c[(c[(c[l>>2]|0)+(h<<2)>>2]|0)+(k<<2)>>2]|0,y|0):0)?(h=S(g,v)|0,(Cd(y,d,(c[u>>2]|0)+h|0,f,m,v)|0)==-1):0){g=23;break b}e=e+1|0;g=g+1|0}while((e|0)<(x|0)&(g|0)<(s|0))}if((g|0)<(s|0))j=j+1|0;else break}g=c[q>>2]|0}k=k+1|0;if((k|0)>=(g|0)){g=23;break}}if((g|0)==23)return 0;return 0}function Ee(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;if((c[b>>2]|0)>1){Tb(d,1,1);Tb(d,(c[b>>2]|0)+-1|0,4)}else Tb(d,0,1);h=b+1156|0;if((c[h>>2]|0)>0){Tb(d,1,1);Tb(d,(c[h>>2]|0)+-1|0,8);if((c[h>>2]|0)>0){e=b+1160|0;f=a+4|0;g=b+2184|0;i=0;do{l=c[e+(i<<2)>>2]|0;Tb(d,l,Dd((c[f>>2]|0)+-1|0)|0);l=c[g+(i<<2)>>2]|0;Tb(d,l,Dd((c[f>>2]|0)+-1|0)|0);i=i+1|0}while((i|0)<(c[h>>2]|0))}}else Tb(d,0,1);Tb(d,0,2);e=c[b>>2]|0;if((e|0)>1){g=a+4|0;if((c[g>>2]|0)>0){e=b+4|0;f=0;do{Tb(d,c[e+(f<<2)>>2]|0,4);f=f+1|0}while((f|0)<(c[g>>2]|0));j=c[b>>2]|0;k=13}}else{j=e;k=13}if((k|0)==13?(j|0)<=0:0)return;e=b+1028|0;f=b+1092|0;g=0;do{Tb(d,0,8);Tb(d,c[e+(g<<2)>>2]|0,8);Tb(d,c[f+(g<<2)>>2]|0,8);g=g+1|0}while((g|0)<(c[b>>2]|0));return}function Fe(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;d=rk(1,3208)|0;n=c[a+28>>2]|0;il(d|0,0,3208)|0;l=a+4|0;a:do if((c[l>>2]|0)>=1?(f=Yb(b,1)|0,(f|0)>=0):0){if(f){k=Yb(b,4)|0;c[d>>2]=k+1;if((k|0)<0)break}else c[d>>2]=1;a=Yb(b,1)|0;if((a|0)>=0){if(a|0){k=Yb(b,8)|0;a=d+1156|0;c[a>>2]=k+1;if((k|0)<0){m=24;break}f=d+1160|0;g=d+2184|0;h=c[l>>2]|0;k=0;do{i=Yb(b,Dd(h+-1|0)|0)|0;c[f+(k<<2)>>2]=i;j=Yb(b,Dd((c[l>>2]|0)+-1|0)|0)|0;c[g+(k<<2)>>2]=j;if((j|i|0)<0|(i|0)==(j|0))break a;h=c[l>>2]|0;k=k+1|0;if(!((i|0)<(h|0)&(j|0)<(h|0))){m=24;break a}}while((k|0)<(c[a>>2]|0))}if(!(Yb(b,2)|0)){a=c[d>>2]|0;if((a|0)>1){if((c[l>>2]|0)>0){a=d+4|0;f=0;while(1){k=Yb(b,4)|0;c[a+(f<<2)>>2]=k;e=c[d>>2]|0;f=f+1|0;if((k|0)>=(e|0)|(k|0)<0)break a;if((f|0)>=(c[l>>2]|0)){m=17;break}}}}else{e=a;m=17}if((m|0)==17?(e|0)<=0:0){b=d;return b|0}f=d+1028|0;g=n+16|0;h=d+1092|0;a=n+20|0;e=0;do{Yb(b,8)|0;n=Yb(b,8)|0;c[f+(e<<2)>>2]=n;if((n|0)<0?1:(n|0)>=(c[g>>2]|0)){m=24;break a}n=Yb(b,8)|0;c[h+(e<<2)>>2]=n;e=e+1|0;if((n|0)<0?1:(n|0)>=(c[a>>2]|0)){m=24;break a}}while((e|0)<(c[d>>2]|0));return d|0}else m=24}else m=24}else m=24;while(0);if((m|0)==24?(d|0)==0:0){b=0;return b|0}qk(d);b=0;return b|0}function Ge(a){a=a|0;if(a|0)qk(a);return}function He(a){a=a|0;var b=0,d=0,e=0.0,f=0,h=0.0,i=0,k=0,m=0,n=0,o=0.0,p=0,q=0,r=0.0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0.0;R=l;H=c[a+64>>2]|0;I=c[H+4>>2]|0;G=c[I+28>>2]|0;H=c[H+104>>2]|0;C=c[a+104>>2]|0;y=c[a+36>>2]|0;I=I+4|0;K=c[I>>2]<<2;J=l;l=l+((1*K|0)+15&-16)|0;K=Oc(a,K)|0;L=Oc(a,c[I>>2]<<2)|0;M=Oc(a,c[I>>2]<<2)|0;B=C+4|0;e=+g[B>>2];F=c[I>>2]|0;z=l;l=l+((1*(F<<2)|0)+15&-16)|0;N=a+28|0;O=c[N>>2]|0;P=c[G+544+(O<<2)>>2]|0;Q=(c[H+56>>2]|0)+(((O|0?2:0)+(c[C+8>>2]|0)|0)*52|0)|0;A=a+40|0;c[A>>2]=O;if((F|0)>0){v=(y|0)/2|0;b=v<<2;r=+(((g[j>>2]=4.0/+(y|0),c[j>>2]|0)&2147483647)>>>0)*7.177114298428933e-07+-764.6162109375+.345;m=H+4|0;n=a+24|0;p=a+32|0;q=H+12|0;s=H+20|0;t=y+-1|0;u=(t|0)>1;o=e;k=0;while(1){f=c[(c[a>>2]|0)+(k<<2)>>2]|0;c[L+(k<<2)>>2]=Oc(a,b)|0;i=K+(k<<2)|0;c[i>>2]=Oc(a,b)|0;_c(f,m,G,c[n>>2]|0,c[N>>2]|0,c[p>>2]|0);Td(c[c[q+(c[N>>2]<<2)>>2]>>2]|0,f,c[i>>2]|0);Ud(s+((c[N>>2]|0)*12|0)|0,f);e=r+(+(((g[j>>2]=+g[f>>2],c[j>>2]|0)&2147483647)>>>0)*7.177114298428933e-07+-764.6162109375)+.345;g[f>>2]=e;i=z+(k<<2)|0;g[i>>2]=e;if(u){h=e;d=1;while(1){S=+g[f+(d<<2)>>2];F=d+1|0;e=+g[f+(F<<2)>>2];e=r+(+(((g[j>>2]=S*S+e*e,c[j>>2]|0)&2147483647)>>>0)*7.177114298428933e-07+-764.6162109375)*.5+.345;g[f+(F>>1<<2)>>2]=e;if(e>h)g[i>>2]=e;else e=h;d=d+2|0;if((d|0)>=(t|0))break;else h=e}}if(e>0.0){g[i>>2]=0.0;e=0.0}e=e>o?e:o;k=k+1|0;if((k|0)>=(c[I>>2]|0))break;else o=e}}else{v=(y|0)/2|0;b=v<<2}x=Oc(a,b)|0;u=Oc(a,b)|0;b=c[I>>2]|0;F=P+4|0;a:do if((b|0)>0){s=P+1028|0;t=G+800|0;w=H+48|0;if((y|0)>1)n=0;else{n=0;while(1){b=c[F+(n<<2)>>2]|0;f=c[K+(n<<2)>>2]|0;i=c[(c[a>>2]|0)+(n<<2)>>2]|0;k=i+(v<<2)|0;c[A>>2]=O;p=Oc(a,60)|0;m=M+(n<<2)|0;c[m>>2]=p;q=p+60|0;do{c[p>>2]=0;p=p+4|0}while((p|0)<(q|0));hd(Q,k,x);jd(Q,i,u,e,+g[z+(n<<2)>>2]);ld(Q,x,u,1,i,f,k);b=s+(b<<2)|0;d=c[b>>2]|0;if((c[t+(d<<2)>>2]|0)!=1){b=-1;break}E=ge(a,c[(c[w>>2]|0)+(d<<2)>>2]|0,k,i)|0;c[(c[m>>2]|0)+28>>2]=E;if(Nd(a)|0?c[(c[m>>2]|0)+28>>2]|0:0){ld(Q,x,u,2,i,f,k);E=ge(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,k,i)|0;c[(c[m>>2]|0)+56>>2]=E;ld(Q,x,u,0,i,f,k);E=ge(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,k,i)|0;c[c[m>>2]>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E>>2]|0,c[E+28>>2]|0,9362)|0;c[(c[m>>2]|0)+4>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E>>2]|0,c[E+28>>2]|0,18724)|0;c[(c[m>>2]|0)+8>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E>>2]|0,c[E+28>>2]|0,28086)|0;c[(c[m>>2]|0)+12>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E>>2]|0,c[E+28>>2]|0,37449)|0;c[(c[m>>2]|0)+16>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E>>2]|0,c[E+28>>2]|0,46811)|0;c[(c[m>>2]|0)+20>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E>>2]|0,c[E+28>>2]|0,56173)|0;c[(c[m>>2]|0)+24>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E+28>>2]|0,c[E+56>>2]|0,9362)|0;c[(c[m>>2]|0)+32>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E+28>>2]|0,c[E+56>>2]|0,18724)|0;c[(c[m>>2]|0)+36>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E+28>>2]|0,c[E+56>>2]|0,28086)|0;c[(c[m>>2]|0)+40>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E+28>>2]|0,c[E+56>>2]|0,37449)|0;c[(c[m>>2]|0)+44>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E+28>>2]|0,c[E+56>>2]|0,46811)|0;c[(c[m>>2]|0)+48>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E+28>>2]|0,c[E+56>>2]|0,56173)|0;c[(c[m>>2]|0)+52>>2]=E}n=n+1|0;b=c[I>>2]|0;if((n|0)>=(b|0))break a}l=R;return b|0}while(1){d=c[F+(n<<2)>>2]|0;k=c[K+(n<<2)>>2]|0;i=c[(c[a>>2]|0)+(n<<2)>>2]|0;f=i+(v<<2)|0;c[A>>2]=O;p=Oc(a,60)|0;m=M+(n<<2)|0;c[m>>2]=p;q=p+60|0;do{c[p>>2]=0;p=p+4|0}while((p|0)<(q|0));b=0;do{g[i+(b+v<<2)>>2]=+(((g[j>>2]=+g[k+(b<<2)>>2],c[j>>2]|0)&2147483647)>>>0)*7.177114298428933e-07+-764.6162109375+.345;b=b+1|0}while((b|0)<(v|0));hd(Q,f,x);jd(Q,i,u,e,+g[z+(n<<2)>>2]);ld(Q,x,u,1,i,k,f);b=s+(d<<2)|0;d=c[b>>2]|0;if((c[t+(d<<2)>>2]|0)!=1){b=-1;break}E=ge(a,c[(c[w>>2]|0)+(d<<2)>>2]|0,f,i)|0;c[(c[m>>2]|0)+28>>2]=E;if(Nd(a)|0?c[(c[m>>2]|0)+28>>2]|0:0){ld(Q,x,u,2,i,k,f);E=ge(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,f,i)|0;c[(c[m>>2]|0)+56>>2]=E;ld(Q,x,u,0,i,k,f);E=ge(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,f,i)|0;c[c[m>>2]>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E>>2]|0,c[E+28>>2]|0,9362)|0;c[(c[m>>2]|0)+4>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E>>2]|0,c[E+28>>2]|0,18724)|0;c[(c[m>>2]|0)+8>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E>>2]|0,c[E+28>>2]|0,28086)|0;c[(c[m>>2]|0)+12>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E>>2]|0,c[E+28>>2]|0,37449)|0;c[(c[m>>2]|0)+16>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E>>2]|0,c[E+28>>2]|0,46811)|0;c[(c[m>>2]|0)+20>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E>>2]|0,c[E+28>>2]|0,56173)|0;c[(c[m>>2]|0)+24>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E+28>>2]|0,c[E+56>>2]|0,9362)|0;c[(c[m>>2]|0)+32>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E+28>>2]|0,c[E+56>>2]|0,18724)|0;c[(c[m>>2]|0)+36>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E+28>>2]|0,c[E+56>>2]|0,28086)|0;c[(c[m>>2]|0)+40>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E+28>>2]|0,c[E+56>>2]|0,37449)|0;c[(c[m>>2]|0)+44>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E+28>>2]|0,c[E+56>>2]|0,46811)|0;c[(c[m>>2]|0)+48>>2]=E;E=c[m>>2]|0;E=ie(a,c[(c[w>>2]|0)+(c[b>>2]<<2)>>2]|0,c[E+28>>2]|0,c[E+56>>2]|0,56173)|0;c[(c[m>>2]|0)+52>>2]=E}n=n+1|0;b=c[I>>2]|0;if((n|0)>=(b|0))break a}l=R;return b|0}else{s=P+1028|0;w=H+48|0}while(0);g[B>>2]=e;t=b<<2;D=l;l=l+((1*t|0)+15&-16)|0;E=l;l=l+((1*t|0)+15&-16)|0;t=(Nd(a)|0)!=0;v=C+12|0;x=H+44|0;y=a+24|0;z=a+32|0;A=G+2868|0;B=G+3240|0;C=P+1092|0;u=G+1312|0;p=H+52|0;t=t?0:7;while(1){q=c[v+(t<<2)>>2]|0;Tb(q,0,1);Tb(q,O,c[x>>2]|0);if(c[N>>2]|0){Tb(q,c[y>>2]|0,1);Tb(q,c[z>>2]|0,1)}b=c[I>>2]|0;if((b|0)>0){d=0;do{c[J+(d<<2)>>2]=je(q,a,c[(c[w>>2]|0)+(c[s+(c[F+(d<<2)>>2]<<2)>>2]<<2)>>2]|0,c[(c[M+(d<<2)>>2]|0)+(t<<2)>>2]|0,c[L+(d<<2)>>2]|0)|0;d=d+1|0;b=c[I>>2]|0}while((d|0)<(b|0))}md(t,A,Q,P,K,L,J,c[B+((c[N>>2]|0)*60|0)+(t<<2)>>2]|0,b);if((c[P>>2]|0)>0){n=0;do{m=c[C+(n<<2)>>2]|0;b=c[I>>2]|0;if((b|0)>0){d=0;f=0;do{if((c[F+(f<<2)>>2]|0)==(n|0)){c[E+(d<<2)>>2]=(c[J+(f<<2)>>2]|0)!=0&1;c[D+(d<<2)>>2]=c[L+(f<<2)>>2];b=c[I>>2]|0;d=d+1|0}f=f+1|0}while((f|0)<(b|0));b=d}else b=0;k=u+(m<<2)|0;i=Jb[c[(c[57732+(c[k>>2]<<2)>>2]|0)+20>>2]&7](a,c[(c[p>>2]|0)+(m<<2)>>2]|0,D,E,b)|0;d=c[I>>2]|0;if((d|0)>0){b=0;f=0;do{if((c[F+(f<<2)>>2]|0)==(n|0)){c[D+(b<<2)>>2]=c[L+(f<<2)>>2];b=b+1|0}f=f+1|0}while((f|0)<(d|0))}else b=0;Fb[c[(c[57732+(c[k>>2]<<2)>>2]|0)+24>>2]&7](q,a,c[(c[p>>2]|0)+(m<<2)>>2]|0,D,E,b,i,n)|0;n=n+1|0}while((n|0)<(c[P>>2]|0))}H=(Nd(a)|0)!=0;if((t|0)<((H?14:7)|0))t=t+1|0;else{b=0;break}}l=R;return b|0}function Ie(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0,i=0,j=0,k=0,m=0.0,n=0.0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;z=l;w=c[a+64>>2]|0;x=c[w+4>>2]|0;u=c[x+28>>2]|0;w=c[w+104>>2]|0;y=a+28|0;t=c[u+(c[y>>2]<<2)>>2]|0;c[a+36>>2]=t;x=x+4|0;d=c[x>>2]<<2;q=l;l=l+((1*d|0)+15&-16)|0;r=l;l=l+((1*d|0)+15&-16)|0;s=l;l=l+((1*d|0)+15&-16)|0;v=l;l=l+((1*d|0)+15&-16)|0;d=c[x>>2]|0;if((d|0)>0){e=b+4|0;f=b+1028|0;h=u+800|0;i=w+48|0;j=t<<1&2147483646;k=0;do{d=c[f+(c[e+(k<<2)>>2]<<2)>>2]|0;d=Ib[c[(c[57724+(c[h+(d<<2)>>2]<<2)>>2]|0)+20>>2]&15](a,c[(c[i>>2]|0)+(d<<2)>>2]|0)|0;c[v+(k<<2)>>2]=d;c[s+(k<<2)>>2]=(d|0)!=0&1;il(c[(c[a>>2]|0)+(k<<2)>>2]|0,0,j|0)|0;k=k+1|0;d=c[x>>2]|0}while((k|0)<(d|0))}p=b+1156|0;e=c[p>>2]|0;if((e|0)>0){f=b+1160|0;h=b+2184|0;k=0;do{i=s+(c[f+(k<<2)>>2]<<2)|0;j=c[h+(k<<2)>>2]|0;if(!((c[i>>2]|0)==0?!(c[s+(j<<2)>>2]|0):0)){c[i>>2]=1;c[s+(j<<2)>>2]=1}k=k+1|0}while((k|0)<(e|0))}if((c[b>>2]|0)>0){i=b+1092|0;j=u+1312|0;k=w+52|0;o=b+4|0;e=0;while(1){if((d|0)>0){f=0;h=0;do{if((c[o+(h<<2)>>2]|0)==(e|0)){c[r+(f<<2)>>2]=(c[s+(h<<2)>>2]|0)!=0&1;c[q+(f<<2)>>2]=c[(c[a>>2]|0)+(h<<2)>>2];d=c[x>>2]|0;f=f+1|0}h=h+1|0}while((h|0)<(d|0));d=f}else d=0;h=c[i+(e<<2)>>2]|0;Jb[c[(c[57732+(c[j+(h<<2)>>2]<<2)>>2]|0)+28>>2]&7](a,c[(c[k>>2]|0)+(h<<2)>>2]|0,q,r,d)|0;e=e+1|0;if((e|0)>=(c[b>>2]|0))break;d=c[x>>2]|0}d=c[p>>2]|0}else d=e;if((d|0)>0){p=b+1160|0;q=c[a>>2]|0;r=b+2184|0;s=(t|0)/2|0;o=(t|0)>1;do{d=d+-1|0;e=c[q+(c[p+(d<<2)>>2]<<2)>>2]|0;f=c[q+(c[r+(d<<2)>>2]<<2)>>2]|0;if(o){k=0;do{h=e+(k<<2)|0;m=+g[h>>2];i=f+(k<<2)|0;n=+g[i>>2];j=n>0.0;do if(m>0.0)if(j){g[h>>2]=m;g[i>>2]=m-n;break}else{g[i>>2]=m;g[h>>2]=m+n;break}else if(j){g[h>>2]=m;g[i>>2]=m+n;break}else{g[i>>2]=m;g[h>>2]=m-n;break}while(0);k=k+1|0}while((k|0)<(s|0))}}while((d|0)>0)}if((c[x>>2]|0)<=0){l=z;return 0}j=b+4|0;i=b+1028|0;d=u+800|0;e=w+48|0;h=0;do{f=c[i+(c[j+(h<<2)>>2]<<2)>>2]|0;Gb[c[(c[57724+(c[d+(f<<2)>>2]<<2)>>2]|0)+24>>2]&7](a,c[(c[e>>2]|0)+(f<<2)>>2]|0,c[v+(h<<2)>>2]|0,c[(c[a>>2]|0)+(h<<2)>>2]|0)|0;h=h+1|0;f=c[x>>2]|0}while((h|0)<(f|0));if((f|0)<=0){l=z;return 0}d=w+12|0;e=0;do{w=c[(c[a>>2]|0)+(e<<2)>>2]|0;Qd(c[c[d+(c[y>>2]<<2)>>2]>>2]|0,w,w);e=e+1|0}while((e|0)<(c[x>>2]|0));l=z;return 0}function Je(a,b,d,e,f,h,i,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;h=h|0;i=+i;j=+j;var k=0.0,l=0.0,m=0,n=0.0,o=0.0,p=0,q=0,r=0.0;r=3.141592653589793/+(e|0);if((h|0)>0){e=0;do{q=f+(e<<2)|0;g[q>>2]=+I(+(+g[q>>2]))*2.0;e=e+1|0}while((e|0)!=(h|0))}if((d|0)<=0)return;if((h|0)<=1){e=0;do{m=c[b+(e<<2)>>2]|0;k=+I(+(r*+(m|0)))*2.0;if((h|0)==1){o=(k-+g[f>>2])*.5;l=4.0-k*k;k=o*o}else{l=2.0-k;k=(k+2.0)*.5*.5}k=+P(+((i/+G(+(k+l*.5*.5))-j)*.1151292473077774));q=a+(e<<2)|0;g[q>>2]=+g[q>>2]*k;e=e+1|0;if((c[b+(e<<2)>>2]|0)==(m|0))do{q=a+(e<<2)|0;g[q>>2]=k*+g[q>>2];e=e+1|0}while((c[b+(e<<2)>>2]|0)==(m|0))}while((e|0)<(d|0));return}q=(h+-2&-2)+3|0;e=0;do{p=c[b+(e<<2)>>2]|0;k=+I(+(r*+(p|0)))*2.0;m=1;o=.5;n=.5;do{n=n*(k-+g[f+(m+-1<<2)>>2]);o=o*(k-+g[f+(m<<2)>>2]);m=m+2|0}while((m|0)<(h|0));if((q|0)==(h|0)){n=n*(k-+g[f+(h+-1<<2)>>2]);l=4.0-k*k;k=n*n}else{l=2.0-k;k=n*((k+2.0)*n)}k=+P(+((i/+G(+(k+o*(o*l)))-j)*.1151292473077774));m=a+(e<<2)|0;g[m>>2]=+g[m>>2]*k;e=e+1|0;if((c[b+(e<<2)>>2]|0)==(p|0))do{m=a+(e<<2)|0;g[m>>2]=k*+g[m>>2];e=e+1|0}while((c[b+(e<<2)>>2]|0)==(p|0))}while((e|0)<(d|0));return}function Ke(){Le(0);return}function Le(a){a=a|0;Ne(59884,1);Ne(59896,2);Qe(59909,3);Se(59923,6);Ue(59937,3);We(59951,7);return}function Me(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0;i=vk(16)|0;fj(i);j=vk(16)|0;Pi(j);if(((hj(i,a,b)|0?Ri(j)|0:0)?Si(j,d,e,f)|0:0)?Ti(j,i,0,h)|0:0){e=pk(c[h>>2]|0)|0;c[g>>2]=e;ol(e|0,0,c[h>>2]|0)|0;h=1}else h=0;Qi(j);wk(j);gj(i);wk(i);g=c[g>>2]|0;if(!(h|(g|0)==0))qk(g);return h|0}function Ne(a,b){a=a|0;b=b|0;Da(a|0,8,59044,59969,3,b|0);return}function Oe(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0;i=vk(16)|0;fj(i);j=vk(8)|0;Ui(j);if(((hj(i,a,b)|0?Wi(j)|0:0)?Zi(j,d,e,f)|0:0)?Xi(j,i)|0:0){c[g>>2]=j;c[h>>2]=i;g=1}else{Vi(j);wk(j);gj(i);wk(i);g=0}return g|0}function Pe(a,b){a=a|0;b=b|0;var d=0;d=c[a>>2]|0;a=c[b>>2]|0;if(d|0){Vi(d);wk(d)}if(a|0){gj(a);wk(a)}return}function Qe(a,b){a=a|0;b=b|0;Da(a|0,3,59032,59987,2,b|0);return}function Re(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0;a=c[a>>2]|0;g=_i(a)|0;c[b>>2]=g;if(g|0)c[d>>2]=$j(g)|0;a=$i(a)|0;c[e>>2]=a;if(a|0)c[f>>2]=$j(a)|0;return 1}function Se(a,b){a=a|0;b=b|0;Da(a|0,6,59008,59979,1,b|0);return}function Te(a,b,d,e,f,i,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;i=i|0;j=j|0;var k=0,m=0,n=0,o=0,p=0.0,q=0.0;o=l;l=l+16|0;k=o+8|0;m=o+4|0;n=o;a=c[a>>2]|0;if(aj(a,k,m,0,n)|0){m=(S(S(e,b)|0,ej(c[n>>2]|0,c[k>>2]|0,d,+g[m>>2])|0)|0)/8|0;c[f>>2]=m;q=+(m|0)/+(b|0)/(+(e|0)*.125)/+(d|0);p=+(bj(a)|0);h[i>>3]=p/+(c[n>>2]|0)*q;p=+(cj(a)|0);h[j>>3]=q*(p/+(c[n>>2]|0));a=Yi(a,0,0.0)|0}else a=0;l=o;return a|0}function Ue(a,b){a=a|0;b=b|0;Da(a|0,8,58976,59969,4,b|0);return}function Ve(a,b,d){a=a|0;b=b|0;d=d|0;return dj(c[a>>2]|0,b,d)|0}function We(a,b){a=a|0;b=b|0;Da(a|0,4,58960,59963,5,b|0);return}function Xe(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return xb[a&7](b,c,d)|0}function Ye(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;return wb[a&3](b,c,d,e,f,g,h)|0}function Ze(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return Jb[a&7](b,c,d,e,f)|0}function _e(a,b,c){a=a|0;b=b|0;c=c|0;Ab[a&3](b,c);return}function $e(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;return wb[a&3](b,c,d,e,f,g,h)|0}function af(a,b){a=a|0;b=b|0;var c=0.0,d=0.0,e=0,f=0.0,g=0,h=0.0;g=0;h=1.0;while(1){if((g|0)==17)break;else{f=1.0;a=0}while(1){if((a|0)==(g|0)){a=0;break}f=f*.1;a=a+1|0}while(1){if((a|0)>=10)break;d=h+f*+(a|0);e=0;c=1.0;while(1){if((e|0)>=(b|0))break;c=d*c;if(c>=2.0)break;e=e+1|0}if((e|0)!=(b|0))break;a=a+1|0}g=g+1|0;h=h+f*+(a+-1|0)}return +h}function bf(a){a=a|0;c[a>>2]=0;return}function cf(a){a=a|0;var b=0;b=c[a>>2]|0;if(b|0)qk(b);c[a>>2]=0;return}function df(a){a=a|0;var b=0.0,d=0,e=0,f=0.0,i=0;i=pk(12288)|0;c[a>>2]=i;a:do if(!i)a=0;else{b=+af(0,192);a=0;while(1){if((a|0)==3072){a=1;break a}e=(a|0)%192|0;d=0;f=+h[152+(((a|0)/192|0)<<3)>>3];while(1){if((d|0)>=(e|0))break;d=d+1|0;f=b*f}g[i+(a<<2)>>2]=f;a=a+1|0}}while(0);return a|0}function ef(a,b){a=a|0;b=b|0;b=(b<<4)+393216|0;if((b|0)<-255)b=0;else b=(b|0)>786431?3071:(b|0)/256|0;return +(+g[(c[a>>2]|0)+(b<<2)>>2])}function ff(a,b){a=a|0;b=b|0;b=b>>4;return +(+g[(c[a>>2]|0)+(((b|0)<0?0:(b|0)>3071?3071:b)<<2)>>2])}function gf(a){a=a|0;return c[a+4>>2]|0}function hf(a){a=a|0;return c[a>>2]|0}function jf(a,b){a=a|0;b=b|0;var d=0;d=c[a+8>>2]|0;if((b|0)<0|(d|0)==0)return 0;else return ((c[a+4>>2]|0)>(b|0)?d+(b*76|0)|0:0)|0;return 0}function kf(a){a=a|0;c[a+8>>2]=0;c[a+4>>2]=0;c[a>>2]=0;return}function lf(a){a=a|0;var b=0,d=0;d=a+8|0;b=c[d>>2]|0;if(b|0)qk(b);c[d>>2]=0;c[a+4>>2]=0;return}function mf(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;if((c[b>>2]|0)>441e3)c[b>>2]=441e3;l=b+4|0;j=b+8|0;k=0;while(1){if((k|0)>=(c[l>>2]|0))break;i=c[j>>2]|0;if(a[i+(k*76|0)>>0]|0){f=c[i+(k*76|0)+4>>2]|0;h=i+(k*76|0)+8|0;g=0;while(1){if((g|0)>=(f|0))break;b=c[h>>2]|0;e=b+(g<<3)|0;d=c[e>>2]|0;if((d|0)<=1e4){if((d|0)<0)c[e>>2]=0}else c[e>>2]=1e4;d=b+(g<<3)+4|0;b=c[d>>2]|0;if((b|0)<=100){if((b|0)<0)c[d>>2]=0}else c[d>>2]=100;g=g+1|0}d=i+(k*76|0)+12|0;b=c[d>>2]|0;if((b|0)>=-100){if((b|0)>100)c[d>>2]=100}else c[d>>2]=-100;nf(i+(k*76|0)+16|0);nf(i+(k*76|0)+36|0);nf(i+(k*76|0)+56|0)}k=k+1|0}return}function nf(a){a=a|0;var b=0.0,d=0;if((c[a>>2]|0)>16)c[a>>2]=0;d=a+4|0;b=+g[d>>2];if(!(b>44100.0)){if(b<=0.0)g[d>>2]=0.0}else g[d>>2]=44100.0;d=a+8|0;b=+g[d>>2];if(!(b>200.0)){if(b<=0.0)g[d>>2]=0.0}else g[d>>2]=200.0;d=a+12|0;b=+g[d>>2];if(!(b>100.0)){if(b<=0.0)g[d>>2]=0.0}else g[d>>2]=100.0;return}function of(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0;q=l;l=l+32|0;o=q+4|0;h=q+17|0;n=q+16|0;i=q;g=q+8|0;pf(b);a:do if((jj(d,g,1,8)|0?(Dj(g,59992,8)|0)==0:0)?jj(d,i,4,1)|0:0){if((c[i>>2]|0)>>>0>20120418){a[e>>0]=1;p=37;break}if((kj(d,b)|0?jj(d,h,1,1)|0:0)?(f=a[h>>0]|0,j=f<<24>>24,m=b+4|0,c[m>>2]=j,f<<24>>24>=0):0){if(f<<24>>24>4){a[e>>0]=1;p=37;break}k=b+8|0;if(qf(k,j*76|0)|0){j=0;while(1){if((j|0)>=(c[m>>2]|0)){f=1;break a}i=c[k>>2]|0;a[i+(j*76|0)>>0]=1;if(!(kj(d,o)|0)){p=37;break a}f=c[o>>2]|0;if(f&-125|0){p=15;break}if(f&4){g=i+(j*76|0)+4|0;if(!(kj(d,g)|0)){p=37;break a}f=c[g>>2]|0;if((f|0)>3){p=19;break}h=i+(j*76|0)+8|0;if(qf(h,f<<3)|0)f=0;else{p=37;break a}while(1){if((f|0)>=(c[g>>2]|0))break;if(!(kj(d,(c[h>>2]|0)+(f<<3)|0)|0)){p=37;break a}if(kj(d,(c[h>>2]|0)+(f<<3)+4|0)|0)f=f+1|0;else{p=37;break a}}f=c[o>>2]|0}if(f&8){if(!(jj(d,n,1,1)|0)){p=37;break a}c[i+(j*76|0)+12>>2]=a[n>>0];f=c[o>>2]|0}if(f&16){if(!(rf(i+(j*76|0)+16|0,d,e)|0)){p=37;break a}f=c[o>>2]|0}if(f&32){if(!(rf(i+(j*76|0)+36|0,d,e)|0)){p=37;break a}f=c[o>>2]|0}if(f&64|0?!(rf(i+(j*76|0)+56|0,d,e)|0):0){p=37;break a}j=j+1|0}if((p|0)==15){a[e>>0]=1;p=37;break}else if((p|0)==19){a[e>>0]=1;p=37;break}}else p=37}else p=37}else p=37;while(0);if((p|0)==37){pf(b);f=0}l=q;return f|0}function pf(a){a=a|0;var b=0,d=0,e=0;e=a+8|0;if(c[e>>2]|0){a=a+4|0;d=0;while(1){if((d|0)>=(c[a>>2]|0))break;b=(c[e>>2]|0)+(d*76|0)+8|0;if(c[b>>2]|0)sf(b);d=d+1|0}sf(e);c[a>>2]=0}return}function qf(a,b){a=a|0;b=b|0;var d=0;d=pk(b)|0;c[a>>2]=d;if(!d)d=0;else{il(d|0,0,b|0)|0;d=1}return d|0}function rf(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,h=0,i=0;h=l;l=l+16|0;f=h;do if(kj(d,f)|0){i=c[f>>2]|0;c[b>>2]=i;if((i|0)>16){a[e>>0]=1;d=0;break}if(((kj(d,f)|0?(a[b+16>>0]=(c[f>>2]|0)!=0&1,kj(d,f)|0):0)?(g[b+4>>2]=+(c[f>>2]|0)/10.0,kj(d,f)|0):0)?(g[b+8>>2]=+(c[f>>2]|0)/10.0,kj(d,f)|0):0){g[b+12>>2]=+(c[f>>2]|0)/10.0;d=1}else d=0}else d=0;while(0);l=h;return d|0}function sf(a){a=a|0;var b=0;b=c[a>>2]|0;if(b|0){qk(b);c[a>>2]=0}return}function tf(d,e,f,i,j){d=d|0;e=e|0;f=f|0;i=i|0;j=j|0;var k=0.0,l=0;switch(c[e>>2]|0){case 4:{c[d+32>>2]=1;l=0;break}case 8:{c[d+32>>2]=2;l=0;break}default:{c[d+32>>2]=0;l=1}}h[d>>3]=44100.0/+(f|0)*(+g[e+4>>2]/100.0);f=e+12|0;if(l)k=+g[f>>2]/100.0*441.0;else k=0.0;h[d+8>>3]=k;h[d+16>>3]=+g[e+8>>2]/100.0;c[d+24>>2]=i;a[d+28>>0]=a[e+16>>0]|0;c[d+36>>2]=0;i=~~(+g[f>>2]/100.0*44100.0);c[d+44>>2]=i;c[d+40>>2]=b[j+(i<<1)>>1];return}function uf(a,d,e){a=a|0;d=+d;e=e|0;var f=0,g=0,i=0;f=a+8|0;d=+h[f>>3]+d;h[f>>3]=d;if(d>441.0?(d=d+-441.0,h[f>>3]=!(d>=441.0)?d:0.0,c[a+32>>2]|0):0){i=a+44|0;g=c[i>>2]|0;f=b[e+(g<<1)>>1]|0;c[a+36>>2]=f;g=(g|0)>44098?0:g+1|0;c[i>>2]=g;c[a+40>>2]=(b[e+(g<<1)>>1]|0)-f}return}function vf(b){b=b|0;var d=0;a[b>>0]=0;c[b+80>>2]=0;d=0;while(1){if((d|0)==17)break;c[b+4+(d<<2)>>2]=0;d=d+1|0}return}function wf(b){b=b|0;var d=0,e=0;a[b>>0]=0;e=b+80|0;d=c[e>>2]|0;if(d|0){cf(d);wk(d)}c[e>>2]=0;d=0;while(1){if((d|0)==17)break;xf(b+4+(d<<2)|0);d=d+1|0}return}function xf(a){a=a|0;var b=0;b=c[a>>2]|0;if(b|0){qk(b);c[a>>2]=0}return}function yf(a){a=a|0;var b=0,d=0,e=0;b=a+72|0;e=c[b>>2]<<16>>16;d=a+76|0;a=e+(c[d>>2]|0)|0;c[d>>2]=e;a=tl(a&65535|0)|0;c[b>>2]=a<<16>>16;return a|0}function zf(d){d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0.0;C=l;l=l+256|0;u=C+232|0;i=C;o=C+104|0;q=C+40|0;s=C+8|0;Lf(u);e=i;c[e>>2]=1;c[e+4>>2]=128;e=o;f=59076;g=e+128|0;do{c[e>>2]=c[f>>2];e=e+4|0;f=f+4|0}while((e|0)<(g|0));e=q;f=59204;g=e+64|0;do{c[e>>2]=c[f>>2];e=e+4|0;f=f+4|0}while((e|0)<(g|0));c[s>>2]=c[14817];c[s+4>>2]=c[14818];c[s+8>>2]=c[14819];c[s+12>>2]=c[14820];c[s+16>>2]=c[14821];c[s+20>>2]=c[14822];c[s+24>>2]=c[14823];c[s+28>>2]=c[14824];if(!(a[d>>0]|0)){g=vk(4)|0;bf(g);c[d+80>>2]=g;if(df(g)|0){e=0;while(1){if((e|0)==17)break;c[d+4+(e<<2)>>2]=0;e=e+1|0}if(((((((((((((((Af(d+4|0,882)|0?(h=d+8|0,Af(h,882)|0):0)?(j=d+12|0,Af(j,882)|0):0)?(k=d+16|0,Af(k,882)|0):0)?(m=d+20|0,Af(m,88200)|0):0)?(n=d+24|0,Af(n,882)|0):0)?(p=d+28|0,Af(p,882)|0):0)?(r=d+32|0,Af(r,882)|0):0)?(t=d+40|0,Af(t,882)|0):0)?(v=d+44|0,Af(v,882)|0):0)?(w=d+48|0,Af(w,882)|0):0)?(x=d+52|0,Af(x,882)|0):0)?(y=d+56|0,Af(y,882)|0):0)?(z=d+60|0,Af(z,882)|0):0)?(A=d+64|0,Af(A,882)|0):0)?(B=d+68|0,Af(B,882)|0):0){Mf(u,i,1,128,441,0);e=c[h>>2]|0;f=0;while(1){if((f|0)==441)break;D=+Nf(u,f);D=D>1.0?1.0:D;b[e>>1]=~~((D<-1.0?-1.0:D)*32767.0);e=e+2|0;f=f+1|0}e=c[j>>2]|0;f=0;while(1){if((f|0)==441)break;b[e>>1]=~~(32767.0-+(f|0)*65534.0/441.0);e=e+2|0;f=f+1|0}e=c[k>>2]|0;f=e;g=0;while(1){if((g|0)==220)break;b[f>>1]=32767;f=f+2|0;g=g+1|0}e=e+440|0;f=220;while(1){if((f|0)>=441)break;b[e>>1]=-32767;e=e+2|0;f=f+1|0}e=c[m>>2]|0;c[d+72>>2]=17476;c[d+76>>2]=34952;f=0;while(1){if((f|0)==44100)break;b[e>>1]=yf(d)|0;e=e+2|0;f=f+1|0}Mf(u,o,16,128,441,0);e=c[n>>2]|0;f=0;while(1){if((f|0)==441)break;D=+Nf(u,f);D=D>1.0?1.0:D;b[e>>1]=~~((D<-1.0?-1.0:D)*32767.0);e=e+2|0;f=f+1|0}Mf(u,q,8,128,441,0);e=c[p>>2]|0;f=0;while(1){if((f|0)==441)break;D=+Nf(u,f);D=D>1.0?1.0:D;b[e>>1]=~~((D<-1.0?-1.0:D)*32767.0);e=e+2|0;f=f+1|0}Mf(u,s,4,128,441,441);e=c[r>>2]|0;f=0;while(1){if((f|0)==441)break;D=+Of(u,f);D=D>1.0?1.0:D;b[e>>1]=~~((D<-1.0?-1.0:D)*32767.0);e=e+2|0;f=f+1|0}e=c[t>>2]|0;f=e;g=0;while(1){if((g|0)==147)break;b[f>>1]=32767;f=f+2|0;g=g+1|0}e=e+294|0;f=147;while(1){if((f|0)>=441)break;b[e>>1]=-32767;e=e+2|0;f=f+1|0}e=c[v>>2]|0;f=e;g=0;while(1){if((g|0)==110)break;b[f>>1]=32767;f=f+2|0;g=g+1|0}e=e+220|0;f=110;while(1){if((f|0)>=441)break;b[e>>1]=-32767;e=e+2|0;f=f+1|0}e=c[w>>2]|0;f=e;g=0;while(1){if((g|0)==55)break;b[f>>1]=32767;f=f+2|0;g=g+1|0}e=e+110|0;f=55;while(1){if((f|0)>=441)break;b[e>>1]=-32767;e=e+2|0;f=f+1|0}e=c[x>>2]|0;f=e;g=0;while(1){if((g|0)==27)break;b[f>>1]=32767;f=f+2|0;g=g+1|0}e=e+54|0;f=27;while(1){if((f|0)>=441)break;b[e>>1]=-32767;e=e+2|0;f=f+1|0}e=c[y>>2]|0;f=e;g=0;while(1){if((g|0)==147)break;b[f>>1]=32767;f=f+2|0;g=g+1|0}e=e+294|0;f=147;while(1){if((f|0)>=294)break;b[e>>1]=0;e=e+2|0;f=f+1|0}while(1){if((f|0)>=441)break;b[e>>1]=-32767;e=e+2|0;f=f+1|0}e=c[z>>2]|0;f=e;g=0;while(1){if((g|0)==110)break;b[f>>1]=32767;f=f+2|0;g=g+1|0}e=e+220|0;f=110;while(1){if((f|0)>=220)break;b[e>>1]=10922;e=e+2|0;f=f+1|0}while(1){if((f|0)>=330)break;b[e>>1]=-10922;e=e+2|0;f=f+1|0}while(1){if((f|0)>=441)break;b[e>>1]=-32767;e=e+2|0;f=f+1|0}e=c[A>>2]|0;f=e;g=0;while(1){if((g|0)==73)break;b[f>>1]=32767;f=f+2|0;g=g+1|0}e=e+146|0;f=73;while(1){if((f|0)>=147)break;b[e>>1]=19661;e=e+2|0;f=f+1|0}while(1){if((f|0)>=220)break;b[e>>1]=6553;e=e+2|0;f=f+1|0}while(1){if((f|0)>=294)break;b[e>>1]=-6553;e=e+2|0;f=f+1|0}while(1){if((f|0)>=367)break;b[e>>1]=-19661;e=e+2|0;f=f+1|0}while(1){if((f|0)>=441)break;b[e>>1]=-32767;e=e+2|0;f=f+1|0}e=c[B>>2]|0;f=e;g=0;while(1){if((g|0)==55)break;b[f>>1]=32767;f=f+2|0;g=g+1|0}e=e+110|0;f=55;while(1){if((f|0)>=110)break;b[e>>1]=23405;e=e+2|0;f=f+1|0}while(1){if((f|0)>=165)break;b[e>>1]=14043;e=e+2|0;f=f+1|0}while(1){if((f|0)>=220)break;b[e>>1]=4681;e=e+2|0;f=f+1|0}while(1){if((f|0)>=275)break;b[e>>1]=-4681;e=e+2|0;f=f+1|0}while(1){if((f|0)>=330)break;b[e>>1]=-14043;e=e+2|0;f=f+1|0}while(1){if((f|0)>=385)break;b[e>>1]=-23405;e=e+2|0;f=f+1|0}while(1){if((f|0)>=441)break;b[e>>1]=-32767;e=e+2|0;f=f+1|0}a[d>>0]=1}}e=(a[d>>0]|0)!=0}else e=1;l=C;return e|0}function Af(a,b){a=a|0;b=b|0;var d=0;d=pk(b)|0;c[a>>2]=d;if(!d)d=0;else{il(d|0,0,b|0)|0;d=1}return d|0}function Bf(d,e,f,g,i){d=d|0;e=e|0;f=f|0;g=g|0;i=i|0;var j=0,k=0,m=0,n=0,o=0.0,p=0.0,q=0,r=0.0,s=0,t=0.0,u=0.0,v=0,w=0,x=0.0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;G=l;l=l+16|0;F=G;if(!(a[d>>0]|0))j=0;else{c[F>>2]=0;mf(e);D=gf(e)|0;C=Af(F,D*208|0)|0;m=c[F>>2]|0;a:do if(C){C=d+20|0;z=0;while(1){if((z|0)>=(D|0))break;y=jf(e,z)|0;a[m+(z*208|0)>>0]=a[y>>0]|0;q=y+4|0;n=c[q>>2]|0;v=m+(z*208|0)+52|0;c[v>>2]=n;j=c[y+12>>2]|0;do if(j){k=m+(z*208|0)+8|0;if((j|0)<0){h[k>>3]=1.0;h[m+(z*208|0)+16>>3]=(+(j|0)+100.0)/100.0;break}else{h[m+(z*208|0)+16>>3]=1.0;h[k>>3]=(100.0-+(j|0))/100.0;break}}else{h[m+(z*208|0)+8>>3]=1.0;h[m+(z*208|0)+16>>3]=1.0}while(0);w=m+(z*208|0)+56|0;if(!(Af(w,n<<4)|0)){k=1;j=0;n=60;break a}j=c[q>>2]|0;n=y+8|0;k=0;while(1){if((k|0)>=(j|0))break;s=c[n>>2]|0;q=(S(c[s+(k<<3)>>2]|0,g)|0)/1e3|0;A=c[w>>2]|0;c[A+(k<<4)>>2]=q;h[A+(k<<4)+8>>3]=+(c[s+(k<<3)+4>>2]|0)/100.0;k=k+1|0}n=m+(z*208|0)+24|0;c[n>>2]=0;s=m+(z*208|0)+32|0;q=m+(z*208|0)+40|0;c[s>>2]=0;c[s+4>>2]=0;c[s+8>>2]=0;c[s+12>>2]=0;c[s+16>>2]=0;k=c[v>>2]|0;j=0;p=0.0;while(1){if((j|0)>=(k|0))break;A=c[w>>2]|0;o=+h[A+(j<<4)+8>>3];h[q>>3]=o-p;if(c[A+(j<<4)>>2]|0)break;h[s>>3]=o;A=j+1|0;c[n>>2]=A;j=A;p=o}A=y+16|0;tf(m+(z*208|0)+64|0,A,g,c[d+4+(c[A>>2]<<2)>>2]|0,c[C>>2]|0);A=y+36|0;tf(m+(z*208|0)+112|0,A,g,c[d+4+(c[A>>2]<<2)>>2]|0,c[C>>2]|0);A=y+56|0;tf(m+(z*208|0)+160|0,A,g,c[d+4+(c[A>>2]<<2)>>2]|0,c[C>>2]|0);z=z+1|0}A=(hf(e)|0)/(44100/(g|0)|0|0)|0;j=vk(28)|0;Qf(j);if(Tf(j,f,g,i,A)|0){i=(i|0)==8;z=d+80|0;o=0.0;k=cg(j)|0;e=0;p=0.0;r=0.0;while(1){if((e|0)<(A|0))s=0;else{k=0;n=59;break a}while(1){m=c[F>>2]|0;if((s|0)<(f|0)){t=0.0;q=0;x=p}else{y=0;break}while(1){if((q|0)>=(D|0))break;if(!(a[m+(q*208|0)>>0]|0))p=x;else{switch(c[m+(q*208|0)+96>>2]|0){case 0:{n=~~+h[m+(q*208|0)+72>>3];if((n|0)>-1)r=+(b[(c[m+(q*208|0)+88>>2]|0)+(n<<1)>>1]|0);else r=0.0;break}case 1:{p=+h[m+(q*208|0)+72>>3];if(!(p>=0.0))r=0.0;else r=+(((S(c[m+(q*208|0)+104>>2]|0,~~p)|0)/441|0)+(c[m+(q*208|0)+100>>2]|0)|0);break}case 2:{if(!(+h[m+(q*208|0)+72>>3]>=0.0))r=0.0;else r=+(c[m+(q*208|0)+100>>2]|0);break}default:{}}u=+h[m+(q*208|0)+80>>3]*((a[m+(q*208|0)+92>>0]|0)==0?r:-r);switch(c[m+(q*208|0)+192>>2]|0){case 0:{p=+(b[(c[m+(q*208|0)+184>>2]|0)+(~~+h[m+(q*208|0)+168>>3]<<1)>>1]|0);break}case 1:{p=+(((S(~~+h[m+(q*208|0)+168>>3],c[m+(q*208|0)+200>>2]|0)|0)/441|0)+(c[m+(q*208|0)+196>>2]|0)|0);break}case 2:{p=+(c[m+(q*208|0)+196>>2]|0);break}default:p=x}r=+h[m+(q*208|0)+176>>3]*((a[m+(q*208|0)+188>>0]|0)==0?p:-p);n=c[m+(q*208|0)+24>>2]|0;p=+h[m+(q*208|0)+32>>3];if((n|0)<(c[m+(q*208|0)+52>>2]|0))p=p+ +h[m+(q*208|0)+40>>3]*+(c[m+(q*208|0)+48>>2]|0)/+(c[(c[m+(q*208|0)+56>>2]|0)+(n<<4)>>2]|0);x=+h[m+(q*208|0)+8+(s<<3)>>3]*(u*(r+32767.0)/65534.0)*p;t=t+x;p=r;r=x}q=q+1|0;x=p}m=~~t;m=(m|0)>32767?32767:m;m=(m|0)<-32767?-32767:m;if(i){a[k>>0]=(m>>>8)+128;k=k+1|0}else{b[k>>1]=m;k=k+2|0}s=s+1|0;p=x}while(1){if((y|0)>=(D|0))break;if(a[m+(y*208|0)>>0]|0){n=m+(y*208|0)+112|0;switch(c[m+(y*208|0)+144>>2]|0){case 0:{o=+(((b[(c[m+(y*208|0)+136>>2]|0)+(~~+h[m+(y*208|0)+120>>3]<<1)>>1]|0)*12800|0)/32767|0|0);break}case 1:{o=+(((S(~~+h[m+(y*208|0)+120>>3],c[m+(y*208|0)+152>>2]|0)|0)/441|0)+(c[m+(y*208|0)+148>>2]|0)|0);break}case 2:{o=+(c[m+(y*208|0)+148>>2]|0);break}default:{}}o=+h[m+(y*208|0)+128>>3]*((a[m+(y*208|0)+140>>0]|0)==0?o:-o);s=m+(y*208|0)+64|0;x=+h[s>>3];x=x*+ef(c[z>>2]|0,~~o);uf(s,x,c[C>>2]|0);uf(n,+h[n>>3],c[C>>2]|0);s=m+(y*208|0)+160|0;uf(s,+h[s>>3],c[C>>2]|0);s=m+(y*208|0)+24|0;n=c[s>>2]|0;q=c[m+(y*208|0)+52>>2]|0;if((n|0)<(q|0)?(E=m+(y*208|0)+48|0,d=(c[E>>2]|0)+1|0,c[E>>2]=d,B=c[m+(y*208|0)+56>>2]|0,(d|0)>=(c[B+(n<<4)>>2]|0)):0){c[E>>2]=0;u=+h[B+(n<<4)+8>>3];w=m+(y*208|0)+32|0;h[w>>3]=u;v=m+(y*208|0)+40|0;h[v>>3]=0.0;while(1){n=n+1|0;if((n|0)>=(q|0))break;t=+h[B+(n<<4)+8>>3];h[v>>3]=t-u;if(c[B+(n<<4)>>2]|0)break;h[w>>3]=t;u=t}c[s>>2]=n}}y=y+1|0}e=e+1|0}}else{k=1;n=59}}else{k=1;j=0;n=59}while(0);if((n|0)==59)if(m)n=60;if((n|0)==60)xf(F);if(k&(j|0)!=0){Rf(j);wk(j);j=0}}l=G;return j|0}function Cf(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;do if(e){j=e+8|0;g=c[j>>2]|0;k=e+4|0;f=c[k>>2]|0;if(!((g|0)==-1|(f|0)<=(g|0))){i=f-g|0;h=S(d,b)|0;f=(c[e>>2]|0)+g|0;if((h|0)<(i|0)){ol(a|0,f|0,h|0)|0;c[j>>2]=(c[j>>2]|0)+h;break}else{ol(a|0,f|0,i|0)|0;c[j>>2]=c[k>>2];d=(i>>>0)/(b>>>0)|0;break}}else d=0}else d=-1;while(0);return d|0}function Df(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;a:do if((a|0)!=0?(g=a+8|0,f=c[g>>2]|0,(f|0)>=0):0){if((d|0)<0){c[g>>2]=-1;b=-1;break}switch(e|0){case 0:break;case 1:{b=f+b|0;break}case 2:{b=(c[a+4>>2]|0)+b|0;break}default:{b=-1;break a}}if((b|0)>=0){c[g>>2]=b;b=0}else b=-1}else b=-1;while(0);return b|0}function Ef(a){a=a|0;return ((a|0)==0)<<31>>31|0}function Ff(a){a=a|0;if(!a)a=-1;else a=c[a+8>>2]|0;return a|0}function Gf(a){a=a|0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;c[a+16>>2]=0;return}function Hf(a){a=a|0;If(a);return}function If(a){a=a|0;qk(c[a+16>>2]|0);c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;c[a+16>>2]=0;return}function Jf(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;g=l;l=l+4864|0;h=g+752|0;f=g;i=g+740|0;j=g+720|0;d=g+736|0;e=g+768|0;c[i>>2]=c[a+16>>2];c[i+8>>2]=0;c[i+4>>2]=c[a+12>>2];c[j>>2]=6;c[j+4>>2]=7;c[j+8>>2]=3;c[j+12>>2]=4;c[h>>2]=c[j>>2];c[h+4>>2]=c[j+4>>2];c[h+8>>2]=c[j+8>>2];c[h+12>>2]=c[j+12>>2];a=(uc(i,f,0,0,h)|0)+134|0;if(a>>>0<7?(103>>>(a&255)&1)!=0:0)b=0;else{i=Kc(f,-1)|0;j=Ec(f,-1)|0;if(Tf(b,c[i+4>>2]|0,c[i+8>>2]|0,16,j)|0){a=cg(b)|0;while(1){b=Mc(f,e,4096,0,2,1,d)|0;if((b|0)<=0){if(!b)break}else ol(a|0,e|0,b|0)|0;a=a+b|0}tc(f)|0;b=1}else b=0}l=g;return b|0}function Kf(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;if((((((jj(b,a,4,1)|0?jj(b,a+4|0,4,1)|0:0)?jj(b,a+8|0,4,1)|0:0)?(e=a+12|0,jj(b,e,4,1)|0):0)?(d=c[e>>2]|0,(d|0)!=0):0)?(f=pk(d)|0,c[a+16>>2]=f,(f|0)!=0):0)?jj(b,f,1,d)|0:0)d=1;else{d=a+16|0;qk(c[d>>2]|0);c[d>>2]=0;c[a+12>>2]=0;d=0}return d|0}function Lf(a){a=a|0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;c[a+16>>2]=0;return}function Mf(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;c[a+12>>2]=e;c[a>>2]=b;c[a+16>>2]=f;c[a+4>>2]=d;c[a+8>>2]=g;return}function Nf(a,b){a=a|0;b=b|0;var d=0.0,e=0,f=0.0,g=0,h=0.0,i=0,j=0.0;g=c[a+4>>2]|0;d=+(b|0);b=a+16|0;e=0;f=0.0;while(1){if((e|0)>=(g|0))break;i=c[a>>2]|0;h=+(c[i+(e<<3)>>2]|0);j=+J(+(d*(h*6.283185307179586)/+(c[b>>2]|0)));h=f+j*+(c[i+(e<<3)+4>>2]|0)/h*.0078125;e=e+1|0;f=h}return +(f*+(c[a+12>>2]|0)*.0078125)}function Of(a,b){a=a|0;b=b|0;var d=0.0,e=0,f=0,g=0,h=0,i=0;e=c[a+8>>2]|0;g=S(e,b)|0;g=(g|0)/(c[a+16>>2]|0)|0;b=c[a+4>>2]|0;f=0;while(1){if((f|0)>=(b|0))break;if((c[(c[a>>2]|0)+(f<<3)>>2]|0)>(g|0))break;f=f+1|0}do if((f|0)!=(b|0)){b=c[a>>2]|0;if(!f){e=c[b>>2]|0;f=c[b+4>>2]|0;i=e;h=f;break}else{h=f+-1|0;i=c[b+(h<<3)>>2]|0;e=c[b+(f<<3)>>2]|0;h=c[b+(h<<3)+4>>2]|0;f=c[b+(f<<3)+4>>2]|0;break}}else{h=b+-1|0;f=c[a>>2]|0;i=c[f+(h<<3)>>2]|0;h=c[f+(h<<3)+4>>2]|0;f=c[f+4>>2]|0}while(0);b=g-i|0;d=+(h|0);if(b)d=d+ +(b|0)*+(f-h|0)/+(e-i|0);return +(d*+(c[a+12>>2]|0)*.0078125*.0078125)}function Pf(a){a=a|0;qk(c[a+24>>2]|0);c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;c[a+16>>2]=0;c[a+20>>2]=0;c[a+24>>2]=0;return}function Qf(a){a=a|0;c[a+24>>2]=0;Pf(a);return}function Rf(a){a=a|0;Pf(a);return}function Sf(a){a=a|0;var b=0;b=a+24|0;a=c[b>>2]|0;c[b>>2]=0;return a|0}function Tf(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0;Pf(a);g=a+24|0;c[g>>2]=0;c[a>>2]=b;c[a+4>>2]=d;c[a+8>>2]=e;c[a+12>>2]=0;c[a+16>>2]=f;c[a+20>>2]=0;a:do switch(e|0){case 16:case 8:{f=(S(S(e,f)|0,b)|0)/8|0;b=pk(f)|0;c[g>>2]=b;if(b)if((e|0)==8){il(b|0,-128,f|0)|0;b=1;break a}else{il(b|0,0,f|0)|0;b=1;break a}else b=0;break}default:b=0}while(0);return b|0}function Uf(e,f){e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;g=c[e>>2]|0;h=S((c[e+16>>2]|0)+(c[e+12>>2]|0)+(c[e+20>>2]|0)|0,g)|0;i=c[e+8>>2]|0;h=S(h,i)|0;l=(h|0)/8|0;n=e+24|0;m=c[n>>2]|0;a:do if(m)if((g|0)!=(f|0)){b:do if((f|0)==2){h=l<<1;j=pk(h)|0;if(!j){g=0;break a}switch(i|0){case 8:{g=0;i=0;while(1){if((g|0)>=(l|0)){i=j;break b}k=a[m+g>>0]|0;a[j+i>>0]=k;a[j+(i|1)>>0]=k;g=g+1|0;i=i+2|0}}case 16:{g=0;i=0;while(1){if((g|0)>=(l|0)){i=j;break b}o=a[m+g>>0]|0;a[j+i>>0]=o;k=a[m+(g|1)>>0]|0;a[j+(i|1)>>0]=k;a[j+(i|2)>>0]=o;a[j+(i|3)>>0]=k;g=g+2|0;i=i+4|0}}default:{i=j;break b}}}else{h=(h|0)/16|0;k=pk(h)|0;if(!k){g=0;break a}switch(i|0){case 8:break;case 16:{g=0;i=0;while(1){if((g|0)>=(l|0)){i=k;break b}b[k+i>>1]=((b[m+(g|2)>>1]|0)+(b[m+g>>1]|0)|0)/2|0;g=g+4|0;i=i+2|0}}default:{i=k;break b}}g=(((l|0)>0?l:0)+1|0)>>>1;i=0;j=0;while(1){if((j|0)==(g|0)){i=k;break b}a[k+j>>0]=((d[m+(i|1)>>0]|0)+(d[m+i>>0]|0)|0)>>>1;i=i+2|0;j=j+1|0}}while(0);qk(m);g=pk(h)|0;c[n>>2]=g;if(!g){qk(i);g=0;break}else{ol(g|0,i|0,h|0)|0;qk(i);c[e>>2]=f;g=1;break}}else g=1;else g=0;while(0);return g|0}function Vf(e,f){e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;n=e+24|0;l=c[n>>2]|0;a:do if(l){m=e+8|0;g=c[m>>2]|0;if((g|0)!=(f|0)){g=S(S(c[e>>2]|0,g)|0,(c[e+16>>2]|0)+(c[e+12>>2]|0)+(c[e+20>>2]|0)|0)|0;k=(g|0)/8|0;b:do switch(f|0){case 8:{e=(g|0)/16|0;j=pk(e)|0;if(!j){g=0;break a}g=(((k|0)>0?k:0)+1|0)>>>1;h=0;i=0;while(1){if((i|0)==(g|0)){i=j;break b}a[j+i>>0]=((b[l+h>>1]|0)/256|0)+128;h=h+2|0;i=i+1|0}}case 16:{e=k<<1;i=pk(e)|0;if(!i){g=0;break a}else{g=0;h=0}while(1){if((g|0)>=(k|0))break b;b[i+h>>1]=(d[l+g>>0]<<8)+32768;g=g+1|0;h=h+2|0}}default:{g=0;break a}}while(0);qk(l);g=pk(e)|0;c[n>>2]=g;if(!g){qk(i);g=0;break}else{ol(g|0,i|0,e|0)|0;qk(i);c[m>>2]=f;g=1;break}}else g=1}else g=0;while(0);return g|0}function Wf(d,e){d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0.0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0.0,x=0;v=l;l=l+16|0;s=v+8|0;t=v+4|0;u=v;c[s>>2]=0;c[t>>2]=0;c[u>>2]=0;o=d+24|0;m=c[o>>2]|0;if(m){r=d+4|0;f=c[r>>2]|0;if((f|0)==(e|0))d=1;else{q=d+12|0;h=c[d>>2]|0;x=S(h,c[q>>2]|0)|0;i=c[d+8>>2]|0;x=(S(x,i)|0)/8|0;p=d+16|0;g=S(i,h)|0;j=(S(g,c[p>>2]|0)|0)/8|0;n=d+20|0;k=+(e|0);w=+(f|0);d=~~((w+k*+(x|0)+-1.0)/w);f=~~((w+k*+(j|0)+-1.0)/w);g=~~((w+k*+((S(g,c[n>>2]|0)|0)/8|0|0)+-1.0)/w);j=f+d+g|0;a:do if((h|0)==2&(i|0)==16){c[q>>2]=(d|0)/4|0;c[p>>2]=(f|0)/4|0;c[n>>2]=(g|0)/4|0;h=(j|0)/4|0;d=h<<2;if(Xf(u,d)|0){f=c[u>>2]|0;g=0;while(1){if((g|0)>=(h|0)){h=0;i=0;g=17;break a}c[f+(g<<2)>>2]=c[m+(~~(+(g|0)*+(c[r>>2]|0)/k)<<2)>>2];g=g+1|0}}else g=25}else if((h|0)==1&(i|0)==8){c[q>>2]=d;c[p>>2]=f;c[n>>2]=g;if(!(Xf(s,j)|0)){g=25;break}g=c[s>>2]|0;d=0;while(1){if((d|0)>=(j|0)){f=0;h=0;i=g;d=j;g=17;break a}a[g+d>>0]=a[m+~~(+(d|0)*+(c[r>>2]|0)/k)>>0]|0;d=d+1|0}}else{c[q>>2]=(d|0)/2|0;c[p>>2]=(f|0)/2|0;c[n>>2]=(g|0)/2|0;g=(j|0)/2|0;d=g<<1;if(!(Xf(t,d)|0)){g=25;break}h=c[t>>2]|0;f=0;while(1){if((f|0)>=(g|0)){f=0;i=0;g=17;break a}b[h+(f<<1)>>1]=b[m+(~~(+(f|0)*+(c[r>>2]|0)/k)<<1)>>1]|0;f=f+1|0}}while(0);b:do if((g|0)==17){Yf(o);if(Xf(o,d)|0){do if(!f){if(h|0){ol(c[o>>2]|0,h|0,d|0)|0;break}if(!i){g=25;break b}ol(c[o>>2]|0,i|0,d|0)|0}else ol(c[o>>2]|0,f|0,d|0)|0;while(0);c[r>>2]=e;d=1}else g=25}while(0);if((g|0)==25){Yf(o);c[q>>2]=0;c[p>>2]=0;c[n>>2]=0;d=0}Yf(t);Yf(s);Yf(u)}}else d=0;l=v;return d|0}function Xf(a,b){a=a|0;b=b|0;var d=0;d=pk(b)|0;c[a>>2]=d;if(!d)d=0;else{il(d|0,0,b|0)|0;d=1}return d|0}function Yf(a){a=a|0;var b=0;b=c[a>>2]|0;if(b|0){qk(b);c[a>>2]=0}return}function Zf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if(Uf(a,b)|0?Vf(a,d)|0:0)d=Wf(a,c)|0;else d=0;return d|0}function _f(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;e=a+24|0;if(c[e>>2]|0){d=a+8|0;f=a+16|0;if(Tf(b,c[a>>2]|0,c[a+4>>2]|0,c[d>>2]|0,c[f>>2]|0)|0){a=S((c[f>>2]|0)+(c[a+12>>2]|0)+(c[a+20>>2]|0)|0,c[a>>2]|0)|0;ol(c[b+24>>2]|0,c[e>>2]|0,(S(a,c[d>>2]|0)|0)/8|0|0)|0;d=1}else d=0}else{Pf(b);d=1}return d|0}function $f(a){a=a|0;return c[a+16>>2]|0}function ag(a){a=a|0;return c[a+12>>2]|0}function bg(a){a=a|0;return c[a+20>>2]|0}function cg(a){a=a|0;return c[a+24>>2]|0}function dg(a){a=a|0;var b=0;b=S((c[a+16>>2]|0)+(c[a+12>>2]|0)+(c[a+20>>2]|0)|0,c[a>>2]|0)|0;return (S(b,c[a+8>>2]|0)|0)/8|0|0}function eg(b){b=b|0;var d=0;d=0;while(1){if((d|0)==2)break;c[b+28+(d<<2)>>2]=0;d=d+1|0}c[b+20>>2]=0;a[b>>0]=1;return}function fg(a){a=a|0;gg(a);return}function gg(a){a=a|0;var b=0,d=0,e=0;e=0;while(1){if((e|0)==2)break;d=a+28+(e<<2)|0;b=c[d>>2]|0;if(b|0)qk(b);c[d>>2]=0;e=e+1|0}c[a+20>>2]=0;return}function hg(a,b,d,e,f){a=a|0;b=b|0;d=+d;e=e|0;f=f|0;var h=0.0,i=0.0;gg(a);h=+g[a+16>>2];a:do if(h!=0.0?(i=+g[a+12>>2],i!=0.0):0){c[a+24>>2]=0;c[a+36>>2]=~~i;switch(c[a+4>>2]|0){case 0:{f=a+20|0;c[f>>2]=~~(+(e*60|0)/d/h);break}case 1:{f=a+20|0;c[f>>2]=~~(+(S(b*60|0,e)|0)/d/h);break}case 2:{f=a+20|0;c[f>>2]=~~(+(e|0)/h);break}default:f=a+20|0}b=0;while(1){if((b|0)>=2){f=1;break a}e=pk(c[f>>2]<<2)|0;c[a+28+(b<<2)>>2]=e;if(!e)break;il(e|0,0,c[f>>2]<<2|0)|0;b=b+1|0}gg(a);f=0}else f=1;while(0);return f|0}function ig(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if(c[b+20>>2]|0){f=b+24|0;d=b+28+(d<<2)|0;if(!(a[b>>0]|0)){g=c[d>>2]|0;f=c[f>>2]|0;d=b+8|0}else{g=c[d>>2]|0;f=c[f>>2]|0;h=(S(c[b+36>>2]|0,c[g+(f<<2)>>2]|0)|0)/100|0;d=b+8|0;b=e+(c[d>>2]<<2)|0;c[b>>2]=(c[b>>2]|0)+h}c[g+(f<<2)>>2]=c[e+(c[d>>2]<<2)>>2]}return}function jg(a){a=a|0;var b=0,d=0;b=c[a+20>>2]|0;if(!b)return;else{a=a+24|0;d=(c[a>>2]|0)+1|0;c[a>>2]=(d|0)<(b|0)?d:0;return}}function kg(a){a=a|0;var b=0,d=0;b=a+20|0;a:do if(c[b>>2]|0){d=0;while(1){if((d|0)==2)break a;il(c[a+28+(d<<2)>>2]|0,0,c[b>>2]<<2|0)|0;d=d+1|0}}while(0);return}function lg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;h=l;l=l+16|0;g=h+4|0;c[g>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;do if(jj(d,h,4,1)|0?jj(d,g,12,1)|0:0){d=c[g>>2]|0;f=d>>>16;if((d&65535)>2){a[e>>0]=1;d=0;break}else{c[b+4>>2]=d&65535;c[b+16>>2]=c[g+8>>2];c[b+12>>2]=c[g+4>>2];c[b+8>>2]=(f&65535)>6?0:f;d=1;break}}else d=0;while(0);l=h;return d|0}function mg(a){a=a|0;var b=0,d=0;d=a+4|0;b=c[d>>2]|0;if(b|0)qk(b);c[d>>2]=0;c[a+8>>2]=0;c[a>>2]=0;return}function ng(a){a=a|0;c[a+4>>2]=0;c[a+8>>2]=0;c[a>>2]=0;return}function og(a){a=a|0;mg(a);return}function pg(a){a=a|0;var b=0;b=c[a+4>>2]|0;if(b|0)il(b|0,0,(c[a>>2]|0)*20|0)|0;c[a+8>>2]=0;return}function qg(a,b){a=a|0;b=b|0;var d=0,e=0;mg(a);e=b*20|0;d=pk(e)|0;c[a+4>>2]=d;if(!d)d=0;else{il(d|0,0,e|0)|0;c[a>>2]=b;d=1}return d|0}function rg(b){b=b|0;var d=0,e=0;e=0;b=b+8|0;while(1){d=c[b>>2]|0;if(!d)break;switch(a[d>>0]|0){case 1:case 6:{b=(c[d+4>>2]|0)+(c[d+8>>2]|0)|0;break}default:b=c[d+8>>2]|0}e=(b|0)>(e|0)?b:e;b=d+16|0}return e|0}function sg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;a:do if(!(c[b+4>>2]|0))f=0;else{f=0;b=b+8|0;while(1){b=c[b>>2]|0;if(!b)break a;if((a[b+1>>0]|0)==d<<24>>24)f=((a[b>>0]|0)==e<<24>>24&1)+f|0;b=b+16|0}}while(0);return f|0}function tg(a){a=a|0;if(!(c[a+4>>2]|0))a=0;else a=c[a+8>>2]|0;return a|0}function ug(b,d,e,f,g,h,i,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;if(!e)c[b+8>>2]=d;else c[e+16>>2]=d;if(f|0)c[f+12>>2]=d;c[d+16>>2]=f;c[d+12>>2]=e;c[d+8>>2]=g;a[d>>0]=i;a[d+1>>0]=h;c[d+4>>2]=j;return}function vg(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;g=c[d+12>>2]|0;f=d+16|0;e=c[f>>2]|0;if(!g)c[b+8>>2]=e;else{c[g+16>>2]=e;e=c[f>>2]|0}if(e|0)c[e+12>>2]=g;a[d>>0]=0;return}function wg(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=+f;return xg(a,b,d,e,(g[j>>2]=f,c[j>>2]|0))|0}function xg(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;i=c[b+4>>2]|0;a:do if(i){j=c[b>>2]|0;k=0;while(1){if((k|0)>=(j|0)){h=0;break a}h=i+(k*20|0)|0;if(!(a[h>>0]|0))break;else k=k+1|0}if(h){j=c[b+8>>2]|0;b:do if(j){i=c[j+8>>2]|0;if((i|0)<=(d|0)){m=j;while(1){if((i|0)==(d|0))break;if((i|0)>(d|0)){p=19;break}j=c[m+16>>2]|0;if(!j){j=0;i=m;break b}i=c[j+8>>2]|0;m=j}if((p|0)==19){j=m;i=c[m+12>>2]|0;break}l=59300+((f&255)<<2)|0;k=d;i=m;while(1){if((k|0)!=(d|0)){p=11;break}j=a[i>>0]|0;if(j<<24>>24==f<<24>>24?(a[i+1>>0]|0)==e<<24>>24:0){p=13;break}if((c[l>>2]|0)<(c[59300+((j&255)<<2)>>2]|0)){p=15;break}j=c[i+16>>2]|0;if(!j){j=0;break b}k=c[j+8>>2]|0;i=j}if((p|0)==11){j=i;i=c[i+12>>2]|0;break}else if((p|0)==13){m=c[i+12>>2]|0;j=c[i+16>>2]|0;a[i>>0]=0;i=m;break}else if((p|0)==15){j=i;i=c[i+12>>2]|0;break}}else i=0}else{j=0;i=0}while(0);ug(b,h,i,j,d,e,f,g);switch(f<<24>>24){case 1:case 6:{i=h;break}default:{h=1;break a}}while(1){i=c[i+12>>2]|0;if(!i)break;if((a[i+1>>0]|0)!=e<<24>>24)continue;if((a[i>>0]|0)==f<<24>>24){p=26;break}}if((p|0)==26?(n=c[i+8>>2]|0,o=i+4|0,((c[o>>2]|0)+n|0)>(d|0)):0)c[o>>2]=d-n;switch(f<<24>>24){case 1:case 6:break;default:{h=1;break a}}i=g+d|0;while(1){h=c[h+16>>2]|0;if(!h){h=1;break a}if((c[h+8>>2]|0)>=(i|0)){h=1;break a}if((a[h+1>>0]|0)!=e<<24>>24)continue;if((a[h>>0]|0)!=f<<24>>24)continue;vg(b,h)}}else h=0}else h=0;while(0);return h|0}function yg(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0;a:do if(!(c[b+4>>2]|0))i=0;else{switch(g<<24>>24){case 5:{k=128;l=0;break}case 1:{k=120;l=120;break}case 2:{k=49151;l=0;break}case 3:{k=128;l=0;break}case 15:{k=128;l=0;break}case 4:{k=128;l=0;break}default:{k=0;l=0}}j=(e|0)==-1;i=0;b=b+8|0;while(1){b=c[b>>2]|0;if(!b)break a;if(((a[b+1>>0]|0)==f<<24>>24?(a[b>>0]|0)==g<<24>>24:0)?(m=c[b+8>>2]|0,(m|0)>=(d|0)&(j|(m|0)<(e|0))):0){m=b+4|0;n=(c[m>>2]|0)+h|0;n=(n|0)<(l|0)?l:n;c[m>>2]=(n|0)>(k|0)?k:n;i=i+1|0}b=b+16|0}}while(0);return i|0}function zg(a){a=a|0;if(!(c[a+4>>2]|0))a=0;else{pg(a);c[a+12>>2]=0;a=1}return a|0}function Ag(b,d){b=b|0;d=d|0;var e=0,f=0;e=c[b+4>>2]|0;if(a[e>>0]|0)c[b+8>>2]=e;a:do if(d){d=c[b>>2]|0;b=1;while(1){if((b|0)>=(d|0))break a;if(!(a[e+(b*20|0)>>0]|0))break a;f=b+-1|0;c[e+(b*20|0)+12>>2]=e+(f*20|0);c[e+(f*20|0)+16>>2]=e+(b*20|0);b=b+1|0}}while(0);return}function Bg(a){a=a|0;if(!(c[a+4>>2]|0))a=0;else{pg(a);c[a+12>>2]=0;c[a+16>>2]=0;a=1}return a|0}function Cg(a){a=a|0;c[a+16>>2]=0;return}function Dg(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0;h=b+12|0;l=c[h>>2]|0;c[h>>2]=l+1;l=(c[b+4>>2]|0)+(l*20|0)|0;h=c[b+8>>2]|0;a:do if(h)if((c[h+8>>2]|0)<=(d|0)){i=c[b+16>>2]|0;i=(i|0)==0?h:i;while(1){h=c[i+8>>2]|0;if((h|0)==(d|0))break;if((h|0)>(d|0)){j=15;break}h=c[i+16>>2]|0;if(!h){h=0;break a}else i=h}if((j|0)==15){h=i;i=c[i+12>>2]|0;break}k=59300+((f&255)<<2)|0;j=d;while(1){if((j|0)!=(d|0)){j=7;break}h=a[i>>0]|0;if(h<<24>>24==f<<24>>24?(a[i+1>>0]|0)==e<<24>>24:0){j=9;break}if((c[k>>2]|0)<(c[59300+((h&255)<<2)>>2]|0)){j=11;break}h=c[i+16>>2]|0;if(!h){h=0;break a}j=c[h+8>>2]|0;i=h}if((j|0)==7){h=i;i=c[i+12>>2]|0;break}else if((j|0)==9){k=c[i+12>>2]|0;h=c[i+16>>2]|0;a[i>>0]=0;i=k;break}else if((j|0)==11){h=i;i=c[i+12>>2]|0;break}}else i=0;else{h=0;i=0}while(0);ug(b,l,i,h,d,e,f,g);c[b+16>>2]=l;return}function Eg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;n=l;l=l+32|0;i=n+8|0;h=n+4|0;k=n+17|0;j=n+16|0;m=n;if(jj(d,n+12|0,4,1)|0?jj(d,i,4,1)|0:0){g=b+12|0;e=b+4|0;b=0;f=0;while(1){if((f|0)>=(c[i>>2]|0)){e=1;break}if(!(kj(d,h)|0)){e=0;break}if(!(jj(d,k,1,1)|0)){e=0;break}if(!(jj(d,j,1,1)|0)){e=0;break}if(!(kj(d,m)|0)){e=0;break}o=(c[h>>2]|0)+b|0;c[h>>2]=o;t=a[k>>0]|0;s=a[j>>0]|0;r=c[m>>2]|0;p=c[g>>2]|0;q=c[e>>2]|0;c[q+(p*20|0)+8>>2]=o;a[q+(p*20|0)+1>>0]=t;a[q+(p*20|0)>>0]=s;c[q+(p*20|0)+4>>2]=r;c[g>>2]=p+1;b=o;f=f+1|0}}else e=0;l=n;return e|0}function Fg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;k=l;l=l+32|0;f=k+8|0;d=k+4|0;h=k+17|0;g=k+16|0;i=k;if(jj(b,k+12|0,4,1)|0?jj(b,f,4,1)|0:0){e=0;while(1){a=c[f>>2]|0;if((e|0)>=(a|0)){j=10;break}if(!(kj(b,d)|0)){a=0;break}if(!(jj(b,h,1,1)|0)){a=0;break}if(!(jj(b,g,1,1)|0)){a=0;break}if(!(kj(b,i)|0)){a=0;break}e=e+1|0}if((j|0)==10)a=(e|0)==(a|0)?a:0}else a=0;l=k;return a|0}function Gg(d,f,g,h,i){d=d|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,m=0,n=0,o=0,p=0,q=0;p=l;l=l+32|0;n=p+12|0;k=p+8|0;o=p+4|0;do if(jj(f,p,4,1)|0?jj(f,n,12,1)|0:0){j=c[n+4>>2]|0;if((j&65535)<<16>>16!=2){a[i>>0]=1;j=0;break}m=n+2|0;if((e[m>>1]|0)>15){a[i>>0]=1;j=0;break}if(!(j>>>0<65536|h^1)){a[i>>0]=1;j=0;break}i=n+8|0;j=0;h=0;while(1){if((h|0)>=(c[i>>2]|0))break;if(!(kj(f,k)|0))break;if(!(kj(f,o)|0))break;j=(c[k>>2]|0)+j|0;c[k>>2]=j;q=c[n>>2]|0;Dg(d,j,q&255,q>>>16&255,c[o>>2]|0);a:do if(g){switch(b[m>>1]|0){case 1:case 6:break;default:break a}j=(c[o>>2]|0)+j|0}while(0);h=h+1|0}if((h|0)==(c[i>>2]|0)){c[d+16>>2]=0;j=1}else j=0}else j=0;while(0);l=p;return j|0}function Hg(a,d){a=a|0;d=d|0;var e=0,f=0,g=0;g=l;l=l+32|0;a=g+8|0;f=g+4|0;if((jj(d,g,4,1)|0?jj(d,a,12,1)|0:0)?(b[a+4>>1]|0)==2:0){e=a+8|0;a=0;while(1){if((a|0)>=(c[e>>2]|0))break;if(!(kj(d,f)|0))break;if(!(kj(d,f)|0))break;a=a+1|0}d=c[e>>2]|0;a=(a|0)==(d|0)?d:0}else a=0;l=g;return a|0}function Ig(a){a=a|0;c[a>>2]=4;g[a+4>>2]=120.0;c[a+8>>2]=480;c[a+12>>2]=1;c[a+16>>2]=0;c[a+20>>2]=0;return}function Jg(a){a=a|0;c[a>>2]=4;g[a+4>>2]=120.0;c[a+8>>2]=480;c[a+12>>2]=1;c[a+16>>2]=0;c[a+20>>2]=0;return}function Kg(a){a=a|0;return}function Lg(a,b,d,e){a=a|0;b=b|0;d=+d;e=e|0;c[a>>2]=b;g[a+4>>2]=d;c[a+8>>2]=e;return}function Mg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;if(b|0)c[b>>2]=c[a>>2];if(d|0)c[d>>2]=c[a+4>>2];if(e|0)c[e>>2]=c[a+8>>2];return}function Ng(a){a=a|0;return c[a>>2]|0}function Og(a){a=a|0;return +(+g[a+4>>2])}function Pg(a){a=a|0;return c[a+8>>2]|0}function Qg(a){a=a|0;return c[a+16>>2]|0}function Rg(a){a=a|0;var b=0;b=S(c[a+8>>2]|0,c[a+20>>2]|0)|0;return S(b,c[a>>2]|0)|0}function Sg(a){a=a|0;var b=0;b=c[a+20>>2]|0;if(!b)b=c[a+12>>2]|0;return b|0}function Tg(a,b){a=a|0;b=b|0;var d=0,e=0;e=c[a+8>>2]|0;d=c[a>>2]|0;d=(((b+-1+e|0)/(e|0)|0)+-1+d|0)/(d|0)|0;e=a+12|0;b=c[e>>2]|0;if((b|0)>(d|0))d=b;else c[e>>2]=d;b=a+16|0;if((c[b>>2]|0)>=(d|0))c[b>>2]=0;b=a+20|0;if((c[b>>2]|0)>(d|0))c[b>>2]=d;return}function Ug(d,e,f){d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,m=0,n=0;n=l;l=l+32|0;g=n+16|0;h=n+18|0;i=n+12|0;k=n+8|0;j=n+4|0;m=n;do if(jj(e,m,4,1)|0){if((c[m>>2]|0)!=15){a[f>>0]=1;g=0;break}if((((jj(e,g,2,1)|0?jj(e,h,1,1)|0:0)?jj(e,i,4,1)|0:0)?jj(e,k,4,1)|0:0)?jj(e,j,4,1)|0:0){m=b[g>>1]|0;c[d+8>>2]=m;g=a[h>>0]|0;c[d>>2]=g;c[d+4>>2]=c[i>>2];g=S(m,g)|0;m=(c[k>>2]|0)/(g|0)|0;c[d+16>>2]=(m|0)<0?0:m;g=(c[j>>2]|0)/(g|0)|0;c[d+20>>2]=(g|0)<0?0:g;g=1}else g=0}else g=0;while(0);l=n;return g|0}function Vg(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+32|0;a=d;e=jj(b,a,4,1)|0;if(e&(c[a>>2]|0)==15){a=jj(b,d+4|0,1,15)|0;a=a?5:0}else a=0;l=d;return a|0}function Wg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,h=0,i=0,j=0.0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;t=l;l=l+32|0;h=t;q=t+16|0;p=t+12|0;r=t+8|0;o=h;c[o>>2]=0;c[o+4>>2]=0;a:do if(jj(d,t+20|0,4,1)|0?jj(d,h,8,1)|0:0){f=c[h>>2]|0;if((f&65535)<<16>>16!=3){a[e>>0]=1;f=0;break}if(f>>>0>=65536){a[e>>0]=1;f=0;break}o=h+4|0;f=0;h=480;i=4;j=120.0;n=0;k=0;m=0;b:while(1){if((n|0)>=(c[o>>2]|0))break;if(!(kj(d,q)|0))break;if(!(kj(d,p)|0))break;if(!(kj(d,r)|0))break;f=(c[p>>2]|0)+f|0;c[p>>2]=f;switch(c[q>>2]|0){case 7:{if(!f)h=c[r>>2]|0;else{f=0;break a}break}case 8:{if(!f)j=+g[r>>2];else{f=0;break a}break}case 9:{if(!f)i=c[r>>2]|0;else{f=0;break a}break}case 10:{if(!(c[r>>2]|0))m=f;else{f=0;break a}break}case 11:{if(!(c[r>>2]|0))k=f;else{f=0;break a}break}default:{s=18;break b}}n=n+1|0}if((s|0)==18){a[e>>0]=1;f=0;break}if((n|0)==(c[o>>2]|0)){c[b>>2]=i;g[b+4>>2]=j;c[b+8>>2]=h;f=S(i,h)|0;s=(m|0)/(f|0)|0;c[b+16>>2]=(s|0)<0?0:s;f=(k|0)/(f|0)|0;c[b+20>>2]=(f|0)<0?0:f;f=1}else f=0}else f=0;while(0);l=t;return f|0}function Xg(a,d){a=a|0;d=d|0;var e=0,f=0,g=0,h=0;h=l;l=l+16|0;a=h;g=h+8|0;f=a;c[f>>2]=0;c[f+4>>2]=0;a:do if((jj(d,h+12|0,4,1)|0?jj(d,a,8,1)|0:0)?(b[a>>1]|0)==3:0){f=a+4|0;e=0;while(1){a=c[f>>2]|0;if((e|0)>=(a|0))break a;if(!(kj(d,g)|0)){a=0;break a}if(!(kj(d,g)|0)){a=0;break a}if(kj(d,g)|0)e=e+1|0;else{a=0;break}}}else a=0;while(0);l=h;return a|0}function Yg(b){b=b|0;a[b>>0]=1;return}function Zg(a){a=a|0;return}function _g(a){a=a|0;c[a+16>>2]=~~((100.0-+g[a+8>>2])*32767.0/100.0);return}function $g(b,d){b=b|0;d=d|0;var e=0,f=0,h=0;if(a[b>>0]|0){d=d+(c[b+4>>2]<<2)|0;e=c[d>>2]|0;h=c[b+16>>2]|0;f=0-h|0;c[d>>2]=~~(+g[b+12>>2]*+(((e|0)>(h|0)?h:(e|0)<(f|0)?f:e)|0))}return}function ah(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,h=0.0,i=0;i=l;l=l+32|0;d=i+8|0;c[d>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;c[d+12>>2]=0;if(((((jj(b,i,4,1)|0?jj(b,d,16,1)|0:0)?(b=c[d>>2]|0,e=b>>>16,(b&65535)<<16>>16==0):0)?!(+g[d+12>>2]!=0.0):0)?(f=+g[d+4>>2],!(f>99.9000015258789|f<50.0)):0)?(h=+g[d+8>>2],!(h>8.0|h<.10000000149011612)):0){g[a+8>>2]=f;g[a+12>>2]=h;c[a+4>>2]=e;d=1}else d=0;l=i;return d|0}function bh(a){a=a|0;var b=0,d=0;c[a>>2]=0;c[a+152>>2]=0;c[a+156>>2]=0;c[a+160>>2]=0;b=a+16|0;d=b+52|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Bh(a);return}function ch(a){a=a|0;var b=0,d=0,e=0,f=0;Ch(a);d=a+152|0;b=c[d>>2]|0;if(b|0){Rh(b);wk(b);c[d>>2]=0}d=a+156|0;b=c[d>>2]|0;if(b|0){wk(b);c[d>>2]=0}d=a+160|0;b=c[d>>2]|0;if(b|0){og(b);wk(b);c[d>>2]=0}d=a+16|0;b=c[d>>2]|0;if(b|0){wf(b);wk(b);c[d>>2]=0}e=a+28|0;if(c[e>>2]|0){d=a+24|0;f=0;while(1){if((f|0)>=(c[d>>2]|0))break;b=c[(c[e>>2]|0)+(f<<2)>>2]|0;if(b|0){fg(b);wk(b);c[(c[e>>2]|0)+(f<<2)>>2]=0}f=f+1|0}qk(c[e>>2]|0)}e=a+40|0;if(c[e>>2]|0){d=a+36|0;f=0;while(1){if((f|0)>=(c[d>>2]|0))break;b=c[(c[e>>2]|0)+(f<<2)>>2]|0;if(b|0){wk(b);c[(c[e>>2]|0)+(f<<2)>>2]=0}f=f+1|0}qk(c[e>>2]|0)}e=a+52|0;if(c[e>>2]|0){d=a+48|0;f=0;while(1){if((f|0)>=(c[d>>2]|0))break;b=c[(c[e>>2]|0)+(f<<2)>>2]|0;if(b|0){ui(b);wk(b);c[(c[e>>2]|0)+(f<<2)>>2]=0}f=f+1|0}qk(c[e>>2]|0)}f=a+64|0;if(c[f>>2]|0){d=a+60|0;e=0;while(1){if((e|0)>=(c[d>>2]|0))break;b=c[(c[f>>2]|0)+(e<<2)>>2]|0;if(b|0){wk(b);c[(c[f>>2]|0)+(e<<2)>>2]=0}e=e+1|0}qk(c[f>>2]|0)}return}function dh(a){a=a|0;Ha(a|0)|0;Sk()}function eh(a,b){a=a|0;b=b|0;var d=0,e=0;e=vk(8)|0;Qh(e);c[a+152>>2]=e;e=vk(28)|0;Ig(e);c[a+156>>2]=e;e=vk(20)|0;ng(e);d=a+160|0;c[d>>2]=e;e=vk(84)|0;vf(e);c[a+16>>2]=e;do if(zf(e)|0){if(b?!(qg(c[d>>2]|0,5e5)|0):0){c[a>>2]=2;break}b=pk(16)|0;c[a+28>>2]=b;if(!b){c[a>>2]=3;break};c[b>>2]=0;c[b+4>>2]=0;c[b+8>>2]=0;c[b+12>>2]=0;c[a+20>>2]=4;b=pk(8)|0;c[a+40>>2]=b;if(!b){c[a>>2]=3;break}c[b>>2]=0;c[b+4>>2]=0;c[a+32>>2]=2;b=pk(400)|0;c[a+52>>2]=b;if(!b){c[a>>2]=3;break}il(b|0,0,400)|0;c[a+44>>2]=100;b=pk(200)|0;c[a+64>>2]=b;if(!b){c[a>>2]=3;break}il(b|0,0,200)|0;c[a+56>>2]=50;c[a+68>>2]=7;if(!(Dh(a)|0))c[a>>2]=3}else c[a>>2]=1;while(0);return 1}function fh(a){a=a|0;var b=0,d=0,e=0,f=0,g=0.0,h=0,i=0,j=0;d=a+156|0;f=Ng(c[d>>2]|0)|0;g=+Og(c[d>>2]|0);d=a+24|0;e=a+28|0;j=a+8|0;b=a+12|0;h=0;while(1){if((h|0)>=(c[d>>2]|0)){i=3;break}if(hg(c[(c[e>>2]|0)+(h<<2)>>2]|0,f,g,c[j>>2]|0,c[b>>2]|0)|0)h=h+1|0;else{b=0;break}}a:do if((i|0)==3){b=a+36|0;d=a+40|0;e=0;while(1){if((e|0)>=(c[b>>2]|0))break;_g(c[(c[d>>2]|0)+(e<<2)>>2]|0);e=e+1|0}e=a+48|0;f=a+52|0;b=a+16|0;d=0;while(1){if((d|0)>=(c[e>>2]|0)){b=1;break a}if(Ii(c[(c[f>>2]|0)+(d<<2)>>2]|0,c[b>>2]|0,c[j>>2]|0)|0)d=d+1|0;else{b=0;break}}}while(0);return b|0}function gh(a){a=a|0;var b=0,d=0,e=0;b=a+24|0;d=a+28|0;e=0;while(1){if((e|0)>=(c[b>>2]|0))break;kg(c[(c[d>>2]|0)+(e<<2)>>2]|0);e=e+1|0}e=a+60|0;b=a+64|0;d=0;while(1){if((d|0)>=(c[e>>2]|0))break;Yh(c[(c[b>>2]|0)+(d<<2)>>2]|0);d=d+1|0}return}function hh(a,b){a=a|0;b=b|0;if((b|0)>=0?(c[a+48>>2]|0)>(b|0):0)b=c[(c[a+52>>2]|0)+(b<<2)>>2]|0;else b=0;return b|0}function ih(a,b){a=a|0;b=b|0;if((b|0)>=0?(c[a+60>>2]|0)>(b|0):0)b=c[(c[a+64>>2]|0)+(b<<2)>>2]|0;else b=0;return b|0}function jh(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;c[a+4>>2]=b;c[a+8>>2]=d;c[a+12>>2]=e;return}function kh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=a+152|0;Oh(c[h>>2]|0,65420)|0;Lh(c[h>>2]|0,65420)|0;h=a+160|0;pg(c[h>>2]|0);e=a+24|0;f=a+28|0;g=0;while(1){if((g|0)>=(c[e>>2]|0))break;d=c[(c[f>>2]|0)+(g<<2)>>2]|0;if(d|0){fg(d);wk(d);c[(c[f>>2]|0)+(g<<2)>>2]=0}g=g+1|0}c[e>>2]=0;c[a+36>>2]=0;e=a+48|0;f=a+52|0;g=0;while(1){if((g|0)>=(c[e>>2]|0))break;d=c[(c[f>>2]|0)+(g<<2)>>2]|0;if(d|0){ui(d);wk(d);c[(c[f>>2]|0)+(g<<2)>>2]=0}g=g+1|0}c[e>>2]=0;e=a+60|0;f=a+64|0;g=0;while(1){if((g|0)>=(c[e>>2]|0))break;d=c[(c[f>>2]|0)+(g<<2)>>2]|0;if(d|0){wk(d);c[(c[f>>2]|0)+(g<<2)>>2]=0}g=g+1|0}c[e>>2]=0;Jg(c[a+156>>2]|0);d=c[h>>2]|0;if(b)mg(d);else pg(d);return}function lh(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;g=b+28|0;do if(c[g>>2]|0){f=b+24|0;if((c[f>>2]|0)>=(c[b+20>>2]|0)){a[e>>0]=1;b=0;break}b=vk(40)|0;eg(b);if(lg(b,d,e)|0){e=c[f>>2]|0;c[(c[g>>2]|0)+(e<<2)>>2]=b;c[f>>2]=e+1;b=1;break}else{fg(b);wk(b);b=0;break}}else b=0;while(0);return b|0}function mh(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;g=b+40|0;do if(c[g>>2]|0){f=b+36|0;if((c[f>>2]|0)>=(c[b+32>>2]|0)){a[e>>0]=1;b=0;break}b=vk(20)|0;Yg(b);if(ah(b,d,e)|0){e=c[f>>2]|0;c[(c[g>>2]|0)+(e<<2)>>2]=b;c[f>>2]=e+1;b=1;break}else{wk(b);b=0;break}}else b=0;while(0);return b|0}function nh(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;h=b+52|0;do if(c[h>>2]|0){g=b+48|0;if((c[g>>2]|0)>=(c[b+44>>2]|0)){a[e>>0]=1;b=0;break}b=vk(44)|0;ti(b);switch(f|0){case 1:{if(Li(b,d,e)|0)d=9;else d=10;break}case 2:{if(Ni(b,d,e)|0)d=9;else d=10;break}case 3:{if(Mi(b,d,e)|0)d=9;else d=10;break}case 4:{if(Oi(b,d,e)|0)d=9;else d=10;break}default:d=10}if((d|0)==9){f=c[g>>2]|0;c[(c[h>>2]|0)+(f<<2)>>2]=b;c[g>>2]=f+1;b=1;break}else if((d|0)==10){ui(b);wk(b);b=0;break}}else b=0;while(0);return b|0}function oh(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;k=l;l=l+16|0;g=k;i=b+64|0;do if(!(c[i>>2]|0))d=0;else{h=b+60|0;if((c[h>>2]|0)>=(c[b+56>>2]|0)){a[e>>0]=1;d=0;break}j=vk(688)|0;Vh(j);c[g>>2]=0;switch(f|0){case 1:{if(ri(j,d,g)|0)e=7;else e=10;break}case 3:{if(si(j,d,e,g)|0)e=7;else e=10;break}default:e=10}if((e|0)==7){d=c[g>>2]|0;e=c[b+68>>2]|0;if((d|0)>=(e|0)){d=e+-1|0;c[g>>2]=d}b=b+160|0;Dg(c[b>>2]|0,0,c[h>>2]&255,13,d);Cg(c[b>>2]|0);d=c[h>>2]|0;Dg(c[b>>2]|0,0,d&255,12,d);Cg(c[b>>2]|0);d=c[h>>2]|0;c[(c[i>>2]|0)+(d<<2)>>2]=j;c[h>>2]=d+1;d=1}else if((e|0)==10){wk(j);d=0}}while(0);l=k;return d|0}function ph(d,f,g){d=d|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,m=0;m=l;l=l+48|0;j=m+4|0;h=m;k=m+24|0;do if(jj(f,h,4,1)|0){if((c[h>>2]|0)!=20){a[g>>0]=1;f=0;break}if(jj(f,j,20,1)|0){if(b[j+2>>1]|0){a[g>>0]=1;f=0;break}h=e[j>>1]|0;if((h|0)<(c[d+48>>2]|0)){i=k;f=j+4|0;g=i+16|0;do{a[i>>0]=a[f>>0]|0;i=i+1|0;f=f+1|0}while((i|0)<(g|0));a[k+16>>0]=0;Di(c[(c[d+52>>2]|0)+(h<<2)>>2]|0,k);f=1}else f=0}else f=0}else f=0;while(0);l=m;return f|0}function qh(d,f,g){d=d|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,m=0;m=l;l=l+48|0;j=m+4|0;h=m;k=m+24|0;do if(jj(f,h,4,1)|0){if((c[h>>2]|0)!=20){a[g>>0]=1;f=0;break}if(jj(f,j,20,1)|0){if(b[j+2>>1]|0){a[g>>0]=1;f=0;break}h=e[j>>1]|0;if((h|0)<(c[d+60>>2]|0)){i=k;f=j+4|0;g=i+16|0;do{a[i>>0]=a[f>>0]|0;i=i+1|0;f=f+1|0}while((i|0)<(g|0));a[k+16>>0]=0;$h(c[(c[d+64>>2]|0)+(h<<2)>>2]|0,k);f=1}else f=0}else f=0}else f=0;while(0);l=m;return f|0}function rh(d,f,g){d=d|0;f=f|0;g=g|0;var h=0,i=0,j=0;j=l;l=l+16|0;h=j+4|0;i=j;do if(jj(f,i,4,1)|0){if((c[i>>2]|0)!=4){a[g>>0]=1;h=-1;break}if(jj(f,h,4,1)|0){if(b[h+2>>1]|0){a[g>>0]=1;h=-1;break}h=e[h>>1]|0;if((h|0)>(c[d+56>>2]|0)){a[g>>0]=1;h=-1}}else h=-1}else h=-1;while(0);l=j;return h|0}function sh(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0;p=l;l=l+16|0;m=p+9|0;n=p;a[m>>0]=0;e=n;f=e+9|0;do{a[e>>0]=0;e=e+1|0}while((e|0)<(f|0));f=b+64|0;e=b+60|0;j=b+156|0;h=b+160|0;k=b+152|0;a:while(1){if(!(jj(d,n,1,8)|0)){o=3;break}do switch(th(n)|0){case 1:{o=5;break a}case 6:case 23:{e=1;break a}case 10:{g=rh(b,d,m)|0;if((g|0)<0){o=10;break a}else i=0;while(1){if((i|0)>=(g|0))break;q=vk(688)|0;Vh(q);c[(c[f>>2]|0)+(i<<2)>>2]=q;i=i+1|0}c[e>>2]=g;continue a}case 11:if(Ug(c[j>>2]|0,d,m)|0)continue a;else{o=12;break a}case 12:if(Eg(c[h>>2]|0,d,m)|0)continue a;else{o=14;break a}case 13:if(nh(b,d,m,1)|0)continue a;else{o=16;break a}case 14:if(nh(b,d,m,2)|0)continue a;else{o=18;break a}case 15:if(nh(b,d,m,3)|0)continue a;else{o=20;break a}case 16:if(nh(b,d,m,4)|0)continue a;else{o=22;break a}case 17:if(lh(b,d,m)|0)continue a;else{o=24;break a}case 18:if(mh(b,d,m)|0)continue a;else{o=26;break a}case 19:if(Uh(c[k>>2]|0,d)|0)continue a;else{o=28;break a}case 20:if(Sh(c[k>>2]|0,d)|0)continue a;else{o=30;break a}case 22:if(ph(b,d,m)|0)continue a;else{o=32;break a}case 21:if(qh(b,d,m)|0)continue a;else{o=34;break a}case 8:if(Wg(c[j>>2]|0,d,m)|0)continue a;else{o=36;break a}case 9:if(Gg(c[h>>2]|0,d,0,1,m)|0)continue a;else{o=38;break a}case 7:if(oh(b,d,m,3)|0)continue a;else{o=40;break a}case 2:if(uh(b,d)|0)continue a;else{o=42;break a}case 3:if(oh(b,d,m,1)|0)continue a;else{o=44;break a}case 4:if(nh(b,d,m,1)|0)continue a;else{o=46;break a}case 5:if(Gg(c[h>>2]|0,d,1,0,m)|0)continue a;else{o=48;break a}default:{o=49;break a}}while(0)}switch(o|0){case 3:{c[b>>2]=22;e=0;break}case 5:{c[b>>2]=23;e=0;break}case 10:{c[b>>2]=24;e=0;break}case 12:{c[b>>2]=25;e=0;break}case 14:{c[b>>2]=26;e=0;break}case 16:{c[b>>2]=27;e=0;break}case 18:{c[b>>2]=28;e=0;break}case 20:{c[b>>2]=29;e=0;break}case 22:{c[b>>2]=30;e=0;break}case 24:{c[b>>2]=31;e=0;break}case 26:{c[b>>2]=32;e=0;break}case 28:{c[b>>2]=33;e=0;break}case 30:{c[b>>2]=34;e=0;break}case 32:{c[b>>2]=35;e=0;break}case 34:{c[b>>2]=36;e=0;break}case 36:{c[b>>2]=37;e=0;break}case 38:{c[b>>2]=38;e=0;break}case 40:{c[b>>2]=39;e=0;break}case 42:{c[b>>2]=40;e=0;break}case 44:{c[b>>2]=41;e=0;break}case 46:{c[b>>2]=42;e=0;break}case 48:{c[b>>2]=43;e=0;break}case 49:{c[b>>2]=44;e=0;break}}l=p;return e|0}function th(a){a=a|0;do if(Dj(a,60161,8)|0)if(Dj(a,60170,8)|0)if(Dj(a,60179,8)|0)if(Dj(a,60188,8)|0)if(Dj(a,60197,8)|0)if(Dj(a,60206,8)|0)if(Dj(a,60215,8)|0)if(Dj(a,60224,8)|0)if(Dj(a,60233,8)|0)if(Dj(a,60134,8)|0)if(Dj(a,60044,8)|0)if(Dj(a,60035,8)|0)if(Dj(a,60089,8)|0)if(Dj(a,60098,8)|0)if(Dj(a,60107,8)|0)if(Dj(a,60116,8)|0)if(Dj(a,60071,8)|0)if(Dj(a,60080,8)|0)if(!(Dj(a,60053,8)|0))a=19;else{if(!(Dj(a,60062,8)|0)){a=20;break}if(!(Dj(a,60143,8)|0)){a=21;break}if(!(Dj(a,60125,8)|0)){a=22;break}a=(Dj(a,60152,8)|0)==0;a=a?23:0}else a=18;else a=17;else a=16;else a=15;else a=14;else a=13;else a=11;else a=12;else a=10;else a=9;else a=8;else a=7;else a=6;else a=5;else a=4;else a=3;else a=2;else a=1;while(0);return a|0}function uh(b,d){b=b|0;d=d|0;var f=0,h=0,i=0,j=0,k=0,m=0,n=0.0;m=l;l=l+64|0;i=m+4|0;h=m+40|0;f=m;j=i;k=j+36|0;do{c[j>>2]=0;j=j+4|0}while((j|0)<(k|0));if(jj(d,f,4,1)|0?jj(d,i,36,1)|0:0){a[h+16>>0]=0;j=h;d=i;k=j+16|0;do{a[j>>0]=a[d>>0]|0;j=j+1|0;d=d+1|0}while((j|0)<(k|0));k=e[i+22>>1]|0;n=+g[i+16>>2];d=e[i+20>>1]|0;Oh(c[b+152>>2]|0,h)|0;Lg(c[b+156>>2]|0,k,n,d);d=1}else d=0;l=m;return d|0}function vh(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,m=0;m=l;l=l+32|0;i=m+8|0;h=m;j=i;k=j+16|0;do{a[j>>0]=0;j=j+1|0}while((j|0)<(k|0));a:do if(jj(e,i,1,16)|0){if(!(Dj(i,60242,16)|0)){c[f>>2]=0;b[g>>1]=0;h=1;break}if(!(Dj(i,60259,16)|0)){c[f>>2]=1;b[g>>1]=0;h=1;break}do if(Dj(i,60276,16)|0){if(!(Dj(i,60293,16)|0)){c[f>>2]=3;break}if(!(Dj(i,60018,16)|0)){c[f>>2]=4;break}if(!(Dj(i,60310,16)|0)){c[f>>2]=1;b[g>>1]=0;h=1;break a}if(!(Dj(i,60327,16)|0)){c[f>>2]=2;break}if(!(Dj(i,60344,16)|0)){c[f>>2]=3;break}if(!(Dj(i,60001,16)|0)){c[f>>2]=4;break}else{c[d>>2]=46;h=0;break a}}else c[f>>2]=2;while(0);if(!(jj(e,g,2,1)|0)){c[d>>2]=47;h=0;break}if(jj(e,h,2,1)|0)h=1;else{c[d>>2]=48;h=0}}else{c[d>>2]=45;h=0}while(0);l=m;return h|0}function wh(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;f=a+60|0;b=c[f>>2]|0;g=a+48|0;a:do if((b|0)>(c[g>>2]|0))a=0;else{h=a+52|0;e=a+160|0;d=0;while(1){if((d|0)>=(b|0)){a=1;break a}if((d|0)>=(c[g>>2]|0)){a=0;break a}b=(zi(c[(c[h>>2]|0)+(d<<2)>>2]|0)|0)+-17664|0;a=d&255;if(!(sg(c[e>>2]|0,a,2)|0))xg(c[e>>2]|0,0,a,2,24576)|0;yg(c[e>>2]|0,0,-1,a,2,b)|0;b=c[f>>2]|0;d=d+1|0}}while(0);return a|0}function xh(a){a=a|0;var b=0,d=0.0,e=0,f=0,g=0;f=a+60|0;b=c[f>>2]|0;a:do if((b|0)>(c[a+48>>2]|0))a=0;else{g=a+52|0;e=a+160|0;a=0;while(1){if((a|0)>=(b|0)){a=1;break a}d=+Ai(c[(c[g>>2]|0)+(a<<2)>>2]|0);if(d!=0.0)wg(c[e>>2]|0,0,a&255,14,d)|0;b=c[f>>2]|0;a=a+1|0}}while(0);return a|0}function yh(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;g=l;l=l+32|0;f=g;e=g+4|0;d=a+48|0;a=a+52|0;b=0;while(1){if((b|0)>=(c[d>>2]|0))break;c[f>>2]=b;Ej(e,60361,f)|0;Di(c[(c[a>>2]|0)+(b<<2)>>2]|0,e);b=b+1|0}l=g;return}function zh(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;o=l;l=l+32|0;n=o+4|0;m=o+10|0;f=o+8|0;g=o;h=m;i=h+9|0;do{a[h>>0]=0;h=h+1|0}while((h|0)<(i|0));a:do if(vh(b,d,g,f)|0){f=c[g>>2]|0;if(f){i=b+160|0;j=b+156|0;h=0;b:while(1){c:while(1){if(!(jj(d,m,1,8)|0)){k=6;break b}switch(th(m)|0){case 23:{k=17;break b}case 12:{k=8;break c}case 11:{k=9;break c}case 8:{k=10;break c}case 9:{k=11;break c}case 22:case 21:case 20:case 19:case 18:case 17:case 16:case 15:case 14:case 13:case 7:case 10:case 1:break;default:{f=0;break a}}if(!(jj(d,n,4,1)|0)){k=14;break b}if(!(ij(d,1,c[n>>2]|0)|0)){k=16;break b}}if((k|0)==8)g=Fg(c[i>>2]|0,d)|0;else if((k|0)==9)g=Vg(c[j>>2]|0,d)|0;else if((k|0)==10)g=Xg(c[j>>2]|0,d)|0;else if((k|0)==11)g=Hg(c[i>>2]|0,d)|0;h=g+h|0}if((k|0)==6){c[b>>2]=22;f=0;break}else if((k|0)==14){c[b>>2]=49;f=0;break}else if((k|0)==16){c[b>>2]=50;f=0;break}else if((k|0)==17){f=((f|0)<3?e<<2:0)+h|0;break}}else f=1e4}else f=0;while(0);l=o;return f|0}function Ah(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0;j=l;l=l+16|0;e=j;kh(a,0);do if(vh(a,b,e,j+4|0)|0){e=c[e>>2]|0;g=(e|0)>3;h=a+160|0;f=c[h>>2]|0;if(g)zg(f)|0;else Bg(f)|0;if(sh(a,b)|0){if(!g){if((e|0)!=3){if(!(wh(a)|0)){i=18;break}if(!(xh(a)|0)){i=18;break}yh(a)}}else Ag(c[h>>2]|0,1);e=a+156|0;if(!d?(Pg(c[e>>2]|0)|0)!=480:0){c[a>>2]=51;i=18;break}f=rg(c[h>>2]|0)|0;g=Rg(c[e>>2]|0)|0;e=c[e>>2]|0;if((f|0)>(g|0)){Tg(e,f);e=1;break}else{Tg(e,g);e=1;break}}else i=18}else i=18;while(0);if((i|0)==18){kh(a,0);e=0}l=j;return e|0}function Bh(b){b=b|0;var d=0;a[b+73>>0]=0;a[b+72>>0]=0;a[b+74>>0]=1;a[b+75>>0]=1;c[b+108>>2]=0;d=b+132|0;c[d>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;c[d+12>>2]=0;c[d+16>>2]=0;g[b+112>>2]=1.0;return}function Ch(a){a=a|0;var b=0,d=0;d=a+148|0;b=c[d>>2]|0;if(b|0){cf(b);wk(b);c[d>>2]=0}d=a+140|0;b=c[d>>2]|0;if(b|0)qk(b);c[d>>2]=0;return}function Dh(b){b=b|0;var d=0,e=0,f=0;f=vk(4)|0;bf(f);c[b+148>>2]=f;if(df(f)|0?(e=c[b+68>>2]<<2,d=pk(e)|0,c[b+140>>2]=d,(d|0)!=0):0){il(d|0,0,e|0)|0;a[b+73>>0]=1;d=1}else d=0;return d|0}function Eh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0.0,f=0,h=0,i=0,j=0,k=0;k=hh(a,d)|0;a:do if(k|0){_h(b,k);j=a+148|0;i=a+80|0;a=a+128|0;h=0;while(1){if((h|0)>=(yi(k)|0))break a;f=Ci(k,h)|0;d=Bi(k,h)|0;if(!(c[d+16>>2]&4)){e=+ef(c[j>>2]|0,17664-(c[d>>2]|0)|0);e=e*+g[d+12>>2]}else e=+(c[f+4>>2]|0)*+g[a>>2]/(+g[d+12>>2]*2646.0e3);Zh(b,h,~~(+(c[f+24>>2]|0)/+g[i>>2]),e);h=h+1|0}}while(0);return}function Fh(a){a=a|0;var b=0,d=0,e=0;b=a+60|0;d=0;while(1){if((d|0)>=(c[b>>2]|0))break;e=ih(a,d)|0;Xh(e);Eh(a,e,0);d=d+1|0}return}function Gh(d,e){d=d|0;e=e|0;var f=0,i=0,j=0,k=0,l=0,m=0.0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0.0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;B=d+60|0;C=d+64|0;f=0;while(1){if((f|0)>=(c[B>>2]|0))break;ki(c[(c[C>>2]|0)+(f<<2)>>2]|0);f=f+1|0}F=d+84|0;v=d+80|0;w=~~(+(c[F>>2]|0)/+g[v>>2]);E=d+144|0;G=d+92|0;x=+(w|0);A=d+4|0;u=d+8|0;f=c[E>>2]|0;while(1){if(!f)break;i=c[f+8>>2]|0;if((i|0)>(w|0))break;s=a[f+1>>0]|0;t=c[(c[C>>2]|0)+((s&255)<<2)>>2]|0;a:do switch(a[f>>0]|0){case 1:{q=~~(+g[v>>2]*+(i-w+(c[f+4>>2]|0)|0));if((q|0)<1){ai(t);break a}bi(t);n=pi(t)|0;if(n|0){r=0;while(1){if((r|0)>=(yi(n)|0))break a;o=qi(t,r)|0;p=Ci(n,r)|0;j=c[p+24>>2]|0;i=c[E>>2]|0;k=c[i+4>>2]|0;l=c[i+8>>2]|0;m=+g[v>>2];f=~~(m*+(k-w+l|0));do if(j){f=f+j|0;k=l+k+(c[o+36>>2]|0)|0;while(1){i=c[i+16>>2]|0;if(!i){D=19;break}j=c[i+8>>2]|0;if((j|0)>(k|0)){D=19;break}if((a[i+1>>0]|0)!=s<<24>>24)continue;if((a[i>>0]|0)==1){D=20;break}}if((D|0)==19){D=0;j=(c[G>>2]|0)-~~(x*m)|0}else if((D|0)==20){D=0;j=~~(m*+(j-w|0))}i=o+16|0;if((f|0)<(j|0)){c[i>>2]=f;break}else{c[i>>2]=j;f=j;break}}else c[o+16>>2]=f;while(0);do if((f|0)>0){c[o+20>>2]=q;h[o>>3]=0.0;c[o+32>>2]=0;f=o+28|0;if(!(c[p+20>>2]|0)){c[f>>2]=128;c[o+12>>2]=128;break}else{c[f>>2]=0;c[o+12>>2]=0;break}}while(0);r=r+1|0}}break}case 2:{ci(t,c[f+4>>2]|0);break}case 3:{di(t,c[A>>2]|0,c[f+4>>2]|0);break}case 15:{ei(t,c[A>>2]|0,c[f+4>>2]|0,c[u>>2]|0);break}case 4:{fi(t,c[f+4>>2]|0);break}case 5:{gi(t,c[f+4>>2]|0);break}case 6:{hi(t,~~(+(c[f+4>>2]|0)*+g[v>>2]));break}case 14:{ji(t,+g[f+4>>2]);break}case 13:{ii(t,c[f+4>>2]|0);break}case 12:{Eh(d,t,c[f+4>>2]|0);break}default:{}}while(0);f=c[(c[E>>2]|0)+16>>2]|0;c[E>>2]=f}f=d+74|0;t=d+124|0;i=d+76|0;j=0;while(1){if((j|0)>=(c[B>>2]|0))break;li(c[(c[C>>2]|0)+(j<<2)>>2]|0,(a[f>>0]|0)!=0,c[A>>2]|0,c[t>>2]|0,c[i>>2]|0);j=j+1|0}l=d+68|0;p=d+140|0;n=d+36|0;o=d+40|0;u=d+24|0;v=d+28|0;w=d+108|0;q=d+112|0;k=d+12|0;r=d+116|0;z=d+100|0;y=d+104|0;s=0;while(1){if((s|0)>=(c[A>>2]|0))break;f=c[l>>2]|0;i=0;while(1){if((i|0)>=(f|0)){f=0;break}c[(c[p>>2]|0)+(i<<2)>>2]=0;i=i+1|0}while(1){if((f|0)>=(c[B>>2]|0)){f=0;break}mi(c[(c[C>>2]|0)+(f<<2)>>2]|0,c[p>>2]|0,s,c[t>>2]|0);f=f+1|0}while(1){if((f|0)>=(c[n>>2]|0)){f=0;break}$g(c[(c[o>>2]|0)+(f<<2)>>2]|0,c[p>>2]|0);f=f+1|0}while(1){if((f|0)>=(c[u>>2]|0))break;ig(c[(c[v>>2]|0)+(f<<2)>>2]|0,s,c[p>>2]|0);f=f+1|0}i=c[l>>2]|0;j=0;f=0;while(1){if((j|0)>=(i|0))break;H=(c[(c[p>>2]|0)+(j<<2)>>2]|0)+f|0;j=j+1|0;f=H}if(c[w>>2]|0){f=S(c[z>>2]>>8,f)|0;f=(f|0)/(c[y>>2]|0)|0}f=~~(+(f|0)*+g[q>>2]);H=(c[k>>2]|0)==8;f=H?f>>8:f;j=c[r>>2]|0;f=(f|0)>(j|0)?j:f;j=0-j|0;f=(f|0)<(j|0)?j:f;if(H)a[e+s>>0]=f+128;else b[e+(s<<1)>>1]=f;s=s+1|0}c[F>>2]=(c[F>>2]|0)+1;c[t>>2]=(c[t>>2]|0)+1&63;f=d+148|0;i=d+120|0;j=0;while(1){if((j|0)>=(c[B>>2]|0)){f=0;break}e=ni(c[(c[C>>2]|0)+(j<<2)>>2]|0)|0;H=c[(c[C>>2]|0)+(j<<2)>>2]|0;x=+ff(c[f>>2]|0,e);oi(H,x*+(c[i>>2]|0));j=j+1|0}while(1){if((f|0)>=(c[u>>2]|0))break;jg(c[(c[v>>2]|0)+(f<<2)>>2]|0);f=f+1|0}f=c[w>>2]|0;do if((f|0)<0){f=c[z>>2]|0;if((f|0)>0){c[z>>2]=f+-1;D=74}else f=0}else if(f){f=c[z>>2]|0;if((f|0)<(c[y>>2]<<8|0)){c[z>>2]=f+1;D=74;break}else{c[w>>2]=0;D=74;break}}else D=74;while(0);if((D|0)==74)if((c[F>>2]|0)>=(c[G>>2]|0))if(!(a[d+75>>0]|0))f=0;else{c[F>>2]=c[d+96>>2];c[E>>2]=tg(c[d+160>>2]|0)|0;Fh(d);f=1}else f=1;return f|0}function Hh(b,c){b=b|0;c=c|0;a[b+75>>0]=c&1;return}function Ih(b,d){b=b|0;d=d|0;var e=0,f=0,h=0,i=0,j=0,k=0,l=0,m=0.0,n=0.0,o=0.0;if(((a[b+73>>0]|0)!=0?(l=b+72|0,a[l>>0]=0,i=d+4|0,e=c[i>>2]|0,(c[d>>2]|0)<(e|0)):0)?(j=d+8|0,(c[j>>2]|0)<(e|0)):0){k=b+156|0;f=b+132|0;c[f>>2]=Pg(c[k>>2]|0)|0;h=b+136|0;c[h>>2]=Ng(c[k>>2]|0)|0;m=+Og(c[k>>2]|0);g[b+128>>2]=m;k=c[b+8>>2]|0;n=+(c[f>>2]|0);m=+(k|0)*60.0/(m*n);g[b+80>>2]=m;c[b+120>>2]=44100/(k|0)|0;c[b+116>>2]=(c[b+12>>2]|0)==8?127:32767;c[b+124>>2]=0;o=+(c[h>>2]|0);h=~~(+(c[d>>2]|0)*o*n*m);f=b+88|0;c[f>>2]=h;i=~~(+(c[i>>2]|0)*o*n*m);c[b+92>>2]=i;c[b+96>>2]=~~(+(c[j>>2]|0)*o*n*m);e=c[d+12>>2]|0;if((e|0)!=0&(e|0)<(i|0))c[f>>2]=e;else e=h;c[b+84>>2]=e;c[b+76>>2]=(k|0)/250|0;e=c[d+16>>2]|0;if((e|0)>0){f=((S(k,e)|0)/1e3|0)>>8;c[b+100>>2]=0;e=1}else{e=0;f=0}c[b+104>>2]=f;c[b+108>>2]=e;gh(b);c[b+144>>2]=tg(c[b+160>>2]|0)|0;Fh(b);a[l>>0]=1;e=1}else e=0;return e|0}function Jh(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;k=l;l=l+16|0;i=k;do if(a[b+72>>0]|0){h=c[b+12>>2]|0;j=(S(h,c[b+4>>2]|0)|0)/8|0;if((h|0)==8){f=0;h=0;while(1){if((h|0)>=(e|0))break;g=(h|0)%(j|0)|0;if(!g){m=Gh(b,i)|0;f=m?f:1}a[d+h>>0]=a[i+g>>0]|0;h=h+1|0}f=(f&1)!=0;break}else{f=0;h=0;while(1){if((h|0)>=(e|0))break;g=(h|0)%(j|0)|0;if(!g){m=Gh(b,i)|0;f=m?f:1}a[d+h>>0]=a[i+g>>0]|0;h=h+1|0}f=(f&1)!=0;break}}else f=1;while(0);l=k;return f^1|0}function Kh(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;if(d!=0.0)b=~~(+((S(b,a)|0)>>>0)*(+(c|0)*60.0)/d)>>>0;else b=0;return b|0}function Lh(a,b){a=a|0;b=b|0;return Mh(a,b)|0}function Mh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;if((a|0)!=0&(b|0)!=0){d=c[a>>2]|0;if(d|0){qk(d);c[a>>2]=0}d=$j(b)|0;if((d|0)>=1?(e=d+1|0,f=pk(e)|0,c[a>>2]=f,(f|0)!=0):0){il(f|0,0,e|0)|0;ak(f,b)|0;d=1}else d=0}else d=0;return d|0}function Nh(a){a=a|0;return c[a>>2]|0}function Oh(a,b){a=a|0;b=b|0;return Mh(a+4|0,b)|0}function Ph(a){a=a|0;return c[a+4>>2]|0}function Qh(a){a=a|0;c[a>>2]=0;c[a+4>>2]=0;return}function Rh(a){a=a|0;var b=0;b=c[a>>2]|0;if(b|0){qk(b);c[a>>2]=0}a=a+4|0;b=c[a>>2]|0;if(b|0){qk(b);c[a>>2]=0}return}function Sh(a,b){a=a|0;b=b|0;var d=0,e=0;e=l;l=l+16|0;d=e;c[d>>2]=0;if(Th(d,b)|0){a=Mh(a,c[d>>2]|0)|0;qk(c[d>>2]|0);d=a}else d=0;l=e;return d|0}function Th(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;g=l;l=l+16|0;d=g;c[d>>2]=0;do if((a|0)!=0?jj(b,d,4,1)|0:0){d=c[d>>2]|0;if(!d){d=Mh(a,65420)|0;break}e=d+1|0;f=pk(e)|0;if(f){il(f|0,0,e|0)|0;if(jj(b,f,1,d)|0){d=Mh(a,f)|0;qk(f);break}else{qk(f);d=0;break}}else d=0}else d=0;while(0);l=g;return d|0}function Uh(a,b){a=a|0;b=b|0;var d=0,e=0;e=l;l=l+16|0;d=e;c[d>>2]=0;if(Th(d,b)|0){a=Mh(a+4|0,c[d>>2]|0)|0;qk(c[d>>2]|0);d=a}else d=0;l=e;return d|0}function Vh(b){b=b|0;var c=0;a[b+1>>0]=1;b=b+2|0;c=b;a[c>>0]=110;a[c+1>>0]=111;a[c+2>>0]=32;a[c+3>>0]=110;b=b+4|0;a[b>>0]=97;a[b+1>>0]=109;a[b+2>>0]=101;a[b+3>>0]=0;return}function Wh(a){a=a|0;return}function Xh(a){a=a|0;var b=0;c[a+576>>2]=0;c[a+572>>2]=104;c[a+568>>2]=104;g[a+580>>2]=1.0;c[a+36>>2]=0;c[a+32>>2]=0;b=0;while(1){if((b|0)==2)break;c[a+40+(b<<2)>>2]=64;c[a+48+(b<<2)>>2]=0;b=b+1|0}return}function Yh(a){a=a|0;var b=0;b=0;while(1){if((b|0)==2)break;il(a+56+(b<<8)|0,0,256)|0;b=b+1|0}return}function Zh(a,b,d,e){a=a|0;b=b|0;d=d|0;e=+e;c[a+592+(b*48|0)+16>>2]=0;c[a+592+(b*48|0)+20>>2]=0;h[a+592+(b*48|0)>>3]=0.0;c[a+592+(b*48|0)+40>>2]=0;c[a+592+(b*48|0)+36>>2]=d;g[a+592+(b*48|0)+8>>2]=e;return}function _h(a,b){a=a|0;b=b|0;c[a+584>>2]=b;c[a+20>>2]=24576;c[a+28>>2]=0;c[a+24>>2]=24576;return}function $h(b,c){b=b|0;c=c|0;var d=0,e=0;d=b+2|0;if(($j(c)|0)>>>0>16){e=d+16|0;do{a[d>>0]=a[c>>0]|0;d=d+1|0;c=c+1|0}while((d|0)<(e|0));a[b+18>>0]=0;d=b+17|0;b=a[d>>0]|0;if((b&-16)<<24>>24==-32|(b+127&255)<31)a[d>>0]=0}else ak(d,c)|0;return}function ai(a){a=a|0;var b=0;b=0;while(1){if((b|0)==2)break;c[a+592+(b*48|0)+16>>2]=0;b=b+1|0}return}function bi(a){a=a|0;var b=0,d=0,e=0;d=a+24|0;b=a+28|0;e=(c[b>>2]|0)+(c[d>>2]|0)|0;c[a+20>>2]=e;c[d>>2]=e;c[b>>2]=0;return}function ci(a,b){a=a|0;b=b|0;var d=0;d=c[a+20>>2]|0;c[a+24>>2]=d;c[a+28>>2]=b-d;c[a+32>>2]=0;return}function di(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=a+40|0;c[e>>2]=64;a=a+44|0;c[a>>2]=64;do if((b|0)==2)if((d|0)>63){c[e>>2]=128-d;break}else{c[a>>2]=d;break}while(0);return}function ei(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=a+48|0;c[f>>2]=0;a=a+52|0;c[a>>2]=0;do if((b|0)==2)if((d|0)>63){d=d+-64|0;c[f>>2]=(((d|0)>63?63:d)|0)/(44100/(e|0)|0|0)|0;break}else{d=64-d|0;c[a>>2]=(((d|0)>63?63:d)|0)/(44100/(e|0)|0|0)|0;break}while(0);return}function fi(a,b){a=a|0;b=b|0;c[a+572>>2]=b;return}function gi(a,b){a=a|0;b=b|0;c[a+568>>2]=b;return}function hi(a,b){a=a|0;b=b|0;c[a+36>>2]=b;return}function ii(a,b){a=a|0;b=b|0;c[a+576>>2]=b;return}function ji(a,b){a=a|0;b=+b;g[a+580>>2]=b;return}function ki(a){a=a|0;var b=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;i=a+584|0;b=c[i>>2]|0;a:do if(b|0){g=0;while(1){if((g|0)>=(yi(b)|0))break a;e=Ci(c[i>>2]|0,g)|0;do if((c[a+592+(g*48|0)+16>>2]|0)>0?(h=c[e+20>>2]|0,h|0):0){if((c[a+592+(g*48|0)+20>>2]|0)<=0){j=c[a+592+(g*48|0)+28>>2]|0;f=a+592+(g*48|0)+32|0;b=c[f>>2]|0;k=S(b,0-j|0)|0;c[a+592+(g*48|0)+12>>2]=((k|0)/(c[e+24>>2]|0)|0)+j;c[f>>2]=b+1;break}f=a+592+(g*48|0)+32|0;b=c[f>>2]|0;if((b|0)<(h|0)){c[a+592+(g*48|0)+12>>2]=d[(c[e+16>>2]|0)+b>>0];c[f>>2]=b+1}}while(0);b=c[i>>2]|0;g=g+1|0}}while(0);return}function li(d,e,f,g,i){d=d|0;e=e|0;f=f|0;g=g|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;v=d+584|0;a:do if(c[v>>2]|0){if(e?(a[d+1>>0]|0)==0:0){e=0;while(1){if((e|0)>=(f|0))break a;c[d+56+(e<<8)+(g<<2)>>2]=0;e=e+1|0}}q=(f|0)==1;m=d+572|0;n=d+568|0;p=0;while(1){if((p|0)==2)break a;r=p<<1;o=d+40+(p<<2)|0;s=0;t=0;while(1){if((t|0)>=(yi(c[v>>2]|0)|0))break;k=Ci(c[v>>2]|0,t)|0;l=d+592+(t*48|0)+16|0;if((c[l>>2]|0)>0){j=(~~+h[d+592+(t*48|0)>>3]<<2)+r|0;f=c[k+12>>2]|0;e=b[f+j>>1]|0;if(q)e=((b[f+(j+2)>>1]|0)+e|0)/2|0;e=(S(c[m>>2]|0,e)|0)/128|0;e=(S(e,c[n>>2]|0)|0)/128|0;e=(S(e,c[o>>2]|0)|0)/64|0;if(c[k+20>>2]|0)e=(S(c[d+592+(t*48|0)+12>>2]|0,e)|0)/128|0;if((c[(Bi(c[v>>2]|0,t)|0)+16>>2]&2|0)!=0?(u=c[l>>2]|0,(u|0)<(i|0)):0)e=(S(u,e)|0)/(i|0)|0}else e=0;s=e+s|0;t=t+1|0}c[d+56+(p<<8)+(g<<2)>>2]=s;p=p+1|0}}while(0);return}function mi(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;b=b+(c[a+576>>2]<<2)|0;c[b>>2]=(c[b>>2]|0)+(c[a+56+(d<<8)+((e-(c[a+48+(d<<2)>>2]|0)&63)<<2)>>2]|0);return}function ni(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;d=c[a+36>>2]|0;f=a+28|0;b=c[f>>2]|0;do if(d)if(b){g=a+32|0;e=c[g>>2]|0;if((e|0)<(d|0)){f=e+1|0;c[g>>2]=f;b=~~(+(c[a+24>>2]|0)+ +(f|0)*+(b|0)/+(d|0));c[a+20>>2]=b;break}else{g=a+24|0;b=(c[g>>2]|0)+b|0;c[a+20>>2]=b;c[g>>2]=b;c[f>>2]=0;break}}else{b=0;h=6}else h=6;while(0);if((h|0)==6){b=b+(c[a+24>>2]|0)|0;c[a+20>>2]=b}return b|0}function oi(a,b){a=a|0;b=+b;var d=0,e=0.0,f=0.0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;n=a+584|0;d=c[n>>2]|0;a:do if(d|0){o=a+580|0;m=0;while(1){if((m|0)>=(yi(d)|0))break a;l=Ci(c[n>>2]|0,m)|0;i=a+592+(m*48|0)+16|0;d=c[i>>2]|0;if((d|0)>0?(c[i>>2]=d+-1,(d|0)!=1):0){j=a+592+(m*48|0)+20|0;c[j>>2]=(c[j>>2]|0)+-1;k=a+592+(m*48|0)|0;f=+h[k>>3]+ +g[a+592+(m*48|0)+8>>2]*+g[o>>2]*b;h[k>>3]=f;d=l+4|0;do if(f>=+(c[d>>2]|0)){if(!(c[(Bi(c[n>>2]|0,m)|0)+16>>2]&1)){c[i>>2]=0;break}e=+h[k>>3];f=+(c[d>>2]|0);if(e>=f){e=e-f;h[k>>3]=e}if(e>=f)h[k>>3]=0.0}while(0);if((c[j>>2]|0)==0?c[l+20>>2]|0:0){c[a+592+(m*48|0)+28>>2]=c[a+592+(m*48|0)+12>>2];c[a+592+(m*48|0)+32>>2]=0}}d=c[n>>2]|0;m=m+1|0}}while(0);return}function pi(a){a=a|0;return c[a+584>>2]|0}function qi(a,b){a=a|0;b=b|0;return a+592+(b*48|0)|0}function ri(d,f,g){d=d|0;f=f|0;g=g|0;var h=0,i=0;i=l;l=l+32|0;h=i+4|0;if((jj(f,i,4,1)|0?jj(f,h,20,1)|0:0)?(b[h+16>>1]|0)==1:0){f=d+2|0;b[f>>1]=b[h>>1]|0;b[f+2>>1]=b[h+2>>1]|0;b[f+4>>1]=b[h+4>>1]|0;b[f+6>>1]=b[h+6>>1]|0;b[f+8>>1]=b[h+8>>1]|0;b[f+10>>1]=b[h+10>>1]|0;b[f+12>>1]=b[h+12>>1]|0;b[f+14>>1]=b[h+14>>1]|0;a[d+18>>0]=0;c[g>>2]=e[h+18>>1];f=1}else f=0;l=i;return f|0}function si(d,f,g,h){d=d|0;f=f|0;g=g|0;h=h|0;var i=0;i=l;l=l+16|0;d=i+4|0;do if(jj(f,i,4,1)|0?jj(f,d,4,1)|0:0)if(((b[d>>1]|0)+-1&65535)<3){c[h>>2]=e[d+2>>1];d=1;break}else{a[g>>0]=1;d=0;break}else d=0;while(0);l=i;return d|0}function ti(b){b=b|0;c[b+24>>2]=0;c[b+28>>2]=0;c[b+32>>2]=0;c[b>>2]=0;c[b+4>>2]=0;c[b+8>>2]=0;c[b+12>>2]=0;c[b+16>>2]=0;a[b+20>>0]=0;return}function ui(a){a=a|0;vi(a);return}function vi(a){a=a|0;var b=0,d=0,e=0;b=a+28|0;d=a+32|0;e=0;while(1){if((e|0)>=(c[a>>2]|0))break;xi((c[b>>2]|0)+(e*72|0)|0,(c[d>>2]|0)+(e*28|0)|0);e=e+1|0}wi(b);wi(d);c[a>>2]=0;return}function wi(a){a=a|0;var b=0;b=c[a>>2]|0;if(b|0){qk(b);c[a>>2]=0}return}function xi(a,b){a=a|0;b=b|0;var d=0,e=0;if(a|0){e=a+28|0;d=c[e>>2]|0;if(d|0){Rf(d);wk(d);c[e>>2]=0}e=a+32|0;d=c[e>>2]|0;if(d|0){Hf(d);wk(d);c[e>>2]=0}e=a+36|0;d=c[e>>2]|0;if(d|0){lf(d);wk(d);c[e>>2]=0}e=a+52|0;wi(a+68|0);c[e>>2]=0;c[e+4>>2]=0;c[e+8>>2]=0;c[e+12>>2]=0;c[e+16>>2]=0;e=a+40|0;wi(a+48|0);c[e>>2]=0;c[e+4>>2]=0;c[e+8>>2]=0}if(b|0){wi(b+16|0);wi(b+12|0);c[b>>2]=0;c[b+4>>2]=0;c[b+8>>2]=0;c[b+12>>2]=0;c[b+16>>2]=0;c[b+20>>2]=0;c[b+24>>2]=0}return}function yi(a){a=a|0;return c[a>>2]|0}function zi(a){a=a|0;return c[a+40>>2]|0}function Ai(a){a=a|0;return +(+g[a+36>>2])}function Bi(a,b){a=a|0;b=b|0;if((b|0)>=0?(c[a>>2]|0)>(b|0):0)b=(c[a+28>>2]|0)+(b*72|0)|0;else b=0;return b|0}function Ci(a,b){a=a|0;b=b|0;if((b|0)>=0?(c[a>>2]|0)>(b|0):0)b=(c[a+32>>2]|0)+(b*28|0)|0;else b=0;return b|0}function Di(b,c){b=b|0;c=c|0;var d=0,e=0;d=b+4|0;if(($j(c)|0)>>>0>16){e=d+16|0;do{a[d>>0]=a[c>>0]|0;d=d+1|0;c=c+1|0}while((d|0)<(e|0));a[b+20>>0]=0;d=b+19|0;b=a[d>>0]|0;if((b&-16)<<24>>24==-32|(b+127&255)<31)a[d>>0]=0}else ak(d,c)|0;return}function Ei(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0;vi(a);d=a+28|0;a:do if(Fi(d,b*72|0)|0?Fi(a+32|0,b*28|0)|0:0){c[a>>2]=b;a=0;while(1){if((a|0)>=(b|0)){a=1;break a}f=c[d>>2]|0;c[f+(a*72|0)>>2]=17664;c[f+(a*72|0)+4>>2]=128;c[f+(a*72|0)+8>>2]=64;g[f+(a*72|0)+12>>2]=1.0;c[f+(a*72|0)+16>>2]=2;c[f+(a*72|0)+20>>2]=1;h=vk(28)|0;Qf(h);c[f+(a*72|0)+28>>2]=h;h=vk(20)|0;Gf(h);c[f+(a*72|0)+32>>2]=h;h=vk(12)|0;kf(h);c[f+(a*72|0)+36>>2]=h;f=f+(a*72|0)+52|0;c[f>>2]=0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=0;a=a+1|0}}else e=6;while(0);if((e|0)==6){vi(a);a=0}return a|0}function Fi(a,b){a=a|0;b=b|0;var d=0;d=pk(b)|0;c[a>>2]=d;if(!d)d=0;else{il(d|0,0,b|0)|0;d=1}return d|0}function Gi(a,d){a=a|0;d=d|0;var e=0,f=0,g=0,h=0.0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0.0;v=l;l=l+64|0;r=v;q=v+36|0;t=v+8|0;Qf(t);s=a+32|0;e=0;while(1){f=c[a>>2]|0;if((e|0)>=(f|0))break;p=c[s>>2]|0;wi(p+(e*28|0)+12|0);c[p+(e*28|0)>>2]=0;c[p+(e*28|0)+4>>2]=0;c[p+(e*28|0)+8>>2]=0;e=e+1|0}n=a+28|0;o=r+4|0;p=(d|0)==0;m=0;a:while(1){if((m|0)>=(f|0)){e=1;break}g=c[s>>2]|0;e=g+(m*28|0)|0;i=c[n>>2]|0;j=i+(m*72|0)+24|0;switch(c[j>>2]|0){case 4:{if(!(Jf(c[i+(m*72|0)+32>>2]|0,t)|0)){e=0;u=32;break a}if(!(Zf(t,2,44100,16)|0)){e=0;u=32;break a}c[e>>2]=ag(t)|0;c[g+(m*28|0)+4>>2]=$f(t)|0;c[g+(m*28|0)+8>>2]=bg(t)|0;c[g+(m*28|0)+12>>2]=Sf(t)|0;break}case 3:{if(!(_f(c[i+(m*72|0)+28>>2]|0,t)|0)){e=0;u=32;break a}if(!(Zf(t,2,44100,16)|0)){e=0;u=32;break a}c[e>>2]=ag(t)|0;c[g+(m*28|0)+4>>2]=$f(t)|0;c[g+(m*28|0)+8>>2]=bg(t)|0;c[g+(m*28|0)+12>>2]=Sf(t)|0;break}case 0:case 1:{k=g+(m*28|0)+4|0;c[k>>2]=400;e=pk(1600)|0;f=g+(m*28|0)+12|0;c[f>>2]=e;if(!e){e=0;u=32;break a}il(e|0,0,1600)|0;e=r;c[e>>2]=64;c[e+4>>2]=64;Lf(q);e=c[i+(m*72|0)+8>>2]|0;if((e|0)<=64){if((e|0)!=64)c[o>>2]=e}else c[r>>2]=128-e;Mf(q,c[i+(m*72|0)+48>>2]|0,c[i+(m*72|0)+40>>2]|0,c[i+(m*72|0)+4>>2]|0,c[k>>2]|0,c[i+(m*72|0)+44>>2]|0);j=(c[j>>2]|0)==1;e=c[f>>2]|0;i=0;while(1){if((i|0)>=(c[k>>2]|0))break;if(j)h=+Nf(q,i);else h=+Of(q,i);g=i<<1;f=0;while(1){if((f|0)==2)break;w=h*+(c[r+(f<<2)>>2]|0)*.015625;w=w>1.0?1.0:w;b[e+(f+g<<1)>>1]=~~((w<-1.0?-1.0:w)*32767.0);f=f+1|0}i=i+1|0}break}case 2:{if(p){e=0;u=32;break a}f=i+(m*72|0)+36|0;e=Bf(d,c[f>>2]|0,2,44100,16)|0;if(!e){e=0;u=32;break a}c[g+(m*28|0)+12>>2]=Sf(e)|0;c[g+(m*28|0)+4>>2]=hf(c[f>>2]|0)|0;break}default:{}}f=c[a>>2]|0;m=m+1|0}b:do if((u|0)==32)while(1){if((e|0)>=(c[a>>2]|0)){e=0;break b}u=c[s>>2]|0;wi(u+(e*28|0)+12|0);c[u+(e*28|0)>>2]=0;c[u+(e*28|0)+4>>2]=0;c[u+(e*28|0)+8>>2]=0;e=e+1|0;u=32}while(0);Rf(t);l=v;return e|0}function Hi(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0.0,t=0,u=0,v=0,w=0,x=0,y=0;y=l;l=l+16|0;v=y;c[v>>2]=0;w=b+32|0;u=b+28|0;s=+(d|0);t=0;while(1){if((t|0)>=(c[b>>2]|0)){x=3;break}r=c[w>>2]|0;n=c[u>>2]|0;o=n+(t*72|0)+52|0;q=r+(t*28|0)+16|0;wi(q);p=n+(t*72|0)+56|0;d=c[p>>2]|0;if(d|0){j=n+(t*72|0)+68|0;e=0;f=0;while(1){if((e|0)>=(d|0))break;m=(c[(c[j>>2]|0)+(e<<3)>>2]|0)+f|0;e=e+1|0;f=m}k=~~(s*+(f|0)/+(c[o>>2]|0));m=r+(t*28|0)+20|0;k=(k|0)==0?1:k;c[m>>2]=k;if(!(Fi(q,k)|0)){x=29;break}if(!(Fi(v,c[p>>2]<<3)|0)){x=29;break}h=c[p>>2]|0;k=c[v>>2]|0;i=0;d=0;e=0;while(1){if((i|0)>=(h|0)){e=0;j=0;f=0;g=0;break}g=c[j>>2]|0;if(i){f=c[g+(i<<3)>>2]|0;if(!f){if(c[g+(i<<3)+4>>2]|0){f=0;x=16}}else x=16}else{f=c[g>>2]|0;x=16}if((x|0)==16){x=0;e=~~(s*+(f|0)/+(c[o>>2]|0))+e|0;c[k+(i<<3)>>2]=e;c[k+(i<<3)+4>>2]=c[g+(i<<3)+4>>2];d=d+1|0}i=i+1|0}while(1){if((j|0)<(c[m>>2]|0)){h=e;i=f}else break;while(1){if((h|0)>=(d|0)){x=24;break}e=c[k+(h<<3)>>2]|0;f=c[k+(h<<3)+4>>2]|0;if((j|0)<(e|0)){x=23;break}h=h+1|0;i=e;g=f}if((x|0)==23){x=0;f=((S(f-g|0,j-i|0)|0)/(e-i|0)|0)+g&255;a[(c[q>>2]|0)+j>>0]=f}else if((x|0)==24){x=0;a[(c[q>>2]|0)+j>>0]=g}e=h;j=j+1|0;f=i}wi(v)}if(!(c[n+(t*72|0)+64>>2]|0))d=0;else d=~~(s*+(c[(c[n+(t*72|0)+68>>2]|0)+(c[p>>2]<<3)>>2]|0)/+(c[o>>2]|0));c[r+(t*28|0)+24>>2]=d;t=t+1|0}a:do if((x|0)==3){wi(v);d=1}else if((x|0)==29){wi(v);d=0;while(1){if((d|0)>=(c[b>>2]|0)){d=0;break a}wi((c[w>>2]|0)+(d*28|0)+16|0);d=d+1|0}}while(0);l=y;return d|0}function Ii(a,b,c){a=a|0;b=b|0;c=c|0;if(Gi(a,b)|0)b=Hi(a,c)|0;else b=0;return b|0}function Ji(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0;r=l;l=l+48|0;o=r+33|0;p=r+32|0;g=r+24|0;j=r+16|0;q=r+12|0;k=r+8|0;i=r+4|0;h=r;a:do if(((jj(e,g,1,8)|0?jj(e,j,4,1)|0:0)?(Dj(g,60372,8)|0)==0:0)?jj(e,i,4,1)|0:0){if((c[j>>2]|0)>20060111){a[f>>0]=1;g=0;break}if((kj(e,b+40|0)|0?kj(e,q)|0:0)?kj(e,k)|0:0){if(c[k>>2]|c[q>>2]|0){a[f>>0]=1;g=0;break}if(kj(e,h)|0?Ei(b,c[h>>2]|0)|0:0){m=b+28|0;n=0;b:while(1){if((n|0)>=(c[b>>2]|0)){h=56;break}k=c[m>>2]|0;g=k+(n*72|0)|0;if(!g){g=0;break a}if(!(kj(e,g)|0)){g=0;break a}if(!(kj(e,k+(n*72|0)+4|0)|0)){g=0;break a}if(!(kj(e,k+(n*72|0)+8|0)|0)){g=0;break a}if(!(kj(e,q)|0)){g=0;break a}c[k+(n*72|0)+12>>2]=c[q>>2];g=k+(n*72|0)+16|0;if(!(kj(e,g)|0)){g=0;break a}j=k+(n*72|0)+20|0;if(!(kj(e,j)|0)){g=0;break a}if((c[g>>2]|0)>>>0>7){h=24;break}g=c[j>>2]|0;if(g>>>0>3){h=26;break}if(g&1){g=k+(n*72|0)+24|0;if(!(kj(e,g)|0)){h=42;break}c:do switch(c[g>>2]|0){case 0:{g=k+(n*72|0)+40|0;if(!(kj(e,g)|0)){h=42;break b}if(!(kj(e,k+(n*72|0)+44|0)|0)){h=42;break b}g=c[g>>2]|0;i=k+(n*72|0)+48|0;if(Ki(i,g<<3)|0)h=0;else{h=42;break b}while(1){if((h|0)>=(g|0))break c;if(!(jj(e,p,1,1)|0)){h=42;break b}c[(c[i>>2]|0)+(h<<3)>>2]=d[p>>0];if(!(jj(e,o,1,1)|0)){h=42;break b}c[(c[i>>2]|0)+(h<<3)+4>>2]=a[o>>0];h=h+1|0}}case 1:{g=k+(n*72|0)+40|0;if(!(kj(e,g)|0)){h=42;break b}g=c[g>>2]|0;i=k+(n*72|0)+48|0;if(Ki(i,g<<3)|0)h=0;else{h=42;break b}while(1){if((h|0)>=(g|0))break c;if(!(kj(e,(c[i>>2]|0)+(h<<3)|0)|0)){h=42;break b}if(kj(e,(c[i>>2]|0)+(h<<3)+4|0)|0)h=h+1|0;else{h=42;break b}}}default:{h=42;break b}}while(0);g=c[j>>2]|0}d:do if(g&2|0){if(!(kj(e,k+(n*72|0)+52|0)|0)){g=0;break a}h=k+(n*72|0)+56|0;if(!(kj(e,h)|0)){g=0;break a}g=k+(n*72|0)+60|0;if(!(kj(e,g)|0)){g=0;break a}i=k+(n*72|0)+64|0;if(!(kj(e,i)|0)){g=0;break a}if(c[g>>2]|0){g=0;break a}if((c[i>>2]|0)!=1){g=0;break a}i=(c[h>>2]|0)+1|0;h=k+(n*72|0)+68|0;if(Ki(h,i<<3)|0)g=0;else{g=0;break a}while(1){if((g|0)>=(i|0))break d;if(!(kj(e,(c[h>>2]|0)+(g<<3)|0)|0)){g=0;break a}if(kj(e,(c[h>>2]|0)+(g<<3)+4|0)|0)g=g+1|0;else{g=0;break a}}}while(0);n=n+1|0}if((h|0)==24){a[f>>0]=1;g=0;break}else if((h|0)==26){a[f>>0]=1;g=0;break}else if((h|0)==42){g=0;break}else if((h|0)==56){c[b+24>>2]=2;g=1;break}}else g=0}else g=0}else g=0;while(0);l=r;return g|0}function Ki(a,b){a=a|0;b=b|0;var d=0;d=pk(b)|0;c[a>>2]=d;if(!d)d=0;else{il(d|0,0,b|0)|0;d=1}return d|0}function Li(b,d,f){b=b|0;d=d|0;f=f|0;var h=0,i=0,j=0,k=0,m=0,n=0,o=0;n=l;l=l+32|0;k=n+8|0;do if(jj(d,n,4,1)|0?jj(d,k,24,1)|0:0){m=k+4|0;if((c[m>>2]|0)>>>0>7){a[f>>0]=1;h=0;break}if((Ei(b,1)|0?(h=c[b+28>>2]|0,c[h+24>>2]=3,j=h+28|0,o=c[k+8>>2]|0,f=o&65535,i=k+20|0,Tf(c[j>>2]|0,f,c[k+12>>2]|0,o>>>16,((c[i>>2]|0)>>>0)/((S(o>>>19,f)|0)>>>0)|0)|0):0)?(o=cg(c[j>>2]|0)|0,jj(d,o,1,c[i>>2]|0)|0):0){c[b+24>>2]=1;c[h+16>>2]=c[m>>2];o=e[k+2>>1]|0;c[h>>2]=o;c[h+12>>2]=c[k+16>>2];c[b+40>>2]=o;g[b+36>>2]=0.0;h=1;break}vi(b);h=0}else h=0;while(0);l=n;return h|0}
function Lb(a){a=a|0;var b=0;b=l;l=l+a|0;l=l+15&-16;return b|0}function Mb(){return l|0}function Nb(a){a=a|0;l=a}function Ob(a,b){a=a|0;b=b|0;l=a;m=b}function Pb(a,b){a=a|0;b=b|0;if(!o){o=a;p=b}}function Qb(a){a=a|0;D=a}function Rb(){return D|0}function Sb(b){b=b|0;var d=0;c[b>>2]=0;c[b+4>>2]=0;c[b+8>>2]=0;c[b+12>>2]=0;d=pk(256)|0;c[b+8>>2]=d;c[b+12>>2]=d;a[d>>0]=0;c[b+16>>2]=256;return}function Tb(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0;do if(f>>>0>32)l=15;else{j=b+16|0;h=c[j>>2]|0;k=b+12|0;g=c[k>>2]|0;if((c[b>>2]|0)>=(h+-4|0)){if(!g)break;if((h|0)>2147483391){l=15;break}i=b+8|0;g=sk(c[i>>2]|0,h+256|0)|0;if(!g){l=15;break}c[i>>2]=g;c[j>>2]=(c[j>>2]|0)+256;g=g+(c[b>>2]|0)|0;c[k>>2]=g}i=c[696+(f<<2)>>2]&e;j=b+4|0;e=c[j>>2]|0;h=e+f|0;a[g>>0]=d[g>>0]|0|i<<e;do if((((h|0)>7?(a[(c[k>>2]|0)+1>>0]=i>>>(8-(c[j>>2]|0)|0),(h|0)>15):0)?(a[(c[k>>2]|0)+2>>0]=i>>>(16-(c[j>>2]|0)|0),(h|0)>23):0)?(a[(c[k>>2]|0)+3>>0]=i>>>(24-(c[j>>2]|0)|0),(h|0)>31):0){g=c[j>>2]|0;if(!g){a[(c[k>>2]|0)+4>>0]=0;break}else{a[(c[k>>2]|0)+4>>0]=i>>>(32-g|0);break}}while(0);f=(h|0)/8|0;c[b>>2]=(c[b>>2]|0)+f;c[k>>2]=(c[k>>2]|0)+f;c[j>>2]=h&7}while(0);if((l|0)==15)Ub(b);return}function Ub(a){a=a|0;qk(c[a+8>>2]|0);c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;c[a+16>>2]=0;return}function Vb(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;c[a+12>>2]=b;c[a+8>>2]=b;c[a+16>>2]=d;return}function Wb(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0;do if(b>>>0>32)b=-1;else{h=c[696+(b<<2)>>2]|0;g=c[a+4>>2]|0;f=g+b|0;b=c[a>>2]|0;e=c[a+16>>2]|0;if((b|0)>=(e+-4|0)){if((b|0)>(e-(f+7>>3)|0)){b=-1;break}if(!f){b=0;break}}e=c[a+12>>2]|0;b=(d[e>>0]|0)>>>g;if((f|0)>8){b=(d[e+1>>0]|0)<<8-g|b;if((f|0)>16){b=(d[e+2>>0]|0)<<16-g|b;if((f|0)>24){b=(d[e+3>>0]|0)<<24-g|b;if(!((f|0)<33|(g|0)==0))b=(d[e+4>>0]|0)<<32-g|b}}}b=b&h}while(0);return b|0}function Xb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;f=a+4|0;e=(c[f>>2]|0)+b|0;b=c[a>>2]|0;d=c[a+16>>2]|0;if((b|0)>(d-(e+7>>3)|0)){c[a+12>>2]=0;c[a>>2]=d;b=1}else{d=(e|0)/8|0;g=a+12|0;c[g>>2]=(c[g>>2]|0)+d;c[a>>2]=b+d;b=e&7}c[f>>2]=b;return}function Yb(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;do if(b>>>0>32){f=c[a+16>>2]|0;e=a+4|0;b=a;l=12}else{k=c[696+(b<<2)>>2]|0;e=a+4|0;h=c[e>>2]|0;j=h+b|0;i=c[a>>2]|0;f=c[a+16>>2]|0;if((i|0)>=(f+-4|0)){if((i|0)>(f-(j+7>>3)|0)){b=a;l=12;break}if(!j){e=0;break}}g=a+12|0;f=c[g>>2]|0;b=(d[f>>0]|0)>>>h;if((j|0)>8){b=(d[f+1>>0]|0)<<8-h|b;if((j|0)>16){b=(d[f+2>>0]|0)<<16-h|b;if((j|0)>24){b=(d[f+3>>0]|0)<<24-h|b;if(!((j|0)<33|(h|0)==0))b=(d[f+4>>0]|0)<<32-h|b}}}h=(j|0)/8|0;c[g>>2]=f+h;c[a>>2]=i+h;c[e>>2]=j&7;e=b&k}while(0);if((l|0)==12){c[a+12>>2]=0;c[b>>2]=f;c[e>>2]=1;e=-1}return e|0}function Zb(a){a=a|0;return (((c[a+4>>2]|0)+7|0)/8|0)+(c[a>>2]|0)|0}function _b(a){a=a|0;return (d[(c[a>>2]|0)+5>>0]|0)&2|0}function $b(a){a=a|0;return (d[(c[a>>2]|0)+5>>0]|0)&4|0}function ac(a){a=a|0;var b=0;a=c[a>>2]|0;b=jl(d[a+13>>0]|0|0,0,8)|0;b=jl(b|(d[a+12>>0]|0)|0,D|0,8)|0;b=jl(b|(d[a+11>>0]|0)|0,D|0,8)|0;b=jl(b|(d[a+10>>0]|0)|0,D|0,8)|0;b=jl(b|(d[a+9>>0]|0)|0,D|0,8)|0;b=jl(b|(d[a+8>>0]|0)|0,D|0,8)|0;b=jl(b|(d[a+7>>0]|0)|0,D|0,8)|0;return b|(d[a+6>>0]|0)|0}function bc(a){a=a|0;a=c[a>>2]|0;return (d[a+15>>0]|0)<<8|(d[a+14>>0]|0)|(d[a+16>>0]|0)<<16|(d[a+17>>0]|0)<<24|0}function cc(a){a=a|0;a=c[a>>2]|0;return (d[a+19>>0]|0)<<8|(d[a+18>>0]|0)|(d[a+20>>0]|0)<<16|(d[a+21>>0]|0)<<24|0}function dc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;do if(!a)a=-1;else{il(a|0,0,360)|0;c[a+4>>2]=16384;c[a+24>>2]=1024;f=pk(16384)|0;c[a>>2]=f;d=pk(4096)|0;c[a+16>>2]=d;e=pk(8192)|0;c[a+20>>2]=e;if(f|0?!((e|0)==0|(d|0)==0):0){c[a+336>>2]=b;a=0;break}ec(a)|0;a=-1}while(0);return a|0}function ec(a){a=a|0;var b=0;if(a|0){qk(c[a>>2]|0);b=c[a+16>>2]|0;if(b|0)qk(b);b=c[a+20>>2]|0;if(b|0)qk(b);il(a|0,0,360)|0}return 0}function fc(b){b=b|0;var e=0,f=0,g=0,h=0,i=0;if(b|0){a[(c[b>>2]|0)+22>>0]=0;a[(c[b>>2]|0)+23>>0]=0;a[(c[b>>2]|0)+24>>0]=0;a[(c[b>>2]|0)+25>>0]=0;e=c[b+4>>2]|0;i=0;f=0;while(1){if((f|0)>=(e|0))break;i=c[828+(((d[(c[b>>2]|0)+f>>0]|0)^i>>>24)<<2)>>2]^i<<8;f=f+1|0}g=c[b+12>>2]|0;h=b+8|0;e=i;f=0;while(1){if((f|0)>=(g|0))break;e=c[828+(((d[(c[h>>2]|0)+f>>0]|0)^e>>>24)<<2)>>2]^e<<8;f=f+1|0}a[(c[b>>2]|0)+22>>0]=e;a[(c[b>>2]|0)+23>>0]=e>>>8;a[(c[b>>2]|0)+24>>0]=e>>>16;a[(c[b>>2]|0)+25>>0]=e>>>24}return}function gc(a,b){a=a|0;b=b|0;var d=0,e=0;e=a+4|0;d=c[e>>2]|0;do if((d-b|0)<=(c[a+8>>2]|0)){if((d|0)>(2147483647-b|0)){ec(a)|0;d=-1;break}d=d+b|0;d=(d|0)<2147482623?d+1024|0:d;b=sk(c[a>>2]|0,d)|0;if(!b){ec(a)|0;d=-1;break}else{c[e>>2]=d;c[a>>2]=b;d=0;break}}else d=0;while(0);return d|0}function hc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=a+24|0;d=c[f>>2]|0;do if((d-b|0)<=(c[a+28>>2]|0)){if((d|0)>(2147483647-b|0)){ec(a)|0;d=-1;break}e=d+b|0;e=(e|0)<2147483615?e+32|0:e;b=a+16|0;d=sk(c[b>>2]|0,e<<2)|0;if(!d){ec(a)|0;d=-1;break}c[b>>2]=d;b=a+20|0;d=sk(c[b>>2]|0,e<<3)|0;if(!d){ec(a)|0;d=-1;break}else{c[b>>2]=d;c[f>>2]=e;d=0;break}}else d=0;while(0);return d|0}function ic(a){a=a|0;if(a|0){c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;c[a+16>>2]=0;c[a+20>>2]=0;c[a+24>>2]=0}return 0}function jc(a){a=a|0;if(a|0){qk(c[a>>2]|0);c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;c[a+16>>2]=0;c[a+20>>2]=0;c[a+24>>2]=0}return 0}function kc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0;h=a+4|0;d=c[h>>2]|0;a:do if((d|0)>-1){g=a+12|0;e=c[g>>2]|0;i=a+8|0;if(!e)e=d;else{f=(c[i>>2]|0)-e|0;c[i>>2]=f;if((f|0)>0){d=c[a>>2]|0;rl(d|0,d+e|0,f|0)|0;d=c[h>>2]|0}c[g>>2]=0;e=d}d=c[i>>2]|0;do if((e-d|0)<(b|0)){f=b+4096+d|0;d=c[a>>2]|0;if(!d)e=pk(f)|0;else e=sk(d,f)|0;if(!e){jc(a)|0;d=0;break a}else{c[a>>2]=e;c[h>>2]=f;d=c[i>>2]|0;break}}else e=c[a>>2]|0;while(0);d=e+d|0}else d=0;while(0);return d|0}function lc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=c[a+4>>2]|0;if((d|0)>-1?(f=a+8|0,e=(c[f>>2]|0)+b|0,(e|0)<=(d|0)):0){c[f>>2]=e;d=0}else d=-1;return d|0}function mc(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;s=l;l=l+32|0;k=s+16|0;m=s;r=b+12|0;n=c[r>>2]|0;p=(c[b>>2]|0)+n|0;o=b+8|0;n=(c[o>>2]|0)-n|0;a:do if((c[b+4>>2]|0)>-1){q=b+20|0;f=c[q>>2]|0;do if(!f){if((n|0)<27){f=0;break a}if(Dj(p,59872,4)|0){f=b+24|0;break}i=p+26|0;g=a[i>>0]|0;f=(g&255)+27|0;if((n|0)<(f|0)){f=0;break a}j=b+24|0;h=0;while(1){if((h|0)>=(g&255|0))break;c[j>>2]=(c[j>>2]|0)+(d[p+(h+27)>>0]|0);g=a[i>>0]|0;h=h+1|0}c[q>>2]=f;g=12}else{j=b+24|0;g=12}while(0);do if((g|0)==12){if((f+(c[j>>2]|0)|0)>(n|0)){f=0;break a}g=p+22|0;f=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[k>>2]=f;a[g>>0]=0;a[g+1>>0]=0;a[g+2>>0]=0;a[g+3>>0]=0;c[m>>2]=p;i=c[q>>2]|0;c[m+4>>2]=i;c[m+8>>2]=p+i;c[m+12>>2]=c[j>>2];fc(m);if(Dj(k,g,4)|0){a[g>>0]=f;a[g+1>>0]=f>>8;a[g+2>>0]=f>>16;a[g+3>>0]=f>>24;f=j;break}h=c[r>>2]|0;f=(c[b>>2]|0)+h|0;if(!e){f=c[j>>2]|0;g=c[q>>2]|0}else{c[e>>2]=f;g=c[q>>2]|0;c[e+4>>2]=g;c[e+8>>2]=f+g;f=c[j>>2]|0;c[e+12>>2]=f}c[b+16>>2]=0;f=f+g|0;c[r>>2]=h+f;c[q>>2]=0;c[j>>2]=0;break a}while(0);c[q>>2]=0;c[f>>2]=0;f=Oj(p+1|0,79,n+-1|0)|0;if(!f){f=c[b>>2]|0;g=f;f=f+(c[o>>2]|0)|0}else g=c[b>>2]|0;c[r>>2]=f-g;f=p-f|0}else f=0;while(0);l=s;return f|0}function nc(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;t=c[e>>2]|0;f=c[e+8>>2]|0;p=c[e+12>>2]|0;m=a[t+4>>0]|0;x=d[t+5>>0]|0;o=x&1;h=x&2;x=x&4;v=ac(e)|0;w=D;n=bc(e)|0;r=cc(e)|0;s=d[t+26>>0]|0;do if((b|0)!=0?(j=c[b>>2]|0,(j|0)!=0):0){l=b+36|0;k=c[l>>2]|0;g=b+12|0;e=c[g>>2]|0;if(e|0){q=b+8|0;i=(c[q>>2]|0)-e|0;c[q>>2]=i;if(i|0)rl(j|0,j+e|0,i|0)|0;c[g>>2]=0}if(k|0){i=b+28|0;e=c[i>>2]|0;g=e-k|0;if(g){e=c[b+16>>2]|0;rl(e|0,e+(k<<2)|0,g<<2|0)|0;e=c[b+20>>2]|0;rl(e|0,e+(k<<3)|0,(c[i>>2]|0)-k<<3|0)|0;e=c[i>>2]|0}c[i>>2]=e-k;q=b+32|0;c[q>>2]=(c[q>>2]|0)-k;c[l>>2]=0}if(!(m<<24>>24?1:(n|0)!=(c[b+336>>2]|0))?(hc(b,s+1|0)|0)==0:0){q=b+340|0;e=c[q>>2]|0;if((r|0)!=(e|0)){m=b+32|0;g=c[m>>2]|0;l=b+28|0;i=c[l>>2]|0;n=b+16|0;j=b+8|0;k=g;while(1){if((k|0)>=(i|0))break;c[j>>2]=(c[j>>2]|0)-(c[(c[n>>2]|0)+(k<<2)>>2]&255);k=k+1|0}c[l>>2]=g;if((e|0)!=-1){k=g+1|0;c[l>>2]=k;c[(c[n>>2]|0)+(g<<2)>>2]=1024;c[m>>2]=k}}a:do if(!o){e=p;g=0}else{o=c[b+28>>2]|0;if((o|0)>=1?(c[(c[b+16>>2]|0)+(o+-1<<2)>>2]|0)!=1024:0){e=p;g=0;break}else{e=p;g=0}while(1){if((g|0)>=(s|0)){h=0;break a}p=a[t+(g+27)>>0]|0;o=p&255;f=f+o|0;e=e-o|0;p=p<<24>>24==-1;g=(p&1^1)+g|0;if(!p){h=0;break a}g=g+1|0}}while(0);if(e|0){if(gc(b,e)|0){f=-1;break}p=b+8|0;ol((c[b>>2]|0)+(c[p>>2]|0)|0,f|0,e|0)|0;c[p>>2]=(c[p>>2]|0)+e}m=b+28|0;o=b+16|0;l=b+20|0;n=b+32|0;k=-1;b:while(1){while(1){if((g|0)>=(s|0))break b;i=a[t+(g+27)>>0]|0;e=i&255;j=c[m>>2]|0;f=(c[o>>2]|0)+(j<<2)|0;c[f>>2]=e;p=(c[l>>2]|0)+(j<<3)|0;c[p>>2]=-1;c[p+4>>2]=-1;if(h|0)c[f>>2]=e|256;f=j+1|0;c[m>>2]=f;g=g+1|0;if(i<<24>>24!=-1)break;else h=0}c[n>>2]=f;h=0;k=j}if((k|0)!=-1){t=(c[l>>2]|0)+(k<<3)|0;c[t>>2]=v;c[t+4>>2]=w}if(x|0?(c[b+328>>2]=1,u=c[m>>2]|0,(u|0)>0):0){b=(c[o>>2]|0)+(u+-1<<2)|0;c[b>>2]=c[b>>2]|512}c[q>>2]=r+1;f=0}else f=-1}else f=-1;while(0);return f|0}function oc(a){a=a|0;if((c[a+4>>2]|0)>-1){a=a+8|0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;c[a+16>>2]=0;a=0}else a=-1;return a|0}function pc(a){a=a|0;if((a|0)!=0?(c[a>>2]|0)!=0:0){c[a+8>>2]=0;c[a+12>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;c[a+36>>2]=0;c[a+324>>2]=0;c[a+328>>2]=0;c[a+332>>2]=0;c[a+340>>2]=-1;a=a+344|0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;a=0}else a=-1;return a|0}function qc(a,b){a=a|0;b=b|0;if((a|0)!=0?(c[a>>2]|0)!=0:0){pc(a)|0;c[a+336>>2]=b;a=0}else a=-1;return a|0}function rc(a,b){a=a|0;b=b|0;if((a|0)!=0?(c[a>>2]|0)!=0:0)b=sc(a,b,1)|0;else b=0;return b|0}function sc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;k=a+36|0;e=c[k>>2]|0;do if((c[a+32>>2]|0)>(e|0)){i=c[a+16>>2]|0;j=c[i+(e<<2)>>2]|0;if(j&1024|0){c[k>>2]=e+1;d=a+344|0;l=d;l=hl(c[l>>2]|0,c[l+4>>2]|0,1,0)|0;c[d>>2]=l;c[d+4>>2]=D;d=-1;break}l=(b|0)!=0;h=(d|0)!=0;if(l|h){d=j&255;f=d;g=j&512;while(1){if((d|0)!=255)break;m=e+1|0;n=c[i+(m<<2)>>2]|0;d=n&255;f=d+f|0;g=(n&512|0)==0?g:512;e=m}if(l){c[b+12>>2]=g;c[b+8>>2]=j&256;c[b>>2]=(c[a>>2]|0)+(c[a+12>>2]|0);n=a+344|0;m=c[n+4>>2]|0;l=b+24|0;c[l>>2]=c[n>>2];c[l+4>>2]=m;l=(c[a+20>>2]|0)+(e<<3)|0;m=c[l+4>>2]|0;n=b+16|0;c[n>>2]=c[l>>2];c[n+4>>2]=m;c[b+4>>2]=f}if(h){d=a+12|0;c[d>>2]=(c[d>>2]|0)+f;c[k>>2]=e+1;d=a+344|0;n=d;n=hl(c[n>>2]|0,c[n+4>>2]|0,1,0)|0;c[d>>2]=n;c[d+4>>2]=D;d=1}else d=1}else d=1}else d=0;while(0);return d|0}function tc(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0;if(a|0){Qc(a+592|0)|0;Sc(a+480|0);ec(a+120|0)|0;h=a+72|0;d=c[h>>2]|0;if(d|0?(f=a+52|0,b=c[f>>2]|0,b|0):0){g=a+76|0;e=0;while(1){if((e|0)>=(b|0))break;sd(d+(e<<5)|0);qd((c[g>>2]|0)+(e<<4)|0);b=c[f>>2]|0;d=c[h>>2]|0;e=e+1|0}qk(d);qk(c[g>>2]|0)}b=c[a+60>>2]|0;if(b|0)qk(b);b=c[a+68>>2]|0;if(b|0)qk(b);b=c[a+64>>2]|0;if(b|0)qk(b);b=c[a+56>>2]|0;if(b|0)qk(b);jc(a+24|0)|0;b=c[a>>2]|0;if(b|0?(i=c[a+712>>2]|0,i|0):0)Cb[i&7](b)|0;il(a|0,0,720)|0}return 0}function uc(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=l;l=l+16|0;h=g;c[h>>2]=c[f>>2];c[h+4>>2]=c[f+4>>2];c[h+8>>2]=c[f+8>>2];c[h+12>>2]=c[f+12>>2];f=vc(a,b,d,e,h)|0;if(!f)f=wc(b)|0;l=g;return f|0}function vc(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;k=l;l=l+16|0;i=k+4|0;j=k;if((a|0)!=0?(g=c[f+4>>2]|0,(g|0)!=0):0)h=Gb[g&7](a,0,0,1)|0;else h=-1;c[i>>2]=0;c[j>>2]=0;il(b|0,0,704)|0;c[b>>2]=a;g=b+704|0;c[g>>2]=c[f>>2];c[g+4>>2]=c[f+4>>2];c[g+8>>2]=c[f+8>>2];c[g+12>>2]=c[f+12>>2];g=b+24|0;ic(g)|0;if(d|0){ol(kc(g,e)|0,d|0,e|0)|0;lc(g,e)|0}if((h|0)!=-1)c[b+4>>2]=1;c[b+52>>2]=1;d=b+72|0;c[d>>2]=rk(1,32)|0;f=b+76|0;c[f>>2]=rk(1,16)|0;dc(b+120|0,-1)|0;f=Hc(b,c[d>>2]|0,c[f>>2]|0,i,j,0)|0;if((f|0)<0){c[b>>2]=0;tc(b)|0;g=c[i>>2]|0}else{j=c[j>>2]|0;d=rk(j+2|0,4)|0;c[b+64>>2]=d;g=c[b+456>>2]|0;c[b+92>>2]=g;c[d>>2]=g;c[d+4>>2]=j;g=c[i>>2]|0;ol(d+8|0,g|0,j<<2|0)|0;c[b+56>>2]=rk(1,8)|0;j=rk(1,8)|0;c[b+60>>2]=j;d=b+8|0;i=c[d+4>>2]|0;c[j>>2]=c[d>>2];c[j+4>>2]=i;c[b+88>>2]=1}if(g|0)qk(g);l=k;return f|0}function wc(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0;p=l;l=l+16|0;m=p;n=p+8|0;b=a+88|0;a:do if((c[b>>2]|0)==1){c[b>>2]=2;if(!(c[a+4>>2]|0)){c[b>>2]=3;b=0;break}k=a+60|0;j=c[k>>2]|0;i=c[j>>2]|0;j=c[j+4>>2]|0;f=m;c[f>>2]=-1;c[f+4>>2]=-1;f=c[a+456>>2]|0;c[n>>2]=f;g=xc(a,c[a+72>>2]|0)|0;h=D;b=c[a+708>>2]|0;do if((b|0)!=0?(d=a+716|0,(c[d>>2]|0)!=0):0){Gb[b&7](c[a>>2]|0,0,0,2)|0;d=Cb[c[d>>2]&7](c[a>>2]|0)|0;b=((d|0)<0)<<31>>31;e=a+16|0;c[e>>2]=d;c[e+4>>2]=b;e=a+8|0;c[e>>2]=d;c[e+4>>2]=b;if((d|0)!=-1){e=a+64|0;q=c[e>>2]|0;b=yc(a,d,b,q+8|0,c[q+4>>2]|0,n,m)|0;d=D;if((d|0)>=0){q=c[e>>2]|0;if((zc(a,0,0,i,j,b,d,c[m>>2]|0,c[m+4>>2]|0,c[n>>2]|0,q+8|0,c[q+4>>2]|0,0)|0)<0){d=a;b=-128;o=11;break}b=c[a+56>>2]|0;c[b>>2]=0;c[b+4>>2]=0;c[c[e>>2]>>2]=f;b=c[k>>2]|0;c[b>>2]=i;c[b+4>>2]=j;b=c[a+68>>2]|0;m=b;c[m>>2]=g;c[m+4>>2]=h;b=b+8|0;m=b;m=gl(c[m>>2]|0,c[m+4>>2]|0,g|0,h|0)|0;q=D;n=(q|0)<0;c[b>>2]=n?0:m;c[b+4>>2]=n?0:q;b=Ac(a,i,j)|0}if(!b){b=0;break a}else d=a}else{d=a;b=-131;o=11}}else o=5;while(0);if((o|0)==5){d=a+8|0;c[d>>2]=-1;c[d+4>>2]=-1;c[d+8>>2]=-1;c[d+12>>2]=-1;d=a;b=-131;o=11}c[d>>2]=0;tc(a)|0}else b=-131;while(0);l=p;return b|0}function xc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0;n=l;l=l+48|0;i=n+32|0;j=n;k=a+120|0;h=c[a+456>>2]|0;d=0;e=0;f=-1;while(1){Dc(a,i,-1,-1)|0;if((D|0)<0)break;if(_b(i)|0)break;if((bc(i)|0)==(h|0)){nc(k,i)|0;g=f;a:while(1){while(1){f=rc(k,j)|0;if(!f)break a;if((f|0)<=0)continue;f=ad(b,j)|0;if((f|0)>-1)break}p=(g|0)==-1;o=f+g>>2;o=hl((p?0:o)|0,(p?0:((o|0)<0)<<31>>31)|0,d|0,e|0)|0;d=o;e=D;g=f}p=ac(i)|0;if((p|0)==-1&(D|0)==-1)f=g;else{m=12;break}}}if((m|0)==12){p=ac(i)|0;d=gl(p|0,D|0,d|0,e|0)|0;e=D}p=(e|0)<0;D=p?0:e;l=n;return (p?0:d)|0}function yc(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;z=l;l=l+16|0;x=z;w=a+8|0;i=-1;j=-1;n=-1;p=-1;q=-1;r=-1;m=b;k=d;o=-1;a:while(1){if(!((i|0)==-1&(n|0)==-1)){y=11;break}v=hl(m|0,k|0,-65536,-1)|0;k=D;i=(k|0)<0;v=i?0:v;k=i?0:k;i=Cc(a,v,k)|0;if(!i){u=p;i=-1;s=-1;t=q}else{y=4;break}while(1){n=w;m=c[n>>2]|0;n=c[n+4>>2]|0;if(!((n|0)<(d|0)|(n|0)==(d|0)&m>>>0<b>>>0)){n=s;p=u;q=t;m=v;continue a}p=gl(b|0,d|0,m|0,n|0)|0;p=Dc(a,x,p,D)|0;q=D;if((p|0)==-128&(q|0)==-1){j=-1;i=-128;break a}if((q|0)<0){n=s;p=u;q=t;m=v;continue a}o=bc(x)|0;m=ac(x)|0;n=D;if((o|0)==(c[g>>2]|0)){i=h;c[i>>2]=m;c[i+4>>2]=n;i=p;j=q}else i=u;s=(Fc(o,e,f)|0)==0;u=s?-1:i;j=s?-1:j;i=p;s=q;t=m;r=n}}if((y|0)==4)j=((i|0)<0)<<31>>31;else if((y|0)==11)if((j|0)>-1|(j|0)==-1&p>>>0>4294967295)i=p;else{c[g>>2]=o;j=h;c[j>>2]=q;c[j+4>>2]=r;j=n}D=j;l=z;return i|0}function zc(a,b,d,e,f,g,h,i,j,k,m,n,o){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;m=m|0;n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0;I=l;l=l+112|0;t=I+8|0;r=I+96|0;E=I;u=I+80|0;C=I+76|0;B=I+72|0;G=I+40|0;F=I+24|0;v=I+16|0;w=t;c[w>>2]=i;c[w+4>>2]=j;c[r>>2]=k;w=E;c[w>>2]=-1;c[w+4>>2]=-1;w=a+456|0;x=c[w>>2]|0;if(!(Fc(k,m,n)|0)){c[C>>2]=0;c[B>>2]=0;t=x+1|0;c[v>>2]=t;A=a+8|0;q=g;p=h;r=g;s=h;a:while(1){d=p;b=q;y=r;z=s;while(1){if(!((d|0)>(f|0)|(d|0)==(f|0)&b>>>0>e>>>0)){p=t;f=y;q=z;H=20;break a}s=gl(b|0,d|0,e|0,f|0)|0;r=D;s=(r|0)<0|(r|0)==0&s>>>0<65536;r=hl(b|0,d|0,e|0,f|0)|0;r=ml(r|0,D|0,2,0)|0;r=s?e:r;s=s?f:D;p=Cc(a,r,s)|0;if(p|0){f=0;break a}p=Dc(a,u,-1,-1)|0;q=D;if((p|0)==-128&(q|0)==-1){f=0;p=-128;break a}if((q|0)>=0?Gc(u,m,n)|0:0)break;J=(q|0)>-1|(q|0)==-1&p>>>0>4294967295;d=s;b=r;y=J?p:y;z=J?q:z}e=A;q=b;p=d;r=y;s=z;f=c[e+4>>2]|0;e=c[e>>2]|0}if((H|0)==20){while(1){H=0;if((p|0)==(x|0))break;c[v>>2]=x;H=yc(a,f,q,m,n,v,E)|0;p=c[v>>2]|0;f=H;q=D;H=20}p=Cc(a,y,z)|0;if(!p){p=Hc(a,G,F,C,B,0)|0;if(!p){q=c[w>>2]|0;s=A;r=c[s>>2]|0;s=c[s+4>>2]|0;e=xc(a,G)|0;b=D;p=A;f=o+1|0;p=zc(a,y,z,c[p>>2]|0,c[p+4>>2]|0,g,h,i,j,k,c[C>>2]|0,c[B>>2]|0,f)|0;if(!p){p=c[C>>2]|0;if(p|0)qk(p);h=(c[a+56>>2]|0)+(f<<3)|0;c[h>>2]=y;c[h+4>>2]=z;c[(c[a+64>>2]|0)+(f<<2)>>2]=q;h=(c[a+60>>2]|0)+(f<<3)|0;c[h>>2]=r;c[h+4>>2]=s;h=(c[a+72>>2]|0)+(f<<5)|0;c[h>>2]=c[G>>2];c[h+4>>2]=c[G+4>>2];c[h+8>>2]=c[G+8>>2];c[h+12>>2]=c[G+12>>2];c[h+16>>2]=c[G+16>>2];c[h+20>>2]=c[G+20>>2];c[h+24>>2]=c[G+24>>2];c[h+28>>2]=c[G+28>>2];h=(c[a+76>>2]|0)+(f<<4)|0;c[h>>2]=c[F>>2];c[h+4>>2]=c[F+4>>2];c[h+8>>2]=c[F+8>>2];c[h+12>>2]=c[F+12>>2];h=E;J=c[h+4>>2]|0;f=o<<1;a=c[a+68>>2]|0;p=a+((f|1)<<3)|0;c[p>>2]=c[h>>2];c[p+4>>2]=J;p=a+(f+2<<3)|0;c[p>>2]=e;c[p+4>>2]=b;f=a+(f+3<<3)|0;a=f;a=gl(c[a>>2]|0,c[a+4>>2]|0,e|0,b|0)|0;p=D;J=(p|0)<0;c[f>>2]=J?0:a;c[f+4>>2]=J?0:p;f=1;p=0}else f=0}else f=0}else f=0}if(f)H=29}else{p=k;f=g;q=h;while(1){if((p|0)==(x|0))break;c[r>>2]=x;J=yc(a,f,q,m,n,r,t)|0;p=c[r>>2]|0;f=J;q=D}r=o+1|0;s=a+52|0;c[s>>2]=r;e=a+56|0;p=c[e>>2]|0;if(p|0)qk(p);q=a+64|0;p=c[q>>2]|0;if(p|0)qk(p);f=a+60|0;p=c[f>>2]|0;if(p|0)qk(p);J=c[s>>2]|0;c[e>>2]=pk((J<<3)+8|0)|0;H=a+72|0;c[H>>2]=sk(c[H>>2]|0,J<<5)|0;H=a+76|0;c[H>>2]=sk(c[H>>2]|0,c[s>>2]<<4)|0;H=c[s>>2]|0;c[q>>2]=pk(H<<2)|0;c[f>>2]=pk(H<<3)|0;H=pk(H<<4)|0;c[a+68>>2]=H;J=c[e>>2]|0;a=J+(r<<3)|0;c[a>>2]=g;c[a+4>>2]=h;h=J+(o<<3)|0;c[h>>2]=b;c[h+4>>2]=d;h=t;J=c[h+4>>2]|0;a=(J|0)<0;H=H+((o<<1|1)<<3)|0;c[H>>2]=a?0:c[h>>2]|0;c[H+4>>2]=a?0:J;H=29}if((H|0)==29)p=0;l=I;return p|0}function Ac(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0;B=l;l=l+416|0;A=B+32|0;v=B+392|0;w=B;x=a+88|0;e=c[x>>2]|0;do if((e|0)>=2)if(c[a+4>>2]|0)if((d|0)>=0?(z=a+16|0,u=c[z+4>>2]|0,!((u|0)<(d|0)|((u|0)==(d|0)?(c[z>>2]|0)>>>0<b>>>0:0))):0){do if((e|0)>2){e=c[a+96>>2]|0;f=c[a+56>>2]|0;z=f+(e<<3)|0;u=c[z+4>>2]|0;if(!((u|0)>(d|0)|((u|0)==(d|0)?(c[z>>2]|0)>>>0>b>>>0:0))?(z=f+(e+1<<3)|0,u=c[z+4>>2]|0,(u|0)>(d|0)|((u|0)==(d|0)?(c[z>>2]|0)>>>0>b>>>0:0)):0)break;Bc(a)}while(0);z=a+80|0;u=z;c[u>>2]=-1;c[u+4>>2]=-1;u=a+120|0;t=a+92|0;qc(u,c[t>>2]|0)|0;Tc(a+480|0)|0;if(Cc(a,b,d)|0){e=z;c[e>>2]=-1;c[e+4>>2]=-1;ec(A)|0;Bc(a);e=-137;break}dc(A,c[t>>2]|0)|0;pc(A)|0;n=a+96|0;s=a+72|0;r=a+64|0;q=a+52|0;o=a+60|0;p=w+16|0;j=0;e=0;k=0;f=0;a:while(1){m=(k|0)==0;b:while(1){while(1){if((c[x>>2]|0)>2?(rc(A,w)|0)>0:0){b=c[n>>2]|0;d=c[s>>2]|0;if(c[d+(b<<5)+28>>2]|0)break b;rc(u,0)|0}if(!m){y=30;break a}d=Dc(a,v,-1,-1)|0;g=D;if((g|0)<0){y=29;break a}if((c[x>>2]|0)>2){i=c[t>>2]|0;if((i|0)!=(bc(v)|0)?_b(v)|0:0){Bc(a);ec(A)|0}if((c[x>>2]|0)>=3)break}h=bc(v)|0;b=c[q>>2]|0;i=0;while(1){if((i|0)>=(b|0))break;if((c[(c[r>>2]|0)+(i<<2)>>2]|0)==(h|0))break;i=i+1|0}if((i|0)!=(b|0)){y=41;break}}if((y|0)==41){y=0;c[n>>2]=i;c[t>>2]=h;qc(u,h)|0;qc(A,h)|0;c[x>>2]=3;e=(c[o>>2]|0)+(i<<3)|0;i=c[e+4>>2]|0;e=((g|0)<(i|0)|((g|0)==(i|0)?d>>>0<=(c[e>>2]|0)>>>0:0))&1}nc(u,v)|0;nc(A,v)|0;f=$b(v)|0}b=ad(d+(b<<5)|0,w)|0;do if((b|0)>=0)if((f|0)==0|(e|0)!=0){j=(m?0:b+k>>2)+j|0;break}else{rc(u,0)|0;break}else{rc(u,0)|0;b=0}while(0);i=p;h=c[i>>2]|0;i=c[i+4>>2]|0;if((h|0)==-1&(i|0)==-1)k=b;else{y=22;break}}if((y|0)==22){d=c[n>>2]|0;g=c[a+68>>2]|0;e=g+(d<<1<<3)|0;e=gl(h|0,i|0,c[e>>2]|0,c[e+4>>2]|0)|0;f=D;b=(f|0)<0;e=b?0:e;f=b?0:f;b=0;while(1){if((b|0)>=(d|0))break;y=g+((b<<1|1)<<3)|0;y=hl(c[y>>2]|0,c[y+4>>2]|0,e|0,f|0)|0;e=y;f=D;b=b+1|0}w=gl(e|0,f|0,j|0,((j|0)<0)<<31>>31|0)|0;y=D;x=(y|0)<0;c[z>>2]=x?0:w;c[z+4>>2]=x?0:y}else if((y|0)==29){y=Ec(a,-1)|0;c[z>>2]=y;c[z+4>>2]=D}else if((y|0)==30){c[z>>2]=-1;c[z+4>>2]=-1}ec(A)|0;e=a+104|0;c[e>>2]=0;c[e+4>>2]=0;c[e+8>>2]=0;c[e+12>>2]=0;e=0}else e=-131;else e=-138;else e=-131;while(0);l=B;return e|0}function Bc(a){a=a|0;Sc(a+480|0);Qc(a+592|0)|0;c[a+88>>2]=2;return}function Cc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;f=c[a>>2]|0;if(f){g=a+8|0;e=g;if(!((c[e>>2]|0)==(b|0)?(c[e+4>>2]|0)==(d|0):0)){e=c[a+708>>2]|0;if((e|0)!=0?(Gb[e&7](f,b,d,0)|0)!=-1:0){c[g>>2]=b;c[g+4>>2]=d;oc(a+24|0)|0;b=0}else b=-128}else b=0}else b=-129;return b|0}function Dc(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;l=a+8|0;if((e|0)>0|(e|0)==0&d>>>0>0){k=l;d=hl(c[k>>2]|0,c[k+4>>2]|0,d|0,e|0)|0;e=D}h=(e|0)>0|(e|0)==0&d>>>0>0;j=a+24|0;i=(d|0)==0&(e|0)==0;k=a+704|0;while(1){if(h?(g=l,f=c[g+4>>2]|0,!((f|0)<(e|0)|((f|0)==(e|0)?(c[g>>2]|0)>>>0<d>>>0:0))):0){e=-1;d=-1;break}f=mc(j,b)|0;if((f|0)<0){g=l;f=gl(c[g>>2]|0,c[g+4>>2]|0,f|0,((f|0)<0)<<31>>31|0)|0;g=l;c[g>>2]=f;c[g+4>>2]=D;continue}if(f|0){m=17;break}if(i){e=-1;d=-1;break}f=yj()|0;c[f>>2]=0;if(!(c[k>>2]|0)){m=16;break}if(!(c[a>>2]|0)){e=-1;d=-2;break}g=kc(j,2048)|0;g=Gb[c[k>>2]&7](g,1,2048,c[a>>2]|0)|0;if((g|0)<=0){m=13;break}lc(j,g)|0}if((m|0)==13)if((g|0)==0?(c[f>>2]|0)==0:0){e=-1;d=-2}else m=16;else if((m|0)==17){e=l;d=c[e>>2]|0;e=c[e+4>>2]|0;b=hl(d|0,e|0,f|0,((f|0)<0)<<31>>31|0)|0;a=l;c[a>>2]=b;c[a+4>>2]=D}if((m|0)==16){e=-1;d=-128}D=e;return d|0}function Ec(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;a:do if(((c[a+88>>2]|0)>=2?(c[a+4>>2]|0)!=0:0)?(f=c[a+52>>2]|0,(f|0)>(b|0)):0){if((b|0)<0){b=0;d=0;e=0}else{b=(c[a+68>>2]|0)+((b<<1|1)<<3)|0;d=c[b+4>>2]|0;b=c[b>>2]|0;break}while(1){if((e|0)>=(f|0))break a;g=Ec(a,e)|0;g=hl(g|0,D|0,b|0,d|0)|0;b=g;d=D;e=e+1|0}}else{d=-1;b=-131}while(0);D=d;return b|0}function Fc(a,b,d){a=a|0;b=b|0;d=d|0;a:do if(!b)d=0;else while(1){if(!d){d=0;break a}if((c[b>>2]|0)==(a|0)){d=1;break}else{d=d+-1|0;b=b+4|0}}while(0);return d|0}function Gc(a,b,c){a=a|0;b=b|0;c=c|0;return Fc(bc(a)|0,b,c)|0}function Hc(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;s=l;l=l+48|0;h=s+32|0;r=s;if(!g){q=Dc(a,h,65536,0)|0;g=D;if(!((q|0)==-128&(g|0)==-1))if((g|0)<0)g=-132;else n=4;else g=-128}else{h=g;n=4}a:do if((n|0)==4){rd(b);pd(d);q=a+88|0;c[q>>2]=2;m=(e|0)==0;o=a+120|0;p=a+456|0;while(1){if(!(_b(h)|0)){n=24;break}if(!m){if(Gc(h,c[e>>2]|0,c[f>>2]|0)|0){n=8;break}k=bc(h)|0;j=(c[f>>2]|0)+1|0;c[f>>2]=j;g=c[e>>2]|0;if(!g){i=pk(4)|0;c[e>>2]=i;g=j}else{i=sk(g,j<<2)|0;c[e>>2]=i;g=c[f>>2]|0}c[i+(g+-1<<2)>>2]=k}if((((c[q>>2]|0)<3?(qc(o,bc(h)|0)|0,nc(o,h)|0,(rc(o,r)|0)>0):0)?td(r)|0:0)?(c[q>>2]=3,ud(b,d,r)|0):0){g=-133;break}k=Dc(a,h,65536,0)|0;g=D;if((k|0)==-128&(g|0)==-1){g=-128;break}if((g|0)<0){g=-132;break}if((c[q>>2]|0)!=3)continue;k=c[p>>2]|0;if((k|0)==(bc(h)|0)){n=23;break}}if((n|0)==8){g=c[e>>2]|0;if(g|0)qk(g);c[e>>2]=0;c[f>>2]=0;g=-133}else if((n|0)==23){nc(o,h)|0;n=24}b:do if((n|0)==24)if((c[q>>2]|0)==3){j=0;g=0;c:while(1){if((g|0)<2)k=g;else{g=0;break a}d:while(1){i=(k|0)<2;if(!i){g=j;break}switch(rc(o,r)|0){case -1:{g=-133;break b}case 0:{g=j;break d}default:{}}g=ud(b,d,r)|0;i=(g|0)==0;if(i)k=(i&1)+k|0;else break b}e:while(1){while(1){if(!i){j=g;g=k;continue c}Dc(a,h,65536,0)|0;if((D|0)<0){g=-133;break b}n=c[p>>2]|0;if((n|0)==(bc(h)|0))break e;if(_b(h)|0)break}if(!g)g=1;else{g=-133;break b}}nc(o,h)|0;j=g;g=k}}else g=-132;while(0);sd(b);qd(d);c[q>>2]=2}while(0);l=s;return g|0}function Ic(a){a=a|0;var b=0,d=0,e=0;e=a+88|0;b=c[e>>2]|0;do if((b|0)<=3)if((b|0)==3){d=a+480|0;b=c[a+72>>2]|0;if(!(c[a+4>>2]|0)){if(Uc(d,b)|0){b=-137;break}}else if(Uc(d,b+(c[a+96>>2]<<5)|0)|0){b=-137;break}Nc(d,a+592|0)|0;c[e>>2]=4;b=a+104|0;c[b>>2]=0;c[b+4>>2]=0;c[b+8>>2]=0;c[b+12>>2]=0;b=0}else b=-129;else b=0;while(0);return b|0}function Jc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0.0;A=l;l=l+48|0;n=A+32|0;w=A;p=a+88|0;t=a+72|0;o=a+120|0;j=w+16|0;y=a+592|0;x=a+4|0;s=a+76|0;q=a+456|0;g=a+92|0;v=a+96|0;r=a+64|0;m=a+52|0;k=n+4|0;u=a+104|0;f=(b|0)==0;a:while(1){b=c[p>>2]|0;if((b|0)==3){b=Ic(a)|0;if((b|0)<0)break;b=c[p>>2]|0}if((b|0)==4){i=bd(c[t>>2]|0)|0;while(1){b=rc(o,w)|0;if((b|0)==-1){b=-3;z=22;break a}if((b|0)<=0)break;e=j;b=c[e>>2]|0;e=c[e+4>>2]|0;if(!($c(y,w)|0)){z=11;break a}}b=c[p>>2]|0}do if((b|0)>1){while(1){Dc(a,n,-1,-1)|0;if((D|0)<0){b=-2;break a}h[u>>3]=+h[u>>3]+ +(c[k>>2]<<3|0);b=c[p>>2]|0;if((b|0)!=4)break;i=c[g>>2]|0;if((i|0)==(bc(n)|0)){z=31;break}if(_b(n)|0){z=28;break}}if((z|0)==28){z=0;if(f){b=-2;break a}Bc(a);if(!(c[x>>2]|0)){sd(c[t>>2]|0);qd(c[s>>2]|0);z=31}else z=31}if((z|0)==31){z=0;b=c[p>>2]|0;if((b|0)==4)break}if((b|0)<3)z=33}else z=33;while(0);do if((z|0)==33){z=0;if(!(c[x>>2]|0)){b=Hc(a,c[t>>2]|0,c[s>>2]|0,0,0,n)|0;if(b|0)break a;c[g>>2]=c[q>>2];c[v>>2]=(c[v>>2]|0)+1;break}d=bc(n)|0;b=c[m>>2]|0;e=0;while(1){if((e|0)>=(b|0))break;if((c[(c[r>>2]|0)+(e<<2)>>2]|0)==(d|0))break;e=e+1|0}if((e|0)==(b|0))continue a;c[g>>2]=d;c[v>>2]=e;qc(o,d)|0;c[p>>2]=3}while(0);nc(o,n)|0}if((z|0)==11){f=a+480|0;if(!(Wc(f,0)|0)){Vc(f,y)|0;B=+((Wc(f,0)|0)<<i|0);z=a+112|0;h[z>>3]=+h[z>>3]+B;h[u>>3]=+h[u>>3]+ +(c[w+4>>2]<<3|0);if(!((b|0)==-1&(e|0)==-1)?(c[w+12>>2]|0)==0:0){if(c[x>>2]|0){d=c[v>>2]|0;if((d|0)>0){g=(c[a+68>>2]|0)+(d<<1<<3)|0;b=gl(b|0,e|0,c[g>>2]|0,c[g+4>>2]|0)|0;e=D;g=d}else g=d}else g=0;d=(e|0)<0;f=(Wc(f,0)|0)<<i;b=gl((d?0:b)|0,(d?0:e)|0,f|0,((f|0)<0)<<31>>31|0)|0;f=a+68|0;d=D;e=0;while(1){if((e|0)>=(g|0))break;z=(c[f>>2]|0)+((e<<1|1)<<3)|0;z=hl(c[z>>2]|0,c[z+4>>2]|0,b|0,d|0)|0;b=z;d=D;e=e+1|0}z=a+80|0;c[z>>2]=b;c[z+4>>2]=d;b=1;z=22}else{b=1;z=22}}else{b=-129;z=22}}l=A;return b|0}function Kc(a,b){a=a|0;b=b|0;do if(c[a+4>>2]|0)if((b|0)<0){b=c[a+72>>2]|0;if((c[a+88>>2]|0)<=2)break;b=b+(c[a+96>>2]<<5)|0;break}else{if((c[a+52>>2]|0)<=(b|0)){b=0;break}b=(c[a+72>>2]|0)+(b<<5)|0;break}else b=c[a+72>>2]|0;while(0);return b|0}function Lc(d,e,f,h,i,j,k,m,n){d=d|0;e=e|0;f=f|0;h=h|0;i=i|0;j=j|0;k=k|0;m=m|0;n=n|0;var o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;w=l;l=l+16|0;r=w;q=d+88|0;p=c[q>>2]|0;a:do if((p|0)>=2){v=d+480|0;while(1){if((p|0)==4?(o=Wc(v,r)|0,o|0):0)break;p=Jc(d,1)|0;if((p|0)==-2){o=0;break a}if((p|0)<1){o=p;break a}p=c[q>>2]|0}if((o|0)>0){t=c[(Kc(d,-1)|0)+4>>2]|0;u=S(t,i)|0;s=(f|0)/(u|0)|0;s=(o|0)>(s|0)?s:o;if((s|0)<1)o=-131;else{if(m|0)Kb[m&3](c[r>>2]|0,t,s,n);o=(j|0)!=0;b:do if((i|0)!=1){n=o?0:32768;if(h|0){o=e;q=0;while(1){if((q|0)<(s|0))p=0;else break b;while(1){if((p|0)>=(t|0))break;e=~~+E(+(+g[(c[(c[r>>2]|0)+(p<<2)>>2]|0)+(q<<2)>>2]*32768.0+.5));e=((e|0)>32767?32767:(e|0)<-32768?-32768:e)+n|0;a[o>>0]=e>>>8;a[o+1>>0]=e;o=o+2|0;p=p+1|0}q=q+1|0}}m=c[r>>2]|0;if(o){q=0;while(1){if((q|0)>=(t|0))break b;o=c[m+(q<<2)>>2]|0;p=e+(q<<1)|0;f=0;while(1){if((f|0)>=(s|0))break;r=~~+E(+(+g[o+(f<<2)>>2]*32768.0+.5));b[p>>1]=(r|0)>32767?32767:((r|0)<-32768?-32768:r)&65535;p=p+(t<<1)|0;f=f+1|0}q=q+1|0}}else{q=0;while(1){if((q|0)>=(t|0))break b;o=c[m+(q<<2)>>2]|0;p=e+(q<<1)|0;f=0;while(1){if((f|0)>=(s|0))break;r=~~+E(+(+g[o+(f<<2)>>2]*32768.0+.5));b[p>>1]=((r|0)>32767?32767:(r|0)<-32768?-32768:r)+n;p=p+(t<<1)|0;f=f+1|0}q=q+1|0}}}else{f=o?0:128;o=e;q=0;while(1){if((q|0)<(s|0))p=0;else break b;while(1){if((p|0)>=(t|0))break;e=~~+E(+(+g[(c[(c[r>>2]|0)+(p<<2)>>2]|0)+(q<<2)>>2]*128.0+.5));a[o>>0]=((e|0)>127?127:(e|0)<-128?-128:e)+f;o=o+1|0;p=p+1|0}q=q+1|0}}while(0);Xc(v,s)|0;e=s<<(bd(c[d+72>>2]|0)|0);v=d+80|0;t=v;t=hl(e|0,((e|0)<0)<<31>>31|0,c[t>>2]|0,c[t+4>>2]|0)|0;c[v>>2]=t;c[v+4>>2]=D;if(k|0)c[k>>2]=c[d+96>>2];o=S(s,u)|0}}}else o=-131;while(0);l=w;return o|0}function Mc(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return Lc(a,b,c,d,e,f,g,0,0)|0}function Nc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=b;e=d+112|0;do{c[d>>2]=0;d=d+4|0}while((d|0)<(e|0));c[b+64>>2]=a;c[b+76>>2]=0;c[b+68>>2]=0;if(!(c[a>>2]|0))return 0;f=rk(1,72)|0;c[b+104>>2]=f;g[f+4>>2]=-9999.0;d=b+4|0;e=f+12|0;a=0;while(1)if((a|0)!=7){b=rk(1,20)|0;c[e+(a<<2)>>2]=b;Sb(b);a=a+1|0;if((a|0)==15)break;else continue}else{c[f+40>>2]=d;Sb(d);a=a+1|0;continue}return 0}function Oc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;b=b+7&-8;d=a+72|0;e=c[d>>2]|0;f=a+76|0;g=a+68|0;h=c[g>>2]|0;if((e+b|0)<=(c[f>>2]|0)){a=h;h=e;a=a+h|0;h=h+b|0;c[d>>2]=h;return a|0}if(h|0){i=pk(8)|0;j=a+80|0;c[j>>2]=(c[j>>2]|0)+e;a=a+84|0;c[i+4>>2]=c[a>>2];c[i>>2]=h;c[a>>2]=i}c[f>>2]=b;j=pk(b)|0;c[g>>2]=j;c[d>>2]=0;i=0;j=j+i|0;i=i+b|0;c[d>>2]=i;return j|0}function Pc(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;e=a+84|0;b=c[e>>2]|0;if(b|0)do{d=b;b=c[b+4>>2]|0;qk(c[d>>2]|0);qk(d)}while((b|0)!=0);b=a+80|0;d=c[b>>2]|0;if(!d){a=a+72|0;c[a>>2]=0;c[e>>2]=0;return}g=a+68|0;f=a+76|0;c[g>>2]=sk(c[g>>2]|0,(c[f>>2]|0)+d|0)|0;c[f>>2]=(c[f>>2]|0)+(c[b>>2]|0);c[b>>2]=0;a=a+72|0;c[a>>2]=0;c[e>>2]=0;return}function Qc(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0;h=c[a+104>>2]|0;g=a+84|0;b=c[g>>2]|0;if(b|0)do{f=b;b=c[b+4>>2]|0;qk(c[f>>2]|0);qk(f)}while((b|0)!=0);f=a+80|0;e=c[f>>2]|0;d=a+68|0;b=c[d>>2]|0;if(e){i=a+76|0;b=sk(b,(c[i>>2]|0)+e|0)|0;c[d>>2]=b;c[i>>2]=(c[i>>2]|0)+(c[f>>2]|0);c[f>>2]=0}c[a+72>>2]=0;c[g>>2]=0;if(b|0)qk(b);if(!h){b=a+112|0;do{c[a>>2]=0;a=a+4|0}while((a|0)<(b|0));return 0}e=h+12|0;b=0;while(1){d=e+(b<<2)|0;Ub(c[d>>2]|0);if((b|0)!=7){qk(c[d>>2]|0);b=b+1|0;if((b|0)==15)break;else continue}else{b=b+1|0;continue}}qk(h);b=a+112|0;do{c[a>>2]=0;a=a+4|0}while((a|0)<(b|0));return 0}function Rc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;p=c[b+28>>2]|0;if(!p){a=1;return a|0}j=p+8|0;if((c[j>>2]|0)<1){a=1;return a|0}g=c[p>>2]|0;if((g|0)<64){a=1;return a|0}o=p+4|0;if((c[o>>2]|0)<(g|0)){a=1;return a|0}i=c[p+3656>>2]|0;g=a;h=g+112|0;do{c[g>>2]=0;g=g+4|0}while((g|0)<(h|0));n=rk(1,136)|0;c[a+104>>2]=n;c[a+4>>2]=b;c[n+44>>2]=Dd((c[j>>2]|0)+-1|0)|0;q=rk(1,4)|0;c[n+12>>2]=q;g=rk(1,4)|0;j=n+16|0;c[j>>2]=g;h=rk(1,20)|0;c[q>>2]=h;c[g>>2]=rk(1,20)|0;Od(h,c[p>>2]>>i);Od(c[c[j>>2]>>2]|0,c[o>>2]>>i);c[n+4>>2]=(Dd(c[p>>2]|0)|0)+-7;c[n+8>>2]=(Dd(c[o>>2]|0)|0)+-7;a:do if(!d){i=p+2848|0;if((c[i>>2]|0)==0?(m=p+24|0,c[i>>2]=rk(c[m>>2]|0,56)|0,e=c[m>>2]|0,(e|0)>0):0){j=p+1824|0;h=0;while(1){f=j+(h<<2)|0;g=c[f>>2]|0;if(!g)break;if(Kd((c[i>>2]|0)+(h*56|0)|0,g)|0){l=22;break}Hd(c[f>>2]|0);c[f>>2]=0;h=h+1|0;e=c[m>>2]|0;if((h|0)>=(e|0))break a}if((l|0)==22)e=c[m>>2]|0;if((e|0)>0){h=0;do{f=j+(h<<2)|0;g=c[f>>2]|0;if(g){Hd(g);c[f>>2]=0;e=c[m>>2]|0}h=h+1|0}while((h|0)<(e|0))}Sc(a);q=-1;return q|0}}else{Yd(n+20|0,c[p>>2]|0);Yd(n+32|0,c[o>>2]|0);g=p+2848|0;b:do if((c[g>>2]|0)==0?(k=p+24|0,f=rk(c[k>>2]|0,56)|0,c[g>>2]=f,(c[k>>2]|0)>0):0){h=p+1824|0;e=0;while(1){Jd(f+(e*56|0)|0,c[h+(e<<2)>>2]|0)|0;e=e+1|0;if((e|0)>=(c[k>>2]|0))break b;f=c[g>>2]|0}}while(0);g=p+28|0;e=rk(c[g>>2]|0,52)|0;h=n+56|0;c[h>>2]=e;c:do if((c[g>>2]|0)>0){i=p+2852|0;j=p+2868|0;d=b+8|0;f=0;while(1){q=c[i+(f<<2)>>2]|0;ed(e+(f*52|0)|0,q,j,(c[p+(c[q>>2]<<2)>>2]|0)/2|0,c[d>>2]|0);f=f+1|0;if((f|0)>=(c[g>>2]|0))break c;e=c[h>>2]|0}}while(0);c[a>>2]=1}while(0);i=c[o>>2]|0;c[a+16>>2]=i;g=c[b+4>>2]|0;q=g<<2;e=pk(q)|0;h=a+8|0;c[h>>2]=e;c[a+12>>2]=pk(q)|0;d:do if((g|0)>0){f=0;while(1){c[e+(f<<2)>>2]=rk(i,4)|0;f=f+1|0;if((f|0)>=(g|0))break d;e=c[h>>2]|0}}while(0);c[a+36>>2]=0;c[a+40>>2]=0;h=(c[o>>2]|0)/2|0;c[a+48>>2]=h;c[a+20>>2]=h;h=p+16|0;i=n+48|0;c[i>>2]=rk(c[h>>2]|0,4)|0;d=p+20|0;j=n+52|0;c[j>>2]=rk(c[d>>2]|0,4)|0;if((c[h>>2]|0)>0){e=p+800|0;f=p+1056|0;g=0;do{q=Ib[c[(c[57724+(c[e+(g<<2)>>2]<<2)>>2]|0)+8>>2]&15](a,c[f+(g<<2)>>2]|0)|0;c[(c[i>>2]|0)+(g<<2)>>2]=q;g=g+1|0}while((g|0)<(c[h>>2]|0))}if((c[d>>2]|0)<=0){q=0;return q|0}g=p+1312|0;e=p+1568|0;f=0;do{q=Ib[c[(c[57732+(c[g+(f<<2)>>2]<<2)>>2]|0)+8>>2]&15](a,c[e+(f<<2)>>2]|0)|0;c[(c[j>>2]|0)+(f<<2)>>2]=q;f=f+1|0}while((f|0)<(c[d>>2]|0));e=0;return e|0}function Sc(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;if(!a)return;k=c[a+4>>2]|0;l=(k|0)!=0;if(l)i=c[k+28>>2]|0;else i=0;o=c[a+104>>2]|0;n=(o|0)!=0;if(n){b=c[o>>2]|0;if(b|0){Yc(b);qk(c[o>>2]|0)}b=o+12|0;e=c[b>>2]|0;if(e|0){Pd(c[e>>2]|0);qk(c[c[b>>2]>>2]|0);qk(c[b>>2]|0)}b=o+16|0;e=c[b>>2]|0;if(e|0){Pd(c[e>>2]|0);qk(c[c[b>>2]>>2]|0);qk(c[b>>2]|0)}f=o+48|0;b=c[f>>2]|0;if(b|0){if((i|0)!=0?(g=i+16|0,(c[g>>2]|0)>0):0){e=0;do{zb[c[(c[57724+(c[i+800+(e<<2)>>2]<<2)>>2]|0)+16>>2]&31](c[b+(e<<2)>>2]|0);e=e+1|0;b=c[f>>2]|0}while((e|0)<(c[g>>2]|0))}qk(b)}f=o+52|0;b=c[f>>2]|0;if(b|0){if((i|0)!=0?(h=i+20|0,(c[h>>2]|0)>0):0){e=0;do{zb[c[(c[57732+(c[i+1312+(e<<2)>>2]<<2)>>2]|0)+16>>2]&31](c[b+(e<<2)>>2]|0);e=e+1|0;b=c[f>>2]|0}while((e|0)<(c[h>>2]|0))}qk(b)}f=o+56|0;b=c[f>>2]|0;if(b|0){if((i|0)!=0?(j=i+28|0,(c[j>>2]|0)>0):0){e=0;do{gd(b+(e*52|0)|0);e=e+1|0;b=c[f>>2]|0}while((e|0)<(c[j>>2]|0))}qk(b)}b=c[o+60>>2]|0;if(b|0)cd(b);Md(o+80|0);Zd(o+20|0);Zd(o+32|0)}f=a+8|0;b=c[f>>2]|0;if(b|0){if(l?(m=k+4|0,d=c[m>>2]|0,(d|0)>0):0){e=0;do{b=c[b+(e<<2)>>2]|0;if(b){qk(b);d=c[m>>2]|0}e=e+1|0;b=c[f>>2]|0}while((e|0)<(d|0))}qk(b);b=c[a+12>>2]|0;if(b|0)qk(b)}if(n){b=c[o+64>>2]|0;if(b|0)qk(b);b=c[o+68>>2]|0;if(b|0)qk(b);b=c[o+72>>2]|0;if(b|0)qk(b);qk(o)}b=a+112|0;do{c[a>>2]=0;a=a+4|0}while((a|0)<(b|0));return}function Tc(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=c[a+104>>2]|0;if((d|0)==0|(b|0)==0){a=-1;return a|0}b=c[b+28>>2]|0;if(!b){a=-1;return a|0}e=c[b+3656>>2]|0;b=c[b+4>>2]>>e+1;c[a+48>>2]=b;c[a+20>>2]=b>>e;c[a+24>>2]=-1;b=a+56|0;c[b>>2]=-1;c[b+4>>2]=-1;c[b+8>>2]=-1;c[b+12>>2]=-1;c[a+32>>2]=0;a=d+128|0;c[a>>2]=-1;c[a+4>>2]=-1;a=0;return a|0}function Uc(a,b){a=a|0;b=b|0;var d=0,e=0;if(Rc(a,b,0)|0){Sc(a);a=1;return a|0}b=c[a+4>>2]|0;d=c[a+104>>2]|0;if((d|0)==0|(b|0)==0){a=0;return a|0}b=c[b+28>>2]|0;if(!b){a=0;return a|0}e=c[b+3656>>2]|0;b=c[b+4>>2]>>e+1;c[a+48>>2]=b;c[a+20>>2]=b>>e;c[a+24>>2]=-1;b=a+56|0;c[b>>2]=-1;c[b+4>>2]=-1;c[b+8>>2]=-1;c[b+12>>2]=-1;c[a+32>>2]=0;a=d+128|0;c[a>>2]=-1;c[a+4>>2]=-1;a=0;return a|0}function Vc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;m=c[a+4>>2]|0;I=c[m+28>>2]|0;F=c[a+104>>2]|0;L=c[I+3656>>2]|0;if(!b){b=-131;return b|0}M=a+20|0;j=c[M>>2]|0;J=a+24|0;d=c[J>>2]|0;if(!((j|0)<=(d|0)|(d|0)==-1)){b=-131;return b|0}G=a+40|0;n=c[G>>2]|0;H=a+36|0;c[H>>2]=n;o=c[b+28>>2]|0;c[G>>2]=o;c[a+44>>2]=-1;k=a+64|0;f=k;e=c[f>>2]|0;f=c[f+4>>2]|0;if(!((e|0)==-1&(f|0)==-1)){h=hl(e|0,f|0,1,0)|0;e=D;i=b+56|0;f=c[i>>2]|0;i=c[i+4>>2]|0;if((h|0)==(f|0)&(e|0)==(i|0))f=h;else{e=i;l=6}}else{e=b+56|0;f=c[e>>2]|0;e=c[e+4>>2]|0;l=6}if((l|0)==6){E=a+56|0;c[E>>2]=-1;c[E+4>>2]=-1;E=F+128|0;c[E>>2]=-1;c[E+4>>2]=-1}E=k;c[E>>2]=f;c[E+4>>2]=e;do if(c[b>>2]|0){C=L+1|0;z=c[I+(o<<2)>>2]>>C;A=c[I>>2]>>C;C=c[I+4>>2]>>C;B=c[b+88>>2]|0;e=a+72|0;E=e;B=hl(c[E>>2]|0,c[E+4>>2]|0,B|0,((B|0)<0)<<31>>31|0)|0;c[e>>2]=B;c[e+4>>2]=D;e=c[b+92>>2]|0;B=a+80|0;E=B;e=hl(c[E>>2]|0,c[E+4>>2]|0,e|0,((e|0)<0)<<31>>31|0)|0;c[B>>2]=e;c[B+4>>2]=D;B=c[b+96>>2]|0;e=a+88|0;E=e;B=hl(c[E>>2]|0,c[E+4>>2]|0,B|0,((B|0)<0)<<31>>31|0)|0;c[e>>2]=B;c[e+4>>2]=D;e=c[b+100>>2]|0;B=a+96|0;E=B;e=hl(c[E>>2]|0,c[E+4>>2]|0,e|0,((e|0)<0)<<31>>31|0)|0;c[B>>2]=e;c[B+4>>2]=D;B=a+48|0;e=c[B>>2]|0;E=(e|0)==0;k=E?C:0;E=E?0:C;y=m+4|0;if((c[y>>2]|0)>0){p=F+4|0;q=a+8|0;l=(C|0)/2|0;s=(A|0)/2|0;m=l-s|0;r=(A|0)>0;s=s+l|0;t=A+-1|0;u=(z|0)>0;v=F+8|0;w=(C|0)>0;x=C+-1|0;l=l+k+((A|0)/-2|0)|0;f=n;e=o;d=0;while(1){i=(e|0)!=0;a:do if(!f){j=Zc((c[p>>2]|0)-L|0)|0;e=c[(c[q>>2]|0)+(d<<2)>>2]|0;h=c[(c[b>>2]|0)+(d<<2)>>2]|0;if(!i){if(r)f=0;else break;while(1){o=e+(f+k<<2)|0;g[o>>2]=+g[o>>2]*+g[j+(t-f<<2)>>2]+ +g[h+(f<<2)>>2]*+g[j+(f<<2)>>2];f=f+1|0;if((f|0)==(A|0))break a}}if(r){f=0;do{o=e+(f+k<<2)|0;g[o>>2]=+g[o>>2]*+g[j+(t-f<<2)>>2]+ +g[h+(f+m<<2)>>2]*+g[j+(f<<2)>>2];f=f+1|0}while((f|0)!=(A|0));f=A}else f=0;if((f|0)<(s|0))do{g[e+(f+k<<2)>>2]=+g[h+(f+m<<2)>>2];f=f+1|0}while((f|0)!=(s|0))}else if(i){f=Zc((c[v>>2]|0)-L|0)|0;e=c[(c[q>>2]|0)+(d<<2)>>2]|0;h=c[(c[b>>2]|0)+(d<<2)>>2]|0;if(w)i=0;else break;do{o=e+(i+k<<2)|0;g[o>>2]=+g[o>>2]*+g[f+(x-i<<2)>>2]+ +g[h+(i<<2)>>2]*+g[f+(i<<2)>>2];i=i+1|0}while((i|0)!=(C|0))}else{f=Zc((c[p>>2]|0)-L|0)|0;e=c[(c[q>>2]|0)+(d<<2)>>2]|0;h=c[(c[b>>2]|0)+(d<<2)>>2]|0;if(r)i=0;else break;do{o=e+(l+i<<2)|0;g[o>>2]=+g[o>>2]*+g[f+(t-i<<2)>>2]+ +g[h+(i<<2)>>2]*+g[f+(i<<2)>>2];i=i+1|0}while((i|0)!=(A|0))}while(0);if(u){f=0;do{g[e+(f+E<<2)>>2]=+g[h+(f+z<<2)>>2];f=f+1|0}while((f|0)!=(z|0))}d=d+1|0;if((d|0)>=(c[y>>2]|0))break;f=c[H>>2]|0;e=c[G>>2]|0}e=c[B>>2]|0;d=c[J>>2]|0}c[B>>2]=(e|0)==0?C:0;if((d|0)==-1){c[J>>2]=E;c[M>>2]=E;l=E;k=E;break}else{c[J>>2]=k;l=(((c[I+(c[G>>2]<<2)>>2]|0)/4|0)+((c[I+(c[H>>2]<<2)>>2]|0)/4|0)>>L)+k|0;c[M>>2]=l;break}}else{l=j;k=d}while(0);f=F+128|0;e=f;d=c[e>>2]|0;e=c[e+4>>2]|0;if((d|0)==-1&(e|0)==-1){h=0;i=0}else{h=((c[I+(c[G>>2]<<2)>>2]|0)/4|0)+((c[I+(c[H>>2]<<2)>>2]|0)/4|0)|0;h=hl(h|0,((h|0)<0)<<31>>31|0,d|0,e|0)|0;i=D}j=f;c[j>>2]=h;c[j+4>>2]=i;j=a+56|0;e=j;d=c[e>>2]|0;e=c[e+4>>2]|0;do if((d|0)==-1&(e|0)==-1){e=b+48|0;d=c[e>>2]|0;e=c[e+4>>2]|0;if(!((d|0)==-1&(e|0)==-1)?(K=j,c[K>>2]=d,c[K+4>>2]=e,(i|0)>(e|0)|(i|0)==(e|0)&h>>>0>d>>>0):0){d=gl(h|0,i|0,d|0,e|0)|0;d=(d|0)<0?0:d;if(!(c[b+44>>2]|0)){M=k+(d>>L)|0;c[J>>2]=(M|0)>(l|0)?l:M;break}else{K=l-k<<L;c[M>>2]=l-(((d|0)>(K|0)?K:d)>>L);break}}}else{h=((c[I+(c[G>>2]<<2)>>2]|0)/4|0)+((c[I+(c[H>>2]<<2)>>2]|0)/4|0)|0;d=hl(h|0,((h|0)<0)<<31>>31|0,d|0,e|0)|0;e=D;h=j;c[h>>2]=d;c[h+4>>2]=e;h=b+48|0;f=c[h>>2]|0;h=c[h+4>>2]|0;if(!((f|0)==-1&(h|0)==-1|(d|0)==(f|0)&(e|0)==(h|0))){if(((e|0)>(h|0)|(e|0)==(h|0)&d>>>0>f>>>0?(K=gl(d|0,e|0,f|0,h|0)|0,K|0):0)?c[b+44>>2]|0:0){J=l-k<<L;K=(K|0)>(J|0)?J:K;c[M>>2]=l-(((K|0)<0?0:K)>>L)}M=j;c[M>>2]=f;c[M+4>>2]=h}}while(0);if(!(c[b+44>>2]|0)){b=0;return b|0}c[a+32>>2]=1;b=0;return b|0}function Wc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;g=c[a+24>>2]|0;if((g|0)<=-1){b=0;return b|0}h=c[a+20>>2]|0;if((h|0)<=(g|0)){b=0;return b|0}if(b|0){e=c[(c[a+4>>2]|0)+4>>2]|0;if((e|0)>0){f=a+8|0;a=a+12|0;d=0;do{c[(c[a>>2]|0)+(d<<2)>>2]=(c[(c[f>>2]|0)+(d<<2)>>2]|0)+(g<<2);d=d+1|0}while((d|0)<(e|0))}else a=a+12|0;c[b>>2]=c[a>>2]}b=h-g|0;return b|0}function Xc(a,b){a=a|0;b=b|0;var d=0;d=c[a+24>>2]|0;if(b|0?(d+b|0)>(c[a+20>>2]|0):0){a=-131;return a|0}c[a+24>>2]=d+b;a=0;return a|0}function Yc(a){a=a|0;Pd(a+16|0);qk(c[a+48>>2]|0);qk(c[a+64>>2]|0);qk(c[a+80>>2]|0);qk(c[a+96>>2]|0);qk(c[a+112>>2]|0);qk(c[a+128>>2]|0);qk(c[a+144>>2]|0);qk(c[a+36>>2]|0);qk(c[a+152>>2]|0);qk(c[a+160>>2]|0);il(a|0,0,180)|0;return}function Zc(a){a=a|0;return c[1852+(a<<2)>>2]|0}function _c(a,b,d,e,f,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0;k=(f|0)!=0;j=k?e:0;k=k?h:0;l=c[1852+(c[b+(j<<2)>>2]<<2)>>2]|0;n=c[1852+(c[b+(k<<2)>>2]<<2)>>2]|0;o=c[d+(f<<2)>>2]|0;j=c[d+(j<<2)>>2]|0;k=c[d+(k<<2)>>2]|0;f=(o|0)/4|0;d=(j|0)/4|0;i=f-d|0;j=(j|0)/2|0;e=((o|0)/2|0)+f+((k|0)/-4|0)|0;h=(k|0)/2|0;m=e+h|0;if((i|0)>0){il(a|0,0,i<<2|0)|0;b=i}else b=0;if((b|0)<(i+j|0)){d=f+j-b-d|0;f=0;while(1){j=a+(b<<2)|0;g[j>>2]=+g[l+(f<<2)>>2]*+g[j>>2];f=f+1|0;if((f|0)==(d|0))break;else b=b+1|0}}if((k|0)>1){b=e+1|0;f=(m|0)>(b|0);do{h=h+-1|0;l=a+(e<<2)|0;g[l>>2]=+g[n+(h<<2)>>2]*+g[l>>2];e=e+1|0}while((e|0)<(m|0));e=f?m:b}if((o|0)<=(e|0))return;il(a+(e<<2)|0,0,o-e<<2|0)|0;return}function $c(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;h=(a|0)!=0;if(h?(d=c[a+64>>2]|0,(d|0)!=0):0){e=c[d+104>>2]|0;d=c[d+4>>2]|0;if(!d){f=1;g=0;k=0;j=0}else{f=1;g=1;k=c[d+28>>2]|0;j=d}}else{e=0;f=0;g=0;k=0;j=0}i=h?a+4|0:0;if(!(f&(e|0)!=0&g&(k|0)!=0&h)){a=-136;return a|0}Pc(a);Vb(i,c[b>>2]|0,c[b+4>>2]|0);if(Yb(i,1)|0){a=-135;return a|0}d=Yb(i,c[e+44>>2]|0)|0;if((d|0)==-1){a=-136;return a|0}c[a+40>>2]=d;g=k+32+(d<<2)|0;d=c[g>>2]|0;if(!d){a=-136;return a|0}h=c[d>>2]|0;d=a+28|0;c[d>>2]=h;do if(h){c[a+24>>2]=Yb(i,1)|0;i=Yb(i,1)|0;c[a+32>>2]=i;if((i|0)==-1){a=-136;return a|0}else{d=c[d>>2]|0;break}}else{c[a+24>>2]=0;c[a+32>>2]=0;d=0}while(0);f=b+16|0;i=c[f+4>>2]|0;h=a+48|0;c[h>>2]=c[f>>2];c[h+4>>2]=i;h=b+24|0;i=c[h+4>>2]|0;f=a+56|0;c[f>>2]=c[h>>2];c[f+4>>2]=i;c[a+44>>2]=c[b+12>>2];f=a+36|0;c[f>>2]=c[k+(d<<2)>>2];d=j+4|0;c[a>>2]=Oc(a,c[d>>2]<<2)|0;if((c[d>>2]|0)>0){e=0;do{b=Oc(a,c[f>>2]<<2)|0;c[(c[a>>2]|0)+(e<<2)>>2]=b;e=e+1|0}while((e|0)<(c[d>>2]|0))}b=c[(c[g>>2]|0)+12>>2]|0;a=Ib[c[(c[57744+(c[k+288+(b<<2)>>2]<<2)>>2]|0)+16>>2]&15](a,c[k+544+(b<<2)>>2]|0)|0;return a|0}function ad(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=l;l=l+32|0;f=h;d=c[a+28>>2]|0;if((d|0)!=0?(e=d+8|0,(c[e>>2]|0)>=1):0){Vb(f,c[b>>2]|0,c[b+4>>2]|0);if(!(Yb(f,1)|0)){a=Yb(f,Dd((c[e>>2]|0)+-1|0)|0)|0;if((a|0)!=-1?(g=c[d+32+(a<<2)>>2]|0,(g|0)!=0):0)a=c[d+(c[g>>2]<<2)>>2]|0;else a=-136}else a=-135}else a=-129;l=h;return a|0}function bd(a){a=a|0;return c[(c[a+28>>2]|0)+3656>>2]|0}function cd(a){a=a|0;if(!a)return;qk(a);return}function dd(a){a=a|0;if(a|0)qk(a);return}function ed(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var h=0,i=0,j=0.0,k=0,l=0.0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0.0,u=0,v=0,w=0.0,x=0,y=0.0,z=0.0;h=a;i=h+48|0;do{c[h>>2]=0;h=h+4|0}while((h|0)<(i|0));v=c[d>>2]|0;c[a+36>>2]=v;k=~~(+dk(+Q(+(+(v|0)*8.0))/.6931471805599453)+-1.0);c[a+32>>2]=k;y=+(f|0);w=+(e|0);t=+(1<<k+1|0);v=~~((+Q(+(y*.25*.5/w))*1.4426950216293335+-5.965784072875977)*t-+(v|0));c[a+28>>2]=v;c[a+40>>2]=1-v+~~((+Q(+((+(e|0)+.25)*y*.5/w))*1.4426950216293335+-5.965784072875977)*t+.5);v=e<<2;k=pk(v)|0;c[a+16>>2]=k;u=pk(v)|0;c[a+20>>2]=u;s=pk(v)|0;c[a+24>>2]=s;x=a+4|0;c[x>>2]=b;c[a>>2]=e;c[a+44>>2]=f;d=a+48|0;g[d>>2]=1.0;do if((f|0)>=26e3){if((f|0)<38e3){g[d>>2]=.9399999976158142;break}if((f|0)>46e3)g[d>>2]=1.274999976158142}else g[d>>2]=0.0;while(0);y=+(f|0);h=0;d=0;a:while(1){do{if((h|0)>=87)break a;r=h;h=h+1|0;i=~~+dk(w*(+P(+((+(h|0)*.125+-2.0+5.965784072875977)*.6931470036506653))*2.0)/y);j=+g[34524+(r<<2)>>2]}while((i|0)<=(d|0));l=(+g[34524+(h<<2)>>2]-j)/+(i-d|0);if((d|0)>=(e|0))continue;r=d-i|0;i=d-e|0;i=d-(r>>>0>i>>>0?r:i)|0;while(1){g[k+(d<<2)>>2]=j+100.0;d=d+1|0;if((d|0)==(i|0)){d=i;continue a}else j=l+j}}if((d|0)<(e|0))do{g[k+(d<<2)>>2]=+g[k+(d+-1<<2)>>2];d=d+1|0}while((d|0)!=(e|0));r=(e|0)>0;if(r){f=(f|0)/(e<<1|0)|0;m=c[b+120>>2]|0;n=b+124|0;o=b+116|0;p=b+112|0;d=1;q=0;h=-99;do{k=S(f,q)|0;l=+(k|0);l=+N(+(l*7.399999885819852e-04))*13.100000381469727+ +N(+(+(S(k,k)|0)*1.8499999754340024e-08))*2.240000009536743+l*9.999999747378752e-05;b:do if((m+h|0)<(q|0)){j=l-+g[p>>2];i=h;while(1){k=S(i,f)|0;z=+(k|0);h=i+1|0;if(!(z*9.999999747378752e-05+(+N(+(z*7.399999885819852e-04))*13.100000381469727+ +N(+(+(S(k,k)|0)*1.8499999754340024e-08))*2.240000009536743)<j)){h=i;break b}if((m+h|0)<(q|0))i=h;else break}}while(0);c:do if((d|0)<=(e|0)){k=(c[n>>2]|0)+q|0;i=d;while(1){if((i|0)>=(k|0)?(d=S(i,f)|0,z=+(d|0),z=z*9.999999747378752e-05+(+N(+(z*7.399999885819852e-04))*13.100000381469727+ +N(+(+(S(d,d)|0)*1.8499999754340024e-08))*2.240000009536743),!(z<l+ +g[o>>2])):0){d=i;break c}d=i+1|0;if((i|0)<(e|0))i=d;else break}}while(0);c[s+(q<<2)>>2]=(h<<16)+-65537+d;q=q+1|0}while((q|0)<(e|0));if(r){d=0;do{c[u+(d<<2)>>2]=~~((+Q(+(y*((+(d|0)+.25)*.5)/w))*1.4426950216293335+-5.965784072875977)*t+.5);d=d+1|0}while((d|0)!=(e|0))}}c[a+8>>2]=fd(b+36|0,y*.5/w,e,+g[b+24>>2],+g[b+28>>2])|0;b=pk(12)|0;c[a+12>>2]=b;k=pk(v)|0;c[b>>2]=k;f=pk(v)|0;c[b+4>>2]=f;i=pk(v)|0;c[b+8>>2]=i;if(!r)return;j=w*2.0;d=c[x>>2]|0;h=0;do{z=(+Q(+(y*(+(h|0)+.5)/j))*1.4426950216293335+-5.965784072875977)*2.0;z=z<0.0?0.0:z;z=!(z>=16.0)?z:16.0;b=~~z;z=z-+(b|0);w=1.0-z;x=b+1|0;g[k+(h<<2)>>2]=w*+g[d+132+(b<<2)>>2]+z*+g[d+132+(x<<2)>>2];g[f+(h<<2)>>2]=w*+g[d+200+(b<<2)>>2]+z*+g[d+200+(x<<2)>>2];g[i+(h<<2)>>2]=w*+g[d+268+(b<<2)>>2]+z*+g[d+268+(x<<2)>>2];h=h+1|0}while((h|0)!=(e|0));return}function fd(a,b,d,e,f){a=a|0;b=+b;d=d|0;e=+e;f=+f;var h=0,i=0,j=0.0,k=0.0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;C=l;l=l+32480|0;q=C+32256|0;B=C+1792|0;r=C;z=l;l=l+((1*(d<<2)|0)+15&-16)|0;A=pk(68)|0;il(B|0,0,30464)|0;o=e>0.0;p=e<0.0;s=0;do{m=s<<2;n=0;do{i=n+m|0;if((i|0)<88)k=+g[34524+(i<<2)>>2];else k=-30.0;h=i+1|0;if((h|0)<88){j=+g[34524+(h<<2)>>2];if(!(k>j))j=k}else if(k>-30.0)j=-30.0;else j=k;h=i+2|0;if((h|0)<88){k=+g[34524+(h<<2)>>2];if(!(j>k))k=j}else if(j>-30.0)k=-30.0;else k=j;h=i+3|0;if((h|0)<88){j=+g[34524+(h<<2)>>2];if(!(k>j))j=k}else if(k>-30.0)j=-30.0;else j=k;g[q+(n<<2)>>2]=j;n=n+1|0}while((n|0)!=56);y=34876+(s*1344|0)|0;ol(B+(s*1792|0)+448|0,y|0,224)|0;ol(B+(s*1792|0)+672|0,34876+(s*1344|0)+224|0,224)|0;ol(B+(s*1792|0)+896|0,34876+(s*1344|0)+448|0,224)|0;ol(B+(s*1792|0)+1120|0,34876+(s*1344|0)+672|0,224)|0;ol(B+(s*1792|0)+1344|0,34876+(s*1344|0)+896|0,224)|0;ol(B+(s*1792|0)+1568|0,34876+(s*1344|0)+1120|0,224)|0;ol(B+(s*1792|0)|0,y|0,224)|0;ol(B+(s*1792|0)+224|0,y|0,224)|0;if(o){i=0;do{if(p){h=0;do{y=16-h|0;k=+(((y|0)>-1?y:0-y|0)|0)*f+e;k=k<0.0?0.0:k;y=B+(s*1792|0)+(i*224|0)+(h<<2)|0;g[y>>2]=(k>0.0?0.0:k)+ +g[y>>2];h=h+1|0}while((h|0)!=56)}else{h=0;do{y=16-h|0;k=+(((y|0)>-1?y:0-y|0)|0)*f+e;y=B+(s*1792|0)+(i*224|0)+(h<<2)|0;g[y>>2]=(k<0.0?0.0:k)+ +g[y>>2];h=h+1|0}while((h|0)!=56)}i=i+1|0}while((i|0)!=8)}else{i=0;do{if(p){h=0;do{y=16-h|0;k=+(((y|0)>-1?y:0-y|0)|0)*f+e;y=B+(s*1792|0)+(i*224|0)+(h<<2)|0;g[y>>2]=(k>0.0?0.0:k)+ +g[y>>2];h=h+1|0}while((h|0)!=56)}else{h=0;do{x=16-h|0;y=B+(s*1792|0)+(i*224|0)+(h<<2)|0;g[y>>2]=+(((x|0)>-1?x:0-x|0)|0)*f+e+ +g[y>>2];h=h+1|0}while((h|0)!=56)}i=i+1|0}while((i|0)!=8)}k=+g[a+(s<<2)>>2]+100.0;m=0;do{j=k-((m|0)<2?20.0:+(m|0)*10.0)+-30.0;h=0;do{y=B+(s*1792|0)+(m*224|0)+(h<<2)|0;g[y>>2]=j+ +g[y>>2];h=h+1|0}while((h|0)!=56);ol(r+(m*224|0)|0,q|0,224)|0;j=100.0-+(m|0)*10.0+-30.0;h=0;do{y=r+(m*224|0)+(h<<2)|0;g[y>>2]=j+ +g[y>>2];h=h+1|0}while((h|0)!=56);i=0;do{j=+g[B+(s*1792|0)+(m*224|0)+(i<<2)>>2];h=r+(m*224|0)+(i<<2)|0;if(j>+g[h>>2])g[h>>2]=j;i=i+1|0}while((i|0)!=56);m=m+1|0}while((m|0)!=8);n=1;do{h=n+-1|0;m=0;do{j=+g[r+(h*224|0)+(m<<2)>>2];i=r+(n*224|0)+(m<<2)|0;if(j<+g[i>>2])g[i>>2]=j;m=m+1|0}while((m|0)!=56);i=0;do{j=+g[r+(n*224|0)+(i<<2)>>2];h=B+(s*1792|0)+(n*224|0)+(i<<2)|0;if(j<+g[h>>2])g[h>>2]=j;i=i+1|0}while((i|0)!=56);n=n+1|0}while((n|0)!=8);s=s+1|0}while((s|0)!=17);f=b;u=(d|0)>0;v=~d;w=0;do{r=pk(32)|0;c[A+(w<<2)>>2]=r;e=+(w|0)*.5;q=~~+E(+(+P(+((e+5.965784072875977)*.6931470036506653))/f));x=~~+R(+((+Q(+(+(q|0)*b+1.0))*1.4426950216293335+-5.965784072875977)*2.0));q=~~+E(+((+Q(+(+(q+1|0)*b))*1.4426950216293335+-5.965784072875977)*2.0));x=(x|0)>(w|0)?w:x;x=(x|0)<0?0:x;q=(q|0)>16?16:q;a=(x|0)>(q|0);w=w+1|0;s=(w|0)<17;y=0;do{t=pk(232)|0;c[r+(y<<2)>>2]=t;if(u){h=0;do{g[z+(h<<2)>>2]=999.0;h=h+1|0}while((h|0)!=(d|0))}if(!a){p=x;while(1){k=+(p|0)*.5;o=0;i=0;do{j=k+ +(o|0)*.125;h=~~(+P(+((j+-2.0625+5.965784072875977)*.6931470036506653))/f);n=~~(+P(+((j+-1.9375+5.965784072875977)*.6931470036506653))/f+1.0);m=(h|0)<0?0:h;m=(m|0)>(d|0)?d:m;m=(m|0)<(i|0)?m:i;D=(n|0)<0?0:n;if((m|0)<(d|0)?(m|0)<(((D|0)>(d|0)?d:D)|0):0){j=+g[B+(p*1792|0)+(y*224|0)+(o<<2)>>2];D=~i;D=(D|0)>(v|0)?D:v;h=(h|0)>0?~h:-1;h=(D|0)>(h|0)?D:h;D=(n|0)>0?~n:-1;D=((D|0)<(v|0)?v:D)-h|0;i=~(h+d);i=~h-(D>>>0>i>>>0?D:i)|0;do{h=z+(m<<2)|0;if(+g[h>>2]>j)g[h>>2]=j;m=m+1|0}while((m|0)!=(i|0))}else i=m;o=o+1|0}while((o|0)!=56);if((i|0)<(d|0)){j=+g[B+(p*1792|0)+(y*224|0)+220>>2];do{h=z+(i<<2)|0;if(+g[h>>2]>j)g[h>>2]=j;i=i+1|0}while((i|0)!=(d|0))}if((p|0)<(q|0))p=p+1|0;else break}}if(s){o=0;h=0;do{k=e+ +(o|0)*.125;i=~~(+P(+((k+-2.0625+5.965784072875977)*.6931470036506653))/f);n=~~(+P(+((k+-1.9375+5.965784072875977)*.6931470036506653))/f+1.0);m=(i|0)<0?0:i;m=(m|0)>(d|0)?d:m;m=(m|0)<(h|0)?m:h;D=(n|0)<0?0:n;if((m|0)<(d|0)?(m|0)<(((D|0)>(d|0)?d:D)|0):0){j=+g[B+(w*1792|0)+(y*224|0)+(o<<2)>>2];D=~h;D=(D|0)>(v|0)?D:v;p=(i|0)>0?~i:-1;p=(D|0)>(p|0)?D:p;D=(n|0)>0?~n:-1;D=((D|0)<(v|0)?v:D)-p|0;h=~(p+d);h=~p-(D>>>0>h>>>0?D:h)|0;do{i=z+(m<<2)|0;if(+g[i>>2]>j)g[i>>2]=j;m=m+1|0}while((m|0)!=(h|0))}else h=m;o=o+1|0}while((o|0)!=56);if((h|0)<(d|0)){j=+g[B+(w*1792|0)+(y*224|0)+220>>2];i=h;do{h=z+(i<<2)|0;if(+g[h>>2]>j)g[h>>2]=j;i=i+1|0}while((i|0)!=(d|0));i=0}else i=0}else i=0;do{h=~~(+P(+((e+ +(i|0)*.125+-2.0+5.965784072875977)*.6931470036506653))/f);do if((h|0)>=0)if((h|0)<(d|0)){g[t+(i+2<<2)>>2]=+g[z+(h<<2)>>2];break}else{g[t+(i+2<<2)>>2]=-999.0;break}else g[t+(i+2<<2)>>2]=-999.0;while(0);i=i+1|0}while((i|0)!=56);i=0;while(1){h=i+1|0;if(+g[t+(i+2<<2)>>2]>-200.0){h=i;break}if((h|0)<16)i=h;else break}g[t>>2]=+(h|0);i=55;while(1){h=i+-1|0;if(+g[t+(i+2<<2)>>2]>-200.0){h=i;break}if((h|0)>17)i=h;else break}g[t+4>>2]=+(h|0);y=y+1|0}while((y|0)!=8)}while((w|0)!=17);l=C;return A|0}function gd(a){a=a|0;var b=0,d=0,e=0;if(!a)return;b=c[a+16>>2]|0;if(b|0)qk(b);b=c[a+20>>2]|0;if(b|0)qk(b);b=c[a+24>>2]|0;if(b|0)qk(b);e=a+8|0;b=c[e>>2]|0;if(b|0){d=0;do{qk(c[c[b+(d<<2)>>2]>>2]|0);qk(c[(c[(c[e>>2]|0)+(d<<2)>>2]|0)+4>>2]|0);qk(c[(c[(c[e>>2]|0)+(d<<2)>>2]|0)+8>>2]|0);qk(c[(c[(c[e>>2]|0)+(d<<2)>>2]|0)+12>>2]|0);qk(c[(c[(c[e>>2]|0)+(d<<2)>>2]|0)+16>>2]|0);qk(c[(c[(c[e>>2]|0)+(d<<2)>>2]|0)+20>>2]|0);qk(c[(c[(c[e>>2]|0)+(d<<2)>>2]|0)+24>>2]|0);qk(c[(c[(c[e>>2]|0)+(d<<2)>>2]|0)+28>>2]|0);qk(c[(c[e>>2]|0)+(d<<2)>>2]|0);d=d+1|0;b=c[e>>2]|0}while((d|0)!=17);qk(b)}b=a+12|0;d=c[b>>2]|0;if(d|0){qk(c[d>>2]|0);qk(c[(c[b>>2]|0)+4>>2]|0);qk(c[(c[b>>2]|0)+8>>2]|0);qk(c[b>>2]|0)}b=a;d=b+52|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));return}function hd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,i=0,j=0,k=0;k=l;i=c[a>>2]|0;j=l;l=l+((1*(i<<2)|0)+15&-16)|0;f=a+24|0;id(i,c[f>>2]|0,b,d,140.0,-1);h=(i|0)>0;if(h){e=0;do{g[j+(e<<2)>>2]=+g[b+(e<<2)>>2]-+g[d+(e<<2)>>2];e=e+1|0}while((e|0)!=(i|0))}a=a+4|0;id(i,c[f>>2]|0,j,d,0.0,c[(c[a>>2]|0)+128>>2]|0);if(h)e=0;else{l=k;return}do{f=j+(e<<2)|0;g[f>>2]=+g[b+(e<<2)>>2]-+g[f>>2];e=e+1|0}while((e|0)!=(i|0));if(!h){l=k;return}e=c[a>>2]|0;a=0;do{b=d+(a<<2)|0;h=~~(+g[b>>2]+.5);h=(h|0)>39?39:h;g[b>>2]=+g[j+(a<<2)>>2]+ +g[e+336+(((h|0)<0?0:h)<<2)>>2];a=a+1|0}while((a|0)!=(i|0));l=k;return}function id(a,b,d,e,f,h){a=a|0;b=b|0;d=d|0;e=e|0;f=+f;h=h|0;var i=0.0,j=0.0,k=0,m=0.0,n=0,o=0.0,p=0.0,q=0.0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0.0,z=0.0,A=0.0;x=l;r=a<<2;s=l;l=l+((1*r|0)+15&-16)|0;t=l;l=l+((1*r|0)+15&-16)|0;u=l;l=l+((1*r|0)+15&-16)|0;v=l;l=l+((1*r|0)+15&-16)|0;w=l;l=l+((1*r|0)+15&-16)|0;q=+g[d>>2]+f;q=q<1.0?1.0:q;j=q*q*.5;i=j+0.0;j=q*j+0.0;g[s>>2]=i;g[t>>2]=i;g[u>>2]=0.0;g[v>>2]=j;g[w>>2]=0.0;if((a|0)>1){k=1;q=i;m=i;o=0.0;p=0.0;i=1.0;while(1){z=+g[d+(k<<2)>>2]+f;z=z<1.0?1.0:z;A=z*z;q=q+A;y=i*A;m=m+y;o=o+i*y;j=j+z*A;p=p+z*y;g[s+(k<<2)>>2]=q;g[t+(k<<2)>>2]=m;g[u+(k<<2)>>2]=o;g[v+(k<<2)>>2]=j;g[w+(k<<2)>>2]=p;k=k+1|0;if((k|0)==(a|0))break;else i=i+1.0}}d=c[b>>2]|0;k=d>>16;if((k|0)>-1){j=0.0;o=0.0;m=1.0;n=0;i=0.0}else{n=0;i=0.0;do{r=d&65535;d=0-k|0;z=+g[s+(r<<2)>>2]+ +g[s+(d<<2)>>2];m=+g[t+(r<<2)>>2]-+g[t+(d<<2)>>2];A=+g[u+(r<<2)>>2]+ +g[u+(d<<2)>>2];o=+g[v+(r<<2)>>2]+ +g[v+(d<<2)>>2];y=+g[w+(r<<2)>>2]-+g[w+(d<<2)>>2];j=A*o-m*y;o=z*y-m*o;m=z*A-m*m;A=(j+i*o)/m;g[e+(n<<2)>>2]=(A<0.0?0.0:A)-f;n=n+1|0;i=i+1.0;d=c[b+(n<<2)>>2]|0;k=d>>16}while((k|0)<=-1)}k=d&65535;if((k|0)<(a|0)){do{r=d>>16;z=+g[s+(k<<2)>>2]-+g[s+(r<<2)>>2];m=+g[t+(k<<2)>>2]-+g[t+(r<<2)>>2];A=+g[u+(k<<2)>>2]-+g[u+(r<<2)>>2];o=+g[v+(k<<2)>>2]-+g[v+(r<<2)>>2];y=+g[w+(k<<2)>>2]-+g[w+(r<<2)>>2];j=A*o-m*y;o=z*y-m*o;m=z*A-m*m;A=(j+i*o)/m;g[e+(n<<2)>>2]=(A<0.0?0.0:A)-f;n=n+1|0;i=i+1.0;d=c[b+(n<<2)>>2]|0;k=d&65535}while((k|0)<(a|0));d=n}else d=n;if((d|0)<(a|0))while(1){A=(j+o*i)/m;g[e+(d<<2)>>2]=(A<0.0?0.0:A)-f;d=d+1|0;if((d|0)==(a|0))break;else i=i+1.0}if((h|0)<1){l=x;return}r=(h|0)/2|0;d=r-h|0;if((d|0)>-1){n=0;i=0.0}else{n=h-r|0;k=r;b=0;i=0.0;while(1){d=0-d|0;A=+g[s+(k<<2)>>2]+ +g[s+(d<<2)>>2];m=+g[t+(k<<2)>>2]-+g[t+(d<<2)>>2];j=+g[u+(k<<2)>>2]+ +g[u+(d<<2)>>2];o=+g[v+(k<<2)>>2]+ +g[v+(d<<2)>>2];z=+g[w+(k<<2)>>2]-+g[w+(d<<2)>>2];p=j*o-m*z;o=A*z-m*o;m=A*j-m*m;j=(p+i*o)/m-f;d=e+(b<<2)|0;if(j<+g[d>>2])g[d>>2]=j;b=b+1|0;i=i+1.0;d=r+b|0;if((b|0)==(n|0)){j=p;break}else{k=d;d=d-h|0}}}k=n+r|0;if((k|0)<(a|0)){d=a-r|0;while(1){b=k-h|0;A=+g[s+(k<<2)>>2]-+g[s+(b<<2)>>2];m=+g[t+(k<<2)>>2]-+g[t+(b<<2)>>2];j=+g[u+(k<<2)>>2]-+g[u+(b<<2)>>2];o=+g[v+(k<<2)>>2]-+g[v+(b<<2)>>2];z=+g[w+(k<<2)>>2]-+g[w+(b<<2)>>2];p=j*o-m*z;o=A*z-m*o;m=A*j-m*m;j=(p+i*o)/m-f;k=e+(n<<2)|0;if(j<+g[k>>2])g[k>>2]=j;n=n+1|0;i=i+1.0;if((n|0)==(d|0))break;else k=n+r|0}}else{p=j;d=n}if((d|0)<(a|0))k=d;else{l=x;return}while(1){j=(p+o*i)/m-f;d=e+(k<<2)|0;if(j<+g[d>>2])g[d>>2]=j;k=k+1|0;if((k|0)==(a|0))break;else i=i+1.0}l=x;return}function jd(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=+e;f=+f;var h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0.0,r=0,s=0,t=0,u=0,v=0,w=0.0,x=0,y=0.0,z=0,A=0,B=0,C=0,D=0,E=0,F=0;F=l;s=c[a>>2]|0;D=a+40|0;B=c[D>>2]|0;E=l;l=l+((1*(B<<2)|0)+15&-16)|0;C=a+4|0;k=c[C>>2]|0;f=+g[k+4>>2]+f;if((B|0)>0){h=0;do{g[E+(h<<2)>>2]=-9999.0;h=h+1|0}while((h|0)<(B|0))}q=+g[k+8>>2];f=f<q?q:f;j=(s|0)>0;if(j){h=c[a+16>>2]|0;i=0;do{g[d+(i<<2)>>2]=f+ +g[h+(i<<2)>>2];i=i+1|0}while((i|0)!=(s|0));r=c[a+8>>2]|0;q=+g[k+496>>2]-e;if(j){n=c[a+20>>2]|0;o=a+32|0;h=a+36|0;p=a+28|0;i=0;while(1){k=c[n+(i<<2)>>2]|0;j=i;e=+g[b+(i<<2)>>2];a:while(1)while(1){i=j+1|0;if((i|0)>=(s|0)){m=0;break a}if((c[n+(i<<2)>>2]|0)!=(k|0)){m=1;break a}f=+g[b+(i<<2)>>2];if(f>e){j=i;e=f;continue a}else j=i}if(e+6.0>+g[d+(j<<2)>>2]?(v=k>>c[o>>2],v=(v|0)>16?16:v,t=c[h>>2]|0,u=~~((q+e+-30.0)*.10000000149011612),u=(u|0)<0?0:u,u=c[(c[r+(((v|0)<0?0:v)<<2)>>2]|0)+(((u|0)>7?7:u)<<2)>>2]|0,v=~~+g[u+4>>2],w=+g[u>>2],x=~~w,(x|0)<(v|0)):0){k=x;j=~~(+(t|0)*(w+-16.0)+ +((c[n+(j<<2)>>2]|0)-(c[p>>2]|0)|0)-+(t>>1|0));do{if((j|0)>0?(y=e+ +g[u+(k+2<<2)>>2],z=E+(j<<2)|0,+g[z>>2]<y):0)g[z>>2]=y;j=j+t|0;k=k+1|0}while((j|0)<(B|0)&(k|0)<(v|0))}if(!m)break}}else A=7}else A=7;if((A|0)==7)h=a+36|0;j=c[h>>2]|0;kd(E,j,B);r=c[a>>2]|0;b:do if((r|0)>1){p=c[a+20>>2]|0;B=c[p>>2]|0;o=c[a+28>>2]|0;n=(c[C>>2]|0)+32|0;h=1;m=B;i=0;j=B-(j>>1)-o|0;while(1){f=+g[E+(j<<2)>>2];k=((c[p+(h<<2)>>2]|0)+m>>1)-o|0;y=+g[n>>2];f=f>y?y:f;c:do if((j|0)<(k|0)){h=j;e=f;while(1){j=e==-9999.0;while(1){h=h+1|0;f=+g[E+(h<<2)>>2];if(f>-9999.0){if(f<e|j)break}else if(j)break;if((h|0)>=(k|0)){f=e;j=h;break c}}if((h|0)<(k|0))e=f;else{j=h;break}}}while(0);k=j+o|0;d:do if(!((i|0)>=(r|0)|(m|0)>(k|0)))do{h=d+(i<<2)|0;if(+g[h>>2]<f)g[h>>2]=f;i=i+1|0;if((i|0)>=(r|0))break d}while((c[p+(i<<2)>>2]|0)<=(k|0));while(0);h=i+1|0;if((h|0)>=(r|0))break b;m=c[p+(i<<2)>>2]|0}}else i=0;while(0);f=+g[E+((c[D>>2]|0)+-1<<2)>>2];if((i|0)>=(r|0)){l=F;return}do{h=d+(i<<2)|0;if(+g[h>>2]<f)g[h>>2]=f;i=i+1|0}while((i|0)!=(r|0));l=F;return}function kd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,h=0,i=0,j=0.0,k=0,m=0,n=0,o=0,p=0,q=0,r=0;r=l;n=d<<2;o=l;l=l+((1*n|0)+15&-16)|0;p=l;l=l+((1*n|0)+15&-16)|0;if((d|0)>0){k=0;i=0}else{l=r;return}do{do if((i|0)>=2){j=+g[a+(k<<2)>>2];while(1){e=i+-1|0;f=+g[p+(e<<2)>>2];if(j<f){e=8;break}if(!((i|0)>1?(k|0)<((c[o+(e<<2)>>2]|0)+b|0):0)){e=12;break}h=i+-2|0;if(!(f<=+g[p+(h<<2)>>2])){e=12;break}if((k|0)<((c[o+(h<<2)>>2]|0)+b|0))i=e;else{e=12;break}}if((e|0)==8){c[o+(i<<2)>>2]=k;g[p+(i<<2)>>2]=j;n=i;break}else if((e|0)==12){c[o+(i<<2)>>2]=k;g[p+(i<<2)>>2]=j;n=i;break}}else{c[o+(i<<2)>>2]=k;g[p+(i<<2)>>2]=+g[a+(k<<2)>>2];n=i}while(0);i=n+1|0;k=k+1|0}while((k|0)!=(d|0));if((n|0)<=-1){l=r;return}k=b+1|0;b=~d;m=0;h=0;while(1){if((m|0)<(n|0)?(q=m+1|0,+g[p+(q<<2)>>2]>+g[p+(m<<2)>>2]):0)e=c[o+(q<<2)>>2]|0;else e=k+(c[o+(m<<2)>>2]|0)|0;if((h|0)<(((e|0)>(d|0)?d:e)|0)){f=+g[p+(m<<2)>>2];e=~e;e=~((e|0)>(b|0)?e:b);do{g[a+(h<<2)>>2]=f;h=h+1|0}while((h|0)!=(e|0))}else e=h;m=m+1|0;if((m|0)==(i|0))break;else h=e}l=r;return}function ld(a,b,d,e,f,h,i){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;h=h|0;i=i|0;var j=0,k=0.0,l=0.0,m=0,n=0,o=0,p=0.0,q=0.0;n=c[a>>2]|0;j=c[a+4>>2]|0;p=+g[j+12+(e<<2)>>2];if((n|0)<=0)return;o=c[(c[a+12>>2]|0)+(e<<2)>>2]|0;m=j+108|0;e=(e|0)==1;l=+g[a+48>>2];j=0;do{k=+g[b+(j<<2)>>2]+ +g[o+(j<<2)>>2];q=+g[m>>2];k=k>q?q:k;q=p+ +g[d+(j<<2)>>2];g[f+(j<<2)>>2]=k<q?q:k;if(e){q=k-+g[i+(j<<2)>>2];k=q+17.200000762939453;if(q>-17.200000762939453){k=1.0-l*(k*.005);if(k<0.0)k=9.999999747378752e-05}else k=1.0-l*(k*.0003);a=h+(j<<2)|0;g[a>>2]=k*+g[a>>2]}j=j+1|0}while((j|0)!=(n|0));return}function md(a,b,d,e,f,i,j,k,m){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;i=i|0;j=j|0;k=k|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0.0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0.0,P=0,Q=0.0,R=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0.0,da=0.0;ba=l;_=c[d>>2]|0;Y=d+4|0;d=c[Y>>2]|0;if(!(c[d+500>>2]|0))Z=16;else Z=c[d+508>>2]|0;P=c[b+132+((c[d>>2]|0)*60|0)+(a<<2)>>2]|0;Q=+h[8+(c[b+252+(a<<2)>>2]<<3)>>3];R=m<<2;T=l;l=l+((1*R|0)+15&-16)|0;U=l;l=l+((1*R|0)+15&-16)|0;V=l;l=l+((1*R|0)+15&-16)|0;W=l;l=l+((1*R|0)+15&-16)|0;X=l;l=l+((1*R|0)+15&-16)|0;aa=e+1156|0;O=+h[((_|0)>1e3?80:8)+(c[b+312+(a<<2)>>2]<<3)>>3];N=S(R,Z)|0;d=l;l=l+((1*N|0)+15&-16)|0;c[T>>2]=d;a=l;l=l+((1*N|0)+15&-16)|0;c[U>>2]=a;b=l;l=l+((1*N|0)+15&-16)|0;c[V>>2]=b;n=l;l=l+((1*N|0)+15&-16)|0;c[W>>2]=n;a:do if((m|0)>1){o=b;b=1;while(1){M=S(b,Z)|0;c[T+(b<<2)>>2]=d+(M<<2);c[U+(b<<2)>>2]=a+(M<<2);c[V+(b<<2)>>2]=o+(M<<2);c[W+(b<<2)>>2]=n+(M<<2);b=b+1|0;if((b|0)==(m|0))break a;d=c[T>>2]|0;a=c[U>>2]|0;o=c[V>>2]|0;n=c[W>>2]|0}}while(0);d=c[aa>>2]|0;if((_|0)>0){I=c[W>>2]|0;J=(m|0)>0;K=~Z;L=0;M=~_;while(1){H=~((M|0)>(K|0)?M:K);G=_-L|0;G=(Z|0)>(G|0)?G:Z;ol(X|0,j|0,R|0)|0;il(I|0,0,N|0)|0;if(J){t=(G|0)>0;u=P-L|0;v=0;do{p=c[i+(v<<2)>>2]|0;q=p+(L<<2)|0;if(!(c[X+(v<<2)>>2]|0)){if(t){d=c[V+(v<<2)>>2]|0;a=c[T+(v<<2)>>2]|0;b=c[U+(v<<2)>>2]|0;n=c[W+(v<<2)>>2]|0;o=0;do{g[d+(o<<2)>>2]=1.000000013351432e-10;g[a+(o<<2)>>2]=0.0;g[b+(o<<2)>>2]=0.0;c[n+(o<<2)>>2]=0;c[p+(o+L<<2)>>2]=0;o=o+1|0}while((o|0)!=(H|0))}}else{r=c[V+(v<<2)>>2]|0;if(t){d=0;do{g[r+(d<<2)>>2]=+g[57792+(c[p+(d+L<<2)>>2]<<2)>>2];d=d+1|0}while((d|0)!=(H|0));o=c[f+(v<<2)>>2]|0;d=c[W+(v<<2)>>2]|0;if(t){a=0;do{s=+F(+(+g[o+(a+L<<2)>>2]));c[d+(a<<2)>>2]=!(s/+g[r+(a<<2)>>2]<((a|0)>=(u|0)?O:Q))&1;a=a+1|0}while((a|0)!=(G|0));if(t){a=c[T+(v<<2)>>2]|0;d=c[U+(v<<2)>>2]|0;n=0;do{E=o+(n+L<<2)|0;s=+g[E>>2];s=s*s;b=a+(n<<2)|0;g[b>>2]=s;g[d+(n<<2)>>2]=s;if(+g[E>>2]<0.0)g[b>>2]=+g[b>>2]*-1.0;E=r+(n<<2)|0;s=+g[E>>2];g[E>>2]=s*s;n=n+1|0}while((n|0)!=(H|0))}else $=19}else $=19}else $=19;if(($|0)==19){$=0;a=c[T+(v<<2)>>2]|0;d=c[U+(v<<2)>>2]|0}+nd(c[Y>>2]|0,P,a,d,r,0,L,G,q)}v=v+1|0}while((v|0)!=(m|0))}d=c[aa>>2]|0;if((d|0)>0){C=(G|0)>0;D=k-L|0;E=P-L|0;B=0;do{a=c[e+1160+(B<<2)>>2]|0;b=c[e+2184+(B<<2)>>2]|0;p=c[i+(a<<2)>>2]|0;q=p+(L<<2)|0;r=c[i+(b<<2)>>2]|0;t=c[T+(a<<2)>>2]|0;u=c[T+(b<<2)>>2]|0;v=c[U+(a<<2)>>2]|0;w=c[U+(b<<2)>>2]|0;x=c[V+(a<<2)>>2]|0;y=c[V+(b<<2)>>2]|0;z=c[W+(a<<2)>>2]|0;A=c[W+(b<<2)>>2]|0;a=X+(a<<2)|0;b=X+(b<<2)|0;if(!((c[a>>2]|0)==0?(c[b>>2]|0)==0:0)){c[b>>2]=1;c[a>>2]=1;if(C){o=0;do{do if((o|0)<(D|0)){d=z+(o<<2)|0;a=A+(o<<2)|0;if((c[d>>2]|0)==0?(c[a>>2]|0)==0:0){do if((o|0)>=(E|0)){d=t+(o<<2)|0;da=+g[d>>2];ca=+g[u+(o<<2)>>2];s=+F(+da)+ +F(+ca);g[v+(o<<2)>>2]=s;if(da+ca<0.0){g[d>>2]=-s;break}else{g[d>>2]=s;break}}else{n=t+(o<<2)|0;da=+g[u+(o<<2)>>2]+ +g[n>>2];g[n>>2]=da;g[v+(o<<2)>>2]=+F(+da)}while(0);g[w+(o<<2)>>2]=0.0;g[u+(o<<2)>>2]=0.0;c[a>>2]=1;c[r+(o+L<<2)>>2]=0;break}n=t+(o<<2)|0;da=+F(+(+g[n>>2]));g[n>>2]=da+ +F(+(+g[u+(o<<2)>>2]));n=v+(o<<2)|0;g[n>>2]=+g[n>>2]+ +g[w+(o<<2)>>2];c[a>>2]=1;c[d>>2]=1;n=o+L|0;b=p+(n<<2)|0;d=c[b>>2]|0;n=r+(n<<2)|0;a=c[n>>2]|0;if((((d|0)>-1?d:0-d|0)|0)>(((a|0)>-1?a:0-a|0)|0)){d=(d|0)>0?d-a|0:a-d|0;c[n>>2]=d;a=c[b>>2]|0}else{c[n>>2]=(a|0)>0?d-a|0:a-d|0;c[b>>2]=a;d=c[n>>2]|0}if((d|0)>=(((a|0)>-1?a:0-a|0)<<1|0)){c[n>>2]=0-d;c[b>>2]=0-(c[b>>2]|0)}}while(0);n=x+(o<<2)|0;b=y+(o<<2)|0;da=+g[n>>2]+ +g[b>>2];g[b>>2]=da;g[n>>2]=da;o=o+1|0}while((o|0)!=(H|0))}+nd(c[Y>>2]|0,P,t,v,x,z,L,G,q);d=c[aa>>2]|0}B=B+1|0}while((B|0)<(d|0))}L=L+Z|0;if((_|0)<=(L|0))break;else M=M+Z|0}}if((d|0)>0)n=0;else{l=ba;return}do{a=j+(c[e+1160+(n<<2)>>2]<<2)|0;b=e+2184+(n<<2)|0;if(!((c[a>>2]|0)==0?(c[j+(c[b>>2]<<2)>>2]|0)==0:0)){c[a>>2]=1;c[j+(c[b>>2]<<2)>>2]=1;d=c[aa>>2]|0}n=n+1|0}while((n|0)<(d|0));l=ba;return}function nd(a,b,d,e,f,i,k,m,n){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;i=i|0;k=k|0;m=m|0;n=n|0;var o=0.0,p=0,q=0,r=0.0,s=0,t=0.0,u=0,v=0,w=0,x=0;x=l;w=l;l=l+((1*(m<<2)|0)+15&-16)|0;if(!(c[a+500>>2]|0))p=m;else p=(c[a+504>>2]|0)-k|0;if((((p|0)>(m|0)?m:p)|0)>0){s=(i|0)==0;q=~p;p=~m;p=~((q|0)>(p|0)?q:p);q=0;do{if(!(!s?(c[i+(q<<2)>>2]|0)!=0:0))v=9;do if((v|0)==9){v=0;u=+g[d+(q<<2)>>2]<0.0;o=+dk(+G(+(+g[e+(q<<2)>>2]/+g[f+(q<<2)>>2])));if(u){c[n+(q<<2)>>2]=~~-o;break}else{c[n+(q<<2)>>2]=~~o;break}}while(0);q=q+1|0}while((q|0)!=(p|0))}else p=0;if((p|0)>=(m|0)){t=0.0;l=x;return +t}u=(i|0)!=0;b=b-k|0;o=0.0;k=0;do{if(!(u?(c[i+(p<<2)>>2]|0)!=0:0))v=15;do if((v|0)==15){v=0;s=e+(p<<2)|0;t=+g[f+(p<<2)>>2];r=+g[s>>2]/t;if(!(!(r<.25)|u&(p|0)<(b|0))){c[w+(k<<2)>>2]=s;o=o+r;k=k+1|0;break}q=+g[d+(p<<2)>>2]<0.0;r=+dk(+G(+r));if(q){q=~~-r;c[n+(p<<2)>>2]=q}else{q=~~r;c[n+(p<<2)>>2]=q}g[s>>2]=t*+(S(q,q)|0)}while(0);p=p+1|0}while((p|0)!=(m|0));if(!k){t=o;l=x;return +t}Wj(w,k,4,11);if((k|0)<=0){t=o;l=x;return +t}s=e;r=+h[a+512>>3];q=0;do{p=(c[w+(q<<2)>>2]|0)-s>>2;if(!(o>=r)){c[n+(p<<2)>>2]=0;g[e+(p<<2)>>2]=0.0}else{c[n+(p<<2)>>2]=~~(c[j>>2]=(g[j>>2]=+g[d+(p<<2)>>2],c[j>>2]|0)&-2147483648|1065353216,+g[j>>2]);g[e+(p<<2)>>2]=+g[f+(p<<2)>>2];o=o+-1.0}q=q+1|0}while((q|0)!=(k|0));l=x;return +o}function od(a,b){a=a|0;b=b|0;var d=0.0,e=0.0;e=+g[c[a>>2]>>2];d=+g[c[b>>2]>>2];return (e<d&1)-(e>d&1)|0}function pd(a){a=a|0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;return}function qd(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;if(!a)return;b=c[a>>2]|0;if(b|0){g=a+8|0;d=c[g>>2]|0;if((d|0)>0){f=0;do{e=c[b+(f<<2)>>2]|0;if(e){qk(e);d=c[g>>2]|0;b=c[a>>2]|0}f=f+1|0}while((f|0)<(d|0))}qk(b)}b=c[a+4>>2]|0;if(b|0)qk(b);b=c[a+12>>2]|0;if(b|0)qk(b);c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;return}function rd(a){a=a|0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;c[a+16>>2]=0;c[a+20>>2]=0;c[a+24>>2]=0;c[a+28>>2]=rk(1,3664)|0;return}function sd(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0;i=c[a+28>>2]|0;if(!i){c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;c[a+16>>2]=0;c[a+20>>2]=0;c[a+24>>2]=0;c[a+28>>2]=0;return}f=i+8|0;b=c[f>>2]|0;if((b|0)>0){g=i+32|0;e=0;do{d=c[g+(e<<2)>>2]|0;if(d){qk(d);b=c[f>>2]|0}e=e+1|0}while((e|0)<(b|0))}h=i+12|0;b=c[h>>2]|0;if((b|0)>0){f=i+544|0;g=i+288|0;e=0;do{d=c[f+(e<<2)>>2]|0;if(d){zb[c[(c[57744+(c[g+(e<<2)>>2]<<2)>>2]|0)+8>>2]&31](d);b=c[h>>2]|0}e=e+1|0}while((e|0)<(b|0))}f=i+16|0;b=c[f>>2]|0;if((b|0)>0){g=i+1056|0;h=i+800|0;e=0;do{d=c[g+(e<<2)>>2]|0;if(d){zb[c[(c[57724+(c[h+(e<<2)>>2]<<2)>>2]|0)+12>>2]&31](d);b=c[f>>2]|0}e=e+1|0}while((e|0)<(b|0))}f=i+20|0;b=c[f>>2]|0;if((b|0)>0){g=i+1568|0;h=i+1312|0;e=0;do{d=c[g+(e<<2)>>2]|0;if(d){zb[c[(c[57732+(c[h+(e<<2)>>2]<<2)>>2]|0)+12>>2]&31](d);b=c[f>>2]|0}e=e+1|0}while((e|0)<(b|0))}e=i+24|0;if((c[e>>2]|0)>0){f=i+1824|0;b=i+2848|0;g=0;do{d=c[f+(g<<2)>>2]|0;if(d|0)Hd(d);d=c[b>>2]|0;if(d|0)Id(d+(g*56|0)|0);g=g+1|0}while((g|0)<(c[e>>2]|0))}else b=i+2848|0;b=c[b>>2]|0;if(b|0)qk(b);b=i+28|0;if((c[b>>2]|0)>0){d=i+2852|0;e=0;do{dd(c[d+(e<<2)>>2]|0);e=e+1|0}while((e|0)<(c[b>>2]|0))}qk(i);c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;c[a+16>>2]=0;c[a+20>>2]=0;c[a+24>>2]=0;c[a+28>>2]=0;return}function td(b){b=b|0;var d=0,e=0,f=0;f=l;l=l+32|0;e=f;d=f+20|0;if(!b){e=0;l=f;return e|0}Vb(e,c[b>>2]|0,c[b+4>>2]|0);if(!(c[b+8>>2]|0)){e=0;l=f;return e|0}if((Yb(e,8)|0)!=1){e=0;l=f;return e|0};a[d>>0]=0;a[d+1>>0]=0;a[d+2>>0]=0;a[d+3>>0]=0;a[d+4>>0]=0;a[d>>0]=Yb(e,8)|0;a[d+1>>0]=Yb(e,8)|0;a[d+2>>0]=Yb(e,8)|0;a[d+3>>0]=Yb(e,8)|0;a[d+4>>0]=Yb(e,8)|0;a[d+5>>0]=Yb(e,8)|0;e=(Dj(d,59877,6)|0)==0&1;l=f;return e|0}function ud(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;m=l;l=l+32|0;k=m;g=m+20|0;if(!e){k=-133;l=m;return k|0}Vb(k,c[e>>2]|0,c[e+4>>2]|0);f=Yb(k,8)|0;a[g>>0]=0;a[g+1>>0]=0;a[g+2>>0]=0;a[g+3>>0]=0;a[g+4>>0]=0;a[g>>0]=Yb(k,8)|0;a[g+1>>0]=Yb(k,8)|0;a[g+2>>0]=Yb(k,8)|0;a[g+3>>0]=Yb(k,8)|0;a[g+4>>0]=Yb(k,8)|0;a[g+5>>0]=Yb(k,8)|0;if(Dj(g,59877,6)|0){k=-132;l=m;return k|0}switch(f|0){case 1:{if(!(c[e+8>>2]|0)){k=-133;l=m;return k|0}f=b+8|0;if(c[f>>2]|0){k=-133;l=m;return k|0}g=c[b+28>>2]|0;if(!g){k=-129;l=m;return k|0}d=Yb(k,32)|0;c[b>>2]=d;if(d|0){k=-134;l=m;return k|0}d=b+4|0;c[d>>2]=Yb(k,8)|0;c[f>>2]=Yb(k,32)|0;c[b+12>>2]=Yb(k,32)|0;c[b+16>>2]=Yb(k,32)|0;c[b+20>>2]=Yb(k,32)|0;c[g>>2]=1<<(Yb(k,4)|0);e=1<<(Yb(k,4)|0);c[g+4>>2]=e;if((((c[f>>2]|0)>=1?(c[d>>2]|0)>=1:0)?(d=c[g>>2]|0,!((d|0)<64|(e|0)<(d|0)|(e|0)>8192)):0)?(Yb(k,1)|0)==1:0){k=0;l=m;return k|0}sd(b);k=-133;l=m;return k|0}case 3:{if(!(c[b+8>>2]|0)){k=-133;l=m;return k|0}e=d+12|0;if(c[e>>2]|0){k=-133;l=m;return k|0}f=Yb(k,32)|0;a:do if((f|0)>=0?(j=k+16|0,(f|0)<=((c[j>>2]|0)+-8|0)):0){g=rk(f+1|0,1)|0;c[e>>2]=g;if(f|0)while(1){f=f+-1|0;a[g>>0]=Yb(k,8)|0;if(!f)break;else g=g+1|0}f=Yb(k,32)|0;if((f|0)>=0?(b=c[j>>2]|0,(f|0)<=(b-(Zb(k)|0)>>2|0)):0){h=d+8|0;c[h>>2]=f;b=f+1|0;c[d>>2]=rk(b,4)|0;i=d+4|0;c[i>>2]=rk(b,4)|0;if((f|0)>0){e=0;do{f=Yb(k,32)|0;if((f|0)<0)break a;b=c[j>>2]|0;if((f|0)>(b-(Zb(k)|0)|0))break a;c[(c[i>>2]|0)+(e<<2)>>2]=f;b=rk(f+1|0,1)|0;c[(c[d>>2]|0)+(e<<2)>>2]=b;if(f|0){g=c[(c[d>>2]|0)+(e<<2)>>2]|0;while(1){f=f+-1|0;a[g>>0]=Yb(k,8)|0;if(!f)break;else g=g+1|0}}e=e+1|0}while((e|0)<(c[h>>2]|0))}if((Yb(k,1)|0)==1){k=0;l=m;return k|0}}}while(0);qd(d);k=-133;l=m;return k|0}case 5:{if(!(c[b+8>>2]|0)){k=-133;l=m;return k|0}if(!(c[d+12>>2]|0)){k=-133;l=m;return k|0}d=c[b+28>>2]|0;if(!d){k=-129;l=m;return k|0}f=d+24|0;if((c[f>>2]|0)>0){k=-133;l=m;return k|0}j=Yb(k,8)|0;c[f>>2]=j+1;b:do if((j|0)>=0){g=d+1824|0;e=0;do{j=vd(k)|0;c[g+(e<<2)>>2]=j;e=e+1|0;if(!j)break b}while((e|0)<(c[f>>2]|0));f=Yb(k,6)|0;if((f|0)>=0){g=0;while(1){if(Yb(k,16)|0)break b;if((g|0)<(f|0))g=g+1|0;else break}j=Yb(k,6)|0;f=d+16|0;c[f>>2]=j+1;if((j|0)>=0){g=d+800|0;e=d+1056|0;i=0;do{h=Yb(k,16)|0;c[g+(i<<2)>>2]=h;if(h>>>0>1)break b;j=Ib[c[(c[57724+(h<<2)>>2]|0)+4>>2]&15](b,k)|0;c[e+(i<<2)>>2]=j;i=i+1|0;if(!j)break b}while((i|0)<(c[f>>2]|0));j=Yb(k,6)|0;f=d+20|0;c[f>>2]=j+1;if((j|0)>=0){g=d+1312|0;e=d+1568|0;i=0;do{h=Yb(k,16)|0;c[g+(i<<2)>>2]=h;if(h>>>0>2)break b;j=Ib[c[(c[57732+(h<<2)>>2]|0)+4>>2]&15](b,k)|0;c[e+(i<<2)>>2]=j;i=i+1|0;if(!j)break b}while((i|0)<(c[f>>2]|0));i=Yb(k,6)|0;j=d+12|0;c[j>>2]=i+1;if((i|0)>=0){f=d+288|0;g=d+544|0;e=(c[14436]|0)+4|0;h=0;do{i=Yb(k,16)|0;c[f+(h<<2)>>2]=i;if(i|0)break b;i=Ib[c[e>>2]&15](b,k)|0;c[g+(h<<2)>>2]=i;h=h+1|0;if(!i)break b}while((h|0)<(c[j>>2]|0));h=Yb(k,6)|0;i=d+8|0;c[i>>2]=h+1;if((h|0)>=0){f=d+32|0;h=0;do{e=f+(h<<2)|0;c[e>>2]=rk(1,16)|0;g=Yb(k,1)|0;c[c[e>>2]>>2]=g;g=Yb(k,16)|0;c[(c[e>>2]|0)+4>>2]=g;g=Yb(k,16)|0;c[(c[e>>2]|0)+8>>2]=g;g=Yb(k,8)|0;e=c[e>>2]|0;c[e+12>>2]=g;if((c[e+4>>2]|0)>0)break b;if((c[e+8>>2]|0)>0)break b;h=h+1|0;if((g|0)<0?1:(g|0)>=(c[j>>2]|0))break b}while((h|0)<(c[i>>2]|0));if((Yb(k,1)|0)==1){k=0;l=m;return k|0}}}}}}}while(0);sd(b);k=-133;l=m;return k|0}default:{k=-133;l=m;return k|0}}return 0}function vd(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;l=rk(1,40)|0;c[l+36>>2]=1;a:do if(((Yb(b,24)|0)==5653314?(c[l>>2]=Yb(b,16)|0,j=Yb(b,24)|0,k=l+4|0,c[k>>2]=j,(j|0)!=-1):0)?(j=Dd(c[l>>2]|0)|0,((Dd(c[k>>2]|0)|0)+j|0)<=24):0){b:do switch(Yb(b,1)|0){case 0:{d=(Yb(b,1)|0)!=0;if(((S(d?1:5,c[k>>2]|0)|0)+7>>3|0)>((c[b+16>>2]|0)-(Zb(b)|0)|0))break a;e=c[k>>2]|0;f=l+8|0;c[f>>2]=pk(e)|0;e=(e|0)>0;if(!d){if(e)e=0;else break b;while(1){d=Yb(b,5)|0;if((d|0)==-1)break a;a[(c[f>>2]|0)+e>>0]=d+1;e=e+1|0;if((e|0)>=(c[k>>2]|0))break b}}if(e){e=0;do{if(!(Yb(b,1)|0))a[(c[f>>2]|0)+e>>0]=0;else{d=Yb(b,5)|0;if((d|0)==-1)break a;a[(c[f>>2]|0)+e>>0]=d+1}e=e+1|0}while((e|0)<(c[k>>2]|0))}break}case 1:{e=(Yb(b,5)|0)+1|0;if(!e)break a;d=c[k>>2]|0;j=l+8|0;c[j>>2]=pk(d)|0;if((d|0)>0){f=0;while(1){i=Yb(b,Dd(d-f|0)|0)|0;if((i|0)==-1|(e|0)>32)break a;d=c[k>>2]|0;if((i|0)>(d-f|0))break a;if((i|0)>0){if((i+-1>>e+-1|0)>1)break a;d=e&255;g=f;h=0;while(1){a[(c[j>>2]|0)+g>>0]=d;h=h+1|0;if((h|0)==(i|0))break;else g=g+1|0}d=c[k>>2]|0;f=i+f|0}if((d|0)>(f|0))e=e+1|0;else break}}break}default:break a}while(0);j=Yb(b,4)|0;d=l+12|0;c[d>>2]=j;switch(j|0){case 2:case 1:break;case 0:return l|0;default:break a}c[l+16>>2]=Yb(b,32)|0;c[l+20>>2]=Yb(b,32)|0;h=l+24|0;c[h>>2]=(Yb(b,4)|0)+1;j=Yb(b,1)|0;c[l+28>>2]=j;if((j|0)!=-1){switch(c[d>>2]|0){case 1:{if(!(c[l>>2]|0))g=0;else g=Fd(l)|0;break}case 2:{g=S(c[l>>2]|0,c[k>>2]|0)|0;break}default:g=0}j=(S(c[h>>2]|0,g)|0)+7>>3;k=c[b+16>>2]|0;if((j|0)<=(k-(Zb(b)|0)|0)){d=pk(g<<2)|0;f=l+32|0;c[f>>2]=d;if((g|0)>0){e=0;do{k=Yb(b,c[h>>2]|0)|0;d=c[f>>2]|0;c[d+(e<<2)>>2]=k;e=e+1|0}while((e|0)!=(g|0))}if(!g)return l|0;if((c[d+(g+-1<<2)>>2]|0)!=-1)return l|0}}}while(0);Hd(l);l=0;return l|0}function wd(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;if((d|0)<0){b=0;return b|0}f=b+12|0;g=c[f>>2]|0;if((c[g+4>>2]|0)<=(d|0)){b=0;return b|0}Tb(e,c[(c[b+20>>2]|0)+(d<<2)>>2]|0,a[(c[g+8>>2]|0)+d>>0]|0);b=a[(c[(c[f>>2]|0)+8>>2]|0)+d>>0]|0;return b|0}function xd(a,b){a=a|0;b=b|0;if((c[a+8>>2]|0)<=0){a=-1;return a|0}b=yd(a,b)|0;if((b|0)<=-1){a=-1;return a|0}a=c[(c[a+24>>2]|0)+(b<<2)>>2]|0;return a|0}function yd(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;i=c[b+40>>2]|0;e=Wb(d,c[b+36>>2]|0)|0;do if((e|0)>-1){e=c[(c[b+32>>2]|0)+(e<<2)>>2]|0;if((e|0)<0){k=(c[b+8>>2]|0)-(e&32767)|0;f=e>>>15&32767;break}k=e+-1|0;Xb(d,a[(c[b+28>>2]|0)+k>>0]|0);d=k;return d|0}else{k=c[b+8>>2]|0;f=0}while(0);h=Wb(d,i)|0;e=(h|0)<0;if(e&(i|0)>1){e=i;do{e=e+-1|0;h=Wb(d,e)|0;g=(h|0)<0}while(g&(e|0)>1);i=e}else g=e;if(g){d=-1;return d|0}h=h>>>16|h<<16;h=h>>>8&16711935|h<<8&-16711936;h=h>>>4&252645135|h<<4&-252645136;h=h>>>2&858993459|h<<2&-858993460;h=h>>>1&1431655765|h<<1&-1431655766;e=k-f|0;if((e|0)>1){j=c[b+20>>2]|0;g=k;do{k=e>>1;l=(c[j+(k+f<<2)>>2]|0)>>>0>h>>>0;f=(l?0:k)+f|0;g=g-(l?k:0)|0;e=g-f|0}while((e|0)>1)}e=a[(c[b+28>>2]|0)+f>>0]|0;if((e|0)>(i|0)){Xb(d,i);l=-1;return l|0}else{Xb(d,e);l=f;return l|0}return 0}function zd(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0,i=0,j=0,k=0,m=0,n=0;n=l;if((c[a+8>>2]|0)<=0){b=0;l=n;return b|0}f=c[a>>2]|0;k=(e|0)/(f|0)|0;m=l;l=l+((1*(k<<2)|0)+15&-16)|0;j=(k|0)>0;a:do if(j){f=a+16|0;h=0;while(1){e=yd(a,d)|0;if((e|0)==-1){e=-1;break}i=c[a>>2]|0;c[m+(h<<2)>>2]=(c[f>>2]|0)+((S(i,e)|0)<<2);h=h+1|0;if((h|0)>=(k|0))break a}l=n;return e|0}else i=f;while(0);if((i|0)<1|j^1){b=0;l=n;return b|0}else{e=0;h=0}while(1){f=0;do{a=b+(f+h<<2)|0;g[a>>2]=+g[(c[m+(f<<2)>>2]|0)+(e<<2)>>2]+ +g[a>>2];f=f+1|0}while((f|0)!=(k|0));e=e+1|0;if((e|0)>=(i|0)){e=0;break}else h=h+k|0}l=n;return e|0}function Ad(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;if((c[a+8>>2]|0)<=0){e=0;return e|0}if((c[a>>2]|0)>8){if((e|0)<=0){e=0;return e|0}n=a+16|0;f=0;while(1){h=yd(a,d)|0;if((h|0)==-1){f=-1;k=23;break}l=c[n>>2]|0;m=c[a>>2]|0;h=S(m,h)|0;if((m|0)>0){k=(m|0)>1?m:1;i=f;j=0;while(1){C=b+(i<<2)|0;g[C>>2]=+g[l+(j+h<<2)>>2]+ +g[C>>2];j=j+1|0;if((j|0)>=(m|0))break;else i=i+1|0}f=f+k|0}if((f|0)>=(e|0)){f=0;k=23;break}}if((k|0)==23)return f|0}i=a+16|0;j=0;a:while(1){if((j|0)>=(e|0)){f=0;k=23;break}b:while(1){f=yd(a,d)|0;if((f|0)==-1){f=-1;k=23;break a}h=c[i>>2]|0;C=c[a>>2]|0;f=S(C,f)|0;switch(C|0){case 8:{k=12;break b}case 7:{o=j;v=0;k=13;break b}case 6:{p=j;w=0;k=14;break b}case 5:{q=j;x=0;k=15;break b}case 4:{r=j;y=0;k=16;break b}case 3:{s=j;z=0;k=17;break b}case 2:{t=j;A=0;k=18;break b}case 1:{u=j;B=0;break b}default:{}}}if((k|0)==12){o=b+(j<<2)|0;g[o>>2]=+g[h+(f<<2)>>2]+ +g[o>>2];o=j+1|0;v=1;k=13}if((k|0)==13){p=b+(o<<2)|0;g[p>>2]=+g[h+(v+f<<2)>>2]+ +g[p>>2];p=o+1|0;w=v+1|0;k=14}if((k|0)==14){q=b+(p<<2)|0;g[q>>2]=+g[h+(w+f<<2)>>2]+ +g[q>>2];q=p+1|0;x=w+1|0;k=15}if((k|0)==15){r=b+(q<<2)|0;g[r>>2]=+g[h+(x+f<<2)>>2]+ +g[r>>2];r=q+1|0;y=x+1|0;k=16}if((k|0)==16){s=b+(r<<2)|0;g[s>>2]=+g[h+(y+f<<2)>>2]+ +g[s>>2];s=r+1|0;z=y+1|0;k=17}if((k|0)==17){t=b+(s<<2)|0;g[t>>2]=+g[h+(z+f<<2)>>2]+ +g[t>>2];t=s+1|0;A=z+1|0;k=18}if((k|0)==18){k=0;u=b+(t<<2)|0;g[u>>2]=+g[h+(A+f<<2)>>2]+ +g[u>>2];u=t+1|0;B=A+1|0}j=b+(u<<2)|0;g[j>>2]=+g[h+(B+f<<2)>>2]+ +g[j>>2];j=u+1|0}if((k|0)==23)return f|0;return 0}function Bd(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0,i=0,j=0,k=0,l=0,m=0;f=(e|0)>0;if((c[a+8>>2]|0)<=0){if(!f){e=0;return e|0}il(b|0,0,e<<2|0)|0;e=0;return e|0}if(!f){e=0;return e|0}m=a+16|0;f=0;while(1){h=yd(a,d)|0;if((h|0)==-1){f=-1;h=11;break}l=c[m>>2]|0;k=c[a>>2]|0;j=S(k,h)|0;a:do if((f|0)<(e|0)){h=f;i=0;while(1){if((i|0)>=(k|0)){f=h;break a}f=h+1|0;g[b+(h<<2)>>2]=+g[l+(i+j<<2)>>2];if((f|0)<(e|0)){h=f;i=i+1|0}else break}}while(0);if((f|0)>=(e|0)){f=0;h=11;break}}if((h|0)==11)return f|0;return 0}function Cd(a,b,d,e,f,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0;if((c[a+8>>2]|0)<=0){e=0;return e|0}i=(d|0)/(e|0)|0;m=(h+d|0)/(e|0)|0;if((i|0)>=(m|0)){e=0;return e|0}n=a+16|0;d=0;h=i;while(1){i=yd(a,f)|0;if((i|0)==-1){h=-1;d=8;break}k=c[n>>2]|0;l=c[a>>2]|0;j=S(l,i)|0;if((l|0)>0){i=0;do{o=d+1|0;d=(c[b+(d<<2)>>2]|0)+(h<<2)|0;g[d>>2]=+g[k+(i+j<<2)>>2]+ +g[d>>2];d=(o|0)==(e|0);h=(d&1)+h|0;d=d?0:o;i=i+1|0}while((i|0)<(l|0))}if((h|0)>=(m|0)){h=0;d=8;break}}if((d|0)==8)return h|0;return 0}function Dd(a){a=a|0;var b=0;if(!a)a=0;else{b=a;a=0;do{b=b>>>1;a=a+1|0}while((b|0)!=0)}return a|0}function Ed(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;t=l;l=l+144|0;r=t;p=(e|0)!=0;f=pk((p?e:d)<<2)|0;il(r|0,0,132)|0;q=(d|0)>0;do if(q){o=r+4|0;k=(e|0)==0&1;m=0;n=0;a:while(1){e=a[b+n>>0]|0;j=e<<24>>24;b:do if(e<<24>>24>0){i=c[r+(j<<2)>>2]|0;if(!(e<<24>>24>31|(i>>>j|0)==0)){s=5;break a}c[f+(m<<2)>>2]=i;h=i;e=j;while(1){g=r+(e<<2)|0;if(h&1|0){s=8;break}c[g>>2]=h+1;e=e+-1|0;if((e|0)<=0)break;h=c[r+(e<<2)>>2]|0}do if((s|0)==8){s=0;if((e|0)==1){c[o>>2]=(c[o>>2]|0)+1;break}else{c[g>>2]=c[r+(e+-1<<2)>>2]<<1;break}}while(0);e=j+1|0;if((e|0)<33){g=j;h=e;while(1){e=r+(h<<2)|0;j=i;i=c[e>>2]|0;if((i>>>1|0)!=(j|0)){e=1;break b}c[e>>2]=c[r+(g<<2)>>2]<<1;e=h+1|0;if((e|0)>=33){e=1;break}else{g=h;h=e}}}else e=1}else e=k;while(0);m=m+e|0;n=n+1|0;if((n|0)>=(d|0)){s=17;break}}if((s|0)==5){qk(f);d=0;l=t;return d|0}else if((s|0)==17){if((m|0)!=1){e=1;s=28;break}if((c[r+8>>2]|0)==2)break;else{e=1;s=28;break}}}else{e=1;s=28}while(0);c:do if((s|0)==28){while(1){if(c[r+(e<<2)>>2]&-1>>>(32-e|0)|0)break;e=e+1|0;if((e|0)>=33)break c;else s=28}qk(f);d=0;l=t;return d|0}while(0);if(!q){d=f;l=t;return d|0}if(p){e=0;m=0}else{j=0;k=0;while(1){e=a[b+k>>0]|0;if(e<<24>>24>0){i=c[f+(j<<2)>>2]|0;g=e<<24>>24;h=0;e=0;do{e=i>>>h&1|e<<1;h=h+1|0}while((h|0)<(g|0))}else e=0;c[f+(j<<2)>>2]=e;k=k+1|0;if((k|0)==(d|0))break;else j=j+1|0}l=t;return f|0}do{k=a[b+m>>0]|0;if(k<<24>>24>0){h=c[f+(e<<2)>>2]|0;i=k<<24>>24;j=0;g=0;do{g=h>>>j&1|g<<1;j=j+1|0}while((j|0)<(i|0))}else g=0;if(k<<24>>24){c[f+(e<<2)>>2]=g;e=e+1|0}m=m+1|0}while((m|0)!=(d|0));l=t;return f|0}function Fd(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;h=c[a+4>>2]|0;g=c[a>>2]|0;a=~~+E(+(+H(+(+(h|0)),+(1.0/+(g|0)))));if((g|0)<=0)while(1){}while(1){b=a+1|0;d=1;e=1;f=0;do{d=S(d,a)|0;e=S(e,b)|0;f=f+1|0}while((f|0)<(g|0));if((d|0)<=(h|0)&(e|0)>(h|0))break;if((d|0)>(h|0)){a=a+-1|0;continue}else{a=a+1|0;continue}}return a|0}function Gd(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,h=0,i=0,j=0,k=0.0,l=0,m=0.0,n=0,o=0.0,p=0.0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;f=c[b+12>>2]|0;if((f+-1|0)>>>0>=2){e=0;return e|0}w=c[b+16>>2]|0;o=+(w&2097151|0);o=+ck((w|0)<0?-o:o,(w>>>21&1023)+-788|0);w=c[b+20>>2]|0;p=+(w&2097151|0);p=+ck((w|0)<0?-p:p,(w>>>21&1023)+-788|0);w=c[b>>2]|0;d=rk(S(w,d)|0,4)|0;switch(f|0){case 1:{u=c[b+4>>2]|0;if((w|0)<=0)while(1){}v=~~+E(+(+H(+(+(u|0)),+(1.0/+(w|0)))));while(1){f=v+1|0;h=1;i=1;j=0;do{h=S(h,v)|0;i=S(i,f)|0;j=j+1|0}while((j|0)!=(w|0));if((h|0)<=(u|0)&(i|0)>(u|0))break;v=(h|0)>(u|0)?v+-1|0:f}if((u|0)<=0){e=d;return e|0}r=(e|0)==0;s=b+8|0;t=b+32|0;n=b+28|0;f=0;q=0;do{if(r){j=c[t>>2]|0;if(!(c[n>>2]|0)){h=1;i=0;do{g[d+((S(w,f)|0)+i<<2)>>2]=o+p*+F(+(+(c[j+((((q|0)/(h|0)|0|0)%(v|0)|0)<<2)>>2]|0)))+0.0;h=S(h,v)|0;i=i+1|0}while((i|0)<(w|0));l=21}else{h=1;i=0;k=0.0;do{k=k+(o+p*+F(+(+(c[j+((((q|0)/(h|0)|0|0)%(v|0)|0)<<2)>>2]|0))));g[d+((S(w,f)|0)+i<<2)>>2]=k;h=S(h,v)|0;i=i+1|0}while((i|0)<(w|0));l=21}}else if(a[(c[s>>2]|0)+q>>0]|0){h=c[t>>2]|0;i=(c[n>>2]|0)==0;j=e+(f<<2)|0;l=1;b=0;m=0.0;while(1){k=m+(o+p*+F(+(+(c[h+((((q|0)/(l|0)|0|0)%(v|0)|0)<<2)>>2]|0))));g[d+((S(c[j>>2]|0,w)|0)+b<<2)>>2]=k;l=S(l,v)|0;b=b+1|0;if((b|0)>=(w|0)){l=21;break}else m=i?m:k}}if((l|0)==21){l=0;f=f+1|0}q=q+1|0}while((q|0)<(u|0));return d|0}case 2:{q=c[b+4>>2]|0;if((q|0)<=0){e=d;return e|0}r=(e|0)!=0;s=b+8|0;t=b+32|0;b=b+28|0;f=0;n=0;do{if(!(r?(a[(c[s>>2]|0)+n>>0]|0)==0:0)){if((w|0)>0){h=c[t>>2]|0;i=(c[b>>2]|0)==0;j=e+(f<<2)|0;l=0;m=0.0;while(1){k=m+(o+p*+F(+(+(c[h+((S(w,n)|0)+l<<2)>>2]|0))));if(r)g[d+((S(c[j>>2]|0,w)|0)+l<<2)>>2]=k;else g[d+((S(w,f)|0)+l<<2)>>2]=k;l=l+1|0;if((l|0)>=(w|0))break;else m=i?m:k}}f=f+1|0}n=n+1|0}while((n|0)<(q|0));return d|0}default:{e=d;return e|0}}return 0}function Hd(a){a=a|0;var b=0;if(!(c[a+36>>2]|0))return;b=c[a+32>>2]|0;if(b|0)qk(b);b=c[a+8>>2]|0;if(b|0)qk(b);qk(a);return}function Id(a){a=a|0;var b=0;b=c[a+16>>2]|0;if(b|0)qk(b);b=c[a+20>>2]|0;if(b|0)qk(b);b=c[a+24>>2]|0;if(b|0)qk(b);b=c[a+28>>2]|0;if(b|0)qk(b);b=c[a+32>>2]|0;if(b|0)qk(b);b=a;a=b+56|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(a|0));return}function Jd(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0.0;d=a;e=d+56|0;do{c[d>>2]=0;d=d+4|0}while((d|0)<(e|0));c[a+12>>2]=b;d=b+4|0;e=c[d>>2]|0;c[a+4>>2]=e;c[a+8>>2]=e;c[a>>2]=c[b>>2];c[a+20>>2]=Ed(c[b+8>>2]|0,e,0)|0;d=c[d>>2]|0;e=c[b>>2]|0;if((e|0)<=0)while(1){}j=~~+E(+(+H(+(+(d|0)),+(1.0/+(e|0)))));while(1){f=j+1|0;g=1;h=1;i=0;do{g=S(g,j)|0;h=S(h,f)|0;i=i+1|0}while((i|0)!=(e|0));if((g|0)<=(d|0)&(h|0)>(d|0))break;j=(g|0)>(d|0)?j+-1|0:f}c[a+44>>2]=j;j=c[b+16>>2]|0;k=+(j&2097151|0);c[a+48>>2]=~~+ek(+ck((j|0)<0?-k:k,(j>>>21&1023)+-788|0));b=c[b+20>>2]|0;k=+(b&2097151|0);c[a+52>>2]=~~+ek(+ck((b|0)<0?-k:k,(b>>>21&1023)+-788|0));return 0}function Kd(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;s=l;e=b;f=e+56|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(f|0));p=d+4|0;h=c[p>>2]|0;if((h|0)>0){f=c[d+8>>2]|0;g=0;e=0;do{e=((a[f+g>>0]|0)>0&1)+e|0;g=g+1|0}while((g|0)<(h|0))}else e=0;c[b+4>>2]=h;o=b+8|0;c[o>>2]=e;c[b>>2]=c[d>>2];if((e|0)<=0){r=0;l=s;return r|0}n=d+8|0;j=Ed(c[n>>2]|0,h,e)|0;k=e<<2;h=l;l=l+((1*k|0)+15&-16)|0;if(!j){Id(b);r=-1;l=s;return r|0}else f=0;do{r=j+(f<<2)|0;m=c[r>>2]|0;m=m>>>16|m<<16;m=m>>>8&16711935|m<<8&-16711936;m=m>>>4&252645135|m<<4&-252645136;m=m>>>2&858993459|m<<2&-858993460;c[r>>2]=m>>>1&1431655765|m<<1&-1431655766;c[h+(f<<2)>>2]=r;f=f+1|0}while((f|0)!=(e|0));Wj(h,e,4,12);m=l;l=l+((1*k|0)+15&-16)|0;i=pk(k)|0;r=b+20|0;c[r>>2]=i;f=j;g=0;do{c[m+((c[h+(g<<2)>>2]|0)-f>>2<<2)>>2]=g;g=g+1|0}while((g|0)!=(e|0));f=0;do{c[i+(c[m+(f<<2)>>2]<<2)>>2]=c[j+(f<<2)>>2];f=f+1|0}while((f|0)!=(e|0));qk(j);c[b+16>>2]=Gd(d,e,m)|0;g=pk(k)|0;c[b+24>>2]=g;h=c[p>>2]|0;j=(h|0)>0;if(j){f=c[n>>2]|0;i=0;e=0;do{if((a[f+i>>0]|0)>0){c[g+(c[m+(e<<2)>>2]<<2)>>2]=i;e=e+1|0}i=i+1|0}while((i|0)<(h|0))}else e=0;d=b+28|0;c[d>>2]=pk(e)|0;k=b+40|0;c[k>>2]=0;if(j){e=0;g=c[n>>2]|0;j=0;h=0;while(1){f=a[g+j>>0]|0;if(f<<24>>24>0){i=h+1|0;a[(c[d>>2]|0)+(c[m+(h<<2)>>2]|0)>>0]=f;g=c[n>>2]|0;e=a[g+j>>0]|0;f=c[k>>2]|0;if((e|0)>(f|0)){c[k>>2]=e;f=i}else{e=f;f=i}}else f=h;j=j+1|0;if((j|0)>=(c[p>>2]|0))break;else h=f}if((f|0)==1)if((e|0)==1){c[b+36>>2]=1;r=rk(2,4)|0;c[b+32>>2]=r;c[r+4>>2]=1;c[r>>2]=1;r=0;l=s;return r|0}else p=1;else p=f}else p=0;e=c[o>>2]|0;if(!e)e=-4;else{f=0;while(1){e=e>>>1;if(!e)break;else f=f+1|0}e=f+-3|0}o=b+36|0;k=(e|0)<5?5:e;k=(k|0)>8?8:k;c[o>>2]=k;m=1<<k;n=rk(m,4)|0;c[b+32>>2]=n;if((p|0)>0){e=k;j=0;do{i=(c[d>>2]|0)+j|0;f=a[i>>0]|0;if((e|0)>=(f|0)?(q=c[(c[r>>2]|0)+(j<<2)>>2]|0,q=q>>>16|q<<16,q=q>>>8&16711935|q<<8&-16711936,q=q>>>4&252645135|q<<4&-252645136,q=q>>>2&858993459|q<<2&-858993460,q=q>>>1&1431655765|q<<1&-1431655766,(e-f|0)!=31):0){h=j+1|0;g=0;do{c[n+((q|g<<f)<<2)>>2]=h;g=g+1|0;e=c[o>>2]|0;f=a[i>>0]|0}while((g|0)<(1<<e-f|0))}j=j+1|0}while((j|0)!=(p|0))}else e=k;d=-2<<31-e;if((k|0)==31){r=0;l=s;return r|0}else{h=0;f=0;g=0}while(1){j=f<<32-e;k=j>>>16|j<<16;k=k>>>8&16711935|k<<8&-16711936;k=k>>>4&252645135|k<<4&-252645136;k=k>>>2&858993459|k<<2&-858993460;k=n+((k>>>1&1431655765|k<<1&-1431655766)<<2)|0;if(!(c[k>>2]|0)){while(1){e=g+1|0;if((e|0)>=(p|0))break;if((c[(c[r>>2]|0)+(e<<2)>>2]|0)>>>0>j>>>0)break;else g=e}a:do if((p|0)>(h|0)){i=c[r>>2]|0;while(1){e=h+1|0;if(j>>>0<(c[i+(h<<2)>>2]&d)>>>0){e=h;break a}if((p|0)>(e|0))h=e;else break}}else e=h;while(0);h=p-e|0;c[k>>2]=(g>>>0>32767?-1073774592:g<<15|-2147483648)|(h>>>0>32767?32767:h);h=e}f=f+1|0;if((f|0)>=(m|0)){e=0;break}e=c[o>>2]|0}l=s;return e|0}function Ld(a,b){a=a|0;b=b|0;a=c[c[a>>2]>>2]|0;b=c[c[b>>2]>>2]|0;return (a>>>0>b>>>0&1)-(a>>>0<b>>>0&1)|0}function Md(a){a=a|0;var b=0;b=a+48|0;do{c[a>>2]=0;a=a+4|0}while((a|0)<(b|0));return}function Nd(a){a=a|0;return (c[(c[(c[a+64>>2]|0)+104>>2]|0)+80>>2]|0)!=0|0}function Od(a,b){a=a|0;b=b|0;var d=0.0,e=0,f=0,h=0,i=0,j=0.0,k=0,l=0,m=0,n=0,o=0.0,p=0.0;e=(b|0)/4|0;n=pk(e<<2)|0;i=pk(e+b<<2)|0;f=b>>1;o=+(b|0);l=~~+dk(+Q(+o)/.6931471805599453);c[a+4>>2]=l;c[a>>2]=b;c[a+8>>2]=i;c[a+12>>2]=n;if((b|0)<=3){o=4.0/o;a=a+16|0;g[a>>2]=o;return}d=3.141592653589793/+(b|0);j=3.141592653589793/+(b<<1|0);h=0;do{p=+(h<<2|0)*d;m=h<<1;g[i+(m<<2)>>2]=+I(+p);k=m|1;g[i+(k<<2)>>2]=-+J(+p);p=+(k|0)*j;m=m+f|0;g[i+(m<<2)>>2]=+I(+p);g[i+(m+1<<2)>>2]=+J(+p);h=h+1|0}while((h|0)<(e|0));m=(b|0)/8|0;f=(b|0)>7;if(!f){p=4.0/o;a=a+16|0;g[a>>2]=p;return}d=3.141592653589793/+(b|0);e=0;do{p=+(e<<2|2|0)*d;k=(e<<1)+b|0;g[i+(k<<2)>>2]=+I(+p)*.5;g[i+(k+1<<2)>>2]=+J(+p)*-.5;e=e+1|0}while((e|0)<(m|0));k=(1<<l+-1)+-1|0;b=1<<l+-2;if(f)h=0;else{p=4.0/o;a=a+16|0;g[a>>2]=p;return}do{e=b;f=0;i=0;do{f=(e&h|0)==0?f:f|1<<i;i=i+1|0;e=b>>i}while((e|0)!=0);l=h<<1;c[n+(l<<2)>>2]=(k&~f)+-1;c[n+((l|1)<<2)>>2]=f;h=h+1|0}while((h|0)<(m|0));p=4.0/o;a=a+16|0;g[a>>2]=p;return}function Pd(a){a=a|0;var b=0;if(!a)return;b=c[a+8>>2]|0;if(b|0)qk(b);b=c[a+12>>2]|0;if(b|0)qk(b);c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;c[a+16>>2]=0;return}function Qd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0.0;m=c[a>>2]|0;j=m>>1;m=m>>2;o=d+(j+m<<2)|0;k=a+8|0;l=c[k>>2]|0;i=l+(m<<2)|0;e=i;f=b+(j+-7<<2)|0;h=o;while(1){n=h;h=h+-16|0;q=f+8|0;r=e+12|0;p=e+8|0;g[h>>2]=-(+g[q>>2]*+g[r>>2])-+g[f>>2]*+g[p>>2];g[n+-12>>2]=+g[f>>2]*+g[r>>2]-+g[q>>2]*+g[p>>2];p=f+24|0;q=e+4|0;r=f+16|0;g[n+-8>>2]=-(+g[p>>2]*+g[q>>2])-+g[r>>2]*+g[e>>2];g[n+-4>>2]=+g[r>>2]*+g[q>>2]-+g[p>>2]*+g[e>>2];f=f+-32|0;if(f>>>0<b>>>0)break;else e=e+16|0}n=d+(j<<2)|0;e=i;f=b+(j+-8<<2)|0;h=o;while(1){i=f+16|0;r=e+-4|0;q=f+24|0;p=e+-8|0;g[h>>2]=+g[i>>2]*+g[r>>2]+ +g[q>>2]*+g[p>>2];g[h+4>>2]=+g[i>>2]*+g[p>>2]-+g[q>>2]*+g[r>>2];r=e+-12|0;e=e+-16|0;q=f+8|0;g[h+8>>2]=+g[f>>2]*+g[r>>2]+ +g[q>>2]*+g[e>>2];g[h+12>>2]=+g[f>>2]*+g[e>>2]-+g[q>>2]*+g[r>>2];f=f+-32|0;if(f>>>0<b>>>0)break;else h=h+16|0}Rd(c[a+4>>2]|0,l,n,j);Sd(c[a>>2]|0,c[k>>2]|0,c[a+12>>2]|0,d);e=(c[k>>2]|0)+(j<<2)|0;f=d;h=o;i=o;while(1){q=e+4|0;p=f+4|0;g[h+-4>>2]=+g[f>>2]*+g[q>>2]-+g[p>>2]*+g[e>>2];g[i>>2]=-(+g[f>>2]*+g[e>>2]+ +g[p>>2]*+g[q>>2]);q=f+8|0;p=e+12|0;a=f+12|0;r=e+8|0;g[h+-8>>2]=+g[q>>2]*+g[p>>2]-+g[a>>2]*+g[r>>2];g[i+4>>2]=-(+g[q>>2]*+g[r>>2]+ +g[a>>2]*+g[p>>2]);p=f+16|0;a=e+20|0;r=f+20|0;q=e+16|0;g[h+-12>>2]=+g[p>>2]*+g[a>>2]-+g[r>>2]*+g[q>>2];h=h+-16|0;g[i+8>>2]=-(+g[p>>2]*+g[q>>2]+ +g[r>>2]*+g[a>>2]);a=f+24|0;r=e+28|0;q=f+28|0;p=e+24|0;g[h>>2]=+g[a>>2]*+g[r>>2]-+g[q>>2]*+g[p>>2];g[i+12>>2]=-(+g[a>>2]*+g[p>>2]+ +g[q>>2]*+g[r>>2]);f=f+32|0;if(f>>>0>=h>>>0)break;else{e=e+32|0;i=i+16|0}}h=d+(m<<2)|0;e=o;f=h;do{r=f;f=f+-16|0;s=+g[e+-4>>2];g[r+-4>>2]=s;g[h>>2]=-s;s=+g[e+-8>>2];g[r+-8>>2]=s;g[h+4>>2]=-s;s=+g[e+-12>>2];e=e+-16|0;g[r+-12>>2]=s;g[h+8>>2]=-s;s=+g[e>>2];g[f>>2]=s;g[h+12>>2]=-s;h=h+16|0}while(h>>>0<e>>>0);f=o;e=o;while(1){r=e;e=e+-16|0;g[e>>2]=+g[f+12>>2];g[r+-12>>2]=+g[f+8>>2];g[r+-8>>2]=+g[f+4>>2];g[r+-4>>2]=+g[f>>2];if(e>>>0<=n>>>0)break;else f=f+16|0}return}function Rd(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0.0,x=0.0,y=0.0,z=0.0,A=0.0,B=0,C=0,D=0,E=0,F=0,G=0.0,H=0.0,I=0.0,J=0.0,K=0.0,L=0.0,M=0.0,N=0.0,O=0.0,P=0.0,Q=0.0,R=0.0,T=0.0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0.0,ca=0.0;v=a+-6|0;if((v|0)>0){e=b;f=c+(d+-8<<2)|0;h=c+((d>>1)+-8<<2)|0;while(1){s=f+24|0;y=+g[s>>2];r=h+24|0;A=+g[r>>2];z=y-A;t=f+28|0;x=+g[t>>2];u=h+28|0;w=x-+g[u>>2];g[s>>2]=y+A;g[t>>2]=x+ +g[u>>2];t=e+4|0;g[r>>2]=w*+g[t>>2]+z*+g[e>>2];g[u>>2]=w*+g[e>>2]-z*+g[t>>2];u=f+16|0;z=+g[u>>2];t=h+16|0;w=+g[t>>2];x=z-w;r=f+20|0;A=+g[r>>2];s=h+20|0;y=A-+g[s>>2];g[u>>2]=z+w;g[r>>2]=A+ +g[s>>2];r=e+20|0;u=e+16|0;g[t>>2]=y*+g[r>>2]+x*+g[u>>2];g[s>>2]=y*+g[u>>2]-x*+g[r>>2];s=f+8|0;x=+g[s>>2];r=h+8|0;y=+g[r>>2];A=x-y;u=f+12|0;w=+g[u>>2];t=h+12|0;z=w-+g[t>>2];g[s>>2]=x+y;g[u>>2]=w+ +g[t>>2];u=e+36|0;s=e+32|0;g[r>>2]=z*+g[u>>2]+A*+g[s>>2];g[t>>2]=z*+g[s>>2]-A*+g[u>>2];A=+g[f>>2];z=+g[h>>2];w=A-z;t=f+4|0;y=+g[t>>2];u=h+4|0;x=y-+g[u>>2];g[f>>2]=A+z;g[t>>2]=y+ +g[u>>2];t=e+52|0;s=e+48|0;g[h>>2]=x*+g[t>>2]+w*+g[s>>2];g[u>>2]=x*+g[s>>2]-w*+g[t>>2];h=h+-32|0;if(h>>>0<c>>>0)break;else{e=e+64|0;f=f+-32|0}}}if((a+-7|0)>0){r=1;do{n=1<<r;if((r|0)!=31){o=d>>r;p=4<<r;a=o+-8|0;f=(o>>1)+-8|0;h=p+1|0;i=p<<1;j=i|1;k=i+p|0;l=k+1|0;m=k+p|0;s=0;do{u=S(s,o)|0;q=c+(u<<2)|0;e=b;t=c+(a+u<<2)|0;u=c+(f+u<<2)|0;while(1){F=t+24|0;y=+g[F>>2];C=u+24|0;w=+g[C>>2];x=y-w;D=t+28|0;z=+g[D>>2];E=u+28|0;A=z-+g[E>>2];g[F>>2]=y+w;g[D>>2]=z+ +g[E>>2];D=e+4|0;g[C>>2]=A*+g[D>>2]+x*+g[e>>2];g[E>>2]=A*+g[e>>2]-x*+g[D>>2];E=e+(p<<2)|0;D=t+16|0;x=+g[D>>2];C=u+16|0;A=+g[C>>2];z=x-A;F=t+20|0;w=+g[F>>2];B=u+20|0;y=w-+g[B>>2];g[D>>2]=x+A;g[F>>2]=w+ +g[B>>2];F=e+(h<<2)|0;g[C>>2]=y*+g[F>>2]+z*+g[E>>2];g[B>>2]=y*+g[E>>2]-z*+g[F>>2];B=e+(i<<2)|0;F=t+8|0;z=+g[F>>2];E=u+8|0;y=+g[E>>2];w=z-y;C=t+12|0;A=+g[C>>2];D=u+12|0;x=A-+g[D>>2];g[F>>2]=z+y;g[C>>2]=A+ +g[D>>2];C=e+(j<<2)|0;g[E>>2]=x*+g[C>>2]+w*+g[B>>2];g[D>>2]=x*+g[B>>2]-w*+g[C>>2];D=e+(k<<2)|0;w=+g[t>>2];x=+g[u>>2];A=w-x;C=t+4|0;y=+g[C>>2];B=u+4|0;z=y-+g[B>>2];g[t>>2]=w+x;g[C>>2]=y+ +g[B>>2];C=e+(l<<2)|0;g[u>>2]=z*+g[C>>2]+A*+g[D>>2];g[B>>2]=z*+g[D>>2]-A*+g[C>>2];u=u+-32|0;if(u>>>0<q>>>0)break;else{e=e+(m<<2)|0;t=t+-32|0}}s=s+1|0}while((s|0)<(n|0))}r=r+1|0}while((r|0)!=(v|0))}if((d|0)>0)e=0;else return;do{_=c+(e<<2)|0;u=c+((e|30)<<2)|0;ba=+g[u>>2];U=c+((e|14)<<2)|0;K=+g[U>>2];E=c+((e|31)<<2)|0;J=+g[E>>2];k=c+((e|15)<<2)|0;T=+g[k>>2];g[u>>2]=ba+K;g[E>>2]=J+T;g[U>>2]=ba-K;g[k>>2]=J-T;v=c+((e|28)<<2)|0;T=+g[v>>2];a=c+((e|12)<<2)|0;J=+g[a>>2];K=T-J;F=c+((e|29)<<2)|0;ba=+g[F>>2];l=c+((e|13)<<2)|0;H=+g[l>>2];A=ba-H;g[v>>2]=T+J;g[F>>2]=ba+H;g[a>>2]=K*.9238795042037964-A*.3826834261417389;g[l>>2]=K*.3826834261417389+A*.9238795042037964;B=c+((e|26)<<2)|0;A=+g[B>>2];h=c+((e|10)<<2)|0;K=+g[h>>2];H=A-K;C=c+((e|27)<<2)|0;ba=+g[C>>2];i=c+((e|11)<<2)|0;J=+g[i>>2];T=ba-J;g[B>>2]=A+K;g[C>>2]=ba+J;g[h>>2]=(H-T)*.7071067690849304;g[i>>2]=(H+T)*.7071067690849304;b=c+((e|24)<<2)|0;T=+g[b>>2];f=c+((e|8)<<2)|0;H=+g[f>>2];J=T-H;D=c+((e|25)<<2)|0;ba=+g[D>>2];j=c+((e|9)<<2)|0;K=+g[j>>2];A=ba-K;g[b>>2]=T+H;g[D>>2]=ba+K;K=J*.3826834261417389-A*.9238795042037964;A=J*.9238795042037964+A*.3826834261417389;m=c+((e|22)<<2)|0;J=+g[m>>2];aa=c+((e|6)<<2)|0;ba=+g[aa>>2];H=J-ba;W=c+((e|7)<<2)|0;T=+g[W>>2];s=c+((e|23)<<2)|0;w=+g[s>>2];I=T-w;g[m>>2]=J+ba;g[s>>2]=T+w;g[aa>>2]=I;g[W>>2]=H;$=c+((e|4)<<2)|0;w=+g[$>>2];n=c+((e|20)<<2)|0;T=+g[n>>2];ba=w-T;V=c+((e|5)<<2)|0;J=+g[V>>2];t=c+((e|21)<<2)|0;z=+g[t>>2];y=J-z;g[n>>2]=w+T;g[t>>2]=J+z;z=ba*.3826834261417389+y*.9238795042037964;ba=y*.3826834261417389-ba*.9238795042037964;Z=c+((e|2)<<2)|0;y=+g[Z>>2];p=c+((e|18)<<2)|0;J=+g[p>>2];T=y-J;Y=c+((e|3)<<2)|0;w=+g[Y>>2];q=c+((e|19)<<2)|0;ca=+g[q>>2];M=w-ca;g[p>>2]=y+J;g[q>>2]=w+ca;ca=(T+M)*.7071067690849304;T=(M-T)*.7071067690849304;M=+g[_>>2];o=c+((e|16)<<2)|0;w=+g[o>>2];J=M-w;X=c+((e|1)<<2)|0;y=+g[X>>2];r=c+((e|17)<<2)|0;L=+g[r>>2];Q=y-L;w=M+w;g[o>>2]=w;L=y+L;g[r>>2]=L;y=J*.9238795042037964+Q*.3826834261417389;J=Q*.9238795042037964-J*.3826834261417389;Q=J-A;M=y-K;y=K+y;J=A+J;A=(Q+M)*.7071067690849304;M=(Q-M)*.7071067690849304;Q=+g[i>>2];K=T-Q;N=+g[h>>2];P=N-ca;N=ca+N;Q=T+Q;T=+g[a>>2];ca=T-z;G=+g[l>>2];O=G-ba;T=z+T;G=ba+G;ba=(ca-O)*.7071067690849304;O=(ca+O)*.7071067690849304;ca=+g[U>>2];z=ca-I;x=+g[k>>2];R=x-H;I=ca+I;H=x+H;x=K+z;K=z-K;z=A+ba;A=ba-A;g[aa>>2]=x+z;g[$>>2]=x-z;z=O-M;x=R-P;g[_>>2]=K+z;g[Z>>2]=K-z;O=M+O;R=P+R;g[Y>>2]=A+x;g[X>>2]=x-A;g[W>>2]=O+R;g[V>>2]=R-O;O=N+I;N=I-N;I=T+y;y=T-y;g[U>>2]=I+O;g[a>>2]=O-I;I=G-J;O=H-Q;g[f>>2]=I+N;g[h>>2]=N-I;G=J+G;H=Q+H;g[i>>2]=y+O;g[j>>2]=O-y;g[k>>2]=G+H;g[l>>2]=H-G;G=+g[D>>2];H=L-G;y=+g[b>>2];O=w-y;y=w+y;G=L+G;L=(H+O)*.7071067690849304;O=(H-O)*.7071067690849304;H=+g[q>>2];w=+g[C>>2];Q=H-w;J=+g[B>>2];I=+g[p>>2];N=J-I;I=J+I;w=H+w;H=+g[v>>2];J=+g[n>>2];T=H-J;R=+g[F>>2];A=+g[t>>2];x=R-A;J=H+J;A=R+A;R=(T-x)*.7071067690849304;x=(T+x)*.7071067690849304;T=+g[u>>2];H=+g[m>>2];P=T-H;M=+g[E>>2];z=+g[s>>2];K=M-z;H=T+H;z=M+z;M=Q+P;Q=P-Q;P=L+R;L=R-L;g[m>>2]=M+P;g[n>>2]=M-P;P=x-O;M=K-N;g[o>>2]=Q+P;g[p>>2]=Q-P;x=O+x;K=N+K;g[q>>2]=L+M;g[r>>2]=M-L;g[s>>2]=x+K;g[t>>2]=K-x;x=I+H;I=H-I;H=y+J;y=J-y;g[u>>2]=H+x;g[v>>2]=x-H;H=A-G;x=z-w;g[b>>2]=H+I;g[B>>2]=I-H;A=G+A;z=w+z;g[C>>2]=y+x;g[D>>2]=x-y;g[E>>2]=A+z;g[F>>2]=z-A;e=e+32|0}while((e|0)<(d|0));return}function Sd(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0,i=0,j=0.0,k=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0,t=0;h=a>>1;f=b+(a<<2)|0;a=d;b=e;d=e+(h<<2)|0;while(1){t=(c[a>>2]|0)+h|0;i=(c[a+4>>2]|0)+h|0;r=+g[e+(t+1<<2)>>2];n=+g[e+(i+1<<2)>>2];k=r-n;j=+g[e+(t<<2)>>2];o=+g[e+(i<<2)>>2];l=j+o;m=+g[f>>2];q=+g[f+4>>2];p=l*m+k*q;m=l*q-k*m;i=d;d=d+-16|0;n=(r+n)*.5;o=(j-o)*.5;g[b>>2]=n+p;g[i+-8>>2]=n-p;g[b+4>>2]=o+m;g[i+-4>>2]=m-o;t=(c[a+8>>2]|0)+h|0;s=(c[a+12>>2]|0)+h|0;o=+g[e+(t+1<<2)>>2];m=+g[e+(s+1<<2)>>2];p=o-m;n=+g[e+(t<<2)>>2];j=+g[e+(s<<2)>>2];r=n+j;k=+g[f+8>>2];q=+g[f+12>>2];l=r*k+p*q;k=r*q-p*k;m=(o+m)*.5;j=(n-j)*.5;g[b+8>>2]=m+l;g[d>>2]=m-l;g[b+12>>2]=j+k;g[i+-12>>2]=k-j;b=b+16|0;if(b>>>0>=d>>>0)break;else{f=f+16|0;a=a+16|0}}return}function Td(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0.0,y=0.0,z=0;w=l;q=c[a>>2]|0;u=q>>1;v=q>>2;o=q>>3;f=l;l=l+((1*(q<<2)|0)+15&-16)|0;r=f+(u<<2)|0;e=u+v|0;h=b+(e<<2)|0;t=a+8|0;s=c[t>>2]|0;j=s+(u<<2)|0;if((o|0)>0){n=(o+-1|0)>>>1;m=n<<1;k=u+-2-m|0;n=e+-4-(n<<2)|0;i=0;e=b+(e+1<<2)|0;while(1){z=h;h=h+-16|0;p=j;j=j+-8|0;x=+g[z+-8>>2]+ +g[e>>2];y=+g[h>>2]+ +g[e+8>>2];p=p+-4|0;g[f+(i+u<<2)>>2]=y*+g[p>>2]+x*+g[j>>2];g[f+((i|1)+u<<2)>>2]=y*+g[j>>2]-x*+g[p>>2];i=i+2|0;if((i|0)>=(o|0))break;else e=e+16|0}j=s+(k<<2)|0;i=m+2|0;h=b+(n<<2)|0}else i=0;e=b+4|0;n=u-o|0;if((i|0)<(n|0)){p=(u+-1-i-o|0)>>>1;k=p<<1;o=i+k|0;p=(p<<2)+5|0;k=-2-k|0;m=j;while(1){z=m;m=m+-8|0;y=+g[h+-8>>2]-+g[e>>2];h=h+-16|0;x=+g[h>>2]-+g[e+8>>2];z=z+-4|0;g[f+(i+u<<2)>>2]=x*+g[z>>2]+y*+g[m>>2];g[f+((i|1)+u<<2)>>2]=x*+g[m>>2]-y*+g[z>>2];i=i+2|0;if((i|0)>=(n|0))break;else e=e+16|0}j=j+(k<<2)|0;i=o+2|0;e=b+(p<<2)|0}if((i|0)<(u|0)){h=b+(q<<2)|0;while(1){z=j;j=j+-8|0;y=-+g[h+-8>>2]-+g[e>>2];h=h+-16|0;x=-+g[h>>2]-+g[e+8>>2];z=z+-4|0;g[f+(i+u<<2)>>2]=x*+g[z>>2]+y*+g[j>>2];g[f+((i|1)+u<<2)>>2]=x*+g[j>>2]-y*+g[z>>2];i=i+2|0;if((i|0)>=(u|0))break;else e=e+16|0}}Rd(c[a+4>>2]|0,s,r,u);Sd(c[a>>2]|0,c[t>>2]|0,c[a+12>>2]|0,f);if((v|0)<=0){l=w;return}j=a+16|0;h=(c[t>>2]|0)+(u<<2)|0;i=0;e=d+(u<<2)|0;while(1){e=e+-4|0;z=f+4|0;u=h+4|0;g[d+(i<<2)>>2]=+g[j>>2]*(+g[f>>2]*+g[h>>2]+ +g[z>>2]*+g[u>>2]);g[e>>2]=+g[j>>2]*(+g[f>>2]*+g[u>>2]-+g[z>>2]*+g[h>>2]);i=i+1|0;if((i|0)==(v|0))break;else{h=h+8|0;f=f+8|0}}l=w;return}function Ud(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;q=c[a>>2]|0;if((q|0)==1)return;r=c[a+4>>2]|0;k=c[a+8>>2]|0;l=c[k+4>>2]|0;if((l|0)<=0)return;m=l+1|0;j=q+-1|0;n=q;o=0;p=q;i=1;while(1){d=c[k+(m-o<<2)>>2]|0;h=(q|0)/(p|0)|0;p=(p|0)/(d|0)|0;e=S(h,p)|0;n=n-(S(h,d+-1|0)|0)|0;a=1-i|0;a:do switch(d|0){case 4:{f=n+h|0;d=r+(j+n<<2)|0;e=r+(j+f<<2)|0;f=r+(j+h+f<<2)|0;if((i|0)==1){Vd(h,p,b,r,d,e,f);break a}else{Vd(h,p,r,b,d,e,f);break a}}case 2:{d=r+(j+n<<2)|0;if((i|0)==1){Wd(h,p,b,r,d);break a}else{Wd(h,p,r,b,d);break a}}default:{f=r+(j+n<<2)|0;if(!(((h|0)==1?i:a)|0)){Xd(h,d,p,e,b,b,b,r,r,f);a=1;break a}else{Xd(h,d,p,e,r,r,r,b,b,f);a=0;break a}}}while(0);o=o+1|0;if((o|0)==(l|0))break;else i=a}if((a|0)!=1&(q|0)>0)a=0;else return;do{g[b+(a<<2)>>2]=+g[r+(a<<2)>>2];a=a+1|0}while((a|0)!=(q|0));return}function Vd(a,b,c,d,e,f,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0.0,z=0.0,A=0.0,B=0.0,C=0.0,D=0.0,E=0.0,F=0.0,G=0.0;s=S(b,a)|0;r=s<<1;q=(b|0)>0;if(q){i=(a<<2)+-1|0;j=a<<1;k=0;l=s;m=r+s|0;n=0;o=r;while(1){u=c+(l<<2)|0;v=c+(m<<2)|0;y=+g[u>>2]+ +g[v>>2];x=c+(n<<2)|0;w=c+(o<<2)|0;z=+g[x>>2]+ +g[w>>2];t=n<<2;g[d+(t<<2)>>2]=y+z;g[d+(i+t<<2)>>2]=z-y;t=t+j|0;g[d+(t+-1<<2)>>2]=+g[x>>2]-+g[w>>2];g[d+(t<<2)>>2]=+g[v>>2]-+g[u>>2];k=k+1|0;if((k|0)==(b|0))break;else{l=l+a|0;m=m+a|0;n=n+a|0;o=o+a|0}}}if((a|0)<2)return;if((a|0)!=2){if(q?(p=a<<1,(a|0)>2):0){j=0;k=0;while(1){n=k<<2;i=2;l=k;m=n;n=n+p|0;do{v=l;l=l+2|0;w=m;m=m+2|0;x=n;n=n+-2|0;u=l+s|0;o=i+-2|0;D=+g[e+(o<<2)>>2];F=+g[c+(u+-1<<2)>>2];t=i+-1|0;G=+g[e+(t<<2)>>2];B=+g[c+(u<<2)>>2];C=D*F+G*B;G=D*B-F*G;u=u+s|0;F=+g[f+(o<<2)>>2];B=+g[c+(u+-1<<2)>>2];D=+g[f+(t<<2)>>2];A=+g[c+(u<<2)>>2];E=F*B+D*A;D=F*A-B*D;u=u+s|0;B=+g[h+(o<<2)>>2];A=+g[c+(u+-1<<2)>>2];F=+g[h+(t<<2)>>2];z=+g[c+(u<<2)>>2];y=B*A+F*z;F=B*z-A*F;A=C+y;C=y-C;y=G+F;F=G-F;G=+g[c+(l<<2)>>2];z=D+G;D=G-D;G=+g[c+(v+1<<2)>>2];B=E+G;E=G-E;g[d+((w|1)<<2)>>2]=A+B;g[d+(m<<2)>>2]=z+y;g[d+(x+-3<<2)>>2]=E-F;g[d+(n<<2)>>2]=C-D;x=m+p|0;g[d+(x+-1<<2)>>2]=F+E;g[d+(x<<2)>>2]=D+C;x=n+p|0;g[d+(x+-1<<2)>>2]=B-A;g[d+(x<<2)>>2]=y-z;i=i+2|0}while((i|0)<(a|0));j=j+1|0;if((j|0)==(b|0))break;else k=k+a|0}}if(a&1|0)return}i=a+-1+s|0;n=a<<2;o=a<<1;if(!q)return;l=0;m=i;i=i+r|0;j=a;k=a;while(1){E=+g[c+(m<<2)>>2];F=+g[c+(i<<2)>>2];G=(E+F)*-.7071067690849304;F=(E-F)*.7071067690849304;w=c+(k+-1<<2)|0;g[d+(j+-1<<2)>>2]=+g[w>>2]+F;x=j+o|0;g[d+(x+-1<<2)>>2]=+g[w>>2]-F;w=c+(m+s<<2)|0;g[d+(j<<2)>>2]=G-+g[w>>2];g[d+(x<<2)>>2]=G+ +g[w>>2];l=l+1|0;if((l|0)==(b|0))break;else{m=m+a|0;i=i+a|0;j=j+n|0;k=k+a|0}}return}function Wd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0.0,t=0,u=0,v=0,w=0.0,x=0.0,y=0.0,z=0.0;p=S(b,a)|0;q=a<<1;o=(b|0)>0;if(o){f=q+-1|0;h=0;i=0;j=p;while(1){l=c+(i<<2)|0;m=c+(j<<2)|0;n=i<<1;g[d+(n<<2)>>2]=+g[l>>2]+ +g[m>>2];g[d+(f+n<<2)>>2]=+g[l>>2]-+g[m>>2];h=h+1|0;if((h|0)==(b|0))break;else{i=i+a|0;j=j+a|0}}}if((a|0)<2)return;if((a|0)!=2){if(o&(a|0)>2){h=0;i=0;j=p;while(1){n=i<<1;f=2;k=j;l=n+q|0;m=i;do{v=k;k=k+2|0;r=l;l=l+-2|0;t=m;m=m+2|0;u=n;n=n+2|0;z=+g[e+(f+-2<<2)>>2];x=+g[c+(v+1<<2)>>2];w=+g[e+(f+-1<<2)>>2];y=+g[c+(k<<2)>>2];s=z*x+w*y;w=z*y-x*w;v=c+(m<<2)|0;g[d+(n<<2)>>2]=+g[v>>2]+w;g[d+(l<<2)>>2]=w-+g[v>>2];t=c+(t+1<<2)|0;g[d+((u|1)<<2)>>2]=s+ +g[t>>2];g[d+(r+-3<<2)>>2]=+g[t>>2]-s;f=f+2|0}while((f|0)<(a|0));h=h+1|0;if((h|0)==(b|0))break;else{i=i+a|0;j=j+a|0}}}if(((a|0)%2|0|0)==1)return}f=a+-1|0;if(!o)return;i=0;j=a;h=p+f|0;while(1){g[d+(j<<2)>>2]=-+g[c+(h<<2)>>2];g[d+(j+-1<<2)>>2]=+g[c+(f<<2)>>2];i=i+1|0;if((i|0)==(b|0))break;else{j=j+q|0;h=h+a|0;f=f+a|0}}return}function Xd(a,b,c,d,e,f,h,i,j,k){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;h=h|0;i=i|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0.0,y=0.0,z=0.0,A=0.0,B=0,C=0,D=0.0,E=0.0,F=0,G=0,H=0,K=0,L=0,M=0,N=0,O=0,P=0.0;E=6.2831854820251465/+(b|0);D=+I(+E);E=+J(+E);M=b+1>>1;G=a+-1>>1;K=S(c,a)|0;L=S(b,a)|0;F=(a|0)==1;a:do if(!F){if((d|0)>0){l=0;do{g[j+(l<<2)>>2]=+g[h+(l<<2)>>2];l=l+1|0}while((l|0)!=(d|0))}q=(b|0)>1;if(q){l=(c|0)>0;m=1;o=0;do{o=o+K|0;if(l){n=0;p=o;while(1){g[i+(p<<2)>>2]=+g[f+(p<<2)>>2];n=n+1|0;if((n|0)==(c|0))break;else p=p+a|0}}m=m+1|0}while((m|0)!=(b|0))}l=0-a|0;if((G|0)>(c|0)){if(q){u=(c|0)>0;v=(a|0)>2;p=1;r=0;do{r=r+K|0;l=l+a|0;if(u){m=l+-1|0;q=0;s=r-a|0;do{s=s+a|0;if(v){n=2;o=m;t=s;do{N=o;o=o+2|0;N=k+(N+1<<2)|0;O=t+1|0;t=t+2|0;C=f+(O<<2)|0;B=k+(o<<2)|0;w=f+(t<<2)|0;g[i+(O<<2)>>2]=+g[N>>2]*+g[C>>2]+ +g[B>>2]*+g[w>>2];g[i+(t<<2)>>2]=+g[N>>2]*+g[w>>2]-+g[B>>2]*+g[C>>2];n=n+2|0}while((n|0)<(a|0))}q=q+1|0}while((q|0)!=(c|0))}p=p+1|0}while((p|0)!=(b|0))}}else if(q){v=(a|0)>2;w=(c|0)>0;s=1;t=0;do{l=l+a|0;t=t+K|0;if(v){q=2;r=l+-1|0;u=t;do{m=r;r=r+2|0;u=u+2|0;if(w){m=k+(m+1<<2)|0;n=k+(r<<2)|0;o=0;p=u;while(1){C=p+-1|0;O=f+(C<<2)|0;N=f+(p<<2)|0;g[i+(C<<2)>>2]=+g[m>>2]*+g[O>>2]+ +g[n>>2]*+g[N>>2];g[i+(p<<2)>>2]=+g[m>>2]*+g[N>>2]-+g[n>>2]*+g[O>>2];o=o+1|0;if((o|0)==(c|0))break;else p=p+a|0}}q=q+2|0}while((q|0)<(a|0))}s=s+1|0}while((s|0)!=(b|0))}m=S(K,b)|0;l=(M|0)>1;if((G|0)>=(c|0)){if(!l)break;s=(c|0)>0;t=(a|0)>2;u=1;v=0;while(1){v=v+K|0;m=m-K|0;if(s){n=0;o=v;p=m;while(1){if(t){l=2;q=o;r=p;do{B=q;q=q+2|0;B=B+1|0;O=i+(B<<2)|0;k=r+1|0;r=r+2|0;N=i+(k<<2)|0;g[f+(B<<2)>>2]=+g[O>>2]+ +g[N>>2];B=i+(q<<2)|0;C=i+(r<<2)|0;g[f+(k<<2)>>2]=+g[B>>2]-+g[C>>2];g[f+(q<<2)>>2]=+g[B>>2]+ +g[C>>2];g[f+(r<<2)>>2]=+g[N>>2]-+g[O>>2];l=l+2|0}while((l|0)<(a|0))}n=n+1|0;if((n|0)==(c|0))break;else{o=o+a|0;p=p+a|0}}}u=u+1|0;if((u|0)==(M|0))break a}}if(l){s=(a|0)>2;t=(c|0)>0;u=1;v=0;do{v=v+K|0;m=m-K|0;if(s){l=2;o=v;p=m;do{o=o+2|0;p=p+2|0;if(t){n=0;q=o-a|0;r=p-a|0;do{q=q+a|0;r=r+a|0;B=q+-1|0;O=i+(B<<2)|0;k=r+-1|0;N=i+(k<<2)|0;g[f+(B<<2)>>2]=+g[O>>2]+ +g[N>>2];B=i+(q<<2)|0;C=i+(r<<2)|0;g[f+(k<<2)>>2]=+g[B>>2]-+g[C>>2];g[f+(q<<2)>>2]=+g[B>>2]+ +g[C>>2];g[f+(r<<2)>>2]=+g[N>>2]-+g[O>>2];n=n+1|0}while((n|0)!=(c|0))}l=l+2|0}while((l|0)<(a|0))}u=u+1|0}while((u|0)!=(M|0))}}while(0);B=(d|0)>0;if(B){l=0;do{g[h+(l<<2)>>2]=+g[j+(l<<2)>>2];l=l+1|0}while((l|0)!=(d|0))}s=S(d,b)|0;C=(M|0)>1;if(C){l=(c|0)>0;m=1;o=0;p=s;do{o=o+K|0;p=p-K|0;if(l){n=0;q=o-a|0;r=p-a|0;do{q=q+a|0;r=r+a|0;O=i+(q<<2)|0;N=i+(r<<2)|0;g[f+(q<<2)>>2]=+g[O>>2]+ +g[N>>2];g[f+(r<<2)>>2]=+g[N>>2]-+g[O>>2];n=n+1|0}while((n|0)!=(c|0))}m=m+1|0}while((m|0)!=(M|0));u=S(b+-1|0,d)|0;if(C){v=(M|0)>2;z=0.0;A=1.0;w=1;k=0;do{k=k+d|0;s=s-d|0;y=A;A=D*A-E*z;z=D*z+E*y;if(B){l=0;m=k;n=s;o=u;p=d;while(1){g[j+(m<<2)>>2]=+g[h+(l<<2)>>2]+A*+g[h+(p<<2)>>2];g[j+(n<<2)>>2]=z*+g[h+(o<<2)>>2];l=l+1|0;if((l|0)==(d|0))break;else{m=m+1|0;n=n+1|0;o=o+1|0;p=p+1|0}}}if(v){x=z;y=A;m=2;n=d;o=u;do{n=n+d|0;o=o-d|0;P=y;y=A*y-z*x;x=A*x+z*P;if(B){l=0;p=k;q=s;r=n;t=o;while(1){O=j+(p<<2)|0;g[O>>2]=+g[O>>2]+y*+g[h+(r<<2)>>2];O=j+(q<<2)|0;g[O>>2]=+g[O>>2]+x*+g[h+(t<<2)>>2];l=l+1|0;if((l|0)==(d|0))break;else{p=p+1|0;q=q+1|0;r=r+1|0;t=t+1|0}}}m=m+1|0}while((m|0)!=(M|0))}w=w+1|0}while((w|0)!=(M|0));if(C){m=1;n=0;do{n=n+d|0;if(B){l=0;o=n;while(1){O=j+(l<<2)|0;g[O>>2]=+g[h+(o<<2)>>2]+ +g[O>>2];l=l+1|0;if((l|0)==(d|0))break;else o=o+1|0}}m=m+1|0}while((m|0)!=(M|0))}}}if((a|0)<(c|0)){if((a|0)>0){l=(c|0)>0;m=0;do{if(l){n=0;o=m;p=m;while(1){g[e+(p<<2)>>2]=+g[i+(o<<2)>>2];n=n+1|0;if((n|0)==(c|0))break;else{o=o+a|0;p=p+L|0}}}m=m+1|0}while((m|0)!=(a|0))}}else if((c|0)>0){l=(a|0)>0;n=0;o=0;p=0;while(1){if(l){m=0;q=o;r=p;while(1){g[e+(r<<2)>>2]=+g[i+(q<<2)>>2];m=m+1|0;if((m|0)==(a|0))break;else{q=q+1|0;r=r+1|0}}}n=n+1|0;if((n|0)==(c|0))break;else{o=o+a|0;p=p+L|0}}}B=a<<1;o=S(K,b)|0;if(C){l=(c|0)>0;m=1;p=0;q=0;r=o;do{p=p+B|0;q=q+K|0;r=r-K|0;if(l){n=0;s=p;t=q;u=r;while(1){g[e+(s+-1<<2)>>2]=+g[i+(t<<2)>>2];g[e+(s<<2)>>2]=+g[i+(u<<2)>>2];n=n+1|0;if((n|0)==(c|0))break;else{s=s+L|0;t=t+a|0;u=u+a|0}}}m=m+1|0}while((m|0)!=(M|0))}if(F)return;l=0-a|0;if((G|0)>=(c|0)){if(C){v=1;t=0;u=0}else return;do{l=l+B|0;t=t+B|0;u=u+K|0;o=o-K|0;if(!((c|0)<1|(a|0)<3)){n=0;p=l;q=t;r=u;s=o;while(1){m=2;do{N=m+r|0;b=i+(N+-1<<2)|0;H=m+s|0;F=i+(H+-1<<2)|0;G=m+q|0;g[e+(G+-1<<2)>>2]=+g[b>>2]+ +g[F>>2];O=a-m+p|0;g[e+(O+-1<<2)>>2]=+g[b>>2]-+g[F>>2];N=i+(N<<2)|0;H=i+(H<<2)|0;g[e+(G<<2)>>2]=+g[N>>2]+ +g[H>>2];g[e+(O<<2)>>2]=+g[H>>2]-+g[N>>2];m=m+2|0}while((m|0)<(a|0));n=n+1|0;if((n|0)==(c|0))break;else{p=p+L|0;q=q+L|0;r=r+a|0;s=s+a|0}}}v=v+1|0}while((v|0)!=(M|0));return}if(!C)return;v=(a|0)>2;w=(c|0)>0;k=1;t=0;u=0;do{l=l+B|0;t=t+B|0;u=u+K|0;o=o-K|0;if(v?(H=l+a|0,w):0){m=2;do{n=0;p=H-m|0;q=m+t|0;r=m+u|0;s=m+o|0;while(1){N=i+(r+-1<<2)|0;O=i+(s+-1<<2)|0;g[e+(q+-1<<2)>>2]=+g[N>>2]+ +g[O>>2];g[e+(p+-1<<2)>>2]=+g[N>>2]-+g[O>>2];O=i+(r<<2)|0;N=i+(s<<2)|0;g[e+(q<<2)>>2]=+g[O>>2]+ +g[N>>2];g[e+(p<<2)>>2]=+g[N>>2]-+g[O>>2];n=n+1|0;if((n|0)==(c|0))break;else{p=p+L|0;q=q+L|0;r=r+a|0;s=s+a|0}}m=m+2|0}while((m|0)<(a|0))}k=k+1|0}while((k|0)!=(M|0));return}function Yd(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,h=0,i=0,j=0,k=0,l=0,m=0.0,n=0.0,o=0,p=0,q=0,r=0,s=0,t=0.0,u=0,v=0,w=0.0;c[a>>2]=b;u=rk(b*3|0,4)|0;c[a+4>>2]=u;v=rk(32,4)|0;c[a+8>>2]=v;if((b|0)==1)return;k=v+8|0;l=0;d=0;e=b;a=0;a:while(1){if((l|0)<4)a=c[57748+(l<<2)>>2]|0;else a=a+2|0;j=(a|0)!=2;while(1){i=d+1|0;f=(e|0)/(a|0)|0;if((e|0)!=(S(f,a)|0))break;c[v+(d+2<<2)>>2]=a;h=(d|0)==0;if(!(j|h)){if((d|0)>=1){e=1;do{s=i-e|0;c[v+(s+2<<2)>>2]=c[v+(s+1<<2)>>2];e=e+1|0}while((e|0)!=(i|0))}c[k>>2]=2}if((f|0)==1)break a;else{d=i;e=f}}l=l+1|0}c[v>>2]=b;c[v+4>>2]=i;t=6.2831854820251465/+(b|0);if(!((d|0)>0&(h^1)))return;q=b+1|0;a=0;r=0;s=1;do{f=c[v+(r+2<<2)>>2]|0;o=s;s=S(f,s)|0;e=(b|0)/(s|0)|0;f=f+-1|0;if((f|0)>0){h=(e|0)>2;k=a;l=0;p=0;while(1){p=p+o|0;m=t*+(p|0);if(h){n=0.0;i=k;j=2;while(1){n=n+1.0;w=m*n;g[u+(i+b<<2)>>2]=+I(+w);g[u+(q+i<<2)>>2]=+J(+w);j=j+2|0;if((j|0)>=(e|0))break;else i=i+2|0}}l=l+1|0;if((l|0)==(f|0))break;else k=k+e|0}a=(S(e,f)|0)+a|0}r=r+1|0}while((r|0)!=(d|0));return}function Zd(a){a=a|0;var b=0;if(!a)return;b=c[a+4>>2]|0;if(b|0)qk(b);b=c[a+8>>2]|0;if(b|0)qk(b);c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;return}function _d(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;n=a+836|0;k=c[a+840>>2]|0;Tb(b,c[a>>2]|0,5);if((c[a>>2]|0)>0){d=a+4|0;e=0;l=-1;do{j=d+(e<<2)|0;Tb(b,c[j>>2]|0,4);j=c[j>>2]|0;l=(l|0)<(j|0)?j:l;e=e+1|0}while((e|0)<(c[a>>2]|0));if((l|0)>-1){g=a+128|0;h=a+192|0;d=a+256|0;e=a+320|0;i=0;while(1){Tb(b,(c[g+(i<<2)>>2]|0)+-1|0,3);f=h+(i<<2)|0;Tb(b,c[f>>2]|0,2);if(!((c[f>>2]|0)!=0?(Tb(b,c[d+(i<<2)>>2]|0,8),(c[f>>2]|0)==31):0)){j=0;m=8}if((m|0)==8)while(1){m=0;Tb(b,(c[e+(i<<5)+(j<<2)>>2]|0)+1|0,8);j=j+1|0;if((j|0)>=(1<<c[f>>2]|0))break;else m=8}if((i|0)==(l|0))break;else i=i+1|0}}}Tb(b,(c[a+832>>2]|0)+-1|0,2);h=k+-1|0;Tb(b,Dd(h)|0,4);h=Dd(h)|0;d=c[a>>2]|0;if((d|0)<=0)return;i=a+4|0;j=a+128|0;f=0;g=0;e=0;do{f=(c[j+(c[i+(g<<2)>>2]<<2)>>2]|0)+f|0;if((e|0)<(f|0)){d=e;do{Tb(b,c[n+(d+2<<2)>>2]|0,h);d=d+1|0}while((d|0)!=(f|0));d=c[a>>2]|0;e=f}g=g+1|0}while((g|0)<(d|0));return}function $d(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0;r=l;l=l+272|0;q=r;g=c[a+28>>2]|0;a=rk(1,1120)|0;n=Yb(b,5)|0;c[a>>2]=n;a:do if((n|0)>0){e=a+4|0;f=0;n=-1;do{d=Yb(b,4)|0;c[e+(f<<2)>>2]=d;if((d|0)<0)break a;n=(n|0)<(d|0)?d:n;f=f+1|0}while((f|0)<(c[a>>2]|0));if((n|0)>-1){j=a+128|0;k=a+192|0;m=a+256|0;f=g+24|0;g=a+320|0;i=0;while(1){c[j+(i<<2)>>2]=(Yb(b,3)|0)+1;d=Yb(b,2)|0;h=k+(i<<2)|0;c[h>>2]=d;if((d|0)<0)break a;if(!d)d=c[m+(i<<2)>>2]|0;else{d=Yb(b,8)|0;c[m+(i<<2)>>2]=d}if((d|0)<0){p=36;break a}if((d|0)>=(c[f>>2]|0)){p=36;break a}if((c[h>>2]|0)!=31){e=0;do{d=Yb(b,8)|0;c[g+(i<<5)+(e<<2)>>2]=d+-1;if((d|0)<0)break a;e=e+1|0;if((d|0)>(c[f>>2]|0)){p=36;break a}}while((e|0)<(1<<c[h>>2]|0))}if((i|0)<(n|0))i=i+1|0;else{p=18;break}}}else p=18}else p=18;while(0);b:do if((p|0)==18?(c[a+832>>2]=(Yb(b,2)|0)+1,o=Yb(b,4)|0,(o|0)>=0):0){d=c[a>>2]|0;if((d|0)>0){i=a+4|0;j=a+128|0;e=a+836|0;k=1<<o;g=0;h=0;f=0;do{g=(c[j+(c[i+(h<<2)>>2]<<2)>>2]|0)+g|0;if((g|0)>63)break b;if((f|0)<(g|0)){do{n=Yb(b,o)|0;c[e+(f+2<<2)>>2]=n;f=f+1|0;if(!((n|0)>-1&(n|0)<(k|0)))break b}while((f|0)<(g|0));d=c[a>>2]|0}h=h+1|0}while((h|0)<(d|0));d=g+2|0;c[e>>2]=0;c[a+840>>2]=k;if((d|0)>0){f=q;g=d}else{Wj(q,d,4,13);q=a;l=r;return q|0}}else{e=a+836|0;c[e>>2]=0;c[a+840>>2]=1<<o;f=q;g=2}d=0;do{c[q+(d<<2)>>2]=e+(d<<2);d=d+1|0}while((d|0)!=(g|0));Wj(f,g,4,13);if((g|0)<=1){q=a;l=r;return q|0}d=c[c[q>>2]>>2]|0;e=1;do{p=d;d=c[c[q+(e<<2)>>2]>>2]|0;e=e+1|0;if((p|0)==(d|0)){p=36;break b}}while((e|0)<(g|0));l=r;return a|0}while(0);if((p|0)==36?(a|0)==0:0){q=0;l=r;return q|0}qk(a);q=0;l=r;return q|0}function ae(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;t=l;l=l+272|0;i=t;q=rk(1,1312)|0;c[q+1296>>2]=b;r=b+836|0;s=q+1288|0;c[s>>2]=c[b+840>>2];d=c[b>>2]|0;if((d|0)>0){e=b+4|0;a=b+128|0;f=0;g=0;do{g=(c[a+(c[e+(f<<2)>>2]<<2)>>2]|0)+g|0;f=f+1|0}while((f|0)<(d|0));a=g+2|0;c[q+1284>>2]=a;if((a|0)>0)h=7;else Wj(i,a,4,13)}else{c[q+1284>>2]=2;a=2;g=0;h=7}if((h|0)==7){d=0;do{c[i+(d<<2)>>2]=r+(d<<2);d=d+1|0}while((d|0)!=(a|0));Wj(i,a,4,13);d=r;e=q+260|0;f=0;do{c[e+(f<<2)>>2]=(c[i+(f<<2)>>2]|0)-d>>2;f=f+1|0}while((f|0)!=(a|0));d=q+260|0;e=q+520|0;f=0;do{c[e+(c[d+(f<<2)>>2]<<2)>>2]=f;f=f+1|0}while((f|0)!=(a|0));d=q+260|0;e=0;do{c[q+(e<<2)>>2]=c[r+(c[d+(e<<2)>>2]<<2)>>2];e=e+1|0}while((e|0)!=(a|0))}switch(c[b+832>>2]|0){case 1:{c[q+1292>>2]=256;break}case 2:{c[q+1292>>2]=128;break}case 3:{c[q+1292>>2]=86;break}case 4:{c[q+1292>>2]=64;break}default:{}}if((g|0)<=0){l=t;return q|0}m=q+1032|0;n=q+780|0;o=0;p=2;while(1){k=o+2|0;f=c[r+(k<<2)>>2]|0;if((k|0)>0){d=1;i=c[s>>2]|0;b=0;a=0;j=0;while(1){h=c[r+(b<<2)>>2]|0;k=(h|0)>(j|0)&(h|0)<(f|0);a=k?b:a;e=(h|0)<(i|0)&(h|0)>(f|0);d=e?b:d;b=b+1|0;if((b|0)==(p|0))break;else{i=e?h:i;j=k?h:j}}}else{d=1;a=0}c[m+(o<<2)>>2]=a;c[n+(o<<2)>>2]=d;o=o+1|0;if((o|0)==(g|0))break;else p=p+1|0}l=t;return q|0}function be(a){a=a|0;if(a|0)qk(a);return}function ce(a){a=a|0;if(a|0)qk(a);return}function de(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;p=c[b+1296>>2]|0;n=c[(c[(c[(c[a+64>>2]|0)+4>>2]|0)+28>>2]|0)+2848>>2]|0;m=a+4|0;if((Yb(m,1)|0)!=1){q=0;return q|0}q=b+1284|0;a=Oc(a,c[q>>2]<<2)|0;o=b+1292|0;c[a>>2]=Yb(m,Dd((c[o>>2]|0)+-1|0)|0)|0;c[a+4>>2]=Yb(m,Dd((c[o>>2]|0)+-1|0)|0)|0;a:do if((c[p>>2]|0)>0){k=0;l=2;b:while(1){h=c[p+4+(k<<2)>>2]|0;i=c[p+128+(h<<2)>>2]|0;j=c[p+192+(h<<2)>>2]|0;e=1<<j;if(j){d=xd(n+((c[p+256+(h<<2)>>2]|0)*56|0)|0,m)|0;if((d|0)==-1){a=0;d=25;break}}else d=0;if((i|0)>0){g=e+-1|0;f=0;do{e=c[p+320+(h<<5)+((d&g)<<2)>>2]|0;d=d>>j;if((e|0)>-1){e=xd(n+(e*56|0)|0,m)|0;c[a+(f+l<<2)>>2]=e;if((e|0)==-1){a=0;d=25;break b}}else c[a+(f+l<<2)>>2]=0;f=f+1|0}while((f|0)<(i|0))}k=k+1|0;if((k|0)>=(c[p>>2]|0))break a;else l=i+l|0}if((d|0)==25)return a|0}while(0);if((c[q>>2]|0)<=2){q=a;return q|0}l=b+1032|0;g=b+780|0;k=2;do{i=k+-2|0;h=l+(i<<2)|0;f=c[h>>2]|0;d=c[p+836+(f<<2)>>2]|0;i=g+(i<<2)|0;e=c[i>>2]|0;f=c[a+(f<<2)>>2]&32767;j=(c[a+(e<<2)>>2]&32767)-f|0;d=(S((j|0)>-1?j:0-j|0,(c[p+836+(k<<2)>>2]|0)-d|0)|0)/((c[p+836+(e<<2)>>2]|0)-d|0)|0;f=((j|0)<0?0-d|0:d)+f|0;d=(c[o>>2]|0)-f|0;j=a+(k<<2)|0;e=c[j>>2]|0;if(!e)c[j>>2]=f|32768;else{do if((e|0)<(((d|0)<(f|0)?d:f)<<1|0))if(!(e&1)){d=e>>1;break}else{d=0-(e+1>>1)|0;break}else if((d|0)>(f|0)){d=e-f|0;break}else{d=~(e-d);break}while(0);c[j>>2]=d+f&32767;b=a+(c[h>>2]<<2)|0;c[b>>2]=c[b>>2]&32767;b=a+(c[i>>2]<<2)|0;c[b>>2]=c[b>>2]&32767}k=k+1|0}while((k|0)<(c[q>>2]|0));return a|0}function ee(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0.0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;v=c[b+1296>>2]|0;w=(c[(c[(c[(c[a+64>>2]|0)+4>>2]|0)+28>>2]|0)+(c[a+28>>2]<<2)>>2]|0)/2|0;if(!d){il(e|0,0,w<<2|0)|0;e=0;return e|0}t=c[v+832>>2]|0;f=S(t,c[d>>2]|0)|0;f=(f|0)<0?0:(f|0)>255?255:f;u=c[b+1284>>2]|0;if((u|0)>1){q=b+260|0;r=~w;a=0;s=1;j=0;while(1){b=c[q+(s<<2)>>2]|0;i=c[d+(b<<2)>>2]|0;if((i&32767|0)==(i|0)){o=c[v+836+(b<<2)>>2]|0;p=S(t,i)|0;p=(p|0)<0?0:(p|0)>255?255:p;b=p-f|0;k=o-j|0;l=(b|0)/(k|0)|0;m=b>>31|1;n=S(l,k)|0;n=((b|0)>-1?b:0-b|0)-((n|0)>-1?n:0-n|0)|0;b=(w|0)>(o|0)?o:w;if((b|0)>(j|0)){i=e+(j<<2)|0;g[i>>2]=+g[57792+(f<<2)>>2]*+g[i>>2]}a=j+1|0;if((a|0)<(b|0)){j=~o;j=~((j|0)>(r|0)?j:r);b=0;while(1){b=b+n|0;i=(b|0)<(k|0);f=f+l+(i?0:m)|0;x=e+(a<<2)|0;g[x>>2]=+g[57792+(f<<2)>>2]*+g[x>>2];a=a+1|0;if((a|0)==(j|0)){a=o;b=o;f=p;break}else b=b-(i?0:k)|0}}else{a=o;b=o;f=p}}else b=j;s=s+1|0;if((s|0)>=(u|0))break;else j=b}}else a=0;if((a|0)>=(w|0)){x=1;return x|0}h=+g[57792+(f<<2)>>2];do{x=e+(a<<2)|0;g[x>>2]=h*+g[x>>2];a=a+1|0}while((a|0)!=(w|0));a=1;return a|0}function fe(a,b){a=a|0;b=b|0;return (c[c[a>>2]>>2]|0)-(c[c[b>>2]>>2]|0)|0}
function Mi(b,d,f){b=b|0;d=d|0;f=f|0;var h=0,i=0,j=0,k=0;k=l;l=l+32|0;j=k+8|0;do if(jj(d,k,4,1)|0?jj(d,j,16,1)|0:0){h=c[j+12>>2]|0;if((h|0)>1){a[f>>0]=1;h=0;break}if((h|0)>=0){if(Ei(b,1)|0?(i=c[b+28>>2]|0,c[i+24>>2]=2,of(c[i+36>>2]|0,d,f)|0):0){c[b+24>>2]=3;c[i+16>>2]=c[j+4>>2];h=e[j+2>>1]|0;c[i>>2]=h;c[i+12>>2]=c[j+8>>2];c[b+40>>2]=h;g[b+36>>2]=0.0;h=1;break}vi(b);h=0}else h=0}else h=0;while(0);l=k;return h|0}function Ni(c,d,e){c=c|0;d=d|0;e=e|0;var f=0.0,h=0,i=0;i=l;l=l+16|0;h=i+4|0;do if(jj(d,i,4,1)|0?jj(d,h,12,1)|0:0){if(b[h+2>>1]|0){a[e>>0]=1;d=0;break}if(Ji(c,d,e)|0){f=+g[h+4>>2];d=c+36|0;if(f!=1.0){g[d>>2]=f;d=1;break}else{g[d>>2]=0.0;d=1;break}}else d=0}else d=0;while(0);l=i;return d|0}function Oi(b,d,f){b=b|0;d=d|0;f=f|0;var h=0,i=0,j=0,k=0;k=l;l=l+16|0;i=k+4|0;do if(jj(d,k,4,1)|0?jj(d,i,12,1)|0:0){j=i+4|0;if((c[j>>2]|0)>>>0>7){a[f>>0]=1;h=0;break}if(Ei(b,1)|0?(h=c[b+28>>2]|0,c[h+24>>2]=4,Kf(c[h+32>>2]|0,d)|0):0){c[h+16>>2]=c[j>>2];j=e[i+2>>1]|0;c[h>>2]=j;c[h+12>>2]=c[i+8>>2];c[b+40>>2]=j;g[b+36>>2]=0.0;c[b+24>>2]=4;h=1;break}vi(b);h=0}else h=0;while(0);l=k;return h|0}function Pi(a){a=a|0;c[a>>2]=0;c[a+8>>2]=44100;c[a+4>>2]=2;c[a+12>>2]=16;return}function Qi(a){a=a|0;var b=0;b=c[a>>2]|0;if(b|0){wf(b);wk(b)}c[a>>2]=0;return}function Ri(a){a=a|0;var b=0;b=vk(84)|0;vf(b);if(zf(b)|0){c[a>>2]=b;b=1}else{qk(b);b=0}return b|0}function Si(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;a:do if((b+-1|0)>>>0<2){b:do if((d|0)>=22050)if((d|0)<44100)switch(d|0){case 22050:break b;default:{e=0;break a}}else switch(d|0){case 44100:break b;default:{e=0;break a}}else switch(d|0){case 11025:break;default:{e=0;break a}}while(0);switch(e|0){case 16:case 8:break;default:{e=0;break a}}c[a+4>>2]=b;c[a+12>>2]=e;c[a+8>>2]=d;e=1}else e=0;while(0);return e|0}function Ti(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;g=c[a>>2]|0;h=vk(12)|0;kf(h);if(of(h,b,0)|0?(f=Bf(g,h,c[a+4>>2]|0,c[a+8>>2]|0,c[a+12>>2]|0)|0,(f|0)!=0):0){c[e>>2]=dg(f)|0;c[d>>2]=Sf(f)|0;g=1}else{g=0;f=0}lf(h);wk(h);if(f|0){Rf(f);wk(f)}return g|0}function Ui(b){b=b|0;a[b>>0]=0;a[b+1>>0]=0;c[b+4>>2]=0;return}function Vi(b){b=b|0;var d=0;a[b>>0]=0;d=b+4|0;b=c[d>>2]|0;if(b|0){ch(b);wk(b);c[d>>2]=0}return}function Wi(b){b=b|0;var d=0;do if(!(a[b>>0]|0)){d=vk(164)|0;bh(d);if(eh(d,0)|0){jh(d,2,44100,16);Hh(d,1);a[b>>0]=1;c[b+4>>2]=d;d=1;break}else{ch(d);wk(d);d=0;break}}else d=0;while(0);return d|0}function Xi(b,d){b=b|0;d=d|0;var e=0,f=0;if((((a[b>>0]|0)!=0?(e=c[b+4>>2]|0,f=zh(e,d,50)|0,(f|0)!=0):0)?(ij(d,0,0)|0,b=e+160|0,mg(c[b>>2]|0),qg(c[b>>2]|0,f)|0):0)?Ah(e,d,1)|0:0)e=fh(e)|0;else e=0;return e|0}function Yi(b,d,e){b=b|0;d=d|0;e=+e;var f=0,g=0,h=0;h=l;l=l+32|0;g=h;if(!(a[b>>0]|0))f=0;else{f=b+1|0;a[f>>0]=0;b=c[b+4>>2]|0;c[g>>2]=0;c[g+4>>2]=0;c[g+8>>2]=0;c[g+12>>2]=0;c[g+12>>2]=d;d=b+156|0;c[g+4>>2]=Sg(c[d>>2]|0)|0;c[g+8>>2]=Qg(c[d>>2]|0)|0;c[g+16>>2]=~~(e*1.0e3);if(Ih(b,g)|0){a[f>>0]=1;f=1}else f=0}l=h;return f|0}function Zi(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;if(!(a[b>>0]|0))f=0;else{jh(c[b+4>>2]|0,d,e,f);f=1}return f|0}function _i(b){b=b|0;if(!(a[b>>0]|0))b=0;else b=Ph(c[(c[b+4>>2]|0)+152>>2]|0)|0;return b|0}function $i(b){b=b|0;if(!(a[b>>0]|0))b=0;else b=Nh(c[(c[b+4>>2]|0)+152>>2]|0)|0;return b|0}function aj(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;if(a[b>>0]|0){b=(c[b+4>>2]|0)+156|0;Mg(c[b>>2]|0,d,e,f);if(!g)b=1;else{c[g>>2]=Sg(c[b>>2]|0)|0;b=1}}else b=0;return b|0}function bj(b){b=b|0;if(!(a[b>>0]|0))b=0;else b=Qg(c[(c[b+4>>2]|0)+156>>2]|0)|0;return b|0}function cj(b){b=b|0;if(!(a[b>>0]|0))b=0;else b=Sg(c[(c[b+4>>2]|0)+156>>2]|0)|0;return b|0}function dj(b,d,e){b=b|0;d=d|0;e=e|0;if(!(a[b>>0]|0))e=0;else{e=Jh(c[b+4>>2]|0,d,e)|0;a[b+1>>0]=e&1}return e|0}function ej(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;return Kh(a,b,c,d)|0}function fj(b){b=b|0;c[b>>2]=0;c[b+8>>2]=0;a[b+4>>0]=0;c[b+12>>2]=0;return}function gj(b){b=b|0;var d=0;if(a[b+4>>0]|0?(d=c[b>>2]|0,d|0):0)gk(d)|0;return}function hj(b,d,e){b=b|0;d=d|0;e=e|0;if((d|0)==0|(e|0)<1)e=0;else{c[b>>2]=d;c[b+8>>2]=e;a[b+4>>0]=0;c[b+12>>2]=0;e=1}return e|0}function ij(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;a:do if(a[b+4>>0]|0)if(!(jk(c[b>>2]|0,e,c[59364+(d<<2)>>2]|0)|0))g=10;else d=0;else switch(d|0){case 0:{if((e|0)<0?1:(c[b+8>>2]|0)<=(e|0)){d=0;break a}c[b+12>>2]=e;g=10;break a}case 1:{f=b+12|0;d=(c[f>>2]|0)+e|0;if((d|0)<0?1:(d|0)>=(c[b+8>>2]|0)){d=0;break a}c[f>>2]=d;g=10;break a}case 2:{d=(c[b+8>>2]|0)+e|0;if((e|0)>-1|(d|0)<0){d=0;break a}c[b+12>>2]=d;g=10;break a}default:{g=10;break a}}while(0);if((g|0)==10)d=1;return d|0}function jj(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;g=c[b>>2]|0;a:do if(!g)g=0;else{b:do if(a[b+4>>0]|0){if((ok(d,e,f,g)|0)!=(f|0)){g=0;break a}}else{i=b+12|0;h=b+8|0;j=0;while(1){if((j|0)>=(f|0))break b;g=c[i>>2]|0;if((g+e|0)>(c[h>>2]|0)){g=0;break a}ol(d+j|0,(c[b>>2]|0)+g|0,e|0)|0;c[i>>2]=(c[i>>2]|0)+e;j=j+1|0}}while(0);g=1}while(0);return g|0}function kj(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;j=l;l=l+16|0;i=j;if(!(c[b>>2]|0))f=0;else{g=0;while(1){if((g|0)>=5){h=7;break}f=i+g|0;if(!(jj(b,f,1,1)|0)){f=0;break}if((a[f>>0]|0)>=0){h=7;break}g=g+1|0}a:do if((h|0)==7){switch(g|0){case 5:{f=0;break a}case 0:{b=d[i>>0]&127;h=0;f=0;g=0;break}case 1:{g=d[i+1>>0]|0;b=g<<7|d[i>>0]&127;h=0;f=0;g=g>>>1&63;break}case 2:{k=d[i+1>>0]|0;g=d[i+2>>0]|0;b=k<<7|d[i>>0]&127;h=g>>>2&31;f=0;g=k>>>1&63|g<<6;break}case 3:{k=d[i+1>>0]|0;g=d[i+2>>0]|0;f=d[i+3>>0]|0;b=k<<7|d[i>>0]&127;h=g>>>2&31|f<<5;f=f>>>3&15;g=k>>>1&63|g<<6;break}case 4:{k=d[i+1>>0]|0;g=d[i+2>>0]|0;f=d[i+3>>0]|0;b=k<<7|d[i>>0]&127;h=g>>>2&31|f<<5;f=f>>>3&15|d[i+4>>0]<<4;g=k>>>1&63|g<<6;break}default:{b=0;h=0;f=0;g=0}}c[e>>2]=h<<16&16711680|f<<24|g<<8&65280|b&255;f=1}while(0)}l=j;return f|0}function lj(){mj(0);return}function mj(a){a=a|0;Aa(576,60381);Ja(584,60386,1,1,0);ta(592,60391,1,-128,127);ta(608,60396,1,-128,127);ta(600,60408,1,0,255);ta(616,60422,2,-32768,32767);ta(624,60428,2,0,65535);ta(632,60443,4,-2147483648,2147483647);ta(640,60447,4,0,-1);ta(648,60460,4,-2147483648,2147483647);ta(656,60465,4,0,-1);Ya(664,60479,4);Ya(672,60485,8);sb(280,60492);sb(304,60504);Oa(328,4,60537);Ra(352,60550);Ta(360,0,60566);nj(60596);oj(60633);pj(60672);qj(60703);rj(60743);sj(60772);Ta(368,4,60810);Ta(376,5,60840);nj(60879);oj(60911);pj(60944);qj(60977);rj(61011);sj(61044);Ta(384,6,61078);Ta(392,7,61109);Ta(400,7,61141);return}function nj(a){a=a|0;Ta(448,0,a|0);return}function oj(a){a=a|0;Ta(440,1,a|0);return}function pj(a){a=a|0;Ta(432,2,a|0);return}function qj(a){a=a|0;Ta(424,3,a|0);return}function rj(a){a=a|0;Ta(416,4,a|0);return}function sj(a){a=a|0;Ta(408,5,a|0);return}function tj(a){a=a|0;return fk(c[a+4>>2]|0)|0}function uj(a){a=a|0;var b=0,d=0;b=l;l=l+16|0;d=b;c[d>>2]=c[a+60>>2];a=xj(ib(6,d|0)|0)|0;l=b;return a|0}function vj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0;q=l;l=l+48|0;n=q+16|0;m=q;j=q+32|0;o=a+28|0;h=c[o>>2]|0;c[j>>2]=h;p=a+20|0;h=(c[p>>2]|0)-h|0;c[j+4>>2]=h;c[j+8>>2]=b;c[j+12>>2]=d;i=a+60|0;k=a+44|0;f=2;b=h+d|0;while(1){if(!(c[16216]|0)){c[n>>2]=c[i>>2];c[n+4>>2]=j;c[n+8>>2]=f;g=xj(ub(146,n|0)|0)|0}else{jb(15,a|0);c[m>>2]=c[i>>2];c[m+4>>2]=j;c[m+8>>2]=f;g=xj(ub(146,m|0)|0)|0;oa(0)}if((b|0)==(g|0)){b=6;break}if((g|0)<0){b=8;break}b=b-g|0;e=c[j+4>>2]|0;if(g>>>0<=e>>>0)if((f|0)==2){c[o>>2]=(c[o>>2]|0)+g;h=e;e=j;f=2}else{h=e;e=j}else{h=c[k>>2]|0;c[o>>2]=h;c[p>>2]=h;h=c[j+12>>2]|0;g=g-e|0;e=j+8|0;f=f+-1|0}c[e>>2]=(c[e>>2]|0)+g;c[e+4>>2]=h-g;j=e}if((b|0)==6){n=c[k>>2]|0;c[a+16>>2]=n+(c[a+48>>2]|0);a=n;c[o>>2]=a;c[p>>2]=a}else if((b|0)==8){c[a+16>>2]=0;c[o>>2]=0;c[p>>2]=0;c[a>>2]=c[a>>2]|32;if((f|0)==2)d=0;else d=d-(c[j+4>>2]|0)|0}l=q;return d|0}function wj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;f=l;l=l+32|0;g=f;e=f+20|0;c[g>>2]=c[a+60>>2];c[g+4>>2]=0;c[g+8>>2]=b;c[g+12>>2]=e;c[g+16>>2]=d;if((xj(pb(140,g|0)|0)|0)<0){c[e>>2]=-1;a=-1}else a=c[e>>2]|0;l=f;return a|0}function xj(a){a=a|0;if(a>>>0>4294963200){c[(yj()|0)>>2]=0-a;a=-1}return a|0}function yj(){var a=0;if(!(c[16216]|0))a=64908;else a=c[(ul()|0)+64>>2]|0;return a|0}function zj(a){a=a|0;if(!(c[a+68>>2]|0))Aj(a);return}function Aj(a){a=a|0;return}function Bj(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;g=l;l=l+80|0;f=g;c[b+36>>2]=1;if((c[b>>2]&64|0)==0?(c[f>>2]=c[b+60>>2],c[f+4>>2]=21505,c[f+8>>2]=g+12,_a(54,f|0)|0):0)a[b+75>>0]=-1;f=vj(b,d,e)|0;l=g;return f|0}function Cj(b){b=b|0;var d=0,e=0;d=b+74|0;e=a[d>>0]|0;a[d>>0]=e+255|e;d=b+20|0;e=b+44|0;if((c[d>>2]|0)>>>0>(c[e>>2]|0)>>>0)xb[c[b+36>>2]&7](b,0,0)|0;c[b+16>>2]=0;c[b+28>>2]=0;c[d>>2]=0;d=c[b>>2]|0;if(d&20)if(!(d&4))d=-1;else{c[b>>2]=d|32;d=-1}else{d=c[e>>2]|0;c[b+8>>2]=d;c[b+4>>2]=d;d=0}return d|0}function Dj(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0;a:do if(!d)b=0;else{while(1){e=a[b>>0]|0;f=a[c>>0]|0;if(e<<24>>24!=f<<24>>24)break;d=d+-1|0;if(!d){b=0;break a}else{b=b+1|0;c=c+1|0}}b=(e&255)-(f&255)|0}while(0);return b|0}function Ej(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=l;l=l+16|0;f=e;c[f>>2]=d;d=Fj(a,b,f)|0;l=e;return d|0}function Fj(a,b,c){a=a|0;b=b|0;c=c|0;return Gj(a,2147483647,b,c)|0}function Gj(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,m=0,n=0;n=l;l=l+128|0;g=n+112|0;m=n;h=m;i=59608;j=h+112|0;do{c[h>>2]=c[i>>2];h=h+4|0;i=i+4|0}while((h|0)<(j|0));if((d+-1|0)>>>0>2147483646)if(!d){d=1;k=4}else{c[(yj()|0)>>2]=75;g=-1}else{g=b;k=4}if((k|0)==4){k=-2-g|0;k=d>>>0>k>>>0?k:d;c[m+48>>2]=k;h=m+20|0;c[h>>2]=g;c[m+44>>2]=g;g=g+k|0;d=m+16|0;c[d>>2]=g;c[m+28>>2]=g;g=Hj(m,e,f)|0;if(k){e=c[h>>2]|0;a[e+(((e|0)==(c[d>>2]|0))<<31>>31)>>0]=0}}l=n;return g|0}function Hj(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;s=l;l=l+224|0;n=s+120|0;r=s+80|0;q=s;p=s+136|0;f=r;g=f+40|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(g|0));c[n>>2]=c[e>>2];if((Ij(0,d,n,q,r)|0)<0)e=-1;else{if((c[b+76>>2]|0)>-1)o=Jj(b)|0;else o=0;e=c[b>>2]|0;m=e&32;if((a[b+74>>0]|0)<1)c[b>>2]=e&-33;h=b+48|0;if(!(c[h>>2]|0)){g=b+44|0;e=c[g>>2]|0;c[g>>2]=p;i=b+28|0;c[i>>2]=p;k=b+20|0;c[k>>2]=p;c[h>>2]=80;j=b+16|0;c[j>>2]=p+80;f=Ij(b,d,n,q,r)|0;if(e){xb[c[b+36>>2]&7](b,0,0)|0;f=(c[k>>2]|0)==0?-1:f;c[g>>2]=e;c[h>>2]=0;c[j>>2]=0;c[i>>2]=0;c[k>>2]=0}}else f=Ij(b,d,n,q,r)|0;e=c[b>>2]|0;c[b>>2]=e|m;if(o|0)Aj(b);e=(e&32|0)==0?f:-1}l=s;return e|0}function Ij(e,f,g,i,k){e=e|0;f=f|0;g=g|0;i=i|0;k=k|0;var m=0,n=0,o=0,p=0,q=0,r=0.0,s=0,t=0,u=0,v=0,w=0.0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0;ia=l;l=l+624|0;V=ia+24|0;X=ia+16|0;W=ia+588|0;Y=ia+576|0;R=ia;P=ia+536|0;ha=ia+8|0;_=ia+528|0;ga=(e|0)!=0;N=P+40|0;aa=N;P=P+39|0;U=ha+4|0;ca=W;M=0-ca|0;T=Y+12|0;Y=Y+11|0;$=T;fa=$-ca|0;da=-2-ca|0;ea=$+2|0;O=V+288|0;Q=W+9|0;ba=Q;Z=W+8|0;m=0;n=0;q=0;v=f;a:while(1){do if((m|0)>-1)if((n|0)>(2147483647-m|0)){c[(yj()|0)>>2]=75;m=-1;break}else{m=n+m|0;break}while(0);f=a[v>>0]|0;if(!(f<<24>>24)){L=243;break}else n=v;b:while(1){switch(f<<24>>24){case 37:{f=n;L=9;break b}case 0:{f=n;break b}default:{}}K=n+1|0;f=a[K>>0]|0;n=K}c:do if((L|0)==9)while(1){L=0;if((a[f+1>>0]|0)!=37)break c;n=n+1|0;f=f+2|0;if((a[f>>0]|0)==37)L=9;else break}while(0);n=n-v|0;if(ga?(c[e>>2]&32|0)==0:0)Kj(v,n,e)|0;if(n|0){v=f;continue}p=f+1|0;n=a[p>>0]|0;o=(n<<24>>24)+-48|0;if(o>>>0<10){s=(a[f+2>>0]|0)==36;p=s?f+3|0:p;n=a[p>>0]|0;t=s?o:-1;s=s?1:q}else{t=-1;s=q}f=(n<<24>>24)+-32|0;d:do if(f>>>0<32){o=0;do{if(!(1<<f&75913))break d;o=1<<(n<<24>>24)+-32|o;p=p+1|0;n=a[p>>0]|0;f=(n<<24>>24)+-32|0}while(f>>>0<32)}else o=0;while(0);do if(n<<24>>24!=42){f=(n<<24>>24)+-48|0;if(f>>>0<10){q=0;do{q=(q*10|0)+f|0;p=p+1|0;n=a[p>>0]|0;f=(n<<24>>24)+-48|0}while(f>>>0<10);if((q|0)<0){m=-1;break a}else{u=o;K=s;J=q}}else{u=o;K=s;J=0}}else{q=p+1|0;n=a[q>>0]|0;f=(n<<24>>24)+-48|0;if(f>>>0<10?(a[p+2>>0]|0)==36:0){c[k+(f<<2)>>2]=10;f=1;p=p+3|0;q=c[i+((a[q>>0]|0)+-48<<3)>>2]|0}else{if(s|0){m=-1;break a}if(!ga){u=o;K=0;p=q;J=0;break}f=(c[g>>2]|0)+(4-1)&~(4-1);K=c[f>>2]|0;c[g>>2]=f+4;f=0;p=q;q=K}J=(q|0)<0;n=a[p>>0]|0;u=J?o|8192:o;K=f;J=J?0-q|0:q}while(0);e:do if(n<<24>>24==46){f=p+1|0;n=a[f>>0]|0;if(n<<24>>24!=42){o=(n<<24>>24)+-48|0;if(o>>>0<10)n=0;else{q=0;break}while(1){n=(n*10|0)+o|0;f=f+1|0;o=(a[f>>0]|0)+-48|0;if(o>>>0>=10){q=n;break e}}}f=p+2|0;n=(a[f>>0]|0)+-48|0;if(n>>>0<10?(a[p+3>>0]|0)==36:0){c[k+(n<<2)>>2]=10;q=c[i+((a[f>>0]|0)+-48<<3)>>2]|0;f=p+4|0;break}if(K|0){m=-1;break a}if(ga){I=(c[g>>2]|0)+(4-1)&~(4-1);q=c[I>>2]|0;c[g>>2]=I+4}else q=0}else{q=-1;f=p}while(0);s=0;while(1){n=(a[f>>0]|0)+-65|0;if(n>>>0>57){m=-1;break a}I=f+1|0;n=a[61796+(s*58|0)+n>>0]|0;p=n&255;if((p+-1|0)>>>0<8){f=I;s=p}else break}if(!(n<<24>>24)){m=-1;break}o=(t|0)>-1;do if(n<<24>>24==19)if(o){m=-1;break a}else L=51;else{if(o){c[k+(t<<2)>>2]=p;G=i+(t<<3)|0;H=c[G+4>>2]|0;L=R;c[L>>2]=c[G>>2];c[L+4>>2]=H;L=51;break}if(!ga){m=0;break a}Lj(R,p,g)}while(0);if((L|0)==51?(L=0,!ga):0){n=0;q=K;v=I;continue}t=a[f>>0]|0;t=(s|0)!=0&(t&15|0)==3?t&-33:t;o=u&-65537;H=(u&8192|0)==0?u:o;f:do switch(t|0){case 110:switch((s&255)<<24>>24){case 0:{c[c[R>>2]>>2]=m;n=0;q=K;v=I;continue a}case 1:{c[c[R>>2]>>2]=m;n=0;q=K;v=I;continue a}case 2:{n=c[R>>2]|0;c[n>>2]=m;c[n+4>>2]=((m|0)<0)<<31>>31;n=0;q=K;v=I;continue a}case 3:{b[c[R>>2]>>1]=m;n=0;q=K;v=I;continue a}case 4:{a[c[R>>2]>>0]=m;n=0;q=K;v=I;continue a}case 6:{c[c[R>>2]>>2]=m;n=0;q=K;v=I;continue a}case 7:{n=c[R>>2]|0;c[n>>2]=m;c[n+4>>2]=((m|0)<0)<<31>>31;n=0;q=K;v=I;continue a}default:{n=0;q=K;v=I;continue a}}case 112:{s=H|8;q=q>>>0>8?q:8;t=120;L=63;break}case 88:case 120:{s=H;L=63;break}case 111:{n=R;f=c[n>>2]|0;n=c[n+4>>2]|0;if((f|0)==0&(n|0)==0)f=N;else{o=f;f=N;do{f=f+-1|0;a[f>>0]=o&7|48;o=nl(o|0,n|0,3)|0;n=D}while(!((o|0)==0&(n|0)==0))}if(!(H&8)){n=H;s=0;p=62276;L=76}else{s=aa-f|0;n=H;q=(q|0)>(s|0)?q:s+1|0;s=0;p=62276;L=76}break}case 105:case 100:{n=R;f=c[n>>2]|0;n=c[n+4>>2]|0;if((n|0)<0){f=gl(0,0,f|0,n|0)|0;n=D;o=R;c[o>>2]=f;c[o+4>>2]=n;o=1;p=62276;L=75;break f}if(!(H&2048)){p=H&1;o=p;p=(p|0)==0?62276:62278;L=75}else{o=1;p=62277;L=75}break}case 117:{n=R;f=c[n>>2]|0;n=c[n+4>>2]|0;o=0;p=62276;L=75;break}case 99:{a[P>>0]=c[R>>2];f=P;t=1;v=0;u=62276;n=N;break}case 109:{n=Nj(c[(yj()|0)>>2]|0)|0;L=81;break}case 115:{n=c[R>>2]|0;n=n|0?n:62286;L=81;break}case 67:{c[ha>>2]=c[R>>2];c[U>>2]=0;c[R>>2]=ha;f=ha;q=-1;L=85;break}case 83:{f=c[R>>2]|0;if(!q){Pj(e,32,J,0,H);f=0;L=96}else L=85;break}case 65:case 71:case 70:case 69:case 97:case 103:case 102:case 101:{r=+h[R>>3];c[X>>2]=0;h[j>>3]=r;if((c[j+4>>2]|0)>=0){f=H&1;if(!(H&2048)){F=f;G=(f|0)==0?62294:62299}else{F=1;G=62296}}else{F=1;G=62293;r=-r}h[j>>3]=r;E=c[j+4>>2]&2146435072;do if(E>>>0<2146435072|(E|0)==2146435072&0<0){w=+Rj(r,X)*2.0;n=w!=0.0;if(n)c[X>>2]=(c[X>>2]|0)+-1;B=t|32;if((B|0)==97){s=t&32;x=(s|0)==0?G:G+9|0;v=F|2;f=12-q|0;do if(!(q>>>0>11|(f|0)==0)){r=8.0;do{f=f+-1|0;r=r*16.0}while((f|0)!=0);if((a[x>>0]|0)==45){r=-(r+(-w-r));break}else{r=w+r-r;break}}else r=w;while(0);n=c[X>>2]|0;f=(n|0)<0?0-n|0:n;f=Mj(f,((f|0)<0)<<31>>31,T)|0;if((f|0)==(T|0)){a[Y>>0]=48;f=Y}a[f+-1>>0]=(n>>31&2)+43;u=f+-2|0;a[u>>0]=t+15;o=(q|0)<1;p=(H&8|0)==0;n=W;while(1){G=~~r;f=n+1|0;a[n>>0]=d[62260+G>>0]|s;r=(r-+(G|0))*16.0;do if((f-ca|0)==1){if(p&(o&r==0.0))break;a[f>>0]=46;f=n+2|0}while(0);if(!(r!=0.0))break;else n=f}s=u;p=(q|0)!=0&(da+f|0)<(q|0)?ea+q-s|0:fa-s+f|0;o=p+v|0;Pj(e,32,J,o,H);if(!(c[e>>2]&32))Kj(x,v,e)|0;Pj(e,48,J,o,H^65536);n=f-ca|0;if(!(c[e>>2]&32))Kj(W,n,e)|0;f=$-s|0;Pj(e,48,p-(n+f)|0,0,0);if(!(c[e>>2]&32))Kj(u,f,e)|0;Pj(e,32,J,o,H^8192);f=(o|0)<(J|0)?J:o;break}f=(q|0)<0?6:q;if(n){n=(c[X>>2]|0)+-28|0;c[X>>2]=n;r=w*268435456.0}else{n=c[X>>2]|0;r=w}E=(n|0)<0?V:O;o=E;do{C=~~r>>>0;c[o>>2]=C;o=o+4|0;r=(r-+(C>>>0))*1.0e9}while(r!=0.0);if((n|0)>0){p=E;q=o;while(1){s=(n|0)>29?29:n;n=q+-4|0;do if(n>>>0>=p>>>0){o=0;do{A=jl(c[n>>2]|0,0,s|0)|0;A=hl(A|0,D|0,o|0,0)|0;C=D;z=sl(A|0,C|0,1e9,0)|0;c[n>>2]=z;o=pl(A|0,C|0,1e9,0)|0;n=n+-4|0}while(n>>>0>=p>>>0);if(!o)break;p=p+-4|0;c[p>>2]=o}while(0);o=q;while(1){if(o>>>0<=p>>>0)break;n=o+-4|0;if(!(c[n>>2]|0))o=n;else break}n=(c[X>>2]|0)-s|0;c[X>>2]=n;if((n|0)>0)q=o;else break}}else p=E;if((n|0)<0){x=((f+25|0)/9|0)+1|0;y=(B|0)==102;do{v=0-n|0;v=(v|0)>9?9:v;do if(p>>>0<o>>>0){s=(1<<v)+-1|0;q=1e9>>>v;u=0;n=p;do{C=c[n>>2]|0;c[n>>2]=(C>>>v)+u;u=S(C&s,q)|0;n=n+4|0}while(n>>>0<o>>>0);n=(c[p>>2]|0)==0?p+4|0:p;if(!u){p=n;n=o;break}c[o>>2]=u;p=n;n=o+4|0}else{p=(c[p>>2]|0)==0?p+4|0:p;n=o}while(0);o=y?E:p;o=(n-o>>2|0)>(x|0)?o+(x<<2)|0:n;n=(c[X>>2]|0)+v|0;c[X>>2]=n}while((n|0)<0);n=p;A=o}else{n=p;A=o}C=E;do if(n>>>0<A>>>0){o=(C-n>>2)*9|0;q=c[n>>2]|0;if(q>>>0<10)break;else p=10;do{p=p*10|0;o=o+1|0}while(q>>>0>=p>>>0)}else o=0;while(0);y=(B|0)==103;z=(f|0)!=0;p=f-((B|0)!=102?o:0)+((z&y)<<31>>31)|0;if((p|0)<(((A-C>>2)*9|0)+-9|0)){q=p+9216|0;p=E+4+(((q|0)/9|0)+-1024<<2)|0;q=((q|0)%9|0)+1|0;if((q|0)<9){s=10;do{s=s*10|0;q=q+1|0}while((q|0)!=9)}else s=10;v=c[p>>2]|0;x=(v>>>0)%(s>>>0)|0;q=(p+4|0)==(A|0);do if(!(q&(x|0)==0)){w=(((v>>>0)/(s>>>0)|0)&1|0)==0?9007199254740992.0:9007199254740994.0;u=(s|0)/2|0;if(x>>>0<u>>>0)r=.5;else r=q&(x|0)==(u|0)?1.0:1.5;do if(F){if((a[G>>0]|0)!=45)break;w=-w;r=-r}while(0);q=v-x|0;c[p>>2]=q;if(!(w+r!=w))break;B=q+s|0;c[p>>2]=B;if(B>>>0>999999999){o=p;while(1){p=o+-4|0;c[o>>2]=0;if(p>>>0<n>>>0){n=n+-4|0;c[n>>2]=0}B=(c[p>>2]|0)+1|0;c[p>>2]=B;if(B>>>0>999999999)o=p;else break}}o=(C-n>>2)*9|0;s=c[n>>2]|0;if(s>>>0<10)break;else q=10;do{q=q*10|0;o=o+1|0}while(s>>>0>=q>>>0)}while(0);x=p+4|0;B=n;n=A>>>0>x>>>0?x:A}else{B=n;n=A}v=0-o|0;A=n;while(1){if(A>>>0<=B>>>0){x=0;break}n=A+-4|0;if(!(c[n>>2]|0))A=n;else{x=1;break}}do if(y){f=(z&1^1)+f|0;if((f|0)>(o|0)&(o|0)>-5){f=f+-1-o|0;t=t+-1|0}else{f=f+-1|0;t=t+-2|0}n=H&8;if(n|0)break;do if(x){n=c[A+-4>>2]|0;if(!n){p=9;break}if(!((n>>>0)%10|0)){q=10;p=0}else{p=0;break}do{q=q*10|0;p=p+1|0}while(!((n>>>0)%(q>>>0)|0|0))}else p=9;while(0);n=((A-C>>2)*9|0)+-9|0;if((t|32|0)==102){C=n-p|0;C=(C|0)<0?0:C;n=0;f=(f|0)<(C|0)?f:C;break}else{C=n+o-p|0;C=(C|0)<0?0:C;n=0;f=(f|0)<(C|0)?f:C;break}}else n=H&8;while(0);u=f|n;q=(u|0)!=0&1;s=(t|32|0)==102;if(s){t=0;o=(o|0)>0?o:0}else{p=(o|0)<0?v:o;p=Mj(p,((p|0)<0)<<31>>31,T)|0;if(($-p|0)<2)do{p=p+-1|0;a[p>>0]=48}while(($-p|0)<2);a[p+-1>>0]=(o>>31&2)+43;o=p+-2|0;a[o>>0]=t;t=o;o=$-o|0}v=F+1+f+q+o|0;Pj(e,32,J,v,H);if(!(c[e>>2]&32))Kj(G,F,e)|0;Pj(e,48,J,v,H^65536);do if(s){p=B>>>0>E>>>0?E:B;o=p;do{n=Mj(c[o>>2]|0,0,Q)|0;do if((o|0)==(p|0)){if((n|0)!=(Q|0))break;a[Z>>0]=48;n=Z}else{if(n>>>0<=W>>>0)break;il(W|0,48,n-ca|0)|0;do n=n+-1|0;while(n>>>0>W>>>0)}while(0);if(!(c[e>>2]&32))Kj(n,ba-n|0,e)|0;o=o+4|0}while(o>>>0<=E>>>0);do if(u|0){if(c[e>>2]&32|0)break;Kj(62328,1,e)|0}while(0);if((f|0)>0&o>>>0<A>>>0)while(1){n=Mj(c[o>>2]|0,0,Q)|0;if(n>>>0>W>>>0){il(W|0,48,n-ca|0)|0;do n=n+-1|0;while(n>>>0>W>>>0)}if(!(c[e>>2]&32))Kj(n,(f|0)>9?9:f,e)|0;o=o+4|0;n=f+-9|0;if(!((f|0)>9&o>>>0<A>>>0)){f=n;break}else f=n}Pj(e,48,f+9|0,9,0)}else{s=x?A:B+4|0;if((f|0)>-1){q=(n|0)==0;p=B;do{n=Mj(c[p>>2]|0,0,Q)|0;if((n|0)==(Q|0)){a[Z>>0]=48;n=Z}do if((p|0)==(B|0)){o=n+1|0;if(!(c[e>>2]&32))Kj(n,1,e)|0;if(q&(f|0)<1){n=o;break}if(c[e>>2]&32|0){n=o;break}Kj(62328,1,e)|0;n=o}else{if(n>>>0<=W>>>0)break;il(W|0,48,n+M|0)|0;do n=n+-1|0;while(n>>>0>W>>>0)}while(0);o=ba-n|0;if(!(c[e>>2]&32))Kj(n,(f|0)>(o|0)?o:f,e)|0;f=f-o|0;p=p+4|0}while(p>>>0<s>>>0&(f|0)>-1)}Pj(e,48,f+18|0,18,0);if(c[e>>2]&32|0)break;Kj(t,$-t|0,e)|0}while(0);Pj(e,32,J,v,H^8192);f=(v|0)<(J|0)?J:v}else{s=(t&32|0)!=0;q=r!=r|0.0!=0.0;n=q?0:F;p=n+3|0;Pj(e,32,J,p,o);f=c[e>>2]|0;if(!(f&32)){Kj(G,n,e)|0;f=c[e>>2]|0}if(!(f&32))Kj(q?(s?62320:62324):s?62312:62316,3,e)|0;Pj(e,32,J,p,H^8192);f=(p|0)<(J|0)?J:p}while(0);n=f;q=K;v=I;continue a}default:{f=v;o=H;t=q;v=0;u=62276;n=N}}while(0);g:do if((L|0)==63){n=R;f=c[n>>2]|0;n=c[n+4>>2]|0;p=t&32;if((f|0)==0&(n|0)==0){n=0;o=0;f=N}else{o=f;f=N;do{f=f+-1|0;a[f>>0]=d[62260+(o&15)>>0]|p;o=nl(o|0,n|0,4)|0;n=D}while(!((o|0)==0&(n|0)==0));o=R;n=c[o>>2]|0;o=c[o+4>>2]|0}p=(s&8|0)==0|(n|0)==0&(o|0)==0;n=s;s=p?0:2;p=p?62276:62276+(t>>4)|0;L=76}else if((L|0)==75){f=Mj(f,n,N)|0;n=H;s=o;L=76}else if((L|0)==81){L=0;H=Oj(n,0,q)|0;G=(H|0)==0;f=n;t=G?q:H-n|0;v=0;u=62276;n=G?n+q|0:H}else if((L|0)==85){L=0;o=0;n=0;s=f;while(1){p=c[s>>2]|0;if(!p)break;n=Qj(_,p)|0;if((n|0)<0|n>>>0>(q-o|0)>>>0)break;o=n+o|0;if(q>>>0>o>>>0)s=s+4|0;else break}if((n|0)<0){m=-1;break a}Pj(e,32,J,o,H);if(!o){f=0;L=96}else{p=0;while(1){n=c[f>>2]|0;if(!n){f=o;L=96;break g}n=Qj(_,n)|0;p=n+p|0;if((p|0)>(o|0)){f=o;L=96;break g}if(!(c[e>>2]&32))Kj(_,n,e)|0;if(p>>>0>=o>>>0){f=o;L=96;break}else f=f+4|0}}}while(0);if((L|0)==96){L=0;Pj(e,32,J,f,H^8192);n=(J|0)>(f|0)?J:f;q=K;v=I;continue}if((L|0)==76){L=0;o=(q|0)>-1?n&-65537:n;n=R;n=(c[n>>2]|0)!=0|(c[n+4>>2]|0)!=0;if((q|0)!=0|n){t=(n&1^1)+(aa-f)|0;t=(q|0)>(t|0)?q:t;v=s;u=p;n=N}else{f=N;t=0;v=s;u=p;n=N}}s=n-f|0;q=(t|0)<(s|0)?s:t;p=q+v|0;n=(J|0)<(p|0)?p:J;Pj(e,32,n,p,o);if(!(c[e>>2]&32))Kj(u,v,e)|0;Pj(e,48,n,p,o^65536);Pj(e,48,q,s,0);if(!(c[e>>2]&32))Kj(f,s,e)|0;Pj(e,32,n,p,o^8192);q=K;v=I}h:do if((L|0)==243)if(!e)if(!q)m=0;else{m=1;while(1){f=c[k+(m<<2)>>2]|0;if(!f)break;Lj(i+(m<<3)|0,f,g);m=m+1|0;if((m|0)>=10){m=1;break h}}while(1){if(c[k+(m<<2)>>2]|0){m=-1;break h}m=m+1|0;if((m|0)>=10){m=1;break}}}while(0);l=ia;return m|0}function Jj(a){a=a|0;return 0}function Kj(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;g=e+16|0;f=c[g>>2]|0;if(!f)if(!(Uj(e)|0)){f=c[g>>2]|0;h=5}else f=0;else h=5;a:do if((h|0)==5){i=e+20|0;g=c[i>>2]|0;h=g;if((f-g|0)>>>0<d>>>0){f=xb[c[e+36>>2]&7](e,b,d)|0;break}b:do if((a[e+75>>0]|0)>-1){f=d;while(1){if(!f){e=0;g=d;f=b;break b}g=f+-1|0;if((a[b+g>>0]|0)==10)break;else f=g}if((xb[c[e+36>>2]&7](e,b,f)|0)>>>0<f>>>0)break a;h=c[i>>2]|0;e=f;g=d-f|0;f=b+f|0}else{e=0;g=d;f=b}while(0);ol(h|0,f|0,g|0)|0;c[i>>2]=(c[i>>2]|0)+g;f=e+g|0}while(0);return f|0}function Lj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0.0;a:do if(b>>>0<=20)do switch(b|0){case 9:{e=(c[d>>2]|0)+(4-1)&~(4-1);b=c[e>>2]|0;c[d>>2]=e+4;c[a>>2]=b;break a}case 10:{e=(c[d>>2]|0)+(4-1)&~(4-1);b=c[e>>2]|0;c[d>>2]=e+4;e=a;c[e>>2]=b;c[e+4>>2]=((b|0)<0)<<31>>31;break a}case 11:{e=(c[d>>2]|0)+(4-1)&~(4-1);b=c[e>>2]|0;c[d>>2]=e+4;e=a;c[e>>2]=b;c[e+4>>2]=0;break a}case 12:{e=(c[d>>2]|0)+(8-1)&~(8-1);b=e;f=c[b>>2]|0;b=c[b+4>>2]|0;c[d>>2]=e+8;e=a;c[e>>2]=f;c[e+4>>2]=b;break a}case 13:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;e=(e&65535)<<16>>16;f=a;c[f>>2]=e;c[f+4>>2]=((e|0)<0)<<31>>31;break a}case 14:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;f=a;c[f>>2]=e&65535;c[f+4>>2]=0;break a}case 15:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;e=(e&255)<<24>>24;f=a;c[f>>2]=e;c[f+4>>2]=((e|0)<0)<<31>>31;break a}case 16:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;f=a;c[f>>2]=e&255;c[f+4>>2]=0;break a}case 17:{f=(c[d>>2]|0)+(8-1)&~(8-1);g=+h[f>>3];c[d>>2]=f+8;h[a>>3]=g;break a}case 18:{f=(c[d>>2]|0)+(8-1)&~(8-1);g=+h[f>>3];c[d>>2]=f+8;h[a>>3]=g;break a}default:break a}while(0);while(0);return}function Mj(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;if(c>>>0>0|(c|0)==0&b>>>0>4294967295)while(1){e=sl(b|0,c|0,10,0)|0;d=d+-1|0;a[d>>0]=e|48;e=b;b=pl(b|0,c|0,10,0)|0;if(!(c>>>0>9|(c|0)==9&e>>>0>4294967295))break;else c=D}if(b)while(1){d=d+-1|0;a[d>>0]=(b>>>0)%10|0|48;if(b>>>0<10)break;else b=(b>>>0)/10|0}return d|0}function Nj(b){b=b|0;var c=0,e=0;c=0;while(1){if((d[62330+c>>0]|0)==(b|0)){e=2;break}c=c+1|0;if((c|0)==87){c=87;b=62418;e=5;break}}if((e|0)==2)if(!c)c=62418;else{b=62418;e=5}if((e|0)==5)while(1){do{e=b;b=b+1|0}while((a[e>>0]|0)!=0);c=c+-1|0;if(!c){c=b;break}else e=5}return c|0}function Oj(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;h=d&255;f=(e|0)!=0;a:do if(f&(b&3|0)!=0){g=d&255;while(1){if((a[b>>0]|0)==g<<24>>24){i=6;break a}b=b+1|0;e=e+-1|0;f=(e|0)!=0;if(!(f&(b&3|0)!=0)){i=5;break}}}else i=5;while(0);if((i|0)==5)if(f)i=6;else e=0;b:do if((i|0)==6){g=d&255;if((a[b>>0]|0)!=g<<24>>24){f=S(h,16843009)|0;c:do if(e>>>0>3)while(1){h=c[b>>2]^f;if((h&-2139062144^-2139062144)&h+-16843009|0)break;b=b+4|0;e=e+-4|0;if(e>>>0<=3){i=11;break c}}else i=11;while(0);if((i|0)==11)if(!e){e=0;break}while(1){if((a[b>>0]|0)==g<<24>>24)break b;b=b+1|0;e=e+-1|0;if(!e){e=0;break}}}}while(0);return (e|0?b:0)|0}function Pj(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0;i=l;l=l+256|0;h=i;do if((d|0)>(e|0)&(f&73728|0)==0){f=d-e|0;il(h|0,b|0,(f>>>0>256?256:f)|0)|0;b=c[a>>2]|0;g=(b&32|0)==0;if(f>>>0>255){e=d-e|0;do{if(g){Kj(h,256,a)|0;b=c[a>>2]|0}f=f+-256|0;g=(b&32|0)==0}while(f>>>0>255);if(g)f=e&255;else break}else if(!g)break;Kj(h,f,a)|0}while(0);l=i;return}function Qj(a,b){a=a|0;b=b|0;if(!a)a=0;else a=Tj(a,b,0)|0;return a|0}function Rj(a,b){a=+a;b=b|0;return +(+Sj(a,b))}function Sj(a,b){a=+a;b=b|0;var d=0,e=0,f=0;h[j>>3]=a;d=c[j>>2]|0;e=c[j+4>>2]|0;f=nl(d|0,e|0,52)|0;switch(f&2047){case 0:{if(a!=0.0){a=+Sj(a*18446744073709551616.0,b);d=(c[b>>2]|0)+-64|0}else d=0;c[b>>2]=d;break}case 2047:break;default:{c[b>>2]=(f&2047)+-1022;c[j>>2]=d;c[j+4>>2]=e&-2146435073|1071644672;a=+h[j>>3]}}return +a}function Tj(b,d,e){b=b|0;d=d|0;e=e|0;do if(b){if(d>>>0<128){a[b>>0]=d;b=1;break}if(d>>>0<2048){a[b>>0]=d>>>6|192;a[b+1>>0]=d&63|128;b=2;break}if(d>>>0<55296|(d&-8192|0)==57344){a[b>>0]=d>>>12|224;a[b+1>>0]=d>>>6&63|128;a[b+2>>0]=d&63|128;b=3;break}if((d+-65536|0)>>>0<1048576){a[b>>0]=d>>>18|240;a[b+1>>0]=d>>>12&63|128;a[b+2>>0]=d>>>6&63|128;a[b+3>>0]=d&63|128;b=4;break}else{c[(yj()|0)>>2]=84;b=-1;break}}else b=1;while(0);return b|0}function Uj(b){b=b|0;var d=0,e=0;d=b+74|0;e=a[d>>0]|0;a[d>>0]=e+255|e;d=c[b>>2]|0;if(!(d&8)){c[b+8>>2]=0;c[b+4>>2]=0;d=c[b+44>>2]|0;c[b+28>>2]=d;c[b+20>>2]=d;c[b+16>>2]=d+(c[b+48>>2]|0);d=0}else{c[b>>2]=d|32;d=-1}return d|0}function Vj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=a+20|0;f=c[e>>2]|0;a=(c[a+16>>2]|0)-f|0;a=a>>>0>d>>>0?d:a;ol(f|0,b|0,a|0)|0;c[e>>2]=(c[e>>2]|0)+a;return d|0}function Wj(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0;r=l;l=l+208|0;o=r+8|0;p=r;h=S(d,b)|0;n=p;c[n>>2]=1;c[n+4>>2]=0;if(h|0){n=0-d|0;c[o+4>>2]=d;c[o>>2]=d;b=d;f=d;g=2;while(1){b=b+d+f|0;c[o+(g<<2)>>2]=b;if(b>>>0<h>>>0){m=f;f=b;g=g+1|0;b=m}else break}i=a+h+n|0;m=p+4|0;if(i>>>0>a>>>0){j=i;f=1;b=a;a=1;while(1){do if((f&3|0)==3){Xj(b,d,e,a,o);g=c[m>>2]|0;f=g<<30|(c[p>>2]|0)>>>2;c[p>>2]=f;c[m>>2]=g>>>2;g=a+2|0}else{f=a+-1|0;if((c[o+(f<<2)>>2]|0)>>>0<(j-b|0)>>>0)Xj(b,d,e,a,o);else Yj(b,d,e,p,a,0,o);if((a|0)==1){f=c[p>>2]|0;c[m>>2]=f>>>31|c[m>>2]<<1;f=f<<1;c[p>>2]=f;g=0;break}if(f>>>0>31){h=c[p>>2]|0;c[m>>2]=h;c[p>>2]=0;g=0;f=a+-33|0}else{g=c[p>>2]|0;h=c[m>>2]|0}c[m>>2]=g>>>(32-f|0)|h<<f;f=g<<f;c[p>>2]=f;g=1}while(0);f=f|1;c[p>>2]=f;b=b+d|0;if(b>>>0>=i>>>0){a=g;break}else a=g}}else{b=a;a=1}Yj(b,d,e,p,a,0,o);k=p+4|0;f=c[p>>2]|0;g=c[k>>2]|0;h=(g|0)==0;if(!((a|0)==1&(f|0)==1&h)){j=g;i=a;while(1){if((i|0)<2){a=f+-1|0;do if(a){if(!(a&1)){g=0;do{g=g+1|0;a=a>>>1}while(!(a&1|0))}else{if(h)g=32;else{if(!(j&1)){g=0;h=j}else{h=j;a=0;g=0;break}do{g=g+1|0;h=h>>>1}while(!(h&1|0))}g=g+32|0}if(g>>>0>31)q=28;else{h=j;a=g}}else{g=32;q=28}while(0);if((q|0)==28){q=0;c[p>>2]=j;c[m>>2]=0;f=j;h=0;a=g;g=g+-32|0}c[p>>2]=h<<32-g|f>>>g;c[m>>2]=h>>>g;b=b+n|0;g=a+i|0}else{a=f>>>30;g=i+-2|0;c[p>>2]=(f<<1&2147483646|a<<31)^3;c[m>>2]=(a|j<<2)>>>1;Yj(b+(0-(c[o+(g<<2)>>2]|0))+n|0,d,e,p,i+-1|0,1,o);j=c[p>>2]|0;c[m>>2]=j>>>31|c[m>>2]<<1;c[p>>2]=j<<1|1;b=b+n|0;Yj(b,d,e,p,g,1,o)}f=c[p>>2]|0;j=c[k>>2]|0;h=(j|0)==0;if((g|0)==1&(f|0)==1&h)break;else i=g}}}l=r;return}function Xj(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;o=l;l=l+240|0;n=o;c[n>>2]=a;a:do if((e|0)>1){m=0-b|0;k=a;g=a;a=1;while(1){g=g+m|0;i=e+-2|0;h=g+(0-(c[f+(i<<2)>>2]|0))|0;if((Ib[d&15](k,h)|0)>-1?(Ib[d&15](k,g)|0)>-1:0)break a;j=a+1|0;a=n+(a<<2)|0;if((Ib[d&15](h,g)|0)>-1){c[a>>2]=h;a=h;e=e+-1|0}else{c[a>>2]=g;a=g;e=i}if((e|0)<=1){a=j;break a}k=c[n>>2]|0;g=a;a=j}}else a=1;while(0);Zj(b,n,a);l=o;return}function Yj(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0;q=l;l=l+240|0;o=q;j=c[e>>2]|0;e=c[e+4>>2]|0;c[o>>2]=a;n=0-b|0;a:do if((e|0)!=0|(j|0)!=1?(i=a+(0-(c[h+(f<<2)>>2]|0))|0,(Ib[d&15](i,a)|0)>=1):0){m=1;k=e;g=(g|0)==0;while(1){if(g&(f|0)>1){e=a+n|0;g=c[h+(f+-2<<2)>>2]|0;if((Ib[d&15](e,i)|0)>-1){i=a;g=m;p=19;break a}if((Ib[d&15](e+(0-g)|0,i)|0)>-1){i=a;g=m;p=19;break a}}g=m+1|0;c[o+(m<<2)>>2]=i;a=j+-1|0;do if(a){if(!(a&1)){e=0;do{e=e+1|0;a=a>>>1}while(!(a&1|0))}else{if(!k)e=32;else{if(!(k&1)){e=0;a=k}else{a=0;e=0;break}do{e=e+1|0;a=a>>>1}while(!(a&1|0))}e=e+32|0}if(e>>>0>31){a=e;e=e+-32|0;p=15}else a=e}else{a=32;e=0;p=15}while(0);if((p|0)==15){p=0;j=k;k=0}j=k<<32-e|j>>>e;k=k>>>e;f=a+f|0;if(!((k|0)!=0|(j|0)!=1)){p=19;break a}e=i+(0-(c[h+(f<<2)>>2]|0))|0;if((Ib[d&15](e,c[o>>2]|0)|0)<1){e=g;g=0;p=18;break}else{a=i;i=e;m=g;g=1}}}else{i=a;e=1;p=18}while(0);if((p|0)==18?(g|0)==0:0){g=e;p=19}if((p|0)==19){Zj(b,o,g);Xj(i,b,d,f,h)}l=q;return}function Zj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;h=l;l=l+256|0;e=h;a:do if((d|0)>=2?(g=b+(d<<2)|0,c[g>>2]=e,a|0):0)while(1){f=a>>>0>256?256:a;ol(e|0,c[b>>2]|0,f|0)|0;e=0;do{i=b+(e<<2)|0;e=e+1|0;ol(c[i>>2]|0,c[b+(e<<2)>>2]|0,f|0)|0;c[i>>2]=(c[i>>2]|0)+f}while((e|0)!=(d|0));a=a-f|0;if(!a)break a;e=c[g>>2]|0}while(0);l=h;return}function _j(a,b){a=+a;b=b|0;var d=0;if((b|0)>1023){a=a*8988465674311579538646525.0e283;d=b+-1023|0;b=b+-2046|0;if((d|0)>1023){d=(b|0)>1023?1023:b;a=a*8988465674311579538646525.0e283}}else if((b|0)<-1022){a=a*2.2250738585072014e-308;d=b+1022|0;b=b+2044|0;if((d|0)<-1022){d=(b|0)<-1022?-1022:b;a=a*2.2250738585072014e-308}}else d=b;b=jl(d+1023|0,0,52)|0;d=D;c[j>>2]=b;c[j+4>>2]=d;return +(a*+h[j>>3])}function $j(b){b=b|0;var d=0,e=0,f=0;f=b;a:do if(!(f&3)){d=b;e=4}else{d=f;while(1){if(!(a[b>>0]|0))break a;b=b+1|0;d=b;if(!(d&3)){d=b;e=4;break}}}while(0);if((e|0)==4){while(1){b=c[d>>2]|0;if(!((b&-2139062144^-2139062144)&b+-16843009))d=d+4|0;else break}if((b&255)<<24>>24)do d=d+1|0;while((a[d>>0]|0)!=0)}return d-f|0}function ak(a,b){a=a|0;b=b|0;bk(a,b)|0;return a|0}function bk(b,d){b=b|0;d=d|0;var e=0,f=0;e=d;a:do if(!((e^b)&3)){if(!(e&3))e=d;else while(1){e=a[d>>0]|0;a[b>>0]=e;if(!(e<<24>>24))break a;d=d+1|0;b=b+1|0;if(!(d&3)){e=d;break}}d=c[e>>2]|0;if(!((d&-2139062144^-2139062144)&d+-16843009)){f=b;b=e;while(1){e=b+4|0;b=f+4|0;c[f>>2]=d;d=c[e>>2]|0;if((d&-2139062144^-2139062144)&d+-16843009|0){d=e;break}else{f=b;b=e}}}else d=e;f=8}else f=8;while(0);if((f|0)==8){f=a[d>>0]|0;a[b>>0]=f;if(f<<24>>24)do{d=d+1|0;b=b+1|0;f=a[d>>0]|0;a[b>>0]=f}while(f<<24>>24!=0)}return b|0}function ck(a,b){a=+a;b=b|0;return +(+_j(a,b))}function dk(a){a=+a;var b=0,d=0;h[j>>3]=a;b=c[j+4>>2]|0;d=b&2146435072;if(!(d>>>0>1126170624|(d|0)==1126170624&0>0)){b=(b|0)<0;a=b?a+-4503599627370496.0+4503599627370496.0:a+4503599627370496.0+-4503599627370496.0;if(a==0.0)a=b?-0.0:0.0}return +a}function ek(a){a=+a;var b=0;b=(g[j>>2]=a,c[j>>2]|0);if((b&2130706432)>>>0<=1249902592){b=(b|0)<0;a=b?a+-8388608.0+8388608.0:a+8388608.0+-8388608.0;if(a==0.0)a=b?-0.0:0.0}return +a}function fk(a){a=a|0;var b=0,c=0;c=($j(a)|0)+1|0;b=pk(c)|0;if(!b)b=0;else ol(b|0,a|0,c|0)|0;return b|0}function gk(a){a=a|0;var b=0,d=0,e=0;e=(c[a>>2]&1|0)!=0;if(!e){hb(64892);d=c[a+52>>2]|0;b=a+56|0;if(d|0)c[d+56>>2]=c[b>>2];b=c[b>>2]|0;if(b|0)c[b+52>>2]=d;if((c[16222]|0)==(a|0))c[16222]=b;$a(64892)}d=hk(a)|0;d=Cb[c[a+12>>2]&7](a)|0|d;b=c[a+92>>2]|0;if(b|0)qk(b);if(!e)qk(a);return d|0}function hk(a){a=a|0;var b=0,d=0;do if(a){if((c[a+76>>2]|0)<=-1){b=ik(a)|0;break}d=(Jj(a)|0)==0;b=ik(a)|0;if(!d)Aj(a)}else{if(!(c[14901]|0))b=0;else b=hk(c[14901]|0)|0;hb(64892);a=c[16222]|0;if(a)do{if((c[a+76>>2]|0)>-1)d=Jj(a)|0;else d=0;if((c[a+20>>2]|0)>>>0>(c[a+28>>2]|0)>>>0)b=ik(a)|0|b;if(d|0)Aj(a);a=c[a+56>>2]|0}while((a|0)!=0);$a(64892)}while(0);return b|0}function ik(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;h=a+20|0;g=a+28|0;if((c[h>>2]|0)>>>0>(c[g>>2]|0)>>>0?(xb[c[a+36>>2]&7](a,0,0)|0,(c[h>>2]|0)==0):0)b=-1;else{f=a+4|0;b=c[f>>2]|0;e=a+8|0;d=c[e>>2]|0;if(b>>>0<d>>>0)xb[c[a+40>>2]&7](a,b-d|0,1)|0;c[a+16>>2]=0;c[g>>2]=0;c[h>>2]=0;c[e>>2]=0;c[f>>2]=0;b=0}return b|0}function jk(a,b,c){a=a|0;b=b|0;c=c|0;return kk(a,b,c)|0}function kk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;if((c[a+76>>2]|0)>-1){e=(Jj(a)|0)==0;b=lk(a,b,d)|0;if(!e)Aj(a)}else b=lk(a,b,d)|0;return b|0}function lk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;if((d|0)==1)b=b-(c[a+8>>2]|0)+(c[a+4>>2]|0)|0;f=a+20|0;e=a+28|0;if((c[f>>2]|0)>>>0>(c[e>>2]|0)>>>0?(xb[c[a+36>>2]&7](a,0,0)|0,(c[f>>2]|0)==0):0)b=-1;else{c[a+16>>2]=0;c[e>>2]=0;c[f>>2]=0;if((xb[c[a+40>>2]&7](a,b,d)|0)<0)b=-1;else{c[a+8>>2]=0;c[a+4>>2]=0;c[a>>2]=c[a>>2]&-17;b=0}}return b|0}function mk(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;m=l;l=l+16|0;j=m;k=e&255;a[j>>0]=k;h=b+16|0;g=c[h>>2]|0;if(!g)if(!(Uj(b)|0)){g=c[h>>2]|0;i=4}else f=-1;else i=4;do if((i|0)==4){i=b+20|0;h=c[i>>2]|0;if(h>>>0<g>>>0?(f=e&255,(f|0)!=(a[b+75>>0]|0)):0){c[i>>2]=h+1;a[h>>0]=k;break}if((xb[c[b+36>>2]&7](b,j,1)|0)==1)f=d[j>>0]|0;else f=-1}while(0);l=m;return f|0}function nk(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;if((c[d+76>>2]|0)>=0?(Jj(d)|0)!=0:0){if((a[d+75>>0]|0)!=(b|0)?(h=d+20|0,f=c[h>>2]|0,f>>>0<(c[d+16>>2]|0)>>>0):0){c[h>>2]=f+1;a[f>>0]=b;e=b&255}else e=mk(d,b)|0;Aj(d)}else i=3;do if((i|0)==3){if((a[d+75>>0]|0)!=(b|0)?(g=d+20|0,e=c[g>>2]|0,e>>>0<(c[d+16>>2]|0)>>>0):0){c[g>>2]=e+1;a[e>>0]=b;e=b&255;break}e=mk(d,b)|0}while(0);return e|0}function ok(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0;k=S(e,d)|0;if((c[f+76>>2]|0)>-1)j=Jj(f)|0;else j=0;h=f+74|0;g=a[h>>0]|0;a[h>>0]=g+255|g;h=f+4|0;g=c[h>>2]|0;i=(c[f+8>>2]|0)-g|0;if((i|0)>0){i=i>>>0<k>>>0?i:k;ol(b|0,g|0,i|0)|0;c[h>>2]=g+i;b=b+i|0;g=k-i|0}else g=k;a:do if(!g)l=13;else{i=f+32|0;while(1){if(Cj(f)|0)break;h=xb[c[i>>2]&7](f,b,g)|0;if((h+1|0)>>>0<2)break;g=g-h|0;if(!g){l=13;break a}else b=b+h|0}if(j|0)Aj(f);e=((k-g|0)>>>0)/(d>>>0)|0}while(0);if((l|0)==13)if(j)Aj(f);return e|0}function pk(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;L=l;l=l+16|0;p=L;do if(a>>>0<245){o=a>>>0<11?16:a+11&-8;a=o>>>3;t=c[16228]|0;d=t>>>a;if(d&3|0){f=(d&1^1)+a|0;g=64952+(f<<1<<2)|0;a=g+8|0;d=c[a>>2]|0;h=d+8|0;e=c[h>>2]|0;do if((g|0)!=(e|0)){if(e>>>0<(c[16232]|0)>>>0)wa();b=e+12|0;if((c[b>>2]|0)==(d|0)){c[b>>2]=g;c[a>>2]=e;break}else wa()}else c[16228]=t&~(1<<f);while(0);K=f<<3;c[d+4>>2]=K|3;K=d+K+4|0;c[K>>2]=c[K>>2]|1;K=h;l=L;return K|0}s=c[16230]|0;if(o>>>0>s>>>0){if(d|0){e=2<<a;e=d<<a&(e|0-e);e=(e&0-e)+-1|0;i=e>>>12&16;e=e>>>i;b=e>>>5&8;e=e>>>b;g=e>>>2&4;e=e>>>g;a=e>>>1&2;e=e>>>a;d=e>>>1&1;d=(b|i|g|a|d)+(e>>>d)|0;e=64952+(d<<1<<2)|0;a=e+8|0;g=c[a>>2]|0;i=g+8|0;b=c[i>>2]|0;do if((e|0)!=(b|0)){if(b>>>0<(c[16232]|0)>>>0)wa();f=b+12|0;if((c[f>>2]|0)==(g|0)){c[f>>2]=e;c[a>>2]=b;j=t;break}else wa()}else{j=t&~(1<<d);c[16228]=j}while(0);h=(d<<3)-o|0;c[g+4>>2]=o|3;f=g+o|0;c[f+4>>2]=h|1;c[f+h>>2]=h;if(s|0){e=c[16233]|0;b=s>>>3;d=64952+(b<<1<<2)|0;b=1<<b;if(j&b){b=d+8|0;a=c[b>>2]|0;if(a>>>0<(c[16232]|0)>>>0)wa();else{k=b;m=a}}else{c[16228]=j|b;k=d+8|0;m=d}c[k>>2]=e;c[m+12>>2]=e;c[e+8>>2]=m;c[e+12>>2]=d}c[16230]=h;c[16233]=f;K=i;l=L;return K|0}k=c[16229]|0;if(k){i=(k&0-k)+-1|0;J=i>>>12&16;i=i>>>J;I=i>>>5&8;i=i>>>I;K=i>>>2&4;i=i>>>K;a=i>>>1&2;i=i>>>a;j=i>>>1&1;j=c[65216+((I|J|K|a|j)+(i>>>j)<<2)>>2]|0;i=(c[j+4>>2]&-8)-o|0;a=j;while(1){b=c[a+16>>2]|0;if(!b){b=c[a+20>>2]|0;if(!b)break}a=(c[b+4>>2]&-8)-o|0;K=a>>>0<i>>>0;i=K?a:i;a=b;j=K?b:j}f=c[16232]|0;if(j>>>0<f>>>0)wa();h=j+o|0;if(j>>>0>=h>>>0)wa();g=c[j+24>>2]|0;d=c[j+12>>2]|0;do if((d|0)==(j|0)){a=j+20|0;b=c[a>>2]|0;if(!b){a=j+16|0;b=c[a>>2]|0;if(!b){n=0;break}}while(1){e=b+20|0;d=c[e>>2]|0;if(d|0){b=d;a=e;continue}e=b+16|0;d=c[e>>2]|0;if(!d)break;else{b=d;a=e}}if(a>>>0<f>>>0)wa();else{c[a>>2]=0;n=b;break}}else{e=c[j+8>>2]|0;if(e>>>0<f>>>0)wa();b=e+12|0;if((c[b>>2]|0)!=(j|0))wa();a=d+8|0;if((c[a>>2]|0)==(j|0)){c[b>>2]=d;c[a>>2]=e;n=d;break}else wa()}while(0);do if(g|0){b=c[j+28>>2]|0;a=65216+(b<<2)|0;if((j|0)==(c[a>>2]|0)){c[a>>2]=n;if(!n){c[16229]=k&~(1<<b);break}}else{if(g>>>0<(c[16232]|0)>>>0)wa();b=g+16|0;if((c[b>>2]|0)==(j|0))c[b>>2]=n;else c[g+20>>2]=n;if(!n)break}a=c[16232]|0;if(n>>>0<a>>>0)wa();c[n+24>>2]=g;b=c[j+16>>2]|0;do if(b|0)if(b>>>0<a>>>0)wa();else{c[n+16>>2]=b;c[b+24>>2]=n;break}while(0);b=c[j+20>>2]|0;if(b|0)if(b>>>0<(c[16232]|0)>>>0)wa();else{c[n+20>>2]=b;c[b+24>>2]=n;break}}while(0);if(i>>>0<16){K=i+o|0;c[j+4>>2]=K|3;K=j+K+4|0;c[K>>2]=c[K>>2]|1}else{c[j+4>>2]=o|3;c[h+4>>2]=i|1;c[h+i>>2]=i;if(s|0){e=c[16233]|0;b=s>>>3;d=64952+(b<<1<<2)|0;b=1<<b;if(t&b){b=d+8|0;a=c[b>>2]|0;if(a>>>0<(c[16232]|0)>>>0)wa();else{q=b;r=a}}else{c[16228]=t|b;q=d+8|0;r=d}c[q>>2]=e;c[r+12>>2]=e;c[e+8>>2]=r;c[e+12>>2]=d}c[16230]=i;c[16233]=h}K=j+8|0;l=L;return K|0}}}else if(a>>>0<=4294967231){a=a+11|0;o=a&-8;k=c[16229]|0;if(k){d=0-o|0;a=a>>>8;if(a)if(o>>>0>16777215)j=31;else{r=(a+1048320|0)>>>16&8;D=a<<r;q=(D+520192|0)>>>16&4;D=D<<q;j=(D+245760|0)>>>16&2;j=14-(q|r|j)+(D<<j>>>15)|0;j=o>>>(j+7|0)&1|j<<1}else j=0;e=c[65216+(j<<2)>>2]|0;a:do if(!e){a=0;e=0;D=86}else{a=0;h=o<<((j|0)==31?0:25-(j>>>1)|0);i=e;e=0;while(1){f=(c[i+4>>2]&-8)-o|0;if(f>>>0<d>>>0)if(!f){d=0;a=i;e=i;D=90;break a}else{d=f;e=i}f=c[i+20>>2]|0;i=c[i+16+(h>>>31<<2)>>2]|0;a=(f|0)==0|(f|0)==(i|0)?a:f;f=(i|0)==0;if(f){D=86;break}else h=h<<(f&1^1)}}while(0);if((D|0)==86){if((a|0)==0&(e|0)==0){a=2<<j;a=k&(a|0-a);if(!a)break;r=(a&0-a)+-1|0;m=r>>>12&16;r=r>>>m;j=r>>>5&8;r=r>>>j;n=r>>>2&4;r=r>>>n;q=r>>>1&2;r=r>>>q;a=r>>>1&1;a=c[65216+((j|m|n|q|a)+(r>>>a)<<2)>>2]|0}if(!a){i=d;j=e}else D=90}if((D|0)==90)while(1){D=0;r=(c[a+4>>2]&-8)-o|0;f=r>>>0<d>>>0;d=f?r:d;e=f?a:e;f=c[a+16>>2]|0;if(f|0){a=f;D=90;continue}a=c[a+20>>2]|0;if(!a){i=d;j=e;break}else D=90}if((j|0)!=0?i>>>0<((c[16230]|0)-o|0)>>>0:0){f=c[16232]|0;if(j>>>0<f>>>0)wa();h=j+o|0;if(j>>>0>=h>>>0)wa();g=c[j+24>>2]|0;d=c[j+12>>2]|0;do if((d|0)==(j|0)){a=j+20|0;b=c[a>>2]|0;if(!b){a=j+16|0;b=c[a>>2]|0;if(!b){s=0;break}}while(1){e=b+20|0;d=c[e>>2]|0;if(d|0){b=d;a=e;continue}e=b+16|0;d=c[e>>2]|0;if(!d)break;else{b=d;a=e}}if(a>>>0<f>>>0)wa();else{c[a>>2]=0;s=b;break}}else{e=c[j+8>>2]|0;if(e>>>0<f>>>0)wa();b=e+12|0;if((c[b>>2]|0)!=(j|0))wa();a=d+8|0;if((c[a>>2]|0)==(j|0)){c[b>>2]=d;c[a>>2]=e;s=d;break}else wa()}while(0);do if(g){b=c[j+28>>2]|0;a=65216+(b<<2)|0;if((j|0)==(c[a>>2]|0)){c[a>>2]=s;if(!s){t=k&~(1<<b);c[16229]=t;break}}else{if(g>>>0<(c[16232]|0)>>>0)wa();b=g+16|0;if((c[b>>2]|0)==(j|0))c[b>>2]=s;else c[g+20>>2]=s;if(!s){t=k;break}}a=c[16232]|0;if(s>>>0<a>>>0)wa();c[s+24>>2]=g;b=c[j+16>>2]|0;do if(b|0)if(b>>>0<a>>>0)wa();else{c[s+16>>2]=b;c[b+24>>2]=s;break}while(0);b=c[j+20>>2]|0;if(b)if(b>>>0<(c[16232]|0)>>>0)wa();else{c[s+20>>2]=b;c[b+24>>2]=s;t=k;break}else t=k}else t=k;while(0);do if(i>>>0>=16){c[j+4>>2]=o|3;c[h+4>>2]=i|1;c[h+i>>2]=i;b=i>>>3;if(i>>>0<256){d=64952+(b<<1<<2)|0;a=c[16228]|0;b=1<<b;if(a&b){b=d+8|0;a=c[b>>2]|0;if(a>>>0<(c[16232]|0)>>>0)wa();else{B=b;C=a}}else{c[16228]=a|b;B=d+8|0;C=d}c[B>>2]=h;c[C+12>>2]=h;c[h+8>>2]=C;c[h+12>>2]=d;break}b=i>>>8;if(b)if(i>>>0>16777215)b=31;else{J=(b+1048320|0)>>>16&8;K=b<<J;I=(K+520192|0)>>>16&4;K=K<<I;b=(K+245760|0)>>>16&2;b=14-(I|J|b)+(K<<b>>>15)|0;b=i>>>(b+7|0)&1|b<<1}else b=0;d=65216+(b<<2)|0;c[h+28>>2]=b;a=h+16|0;c[a+4>>2]=0;c[a>>2]=0;a=1<<b;if(!(t&a)){c[16229]=t|a;c[d>>2]=h;c[h+24>>2]=d;c[h+12>>2]=h;c[h+8>>2]=h;break}a=i<<((b|0)==31?0:25-(b>>>1)|0);e=c[d>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(i|0)){D=148;break}d=e+16+(a>>>31<<2)|0;b=c[d>>2]|0;if(!b){D=145;break}else{a=a<<1;e=b}}if((D|0)==145)if(d>>>0<(c[16232]|0)>>>0)wa();else{c[d>>2]=h;c[h+24>>2]=e;c[h+12>>2]=h;c[h+8>>2]=h;break}else if((D|0)==148){a=e+8|0;b=c[a>>2]|0;K=c[16232]|0;if(b>>>0>=K>>>0&e>>>0>=K>>>0){c[b+12>>2]=h;c[a>>2]=h;c[h+8>>2]=b;c[h+12>>2]=e;c[h+24>>2]=0;break}else wa()}}else{K=i+o|0;c[j+4>>2]=K|3;K=j+K+4|0;c[K>>2]=c[K>>2]|1}while(0);K=j+8|0;l=L;return K|0}}}else o=-1;while(0);d=c[16230]|0;if(d>>>0>=o>>>0){a=d-o|0;b=c[16233]|0;if(a>>>0>15){K=b+o|0;c[16233]=K;c[16230]=a;c[K+4>>2]=a|1;c[K+a>>2]=a;c[b+4>>2]=o|3}else{c[16230]=0;c[16233]=0;c[b+4>>2]=d|3;K=b+d+4|0;c[K>>2]=c[K>>2]|1}K=b+8|0;l=L;return K|0}i=c[16231]|0;if(i>>>0>o>>>0){I=i-o|0;c[16231]=I;K=c[16234]|0;J=K+o|0;c[16234]=J;c[J+4>>2]=I|1;c[K+4>>2]=o|3;K=K+8|0;l=L;return K|0}if(!(c[16346]|0)){c[16348]=4096;c[16347]=4096;c[16349]=-1;c[16350]=-1;c[16351]=0;c[16339]=0;a=p&-16^1431655768;c[p>>2]=a;c[16346]=a;a=4096}else a=c[16348]|0;j=o+48|0;m=o+47|0;h=a+m|0;e=0-a|0;k=h&e;if(k>>>0<=o>>>0){K=0;l=L;return K|0}a=c[16338]|0;if(a|0?(B=c[16336]|0,C=B+k|0,C>>>0<=B>>>0|C>>>0>a>>>0):0){K=0;l=L;return K|0}b:do if(!(c[16339]&4)){d=c[16234]|0;c:do if(d){f=65360;while(1){a=c[f>>2]|0;if(a>>>0<=d>>>0?(w=f+4|0,(a+(c[w>>2]|0)|0)>>>0>d>>>0):0)break;a=c[f+8>>2]|0;if(!a){D=172;break c}else f=a}d=h-i&e;if(d>>>0<2147483647){a=ql(d|0)|0;if((a|0)==((c[f>>2]|0)+(c[w>>2]|0)|0)){if((a|0)!=(-1|0)){h=a;g=d;D=190;break b}}else{b=d;D=180}}}else D=172;while(0);do if(((D|0)==172?(x=ql(0)|0,(x|0)!=(-1|0)):0)?(b=x,u=c[16347]|0,v=u+-1|0,b=((v&b|0)==0?0:(v+b&0-u)-b|0)+k|0,u=c[16336]|0,v=b+u|0,b>>>0>o>>>0&b>>>0<2147483647):0){C=c[16338]|0;if(C|0?v>>>0<=u>>>0|v>>>0>C>>>0:0)break;a=ql(b|0)|0;if((a|0)==(x|0)){h=x;g=b;D=190;break b}else D=180}while(0);d:do if((D|0)==180){d=0-b|0;do if(j>>>0>b>>>0&(b>>>0<2147483647&(a|0)!=(-1|0))?(y=c[16348]|0,y=m-b+y&0-y,y>>>0<2147483647):0)if((ql(y|0)|0)==(-1|0)){ql(d|0)|0;break d}else{b=y+b|0;break}while(0);if((a|0)!=(-1|0)){h=a;g=b;D=190;break b}}while(0);c[16339]=c[16339]|4;D=187}else D=187;while(0);if((((D|0)==187?k>>>0<2147483647:0)?(z=ql(k|0)|0,A=ql(0)|0,z>>>0<A>>>0&((z|0)!=(-1|0)&(A|0)!=(-1|0))):0)?(g=A-z|0,g>>>0>(o+40|0)>>>0):0){h=z;D=190}if((D|0)==190){b=(c[16336]|0)+g|0;c[16336]=b;if(b>>>0>(c[16337]|0)>>>0)c[16337]=b;k=c[16234]|0;do if(k){f=65360;while(1){b=c[f>>2]|0;e=f+4|0;a=c[e>>2]|0;if((h|0)==(b+a|0)){D=200;break}d=c[f+8>>2]|0;if(!d)break;else f=d}if(((D|0)==200?(c[f+12>>2]&8|0)==0:0)?k>>>0<h>>>0&k>>>0>=b>>>0:0){c[e>>2]=a+g;K=k+8|0;K=(K&7|0)==0?0:0-K&7;J=k+K|0;K=g-K+(c[16231]|0)|0;c[16234]=J;c[16231]=K;c[J+4>>2]=K|1;c[J+K+4>>2]=40;c[16235]=c[16350];break}b=c[16232]|0;if(h>>>0<b>>>0){c[16232]=h;i=h}else i=b;a=h+g|0;b=65360;while(1){if((c[b>>2]|0)==(a|0)){D=208;break}b=c[b+8>>2]|0;if(!b){a=65360;break}}if((D|0)==208)if(!(c[b+12>>2]&8)){c[b>>2]=h;n=b+4|0;c[n>>2]=(c[n>>2]|0)+g;n=h+8|0;n=h+((n&7|0)==0?0:0-n&7)|0;b=a+8|0;b=a+((b&7|0)==0?0:0-b&7)|0;m=n+o|0;j=b-n-o|0;c[n+4>>2]=o|3;do if((b|0)!=(k|0)){if((b|0)==(c[16233]|0)){K=(c[16230]|0)+j|0;c[16230]=K;c[16233]=m;c[m+4>>2]=K|1;c[m+K>>2]=K;break}a=c[b+4>>2]|0;if((a&3|0)==1){h=a&-8;f=a>>>3;e:do if(a>>>0>=256){g=c[b+24>>2]|0;e=c[b+12>>2]|0;do if((e|0)==(b|0)){e=b+16|0;d=e+4|0;a=c[d>>2]|0;if(!a){a=c[e>>2]|0;if(!a){I=0;break}else f=e}else f=d;while(1){e=a+20|0;d=c[e>>2]|0;if(d|0){a=d;f=e;continue}e=a+16|0;d=c[e>>2]|0;if(!d)break;else{a=d;f=e}}if(f>>>0<i>>>0)wa();else{c[f>>2]=0;I=a;break}}else{f=c[b+8>>2]|0;if(f>>>0<i>>>0)wa();a=f+12|0;if((c[a>>2]|0)!=(b|0))wa();d=e+8|0;if((c[d>>2]|0)==(b|0)){c[a>>2]=e;c[d>>2]=f;I=e;break}else wa()}while(0);if(!g)break;a=c[b+28>>2]|0;d=65216+(a<<2)|0;do if((b|0)!=(c[d>>2]|0)){if(g>>>0<(c[16232]|0)>>>0)wa();a=g+16|0;if((c[a>>2]|0)==(b|0))c[a>>2]=I;else c[g+20>>2]=I;if(!I)break e}else{c[d>>2]=I;if(I|0)break;c[16229]=c[16229]&~(1<<a);break e}while(0);e=c[16232]|0;if(I>>>0<e>>>0)wa();c[I+24>>2]=g;d=b+16|0;a=c[d>>2]|0;do if(a|0)if(a>>>0<e>>>0)wa();else{c[I+16>>2]=a;c[a+24>>2]=I;break}while(0);a=c[d+4>>2]|0;if(!a)break;if(a>>>0<(c[16232]|0)>>>0)wa();else{c[I+20>>2]=a;c[a+24>>2]=I;break}}else{d=c[b+8>>2]|0;e=c[b+12>>2]|0;a=64952+(f<<1<<2)|0;do if((d|0)!=(a|0)){if(d>>>0<i>>>0)wa();if((c[d+12>>2]|0)==(b|0))break;wa()}while(0);if((e|0)==(d|0)){c[16228]=c[16228]&~(1<<f);break}do if((e|0)==(a|0))F=e+8|0;else{if(e>>>0<i>>>0)wa();a=e+8|0;if((c[a>>2]|0)==(b|0)){F=a;break}wa()}while(0);c[d+12>>2]=e;c[F>>2]=d}while(0);b=b+h|0;f=h+j|0}else f=j;b=b+4|0;c[b>>2]=c[b>>2]&-2;c[m+4>>2]=f|1;c[m+f>>2]=f;b=f>>>3;if(f>>>0<256){d=64952+(b<<1<<2)|0;a=c[16228]|0;b=1<<b;do if(!(a&b)){c[16228]=a|b;J=d+8|0;K=d}else{b=d+8|0;a=c[b>>2]|0;if(a>>>0>=(c[16232]|0)>>>0){J=b;K=a;break}wa()}while(0);c[J>>2]=m;c[K+12>>2]=m;c[m+8>>2]=K;c[m+12>>2]=d;break}b=f>>>8;do if(!b)a=0;else{if(f>>>0>16777215){a=31;break}J=(b+1048320|0)>>>16&8;K=b<<J;I=(K+520192|0)>>>16&4;K=K<<I;a=(K+245760|0)>>>16&2;a=14-(I|J|a)+(K<<a>>>15)|0;a=f>>>(a+7|0)&1|a<<1}while(0);e=65216+(a<<2)|0;c[m+28>>2]=a;b=m+16|0;c[b+4>>2]=0;c[b>>2]=0;b=c[16229]|0;d=1<<a;if(!(b&d)){c[16229]=b|d;c[e>>2]=m;c[m+24>>2]=e;c[m+12>>2]=m;c[m+8>>2]=m;break}a=f<<((a|0)==31?0:25-(a>>>1)|0);e=c[e>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(f|0)){D=278;break}d=e+16+(a>>>31<<2)|0;b=c[d>>2]|0;if(!b){D=275;break}else{a=a<<1;e=b}}if((D|0)==275)if(d>>>0<(c[16232]|0)>>>0)wa();else{c[d>>2]=m;c[m+24>>2]=e;c[m+12>>2]=m;c[m+8>>2]=m;break}else if((D|0)==278){a=e+8|0;b=c[a>>2]|0;K=c[16232]|0;if(b>>>0>=K>>>0&e>>>0>=K>>>0){c[b+12>>2]=m;c[a>>2]=m;c[m+8>>2]=b;c[m+12>>2]=e;c[m+24>>2]=0;break}else wa()}}else{K=(c[16231]|0)+j|0;c[16231]=K;c[16234]=m;c[m+4>>2]=K|1}while(0);K=n+8|0;l=L;return K|0}else a=65360;while(1){b=c[a>>2]|0;if(b>>>0<=k>>>0?(E=b+(c[a+4>>2]|0)|0,E>>>0>k>>>0):0)break;a=c[a+8>>2]|0}f=E+-47|0;a=f+8|0;a=f+((a&7|0)==0?0:0-a&7)|0;f=k+16|0;a=a>>>0<f>>>0?k:a;b=a+8|0;d=h+8|0;d=(d&7|0)==0?0:0-d&7;K=h+d|0;d=g+-40-d|0;c[16234]=K;c[16231]=d;c[K+4>>2]=d|1;c[K+d+4>>2]=40;c[16235]=c[16350];d=a+4|0;c[d>>2]=27;c[b>>2]=c[16340];c[b+4>>2]=c[16341];c[b+8>>2]=c[16342];c[b+12>>2]=c[16343];c[16340]=h;c[16341]=g;c[16343]=0;c[16342]=b;b=a+24|0;do{b=b+4|0;c[b>>2]=7}while((b+4|0)>>>0<E>>>0);if((a|0)!=(k|0)){g=a-k|0;c[d>>2]=c[d>>2]&-2;c[k+4>>2]=g|1;c[a>>2]=g;b=g>>>3;if(g>>>0<256){d=64952+(b<<1<<2)|0;a=c[16228]|0;b=1<<b;if(a&b){b=d+8|0;a=c[b>>2]|0;if(a>>>0<(c[16232]|0)>>>0)wa();else{G=b;H=a}}else{c[16228]=a|b;G=d+8|0;H=d}c[G>>2]=k;c[H+12>>2]=k;c[k+8>>2]=H;c[k+12>>2]=d;break}b=g>>>8;if(b)if(g>>>0>16777215)d=31;else{J=(b+1048320|0)>>>16&8;K=b<<J;I=(K+520192|0)>>>16&4;K=K<<I;d=(K+245760|0)>>>16&2;d=14-(I|J|d)+(K<<d>>>15)|0;d=g>>>(d+7|0)&1|d<<1}else d=0;e=65216+(d<<2)|0;c[k+28>>2]=d;c[k+20>>2]=0;c[f>>2]=0;b=c[16229]|0;a=1<<d;if(!(b&a)){c[16229]=b|a;c[e>>2]=k;c[k+24>>2]=e;c[k+12>>2]=k;c[k+8>>2]=k;break}a=g<<((d|0)==31?0:25-(d>>>1)|0);e=c[e>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(g|0)){D=304;break}d=e+16+(a>>>31<<2)|0;b=c[d>>2]|0;if(!b){D=301;break}else{a=a<<1;e=b}}if((D|0)==301)if(d>>>0<(c[16232]|0)>>>0)wa();else{c[d>>2]=k;c[k+24>>2]=e;c[k+12>>2]=k;c[k+8>>2]=k;break}else if((D|0)==304){a=e+8|0;b=c[a>>2]|0;K=c[16232]|0;if(b>>>0>=K>>>0&e>>>0>=K>>>0){c[b+12>>2]=k;c[a>>2]=k;c[k+8>>2]=b;c[k+12>>2]=e;c[k+24>>2]=0;break}else wa()}}}else{K=c[16232]|0;if((K|0)==0|h>>>0<K>>>0)c[16232]=h;c[16340]=h;c[16341]=g;c[16343]=0;c[16237]=c[16346];c[16236]=-1;b=0;do{K=64952+(b<<1<<2)|0;c[K+12>>2]=K;c[K+8>>2]=K;b=b+1|0}while((b|0)!=32);K=h+8|0;K=(K&7|0)==0?0:0-K&7;J=h+K|0;K=g+-40-K|0;c[16234]=J;c[16231]=K;c[J+4>>2]=K|1;c[J+K+4>>2]=40;c[16235]=c[16350]}while(0);b=c[16231]|0;if(b>>>0>o>>>0){I=b-o|0;c[16231]=I;K=c[16234]|0;J=K+o|0;c[16234]=J;c[J+4>>2]=I|1;c[K+4>>2]=o|3;K=K+8|0;l=L;return K|0}}c[(yj()|0)>>2]=12;K=0;l=L;return K|0}function qk(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;if(!a)return;d=a+-8|0;h=c[16232]|0;if(d>>>0<h>>>0)wa();a=c[a+-4>>2]|0;b=a&3;if((b|0)==1)wa();e=a&-8;n=d+e|0;do if(!(a&1)){a=c[d>>2]|0;if(!b)return;k=d+(0-a)|0;j=a+e|0;if(k>>>0<h>>>0)wa();if((k|0)==(c[16233]|0)){b=n+4|0;a=c[b>>2]|0;if((a&3|0)!=3){q=k;f=j;break}c[16230]=j;c[b>>2]=a&-2;c[k+4>>2]=j|1;c[k+j>>2]=j;return}e=a>>>3;if(a>>>0<256){b=c[k+8>>2]|0;d=c[k+12>>2]|0;a=64952+(e<<1<<2)|0;if((b|0)!=(a|0)){if(b>>>0<h>>>0)wa();if((c[b+12>>2]|0)!=(k|0))wa()}if((d|0)==(b|0)){c[16228]=c[16228]&~(1<<e);q=k;f=j;break}if((d|0)!=(a|0)){if(d>>>0<h>>>0)wa();a=d+8|0;if((c[a>>2]|0)==(k|0))g=a;else wa()}else g=d+8|0;c[b+12>>2]=d;c[g>>2]=b;q=k;f=j;break}g=c[k+24>>2]|0;d=c[k+12>>2]|0;do if((d|0)==(k|0)){d=k+16|0;b=d+4|0;a=c[b>>2]|0;if(!a){a=c[d>>2]|0;if(!a){i=0;break}else e=d}else e=b;while(1){d=a+20|0;b=c[d>>2]|0;if(b|0){a=b;e=d;continue}d=a+16|0;b=c[d>>2]|0;if(!b)break;else{a=b;e=d}}if(e>>>0<h>>>0)wa();else{c[e>>2]=0;i=a;break}}else{e=c[k+8>>2]|0;if(e>>>0<h>>>0)wa();a=e+12|0;if((c[a>>2]|0)!=(k|0))wa();b=d+8|0;if((c[b>>2]|0)==(k|0)){c[a>>2]=d;c[b>>2]=e;i=d;break}else wa()}while(0);if(g){a=c[k+28>>2]|0;b=65216+(a<<2)|0;if((k|0)==(c[b>>2]|0)){c[b>>2]=i;if(!i){c[16229]=c[16229]&~(1<<a);q=k;f=j;break}}else{if(g>>>0<(c[16232]|0)>>>0)wa();a=g+16|0;if((c[a>>2]|0)==(k|0))c[a>>2]=i;else c[g+20>>2]=i;if(!i){q=k;f=j;break}}d=c[16232]|0;if(i>>>0<d>>>0)wa();c[i+24>>2]=g;b=k+16|0;a=c[b>>2]|0;do if(a|0)if(a>>>0<d>>>0)wa();else{c[i+16>>2]=a;c[a+24>>2]=i;break}while(0);a=c[b+4>>2]|0;if(a)if(a>>>0<(c[16232]|0)>>>0)wa();else{c[i+20>>2]=a;c[a+24>>2]=i;q=k;f=j;break}else{q=k;f=j}}else{q=k;f=j}}else{q=d;f=e}while(0);if(q>>>0>=n>>>0)wa();a=n+4|0;b=c[a>>2]|0;if(!(b&1))wa();if(!(b&2)){if((n|0)==(c[16234]|0)){p=(c[16231]|0)+f|0;c[16231]=p;c[16234]=q;c[q+4>>2]=p|1;if((q|0)!=(c[16233]|0))return;c[16233]=0;c[16230]=0;return}if((n|0)==(c[16233]|0)){p=(c[16230]|0)+f|0;c[16230]=p;c[16233]=q;c[q+4>>2]=p|1;c[q+p>>2]=p;return}f=(b&-8)+f|0;e=b>>>3;do if(b>>>0>=256){g=c[n+24>>2]|0;a=c[n+12>>2]|0;do if((a|0)==(n|0)){d=n+16|0;b=d+4|0;a=c[b>>2]|0;if(!a){a=c[d>>2]|0;if(!a){m=0;break}else e=d}else e=b;while(1){d=a+20|0;b=c[d>>2]|0;if(b|0){a=b;e=d;continue}d=a+16|0;b=c[d>>2]|0;if(!b)break;else{a=b;e=d}}if(e>>>0<(c[16232]|0)>>>0)wa();else{c[e>>2]=0;m=a;break}}else{b=c[n+8>>2]|0;if(b>>>0<(c[16232]|0)>>>0)wa();d=b+12|0;if((c[d>>2]|0)!=(n|0))wa();e=a+8|0;if((c[e>>2]|0)==(n|0)){c[d>>2]=a;c[e>>2]=b;m=a;break}else wa()}while(0);if(g|0){a=c[n+28>>2]|0;b=65216+(a<<2)|0;if((n|0)==(c[b>>2]|0)){c[b>>2]=m;if(!m){c[16229]=c[16229]&~(1<<a);break}}else{if(g>>>0<(c[16232]|0)>>>0)wa();a=g+16|0;if((c[a>>2]|0)==(n|0))c[a>>2]=m;else c[g+20>>2]=m;if(!m)break}d=c[16232]|0;if(m>>>0<d>>>0)wa();c[m+24>>2]=g;b=n+16|0;a=c[b>>2]|0;do if(a|0)if(a>>>0<d>>>0)wa();else{c[m+16>>2]=a;c[a+24>>2]=m;break}while(0);a=c[b+4>>2]|0;if(a|0)if(a>>>0<(c[16232]|0)>>>0)wa();else{c[m+20>>2]=a;c[a+24>>2]=m;break}}}else{b=c[n+8>>2]|0;d=c[n+12>>2]|0;a=64952+(e<<1<<2)|0;if((b|0)!=(a|0)){if(b>>>0<(c[16232]|0)>>>0)wa();if((c[b+12>>2]|0)!=(n|0))wa()}if((d|0)==(b|0)){c[16228]=c[16228]&~(1<<e);break}if((d|0)!=(a|0)){if(d>>>0<(c[16232]|0)>>>0)wa();a=d+8|0;if((c[a>>2]|0)==(n|0))l=a;else wa()}else l=d+8|0;c[b+12>>2]=d;c[l>>2]=b}while(0);c[q+4>>2]=f|1;c[q+f>>2]=f;if((q|0)==(c[16233]|0)){c[16230]=f;return}}else{c[a>>2]=b&-2;c[q+4>>2]=f|1;c[q+f>>2]=f}a=f>>>3;if(f>>>0<256){d=64952+(a<<1<<2)|0;b=c[16228]|0;a=1<<a;if(b&a){a=d+8|0;b=c[a>>2]|0;if(b>>>0<(c[16232]|0)>>>0)wa();else{o=a;p=b}}else{c[16228]=b|a;o=d+8|0;p=d}c[o>>2]=q;c[p+12>>2]=q;c[q+8>>2]=p;c[q+12>>2]=d;return}a=f>>>8;if(a)if(f>>>0>16777215)b=31;else{o=(a+1048320|0)>>>16&8;p=a<<o;n=(p+520192|0)>>>16&4;p=p<<n;b=(p+245760|0)>>>16&2;b=14-(n|o|b)+(p<<b>>>15)|0;b=f>>>(b+7|0)&1|b<<1}else b=0;e=65216+(b<<2)|0;c[q+28>>2]=b;c[q+20>>2]=0;c[q+16>>2]=0;a=c[16229]|0;d=1<<b;do if(a&d){b=f<<((b|0)==31?0:25-(b>>>1)|0);e=c[e>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(f|0)){a=130;break}d=e+16+(b>>>31<<2)|0;a=c[d>>2]|0;if(!a){a=127;break}else{b=b<<1;e=a}}if((a|0)==127)if(d>>>0<(c[16232]|0)>>>0)wa();else{c[d>>2]=q;c[q+24>>2]=e;c[q+12>>2]=q;c[q+8>>2]=q;break}else if((a|0)==130){b=e+8|0;a=c[b>>2]|0;p=c[16232]|0;if(a>>>0>=p>>>0&e>>>0>=p>>>0){c[a+12>>2]=q;c[b>>2]=q;c[q+8>>2]=a;c[q+12>>2]=e;c[q+24>>2]=0;break}else wa()}}else{c[16229]=a|d;c[e>>2]=q;c[q+24>>2]=e;c[q+12>>2]=q;c[q+8>>2]=q}while(0);q=(c[16236]|0)+-1|0;c[16236]=q;if(!q)a=65368;else return;while(1){a=c[a>>2]|0;if(!a)break;else a=a+8|0}c[16236]=-1;return}function rk(a,b){a=a|0;b=b|0;var d=0;if(a){d=S(b,a)|0;if((b|a)>>>0>65535)d=((d>>>0)/(a>>>0)|0|0)==(b|0)?d:-1}else d=0;b=pk(d)|0;if(!b)return b|0;if(!(c[b+-4>>2]&3))return b|0;il(b|0,0,d|0)|0;return b|0}function sk(a,b){a=a|0;b=b|0;var d=0,e=0;if(!a){a=pk(b)|0;return a|0}if(b>>>0>4294967231){c[(yj()|0)>>2]=12;a=0;return a|0}d=tk(a+-8|0,b>>>0<11?16:b+11&-8)|0;if(d|0){a=d+8|0;return a|0}d=pk(b)|0;if(!d){a=0;return a|0}e=c[a+-4>>2]|0;e=(e&-8)-((e&3|0)==0?8:4)|0;ol(d|0,a|0,(e>>>0<b>>>0?e:b)|0)|0;qk(a);a=d;return a|0}function tk(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;o=a+4|0;n=c[o>>2]|0;d=n&-8;k=a+d|0;i=c[16232]|0;e=n&3;if(!((e|0)!=1&a>>>0>=i>>>0&a>>>0<k>>>0))wa();f=c[k+4>>2]|0;if(!(f&1))wa();if(!e){if(b>>>0<256){a=0;return a|0}if(d>>>0>=(b+4|0)>>>0?(d-b|0)>>>0<=c[16348]<<1>>>0:0)return a|0;a=0;return a|0}if(d>>>0>=b>>>0){d=d-b|0;if(d>>>0<=15)return a|0;m=a+b|0;c[o>>2]=n&1|b|2;c[m+4>>2]=d|3;b=m+d+4|0;c[b>>2]=c[b>>2]|1;uk(m,d);return a|0}if((k|0)==(c[16234]|0)){d=(c[16231]|0)+d|0;if(d>>>0<=b>>>0){a=0;return a|0}m=d-b|0;l=a+b|0;c[o>>2]=n&1|b|2;c[l+4>>2]=m|1;c[16234]=l;c[16231]=m;return a|0}if((k|0)==(c[16233]|0)){e=(c[16230]|0)+d|0;if(e>>>0<b>>>0){a=0;return a|0}d=e-b|0;if(d>>>0>15){e=a+b|0;m=e+d|0;c[o>>2]=n&1|b|2;c[e+4>>2]=d|1;c[m>>2]=d;b=m+4|0;c[b>>2]=c[b>>2]&-2}else{c[o>>2]=n&1|e|2;e=a+e+4|0;c[e>>2]=c[e>>2]|1;e=0;d=0}c[16230]=d;c[16233]=e;return a|0}if(f&2|0){a=0;return a|0}l=(f&-8)+d|0;if(l>>>0<b>>>0){a=0;return a|0}m=l-b|0;g=f>>>3;do if(f>>>0>=256){h=c[k+24>>2]|0;f=c[k+12>>2]|0;do if((f|0)==(k|0)){f=k+16|0;e=f+4|0;d=c[e>>2]|0;if(!d){d=c[f>>2]|0;if(!d){j=0;break}else g=f}else g=e;while(1){f=d+20|0;e=c[f>>2]|0;if(e|0){d=e;g=f;continue}f=d+16|0;e=c[f>>2]|0;if(!e)break;else{d=e;g=f}}if(g>>>0<i>>>0)wa();else{c[g>>2]=0;j=d;break}}else{g=c[k+8>>2]|0;if(g>>>0<i>>>0)wa();d=g+12|0;if((c[d>>2]|0)!=(k|0))wa();e=f+8|0;if((c[e>>2]|0)==(k|0)){c[d>>2]=f;c[e>>2]=g;j=f;break}else wa()}while(0);if(h|0){d=c[k+28>>2]|0;e=65216+(d<<2)|0;if((k|0)==(c[e>>2]|0)){c[e>>2]=j;if(!j){c[16229]=c[16229]&~(1<<d);break}}else{if(h>>>0<(c[16232]|0)>>>0)wa();d=h+16|0;if((c[d>>2]|0)==(k|0))c[d>>2]=j;else c[h+20>>2]=j;if(!j)break}f=c[16232]|0;if(j>>>0<f>>>0)wa();c[j+24>>2]=h;e=k+16|0;d=c[e>>2]|0;do if(d|0)if(d>>>0<f>>>0)wa();else{c[j+16>>2]=d;c[d+24>>2]=j;break}while(0);d=c[e+4>>2]|0;if(d|0)if(d>>>0<(c[16232]|0)>>>0)wa();else{c[j+20>>2]=d;c[d+24>>2]=j;break}}}else{e=c[k+8>>2]|0;f=c[k+12>>2]|0;d=64952+(g<<1<<2)|0;if((e|0)!=(d|0)){if(e>>>0<i>>>0)wa();if((c[e+12>>2]|0)!=(k|0))wa()}if((f|0)==(e|0)){c[16228]=c[16228]&~(1<<g);break}if((f|0)!=(d|0)){if(f>>>0<i>>>0)wa();d=f+8|0;if((c[d>>2]|0)==(k|0))h=d;else wa()}else h=f+8|0;c[e+12>>2]=f;c[h>>2]=e}while(0);if(m>>>0<16){c[o>>2]=l|n&1|2;b=a+l+4|0;c[b>>2]=c[b>>2]|1;return a|0}else{l=a+b|0;c[o>>2]=n&1|b|2;c[l+4>>2]=m|3;b=l+m+4|0;c[b>>2]=c[b>>2]|1;uk(l,m);return a|0}return 0}function uk(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;o=a+b|0;d=c[a+4>>2]|0;do if(!(d&1)){e=c[a>>2]|0;if(!(d&3))return;l=a+(0-e)|0;k=e+b|0;i=c[16232]|0;if(l>>>0<i>>>0)wa();if((l|0)==(c[16233]|0)){a=o+4|0;d=c[a>>2]|0;if((d&3|0)!=3){r=l;f=k;break}c[16230]=k;c[a>>2]=d&-2;c[l+4>>2]=k|1;c[l+k>>2]=k;return}g=e>>>3;if(e>>>0<256){a=c[l+8>>2]|0;b=c[l+12>>2]|0;d=64952+(g<<1<<2)|0;if((a|0)!=(d|0)){if(a>>>0<i>>>0)wa();if((c[a+12>>2]|0)!=(l|0))wa()}if((b|0)==(a|0)){c[16228]=c[16228]&~(1<<g);r=l;f=k;break}if((b|0)!=(d|0)){if(b>>>0<i>>>0)wa();d=b+8|0;if((c[d>>2]|0)==(l|0))h=d;else wa()}else h=b+8|0;c[a+12>>2]=b;c[h>>2]=a;r=l;f=k;break}g=c[l+24>>2]|0;b=c[l+12>>2]|0;do if((b|0)==(l|0)){b=l+16|0;a=b+4|0;d=c[a>>2]|0;if(!d){d=c[b>>2]|0;if(!d){j=0;break}else e=b}else e=a;while(1){b=d+20|0;a=c[b>>2]|0;if(a|0){d=a;e=b;continue}b=d+16|0;a=c[b>>2]|0;if(!a)break;else{d=a;e=b}}if(e>>>0<i>>>0)wa();else{c[e>>2]=0;j=d;break}}else{e=c[l+8>>2]|0;if(e>>>0<i>>>0)wa();d=e+12|0;if((c[d>>2]|0)!=(l|0))wa();a=b+8|0;if((c[a>>2]|0)==(l|0)){c[d>>2]=b;c[a>>2]=e;j=b;break}else wa()}while(0);if(g){d=c[l+28>>2]|0;a=65216+(d<<2)|0;if((l|0)==(c[a>>2]|0)){c[a>>2]=j;if(!j){c[16229]=c[16229]&~(1<<d);r=l;f=k;break}}else{if(g>>>0<(c[16232]|0)>>>0)wa();d=g+16|0;if((c[d>>2]|0)==(l|0))c[d>>2]=j;else c[g+20>>2]=j;if(!j){r=l;f=k;break}}b=c[16232]|0;if(j>>>0<b>>>0)wa();c[j+24>>2]=g;a=l+16|0;d=c[a>>2]|0;do if(d|0)if(d>>>0<b>>>0)wa();else{c[j+16>>2]=d;c[d+24>>2]=j;break}while(0);d=c[a+4>>2]|0;if(d)if(d>>>0<(c[16232]|0)>>>0)wa();else{c[j+20>>2]=d;c[d+24>>2]=j;r=l;f=k;break}else{r=l;f=k}}else{r=l;f=k}}else{r=a;f=b}while(0);h=c[16232]|0;if(o>>>0<h>>>0)wa();d=o+4|0;a=c[d>>2]|0;if(!(a&2)){if((o|0)==(c[16234]|0)){q=(c[16231]|0)+f|0;c[16231]=q;c[16234]=r;c[r+4>>2]=q|1;if((r|0)!=(c[16233]|0))return;c[16233]=0;c[16230]=0;return}if((o|0)==(c[16233]|0)){q=(c[16230]|0)+f|0;c[16230]=q;c[16233]=r;c[r+4>>2]=q|1;c[r+q>>2]=q;return}f=(a&-8)+f|0;e=a>>>3;do if(a>>>0>=256){g=c[o+24>>2]|0;b=c[o+12>>2]|0;do if((b|0)==(o|0)){b=o+16|0;a=b+4|0;d=c[a>>2]|0;if(!d){d=c[b>>2]|0;if(!d){n=0;break}else e=b}else e=a;while(1){b=d+20|0;a=c[b>>2]|0;if(a|0){d=a;e=b;continue}b=d+16|0;a=c[b>>2]|0;if(!a)break;else{d=a;e=b}}if(e>>>0<h>>>0)wa();else{c[e>>2]=0;n=d;break}}else{e=c[o+8>>2]|0;if(e>>>0<h>>>0)wa();d=e+12|0;if((c[d>>2]|0)!=(o|0))wa();a=b+8|0;if((c[a>>2]|0)==(o|0)){c[d>>2]=b;c[a>>2]=e;n=b;break}else wa()}while(0);if(g|0){d=c[o+28>>2]|0;a=65216+(d<<2)|0;if((o|0)==(c[a>>2]|0)){c[a>>2]=n;if(!n){c[16229]=c[16229]&~(1<<d);break}}else{if(g>>>0<(c[16232]|0)>>>0)wa();d=g+16|0;if((c[d>>2]|0)==(o|0))c[d>>2]=n;else c[g+20>>2]=n;if(!n)break}b=c[16232]|0;if(n>>>0<b>>>0)wa();c[n+24>>2]=g;a=o+16|0;d=c[a>>2]|0;do if(d|0)if(d>>>0<b>>>0)wa();else{c[n+16>>2]=d;c[d+24>>2]=n;break}while(0);d=c[a+4>>2]|0;if(d|0)if(d>>>0<(c[16232]|0)>>>0)wa();else{c[n+20>>2]=d;c[d+24>>2]=n;break}}}else{a=c[o+8>>2]|0;b=c[o+12>>2]|0;d=64952+(e<<1<<2)|0;if((a|0)!=(d|0)){if(a>>>0<h>>>0)wa();if((c[a+12>>2]|0)!=(o|0))wa()}if((b|0)==(a|0)){c[16228]=c[16228]&~(1<<e);break}if((b|0)!=(d|0)){if(b>>>0<h>>>0)wa();d=b+8|0;if((c[d>>2]|0)==(o|0))m=d;else wa()}else m=b+8|0;c[a+12>>2]=b;c[m>>2]=a}while(0);c[r+4>>2]=f|1;c[r+f>>2]=f;if((r|0)==(c[16233]|0)){c[16230]=f;return}}else{c[d>>2]=a&-2;c[r+4>>2]=f|1;c[r+f>>2]=f}d=f>>>3;if(f>>>0<256){b=64952+(d<<1<<2)|0;a=c[16228]|0;d=1<<d;if(a&d){d=b+8|0;a=c[d>>2]|0;if(a>>>0<(c[16232]|0)>>>0)wa();else{p=d;q=a}}else{c[16228]=a|d;p=b+8|0;q=b}c[p>>2]=r;c[q+12>>2]=r;c[r+8>>2]=q;c[r+12>>2]=b;return}d=f>>>8;if(d)if(f>>>0>16777215)a=31;else{p=(d+1048320|0)>>>16&8;q=d<<p;o=(q+520192|0)>>>16&4;q=q<<o;a=(q+245760|0)>>>16&2;a=14-(o|p|a)+(q<<a>>>15)|0;a=f>>>(a+7|0)&1|a<<1}else a=0;e=65216+(a<<2)|0;c[r+28>>2]=a;c[r+20>>2]=0;c[r+16>>2]=0;d=c[16229]|0;b=1<<a;if(!(d&b)){c[16229]=d|b;c[e>>2]=r;c[r+24>>2]=e;c[r+12>>2]=r;c[r+8>>2]=r;return}a=f<<((a|0)==31?0:25-(a>>>1)|0);e=c[e>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(f|0)){d=127;break}b=e+16+(a>>>31<<2)|0;d=c[b>>2]|0;if(!d){d=124;break}else{a=a<<1;e=d}}if((d|0)==124){if(b>>>0<(c[16232]|0)>>>0)wa();c[b>>2]=r;c[r+24>>2]=e;c[r+12>>2]=r;c[r+8>>2]=r;return}else if((d|0)==127){a=e+8|0;d=c[a>>2]|0;q=c[16232]|0;if(!(d>>>0>=q>>>0&e>>>0>=q>>>0))wa();c[d+12>>2]=r;c[a>>2]=r;c[r+8>>2]=d;c[r+12>>2]=e;c[r+24>>2]=0;return}}function vk(a){a=a|0;var b=0;b=(a|0)==0?1:a;while(1){a=pk(b)|0;if(a|0)break;a=cl()|0;if(!a){a=0;break}Eb[a&3]()}return a|0}function wk(a){a=a|0;qk(a);return}function xk(){var a=0,b=0,d=0,e=0,f=0,g=0,h=0,i=0;f=l;l=l+48|0;h=f+32|0;d=f+24|0;i=f+16|0;g=f;f=f+36|0;a=yk()|0;if(a|0?(e=c[a>>2]|0,e|0):0){b=e+48|0;a=c[b>>2]|0;b=c[b+4>>2]|0;if(!((a&-256|0)==1126902528&(b|0)==1129074247)){c[d>>2]=64358;zk(64308,d)}if((a|0)==1126902529&(b|0)==1129074247)a=c[e+44>>2]|0;else a=e+80|0;c[f>>2]=a;e=c[e>>2]|0;a=c[e+4>>2]|0;if(xb[c[(c[116]|0)+16>>2]&7](464,e,f)|0){i=c[f>>2]|0;i=Cb[c[(c[i>>2]|0)+8>>2]&7](i)|0;c[g>>2]=64358;c[g+4>>2]=a;c[g+8>>2]=i;zk(64222,g)}else{c[i>>2]=64358;c[i+4>>2]=a;zk(64267,i)}}zk(64346,h)}function yk(){var a=0,b=0;a=l;l=l+16|0;if(!(Xa(65408,2)|0)){b=Pa(c[16353]|0)|0;l=a;return b|0}else zk(64497,a);return 0}function zk(a,b){a=a|0;b=b|0;var d=0;d=l;l=l+16|0;c[d>>2]=b;b=c[14844]|0;Hj(b,a,d)|0;nk(10,b)|0;wa()}function Ak(a){a=a|0;return}function Bk(a){a=a|0;wk(a);return}function Ck(a){a=a|0;return}function Dk(a){a=a|0;return}function Ek(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;h=l;l=l+64|0;g=h;if((a|0)!=(b|0))if((b|0)!=0?(f=Kk(b,488,472,0)|0,(f|0)!=0):0){b=g+4|0;e=b+52|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(e|0));c[g>>2]=f;c[g+8>>2]=a;c[g+12>>2]=-1;c[g+48>>2]=1;Kb[c[(c[f>>2]|0)+28>>2]&3](f,g,c[d>>2]|0,1);if((c[g+24>>2]|0)==1){c[d>>2]=c[g+16>>2];b=1}else b=0}else b=0;else b=1;l=h;return b|0}function Fk(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;if((a|0)==(c[b+8>>2]|0))Jk(0,b,d,e,f);return}function Gk(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0;do if((b|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)==(e|0)?(i=d+28|0,(c[i>>2]|0)!=1):0)c[i>>2]=f}else if((b|0)==(c[d>>2]|0)){if((c[d+16>>2]|0)!=(e|0)?(h=d+20|0,(c[h>>2]|0)!=(e|0)):0){c[d+32>>2]=f;c[h>>2]=e;g=d+40|0;c[g>>2]=(c[g>>2]|0)+1;if((c[d+36>>2]|0)==1?(c[d+24>>2]|0)==2:0)a[d+54>>0]=1;c[d+44>>2]=4;break}if((f|0)==1)c[d+32>>2]=1}while(0);return}function Hk(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;if((a|0)==(c[b+8>>2]|0))Ik(0,b,d,e);return}function Ik(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0;g=d+16|0;b=c[g>>2]|0;do if(b){if((b|0)!=(e|0)){f=d+36|0;c[f>>2]=(c[f>>2]|0)+1;c[d+24>>2]=2;a[d+54>>0]=1;break}b=d+24|0;if((c[b>>2]|0)==2)c[b>>2]=f}else{c[g>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1}while(0);return}function Jk(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;a[d+53>>0]=1;do if((c[d+4>>2]|0)==(f|0)){a[d+52>>0]=1;b=d+16|0;f=c[b>>2]|0;if(!f){c[b>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((g|0)==1?(c[d+48>>2]|0)==1:0))break;a[d+54>>0]=1;break}if((f|0)!=(e|0)){g=d+36|0;c[g>>2]=(c[g>>2]|0)+1;a[d+54>>0]=1;break}b=d+24|0;f=c[b>>2]|0;if((f|0)==2){c[b>>2]=g;f=g}if((f|0)==1?(c[d+48>>2]|0)==1:0)a[d+54>>0]=1}while(0);return}function Kk(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0;r=l;l=l+64|0;q=r;o=c[d>>2]|0;p=d+(c[o+-8>>2]|0)|0;o=c[o+-4>>2]|0;c[q>>2]=f;c[q+4>>2]=d;c[q+8>>2]=e;c[q+12>>2]=g;d=q+16|0;e=q+20|0;i=q+24|0;k=q+28|0;j=q+32|0;h=q+40|0;g=(o|0)==(f|0);m=d;n=m+36|0;do{c[m>>2]=0;m=m+4|0}while((m|0)<(n|0));b[d+36>>1]=0;a[d+38>>0]=0;a:do if(g){c[q+48>>2]=1;Hb[c[(c[f>>2]|0)+20>>2]&3](f,q,p,p,1,0);g=(c[i>>2]|0)==1?p:0}else{yb[c[(c[o>>2]|0)+24>>2]&3](o,q,p,1,0);switch(c[q+36>>2]|0){case 0:{g=(c[h>>2]|0)==1&(c[k>>2]|0)==1&(c[j>>2]|0)==1?c[e>>2]|0:0;break a}case 1:break;default:{g=0;break a}}if((c[i>>2]|0)!=1?!((c[h>>2]|0)==0&(c[k>>2]|0)==1&(c[j>>2]|0)==1):0){g=0;break}g=c[d>>2]|0}while(0);l=r;return g|0}function Lk(a){a=a|0;wk(a);return}function Mk(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;if((a|0)==(c[b+8>>2]|0))Jk(0,b,d,e,f);else{a=c[a+8>>2]|0;Hb[c[(c[a>>2]|0)+20>>2]&3](a,b,d,e,f,g)}return}function Nk(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0;do if((b|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)==(e|0)?(h=d+28|0,(c[h>>2]|0)!=1):0)c[h>>2]=f}else{if((b|0)!=(c[d>>2]|0)){j=c[b+8>>2]|0;yb[c[(c[j>>2]|0)+24>>2]&3](j,d,e,f,g);break}if((c[d+16>>2]|0)!=(e|0)?(j=d+20|0,(c[j>>2]|0)!=(e|0)):0){c[d+32>>2]=f;i=d+44|0;if((c[i>>2]|0)==4)break;f=d+52|0;a[f>>0]=0;h=d+53|0;a[h>>0]=0;b=c[b+8>>2]|0;Hb[c[(c[b>>2]|0)+20>>2]&3](b,d,e,e,1,g);if(a[h>>0]|0)if(!(a[f>>0]|0)){f=1;h=13}else h=17;else{f=0;h=13}do if((h|0)==13){c[j>>2]=e;j=d+40|0;c[j>>2]=(c[j>>2]|0)+1;if((c[d+36>>2]|0)==1?(c[d+24>>2]|0)==2:0){a[d+54>>0]=1;if(f){h=17;break}else{f=4;break}}if(f)h=17;else f=4}while(0);if((h|0)==17)f=3;c[i>>2]=f;break}if((f|0)==1)c[d+32>>2]=1}while(0);return}function Ok(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;if((a|0)==(c[b+8>>2]|0))Ik(0,b,d,e);else{a=c[a+8>>2]|0;Kb[c[(c[a>>2]|0)+28>>2]&3](a,b,d,e)}return}function Pk(a){a=a|0;return}function Qk(){var a=0;a=l;l=l+16|0;if(!(sa(65412,16)|0)){l=a;return}else zk(64546,a)}function Rk(a){a=a|0;var b=0;b=l;l=l+16|0;qk(a);if(!(eb(c[16353]|0,0)|0)){l=b;return}else zk(64596,b)}function Sk(){var a=0,b=0;b=yk()|0;if((b|0?(a=c[b>>2]|0,a|0):0)?(b=a+48|0,(c[b>>2]&-256|0)==1126902528?(c[b+4>>2]|0)==1129074247:0):0)Tk(c[a+12>>2]|0);Tk(Uk()|0)}function Tk(a){a=a|0;var b=0;b=l;l=l+16|0;Eb[a&3]();zk(64649,b)}function Uk(){var a=0;a=c[14930]|0;c[14930]=a+0;return a|0}function Vk(a){a=a|0;wk(a);return}function Wk(a,b,c){a=a|0;b=b|0;c=c|0;return (a|0)==(b|0)|0}function Xk(a){a=a|0;wk(a);return}function Yk(d,e,f,g,h,i){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;if((d|0)==(c[e+8>>2]|0))Jk(0,e,f,g,h);else{p=e+52|0;l=b[p>>1]|0;k=l&255;o=e+53|0;l=(l&65535)>>>8&255;r=c[d+12>>2]|0;n=d+16+(r<<3)|0;a[p>>0]=0;a[o>>0]=0;al(d+16|0,e,f,g,h,i);a:do if((r|0)>1){q=e+24|0;m=d+8|0;r=e+54|0;j=d+24|0;do{if(a[r>>0]|0)break a;d=b[p>>1]|0;if(!((d&255)<<24>>24)){if((d&65535)>=256?(c[m>>2]&1|0)==0:0)break a}else{if((c[q>>2]|0)==1)break a;if(!(c[m>>2]&2))break a}a[p>>0]=0;a[o>>0]=0;al(j,e,f,g,h,i);j=j+8|0}while(j>>>0<n>>>0)}while(0);a[p>>0]=k;a[o>>0]=l}return}function Zk(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;a:do if((b|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)==(e|0)?(h=d+28|0,(c[h>>2]|0)!=1):0)c[h>>2]=f}else{if((b|0)!=(c[d>>2]|0)){q=c[b+12>>2]|0;j=b+16+(q<<3)|0;bl(b+16|0,d,e,f,g);h=b+24|0;if((q|0)<=1)break;b=c[b+8>>2]|0;if((b&2|0)==0?(k=d+36|0,(c[k>>2]|0)!=1):0){if(!(b&1)){b=d+54|0;while(1){if(a[b>>0]|0)break a;if((c[k>>2]|0)==1)break a;bl(h,d,e,f,g);h=h+8|0;if(h>>>0>=j>>>0)break a}}b=d+24|0;i=d+54|0;while(1){if(a[i>>0]|0)break a;if((c[k>>2]|0)==1?(c[b>>2]|0)==1:0)break a;bl(h,d,e,f,g);h=h+8|0;if(h>>>0>=j>>>0)break a}}b=d+54|0;while(1){if(a[b>>0]|0)break a;bl(h,d,e,f,g);h=h+8|0;if(h>>>0>=j>>>0)break a}}if((c[d+16>>2]|0)!=(e|0)?(q=d+20|0,(c[q>>2]|0)!=(e|0)):0){c[d+32>>2]=f;p=d+44|0;if((c[p>>2]|0)==4)break;k=b+16+(c[b+12>>2]<<3)|0;l=d+52|0;f=d+53|0;o=d+54|0;j=b+8|0;n=d+24|0;m=0;h=0;i=b+16|0;b:while(1){if(i>>>0>=k>>>0){b=20;break}a[l>>0]=0;a[f>>0]=0;al(i,d,e,e,1,g);if(a[o>>0]|0){b=20;break}do if(a[f>>0]|0){if(!(a[l>>0]|0))if(!(c[j>>2]&1)){h=1;b=20;break b}else{b=m;h=1;break}if((c[n>>2]|0)==1){b=25;break b}if(!(c[j>>2]&2)){b=25;break b}else{b=1;h=1}}else b=m;while(0);m=b;i=i+8|0}do if((b|0)==20){if((!m?(c[q>>2]=e,e=d+40|0,c[e>>2]=(c[e>>2]|0)+1,(c[d+36>>2]|0)==1):0)?(c[n>>2]|0)==2:0){a[o>>0]=1;if(h){b=25;break}else{h=4;break}}if(h)b=25;else h=4}while(0);if((b|0)==25)h=3;c[p>>2]=h;break}if((f|0)==1)c[d+32>>2]=1}while(0);return}function _k(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;a:do if((b|0)!=(c[d+8>>2]|0)){h=c[b+12>>2]|0;g=b+16+(h<<3)|0;$k(b+16|0,d,e,f);if((h|0)>1){h=d+54|0;b=b+24|0;do{$k(b,d,e,f);if(a[h>>0]|0)break a;b=b+8|0}while(b>>>0<g>>>0)}}else Ik(0,d,e,f);while(0);return}function $k(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=c[a+4>>2]|0;f=g>>8;if(g&1)f=c[(c[d>>2]|0)+f>>2]|0;a=c[a>>2]|0;Kb[c[(c[a>>2]|0)+28>>2]&3](a,b,d+f|0,g&2|0?e:2);return}function al(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0;i=c[a+4>>2]|0;h=i>>8;if(i&1)h=c[(c[e>>2]|0)+h>>2]|0;a=c[a>>2]|0;Hb[c[(c[a>>2]|0)+20>>2]&3](a,b,d,e+h|0,i&2|0?f:2,g);return}function bl(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;h=c[a+4>>2]|0;g=h>>8;if(h&1)g=c[(c[d>>2]|0)+g>>2]|0;a=c[a>>2]|0;yb[c[(c[a>>2]|0)+24>>2]&3](a,b,d+g|0,h&2|0?e:2,f);return}function cl(){var a=0;a=c[16354]|0;c[16354]=a+0;return a|0}function dl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;f=l;l=l+16|0;e=f;c[e>>2]=c[d>>2];a=xb[c[(c[a>>2]|0)+16>>2]&7](a,b,e)|0;if(a)c[d>>2]=c[e>>2];l=f;return a&1|0}function el(a){a=a|0;if(!a)a=0;else a=(Kk(a,488,544,0)|0)!=0;return a&1|0}function fl(){}function gl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=b-d-(c>>>0>a>>>0|0)>>>0;return (D=d,a-c>>>0|0)|0}function hl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;c=a+c>>>0;return (D=b+d+(c>>>0<a>>>0|0)>>>0,c|0)|0}function il(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=b+e|0;if((e|0)>=20){d=d&255;h=b&3;i=d|d<<8|d<<16|d<<24;g=f&~3;if(h){h=b+4-h|0;while((b|0)<(h|0)){a[b>>0]=d;b=b+1|0}}while((b|0)<(g|0)){c[b>>2]=i;b=b+4|0}}while((b|0)<(f|0)){a[b>>0]=d;b=b+1|0}return b-e|0}function jl(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){D=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}D=a<<c-32;return 0}function kl(b){b=b|0;var c=0;c=a[n+(b&255)>>0]|0;if((c|0)<8)return c|0;c=a[n+(b>>8&255)>>0]|0;if((c|0)<8)return c+8|0;c=a[n+(b>>16&255)>>0]|0;if((c|0)<8)return c+16|0;return (a[n+(b>>>24)>>0]|0)+24|0}function ll(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;l=a;j=b;k=j;h=d;n=e;i=n;if(!k){g=(f|0)!=0;if(!i){if(g){c[f>>2]=(l>>>0)%(h>>>0);c[f+4>>2]=0}n=0;f=(l>>>0)/(h>>>0)>>>0;return (D=n,f)|0}else{if(!g){n=0;f=0;return (D=n,f)|0}c[f>>2]=a|0;c[f+4>>2]=b&0;n=0;f=0;return (D=n,f)|0}}g=(i|0)==0;do if(h){if(!g){g=(V(i|0)|0)-(V(k|0)|0)|0;if(g>>>0<=31){m=g+1|0;i=31-g|0;b=g-31>>31;h=m;a=l>>>(m>>>0)&b|k<<i;b=k>>>(m>>>0)&b;g=0;i=l<<i;break}if(!f){n=0;f=0;return (D=n,f)|0}c[f>>2]=a|0;c[f+4>>2]=j|b&0;n=0;f=0;return (D=n,f)|0}g=h-1|0;if(g&h|0){i=(V(h|0)|0)+33-(V(k|0)|0)|0;p=64-i|0;m=32-i|0;j=m>>31;o=i-32|0;b=o>>31;h=i;a=m-1>>31&k>>>(o>>>0)|(k<<m|l>>>(i>>>0))&b;b=b&k>>>(i>>>0);g=l<<p&j;i=(k<<p|l>>>(o>>>0))&j|l<<m&i-33>>31;break}if(f|0){c[f>>2]=g&l;c[f+4>>2]=0}if((h|0)==1){o=j|b&0;p=a|0|0;return (D=o,p)|0}else{p=kl(h|0)|0;o=k>>>(p>>>0)|0;p=k<<32-p|l>>>(p>>>0)|0;return (D=o,p)|0}}else{if(g){if(f|0){c[f>>2]=(k>>>0)%(h>>>0);c[f+4>>2]=0}o=0;p=(k>>>0)/(h>>>0)>>>0;return (D=o,p)|0}if(!l){if(f|0){c[f>>2]=0;c[f+4>>2]=(k>>>0)%(i>>>0)}o=0;p=(k>>>0)/(i>>>0)>>>0;return (D=o,p)|0}g=i-1|0;if(!(g&i)){if(f|0){c[f>>2]=a|0;c[f+4>>2]=g&k|b&0}o=0;p=k>>>((kl(i|0)|0)>>>0);return (D=o,p)|0}g=(V(i|0)|0)-(V(k|0)|0)|0;if(g>>>0<=30){b=g+1|0;i=31-g|0;h=b;a=k<<i|l>>>(b>>>0);b=k>>>(b>>>0);g=0;i=l<<i;break}if(!f){o=0;p=0;return (D=o,p)|0}c[f>>2]=a|0;c[f+4>>2]=j|b&0;o=0;p=0;return (D=o,p)|0}while(0);if(!h){k=i;j=0;i=0}else{m=d|0|0;l=n|e&0;k=hl(m|0,l|0,-1,-1)|0;d=D;j=i;i=0;do{e=j;j=g>>>31|j<<1;g=i|g<<1;e=a<<1|e>>>31|0;n=a>>>31|b<<1|0;gl(k|0,d|0,e|0,n|0)|0;p=D;o=p>>31|((p|0)<0?-1:0)<<1;i=o&1;a=gl(e|0,n|0,o&m|0,(((p|0)<0?-1:0)>>31|((p|0)<0?-1:0)<<1)&l|0)|0;b=D;h=h-1|0}while((h|0)!=0);k=j;j=0}h=0;if(f|0){c[f>>2]=a;c[f+4>>2]=b}o=(g|0)>>>31|(k|h)<<1|(h<<1|g>>>31)&0|j;p=(g<<1|0>>>31)&-2|i;return (D=o,p)|0}function ml(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0;j=b>>31|((b|0)<0?-1:0)<<1;i=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;f=d>>31|((d|0)<0?-1:0)<<1;e=((d|0)<0?-1:0)>>31|((d|0)<0?-1:0)<<1;h=gl(j^a|0,i^b|0,j|0,i|0)|0;g=D;a=f^j;b=e^i;return gl((ll(h,g,gl(f^c|0,e^d|0,f|0,e|0)|0,D,0)|0)^a|0,D^b|0,a|0,b|0)|0}function nl(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){D=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}D=0;return b>>>c-32|0}function ol(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((e|0)>=8192)return Ia(b|0,d|0,e|0)|0;h=b|0;g=b+e|0;if((b&3)==(d&3)){while(b&3){if(!e)return h|0;a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}e=g&-4|0;f=e-64|0;while((b|0)<=(f|0)){c[b>>2]=c[d>>2];c[b+4>>2]=c[d+4>>2];c[b+8>>2]=c[d+8>>2];c[b+12>>2]=c[d+12>>2];c[b+16>>2]=c[d+16>>2];c[b+20>>2]=c[d+20>>2];c[b+24>>2]=c[d+24>>2];c[b+28>>2]=c[d+28>>2];c[b+32>>2]=c[d+32>>2];c[b+36>>2]=c[d+36>>2];c[b+40>>2]=c[d+40>>2];c[b+44>>2]=c[d+44>>2];c[b+48>>2]=c[d+48>>2];c[b+52>>2]=c[d+52>>2];c[b+56>>2]=c[d+56>>2];c[b+60>>2]=c[d+60>>2];b=b+64|0;d=d+64|0}while((b|0)<(e|0)){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0}}else{e=g-4|0;while((b|0)<(e|0)){a[b>>0]=a[d>>0]|0;a[b+1>>0]=a[d+1>>0]|0;a[b+2>>0]=a[d+2>>0]|0;a[b+3>>0]=a[d+3>>0]|0;b=b+4|0;d=d+4|0}}while((b|0)<(g|0)){a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0}return h|0}function pl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return ll(a,b,c,d,0)|0}function ql(a){a=a|0;var b=0,d=0;d=a+15&-16|0;b=c[i>>2]|0;a=b+d|0;if((d|0)>0&(a|0)<(b|0)|(a|0)<0){_()|0;Fa(12);return -1}c[i>>2]=a;if((a|0)>(Z()|0)?(Y()|0)==0:0){Fa(12);c[i>>2]=b;return -1}return b|0}function rl(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;if((c|0)<(b|0)&(b|0)<(c+d|0)){e=b;c=c+d|0;b=b+d|0;while((d|0)>0){b=b-1|0;c=c-1|0;d=d-1|0;a[b>>0]=a[c>>0]|0}b=e}else ol(b,c,d)|0;return b|0}function sl(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=l;l=l+16|0;f=g|0;ll(a,b,d,e,f)|0;l=g;return (D=c[f+4>>2]|0,c[f>>2]|0)|0}function tl(a){a=a|0;return (a&255)<<8|a>>8&255|0}function ul(){return 0}function vl(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;return wb[a&3](b|0,c|0,d|0,e|0,f|0,g|0,h|0)|0}function wl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return xb[a&7](b|0,c|0,d|0)|0}function xl(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;yb[a&3](b|0,c|0,d|0,e|0,f|0)}function yl(a,b){a=a|0;b=b|0;zb[a&31](b|0)}function zl(a,b,c){a=a|0;b=b|0;c=c|0;Ab[a&3](b|0,c|0)}function Al(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return Bb[a&1](b|0,c|0,d|0,e|0,f|0,g|0)|0}function Bl(a,b){a=a|0;b=b|0;return Cb[a&7](b|0)|0}function Cl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Db[a&3](b|0,c|0,d|0)}function Dl(a){a=a|0;Eb[a&3]()}function El(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;return Fb[a&7](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0)|0}function Fl(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return Gb[a&7](b|0,c|0,d|0,e|0)|0}function Gl(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;Hb[a&3](b|0,c|0,d|0,e|0,f|0,g|0)}function Hl(a,b,c){a=a|0;b=b|0;c=c|0;return Ib[a&15](b|0,c|0)|0}function Il(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return Jb[a&7](b|0,c|0,d|0,e|0,f|0)|0}function Jl(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Kb[a&3](b|0,c|0,d|0,e|0)}function Kl(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;W(0);return 0}function Ll(a,b,c){a=a|0;b=b|0;c=c|0;W(1);return 0}function Ml(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;W(2)}function Nl(a){a=a|0;W(3)}function Ol(a,b){a=a|0;b=b|0;W(4)}function Pl(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;W(5);return 0}function Ql(a){a=a|0;W(6);return 0}function Rl(a,b,c){a=a|0;b=b|0;c=c|0;W(7)}function Sl(){W(8)}function Tl(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;W(9);return 0}function Ul(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;W(10);return 0}function Vl(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;W(11)}function Wl(a,b){a=a|0;b=b|0;W(12);return 0}function Xl(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;W(13);return 0}function Yl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;W(14)}

// EMSCRIPTEN_END_FUNCS
var wb=[Kl,Me,Oe,Te];var xb=[Ll,vj,wj,Bj,Vj,Ek,Wk,Ve];var yb=[Ml,Gk,Nk,Zk];var zb=[Nl,be,ce,me,ne,se,te,Ge,Ak,Bk,Ck,Dk,Lk,Vk,Xk,zj,Rk,Nl,Nl,Nl,Nl,Nl,Nl,Nl,Nl,Nl,Nl,Nl,Nl,Nl,Nl,Nl];var Ab=[Ol,_d,we,Pe];var Bb=[Pl,Ze];var Cb=[Ql,He,uj,Ef,Ff,Ql,Ql,Ql];var Db=[Rl,Ee,_e,Rl];var Eb=[Sl,xk,Qk,Sl];var Fb=[Tl,ye,Ce,$e,Ye,Tl,Tl,Tl];var Gb=[Ul,ee,pe,zd,Ad,Xe,Cf,Df];var Hb=[Vl,Fk,Mk,Yk];var Ib=[Wl,$d,ae,de,ke,le,oe,qe,re,Fe,Ie,od,Ld,fe,Wl,Wl];var Jb=[Xl,ue,xe,ze,Be,De,Re,Xl];var Kb=[Yl,Hk,Ok,_k];return{_memset:il,_llvm_bswap_i16:tl,___cxa_can_catch:dl,_free:qk,___udivmoddi4:ll,___cxa_is_pointer_type:el,_i64Add:hl,_memmove:rl,_pthread_self:ul,_i64Subtract:gl,___udivdi3:pl,_malloc:pk,_memcpy:ol,___getTypeName:tj,_llvm_cttz_i32:kl,_sbrk:ql,_bitshift64Lshr:nl,_bitshift64Shl:jl,___uremdi3:sl,___divdi3:ml,__GLOBAL__sub_I_bind_cpp:Ke,__GLOBAL__sub_I_bind_cpp_382:lj,runPostSets:fl,stackAlloc:Lb,stackSave:Mb,stackRestore:Nb,establishStackSpace:Ob,setThrew:Pb,setTempRet0:Qb,getTempRet0:Rb,dynCall_iiiiiiii:vl,dynCall_iiii:wl,dynCall_viiiii:xl,dynCall_vi:yl,dynCall_vii:zl,dynCall_iiiiiii:Al,dynCall_ii:Bl,dynCall_viii:Cl,dynCall_v:Dl,dynCall_iiiiiiiii:El,dynCall_iiiii:Fl,dynCall_viiiiii:Gl,dynCall_iii:Hl,dynCall_iiiiii:Il,dynCall_viiii:Jl}})


// EMSCRIPTEN_END_ASM
(b.H,b.I,w),Nb=b.___udivdi3=f.___udivdi3,Lb=b._bitshift64Lshr=f._bitshift64Lshr,
Gb=b._bitshift64Shl=f._bitshift64Shl;b.___cxa_is_pointer_type=f.___cxa_is_pointer_type;var Fb=b._memset=f._memset,Pb=b._sbrk=f._sbrk,Mb=b._memcpy=f._memcpy,Rb=b.___uremdi3=f.___uremdi3,Kb=b.___divdi3=f.___divdi3,Ib=b._llvm_cttz_i32=f._llvm_cttz_i32,Db=b._i64Subtract=f._i64Subtract,Ab=b.__GLOBAL__sub_I_bind_cpp=f.__GLOBAL__sub_I_bind_cpp,Jb=b.___udivmoddi4=f.___udivmoddi4,Eb=b._i64Add=f._i64Add,Tb=b._pthread_self=f._pthread_self,Sb=b._llvm_bswap_i16=f._llvm_bswap_i16,wb=b.___getTypeName=f.___getTypeName;
b.___cxa_can_catch=f.___cxa_can_catch;v=b._free=f._free;b.runPostSets=f.runPostSets;var Qb=b._memmove=f._memmove,I=b._malloc=f._malloc,Bb=b.__GLOBAL__sub_I_bind_cpp_382=f.__GLOBAL__sub_I_bind_cpp_382;b.dynCall_iiiiiiii=f.dynCall_iiiiiiii;b.dynCall_iiii=f.dynCall_iiii;b.dynCall_viiiii=f.dynCall_viiiii;b.dynCall_vi=f.dynCall_vi;b.dynCall_vii=f.dynCall_vii;b.dynCall_iiiiiii=f.dynCall_iiiiiii;b.dynCall_ii=f.dynCall_ii;b.dynCall_viii=f.dynCall_viii;b.dynCall_v=f.dynCall_v;b.dynCall_iiiiiiiii=f.dynCall_iiiiiiiii;
b.dynCall_iiiii=f.dynCall_iiiii;b.dynCall_viiiiii=f.dynCall_viiiiii;b.dynCall_iii=f.dynCall_iii;b.dynCall_iiiiii=f.dynCall_iiiiii;b.dynCall_viiii=f.dynCall_viiii;h.A=f.stackAlloc;h.U=f.stackSave;h.T=f.stackRestore;h.aa=f.establishStackSpace;h.S=f.setTempRet0;h.N=f.getTempRet0;b.asm=f;V.prototype=Error();V.prototype.constructor=V;var yb,kb=null;b.callMain=b.X=function(a){function c(){for(var a=0;3>a;a++)d.push(0)}a=a||[];ka||(ka=!0,S(ua));var e=a.length+1,d=[x(Ia(b.thisProgram),"i8",0)];c();for(var f=
0;f<e-1;f+=1)d.push(x(Ia(a[f]),"i8",0)),c();d.push(0);d=x(d,"i32",0);try{var h=b._main(e,d,0);mb(h,!0)}catch(l){if(!(l instanceof V))if("SimulateInfiniteLoop"==l)b.noExitRuntime=!0;else throw l&&"object"===typeof l&&l.stack&&b.q("exception thrown: "+[l,l.stack]),l;}finally{}};b.run=b.run=hb;b.exit=b.exit=mb;var nb=[];b.abort=b.abort=G;if(b.preInit)for("function"==typeof b.preInit&&(b.preInit=[b.preInit]);0<b.preInit.length;)b.preInit.pop()();var ib=!0;b.noInitialRun&&(ib=!1);b.noExitRuntime=!0;hb();
b.ENVIRONMENT=W?"WEB":Q?"WORKER":P?"NODE":"SHELL";b.getNativeTypeSize=h.o;P||(module.exports=b)}();


},{"fs":7,"path":74}],81:[function(require,module,exports){
(function (global){
"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// main function
var decode = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(type, inputBuffer, ch, sps, bps) {
        var _this = this;

        var inputSize, inputBufferMem, outputBuffer, outputStream, data, _ret, _ret2;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        // input buffer 
                        inputSize = inputBuffer.byteLength;
                        inputBufferMem = new _memory2.default(inputSize);

                        HEAPU8.set(new Uint8Array(inputBuffer), inputBufferMem.ptr);

                        // output
                        outputBuffer = null, outputStream = null, data = null;
                        _context6.t0 = type;
                        _context6.next = _context6.t0 === "noise" ? 7 : _context6.t0 === "pxtone" ? 11 : _context6.t0 === "stream" ? 11 : 15;
                        break;

                    case 7:
                        return _context6.delegateYield(_regenerator2.default.mark(function _callee() {
                            var outputMem, outputSizeMem, release, outputStart, outputEnd;
                            return _regenerator2.default.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            outputMem = new _memory2.default("*"), outputSizeMem = new _memory2.default("i32");

                                            release = function release() {
                                                outputMem.release();
                                                outputSizeMem.release();
                                            };

                                            _context.next = 4;
                                            return (0, _waitUntilIdle2.default)();

                                        case 4:
                                            if ((0, _emDecoder.decodeNoise)(inputBufferMem.ptr, inputSize, ch, sps, bps, outputMem.ptr, outputSizeMem.ptr)) {
                                                _context.next = 7;
                                                break;
                                            }

                                            release();
                                            throw new Error("Decode Pxtone Noise Error.");

                                        case 7:
                                            outputStart = outputMem.getValue(), outputEnd = outputStart + outputSizeMem.getValue();

                                            outputBuffer = _emDecoder.buffer.slice(outputStart, outputEnd);

                                            (0, _emDecoder._free)(outputStart);
                                            release();
                                            return _context.abrupt("return", "break");

                                        case 12:
                                        case "end":
                                            return _context.stop();
                                    }
                                }
                            }, _callee, _this);
                        })(), "t1", 8);

                    case 8:
                        _ret = _context6.t1;

                        if (!(_ret === "break")) {
                            _context6.next = 11;
                            break;
                        }

                        return _context6.abrupt("break", 16);

                    case 11:
                        return _context6.delegateYield(_regenerator2.default.mark(function _callee5() {
                            var pxVomitMem, docMem, releaseVomit, title, comment, outputSize;
                            return _regenerator2.default.wrap(function _callee5$(_context5) {
                                while (1) {
                                    switch (_context5.prev = _context5.next) {
                                        case 0:
                                            pxVomitMem = new _memory2.default("*"), docMem = new _memory2.default("*");

                                            // create

                                            if ((0, _emDecoder.createPxtone)(inputBufferMem.ptr, inputSize, ch, sps, bps, pxVomitMem.ptr, docMem.ptr)) {
                                                _context5.next = 5;
                                                break;
                                            }

                                            pxVomitMem.release();
                                            docMem.release();
                                            throw new Error("Create Pxtone Vomit Error.");

                                        case 5:
                                            releaseVomit = function releaseVomit() {
                                                (0, _emDecoder.releasePxtone)(pxVomitMem.ptr, docMem.ptr);
                                                pxVomitMem.release();
                                                docMem.release();
                                            };

                                            // text


                                            title = "", comment = "";
                                            return _context5.delegateYield(_regenerator2.default.mark(function _callee2() {
                                                var titleMem, titleSizeMem, commentMem, commentSizeMem, release, titleStart, commentStart, titleEnd, titleBuffer, commentEnd, commentBuffer;
                                                return _regenerator2.default.wrap(function _callee2$(_context2) {
                                                    while (1) {
                                                        switch (_context2.prev = _context2.next) {
                                                            case 0:
                                                                titleMem = new _memory2.default("*"), titleSizeMem = new _memory2.default("i32");
                                                                commentMem = new _memory2.default("*"), commentSizeMem = new _memory2.default("i32");

                                                                release = function release() {
                                                                    titleMem.release();
                                                                    titleSizeMem.release();
                                                                    commentMem.release();
                                                                    commentSizeMem.release();
                                                                };

                                                                if ((0, _emDecoder.getPxtoneText)(pxVomitMem.ptr, titleMem.ptr, titleSizeMem.ptr, commentMem.ptr, commentSizeMem.ptr)) {
                                                                    _context2.next = 7;
                                                                    break;
                                                                }

                                                                release();
                                                                releaseVomit();
                                                                throw new Error("Get Pxtone Vomit Text Error.");

                                                            case 7:
                                                                titleStart = titleMem.getValue(), commentStart = commentMem.getValue();

                                                                if (!titleStart) {
                                                                    _context2.next = 14;
                                                                    break;
                                                                }

                                                                titleEnd = titleStart + titleSizeMem.getValue();
                                                                titleBuffer = _emDecoder.buffer.slice(titleStart, titleEnd);
                                                                _context2.next = 13;
                                                                return (0, _textDecoder2.default)(titleBuffer);

                                                            case 13:
                                                                title = _context2.sent;

                                                            case 14:
                                                                if (!commentStart) {
                                                                    _context2.next = 20;
                                                                    break;
                                                                }

                                                                commentEnd = commentStart + commentSizeMem.getValue();
                                                                commentBuffer = _emDecoder.buffer.slice(commentStart, commentEnd);
                                                                _context2.next = 19;
                                                                return (0, _textDecoder2.default)(commentBuffer);

                                                            case 19:
                                                                comment = _context2.sent;

                                                            case 20:

                                                                release();

                                                            case 21:
                                                            case "end":
                                                                return _context2.stop();
                                                        }
                                                    }
                                                }, _callee2, _this);
                                            })(), "t0", 8);

                                        case 8:

                                            // info
                                            outputSize = void 0;

                                            (function () {
                                                var outputSizeMem = new _memory2.default("i32");
                                                var loopStartMem = new _memory2.default("double"),
                                                    loopEndMem = new _memory2.default("double");

                                                var release = function release() {
                                                    outputSizeMem.release();
                                                    loopStartMem.release();
                                                    loopEndMem.release();
                                                };

                                                if (!(0, _emDecoder.getPxtoneInfo)(pxVomitMem.ptr, ch, sps, bps, outputSizeMem.ptr, loopStartMem.ptr, loopEndMem.ptr)) {
                                                    release();
                                                    releaseVomit();
                                                    throw new Error("Get Pxtone Vomit Info Error.");
                                                }

                                                outputSize = outputSizeMem.getValue();

                                                var loopStart = loopStartMem.getValue(),
                                                    loopEnd = loopEndMem.getValue();

                                                data = {
                                                    "loopStart": loopStart,
                                                    "loopEnd": loopEnd,
                                                    "title": title,
                                                    "comment": comment,
                                                    "byteLength": outputSize
                                                };

                                                release();
                                            })();

                                            if (!(type === "pxtone")) {
                                                _context5.next = 14;
                                                break;
                                            }

                                            return _context5.delegateYield(_regenerator2.default.mark(function _callee3() {
                                                var tempBufferMem, release, tempArray, outputArray, deadline, pc, size;
                                                return _regenerator2.default.wrap(function _callee3$(_context3) {
                                                    while (1) {
                                                        switch (_context3.prev = _context3.next) {
                                                            case 0:

                                                                outputBuffer = new ArrayBuffer(outputSize);
                                                                tempBufferMem = new _memory2.default(TEMP_BUFFER_SIZE);

                                                                release = function release() {
                                                                    tempBufferMem.release();
                                                                };

                                                                tempArray = HEAPU8.subarray(tempBufferMem.ptr, tempBufferMem.ptr + TEMP_BUFFER_SIZE);
                                                                outputArray = new Uint8Array(outputBuffer);
                                                                _context3.next = 7;
                                                                return (0, _waitUntilIdle2.default)();

                                                            case 7:
                                                                deadline = _context3.sent;
                                                                pc = 0;

                                                            case 9:
                                                                if (!(pc < outputSize)) {
                                                                    _context3.next = 23;
                                                                    break;
                                                                }

                                                                size = Math.min(TEMP_BUFFER_SIZE, outputSize - pc);

                                                                if ((0, _emDecoder.vomitPxtone)(pxVomitMem.ptr, tempBufferMem.ptr, size)) {
                                                                    _context3.next = 15;
                                                                    break;
                                                                }

                                                                release();
                                                                releaseVomit();
                                                                throw new Error("Pxtone Vomit Error.");

                                                            case 15:

                                                                // memcpy
                                                                outputArray.set(size === TEMP_BUFFER_SIZE ? tempArray : HEAPU8.subarray(tempBufferMem.ptr, tempBufferMem.ptr + size), pc);

                                                                if (!(!deadline || deadline && deadline.timeRemaining() === 0)) {
                                                                    _context3.next = 20;
                                                                    break;
                                                                }

                                                                _context3.next = 19;
                                                                return (0, _waitUntilIdle2.default)();

                                                            case 19:
                                                                deadline = _context3.sent;

                                                            case 20:
                                                                pc += TEMP_BUFFER_SIZE;
                                                                _context3.next = 9;
                                                                break;

                                                            case 23:

                                                                // release
                                                                release();
                                                                releaseVomit();

                                                            case 25:
                                                            case "end":
                                                                return _context3.stop();
                                                        }
                                                    }
                                                }, _callee3, _this);
                                            })(), "t1", 12);

                                        case 12:
                                            _context5.next = 15;
                                            break;

                                        case 14:
                                            if (type === "stream") {

                                                outputStream = new _zenObservable2.default(function (observer) {

                                                    var cancelFlag = false;
                                                    (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
                                                        var tempBufferMem, release, deadline, pc, size;
                                                        return _regenerator2.default.wrap(function _callee4$(_context4) {
                                                            while (1) {
                                                                switch (_context4.prev = _context4.next) {
                                                                    case 0:
                                                                        tempBufferMem = new _memory2.default(TEMP_BUFFER_SIZE);

                                                                        release = function release() {
                                                                            tempBufferMem.release();
                                                                        };

                                                                        deadline = void 0;
                                                                        pc = 0;

                                                                    case 4:
                                                                        if (!(pc < outputSize)) {
                                                                            _context4.next = 20;
                                                                            break;
                                                                        }

                                                                        size = Math.min(TEMP_BUFFER_SIZE, outputSize - pc);

                                                                        // request idle

                                                                        if (!(!deadline || deadline && deadline.timeRemaining() === 0)) {
                                                                            _context4.next = 10;
                                                                            break;
                                                                        }

                                                                        _context4.next = 9;
                                                                        return (0, _waitUntilIdle2.default)();

                                                                    case 9:
                                                                        deadline = _context4.sent;

                                                                    case 10:
                                                                        if (!cancelFlag) {
                                                                            _context4.next = 12;
                                                                            break;
                                                                        }

                                                                        return _context4.abrupt("break", 20);

                                                                    case 12:
                                                                        if ((0, _emDecoder.vomitPxtone)(pxVomitMem.ptr, tempBufferMem.ptr, size)) {
                                                                            _context4.next = 16;
                                                                            break;
                                                                        }

                                                                        release();
                                                                        releaseVomit();
                                                                        throw new Error("Pxtone Vomit Error.");

                                                                    case 16:

                                                                        // yield
                                                                        observer.next(_emDecoder.buffer.slice(tempBufferMem.ptr, tempBufferMem.ptr + size));

                                                                    case 17:
                                                                        pc += TEMP_BUFFER_SIZE;
                                                                        _context4.next = 4;
                                                                        break;

                                                                    case 20:

                                                                        if (!cancelFlag) observer.complete();

                                                                        // release
                                                                        release();
                                                                        releaseVomit();

                                                                    case 23:
                                                                    case "end":
                                                                        return _context4.stop();
                                                                }
                                                            }
                                                        }, _callee4, _this);
                                                    }))();

                                                    return function () {
                                                        cancelFlag = true;
                                                    };
                                                });
                                            }

                                        case 15:
                                            return _context5.abrupt("return", "break");

                                        case 16:
                                        case "end":
                                            return _context5.stop();
                                    }
                                }
                            }, _callee5, _this);
                        })(), "t2", 12);

                    case 12:
                        _ret2 = _context6.t2;

                        if (!(_ret2 === "break")) {
                            _context6.next = 15;
                            break;
                        }

                        return _context6.abrupt("break", 16);

                    case 15:
                        throw new TypeError("type is invalid (" + type + ")");

                    case 16:
                        return _context6.abrupt("return", {
                            "buffer": outputBuffer,
                            "stream": outputStream,
                            "data": data
                        });

                    case 17:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function decode(_x, _x2, _x3, _x4, _x5) {
        return _ref.apply(this, arguments);
    };
}();

// export


var _zenObservable = require("zen-observable");

var _zenObservable2 = _interopRequireDefault(_zenObservable);

var _memory = require("./memory");

var _memory2 = _interopRequireDefault(_memory);

var _textDecoder = require("./textDecoder");

var _textDecoder2 = _interopRequireDefault(_textDecoder);

var _waitUntilIdle = require("./waitUntilIdle");

var _waitUntilIdle2 = _interopRequireDefault(_waitUntilIdle);

var _emDecoder = require("./emDecoder");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// constant
var TEMP_BUFFER_SIZE = 4096;

// emscripten import

var HEAPU8 = new Uint8Array(_emDecoder.buffer);if (_emDecoder.ENVIRONMENT === "NODE") {
    module["exports"] = decode;
} else if (_emDecoder.ENVIRONMENT === "WEB") {
    global["pxtnDecoder"] = decode;
} else if (_emDecoder.ENVIRONMENT === "WORKER") {
    global["addEventListener"]("message", function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(e) {
            var data, type, sessionId, _ref4, buffer, stream, retData;

            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            data = e["data"];
                            type = data["type"];

                            if (!(type !== "noise" && type !== "pxtone" && type !== "stream" && type !== "cancel")) {
                                _context7.next = 4;
                                break;
                            }

                            throw new TypeError("type is invalid (" + type + ")");

                        case 4:
                            if (!(type === "cancel")) {
                                _context7.next = 6;
                                break;
                            }

                            return _context7.abrupt("return");

                        case 6:
                            sessionId = data["sessionId"];
                            _context7.next = 9;
                            return decode(type, data["buffer"], data["ch"], data["sps"], data["bps"]);

                        case 9:
                            _ref4 = _context7.sent;
                            buffer = _ref4.buffer;
                            stream = _ref4.stream;
                            retData = _ref4.data;


                            global["postMessage"]({
                                "sessionId": sessionId,
                                "buffer": buffer,
                                "data": retData
                            }, stream ? [] : [buffer]);

                            // stream
                            if (stream) {
                                (function () {

                                    var cancel = function cancel(e) {
                                        var data = e["data"];
                                        if (data["type"] === "cancel" && data["sessionId"] === sessionId) {
                                            subscription["unsubscribe"]();
                                            global["removeEventListener"]("message", cancel);
                                        }
                                    };
                                    global["addEventListener"]("message", cancel);

                                    var subscription = stream.subscribe({
                                        next: function next(streamBuffer) {
                                            global["postMessage"]({
                                                "sessionId": sessionId,
                                                "streamBuffer": streamBuffer,
                                                "done": false
                                            });
                                        },
                                        complete: function complete() {
                                            global["postMessage"]({
                                                "sessionId": sessionId,
                                                "streamBuffer": null,
                                                "done": true
                                            });
                                            global["removeEventListener"]("message", cancel);
                                        }
                                    });
                                })();
                            }

                        case 15:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        return function (_x6) {
            return _ref3.apply(this, arguments);
        };
    }());
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./emDecoder":80,"./memory":82,"./textDecoder":83,"./waitUntilIdle":84,"babel-runtime/helpers/asyncToGenerator":3,"babel-runtime/regenerator":6,"zen-observable":78}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _emDecoder = require("./emDecoder");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Memory = function () {
    function Memory(val) {
        (0, _classCallCheck3.default)(this, Memory);

        var ptr = void 0,
            type = void 0,
            size = void 0;

        if (typeof val === "string") {
            size = (0, _emDecoder.getNativeTypeSize)(val);
            ptr = (0, _emDecoder._malloc)(size);
            type = val;
        } else {
            size = val;
            ptr = (0, _emDecoder._malloc)(size);
            type = "*";
        }

        this.ptr = ptr;
        this.type = type;
    }

    (0, _createClass3.default)(Memory, [{
        key: "release",
        value: function release() {
            (0, _emDecoder._free)(this.ptr);
        }
    }, {
        key: "getValue",
        value: function getValue() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.type;

            var ptr = this.ptr;
            return (0, _emDecoder.getValue)(ptr, type);
        }
    }]);
    return Memory;
}(); // emscripten import method


exports.default = Memory;

},{"./emDecoder":80,"babel-runtime/helpers/classCallCheck":4,"babel-runtime/helpers/createClass":5}],83:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.default = textDecoder;

var _emDecoder = require("./emDecoder");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextDecoder = global.TextDecoder || _emDecoder.ENVIRONMENT === "NODE" && require("text-encoding").TextDecoder;

function textDecoder(arraybuffer) {
	var charset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "shift_jis";

	return new _promise2.default(function (resolve) {
		// Encoding API
		var decoder = new TextDecoder(charset);
		resolve(decoder.decode(arraybuffer));
	}).catch(function () {
		// FileReader API
		return new _promise2.default(function (resolve) {
			var blob = new Blob([arraybuffer], { type: "text/plain;charset=" + charset });
			var reader = new FileReader();
			reader.onload = function () {
				resolve(this.result);
			};
			reader.readAsText(blob, charset);
		});
	});
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./emDecoder":80,"babel-runtime/core-js/promise":2,"text-encoding":7}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.default = waitUntilIdle;

require("requestidlecallback");

var _emDecoder = require("./emDecoder");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENVIRONMENT_IS_WORKER = _emDecoder.ENVIRONMENT === "WORKER";

function waitUntilIdle() {
    return new _promise2.default(function (resolve) {
        if (ENVIRONMENT_IS_WORKER) resolve();

        requestIdleCallback(resolve);
    });
}

},{"./emDecoder":80,"babel-runtime/core-js/promise":2,"requestidlecallback":77}]},{},[81]);
