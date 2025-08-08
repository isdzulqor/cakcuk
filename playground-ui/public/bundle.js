
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
  'use strict';

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }

  function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
  }

  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }

  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }

  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }

  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
  }

  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
  }

  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }

  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), Object.defineProperty(t, "prototype", {
      writable: !1
    }), e && _setPrototypeOf(t, e);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var check = function (it) {
    return it && it.Math === Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var globalThis_1 =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
  });

  var functionBindNative = !fails(function () {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = (function () { /* empty */ }).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var call = Function.prototype.call;
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var functionCall = functionBindNative ? call.bind(call) : function () {
    return call.apply(call, arguments);
  };

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var FunctionPrototype = Function.prototype;
  var call$1 = FunctionPrototype.call;
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var uncurryThisWithBind = functionBindNative && FunctionPrototype.bind.bind(call$1, call$1);

  var functionUncurryThis = functionBindNative ? uncurryThisWithBind : function (fn) {
    return function () {
      return call$1.apply(fn, arguments);
    };
  };

  var toString = functionUncurryThis({}.toString);
  var stringSlice = functionUncurryThis(''.slice);

  var classofRaw = function (it) {
    return stringSlice(toString(it), 8, -1);
  };

  var $Object = Object;
  var split = functionUncurryThis(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) === 'String' ? split(it, '') : $Object(it);
  } : $Object;

  // we can't use just `it == null` since of `document.all` special case
  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
  var isNullOrUndefined = function (it) {
    return it === null || it === undefined;
  };

  var $TypeError = TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
  var documentAll = typeof document == 'object' && document.all;

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
  var isCallable = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
    return typeof argument == 'function' || argument === documentAll;
  } : function (argument) {
    return typeof argument == 'function';
  };

  var isObject = function (it) {
    return typeof it == 'object' ? it !== null : isCallable(it);
  };

  var aFunction = function (argument) {
    return isCallable(argument) ? argument : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(globalThis_1[namespace]) : globalThis_1[namespace] && globalThis_1[namespace][method];
  };

  var objectIsPrototypeOf = functionUncurryThis({}.isPrototypeOf);

  var navigator = globalThis_1.navigator;
  var userAgent = navigator && navigator.userAgent;

  var environmentUserAgent = userAgent ? String(userAgent) : '';

  var process = globalThis_1.process;
  var Deno$1 = globalThis_1.Deno;
  var versions = process && process.versions || Deno$1 && Deno$1.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && environmentUserAgent) {
    match = environmentUserAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = environmentUserAgent.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  var environmentV8Version = version;

  /* eslint-disable es/no-symbol -- required for testing */




  var $String = globalThis_1.String;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails(function () {
    var symbol = Symbol('symbol detection');
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
    // of course, fail.
    return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && environmentV8Version && environmentV8Version < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */


  var useSymbolAsUid = symbolConstructorDetection &&
    !Symbol.sham &&
    typeof Symbol.iterator == 'symbol';

  var $Object$1 = Object;

  var isSymbol = useSymbolAsUid ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn('Symbol');
    return isCallable($Symbol) && objectIsPrototypeOf($Symbol.prototype, $Object$1(it));
  };

  var $String$1 = String;

  var tryToString = function (argument) {
    try {
      return $String$1(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var $TypeError$1 = TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable = function (argument) {
    if (isCallable(argument)) return argument;
    throw new $TypeError$1(tryToString(argument) + ' is not a function');
  };

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod = function (V, P) {
    var func = V[P];
    return isNullOrUndefined(func) ? undefined : aCallable(func);
  };

  var $TypeError$2 = TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = functionCall(fn, input))) return val;
    if (isCallable(fn = input.valueOf) && !isObject(val = functionCall(fn, input))) return val;
    if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = functionCall(fn, input))) return val;
    throw new $TypeError$2("Can't convert object to primitive value");
  };

  var isPure = false;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty = Object.defineProperty;

  var defineGlobalProperty = function (key, value) {
    try {
      defineProperty(globalThis_1, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      globalThis_1[key] = value;
    } return value;
  };

  var sharedStore = createCommonjsModule(function (module) {




  var SHARED = '__core-js_shared__';
  var store = module.exports = globalThis_1[SHARED] || defineGlobalProperty(SHARED, {});

  (store.versions || (store.versions = [])).push({
    version: '3.42.0',
    mode:  'global',
    copyright: '© 2014-2025 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.42.0/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });
  });

  var shared = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value || {});
  };

  var $Object$2 = Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject = function (argument) {
    return $Object$2(requireObjectCoercible(argument));
  };

  var hasOwnProperty = functionUncurryThis({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  // eslint-disable-next-line es/no-object-hasown -- safe
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject(it), key);
  };

  var id = 0;
  var postfix = Math.random();
  var toString$1 = functionUncurryThis(1.0.toString);

  var uid = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$1(++id + postfix, 36);
  };

  var Symbol$1 = globalThis_1.Symbol;
  var WellKnownSymbolsStore = shared('wks');
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function (name) {
    if (!hasOwnProperty_1(WellKnownSymbolsStore, name)) {
      WellKnownSymbolsStore[name] = symbolConstructorDetection && hasOwnProperty_1(Symbol$1, name)
        ? Symbol$1[name]
        : createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore[name];
  };

  var $TypeError$3 = TypeError;
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$1 = function (input, pref) {
    if (!isObject(input) || isSymbol(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = functionCall(exoticToPrim, input, pref);
      if (!isObject(result) || isSymbol(result)) return result;
      throw new $TypeError$3("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$1 = function (argument) {
    var key = toPrimitive$1(argument, 'string');
    return isSymbol(key) ? key : key + '';
  };

  var document$1 = globalThis_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thanks to IE8 for its funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a !== 7;
  });

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$1 = descriptors ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPropertyKey$1(P);
    if (ie8DomDefine) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (hasOwnProperty_1(O, P)) return createPropertyDescriptor(!functionCall(objectPropertyIsEnumerable.f, O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$1
  };

  // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
  var v8PrototypeDefineBug = descriptors && fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () { /* empty */ }, 'prototype', {
      value: 42,
      writable: false
    }).prototype !== 42;
  });

  var $String$2 = String;
  var $TypeError$4 = TypeError;

  // `Assert: Type(argument) is Object`
  var anObject = function (argument) {
    if (isObject(argument)) return argument;
    throw new $TypeError$4($String$2(argument) + ' is not an object');
  };

  var $TypeError$5 = TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE = 'configurable';
  var WRITABLE = 'writable';

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  var f$2 = descriptors ? v8PrototypeDefineBug ? function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey$1(P);
    anObject(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor$1(O, P);
      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    } return $defineProperty(O, P, Attributes);
  } : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey$1(P);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$5('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f$2
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var FunctionPrototype$1 = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = descriptors && Object.getOwnPropertyDescriptor;

  var EXISTS$1 = hasOwnProperty_1(FunctionPrototype$1, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS$1 && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE$1 = EXISTS$1 && (!descriptors || (descriptors && getDescriptor(FunctionPrototype$1, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS$1,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE$1
  };

  var functionToString = functionUncurryThis(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable(sharedStore.inspectSource)) {
    sharedStore.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap$1 = globalThis_1.WeakMap;

  var weakMapBasicDetection = isCallable(WeakMap$1) && /native code/.test(String(WeakMap$1));

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$1 = globalThis_1.TypeError;
  var WeakMap$2 = globalThis_1.WeakMap;
  var set, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw new TypeError$1('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (weakMapBasicDetection || sharedStore.state) {
    var store = sharedStore.state || (sharedStore.state = new WeakMap$2());
    /* eslint-disable no-self-assign -- prototype methods protection */
    store.get = store.get;
    store.has = store.has;
    store.set = store.set;
    /* eslint-enable no-self-assign -- prototype methods protection */
    set = function (it, metadata) {
      if (store.has(it)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      store.set(it, metadata);
      return metadata;
    };
    get = function (it) {
      return store.get(it) || {};
    };
    has = function (it) {
      return store.has(it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      if (hasOwnProperty_1(it, STATE)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return hasOwnProperty_1(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwnProperty_1(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var makeBuiltIn_1 = createCommonjsModule(function (module) {





  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;



  var enforceInternalState = internalState.enforce;
  var getInternalState = internalState.get;
  var $String = String;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty = Object.defineProperty;
  var stringSlice = functionUncurryThis(''.slice);
  var replace = functionUncurryThis(''.replace);
  var join = functionUncurryThis([].join);

  var CONFIGURABLE_LENGTH = descriptors && !fails(function () {
    return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
  });

  var TEMPLATE = String(String).split('String');

  var makeBuiltIn = module.exports = function (value, name, options) {
    if (stringSlice($String(name), 0, 7) === 'Symbol(') {
      name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
    }
    if (options && options.getter) name = 'get ' + name;
    if (options && options.setter) name = 'set ' + name;
    if (!hasOwnProperty_1(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      if (descriptors) defineProperty(value, 'name', { value: name, configurable: true });
      else value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwnProperty_1(options, 'arity') && value.length !== options.arity) {
      defineProperty(value, 'length', { value: options.arity });
    }
    try {
      if (options && hasOwnProperty_1(options, 'constructor') && options.constructor) {
        if (descriptors) defineProperty(value, 'prototype', { writable: false });
      // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
      } else if (value.prototype) value.prototype = undefined;
    } catch (error) { /* empty */ }
    var state = enforceInternalState(value);
    if (!hasOwnProperty_1(state, 'source')) {
      state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
    } return value;
  };

  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  // eslint-disable-next-line no-extend-native -- required
  Function.prototype.toString = makeBuiltIn(function toString() {
    return isCallable(this) && getInternalState(this).source || inspectSource(this);
  }, 'toString');
  });

  var defineBuiltIn = function (O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if (isCallable(value)) makeBuiltIn_1(value, name, options);
    if (options.global) {
      if (simple) O[key] = value;
      else defineGlobalProperty(key, value);
    } else {
      try {
        if (!options.unsafe) delete O[key];
        else if (O[key]) simple = true;
      } catch (error) { /* empty */ }
      if (simple) O[key] = value;
      else objectDefineProperty.f(O, key, {
        value: value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable
      });
    } return O;
  };

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `Math.trunc` method
  // https://tc39.es/ecma262/#sec-math.trunc
  // eslint-disable-next-line es/no-math-trunc -- safe
  var mathTrunc = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? floor : ceil)(n);
  };

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : mathTrunc(number);
  };

  var max = Math.max;
  var min = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toIntegerOrInfinity(index);
    return integer < 0 ? max(integer + length, 0) : min(integer, length);
  };

  var min$1 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength = function (argument) {
    var len = toIntegerOrInfinity(argument);
    return len > 0 ? min$1(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike = function (obj) {
    return toLength(obj.length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = lengthOfArrayLike(O);
      if (length === 0) return !IS_INCLUDES && -1;
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el !== el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value !== value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
  };

  var indexOf = arrayIncludes.indexOf;


  var push = functionUncurryThis([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwnProperty_1(hiddenKeys, key) && hasOwnProperty_1(O, key) && push(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwnProperty_1(O, key = names[i++])) {
      ~indexOf(result, key) || push(result, key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$4
  };

  var concat = functionUncurryThis([].concat);

  // all object keys, includes non-enumerable and symbols
  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwnProperty_1(target, key) && !(exceptions && hasOwnProperty_1(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value === POLYFILL ? true
      : value === NATIVE ? false
      : isCallable(detection) ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






  /*
    options.target         - name of the target object
    options.global         - target is the global object
    options.stat           - export as static methods of target
    options.proto          - export as prototype methods of target
    options.real           - real prototype method for the `pure` version
    options.forced         - export even if the native feature is available
    options.bind           - bind methods to the target, required for the `pure` version
    options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe         - use the simple assignment of property instead of delete + defineProperty
    options.sham           - add a flag to not completely full polyfills
    options.enumerable     - export as enumerable property
    options.dontCallGetSet - prevent calling a getter on target
    options.name           - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = globalThis_1;
    } else if (STATIC) {
      target = globalThis_1[TARGET] || defineGlobalProperty(TARGET, {});
    } else {
      target = globalThis_1[TARGET] && globalThis_1[TARGET].prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      }
      defineBuiltIn(target, key, sourceProperty, options);
    }
  };

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray = Array.isArray || function isArray(argument) {
    return classofRaw(argument) === 'Array';
  };

  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  var test = {};

  test[TO_STRING_TAG] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  var $Object$3 = Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = toStringTagSupport ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = $Object$3(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
  };

  var noop = function () { /* empty */ };
  var construct = getBuiltIn('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec = functionUncurryThis(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable(argument)) return false;
    try {
      construct(noop, [], argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable(argument)) return false;
    switch (classof(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
    }
    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
    } catch (error) {
      return true;
    }
  };

  isConstructorLegacy.sham = true;

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor = !construct || fails(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var createProperty = function (object, key, value) {
    if (descriptors) objectDefineProperty.f(object, key, createPropertyDescriptor(0, value));
    else object[key] = value;
  };

  var SPECIES = wellKnownSymbol('species');

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return environmentV8Version >= 51 || !fails(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var arraySlice = functionUncurryThis([].slice);

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

  var SPECIES$1 = wellKnownSymbol('species');
  var $Array = Array;
  var max$1 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = lengthOfArrayLike(O);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (isConstructor(Constructor) && (Constructor === $Array || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES$1];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === $Array || Constructor === undefined) {
          return arraySlice(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? $Array : Constructor)(max$1(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var defineBuiltInAccessor = function (target, name, descriptor) {
    if (descriptor.get) makeBuiltIn_1(descriptor.get, name, { getter: true });
    if (descriptor.set) makeBuiltIn_1(descriptor.set, name, { setter: true });
    return objectDefineProperty.f(target, name, descriptor);
  };

  var FUNCTION_NAME_EXISTS = functionName.EXISTS;



  var FunctionPrototype$2 = Function.prototype;
  var functionToString$1 = functionUncurryThis(FunctionPrototype$2.toString);
  var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
  var regExpExec = functionUncurryThis(nameRE.exec);
  var NAME = 'name';

  // Function instances `.name` property
  // https://tc39.es/ecma262/#sec-function-instances-name
  if (descriptors && !FUNCTION_NAME_EXISTS) {
    defineBuiltInAccessor(FunctionPrototype$2, NAME, {
      configurable: true,
      get: function () {
        try {
          return regExpExec(nameRE, functionToString$1(this))[1];
        } catch (error) {
          return '';
        }
      }
    });
  }

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
    keys: function keys(it) {
      return objectKeys(toObject(it));
    }
  });

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = toStringTagSupport ? {}.toString : function toString() {
    return '[object ' + classof(this) + ']';
  };

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!toStringTagSupport) {
    defineBuiltIn(Object.prototype, 'toString', objectToString, { unsafe: true });
  }

  var FunctionPrototype$3 = Function.prototype;
  var apply = FunctionPrototype$3.apply;
  var call$2 = FunctionPrototype$3.call;

  // eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (functionBindNative ? call$2.bind(apply) : function () {
    return call$2.apply(apply, arguments);
  });

  var $Function = Function;
  var concat$1 = functionUncurryThis([].concat);
  var join = functionUncurryThis([].join);
  var factories = {};

  var construct$1 = function (C, argsLength, args) {
    if (!hasOwnProperty_1(factories, argsLength)) {
      var list = [];
      var i = 0;
      for (; i < argsLength; i++) list[i] = 'a[' + i + ']';
      factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')');
    } return factories[argsLength](C, args);
  };

  // `Function.prototype.bind` method implementation
  // https://tc39.es/ecma262/#sec-function.prototype.bind
  // eslint-disable-next-line es/no-function-prototype-bind -- detection
  var functionBind = functionBindNative ? $Function.bind : function bind(that /* , ...args */) {
    var F = aCallable(this);
    var Prototype = F.prototype;
    var partArgs = arraySlice(arguments, 1);
    var boundFunction = function bound(/* args... */) {
      var args = concat$1(partArgs, arraySlice(arguments));
      return this instanceof boundFunction ? construct$1(F, args.length, args) : F.apply(that, args);
    };
    if (isObject(Prototype)) boundFunction.prototype = Prototype;
    return boundFunction;
  };

  var $TypeError$6 = TypeError;

  // `Assert: IsConstructor(argument) is true`
  var aConstructor = function (argument) {
    if (isConstructor(argument)) return argument;
    throw new $TypeError$6(tryToString(argument) + ' is not a constructor');
  };

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var f$5 = descriptors && !v8PrototypeDefineBug ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var props = toIndexedObject(Properties);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty.f(O, key = keys[index++], props[key]);
    return O;
  };

  var objectDefineProperties = {
  	f: f$5
  };

  var html = getBuiltIn('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */








  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO = sharedKey('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    // eslint-disable-next-line no-useless-assignment -- avoid memory leak
    activeXDocument = null;
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  // eslint-disable-next-line es/no-object-create -- safe
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : objectDefineProperties.f(result, Properties);
  };

  var nativeConstruct = getBuiltIn('Reflect', 'construct');
  var ObjectPrototype = Object.prototype;
  var push$1 = [].push;

  // `Reflect.construct` method
  // https://tc39.es/ecma262/#sec-reflect.construct
  // MS Edge supports only 2 arguments and argumentsList argument is optional
  // FF Nightly sets third argument as `new.target`, but does not create `this` from it
  var NEW_TARGET_BUG = fails(function () {
    function F() { /* empty */ }
    return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
  });

  var ARGS_BUG = !fails(function () {
    nativeConstruct(function () { /* empty */ });
  });

  var FORCED = NEW_TARGET_BUG || ARGS_BUG;

  _export({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
    construct: function construct(Target, args /* , newTarget */) {
      aConstructor(Target);
      anObject(args);
      var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2]);
      if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
      if (Target === newTarget) {
        // w/o altered newTarget, optimization for 0-4 arguments
        switch (args.length) {
          case 0: return new Target();
          case 1: return new Target(args[0]);
          case 2: return new Target(args[0], args[1]);
          case 3: return new Target(args[0], args[1], args[2]);
          case 4: return new Target(args[0], args[1], args[2], args[3]);
        }
        // w/o altered newTarget, lot of arguments case
        var $args = [null];
        functionApply(push$1, $args, args);
        return new (functionApply(functionBind, Target, $args))();
      }
      // with altered newTarget, not support built-in constructors
      var proto = newTarget.prototype;
      var instance = objectCreate(isObject(proto) ? proto : ObjectPrototype);
      var result = functionApply(Target, instance, args);
      return isObject(result) ? result : instance;
    }
  });

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`


  var classList = documentCreateElement('span').classList;
  var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

  var domTokenListPrototype = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;

  var functionUncurryThisClause = function (fn) {
    // Nashorn bug:
    //   https://github.com/zloirock/core-js/issues/1128
    //   https://github.com/zloirock/core-js/issues/1130
    if (classofRaw(fn) === 'Function') return functionUncurryThis(fn);
  };

  var bind = functionUncurryThisClause(functionUncurryThisClause.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable(fn);
    return that === undefined ? fn : functionBindNative ? bind(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var SPECIES$2 = wellKnownSymbol('species');
  var $Array$1 = Array;

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor = function (originalArray) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor(C) && (C === $Array$1 || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES$2];
        if (C === null) C = undefined;
      }
    } return C === undefined ? $Array$1 : C;
  };

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var push$2 = functionUncurryThis([].push);

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod$1 = function (TYPE) {
    var IS_MAP = TYPE === 1;
    var IS_FILTER = TYPE === 2;
    var IS_SOME = TYPE === 3;
    var IS_EVERY = TYPE === 4;
    var IS_FIND_INDEX = TYPE === 6;
    var IS_FILTER_REJECT = TYPE === 7;
    var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var length = lengthOfArrayLike(self);
      var boundFunction = functionBindContext(callbackfn, that);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push$2(target, value);      // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push$2(target, value);      // filterReject
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$1(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$1(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$1(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$1(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$1(7)
  };

  var arrayMethodIsStrict = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails(function () {
      // eslint-disable-next-line no-useless-call -- required for testing
      method.call(null, argument || function () { return 1; }, 1);
    });
  };

  var $forEach = arrayIteration.forEach;


  var STRICT_METHOD = arrayMethodIsStrict('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach;

  var handlePrototype = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
      createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
    } catch (error) {
      CollectionPrototype.forEach = arrayForEach;
    }
  };

  for (var COLLECTION_NAME in domIterables) {
    if (domIterables[COLLECTION_NAME]) {
      handlePrototype(globalThis_1[COLLECTION_NAME] && globalThis_1[COLLECTION_NAME].prototype);
    }
  }

  handlePrototype(domTokenListPrototype);

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }

  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }

  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }

  function _superPropBase(t, o) {
    for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)););
    return t;
  }

  function _get() {
    return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
      var p = _superPropBase(e, t);
      if (p) {
        var n = Object.getOwnPropertyDescriptor(p, t);
        return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
      }
    }, _get.apply(null, arguments);
  }

  var $String$3 = String;

  var toString_1 = function (argument) {
    if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
    return $String$3(argument);
  };

  /* eslint-disable es/no-object-getownpropertynames -- safe */


  var $getOwnPropertyNames = objectGetOwnPropertyNames.f;


  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return $getOwnPropertyNames(it);
    } catch (error) {
      return arraySlice(windowNames);
    }
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  var f$6 = function getOwnPropertyNames(it) {
    return windowNames && classofRaw(it) === 'Window'
      ? getWindowNames(it)
      : $getOwnPropertyNames(toIndexedObject(it));
  };

  var objectGetOwnPropertyNamesExternal = {
  	f: f$6
  };

  var f$7 = wellKnownSymbol;

  var wellKnownSymbolWrapped = {
  	f: f$7
  };

  var path = globalThis_1;

  var defineProperty$1 = objectDefineProperty.f;

  var wellKnownSymbolDefine = function (NAME) {
    var Symbol = path.Symbol || (path.Symbol = {});
    if (!hasOwnProperty_1(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
      value: wellKnownSymbolWrapped.f(NAME)
    });
  };

  var symbolDefineToPrimitive = function () {
    var Symbol = getBuiltIn('Symbol');
    var SymbolPrototype = Symbol && Symbol.prototype;
    var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
    var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

    if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
      // `Symbol.prototype[@@toPrimitive]` method
      // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
      // eslint-disable-next-line no-unused-vars -- required for .length
      defineBuiltIn(SymbolPrototype, TO_PRIMITIVE, function (hint) {
        return functionCall(valueOf, this);
      }, { arity: 1 });
    }
  };

  var defineProperty$2 = objectDefineProperty.f;



  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

  var setToStringTag = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;
    if (target && !hasOwnProperty_1(target, TO_STRING_TAG$2)) {
      defineProperty$2(target, TO_STRING_TAG$2, { configurable: true, value: TAG });
    }
  };

  var $forEach$1 = arrayIteration.forEach;

  var HIDDEN = sharedKey('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE$1 = 'prototype';

  var setInternalState = internalState.set;
  var getInternalState = internalState.getterFor(SYMBOL);

  var ObjectPrototype$1 = Object[PROTOTYPE$1];
  var $Symbol = globalThis_1.Symbol;
  var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE$1];
  var RangeError$1 = globalThis_1.RangeError;
  var TypeError$2 = globalThis_1.TypeError;
  var QObject = globalThis_1.QObject;
  var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var nativeDefineProperty = objectDefineProperty.f;
  var nativeGetOwnPropertyNames = objectGetOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = objectPropertyIsEnumerable.f;
  var push$3 = functionUncurryThis([].push);

  var AllSymbols = shared('symbols');
  var ObjectPrototypeSymbols = shared('op-symbols');
  var WellKnownSymbolsStore$1 = shared('wks');

  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var fallbackDefineProperty = function (O, P, Attributes) {
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype$1, P);
    if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
    nativeDefineProperty(O, P, Attributes);
    if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
      nativeDefineProperty(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
    }
  };

  var setSymbolDescriptor = descriptors && fails(function () {
    return objectCreate(nativeDefineProperty({}, 'a', {
      get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
    })).a !== 7;
  }) ? fallbackDefineProperty : nativeDefineProperty;

  var wrap = function (tag, description) {
    var symbol = AllSymbols[tag] = objectCreate(SymbolPrototype);
    setInternalState(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!descriptors) symbol.description = description;
    return symbol;
  };

  var $defineProperty$1 = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype$1) $defineProperty$1(ObjectPrototypeSymbols, P, Attributes);
    anObject(O);
    var key = toPropertyKey$1(P);
    anObject(Attributes);
    if (hasOwnProperty_1(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!hasOwnProperty_1(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, objectCreate(null)));
        O[HIDDEN][key] = true;
      } else {
        if (hasOwnProperty_1(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
      } return setSymbolDescriptor(O, key, Attributes);
    } return nativeDefineProperty(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject(O);
    var properties = toIndexedObject(Properties);
    var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach$1(keys, function (key) {
      if (!descriptors || functionCall($propertyIsEnumerable$1, properties, key)) $defineProperty$1(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
  };

  var $propertyIsEnumerable$1 = function propertyIsEnumerable(V) {
    var P = toPropertyKey$1(V);
    var enumerable = functionCall(nativePropertyIsEnumerable, this, P);
    if (this === ObjectPrototype$1 && hasOwnProperty_1(AllSymbols, P) && !hasOwnProperty_1(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !hasOwnProperty_1(this, P) || !hasOwnProperty_1(AllSymbols, P) || hasOwnProperty_1(this, HIDDEN) && this[HIDDEN][P]
      ? enumerable : true;
  };

  var $getOwnPropertyDescriptor$2 = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject(O);
    var key = toPropertyKey$1(P);
    if (it === ObjectPrototype$1 && hasOwnProperty_1(AllSymbols, key) && !hasOwnProperty_1(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor(it, key);
    if (descriptor && hasOwnProperty_1(AllSymbols, key) && !(hasOwnProperty_1(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };

  var $getOwnPropertyNames$1 = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject(O));
    var result = [];
    $forEach$1(names, function (key) {
      if (!hasOwnProperty_1(AllSymbols, key) && !hasOwnProperty_1(hiddenKeys, key)) push$3(result, key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function (O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
    var result = [];
    $forEach$1(names, function (key) {
      if (hasOwnProperty_1(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwnProperty_1(ObjectPrototype$1, key))) {
        push$3(result, AllSymbols[key]);
      }
    });
    return result;
  };

  // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor
  if (!symbolConstructorDetection) {
    $Symbol = function Symbol() {
      if (objectIsPrototypeOf(SymbolPrototype, this)) throw new TypeError$2('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : toString_1(arguments[0]);
      var tag = uid(description);
      var setter = function (value) {
        var $this = this === undefined ? globalThis_1 : this;
        if ($this === ObjectPrototype$1) functionCall(setter, ObjectPrototypeSymbols, value);
        if (hasOwnProperty_1($this, HIDDEN) && hasOwnProperty_1($this[HIDDEN], tag)) $this[HIDDEN][tag] = false;
        var descriptor = createPropertyDescriptor(1, value);
        try {
          setSymbolDescriptor($this, tag, descriptor);
        } catch (error) {
          if (!(error instanceof RangeError$1)) throw error;
          fallbackDefineProperty($this, tag, descriptor);
        }
      };
      if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
      return wrap(tag, description);
    };

    SymbolPrototype = $Symbol[PROTOTYPE$1];

    defineBuiltIn(SymbolPrototype, 'toString', function toString() {
      return getInternalState(this).tag;
    });

    defineBuiltIn($Symbol, 'withoutSetter', function (description) {
      return wrap(uid(description), description);
    });

    objectPropertyIsEnumerable.f = $propertyIsEnumerable$1;
    objectDefineProperty.f = $defineProperty$1;
    objectDefineProperties.f = $defineProperties;
    objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor$2;
    objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames$1;
    objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

    wellKnownSymbolWrapped.f = function (name) {
      return wrap(wellKnownSymbol(name), name);
    };

    if (descriptors) {
      // https://github.com/tc39/proposal-Symbol-description
      defineBuiltInAccessor(SymbolPrototype, 'description', {
        configurable: true,
        get: function description() {
          return getInternalState(this).description;
        }
      });
      {
        defineBuiltIn(ObjectPrototype$1, 'propertyIsEnumerable', $propertyIsEnumerable$1, { unsafe: true });
      }
    }
  }

  _export({ global: true, constructor: true, wrap: true, forced: !symbolConstructorDetection, sham: !symbolConstructorDetection }, {
    Symbol: $Symbol
  });

  $forEach$1(objectKeys(WellKnownSymbolsStore$1), function (name) {
    wellKnownSymbolDefine(name);
  });

  _export({ target: SYMBOL, stat: true, forced: !symbolConstructorDetection }, {
    useSetter: function () { USE_SETTER = true; },
    useSimple: function () { USE_SETTER = false; }
  });

  _export({ target: 'Object', stat: true, forced: !symbolConstructorDetection, sham: !descriptors }, {
    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    create: $create,
    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    defineProperty: $defineProperty$1,
    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    defineProperties: $defineProperties,
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor$2
  });

  _export({ target: 'Object', stat: true, forced: !symbolConstructorDetection }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames$1
  });

  // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
  symbolDefineToPrimitive();

  // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
  setToStringTag($Symbol, SYMBOL);

  hiddenKeys[HIDDEN] = true;

  /* eslint-disable es/no-symbol -- safe */
  var symbolRegistryDetection = symbolConstructorDetection && !!Symbol['for'] && !!Symbol.keyFor;

  var StringToSymbolRegistry = shared('string-to-symbol-registry');
  var SymbolToStringRegistry = shared('symbol-to-string-registry');

  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  _export({ target: 'Symbol', stat: true, forced: !symbolRegistryDetection }, {
    'for': function (key) {
      var string = toString_1(key);
      if (hasOwnProperty_1(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = getBuiltIn('Symbol')(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    }
  });

  var SymbolToStringRegistry$1 = shared('symbol-to-string-registry');

  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  _export({ target: 'Symbol', stat: true, forced: !symbolRegistryDetection }, {
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw new TypeError(tryToString(sym) + ' is not a symbol');
      if (hasOwnProperty_1(SymbolToStringRegistry$1, sym)) return SymbolToStringRegistry$1[sym];
    }
  });

  var push$4 = functionUncurryThis([].push);

  var getJsonReplacerFunction = function (replacer) {
    if (isCallable(replacer)) return replacer;
    if (!isArray(replacer)) return;
    var rawLength = replacer.length;
    var keys = [];
    for (var i = 0; i < rawLength; i++) {
      var element = replacer[i];
      if (typeof element == 'string') push$4(keys, element);
      else if (typeof element == 'number' || classofRaw(element) === 'Number' || classofRaw(element) === 'String') push$4(keys, toString_1(element));
    }
    var keysLength = keys.length;
    var root = true;
    return function (key, value) {
      if (root) {
        root = false;
        return value;
      }
      if (isArray(this)) return value;
      for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
    };
  };

  var $String$4 = String;
  var $stringify = getBuiltIn('JSON', 'stringify');
  var exec$1 = functionUncurryThis(/./.exec);
  var charAt = functionUncurryThis(''.charAt);
  var charCodeAt = functionUncurryThis(''.charCodeAt);
  var replace = functionUncurryThis(''.replace);
  var numberToString = functionUncurryThis(1.0.toString);

  var tester = /[\uD800-\uDFFF]/g;
  var low = /^[\uD800-\uDBFF]$/;
  var hi = /^[\uDC00-\uDFFF]$/;

  var WRONG_SYMBOLS_CONVERSION = !symbolConstructorDetection || fails(function () {
    var symbol = getBuiltIn('Symbol')('stringify detection');
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) !== '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) !== '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) !== '{}';
  });

  // https://github.com/tc39/proposal-well-formed-stringify
  var ILL_FORMED_UNICODE = fails(function () {
    return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
      || $stringify('\uDEAD') !== '"\\udead"';
  });

  var stringifyWithSymbolsFix = function (it, replacer) {
    var args = arraySlice(arguments);
    var $replacer = getJsonReplacerFunction(replacer);
    if (!isCallable($replacer) && (it === undefined || isSymbol(it))) return; // IE8 returns string on undefined
    args[1] = function (key, value) {
      // some old implementations (like WebKit) could pass numbers as keys
      if (isCallable($replacer)) value = functionCall($replacer, this, $String$4(key), value);
      if (!isSymbol(value)) return value;
    };
    return functionApply($stringify, null, args);
  };

  var fixIllFormed = function (match, offset, string) {
    var prev = charAt(string, offset - 1);
    var next = charAt(string, offset + 1);
    if ((exec$1(low, match) && !exec$1(hi, next)) || (exec$1(hi, match) && !exec$1(low, prev))) {
      return '\\u' + numberToString(charCodeAt(match, 0), 16);
    } return match;
  };

  if ($stringify) {
    // `JSON.stringify` method
    // https://tc39.es/ecma262/#sec-json.stringify
    _export({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        var args = arraySlice(arguments);
        var result = functionApply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
        return ILL_FORMED_UNICODE && typeof result == 'string' ? replace(result, tester, fixIllFormed) : result;
      }
    });
  }

  // V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  var FORCED$1 = !symbolConstructorDetection || fails(function () { objectGetOwnPropertySymbols.f(1); });

  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  _export({ target: 'Object', stat: true, forced: FORCED$1 }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      var $getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
      return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject(it)) : [];
    }
  });

  var NativeSymbol = globalThis_1.Symbol;
  var SymbolPrototype$1 = NativeSymbol && NativeSymbol.prototype;

  if (descriptors && isCallable(NativeSymbol) && (!('description' in SymbolPrototype$1) ||
    // Safari 12 bug
    NativeSymbol().description !== undefined
  )) {
    var EmptyStringDescriptionStore = {};
    // wrap Symbol constructor for correct work with undefined description
    var SymbolWrapper = function Symbol() {
      var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString_1(arguments[0]);
      var result = objectIsPrototypeOf(SymbolPrototype$1, this)
        // eslint-disable-next-line sonarjs/inconsistent-function-call -- ok
        ? new NativeSymbol(description)
        // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
        : description === undefined ? NativeSymbol() : NativeSymbol(description);
      if (description === '') EmptyStringDescriptionStore[result] = true;
      return result;
    };

    copyConstructorProperties(SymbolWrapper, NativeSymbol);
    SymbolWrapper.prototype = SymbolPrototype$1;
    SymbolPrototype$1.constructor = SymbolWrapper;

    var NATIVE_SYMBOL = String(NativeSymbol('description detection')) === 'Symbol(description detection)';
    var thisSymbolValue = functionUncurryThis(SymbolPrototype$1.valueOf);
    var symbolDescriptiveString = functionUncurryThis(SymbolPrototype$1.toString);
    var regexp = /^Symbol\((.*)\)[^)]+$/;
    var replace$1 = functionUncurryThis(''.replace);
    var stringSlice$1 = functionUncurryThis(''.slice);

    defineBuiltInAccessor(SymbolPrototype$1, 'description', {
      configurable: true,
      get: function description() {
        var symbol = thisSymbolValue(this);
        if (hasOwnProperty_1(EmptyStringDescriptionStore, symbol)) return '';
        var string = symbolDescriptiveString(symbol);
        var desc = NATIVE_SYMBOL ? stringSlice$1(string, 7, -1) : replace$1(string, regexp, '$1');
        return desc === '' ? undefined : desc;
      }
    });

    _export({ global: true, constructor: true, forced: true }, {
      Symbol: SymbolWrapper
    });
  }

  // `Symbol.iterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.iterator
  wellKnownSymbolDefine('iterator');

  var $TypeError$7 = TypeError;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

  var doesNotExceedSafeInteger = function (it) {
    if (it > MAX_SAFE_INTEGER) throw $TypeError$7('Maximum allowed index exceeded');
    return it;
  };

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = environmentV8Version >= 51 || !fails(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport('concat');

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  _export({ target: 'Array', proto: true, arity: 1, forced: FORCED$2 }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike(E);
          doesNotExceedSafeInteger(n + len);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          doesNotExceedSafeInteger(n + 1);
          createProperty(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  // `Array.prototype.fill` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.fill
  var arrayFill = function fill(value /* , start = 0, end = @length */) {
    var O = toObject(this);
    var length = lengthOfArrayLike(O);
    var argumentsLength = arguments.length;
    var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
    var end = argumentsLength > 2 ? arguments[2] : undefined;
    var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
    while (endPos > index) O[index++] = value;
    return O;
  };

  var defineProperty$3 = objectDefineProperty.f;

  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] === undefined) {
    defineProperty$3(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: objectCreate(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  // `Array.prototype.fill` method
  // https://tc39.es/ecma262/#sec-array.prototype.fill
  _export({ target: 'Array', proto: true }, {
    fill: arrayFill
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('fill');

  var $filter = arrayIteration.filter;


  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('filter');

  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var iteratorClose = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject(iterator);
    try {
      innerResult = getMethod(iterator, 'return');
      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }
      innerResult = functionCall(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject(innerResult);
    return value;
  };

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
  };

  var iterators = {};

  var ITERATOR = wellKnownSymbol('iterator');
  var ArrayPrototype$1 = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR] === it);
  };

  var ITERATOR$1 = wellKnownSymbol('iterator');

  var getIteratorMethod = function (it) {
    if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR$1)
      || getMethod(it, '@@iterator')
      || iterators[classof(it)];
  };

  var $TypeError$8 = TypeError;

  var getIterator = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
    if (aCallable(iteratorMethod)) return anObject(functionCall(iteratorMethod, argument));
    throw new $TypeError$8(tryToString(argument) + ' is not iterable');
  };

  var $Array$2 = Array;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var IS_CONSTRUCTOR = isConstructor(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
    var iteratorMethod = getIteratorMethod(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod && !(this === $Array$2 && isArrayIteratorMethod(iteratorMethod))) {
      result = IS_CONSTRUCTOR ? new this() : [];
      iterator = getIterator(O, iteratorMethod);
      next = iterator.next;
      for (;!(step = functionCall(next, iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty(result, index, value);
      }
    } else {
      length = lengthOfArrayLike(O);
      result = IS_CONSTRUCTOR ? new this(length) : $Array$2(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var ITERATOR$2 = wellKnownSymbol('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$2] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    try {
      if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    } catch (error) { return false; } // workaround of old WebKit + `eval` bug
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$2] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  _export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: arrayFrom
  });

  var correctPrototypeGetter = !fails(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO$1 = sharedKey('IE_PROTO');
  var $Object$4 = Object;
  var ObjectPrototype$2 = $Object$4.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = correctPrototypeGetter ? $Object$4.getPrototypeOf : function (O) {
    var object = toObject(O);
    if (hasOwnProperty_1(object, IE_PROTO$1)) return object[IE_PROTO$1];
    var constructor = object.constructor;
    if (isCallable(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof $Object$4 ? ObjectPrototype$2 : null;
  };

  var ITERATOR$3 = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype[ITERATOR$3].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable(IteratorPrototype[ITERATOR$3])) {
    defineBuiltIn(IteratorPrototype, ITERATOR$3, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





  var returnThis = function () { return this; };

  var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
    iterators[TO_STRING_TAG] = returnThis;
    return IteratorConstructor;
  };

  var functionUncurryThisAccessor = function (object, key, method) {
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      return functionUncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
    } catch (error) { /* empty */ }
  };

  var isPossiblePrototype = function (argument) {
    return isObject(argument) || argument === null;
  };

  var $String$5 = String;
  var $TypeError$9 = TypeError;

  var aPossiblePrototype = function (argument) {
    if (isPossiblePrototype(argument)) return argument;
    throw new $TypeError$9("Can't set " + $String$5(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */





  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      setter = functionUncurryThisAccessor(Object.prototype, '__proto__', 'set');
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      requireObjectCoercible(O);
      aPossiblePrototype(proto);
      if (!isObject(O)) return O;
      if (CORRECT_SETTER) setter(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var PROPER_FUNCTION_NAME = functionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
  var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$4 = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis$1 = function () { return this; };

  var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    iteratorCreateConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS$1 && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      }

      return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$4]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
          if (objectSetPrototypeOf) {
            objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
          } else if (!isCallable(CurrentIteratorPrototype[ITERATOR$4])) {
            defineBuiltIn(CurrentIteratorPrototype, ITERATOR$4, returnThis$1);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if ( CONFIGURABLE_FUNCTION_NAME) {
        createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return functionCall(nativeIterator, this); };
      }
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
        }
      } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if ( IterablePrototype[ITERATOR$4] !== defaultIterator) {
      defineBuiltIn(IterablePrototype, ITERATOR$4, defaultIterator, { name: DEFAULT });
    }
    iterators[NAME] = defaultIterator;

    return methods;
  };

  // `CreateIterResultObject` abstract operation
  // https://tc39.es/ecma262/#sec-createiterresultobject
  var createIterResultObject = function (value, done) {
    return { value: value, done: done };
  };

  var defineProperty$4 = objectDefineProperty.f;





  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$1 = internalState.set;
  var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  var es_array_iterator = iteratorDefine(Array, 'Array', function (iterated, kind) {
    setInternalState$1(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated), // target
      index: 0,                          // next index
      kind: kind                         // kind
    });
  // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$1(this);
    var target = state.target;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = null;
      return createIterResultObject(undefined, true);
    }
    switch (state.kind) {
      case 'keys': return createIterResultObject(index, false);
      case 'values': return createIterResultObject(target[index], false);
    } return createIterResultObject([index, target[index]], false);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  var values = iterators.Arguments = iterators.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  // V8 ~ Chrome 45- bug
  if ( descriptors && values.name !== 'values') try {
    defineProperty$4(values, 'name', { value: 'values' });
  } catch (error) { /* empty */ }

  var nativeJoin = functionUncurryThis([].join);

  var ES3_STRINGS = indexedObject !== Object;
  var FORCED$3 = ES3_STRINGS || !arrayMethodIsStrict('join', ',');

  // `Array.prototype.join` method
  // https://tc39.es/ecma262/#sec-array.prototype.join
  _export({ target: 'Array', proto: true, forced: FORCED$3 }, {
    join: function join(separator) {
      return nativeJoin(toIndexedObject(this), separator === undefined ? ',' : separator);
    }
  });

  var $map = arrayIteration.map;


  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var $TypeError$a = TypeError;

  var deletePropertyOrThrow = function (O, P) {
    if (!delete O[P]) throw new $TypeError$a('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
  };

  var floor$1 = Math.floor;

  var sort = function (array, comparefn) {
    var length = array.length;

    if (length < 8) {
      // insertion sort
      var i = 1;
      var element, j;

      while (i < length) {
        j = i;
        element = array[i];
        while (j && comparefn(array[j - 1], element) > 0) {
          array[j] = array[--j];
        }
        if (j !== i++) array[j] = element;
      }
    } else {
      // merge sort
      var middle = floor$1(length / 2);
      var left = sort(arraySlice(array, 0, middle), comparefn);
      var right = sort(arraySlice(array, middle), comparefn);
      var llength = left.length;
      var rlength = right.length;
      var lindex = 0;
      var rindex = 0;

      while (lindex < llength || rindex < rlength) {
        array[lindex + rindex] = (lindex < llength && rindex < rlength)
          ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
          : lindex < llength ? left[lindex++] : right[rindex++];
      }
    }

    return array;
  };

  var arraySort = sort;

  var firefox = environmentUserAgent.match(/firefox\/(\d+)/i);

  var environmentFfVersion = !!firefox && +firefox[1];

  var environmentIsIeOrEdge = /MSIE|Trident/.test(environmentUserAgent);

  var webkit = environmentUserAgent.match(/AppleWebKit\/(\d+)\./);

  var environmentWebkitVersion = !!webkit && +webkit[1];

  var test$1 = [];
  var nativeSort = functionUncurryThis(test$1.sort);
  var push$5 = functionUncurryThis(test$1.push);

  // IE8-
  var FAILS_ON_UNDEFINED = fails(function () {
    test$1.sort(undefined);
  });
  // V8 bug
  var FAILS_ON_NULL = fails(function () {
    test$1.sort(null);
  });
  // Old WebKit
  var STRICT_METHOD$1 = arrayMethodIsStrict('sort');

  var STABLE_SORT = !fails(function () {
    // feature detection can be too slow, so check engines versions
    if (environmentV8Version) return environmentV8Version < 70;
    if (environmentFfVersion && environmentFfVersion > 3) return;
    if (environmentIsIeOrEdge) return true;
    if (environmentWebkitVersion) return environmentWebkitVersion < 603;

    var result = '';
    var code, chr, value, index;

    // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
    for (code = 65; code < 76; code++) {
      chr = String.fromCharCode(code);

      switch (code) {
        case 66: case 69: case 70: case 72: value = 3; break;
        case 68: case 71: value = 4; break;
        default: value = 2;
      }

      for (index = 0; index < 47; index++) {
        test$1.push({ k: chr + index, v: value });
      }
    }

    test$1.sort(function (a, b) { return b.v - a.v; });

    for (index = 0; index < test$1.length; index++) {
      chr = test$1[index].k.charAt(0);
      if (result.charAt(result.length - 1) !== chr) result += chr;
    }

    return result !== 'DGBEFHACIJK';
  });

  var FORCED$4 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$1 || !STABLE_SORT;

  var getSortCompare = function (comparefn) {
    return function (x, y) {
      if (y === undefined) return -1;
      if (x === undefined) return 1;
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      return toString_1(x) > toString_1(y) ? 1 : -1;
    };
  };

  // `Array.prototype.sort` method
  // https://tc39.es/ecma262/#sec-array.prototype.sort
  _export({ target: 'Array', proto: true, forced: FORCED$4 }, {
    sort: function sort(comparefn) {
      if (comparefn !== undefined) aCallable(comparefn);

      var array = toObject(this);

      if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

      var items = [];
      var arrayLength = lengthOfArrayLike(array);
      var itemsLength, index;

      for (index = 0; index < arrayLength; index++) {
        if (index in array) push$5(items, array[index]);
      }

      arraySort(items, getSortCompare(comparefn));

      itemsLength = lengthOfArrayLike(items);
      index = 0;

      while (index < itemsLength) array[index] = items[index++];
      while (index < arrayLength) deletePropertyOrThrow(array, index++);

      return array;
    }
  });

  var $TypeError$b = TypeError;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // Safari < 13 does not throw an error in this case
  var SILENT_ON_NON_WRITABLE_LENGTH_SET = descriptors && !function () {
    // makes no sense without proper strict mode support
    if (this !== undefined) return true;
    try {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty([], 'length', { writable: false }).length = 1;
    } catch (error) {
      return error instanceof TypeError;
    }
  }();

  var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
    if (isArray(O) && !getOwnPropertyDescriptor$2(O, 'length').writable) {
      throw new $TypeError$b('Cannot set read only .length');
    } return O.length = length;
  } : function (O, length) {
    return O.length = length;
  };

  var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('splice');

  var max$2 = Math.max;
  var min$2 = Math.min;

  // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
    splice: function splice(start, deleteCount /* , ...items */) {
      var O = toObject(this);
      var len = lengthOfArrayLike(O);
      var actualStart = toAbsoluteIndex(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from, to;
      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min$2(max$2(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
      }
      doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
      A = arraySpeciesCreate(O, actualDeleteCount);
      for (k = 0; k < actualDeleteCount; k++) {
        from = actualStart + k;
        if (from in O) createProperty(A, k, O[from]);
      }
      A.length = actualDeleteCount;
      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from = k + actualDeleteCount;
          to = k + insertCount;
          if (from in O) O[to] = O[from];
          else deletePropertyOrThrow(O, to);
        }
        for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1);
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from = k + actualDeleteCount - 1;
          to = k + insertCount - 1;
          if (from in O) O[to] = O[from];
          else deletePropertyOrThrow(O, to);
        }
      }
      for (k = 0; k < insertCount; k++) {
        O[k + actualStart] = arguments[k + 2];
      }
      arraySetLength(O, len - actualDeleteCount + insertCount);
      return A;
    }
  });

  // eslint-disable-next-line es/no-typed-arrays -- safe
  var arrayBufferBasicDetection = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

  var defineBuiltIns = function (target, src, options) {
    for (var key in src) defineBuiltIn(target, key, src[key], options);
    return target;
  };

  var $TypeError$c = TypeError;

  var anInstance = function (it, Prototype) {
    if (objectIsPrototypeOf(Prototype, it)) return it;
    throw new $TypeError$c('Incorrect invocation');
  };

  var $RangeError = RangeError;

  // `ToIndex` abstract operation
  // https://tc39.es/ecma262/#sec-toindex
  var toIndex = function (it) {
    if (it === undefined) return 0;
    var number = toIntegerOrInfinity(it);
    var length = toLength(number);
    if (number !== length) throw new $RangeError('Wrong length or index');
    return length;
  };

  // `Math.sign` method implementation
  // https://tc39.es/ecma262/#sec-math.sign
  // eslint-disable-next-line es/no-math-sign -- safe
  var mathSign = Math.sign || function sign(x) {
    var n = +x;
    // eslint-disable-next-line no-self-compare -- NaN check
    return n === 0 || n !== n ? n : n < 0 ? -1 : 1;
  };

  var EPSILON = 2.220446049250313e-16; // Number.EPSILON
  var INVERSE_EPSILON = 1 / EPSILON;

  var mathRoundTiesToEven = function (n) {
    return n + INVERSE_EPSILON - INVERSE_EPSILON;
  };

  var abs = Math.abs;

  var EPSILON$1 = 2.220446049250313e-16; // Number.EPSILON

  var mathFloatRound = function (x, FLOAT_EPSILON, FLOAT_MAX_VALUE, FLOAT_MIN_VALUE) {
    var n = +x;
    var absolute = abs(n);
    var s = mathSign(n);
    if (absolute < FLOAT_MIN_VALUE) return s * mathRoundTiesToEven(absolute / FLOAT_MIN_VALUE / FLOAT_EPSILON) * FLOAT_MIN_VALUE * FLOAT_EPSILON;
    var a = (1 + FLOAT_EPSILON / EPSILON$1) * absolute;
    var result = a - (a - absolute);
    // eslint-disable-next-line no-self-compare -- NaN check
    if (result > FLOAT_MAX_VALUE || result !== result) return s * Infinity;
    return s * result;
  };

  var FLOAT32_EPSILON = 1.1920928955078125e-7; // 2 ** -23;
  var FLOAT32_MAX_VALUE = 3.4028234663852886e+38; // 2 ** 128 - 2 ** 104
  var FLOAT32_MIN_VALUE = 1.1754943508222875e-38; // 2 ** -126;

  // `Math.fround` method implementation
  // https://tc39.es/ecma262/#sec-math.fround
  // eslint-disable-next-line es/no-math-fround -- safe
  var mathFround = Math.fround || function fround(x) {
    return mathFloatRound(x, FLOAT32_EPSILON, FLOAT32_MAX_VALUE, FLOAT32_MIN_VALUE);
  };

  // IEEE754 conversions based on https://github.com/feross/ieee754
  var $Array$3 = Array;
  var abs$1 = Math.abs;
  var pow = Math.pow;
  var floor$2 = Math.floor;
  var log = Math.log;
  var LN2 = Math.LN2;

  var pack = function (number, mantissaLength, bytes) {
    var buffer = $Array$3(bytes);
    var exponentLength = bytes * 8 - mantissaLength - 1;
    var eMax = (1 << exponentLength) - 1;
    var eBias = eMax >> 1;
    var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
    var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
    var index = 0;
    var exponent, mantissa, c;
    number = abs$1(number);
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number !== number || number === Infinity) {
      // eslint-disable-next-line no-self-compare -- NaN check
      mantissa = number !== number ? 1 : 0;
      exponent = eMax;
    } else {
      exponent = floor$2(log(number) / LN2);
      c = pow(2, -exponent);
      if (number * c < 1) {
        exponent--;
        c *= 2;
      }
      if (exponent + eBias >= 1) {
        number += rt / c;
      } else {
        number += rt * pow(2, 1 - eBias);
      }
      if (number * c >= 2) {
        exponent++;
        c /= 2;
      }
      if (exponent + eBias >= eMax) {
        mantissa = 0;
        exponent = eMax;
      } else if (exponent + eBias >= 1) {
        mantissa = (number * c - 1) * pow(2, mantissaLength);
        exponent += eBias;
      } else {
        mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
        exponent = 0;
      }
    }
    while (mantissaLength >= 8) {
      buffer[index++] = mantissa & 255;
      mantissa /= 256;
      mantissaLength -= 8;
    }
    exponent = exponent << mantissaLength | mantissa;
    exponentLength += mantissaLength;
    while (exponentLength > 0) {
      buffer[index++] = exponent & 255;
      exponent /= 256;
      exponentLength -= 8;
    }
    buffer[index - 1] |= sign * 128;
    return buffer;
  };

  var unpack = function (buffer, mantissaLength) {
    var bytes = buffer.length;
    var exponentLength = bytes * 8 - mantissaLength - 1;
    var eMax = (1 << exponentLength) - 1;
    var eBias = eMax >> 1;
    var nBits = exponentLength - 7;
    var index = bytes - 1;
    var sign = buffer[index--];
    var exponent = sign & 127;
    var mantissa;
    sign >>= 7;
    while (nBits > 0) {
      exponent = exponent * 256 + buffer[index--];
      nBits -= 8;
    }
    mantissa = exponent & (1 << -nBits) - 1;
    exponent >>= -nBits;
    nBits += mantissaLength;
    while (nBits > 0) {
      mantissa = mantissa * 256 + buffer[index--];
      nBits -= 8;
    }
    if (exponent === 0) {
      exponent = 1 - eBias;
    } else if (exponent === eMax) {
      return mantissa ? NaN : sign ? -Infinity : Infinity;
    } else {
      mantissa += pow(2, mantissaLength);
      exponent -= eBias;
    } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
  };

  var ieee754 = {
    pack: pack,
    unpack: unpack
  };

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      objectSetPrototypeOf &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      isCallable(NewTarget = dummy.constructor) &&
      NewTarget !== Wrapper &&
      isObject(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) objectSetPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var DATA_VIEW = 'DataView';
  var PROTOTYPE$2 = 'prototype';
  var WRONG_LENGTH = 'Wrong length';
  var WRONG_INDEX = 'Wrong index';
  var getInternalArrayBufferState = internalState.getterFor(ARRAY_BUFFER);
  var getInternalDataViewState = internalState.getterFor(DATA_VIEW);
  var setInternalState$2 = internalState.set;
  var NativeArrayBuffer = globalThis_1[ARRAY_BUFFER];
  var $ArrayBuffer = NativeArrayBuffer;
  var ArrayBufferPrototype = $ArrayBuffer && $ArrayBuffer[PROTOTYPE$2];
  var $DataView = globalThis_1[DATA_VIEW];
  var DataViewPrototype = $DataView && $DataView[PROTOTYPE$2];
  var ObjectPrototype$3 = Object.prototype;
  var Array$1 = globalThis_1.Array;
  var RangeError$2 = globalThis_1.RangeError;
  var fill = functionUncurryThis(arrayFill);
  var reverse = functionUncurryThis([].reverse);

  var packIEEE754 = ieee754.pack;
  var unpackIEEE754 = ieee754.unpack;

  var packInt8 = function (number) {
    return [number & 0xFF];
  };

  var packInt16 = function (number) {
    return [number & 0xFF, number >> 8 & 0xFF];
  };

  var packInt32 = function (number) {
    return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
  };

  var unpackInt32 = function (buffer) {
    return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
  };

  var packFloat32 = function (number) {
    return packIEEE754(mathFround(number), 23, 4);
  };

  var packFloat64 = function (number) {
    return packIEEE754(number, 52, 8);
  };

  var addGetter = function (Constructor, key, getInternalState) {
    defineBuiltInAccessor(Constructor[PROTOTYPE$2], key, {
      configurable: true,
      get: function () {
        return getInternalState(this)[key];
      }
    });
  };

  var get$1 = function (view, count, index, isLittleEndian) {
    var store = getInternalDataViewState(view);
    var intIndex = toIndex(index);
    var boolIsLittleEndian = !!isLittleEndian;
    if (intIndex + count > store.byteLength) throw new RangeError$2(WRONG_INDEX);
    var bytes = store.bytes;
    var start = intIndex + store.byteOffset;
    var pack = arraySlice(bytes, start, start + count);
    return boolIsLittleEndian ? pack : reverse(pack);
  };

  var set$1 = function (view, count, index, conversion, value, isLittleEndian) {
    var store = getInternalDataViewState(view);
    var intIndex = toIndex(index);
    var pack = conversion(+value);
    var boolIsLittleEndian = !!isLittleEndian;
    if (intIndex + count > store.byteLength) throw new RangeError$2(WRONG_INDEX);
    var bytes = store.bytes;
    var start = intIndex + store.byteOffset;
    for (var i = 0; i < count; i++) bytes[start + i] = pack[boolIsLittleEndian ? i : count - i - 1];
  };

  if (!arrayBufferBasicDetection) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, ArrayBufferPrototype);
      var byteLength = toIndex(length);
      setInternalState$2(this, {
        type: ARRAY_BUFFER,
        bytes: fill(Array$1(byteLength), 0),
        byteLength: byteLength
      });
      if (!descriptors) {
        this.byteLength = byteLength;
        this.detached = false;
      }
    };

    ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE$2];

    $DataView = function DataView(buffer, byteOffset, byteLength) {
      anInstance(this, DataViewPrototype);
      anInstance(buffer, ArrayBufferPrototype);
      var bufferState = getInternalArrayBufferState(buffer);
      var bufferLength = bufferState.byteLength;
      var offset = toIntegerOrInfinity(byteOffset);
      if (offset < 0 || offset > bufferLength) throw new RangeError$2('Wrong offset');
      byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
      if (offset + byteLength > bufferLength) throw new RangeError$2(WRONG_LENGTH);
      setInternalState$2(this, {
        type: DATA_VIEW,
        buffer: buffer,
        byteLength: byteLength,
        byteOffset: offset,
        bytes: bufferState.bytes
      });
      if (!descriptors) {
        this.buffer = buffer;
        this.byteLength = byteLength;
        this.byteOffset = offset;
      }
    };

    DataViewPrototype = $DataView[PROTOTYPE$2];

    if (descriptors) {
      addGetter($ArrayBuffer, 'byteLength', getInternalArrayBufferState);
      addGetter($DataView, 'buffer', getInternalDataViewState);
      addGetter($DataView, 'byteLength', getInternalDataViewState);
      addGetter($DataView, 'byteOffset', getInternalDataViewState);
    }

    defineBuiltIns(DataViewPrototype, {
      getInt8: function getInt8(byteOffset) {
        return get$1(this, 1, byteOffset)[0] << 24 >> 24;
      },
      getUint8: function getUint8(byteOffset) {
        return get$1(this, 1, byteOffset)[0];
      },
      getInt16: function getInt16(byteOffset /* , littleEndian */) {
        var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false);
        return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
      },
      getUint16: function getUint16(byteOffset /* , littleEndian */) {
        var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false);
        return bytes[1] << 8 | bytes[0];
      },
      getInt32: function getInt32(byteOffset /* , littleEndian */) {
        return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false));
      },
      getUint32: function getUint32(byteOffset /* , littleEndian */) {
        return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false)) >>> 0;
      },
      getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
        return unpackIEEE754(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false), 23);
      },
      getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
        return unpackIEEE754(get$1(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : false), 52);
      },
      setInt8: function setInt8(byteOffset, value) {
        set$1(this, 1, byteOffset, packInt8, value);
      },
      setUint8: function setUint8(byteOffset, value) {
        set$1(this, 1, byteOffset, packInt8, value);
      },
      setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
        set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false);
      },
      setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
        set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false);
      },
      setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
        set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false);
      },
      setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
        set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false);
      },
      setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
        set$1(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : false);
      },
      setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
        set$1(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : false);
      }
    });
  } else {
    var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME$1 && NativeArrayBuffer.name !== ARRAY_BUFFER;
    /* eslint-disable no-new, sonarjs/inconsistent-function-call -- required for testing */
    if (!fails(function () {
      NativeArrayBuffer(1);
    }) || !fails(function () {
      new NativeArrayBuffer(-1);
    }) || fails(function () {
      new NativeArrayBuffer();
      new NativeArrayBuffer(1.5);
      new NativeArrayBuffer(NaN);
      return NativeArrayBuffer.length !== 1 || INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME$1;
    })) {
      /* eslint-enable no-new, sonarjs/inconsistent-function-call -- required for testing */
      $ArrayBuffer = function ArrayBuffer(length) {
        anInstance(this, ArrayBufferPrototype);
        return inheritIfRequired(new NativeArrayBuffer(toIndex(length)), this, $ArrayBuffer);
      };

      $ArrayBuffer[PROTOTYPE$2] = ArrayBufferPrototype;

      ArrayBufferPrototype.constructor = $ArrayBuffer;

      copyConstructorProperties($ArrayBuffer, NativeArrayBuffer);
    } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME$1) {
      createNonEnumerableProperty(NativeArrayBuffer, 'name', ARRAY_BUFFER);
    }

    // WebKit bug - the same parent prototype for typed arrays and data view
    if (objectSetPrototypeOf && objectGetPrototypeOf(DataViewPrototype) !== ObjectPrototype$3) {
      objectSetPrototypeOf(DataViewPrototype, ObjectPrototype$3);
    }

    // iOS Safari 7.x bug
    var testView = new $DataView(new $ArrayBuffer(2));
    var $setInt8 = functionUncurryThis(DataViewPrototype.setInt8);
    testView.setInt8(0, 2147483648);
    testView.setInt8(1, 2147483649);
    if (testView.getInt8(0) || !testView.getInt8(1)) defineBuiltIns(DataViewPrototype, {
      setInt8: function setInt8(byteOffset, value) {
        $setInt8(this, byteOffset, value << 24 >> 24);
      },
      setUint8: function setUint8(byteOffset, value) {
        $setInt8(this, byteOffset, value << 24 >> 24);
      }
    }, { unsafe: true });
  }

  setToStringTag($ArrayBuffer, ARRAY_BUFFER);
  setToStringTag($DataView, DATA_VIEW);

  var arrayBuffer = {
    ArrayBuffer: $ArrayBuffer,
    DataView: $DataView
  };

  var SPECIES$3 = wellKnownSymbol('species');

  var setSpecies = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);

    if (descriptors && Constructor && !Constructor[SPECIES$3]) {
      defineBuiltInAccessor(Constructor, SPECIES$3, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var ARRAY_BUFFER$1 = 'ArrayBuffer';
  var ArrayBuffer$1 = arrayBuffer[ARRAY_BUFFER$1];
  var NativeArrayBuffer$1 = globalThis_1[ARRAY_BUFFER$1];

  // `ArrayBuffer` constructor
  // https://tc39.es/ecma262/#sec-arraybuffer-constructor
  _export({ global: true, constructor: true, forced: NativeArrayBuffer$1 !== ArrayBuffer$1 }, {
    ArrayBuffer: ArrayBuffer$1
  });

  setSpecies(ARRAY_BUFFER$1);

  // FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it


  var arrayBufferNonExtensible = fails(function () {
    if (typeof ArrayBuffer == 'function') {
      var buffer = new ArrayBuffer(8);
      // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
      if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
    }
  });

  // eslint-disable-next-line es/no-object-isextensible -- safe
  var $isExtensible = Object.isExtensible;
  var FAILS_ON_PRIMITIVES$1 = fails(function () { $isExtensible(1); });

  // `Object.isExtensible` method
  // https://tc39.es/ecma262/#sec-object.isextensible
  var objectIsExtensible = (FAILS_ON_PRIMITIVES$1 || arrayBufferNonExtensible) ? function isExtensible(it) {
    if (!isObject(it)) return false;
    if (arrayBufferNonExtensible && classofRaw(it) === 'ArrayBuffer') return false;
    return $isExtensible ? $isExtensible(it) : true;
  } : $isExtensible;

  var freezing = !fails(function () {
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var internalMetadata = createCommonjsModule(function (module) {





  var defineProperty = objectDefineProperty.f;






  var REQUIRED = false;
  var METADATA = uid('meta');
  var id = 0;

  var setMetadata = function (it) {
    defineProperty(it, METADATA, { value: {
      objectID: 'O' + id++, // object ID
      weakData: {}          // weak collections IDs
    } });
  };

  var fastKey = function (it, create) {
    // return a primitive with prefix
    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!hasOwnProperty_1(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!objectIsExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMetadata(it);
    // return object ID
    } return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!hasOwnProperty_1(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!objectIsExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMetadata(it);
    // return the store of weak collections IDs
    } return it[METADATA].weakData;
  };

  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (freezing && REQUIRED && objectIsExtensible(it) && !hasOwnProperty_1(it, METADATA)) setMetadata(it);
    return it;
  };

  var enable = function () {
    meta.enable = function () { /* empty */ };
    REQUIRED = true;
    var getOwnPropertyNames = objectGetOwnPropertyNames.f;
    var splice = functionUncurryThis([].splice);
    var test = {};
    test[METADATA] = 1;

    // prevent exposing of metadata key
    if (getOwnPropertyNames(test).length) {
      objectGetOwnPropertyNames.f = function (it) {
        var result = getOwnPropertyNames(it);
        for (var i = 0, length = result.length; i < length; i++) {
          if (result[i] === METADATA) {
            splice(result, i, 1);
            break;
          }
        } return result;
      };

      _export({ target: 'Object', stat: true, forced: true }, {
        getOwnPropertyNames: objectGetOwnPropertyNamesExternal.f
      });
    }
  };

  var meta = module.exports = {
    enable: enable,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };

  hiddenKeys[METADATA] = true;
  });
  var internalMetadata_1 = internalMetadata.enable;
  var internalMetadata_2 = internalMetadata.fastKey;
  var internalMetadata_3 = internalMetadata.getWeakData;
  var internalMetadata_4 = internalMetadata.onFreeze;

  var $TypeError$d = TypeError;

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var ResultPrototype = Result.prototype;

  var iterate = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_RECORD = !!(options && options.IS_RECORD);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = functionBindContext(unboundFunction, that);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose(iterator, 'normal', condition);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      } return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_RECORD) {
      iterator = iterable.iterator;
    } else if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (!iterFn) throw new $TypeError$d(tryToString(iterable) + ' is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && objectIsPrototypeOf(ResultPrototype, result)) return result;
        } return new Result(false);
      }
      iterator = getIterator(iterable, iterFn);
    }

    next = IS_RECORD ? iterable.next : iterator.next;
    while (!(step = functionCall(next, iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator, 'throw', error);
      }
      if (typeof result == 'object' && result && objectIsPrototypeOf(ResultPrototype, result)) return result;
    } return new Result(false);
  };

  var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = globalThis_1[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function (KEY) {
      var uncurriedNativeMethod = functionUncurryThis(NativePrototype[KEY]);
      defineBuiltIn(NativePrototype, KEY,
        KEY === 'add' ? function add(value) {
          uncurriedNativeMethod(this, value === 0 ? 0 : value);
          return this;
        } : KEY === 'delete' ? function (key) {
          return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : KEY === 'get' ? function get(key) {
          return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : KEY === 'has' ? function has(key) {
          return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : function set(key, value) {
          uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
          return this;
        }
      );
    };

    var REPLACE = isForced_1(
      CONSTRUCTOR_NAME,
      !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
        new NativeConstructor().entries().next();
      }))
    );

    if (REPLACE) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      internalMetadata.enable();
    } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor();
      // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) !== instance;
      // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new -- required for testing
      var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO = !IS_WEAK && fails(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor();
        var index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance(dummy, NativePrototype);
          var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
          if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

      // weak collections should not contains .clear method
      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    _export({ global: true, constructor: true, forced: Constructor !== NativeConstructor }, exported);

    setToStringTag(Constructor, CONSTRUCTOR_NAME);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };

  var fastKey = internalMetadata.fastKey;


  var setInternalState$3 = internalState.set;
  var internalStateGetterFor = internalState.getterFor;

  var collectionStrong = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var Constructor = wrapper(function (that, iterable) {
        anInstance(that, Prototype);
        setInternalState$3(that, {
          type: CONSTRUCTOR_NAME,
          index: objectCreate(null),
          first: null,
          last: null,
          size: 0
        });
        if (!descriptors) that.size = 0;
        if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var Prototype = Constructor.prototype;

      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index;
        // change existing entry
        if (entry) {
          entry.value = value;
        // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: null,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (descriptors) state.size++;
          else that.size++;
          // add to index
          if (index !== 'F') state.index[index] = entry;
        } return that;
      };

      var getEntry = function (that, key) {
        var state = getInternalState(that);
        // fast case
        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index];
        // frozen object case
        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key === key) return entry;
        }
      };

      defineBuiltIns(Prototype, {
        // `{ Map, Set }.prototype.clear()` methods
        // https://tc39.es/ecma262/#sec-map.prototype.clear
        // https://tc39.es/ecma262/#sec-set.prototype.clear
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var entry = state.first;
          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = null;
            entry = entry.next;
          }
          state.first = state.last = null;
          state.index = objectCreate(null);
          if (descriptors) state.size = 0;
          else that.size = 0;
        },
        // `{ Map, Set }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.delete
        // https://tc39.es/ecma262/#sec-set.prototype.delete
        'delete': function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first === entry) state.first = next;
            if (state.last === entry) state.last = prev;
            if (descriptors) state.size--;
            else that.size--;
          } return !!entry;
        },
        // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.foreach
        // https://tc39.es/ecma262/#sec-set.prototype.foreach
        forEach: function forEach(callbackfn /* , that = undefined */) {
          var state = getInternalState(this);
          var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
          var entry;
          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this);
            // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // `{ Map, Set}.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.has
        // https://tc39.es/ecma262/#sec-set.prototype.has
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });

      defineBuiltIns(Prototype, IS_MAP ? {
        // `Map.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-map.prototype.get
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // `Map.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-map.prototype.set
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // `Set.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-set.prototype.add
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (descriptors) defineBuiltInAccessor(Prototype, 'size', {
        configurable: true,
        get: function () {
          return getInternalState(this).size;
        }
      });
      return Constructor;
    },
    setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
      // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.entries
      // https://tc39.es/ecma262/#sec-map.prototype.keys
      // https://tc39.es/ecma262/#sec-map.prototype.values
      // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
      // https://tc39.es/ecma262/#sec-set.prototype.entries
      // https://tc39.es/ecma262/#sec-set.prototype.keys
      // https://tc39.es/ecma262/#sec-set.prototype.values
      // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
      iteratorDefine(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState$3(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: null
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last;
        // revert to the last existing entry
        while (entry && entry.removed) entry = entry.previous;
        // get next entry
        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = null;
          return createIterResultObject(undefined, true);
        }
        // return step by kind
        if (kind === 'keys') return createIterResultObject(entry.key, false);
        if (kind === 'values') return createIterResultObject(entry.value, false);
        return createIterResultObject([entry.key, entry.value], false);
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

      // `{ Map, Set }.prototype[@@species]` accessors
      // https://tc39.es/ecma262/#sec-get-map-@@species
      // https://tc39.es/ecma262/#sec-get-set-@@species
      setSpecies(CONSTRUCTOR_NAME);
    }
  };

  // `Map` constructor
  // https://tc39.es/ecma262/#sec-map-objects
  collection('Map', function (init) {
    return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong);

  // eslint-disable-next-line es/no-object-assign -- safe
  var $assign = Object.assign;
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  var defineProperty$5 = Object.defineProperty;
  var concat$2 = functionUncurryThis([].concat);

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  var objectAssign = !$assign || fails(function () {
    // should have correct order of operations (Edge bug)
    if (descriptors && $assign({ b: 1 }, $assign(defineProperty$5({}, 'a', {
      enumerable: true,
      get: function () {
        defineProperty$5(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), { b: 2 })).b !== 1) return true;
    // should work with symbols and should have deterministic property order (V8 bug)
    var A = {};
    var B = {};
    // eslint-disable-next-line es/no-symbol -- safe
    var symbol = Symbol('assign detection');
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    // eslint-disable-next-line es/no-array-prototype-foreach -- safe
    alphabet.split('').forEach(function (chr) { B[chr] = chr; });
    return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
    var T = toObject(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    var propertyIsEnumerable = objectPropertyIsEnumerable.f;
    while (argumentsLength > index) {
      var S = indexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols ? concat$2(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!descriptors || functionCall(propertyIsEnumerable, S, key)) T[key] = S[key];
      }
    } return T;
  } : $assign;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  // eslint-disable-next-line es/no-object-assign -- required for testing
  _export({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== objectAssign }, {
    assign: objectAssign
  });

  // `Object.getOwnPropertyDescriptors` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  _export({ target: 'Object', stat: true, sham: !descriptors }, {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      var O = toIndexedObject(object);
      var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
      var keys = ownKeys(O);
      var result = {};
      var index = 0;
      var key, descriptor;
      while (keys.length > index) {
        descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
        if (descriptor !== undefined) createProperty(result, key, descriptor);
      }
      return result;
    }
  });

  /* global Bun, Deno -- detection */




  var userAgentStartsWith = function (string) {
    return environmentUserAgent.slice(0, string.length) === string;
  };

  var environment = (function () {
    if (userAgentStartsWith('Bun/')) return 'BUN';
    if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE';
    if (userAgentStartsWith('Deno/')) return 'DENO';
    if (userAgentStartsWith('Node.js/')) return 'NODE';
    if (globalThis_1.Bun && typeof Bun.version == 'string') return 'BUN';
    if (globalThis_1.Deno && typeof Deno.version == 'object') return 'DENO';
    if (classofRaw(globalThis_1.process) === 'process') return 'NODE';
    if (globalThis_1.window && globalThis_1.document) return 'BROWSER';
    return 'REST';
  })();

  var environmentIsNode = environment === 'NODE';

  var SPECIES$4 = wellKnownSymbol('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor = function (O, defaultConstructor) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || isNullOrUndefined(S = anObject(C)[SPECIES$4]) ? defaultConstructor : aConstructor(S);
  };

  var $TypeError$e = TypeError;

  var validateArgumentsLength = function (passed, required) {
    if (passed < required) throw new $TypeError$e('Not enough arguments');
    return passed;
  };

  // eslint-disable-next-line redos/no-vulnerable -- safe
  var environmentIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(environmentUserAgent);

  var set$2 = globalThis_1.setImmediate;
  var clear = globalThis_1.clearImmediate;
  var process$1 = globalThis_1.process;
  var Dispatch = globalThis_1.Dispatch;
  var Function$1 = globalThis_1.Function;
  var MessageChannel = globalThis_1.MessageChannel;
  var String$1 = globalThis_1.String;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var $location, defer, channel, port;

  fails(function () {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    $location = globalThis_1.location;
  });

  var run = function (id) {
    if (hasOwnProperty_1(queue, id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };

  var runner = function (id) {
    return function () {
      run(id);
    };
  };

  var eventListener = function (event) {
    run(event.data);
  };

  var globalPostMessageDefer = function (id) {
    // old engines have not location.origin
    globalThis_1.postMessage(String$1(id), $location.protocol + '//' + $location.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set$2 || !clear) {
    set$2 = function setImmediate(handler) {
      validateArgumentsLength(arguments.length, 1);
      var fn = isCallable(handler) ? handler : Function$1(handler);
      var args = arraySlice(arguments, 1);
      queue[++counter] = function () {
        functionApply(fn, undefined, args);
      };
      defer(counter);
      return counter;
    };
    clear = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (environmentIsNode) {
      defer = function (id) {
        process$1.nextTick(runner(id));
      };
    // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      };
    // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624
    } else if (MessageChannel && !environmentIsIos) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = eventListener;
      defer = functionBindContext(port.postMessage, port);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      globalThis_1.addEventListener &&
      isCallable(globalThis_1.postMessage) &&
      !globalThis_1.importScripts &&
      $location && $location.protocol !== 'file:' &&
      !fails(globalPostMessageDefer)
    ) {
      defer = globalPostMessageDefer;
      globalThis_1.addEventListener('message', eventListener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
      defer = function (id) {
        html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
          html.removeChild(this);
          run(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  var task = {
    set: set$2,
    clear: clear
  };

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;

  // Avoid NodeJS experimental warning
  var safeGetBuiltIn = function (name) {
    if (!descriptors) return globalThis_1[name];
    var descriptor = getOwnPropertyDescriptor$3(globalThis_1, name);
    return descriptor && descriptor.value;
  };

  var Queue = function () {
    this.head = null;
    this.tail = null;
  };

  Queue.prototype = {
    add: function (item) {
      var entry = { item: item, next: null };
      var tail = this.tail;
      if (tail) tail.next = entry;
      else this.head = entry;
      this.tail = entry;
    },
    get: function () {
      var entry = this.head;
      if (entry) {
        var next = this.head = entry.next;
        if (next === null) this.tail = null;
        return entry.item;
      }
    }
  };

  var queue$1 = Queue;

  var environmentIsIosPebble = /ipad|iphone|ipod/i.test(environmentUserAgent) && typeof Pebble != 'undefined';

  var environmentIsWebosWebkit = /web0s(?!.*chrome)/i.test(environmentUserAgent);

  var macrotask = task.set;






  var MutationObserver = globalThis_1.MutationObserver || globalThis_1.WebKitMutationObserver;
  var document$2 = globalThis_1.document;
  var process$2 = globalThis_1.process;
  var Promise$1 = globalThis_1.Promise;
  var microtask = safeGetBuiltIn('queueMicrotask');
  var notify, toggle, node, promise, then;

  // modern engines have queueMicrotask method
  if (!microtask) {
    var queue$2 = new queue$1();

    var flush = function () {
      var parent, fn;
      if (environmentIsNode && (parent = process$2.domain)) parent.exit();
      while (fn = queue$2.get()) try {
        fn();
      } catch (error) {
        if (queue$2.head) notify();
        throw error;
      }
      if (parent) parent.enter();
    };

    // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
    if (!environmentIsIos && !environmentIsNode && !environmentIsWebosWebkit && MutationObserver && document$2) {
      toggle = true;
      node = document$2.createTextNode('');
      new MutationObserver(flush).observe(node, { characterData: true });
      notify = function () {
        node.data = toggle = !toggle;
      };
    // environments with maybe non-completely correct, but existent Promise
    } else if (!environmentIsIosPebble && Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$1.resolve(undefined);
      // workaround of WebKit ~ iOS Safari 10.1 bug
      promise.constructor = Promise$1;
      then = functionBindContext(promise.then, promise);
      notify = function () {
        then(flush);
      };
    // Node.js without promises
    } else if (environmentIsNode) {
      notify = function () {
        process$2.nextTick(flush);
      };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessage
    // - onreadystatechange
    // - setTimeout
    } else {
      // `webpack` dev server bug on IE global methods - use bind(fn, global)
      macrotask = functionBindContext(macrotask, globalThis_1);
      notify = function () {
        macrotask(flush);
      };
    }

    microtask = function (fn) {
      if (!queue$2.head) notify();
      queue$2.add(fn);
    };
  }

  var microtask_1 = microtask;

  var hostReportErrors = function (a, b) {
    try {
      // eslint-disable-next-line no-console -- safe
      arguments.length === 1 ? console.error(a) : console.error(a, b);
    } catch (error) { /* empty */ }
  };

  var perform = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };

  var promiseNativeConstructor = globalThis_1.Promise;

  var NativePromisePrototype = promiseNativeConstructor && promiseNativeConstructor.prototype;
  var SPECIES$5 = wellKnownSymbol('species');
  var SUBCLASSING = false;
  var NATIVE_PROMISE_REJECTION_EVENT = isCallable(globalThis_1.PromiseRejectionEvent);

  var FORCED_PROMISE_CONSTRUCTOR = isForced_1('Promise', function () {
    var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(promiseNativeConstructor);
    var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(promiseNativeConstructor);
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (!GLOBAL_CORE_JS_PROMISE && environmentV8Version === 66) return true;
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (!environmentV8Version || environmentV8Version < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
      // Detect correctness of subclassing with @@species support
      var promise = new promiseNativeConstructor(function (resolve) { resolve(1); });
      var FakePromise = function (exec) {
        exec(function () { /* empty */ }, function () { /* empty */ });
      };
      var constructor = promise.constructor = {};
      constructor[SPECIES$5] = FakePromise;
      SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
      if (!SUBCLASSING) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    } return !GLOBAL_CORE_JS_PROMISE && (environment === 'BROWSER' || environment === 'DENO') && !NATIVE_PROMISE_REJECTION_EVENT;
  });

  var promiseConstructorDetection = {
    CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR,
    REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT,
    SUBCLASSING: SUBCLASSING
  };

  var $TypeError$f = TypeError;

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw new $TypeError$f('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aCallable(resolve);
    this.reject = aCallable(reject);
  };

  // `NewPromiseCapability` abstract operation
  // https://tc39.es/ecma262/#sec-newpromisecapability
  var f$8 = function (C) {
    return new PromiseCapability(C);
  };

  var newPromiseCapability = {
  	f: f$8
  };

  var task$1 = task.set;









  var PROMISE = 'Promise';
  var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;
  var NATIVE_PROMISE_REJECTION_EVENT$1 = promiseConstructorDetection.REJECTION_EVENT;
  var NATIVE_PROMISE_SUBCLASSING = promiseConstructorDetection.SUBCLASSING;
  var getInternalPromiseState = internalState.getterFor(PROMISE);
  var setInternalState$4 = internalState.set;
  var NativePromisePrototype$1 = promiseNativeConstructor && promiseNativeConstructor.prototype;
  var PromiseConstructor = promiseNativeConstructor;
  var PromisePrototype = NativePromisePrototype$1;
  var TypeError$3 = globalThis_1.TypeError;
  var document$3 = globalThis_1.document;
  var process$3 = globalThis_1.process;
  var newPromiseCapability$1 = newPromiseCapability.f;
  var newGenericPromiseCapability = newPromiseCapability$1;

  var DISPATCH_EVENT = !!(document$3 && document$3.createEvent && globalThis_1.dispatchEvent);
  var UNHANDLED_REJECTION = 'unhandledrejection';
  var REJECTION_HANDLED = 'rejectionhandled';
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;
  var HANDLED = 1;
  var UNHANDLED = 2;

  var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject(it) && isCallable(then = it.then) ? then : false;
  };

  var callReaction = function (reaction, state) {
    var value = state.value;
    var ok = state.state === FULFILLED;
    var handler = ok ? reaction.ok : reaction.fail;
    var resolve = reaction.resolve;
    var reject = reaction.reject;
    var domain = reaction.domain;
    var result, then, exited;
    try {
      if (handler) {
        if (!ok) {
          if (state.rejection === UNHANDLED) onHandleUnhandled(state);
          state.rejection = HANDLED;
        }
        if (handler === true) result = value;
        else {
          if (domain) domain.enter();
          result = handler(value); // can throw
          if (domain) {
            domain.exit();
            exited = true;
          }
        }
        if (result === reaction.promise) {
          reject(new TypeError$3('Promise-chain cycle'));
        } else if (then = isThenable(result)) {
          functionCall(then, result, resolve, reject);
        } else resolve(result);
      } else reject(value);
    } catch (error) {
      if (domain && !exited) domain.exit();
      reject(error);
    }
  };

  var notify$1 = function (state, isReject) {
    if (state.notified) return;
    state.notified = true;
    microtask_1(function () {
      var reactions = state.reactions;
      var reaction;
      while (reaction = reactions.get()) {
        callReaction(reaction, state);
      }
      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(state);
    });
  };

  var dispatchEvent = function (name, promise, reason) {
    var event, handler;
    if (DISPATCH_EVENT) {
      event = document$3.createEvent('Event');
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      globalThis_1.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (!NATIVE_PROMISE_REJECTION_EVENT$1 && (handler = globalThis_1['on' + name])) handler(event);
    else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (state) {
    functionCall(task$1, globalThis_1, function () {
      var promise = state.facade;
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;
      if (IS_UNHANDLED) {
        result = perform(function () {
          if (environmentIsNode) {
            process$3.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection = environmentIsNode || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (state) {
    functionCall(task$1, globalThis_1, function () {
      var promise = state.facade;
      if (environmentIsNode) {
        process$3.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind$1 = function (fn, state, unwrap) {
    return function (value) {
      fn(state, value, unwrap);
    };
  };

  var internalReject = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify$1(state, true);
  };

  var internalResolve = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    try {
      if (state.facade === value) throw new TypeError$3("Promise can't be resolved itself");
      var then = isThenable(value);
      if (then) {
        microtask_1(function () {
          var wrapper = { done: false };
          try {
            functionCall(then, value,
              bind$1(internalResolve, wrapper, state),
              bind$1(internalReject, wrapper, state)
            );
          } catch (error) {
            internalReject(wrapper, error, state);
          }
        });
      } else {
        state.value = value;
        state.state = FULFILLED;
        notify$1(state, false);
      }
    } catch (error) {
      internalReject({ done: false }, error, state);
    }
  };

  // constructor polyfill
  if (FORCED_PROMISE_CONSTRUCTOR$1) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance(this, PromisePrototype);
      aCallable(executor);
      functionCall(Internal, this);
      var state = getInternalPromiseState(this);
      try {
        executor(bind$1(internalResolve, state), bind$1(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };

    PromisePrototype = PromiseConstructor.prototype;

    // eslint-disable-next-line no-unused-vars -- required for `.length`
    Internal = function Promise(executor) {
      setInternalState$4(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: new queue$1(),
        rejection: false,
        state: PENDING,
        value: null
      });
    };

    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    Internal.prototype = defineBuiltIn(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
      state.parent = true;
      reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable(onRejected) && onRejected;
      reaction.domain = environmentIsNode ? process$3.domain : undefined;
      if (state.state === PENDING) state.reactions.add(reaction);
      else microtask_1(function () {
        callReaction(reaction, state);
      });
      return reaction.promise;
    });

    OwnPromiseCapability = function () {
      var promise = new Internal();
      var state = getInternalPromiseState(promise);
      this.promise = promise;
      this.resolve = bind$1(internalResolve, state);
      this.reject = bind$1(internalReject, state);
    };

    newPromiseCapability.f = newPromiseCapability$1 = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };

    if ( isCallable(promiseNativeConstructor) && NativePromisePrototype$1 !== Object.prototype) {
      nativeThen = NativePromisePrototype$1.then;

      if (!NATIVE_PROMISE_SUBCLASSING) {
        // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
        defineBuiltIn(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            functionCall(nativeThen, that, resolve, reject);
          }).then(onFulfilled, onRejected);
        // https://github.com/zloirock/core-js/issues/640
        }, { unsafe: true });
      }

      // make `.constructor === Promise` work for native promise-based APIs
      try {
        delete NativePromisePrototype$1.constructor;
      } catch (error) { /* empty */ }

      // make `instanceof Promise` work for native promise-based APIs
      if (objectSetPrototypeOf) {
        objectSetPrototypeOf(NativePromisePrototype$1, PromisePrototype);
      }
    }
  }

  // `Promise` constructor
  // https://tc39.es/ecma262/#sec-promise-executor
  _export({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
    Promise: PromiseConstructor
  });

  setToStringTag(PromiseConstructor, PROMISE, false);
  setSpecies(PROMISE);

  var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;

  var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$2 || !checkCorrectnessOfIteration(function (iterable) {
    promiseNativeConstructor.all(iterable).then(undefined, function () { /* empty */ });
  });

  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  _export({ target: 'Promise', stat: true, forced: promiseStaticsIncorrectIteration }, {
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability.f(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aCallable(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          remaining++;
          functionCall($promiseResolve, C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;





  var NativePromisePrototype$2 = promiseNativeConstructor && promiseNativeConstructor.prototype;

  // `Promise.prototype.catch` method
  // https://tc39.es/ecma262/#sec-promise.prototype.catch
  _export({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$3, real: true }, {
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });

  // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
  if ( isCallable(promiseNativeConstructor)) {
    var method = getBuiltIn('Promise').prototype['catch'];
    if (NativePromisePrototype$2['catch'] !== method) {
      defineBuiltIn(NativePromisePrototype$2, 'catch', method, { unsafe: true });
    }
  }

  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  _export({ target: 'Promise', stat: true, forced: promiseStaticsIncorrectIteration }, {
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability.f(C);
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aCallable(C.resolve);
        iterate(iterable, function (promise) {
          functionCall($promiseResolve, C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var FORCED_PROMISE_CONSTRUCTOR$4 = promiseConstructorDetection.CONSTRUCTOR;

  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  _export({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
    reject: function reject(r) {
      var capability = newPromiseCapability.f(this);
      var capabilityReject = capability.reject;
      capabilityReject(r);
      return capability.promise;
    }
  });

  var promiseResolve = function (C, x) {
    anObject(C);
    if (isObject(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var FORCED_PROMISE_CONSTRUCTOR$5 = promiseConstructorDetection.CONSTRUCTOR;


  var PromiseConstructorWrapper = getBuiltIn('Promise');

  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  _export({ target: 'Promise', stat: true, forced:  FORCED_PROMISE_CONSTRUCTOR$5 }, {
    resolve: function resolve(x) {
      return promiseResolve( this, x);
    }
  });

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags = function () {
    var that = anObject(this);
    var result = '';
    if (that.hasIndices) result += 'd';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.unicodeSets) result += 'v';
    if (that.sticky) result += 'y';
    return result;
  };

  // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var $RegExp = globalThis_1.RegExp;

  var UNSUPPORTED_Y = fails(function () {
    var re = $RegExp('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') !== null;
  });

  // UC Browser bug
  // https://github.com/zloirock/core-js/issues/1008
  var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
    return !$RegExp('a', 'y').sticky;
  });

  var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') !== null;
  });

  var regexpStickyHelpers = {
    BROKEN_CARET: BROKEN_CARET,
    MISSED_STICKY: MISSED_STICKY,
    UNSUPPORTED_Y: UNSUPPORTED_Y
  };

  // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var $RegExp$1 = globalThis_1.RegExp;

  var regexpUnsupportedDotAll = fails(function () {
    var re = $RegExp$1('.', 's');
    return !(re.dotAll && re.test('\n') && re.flags === 's');
  });

  // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
  var $RegExp$2 = globalThis_1.RegExp;

  var regexpUnsupportedNcg = fails(function () {
    var re = $RegExp$2('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' ||
      'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */







  var getInternalState$2 = internalState.get;



  var nativeReplace = shared('native-string-replace', String.prototype.replace);
  var nativeExec = RegExp.prototype.exec;
  var patchedExec = nativeExec;
  var charAt$1 = functionUncurryThis(''.charAt);
  var indexOf$1 = functionUncurryThis(''.indexOf);
  var replace$2 = functionUncurryThis(''.replace);
  var stringSlice$2 = functionUncurryThis(''.slice);

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    functionCall(nativeExec, re1, 'a');
    functionCall(nativeExec, re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y$1 = regexpStickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || regexpUnsupportedDotAll || regexpUnsupportedNcg;

  if (PATCH) {
    patchedExec = function exec(string) {
      var re = this;
      var state = getInternalState$2(re);
      var str = toString_1(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = functionCall(patchedExec, raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y$1 && re.sticky;
      var flags = functionCall(regexpFlags, re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = replace$2(flags, 'y', '');
        if (indexOf$1(flags, 'g') === -1) {
          flags += 'g';
        }

        strCopy = stringSlice$2(str, re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$1(str, re.lastIndex - 1) !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = functionCall(nativeExec, sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = stringSlice$2(match.input, charsAdded);
          match[0] = stringSlice$2(match[0], charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
        functionCall(nativeReplace, match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      if (match && groups) {
        match.groups = object = objectCreate(null);
        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match[group[1]];
        }
      }

      return match;
    };
  }

  var regexpExec = patchedExec;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  _export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
    exec: regexpExec
  });

  var RegExpPrototype = RegExp.prototype;

  var regexpGetFlags = function (R) {
    var flags = R.flags;
    return flags === undefined && !('flags' in RegExpPrototype) && !hasOwnProperty_1(R, 'flags') && objectIsPrototypeOf(RegExpPrototype, R)
      ? functionCall(regexpFlags, R) : flags;
  };

  var PROPER_FUNCTION_NAME$2 = functionName.PROPER;






  var TO_STRING = 'toString';
  var RegExpPrototype$1 = RegExp.prototype;
  var nativeToString = RegExpPrototype$1[TO_STRING];

  var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) !== '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = PROPER_FUNCTION_NAME$2 && nativeToString.name !== TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    defineBuiltIn(RegExpPrototype$1, TO_STRING, function toString() {
      var R = anObject(this);
      var pattern = toString_1(R.source);
      var flags = toString_1(regexpGetFlags(R));
      return '/' + pattern + '/' + flags;
    }, { unsafe: true });
  }

  // `Set` constructor
  // https://tc39.es/ecma262/#sec-set-objects
  collection('Set', function (init) {
    return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong);

  var charAt$2 = functionUncurryThis(''.charAt);
  var charCodeAt$1 = functionUncurryThis(''.charCodeAt);
  var stringSlice$3 = functionUncurryThis(''.slice);

  var createMethod$2 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString_1(requireObjectCoercible($this));
      var position = toIntegerOrInfinity(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt$1(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING
            ? charAt$2(S, position)
            : first
          : CONVERT_TO_STRING
            ? stringSlice$3(S, position, position + 2)
            : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$2(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$2(true)
  };

  var charAt$3 = stringMultibyte.charAt;





  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$5 = internalState.set;
  var getInternalState$3 = internalState.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  iteratorDefine(String, 'String', function (iterated) {
    setInternalState$5(this, {
      type: STRING_ITERATOR,
      string: toString_1(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$3(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return createIterResultObject(undefined, true);
    point = charAt$3(string, index);
    state.index += point.length;
    return createIterResultObject(point, false);
  });

  // TODO: Remove from `core-js@4` since it's moved to entry points








  var SPECIES$6 = wellKnownSymbol('species');
  var RegExpPrototype$2 = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol(KEY);

    var DELEGATES_TO_SYMBOL = !fails(function () {
      // String methods call symbol-named RegExp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) !== 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES$6] = function () { return re; };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () {
        execCalled = true;
        return null;
      };

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      FORCED
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var $exec = regexp.exec;
        if ($exec === regexpExec || $exec === RegExpPrototype$2.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: functionCall(nativeRegExpMethod, regexp, str, arg2) };
          }
          return { done: true, value: functionCall(nativeMethod, str, regexp, arg2) };
        }
        return { done: false };
      });

      defineBuiltIn(String.prototype, KEY, methods[0]);
      defineBuiltIn(RegExpPrototype$2, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty(RegExpPrototype$2[SYMBOL], 'sham', true);
  };

  var charAt$4 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? charAt$4(S, index).length : 1);
  };

  var $TypeError$g = TypeError;

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (isCallable(exec)) {
      var result = functionCall(exec, R, S);
      if (result !== null) anObject(result);
      return result;
    }
    if (classofRaw(R) === 'RegExp') return functionCall(regexpExec, R, S);
    throw new $TypeError$g('RegExp#exec called on incompatible receiver');
  };

  // @@match logic
  fixRegexpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.es/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible(this);
        var matcher = isObject(regexp) ? getMethod(regexp, MATCH) : undefined;
        return matcher ? functionCall(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString_1(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
      function (string) {
        var rx = anObject(this);
        var S = toString_1(string);
        var res = maybeCallNative(nativeMatch, rx, S);

        if (res.done) return res.value;

        if (!rx.global) return regexpExecAbstract(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regexpExecAbstract(rx, S)) !== null) {
          var matchStr = toString_1(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  var MATCH = wellKnownSymbol('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) === 'RegExp');
  };

  var $TypeError$h = TypeError;

  var notARegexp = function (it) {
    if (isRegexp(it)) {
      throw new $TypeError$h("The method doesn't accept regular expressions");
    } return it;
  };

  var MATCH$1 = wellKnownSymbol('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;
    try {
      '/./'[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH$1] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (error2) { /* empty */ }
    } return false;
  };

  var getOwnPropertyDescriptor$4 = objectGetOwnPropertyDescriptor.f;







  var stringSlice$4 = functionUncurryThisClause(''.slice);
  var min$3 = Math.min;

  var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('startsWith');
  // https://github.com/zloirock/core-js/pull/702
  var MDN_POLYFILL_BUG =  !CORRECT_IS_REGEXP_LOGIC && !!function () {
    var descriptor = getOwnPropertyDescriptor$4(String.prototype, 'startsWith');
    return descriptor && !descriptor.writable;
  }();

  // `String.prototype.startsWith` method
  // https://tc39.es/ecma262/#sec-string.prototype.startswith
  _export({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
    startsWith: function startsWith(searchString /* , position = 0 */) {
      var that = toString_1(requireObjectCoercible(this));
      notARegexp(searchString);
      var index = toLength(min$3(arguments.length > 1 ? arguments[1] : undefined, that.length));
      var search = toString_1(searchString);
      return stringSlice$4(that, index, index + search.length) === search;
    }
  });

  // a string of all valid unicode whitespaces
  var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var replace$3 = functionUncurryThis(''.replace);
  var ltrim = RegExp('^[' + whitespaces + ']+');
  var rtrim = RegExp('(^|[^' + whitespaces + '])[' + whitespaces + ']+$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$3 = function (TYPE) {
    return function ($this) {
      var string = toString_1(requireObjectCoercible($this));
      if (TYPE & 1) string = replace$3(string, ltrim, '');
      if (TYPE & 2) string = replace$3(string, rtrim, '$1');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod$3(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod$3(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod$3(3)
  };

  var PROPER_FUNCTION_NAME$3 = functionName.PROPER;



  var non = '\u200B\u0085\u180E';

  // check that a method works with the correct list
  // of whitespaces and has a correct name
  var stringTrimForced = function (METHOD_NAME) {
    return fails(function () {
      return !!whitespaces[METHOD_NAME]()
        || non[METHOD_NAME]() !== non
        || (PROPER_FUNCTION_NAME$3 && whitespaces[METHOD_NAME].name !== METHOD_NAME);
    });
  };

  var $trim = stringTrim.trim;


  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  _export({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
    trim: function trim() {
      return $trim(this);
    }
  });

  var quot = /"/g;
  var replace$4 = functionUncurryThis(''.replace);

  // `CreateHTML` abstract operation
  // https://tc39.es/ecma262/#sec-createhtml
  var createHtml = function (string, tag, attribute, value) {
    var S = toString_1(requireObjectCoercible(string));
    var p1 = '<' + tag;
    if (attribute !== '') p1 += ' ' + attribute + '="' + replace$4(toString_1(value), quot, '&quot;') + '"';
    return p1 + '>' + S + '</' + tag + '>';
  };

  // check the existence of a method, lowercase
  // of a tag and escaping quotes in arguments
  var stringHtmlForced = function (METHOD_NAME) {
    return fails(function () {
      var test = ''[METHOD_NAME]('"');
      return test !== test.toLowerCase() || test.split('"').length > 3;
    });
  };

  // `String.prototype.anchor` method
  // https://tc39.es/ecma262/#sec-string.prototype.anchor
  _export({ target: 'String', proto: true, forced: stringHtmlForced('anchor') }, {
    anchor: function anchor(name) {
      return createHtml(this, 'a', 'name', name);
    }
  });

  var enforceInternalState = internalState.enforce;
  var getInternalState$4 = internalState.get;
  var Int8Array$1 = globalThis_1.Int8Array;
  var Int8ArrayPrototype = Int8Array$1 && Int8Array$1.prototype;
  var Uint8ClampedArray$1 = globalThis_1.Uint8ClampedArray;
  var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
  var TypedArray = Int8Array$1 && objectGetPrototypeOf(Int8Array$1);
  var TypedArrayPrototype = Int8ArrayPrototype && objectGetPrototypeOf(Int8ArrayPrototype);
  var ObjectPrototype$4 = Object.prototype;
  var TypeError$4 = globalThis_1.TypeError;

  var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
  var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
  var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
  // Fixing native typed arrays in Opera Presto crashes the browser, see #595
  var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferBasicDetection && !!objectSetPrototypeOf && classof(globalThis_1.opera) !== 'Opera';
  var TYPED_ARRAY_TAG_REQUIRED = false;
  var NAME$1, Constructor, Prototype;

  var TypedArrayConstructorsList = {
    Int8Array: 1,
    Uint8Array: 1,
    Uint8ClampedArray: 1,
    Int16Array: 2,
    Uint16Array: 2,
    Int32Array: 4,
    Uint32Array: 4,
    Float32Array: 4,
    Float64Array: 8
  };

  var BigIntArrayConstructorsList = {
    BigInt64Array: 8,
    BigUint64Array: 8
  };

  var isView = function isView(it) {
    if (!isObject(it)) return false;
    var klass = classof(it);
    return klass === 'DataView'
      || hasOwnProperty_1(TypedArrayConstructorsList, klass)
      || hasOwnProperty_1(BigIntArrayConstructorsList, klass);
  };

  var getTypedArrayConstructor = function (it) {
    var proto = objectGetPrototypeOf(it);
    if (!isObject(proto)) return;
    var state = getInternalState$4(proto);
    return (state && hasOwnProperty_1(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor(proto);
  };

  var isTypedArray = function (it) {
    if (!isObject(it)) return false;
    var klass = classof(it);
    return hasOwnProperty_1(TypedArrayConstructorsList, klass)
      || hasOwnProperty_1(BigIntArrayConstructorsList, klass);
  };

  var aTypedArray = function (it) {
    if (isTypedArray(it)) return it;
    throw new TypeError$4('Target is not a typed array');
  };

  var aTypedArrayConstructor = function (C) {
    if (isCallable(C) && (!objectSetPrototypeOf || objectIsPrototypeOf(TypedArray, C))) return C;
    throw new TypeError$4(tryToString(C) + ' is not a typed array constructor');
  };

  var exportTypedArrayMethod = function (KEY, property, forced, options) {
    if (!descriptors) return;
    if (forced) for (var ARRAY in TypedArrayConstructorsList) {
      var TypedArrayConstructor = globalThis_1[ARRAY];
      if (TypedArrayConstructor && hasOwnProperty_1(TypedArrayConstructor.prototype, KEY)) try {
        delete TypedArrayConstructor.prototype[KEY];
      } catch (error) {
        // old WebKit bug - some methods are non-configurable
        try {
          TypedArrayConstructor.prototype[KEY] = property;
        } catch (error2) { /* empty */ }
      }
    }
    if (!TypedArrayPrototype[KEY] || forced) {
      defineBuiltIn(TypedArrayPrototype, KEY, forced ? property
        : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options);
    }
  };

  var exportTypedArrayStaticMethod = function (KEY, property, forced) {
    var ARRAY, TypedArrayConstructor;
    if (!descriptors) return;
    if (objectSetPrototypeOf) {
      if (forced) for (ARRAY in TypedArrayConstructorsList) {
        TypedArrayConstructor = globalThis_1[ARRAY];
        if (TypedArrayConstructor && hasOwnProperty_1(TypedArrayConstructor, KEY)) try {
          delete TypedArrayConstructor[KEY];
        } catch (error) { /* empty */ }
      }
      if (!TypedArray[KEY] || forced) {
        // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
        try {
          return defineBuiltIn(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
        } catch (error) { /* empty */ }
      } else return;
    }
    for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = globalThis_1[ARRAY];
      if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
        defineBuiltIn(TypedArrayConstructor, KEY, property);
      }
    }
  };

  for (NAME$1 in TypedArrayConstructorsList) {
    Constructor = globalThis_1[NAME$1];
    Prototype = Constructor && Constructor.prototype;
    if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
    else NATIVE_ARRAY_BUFFER_VIEWS = false;
  }

  for (NAME$1 in BigIntArrayConstructorsList) {
    Constructor = globalThis_1[NAME$1];
    Prototype = Constructor && Constructor.prototype;
    if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
  }

  // WebKit bug - typed arrays constructors prototype is Object.prototype
  if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
    // eslint-disable-next-line no-shadow -- safe
    TypedArray = function TypedArray() {
      throw new TypeError$4('Incorrect invocation');
    };
    if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME$1 in TypedArrayConstructorsList) {
      if (globalThis_1[NAME$1]) objectSetPrototypeOf(globalThis_1[NAME$1], TypedArray);
    }
  }

  if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype$4) {
    TypedArrayPrototype = TypedArray.prototype;
    if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME$1 in TypedArrayConstructorsList) {
      if (globalThis_1[NAME$1]) objectSetPrototypeOf(globalThis_1[NAME$1].prototype, TypedArrayPrototype);
    }
  }

  // WebKit bug - one more object in Uint8ClampedArray prototype chain
  if (NATIVE_ARRAY_BUFFER_VIEWS && objectGetPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
    objectSetPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
  }

  if (descriptors && !hasOwnProperty_1(TypedArrayPrototype, TO_STRING_TAG$3)) {
    TYPED_ARRAY_TAG_REQUIRED = true;
    defineBuiltInAccessor(TypedArrayPrototype, TO_STRING_TAG$3, {
      configurable: true,
      get: function () {
        return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
      }
    });
    for (NAME$1 in TypedArrayConstructorsList) if (globalThis_1[NAME$1]) {
      createNonEnumerableProperty(globalThis_1[NAME$1], TYPED_ARRAY_TAG, NAME$1);
    }
  }

  var arrayBufferViewCore = {
    NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
    TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
    aTypedArray: aTypedArray,
    aTypedArrayConstructor: aTypedArrayConstructor,
    exportTypedArrayMethod: exportTypedArrayMethod,
    exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
    getTypedArrayConstructor: getTypedArrayConstructor,
    isView: isView,
    isTypedArray: isTypedArray,
    TypedArray: TypedArray,
    TypedArrayPrototype: TypedArrayPrototype
  };

  /* eslint-disable no-new, sonarjs/inconsistent-function-call -- required for testing */



  var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

  var ArrayBuffer$2 = globalThis_1.ArrayBuffer;
  var Int8Array$2 = globalThis_1.Int8Array;

  var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails(function () {
    Int8Array$2(1);
  }) || !fails(function () {
    new Int8Array$2(-1);
  }) || !checkCorrectnessOfIteration(function (iterable) {
    new Int8Array$2();
    new Int8Array$2(null);
    new Int8Array$2(1.5);
    new Int8Array$2(iterable);
  }, true) || fails(function () {
    // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
    return new Int8Array$2(new ArrayBuffer$2(2), 1, undefined).length !== 1;
  });

  var floor$3 = Math.floor;

  // `IsIntegralNumber` abstract operation
  // https://tc39.es/ecma262/#sec-isintegralnumber
  // eslint-disable-next-line es/no-number-isinteger -- safe
  var isIntegralNumber = Number.isInteger || function isInteger(it) {
    return !isObject(it) && isFinite(it) && floor$3(it) === it;
  };

  var $RangeError$1 = RangeError;

  var toPositiveInteger = function (it) {
    var result = toIntegerOrInfinity(it);
    if (result < 0) throw new $RangeError$1("The argument can't be less than 0");
    return result;
  };

  var $RangeError$2 = RangeError;

  var toOffset = function (it, BYTES) {
    var offset = toPositiveInteger(it);
    if (offset % BYTES) throw new $RangeError$2('Wrong offset');
    return offset;
  };

  var round = Math.round;

  var toUint8Clamped = function (it) {
    var value = round(it);
    return value < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
  };

  var isBigIntArray = function (it) {
    var klass = classof(it);
    return klass === 'BigInt64Array' || klass === 'BigUint64Array';
  };

  var $TypeError$i = TypeError;

  // `ToBigInt` abstract operation
  // https://tc39.es/ecma262/#sec-tobigint
  var toBigInt = function (argument) {
    var prim = toPrimitive$1(argument, 'number');
    if (typeof prim == 'number') throw new $TypeError$i("Can't convert number to bigint");
    // eslint-disable-next-line es/no-bigint -- safe
    return BigInt(prim);
  };

  var aTypedArrayConstructor$1 = arrayBufferViewCore.aTypedArrayConstructor;


  var typedArrayFrom = function from(source /* , mapfn, thisArg */) {
    var C = aConstructor(this);
    var O = toObject(source);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod(O);
    var i, length, result, thisIsBigIntArray, value, step, iterator, next;
    if (iteratorMethod && !isArrayIteratorMethod(iteratorMethod)) {
      iterator = getIterator(O, iteratorMethod);
      next = iterator.next;
      O = [];
      while (!(step = functionCall(next, iterator)).done) {
        O.push(step.value);
      }
    }
    if (mapping && argumentsLength > 2) {
      mapfn = functionBindContext(mapfn, arguments[2]);
    }
    length = lengthOfArrayLike(O);
    result = new (aTypedArrayConstructor$1(C))(length);
    thisIsBigIntArray = isBigIntArray(result);
    for (i = 0; length > i; i++) {
      value = mapping ? mapfn(O[i], i) : O[i];
      // FF30- typed arrays doesn't properly convert objects to typed array values
      result[i] = thisIsBigIntArray ? toBigInt(value) : +value;
    }
    return result;
  };

  var arrayFromConstructorAndList = function (Constructor, list, $length) {
    var index = 0;
    var length = arguments.length > 2 ? $length : lengthOfArrayLike(list);
    var result = new Constructor(length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var typedArrayConstructor = createCommonjsModule(function (module) {























  var getOwnPropertyNames = objectGetOwnPropertyNames.f;

  var forEach = arrayIteration.forEach;








  var getInternalState = internalState.get;
  var setInternalState = internalState.set;
  var enforceInternalState = internalState.enforce;
  var nativeDefineProperty = objectDefineProperty.f;
  var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var RangeError = globalThis_1.RangeError;
  var ArrayBuffer = arrayBuffer.ArrayBuffer;
  var ArrayBufferPrototype = ArrayBuffer.prototype;
  var DataView = arrayBuffer.DataView;
  var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
  var TYPED_ARRAY_TAG = arrayBufferViewCore.TYPED_ARRAY_TAG;
  var TypedArray = arrayBufferViewCore.TypedArray;
  var TypedArrayPrototype = arrayBufferViewCore.TypedArrayPrototype;
  var isTypedArray = arrayBufferViewCore.isTypedArray;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var WRONG_LENGTH = 'Wrong length';

  var addGetter = function (it, key) {
    defineBuiltInAccessor(it, key, {
      configurable: true,
      get: function () {
        return getInternalState(this)[key];
      }
    });
  };

  var isArrayBuffer = function (it) {
    var klass;
    return objectIsPrototypeOf(ArrayBufferPrototype, it) || (klass = classof(it)) === 'ArrayBuffer' || klass === 'SharedArrayBuffer';
  };

  var isTypedArrayIndex = function (target, key) {
    return isTypedArray(target)
      && !isSymbol(key)
      && key in target
      && isIntegralNumber(+key)
      && key >= 0;
  };

  var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
    key = toPropertyKey$1(key);
    return isTypedArrayIndex(target, key)
      ? createPropertyDescriptor(2, target[key])
      : nativeGetOwnPropertyDescriptor(target, key);
  };

  var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
    key = toPropertyKey$1(key);
    if (isTypedArrayIndex(target, key)
      && isObject(descriptor)
      && hasOwnProperty_1(descriptor, 'value')
      && !hasOwnProperty_1(descriptor, 'get')
      && !hasOwnProperty_1(descriptor, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !descriptor.configurable
      && (!hasOwnProperty_1(descriptor, 'writable') || descriptor.writable)
      && (!hasOwnProperty_1(descriptor, 'enumerable') || descriptor.enumerable)
    ) {
      target[key] = descriptor.value;
      return target;
    } return nativeDefineProperty(target, key, descriptor);
  };

  if (descriptors) {
    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      objectGetOwnPropertyDescriptor.f = wrappedGetOwnPropertyDescriptor;
      objectDefineProperty.f = wrappedDefineProperty;
      addGetter(TypedArrayPrototype, 'buffer');
      addGetter(TypedArrayPrototype, 'byteOffset');
      addGetter(TypedArrayPrototype, 'byteLength');
      addGetter(TypedArrayPrototype, 'length');
    }

    _export({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
      getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
      defineProperty: wrappedDefineProperty
    });

    module.exports = function (TYPE, wrapper, CLAMPED) {
      var BYTES = TYPE.match(/\d+/)[0] / 8;
      var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
      var GETTER = 'get' + TYPE;
      var SETTER = 'set' + TYPE;
      var NativeTypedArrayConstructor = globalThis_1[CONSTRUCTOR_NAME];
      var TypedArrayConstructor = NativeTypedArrayConstructor;
      var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
      var exported = {};

      var getter = function (that, index) {
        var data = getInternalState(that);
        return data.view[GETTER](index * BYTES + data.byteOffset, true);
      };

      var setter = function (that, index, value) {
        var data = getInternalState(that);
        data.view[SETTER](index * BYTES + data.byteOffset, CLAMPED ? toUint8Clamped(value) : value, true);
      };

      var addElement = function (that, index) {
        nativeDefineProperty(that, index, {
          get: function () {
            return getter(this, index);
          },
          set: function (value) {
            return setter(this, index, value);
          },
          enumerable: true
        });
      };

      if (!NATIVE_ARRAY_BUFFER_VIEWS) {
        TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
          anInstance(that, TypedArrayConstructorPrototype);
          var index = 0;
          var byteOffset = 0;
          var buffer, byteLength, length;
          if (!isObject(data)) {
            length = toIndex(data);
            byteLength = length * BYTES;
            buffer = new ArrayBuffer(byteLength);
          } else if (isArrayBuffer(data)) {
            buffer = data;
            byteOffset = toOffset(offset, BYTES);
            var $len = data.byteLength;
            if ($length === undefined) {
              if ($len % BYTES) throw new RangeError(WRONG_LENGTH);
              byteLength = $len - byteOffset;
              if (byteLength < 0) throw new RangeError(WRONG_LENGTH);
            } else {
              byteLength = toLength($length) * BYTES;
              if (byteLength + byteOffset > $len) throw new RangeError(WRONG_LENGTH);
            }
            length = byteLength / BYTES;
          } else if (isTypedArray(data)) {
            return arrayFromConstructorAndList(TypedArrayConstructor, data);
          } else {
            return functionCall(typedArrayFrom, TypedArrayConstructor, data);
          }
          setInternalState(that, {
            buffer: buffer,
            byteOffset: byteOffset,
            byteLength: byteLength,
            length: length,
            view: new DataView(buffer)
          });
          while (index < length) addElement(that, index++);
        });

        if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
        TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = objectCreate(TypedArrayPrototype);
      } else if (typedArrayConstructorsRequireWrappers) {
        TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
          anInstance(dummy, TypedArrayConstructorPrototype);
          return inheritIfRequired(function () {
            if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
            if (isArrayBuffer(data)) return $length !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
              : typedArrayOffset !== undefined
                ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
                : new NativeTypedArrayConstructor(data);
            if (isTypedArray(data)) return arrayFromConstructorAndList(TypedArrayConstructor, data);
            return functionCall(typedArrayFrom, TypedArrayConstructor, data);
          }(), dummy, TypedArrayConstructor);
        });

        if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
        forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
          if (!(key in TypedArrayConstructor)) {
            createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
          }
        });
        TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
      }

      if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
        createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
      }

      enforceInternalState(TypedArrayConstructorPrototype).TypedArrayConstructor = TypedArrayConstructor;

      if (TYPED_ARRAY_TAG) {
        createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
      }

      var FORCED = TypedArrayConstructor !== NativeTypedArrayConstructor;

      exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

      _export({ global: true, constructor: true, forced: FORCED, sham: !NATIVE_ARRAY_BUFFER_VIEWS }, exported);

      if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
        createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
      }

      if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
        createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
      }

      setSpecies(CONSTRUCTOR_NAME);
    };
  } else module.exports = function () { /* empty */ };
  });

  // `Int32Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects
  typedArrayConstructor('Int32', function (init) {
    return function Int32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var min$4 = Math.min;

  // `Array.prototype.copyWithin` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.copywithin
  // eslint-disable-next-line es/no-array-prototype-copywithin -- safe
  var arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var to = toAbsoluteIndex(target, len);
    var from = toAbsoluteIndex(start, len);
    var end = arguments.length > 2 ? arguments[2] : undefined;
    var count = min$4((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
    var inc = 1;
    if (from < to && to < from + count) {
      inc = -1;
      from += count - 1;
      to += count - 1;
    }
    while (count-- > 0) {
      if (from in O) O[to] = O[from];
      else deletePropertyOrThrow(O, to);
      to += inc;
      from += inc;
    } return O;
  };

  var u$ArrayCopyWithin = functionUncurryThis(arrayCopyWithin);
  var aTypedArray$1 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$1 = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.copyWithin` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
  exportTypedArrayMethod$1('copyWithin', function copyWithin(target, start /* , end */) {
    return u$ArrayCopyWithin(aTypedArray$1(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
  });

  var $every = arrayIteration.every;

  var aTypedArray$2 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$2 = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.every` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
  exportTypedArrayMethod$2('every', function every(callbackfn /* , thisArg */) {
    return $every(aTypedArray$2(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var aTypedArray$3 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$3 = arrayBufferViewCore.exportTypedArrayMethod;
  var slice = functionUncurryThis(''.slice);

  // V8 ~ Chrome < 59, Safari < 14.1, FF < 55, Edge <=18
  var CONVERSION_BUG = fails(function () {
    var count = 0;
    // eslint-disable-next-line es/no-typed-arrays -- safe
    new Int8Array(2).fill({ valueOf: function () { return count++; } });
    return count !== 1;
  });

  // `%TypedArray%.prototype.fill` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
  exportTypedArrayMethod$3('fill', function fill(value /* , start, end */) {
    var length = arguments.length;
    aTypedArray$3(this);
    var actualValue = slice(classof(this), 0, 3) === 'Big' ? toBigInt(value) : +value;
    return functionCall(arrayFill, this, actualValue, length > 1 ? arguments[1] : undefined, length > 2 ? arguments[2] : undefined);
  }, CONVERSION_BUG);

  var getTypedArrayConstructor$1 = arrayBufferViewCore.getTypedArrayConstructor;

  var typedArrayFromSameTypeAndList = function (instance, list) {
    return arrayFromConstructorAndList(getTypedArrayConstructor$1(instance), list);
  };

  var $filter$1 = arrayIteration.filter;


  var aTypedArray$4 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$4 = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.filter` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
  exportTypedArrayMethod$4('filter', function filter(callbackfn /* , thisArg */) {
    var list = $filter$1(aTypedArray$4(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return typedArrayFromSameTypeAndList(this, list);
  });

  var $find = arrayIteration.find;

  var aTypedArray$5 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$5 = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.find` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
  exportTypedArrayMethod$5('find', function find(predicate /* , thisArg */) {
    return $find(aTypedArray$5(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  });

  var $findIndex = arrayIteration.findIndex;

  var aTypedArray$6 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$6 = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
  exportTypedArrayMethod$6('findIndex', function findIndex(predicate /* , thisArg */) {
    return $findIndex(aTypedArray$6(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  });

  var $forEach$2 = arrayIteration.forEach;

  var aTypedArray$7 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$7 = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
  exportTypedArrayMethod$7('forEach', function forEach(callbackfn /* , thisArg */) {
    $forEach$2(aTypedArray$7(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var $includes = arrayIncludes.includes;

  var aTypedArray$8 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$8 = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.includes` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
  exportTypedArrayMethod$8('includes', function includes(searchElement /* , fromIndex */) {
    return $includes(aTypedArray$8(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
  });

  var $indexOf = arrayIncludes.indexOf;

  var aTypedArray$9 = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$9 = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
  exportTypedArrayMethod$9('indexOf', function indexOf(searchElement /* , fromIndex */) {
    return $indexOf(aTypedArray$9(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ITERATOR$5 = wellKnownSymbol('iterator');
  var Uint8Array$1 = globalThis_1.Uint8Array;
  var arrayValues = functionUncurryThis(es_array_iterator.values);
  var arrayKeys = functionUncurryThis(es_array_iterator.keys);
  var arrayEntries = functionUncurryThis(es_array_iterator.entries);
  var aTypedArray$a = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$a = arrayBufferViewCore.exportTypedArrayMethod;
  var TypedArrayPrototype$1 = Uint8Array$1 && Uint8Array$1.prototype;

  var GENERIC = !fails(function () {
    TypedArrayPrototype$1[ITERATOR$5].call([1]);
  });

  var ITERATOR_IS_VALUES = !!TypedArrayPrototype$1
    && TypedArrayPrototype$1.values
    && TypedArrayPrototype$1[ITERATOR$5] === TypedArrayPrototype$1.values
    && TypedArrayPrototype$1.values.name === 'values';

  var typedArrayValues = function values() {
    return arrayValues(aTypedArray$a(this));
  };

  // `%TypedArray%.prototype.entries` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
  exportTypedArrayMethod$a('entries', function entries() {
    return arrayEntries(aTypedArray$a(this));
  }, GENERIC);
  // `%TypedArray%.prototype.keys` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys
  exportTypedArrayMethod$a('keys', function keys() {
    return arrayKeys(aTypedArray$a(this));
  }, GENERIC);
  // `%TypedArray%.prototype.values` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
  exportTypedArrayMethod$a('values', typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });
  // `%TypedArray%.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator
  exportTypedArrayMethod$a(ITERATOR$5, typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });

  var aTypedArray$b = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$b = arrayBufferViewCore.exportTypedArrayMethod;
  var $join = functionUncurryThis([].join);

  // `%TypedArray%.prototype.join` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
  exportTypedArrayMethod$b('join', function join(separator) {
    return $join(aTypedArray$b(this), separator);
  });

  /* eslint-disable es/no-array-prototype-lastindexof -- safe */






  var min$5 = Math.min;
  var $lastIndexOf = [].lastIndexOf;
  var NEGATIVE_ZERO = !!$lastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
  var STRICT_METHOD$2 = arrayMethodIsStrict('lastIndexOf');
  var FORCED$5 = NEGATIVE_ZERO || !STRICT_METHOD$2;

  // `Array.prototype.lastIndexOf` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.lastindexof
  var arrayLastIndexOf = FORCED$5 ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return functionApply($lastIndexOf, this, arguments) || 0;
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return -1;
    var index = length - 1;
    if (arguments.length > 1) index = min$5(index, toIntegerOrInfinity(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
    return -1;
  } : $lastIndexOf;

  var aTypedArray$c = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$c = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.lastIndexOf` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
  exportTypedArrayMethod$c('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
    var length = arguments.length;
    return functionApply(arrayLastIndexOf, aTypedArray$c(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
  });

  var $map$1 = arrayIteration.map;

  var aTypedArray$d = arrayBufferViewCore.aTypedArray;
  var getTypedArrayConstructor$2 = arrayBufferViewCore.getTypedArrayConstructor;
  var exportTypedArrayMethod$d = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.map` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
  exportTypedArrayMethod$d('map', function map(mapfn /* , thisArg */) {
    return $map$1(aTypedArray$d(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
      return new (getTypedArrayConstructor$2(O))(length);
    });
  });

  var $TypeError$j = TypeError;

  var REDUCE_EMPTY = 'Reduce of empty array with no initial value';

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod$4 = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      var O = toObject(that);
      var self = indexedObject(O);
      var length = lengthOfArrayLike(O);
      aCallable(callbackfn);
      if (length === 0 && argumentsLength < 2) throw new $TypeError$j(REDUCE_EMPTY);
      var index = IS_RIGHT ? length - 1 : 0;
      var i = IS_RIGHT ? -1 : 1;
      if (argumentsLength < 2) while (true) {
        if (index in self) {
          memo = self[index];
          index += i;
          break;
        }
        index += i;
        if (IS_RIGHT ? index < 0 : length <= index) {
          throw new $TypeError$j(REDUCE_EMPTY);
        }
      }
      for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }
      return memo;
    };
  };

  var arrayReduce = {
    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    left: createMethod$4(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod$4(true)
  };

  var $reduce = arrayReduce.left;

  var aTypedArray$e = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$e = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
  exportTypedArrayMethod$e('reduce', function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(aTypedArray$e(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
  });

  var $reduceRight = arrayReduce.right;

  var aTypedArray$f = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$f = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
  exportTypedArrayMethod$f('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduceRight(aTypedArray$f(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
  });

  var aTypedArray$g = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$g = arrayBufferViewCore.exportTypedArrayMethod;
  var floor$4 = Math.floor;

  // `%TypedArray%.prototype.reverse` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
  exportTypedArrayMethod$g('reverse', function reverse() {
    var that = this;
    var length = aTypedArray$g(that).length;
    var middle = floor$4(length / 2);
    var index = 0;
    var value;
    while (index < middle) {
      value = that[index];
      that[index++] = that[--length];
      that[length] = value;
    } return that;
  });

  var RangeError$3 = globalThis_1.RangeError;
  var Int8Array$3 = globalThis_1.Int8Array;
  var Int8ArrayPrototype$1 = Int8Array$3 && Int8Array$3.prototype;
  var $set = Int8ArrayPrototype$1 && Int8ArrayPrototype$1.set;
  var aTypedArray$h = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$h = arrayBufferViewCore.exportTypedArrayMethod;

  var WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS = !fails(function () {
    // eslint-disable-next-line es/no-typed-arrays -- required for testing
    var array = new Uint8ClampedArray(2);
    functionCall($set, array, { length: 1, 0: 3 }, 1);
    return array[1] !== 3;
  });

  // https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
  var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS && arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS && fails(function () {
    var array = new Int8Array$3(2);
    array.set(1);
    array.set('2', 1);
    return array[0] !== 0 || array[1] !== 2;
  });

  // `%TypedArray%.prototype.set` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
  exportTypedArrayMethod$h('set', function set(arrayLike /* , offset */) {
    aTypedArray$h(this);
    var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
    var src = toObject(arrayLike);
    if (WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS) return functionCall($set, this, src, offset);
    var length = this.length;
    var len = lengthOfArrayLike(src);
    var index = 0;
    if (len + offset > length) throw new RangeError$3('Wrong length');
    while (index < len) this[offset + index] = src[index++];
  }, !WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

  var aTypedArray$i = arrayBufferViewCore.aTypedArray;
  var getTypedArrayConstructor$3 = arrayBufferViewCore.getTypedArrayConstructor;
  var exportTypedArrayMethod$i = arrayBufferViewCore.exportTypedArrayMethod;

  var FORCED$6 = fails(function () {
    // eslint-disable-next-line es/no-typed-arrays -- required for testing
    new Int8Array(1).slice();
  });

  // `%TypedArray%.prototype.slice` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
  exportTypedArrayMethod$i('slice', function slice(start, end) {
    var list = arraySlice(aTypedArray$i(this), start, end);
    var C = getTypedArrayConstructor$3(this);
    var index = 0;
    var length = list.length;
    var result = new C(length);
    while (length > index) result[index] = list[index++];
    return result;
  }, FORCED$6);

  var $some = arrayIteration.some;

  var aTypedArray$j = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$j = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.some` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
  exportTypedArrayMethod$j('some', function some(callbackfn /* , thisArg */) {
    return $some(aTypedArray$j(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var aTypedArray$k = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$k = arrayBufferViewCore.exportTypedArrayMethod;
  var Uint16Array = globalThis_1.Uint16Array;
  var nativeSort$1 = Uint16Array && functionUncurryThisClause(Uint16Array.prototype.sort);

  // WebKit
  var ACCEPT_INCORRECT_ARGUMENTS = !!nativeSort$1 && !(fails(function () {
    nativeSort$1(new Uint16Array(2), null);
  }) && fails(function () {
    nativeSort$1(new Uint16Array(2), {});
  }));

  var STABLE_SORT$1 = !!nativeSort$1 && !fails(function () {
    // feature detection can be too slow, so check engines versions
    if (environmentV8Version) return environmentV8Version < 74;
    if (environmentFfVersion) return environmentFfVersion < 67;
    if (environmentIsIeOrEdge) return true;
    if (environmentWebkitVersion) return environmentWebkitVersion < 602;

    var array = new Uint16Array(516);
    var expected = Array(516);
    var index, mod;

    for (index = 0; index < 516; index++) {
      mod = index % 4;
      array[index] = 515 - index;
      expected[index] = index - 2 * mod + 3;
    }

    nativeSort$1(array, function (a, b) {
      return (a / 4 | 0) - (b / 4 | 0);
    });

    for (index = 0; index < 516; index++) {
      if (array[index] !== expected[index]) return true;
    }
  });

  var getSortCompare$1 = function (comparefn) {
    return function (x, y) {
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      // eslint-disable-next-line no-self-compare -- NaN check
      if (y !== y) return -1;
      // eslint-disable-next-line no-self-compare -- NaN check
      if (x !== x) return 1;
      if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
      return x > y;
    };
  };

  // `%TypedArray%.prototype.sort` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
  exportTypedArrayMethod$k('sort', function sort(comparefn) {
    if (comparefn !== undefined) aCallable(comparefn);
    if (STABLE_SORT$1) return nativeSort$1(this, comparefn);

    return arraySort(aTypedArray$k(this), getSortCompare$1(comparefn));
  }, !STABLE_SORT$1 || ACCEPT_INCORRECT_ARGUMENTS);

  var aTypedArray$l = arrayBufferViewCore.aTypedArray;
  var getTypedArrayConstructor$4 = arrayBufferViewCore.getTypedArrayConstructor;
  var exportTypedArrayMethod$l = arrayBufferViewCore.exportTypedArrayMethod;

  // `%TypedArray%.prototype.subarray` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray
  exportTypedArrayMethod$l('subarray', function subarray(begin, end) {
    var O = aTypedArray$l(this);
    var length = O.length;
    var beginIndex = toAbsoluteIndex(begin, length);
    var C = getTypedArrayConstructor$4(O);
    return new C(
      O.buffer,
      O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
      toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
    );
  });

  var Int8Array$4 = globalThis_1.Int8Array;
  var aTypedArray$m = arrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$m = arrayBufferViewCore.exportTypedArrayMethod;
  var $toLocaleString = [].toLocaleString;

  // iOS Safari 6.x fails here
  var TO_LOCALE_STRING_BUG = !!Int8Array$4 && fails(function () {
    $toLocaleString.call(new Int8Array$4(1));
  });

  var FORCED$7 = fails(function () {
    return [1, 2].toLocaleString() !== new Int8Array$4([1, 2]).toLocaleString();
  }) || !fails(function () {
    Int8Array$4.prototype.toLocaleString.call([1, 2]);
  });

  // `%TypedArray%.prototype.toLocaleString` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
  exportTypedArrayMethod$m('toLocaleString', function toLocaleString() {
    return functionApply(
      $toLocaleString,
      TO_LOCALE_STRING_BUG ? arraySlice(aTypedArray$m(this)) : aTypedArray$m(this),
      arraySlice(arguments)
    );
  }, FORCED$7);

  var exportTypedArrayMethod$n = arrayBufferViewCore.exportTypedArrayMethod;




  var Uint8Array$2 = globalThis_1.Uint8Array;
  var Uint8ArrayPrototype = Uint8Array$2 && Uint8Array$2.prototype || {};
  var arrayToString = [].toString;
  var join$1 = functionUncurryThis([].join);

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = function toString() {
      return join$1(this);
    };
  }

  var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString !== arrayToString;

  // `%TypedArray%.prototype.toString` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring
  exportTypedArrayMethod$n('toString', arrayToString, IS_NOT_ARRAY_METHOD);

  var getWeakData = internalMetadata.getWeakData;









  var setInternalState$6 = internalState.set;
  var internalStateGetterFor$1 = internalState.getterFor;
  var find = arrayIteration.find;
  var findIndex = arrayIteration.findIndex;
  var splice = functionUncurryThis([].splice);
  var id$1 = 0;

  // fallback for uncaught frozen keys
  var uncaughtFrozenStore = function (state) {
    return state.frozen || (state.frozen = new UncaughtFrozenStore());
  };

  var UncaughtFrozenStore = function () {
    this.entries = [];
  };

  var findUncaughtFrozen = function (store, key) {
    return find(store.entries, function (it) {
      return it[0] === key;
    });
  };

  UncaughtFrozenStore.prototype = {
    get: function (key) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) return entry[1];
    },
    has: function (key) {
      return !!findUncaughtFrozen(this, key);
    },
    set: function (key, value) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) entry[1] = value;
      else this.entries.push([key, value]);
    },
    'delete': function (key) {
      var index = findIndex(this.entries, function (it) {
        return it[0] === key;
      });
      if (~index) splice(this.entries, index, 1);
      return !!~index;
    }
  };

  var collectionWeak = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var Constructor = wrapper(function (that, iterable) {
        anInstance(that, Prototype);
        setInternalState$6(that, {
          type: CONSTRUCTOR_NAME,
          id: id$1++,
          frozen: null
        });
        if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var Prototype = Constructor.prototype;

      var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var data = getWeakData(anObject(key), true);
        if (data === true) uncaughtFrozenStore(state).set(key, value);
        else data[state.id] = value;
        return that;
      };

      defineBuiltIns(Prototype, {
        // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
        // https://tc39.es/ecma262/#sec-weakset.prototype.delete
        'delete': function (key) {
          var state = getInternalState(this);
          if (!isObject(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state)['delete'](key);
          return data && hasOwnProperty_1(data, state.id) && delete data[state.id];
        },
        // `{ WeakMap, WeakSet }.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-weakmap.prototype.has
        // https://tc39.es/ecma262/#sec-weakset.prototype.has
        has: function has(key) {
          var state = getInternalState(this);
          if (!isObject(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).has(key);
          return data && hasOwnProperty_1(data, state.id);
        }
      });

      defineBuiltIns(Prototype, IS_MAP ? {
        // `WeakMap.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-weakmap.prototype.get
        get: function get(key) {
          var state = getInternalState(this);
          if (isObject(key)) {
            var data = getWeakData(key);
            if (data === true) return uncaughtFrozenStore(state).get(key);
            if (data) return data[state.id];
          }
        },
        // `WeakMap.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-weakmap.prototype.set
        set: function set(key, value) {
          return define(this, key, value);
        }
      } : {
        // `WeakSet.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-weakset.prototype.add
        add: function add(value) {
          return define(this, value, true);
        }
      });

      return Constructor;
    }
  };

  var enforceInternalState$1 = internalState.enforce;



  var $Object$5 = Object;
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$1 = Array.isArray;
  // eslint-disable-next-line es/no-object-isextensible -- safe
  var isExtensible = $Object$5.isExtensible;
  // eslint-disable-next-line es/no-object-isfrozen -- safe
  var isFrozen = $Object$5.isFrozen;
  // eslint-disable-next-line es/no-object-issealed -- safe
  var isSealed = $Object$5.isSealed;
  // eslint-disable-next-line es/no-object-freeze -- safe
  var freeze = $Object$5.freeze;
  // eslint-disable-next-line es/no-object-seal -- safe
  var seal = $Object$5.seal;

  var IS_IE11 = !globalThis_1.ActiveXObject && 'ActiveXObject' in globalThis_1;
  var InternalWeakMap;

  var wrapper = function (init) {
    return function WeakMap() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  };

  // `WeakMap` constructor
  // https://tc39.es/ecma262/#sec-weakmap-constructor
  var $WeakMap = collection('WeakMap', wrapper, collectionWeak);
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeSet = functionUncurryThis(WeakMapPrototype.set);

  // Chakra Edge bug: adding frozen arrays to WeakMap unfreeze them
  var hasMSEdgeFreezingBug = function () {
    return freezing && fails(function () {
      var frozenArray = freeze([]);
      nativeSet(new $WeakMap(), frozenArray, 1);
      return !isFrozen(frozenArray);
    });
  };

  // IE11 WeakMap frozen keys fix
  // We can't use feature detection because it crash some old IE builds
  // https://github.com/zloirock/core-js/issues/485
  if (weakMapBasicDetection) if (IS_IE11) {
    InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
    internalMetadata.enable();
    var nativeDelete = functionUncurryThis(WeakMapPrototype['delete']);
    var nativeHas = functionUncurryThis(WeakMapPrototype.has);
    var nativeGet = functionUncurryThis(WeakMapPrototype.get);
    defineBuiltIns(WeakMapPrototype, {
      'delete': function (key) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceInternalState$1(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeDelete(this, key) || state.frozen['delete'](key);
        } return nativeDelete(this, key);
      },
      has: function has(key) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceInternalState$1(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas(this, key) || state.frozen.has(key);
        } return nativeHas(this, key);
      },
      get: function get(key) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceInternalState$1(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas(this, key) ? nativeGet(this, key) : state.frozen.get(key);
        } return nativeGet(this, key);
      },
      set: function set(key, value) {
        if (isObject(key) && !isExtensible(key)) {
          var state = enforceInternalState$1(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          nativeHas(this, key) ? nativeSet(this, key, value) : state.frozen.set(key, value);
        } else nativeSet(this, key, value);
        return this;
      }
    });
  // Chakra Edge frozen keys fix
  } else if (hasMSEdgeFreezingBug()) {
    defineBuiltIns(WeakMapPrototype, {
      set: function set(key, value) {
        var arrayIntegrityLevel;
        if (isArray$1(key)) {
          if (isFrozen(key)) arrayIntegrityLevel = freeze;
          else if (isSealed(key)) arrayIntegrityLevel = seal;
        }
        nativeSet(this, key, value);
        if (arrayIntegrityLevel) arrayIntegrityLevel(key);
        return this;
      }
    });
  }

  // `globalThis` object
  // https://tc39.es/ecma262/#sec-globalthis
  _export({ global: true, forced: globalThis_1.globalThis !== globalThis_1 }, {
    globalThis: globalThis_1
  });

  var ITERATOR$6 = wellKnownSymbol('iterator');
  var ArrayValues = es_array_iterator.values;

  var handlePrototype$1 = function (CollectionPrototype, COLLECTION_NAME) {
    if (CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[ITERATOR$6] !== ArrayValues) try {
        createNonEnumerableProperty(CollectionPrototype, ITERATOR$6, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR$6] = ArrayValues;
      }
      setToStringTag(CollectionPrototype, COLLECTION_NAME, true);
      if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
          createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
        }
      }
    }
  };

  for (var COLLECTION_NAME$1 in domIterables) {
    handlePrototype$1(globalThis_1[COLLECTION_NAME$1] && globalThis_1[COLLECTION_NAME$1].prototype, COLLECTION_NAME$1);
  }

  handlePrototype$1(domTokenListPrototype, 'DOMTokenList');

  function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
  function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray$1(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
  function _unsupportedIterableToArray$1(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray$1(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0; } }
  function _arrayLikeToArray$1(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function noop$1() {}
  var identity = function (x) {
    return x;
  };
  function assign(tar, src) {
    // @ts-ignore
    for (var k in src) tar[k] = src[k];
    return tar;
  }
  function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
      loc: {
        file: file,
        line: line,
        column: column,
        char: char
      }
    };
  }
  function run$1(fn) {
    return fn();
  }
  function blank_object() {
    return Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run$1);
  }
  function is_function(thing) {
    return typeof thing === 'function';
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a && _typeof(a) === 'object' || typeof a === 'function';
  }
  var src_url_equal_anchor;
  function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
      src_url_equal_anchor = document.createElement('a');
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
      throw new Error("'".concat(name, "' is not a store with a 'subscribe' method"));
    }
  }
  function subscribe(store) {
    if (store == null) {
      return noop$1;
    }
    for (var _len = arguments.length, callbacks = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      callbacks[_key - 1] = arguments[_key];
    }
    var unsub = store.subscribe.apply(store, callbacks);
    return unsub.unsubscribe ? function () {
      return unsub.unsubscribe();
    } : unsub;
  }
  function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
  }
  function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
      var slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
      return definition[0](slot_ctx);
    }
  }
  function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
  }
  function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
      var lets = definition[2](fn(dirty));
      if ($$scope.dirty === undefined) {
        return lets;
      }
      if (_typeof(lets) === 'object') {
        var merged = [];
        var len = Math.max($$scope.dirty.length, lets.length);
        for (var i = 0; i < len; i += 1) {
          merged[i] = $$scope.dirty[i] | lets[i];
        }
        return merged;
      }
      return $$scope.dirty | lets;
    }
    return $$scope.dirty;
  }
  function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
      var slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
      slot.p(slot_context, slot_changes);
    }
  }
  function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
      var dirty = [];
      var length = $$scope.ctx.length / 32;
      for (var i = 0; i < length; i++) {
        dirty[i] = -1;
      }
      return dirty;
    }
    return -1;
  }
  function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop$1;
  }
  var is_client = typeof window !== 'undefined';
  var now = is_client ? function () {
    return window.performance.now();
  } : function () {
    return Date.now();
  };
  var raf = is_client ? function (cb) {
    return requestAnimationFrame(cb);
  } : noop$1;
  var tasks = new Set();
  function run_tasks(now) {
    tasks.forEach(function (task) {
      if (!task.c(now)) {
        tasks.delete(task);
        task.f();
      }
    });
    if (tasks.size !== 0) raf(run_tasks);
  }
  /**
   * Creates a new task that runs on each raf frame
   * until it returns a falsy value or is aborted
   */
  function loop(callback) {
    var task;
    if (tasks.size === 0) raf(run_tasks);
    return {
      promise: new Promise(function (fulfill) {
        tasks.add(task = {
          c: callback,
          f: fulfill
        });
      }),
      abort: function () {
        tasks.delete(task);
      }
    };
  }
  var globals = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : global;

  /**
   * Resize observer singleton.
   * One listener per element only!
   * https://groups.google.com/a/chromium.org/g/blink-dev/c/z6ienONUb5A/m/F5-VcUZtBAAJ
   */
  var ResizeObserverSingleton = /*#__PURE__*/function () {
    function ResizeObserverSingleton(options) {
      _classCallCheck(this, ResizeObserverSingleton);
      this.options = options;
      this._listeners = 'WeakMap' in globals ? new WeakMap() : undefined;
    }
    return _createClass(ResizeObserverSingleton, [{
      key: "observe",
      value: function (element, listener) {
        var _this = this;
        this._listeners.set(element, listener);
        this._getObserver().observe(element, this.options);
        return function () {
          _this._listeners.delete(element);
          _this._observer.unobserve(element); // this line can probably be removed
        };
      }
    }, {
      key: "_getObserver",
      value: function () {
        var _this2 = this;
        var _a;
        return (_a = this._observer) !== null && _a !== void 0 ? _a : this._observer = new ResizeObserver(function (entries) {
          var _a;
          var _iterator = _createForOfIteratorHelper(entries),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var entry = _step.value;
              ResizeObserverSingleton.entries.set(entry.target, entry);
              (_a = _this2._listeners.get(entry.target)) === null || _a === void 0 ? void 0 : _a(entry);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        });
      }
    }]);
  }(); // Needs to be written like this to pass the tree-shake-test
  ResizeObserverSingleton.entries = 'WeakMap' in globals ? new WeakMap() : undefined;
  function append(target, node) {
    target.appendChild(node);
  }
  function get_root_for_style(node) {
    if (!node) return document;
    var root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
      return root;
    }
    return node.ownerDocument;
  }
  function append_empty_stylesheet(node) {
    var style_element = element('style');
    append_stylesheet(get_root_for_style(node), style_element);
    return style_element.sheet;
  }
  function append_stylesheet(node, style) {
    append(node.head || node, style);
    return style.sheet;
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  function destroy_each(iterations, detaching) {
    for (var i = 0; i < iterations.length; i += 1) {
      if (iterations[i]) iterations[i].d(detaching);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(' ');
  }
  function empty() {
    return text('');
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return function () {
      return node.removeEventListener(event, handler, options);
    };
  }
  function prevent_default(fn) {
    return function (event) {
      event.preventDefault();
      // @ts-ignore
      return fn.call(this, event);
    };
  }
  function attr(node, attribute, value) {
    if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
  }
  function children(element) {
    return Array.from(element.childNodes);
  }
  function set_input_value(input, value) {
    input.value = value == null ? '' : value;
  }
  function set_style(node, key, value, important) {
    if (value == null) {
      node.style.removeProperty(key);
    } else {
      node.style.setProperty(key, value, important ? 'important' : '');
    }
  }
  function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
  }
  function custom_event(type, detail) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$bubbles = _ref.bubbles,
      bubbles = _ref$bubbles === void 0 ? false : _ref$bubbles,
      _ref$cancelable = _ref.cancelable,
      cancelable = _ref$cancelable === void 0 ? false : _ref$cancelable;
    var e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
  }
  var HtmlTag = /*#__PURE__*/function () {
    function HtmlTag() {
      var is_svg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      _classCallCheck(this, HtmlTag);
      this.is_svg = false;
      this.is_svg = is_svg;
      this.e = this.n = null;
    }
    return _createClass(HtmlTag, [{
      key: "c",
      value: function (html) {
        this.h(html);
      }
    }, {
      key: "m",
      value: function (html, target) {
        var anchor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        if (!this.e) {
          if (this.is_svg) this.e = svg_element(target.nodeName);
          /** #7364  target for <template> may be provided as #document-fragment(11) */else this.e = element(target.nodeType === 11 ? 'TEMPLATE' : target.nodeName);
          this.t = target.tagName !== 'TEMPLATE' ? target : target.content;
          this.c(html);
        }
        this.i(anchor);
      }
    }, {
      key: "h",
      value: function (html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.nodeName === 'TEMPLATE' ? this.e.content.childNodes : this.e.childNodes);
      }
    }, {
      key: "i",
      value: function (anchor) {
        for (var _i4 = 0; _i4 < this.n.length; _i4 += 1) {
          insert(this.t, this.n[_i4], anchor);
        }
      }
    }, {
      key: "p",
      value: function (html) {
        this.d();
        this.h(html);
        this.i(this.a);
      }
    }, {
      key: "d",
      value: function () {
        this.n.forEach(detach);
      }
    }]);
  }();

  // we need to store the information for multiple documents because a Svelte application could also contain iframes
  // https://github.com/sveltejs/svelte/issues/3624
  var managed_styles = new Map();
  var active = 0;
  // https://github.com/darkskyapp/string-hash/blob/master/index.js
  function hash(str) {
    var hash = 5381;
    var i = str.length;
    while (i--) hash = (hash << 5) - hash ^ str.charCodeAt(i);
    return hash >>> 0;
  }
  function create_style_information(doc, node) {
    var info = {
      stylesheet: append_empty_stylesheet(node),
      rules: {}
    };
    managed_styles.set(doc, info);
    return info;
  }
  function create_rule(node, a, b, duration, delay, ease, fn) {
    var uid = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var keyframes = '{\n';
    for (var p = 0; p <= 1; p += 16.666 / duration) {
      var t = a + (b - a) * ease(p);
      keyframes += p * 100 + "%{".concat(fn(t, 1 - t), "}\n");
    }
    var rule = keyframes + "100% {".concat(fn(b, 1 - b), "}\n}");
    var name = "__svelte_".concat(hash(rule), "_").concat(uid);
    var doc = get_root_for_style(node);
    var _ref2 = managed_styles.get(doc) || create_style_information(doc, node),
      stylesheet = _ref2.stylesheet,
      rules = _ref2.rules;
    if (!rules[name]) {
      rules[name] = true;
      stylesheet.insertRule("@keyframes ".concat(name, " ").concat(rule), stylesheet.cssRules.length);
    }
    var animation = node.style.animation || '';
    node.style.animation = "".concat(animation ? "".concat(animation, ", ") : '').concat(name, " ").concat(duration, "ms linear ").concat(delay, "ms 1 both");
    active += 1;
    return name;
  }
  function delete_rule(node, name) {
    var previous = (node.style.animation || '').split(', ');
    var next = previous.filter(name ? function (anim) {
      return anim.indexOf(name) < 0;
    } // remove specific animation
    : function (anim) {
      return anim.indexOf('__svelte') === -1;
    } // remove all Svelte animations
    );
    var deleted = previous.length - next.length;
    if (deleted) {
      node.style.animation = next.join(', ');
      active -= deleted;
      if (!active) clear_rules();
    }
  }
  function clear_rules() {
    raf(function () {
      if (active) return;
      managed_styles.forEach(function (info) {
        var ownerNode = info.stylesheet.ownerNode;
        // there is no ownerNode if it runs on jsdom.
        if (ownerNode) detach(ownerNode);
      });
      managed_styles.clear();
    });
  }
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component) throw new Error('Function called outside component initialization');
    return current_component;
  }
  /**
   * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
   * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
   * it can be called from an external module).
   *
   * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
   *
   * https://svelte.dev/docs#run-time-svelte-onmount
   */
  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }
  /**
   * Schedules a callback to run immediately before the component is unmounted.
   *
   * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
   * only one that runs inside a server-side component.
   *
   * https://svelte.dev/docs#run-time-svelte-ondestroy
   */
  function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
  }
  /**
   * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
   * Event dispatchers are functions that can take two arguments: `name` and `detail`.
   *
   * Component events created with `createEventDispatcher` create a
   * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
   * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
   * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
   * property and can contain any type of data.
   *
   * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
   */
  function createEventDispatcher() {
    var component = get_current_component();
    return function (type, detail) {
      var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref3$cancelable = _ref3.cancelable,
        cancelable = _ref3$cancelable === void 0 ? false : _ref3$cancelable;
      var callbacks = component.$$.callbacks[type];
      if (callbacks) {
        // TODO are there situations where events could be dispatched
        // in a server (non-DOM) environment?
        var event = custom_event(type, detail, {
          cancelable: cancelable
        });
        callbacks.slice().forEach(function (fn) {
          fn.call(component, event);
        });
        return !event.defaultPrevented;
      }
      return true;
    };
  }
  // TODO figure out if we still want to support
  // shorthand events, or if we want to implement
  // a real bubbling mechanism
  function bubble(component, event) {
    var _this4 = this;
    var callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
      // @ts-ignore
      callbacks.slice().forEach(function (fn) {
        return fn.call(_this4, event);
      });
    }
  }
  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = /* @__PURE__ */Promise.resolve();
  var update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush$1);
    }
  }
  function tick() {
    schedule_update();
    return resolved_promise;
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  // flush() calls callbacks in this order:
  // 1. All beforeUpdate callbacks, in order: parents before children
  // 2. All bind:this callbacks, in reverse order: children before parents.
  // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
  //    for afterUpdates called during the initial onMount, which are called in
  //    reverse order: children before parents.
  // Since callbacks might update component values, which could trigger another
  // call to flush(), the following steps guard against this:
  // 1. During beforeUpdate, any updated components will be added to the
  //    dirty_components array and will cause a reentrant call to flush(). Because
  //    the flush index is kept outside the function, the reentrant call will pick
  //    up where the earlier call left off and go through all dirty components. The
  //    current_component value is saved and restored so that the reentrant call will
  //    not interfere with the "parent" flush() call.
  // 2. bind:this callbacks cannot trigger new flush() calls.
  // 3. During afterUpdate, any updated components will NOT have their afterUpdate
  //    callback called a second time; the seen_callbacks set, outside the flush()
  //    function, guarantees this behavior.
  var seen_callbacks = new Set();
  var flushidx = 0; // Do *not* move this inside the flush() function
  function flush$1() {
    // Do not reenter flush while dirty components are updated, as this can
    // result in an infinite loop. Instead, let the inner flush handle it.
    // Reentrancy is ok afterwards for bindings etc.
    if (flushidx !== 0) {
      return;
    }
    var saved_component = current_component;
    do {
      // first, call beforeUpdate functions
      // and update components
      try {
        while (flushidx < dirty_components.length) {
          var component = dirty_components[flushidx];
          flushidx++;
          set_current_component(component);
          update(component.$$);
        }
      } catch (e) {
        // reset dirty state to not end up in a deadlocked state and then rethrow
        dirty_components.length = 0;
        flushidx = 0;
        throw e;
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length) binding_callbacks.pop()();
      // then, once components are updated, call
      // afterUpdate functions. This may cause
      // subsequent updates...
      for (var i = 0; i < render_callbacks.length; i += 1) {
        var callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          // ...so guard against infinite loops
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      var dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  /**
   * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
   */
  function flush_render_callbacks(fns) {
    var filtered = [];
    var targets = [];
    render_callbacks.forEach(function (c) {
      return fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c);
    });
    targets.forEach(function (c) {
      return c();
    });
    render_callbacks = filtered;
  }
  var promise$1;
  function wait() {
    if (!promise$1) {
      promise$1 = Promise.resolve();
      promise$1.then(function () {
        promise$1 = null;
      });
    }
    return promise$1;
  }
  function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event("".concat(direction ? 'intro' : 'outro').concat(kind)));
  }
  var outroing = new Set();
  var outros;
  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros // parent group
    };
  }
  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }
    outros = outros.p;
  }
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function transition_out(block, local, detach, callback) {
    if (block && block.o) {
      if (outroing.has(block)) return;
      outroing.add(block);
      outros.c.push(function () {
        outroing.delete(block);
        if (callback) {
          if (detach) block.d(1);
          callback();
        }
      });
      block.o(local);
    } else if (callback) {
      callback();
    }
  }
  var null_transition = {
    duration: 0
  };
  function create_in_transition(node, fn, params) {
    var options = {
      direction: 'in'
    };
    var config = fn(node, params, options);
    var running = false;
    var animation_name;
    var task;
    var uid = 0;
    function cleanup() {
      if (animation_name) delete_rule(node, animation_name);
    }
    function go() {
      var _ref4 = config || null_transition,
        _ref4$delay = _ref4.delay,
        delay = _ref4$delay === void 0 ? 0 : _ref4$delay,
        _ref4$duration = _ref4.duration,
        duration = _ref4$duration === void 0 ? 300 : _ref4$duration,
        _ref4$easing = _ref4.easing,
        easing = _ref4$easing === void 0 ? identity : _ref4$easing,
        _ref4$tick = _ref4.tick,
        tick = _ref4$tick === void 0 ? noop$1 : _ref4$tick,
        css = _ref4.css;
      if (css) animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
      tick(0, 1);
      var start_time = now() + delay;
      if (task) task.abort();
      running = true;
      add_render_callback(function () {
        return dispatch(node, true, 'start');
      });
      task = loop(function (now) {
        if (running) {
          if (now >= start_time + duration) {
            tick(1, 0);
            dispatch(node, true, 'end');
            cleanup();
            return running = false;
          }
          if (now >= start_time) {
            var t = easing((now - start_time) / duration);
            tick(t, 1 - t);
          }
        }
        return running;
      });
    }
    var started = false;
    return {
      start: function () {
        if (started) return;
        started = true;
        delete_rule(node);
        if (is_function(config)) {
          config = config(options);
          wait().then(go);
        } else {
          go();
        }
      },
      invalidate: function () {
        started = false;
      },
      end: function () {
        if (running) {
          cleanup();
          running = false;
        }
      }
    };
  }
  function create_component(block) {
    block && block.c();
  }
  function mount_component(component, target, anchor, customElement) {
    var _component$$$ = component.$$,
      fragment = _component$$$.fragment,
      after_update = _component$$$.after_update;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
      // onMount happens before the initial afterUpdate
      add_render_callback(function () {
        var new_on_destroy = component.$$.on_mount.map(run$1).filter(is_function);
        // if the component was destroyed immediately
        // it will update the `$$.on_destroy` reference to `null`.
        // the destructured on_destroy may still reference to the old array
        if (component.$$.on_destroy) {
          var _component$$$$on_dest;
          (_component$$$$on_dest = component.$$.on_destroy).push.apply(_component$$$$on_dest, _toConsumableArray(new_on_destroy));
        } else {
          // Edge case - component was destroyed immediately,
          // most likely as a result of a binding initialising
          run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
      });
    }
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    var $$ = component.$$;
    if ($$.fragment !== null) {
      flush_render_callbacks($$.after_update);
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      // TODO null out other refs, including component.$$ (but need to
      // preserve final state?)
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance, create_fragment, not_equal, props, append_styles) {
    var dirty = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [-1];
    var parent_component = current_component;
    set_current_component(component);
    var $$ = component.$$ = {
      fragment: null,
      ctx: [],
      // state
      props: props,
      update: noop$1,
      not_equal: not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      // everything else
      callbacks: blank_object(),
      dirty: dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    var ready = false;
    $$.ctx = instance ? instance(component, options.props || {}, function (i, ret) {
      var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
        if (ready) make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        var nodes = children(options.target);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        $$.fragment && $$.fragment.c();
      }
      if (options.intro) transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor, options.customElement);
      flush$1();
    }
    set_current_component(parent_component);
  }
  /**
   * Base class for Svelte components. Used when dev=false.
   */
  var SvelteComponent = /*#__PURE__*/function () {
    function SvelteComponent() {
      _classCallCheck(this, SvelteComponent);
    }
    return _createClass(SvelteComponent, [{
      key: "$destroy",
      value: function $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop$1;
      }
    }, {
      key: "$on",
      value: function $on(type, callback) {
        if (!is_function(callback)) {
          return noop$1;
        }
        var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return function () {
          var index = callbacks.indexOf(callback);
          if (index !== -1) callbacks.splice(index, 1);
        };
      }
    }, {
      key: "$set",
      value: function $set($$props) {
        if (this.$$set && !is_empty($$props)) {
          this.$$.skip_bound = true;
          this.$$set($$props);
          this.$$.skip_bound = false;
        }
      }
    }]);
  }();
  function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({
      version: '3.59.2'
    }, detail), {
      bubbles: true
    }));
  }
  function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', {
      target: target,
      node: node
    });
    append(target, node);
  }
  function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', {
      target: target,
      node: node,
      anchor: anchor
    });
    insert(target, node, anchor);
  }
  function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', {
      node: node
    });
    detach(node);
  }
  function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
    var modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default) modifiers.push('preventDefault');
    if (has_stop_propagation) modifiers.push('stopPropagation');
    if (has_stop_immediate_propagation) modifiers.push('stopImmediatePropagation');
    dispatch_dev('SvelteDOMAddEventListener', {
      node: node,
      event: event,
      handler: handler,
      modifiers: modifiers
    });
    var dispose = listen(node, event, handler, options);
    return function () {
      dispatch_dev('SvelteDOMRemoveEventListener', {
        node: node,
        event: event,
        handler: handler,
        modifiers: modifiers
      });
      dispose();
    };
  }
  function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null) dispatch_dev('SvelteDOMRemoveAttribute', {
      node: node,
      attribute: attribute
    });else dispatch_dev('SvelteDOMSetAttribute', {
      node: node,
      attribute: attribute,
      value: value
    });
  }
  function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev('SvelteDOMSetProperty', {
      node: node,
      property: property,
      value: value
    });
  }
  function set_data_dev(text, data) {
    data = '' + data;
    if (text.data === data) return;
    dispatch_dev('SvelteDOMSetData', {
      node: text,
      data: data
    });
    text.data = data;
  }
  function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && _typeof(arg) === 'object' && 'length' in arg)) {
      var msg = '{#each} only iterates over array-like objects.';
      if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
        msg += ' You can use a spread to convert this iterable into an array.';
      }
      throw new Error(msg);
    }
  }
  function validate_slots(name, slot, keys) {
    for (var _i6 = 0, _Object$keys = Object.keys(slot); _i6 < _Object$keys.length; _i6++) {
      var slot_key = _Object$keys[_i6];
      if (!~keys.indexOf(slot_key)) {
        console.warn("<".concat(name, "> received an unexpected slot \"").concat(slot_key, "\"."));
      }
    }
  }
  function construct_svelte_component_dev(component, props) {
    var error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
    try {
      var instance = new component(props);
      if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
        throw new Error(error_message);
      }
      return instance;
    } catch (err) {
      var message = err.message;
      if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
        throw new Error(error_message);
      } else {
        throw err;
      }
    }
  }
  /**
   * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
   */
  var SvelteComponentDev = /*#__PURE__*/function (_SvelteComponent) {
    function SvelteComponentDev(options) {
      _classCallCheck(this, SvelteComponentDev);
      if (!options || !options.target && !options.$$inline) {
        throw new Error("'target' is a required option");
      }
      return _callSuper(this, SvelteComponentDev);
    }
    _inherits(SvelteComponentDev, _SvelteComponent);
    return _createClass(SvelteComponentDev, [{
      key: "$destroy",
      value: function $destroy() {
        _superPropGet(SvelteComponentDev, "$destroy", this, 3)([]);
        this.$destroy = function () {
          console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
      }
    }, {
      key: "$capture_state",
      value: function $capture_state() {}
    }, {
      key: "$inject_state",
      value: function $inject_state() {}
    }]);
  }(SvelteComponent);

  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }

  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }

  var defineProperty$6 = objectDefineProperty.f;

  var proxyAccessor = function (Target, Source, key) {
    key in Target || defineProperty$6(Target, key, {
      configurable: true,
      get: function () { return Source[key]; },
      set: function (it) { Source[key] = it; }
    });
  };

  var getOwnPropertyNames = objectGetOwnPropertyNames.f;









  var enforceInternalState$2 = internalState.enforce;





  var MATCH$2 = wellKnownSymbol('match');
  var NativeRegExp = globalThis_1.RegExp;
  var RegExpPrototype$3 = NativeRegExp.prototype;
  var SyntaxError = globalThis_1.SyntaxError;
  var exec$2 = functionUncurryThis(RegExpPrototype$3.exec);
  var charAt$5 = functionUncurryThis(''.charAt);
  var replace$5 = functionUncurryThis(''.replace);
  var stringIndexOf = functionUncurryThis(''.indexOf);
  var stringSlice$5 = functionUncurryThis(''.slice);
  // TODO: Use only proper RegExpIdentifierName
  var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
  var re1 = /a/g;
  var re2 = /a/g;

  // "new" should create a new object, old webkit bug
  var CORRECT_NEW = new NativeRegExp(re1) !== re1;

  var MISSED_STICKY$1 = regexpStickyHelpers.MISSED_STICKY;
  var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y;

  var BASE_FORCED = descriptors &&
    (!CORRECT_NEW || MISSED_STICKY$1 || regexpUnsupportedDotAll || regexpUnsupportedNcg || fails(function () {
      re2[MATCH$2] = false;
      // RegExp constructor can alter flags and IsRegExp works correct with @@match
      // eslint-disable-next-line sonarjs/inconsistent-function-call -- required for testing
      return NativeRegExp(re1) !== re1 || NativeRegExp(re2) === re2 || String(NativeRegExp(re1, 'i')) !== '/a/i';
    }));

  var handleDotAll = function (string) {
    var length = string.length;
    var index = 0;
    var result = '';
    var brackets = false;
    var chr;
    for (; index <= length; index++) {
      chr = charAt$5(string, index);
      if (chr === '\\') {
        result += chr + charAt$5(string, ++index);
        continue;
      }
      if (!brackets && chr === '.') {
        result += '[\\s\\S]';
      } else {
        if (chr === '[') {
          brackets = true;
        } else if (chr === ']') {
          brackets = false;
        } result += chr;
      }
    } return result;
  };

  var handleNCG = function (string) {
    var length = string.length;
    var index = 0;
    var result = '';
    var named = [];
    var names = objectCreate(null);
    var brackets = false;
    var ncg = false;
    var groupid = 0;
    var groupname = '';
    var chr;
    for (; index <= length; index++) {
      chr = charAt$5(string, index);
      if (chr === '\\') {
        chr += charAt$5(string, ++index);
      } else if (chr === ']') {
        brackets = false;
      } else if (!brackets) switch (true) {
        case chr === '[':
          brackets = true;
          break;
        case chr === '(':
          result += chr;
          // ignore non-capturing groups
          if (stringSlice$5(string, index + 1, index + 3) === '?:') {
            continue;
          }
          if (exec$2(IS_NCG, stringSlice$5(string, index + 1))) {
            index += 2;
            ncg = true;
          }
          groupid++;
          continue;
        case chr === '>' && ncg:
          if (groupname === '' || hasOwnProperty_1(names, groupname)) {
            throw new SyntaxError('Invalid capture group name');
          }
          names[groupname] = true;
          named[named.length] = [groupname, groupid];
          ncg = false;
          groupname = '';
          continue;
      }
      if (ncg) groupname += chr;
      else result += chr;
    } return [result, named];
  };

  // `RegExp` constructor
  // https://tc39.es/ecma262/#sec-regexp-constructor
  if (isForced_1('RegExp', BASE_FORCED)) {
    var RegExpWrapper = function RegExp(pattern, flags) {
      var thisIsRegExp = objectIsPrototypeOf(RegExpPrototype$3, this);
      var patternIsRegExp = isRegexp(pattern);
      var flagsAreUndefined = flags === undefined;
      var groups = [];
      var rawPattern = pattern;
      var rawFlags, dotAll, sticky, handled, result, state;

      if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
        return pattern;
      }

      if (patternIsRegExp || objectIsPrototypeOf(RegExpPrototype$3, pattern)) {
        pattern = pattern.source;
        if (flagsAreUndefined) flags = regexpGetFlags(rawPattern);
      }

      pattern = pattern === undefined ? '' : toString_1(pattern);
      flags = flags === undefined ? '' : toString_1(flags);
      rawPattern = pattern;

      if (regexpUnsupportedDotAll && 'dotAll' in re1) {
        dotAll = !!flags && stringIndexOf(flags, 's') > -1;
        if (dotAll) flags = replace$5(flags, /s/g, '');
      }

      rawFlags = flags;

      if (MISSED_STICKY$1 && 'sticky' in re1) {
        sticky = !!flags && stringIndexOf(flags, 'y') > -1;
        if (sticky && UNSUPPORTED_Y$2) flags = replace$5(flags, /y/g, '');
      }

      if (regexpUnsupportedNcg) {
        handled = handleNCG(pattern);
        pattern = handled[0];
        groups = handled[1];
      }

      result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$3, RegExpWrapper);

      if (dotAll || sticky || groups.length) {
        state = enforceInternalState$2(result);
        if (dotAll) {
          state.dotAll = true;
          state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
        }
        if (sticky) state.sticky = true;
        if (groups.length) state.groups = groups;
      }

      if (pattern !== rawPattern) try {
        // fails in old engines, but we have no alternatives for unsupported regex syntax
        createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
      } catch (error) { /* empty */ }

      return result;
    };

    for (var keys$1 = getOwnPropertyNames(NativeRegExp), index = 0; keys$1.length > index;) {
      proxyAccessor(RegExpWrapper, NativeRegExp, keys$1[index++]);
    }

    RegExpPrototype$3.constructor = RegExpWrapper;
    RegExpWrapper.prototype = RegExpPrototype$3;
    defineBuiltIn(globalThis_1, 'RegExp', RegExpWrapper, { constructor: true });
  }

  // https://tc39.es/ecma262/#sec-get-regexp-@@species
  setSpecies('RegExp');

  function _createForOfIteratorHelper$1(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray$2(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
  function _unsupportedIterableToArray$2(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray$2(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$2(r, a) : void 0; } }
  function _arrayLikeToArray$2(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  var subscriber_queue = [];
  /**
   * Creates a `Readable` store that allows reading by subscription.
   * @param value initial value
   * @param {StartStopNotifier} [start]
   */
  function readable(value, start) {
    return {
      subscribe: writable(value, start).subscribe
    };
  }
  /**
   * Create a `Writable` store that allows both updating and reading by subscription.
   * @param {*=}value initial value
   * @param {StartStopNotifier=} start
   */
  function writable(value) {
    var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop$1;
    var stop;
    var subscribers = new Set();
    function set(new_value) {
      if (safe_not_equal(value, new_value)) {
        value = new_value;
        if (stop) {
          // store is ready
          var run_queue = !subscriber_queue.length;
          var _iterator = _createForOfIteratorHelper$1(subscribers),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var subscriber = _step.value;
              subscriber[1]();
              subscriber_queue.push(subscriber, value);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          if (run_queue) {
            for (var i = 0; i < subscriber_queue.length; i += 2) {
              subscriber_queue[i][0](subscriber_queue[i + 1]);
            }
            subscriber_queue.length = 0;
          }
        }
      }
    }
    function update(fn) {
      set(fn(value));
    }
    function subscribe(run) {
      var invalidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop$1;
      var subscriber = [run, invalidate];
      subscribers.add(subscriber);
      if (subscribers.size === 1) {
        stop = start(set) || noop$1;
      }
      run(value);
      return function () {
        subscribers.delete(subscriber);
        if (subscribers.size === 0 && stop) {
          stop();
          stop = null;
        }
      };
    }
    return {
      set: set,
      update: update,
      subscribe: subscribe
    };
  }
  function derived(stores, fn, initial_value) {
    var single = !Array.isArray(stores);
    var stores_array = single ? [stores] : stores;
    var auto = fn.length < 2;
    return readable(initial_value, function (set) {
      var started = false;
      var values = [];
      var pending = 0;
      var cleanup = noop$1;
      var sync = function sync() {
        if (pending) {
          return;
        }
        cleanup();
        var result = fn(single ? values[0] : values, set);
        if (auto) {
          set(result);
        } else {
          cleanup = is_function(result) ? result : noop$1;
        }
      };
      var unsubscribers = stores_array.map(function (store, i) {
        return subscribe(store, function (value) {
          values[i] = value;
          pending &= ~(1 << i);
          if (started) {
            sync();
          }
        }, function () {
          pending |= 1 << i;
        });
      });
      started = true;
      sync();
      return function stop() {
        run_all(unsubscribers);
        cleanup();
        // We need to set this to false because callbacks can still happen despite having unsubscribed:
        // Callbacks might already be placed in the queue which doesn't know it should no longer
        // invoke this derived store.
        started = false;
      };
    });
  }

  function regexparam (str, loose) {
    if (str instanceof RegExp) return {
      keys: false,
      pattern: str
    };
    var c,
      o,
      tmp,
      ext,
      keys = [],
      pattern = '',
      arr = str.split('/');
    arr[0] || arr.shift();
    while (tmp = arr.shift()) {
      c = tmp[0];
      if (c === '*') {
        keys.push('wild');
        pattern += '/(.*)';
      } else if (c === ':') {
        o = tmp.indexOf('?', 1);
        ext = tmp.indexOf('.', 1);
        keys.push(tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length));
        pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
        if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
      } else {
        pattern += '/' + tmp;
      }
    }
    return {
      keys: keys,
      pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
    };
  }

  function _callSuper$1(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$1() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct() { return !!t; })(); }
  var Error_1 = globals.Error,
    Object_1 = globals.Object,
    console_1 = globals.console;

  // (219:0) {:else}
  function create_else_block(ctx) {
    var switch_instance;
    var switch_instance_anchor;
    var current;
    var switch_value = /*component*/ctx[0];
    function switch_props() {
      return {
        $$inline: true
      };
    }
    if (switch_value) {
      switch_instance = construct_svelte_component_dev(switch_value, switch_props());
      switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ctx[6]);
    }
    var block = {
      c: function () {
        if (switch_instance) create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
      },
      m: function (target, anchor) {
        if (switch_instance) mount_component(switch_instance, target, anchor);
        insert_dev(target, switch_instance_anchor, anchor);
        current = true;
      },
      p: function (ctx, dirty) {
        if (dirty & /*component*/1 && switch_value !== (switch_value = /*component*/ctx[0])) {
          if (switch_instance) {
            group_outros();
            var old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, function () {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component_dev(switch_value, switch_props());
            switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ctx[6]);
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        }
      },
      i: function (local) {
        if (current) return;
        if (switch_instance) transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        if (switch_instance) transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(switch_instance_anchor);
        if (switch_instance) destroy_component(switch_instance, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_else_block.name,
      type: "else",
      source: "(219:0) {:else}",
      ctx: ctx
    });
    return block;
  }

  // (217:0) {#if componentParams}
  function create_if_block(ctx) {
    var switch_instance;
    var switch_instance_anchor;
    var current;
    var switch_value = /*component*/ctx[0];
    function switch_props(ctx) {
      return {
        props: {
          params: /*componentParams*/ctx[1]
        },
        $$inline: true
      };
    }
    if (switch_value) {
      switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
      switch_instance.$on("routeEvent", /*routeEvent_handler*/ctx[5]);
    }
    var block = {
      c: function () {
        if (switch_instance) create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
      },
      m: function (target, anchor) {
        if (switch_instance) mount_component(switch_instance, target, anchor);
        insert_dev(target, switch_instance_anchor, anchor);
        current = true;
      },
      p: function (ctx, dirty) {
        var switch_instance_changes = {};
        if (dirty & /*componentParams*/2) switch_instance_changes.params = /*componentParams*/ctx[1];
        if (dirty & /*component*/1 && switch_value !== (switch_value = /*component*/ctx[0])) {
          if (switch_instance) {
            group_outros();
            var old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, function () {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
            switch_instance.$on("routeEvent", /*routeEvent_handler*/ctx[5]);
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          switch_instance.$set(switch_instance_changes);
        }
      },
      i: function (local) {
        if (current) return;
        if (switch_instance) transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        if (switch_instance) transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(switch_instance_anchor);
        if (switch_instance) destroy_component(switch_instance, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block.name,
      type: "if",
      source: "(217:0) {#if componentParams}",
      ctx: ctx
    });
    return block;
  }
  function create_fragment(ctx) {
    var current_block_type_index;
    var if_block;
    var if_block_anchor;
    var current;
    var if_block_creators = [create_if_block, create_else_block];
    var if_blocks = [];
    function select_block_type(ctx) {
      if (/*componentParams*/ctx[1]) return 0;
      return 1;
    }
    current_block_type_index = select_block_type(ctx);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    var block = {
      c: function () {
        if_block.c();
        if_block_anchor = empty();
      },
      l: function () {
        throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        if_blocks[current_block_type_index].m(target, anchor);
        insert_dev(target, if_block_anchor, anchor);
        current = true;
      },
      p: function (ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        var previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, function () {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
            if_block.c();
          } else {
            if_block.p(ctx, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      },
      i: function () {
        if (current) return;
        transition_in(if_block);
        current = true;
      },
      o: function () {
        transition_out(if_block);
        current = false;
      },
      d: function (detaching) {
        if_blocks[current_block_type_index].d(detaching);
        if (detaching) detach_dev(if_block_anchor);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function wrap$1(route, userData) {
    for (var _len = arguments.length, conditions = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      conditions[_key - 2] = arguments[_key];
    }
    // Check if we don't have userData
    if (userData && typeof userData == 'function') {
      conditions = conditions && conditions.length ? conditions : [];
      conditions.unshift(userData);
      userData = undefined;
    }

    // Parameter route and each item of conditions must be functions
    if (!route || typeof route != 'function') {
      throw Error('Invalid parameter route');
    }
    if (conditions && conditions.length) {
      for (var i = 0; i < conditions.length; i++) {
        if (!conditions[i] || typeof conditions[i] != 'function') {
          throw Error('Invalid parameter conditions[' + i + ']');
        }
      }
    }

    // Returns an object that contains all the functions to execute too
    var obj = {
      route: route,
      userData: userData
    };
    if (conditions && conditions.length) {
      obj.conditions = conditions;
    }

    // The _sveltesparouter flag is to confirm the object was created by this router
    Object.defineProperty(obj, '_sveltesparouter', {
      value: true
    });
    return obj;
  }

  /**
   * @typedef {Object} Location
   * @property {string} location - Location (page/view), for example `/book`
   * @property {string} [querystring] - Querystring from the hash, as a string not parsed
   */
  /**
   * Returns the current location from the hash.
   *
   * @returns {Location} Location object
   * @private
   */
  function getLocation() {
    var hashPosition = window.location.href.indexOf('#/');
    var location = hashPosition > -1 ? window.location.href.substr(hashPosition + 1) : '/';

    // Check if there's a querystring
    var qsPosition = location.indexOf('?');
    var querystring = '';
    if (qsPosition > -1) {
      querystring = location.substr(qsPosition + 1);
      location = location.substr(0, qsPosition);
    }
    return {
      location: location,
      querystring: querystring
    };
  }
  var loc = readable(null,
  // eslint-disable-next-line prefer-arrow-callback
  function (set) {
    set(getLocation());
    var update = function () {
      set(getLocation());
    };
    window.addEventListener('hashchange', update, false);
    return function () {
      window.removeEventListener('hashchange', update, false);
    };
  });
  var location$1 = derived(loc, function ($loc) {
    return $loc.location;
  });
  var querystring = derived(loc, function ($loc) {
    return $loc.querystring;
  });
  function push$6(location) {
    if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
      throw Error('Invalid parameter location');
    }

    // Execute this code when the current call stack is complete
    return tick().then(function () {
      window.location.hash = (location.charAt(0) == '#' ? '' : '#') + location;
    });
  }
  function pop() {
    // Execute this code when the current call stack is complete
    return tick().then(function () {
      window.history.back();
    });
  }
  function replace$6(location) {
    if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
      throw Error('Invalid parameter location');
    }

    // Execute this code when the current call stack is complete
    return tick().then(function () {
      var dest = (location.charAt(0) == '#' ? '' : '#') + location;
      try {
        window.history.replaceState(undefined, undefined, dest);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Caught exception while replacing the current page. If you\'re running this in the Svelte REPL, please note that the `replace` method might not work in this environment.');
      }

      // The method above doesn't trigger the hashchange event, so let's do that manually
      window.dispatchEvent(new Event('hashchange'));
    });
  }
  function link(node, hrefVar) {
    // Only apply to <a> tags
    if (!node || !node.tagName || node.tagName.toLowerCase() != 'a') {
      throw Error('Action "link" can only be used with <a> tags');
    }
    updateLink(node, hrefVar || node.getAttribute('href'));
    return {
      update: function (updated) {
        updateLink(node, updated);
      }
    };
  }

  // Internal function used by the link function
  function updateLink(node, href) {
    // Destination must start with '/'
    if (!href || href.length < 1 || href.charAt(0) != '/') {
      throw Error('Invalid value for "href" attribute');
    }

    // Add # to the href attribute
    node.setAttribute('href', '#' + href);
  }
  function nextTickPromise(cb) {
    // eslint-disable-next-line no-console
    console.warn('nextTickPromise from \'svelte-spa-router\' is deprecated and will be removed in version 3; use the \'tick\' method from the Svelte runtime instead');
    return tick().then(cb);
  }
  function instance($$self, $$props, $$invalidate) {
    var $loc,
      $$unsubscribe_loc = noop$1;
    validate_store(loc, 'loc');
    component_subscribe($$self, loc, function ($$value) {
      return $$invalidate(4, $loc = $$value);
    });
    $$self.$$.on_destroy.push(function () {
      return $$unsubscribe_loc();
    });
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('Router', slots, []);
    var _$$props$routes = $$props.routes,
      routes = _$$props$routes === void 0 ? {} : _$$props$routes;
    var _$$props$prefix = $$props.prefix,
      prefix = _$$props$prefix === void 0 ? '' : _$$props$prefix;

    /**
    * Container for a route: path, component
    */
    var RouteItem = /*#__PURE__*/function () {
      /**
      * Initializes the object and creates a regular expression from the path, using regexparam.
      *
      * @param {string} path - Path to the route (must start with '/' or '*')
      * @param {SvelteComponent} component - Svelte component for the route
      */
      function RouteItem(path, component) {
        _classCallCheck(this, RouteItem);
        if (!component || typeof component != 'function' && (_typeof(component) != 'object' || component._sveltesparouter !== true)) {
          throw Error('Invalid component object');
        }

        // Path must be a regular or expression, or a string starting with '/' or '*'
        if (!path || typeof path == 'string' && (path.length < 1 || path.charAt(0) != '/' && path.charAt(0) != '*') || _typeof(path) == 'object' && !(path instanceof RegExp)) {
          throw Error('Invalid value for "path" argument');
        }
        var _regexparam = regexparam(path),
          pattern = _regexparam.pattern,
          keys = _regexparam.keys;
        this.path = path;

        // Check if the component is wrapped and we have conditions
        if (_typeof(component) == 'object' && component._sveltesparouter === true) {
          this.component = component.route;
          this.conditions = component.conditions || [];
          this.userData = component.userData;
        } else {
          this.component = component;
          this.conditions = [];
          this.userData = undefined;
        }
        this._pattern = pattern;
        this._keys = keys;
      }

      /**
      * Checks if `path` matches the current route.
      * If there's a match, will return the list of parameters from the URL (if any).
      * In case of no match, the method will return `null`.
      *
      * @param {string} path - Path to test
      * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
      */
      return _createClass(RouteItem, [{
        key: "match",
        value: function (path) {
          // If there's a prefix, remove it before we run the matching
          if (prefix && path.startsWith(prefix)) {
            path = path.substr(prefix.length) || '/';
          }

          // Check if the pattern matches
          var matches = this._pattern.exec(path);
          if (matches === null) {
            return null;
          }

          // If the input was a regular expression, this._keys would be false, so return matches as is
          if (this._keys === false) {
            return matches;
          }
          var out = {};
          var i = 0;
          while (i < this._keys.length) {
            out[this._keys[i]] = matches[++i] || null;
          }
          return out;
        }

        /**
        * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoaded` and `conditionsFailed` events
        * @typedef {Object} RouteDetail
        * @property {SvelteComponent} component - Svelte component
        * @property {string} name - Name of the Svelte component
        * @property {string} location - Location path
        * @property {string} querystring - Querystring from the hash
        * @property {Object} [userData] - Custom data passed by the user
        */
        /**
        * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
        * 
        * @param {RouteDetail} detail - Route detail
        * @returns {bool} Returns true if all the conditions succeeded
        */
      }, {
        key: "checkConditions",
        value: function (detail) {
          for (var i = 0; i < this.conditions.length; i++) {
            if (!this.conditions[i](detail)) {
              return false;
            }
          }
          return true;
        }
      }]);
    }(); // Set up all routes
    var routesList = [];
    if (routes instanceof Map) {
      // If it's a map, iterate on it right away
      routes.forEach(function (route, path) {
        routesList.push(new RouteItem(path, route));
      });
    } else {
      // We have an object, so iterate on its own properties
      Object.keys(routes).forEach(function (path) {
        routesList.push(new RouteItem(path, routes[path]));
      });
    }

    // Props for the component to render
    var component = null;
    var componentParams = null;

    // Event dispatcher from Svelte
    var dispatch = createEventDispatcher();

    // Just like dispatch, but executes on the next iteration of the event loop
    var dispatchNextTick = function (name, detail) {
      // Execute this code when the current call stack is complete
      tick().then(function () {
        dispatch(name, detail);
      });
    };
    var writable_props = ['routes', 'prefix'];
    Object_1.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn("<Router> was created with unknown prop '".concat(key, "'"));
    });
    function routeEvent_handler(event) {
      bubble.call(this, $$self, event);
    }
    function routeEvent_handler_1(event) {
      bubble.call(this, $$self, event);
    }
    $$self.$$set = function ($$props) {
      if ('routes' in $$props) $$invalidate(2, routes = $$props.routes);
      if ('prefix' in $$props) $$invalidate(3, prefix = $$props.prefix);
    };
    $$self.$capture_state = function () {
      return {
        readable: readable,
        derived: derived,
        tick: tick,
        wrap: wrap$1,
        getLocation: getLocation,
        loc: loc,
        location: location$1,
        querystring: querystring,
        push: push$6,
        pop: pop,
        replace: replace$6,
        link: link,
        updateLink: updateLink,
        nextTickPromise: nextTickPromise,
        createEventDispatcher: createEventDispatcher,
        regexparam: regexparam,
        routes: routes,
        prefix: prefix,
        RouteItem: RouteItem,
        routesList: routesList,
        component: component,
        componentParams: componentParams,
        dispatch: dispatch,
        dispatchNextTick: dispatchNextTick,
        $loc: $loc
      };
    };
    $$self.$inject_state = function ($$props) {
      if ('routes' in $$props) $$invalidate(2, routes = $$props.routes);
      if ('prefix' in $$props) $$invalidate(3, prefix = $$props.prefix);
      if ('component' in $$props) $$invalidate(0, component = $$props.component);
      if ('componentParams' in $$props) $$invalidate(1, componentParams = $$props.componentParams);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    $$self.$$.update = function () {
      if ($$self.$$.dirty & /*component, $loc*/17) {
        // Handle hash change events
        // Listen to changes in the $loc store and update the page
         {
          // Find a route matching the location
          $$invalidate(0, component = null);
          var i = 0;
          while (!component && i < routesList.length) {
            var match = routesList[i].match($loc.location);
            if (match) {
              var detail = {
                component: routesList[i].component,
                name: routesList[i].component.name,
                location: $loc.location,
                querystring: $loc.querystring,
                userData: routesList[i].userData
              };

              // Check if the route can be loaded - if all conditions succeed
              if (!routesList[i].checkConditions(detail)) {
                // Trigger an event to notify the user
                dispatchNextTick('conditionsFailed', detail);
                break;
              }
              $$invalidate(0, component = routesList[i].component);

              // Set componentParams onloy if we have a match, to avoid a warning similar to `<Component> was created with unknown prop 'params'`
              // Of course, this assumes that developers always add a "params" prop when they are expecting parameters
              if (match && _typeof(match) == 'object' && Object.keys(match).length) {
                $$invalidate(1, componentParams = match);
              } else {
                $$invalidate(1, componentParams = null);
              }
              dispatchNextTick('routeLoaded', detail);
            }
            i++;
          }
        }
      }
    };
    return [component, componentParams, routes, prefix, $loc, routeEvent_handler, routeEvent_handler_1];
  }
  var Router = /*#__PURE__*/function (_SvelteComponentDev) {
    function Router(options) {
      var _this;
      _classCallCheck(this, Router);
      _this = _callSuper$1(this, Router, [options]);
      init(_this, options, instance, create_fragment, safe_not_equal, {
        routes: 2,
        prefix: 3
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "Router",
        options: options,
        id: create_fragment.name
      });
      return _this;
    }
    _inherits(Router, _SvelteComponentDev);
    return _createClass(Router, [{
      key: "routes",
      get: function () {
        throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "prefix",
      get: function () {
        throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }]);
  }(SvelteComponentDev);

  function fade(node) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$delay = _ref2.delay,
      delay = _ref2$delay === void 0 ? 0 : _ref2$delay,
      _ref2$duration = _ref2.duration,
      duration = _ref2$duration === void 0 ? 400 : _ref2$duration,
      _ref2$easing = _ref2.easing,
      easing = _ref2$easing === void 0 ? identity : _ref2$easing;
    var o = +getComputedStyle(node).opacity;
    return {
      delay: delay,
      duration: duration,
      easing: easing,
      css: function (t) {
        return "opacity: ".concat(t * o);
      }
    };
  }

  function _callSuper$2(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$2() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$2() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct() { return !!t; })(); }
  var file = "node_modules/svelte-lazy/src/index.svelte";

  // (15:46) 
  function create_if_block_3(ctx) {
    var switch_instance;
    var switch_instance_anchor;
    var current;
    var switch_value = /*placeholder*/ctx[1];
    function switch_props() {
      return {
        $$inline: true
      };
    }
    if (switch_value) {
      switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    }
    var block = {
      c: function () {
        if (switch_instance) create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
      },
      m: function (target, anchor) {
        if (switch_instance) mount_component(switch_instance, target, anchor);
        insert_dev(target, switch_instance_anchor, anchor);
        current = true;
      },
      p: function (ctx, dirty) {
        if (dirty & /*placeholder*/2 && switch_value !== (switch_value = /*placeholder*/ctx[1])) {
          if (switch_instance) {
            group_outros();
            var old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, function () {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component_dev(switch_value, switch_props());
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        }
      },
      i: function (local) {
        if (current) return;
        if (switch_instance) transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        if (switch_instance) transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(switch_instance_anchor);
        if (switch_instance) destroy_component(switch_instance, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block_3.name,
      type: "if",
      source: "(15:46) ",
      ctx: ctx
    });
    return block;
  }

  // (13:44) 
  function create_if_block_2(ctx) {
    var div;
    var t;
    var block = {
      c: function () {
        div = element("div");
        t = text(/*placeholder*/ctx[1]);
        add_location(div, file, 13, 4, 335);
      },
      m: function (target, anchor) {
        insert_dev(target, div, anchor);
        append_dev(div, t);
      },
      p: function (ctx, dirty) {
        if (dirty & /*placeholder*/2) set_data_dev(t, /*placeholder*/ctx[1]);
      },
      i: noop$1,
      o: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(div);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block_2.name,
      type: "if",
      source: "(13:44) ",
      ctx: ctx
    });
    return block;
  }

  // (2:2) {#if loaded}
  function create_if_block$1(ctx) {
    var current_block_type_index;
    var if_block;
    var if_block_anchor;
    var current;
    var if_block_creators = [create_if_block_1, create_else_block$1];
    var if_blocks = [];
    function select_block_type_1(ctx) {
      if (/*fadeOption*/ctx[0]) return 0;
      return 1;
    }
    current_block_type_index = select_block_type_1(ctx);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    var block = {
      c: function () {
        if_block.c();
        if_block_anchor = empty();
      },
      m: function (target, anchor) {
        if_blocks[current_block_type_index].m(target, anchor);
        insert_dev(target, if_block_anchor, anchor);
        current = true;
      },
      p: function (ctx, dirty) {
        var previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type_1(ctx);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, function () {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
            if_block.c();
          } else {
            if_block.p(ctx, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      },
      i: function () {
        if (current) return;
        transition_in(if_block);
        current = true;
      },
      o: function () {
        transition_out(if_block);
        current = false;
      },
      d: function (detaching) {
        if_blocks[current_block_type_index].d(detaching);
        if (detaching) detach_dev(if_block_anchor);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block$1.name,
      type: "if",
      source: "(2:2) {#if loaded}",
      ctx: ctx
    });
    return block;
  }

  // (10:4) {:else}
  function create_else_block$1(ctx) {
    var current;
    var default_slot_template = /*#slots*/ctx[11].default;
    var default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ctx[10], null);
    var default_slot_or_fallback = default_slot || fallback_block_1(ctx);
    var block = {
      c: function () {
        if (default_slot_or_fallback) default_slot_or_fallback.c();
      },
      m: function (target, anchor) {
        if (default_slot_or_fallback) {
          default_slot_or_fallback.m(target, anchor);
        }
        current = true;
      },
      p: function (ctx, dirty) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/1024)) {
            update_slot_base(default_slot, default_slot_template, ctx, /*$$scope*/ctx[10], !current ? get_all_dirty_from_scope(/*$$scope*/ctx[10]) : get_slot_changes(default_slot_template, /*$$scope*/ctx[10], dirty, null), null);
          }
        }
      },
      i: function (local) {
        if (current) return;
        transition_in(default_slot_or_fallback, local);
        current = true;
      },
      o: function (local) {
        transition_out(default_slot_or_fallback, local);
        current = false;
      },
      d: function (detaching) {
        if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_else_block$1.name,
      type: "else",
      source: "(10:4) {:else}",
      ctx: ctx
    });
    return block;
  }

  // (3:4) {#if fadeOption}
  function create_if_block_1(ctx) {
    var div;
    var div_intro;
    var current;
    var default_slot_template = /*#slots*/ctx[11].default;
    var default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ctx[10], null);
    var default_slot_or_fallback = default_slot || fallback_block(ctx);
    var block = {
      c: function () {
        div = element("div");
        if (default_slot_or_fallback) default_slot_or_fallback.c();
        attr_dev(div, "class", "svelte-lazy-transition");
        add_location(div, file, 3, 6, 82);
      },
      m: function (target, anchor) {
        insert_dev(target, div, anchor);
        if (default_slot_or_fallback) {
          default_slot_or_fallback.m(div, null);
        }
        current = true;
      },
      p: function (new_ctx, dirty) {
        ctx = new_ctx;
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/1024)) {
            update_slot_base(default_slot, default_slot_template, ctx, /*$$scope*/ctx[10], !current ? get_all_dirty_from_scope(/*$$scope*/ctx[10]) : get_slot_changes(default_slot_template, /*$$scope*/ctx[10], dirty, null), null);
          }
        }
      },
      i: function (local) {
        if (current) return;
        transition_in(default_slot_or_fallback, local);
        if (!div_intro) {
          add_render_callback(function () {
            div_intro = create_in_transition(div, fade, /*fadeOption*/ctx[0]);
            div_intro.start();
          });
        }
        current = true;
      },
      o: function (local) {
        transition_out(default_slot_or_fallback, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div);
        if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block_1.name,
      type: "if",
      source: "(3:4) {#if fadeOption}",
      ctx: ctx
    });
    return block;
  }

  // (11:12) Lazy load content
  function fallback_block_1(ctx) {
    var t;
    var block = {
      c: function () {
        t = text("Lazy load content");
      },
      m: function (target, anchor) {
        insert_dev(target, t, anchor);
      },
      d: function (detaching) {
        if (detaching) detach_dev(t);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: fallback_block_1.name,
      type: "fallback",
      source: "(11:12) Lazy load content",
      ctx: ctx
    });
    return block;
  }

  // (8:14) Lazy load content
  function fallback_block(ctx) {
    var t;
    var block = {
      c: function () {
        t = text("Lazy load content");
      },
      m: function (target, anchor) {
        insert_dev(target, t, anchor);
      },
      d: function (detaching) {
        if (detaching) detach_dev(t);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: fallback_block.name,
      type: "fallback",
      source: "(8:14) Lazy load content",
      ctx: ctx
    });
    return block;
  }
  function create_fragment$1(ctx) {
    var div;
    var current_block_type_index;
    var if_block;
    var load_action;
    var current;
    var mounted;
    var dispose;
    var if_block_creators = [create_if_block$1, create_if_block_2, create_if_block_3];
    var if_blocks = [];
    function select_block_type(ctx) {
      if (/*loaded*/ctx[2]) return 0;
      if (typeof /*placeholder*/ctx[1] === 'string') return 1;
      if (typeof /*placeholder*/ctx[1] === 'function') return 2;
      return -1;
    }
    if (~(current_block_type_index = select_block_type(ctx))) {
      if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    }
    var block = {
      c: function () {
        div = element("div");
        if (if_block) if_block.c();
        attr_dev(div, "class", /*rootClassName*/ctx[3]);
        add_location(div, file, 0, 0, 0);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div, anchor);
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].m(div, null);
        }
        current = true;
        if (!mounted) {
          dispose = action_destroyer(load_action = /*load*/ctx[4].call(null, div));
          mounted = true;
        }
      },
      p: function (ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        var previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx);
        if (current_block_type_index === previous_block_index) {
          if (~current_block_type_index) {
            if_blocks[current_block_type_index].p(ctx, dirty);
          }
        } else {
          if (if_block) {
            group_outros();
            transition_out(if_blocks[previous_block_index], 1, 1, function () {
              if_blocks[previous_block_index] = null;
            });
            check_outros();
          }
          if (~current_block_type_index) {
            if_block = if_blocks[current_block_type_index];
            if (!if_block) {
              if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
              if_block.c();
            } else {
              if_block.p(ctx, dirty);
            }
            transition_in(if_block, 1);
            if_block.m(div, null);
          } else {
            if_block = null;
          }
        }
      },
      i: function () {
        if (current) return;
        transition_in(if_block);
        current = true;
      },
      o: function () {
        transition_out(if_block);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div);
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].d();
        }
        mounted = false;
        dispose();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$1.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function getExpectedTop(e, offset) {
    var height = getContainerHeight(e);
    return height + offset;
  }
  function getContainerHeight(e) {
    if (e && e.target && e.target.getBoundingClientRect) {
      return e.target.getBoundingClientRect().bottom;
    } else {
      return window.innerHeight;
    }
  }

  // From underscore souce code
  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function later() {
      previous = options.leading === false ? 0 : new Date();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function (event) {
      var now = new Date();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }
  function instance$1($$self, $$props, $$invalidate) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('Src', slots, ['default']);
    var _$$props$height = $$props.height,
      height = _$$props$height === void 0 ? 0 : _$$props$height;
    var _$$props$offset = $$props.offset,
      offset = _$$props$offset === void 0 ? 150 : _$$props$offset;
    var _$$props$fadeOption = $$props.fadeOption,
      fadeOption = _$$props$fadeOption === void 0 ? {
        delay: 0,
        duration: 400
      } : _$$props$fadeOption;
    var _$$props$resetHeightD = $$props.resetHeightDelay,
      resetHeightDelay = _$$props$resetHeightD === void 0 ? 0 : _$$props$resetHeightD;
    var _$$props$onload = $$props.onload,
      onload = _$$props$onload === void 0 ? null : _$$props$onload;
    var _$$props$placeholder = $$props.placeholder,
      placeholder = _$$props$placeholder === void 0 ? null : _$$props$placeholder;
    var _$$props$class = $$props.class,
      className = _$$props$class === void 0 ? '' : _$$props$class;
    var rootClassName = 'svelte-lazy' + (className ? ' ' + className : '');
    var loaded = false;
    function load(node) {
      setHeight(node);
      var loadHandler = throttle(function (e) {
        var top = node.getBoundingClientRect().top;
        var expectedTop = getExpectedTop(e, offset);
        if (top <= expectedTop) {
          $$invalidate(2, loaded = true);
          resetHeight(node);
          onload && onload(node);
          removeListeners();
        }
      }, 200);
      loadHandler();
      addListeners();
      function addListeners() {
        document.addEventListener('scroll', loadHandler, true);
        window.addEventListener('resize', loadHandler);
      }
      function removeListeners() {
        document.removeEventListener('scroll', loadHandler, true);
        window.removeEventListener('resize', loadHandler);
      }
      return {
        destroy: function destroy() {
          removeListeners();
        }
      };
    }
    function setHeight(node) {
      if (height) {
        node.style.height = typeof height === 'number' ? height + 'px' : height;
      }
    }
    function resetHeight(node) {
      // Add delay for remote resources like images to load
      setTimeout(function () {
        return node.style.height = 'auto';
      }, resetHeightDelay);
    }
    var writable_props = ['height', 'offset', 'fadeOption', 'resetHeightDelay', 'onload', 'placeholder', 'class'];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Src> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$$set = function ($$props) {
      if ('height' in $$props) $$invalidate(5, height = $$props.height);
      if ('offset' in $$props) $$invalidate(6, offset = $$props.offset);
      if ('fadeOption' in $$props) $$invalidate(0, fadeOption = $$props.fadeOption);
      if ('resetHeightDelay' in $$props) $$invalidate(7, resetHeightDelay = $$props.resetHeightDelay);
      if ('onload' in $$props) $$invalidate(8, onload = $$props.onload);
      if ('placeholder' in $$props) $$invalidate(1, placeholder = $$props.placeholder);
      if ('class' in $$props) $$invalidate(9, className = $$props.class);
      if ('$$scope' in $$props) $$invalidate(10, $$scope = $$props.$$scope);
    };
    $$self.$capture_state = function () {
      return {
        fade: fade,
        height: height,
        offset: offset,
        fadeOption: fadeOption,
        resetHeightDelay: resetHeightDelay,
        onload: onload,
        placeholder: placeholder,
        className: className,
        rootClassName: rootClassName,
        loaded: loaded,
        load: load,
        setHeight: setHeight,
        resetHeight: resetHeight,
        getExpectedTop: getExpectedTop,
        getContainerHeight: getContainerHeight,
        throttle: throttle
      };
    };
    $$self.$inject_state = function ($$props) {
      if ('height' in $$props) $$invalidate(5, height = $$props.height);
      if ('offset' in $$props) $$invalidate(6, offset = $$props.offset);
      if ('fadeOption' in $$props) $$invalidate(0, fadeOption = $$props.fadeOption);
      if ('resetHeightDelay' in $$props) $$invalidate(7, resetHeightDelay = $$props.resetHeightDelay);
      if ('onload' in $$props) $$invalidate(8, onload = $$props.onload);
      if ('placeholder' in $$props) $$invalidate(1, placeholder = $$props.placeholder);
      if ('className' in $$props) $$invalidate(9, className = $$props.className);
      if ('rootClassName' in $$props) $$invalidate(3, rootClassName = $$props.rootClassName);
      if ('loaded' in $$props) $$invalidate(2, loaded = $$props.loaded);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    return [fadeOption, placeholder, loaded, rootClassName, load, height, offset, resetHeightDelay, onload, className, $$scope, slots];
  }
  var Src = /*#__PURE__*/function (_SvelteComponentDev) {
    function Src(options) {
      var _this;
      _classCallCheck(this, Src);
      _this = _callSuper$2(this, Src, [options]);
      init(_this, options, instance$1, create_fragment$1, safe_not_equal, {
        height: 5,
        offset: 6,
        fadeOption: 0,
        resetHeightDelay: 7,
        onload: 8,
        placeholder: 1,
        class: 9
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "Src",
        options: options,
        id: create_fragment$1.name
      });
      return _this;
    }
    _inherits(Src, _SvelteComponentDev);
    return _createClass(Src, [{
      key: "height",
      get: function get() {
        throw new Error("<Src>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function set(value) {
        throw new Error("<Src>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "offset",
      get: function get() {
        throw new Error("<Src>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function set(value) {
        throw new Error("<Src>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "fadeOption",
      get: function get() {
        throw new Error("<Src>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function set(value) {
        throw new Error("<Src>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "resetHeightDelay",
      get: function get() {
        throw new Error("<Src>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function set(value) {
        throw new Error("<Src>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "onload",
      get: function get() {
        throw new Error("<Src>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function set(value) {
        throw new Error("<Src>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "placeholder",
      get: function get() {
        throw new Error("<Src>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function set(value) {
        throw new Error("<Src>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "class",
      get: function get() {
        throw new Error("<Src>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function set(value) {
        throw new Error("<Src>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }]);
  }(SvelteComponentDev);

  function _callSuper$3(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$3() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$3() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$3 = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$1 = "src/components/banner/Banner.svelte";

  // (11:12) <Lazy fadeOption={null}>
  function create_default_slot_1(ctx) {
    var img;
    var img_src_value;
    var block = {
      c: function () {
        img = element("img");
        attr_dev(img, "id", "logo");
        attr_dev(img, "alt", "Cakcuk Logo");
        if (!src_url_equal(img.src, img_src_value = "images/cakcuk_logo.png")) attr_dev(img, "src", img_src_value);
        attr_dev(img, "class", "svelte-g3gus1");
        add_location(img, file$1, 11, 16, 326);
      },
      m: function (target, anchor) {
        insert_dev(target, img, anchor);
      },
      p: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(img);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot_1.name,
      type: "slot",
      source: "(11:12) <Lazy fadeOption={null}>",
      ctx: ctx
    });
    return block;
  }

  // (35:24) <Lazy fadeOption={null}>
  function create_default_slot(ctx) {
    var img;
    var img_src_value;
    var block = {
      c: function () {
        img = element("img");
        attr_dev(img, "class", "btn-slack right svelte-g3gus1");
        attr_dev(img, "alt", "Add to Slack");
        attr_dev(img, "height", "40");
        attr_dev(img, "width", "150");
        if (!src_url_equal(img.src, img_src_value = "images/btn-add-to-slack.svg")) attr_dev(img, "src", img_src_value);
        add_location(img, file$1, 35, 28, 1319);
      },
      m: function (target, anchor) {
        insert_dev(target, img, anchor);
      },
      p: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(img);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot.name,
      type: "slot",
      source: "(35:24) <Lazy fadeOption={null}>",
      ctx: ctx
    });
    return block;
  }
  function create_fragment$2(ctx) {
    var div6;
    var div5;
    var br0;
    var t0;
    var h1;
    var lazy0;
    var t1;
    var h2;
    var br1;
    var t2;
    var br2;
    var t3;
    var br3;
    var t4;
    var div0;
    var span0;
    var t6;
    var i;
    var t8;
    var span1;
    var t10;
    var span2;
    var b0;
    var t12;
    var br4;
    var t13;
    var span3;
    var div4;
    var div1;
    var p;
    var t14;
    var a0;
    var lazy1;
    var t15;
    var div3;
    var div2;
    var b1;
    var t17;
    var a1;
    var current;
    lazy0 = new Src({
      props: {
        fadeOption: null,
        $$slots: {
          default: [create_default_slot_1]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    lazy1 = new Src({
      props: {
        fadeOption: null,
        $$slots: {
          default: [create_default_slot]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    var block = {
      c: function () {
        div6 = element("div");
        div5 = element("div");
        br0 = element("br");
        t0 = space();
        h1 = element("h1");
        create_component(lazy0.$$.fragment);
        t1 = space();
        h2 = element("h2");
        br1 = element("br");
        t2 = text("\n            \"A Command Bot Interface builder, CLI-based to easily create your CLI commands for your Workspace\"\n            ");
        br2 = element("br");
        t3 = text("\n            • • • •\n            ");
        br3 = element("br");
        t4 = space();
        div0 = element("div");
        span0 = element("span");
        span0.textContent = "Commands Simplified,";
        t6 = space();
        i = element("i");
        i.textContent = "Clearer Response";
        t8 = space();
        span1 = element("span");
        span1.textContent = "&";
        t10 = space();
        span2 = element("span");
        b0 = element("b");
        b0.textContent = "Increase Productivity";
        t12 = space();
        br4 = element("br");
        t13 = space();
        span3 = element("span");
        div4 = element("div");
        div1 = element("div");
        p = element("p");
        t14 = space();
        a0 = element("a");
        create_component(lazy1.$$.fragment);
        t15 = space();
        div3 = element("div");
        div2 = element("div");
        b1 = element("b");
        b1.textContent = "or";
        t17 = text("\n                         \n                        ");
        a1 = element("a");
        a1.textContent = "Deploy Your Own";
        add_location(br0, file$1, 8, 8, 255);
        add_location(h1, file$1, 9, 8, 268);
        add_location(br1, file$1, 16, 12, 499);
        add_location(br2, file$1, 18, 12, 627);
        add_location(br3, file$1, 20, 12, 664);
        attr_dev(h2, "class", "splash-subhead svelte-g3gus1");
        set_style(h2, "margin-top", "-30px");
        add_location(h2, file$1, 15, 8, 432);
        set_style(span0, "font-size", "130%");
        add_location(span0, file$1, 23, 12, 763);
        set_style(div0, "padding", "8px 40px 8px 40px");
        set_style(div0, "margin-top", "14px");
        add_location(div0, file$1, 22, 8, 691);
        add_location(i, file$1, 27, 8, 875);
        set_style(span1, "font-size", "150%");
        add_location(span1, file$1, 27, 32, 899);
        add_location(b0, file$1, 27, 78, 945);
        add_location(span2, file$1, 27, 72, 939);
        add_location(br4, file$1, 28, 8, 989);
        add_location(p, file$1, 32, 20, 1175);
        attr_dev(a0, "href", "https://cakcuk.io/slack/add");
        attr_dev(a0, "class", "svelte-g3gus1");
        add_location(a0, file$1, 33, 20, 1203);
        attr_dev(div1, "class", "pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-2");
        add_location(div1, file$1, 31, 16, 1102);
        add_location(b1, file$1, 42, 24, 1709);
        attr_dev(a1, "href", "#/docs/deploy");
        attr_dev(a1, "class", "green-font svelte-g3gus1");
        add_location(a1, file$1, 46, 24, 1828);
        attr_dev(div2, "class", "btn-deploy left svelte-g3gus1");
        set_style(div2, "margin-top", "27px");
        add_location(div2, file$1, 41, 20, 1629);
        attr_dev(div3, "class", "pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-2");
        add_location(div3, file$1, 40, 16, 1556);
        attr_dev(div4, "class", "pure-g");
        set_style(div4, "margin-top", "20px");
        add_location(div4, file$1, 30, 12, 1039);
        attr_dev(span3, "class", "sub-title svelte-g3gus1");
        add_location(span3, file$1, 29, 8, 1002);
        attr_dev(div5, "class", "splash svelte-g3gus1");
        add_location(div5, file$1, 7, 4, 226);
        attr_dev(div6, "class", "splash-container svelte-g3gus1");
        add_location(div6, file$1, 6, 0, 191);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div6, anchor);
        append_dev(div6, div5);
        append_dev(div5, br0);
        append_dev(div5, t0);
        append_dev(div5, h1);
        mount_component(lazy0, h1, null);
        append_dev(div5, t1);
        append_dev(div5, h2);
        append_dev(h2, br1);
        append_dev(h2, t2);
        append_dev(h2, br2);
        append_dev(h2, t3);
        append_dev(h2, br3);
        append_dev(div5, t4);
        append_dev(div5, div0);
        append_dev(div0, span0);
        append_dev(div5, t6);
        append_dev(div5, i);
        append_dev(div5, t8);
        append_dev(div5, span1);
        append_dev(div5, t10);
        append_dev(div5, span2);
        append_dev(span2, b0);
        append_dev(div5, t12);
        append_dev(div5, br4);
        append_dev(div5, t13);
        append_dev(div5, span3);
        append_dev(span3, div4);
        append_dev(div4, div1);
        append_dev(div1, p);
        append_dev(div1, t14);
        append_dev(div1, a0);
        mount_component(lazy1, a0, null);
        append_dev(div4, t15);
        append_dev(div4, div3);
        append_dev(div3, div2);
        append_dev(div2, b1);
        append_dev(div2, t17);
        append_dev(div2, a1);
        current = true;
      },
      p: function (ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        var lazy0_changes = {};
        if (dirty & /*$$scope*/1) {
          lazy0_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        lazy0.$set(lazy0_changes);
        var lazy1_changes = {};
        if (dirty & /*$$scope*/1) {
          lazy1_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        lazy1.$set(lazy1_changes);
      },
      i: function (local) {
        if (current) return;
        transition_in(lazy0.$$.fragment, local);
        transition_in(lazy1.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(lazy0.$$.fragment, local);
        transition_out(lazy1.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div6);
        destroy_component(lazy0);
        destroy_component(lazy1);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$2.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$2($$self, $$props) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('Banner', slots, []);
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Banner> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$capture_state = function () {
      return {
        Lazy: Src
      };
    };
    return [];
  }
  var Banner = /*#__PURE__*/function (_SvelteComponentDev) {
    function Banner(options) {
      var _this;
      _classCallCheck(this, Banner);
      _this = _callSuper$3(this, Banner, [options]);
      init(_this, options, instance$2, create_fragment$2, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "Banner",
        options: options,
        id: create_fragment$2.name
      });
      return _this;
    }
    _inherits(Banner, _SvelteComponentDev);
    return _createClass(Banner);
  }(SvelteComponentDev);

  function _callSuper$4(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$4() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$4() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$4 = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$2 = "src/components/content/Example.svelte";

  // (17:12) <Lazy fadeOption={null}>
  function create_default_slot_4(ctx) {
    var img;
    var img_src_value;
    var block = {
      c: function () {
        img = element("img");
        attr_dev(img, "alt", "Help Command Example | Show existing commands with oneline option");
        attr_dev(img, "class", "pure-img how-works svelte-193d6og");
        if (!src_url_equal(img.src, img_src_value = "images/example_help.png")) attr_dev(img, "src", img_src_value);
        add_location(img, file$2, 17, 16, 562);
      },
      m: function (target, anchor) {
        insert_dev(target, img, anchor);
      },
      p: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(img);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot_4.name,
      type: "slot",
      source: "(17:12) <Lazy fadeOption={null}>",
      ctx: ctx
    });
    return block;
  }

  // (29:12) <Lazy fadeOption={null}>
  function create_default_slot_3(ctx) {
    var img;
    var img_src_value;
    var block = {
      c: function () {
        img = element("img");
        attr_dev(img, "alt", "Help Command Example | Show command detail with oneline option");
        attr_dev(img, "class", "pure-img how-works svelte-193d6og");
        if (!src_url_equal(img.src, img_src_value = "images/example_help_detail.png")) attr_dev(img, "src", img_src_value);
        add_location(img, file$2, 29, 16, 1103);
      },
      m: function (target, anchor) {
        insert_dev(target, img, anchor);
      },
      p: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(img);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot_3.name,
      type: "slot",
      source: "(29:12) <Lazy fadeOption={null}>",
      ctx: ctx
    });
    return block;
  }

  // (41:12) <Lazy fadeOption={null}>
  function create_default_slot_2(ctx) {
    var img;
    var img_src_value;
    var block = {
      c: function () {
        img = element("img");
        attr_dev(img, "alt", "Cuk Command Example | Hit endpoint");
        attr_dev(img, "class", "pure-img how-works svelte-193d6og");
        if (!src_url_equal(img.src, img_src_value = "images/example_cuk.png")) attr_dev(img, "src", img_src_value);
        add_location(img, file$2, 41, 16, 1645);
      },
      m: function (target, anchor) {
        insert_dev(target, img, anchor);
      },
      p: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(img);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot_2.name,
      type: "slot",
      source: "(41:12) <Lazy fadeOption={null}>",
      ctx: ctx
    });
    return block;
  }

  // (52:12) <Lazy fadeOption={null}>
  function create_default_slot_1$1(ctx) {
    var img;
    var img_src_value;
    var block = {
      c: function () {
        img = element("img");
        attr_dev(img, "alt", "Cuk Command Example | Hit endpoint with parsing response");
        attr_dev(img, "class", "pure-img how-works svelte-193d6og");
        if (!src_url_equal(img.src, img_src_value = "images/example_cuk_parse.png")) attr_dev(img, "src", img_src_value);
        add_location(img, file$2, 52, 16, 2103);
      },
      m: function (target, anchor) {
        insert_dev(target, img, anchor);
      },
      p: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(img);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot_1$1.name,
      type: "slot",
      source: "(52:12) <Lazy fadeOption={null}>",
      ctx: ctx
    });
    return block;
  }

  // (64:12) <Lazy fadeOption={null}>
  function create_default_slot$1(ctx) {
    var img;
    var img_src_value;
    var block = {
      c: function () {
        img = element("img");
        attr_dev(img, "alt", "Cak Command Example | Create new command then execute the new command");
        attr_dev(img, "class", "pure-img how-works svelte-193d6og");
        if (!src_url_equal(img.src, img_src_value = "images/example_cak.png")) attr_dev(img, "src", img_src_value);
        add_location(img, file$2, 64, 16, 2606);
      },
      m: function (target, anchor) {
        insert_dev(target, img, anchor);
      },
      p: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(img);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot$1.name,
      type: "slot",
      source: "(64:12) <Lazy fadeOption={null}>",
      ctx: ctx
    });
    return block;
  }
  function create_fragment$3(ctx) {
    var div22;
    var div1;
    var div0;
    var br0;
    var t0;
    var h2;
    var t2;
    var br1;
    var t3;
    var div5;
    var div4;
    var lazy0;
    var t4;
    var div2;
    var h50;
    var t6;
    var div3;
    var t7;
    var div9;
    var div8;
    var lazy1;
    var t8;
    var div6;
    var h51;
    var t10;
    var div7;
    var t11;
    var div13;
    var div12;
    var lazy2;
    var t12;
    var div10;
    var h52;
    var t14;
    var div11;
    var t15;
    var div17;
    var div16;
    var lazy3;
    var t16;
    var div14;
    var h53;
    var t18;
    var div15;
    var t19;
    var div21;
    var div20;
    var lazy4;
    var t20;
    var div18;
    var h54;
    var t22;
    var div19;
    var current;
    lazy0 = new Src({
      props: {
        fadeOption: null,
        $$slots: {
          default: [create_default_slot_4]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    lazy1 = new Src({
      props: {
        fadeOption: null,
        $$slots: {
          default: [create_default_slot_3]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    lazy2 = new Src({
      props: {
        fadeOption: null,
        $$slots: {
          default: [create_default_slot_2]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    lazy3 = new Src({
      props: {
        fadeOption: null,
        $$slots: {
          default: [create_default_slot_1$1]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    lazy4 = new Src({
      props: {
        fadeOption: null,
        $$slots: {
          default: [create_default_slot$1]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    var block = {
      c: function () {
        div22 = element("div");
        div1 = element("div");
        div0 = element("div");
        br0 = element("br");
        t0 = space();
        h2 = element("h2");
        h2.textContent = "~ Examples ~";
        t2 = space();
        br1 = element("br");
        t3 = space();
        div5 = element("div");
        div4 = element("div");
        create_component(lazy0.$$.fragment);
        t4 = space();
        div2 = element("div");
        h50 = element("h5");
        h50.textContent = "Help Command Example | Show existing commands with oneline option";
        t6 = space();
        div3 = element("div");
        t7 = space();
        div9 = element("div");
        div8 = element("div");
        create_component(lazy1.$$.fragment);
        t8 = space();
        div6 = element("div");
        h51 = element("h5");
        h51.textContent = "Help Command Example | Show command detail with oneline option";
        t10 = space();
        div7 = element("div");
        t11 = space();
        div13 = element("div");
        div12 = element("div");
        create_component(lazy2.$$.fragment);
        t12 = space();
        div10 = element("div");
        h52 = element("h5");
        h52.textContent = "Cuk Command Example | Hit endpoint";
        t14 = space();
        div11 = element("div");
        t15 = space();
        div17 = element("div");
        div16 = element("div");
        create_component(lazy3.$$.fragment);
        t16 = space();
        div14 = element("div");
        h53 = element("h5");
        h53.textContent = "Cuk Command Example | Hit endpoint with parsing response";
        t18 = space();
        div15 = element("div");
        t19 = space();
        div21 = element("div");
        div20 = element("div");
        create_component(lazy4.$$.fragment);
        t20 = space();
        div18 = element("div");
        h54 = element("h5");
        h54.textContent = "Cak Command Example | Create new command then execute the new command";
        t22 = space();
        div19 = element("div");
        add_location(br0, file$2, 9, 12, 318);
        add_location(h2, file$2, 10, 12, 335);
        add_location(br1, file$2, 11, 12, 369);
        attr_dev(div0, "class", "sub-header svelte-193d6og");
        add_location(div0, file$2, 8, 8, 281);
        attr_dev(div1, "class", "pure-u-1 pure-u-md-1-1");
        add_location(div1, file$2, 7, 4, 236);
        add_location(h50, file$2, 21, 16, 784);
        attr_dev(div2, "class", "text svelte-193d6og");
        add_location(div2, file$2, 20, 12, 749);
        attr_dev(div3, "class", "line svelte-193d6og");
        add_location(div3, file$2, 23, 12, 890);
        attr_dev(div4, "class", "card center-vertical svelte-193d6og");
        add_location(div4, file$2, 15, 8, 474);
        attr_dev(div5, "class", "pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-1 pure-u-1");
        add_location(div5, file$2, 14, 4, 404);
        add_location(h51, file$2, 33, 16, 1329);
        attr_dev(div6, "class", "text svelte-193d6og");
        add_location(div6, file$2, 32, 12, 1294);
        attr_dev(div7, "class", "line svelte-193d6og");
        add_location(div7, file$2, 35, 12, 1432);
        attr_dev(div8, "class", "card center-vertical svelte-193d6og");
        add_location(div8, file$2, 27, 8, 1015);
        attr_dev(div9, "class", "pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-1 pure-u-1");
        add_location(div9, file$2, 26, 4, 945);
        add_location(h52, file$2, 44, 16, 1815);
        attr_dev(div10, "class", "text svelte-193d6og");
        add_location(div10, file$2, 43, 12, 1780);
        attr_dev(div11, "class", "line svelte-193d6og");
        add_location(div11, file$2, 46, 12, 1890);
        attr_dev(div12, "class", "card center-vertical svelte-193d6og");
        add_location(div12, file$2, 39, 8, 1557);
        attr_dev(div13, "class", "pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-1 pure-u-1");
        add_location(div13, file$2, 38, 4, 1487);
        add_location(h53, file$2, 56, 16, 2321);
        attr_dev(div14, "class", "text svelte-193d6og");
        add_location(div14, file$2, 55, 12, 2286);
        attr_dev(div15, "class", "line svelte-193d6og");
        add_location(div15, file$2, 58, 12, 2418);
        attr_dev(div16, "class", "card center-vertical svelte-193d6og");
        add_location(div16, file$2, 50, 8, 2015);
        attr_dev(div17, "class", "pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-1 pure-u-1");
        add_location(div17, file$2, 49, 4, 1945);
        add_location(h54, file$2, 68, 16, 2831);
        attr_dev(div18, "class", "text svelte-193d6og");
        add_location(div18, file$2, 67, 12, 2796);
        attr_dev(div19, "class", "line svelte-193d6og");
        add_location(div19, file$2, 70, 12, 2941);
        attr_dev(div20, "class", "card center-vertical svelte-193d6og");
        add_location(div20, file$2, 62, 8, 2518);
        attr_dev(div21, "class", "pure-u-1 pure-u-md-1-1");
        add_location(div21, file$2, 61, 4, 2473);
        attr_dev(div22, "class", "pure-g center container bg svelte-193d6og");
        add_location(div22, file$2, 6, 0, 191);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div22, anchor);
        append_dev(div22, div1);
        append_dev(div1, div0);
        append_dev(div0, br0);
        append_dev(div0, t0);
        append_dev(div0, h2);
        append_dev(div0, t2);
        append_dev(div0, br1);
        append_dev(div22, t3);
        append_dev(div22, div5);
        append_dev(div5, div4);
        mount_component(lazy0, div4, null);
        append_dev(div4, t4);
        append_dev(div4, div2);
        append_dev(div2, h50);
        append_dev(div4, t6);
        append_dev(div4, div3);
        append_dev(div22, t7);
        append_dev(div22, div9);
        append_dev(div9, div8);
        mount_component(lazy1, div8, null);
        append_dev(div8, t8);
        append_dev(div8, div6);
        append_dev(div6, h51);
        append_dev(div8, t10);
        append_dev(div8, div7);
        append_dev(div22, t11);
        append_dev(div22, div13);
        append_dev(div13, div12);
        mount_component(lazy2, div12, null);
        append_dev(div12, t12);
        append_dev(div12, div10);
        append_dev(div10, h52);
        append_dev(div12, t14);
        append_dev(div12, div11);
        append_dev(div22, t15);
        append_dev(div22, div17);
        append_dev(div17, div16);
        mount_component(lazy3, div16, null);
        append_dev(div16, t16);
        append_dev(div16, div14);
        append_dev(div14, h53);
        append_dev(div16, t18);
        append_dev(div16, div15);
        append_dev(div22, t19);
        append_dev(div22, div21);
        append_dev(div21, div20);
        mount_component(lazy4, div20, null);
        append_dev(div20, t20);
        append_dev(div20, div18);
        append_dev(div18, h54);
        append_dev(div20, t22);
        append_dev(div20, div19);
        current = true;
      },
      p: function (ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        var lazy0_changes = {};
        if (dirty & /*$$scope*/1) {
          lazy0_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        lazy0.$set(lazy0_changes);
        var lazy1_changes = {};
        if (dirty & /*$$scope*/1) {
          lazy1_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        lazy1.$set(lazy1_changes);
        var lazy2_changes = {};
        if (dirty & /*$$scope*/1) {
          lazy2_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        lazy2.$set(lazy2_changes);
        var lazy3_changes = {};
        if (dirty & /*$$scope*/1) {
          lazy3_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        lazy3.$set(lazy3_changes);
        var lazy4_changes = {};
        if (dirty & /*$$scope*/1) {
          lazy4_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        lazy4.$set(lazy4_changes);
      },
      i: function (local) {
        if (current) return;
        transition_in(lazy0.$$.fragment, local);
        transition_in(lazy1.$$.fragment, local);
        transition_in(lazy2.$$.fragment, local);
        transition_in(lazy3.$$.fragment, local);
        transition_in(lazy4.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(lazy0.$$.fragment, local);
        transition_out(lazy1.$$.fragment, local);
        transition_out(lazy2.$$.fragment, local);
        transition_out(lazy3.$$.fragment, local);
        transition_out(lazy4.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div22);
        destroy_component(lazy0);
        destroy_component(lazy1);
        destroy_component(lazy2);
        destroy_component(lazy3);
        destroy_component(lazy4);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$3.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$3($$self, $$props) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('Example', slots, []);
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Example> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$capture_state = function () {
      return {
        Lazy: Src
      };
    };
    return [];
  }
  var Example = /*#__PURE__*/function (_SvelteComponentDev) {
    function Example(options) {
      var _this;
      _classCallCheck(this, Example);
      _this = _callSuper$4(this, Example, [options]);
      init(_this, options, instance$3, create_fragment$3, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "Example",
        options: options,
        id: create_fragment$3.name
      });
      return _this;
    }
    _inherits(Example, _SvelteComponentDev);
    return _createClass(Example);
  }(SvelteComponentDev);

  function _callSuper$5(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$5() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$5() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$5 = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$3 = "src/components/content/HowWorks.svelte";

  // (17:12) <Lazy fadeOption={null}>
  function create_default_slot$2(ctx) {
    var img;
    var img_src_value;
    var block = {
      c: function () {
        img = element("img");
        attr_dev(img, "id", "how-works");
        attr_dev(img, "alt", "Command parsing process by Cakcuk");
        attr_dev(img, "class", "pure-img svelte-bq3s86");
        if (!src_url_equal(img.src, img_src_value = "images/how_works.png")) attr_dev(img, "src", img_src_value);
        add_location(img, file$3, 17, 16, 550);
      },
      m: function (target, anchor) {
        insert_dev(target, img, anchor);
      },
      p: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(img);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot$2.name,
      type: "slot",
      source: "(17:12) <Lazy fadeOption={null}>",
      ctx: ctx
    });
    return block;
  }
  function create_fragment$4(ctx) {
    var div19;
    var div1;
    var div0;
    var br0;
    var t0;
    var h2;
    var t2;
    var br1;
    var t3;
    var div5;
    var div4;
    var lazy;
    var t4;
    var div2;
    var h5;
    var t6;
    var div3;
    var t7;
    var div18;
    var div9;
    var div7;
    var div6;
    var h40;
    var t9;
    var p0;
    var t10;
    var br2;
    var t11;
    var br3;
    var t12;
    var a0;
    var t14;
    var div8;
    var t15;
    var div13;
    var div11;
    var div10;
    var h41;
    var t17;
    var p1;
    var t18;
    var br4;
    var t19;
    var br5;
    var t20;
    var a1;
    var t22;
    var div12;
    var t23;
    var div17;
    var div15;
    var div14;
    var h42;
    var t25;
    var p2;
    var t26;
    var br6;
    var t27;
    var br7;
    var t28;
    var a2;
    var t30;
    var div16;
    var current;
    lazy = new Src({
      props: {
        fadeOption: null,
        $$slots: {
          default: [create_default_slot$2]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    var block = {
      c: function () {
        div19 = element("div");
        div1 = element("div");
        div0 = element("div");
        br0 = element("br");
        t0 = space();
        h2 = element("h2");
        h2.textContent = "~ How It Works ~";
        t2 = space();
        br1 = element("br");
        t3 = space();
        div5 = element("div");
        div4 = element("div");
        create_component(lazy.$$.fragment);
        t4 = space();
        div2 = element("div");
        h5 = element("h5");
        h5.textContent = "Command Parsing Process by Cakcuk";
        t6 = space();
        div3 = element("div");
        t7 = space();
        div18 = element("div");
        div9 = element("div");
        div7 = element("div");
        div6 = element("div");
        h40 = element("h4");
        h40.textContent = "- CUK -";
        t9 = space();
        p0 = element("p");
        t10 = text("Cuk is a command for hitting any HTTP/S endpoint. Incoming messages from the user will be extracted\n                    and check whether it is a Cuk command or not. If it's a Cuk command. It will be converted to an HTTP\n                    call. HTTP call will be executed and send back the response to your Workspace.\n                    ");
        br2 = element("br");
        t11 = space();
        br3 = element("br");
        t12 = space();
        a0 = element("a");
        a0.textContent = "Learn more!";
        t14 = space();
        div8 = element("div");
        t15 = space();
        div13 = element("div");
        div11 = element("div");
        div10 = element("div");
        h41 = element("h4");
        h41.textContent = "- CAK -";
        t17 = space();
        p1 = element("p");
        t18 = text("Cak is a command for creating new command by wrapping your HTTP call to make it more simple,\n                    readable,\n                    and straightforward.\n                    ");
        br4 = element("br");
        t19 = space();
        br5 = element("br");
        t20 = space();
        a1 = element("a");
        a1.textContent = "Learn more!";
        t22 = space();
        div12 = element("div");
        t23 = space();
        div17 = element("div");
        div15 = element("div");
        div14 = element("div");
        h42 = element("h4");
        h42.textContent = "- Custom Command -";
        t25 = space();
        p2 = element("p");
        t26 = text("Your commands that you create with Cak Command. It's pretty simple to get started. Just try to\n                    explore the playground! You can play around with your own API as well.\n                    ");
        br6 = element("br");
        t27 = space();
        br7 = element("br");
        t28 = space();
        a2 = element("a");
        a2.textContent = "Let's Play!";
        t30 = space();
        div16 = element("div");
        add_location(br0, file$3, 9, 12, 318);
        add_location(h2, file$3, 10, 12, 335);
        add_location(br1, file$3, 11, 12, 373);
        attr_dev(div0, "class", "sub-header svelte-bq3s86");
        add_location(div0, file$3, 8, 8, 281);
        attr_dev(div1, "class", "pure-u-1 pure-u-md-1-1");
        add_location(div1, file$3, 7, 4, 236);
        add_location(h5, file$3, 20, 16, 765);
        attr_dev(div2, "class", "text svelte-bq3s86");
        set_style(div2, "text-align", "center");
        set_style(div2, "color", "#727272");
        add_location(div2, file$3, 19, 12, 687);
        attr_dev(div3, "class", "line svelte-bq3s86");
        add_location(div3, file$3, 22, 12, 839);
        attr_dev(div4, "class", "card svelte-bq3s86");
        add_location(div4, file$3, 15, 8, 478);
        attr_dev(div5, "class", "pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-1 pure-u-1");
        add_location(div5, file$3, 14, 4, 408);
        add_location(h40, file$3, 29, 20, 1090);
        attr_dev(div6, "class", "sub-header-small svelte-bq3s86");
        add_location(div6, file$3, 28, 16, 1039);
        add_location(br2, file$3, 34, 20, 1489);
        add_location(br3, file$3, 35, 20, 1514);
        attr_dev(a0, "href", "#/docs/cukCommand");
        add_location(a0, file$3, 36, 20, 1539);
        add_location(p0, file$3, 31, 16, 1146);
        attr_dev(div7, "class", "text svelte-bq3s86");
        add_location(div7, file$3, 27, 12, 1004);
        attr_dev(div8, "class", "line svelte-bq3s86");
        add_location(div8, file$3, 39, 12, 1635);
        attr_dev(div9, "class", "card sub-card svelte-bq3s86");
        add_location(div9, file$3, 26, 8, 964);
        add_location(h41, file$3, 44, 20, 1809);
        attr_dev(div10, "class", "sub-header-small svelte-bq3s86");
        add_location(div10, file$3, 43, 16, 1758);
        add_location(br4, file$3, 49, 20, 2052);
        add_location(br5, file$3, 50, 20, 2077);
        attr_dev(a1, "href", "#/docs/cakCommand");
        add_location(a1, file$3, 51, 20, 2102);
        add_location(p1, file$3, 46, 16, 1865);
        attr_dev(div11, "class", "text svelte-bq3s86");
        add_location(div11, file$3, 42, 12, 1723);
        attr_dev(div12, "class", "line svelte-bq3s86");
        add_location(div12, file$3, 53, 12, 2177);
        attr_dev(div13, "class", "card sub-card svelte-bq3s86");
        add_location(div13, file$3, 41, 8, 1683);
        add_location(h42, file$3, 58, 20, 2359);
        attr_dev(div14, "class", "sub-header-small svelte-bq3s86");
        add_location(div14, file$3, 57, 16, 2308);
        add_location(br6, file$3, 62, 20, 2635);
        add_location(br7, file$3, 63, 20, 2660);
        attr_dev(a2, "href", "#/play");
        attr_dev(a2, "class", "link svelte-bq3s86");
        add_location(a2, file$3, 64, 20, 2685);
        add_location(p2, file$3, 60, 16, 2426);
        attr_dev(div15, "class", "text svelte-bq3s86");
        add_location(div15, file$3, 56, 12, 2273);
        attr_dev(div16, "class", "line-special");
        add_location(div16, file$3, 67, 12, 2783);
        attr_dev(div17, "class", "card sub-card special svelte-bq3s86");
        add_location(div17, file$3, 55, 8, 2225);
        attr_dev(div18, "class", "pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-1 pure-u-1");
        add_location(div18, file$3, 25, 4, 894);
        attr_dev(div19, "class", "pure-g center container bg svelte-bq3s86");
        add_location(div19, file$3, 6, 0, 191);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div19, anchor);
        append_dev(div19, div1);
        append_dev(div1, div0);
        append_dev(div0, br0);
        append_dev(div0, t0);
        append_dev(div0, h2);
        append_dev(div0, t2);
        append_dev(div0, br1);
        append_dev(div19, t3);
        append_dev(div19, div5);
        append_dev(div5, div4);
        mount_component(lazy, div4, null);
        append_dev(div4, t4);
        append_dev(div4, div2);
        append_dev(div2, h5);
        append_dev(div4, t6);
        append_dev(div4, div3);
        append_dev(div19, t7);
        append_dev(div19, div18);
        append_dev(div18, div9);
        append_dev(div9, div7);
        append_dev(div7, div6);
        append_dev(div6, h40);
        append_dev(div7, t9);
        append_dev(div7, p0);
        append_dev(p0, t10);
        append_dev(p0, br2);
        append_dev(p0, t11);
        append_dev(p0, br3);
        append_dev(p0, t12);
        append_dev(p0, a0);
        append_dev(div9, t14);
        append_dev(div9, div8);
        append_dev(div18, t15);
        append_dev(div18, div13);
        append_dev(div13, div11);
        append_dev(div11, div10);
        append_dev(div10, h41);
        append_dev(div11, t17);
        append_dev(div11, p1);
        append_dev(p1, t18);
        append_dev(p1, br4);
        append_dev(p1, t19);
        append_dev(p1, br5);
        append_dev(p1, t20);
        append_dev(p1, a1);
        append_dev(div13, t22);
        append_dev(div13, div12);
        append_dev(div18, t23);
        append_dev(div18, div17);
        append_dev(div17, div15);
        append_dev(div15, div14);
        append_dev(div14, h42);
        append_dev(div15, t25);
        append_dev(div15, p2);
        append_dev(p2, t26);
        append_dev(p2, br6);
        append_dev(p2, t27);
        append_dev(p2, br7);
        append_dev(p2, t28);
        append_dev(p2, a2);
        append_dev(div17, t30);
        append_dev(div17, div16);
        current = true;
      },
      p: function (ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        var lazy_changes = {};
        if (dirty & /*$$scope*/1) {
          lazy_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        lazy.$set(lazy_changes);
      },
      i: function (local) {
        if (current) return;
        transition_in(lazy.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(lazy.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div19);
        destroy_component(lazy);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$4.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$4($$self, $$props) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('HowWorks', slots, []);
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<HowWorks> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$capture_state = function () {
      return {
        Lazy: Src
      };
    };
    return [];
  }
  var HowWorks = /*#__PURE__*/function (_SvelteComponentDev) {
    function HowWorks(options) {
      var _this;
      _classCallCheck(this, HowWorks);
      _this = _callSuper$5(this, HowWorks, [options]);
      init(_this, options, instance$4, create_fragment$4, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "HowWorks",
        options: options,
        id: create_fragment$4.name
      });
      return _this;
    }
    _inherits(HowWorks, _SvelteComponentDev);
    return _createClass(HowWorks);
  }(SvelteComponentDev);

  function _callSuper$6(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$6() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$6() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$6 = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$4 = "src/components/content/Footer.svelte";
  function create_fragment$5(ctx) {
    var footer;
    var div1;
    var div0;
    var br0;
    var t0;
    var ul;
    var li0;
    var span;
    var t2;
    var li1;
    var a0;
    var t4;
    var li2;
    var a1;
    var t6;
    var li3;
    var a2;
    var t8;
    var br1;
    var footer_class_value;
    var block = {
      c: function () {
        footer = element("footer");
        div1 = element("div");
        div0 = element("div");
        br0 = element("br");
        t0 = space();
        ul = element("ul");
        li0 = element("li");
        span = element("span");
        span.textContent = "© Cakcuk.io";
        t2 = space();
        li1 = element("li");
        a0 = element("a");
        a0.textContent = "Privacy Policy";
        t4 = space();
        li2 = element("li");
        a1 = element("a");
        a1.textContent = "Github";
        t6 = space();
        li3 = element("li");
        a2 = element("a");
        a2.textContent = "Twitter";
        t8 = space();
        br1 = element("br");
        add_location(br0, file$4, 8, 12, 233);
        attr_dev(span, "class", "svelte-xhsymm");
        add_location(span, file$4, 11, 20, 342);
        attr_dev(li0, "class", "pure-menu-item svelte-xhsymm");
        add_location(li0, file$4, 10, 16, 294);
        attr_dev(a0, "class", "pure-menu-link svelte-xhsymm");
        attr_dev(a0, "href", "#/privacy");
        add_location(a0, file$4, 16, 20, 499);
        attr_dev(li1, "class", "pure-menu-item svelte-xhsymm");
        add_location(li1, file$4, 15, 16, 451);
        attr_dev(a1, "href", "https://github.com/isdzulqor/cakcuk");
        attr_dev(a1, "target", "_blank");
        attr_dev(a1, "class", "pure-menu-link svelte-xhsymm");
        add_location(a1, file$4, 19, 20, 647);
        attr_dev(li2, "class", "pure-menu-item svelte-xhsymm");
        add_location(li2, file$4, 18, 16, 599);
        attr_dev(a2, "href", "https://twitter.com/cakcukio");
        attr_dev(a2, "target", "_blank");
        attr_dev(a2, "class", "pure-menu-link svelte-xhsymm");
        add_location(a2, file$4, 22, 20, 829);
        attr_dev(li3, "class", "pure-menu-item svelte-xhsymm");
        add_location(li3, file$4, 21, 16, 781);
        attr_dev(ul, "class", "pure-menu-list svelte-xhsymm");
        add_location(ul, file$4, 9, 12, 250);
        attr_dev(div0, "class", "pure-u-1");
        add_location(div0, file$4, 7, 8, 198);
        attr_dev(div1, "class", "pure-g container svelte-xhsymm");
        add_location(div1, file$4, 6, 4, 159);
        add_location(br1, file$4, 27, 4, 989);
        attr_dev(footer, "class", footer_class_value = "bg " + /*shouldBG*/ctx[0] + " svelte-xhsymm");
        add_location(footer, file$4, 5, 0, 124);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, footer, anchor);
        append_dev(footer, div1);
        append_dev(div1, div0);
        append_dev(div0, br0);
        append_dev(div0, t0);
        append_dev(div0, ul);
        append_dev(ul, li0);
        append_dev(li0, span);
        append_dev(ul, t2);
        append_dev(ul, li1);
        append_dev(li1, a0);
        append_dev(ul, t4);
        append_dev(ul, li2);
        append_dev(li2, a1);
        append_dev(ul, t6);
        append_dev(ul, li3);
        append_dev(li3, a2);
        append_dev(footer, t8);
        append_dev(footer, br1);
      },
      p: function (ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        if (dirty & /*shouldBG*/1 && footer_class_value !== (footer_class_value = "bg " + /*shouldBG*/ctx[0] + " svelte-xhsymm")) {
          attr_dev(footer, "class", footer_class_value);
        }
      },
      i: noop$1,
      o: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(footer);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$5.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$5($$self, $$props, $$invalidate) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('Footer', slots, []);
    var _$$props$shouldBG = $$props.shouldBG,
      shouldBG = _$$props$shouldBG === void 0 ? "" : _$$props$shouldBG;
    var writable_props = ['shouldBG'];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Footer> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$$set = function ($$props) {
      if ('shouldBG' in $$props) $$invalidate(0, shouldBG = $$props.shouldBG);
    };
    $$self.$capture_state = function () {
      return {
        shouldBG: shouldBG
      };
    };
    $$self.$inject_state = function ($$props) {
      if ('shouldBG' in $$props) $$invalidate(0, shouldBG = $$props.shouldBG);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    return [shouldBG];
  }
  var Footer = /*#__PURE__*/function (_SvelteComponentDev) {
    function Footer(options) {
      var _this;
      _classCallCheck(this, Footer);
      _this = _callSuper$6(this, Footer, [options]);
      init(_this, options, instance$5, create_fragment$5, safe_not_equal, {
        shouldBG: 0
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "Footer",
        options: options,
        id: create_fragment$5.name
      });
      return _this;
    }
    _inherits(Footer, _SvelteComponentDev);
    return _createClass(Footer, [{
      key: "shouldBG",
      get: function () {
        throw new Error("<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }]);
  }(SvelteComponentDev);

  function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
      var i = n[a](c),
        u = i.value;
    } catch (n) {
      return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
  }
  function _asyncToGenerator(n) {
    return function () {
      var t = this,
        e = arguments;
      return new Promise(function (r, o) {
        var a = n.apply(t, e);
        function _next(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
        }
        function _throw(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
        }
        _next(void 0);
      });
    };
  }

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(o) {
    "@babel/helpers - typeof";

    return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
  }
  module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  unwrapExports(_typeof_1);

  var regeneratorRuntime$1 = createCommonjsModule(function (module) {
  var _typeof = _typeof_1["default"];
  function _regeneratorRuntime() {
    module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
      return r;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    var t,
      r = {},
      e = Object.prototype,
      n = e.hasOwnProperty,
      o = "function" == typeof Symbol ? Symbol : {},
      i = o.iterator || "@@iterator",
      a = o.asyncIterator || "@@asyncIterator",
      u = o.toStringTag || "@@toStringTag";
    function c(t, r, e, n) {
      return Object.defineProperty(t, r, {
        value: e,
        enumerable: !n,
        configurable: !n,
        writable: !n
      });
    }
    try {
      c({}, "");
    } catch (t) {
      c = function c(t, r, e) {
        return t[r] = e;
      };
    }
    function h(r, e, n, o) {
      var i = e && e.prototype instanceof Generator ? e : Generator,
        a = Object.create(i.prototype);
      return c(a, "_invoke", function (r, e, n) {
        var o = 1;
        return function (i, a) {
          if (3 === o) throw Error("Generator is already running");
          if (4 === o) {
            if ("throw" === i) throw a;
            return {
              value: t,
              done: !0
            };
          }
          for (n.method = i, n.arg = a;;) {
            var u = n.delegate;
            if (u) {
              var c = d(u, n);
              if (c) {
                if (c === f) continue;
                return c;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
              if (1 === o) throw o = 4, n.arg;
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            o = 3;
            var h = s(r, e, n);
            if ("normal" === h.type) {
              if (o = n.done ? 4 : 2, h.arg === f) continue;
              return {
                value: h.arg,
                done: n.done
              };
            }
            "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg);
          }
        };
      }(r, n, new Context(o || [])), !0), a;
    }
    function s(t, r, e) {
      try {
        return {
          type: "normal",
          arg: t.call(r, e)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }
    r.wrap = h;
    var f = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var l = {};
    c(l, i, function () {
      return this;
    });
    var p = Object.getPrototypeOf,
      y = p && p(p(x([])));
    y && y !== e && n.call(y, i) && (l = y);
    var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l);
    function g(t) {
      ["next", "throw", "return"].forEach(function (r) {
        c(t, r, function (t) {
          return this._invoke(r, t);
        });
      });
    }
    function AsyncIterator(t, r) {
      function e(o, i, a, u) {
        var c = s(t[o], t, i);
        if ("throw" !== c.type) {
          var h = c.arg,
            f = h.value;
          return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) {
            e("next", t, a, u);
          }, function (t) {
            e("throw", t, a, u);
          }) : r.resolve(f).then(function (t) {
            h.value = t, a(h);
          }, function (t) {
            return e("throw", t, a, u);
          });
        }
        u(c.arg);
      }
      var o;
      c(this, "_invoke", function (t, n) {
        function i() {
          return new r(function (r, o) {
            e(t, n, r, o);
          });
        }
        return o = o ? o.then(i, i) : i();
      }, !0);
    }
    function d(r, e) {
      var n = e.method,
        o = r.i[n];
      if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f;
      var i = s(o, r.i, e.arg);
      if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f;
      var a = i.arg;
      return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f);
    }
    function w(t) {
      this.tryEntries.push(t);
    }
    function m(r) {
      var e = r[4] || {};
      e.type = "normal", e.arg = t, r[4] = e;
    }
    function Context(t) {
      this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0);
    }
    function x(r) {
      if (null != r) {
        var e = r[i];
        if (e) return e.call(r);
        if ("function" == typeof r.next) return r;
        if (!isNaN(r.length)) {
          var o = -1,
            a = function e() {
              for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e;
              return e.value = t, e.done = !0, e;
            };
          return a.next = a;
        }
      }
      throw new TypeError(_typeof(r) + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) {
      var r = "function" == typeof t && t.constructor;
      return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name));
    }, r.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t;
    }, r.awrap = function (t) {
      return {
        __await: t
      };
    }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () {
      return this;
    }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(h(t, e, n, o), i);
      return r.isGeneratorFunction(e) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, g(v), c(v, u, "Generator"), c(v, i, function () {
      return this;
    }), c(v, "toString", function () {
      return "[object Generator]";
    }), r.keys = function (t) {
      var r = Object(t),
        e = [];
      for (var n in r) e.unshift(n);
      return function t() {
        for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t;
        return t.done = !0, t;
      };
    }, r.values = x, Context.prototype = {
      constructor: Context,
      reset: function reset(r) {
        if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t);
      },
      stop: function stop() {
        this.done = !0;
        var t = this.tryEntries[0][4];
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(r) {
        if (this.done) throw r;
        var e = this;
        function n(t) {
          a.type = "throw", a.arg = r, e.next = t;
        }
        for (var o = e.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i[4],
            u = this.prev,
            c = i[1],
            h = i[2];
          if (-1 === i[0]) return n("end"), !1;
          if (!c && !h) throw Error("try statement without catch or finally");
          if (null != i[0] && i[0] <= u) {
            if (u < c) return this.method = "next", this.arg = t, n(c), !0;
            if (u < h) return n(h), !1;
          }
        }
      },
      abrupt: function abrupt(t, r) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) {
            var o = n;
            break;
          }
        }
        o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null);
        var i = o ? o[4] : {};
        return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i);
      },
      complete: function complete(t, r) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f;
      },
      finish: function finish(t) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var e = this.tryEntries[r];
          if (e[2] === t) return this.complete(e[4], e[3]), m(e), f;
        }
      },
      "catch": function _catch(t) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var e = this.tryEntries[r];
          if (e[0] === t) {
            var n = e[4];
            if ("throw" === n.type) {
              var o = n.arg;
              m(e);
            }
            return o;
          }
        }
        throw Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(r, e, n) {
        return this.delegate = {
          i: x(r),
          r: e,
          n: n
        }, "next" === this.method && (this.arg = t), f;
      }
    }, r;
  }
  module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;
  });

  unwrapExports(regeneratorRuntime$1);

  // TODO(Babel 8): Remove this file.

  var runtime = regeneratorRuntime$1();
  var regenerator = runtime;

  // Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }

  // `SameValue` abstract operation
  // https://tc39.es/ecma262/#sec-samevalue
  // eslint-disable-next-line es/no-object-is -- safe
  var sameValue = Object.is || function is(x, y) {
    // eslint-disable-next-line no-self-compare -- NaN check
    return x === y ? x !== 0 || 1 / x === 1 / y : x !== x && y !== y;
  };

  // @@search logic
  fixRegexpWellKnownSymbolLogic('search', function (SEARCH, nativeSearch, maybeCallNative) {
    return [
      // `String.prototype.search` method
      // https://tc39.es/ecma262/#sec-string.prototype.search
      function search(regexp) {
        var O = requireObjectCoercible(this);
        var searcher = isObject(regexp) ? getMethod(regexp, SEARCH) : undefined;
        return searcher ? functionCall(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString_1(O));
      },
      // `RegExp.prototype[@@search]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
      function (string) {
        var rx = anObject(this);
        var S = toString_1(string);
        var res = maybeCallNative(nativeSearch, rx, S);

        if (res.done) return res.value;

        var previousLastIndex = rx.lastIndex;
        if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
        var result = regexpExecAbstract(rx, S);
        if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
        return result === null ? -1 : result.index;
      }
    ];
  });

  var ITERATOR$7 = wellKnownSymbol('iterator');

  var urlConstructorDetection = !fails(function () {
    // eslint-disable-next-line unicorn/relative-url-style -- required for testing
    var url = new URL('b?a=1&b=2&c=3', 'https://a');
    var params = url.searchParams;
    var params2 = new URLSearchParams('a=1&a=2&b=3');
    var result = '';
    url.pathname = 'c%20d';
    params.forEach(function (value, key) {
      params['delete']('b');
      result += key + value;
    });
    params2['delete']('a', 2);
    // `undefined` case is a Chromium 117 bug
    // https://bugs.chromium.org/p/v8/issues/detail?id=14222
    params2['delete']('b', undefined);
    return (isPure && (!url.toJSON || !params2.has('a', 1) || params2.has('a', 2) || !params2.has('a', undefined) || params2.has('b')))
      || (!params.size && (isPure || !descriptors))
      || !params.sort
      || url.href !== 'https://a/c%20d?a=1&c=3'
      || params.get('c') !== '3'
      || String(new URLSearchParams('?a=1')) !== 'a=1'
      || !params[ITERATOR$7]
      // throws in Edge
      || new URL('https://a@b').username !== 'a'
      || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
      // not punycoded in Edge
      || new URL('https://тест').host !== 'xn--e1aybc'
      // not escaped in Chrome 62-
      || new URL('https://a#б').hash !== '#%D0%B1'
      // fails in Chrome 66-
      || result !== 'a1c3'
      // throws in Safari
      || new URL('https://x', undefined).host !== 'x';
  });

  // based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js


  var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
  var base = 36;
  var tMin = 1;
  var tMax = 26;
  var skew = 38;
  var damp = 700;
  var initialBias = 72;
  var initialN = 128; // 0x80
  var delimiter = '-'; // '\x2D'
  var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
  var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
  var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
  var baseMinusTMin = base - tMin;

  var $RangeError$3 = RangeError;
  var exec$3 = functionUncurryThis(regexSeparators.exec);
  var floor$5 = Math.floor;
  var fromCharCode = String.fromCharCode;
  var charCodeAt$2 = functionUncurryThis(''.charCodeAt);
  var join$2 = functionUncurryThis([].join);
  var push$7 = functionUncurryThis([].push);
  var replace$7 = functionUncurryThis(''.replace);
  var split$1 = functionUncurryThis(''.split);
  var toLowerCase = functionUncurryThis(''.toLowerCase);

  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   */
  var ucs2decode = function (string) {
    var output = [];
    var counter = 0;
    var length = string.length;
    while (counter < length) {
      var value = charCodeAt$2(string, counter++);
      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // It's a high surrogate, and there is a next character.
        var extra = charCodeAt$2(string, counter++);
        if ((extra & 0xFC00) === 0xDC00) { // Low surrogate.
          push$7(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // It's an unmatched surrogate; only append this code unit, in case the
          // next code unit is the high surrogate of a surrogate pair.
          push$7(output, value);
          counter--;
        }
      } else {
        push$7(output, value);
      }
    }
    return output;
  };

  /**
   * Converts a digit/integer into a basic code point.
   */
  var digitToBasic = function (digit) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26);
  };

  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   */
  var adapt = function (delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor$5(delta / damp) : delta >> 1;
    delta += floor$5(delta / numPoints);
    while (delta > baseMinusTMin * tMax >> 1) {
      delta = floor$5(delta / baseMinusTMin);
      k += base;
    }
    return floor$5(k + (baseMinusTMin + 1) * delta / (delta + skew));
  };

  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   */
  var encode = function (input) {
    var output = [];

    // Convert the input in UCS-2 to an array of Unicode code points.
    input = ucs2decode(input);

    // Cache the length.
    var inputLength = input.length;

    // Initialize the state.
    var n = initialN;
    var delta = 0;
    var bias = initialBias;
    var i, currentValue;

    // Handle the basic code points.
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < 0x80) {
        push$7(output, fromCharCode(currentValue));
      }
    }

    var basicLength = output.length; // number of basic code points.
    var handledCPCount = basicLength; // number of code points that have been handled;

    // Finish the basic string with a delimiter unless it's empty.
    if (basicLength) {
      push$7(output, delimiter);
    }

    // Main encoding loop:
    while (handledCPCount < inputLength) {
      // All non-basic code points < n have been handled already. Find the next larger one:
      var m = maxInt;
      for (i = 0; i < input.length; i++) {
        currentValue = input[i];
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }

      // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
      var handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > floor$5((maxInt - delta) / handledCPCountPlusOne)) {
        throw new $RangeError$3(OVERFLOW_ERROR);
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (i = 0; i < input.length; i++) {
        currentValue = input[i];
        if (currentValue < n && ++delta > maxInt) {
          throw new $RangeError$3(OVERFLOW_ERROR);
        }
        if (currentValue === n) {
          // Represent delta as a generalized variable-length integer.
          var q = delta;
          var k = base;
          while (true) {
            var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (q < t) break;
            var qMinusT = q - t;
            var baseMinusT = base - t;
            push$7(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
            q = floor$5(qMinusT / baseMinusT);
            k += base;
          }

          push$7(output, fromCharCode(digitToBasic(q)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
          delta = 0;
          handledCPCount++;
        }
      }

      delta++;
      n++;
    }
    return join$2(output, '');
  };

  var stringPunycodeToAscii = function (input) {
    var encoded = [];
    var labels = split$1(replace$7(toLowerCase(input), regexSeparators, '\u002E'), '.');
    var i, label;
    for (i = 0; i < labels.length; i++) {
      label = labels[i];
      push$7(encoded, exec$3(regexNonASCII, label) ? 'xn--' + encode(label) : label);
    }
    return join$2(encoded, '.');
  };

  var $RangeError$4 = RangeError;
  var fromCharCode$1 = String.fromCharCode;
  // eslint-disable-next-line es/no-string-fromcodepoint -- required for testing
  var $fromCodePoint = String.fromCodePoint;
  var join$3 = functionUncurryThis([].join);

  // length should be 1, old FF problem
  var INCORRECT_LENGTH = !!$fromCodePoint && $fromCodePoint.length !== 1;

  // `String.fromCodePoint` method
  // https://tc39.es/ecma262/#sec-string.fromcodepoint
  _export({ target: 'String', stat: true, arity: 1, forced: INCORRECT_LENGTH }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    fromCodePoint: function fromCodePoint(x) {
      var elements = [];
      var length = arguments.length;
      var i = 0;
      var code;
      while (length > i) {
        code = +arguments[i++];
        if (toAbsoluteIndex(code, 0x10FFFF) !== code) throw new $RangeError$4(code + ' is not a valid code point');
        elements[i] = code < 0x10000
          ? fromCharCode$1(code)
          : fromCharCode$1(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00);
      } return join$3(elements, '');
    }
  });

  // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

































  var ITERATOR$8 = wellKnownSymbol('iterator');
  var URL_SEARCH_PARAMS = 'URLSearchParams';
  var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
  var setInternalState$7 = internalState.set;
  var getInternalParamsState = internalState.getterFor(URL_SEARCH_PARAMS);
  var getInternalIteratorState = internalState.getterFor(URL_SEARCH_PARAMS_ITERATOR);

  var nativeFetch = safeGetBuiltIn('fetch');
  var NativeRequest = safeGetBuiltIn('Request');
  var Headers = safeGetBuiltIn('Headers');
  var RequestPrototype = NativeRequest && NativeRequest.prototype;
  var HeadersPrototype = Headers && Headers.prototype;
  var TypeError$5 = globalThis_1.TypeError;
  var encodeURIComponent$1 = globalThis_1.encodeURIComponent;
  var fromCharCode$2 = String.fromCharCode;
  var fromCodePoint = getBuiltIn('String', 'fromCodePoint');
  var $parseInt = parseInt;
  var charAt$6 = functionUncurryThis(''.charAt);
  var join$4 = functionUncurryThis([].join);
  var push$8 = functionUncurryThis([].push);
  var replace$8 = functionUncurryThis(''.replace);
  var shift = functionUncurryThis([].shift);
  var splice$1 = functionUncurryThis([].splice);
  var split$2 = functionUncurryThis(''.split);
  var stringSlice$6 = functionUncurryThis(''.slice);
  var exec$4 = functionUncurryThis(/./.exec);

  var plus = /\+/g;
  var FALLBACK_REPLACER = '\uFFFD';
  var VALID_HEX = /^[0-9a-f]+$/i;

  var parseHexOctet = function (string, start) {
    var substr = stringSlice$6(string, start, start + 2);
    if (!exec$4(VALID_HEX, substr)) return NaN;

    return $parseInt(substr, 16);
  };

  var getLeadingOnes = function (octet) {
    var count = 0;
    for (var mask = 0x80; mask > 0 && (octet & mask) !== 0; mask >>= 1) {
      count++;
    }
    return count;
  };

  var utf8Decode = function (octets) {
    var codePoint = null;

    switch (octets.length) {
      case 1:
        codePoint = octets[0];
        break;
      case 2:
        codePoint = (octets[0] & 0x1F) << 6 | (octets[1] & 0x3F);
        break;
      case 3:
        codePoint = (octets[0] & 0x0F) << 12 | (octets[1] & 0x3F) << 6 | (octets[2] & 0x3F);
        break;
      case 4:
        codePoint = (octets[0] & 0x07) << 18 | (octets[1] & 0x3F) << 12 | (octets[2] & 0x3F) << 6 | (octets[3] & 0x3F);
        break;
    }

    return codePoint > 0x10FFFF ? null : codePoint;
  };

  var decode = function (input) {
    input = replace$8(input, plus, ' ');
    var length = input.length;
    var result = '';
    var i = 0;

    while (i < length) {
      var decodedChar = charAt$6(input, i);

      if (decodedChar === '%') {
        if (charAt$6(input, i + 1) === '%' || i + 3 > length) {
          result += '%';
          i++;
          continue;
        }

        var octet = parseHexOctet(input, i + 1);

        // eslint-disable-next-line no-self-compare -- NaN check
        if (octet !== octet) {
          result += decodedChar;
          i++;
          continue;
        }

        i += 2;
        var byteSequenceLength = getLeadingOnes(octet);

        if (byteSequenceLength === 0) {
          decodedChar = fromCharCode$2(octet);
        } else {
          if (byteSequenceLength === 1 || byteSequenceLength > 4) {
            result += FALLBACK_REPLACER;
            i++;
            continue;
          }

          var octets = [octet];
          var sequenceIndex = 1;

          while (sequenceIndex < byteSequenceLength) {
            i++;
            if (i + 3 > length || charAt$6(input, i) !== '%') break;

            var nextByte = parseHexOctet(input, i + 1);

            // eslint-disable-next-line no-self-compare -- NaN check
            if (nextByte !== nextByte) {
              i += 3;
              break;
            }
            if (nextByte > 191 || nextByte < 128) break;

            push$8(octets, nextByte);
            i += 2;
            sequenceIndex++;
          }

          if (octets.length !== byteSequenceLength) {
            result += FALLBACK_REPLACER;
            continue;
          }

          var codePoint = utf8Decode(octets);
          if (codePoint === null) {
            result += FALLBACK_REPLACER;
          } else {
            decodedChar = fromCodePoint(codePoint);
          }
        }
      }

      result += decodedChar;
      i++;
    }

    return result;
  };

  var find$1 = /[!'()~]|%20/g;

  var replacements = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+'
  };

  var replacer = function (match) {
    return replacements[match];
  };

  var serialize = function (it) {
    return replace$8(encodeURIComponent$1(it), find$1, replacer);
  };

  var URLSearchParamsIterator = iteratorCreateConstructor(function Iterator(params, kind) {
    setInternalState$7(this, {
      type: URL_SEARCH_PARAMS_ITERATOR,
      target: getInternalParamsState(params).entries,
      index: 0,
      kind: kind
    });
  }, URL_SEARCH_PARAMS, function next() {
    var state = getInternalIteratorState(this);
    var target = state.target;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = null;
      return createIterResultObject(undefined, true);
    }
    var entry = target[index];
    switch (state.kind) {
      case 'keys': return createIterResultObject(entry.key, false);
      case 'values': return createIterResultObject(entry.value, false);
    } return createIterResultObject([entry.key, entry.value], false);
  }, true);

  var URLSearchParamsState = function (init) {
    this.entries = [];
    this.url = null;

    if (init !== undefined) {
      if (isObject(init)) this.parseObject(init);
      else this.parseQuery(typeof init == 'string' ? charAt$6(init, 0) === '?' ? stringSlice$6(init, 1) : init : toString_1(init));
    }
  };

  URLSearchParamsState.prototype = {
    type: URL_SEARCH_PARAMS,
    bindURL: function (url) {
      this.url = url;
      this.update();
    },
    parseObject: function (object) {
      var entries = this.entries;
      var iteratorMethod = getIteratorMethod(object);
      var iterator, next, step, entryIterator, entryNext, first, second;

      if (iteratorMethod) {
        iterator = getIterator(object, iteratorMethod);
        next = iterator.next;
        while (!(step = functionCall(next, iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if (
            (first = functionCall(entryNext, entryIterator)).done ||
            (second = functionCall(entryNext, entryIterator)).done ||
            !functionCall(entryNext, entryIterator).done
          ) throw new TypeError$5('Expected sequence with length 2');
          push$8(entries, { key: toString_1(first.value), value: toString_1(second.value) });
        }
      } else for (var key in object) if (hasOwnProperty_1(object, key)) {
        push$8(entries, { key: key, value: toString_1(object[key]) });
      }
    },
    parseQuery: function (query) {
      if (query) {
        var entries = this.entries;
        var attributes = split$2(query, '&');
        var index = 0;
        var attribute, entry;
        while (index < attributes.length) {
          attribute = attributes[index++];
          if (attribute.length) {
            entry = split$2(attribute, '=');
            push$8(entries, {
              key: decode(shift(entry)),
              value: decode(join$4(entry, '='))
            });
          }
        }
      }
    },
    serialize: function () {
      var entries = this.entries;
      var result = [];
      var index = 0;
      var entry;
      while (index < entries.length) {
        entry = entries[index++];
        push$8(result, serialize(entry.key) + '=' + serialize(entry.value));
      } return join$4(result, '&');
    },
    update: function () {
      this.entries.length = 0;
      this.parseQuery(this.url.query);
    },
    updateURL: function () {
      if (this.url) this.url.update();
    }
  };

  // `URLSearchParams` constructor
  // https://url.spec.whatwg.org/#interface-urlsearchparams
  var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
    anInstance(this, URLSearchParamsPrototype);
    var init = arguments.length > 0 ? arguments[0] : undefined;
    var state = setInternalState$7(this, new URLSearchParamsState(init));
    if (!descriptors) this.size = state.entries.length;
  };

  var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

  defineBuiltIns(URLSearchParamsPrototype, {
    // `URLSearchParams.prototype.append` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-append
    append: function append(name, value) {
      var state = getInternalParamsState(this);
      validateArgumentsLength(arguments.length, 2);
      push$8(state.entries, { key: toString_1(name), value: toString_1(value) });
      if (!descriptors) this.length++;
      state.updateURL();
    },
    // `URLSearchParams.prototype.delete` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
    'delete': function (name /* , value */) {
      var state = getInternalParamsState(this);
      var length = validateArgumentsLength(arguments.length, 1);
      var entries = state.entries;
      var key = toString_1(name);
      var $value = length < 2 ? undefined : arguments[1];
      var value = $value === undefined ? $value : toString_1($value);
      var index = 0;
      while (index < entries.length) {
        var entry = entries[index];
        if (entry.key === key && (value === undefined || entry.value === value)) {
          splice$1(entries, index, 1);
          if (value !== undefined) break;
        } else index++;
      }
      if (!descriptors) this.size = entries.length;
      state.updateURL();
    },
    // `URLSearchParams.prototype.get` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-get
    get: function get(name) {
      var entries = getInternalParamsState(this).entries;
      validateArgumentsLength(arguments.length, 1);
      var key = toString_1(name);
      var index = 0;
      for (; index < entries.length; index++) {
        if (entries[index].key === key) return entries[index].value;
      }
      return null;
    },
    // `URLSearchParams.prototype.getAll` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
    getAll: function getAll(name) {
      var entries = getInternalParamsState(this).entries;
      validateArgumentsLength(arguments.length, 1);
      var key = toString_1(name);
      var result = [];
      var index = 0;
      for (; index < entries.length; index++) {
        if (entries[index].key === key) push$8(result, entries[index].value);
      }
      return result;
    },
    // `URLSearchParams.prototype.has` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-has
    has: function has(name /* , value */) {
      var entries = getInternalParamsState(this).entries;
      var length = validateArgumentsLength(arguments.length, 1);
      var key = toString_1(name);
      var $value = length < 2 ? undefined : arguments[1];
      var value = $value === undefined ? $value : toString_1($value);
      var index = 0;
      while (index < entries.length) {
        var entry = entries[index++];
        if (entry.key === key && (value === undefined || entry.value === value)) return true;
      }
      return false;
    },
    // `URLSearchParams.prototype.set` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-set
    set: function set(name, value) {
      var state = getInternalParamsState(this);
      validateArgumentsLength(arguments.length, 1);
      var entries = state.entries;
      var found = false;
      var key = toString_1(name);
      var val = toString_1(value);
      var index = 0;
      var entry;
      for (; index < entries.length; index++) {
        entry = entries[index];
        if (entry.key === key) {
          if (found) splice$1(entries, index--, 1);
          else {
            found = true;
            entry.value = val;
          }
        }
      }
      if (!found) push$8(entries, { key: key, value: val });
      if (!descriptors) this.size = entries.length;
      state.updateURL();
    },
    // `URLSearchParams.prototype.sort` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
    sort: function sort() {
      var state = getInternalParamsState(this);
      arraySort(state.entries, function (a, b) {
        return a.key > b.key ? 1 : -1;
      });
      state.updateURL();
    },
    // `URLSearchParams.prototype.forEach` method
    forEach: function forEach(callback /* , thisArg */) {
      var entries = getInternalParamsState(this).entries;
      var boundFunction = functionBindContext(callback, arguments.length > 1 ? arguments[1] : undefined);
      var index = 0;
      var entry;
      while (index < entries.length) {
        entry = entries[index++];
        boundFunction(entry.value, entry.key, this);
      }
    },
    // `URLSearchParams.prototype.keys` method
    keys: function keys() {
      return new URLSearchParamsIterator(this, 'keys');
    },
    // `URLSearchParams.prototype.values` method
    values: function values() {
      return new URLSearchParamsIterator(this, 'values');
    },
    // `URLSearchParams.prototype.entries` method
    entries: function entries() {
      return new URLSearchParamsIterator(this, 'entries');
    }
  }, { enumerable: true });

  // `URLSearchParams.prototype[@@iterator]` method
  defineBuiltIn(URLSearchParamsPrototype, ITERATOR$8, URLSearchParamsPrototype.entries, { name: 'entries' });

  // `URLSearchParams.prototype.toString` method
  // https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
  defineBuiltIn(URLSearchParamsPrototype, 'toString', function toString() {
    return getInternalParamsState(this).serialize();
  }, { enumerable: true });

  // `URLSearchParams.prototype.size` getter
  // https://github.com/whatwg/url/pull/734
  if (descriptors) defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {
    get: function size() {
      return getInternalParamsState(this).entries.length;
    },
    configurable: true,
    enumerable: true
  });

  setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

  _export({ global: true, constructor: true, forced: !urlConstructorDetection }, {
    URLSearchParams: URLSearchParamsConstructor
  });

  // Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
  if (!urlConstructorDetection && isCallable(Headers)) {
    var headersHas = functionUncurryThis(HeadersPrototype.has);
    var headersSet = functionUncurryThis(HeadersPrototype.set);

    var wrapRequestOptions = function (init) {
      if (isObject(init)) {
        var body = init.body;
        var headers;
        if (classof(body) === URL_SEARCH_PARAMS) {
          headers = init.headers ? new Headers(init.headers) : new Headers();
          if (!headersHas(headers, 'content-type')) {
            headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
          }
          return objectCreate(init, {
            body: createPropertyDescriptor(0, toString_1(body)),
            headers: createPropertyDescriptor(0, headers)
          });
        }
      } return init;
    };

    if (isCallable(nativeFetch)) {
      _export({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
        fetch: function fetch(input /* , init */) {
          return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
        }
      });
    }

    if (isCallable(NativeRequest)) {
      var RequestConstructor = function Request(input /* , init */) {
        anInstance(this, RequestPrototype);
        return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      };

      RequestPrototype.constructor = RequestConstructor;
      RequestConstructor.prototype = RequestPrototype;

      _export({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
        Request: RequestConstructor
      });
    }
  }

  var web_urlSearchParams_constructor = {
    URLSearchParams: URLSearchParamsConstructor,
    getState: getInternalParamsState
  };

  // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`














  var codeAt = stringMultibyte.codeAt;







  var setInternalState$8 = internalState.set;
  var getInternalURLState = internalState.getterFor('URL');
  var URLSearchParams$1 = web_urlSearchParams_constructor.URLSearchParams;
  var getInternalSearchParamsState = web_urlSearchParams_constructor.getState;

  var NativeURL = globalThis_1.URL;
  var TypeError$6 = globalThis_1.TypeError;
  var parseInt$1 = globalThis_1.parseInt;
  var floor$6 = Math.floor;
  var pow$1 = Math.pow;
  var charAt$7 = functionUncurryThis(''.charAt);
  var exec$5 = functionUncurryThis(/./.exec);
  var join$5 = functionUncurryThis([].join);
  var numberToString$1 = functionUncurryThis(1.0.toString);
  var pop$1 = functionUncurryThis([].pop);
  var push$9 = functionUncurryThis([].push);
  var replace$9 = functionUncurryThis(''.replace);
  var shift$1 = functionUncurryThis([].shift);
  var split$3 = functionUncurryThis(''.split);
  var stringSlice$7 = functionUncurryThis(''.slice);
  var toLowerCase$1 = functionUncurryThis(''.toLowerCase);
  var unshift = functionUncurryThis([].unshift);

  var INVALID_AUTHORITY = 'Invalid authority';
  var INVALID_SCHEME = 'Invalid scheme';
  var INVALID_HOST = 'Invalid host';
  var INVALID_PORT = 'Invalid port';

  var ALPHA = /[a-z]/i;
  // eslint-disable-next-line regexp/no-obscure-range -- safe
  var ALPHANUMERIC = /[\d+-.a-z]/i;
  var DIGIT = /\d/;
  var HEX_START = /^0x/i;
  var OCT = /^[0-7]+$/;
  var DEC = /^\d+$/;
  var HEX = /^[\da-f]+$/i;
  /* eslint-disable regexp/no-control-character -- safe */
  var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
  var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
  var LEADING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+/;
  var TRAILING_C0_CONTROL_OR_SPACE = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/;
  var TAB_AND_NEW_LINE = /[\t\n\r]/g;
  /* eslint-enable regexp/no-control-character -- safe */
  var EOF;

  // https://url.spec.whatwg.org/#ipv4-number-parser
  var parseIPv4 = function (input) {
    var parts = split$3(input, '.');
    var partsLength, numbers, index, part, radix, number, ipv4;
    if (parts.length && parts[parts.length - 1] === '') {
      parts.length--;
    }
    partsLength = parts.length;
    if (partsLength > 4) return input;
    numbers = [];
    for (index = 0; index < partsLength; index++) {
      part = parts[index];
      if (part === '') return input;
      radix = 10;
      if (part.length > 1 && charAt$7(part, 0) === '0') {
        radix = exec$5(HEX_START, part) ? 16 : 8;
        part = stringSlice$7(part, radix === 8 ? 1 : 2);
      }
      if (part === '') {
        number = 0;
      } else {
        if (!exec$5(radix === 10 ? DEC : radix === 8 ? OCT : HEX, part)) return input;
        number = parseInt$1(part, radix);
      }
      push$9(numbers, number);
    }
    for (index = 0; index < partsLength; index++) {
      number = numbers[index];
      if (index === partsLength - 1) {
        if (number >= pow$1(256, 5 - partsLength)) return null;
      } else if (number > 255) return null;
    }
    ipv4 = pop$1(numbers);
    for (index = 0; index < numbers.length; index++) {
      ipv4 += numbers[index] * pow$1(256, 3 - index);
    }
    return ipv4;
  };

  // https://url.spec.whatwg.org/#concept-ipv6-parser
  // eslint-disable-next-line max-statements -- TODO
  var parseIPv6 = function (input) {
    var address = [0, 0, 0, 0, 0, 0, 0, 0];
    var pieceIndex = 0;
    var compress = null;
    var pointer = 0;
    var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

    var chr = function () {
      return charAt$7(input, pointer);
    };

    if (chr() === ':') {
      if (charAt$7(input, 1) !== ':') return;
      pointer += 2;
      pieceIndex++;
      compress = pieceIndex;
    }
    while (chr()) {
      if (pieceIndex === 8) return;
      if (chr() === ':') {
        if (compress !== null) return;
        pointer++;
        pieceIndex++;
        compress = pieceIndex;
        continue;
      }
      value = length = 0;
      while (length < 4 && exec$5(HEX, chr())) {
        value = value * 16 + parseInt$1(chr(), 16);
        pointer++;
        length++;
      }
      if (chr() === '.') {
        if (length === 0) return;
        pointer -= length;
        if (pieceIndex > 6) return;
        numbersSeen = 0;
        while (chr()) {
          ipv4Piece = null;
          if (numbersSeen > 0) {
            if (chr() === '.' && numbersSeen < 4) pointer++;
            else return;
          }
          if (!exec$5(DIGIT, chr())) return;
          while (exec$5(DIGIT, chr())) {
            number = parseInt$1(chr(), 10);
            if (ipv4Piece === null) ipv4Piece = number;
            else if (ipv4Piece === 0) return;
            else ipv4Piece = ipv4Piece * 10 + number;
            if (ipv4Piece > 255) return;
            pointer++;
          }
          address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
          numbersSeen++;
          if (numbersSeen === 2 || numbersSeen === 4) pieceIndex++;
        }
        if (numbersSeen !== 4) return;
        break;
      } else if (chr() === ':') {
        pointer++;
        if (!chr()) return;
      } else if (chr()) return;
      address[pieceIndex++] = value;
    }
    if (compress !== null) {
      swaps = pieceIndex - compress;
      pieceIndex = 7;
      while (pieceIndex !== 0 && swaps > 0) {
        swap = address[pieceIndex];
        address[pieceIndex--] = address[compress + swaps - 1];
        address[compress + --swaps] = swap;
      }
    } else if (pieceIndex !== 8) return;
    return address;
  };

  var findLongestZeroSequence = function (ipv6) {
    var maxIndex = null;
    var maxLength = 1;
    var currStart = null;
    var currLength = 0;
    var index = 0;
    for (; index < 8; index++) {
      if (ipv6[index] !== 0) {
        if (currLength > maxLength) {
          maxIndex = currStart;
          maxLength = currLength;
        }
        currStart = null;
        currLength = 0;
      } else {
        if (currStart === null) currStart = index;
        ++currLength;
      }
    }
    return currLength > maxLength ? currStart : maxIndex;
  };

  // https://url.spec.whatwg.org/#host-serializing
  var serializeHost = function (host) {
    var result, index, compress, ignore0;

    // ipv4
    if (typeof host == 'number') {
      result = [];
      for (index = 0; index < 4; index++) {
        unshift(result, host % 256);
        host = floor$6(host / 256);
      }
      return join$5(result, '.');
    }

    // ipv6
    if (typeof host == 'object') {
      result = '';
      compress = findLongestZeroSequence(host);
      for (index = 0; index < 8; index++) {
        if (ignore0 && host[index] === 0) continue;
        if (ignore0) ignore0 = false;
        if (compress === index) {
          result += index ? ':' : '::';
          ignore0 = true;
        } else {
          result += numberToString$1(host[index], 16);
          if (index < 7) result += ':';
        }
      }
      return '[' + result + ']';
    }

    return host;
  };

  var C0ControlPercentEncodeSet = {};
  var fragmentPercentEncodeSet = objectAssign({}, C0ControlPercentEncodeSet, {
    ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
  });
  var pathPercentEncodeSet = objectAssign({}, fragmentPercentEncodeSet, {
    '#': 1, '?': 1, '{': 1, '}': 1
  });
  var userinfoPercentEncodeSet = objectAssign({}, pathPercentEncodeSet, {
    '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
  });

  var percentEncode = function (chr, set) {
    var code = codeAt(chr, 0);
    return code > 0x20 && code < 0x7F && !hasOwnProperty_1(set, chr) ? chr : encodeURIComponent(chr);
  };

  // https://url.spec.whatwg.org/#special-scheme
  var specialSchemes = {
    ftp: 21,
    file: null,
    http: 80,
    https: 443,
    ws: 80,
    wss: 443
  };

  // https://url.spec.whatwg.org/#windows-drive-letter
  var isWindowsDriveLetter = function (string, normalized) {
    var second;
    return string.length === 2 && exec$5(ALPHA, charAt$7(string, 0))
      && ((second = charAt$7(string, 1)) === ':' || (!normalized && second === '|'));
  };

  // https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
  var startsWithWindowsDriveLetter = function (string) {
    var third;
    return string.length > 1 && isWindowsDriveLetter(stringSlice$7(string, 0, 2)) && (
      string.length === 2 ||
      ((third = charAt$7(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
    );
  };

  // https://url.spec.whatwg.org/#single-dot-path-segment
  var isSingleDot = function (segment) {
    return segment === '.' || toLowerCase$1(segment) === '%2e';
  };

  // https://url.spec.whatwg.org/#double-dot-path-segment
  var isDoubleDot = function (segment) {
    segment = toLowerCase$1(segment);
    return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
  };

  // States:
  var SCHEME_START = {};
  var SCHEME = {};
  var NO_SCHEME = {};
  var SPECIAL_RELATIVE_OR_AUTHORITY = {};
  var PATH_OR_AUTHORITY = {};
  var RELATIVE = {};
  var RELATIVE_SLASH = {};
  var SPECIAL_AUTHORITY_SLASHES = {};
  var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
  var AUTHORITY = {};
  var HOST = {};
  var HOSTNAME = {};
  var PORT = {};
  var FILE = {};
  var FILE_SLASH = {};
  var FILE_HOST = {};
  var PATH_START = {};
  var PATH = {};
  var CANNOT_BE_A_BASE_URL_PATH = {};
  var QUERY = {};
  var FRAGMENT = {};

  var URLState = function (url, isBase, base) {
    var urlString = toString_1(url);
    var baseState, failure, searchParams;
    if (isBase) {
      failure = this.parse(urlString);
      if (failure) throw new TypeError$6(failure);
      this.searchParams = null;
    } else {
      if (base !== undefined) baseState = new URLState(base, true);
      failure = this.parse(urlString, null, baseState);
      if (failure) throw new TypeError$6(failure);
      searchParams = getInternalSearchParamsState(new URLSearchParams$1());
      searchParams.bindURL(this);
      this.searchParams = searchParams;
    }
  };

  URLState.prototype = {
    type: 'URL',
    // https://url.spec.whatwg.org/#url-parsing
    // eslint-disable-next-line max-statements -- TODO
    parse: function (input, stateOverride, base) {
      var url = this;
      var state = stateOverride || SCHEME_START;
      var pointer = 0;
      var buffer = '';
      var seenAt = false;
      var seenBracket = false;
      var seenPasswordToken = false;
      var codePoints, chr, bufferCodePoints, failure;

      input = toString_1(input);

      if (!stateOverride) {
        url.scheme = '';
        url.username = '';
        url.password = '';
        url.host = null;
        url.port = null;
        url.path = [];
        url.query = null;
        url.fragment = null;
        url.cannotBeABaseURL = false;
        input = replace$9(input, LEADING_C0_CONTROL_OR_SPACE, '');
        input = replace$9(input, TRAILING_C0_CONTROL_OR_SPACE, '$1');
      }

      input = replace$9(input, TAB_AND_NEW_LINE, '');

      codePoints = arrayFrom(input);

      while (pointer <= codePoints.length) {
        chr = codePoints[pointer];
        switch (state) {
          case SCHEME_START:
            if (chr && exec$5(ALPHA, chr)) {
              buffer += toLowerCase$1(chr);
              state = SCHEME;
            } else if (!stateOverride) {
              state = NO_SCHEME;
              continue;
            } else return INVALID_SCHEME;
            break;

          case SCHEME:
            if (chr && (exec$5(ALPHANUMERIC, chr) || chr === '+' || chr === '-' || chr === '.')) {
              buffer += toLowerCase$1(chr);
            } else if (chr === ':') {
              if (stateOverride && (
                (url.isSpecial() !== hasOwnProperty_1(specialSchemes, buffer)) ||
                (buffer === 'file' && (url.includesCredentials() || url.port !== null)) ||
                (url.scheme === 'file' && !url.host)
              )) return;
              url.scheme = buffer;
              if (stateOverride) {
                if (url.isSpecial() && specialSchemes[url.scheme] === url.port) url.port = null;
                return;
              }
              buffer = '';
              if (url.scheme === 'file') {
                state = FILE;
              } else if (url.isSpecial() && base && base.scheme === url.scheme) {
                state = SPECIAL_RELATIVE_OR_AUTHORITY;
              } else if (url.isSpecial()) {
                state = SPECIAL_AUTHORITY_SLASHES;
              } else if (codePoints[pointer + 1] === '/') {
                state = PATH_OR_AUTHORITY;
                pointer++;
              } else {
                url.cannotBeABaseURL = true;
                push$9(url.path, '');
                state = CANNOT_BE_A_BASE_URL_PATH;
              }
            } else if (!stateOverride) {
              buffer = '';
              state = NO_SCHEME;
              pointer = 0;
              continue;
            } else return INVALID_SCHEME;
            break;

          case NO_SCHEME:
            if (!base || (base.cannotBeABaseURL && chr !== '#')) return INVALID_SCHEME;
            if (base.cannotBeABaseURL && chr === '#') {
              url.scheme = base.scheme;
              url.path = arraySlice(base.path);
              url.query = base.query;
              url.fragment = '';
              url.cannotBeABaseURL = true;
              state = FRAGMENT;
              break;
            }
            state = base.scheme === 'file' ? FILE : RELATIVE;
            continue;

          case SPECIAL_RELATIVE_OR_AUTHORITY:
            if (chr === '/' && codePoints[pointer + 1] === '/') {
              state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
              pointer++;
            } else {
              state = RELATIVE;
              continue;
            } break;

          case PATH_OR_AUTHORITY:
            if (chr === '/') {
              state = AUTHORITY;
              break;
            } else {
              state = PATH;
              continue;
            }

          case RELATIVE:
            url.scheme = base.scheme;
            if (chr === EOF) {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = arraySlice(base.path);
              url.query = base.query;
            } else if (chr === '/' || (chr === '\\' && url.isSpecial())) {
              state = RELATIVE_SLASH;
            } else if (chr === '?') {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = arraySlice(base.path);
              url.query = '';
              state = QUERY;
            } else if (chr === '#') {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = arraySlice(base.path);
              url.query = base.query;
              url.fragment = '';
              state = FRAGMENT;
            } else {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = arraySlice(base.path);
              url.path.length--;
              state = PATH;
              continue;
            } break;

          case RELATIVE_SLASH:
            if (url.isSpecial() && (chr === '/' || chr === '\\')) {
              state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            } else if (chr === '/') {
              state = AUTHORITY;
            } else {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              state = PATH;
              continue;
            } break;

          case SPECIAL_AUTHORITY_SLASHES:
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            if (chr !== '/' || charAt$7(buffer, pointer + 1) !== '/') continue;
            pointer++;
            break;

          case SPECIAL_AUTHORITY_IGNORE_SLASHES:
            if (chr !== '/' && chr !== '\\') {
              state = AUTHORITY;
              continue;
            } break;

          case AUTHORITY:
            if (chr === '@') {
              if (seenAt) buffer = '%40' + buffer;
              seenAt = true;
              bufferCodePoints = arrayFrom(buffer);
              for (var i = 0; i < bufferCodePoints.length; i++) {
                var codePoint = bufferCodePoints[i];
                if (codePoint === ':' && !seenPasswordToken) {
                  seenPasswordToken = true;
                  continue;
                }
                var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
                if (seenPasswordToken) url.password += encodedCodePoints;
                else url.username += encodedCodePoints;
              }
              buffer = '';
            } else if (
              chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
              (chr === '\\' && url.isSpecial())
            ) {
              if (seenAt && buffer === '') return INVALID_AUTHORITY;
              pointer -= arrayFrom(buffer).length + 1;
              buffer = '';
              state = HOST;
            } else buffer += chr;
            break;

          case HOST:
          case HOSTNAME:
            if (stateOverride && url.scheme === 'file') {
              state = FILE_HOST;
              continue;
            } else if (chr === ':' && !seenBracket) {
              if (buffer === '') return INVALID_HOST;
              failure = url.parseHost(buffer);
              if (failure) return failure;
              buffer = '';
              state = PORT;
              if (stateOverride === HOSTNAME) return;
            } else if (
              chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
              (chr === '\\' && url.isSpecial())
            ) {
              if (url.isSpecial() && buffer === '') return INVALID_HOST;
              if (stateOverride && buffer === '' && (url.includesCredentials() || url.port !== null)) return;
              failure = url.parseHost(buffer);
              if (failure) return failure;
              buffer = '';
              state = PATH_START;
              if (stateOverride) return;
              continue;
            } else {
              if (chr === '[') seenBracket = true;
              else if (chr === ']') seenBracket = false;
              buffer += chr;
            } break;

          case PORT:
            if (exec$5(DIGIT, chr)) {
              buffer += chr;
            } else if (
              chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
              (chr === '\\' && url.isSpecial()) ||
              stateOverride
            ) {
              if (buffer !== '') {
                var port = parseInt$1(buffer, 10);
                if (port > 0xFFFF) return INVALID_PORT;
                url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
                buffer = '';
              }
              if (stateOverride) return;
              state = PATH_START;
              continue;
            } else return INVALID_PORT;
            break;

          case FILE:
            url.scheme = 'file';
            if (chr === '/' || chr === '\\') state = FILE_SLASH;
            else if (base && base.scheme === 'file') {
              switch (chr) {
                case EOF:
                  url.host = base.host;
                  url.path = arraySlice(base.path);
                  url.query = base.query;
                  break;
                case '?':
                  url.host = base.host;
                  url.path = arraySlice(base.path);
                  url.query = '';
                  state = QUERY;
                  break;
                case '#':
                  url.host = base.host;
                  url.path = arraySlice(base.path);
                  url.query = base.query;
                  url.fragment = '';
                  state = FRAGMENT;
                  break;
                default:
                  if (!startsWithWindowsDriveLetter(join$5(arraySlice(codePoints, pointer), ''))) {
                    url.host = base.host;
                    url.path = arraySlice(base.path);
                    url.shortenPath();
                  }
                  state = PATH;
                  continue;
              }
            } else {
              state = PATH;
              continue;
            } break;

          case FILE_SLASH:
            if (chr === '/' || chr === '\\') {
              state = FILE_HOST;
              break;
            }
            if (base && base.scheme === 'file' && !startsWithWindowsDriveLetter(join$5(arraySlice(codePoints, pointer), ''))) {
              if (isWindowsDriveLetter(base.path[0], true)) push$9(url.path, base.path[0]);
              else url.host = base.host;
            }
            state = PATH;
            continue;

          case FILE_HOST:
            if (chr === EOF || chr === '/' || chr === '\\' || chr === '?' || chr === '#') {
              if (!stateOverride && isWindowsDriveLetter(buffer)) {
                state = PATH;
              } else if (buffer === '') {
                url.host = '';
                if (stateOverride) return;
                state = PATH_START;
              } else {
                failure = url.parseHost(buffer);
                if (failure) return failure;
                if (url.host === 'localhost') url.host = '';
                if (stateOverride) return;
                buffer = '';
                state = PATH_START;
              } continue;
            } else buffer += chr;
            break;

          case PATH_START:
            if (url.isSpecial()) {
              state = PATH;
              if (chr !== '/' && chr !== '\\') continue;
            } else if (!stateOverride && chr === '?') {
              url.query = '';
              state = QUERY;
            } else if (!stateOverride && chr === '#') {
              url.fragment = '';
              state = FRAGMENT;
            } else if (chr !== EOF) {
              state = PATH;
              if (chr !== '/') continue;
            } break;

          case PATH:
            if (
              chr === EOF || chr === '/' ||
              (chr === '\\' && url.isSpecial()) ||
              (!stateOverride && (chr === '?' || chr === '#'))
            ) {
              if (isDoubleDot(buffer)) {
                url.shortenPath();
                if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
                  push$9(url.path, '');
                }
              } else if (isSingleDot(buffer)) {
                if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
                  push$9(url.path, '');
                }
              } else {
                if (url.scheme === 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                  if (url.host) url.host = '';
                  buffer = charAt$7(buffer, 0) + ':'; // normalize windows drive letter
                }
                push$9(url.path, buffer);
              }
              buffer = '';
              if (url.scheme === 'file' && (chr === EOF || chr === '?' || chr === '#')) {
                while (url.path.length > 1 && url.path[0] === '') {
                  shift$1(url.path);
                }
              }
              if (chr === '?') {
                url.query = '';
                state = QUERY;
              } else if (chr === '#') {
                url.fragment = '';
                state = FRAGMENT;
              }
            } else {
              buffer += percentEncode(chr, pathPercentEncodeSet);
            } break;

          case CANNOT_BE_A_BASE_URL_PATH:
            if (chr === '?') {
              url.query = '';
              state = QUERY;
            } else if (chr === '#') {
              url.fragment = '';
              state = FRAGMENT;
            } else if (chr !== EOF) {
              url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
            } break;

          case QUERY:
            if (!stateOverride && chr === '#') {
              url.fragment = '';
              state = FRAGMENT;
            } else if (chr !== EOF) {
              if (chr === "'" && url.isSpecial()) url.query += '%27';
              else if (chr === '#') url.query += '%23';
              else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
            } break;

          case FRAGMENT:
            if (chr !== EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
            break;
        }

        pointer++;
      }
    },
    // https://url.spec.whatwg.org/#host-parsing
    parseHost: function (input) {
      var result, codePoints, index;
      if (charAt$7(input, 0) === '[') {
        if (charAt$7(input, input.length - 1) !== ']') return INVALID_HOST;
        result = parseIPv6(stringSlice$7(input, 1, -1));
        if (!result) return INVALID_HOST;
        this.host = result;
      // opaque host
      } else if (!this.isSpecial()) {
        if (exec$5(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
        result = '';
        codePoints = arrayFrom(input);
        for (index = 0; index < codePoints.length; index++) {
          result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
        }
        this.host = result;
      } else {
        input = stringPunycodeToAscii(input);
        if (exec$5(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
        result = parseIPv4(input);
        if (result === null) return INVALID_HOST;
        this.host = result;
      }
    },
    // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
    cannotHaveUsernamePasswordPort: function () {
      return !this.host || this.cannotBeABaseURL || this.scheme === 'file';
    },
    // https://url.spec.whatwg.org/#include-credentials
    includesCredentials: function () {
      return this.username !== '' || this.password !== '';
    },
    // https://url.spec.whatwg.org/#is-special
    isSpecial: function () {
      return hasOwnProperty_1(specialSchemes, this.scheme);
    },
    // https://url.spec.whatwg.org/#shorten-a-urls-path
    shortenPath: function () {
      var path = this.path;
      var pathSize = path.length;
      if (pathSize && (this.scheme !== 'file' || pathSize !== 1 || !isWindowsDriveLetter(path[0], true))) {
        path.length--;
      }
    },
    // https://url.spec.whatwg.org/#concept-url-serializer
    serialize: function () {
      var url = this;
      var scheme = url.scheme;
      var username = url.username;
      var password = url.password;
      var host = url.host;
      var port = url.port;
      var path = url.path;
      var query = url.query;
      var fragment = url.fragment;
      var output = scheme + ':';
      if (host !== null) {
        output += '//';
        if (url.includesCredentials()) {
          output += username + (password ? ':' + password : '') + '@';
        }
        output += serializeHost(host);
        if (port !== null) output += ':' + port;
      } else if (scheme === 'file') output += '//';
      output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join$5(path, '/') : '';
      if (query !== null) output += '?' + query;
      if (fragment !== null) output += '#' + fragment;
      return output;
    },
    // https://url.spec.whatwg.org/#dom-url-href
    setHref: function (href) {
      var failure = this.parse(href);
      if (failure) throw new TypeError$6(failure);
      this.searchParams.update();
    },
    // https://url.spec.whatwg.org/#dom-url-origin
    getOrigin: function () {
      var scheme = this.scheme;
      var port = this.port;
      if (scheme === 'blob') try {
        return new URLConstructor(scheme.path[0]).origin;
      } catch (error) {
        return 'null';
      }
      if (scheme === 'file' || !this.isSpecial()) return 'null';
      return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
    },
    // https://url.spec.whatwg.org/#dom-url-protocol
    getProtocol: function () {
      return this.scheme + ':';
    },
    setProtocol: function (protocol) {
      this.parse(toString_1(protocol) + ':', SCHEME_START);
    },
    // https://url.spec.whatwg.org/#dom-url-username
    getUsername: function () {
      return this.username;
    },
    setUsername: function (username) {
      var codePoints = arrayFrom(toString_1(username));
      if (this.cannotHaveUsernamePasswordPort()) return;
      this.username = '';
      for (var i = 0; i < codePoints.length; i++) {
        this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    },
    // https://url.spec.whatwg.org/#dom-url-password
    getPassword: function () {
      return this.password;
    },
    setPassword: function (password) {
      var codePoints = arrayFrom(toString_1(password));
      if (this.cannotHaveUsernamePasswordPort()) return;
      this.password = '';
      for (var i = 0; i < codePoints.length; i++) {
        this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    },
    // https://url.spec.whatwg.org/#dom-url-host
    getHost: function () {
      var host = this.host;
      var port = this.port;
      return host === null ? ''
        : port === null ? serializeHost(host)
        : serializeHost(host) + ':' + port;
    },
    setHost: function (host) {
      if (this.cannotBeABaseURL) return;
      this.parse(host, HOST);
    },
    // https://url.spec.whatwg.org/#dom-url-hostname
    getHostname: function () {
      var host = this.host;
      return host === null ? '' : serializeHost(host);
    },
    setHostname: function (hostname) {
      if (this.cannotBeABaseURL) return;
      this.parse(hostname, HOSTNAME);
    },
    // https://url.spec.whatwg.org/#dom-url-port
    getPort: function () {
      var port = this.port;
      return port === null ? '' : toString_1(port);
    },
    setPort: function (port) {
      if (this.cannotHaveUsernamePasswordPort()) return;
      port = toString_1(port);
      if (port === '') this.port = null;
      else this.parse(port, PORT);
    },
    // https://url.spec.whatwg.org/#dom-url-pathname
    getPathname: function () {
      var path = this.path;
      return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join$5(path, '/') : '';
    },
    setPathname: function (pathname) {
      if (this.cannotBeABaseURL) return;
      this.path = [];
      this.parse(pathname, PATH_START);
    },
    // https://url.spec.whatwg.org/#dom-url-search
    getSearch: function () {
      var query = this.query;
      return query ? '?' + query : '';
    },
    setSearch: function (search) {
      search = toString_1(search);
      if (search === '') {
        this.query = null;
      } else {
        if (charAt$7(search, 0) === '?') search = stringSlice$7(search, 1);
        this.query = '';
        this.parse(search, QUERY);
      }
      this.searchParams.update();
    },
    // https://url.spec.whatwg.org/#dom-url-searchparams
    getSearchParams: function () {
      return this.searchParams.facade;
    },
    // https://url.spec.whatwg.org/#dom-url-hash
    getHash: function () {
      var fragment = this.fragment;
      return fragment ? '#' + fragment : '';
    },
    setHash: function (hash) {
      hash = toString_1(hash);
      if (hash === '') {
        this.fragment = null;
        return;
      }
      if (charAt$7(hash, 0) === '#') hash = stringSlice$7(hash, 1);
      this.fragment = '';
      this.parse(hash, FRAGMENT);
    },
    update: function () {
      this.query = this.searchParams.serialize() || null;
    }
  };

  // `URL` constructor
  // https://url.spec.whatwg.org/#url-class
  var URLConstructor = function URL(url /* , base */) {
    var that = anInstance(this, URLPrototype);
    var base = validateArgumentsLength(arguments.length, 1) > 1 ? arguments[1] : undefined;
    var state = setInternalState$8(that, new URLState(url, false, base));
    if (!descriptors) {
      that.href = state.serialize();
      that.origin = state.getOrigin();
      that.protocol = state.getProtocol();
      that.username = state.getUsername();
      that.password = state.getPassword();
      that.host = state.getHost();
      that.hostname = state.getHostname();
      that.port = state.getPort();
      that.pathname = state.getPathname();
      that.search = state.getSearch();
      that.searchParams = state.getSearchParams();
      that.hash = state.getHash();
    }
  };

  var URLPrototype = URLConstructor.prototype;

  var accessorDescriptor = function (getter, setter) {
    return {
      get: function () {
        return getInternalURLState(this)[getter]();
      },
      set: setter && function (value) {
        return getInternalURLState(this)[setter](value);
      },
      configurable: true,
      enumerable: true
    };
  };

  if (descriptors) {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    defineBuiltInAccessor(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'));
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    defineBuiltInAccessor(URLPrototype, 'origin', accessorDescriptor('getOrigin'));
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    defineBuiltInAccessor(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'));
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    defineBuiltInAccessor(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'));
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    defineBuiltInAccessor(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'));
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    defineBuiltInAccessor(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'));
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    defineBuiltInAccessor(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'));
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    defineBuiltInAccessor(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'));
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    defineBuiltInAccessor(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'));
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    defineBuiltInAccessor(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'));
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    defineBuiltInAccessor(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'));
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    defineBuiltInAccessor(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'));
  }

  // `URL.prototype.toJSON` method
  // https://url.spec.whatwg.org/#dom-url-tojson
  defineBuiltIn(URLPrototype, 'toJSON', function toJSON() {
    return getInternalURLState(this).serialize();
  }, { enumerable: true });

  // `URL.prototype.toString` method
  // https://url.spec.whatwg.org/#URL-stringification-behavior
  defineBuiltIn(URLPrototype, 'toString', function toString() {
    return getInternalURLState(this).serialize();
  }, { enumerable: true });

  if (NativeURL) {
    var nativeCreateObjectURL = NativeURL.createObjectURL;
    var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
    // `URL.createObjectURL` method
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    if (nativeCreateObjectURL) defineBuiltIn(URLConstructor, 'createObjectURL', functionBindContext(nativeCreateObjectURL, NativeURL));
    // `URL.revokeObjectURL` method
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
    if (nativeRevokeObjectURL) defineBuiltIn(URLConstructor, 'revokeObjectURL', functionBindContext(nativeRevokeObjectURL, NativeURL));
  }

  setToStringTag(URLConstructor, 'URL');

  _export({ global: true, constructor: true, forced: !urlConstructorDetection, sham: !descriptors }, {
    URL: URLConstructor
  });

  // `URL.prototype.toJSON` method
  // https://url.spec.whatwg.org/#dom-url-tojson
  _export({ target: 'URL', proto: true, enumerable: true }, {
    toJSON: function toJSON() {
      return functionCall(URL.prototype.toString, this);
    }
  });

  var getOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;

  // eslint-disable-next-line es/no-object-getownpropertynames -- required for testing
  var FAILS_ON_PRIMITIVES$2 = fails(function () { return !Object.getOwnPropertyNames(1); });

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$2 }, {
    getOwnPropertyNames: getOwnPropertyNames$1
  });

  var floor$7 = Math.floor;
  var charAt$8 = functionUncurryThis(''.charAt);
  var replace$a = functionUncurryThis(''.replace);
  var stringSlice$8 = functionUncurryThis(''.slice);
  // eslint-disable-next-line redos/no-vulnerable -- safe
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace$a(replacement, symbols, function (match, ch) {
      var capture;
      switch (charAt$8(ch, 0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return stringSlice$8(str, 0, position);
        case "'": return stringSlice$8(str, tailPos);
        case '<':
          capture = namedCaptures[stringSlice$8(ch, 1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor$7(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? charAt$8(ch, 1) : captures[f - 1] + charAt$8(ch, 1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var REPLACE = wellKnownSymbol('replace');
  var max$3 = Math.max;
  var min$6 = Math.min;
  var concat$3 = functionUncurryThis([].concat);
  var push$a = functionUncurryThis([].push);
  var stringIndexOf$1 = functionUncurryThis(''.indexOf);
  var stringSlice$9 = functionUncurryThis(''.slice);

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  })();

  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
    return ''.replace(re, '$<a>') !== '7';
  });

  // @@replace logic
  fixRegexpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible(this);
        var replacer = isObject(searchValue) ? getMethod(searchValue, REPLACE) : undefined;
        return replacer
          ? functionCall(replacer, searchValue, O, replaceValue)
          : functionCall(nativeReplace, toString_1(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject(this);
        var S = toString_1(string);

        if (
          typeof replaceValue == 'string' &&
          stringIndexOf$1(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
          stringIndexOf$1(replaceValue, '$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
          if (res.done) return res.value;
        }

        var functionalReplace = isCallable(replaceValue);
        if (!functionalReplace) replaceValue = toString_1(replaceValue);

        var global = rx.global;
        var fullUnicode;
        if (global) {
          fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }

        var results = [];
        var result;
        while (true) {
          result = regexpExecAbstract(rx, S);
          if (result === null) break;

          push$a(results, result);
          if (!global) break;

          var matchStr = toString_1(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = toString_1(result[0]);
          var position = max$3(min$6(toIntegerOrInfinity(result.index), S.length), 0);
          var captures = [];
          var replacement;
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) push$a(captures, maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = concat$3([matched], captures, position, S);
            if (namedCaptures !== undefined) push$a(replacerArgs, namedCaptures);
            replacement = toString_1(functionApply(replaceValue, undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += stringSlice$9(S, nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }

        return accumulatedResult + stringSlice$9(S, nextSourcePosition);
      }
    ];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  // `Uint8Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects
  typedArrayConstructor('Uint8', function (init) {
    return function Uint8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  /* eslint-disable no-prototype-builtins */
  var g = typeof globalThis !== 'undefined' && globalThis || typeof self !== 'undefined' && self ||
  // eslint-disable-next-line no-undef
  typeof global !== 'undefined' && global || {};
  var support = {
    searchParams: 'URLSearchParams' in g,
    iterable: 'Symbol' in g && 'iterator' in Symbol,
    blob: 'FileReader' in g && 'Blob' in g && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in g,
    arrayBuffer: 'ArrayBuffer' in g
  };
  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj);
  }
  if (support.arrayBuffer) {
    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];
    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }
  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
      throw new TypeError('Invalid character in header field name: "' + name + '"');
    }
    return name.toLowerCase();
  }
  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function () {
        var value = items.shift();
        return {
          done: value === undefined,
          value: value
        };
      }
    };
    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }
    return iterator;
  }
  function Headers$1(headers) {
    this.map = {};
    if (headers instanceof Headers$1) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function (header) {
        if (header.length != 2) {
          throw new TypeError('Headers constructor: expected name/value pair to be length 2, found' + header.length);
        }
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }
  Headers$1.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };
  Headers$1.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };
  Headers$1.prototype.get = function (name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  };
  Headers$1.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };
  Headers$1.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };
  Headers$1.prototype.forEach = function (callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };
  Headers$1.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };
  Headers$1.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };
  Headers$1.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };
  if (support.iterable) {
    Headers$1.prototype[Symbol.iterator] = Headers$1.prototype.entries;
  }
  function consumed(body) {
    if (body._noBody) return;
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }
  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }
  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }
  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
    var encoding = match ? match[1] : 'utf-8';
    reader.readAsText(blob, encoding);
    return promise;
  }
  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);
    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('');
  }
  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }
  function Body() {
    this.bodyUsed = false;
    this._initBody = function (body) {
      /*
        fetch-mock wraps the Response object in an ES6 Proxy to
        provide useful test harness features such as flush. However, on
        ES5 browsers without fetch or Proxy support pollyfills must be used;
        the proxy-pollyfill is unable to proxy an attribute unless it exists
        on the object before the Proxy is created. This change ensures
        Response.bodyUsed exists on the instance, while maintaining the
        semantic of setting Request.bodyUsed in the constructor before
        _initBody is called.
      */
      // eslint-disable-next-line no-self-assign
      this.bodyUsed = this.bodyUsed;
      this._bodyInit = body;
      if (!body) {
        this._noBody = true;
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }
      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };
    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }
        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };
    }
    this.arrayBuffer = function () {
      if (this._bodyArrayBuffer) {
        var isConsumed = consumed(this);
        if (isConsumed) {
          return isConsumed;
        } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
          return Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength));
        } else {
          return Promise.resolve(this._bodyArrayBuffer);
        }
      } else if (support.blob) {
        return this.blob().then(readBlobAsArrayBuffer);
      } else {
        throw new Error('could not read as ArrayBuffer');
      }
    };
    this.text = function () {
      var rejected = consumed(this);
      if (rejected) {
        return rejected;
      }
      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };
    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode$1);
      };
    }
    this.json = function () {
      return this.text().then(JSON.parse);
    };
    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE'];
  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }
  function Request(input, options) {
    if (!(this instanceof Request)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
    }
    options = options || {};
    var body = options.body;
    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers$1(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }
    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers$1(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal || function () {
      if ('AbortController' in g) {
        var ctrl = new AbortController();
        return ctrl.signal;
      }
    }();
    this.referrer = null;
    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);
    if (this.method === 'GET' || this.method === 'HEAD') {
      if (options.cache === 'no-store' || options.cache === 'no-cache') {
        // Search for a '_' parameter in the query string
        var reParamSearch = /([?&])_=[^&]*/;
        if (reParamSearch.test(this.url)) {
          // If it already exists then set the value with the current time
          this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
        } else {
          // Otherwise add a new '_' parameter to the end with the current time

          this.url += (/\?/.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
        }
      }
    }
  }
  Request.prototype.clone = function () {
    return new Request(this, {
      body: this._bodyInit
    });
  };
  function decode$1(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }
  function parseHeaders(rawHeaders) {
    var headers = new Headers$1();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
    // https://github.com/github/fetch/issues/748
    // https://github.com/zloirock/core-js/issues/751
    preProcessedHeaders.split('\r').map(function (header) {
      return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header;
    }).forEach(function (line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        try {
          headers.append(key, value);
        } catch (error) {
          console.warn('Response ' + error.message);
        }
      }
    });
    return headers;
  }
  Body.call(Request.prototype);
  function Response(bodyInit, options) {
    if (!(this instanceof Response)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
    }
    if (!options) {
      options = {};
    }
    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    if (this.status < 200 || this.status > 599) {
      throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
    }
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText === undefined ? '' : '' + options.statusText;
    this.headers = new Headers$1(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }
  Body.call(Response.prototype);
  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers$1(this.headers),
      url: this.url
    });
  };
  Response.error = function () {
    var response = new Response(null, {
      status: 200,
      statusText: ''
    });
    response.ok = false;
    response.status = 0;
    response.type = 'error';
    return response;
  };
  var redirectStatuses = [301, 302, 303, 307, 308];
  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }
    return new Response(null, {
      status: status,
      headers: {
        location: url
      }
    });
  };
  var DOMException = g.DOMException;
  try {
    new DOMException();
  } catch (err) {
    DOMException = function (message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    DOMException.prototype = Object.create(Error.prototype);
    DOMException.prototype.constructor = DOMException;
  }
  function fetch$1(input, init) {
    return new Promise(function (resolve, reject) {
      var request = new Request(input, init);
      if (request.signal && request.signal.aborted) {
        return reject(new DOMException('Aborted', 'AbortError'));
      }
      var xhr = new XMLHttpRequest();
      function abortXhr() {
        xhr.abort();
      }
      xhr.onload = function () {
        var options = {
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        // This check if specifically for when a user fetches a file locally from the file system
        // Only if the status is out of a normal range
        if (request.url.indexOf('file://') === 0 && (xhr.status < 200 || xhr.status > 599)) {
          options.status = 200;
        } else {
          options.status = xhr.status;
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        setTimeout(function () {
          resolve(new Response(body, options));
        }, 0);
      };
      xhr.onerror = function () {
        setTimeout(function () {
          reject(new TypeError('Network request failed'));
        }, 0);
      };
      xhr.ontimeout = function () {
        setTimeout(function () {
          reject(new TypeError('Network request timed out'));
        }, 0);
      };
      xhr.onabort = function () {
        setTimeout(function () {
          reject(new DOMException('Aborted', 'AbortError'));
        }, 0);
      };
      xhr.open(request.method, function (url) {
        try {
          return url === '' && g.location.href ? g.location.href : url;
        } catch (e) {
          return url;
        }
      }(request.url), true);
      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }
      if ('responseType' in xhr) {
        if (support.blob) {
          xhr.responseType = 'blob';
        } else if (support.arrayBuffer) {
          xhr.responseType = 'arraybuffer';
        }
      }
      if (init && _typeof(init.headers) === 'object' && !(init.headers instanceof Headers$1 || g.Headers && init.headers instanceof g.Headers)) {
        var names = [];
        Object.getOwnPropertyNames(init.headers).forEach(function (name) {
          names.push(normalizeName(name));
          xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
        });
        request.headers.forEach(function (value, name) {
          if (names.indexOf(name) === -1) {
            xhr.setRequestHeader(name, value);
          }
        });
      } else {
        request.headers.forEach(function (value, name) {
          xhr.setRequestHeader(name, value);
        });
      }
      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);
        xhr.onreadystatechange = function () {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }
      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  }
  fetch$1.polyfill = true;
  if (!g.fetch) {
    g.fetch = fetch$1;
    g.Headers = Headers$1;
    g.Request = Request;
    g.Response = Response;
  }

  var $includes$1 = arrayIncludes.includes;



  // FF99+ bug
  var BROKEN_ON_SPARSE = fails(function () {
    // eslint-disable-next-line es/no-array-prototype-includes -- detection
    return !Array(1).includes();
  });

  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  _export({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes$1(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('includes');

  var stringIndexOf$2 = functionUncurryThis(''.indexOf);

  // `String.prototype.includes` method
  // https://tc39.es/ecma262/#sec-string.prototype.includes
  _export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~stringIndexOf$2(
        toString_1(requireObjectCoercible(this)),
        toString_1(notARegexp(searchString)),
        arguments.length > 1 ? arguments[1] : undefined
      );
    }
  });

  // `String.prototype.link` method
  // https://tc39.es/ecma262/#sec-string.prototype.link
  _export({ target: 'String', proto: true, forced: stringHtmlForced('link') }, {
    link: function link(url) {
      return createHtml(this, 'a', 'href', url);
    }
  });

  var UNSUPPORTED_Y$3 = regexpStickyHelpers.UNSUPPORTED_Y;
  var MAX_UINT32 = 0xFFFFFFFF;
  var min$7 = Math.min;
  var push$b = functionUncurryThis([].push);
  var stringSlice$a = functionUncurryThis(''.slice);

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  var BUGGY = 'abbc'.split(/(b)*/)[1] === 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length !== 4 ||
    'ab'.split(/(?:ab)*/).length !== 2 ||
    '.'.split(/(.?)(.?)/).length !== 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length;

  // @@split logic
  fixRegexpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit = '0'.split(undefined, 0).length ? function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : functionCall(nativeSplit, this, separator, limit);
    } : nativeSplit;

    return [
      // `String.prototype.split` method
      // https://tc39.es/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible(this);
        var splitter = isObject(separator) ? getMethod(separator, SPLIT) : undefined;
        return splitter
          ? functionCall(splitter, separator, O, limit)
          : functionCall(internalSplit, toString_1(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (string, limit) {
        var rx = anObject(this);
        var S = toString_1(string);

        if (!BUGGY) {
          var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);
          if (res.done) return res.value;
        }

        var C = speciesConstructor(rx, RegExp);
        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (UNSUPPORTED_Y$3 ? 'g' : 'y');
        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(UNSUPPORTED_Y$3 ? '^(?:' + rx.source + ')' : rx, flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = UNSUPPORTED_Y$3 ? 0 : q;
          var z = regexpExecAbstract(splitter, UNSUPPORTED_Y$3 ? stringSlice$a(S, q) : S);
          var e;
          if (
            z === null ||
            (e = min$7(toLength(splitter.lastIndex + (UNSUPPORTED_Y$3 ? q : 0)), S.length)) === p
          ) {
            q = advanceStringIndex(S, q, unicodeMatching);
          } else {
            push$b(A, stringSlice$a(S, p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              push$b(A, z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        push$b(A, stringSlice$a(S, p));
        return A;
      }
    ];
  }, BUGGY || !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y$3);

  var $trimEnd = stringTrim.end;


  // `String.prototype.{ trimEnd, trimRight }` method
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  // https://tc39.es/ecma262/#String.prototype.trimright
  var stringTrimEnd = stringTrimForced('trimEnd') ? function trimEnd() {
    return $trimEnd(this);
  // eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
  } : ''.trimEnd;

  // `String.prototype.trimRight` method
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  // eslint-disable-next-line es/no-string-prototype-trimleft-trimright -- safe
  _export({ target: 'String', proto: true, name: 'trimEnd', forced: ''.trimRight !== stringTrimEnd }, {
    trimRight: stringTrimEnd
  });

  // TODO: Remove this line from `core-js@4`




  // `String.prototype.trimEnd` method
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  // eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
  _export({ target: 'String', proto: true, name: 'trimEnd', forced: ''.trimEnd !== stringTrimEnd }, {
    trimEnd: stringTrimEnd
  });

  var defaults = createCommonjsModule(function (module) {
    function getDefaults() {
      return {
        baseUrl: null,
        breaks: false,
        gfm: true,
        headerIds: true,
        headerPrefix: '',
        highlight: null,
        langPrefix: 'language-',
        mangle: true,
        pedantic: false,
        renderer: null,
        sanitize: false,
        sanitizer: null,
        silent: false,
        smartLists: false,
        smartypants: false,
        tokenizer: null,
        walkTokens: null,
        xhtml: false
      };
    }
    module.exports = {
      defaults: getDefaults(),
      getDefaults: getDefaults,
      changeDefaults: function (newDefaults) {
        module.exports.defaults = newDefaults;
      }
    };
  });
  var defaults_1 = defaults.defaults;
  var defaults_2 = defaults.getDefaults;
  var defaults_3 = defaults.changeDefaults;

  /**
   * Helpers
   */
  var escapeTest = /[&<>"']/;
  var escapeReplace = /[&<>"']/g;
  var escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
  var escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
  var escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  var getEscapeReplacement = function (ch) {
    return escapeReplacements[ch];
  };
  function escape(html, encode) {
    if (encode) {
      if (escapeTest.test(html)) {
        return html.replace(escapeReplace, getEscapeReplacement);
      }
    } else {
      if (escapeTestNoEncode.test(html)) {
        return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
      }
    }
    return html;
  }
  var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
  function unescape(html) {
    // explicitly match decimal, hex, and named HTML entities
    return html.replace(unescapeTest, function (_, n) {
      n = n.toLowerCase();
      if (n === 'colon') return ':';
      if (n.charAt(0) === '#') {
        return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
      }
      return '';
    });
  }
  var caret = /(^|[^\[])\^/g;
  function edit(regex, opt) {
    regex = regex.source || regex;
    opt = opt || '';
    var obj = {
      replace: function (name, val) {
        val = val.source || val;
        val = val.replace(caret, '$1');
        regex = regex.replace(name, val);
        return obj;
      },
      getRegex: function () {
        return new RegExp(regex, opt);
      }
    };
    return obj;
  }
  var nonWordAndColonTest = /[^\w:]/g;
  var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
  function cleanUrl(sanitize, base, href) {
    if (sanitize) {
      var prot;
      try {
        prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, '').toLowerCase();
      } catch (e) {
        return null;
      }
      if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
        return null;
      }
    }
    if (base && !originIndependentUrl.test(href)) {
      href = resolveUrl(base, href);
    }
    try {
      href = encodeURI(href).replace(/%25/g, '%');
    } catch (e) {
      return null;
    }
    return href;
  }
  var baseUrls = {};
  var justDomain = /^[^:]+:\/*[^/]*$/;
  var protocol = /^([^:]+:)[\s\S]*$/;
  var domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
  function resolveUrl(base, href) {
    if (!baseUrls[' ' + base]) {
      // we can ignore everything in base after the last slash of its path component,
      // but we might need to add _that_
      // https://tools.ietf.org/html/rfc3986#section-3
      if (justDomain.test(base)) {
        baseUrls[' ' + base] = base + '/';
      } else {
        baseUrls[' ' + base] = rtrim$1(base, '/', true);
      }
    }
    base = baseUrls[' ' + base];
    var relativeBase = base.indexOf(':') === -1;
    if (href.substring(0, 2) === '//') {
      if (relativeBase) {
        return href;
      }
      return base.replace(protocol, '$1') + href;
    } else if (href.charAt(0) === '/') {
      if (relativeBase) {
        return href;
      }
      return base.replace(domain, '$1') + href;
    } else {
      return base + href;
    }
  }
  var noopTest = {
    exec: function () {}
  };
  function merge(obj) {
    var i = 1,
      target,
      key;
    for (; i < arguments.length; i++) {
      target = arguments[i];
      for (key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          obj[key] = target[key];
        }
      }
    }
    return obj;
  }
  function splitCells(tableRow, count) {
    // ensure that every cell-delimiting pipe has a space
    // before it to distinguish it from an escaped pipe
    var row = tableRow.replace(/\|/g, function (match, offset, str) {
        var escaped = false,
          curr = offset;
        while (--curr >= 0 && str[curr] === '\\') escaped = !escaped;
        if (escaped) {
          // odd number of slashes means | is escaped
          // so we leave it alone
          return '|';
        } else {
          // add space before unescaped |
          return ' |';
        }
      }),
      cells = row.split(/ \|/);
    var i = 0;
    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count) cells.push('');
    }
    for (; i < cells.length; i++) {
      // leading or trailing whitespace is ignored per the gfm spec
      cells[i] = cells[i].trim().replace(/\\\|/g, '|');
    }
    return cells;
  }

  // Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
  // /c*$/ is vulnerable to REDOS.
  // invert: Remove suffix of non-c chars instead. Default falsey.
  function rtrim$1(str, c, invert) {
    var l = str.length;
    if (l === 0) {
      return '';
    }

    // Length of suffix matching the invert condition.
    var suffLen = 0;

    // Step left until we fail to match the invert condition.
    while (suffLen < l) {
      var currChar = str.charAt(l - suffLen - 1);
      if (currChar === c && !invert) {
        suffLen++;
      } else if (currChar !== c && invert) {
        suffLen++;
      } else {
        break;
      }
    }
    return str.substr(0, l - suffLen);
  }
  function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
      return -1;
    }
    var l = str.length;
    var level = 0,
      i = 0;
    for (; i < l; i++) {
      if (str[i] === '\\') {
        i++;
      } else if (str[i] === b[0]) {
        level++;
      } else if (str[i] === b[1]) {
        level--;
        if (level < 0) {
          return i;
        }
      }
    }
    return -1;
  }
  function checkSanitizeDeprecation(opt) {
    if (opt && opt.sanitize && !opt.silent) {
      console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
    }
  }

  // copied from https://stackoverflow.com/a/5450113/806777
  function repeatString(pattern, count) {
    if (count < 1) {
      return '';
    }
    var result = '';
    while (count > 1) {
      if (count & 1) {
        result += pattern;
      }
      count >>= 1;
      pattern += pattern;
    }
    return result + pattern;
  }
  var helpers = {
    escape: escape,
    unescape: unescape,
    edit: edit,
    cleanUrl: cleanUrl,
    resolveUrl: resolveUrl,
    noopTest: noopTest,
    merge: merge,
    splitCells: splitCells,
    rtrim: rtrim$1,
    findClosingBracket: findClosingBracket,
    checkSanitizeDeprecation: checkSanitizeDeprecation,
    repeatString: repeatString
  };

  var defaults$1 = defaults.defaults;
  var rtrim$2 = helpers.rtrim,
    splitCells$1 = helpers.splitCells,
    _escape = helpers.escape,
    findClosingBracket$1 = helpers.findClosingBracket;
  function outputLink(cap, link, raw) {
    var href = link.href;
    var title = link.title ? _escape(link.title) : null;
    var text = cap[1].replace(/\\([\[\]])/g, '$1');
    if (cap[0].charAt(0) !== '!') {
      return {
        type: 'link',
        raw: raw,
        href: href,
        title: title,
        text: text
      };
    } else {
      return {
        type: 'image',
        raw: raw,
        href: href,
        title: title,
        text: _escape(text)
      };
    }
  }
  function indentCodeCompensation(raw, text) {
    var matchIndentToCode = raw.match(/^(\s+)(?:```)/);
    if (matchIndentToCode === null) {
      return text;
    }
    var indentToCode = matchIndentToCode[1];
    return text.split('\n').map(function (node) {
      var matchIndentInNode = node.match(/^\s+/);
      if (matchIndentInNode === null) {
        return node;
      }
      var _matchIndentInNode = _slicedToArray(matchIndentInNode, 1),
        indentInNode = _matchIndentInNode[0];
      if (indentInNode.length >= indentToCode.length) {
        return node.slice(indentToCode.length);
      }
      return node;
    }).join('\n');
  }

  /**
   * Tokenizer
   */
  var Tokenizer_1 = /*#__PURE__*/function () {
    function Tokenizer(options) {
      _classCallCheck(this, Tokenizer);
      this.options = options || defaults$1;
    }
    return _createClass(Tokenizer, [{
      key: "space",
      value: function (src) {
        var cap = this.rules.block.newline.exec(src);
        if (cap) {
          if (cap[0].length > 1) {
            return {
              type: 'space',
              raw: cap[0]
            };
          }
          return {
            raw: '\n'
          };
        }
      }
    }, {
      key: "code",
      value: function (src, tokens) {
        var cap = this.rules.block.code.exec(src);
        if (cap) {
          var lastToken = tokens[tokens.length - 1];
          // An indented code block cannot interrupt a paragraph.
          if (lastToken && lastToken.type === 'paragraph') {
            return {
              raw: cap[0],
              text: cap[0].trimRight()
            };
          }
          var text = cap[0].replace(/^ {1,4}/gm, '');
          return {
            type: 'code',
            raw: cap[0],
            codeBlockStyle: 'indented',
            text: !this.options.pedantic ? rtrim$2(text, '\n') : text
          };
        }
      }
    }, {
      key: "fences",
      value: function (src) {
        var cap = this.rules.block.fences.exec(src);
        if (cap) {
          var raw = cap[0];
          var text = indentCodeCompensation(raw, cap[3] || '');
          return {
            type: 'code',
            raw: raw,
            lang: cap[2] ? cap[2].trim() : cap[2],
            text: text
          };
        }
      }
    }, {
      key: "heading",
      value: function (src) {
        var cap = this.rules.block.heading.exec(src);
        if (cap) {
          var text = cap[2].trim();

          // remove trailing #s
          if (/#$/.test(text)) {
            var trimmed = rtrim$2(text, '#');
            if (this.options.pedantic) {
              text = trimmed.trim();
            } else if (!trimmed || / $/.test(trimmed)) {
              // CommonMark requires space before trailing #s
              text = trimmed.trim();
            }
          }
          return {
            type: 'heading',
            raw: cap[0],
            depth: cap[1].length,
            text: text
          };
        }
      }
    }, {
      key: "nptable",
      value: function (src) {
        var cap = this.rules.block.nptable.exec(src);
        if (cap) {
          var item = {
            type: 'table',
            header: splitCells$1(cap[1].replace(/^ *| *\| *$/g, '')),
            align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
            cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : [],
            raw: cap[0]
          };
          if (item.header.length === item.align.length) {
            var l = item.align.length;
            var i;
            for (i = 0; i < l; i++) {
              if (/^ *-+: *$/.test(item.align[i])) {
                item.align[i] = 'right';
              } else if (/^ *:-+: *$/.test(item.align[i])) {
                item.align[i] = 'center';
              } else if (/^ *:-+ *$/.test(item.align[i])) {
                item.align[i] = 'left';
              } else {
                item.align[i] = null;
              }
            }
            l = item.cells.length;
            for (i = 0; i < l; i++) {
              item.cells[i] = splitCells$1(item.cells[i], item.header.length);
            }
            return item;
          }
        }
      }
    }, {
      key: "hr",
      value: function (src) {
        var cap = this.rules.block.hr.exec(src);
        if (cap) {
          return {
            type: 'hr',
            raw: cap[0]
          };
        }
      }
    }, {
      key: "blockquote",
      value: function (src) {
        var cap = this.rules.block.blockquote.exec(src);
        if (cap) {
          var text = cap[0].replace(/^ *> ?/gm, '');
          return {
            type: 'blockquote',
            raw: cap[0],
            text: text
          };
        }
      }
    }, {
      key: "list",
      value: function (src) {
        var cap = this.rules.block.list.exec(src);
        if (cap) {
          var raw = cap[0];
          var bull = cap[2];
          var isordered = bull.length > 1;
          var _list = {
            type: 'list',
            raw: raw,
            ordered: isordered,
            start: isordered ? +bull.slice(0, -1) : '',
            loose: false,
            items: []
          };

          // Get each top-level item.
          var itemMatch = cap[0].match(this.rules.block.item);
          var next = false,
            item,
            space,
            bcurr,
            bnext,
            addBack,
            loose,
            istask,
            ischecked;
          var l = itemMatch.length;
          bcurr = this.rules.block.listItemStart.exec(itemMatch[0]);
          for (var i = 0; i < l; i++) {
            item = itemMatch[i];
            raw = item;

            // Determine whether the next list item belongs here.
            // Backpedal if it does not belong in this list.
            if (i !== l - 1) {
              bnext = this.rules.block.listItemStart.exec(itemMatch[i + 1]);
              if (!this.options.pedantic ? bnext[1].length > bcurr[0].length || bnext[1].length > 3 : bnext[1].length > bcurr[1].length) {
                // nested list
                itemMatch.splice(i, 2, itemMatch[i] + '\n' + itemMatch[i + 1]);
                i--;
                l--;
                continue;
              } else {
                if (
                // different bullet style
                !this.options.pedantic || this.options.smartLists ? bnext[2][bnext[2].length - 1] !== bull[bull.length - 1] : isordered === (bnext[2].length === 1)) {
                  addBack = itemMatch.slice(i + 1).join('\n');
                  _list.raw = _list.raw.substring(0, _list.raw.length - addBack.length);
                  i = l - 1;
                }
              }
              bcurr = bnext;
            }

            // Remove the list item's bullet
            // so it is seen as the next token.
            space = item.length;
            item = item.replace(/^ *([*+-]|\d+[.)]) ?/, '');

            // Outdent whatever the
            // list item contains. Hacky.
            if (~item.indexOf('\n ')) {
              space -= item.length;
              item = !this.options.pedantic ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '') : item.replace(/^ {1,4}/gm, '');
            }

            // Determine whether item is loose or not.
            // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
            // for discount behavior.
            loose = next || /\n\n(?!\s*$)/.test(item);
            if (i !== l - 1) {
              next = item.charAt(item.length - 1) === '\n';
              if (!loose) loose = next;
            }
            if (loose) {
              _list.loose = true;
            }

            // Check for task list items
            if (this.options.gfm) {
              istask = /^\[[ xX]\] /.test(item);
              ischecked = undefined;
              if (istask) {
                ischecked = item[1] !== ' ';
                item = item.replace(/^\[[ xX]\] +/, '');
              }
            }
            _list.items.push({
              type: 'list_item',
              raw: raw,
              task: istask,
              checked: ischecked,
              loose: loose,
              text: item
            });
          }
          return _list;
        }
      }
    }, {
      key: "html",
      value: function (src) {
        var cap = this.rules.block.html.exec(src);
        if (cap) {
          return {
            type: this.options.sanitize ? 'paragraph' : 'html',
            raw: cap[0],
            pre: !this.options.sanitizer && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
            text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0]
          };
        }
      }
    }, {
      key: "def",
      value: function (src) {
        var cap = this.rules.block.def.exec(src);
        if (cap) {
          if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
          var tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
          return {
            tag: tag,
            raw: cap[0],
            href: cap[2],
            title: cap[3]
          };
        }
      }
    }, {
      key: "table",
      value: function (src) {
        var cap = this.rules.block.table.exec(src);
        if (cap) {
          var item = {
            type: 'table',
            header: splitCells$1(cap[1].replace(/^ *| *\| *$/g, '')),
            align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
            cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
          };
          if (item.header.length === item.align.length) {
            item.raw = cap[0];
            var l = item.align.length;
            var i;
            for (i = 0; i < l; i++) {
              if (/^ *-+: *$/.test(item.align[i])) {
                item.align[i] = 'right';
              } else if (/^ *:-+: *$/.test(item.align[i])) {
                item.align[i] = 'center';
              } else if (/^ *:-+ *$/.test(item.align[i])) {
                item.align[i] = 'left';
              } else {
                item.align[i] = null;
              }
            }
            l = item.cells.length;
            for (i = 0; i < l; i++) {
              item.cells[i] = splitCells$1(item.cells[i].replace(/^ *\| *| *\| *$/g, ''), item.header.length);
            }
            return item;
          }
        }
      }
    }, {
      key: "lheading",
      value: function (src) {
        var cap = this.rules.block.lheading.exec(src);
        if (cap) {
          return {
            type: 'heading',
            raw: cap[0],
            depth: cap[2].charAt(0) === '=' ? 1 : 2,
            text: cap[1]
          };
        }
      }
    }, {
      key: "paragraph",
      value: function (src) {
        var cap = this.rules.block.paragraph.exec(src);
        if (cap) {
          return {
            type: 'paragraph',
            raw: cap[0],
            text: cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1]
          };
        }
      }
    }, {
      key: "text",
      value: function (src, tokens) {
        var cap = this.rules.block.text.exec(src);
        if (cap) {
          var lastToken = tokens[tokens.length - 1];
          if (lastToken && lastToken.type === 'text') {
            return {
              raw: cap[0],
              text: cap[0]
            };
          }
          return {
            type: 'text',
            raw: cap[0],
            text: cap[0]
          };
        }
      }
    }, {
      key: "escape",
      value: function (src) {
        var cap = this.rules.inline.escape.exec(src);
        if (cap) {
          return {
            type: 'escape',
            raw: cap[0],
            text: _escape(cap[1])
          };
        }
      }
    }, {
      key: "tag",
      value: function (src, inLink, inRawBlock) {
        var cap = this.rules.inline.tag.exec(src);
        if (cap) {
          if (!inLink && /^<a /i.test(cap[0])) {
            inLink = true;
          } else if (inLink && /^<\/a>/i.test(cap[0])) {
            inLink = false;
          }
          if (!inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
            inRawBlock = true;
          } else if (inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
            inRawBlock = false;
          }
          return {
            type: this.options.sanitize ? 'text' : 'html',
            raw: cap[0],
            inLink: inLink,
            inRawBlock: inRawBlock,
            text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0]
          };
        }
      }
    }, {
      key: "link",
      value: function (src) {
        var cap = this.rules.inline.link.exec(src);
        if (cap) {
          var trimmedUrl = cap[2].trim();
          if (!this.options.pedantic && /^</.test(trimmedUrl)) {
            // commonmark requires matching angle brackets
            if (!/>$/.test(trimmedUrl)) {
              return;
            }

            // ending angle bracket cannot be escaped
            var rtrimSlash = rtrim$2(trimmedUrl.slice(0, -1), '\\');
            if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
              return;
            }
          } else {
            // find closing parenthesis
            var lastParenIndex = findClosingBracket$1(cap[2], '()');
            if (lastParenIndex > -1) {
              var start = cap[0].indexOf('!') === 0 ? 5 : 4;
              var linkLen = start + cap[1].length + lastParenIndex;
              cap[2] = cap[2].substring(0, lastParenIndex);
              cap[0] = cap[0].substring(0, linkLen).trim();
              cap[3] = '';
            }
          }
          var href = cap[2];
          var title = '';
          if (this.options.pedantic) {
            // split pedantic href and title
            var _link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
            if (_link) {
              href = _link[1];
              title = _link[3];
            }
          } else {
            title = cap[3] ? cap[3].slice(1, -1) : '';
          }
          href = href.trim();
          if (/^</.test(href)) {
            if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
              // pedantic allows starting angle bracket without ending angle bracket
              href = href.slice(1);
            } else {
              href = href.slice(1, -1);
            }
          }
          return outputLink(cap, {
            href: href ? href.replace(this.rules.inline._escapes, '$1') : href,
            title: title ? title.replace(this.rules.inline._escapes, '$1') : title
          }, cap[0]);
        }
      }
    }, {
      key: "reflink",
      value: function (src, links) {
        var cap;
        if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
          var link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
          link = links[link.toLowerCase()];
          if (!link || !link.href) {
            var text = cap[0].charAt(0);
            return {
              type: 'text',
              raw: text,
              text: text
            };
          }
          return outputLink(cap, link, cap[0]);
        }
      }
    }, {
      key: "strong",
      value: function (src, maskedSrc) {
        var prevChar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        var match = this.rules.inline.strong.start.exec(src);
        if (match && (!match[1] || match[1] && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar)))) {
          maskedSrc = maskedSrc.slice(-1 * src.length);
          var endReg = match[0] === '**' ? this.rules.inline.strong.endAst : this.rules.inline.strong.endUnd;
          endReg.lastIndex = 0;
          var cap;
          while ((match = endReg.exec(maskedSrc)) != null) {
            cap = this.rules.inline.strong.middle.exec(maskedSrc.slice(0, match.index + 3));
            if (cap) {
              return {
                type: 'strong',
                raw: src.slice(0, cap[0].length),
                text: src.slice(2, cap[0].length - 2)
              };
            }
          }
        }
      }
    }, {
      key: "em",
      value: function (src, maskedSrc) {
        var prevChar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        var match = this.rules.inline.em.start.exec(src);
        if (match && (!match[1] || match[1] && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar)))) {
          maskedSrc = maskedSrc.slice(-1 * src.length);
          var endReg = match[0] === '*' ? this.rules.inline.em.endAst : this.rules.inline.em.endUnd;
          endReg.lastIndex = 0;
          var cap;
          while ((match = endReg.exec(maskedSrc)) != null) {
            cap = this.rules.inline.em.middle.exec(maskedSrc.slice(0, match.index + 2));
            if (cap) {
              return {
                type: 'em',
                raw: src.slice(0, cap[0].length),
                text: src.slice(1, cap[0].length - 1)
              };
            }
          }
        }
      }
    }, {
      key: "codespan",
      value: function (src) {
        var cap = this.rules.inline.code.exec(src);
        if (cap) {
          var text = cap[2].replace(/\n/g, ' ');
          var hasNonSpaceChars = /[^ ]/.test(text);
          var hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
          if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
            text = text.substring(1, text.length - 1);
          }
          text = _escape(text, true);
          return {
            type: 'codespan',
            raw: cap[0],
            text: text
          };
        }
      }
    }, {
      key: "br",
      value: function (src) {
        var cap = this.rules.inline.br.exec(src);
        if (cap) {
          return {
            type: 'br',
            raw: cap[0]
          };
        }
      }
    }, {
      key: "del",
      value: function (src) {
        var cap = this.rules.inline.del.exec(src);
        if (cap) {
          return {
            type: 'del',
            raw: cap[0],
            text: cap[2]
          };
        }
      }
    }, {
      key: "autolink",
      value: function (src, mangle) {
        var cap = this.rules.inline.autolink.exec(src);
        if (cap) {
          var text, href;
          if (cap[2] === '@') {
            text = _escape(this.options.mangle ? mangle(cap[1]) : cap[1]);
            href = 'mailto:' + text;
          } else {
            text = _escape(cap[1]);
            href = text;
          }
          return {
            type: 'link',
            raw: cap[0],
            text: text,
            href: href,
            tokens: [{
              type: 'text',
              raw: text,
              text: text
            }]
          };
        }
      }
    }, {
      key: "url",
      value: function (src, mangle) {
        var cap;
        if (cap = this.rules.inline.url.exec(src)) {
          var text, href;
          if (cap[2] === '@') {
            text = _escape(this.options.mangle ? mangle(cap[0]) : cap[0]);
            href = 'mailto:' + text;
          } else {
            // do extended autolink path validation
            var prevCapZero;
            do {
              prevCapZero = cap[0];
              cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
            } while (prevCapZero !== cap[0]);
            text = _escape(cap[0]);
            if (cap[1] === 'www.') {
              href = 'http://' + text;
            } else {
              href = text;
            }
          }
          return {
            type: 'link',
            raw: cap[0],
            text: text,
            href: href,
            tokens: [{
              type: 'text',
              raw: text,
              text: text
            }]
          };
        }
      }
    }, {
      key: "inlineText",
      value: function (src, inRawBlock, smartypants) {
        var cap = this.rules.inline.text.exec(src);
        if (cap) {
          var text;
          if (inRawBlock) {
            text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : _escape(cap[0]) : cap[0];
          } else {
            text = _escape(this.options.smartypants ? smartypants(cap[0]) : cap[0]);
          }
          return {
            type: 'text',
            raw: cap[0],
            text: text
          };
        }
      }
    }]);
  }();

  var noopTest$1 = helpers.noopTest,
    edit$1 = helpers.edit,
    merge$1 = helpers.merge;

  /**
   * Block-Level Grammar
   */
  var block = {
    newline: /^(?: *(?:\n|$))+/,
    code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
    fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
    hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
    heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?! {0,3}bull )\n*|\s*$)/,
    html: '^ {0,3}(?:' // optional indentation
    + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?(?:\\?>\\n*|$)' // (3)
    + '|<![A-Z][\\s\\S]*?(?:>\\n*|$)' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
    + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
    + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
    + ')',
    def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
    nptable: noopTest$1,
    table: noopTest$1,
    lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
    // regex template, placeholders will be replaced according to different paragraph
    // interruption rules of commonmark and the original markdown spec:
    _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html| +\n)[^\n]+)*)/,
    text: /^[^\n]+/
  };
  block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
  block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
  block.def = edit$1(block.def).replace('label', block._label).replace('title', block._title).getRegex();
  block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
  block.item = /^( *)(bull) ?[^\n]*(?:\n(?! *bull ?)[^\n]*)*/;
  block.item = edit$1(block.item, 'gm').replace(/bull/g, block.bullet).getRegex();
  block.listItemStart = edit$1(/^( *)(bull)/).replace('bull', block.bullet).getRegex();
  block.list = edit$1(block.list).replace(/bull/g, block.bullet).replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))').replace('def', '\\n+(?=' + block.def.source + ')').getRegex();
  block._tag = 'address|article|aside|base|basefont|blockquote|body|caption' + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption' + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe' + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option' + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr' + '|track|ul';
  block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
  block.html = edit$1(block.html, 'i').replace('comment', block._comment).replace('tag', block._tag).replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  block.paragraph = edit$1(block._paragraph).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
  .replace('blockquote', ' {0,3}>').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)').replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
  .getRegex();
  block.blockquote = edit$1(block.blockquote).replace('paragraph', block.paragraph).getRegex();

  /**
   * Normal Block Grammar
   */

  block.normal = merge$1({}, block);

  /**
   * GFM Block Grammar
   */

  block.gfm = merge$1({}, block.normal, {
    nptable: '^ *([^|\\n ].*\\|.*)\\n' // Header
    + ' {0,3}([-:]+ *\\|[-| :]*)' // Align
    + '(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
    // Cells
    table: '^ *\\|(.+)\\n' // Header
    + ' {0,3}\\|?( *[-:]+[-| :]*)' // Align
    + '(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)' // Cells
  });
  block.gfm.nptable = edit$1(block.gfm.nptable).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('blockquote', ' {0,3}>').replace('code', ' {4}[^\\n]').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)').replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
  .getRegex();
  block.gfm.table = edit$1(block.gfm.table).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('blockquote', ' {0,3}>').replace('code', ' {4}[^\\n]').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)').replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
  .getRegex();

  /**
   * Pedantic grammar (original John Gruber's loose markdown specification)
   */

  block.pedantic = merge$1({}, block.normal, {
    html: edit$1('^ *(?:comment *(?:\\n|\\s*$)' + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
    + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))').replace('comment', block._comment).replace(/tag/g, '(?!(?:' + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub' + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)' + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b').getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: noopTest$1,
    // fences not supported
    paragraph: edit$1(block.normal._paragraph).replace('hr', block.hr).replace('heading', ' *#{1,6} *[^\n]').replace('lheading', block.lheading).replace('blockquote', ' {0,3}>').replace('|fences', '').replace('|list', '').replace('|html', '').getRegex()
  });

  /**
   * Inline-Level Grammar
   */
  var inline = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: noopTest$1,
    tag: '^comment' + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
    // CDATA section
    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
    nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
    reflinkSearch: 'reflink|nolink(?!\\()',
    strong: {
      start: /^(?:(\*\*(?=[*punctuation]))|\*\*)(?![\s])|__/,
      // (1) returns if starts w/ punctuation
      middle: /^\*\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*\*$|^__(?![\s])((?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?)__$/,
      endAst: /[^punctuation\s]\*\*(?!\*)|[punctuation]\*\*(?!\*)(?:(?=[punctuation_\s]|$))/,
      // last char can't be punct, or final * must also be followed by punct (or endline)
      endUnd: /[^\s]__(?!_)(?:(?=[punctuation*\s])|$)/ // last char can't be a space, and final _ must preceed punct or \s (or endline)
    },
    em: {
      start: /^(?:(\*(?=[punctuation]))|\*)(?![*\s])|_/,
      // (1) returns if starts w/ punctuation
      middle: /^\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*$|^_(?![_\s])(?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?_$/,
      endAst: /[^punctuation\s]\*(?!\*)|[punctuation]\*(?!\*)(?:(?=[punctuation_\s]|$))/,
      // last char can't be punct, or final * must also be followed by punct (or endline)
      endUnd: /[^\s]_(?!_)(?:(?=[punctuation*\s])|$)/ // last char can't be a space, and final _ must preceed punct or \s (or endline)
    },
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: noopTest$1,
    text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n)))/,
    punctuation: /^([\s*punctuation])/
  };

  // list of punctuation marks from common mark spec
  // without * and _ to workaround cases with double emphasis
  inline._punctuation = '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~';
  inline.punctuation = edit$1(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();

  // sequences em should skip over [title](link), `code`, <html>
  inline._blockSkip = '\\[[^\\]]*?\\]\\([^\\)]*?\\)|`[^`]*?`|<[^>]*?>';
  inline._overlapSkip = '__[^_]*?__|\\*\\*\\[^\\*\\]*?\\*\\*';
  inline._comment = edit$1(block._comment).replace('(?:-->|$)', '-->').getRegex();
  inline.em.start = edit$1(inline.em.start).replace(/punctuation/g, inline._punctuation).getRegex();
  inline.em.middle = edit$1(inline.em.middle).replace(/punctuation/g, inline._punctuation).replace(/overlapSkip/g, inline._overlapSkip).getRegex();
  inline.em.endAst = edit$1(inline.em.endAst, 'g').replace(/punctuation/g, inline._punctuation).getRegex();
  inline.em.endUnd = edit$1(inline.em.endUnd, 'g').replace(/punctuation/g, inline._punctuation).getRegex();
  inline.strong.start = edit$1(inline.strong.start).replace(/punctuation/g, inline._punctuation).getRegex();
  inline.strong.middle = edit$1(inline.strong.middle).replace(/punctuation/g, inline._punctuation).replace(/overlapSkip/g, inline._overlapSkip).getRegex();
  inline.strong.endAst = edit$1(inline.strong.endAst, 'g').replace(/punctuation/g, inline._punctuation).getRegex();
  inline.strong.endUnd = edit$1(inline.strong.endUnd, 'g').replace(/punctuation/g, inline._punctuation).getRegex();
  inline.blockSkip = edit$1(inline._blockSkip, 'g').getRegex();
  inline.overlapSkip = edit$1(inline._overlapSkip, 'g').getRegex();
  inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
  inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
  inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
  inline.autolink = edit$1(inline.autolink).replace('scheme', inline._scheme).replace('email', inline._email).getRegex();
  inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
  inline.tag = edit$1(inline.tag).replace('comment', inline._comment).replace('attribute', inline._attribute).getRegex();
  inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
  inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
  inline.link = edit$1(inline.link).replace('label', inline._label).replace('href', inline._href).replace('title', inline._title).getRegex();
  inline.reflink = edit$1(inline.reflink).replace('label', inline._label).getRegex();
  inline.reflinkSearch = edit$1(inline.reflinkSearch, 'g').replace('reflink', inline.reflink).replace('nolink', inline.nolink).getRegex();

  /**
   * Normal Inline Grammar
   */

  inline.normal = merge$1({}, inline);

  /**
   * Pedantic Inline Grammar
   */

  inline.pedantic = merge$1({}, inline.normal, {
    strong: {
      start: /^__|\*\*/,
      middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      endAst: /\*\*(?!\*)/g,
      endUnd: /__(?!_)/g
    },
    em: {
      start: /^_|\*/,
      middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
      endAst: /\*(?!\*)/g,
      endUnd: /_(?!_)/g
    },
    link: edit$1(/^!?\[(label)\]\((.*?)\)/).replace('label', inline._label).getRegex(),
    reflink: edit$1(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace('label', inline._label).getRegex()
  });

  /**
   * GFM Inline Grammar
   */

  inline.gfm = merge$1({}, inline.normal, {
    escape: edit$1(inline.escape).replace('])', '~|])').getRegex(),
    _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
  });
  inline.gfm.url = edit$1(inline.gfm.url, 'i').replace('email', inline.gfm._extended_email).getRegex();
  /**
   * GFM + Line Breaks Inline Grammar
   */

  inline.breaks = merge$1({}, inline.gfm, {
    br: edit$1(inline.br).replace('{2,}', '*').getRegex(),
    text: edit$1(inline.gfm.text).replace('\\b_', '\\b_| {2,}\\n').replace(/\{2,\}/g, '*').getRegex()
  });
  var rules = {
    block: block,
    inline: inline
  };

  var defaults$2 = defaults.defaults;
  var block$1 = rules.block,
    inline$1 = rules.inline;
  var repeatString$1 = helpers.repeatString;

  /**
   * smartypants text replacement
   */
  function smartypants(text) {
    return text
    // em-dashes
    .replace(/---/g, "\u2014")
    // en-dashes
    .replace(/--/g, "\u2013")
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018")
    // closing singles & apostrophes
    .replace(/'/g, "\u2019")
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C")
    // closing doubles
    .replace(/"/g, "\u201D")
    // ellipses
    .replace(/\.{3}/g, "\u2026");
  }

  /**
   * mangle email addresses
   */
  function mangle(text) {
    var out = '',
      i,
      ch;
    var l = text.length;
    for (i = 0; i < l; i++) {
      ch = text.charCodeAt(i);
      if (Math.random() > 0.5) {
        ch = 'x' + ch.toString(16);
      }
      out += '&#' + ch + ';';
    }
    return out;
  }

  /**
   * Block Lexer
   */
  var Lexer_1 = /*#__PURE__*/function () {
    function Lexer(options) {
      _classCallCheck(this, Lexer);
      this.tokens = [];
      this.tokens.links = Object.create(null);
      this.options = options || defaults$2;
      this.options.tokenizer = this.options.tokenizer || new Tokenizer_1();
      this.tokenizer = this.options.tokenizer;
      this.tokenizer.options = this.options;
      var rules = {
        block: block$1.normal,
        inline: inline$1.normal
      };
      if (this.options.pedantic) {
        rules.block = block$1.pedantic;
        rules.inline = inline$1.pedantic;
      } else if (this.options.gfm) {
        rules.block = block$1.gfm;
        if (this.options.breaks) {
          rules.inline = inline$1.breaks;
        } else {
          rules.inline = inline$1.gfm;
        }
      }
      this.tokenizer.rules = rules;
    }

    /**
     * Expose Rules
     */
    return _createClass(Lexer, [{
      key: "lex",
      value:
      /**
       * Preprocessing
       */
      function (src) {
        src = src.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ');
        this.blockTokens(src, this.tokens, true);
        this.inline(this.tokens);
        return this.tokens;
      }

      /**
       * Lexing
       */
    }, {
      key: "blockTokens",
      value: function (src) {
        var tokens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var top = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        if (this.options.pedantic) {
          src = src.replace(/^ +$/gm, '');
        }
        var token, i, l, lastToken;
        while (src) {
          // newline
          if (token = this.tokenizer.space(src)) {
            src = src.substring(token.raw.length);
            if (token.type) {
              tokens.push(token);
            }
            continue;
          }

          // code
          if (token = this.tokenizer.code(src, tokens)) {
            src = src.substring(token.raw.length);
            if (token.type) {
              tokens.push(token);
            } else {
              lastToken = tokens[tokens.length - 1];
              lastToken.raw += '\n' + token.raw;
              lastToken.text += '\n' + token.text;
            }
            continue;
          }

          // fences
          if (token = this.tokenizer.fences(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // heading
          if (token = this.tokenizer.heading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // table no leading pipe (gfm)
          if (token = this.tokenizer.nptable(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // hr
          if (token = this.tokenizer.hr(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // blockquote
          if (token = this.tokenizer.blockquote(src)) {
            src = src.substring(token.raw.length);
            token.tokens = this.blockTokens(token.text, [], top);
            tokens.push(token);
            continue;
          }

          // list
          if (token = this.tokenizer.list(src)) {
            src = src.substring(token.raw.length);
            l = token.items.length;
            for (i = 0; i < l; i++) {
              token.items[i].tokens = this.blockTokens(token.items[i].text, [], false);
            }
            tokens.push(token);
            continue;
          }

          // html
          if (token = this.tokenizer.html(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // def
          if (top && (token = this.tokenizer.def(src))) {
            src = src.substring(token.raw.length);
            if (!this.tokens.links[token.tag]) {
              this.tokens.links[token.tag] = {
                href: token.href,
                title: token.title
              };
            }
            continue;
          }

          // table (gfm)
          if (token = this.tokenizer.table(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // lheading
          if (token = this.tokenizer.lheading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // top-level paragraph
          if (top && (token = this.tokenizer.paragraph(src))) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // text
          if (token = this.tokenizer.text(src, tokens)) {
            src = src.substring(token.raw.length);
            if (token.type) {
              tokens.push(token);
            } else {
              lastToken = tokens[tokens.length - 1];
              lastToken.raw += '\n' + token.raw;
              lastToken.text += '\n' + token.text;
            }
            continue;
          }
          if (src) {
            var errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
            if (this.options.silent) {
              console.error(errMsg);
              break;
            } else {
              throw new Error(errMsg);
            }
          }
        }
        return tokens;
      }
    }, {
      key: "inline",
      value: function (tokens) {
        var i, j, k, l2, row, token;
        var l = tokens.length;
        for (i = 0; i < l; i++) {
          token = tokens[i];
          switch (token.type) {
            case 'paragraph':
            case 'text':
            case 'heading':
              {
                token.tokens = [];
                this.inlineTokens(token.text, token.tokens);
                break;
              }
            case 'table':
              {
                token.tokens = {
                  header: [],
                  cells: []
                };

                // header
                l2 = token.header.length;
                for (j = 0; j < l2; j++) {
                  token.tokens.header[j] = [];
                  this.inlineTokens(token.header[j], token.tokens.header[j]);
                }

                // cells
                l2 = token.cells.length;
                for (j = 0; j < l2; j++) {
                  row = token.cells[j];
                  token.tokens.cells[j] = [];
                  for (k = 0; k < row.length; k++) {
                    token.tokens.cells[j][k] = [];
                    this.inlineTokens(row[k], token.tokens.cells[j][k]);
                  }
                }
                break;
              }
            case 'blockquote':
              {
                this.inline(token.tokens);
                break;
              }
            case 'list':
              {
                l2 = token.items.length;
                for (j = 0; j < l2; j++) {
                  this.inline(token.items[j].tokens);
                }
                break;
              }
          }
        }
        return tokens;
      }

      /**
       * Lexing/Compiling
       */
    }, {
      key: "inlineTokens",
      value: function (src) {
        var tokens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var inLink = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var inRawBlock = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var token;

        // String with links masked to avoid interference with em and strong
        var maskedSrc = src;
        var match;
        var keepPrevChar, prevChar;

        // Mask out reflinks
        if (this.tokens.links) {
          var links = Object.keys(this.tokens.links);
          if (links.length > 0) {
            while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
              if (links.includes(match[0].slice(match[0].lastIndexOf('[') + 1, -1))) {
                maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString$1('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
              }
            }
          }
        }
        // Mask out other blocks
        while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
          maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString$1('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        }
        while (src) {
          if (!keepPrevChar) {
            prevChar = '';
          }
          keepPrevChar = false;
          // escape
          if (token = this.tokenizer.escape(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // tag
          if (token = this.tokenizer.tag(src, inLink, inRawBlock)) {
            src = src.substring(token.raw.length);
            inLink = token.inLink;
            inRawBlock = token.inRawBlock;
            tokens.push(token);
            continue;
          }

          // link
          if (token = this.tokenizer.link(src)) {
            src = src.substring(token.raw.length);
            if (token.type === 'link') {
              token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
            }
            tokens.push(token);
            continue;
          }

          // reflink, nolink
          if (token = this.tokenizer.reflink(src, this.tokens.links)) {
            src = src.substring(token.raw.length);
            if (token.type === 'link') {
              token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
            }
            tokens.push(token);
            continue;
          }

          // strong
          if (token = this.tokenizer.strong(src, maskedSrc, prevChar)) {
            src = src.substring(token.raw.length);
            token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
            tokens.push(token);
            continue;
          }

          // em
          if (token = this.tokenizer.em(src, maskedSrc, prevChar)) {
            src = src.substring(token.raw.length);
            token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
            tokens.push(token);
            continue;
          }

          // code
          if (token = this.tokenizer.codespan(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // br
          if (token = this.tokenizer.br(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // del (gfm)
          if (token = this.tokenizer.del(src)) {
            src = src.substring(token.raw.length);
            token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
            tokens.push(token);
            continue;
          }

          // autolink
          if (token = this.tokenizer.autolink(src, mangle)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // url (gfm)
          if (!inLink && (token = this.tokenizer.url(src, mangle))) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // text
          if (token = this.tokenizer.inlineText(src, inRawBlock, smartypants)) {
            src = src.substring(token.raw.length);
            prevChar = token.raw.slice(-1);
            keepPrevChar = true;
            tokens.push(token);
            continue;
          }
          if (src) {
            var errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
            if (this.options.silent) {
              console.error(errMsg);
              break;
            } else {
              throw new Error(errMsg);
            }
          }
        }
        return tokens;
      }
    }], [{
      key: "rules",
      get: function () {
        return {
          block: block$1,
          inline: inline$1
        };
      }

      /**
       * Static Lex Method
       */
    }, {
      key: "lex",
      value: function (src, options) {
        var lexer = new Lexer(options);
        return lexer.lex(src);
      }

      /**
       * Static Lex Inline Method
       */
    }, {
      key: "lexInline",
      value: function (src, options) {
        var lexer = new Lexer(options);
        return lexer.inlineTokens(src);
      }
    }]);
  }();

  var defaults$3 = defaults.defaults;
  var cleanUrl$1 = helpers.cleanUrl,
    escape$1 = helpers.escape;

  /**
   * Renderer
   */
  var Renderer_1 = /*#__PURE__*/function () {
    function Renderer(options) {
      _classCallCheck(this, Renderer);
      this.options = options || defaults$3;
    }
    return _createClass(Renderer, [{
      key: "code",
      value: function (_code, infostring, escaped) {
        var lang = (infostring || '').match(/\S*/)[0];
        if (this.options.highlight) {
          var out = this.options.highlight(_code, lang);
          if (out != null && out !== _code) {
            escaped = true;
            _code = out;
          }
        }
        _code = _code.replace(/\n$/, '') + '\n';
        if (!lang) {
          return '<pre><code>' + (escaped ? _code : escape$1(_code, true)) + '</code></pre>\n';
        }
        return '<pre><code class="' + this.options.langPrefix + escape$1(lang, true) + '">' + (escaped ? _code : escape$1(_code, true)) + '</code></pre>\n';
      }
    }, {
      key: "blockquote",
      value: function (quote) {
        return '<blockquote>\n' + quote + '</blockquote>\n';
      }
    }, {
      key: "html",
      value: function (_html) {
        return _html;
      }
    }, {
      key: "heading",
      value: function (text, level, raw, slugger) {
        if (this.options.headerIds) {
          return '<h' + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + '</h' + level + '>\n';
        }
        // ignore IDs
        return '<h' + level + '>' + text + '</h' + level + '>\n';
      }
    }, {
      key: "hr",
      value: function () {
        return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
      }
    }, {
      key: "list",
      value: function (body, ordered, start) {
        var type = ordered ? 'ol' : 'ul',
          startatt = ordered && start !== 1 ? ' start="' + start + '"' : '';
        return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
      }
    }, {
      key: "listitem",
      value: function (text) {
        return '<li>' + text + '</li>\n';
      }
    }, {
      key: "checkbox",
      value: function (checked) {
        return '<input ' + (checked ? 'checked="" ' : '') + 'disabled="" type="checkbox"' + (this.options.xhtml ? ' /' : '') + '> ';
      }
    }, {
      key: "paragraph",
      value: function (text) {
        return '<p>' + text + '</p>\n';
      }
    }, {
      key: "table",
      value: function (header, body) {
        if (body) body = '<tbody>' + body + '</tbody>';
        return '<table>\n' + '<thead>\n' + header + '</thead>\n' + body + '</table>\n';
      }
    }, {
      key: "tablerow",
      value: function (content) {
        return '<tr>\n' + content + '</tr>\n';
      }
    }, {
      key: "tablecell",
      value: function (content, flags) {
        var type = flags.header ? 'th' : 'td';
        var tag = flags.align ? '<' + type + ' align="' + flags.align + '">' : '<' + type + '>';
        return tag + content + '</' + type + '>\n';
      }

      // span level renderer
    }, {
      key: "strong",
      value: function (text) {
        return '<strong>' + text + '</strong>';
      }
    }, {
      key: "em",
      value: function (text) {
        return '<em>' + text + '</em>';
      }
    }, {
      key: "codespan",
      value: function (text) {
        return '<code>' + text + '</code>';
      }
    }, {
      key: "br",
      value: function () {
        return this.options.xhtml ? '<br/>' : '<br>';
      }
    }, {
      key: "del",
      value: function (text) {
        return '<del>' + text + '</del>';
      }
    }, {
      key: "link",
      value: function (href, title, text) {
        href = cleanUrl$1(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
          return text;
        }
        var out = '<a href="' + escape$1(href) + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += '>' + text + '</a>';
        return out;
      }
    }, {
      key: "image",
      value: function (href, title, text) {
        href = cleanUrl$1(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
          return text;
        }
        var out = '<img src="' + href + '" alt="' + text + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += this.options.xhtml ? '/>' : '>';
        return out;
      }
    }, {
      key: "text",
      value: function (_text) {
        return _text;
      }
    }]);
  }();

  /**
   * TextRenderer
   * returns only the textual part of the token
   */
  var TextRenderer_1 = /*#__PURE__*/function () {
    function TextRenderer() {
      _classCallCheck(this, TextRenderer);
    }
    return _createClass(TextRenderer, [{
      key: "strong",
      value:
      // no need for block level renderers
      function (text) {
        return text;
      }
    }, {
      key: "em",
      value: function (text) {
        return text;
      }
    }, {
      key: "codespan",
      value: function (text) {
        return text;
      }
    }, {
      key: "del",
      value: function (text) {
        return text;
      }
    }, {
      key: "html",
      value: function (text) {
        return text;
      }
    }, {
      key: "text",
      value: function (_text) {
        return _text;
      }
    }, {
      key: "link",
      value: function (href, title, text) {
        return '' + text;
      }
    }, {
      key: "image",
      value: function (href, title, text) {
        return '' + text;
      }
    }, {
      key: "br",
      value: function () {
        return '';
      }
    }]);
  }();

  /**
   * Slugger generates header id
   */
  var Slugger_1 = /*#__PURE__*/function () {
    function Slugger() {
      _classCallCheck(this, Slugger);
      this.seen = {};
    }
    return _createClass(Slugger, [{
      key: "serialize",
      value: function (value) {
        return value.toLowerCase().trim()
        // remove html tags
        .replace(/<[!\/a-z].*?>/ig, '')
        // remove unwanted chars
        .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '').replace(/\s/g, '-');
      }

      /**
       * Finds the next safe (unique) slug to use
       */
    }, {
      key: "getNextSafeSlug",
      value: function (originalSlug, isDryRun) {
        var slug = originalSlug;
        var occurenceAccumulator = 0;
        if (this.seen.hasOwnProperty(slug)) {
          occurenceAccumulator = this.seen[originalSlug];
          do {
            occurenceAccumulator++;
            slug = originalSlug + '-' + occurenceAccumulator;
          } while (this.seen.hasOwnProperty(slug));
        }
        if (!isDryRun) {
          this.seen[originalSlug] = occurenceAccumulator;
          this.seen[slug] = 0;
        }
        return slug;
      }

      /**
       * Convert string to unique id
       * @param {object} options
       * @param {boolean} options.dryrun Generates the next unique slug without updating the internal accumulator.
       */
    }, {
      key: "slug",
      value: function slug(value) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var slug = this.serialize(value);
        return this.getNextSafeSlug(slug, options.dryrun);
      }
    }]);
  }();

  var defaults$4 = defaults.defaults;
  var unescape$1 = helpers.unescape;

  /**
   * Parsing & Compiling
   */
  var Parser_1 = /*#__PURE__*/function () {
    function Parser(options) {
      _classCallCheck(this, Parser);
      this.options = options || defaults$4;
      this.options.renderer = this.options.renderer || new Renderer_1();
      this.renderer = this.options.renderer;
      this.renderer.options = this.options;
      this.textRenderer = new TextRenderer_1();
      this.slugger = new Slugger_1();
    }

    /**
     * Static Parse Method
     */
    return _createClass(Parser, [{
      key: "parse",
      value:
      /**
       * Parse Loop
       */
      function (tokens) {
        var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var out = '',
          i,
          j,
          k,
          l2,
          l3,
          row,
          cell,
          header,
          body,
          token,
          ordered,
          start,
          loose,
          itemBody,
          item,
          checked,
          task,
          checkbox;
        var l = tokens.length;
        for (i = 0; i < l; i++) {
          token = tokens[i];
          switch (token.type) {
            case 'space':
              {
                continue;
              }
            case 'hr':
              {
                out += this.renderer.hr();
                continue;
              }
            case 'heading':
              {
                out += this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape$1(this.parseInline(token.tokens, this.textRenderer)), this.slugger);
                continue;
              }
            case 'code':
              {
                out += this.renderer.code(token.text, token.lang, token.escaped);
                continue;
              }
            case 'table':
              {
                header = '';

                // header
                cell = '';
                l2 = token.header.length;
                for (j = 0; j < l2; j++) {
                  cell += this.renderer.tablecell(this.parseInline(token.tokens.header[j]), {
                    header: true,
                    align: token.align[j]
                  });
                }
                header += this.renderer.tablerow(cell);
                body = '';
                l2 = token.cells.length;
                for (j = 0; j < l2; j++) {
                  row = token.tokens.cells[j];
                  cell = '';
                  l3 = row.length;
                  for (k = 0; k < l3; k++) {
                    cell += this.renderer.tablecell(this.parseInline(row[k]), {
                      header: false,
                      align: token.align[k]
                    });
                  }
                  body += this.renderer.tablerow(cell);
                }
                out += this.renderer.table(header, body);
                continue;
              }
            case 'blockquote':
              {
                body = this.parse(token.tokens);
                out += this.renderer.blockquote(body);
                continue;
              }
            case 'list':
              {
                ordered = token.ordered;
                start = token.start;
                loose = token.loose;
                l2 = token.items.length;
                body = '';
                for (j = 0; j < l2; j++) {
                  item = token.items[j];
                  checked = item.checked;
                  task = item.task;
                  itemBody = '';
                  if (item.task) {
                    checkbox = this.renderer.checkbox(checked);
                    if (loose) {
                      if (item.tokens.length > 0 && item.tokens[0].type === 'text') {
                        item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;
                        if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                          item.tokens[0].tokens[0].text = checkbox + ' ' + item.tokens[0].tokens[0].text;
                        }
                      } else {
                        item.tokens.unshift({
                          type: 'text',
                          text: checkbox
                        });
                      }
                    } else {
                      itemBody += checkbox;
                    }
                  }
                  itemBody += this.parse(item.tokens, loose);
                  body += this.renderer.listitem(itemBody, task, checked);
                }
                out += this.renderer.list(body, ordered, start);
                continue;
              }
            case 'html':
              {
                // TODO parse inline content if parameter markdown=1
                out += this.renderer.html(token.text);
                continue;
              }
            case 'paragraph':
              {
                out += this.renderer.paragraph(this.parseInline(token.tokens));
                continue;
              }
            case 'text':
              {
                body = token.tokens ? this.parseInline(token.tokens) : token.text;
                while (i + 1 < l && tokens[i + 1].type === 'text') {
                  token = tokens[++i];
                  body += '\n' + (token.tokens ? this.parseInline(token.tokens) : token.text);
                }
                out += top ? this.renderer.paragraph(body) : body;
                continue;
              }
            default:
              {
                var errMsg = 'Token with "' + token.type + '" type was not found.';
                if (this.options.silent) {
                  console.error(errMsg);
                  return;
                } else {
                  throw new Error(errMsg);
                }
              }
          }
        }
        return out;
      }

      /**
       * Parse Inline Tokens
       */
    }, {
      key: "parseInline",
      value: function (tokens, renderer) {
        renderer = renderer || this.renderer;
        var out = '',
          i,
          token;
        var l = tokens.length;
        for (i = 0; i < l; i++) {
          token = tokens[i];
          switch (token.type) {
            case 'escape':
              {
                out += renderer.text(token.text);
                break;
              }
            case 'html':
              {
                out += renderer.html(token.text);
                break;
              }
            case 'link':
              {
                out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
                break;
              }
            case 'image':
              {
                out += renderer.image(token.href, token.title, token.text);
                break;
              }
            case 'strong':
              {
                out += renderer.strong(this.parseInline(token.tokens, renderer));
                break;
              }
            case 'em':
              {
                out += renderer.em(this.parseInline(token.tokens, renderer));
                break;
              }
            case 'codespan':
              {
                out += renderer.codespan(token.text);
                break;
              }
            case 'br':
              {
                out += renderer.br();
                break;
              }
            case 'del':
              {
                out += renderer.del(this.parseInline(token.tokens, renderer));
                break;
              }
            case 'text':
              {
                out += renderer.text(token.text);
                break;
              }
            default:
              {
                var errMsg = 'Token with "' + token.type + '" type was not found.';
                if (this.options.silent) {
                  console.error(errMsg);
                  return;
                } else {
                  throw new Error(errMsg);
                }
              }
          }
        }
        return out;
      }
    }], [{
      key: "parse",
      value: function (tokens, options) {
        var parser = new Parser(options);
        return parser.parse(tokens);
      }

      /**
       * Static Parse Inline Method
       */
    }, {
      key: "parseInline",
      value: function (tokens, options) {
        var parser = new Parser(options);
        return parser.parseInline(tokens);
      }
    }]);
  }();

  function _createForOfIteratorHelper$2(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray$3(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
  function _unsupportedIterableToArray$3(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray$3(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$3(r, a) : void 0; } }
  function _arrayLikeToArray$3(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  var merge$2 = helpers.merge,
    checkSanitizeDeprecation$1 = helpers.checkSanitizeDeprecation,
    escape$2 = helpers.escape;
  var getDefaults = defaults.getDefaults,
    changeDefaults = defaults.changeDefaults,
    defaults$5 = defaults.defaults;

  /**
   * Marked
   */
  function marked(src, opt, callback) {
    // throw error in case of non string input
    if (typeof src === 'undefined' || src === null) {
      throw new Error('marked(): input parameter is undefined or null');
    }
    if (typeof src !== 'string') {
      throw new Error('marked(): input parameter is of type ' + Object.prototype.toString.call(src) + ', string expected');
    }
    if (typeof opt === 'function') {
      callback = opt;
      opt = null;
    }
    opt = merge$2({}, marked.defaults, opt || {});
    checkSanitizeDeprecation$1(opt);
    if (callback) {
      var highlight = opt.highlight;
      var tokens;
      try {
        tokens = Lexer_1.lex(src, opt);
      } catch (e) {
        return callback(e);
      }
      var done = function (err) {
        var out;
        if (!err) {
          try {
            out = Parser_1.parse(tokens, opt);
          } catch (e) {
            err = e;
          }
        }
        opt.highlight = highlight;
        return err ? callback(err) : callback(null, out);
      };
      if (!highlight || highlight.length < 3) {
        return done();
      }
      delete opt.highlight;
      if (!tokens.length) return done();
      var pending = 0;
      marked.walkTokens(tokens, function (token) {
        if (token.type === 'code') {
          pending++;
          setTimeout(function () {
            highlight(token.text, token.lang, function (err, code) {
              if (err) {
                return done(err);
              }
              if (code != null && code !== token.text) {
                token.text = code;
                token.escaped = true;
              }
              pending--;
              if (pending === 0) {
                done();
              }
            });
          }, 0);
        }
      });
      if (pending === 0) {
        done();
      }
      return;
    }
    try {
      var _tokens = Lexer_1.lex(src, opt);
      if (opt.walkTokens) {
        marked.walkTokens(_tokens, opt.walkTokens);
      }
      return Parser_1.parse(_tokens, opt);
    } catch (e) {
      e.message += '\nPlease report this to https://github.com/markedjs/marked.';
      if (opt.silent) {
        return '<p>An error occurred:</p><pre>' + escape$2(e.message + '', true) + '</pre>';
      }
      throw e;
    }
  }

  /**
   * Options
   */

  marked.options = marked.setOptions = function (opt) {
    merge$2(marked.defaults, opt);
    changeDefaults(marked.defaults);
    return marked;
  };
  marked.getDefaults = getDefaults;
  marked.defaults = defaults$5;

  /**
   * Use Extension
   */

  marked.use = function (extension) {
    var opts = merge$2({}, extension);
    if (extension.renderer) {
      var renderer = marked.defaults.renderer || new Renderer_1();
      var _loop = function _loop(prop) {
        var prevRenderer = renderer[prop];
        renderer[prop] = function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          var ret = extension.renderer[prop].apply(renderer, args);
          if (ret === false) {
            ret = prevRenderer.apply(renderer, args);
          }
          return ret;
        };
      };
      for (var prop in extension.renderer) {
        _loop(prop);
      }
      opts.renderer = renderer;
    }
    if (extension.tokenizer) {
      var tokenizer = marked.defaults.tokenizer || new Tokenizer_1();
      var _loop2 = function _loop2(_prop) {
        var prevTokenizer = tokenizer[_prop];
        tokenizer[_prop] = function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          var ret = extension.tokenizer[_prop].apply(tokenizer, args);
          if (ret === false) {
            ret = prevTokenizer.apply(tokenizer, args);
          }
          return ret;
        };
      };
      for (var _prop in extension.tokenizer) {
        _loop2(_prop);
      }
      opts.tokenizer = tokenizer;
    }
    if (extension.walkTokens) {
      var walkTokens = marked.defaults.walkTokens;
      opts.walkTokens = function (token) {
        extension.walkTokens(token);
        if (walkTokens) {
          walkTokens(token);
        }
      };
    }
    marked.setOptions(opts);
  };

  /**
   * Run callback for every token
   */

  marked.walkTokens = function (tokens, callback) {
    var _iterator = _createForOfIteratorHelper$2(tokens),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var token = _step.value;
        callback(token);
        switch (token.type) {
          case 'table':
            {
              var _iterator2 = _createForOfIteratorHelper$2(token.tokens.header),
                _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var cell = _step2.value;
                  marked.walkTokens(cell, callback);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              var _iterator3 = _createForOfIteratorHelper$2(token.tokens.cells),
                _step3;
              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var row = _step3.value;
                  var _iterator4 = _createForOfIteratorHelper$2(row),
                    _step4;
                  try {
                    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                      var _cell = _step4.value;
                      marked.walkTokens(_cell, callback);
                    }
                  } catch (err) {
                    _iterator4.e(err);
                  } finally {
                    _iterator4.f();
                  }
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
              break;
            }
          case 'list':
            {
              marked.walkTokens(token.items, callback);
              break;
            }
          default:
            {
              if (token.tokens) {
                marked.walkTokens(token.tokens, callback);
              }
            }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  /**
   * Parse Inline
   */
  marked.parseInline = function (src, opt) {
    // throw error in case of non string input
    if (typeof src === 'undefined' || src === null) {
      throw new Error('marked.parseInline(): input parameter is undefined or null');
    }
    if (typeof src !== 'string') {
      throw new Error('marked.parseInline(): input parameter is of type ' + Object.prototype.toString.call(src) + ', string expected');
    }
    opt = merge$2({}, marked.defaults, opt || {});
    checkSanitizeDeprecation$1(opt);
    try {
      var tokens = Lexer_1.lexInline(src, opt);
      if (opt.walkTokens) {
        marked.walkTokens(tokens, opt.walkTokens);
      }
      return Parser_1.parseInline(tokens, opt);
    } catch (e) {
      e.message += '\nPlease report this to https://github.com/markedjs/marked.';
      if (opt.silent) {
        return '<p>An error occurred:</p><pre>' + escape$2(e.message + '', true) + '</pre>';
      }
      throw e;
    }
  };

  /**
   * Expose
   */

  marked.Parser = Parser_1;
  marked.parser = Parser_1.parse;
  marked.Renderer = Renderer_1;
  marked.TextRenderer = TextRenderer_1;
  marked.Lexer = Lexer_1;
  marked.lexer = Lexer_1.lex;
  marked.Tokenizer = Tokenizer_1;
  marked.Slugger = Slugger_1;
  marked.parse = marked;
  var marked_1 = marked;

  function _callSuper$7(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$7() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$7() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$7 = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$5 = "src/components/shared/Modal.svelte";
  var get_header_slot_changes = function () {
    return {};
  };
  var get_header_slot_context = function () {
    return {};
  };
  function create_fragment$6(ctx) {
    var div0;
    var t0;
    var div3;
    var button;
    var t2;
    var div1;
    var div1_class_value;
    var t3;
    var div2;
    var div2_class_value;
    var div3_class_value;
    var current;
    var mounted;
    var dispose;
    var header_slot_template = /*#slots*/ctx[6].header;
    var header_slot = create_slot(header_slot_template, ctx, /*$$scope*/ctx[5], get_header_slot_context);
    var default_slot_template = /*#slots*/ctx[6].default;
    var default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ctx[5], null);
    var block = {
      c: function () {
        div0 = element("div");
        t0 = space();
        div3 = element("div");
        button = element("button");
        button.textContent = "X";
        t2 = space();
        div1 = element("div");
        if (header_slot) header_slot.c();
        t3 = space();
        div2 = element("div");
        if (default_slot) default_slot.c();
        attr_dev(div0, "class", "modal-background svelte-1avjlma");
        add_location(div0, file$5, 33, 0, 1108);
        attr_dev(button, "class", "close svelte-1avjlma");
        button.autofocus = true;
        add_location(button, file$5, 36, 4, 1254);
        attr_dev(div1, "class", div1_class_value = "header " + /*modalType*/ctx[0] + " " + /*modalAlign*/ctx[1] + " svelte-1avjlma");
        add_location(div1, file$5, 37, 4, 1318);
        attr_dev(div2, "class", div2_class_value = "content " + /*modalAlign*/ctx[1] + " svelte-1avjlma");
        add_location(div2, file$5, 40, 4, 1415);
        attr_dev(div3, "class", div3_class_value = "modal card " + /*modalType*/ctx[0] + " svelte-1avjlma");
        attr_dev(div3, "role", "dialog");
        attr_dev(div3, "aria-modal", "true");
        add_location(div3, file$5, 35, 0, 1163);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div0, anchor);
        insert_dev(target, t0, anchor);
        insert_dev(target, div3, anchor);
        append_dev(div3, button);
        append_dev(div3, t2);
        append_dev(div3, div1);
        if (header_slot) {
          header_slot.m(div1, null);
        }
        append_dev(div3, t3);
        append_dev(div3, div2);
        if (default_slot) {
          default_slot.m(div2, null);
        }

        /*div3_binding*/
        ctx[7](div3);
        current = true;
        button.focus();
        if (!mounted) {
          dispose = [listen_dev(window, "keydown", /*handle_keydown*/ctx[4], false, false, false, false), listen_dev(div0, "click", /*close*/ctx[3], false, false, false, false), listen_dev(button, "click", /*close*/ctx[3], false, false, false, false)];
          mounted = true;
        }
      },
      p: function (ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        if (header_slot) {
          if (header_slot.p && (!current || dirty & /*$$scope*/32)) {
            update_slot_base(header_slot, header_slot_template, ctx, /*$$scope*/ctx[5], !current ? get_all_dirty_from_scope(/*$$scope*/ctx[5]) : get_slot_changes(header_slot_template, /*$$scope*/ctx[5], dirty, get_header_slot_changes), get_header_slot_context);
          }
        }
        if (!current || dirty & /*modalType, modalAlign*/3 && div1_class_value !== (div1_class_value = "header " + /*modalType*/ctx[0] + " " + /*modalAlign*/ctx[1] + " svelte-1avjlma")) {
          attr_dev(div1, "class", div1_class_value);
        }
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/32)) {
            update_slot_base(default_slot, default_slot_template, ctx, /*$$scope*/ctx[5], !current ? get_all_dirty_from_scope(/*$$scope*/ctx[5]) : get_slot_changes(default_slot_template, /*$$scope*/ctx[5], dirty, null), null);
          }
        }
        if (!current || dirty & /*modalAlign*/2 && div2_class_value !== (div2_class_value = "content " + /*modalAlign*/ctx[1] + " svelte-1avjlma")) {
          attr_dev(div2, "class", div2_class_value);
        }
        if (!current || dirty & /*modalType*/1 && div3_class_value !== (div3_class_value = "modal card " + /*modalType*/ctx[0] + " svelte-1avjlma")) {
          attr_dev(div3, "class", div3_class_value);
        }
      },
      i: function (local) {
        if (current) return;
        transition_in(header_slot, local);
        transition_in(default_slot, local);
        current = true;
      },
      o: function (local) {
        transition_out(header_slot, local);
        transition_out(default_slot, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div0);
        if (detaching) detach_dev(t0);
        if (detaching) detach_dev(div3);
        if (header_slot) header_slot.d(detaching);
        if (default_slot) default_slot.d(detaching);
        /*div3_binding*/
        ctx[7](null);
        mounted = false;
        run_all(dispose);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$6.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$6($$self, $$props, $$invalidate) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('Modal', slots, ['header', 'default']);
    var dispatch = createEventDispatcher();
    var close = function () {
      return dispatch('close');
    };
    var _$$props$modalType = $$props.modalType,
      modalType = _$$props$modalType === void 0 ? "notification" : _$$props$modalType;
    var _$$props$modalAlign = $$props.modalAlign,
      modalAlign = _$$props$modalAlign === void 0 ? "center" : _$$props$modalAlign;
    var modal;
    var handle_keydown = function (e) {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key === 'Tab') {
        var nodes = modal.querySelectorAll('*');
        var tabbable = Array.from(nodes).filter(function (n) {
          return n.tabIndex >= 0;
        });
        var index = tabbable.indexOf(document.activeElement);
        if (index === -1 && e.shiftKey) index = 0;
        index += tabbable.length + (e.shiftKey ? -1 : 1);
        index %= tabbable.length;
        tabbable[index].focus();
        e.preventDefault();
      }
    };
    var previously_focused = typeof document !== 'undefined' && document.activeElement;
    if (previously_focused) {
      onDestroy(function () {
        previously_focused.focus();
      });
    }
    var writable_props = ['modalType', 'modalAlign'];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Modal> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$$set = function ($$props) {
      if ('modalType' in $$props) $$invalidate(0, modalType = $$props.modalType);
      if ('modalAlign' in $$props) $$invalidate(1, modalAlign = $$props.modalAlign);
      if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    };
    $$self.$capture_state = function () {
      return {
        createEventDispatcher: createEventDispatcher,
        onDestroy: onDestroy,
        dispatch: dispatch,
        close: close,
        modalType: modalType,
        modalAlign: modalAlign,
        modal: modal,
        handle_keydown: handle_keydown,
        previously_focused: previously_focused
      };
    };
    $$self.$inject_state = function ($$props) {
      if ('modalType' in $$props) $$invalidate(0, modalType = $$props.modalType);
      if ('modalAlign' in $$props) $$invalidate(1, modalAlign = $$props.modalAlign);
      if ('modal' in $$props) $$invalidate(2, modal = $$props.modal);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    return [modalType, modalAlign, modal, close, handle_keydown, $$scope, slots, function ($$value) {
      binding_callbacks[$$value ? 'unshift' : 'push'](function () {
        modal = $$value;
        $$invalidate(2, modal);
      });
    }];
  }
  var Modal = /*#__PURE__*/function (_SvelteComponentDev) {
    function Modal(options) {
      var _this;
      _classCallCheck(this, Modal);
      _this = _callSuper$7(this, Modal, [options]);
      init(_this, options, instance$6, create_fragment$6, safe_not_equal, {
        modalType: 0,
        modalAlign: 1
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "Modal",
        options: options,
        id: create_fragment$6.name
      });
      return _this;
    }
    _inherits(Modal, _SvelteComponentDev);
    return _createClass(Modal, [{
      key: "modalType",
      get: function () {
        throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "modalAlign",
      get: function () {
        throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }]);
  }(SvelteComponentDev);

  function scrollInto() {
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var marginTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var target = arguments.length > 2 ? arguments[2] : undefined;
    var behavior = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "smooth";
    var goTo;
    if (event != null) {
      goTo = event.target.getAttribute("goTo");
    } else {
      goTo = target;
    }
    try {
      var e = document.getElementById(goTo);
      var dims = e.getBoundingClientRect();
      window.scrollBy({
        top: dims.top - marginTop,
        behavior: behavior
      });
    } catch (e) {}
  }
  function jsonPretty(jsonString) {
    try {
      return JSON.stringify(JSON.parse(jsonString), null, 4);
    } catch (e) {
      return jsonString;
    }
  }
  function uuidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }
  function getTeamID() {
    var teamID = localStorage.getItem('_teamID');
    if (teamID) {
      return teamID;
    }
    teamID = uuidV4();
    localStorage.setItem('_teamID', teamID);
    return teamID;
  }
  function validateEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());
  }

  function _callSuper$8(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$8() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$8() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$8 = function _isNativeReflectConstruct() { return !!t; })(); }
  var Error_1$1 = globals.Error;
  var file$6 = "src/components/content/Newsletter.svelte";

  // (74:12) {#if showModal}
  function create_if_block$2(ctx) {
    var modal;
    var current;
    modal = new Modal({
      props: {
        modalType: /*modalType*/ctx[3],
        modalAlign: /*modalAlign*/ctx[4],
        $$slots: {
          header: [create_header_slot],
          default: [create_default_slot$3]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    modal.$on("close", /*close_handler*/ctx[7]);
    var block = {
      c: function () {
        create_component(modal.$$.fragment);
      },
      m: function (target, anchor) {
        mount_component(modal, target, anchor);
        current = true;
      },
      p: function (ctx, dirty) {
        var modal_changes = {};
        if (dirty & /*modalType*/8) modal_changes.modalType = /*modalType*/ctx[3];
        if (dirty & /*modalAlign*/16) modal_changes.modalAlign = /*modalAlign*/ctx[4];
        if (dirty & /*$$scope, modalHeader, modalContent*/4102) {
          modal_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        modal.$set(modal_changes);
      },
      i: function (local) {
        if (current) return;
        transition_in(modal.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(modal.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        destroy_component(modal, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block$2.name,
      type: "if",
      source: "(74:12) {#if showModal}",
      ctx: ctx
    });
    return block;
  }

  // (75:16) <Modal modalType={modalType} modalAlign={modalAlign} on:close="{() => showModal = false}">
  function create_default_slot$3(ctx) {
    var html_tag;
    var raw_value = marked_1(/*modalContent*/ctx[2]) + "";
    var html_anchor;
    var block = {
      c: function () {
        html_tag = new HtmlTag(false);
        html_anchor = empty();
        html_tag.a = html_anchor;
      },
      m: function (target, anchor) {
        html_tag.m(raw_value, target, anchor);
        insert_dev(target, html_anchor, anchor);
      },
      p: function (ctx, dirty) {
        if (dirty & /*modalContent*/4 && raw_value !== (raw_value = marked_1(/*modalContent*/ctx[2]) + "")) html_tag.p(raw_value);
      },
      d: function (detaching) {
        if (detaching) detach_dev(html_anchor);
        if (detaching) html_tag.d();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot$3.name,
      type: "slot",
      source: "(75:16) <Modal modalType={modalType} modalAlign={modalAlign} on:close=\\\"{() => showModal = false}\\\">",
      ctx: ctx
    });
    return block;
  }

  // (76:20) 
  function create_header_slot(ctx) {
    var div;
    var t;
    var block = {
      c: function () {
        div = element("div");
        t = text(/*modalHeader*/ctx[1]);
        attr_dev(div, "slot", "header");
        add_location(div, file$6, 75, 20, 2227);
      },
      m: function (target, anchor) {
        insert_dev(target, div, anchor);
        append_dev(div, t);
      },
      p: function (ctx, dirty) {
        if (dirty & /*modalHeader*/2) set_data_dev(t, /*modalHeader*/ctx[1]);
      },
      d: function (detaching) {
        if (detaching) detach_dev(div);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_header_slot.name,
      type: "slot",
      source: "(76:20) ",
      ctx: ctx
    });
    return block;
  }
  function create_fragment$7(ctx) {
    var footer;
    var div5;
    var div0;
    var t0;
    var div2;
    var div1;
    var h4;
    var t2;
    var p;
    var t4;
    var div4;
    var div3;
    var input;
    var t5;
    var button;
    var t7;
    var br;
    var current;
    var mounted;
    var dispose;
    var if_block = /*showModal*/ctx[5] && create_if_block$2(ctx);
    var block = {
      c: function () {
        footer = element("footer");
        div5 = element("div");
        div0 = element("div");
        if (if_block) if_block.c();
        t0 = space();
        div2 = element("div");
        div1 = element("div");
        h4 = element("h4");
        h4.textContent = "Join our mailing list";
        t2 = space();
        p = element("p");
        p.textContent = "Keep up with the latest things Cakcuk!";
        t4 = space();
        div4 = element("div");
        div3 = element("div");
        input = element("input");
        t5 = space();
        button = element("button");
        button.textContent = "Subscribe";
        t7 = space();
        br = element("br");
        attr_dev(div0, "class", "pure-u-1");
        add_location(div0, file$6, 72, 8, 2049);
        add_location(h4, file$6, 84, 16, 2517);
        add_location(p, file$6, 85, 16, 2564);
        attr_dev(div1, "class", "sub-header svelte-b9n6z");
        add_location(div1, file$6, 83, 12, 2476);
        attr_dev(div2, "class", "pure-u-1 pure-u-md-1-2");
        add_location(div2, file$6, 82, 8, 2427);
        attr_dev(input, "type", "email");
        attr_dev(input, "placeholder", "your.email@example.com");
        attr_dev(input, "class", "svelte-b9n6z");
        add_location(input, file$6, 90, 16, 2751);
        attr_dev(button, "type", "submit");
        attr_dev(button, "class", "pure-button pure-button-primary success svelte-b9n6z");
        add_location(button, file$6, 91, 16, 2849);
        attr_dev(div3, "class", "sub-header form-rss svelte-b9n6z");
        add_location(div3, file$6, 89, 12, 2701);
        attr_dev(div4, "class", "pure-u-1 pure-u-md-1-2");
        add_location(div4, file$6, 88, 8, 2652);
        attr_dev(div5, "class", "pure-g container svelte-b9n6z");
        add_location(div5, file$6, 71, 4, 2010);
        add_location(br, file$6, 95, 4, 3013);
        attr_dev(footer, "class", "bg svelte-b9n6z");
        add_location(footer, file$6, 70, 0, 1986);
      },
      l: function () {
        throw new Error_1$1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, footer, anchor);
        append_dev(footer, div5);
        append_dev(div5, div0);
        if (if_block) if_block.m(div0, null);
        append_dev(div5, t0);
        append_dev(div5, div2);
        append_dev(div2, div1);
        append_dev(div1, h4);
        append_dev(div1, t2);
        append_dev(div1, p);
        append_dev(div5, t4);
        append_dev(div5, div4);
        append_dev(div4, div3);
        append_dev(div3, input);
        set_input_value(input, /*userEmail*/ctx[0]);
        append_dev(div3, t5);
        append_dev(div3, button);
        append_dev(footer, t7);
        append_dev(footer, br);
        current = true;
        if (!mounted) {
          dispose = [listen_dev(input, "input", /*input_input_handler*/ctx[8]), listen_dev(button, "click", /*clickSubscribe*/ctx[6], false, false, false, false)];
          mounted = true;
        }
      },
      p: function (ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        if (/*showModal*/ctx[5]) {
          if (if_block) {
            if_block.p(ctx, dirty);
            if (dirty & /*showModal*/32) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block$2(ctx);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(div0, null);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, function () {
            if_block = null;
          });
          check_outros();
        }
        if (dirty & /*userEmail*/1 && input.value !== /*userEmail*/ctx[0]) {
          set_input_value(input, /*userEmail*/ctx[0]);
        }
      },
      i: function () {
        if (current) return;
        transition_in(if_block);
        current = true;
      },
      o: function () {
        transition_out(if_block);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(footer);
        if (if_block) if_block.d();
        mounted = false;
        run_all(dispose);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$7.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$7($$self, $$props, $$invalidate) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('Newsletter', slots, []);
    var userEmail = "";
    var modalHeader = "info large";
    var modalContent = "info large";
    var modalType = "info large";
    var modalAlign = "center";
    var showModal = false;
    function clickSubscribe() {
      $$invalidate(3, modalType = "info large");
      $$invalidate(4, modalAlign = "center");
      $$invalidate(5, showModal = true);
      if (!validateEmail(userEmail)) {
        showAlert("Please input a valid email!");
        return;
      }
      var successMsg = "<i>" + userEmail + "</i>," + "<p>Thank you for your subscribtion!<p>";
      try {
        postSubscribe(userEmail);
      } catch (error) {} // TODO:

      showSuccess(successMsg);
      $$invalidate(0, userEmail = "");
    }
    function postSubscribe() {
      return _postSubscribe.apply(this, arguments);
    }
    function _postSubscribe() {
      _postSubscribe = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee(email) {
        var url, params, res, json;
        return regenerator.wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              url = new URL('/api/subscribe', location);
              params = {
                email: email
              };
              url.search = new URLSearchParams(params).toString();
              _context.next = 5;
              return window.fetch(url, {
                headers: {
                  'Accept-Encoding': 'gzip, deflate, br',
                  'x-request-id': uuidV4()
                }
              });
            case 5:
              res = _context.sent;
              _context.next = 8;
              return res.json();
            case 8:
              json = _context.sent;
              if (!(json.error && json.error.message)) {
                _context.next = 11;
                break;
              }
              throw new Error(json.error.message);
            case 11:
              return _context.abrupt("return", json);
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return _postSubscribe.apply(this, arguments);
    }
    function showSuccess(content) {
      $$invalidate(1, modalHeader = "Subscribtion Success");
      $$invalidate(3, modalType = "info small");
      $$invalidate(4, modalAlign = "center");
      $$invalidate(5, showModal = true);
      $$invalidate(2, modalContent = content);
    }
    function showAlert(content) {
      $$invalidate(1, modalHeader = "Alert");
      $$invalidate(3, modalType = "alert small");
      $$invalidate(4, modalAlign = "center");
      $$invalidate(5, showModal = true);
      $$invalidate(2, modalContent = content);
    }
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Newsletter> was created with unknown prop '".concat(key, "'"));
    });
    function input_input_handler() {
      userEmail = this.value;
      $$invalidate(0, userEmail);
    }
    $$self.$capture_state = function () {
      return {
        marked: marked_1,
        Modal: Modal,
        validateEmail: validateEmail,
        uuidV4: uuidV4,
        userEmail: userEmail,
        modalHeader: modalHeader,
        modalContent: modalContent,
        modalType: modalType,
        modalAlign: modalAlign,
        showModal: showModal,
        clickSubscribe: clickSubscribe,
        postSubscribe: postSubscribe,
        showSuccess: showSuccess,
        showAlert: showAlert
      };
    };
    $$self.$inject_state = function ($$props) {
      if ('userEmail' in $$props) $$invalidate(0, userEmail = $$props.userEmail);
      if ('modalHeader' in $$props) $$invalidate(1, modalHeader = $$props.modalHeader);
      if ('modalContent' in $$props) $$invalidate(2, modalContent = $$props.modalContent);
      if ('modalType' in $$props) $$invalidate(3, modalType = $$props.modalType);
      if ('modalAlign' in $$props) $$invalidate(4, modalAlign = $$props.modalAlign);
      if ('showModal' in $$props) $$invalidate(5, showModal = $$props.showModal);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    return [userEmail, modalHeader, modalContent, modalType, modalAlign, showModal, clickSubscribe, function () {
      return $$invalidate(5, showModal = false);
    }, input_input_handler];
  }
  var Newsletter = /*#__PURE__*/function (_SvelteComponentDev) {
    function Newsletter(options) {
      var _this;
      _classCallCheck(this, Newsletter);
      _this = _callSuper$8(this, Newsletter, [options]);
      init(_this, options, instance$7, create_fragment$7, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "Newsletter",
        options: options,
        id: create_fragment$7.name
      });
      return _this;
    }
    _inherits(Newsletter, _SvelteComponentDev);
    return _createClass(Newsletter);
  }(SvelteComponentDev);

  function _callSuper$9(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$9() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$9() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$9 = function _isNativeReflectConstruct() { return !!t; })(); }
  var Error_1$2 = globals.Error;
  var file$7 = "src/components/shared/PlayEditor.svelte";
  function get_each_context(ctx, list, i) {
    var child_ctx = ctx.slice();
    child_ctx[50] = list[i];
    return child_ctx;
  }
  function get_each_context_1(ctx, list, i) {
    var child_ctx = ctx.slice();
    child_ctx[53] = list[i];
    return child_ctx;
  }

  // (260:8) {#if showModal}
  function create_if_block_1$1(ctx) {
    var modal;
    var current;
    modal = new Modal({
      props: {
        modalType: /*modalType*/ctx[7],
        modalAlign: /*modalAlign*/ctx[8],
        $$slots: {
          header: [create_header_slot$1],
          default: [create_default_slot$4]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    modal.$on("close", /*close_handler*/ctx[33]);
    var block = {
      c: function () {
        create_component(modal.$$.fragment);
      },
      m: function (target, anchor) {
        mount_component(modal, target, anchor);
        current = true;
      },
      p: function (ctx, dirty) {
        var modal_changes = {};
        if (dirty[0] & /*modalType*/128) modal_changes.modalType = /*modalType*/ctx[7];
        if (dirty[0] & /*modalAlign*/256) modal_changes.modalAlign = /*modalAlign*/ctx[8];
        if (dirty[0] & /*modalHeader, modalContent*/3072 | dirty[1] & /*$$scope*/33554432) {
          modal_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        modal.$set(modal_changes);
      },
      i: function (local) {
        if (current) return;
        transition_in(modal.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(modal.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        destroy_component(modal, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block_1$1.name,
      type: "if",
      source: "(260:8) {#if showModal}",
      ctx: ctx
    });
    return block;
  }

  // (261:12) <Modal modalType={modalType} modalAlign={modalAlign} on:close="{() => showModal = false}">
  function create_default_slot$4(ctx) {
    var html_tag;
    var raw_value = marked_1(/*modalContent*/ctx[11]) + "";
    var html_anchor;
    var block = {
      c: function () {
        html_tag = new HtmlTag(false);
        html_anchor = empty();
        html_tag.a = html_anchor;
      },
      m: function (target, anchor) {
        html_tag.m(raw_value, target, anchor);
        insert_dev(target, html_anchor, anchor);
      },
      p: function (ctx, dirty) {
        if (dirty[0] & /*modalContent*/2048 && raw_value !== (raw_value = marked_1(/*modalContent*/ctx[11]) + "")) html_tag.p(raw_value);
      },
      d: function (detaching) {
        if (detaching) detach_dev(html_anchor);
        if (detaching) html_tag.d();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot$4.name,
      type: "slot",
      source: "(261:12) <Modal modalType={modalType} modalAlign={modalAlign} on:close=\\\"{() => showModal = false}\\\">",
      ctx: ctx
    });
    return block;
  }

  // (262:16) 
  function create_header_slot$1(ctx) {
    var div;
    var t;
    var block = {
      c: function () {
        div = element("div");
        t = text(/*modalHeader*/ctx[10]);
        attr_dev(div, "slot", "header");
        add_location(div, file$7, 261, 16, 8692);
      },
      m: function (target, anchor) {
        insert_dev(target, div, anchor);
        append_dev(div, t);
      },
      p: function (ctx, dirty) {
        if (dirty[0] & /*modalHeader*/1024) set_data_dev(t, /*modalHeader*/ctx[10]);
      },
      d: function (detaching) {
        if (detaching) detach_dev(div);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_header_slot$1.name,
      type: "slot",
      source: "(262:16) ",
      ctx: ctx
    });
    return block;
  }

  // (325:4) {#if examples.length > 0}
  function create_if_block$3(ctx) {
    var div1;
    var h4;
    var t0;
    var h4_class_value;
    var t1;
    var br0;
    var t2;
    var div0;
    var div0_class_value;
    var t3;
    var br1;
    var t4;
    var br2;
    var each_value = /*examples*/ctx[3];
    validate_each_argument(each_value);
    var each_blocks = [];
    for (var i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    }
    var block = {
      c: function () {
        div1 = element("div");
        h4 = element("h4");
        t0 = text("- Snippet Examples -");
        t1 = space();
        br0 = element("br");
        t2 = space();
        div0 = element("div");
        for (var _i = 0; _i < each_blocks.length; _i += 1) {
          each_blocks[_i].c();
        }
        t3 = space();
        br1 = element("br");
        t4 = space();
        br2 = element("br");
        attr_dev(h4, "class", h4_class_value = "sub-header " + /*textColor*/ctx[17] + " " + /*editorType*/ctx[4] + " svelte-1khva34");
        add_location(h4, file$7, 326, 8, 12528);
        add_location(br0, file$7, 327, 8, 12610);
        attr_dev(div0, "class", div0_class_value = "tabs " + /*editorType*/ctx[4] + " svelte-1khva34");
        add_location(div0, file$7, 328, 8, 12623);
        attr_dev(div1, "class", "pure-u-1 pure-u-md-1-1 padding-side padding-bottom svelte-1khva34");
        add_location(div1, file$7, 325, 4, 12455);
        add_location(br1, file$7, 350, 4, 13835);
        add_location(br2, file$7, 351, 4, 13844);
      },
      m: function (target, anchor) {
        insert_dev(target, div1, anchor);
        append_dev(div1, h4);
        append_dev(h4, t0);
        append_dev(div1, t1);
        append_dev(div1, br0);
        append_dev(div1, t2);
        append_dev(div1, div0);
        for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
          if (each_blocks[_i2]) {
            each_blocks[_i2].m(div0, null);
          }
        }
        insert_dev(target, t3, anchor);
        insert_dev(target, br1, anchor);
        insert_dev(target, t4, anchor);
        insert_dev(target, br2, anchor);
      },
      p: function (ctx, dirty) {
        if (dirty[0] & /*textColor, editorType*/131088 && h4_class_value !== (h4_class_value = "sub-header " + /*textColor*/ctx[17] + " " + /*editorType*/ctx[4] + " svelte-1khva34")) {
          attr_dev(h4, "class", h4_class_value);
        }
        if (dirty[0] & /*examples, tabChecked, clickInfo, editorID, scroll, clickApply, editorType*/29622328) {
          each_value = /*examples*/ctx[3];
          validate_each_argument(each_value);
          var _i3;
          for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
            var child_ctx = get_each_context(ctx, each_value, _i3);
            if (each_blocks[_i3]) {
              each_blocks[_i3].p(child_ctx, dirty);
            } else {
              each_blocks[_i3] = create_each_block(child_ctx);
              each_blocks[_i3].c();
              each_blocks[_i3].m(div0, null);
            }
          }
          for (; _i3 < each_blocks.length; _i3 += 1) {
            each_blocks[_i3].d(1);
          }
          each_blocks.length = each_value.length;
        }
        if (dirty[0] & /*editorType*/16 && div0_class_value !== (div0_class_value = "tabs " + /*editorType*/ctx[4] + " svelte-1khva34")) {
          attr_dev(div0, "class", div0_class_value);
        }
      },
      d: function (detaching) {
        if (detaching) detach_dev(div1);
        destroy_each(each_blocks, detaching);
        if (detaching) detach_dev(t3);
        if (detaching) detach_dev(br1);
        if (detaching) detach_dev(t4);
        if (detaching) detach_dev(br2);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_if_block$3.name,
      type: "if",
      source: "(325:4) {#if examples.length > 0}",
      ctx: ctx
    });
    return block;
  }

  // (334:20) {#each list.examples as example}
  function create_each_block_1(ctx) {
    var div;
    var span0;
    var t0_value = /*example*/ctx[53].title + "";
    var t0;
    var t1;
    var span1;
    var button0;
    var t2;
    var button0_title_value;
    var button0_text_value;
    var t3;
    var button1;
    var t4;
    var button1_title_value;
    var button1_text_value;
    var div_class_value;
    var mounted;
    var dispose;
    var block = {
      c: function () {
        div = element("div");
        span0 = element("span");
        t0 = text(t0_value);
        t1 = space();
        span1 = element("span");
        button0 = element("button");
        t2 = text("Apply");
        t3 = space();
        button1 = element("button");
        t4 = text("Info");
        attr_dev(span0, "class", "sub-tab svelte-1khva34");
        add_location(span0, file$7, 335, 28, 13055);
        attr_dev(button0, "class", "button-xsmall pure-button button-success svelte-1khva34");
        attr_dev(button0, "title", button0_title_value = /*example*/ctx[53].title);
        attr_dev(button0, "text", button0_text_value = /*example*/ctx[53].syntaxt);
        attr_dev(button0, "goto", /*editorID*/ctx[18]);
        add_location(button0, file$7, 339, 32, 13248);
        attr_dev(button1, "class", "button-xsmall pure-button button-warning svelte-1khva34");
        attr_dev(button1, "title", button1_title_value = /*example*/ctx[53].title);
        attr_dev(button1, "text", button1_text_value = /*example*/ctx[53].info);
        add_location(button1, file$7, 341, 32, 13495);
        attr_dev(span1, "class", "sub-button svelte-1khva34");
        add_location(span1, file$7, 338, 28, 13190);
        attr_dev(div, "class", div_class_value = "tab-content " + /*tabChecked*/ctx[5] + " svelte-1khva34");
        add_location(div, file$7, 334, 24, 12988);
      },
      m: function (target, anchor) {
        insert_dev(target, div, anchor);
        append_dev(div, span0);
        append_dev(span0, t0);
        append_dev(div, t1);
        append_dev(div, span1);
        append_dev(span1, button0);
        append_dev(button0, t2);
        append_dev(span1, t3);
        append_dev(span1, button1);
        append_dev(button1, t4);
        if (!mounted) {
          dispose = [listen_dev(button0, "click", /*scroll*/ctx[24], false, false, false, false), listen_dev(button0, "click", /*clickApply*/ctx[22], false, false, false, false), listen_dev(button1, "click", /*clickInfo*/ctx[23], false, false, false, false)];
          mounted = true;
        }
      },
      p: function (ctx, dirty) {
        if (dirty[0] & /*examples*/8 && t0_value !== (t0_value = /*example*/ctx[53].title + "")) set_data_dev(t0, t0_value);
        if (dirty[0] & /*examples*/8 && button0_title_value !== (button0_title_value = /*example*/ctx[53].title)) {
          attr_dev(button0, "title", button0_title_value);
        }
        if (dirty[0] & /*examples*/8 && button0_text_value !== (button0_text_value = /*example*/ctx[53].syntaxt)) {
          attr_dev(button0, "text", button0_text_value);
        }
        if (dirty[0] & /*examples*/8 && button1_title_value !== (button1_title_value = /*example*/ctx[53].title)) {
          attr_dev(button1, "title", button1_title_value);
        }
        if (dirty[0] & /*examples*/8 && button1_text_value !== (button1_text_value = /*example*/ctx[53].info)) {
          attr_dev(button1, "text", button1_text_value);
        }
        if (dirty[0] & /*tabChecked*/32 && div_class_value !== (div_class_value = "tab-content " + /*tabChecked*/ctx[5] + " svelte-1khva34")) {
          attr_dev(div, "class", div_class_value);
        }
      },
      d: function (detaching) {
        if (detaching) detach_dev(div);
        mounted = false;
        run_all(dispose);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_each_block_1.name,
      type: "each",
      source: "(334:20) {#each list.examples as example}",
      ctx: ctx
    });
    return block;
  }

  // (330:12) {#each examples as list}
  function create_each_block(ctx) {
    var div;
    var input;
    var input_id_value;
    var t0;
    var label;
    var t1_value = /*list*/ctx[50].key + "";
    var t1;
    var label_class_value;
    var label_for_value;
    var t2;
    var t3;
    var each_value_1 = /*list*/ctx[50].examples;
    validate_each_argument(each_value_1);
    var each_blocks = [];
    for (var i = 0; i < each_value_1.length; i += 1) {
      each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    }
    var block = {
      c: function () {
        div = element("div");
        input = element("input");
        t0 = space();
        label = element("label");
        t1 = text(t1_value);
        t2 = space();
        for (var _i4 = 0; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].c();
        }
        t3 = space();
        attr_dev(input, "type", "checkbox");
        attr_dev(input, "id", input_id_value = /*list*/ctx[50].key);
        attr_dev(input, "class", "tab-input svelte-1khva34");
        add_location(input, file$7, 331, 20, 12746);
        attr_dev(label, "class", label_class_value = "tab-label " + /*editorType*/ctx[4] + " " + /*tabChecked*/ctx[5] + " svelte-1khva34");
        attr_dev(label, "for", label_for_value = /*list*/ctx[50].key);
        add_location(label, file$7, 332, 20, 12824);
        attr_dev(div, "class", "tab svelte-1khva34");
        add_location(div, file$7, 330, 16, 12708);
      },
      m: function (target, anchor) {
        insert_dev(target, div, anchor);
        append_dev(div, input);
        append_dev(div, t0);
        append_dev(div, label);
        append_dev(label, t1);
        append_dev(div, t2);
        for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
          if (each_blocks[_i5]) {
            each_blocks[_i5].m(div, null);
          }
        }
        append_dev(div, t3);
      },
      p: function (ctx, dirty) {
        if (dirty[0] & /*examples*/8 && input_id_value !== (input_id_value = /*list*/ctx[50].key)) {
          attr_dev(input, "id", input_id_value);
        }
        if (dirty[0] & /*examples*/8 && t1_value !== (t1_value = /*list*/ctx[50].key + "")) set_data_dev(t1, t1_value);
        if (dirty[0] & /*editorType, tabChecked*/48 && label_class_value !== (label_class_value = "tab-label " + /*editorType*/ctx[4] + " " + /*tabChecked*/ctx[5] + " svelte-1khva34")) {
          attr_dev(label, "class", label_class_value);
        }
        if (dirty[0] & /*examples*/8 && label_for_value !== (label_for_value = /*list*/ctx[50].key)) {
          attr_dev(label, "for", label_for_value);
        }
        if (dirty[0] & /*tabChecked, examples, clickInfo, editorID, scroll, clickApply*/29622312) {
          each_value_1 = /*list*/ctx[50].examples;
          validate_each_argument(each_value_1);
          var _i6;
          for (_i6 = 0; _i6 < each_value_1.length; _i6 += 1) {
            var child_ctx = get_each_context_1(ctx, each_value_1, _i6);
            if (each_blocks[_i6]) {
              each_blocks[_i6].p(child_ctx, dirty);
            } else {
              each_blocks[_i6] = create_each_block_1(child_ctx);
              each_blocks[_i6].c();
              each_blocks[_i6].m(div, t3);
            }
          }
          for (; _i6 < each_blocks.length; _i6 += 1) {
            each_blocks[_i6].d(1);
          }
          each_blocks.length = each_value_1.length;
        }
      },
      d: function (detaching) {
        if (detaching) detach_dev(div);
        destroy_each(each_blocks, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_each_block.name,
      type: "each",
      source: "(330:12) {#each examples as list}",
      ctx: ctx
    });
    return block;
  }
  function create_fragment$8(ctx) {
    var div16;
    var div0;
    var t0;
    var div15;
    var div14;
    var div13;
    var div4;
    var div3;
    var div2;
    var a0;
    var t1;
    var a0_class_value;
    var t2;
    var a1;
    var t3;
    var a1_class_value;
    var t4;
    var a2;
    var t5;
    var a2_class_value;
    var t6;
    var div1;
    var t7;
    var div1_class_value;
    var t8;
    var textarea0;
    var textarea0_class_value;
    var div4_class_value;
    var t9;
    var div9;
    var div8;
    var div7;
    var div5;
    var t10;
    var div5_class_value;
    var t11;
    var div6;
    var t12;
    var div6_class_value;
    var t13;
    var textarea1;
    var textarea1_class_value;
    var div9_class_value;
    var t14;
    var div12;
    var span0;
    var t15;
    var span0_class_value;
    var t16;
    var label;
    var input;
    var t17;
    var div10;
    var t18;
    var span1;
    var t19;
    var span1_class_value;
    var t20;
    var div11;
    var t21;
    var div11_class_value;
    var div12_class_value;
    var div14_class_value;
    var t22;
    var current;
    var mounted;
    var dispose;
    var if_block0 = /*showModal*/ctx[9] && create_if_block_1$1(ctx);
    var if_block1 = /*examples*/ctx[3].length > 0 && create_if_block$3(ctx);
    var block = {
      c: function () {
        div16 = element("div");
        div0 = element("div");
        if (if_block0) if_block0.c();
        t0 = space();
        div15 = element("div");
        div14 = element("div");
        div13 = element("div");
        div4 = element("div");
        div3 = element("div");
        div2 = element("div");
        a0 = element("a");
        t1 = text("Command");
        t2 = space();
        a1 = element("a");
        t3 = text("Preview");
        t4 = space();
        a2 = element("a");
        t5 = text("Request");
        t6 = space();
        div1 = element("div");
        t7 = text("Run");
        t8 = space();
        textarea0 = element("textarea");
        t9 = space();
        div9 = element("div");
        div8 = element("div");
        div7 = element("div");
        div5 = element("div");
        t10 = text("Result");
        t11 = space();
        div6 = element("div");
        t12 = text("Response");
        t13 = space();
        textarea1 = element("textarea");
        t14 = space();
        div12 = element("div");
        span0 = element("span");
        t15 = text("Command");
        t16 = space();
        label = element("label");
        input = element("input");
        t17 = space();
        div10 = element("div");
        t18 = space();
        span1 = element("span");
        t19 = text("Result");
        t20 = space();
        div11 = element("div");
        t21 = text("Run");
        t22 = space();
        if (if_block1) if_block1.c();
        attr_dev(div0, "class", "pure-u-1");
        add_location(div0, file$7, 258, 4, 8526);
        attr_dev(a0, "class", a0_class_value = "toggleButton " + /*editorType*/ctx[4] + " svelte-1khva34");
        toggle_class(a0, "active", /*editorCommandView*/ctx[1] === 'command');
        add_location(a0, file$7, 274, 28, 9276);
        attr_dev(a1, "class", a1_class_value = "toggleButton " + /*editorType*/ctx[4] + " svelte-1khva34");
        toggle_class(a1, "active", /*editorCommandView*/ctx[1] === 'preview');
        add_location(a1, file$7, 278, 28, 9570);
        attr_dev(a2, "class", a2_class_value = "toggleButton " + /*editorType*/ctx[4] + " svelte-1khva34");
        toggle_class(a2, "active", /*editorCommandView*/ctx[1] === 'request');
        add_location(a2, file$7, 282, 28, 9864);
        attr_dev(div1, "class", div1_class_value = "toggleButton " + /*editorType*/ctx[4] + " run-button hidden-phone" + " svelte-1khva34");
        add_location(div1, file$7, 286, 28, 10158);
        attr_dev(div2, "class", "header-editor svelte-1khva34");
        set_style(div2, "float", "left");
        set_style(div2, "background", "#efe9e9");
        set_style(div2, "width", "100%");
        add_location(div2, file$7, 273, 24, 9165);
        attr_dev(textarea0, "class", textarea0_class_value = "panel left " + /*editorType*/ctx[4] + " svelte-1khva34");
        attr_dev(textarea0, "placeholder", "Place your command here..");
        textarea0.disabled = /*editorCommandAreaDisabled*/ctx[13];
        add_location(textarea0, file$7, 290, 24, 10368);
        attr_dev(div3, "class", "svelte-1khva34");
        add_location(div3, file$7, 272, 20, 9135);
        attr_dev(div4, "id", "command-view");
        attr_dev(div4, "class", div4_class_value = "pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-1 pure-u-1 " + /*isHiddenCommandEditor*/ctx[15] + " svelte-1khva34");
        add_location(div4, file$7, 271, 16, 9011);
        attr_dev(div5, "class", div5_class_value = "toggleButton " + /*editorType*/ctx[4] + " svelte-1khva34");
        toggle_class(div5, "active", /*editorResultView*/ctx[2] === 'result');
        add_location(div5, file$7, 297, 28, 10870);
        attr_dev(div6, "class", div6_class_value = "toggleButton " + /*editorType*/ctx[4] + " svelte-1khva34");
        toggle_class(div6, "active", /*editorResultView*/ctx[2] === 'response');
        add_location(div6, file$7, 301, 28, 11163);
        attr_dev(div7, "class", "header-editor svelte-1khva34");
        set_style(div7, "float", "left");
        set_style(div7, "background", "#efe9e9");
        set_style(div7, "width", "100%");
        add_location(div7, file$7, 296, 24, 10759);
        attr_dev(textarea1, "class", textarea1_class_value = "panel right " + /*editorType*/ctx[4] + " svelte-1khva34");
        attr_dev(textarea1, "placeholder", "Command result..");
        textarea1.disabled = true;
        add_location(textarea1, file$7, 306, 24, 11489);
        attr_dev(div8, "class", "svelte-1khva34");
        add_location(div8, file$7, 295, 20, 10729);
        attr_dev(div9, "class", div9_class_value = "pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-1 pure-u-1 " + /*isHiddenResultEditor*/ctx[16] + " svelte-1khva34");
        add_location(div9, file$7, 294, 16, 10624);
        attr_dev(span0, "class", span0_class_value = "switch-text " + /*background*/ctx[6] + " " + /*editorType*/ctx[4] + " svelte-1khva34");
        add_location(span0, file$7, 311, 20, 11831);
        attr_dev(input, "type", "checkbox");
        attr_dev(input, "class", "svelte-1khva34");
        add_location(input, file$7, 313, 24, 11965);
        attr_dev(div10, "class", "svelte-1khva34");
        add_location(div10, file$7, 314, 24, 12073);
        attr_dev(label, "class", "switch svelte-1khva34");
        add_location(label, file$7, 312, 20, 11918);
        attr_dev(span1, "class", span1_class_value = "switch-text " + /*background*/ctx[6] + " " + /*editorType*/ctx[4] + " svelte-1khva34");
        add_location(span1, file$7, 316, 20, 12134);
        attr_dev(div11, "class", div11_class_value = "toggleButton " + /*editorType*/ctx[4] + " run-button bottom" + " svelte-1khva34");
        add_location(div11, file$7, 317, 20, 12220);
        attr_dev(div12, "class", div12_class_value = "pure-u-1 pure-u-md-1-1 only-phone " + /*background*/ctx[6] + " text-center" + " svelte-1khva34");
        set_style(div12, "margin-bottom", "6px");
        add_location(div12, file$7, 310, 16, 11710);
        attr_dev(div13, "class", "pure-g svelte-1khva34");
        add_location(div13, file$7, 270, 12, 8974);
        attr_dev(div14, "id", /*editorID*/ctx[18]);
        attr_dev(div14, "class", div14_class_value = "play-panel padding-side " + /*editorType*/ctx[4] + " svelte-1khva34");
        add_location(div14, file$7, 269, 8, 8895);
        attr_dev(div15, "class", "pure-u-1");
        add_location(div15, file$7, 268, 4, 8864);
        attr_dev(div16, "class", "pure-g container svelte-1khva34");
        add_location(div16, file$7, 257, 0, 8491);
      },
      l: function () {
        throw new Error_1$2("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div16, anchor);
        append_dev(div16, div0);
        if (if_block0) if_block0.m(div0, null);
        append_dev(div16, t0);
        append_dev(div16, div15);
        append_dev(div15, div14);
        append_dev(div14, div13);
        append_dev(div13, div4);
        append_dev(div4, div3);
        append_dev(div3, div2);
        append_dev(div2, a0);
        append_dev(a0, t1);
        append_dev(div2, t2);
        append_dev(div2, a1);
        append_dev(a1, t3);
        append_dev(div2, t4);
        append_dev(div2, a2);
        append_dev(a2, t5);
        append_dev(div2, t6);
        append_dev(div2, div1);
        append_dev(div1, t7);
        append_dev(div3, t8);
        append_dev(div3, textarea0);
        set_input_value(textarea0, /*editorCommandArea*/ctx[0]);
        append_dev(div13, t9);
        append_dev(div13, div9);
        append_dev(div9, div8);
        append_dev(div8, div7);
        append_dev(div7, div5);
        append_dev(div5, t10);
        append_dev(div7, t11);
        append_dev(div7, div6);
        append_dev(div6, t12);
        append_dev(div8, t13);
        append_dev(div8, textarea1);
        set_input_value(textarea1, /*editorResultArea*/ctx[14]);
        append_dev(div13, t14);
        append_dev(div13, div12);
        append_dev(div12, span0);
        append_dev(span0, t15);
        append_dev(div12, t16);
        append_dev(div12, label);
        append_dev(label, input);
        input.checked = /*checkedEditorValue*/ctx[12];
        append_dev(label, t17);
        append_dev(label, div10);
        append_dev(div12, t18);
        append_dev(div12, span1);
        append_dev(span1, t19);
        append_dev(div12, t20);
        append_dev(div12, div11);
        append_dev(div11, t21);
        append_dev(div16, t22);
        if (if_block1) if_block1.m(div16, null);
        current = true;
        if (!mounted) {
          dispose = [listen_dev(a0, "click", /*click_handler*/ctx[34], false, false, false, false), listen_dev(a0, "click", /*setEditorView*/ctx[20], false, false, false, false), listen_dev(a1, "click", /*click_handler_1*/ctx[35], false, false, false, false), listen_dev(a1, "click", /*setEditorView*/ctx[20], false, false, false, false), listen_dev(a2, "click", /*click_handler_2*/ctx[36], false, false, false, false), listen_dev(a2, "click", /*setEditorView*/ctx[20], false, false, false, false), listen_dev(div1, "click", /*clickRun*/ctx[21], false, false, false, false), listen_dev(textarea0, "input", /*textarea0_input_handler*/ctx[37]), listen_dev(div5, "click", /*click_handler_3*/ctx[38], false, false, false, false), listen_dev(div5, "click", /*setEditorView*/ctx[20], false, false, false, false), listen_dev(div6, "click", /*click_handler_4*/ctx[39], false, false, false, false), listen_dev(div6, "click", /*setEditorView*/ctx[20], false, false, false, false), listen_dev(textarea1, "input", /*textarea1_input_handler*/ctx[40]), listen_dev(input, "click", /*switchEditor*/ctx[19], false, false, false, false), listen_dev(input, "change", /*input_change_handler*/ctx[41]), listen_dev(div11, "click", /*clickRun*/ctx[21], false, false, false, false)];
          mounted = true;
        }
      },
      p: function (ctx, dirty) {
        if (/*showModal*/ctx[9]) {
          if (if_block0) {
            if_block0.p(ctx, dirty);
            if (dirty[0] & /*showModal*/512) {
              transition_in(if_block0, 1);
            }
          } else {
            if_block0 = create_if_block_1$1(ctx);
            if_block0.c();
            transition_in(if_block0, 1);
            if_block0.m(div0, null);
          }
        } else if (if_block0) {
          group_outros();
          transition_out(if_block0, 1, 1, function () {
            if_block0 = null;
          });
          check_outros();
        }
        if (!current || dirty[0] & /*editorType*/16 && a0_class_value !== (a0_class_value = "toggleButton " + /*editorType*/ctx[4] + " svelte-1khva34")) {
          attr_dev(a0, "class", a0_class_value);
        }
        if (!current || dirty[0] & /*editorType, editorCommandView*/18) {
          toggle_class(a0, "active", /*editorCommandView*/ctx[1] === 'command');
        }
        if (!current || dirty[0] & /*editorType*/16 && a1_class_value !== (a1_class_value = "toggleButton " + /*editorType*/ctx[4] + " svelte-1khva34")) {
          attr_dev(a1, "class", a1_class_value);
        }
        if (!current || dirty[0] & /*editorType, editorCommandView*/18) {
          toggle_class(a1, "active", /*editorCommandView*/ctx[1] === 'preview');
        }
        if (!current || dirty[0] & /*editorType*/16 && a2_class_value !== (a2_class_value = "toggleButton " + /*editorType*/ctx[4] + " svelte-1khva34")) {
          attr_dev(a2, "class", a2_class_value);
        }
        if (!current || dirty[0] & /*editorType, editorCommandView*/18) {
          toggle_class(a2, "active", /*editorCommandView*/ctx[1] === 'request');
        }
        if (!current || dirty[0] & /*editorType*/16 && div1_class_value !== (div1_class_value = "toggleButton " + /*editorType*/ctx[4] + " run-button hidden-phone" + " svelte-1khva34")) {
          attr_dev(div1, "class", div1_class_value);
        }
        if (!current || dirty[0] & /*editorType*/16 && textarea0_class_value !== (textarea0_class_value = "panel left " + /*editorType*/ctx[4] + " svelte-1khva34")) {
          attr_dev(textarea0, "class", textarea0_class_value);
        }
        if (!current || dirty[0] & /*editorCommandAreaDisabled*/8192) {
          prop_dev(textarea0, "disabled", /*editorCommandAreaDisabled*/ctx[13]);
        }
        if (dirty[0] & /*editorCommandArea*/1) {
          set_input_value(textarea0, /*editorCommandArea*/ctx[0]);
        }
        if (!current || dirty[0] & /*isHiddenCommandEditor*/32768 && div4_class_value !== (div4_class_value = "pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-1 pure-u-1 " + /*isHiddenCommandEditor*/ctx[15] + " svelte-1khva34")) {
          attr_dev(div4, "class", div4_class_value);
        }
        if (!current || dirty[0] & /*editorType*/16 && div5_class_value !== (div5_class_value = "toggleButton " + /*editorType*/ctx[4] + " svelte-1khva34")) {
          attr_dev(div5, "class", div5_class_value);
        }
        if (!current || dirty[0] & /*editorType, editorResultView*/20) {
          toggle_class(div5, "active", /*editorResultView*/ctx[2] === 'result');
        }
        if (!current || dirty[0] & /*editorType*/16 && div6_class_value !== (div6_class_value = "toggleButton " + /*editorType*/ctx[4] + " svelte-1khva34")) {
          attr_dev(div6, "class", div6_class_value);
        }
        if (!current || dirty[0] & /*editorType, editorResultView*/20) {
          toggle_class(div6, "active", /*editorResultView*/ctx[2] === 'response');
        }
        if (!current || dirty[0] & /*editorType*/16 && textarea1_class_value !== (textarea1_class_value = "panel right " + /*editorType*/ctx[4] + " svelte-1khva34")) {
          attr_dev(textarea1, "class", textarea1_class_value);
        }
        if (dirty[0] & /*editorResultArea*/16384) {
          set_input_value(textarea1, /*editorResultArea*/ctx[14]);
        }
        if (!current || dirty[0] & /*isHiddenResultEditor*/65536 && div9_class_value !== (div9_class_value = "pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-1 pure-u-1 " + /*isHiddenResultEditor*/ctx[16] + " svelte-1khva34")) {
          attr_dev(div9, "class", div9_class_value);
        }
        if (!current || dirty[0] & /*background, editorType*/80 && span0_class_value !== (span0_class_value = "switch-text " + /*background*/ctx[6] + " " + /*editorType*/ctx[4] + " svelte-1khva34")) {
          attr_dev(span0, "class", span0_class_value);
        }
        if (dirty[0] & /*checkedEditorValue*/4096) {
          input.checked = /*checkedEditorValue*/ctx[12];
        }
        if (!current || dirty[0] & /*background, editorType*/80 && span1_class_value !== (span1_class_value = "switch-text " + /*background*/ctx[6] + " " + /*editorType*/ctx[4] + " svelte-1khva34")) {
          attr_dev(span1, "class", span1_class_value);
        }
        if (!current || dirty[0] & /*editorType*/16 && div11_class_value !== (div11_class_value = "toggleButton " + /*editorType*/ctx[4] + " run-button bottom" + " svelte-1khva34")) {
          attr_dev(div11, "class", div11_class_value);
        }
        if (!current || dirty[0] & /*background*/64 && div12_class_value !== (div12_class_value = "pure-u-1 pure-u-md-1-1 only-phone " + /*background*/ctx[6] + " text-center" + " svelte-1khva34")) {
          attr_dev(div12, "class", div12_class_value);
        }
        if (!current || dirty[0] & /*editorType*/16 && div14_class_value !== (div14_class_value = "play-panel padding-side " + /*editorType*/ctx[4] + " svelte-1khva34")) {
          attr_dev(div14, "class", div14_class_value);
        }
        if (/*examples*/ctx[3].length > 0) {
          if (if_block1) {
            if_block1.p(ctx, dirty);
          } else {
            if_block1 = create_if_block$3(ctx);
            if_block1.c();
            if_block1.m(div16, null);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }
      },
      i: function () {
        if (current) return;
        transition_in(if_block0);
        current = true;
      },
      o: function () {
        transition_out(if_block0);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div16);
        if (if_block0) if_block0.d();
        if (if_block1) if_block1.d();
        mounted = false;
        run_all(dispose);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$8.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function dummyRequest(id, input) {
    return {
      input: input,
      executedCommand: "executed dummy " + input,
      rawRequest: "rawRequest dummy " + input,
      result: "result dummy " + input,
      rawResponse: "rawResponse dummy " + input
    };
  }
  function instance$8($$self, $$props, $$invalidate) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('PlayEditor', slots, []);
    var _$$props$examples = $$props.examples,
      examples = _$$props$examples === void 0 ? [] : _$$props$examples;
    var _$$props$isConsole = $$props.isConsole,
      isConsole = _$$props$isConsole === void 0 ? false : _$$props$isConsole;
    var editorCommandView = $$props.editorCommandView,
      editorResultView = $$props.editorResultView;
    var _$$props$editorComman = $$props.editorCommandArea,
      editorCommandArea = _$$props$editorComman === void 0 ? "" : _$$props$editorComman;
    var _$$props$editorComman2 = $$props.editorCommandCommand,
      editorCommandCommand = _$$props$editorComman2 === void 0 ? "" : _$$props$editorComman2;
    var _$$props$editorComman3 = $$props.editorCommandPreview,
      editorCommandPreview = _$$props$editorComman3 === void 0 ? "No preview" : _$$props$editorComman3;
    var _$$props$editorComman4 = $$props.editorCommandRequest,
      editorCommandRequest = _$$props$editorComman4 === void 0 ? "No request" : _$$props$editorComman4;
    var _$$props$editorResult = $$props.editorResultResult,
      editorResultResult = _$$props$editorResult === void 0 ? "No result" : _$$props$editorResult;
    var _$$props$editorResult2 = $$props.editorResultResponse,
      editorResultResponse = _$$props$editorResult2 === void 0 ? "No response" : _$$props$editorResult2;
    var _$$props$editorType = $$props.editorType,
      editorType = _$$props$editorType === void 0 ? "" : _$$props$editorType;
    var _$$props$tabChecked = $$props.tabChecked,
      tabChecked = _$$props$tabChecked === void 0 ? "" : _$$props$tabChecked;
    var _$$props$background = $$props.background,
      background = _$$props$background === void 0 ? "" : _$$props$background;
    var editorID = uuidV4();
    var modalType = "";
    var modalAlign = "center";
    var showModal = false;
    var modalHeader, modalContent;
    var checkedEditorValue = false;
    var editorCommandAreaDisabled = false;
    var editorResultArea = "No result";
    var editorActive = "";
    var isHiddenCommandEditor = "";
    var isHiddenResultEditor = "";
    var textColor;
    setEditorCommandActive();
    function switchEditor() {
      if (editorActive == "command") {
        $$invalidate(12, checkedEditorValue = true);
        setEditorResultActive();
        setEditor("command", "command");
        return;
      }
      if (editorActive == "result") {
        $$invalidate(12, checkedEditorValue = false);
        setEditorCommandActive();
        setEditor("result", "result");
      }
    }
    function setEditor(view, subview, value) {
      switch (view) {
        case "command":
          $$invalidate(1, editorCommandView = subview);
          switch (subview) {
            case "command":
              $$invalidate(13, editorCommandAreaDisabled = false);
              $$invalidate(27, editorCommandCommand = value ? value : editorCommandCommand);
              $$invalidate(0, editorCommandArea = editorCommandCommand);
              break;
            case "preview":
              $$invalidate(13, editorCommandAreaDisabled = true);
              $$invalidate(25, editorCommandPreview = value ? value : editorCommandPreview);
              $$invalidate(0, editorCommandArea = editorCommandPreview);
              break;
            case "request":
              $$invalidate(13, editorCommandAreaDisabled = true);
              $$invalidate(26, editorCommandRequest = value ? value : editorCommandRequest);
              $$invalidate(0, editorCommandArea = editorCommandRequest);
              break;
          }
          break;
        case "result":
          $$invalidate(2, editorResultView = subview);
          switch (subview) {
            case "result":
              $$invalidate(28, editorResultResult = value ? value : editorResultResult);
              $$invalidate(14, editorResultArea = editorResultResult);
              break;
            case "response":
              $$invalidate(29, editorResultResponse = value ? value : editorResultResponse);
              $$invalidate(14, editorResultArea = editorResultResponse);
              break;
          }
          break;
      }
    }
    function setEditorView(event) {
      event.preventDefault();
      setEditor("command", editorCommandView);
      setEditor("result", editorResultView);
    }
    function setEditorResultActive() {
      editorActive = "result";
      $$invalidate(15, isHiddenCommandEditor = "hidden-phone");
      $$invalidate(16, isHiddenResultEditor = "");
    }
    function setEditorCommandActive() {
      editorActive = "command";
      $$invalidate(16, isHiddenResultEditor = "hidden-phone");
      $$invalidate(15, isHiddenCommandEditor = "");
      $$invalidate(1, editorCommandView = "command");
      $$invalidate(2, editorResultView = "result");
    }
    function applyInputCommand(inputCommand) {
      if (editorActive != "command") {
        switchEditor();
      }
      editorToDefault();
      setEditor("result", "result");
      setEditor("command", "command", inputCommand);
    }
    function clickRun() {
      return _clickRun.apply(this, arguments);
    }
    function _clickRun() {
      _clickRun = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee() {
        var res, inputMessage;
        return regenerator.wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(editorCommandCommand == "")) {
                _context.next = 3;
                break;
              }
              showAlertModal("Place your command first!");
              return _context.abrupt("return");
            case 3:
              setLoading();
              setEditor("result", "result");
              if (editorActive != "result") {
                switchEditor();
              }
              inputMessage = editorCommandCommand;
              _context.prev = 7;
              if (!isConsole) {
                _context.next = 14;
                break;
              }
              _context.next = 11;
              return fetchConsoleExec(inputMessage);
            case 11:
              res = _context.sent;
              _context.next = 17;
              break;
            case 14:
              _context.next = 16;
              return fetchPlay(getTeamID(), inputMessage);
            case 16:
              res = _context.sent;
            case 17:
              _context.next = 25;
              break;
            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](7);
              editorToDefault();
              $$invalidate(28, editorResultResult = _context.t0);
              setEditor("result", "result");
              return _context.abrupt("return");
            case 25:
              $$invalidate(25, editorCommandPreview = res.data.executedCommand && res.data.executedCommand != "" ? res.data.executedCommand : "No preview");
              $$invalidate(26, editorCommandRequest = res.data.rawRequest && res.data.rawRequest != "" ? res.data.rawRequest : "No request");
              $$invalidate(28, editorResultResult = res.data.result && res.data.result != "" ? jsonPretty(res.data.result) : "No result");
              $$invalidate(29, editorResultResponse = res.data.rawResponse && res.data.rawResponse != "" ? jsonPretty(res.data.rawResponse) : "No response");
              setEditor("command", "command", inputMessage);
              setEditor("result", "result");
            case 31:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[7, 19]]);
      }));
      return _clickRun.apply(this, arguments);
    }
    function editorToDefault() {
      $$invalidate(25, editorCommandPreview = "No preview");
      $$invalidate(26, editorCommandRequest = "No request");
      $$invalidate(28, editorResultResult = "No result");
      $$invalidate(29, editorResultResponse = "No response");
    }
    function showAlertModal(content) {
      $$invalidate(7, modalType = "alert small");
      $$invalidate(8, modalAlign = "center");
      $$invalidate(9, showModal = true);
      $$invalidate(10, modalHeader = "Alert");
      $$invalidate(11, modalContent = content);
    }
    function fetchPlay() {
      return _fetchPlay.apply(this, arguments);
    }
    function _fetchPlay() {
      _fetchPlay = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee2(id, message) {
        var url, params, res, json;
        return regenerator.wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              url = new URL('/api/play', location);
              params = {
                id: id,
                message: message
              };
              url.search = new URLSearchParams(params).toString();
              _context2.next = 5;
              return window.fetch(url, {
                headers: {
                  'Accept-Encoding': 'gzip, deflate, br',
                  'x-request-id': uuidV4()
                }
              });
            case 5:
              res = _context2.sent;
              _context2.next = 8;
              return res.json();
            case 8:
              json = _context2.sent;
              if (!(json.error && json.error.message)) {
                _context2.next = 11;
                break;
              }
              throw new Error(json.error.message);
            case 11:
              return _context2.abrupt("return", json);
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return _fetchPlay.apply(this, arguments);
    }
    function fetchConsoleExec() {
      return _fetchConsoleExec.apply(this, arguments);
    }
    function _fetchConsoleExec() {
      _fetchConsoleExec = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee3(message) {
        var url, params, authSign, authPass, res, json;
        return regenerator.wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              url = new URL('/console/exec', location);
              params = {
                message: message
              };
              url.search = new URLSearchParams(params).toString();
              authSign = localStorage.getItem('x-auth-sign');
              authPass = localStorage.getItem('x-auth-password');
              _context3.next = 7;
              return window.fetch(url, {
                method: "POST",
                headers: {
                  "x-auth-sign": authSign,
                  "x-auth-password": authPass,
                  'Accept-Encoding': 'gzip, deflate, br',
                  'x-request-id': uuidV4()
                }
              });
            case 7:
              res = _context3.sent;
              _context3.next = 10;
              return res.json();
            case 10:
              json = _context3.sent;
              if (!(json.error && json.error.message)) {
                _context3.next = 13;
                break;
              }
              throw new Error(json.error.message);
            case 13:
              return _context3.abrupt("return", json);
            case 14:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return _fetchConsoleExec.apply(this, arguments);
    }
    function setLoading() {
      $$invalidate(25, editorCommandPreview = "loading...");
      $$invalidate(26, editorCommandRequest = "loading...");
      $$invalidate(28, editorResultResult = "loading...");
      $$invalidate(29, editorResultResponse = "loading...");
    }
    function clickApply(event) {
      applyInputCommand(event.target.getAttribute('text'));
    }
    function clickInfo(event) {
      $$invalidate(7, modalType = "info");
      $$invalidate(8, modalAlign = "left");
      $$invalidate(9, showModal = true);
      $$invalidate(10, modalHeader = event.target.getAttribute("title"));
      $$invalidate(11, modalContent = event.target.getAttribute("text"));
    }
    function scroll(event) {
      scrollInto(event, 66);
    }
    $$self.$$.on_mount.push(function () {
      if (editorCommandView === undefined && !('editorCommandView' in $$props || $$self.$$.bound[$$self.$$.props['editorCommandView']])) {
        console.warn("<PlayEditor> was created without expected prop 'editorCommandView'");
      }
      if (editorResultView === undefined && !('editorResultView' in $$props || $$self.$$.bound[$$self.$$.props['editorResultView']])) {
        console.warn("<PlayEditor> was created without expected prop 'editorResultView'");
      }
    });
    var writable_props = ['examples', 'isConsole', 'editorCommandView', 'editorResultView', 'editorCommandArea', 'editorCommandCommand', 'editorCommandPreview', 'editorCommandRequest', 'editorResultResult', 'editorResultResponse', 'editorType', 'tabChecked', 'background'];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<PlayEditor> was created with unknown prop '".concat(key, "'"));
    });
    function textarea0_input_handler() {
      editorCommandArea = this.value;
      $$invalidate(0, editorCommandArea);
    }
    function textarea1_input_handler() {
      editorResultArea = this.value;
      $$invalidate(14, editorResultArea);
    }
    function input_change_handler() {
      checkedEditorValue = this.checked;
      $$invalidate(12, checkedEditorValue);
    }
    $$self.$$set = function ($$props) {
      if ('examples' in $$props) $$invalidate(3, examples = $$props.examples);
      if ('isConsole' in $$props) $$invalidate(30, isConsole = $$props.isConsole);
      if ('editorCommandView' in $$props) $$invalidate(1, editorCommandView = $$props.editorCommandView);
      if ('editorResultView' in $$props) $$invalidate(2, editorResultView = $$props.editorResultView);
      if ('editorCommandArea' in $$props) $$invalidate(0, editorCommandArea = $$props.editorCommandArea);
      if ('editorCommandCommand' in $$props) $$invalidate(27, editorCommandCommand = $$props.editorCommandCommand);
      if ('editorCommandPreview' in $$props) $$invalidate(25, editorCommandPreview = $$props.editorCommandPreview);
      if ('editorCommandRequest' in $$props) $$invalidate(26, editorCommandRequest = $$props.editorCommandRequest);
      if ('editorResultResult' in $$props) $$invalidate(28, editorResultResult = $$props.editorResultResult);
      if ('editorResultResponse' in $$props) $$invalidate(29, editorResultResponse = $$props.editorResultResponse);
      if ('editorType' in $$props) $$invalidate(4, editorType = $$props.editorType);
      if ('tabChecked' in $$props) $$invalidate(5, tabChecked = $$props.tabChecked);
      if ('background' in $$props) $$invalidate(6, background = $$props.background);
    };
    $$self.$capture_state = function () {
      return {
        marked: marked_1,
        createEventDispatcher: createEventDispatcher,
        Modal: Modal,
        scrollInto: scrollInto,
        jsonPretty: jsonPretty,
        getTeamID: getTeamID,
        uuidV4: uuidV4,
        examples: examples,
        isConsole: isConsole,
        editorCommandView: editorCommandView,
        editorResultView: editorResultView,
        editorCommandArea: editorCommandArea,
        editorCommandCommand: editorCommandCommand,
        editorCommandPreview: editorCommandPreview,
        editorCommandRequest: editorCommandRequest,
        editorResultResult: editorResultResult,
        editorResultResponse: editorResultResponse,
        editorType: editorType,
        tabChecked: tabChecked,
        background: background,
        editorID: editorID,
        modalType: modalType,
        modalAlign: modalAlign,
        showModal: showModal,
        modalHeader: modalHeader,
        modalContent: modalContent,
        checkedEditorValue: checkedEditorValue,
        editorCommandAreaDisabled: editorCommandAreaDisabled,
        editorResultArea: editorResultArea,
        editorActive: editorActive,
        isHiddenCommandEditor: isHiddenCommandEditor,
        isHiddenResultEditor: isHiddenResultEditor,
        textColor: textColor,
        switchEditor: switchEditor,
        setEditor: setEditor,
        setEditorView: setEditorView,
        setEditorResultActive: setEditorResultActive,
        setEditorCommandActive: setEditorCommandActive,
        applyInputCommand: applyInputCommand,
        clickRun: clickRun,
        editorToDefault: editorToDefault,
        dummyRequest: dummyRequest,
        showAlertModal: showAlertModal,
        fetchPlay: fetchPlay,
        fetchConsoleExec: fetchConsoleExec,
        setLoading: setLoading,
        clickApply: clickApply,
        clickInfo: clickInfo,
        scroll: scroll
      };
    };
    $$self.$inject_state = function ($$props) {
      if ('examples' in $$props) $$invalidate(3, examples = $$props.examples);
      if ('isConsole' in $$props) $$invalidate(30, isConsole = $$props.isConsole);
      if ('editorCommandView' in $$props) $$invalidate(1, editorCommandView = $$props.editorCommandView);
      if ('editorResultView' in $$props) $$invalidate(2, editorResultView = $$props.editorResultView);
      if ('editorCommandArea' in $$props) $$invalidate(0, editorCommandArea = $$props.editorCommandArea);
      if ('editorCommandCommand' in $$props) $$invalidate(27, editorCommandCommand = $$props.editorCommandCommand);
      if ('editorCommandPreview' in $$props) $$invalidate(25, editorCommandPreview = $$props.editorCommandPreview);
      if ('editorCommandRequest' in $$props) $$invalidate(26, editorCommandRequest = $$props.editorCommandRequest);
      if ('editorResultResult' in $$props) $$invalidate(28, editorResultResult = $$props.editorResultResult);
      if ('editorResultResponse' in $$props) $$invalidate(29, editorResultResponse = $$props.editorResultResponse);
      if ('editorType' in $$props) $$invalidate(4, editorType = $$props.editorType);
      if ('tabChecked' in $$props) $$invalidate(5, tabChecked = $$props.tabChecked);
      if ('background' in $$props) $$invalidate(6, background = $$props.background);
      if ('editorID' in $$props) $$invalidate(18, editorID = $$props.editorID);
      if ('modalType' in $$props) $$invalidate(7, modalType = $$props.modalType);
      if ('modalAlign' in $$props) $$invalidate(8, modalAlign = $$props.modalAlign);
      if ('showModal' in $$props) $$invalidate(9, showModal = $$props.showModal);
      if ('modalHeader' in $$props) $$invalidate(10, modalHeader = $$props.modalHeader);
      if ('modalContent' in $$props) $$invalidate(11, modalContent = $$props.modalContent);
      if ('checkedEditorValue' in $$props) $$invalidate(12, checkedEditorValue = $$props.checkedEditorValue);
      if ('editorCommandAreaDisabled' in $$props) $$invalidate(13, editorCommandAreaDisabled = $$props.editorCommandAreaDisabled);
      if ('editorResultArea' in $$props) $$invalidate(14, editorResultArea = $$props.editorResultArea);
      if ('editorActive' in $$props) editorActive = $$props.editorActive;
      if ('isHiddenCommandEditor' in $$props) $$invalidate(15, isHiddenCommandEditor = $$props.isHiddenCommandEditor);
      if ('isHiddenResultEditor' in $$props) $$invalidate(16, isHiddenResultEditor = $$props.isHiddenResultEditor);
      if ('textColor' in $$props) $$invalidate(17, textColor = $$props.textColor);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    $$self.$$.update = function () {
      if ($$self.$$.dirty[0] & /*editorCommandArea, editorCommandPreview, editorCommandRequest, background*/100663361) {
         {
          if (editorCommandArea != editorCommandPreview && editorCommandArea != editorCommandRequest) {
            $$invalidate(27, editorCommandCommand = editorCommandArea);
          }
          if (background == "white") {
            $$invalidate(17, textColor = "text-grey");
          }
        }
      }
    };
    return [editorCommandArea, editorCommandView, editorResultView, examples, editorType, tabChecked, background, modalType, modalAlign, showModal, modalHeader, modalContent, checkedEditorValue, editorCommandAreaDisabled, editorResultArea, isHiddenCommandEditor, isHiddenResultEditor, textColor, editorID, switchEditor, setEditorView, clickRun, clickApply, clickInfo, scroll, editorCommandPreview, editorCommandRequest, editorCommandCommand, editorResultResult, editorResultResponse, isConsole, setEditor, applyInputCommand, function () {
      return $$invalidate(9, showModal = false);
    }, function () {
      return $$invalidate(1, editorCommandView = 'command');
    }, function () {
      return $$invalidate(1, editorCommandView = 'preview');
    }, function () {
      return $$invalidate(1, editorCommandView = 'request');
    }, textarea0_input_handler, function () {
      return $$invalidate(2, editorResultView = 'result');
    }, function () {
      return $$invalidate(2, editorResultView = 'response');
    }, textarea1_input_handler, input_change_handler];
  }
  var PlayEditor = /*#__PURE__*/function (_SvelteComponentDev) {
    function PlayEditor(options) {
      var _this;
      _classCallCheck(this, PlayEditor);
      _this = _callSuper$9(this, PlayEditor, [options]);
      init(_this, options, instance$8, create_fragment$8, safe_not_equal, {
        examples: 3,
        isConsole: 30,
        editorCommandView: 1,
        editorResultView: 2,
        editorCommandArea: 0,
        editorCommandCommand: 27,
        editorCommandPreview: 25,
        editorCommandRequest: 26,
        editorResultResult: 28,
        editorResultResponse: 29,
        editorType: 4,
        tabChecked: 5,
        background: 6,
        setEditor: 31,
        applyInputCommand: 32
      }, null, [-1, -1]);
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "PlayEditor",
        options: options,
        id: create_fragment$8.name
      });
      return _this;
    }
    _inherits(PlayEditor, _SvelteComponentDev);
    return _createClass(PlayEditor, [{
      key: "examples",
      get: function () {
        throw new Error_1$2("<PlayEditor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error_1$2("<PlayEditor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "isConsole",
      get: function () {
        throw new Error_1$2("<PlayEditor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error_1$2("<PlayEditor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "editorCommandView",
      get: function () {
        throw new Error_1$2("<PlayEditor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error_1$2("<PlayEditor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "editorResultView",
      get: function () {
        throw new Error_1$2("<PlayEditor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error_1$2("<PlayEditor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "editorCommandArea",
      get: function () {
        throw new Error_1$2("<PlayEditor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error_1$2("<PlayEditor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "editorCommandCommand",
      get: function () {
        throw new Error_1$2("<PlayEditor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error_1$2("<PlayEditor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "editorCommandPreview",
      get: function () {
        throw new Error_1$2("<PlayEditor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error_1$2("<PlayEditor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "editorCommandRequest",
      get: function () {
        throw new Error_1$2("<PlayEditor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error_1$2("<PlayEditor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "editorResultResult",
      get: function () {
        throw new Error_1$2("<PlayEditor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error_1$2("<PlayEditor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "editorResultResponse",
      get: function () {
        throw new Error_1$2("<PlayEditor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error_1$2("<PlayEditor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "editorType",
      get: function () {
        throw new Error_1$2("<PlayEditor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error_1$2("<PlayEditor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "tabChecked",
      get: function () {
        throw new Error_1$2("<PlayEditor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error_1$2("<PlayEditor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "background",
      get: function () {
        throw new Error_1$2("<PlayEditor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error_1$2("<PlayEditor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "setEditor",
      get: function () {
        return this.$$.ctx[31];
      },
      set: function (value) {
        throw new Error_1$2("<PlayEditor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "applyInputCommand",
      get: function () {
        return this.$$.ctx[32];
      },
      set: function (value) {
        throw new Error_1$2("<PlayEditor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }]);
  }(SvelteComponentDev);

  var HELP_EXAMPLES = [{
    key: "help",
    command: "help -c=help @cakcuk"
  }, {
    key: "cuk",
    command: "help -c=cuk @cakcuk"
  }, {
    key: "cak",
    command: "help -c=cak @cakcuk"
  }, {
    key: "del",
    command: "help -c=del @cakcuk"
  }, {
    key: "scope",
    command: "help -c=scope @cakcuk"
  }, {
    key: "su",
    command: "help -c=su @cakcuk"
  }];
  var SNIPPET_CONSOLE = [{
    key: "Cuk - Hit Endpoint",
    examples: [{
      title: "Header",
      syntaxt: "cuk -u=https://postman-echo.com/get -h=x-custom-header:headerValue&&Accept-Encoding:application/gzip @cakcuk",
      info: "Use double-and `&&` for seperating multiple values. <br><br>Options with type of `[multi_value]` are working with double-and `&&` separation. <br><br>Try `help -c=command-name @cakcuk` to show all `[multi_value] options` that the command has"
    }, {
      title: "Query Param on URL",
      syntaxt: "cuk -u=https://api.ratesapi.io/api/latest?base=USD @cakcuk",
      info: "You can use `--queryParam, -qp` like this `-qp=base:USD`. Key and value separated by colon `(:)`"
    }, {
      title: "Query Param",
      syntaxt: "cuk -u=https://apis.camillerakoto.fr/fakejobs/jobs -qp=city:paris&&fulltime:false @cakcuk\n",
      info: "Try to add `--noParse, -np` to force result as raw. It's useful for debugging when you create new command."
    }, {
      title: "URL Param",
      syntaxt: "cuk -u=https://api.covid19api.com/dayone/country/{{country}}/status/{{status}}\n-up=country:indonesia&&status:confirmed\n-pr=\nCovid19 Confirmed Cases in Indonesia \\n\n{{ range . }} \n\\n\nDate: {{ .Date }} \\n\nCases: {{ .Cases }} \\n\n{{ end }}\n@cakcuk\n",
      info: "If you want to print result as a file in your workspace, you can use `--outputFile, -of`. But it's not working in playground."
    }, {
      title: "Plain Text Body Param",
      syntaxt: "cuk -m=post -u=https://postman-echo.com/post -bp=testing with cakcuk @cakcuk",
      info: "Default value for `--method, -m` is GET. <br><br>So, if you want to use the others like `POST, PUT, OPTIONS, etc`. You need to overwrite it."
    }, {
      title: "Json as Body Param",
      syntaxt: "cuk -m=post -u=https://postman-echo.com/post @cakcuk\n-bj={\n\"testing-key\": \"cakcuk101\",\n\"testing-value\": \"testing with cakcuk\"\n}\n",
      info: "Just note, you can combine the param with the other params type, like URL params, query params or the others. Just play with it."
    }, {
      title: "URL Encoded Param",
      syntaxt: "cuk -m=post -u=https://postman-echo.com/post @cakcuk\n-bue=name:cakcuk&&id:cakcuk101 \n",
      info: "You need to always mention @cakcuk in your command to trigger command. And you can mention it in the middle, first or last."
    }, {
      title: "Multipart - Upload File",
      syntaxt: "cuk -m=POST -u=https://postman-echo.com/post -bfm=key1:value1&&key2:this is value2&&test-file:file=https://via.placeholder.com/150 @cakcuk",
      info: "Please note, currently Cakcuk only supporting upload file from URL!"
    }, {
      title: "Parse Response",
      syntaxt: "cuk -u=https://apis.camillerakoto.fr/fakejobs/jobs -qp=city:paris @cakcuk\n-pr=\nList of Jobs \\n \n{{ range $index, $value:= . }} \n\\n\nNumber {{ add $index 1 }} \\n\nJob: {{ $value.title }} \\n\nSalary: {{ $value.salary }} \\n\nLocation: {{ $value.city }} - {{ $value.country }} \\n\n{{ end }}",
      info: "`--parseResponse, -pr` is useful for making your response to be readable. `--parseResponse, -pr` uses `Golang text/template` that's also supported by [sprig package](http://masterminds.github.io/sprig)."
    }, {
      title: "Basic Auth",
      syntaxt: "cuk -m=get -u=https://postman-echo.com/get -ba=root:root123 @cakcuk\n-pr=\nHeader Auth: {{ .headers.authorization }}",
      info: "Simply use `--basicAuth` for using basic auth. You can see at Tips & Trick section for the other authentications tips."
    }]
  }, {
    key: "Cak - Create Command",
    examples: [{
      title: "Query Param Dynamic",
      syntaxt: "cak -c=job-fulltime -u=https://apis.camillerakoto.fr/fakejobs/jobs -qp=fulltime:true -qpd=title:::--role&&country:::--country -d=List full time jobs from Github jobs @cakcuk \n-pr=\nList of Jobs \\n \n{{ range $index, $value:= . }} \n\\n\nNumber {{ add $index 1 }} \\n\nJob: {{ $value.title }} \\n\nSalary: {{ $value.salary }} \\n\nLocation: {{ $value.city }} - {{ $value.country }} \\n\n{{ end }}\n",
      info: "It's a simple example with minimum required options. Your new command containing implicit value which is `full_time` query param. <br><br>Try to execute this `job-fulltime @cakcuk --desc=python --loc=usa` after creating command. <br><br>Try to experiment with `--noParse, -np` as well."
    }, {
      title: "URL Param Dynamic",
      syntaxt: "cak -c=covid19 -u=https://api.covid19api.com/dayone/country/{{country}}/status/{{status}}\n-d=Listing covid19 cases in Indonesia\n-up=country:indonesia\n-upd=status:::--status:::mandatory\n-pr=\nCovid19 Confirmed Cases in Indonesia \\n\n{{ range . }} \n\\n\nDate: {{ .Date }} \\n\nCases: {{ .Cases }} \\n\n{{ end }}\n@cakcuk\n",
      info: "Try to execute `covid19 --status=deaths @cakcuk` after creating covid19 command. See the `mandatory` value on `--urlParamDynamic, -upd`. It makes your option to be mandatory. By default option is optional."
    }, {
      title: "URL Encoded Dynamic",
      syntaxt: "cak -c=test-url-encode -m=post -u=https://postman-echo.com/post @cakcuk\n-bue=country:indonesia&&status:safe -bued=category:::--category:::-c:::mandatory&&type:::--type\n-d=Just for testing URL encode \n",
      info: "After creating the command. Try to execute `test-url-encode --category=food & drinks --type=active @cakcuk` to explore your new command. Try to combine with default options as well!"
    }, {
      title: "Multipart Dynamic",
      syntaxt: "cak -c=test-upload -m=POST -u=https://postman-echo.com/post -bfm=key1:value1&&key2:this is value2 @cakcuk\n-bfmd=test-file:::--file:::custom=file={custom}:::mandatory\n-d=test upload file\n",
      info: "Try to execute `test-upload --file=https://via.placeholder.com/150 @cakcuk` after creating the `test-upload` command. <br><br>See `custom` writing. It also works with the other dynamic params like `--queryParamDynamic, -qpd`, `--urlParamDynamic, -upd`, `--HeaderDynamic, -hd`, `----bodyUrlEncodeDynamic, -bued`, or `--bodyFormMultipartDynamic, -bfmd`."
    }, {
      title: "Special Prefix",
      syntaxt: "cak -c=test-custom-secret -u=https://postman-echo.com/get @cakcuk\n-qp=api-key:encrypt=secret-key&&category:food\n-qpd=try-custom:::--change:::custom=always {custom} constant:::mandatory\n-hd=x-custom-header:::--header-custom:::description=just special header:::example=phone\n-d=just for testing special prefix custom and secret",
      info: "See the special prefix for `custom=`, `encrypt=`, `description=` and `example=`. <br><br>Execute it and see the result. Test your command by running `test-custom-secret --change=the first testing --header-custom=this header is custom @cakcuk`. <br><br>You need to check in Command preview tab to see the differences. Your encrypt option value will be encrypted as well in the database."
    }, {
      title: "Encrypted Value",
      syntaxt: "cak -c=test-encrypt -u=https://postman-echo.com/get @cakcuk\n-qp=api-key:encrypt=secret-key&&category:food\n-qpd=secret:::--secret:::mandatory:::encrypted\n-d=just for testing two kinds of encrypt. In option level and in value level using the special prefix\n",
      info: "Create your `test-encrypt` command. And try run this `test-encrypt --secret=this is secret @cakcuk`. <br><br>Your encrypt option value will be encrypted as well in the database. You need to check in Command preview tab to see the differences as well."
    }, {
      title: "Basic Auth",
      syntaxt: "cak -c=test-auth -u=https://postman-echo.com/get -ba=root:root123 @cakcuk\n-pr=Header Auth: {{ .headers.authorization }}\n-d=testing basic auth only\n",
      info: "After creating your `test-auth` command. Just try to run `test-auth @cakcuk`. Your encrypt option value will be encrypted as well in the database. You need to check in Command preview tab to see the differences as well."
    }, {
      title: "Multi Value & Dynamic",
      syntaxt: "cak -c=test-dynamic -m=post -u=https://postman-echo.com/post @cakcuk\n-bfmd=test-file:::--file:::custom=file={custom}:::mandatory:::example=https://via.placeholder.com/150\n-qpd=description:::--desc:::multiple\n-hd=x-api-key:::--key:::encrypted:::mandatory:::description=put the api key\n-d=Just for testing multi-value in queryParamDyanmic or qpd and special prefix for example= & description=\n",
      info: "See implementation for multi-value in special prefix for `example=` and `description=`. Try to experience with it. And also just add `--parseResponse, -pr` in your creation command to parse the response. <br><br>Execute `" + "test-dynamic --key=ini key bosque --desc=test desc 1&&test desc 2\n--file=https://via.placeholder.com/150 @cakcuk" + "` to see your custom command."
    }, {
      title: "With Scope",
      syntaxt: "cak -c=with-scope -u=https://postman-echo.com/get -sc=developer -d=testing scope @cakcuk",
      info: "You need to create `developer` scope first then execute `Cak command`. Just see in Scope example. If you've created your `with-scope` command. <br><br>Try to run this `scope -s=developer @cakcuk`. <br><br>By default scope is public if you don't specify the scope but, you can set scope later with scope command."
    }]
  }, {
    key: "Custom Command - Simple Example",
    examples: [{
      title: "Create Command",
      syntaxt: "cak -c=get-job -u=https://jobs.github.com/positions.json -qp=full_time:true -qpd=description:::--desc&&location:::--loc -d=List full time jobs from Github jobs @cakcuk\n-pr=\nList of Jobs \\n \n{{ range . }} \n\\n\nJob: {{ .title }} \\n\nType: {{ .type }} \\n\nLocation: {{ .location }} \\n\n{{ end }}\n",
      info: "Simply command creation with parsing the rensponse. Just explore the `--parseResponse, -pr` with your custom response. Parse response using `Golang text/template` that's also supported by [sprig package](http://masterminds.github.io/sprig)."
    }, {
      title: "Force Update",
      syntaxt: "cak -c=get-job -u=https://jobs.github.com/positions.json -qp=full_time:false -qpd=description:::--desc&&location:::--loc -d=List full time jobs from Github jobs @cakcuk\n-pr=\nList of Jobs \\n \n{{ range . }} \n\\n\nJob: {{ .title }} \\n\nType: {{ .type }} \\n\nLocation: {{ .location }} \\n\n{{ end }}\n--update",
      info: "Simply put `--update` for forcing update to create command."
    }, {
      title: "Execute Command",
      syntaxt: "get-job --loc=usa --desc=python @cakcuk",
      info: "Simply execute your `get-job` command. Please note that command creation has expiration time on Playground. It will just exist for 5 minutes."
    }, {
      title: "No Parse",
      syntaxt: "get-job --loc=usa --desc=python -np @cakcuk",
      info: "`--noParse, -np` is useful for debugging when you create command in your workspace."
    }]
  }, {
    key: "Custom Command - Overwrite Option",
    examples: [{
      title: "Create Command",
      syntaxt: "cak -c=test-param-add -u=https://postman-echo.com/get @cakcuk\n-h=x-my-header:my header value\n-qp=api-key:encrypt=secret-key&&category:food\n-qpd=try-custom:::--change:::custom=always {custom} constant:::mandatory\n-hd=x-custom-header:::--header-custom:::description=just special header:::example=phone\n-d=just for testing special prefix custom and secret\n",
      info: "Create your `test-param-add` command. Explore with your own param if you want to add some values."
    }, {
      title: "Add Param Value",
      syntaxt: "test-param-add --change=changing value --header-custom=this is custom header -qp=add-header:this is new header -qp=category:drinks&&new-query:query test @cakcuk",
      info: "Run the command and compare the response with this command `test-param-add --change=changing value --header-custom=this is custom header @cakcuk`. See the differences."
    }, {
      title: "Execute with Scope",
      syntaxt: "test-param-add -sc=public --change=changing value --header-custom=this is custom header @cakcuk",
      info: "When you created `test-param-add`, Its scope was not specified, thus its scope is public. Try to experimenting scope changes. <br><br>See on `Scope` examples and back again to try this `test-param-add` command execution with different `--scope, -sc` value."
    }]
  }];
  var SNIPPET_EXAMPLES = [{
    key: "Help",
    examples: [{
      title: "Help only",
      syntaxt: "help @cakcuk",
      info: "`help @cakcuk` show all commands with details."
    }, {
      title: "Oneline help",
      syntaxt: "help -ol @cakcuk",
      info: "`--oneline, -ol` simplify command list result."
    }, {
      title: "Command Detail",
      syntaxt: "help -c=cak @cakcuk",
      info: "Show description, example usage and options for specified command."
    }, {
      title: "Online Command Detail",
      syntaxt: "help -c=cak -ol @cakcuk",
      info: "Example and description will not be shown in command detail. Again `--oneline, -ol` for a more simple result."
    }, {
      title: "--help on Command",
      syntaxt: "cak --help @cakcuk",
      info: "If you use `--help` it will ignore the other options and will print the detail of a specified command just like `help -c=cak @cakcuk`"
    }]
  }, {
    key: "Cuk - Hit Endpoint",
    examples: [{
      title: "Header",
      syntaxt: "cuk -u=https://postman-echo.com/get -h=x-custom-header:headerValue&&Accept-Encoding:application/gzip @cakcuk",
      info: "Use double-and `&&` for seperating multiple values. <br><br>Options with type of `[multi_value]` are working with double-and `&&` separation. <br><br>Try `help -c=command-name @cakcuk` to show all `[multi_value] options` that the command has"
    }, {
      title: "Query Param on URL",
      syntaxt: "cuk -u=https://api.ratesapi.io/api/latest?base=USD @cakcuk",
      info: "You can use `--queryParam, -qp` like this `-qp=base:USD`. Key and value separated by colon `(:)`"
    }, {
      title: "Query Param",
      syntaxt: "cuk -u=https://apis.camillerakoto.fr/fakejobs/jobs -qp=city:paris&&fulltime:false @cakcuk\n",
      info: "Try to add `--noParse, -np` to force result as raw. It's useful for debugging when you create new command."
    }, {
      title: "URL Param",
      syntaxt: "cuk -u=https://api.covid19api.com/dayone/country/{{country}}/status/{{status}}\n-up=country:indonesia&&status:confirmed\n-pr=\nCovid19 Confirmed Cases in Indonesia \\n\n{{ range . }} \n\\n\nDate: {{ .Date }} \\n\nCases: {{ .Cases }} \\n\n{{ end }}\n@cakcuk\n",
      info: "If you want to print result as a file in your workspace, you can use `--outputFile, -of`. But it's not working in playground."
    }, {
      title: "Plain Text Body Param",
      syntaxt: "cuk -m=post -u=https://postman-echo.com/post -bp=testing with cakcuk @cakcuk",
      info: "Default value for `--method, -m` is GET. <br><br>So, if you want to use the others like `POST, PUT, OPTIONS, etc`. You need to overwrite it."
    }, {
      title: "Json as Body Param",
      syntaxt: "cuk -m=post -u=https://postman-echo.com/post @cakcuk\n-bj={\n\"testing-key\": \"cakcuk101\",\n\"testing-value\": \"testing with cakcuk\"\n}\n",
      info: "Just note, you can combine the param with the other params type, like URL params, query params or the others. Just play with it."
    }, {
      title: "URL Encoded Param",
      syntaxt: "cuk -m=post -u=https://postman-echo.com/post @cakcuk\n-bue=name:cakcuk&&id:cakcuk101 \n",
      info: "You need to always mention @cakcuk in your command to trigger command. And you can mention it in the middle, first or last."
    }, {
      title: "Multipart - Upload File",
      syntaxt: "cuk -m=POST -u=https://postman-echo.com/post -bfm=key1:value1&&key2:this is value2&&test-file:file=https://via.placeholder.com/150 @cakcuk",
      info: "Please note, currently Cakcuk only supporting upload file from URL!"
    }, {
      title: "Parse Response",
      syntaxt: "cuk -u=https://apis.camillerakoto.fr/fakejobs/jobs -qp=city:paris @cakcuk\n-pr=\nList of Jobs \\n \n{{ range $index, $value:= . }} \n\\n\nNumber {{ add $index 1 }} \\n\nJob: {{ $value.title }} \\n\nSalary: {{ $value.salary }} \\n\nLocation: {{ $value.city }} - {{ $value.country }} \\n\n{{ end }}",
      info: "`--parseResponse, -pr` is useful for making your response to be readable. `--parseResponse, -pr` uses `Golang text/template` that's also supported by [sprig package](http://masterminds.github.io/sprig)."
    }, {
      title: "Basic Auth",
      syntaxt: "cuk -m=get -u=https://postman-echo.com/get -ba=root:root123 @cakcuk\n-pr=\nHeader Auth: {{ .headers.authorization }}",
      info: "Simply use `--basicAuth` for using basic auth. You can see at Tips & Trick section for the other authentications tips."
    }]
  }, {
    key: "Cak - Create Command",
    examples: [{
      title: "Query Param Dynamic",
      syntaxt: "cak -c=job-fulltime -u=https://apis.camillerakoto.fr/fakejobs/jobs -qp=fulltime:true -qpd=title:::--role&&country:::--country -d=List full time jobs from Github jobs @cakcuk \n-pr=\nList of Jobs \\n \n{{ range $index, $value:= . }} \n\\n\nNumber {{ add $index 1 }} \\n\nJob: {{ $value.title }} \\n\nSalary: {{ $value.salary }} \\n\nLocation: {{ $value.city }} - {{ $value.country }} \\n\n{{ end }}\n",
      info: "It's a simple example with minimum required options. Your new command containing implicit value which is `full_time` query param. <br><br>Try to execute this `job-fulltime @cakcuk --desc=python --loc=usa` after creating command. <br><br>Try to experiment with `--noParse, -np` as well."
    }, {
      title: "URL Param Dynamic",
      syntaxt: "cak -c=covid19 -u=https://api.covid19api.com/dayone/country/{{country}}/status/{{status}}\n-d=Listing covid19 cases in Indonesia\n-up=country:indonesia\n-upd=status:::--status:::mandatory\n-pr=\nCovid19 Confirmed Cases in Indonesia \\n\n{{ range . }} \n\\n\nDate: {{ .Date }} \\n\nCases: {{ .Cases }} \\n\n{{ end }}\n@cakcuk\n",
      info: "Try to execute `covid19 --status=deaths @cakcuk` after creating covid19 command. See the `mandatory` value on `--urlParamDynamic, -upd`. It makes your option to be mandatory. By default option is optional."
    }, {
      title: "URL Encoded Dynamic",
      syntaxt: "cak -c=test-url-encode -m=post -u=https://postman-echo.com/post @cakcuk\n-bue=country:indonesia&&status:safe -bued=category:::--category:::-c:::mandatory&&type:::--type\n-d=Just for testing URL encode \n",
      info: "After creating the command. Try to execute `test-url-encode --category=food & drinks --type=active @cakcuk` to explore your new command. Try to combine with default options as well!"
    }, {
      title: "Multipart Dynamic",
      syntaxt: "cak -c=test-upload -m=POST -u=https://postman-echo.com/post -bfm=key1:value1&&key2:this is value2 @cakcuk\n-bfmd=test-file:::--file:::custom=file={custom}:::mandatory\n-d=test upload file\n",
      info: "Try to execute `test-upload --file=https://via.placeholder.com/150 @cakcuk` after creating the `test-upload` command. <br><br>See `custom` writing. It also works with the other dynamic params like `--queryParamDynamic, -qpd`, `--urlParamDynamic, -upd`, `--HeaderDynamic, -hd`, `----bodyUrlEncodeDynamic, -bued`, or `--bodyFormMultipartDynamic, -bfmd`."
    }, {
      title: "Special Prefix",
      syntaxt: "cak -c=test-custom-secret -u=https://postman-echo.com/get @cakcuk\n-qp=api-key:encrypt=secret-key&&category:food\n-qpd=try-custom:::--change:::custom=always {custom} constant:::mandatory\n-hd=x-custom-header:::--header-custom:::description=just special header:::example=phone\n-d=just for testing special prefix custom and secret",
      info: "See the special prefix for `custom=`, `encrypt=`, `description=` and `example=`. <br><br>Execute it and see the result. Test your command by running `test-custom-secret --change=the first testing --header-custom=this header is custom @cakcuk`. <br><br>You need to check in Command preview tab to see the differences. Your encrypt option value will be encrypted as well in the database."
    }, {
      title: "Encrypted Value",
      syntaxt: "cak -c=test-encrypt -u=https://postman-echo.com/get @cakcuk\n-qp=api-key:encrypt=secret-key&&category:food\n-qpd=secret:::--secret:::mandatory:::encrypted\n-d=just for testing two kinds of encrypt. In option level and in value level using the special prefix\n",
      info: "Create your `test-encrypt` command. And try run this `test-encrypt --secret=this is secret @cakcuk`. <br><br>Your encrypt option value will be encrypted as well in the database. You need to check in Command preview tab to see the differences as well."
    }, {
      title: "Basic Auth",
      syntaxt: "cak -c=test-auth -u=https://postman-echo.com/get -ba=root:root123 @cakcuk\n-pr=Header Auth: {{ .headers.authorization }}\n-d=testing basic auth only\n",
      info: "After creating your `test-auth` command. Just try to run `test-auth @cakcuk`. Your encrypt option value will be encrypted as well in the database. You need to check in Command preview tab to see the differences as well."
    }, {
      title: "Multi Value & Dynamic",
      syntaxt: "cak -c=test-dynamic -m=post -u=https://postman-echo.com/post @cakcuk\n-bfmd=test-file:::--file:::custom=file={custom}:::mandatory:::example=https://via.placeholder.com/150\n-qpd=description:::--desc:::multiple\n-hd=x-api-key:::--key:::encrypted:::mandatory:::description=put the api key\n-d=Just for testing multi-value in queryParamDyanmic or qpd and special prefix for example= & description=\n",
      info: "See implementation for multi-value in special prefix for `example=` and `description=`. Try to experience with it. And also just add `--parseResponse, -pr` in your creation command to parse the response. <br><br>Execute `" + "test-dynamic --key=ini key bosque --desc=test desc 1&&test desc 2\n--file=https://via.placeholder.com/150 @cakcuk" + "` to see your custom command."
    }, {
      title: "With Scope",
      syntaxt: "cak -c=with-scope -u=https://postman-echo.com/get -sc=developer -d=testing scope @cakcuk",
      info: "You need to create `developer` scope first then execute `Cak command`. Just see in Scope example. If you've created your `with-scope` command. <br><br>Try to run this `scope -s=developer @cakcuk`. <br><br>By default scope is public if you don't specify the scope but, you can set scope later with scope command."
    }]
  }, {
    key: "Del - Delete Command",
    examples: [{
      title: "Del Single Command",
      syntaxt: "del -c=custom-command @cakcuk",
      info: "Simply deleting command from command list. It's only custom commands those can be deleted."
    }, {
      title: "Del Multiple Commands",
      syntaxt: "del -c=custom-command&&custom-command-2 @cakcuk",
      info: "Works with multiple deletion with double-and `&&` separator."
    }]
  }, {
    key: "Scope - ACL",
    examples: [{
      title: "Show All Scopes",
      syntaxt: "scope @cakcuk",
      info: "Showing existing scopes including the commands. Try `scope -ol @cakcuk` for a more simple result. `public` is default scope."
    }, {
      title: "Simple Create Scope",
      syntaxt: "scope -cr=developer @cakcuk",
      info: "`scope -cr=developer @cakcuk` simply create a scope with no registered commands and no registered users. <br><br>Try `scope -cr=operator -c=custom-command @cakcuk` for creating scope with registering command as well or `scope -cr=operator -u=@user @cakcuk` with registering user. <br><br>Or you can try both of them. It's also supporting multiple values either for `--command,-c` or `--user, -u`."
    }, {
      title: "Update or Enlarge scope",
      syntaxt: "scope --update=developer -c=custom-command-2 @cakcuk",
      info: "It's able to register command or register users. Or both of them in one shot command. Just experience with it!"
    }, {
      title: "Delete Scope",
      syntaxt: "scope -d=developer @cakcuk",
      info: "`scope -d=developer @cakcuk` will totally delete scope of developer. You can also reduce scope by decreasing registered commands or registered users using `--command, -c` or `--user, -u`. Just experience with it!"
    }, {
      title: "Reduce Scope",
      syntaxt: "scope -d=developer -c=command-sample @cakcuk",
      info: "`scope -d=developer -c=command-sample @cakcuk` will remove `command-sample` from `developer` scope. Just try to explore reducing scope for users as well by using `--user, -u` option!"
    }]
  }, {
    key: "su - Superuser",
    examples: [{
      title: "Show Superuser List",
      syntaxt: "su @cakcuk",
      info: "Show users who are superuser. Please note `su` command by default is enabled. It can be disabled via environment variable of `SUPER_USER_MODE_ENABLED=false`."
    }, {
      title: "Set Superuser",
      syntaxt: "su --set=@iskandar && @ahmad  @cakcuk",
      info: "Space between user name is tolerable. Since mentioning user on workspace is a bit hard without space. <br><br>If you deploy your own Cakcuk, please note `su` command by default is enabled. <br><br>It can be disabled via environment variable of `SUPER_USER_MODE_ENABLED=false`."
    }, {
      title: "Del Superuser",
      syntaxt: "su -d=@iskandar && @ahmad @cakcuk",
      info: "Delete user from superuser access. <br><br>If you deploy your own Cakcuk, Please note `su` command by default is enabled. <br><br>It can be disabled via environment variable of `SUPER_USER_MODE_ENABLED=false`."
    }]
  }, {
    key: "Custom Command - Simple Example",
    examples: [{
      title: "Create Command",
      syntaxt: "cak -c=get-job -u=https://jobs.github.com/positions.json -qp=full_time:true -qpd=description:::--desc&&location:::--loc -d=List full time jobs from Github jobs @cakcuk\n-pr=\nList of Jobs \\n \n{{ range . }} \n\\n\nJob: {{ .title }} \\n\nType: {{ .type }} \\n\nLocation: {{ .location }} \\n\n{{ end }}\n",
      info: "Simply command creation with parsing the rensponse. Just explore the `--parseResponse, -pr` with your custom response. Parse response using `Golang text/template` that's also supported by [sprig package](http://masterminds.github.io/sprig)."
    }, {
      title: "Force Update",
      syntaxt: "cak -c=get-job -u=https://jobs.github.com/positions.json -qp=full_time:false -qpd=description:::--desc&&location:::--loc -d=List full time jobs from Github jobs @cakcuk\n-pr=\nList of Jobs \\n \n{{ range . }} \n\\n\nJob: {{ .title }} \\n\nType: {{ .type }} \\n\nLocation: {{ .location }} \\n\n{{ end }}\n--update",
      info: "Simply put `--update` for forcing update to create command."
    }, {
      title: "Execute Command",
      syntaxt: "get-job --loc=usa --desc=python @cakcuk",
      info: "Simply execute your `get-job` command. Please note that command creation has expiration time on Playground. It will just exist for 5 minutes."
    }, {
      title: "No Parse",
      syntaxt: "get-job --loc=usa --desc=python -np @cakcuk",
      info: "`--noParse, -np` is useful for debugging when you create command in your workspace."
    }]
  }, {
    key: "Custom Command - Overwrite Option",
    examples: [{
      title: "Create Command",
      syntaxt: "cak -c=test-param-add -u=https://postman-echo.com/get @cakcuk\n-h=x-my-header:my header value\n-qp=api-key:encrypt=secret-key&&category:food\n-qpd=try-custom:::--change:::custom=always {custom} constant:::mandatory\n-hd=x-custom-header:::--header-custom:::description=just special header:::example=phone\n-d=just for testing special prefix custom and secret\n",
      info: "Create your `test-param-add` command. Explore with your own param if you want to add some values."
    }, {
      title: "Add Param Value",
      syntaxt: "test-param-add --change=changing value --header-custom=this is custom header -qp=add-header:this is new header -qp=category:drinks&&new-query:query test @cakcuk",
      info: "Run the command and compare the response with this command `test-param-add --change=changing value --header-custom=this is custom header @cakcuk`. See the differences."
    }, {
      title: "Execute with Scope",
      syntaxt: "test-param-add -sc=public --change=changing value --header-custom=this is custom header @cakcuk",
      info: "When you created `test-param-add`, Its scope was not specified, thus its scope is public. Try to experimenting scope changes. <br><br>See on `Scope` examples and back again to try this `test-param-add` command execution with different `--scope, -sc` value."
    }]
  }, {
    key: "Default Options",
    examples: [{
      title: "Result as File",
      syntaxt: "help -of @cakcuk",
      info: "`--outputFile, -of` is only working in workspace. It's not working in playground."
    }, {
      title: "Filter Like grep",
      syntaxt: "help -f=scope -ol @cakcuk",
      info: "`--filter, -f` works like grep in terminal."
    }, {
      title: "Print Options",
      syntaxt: "help -po @cakcuk",
      info: "You will see like in Command `Preview` tab of your executed command. It's only working in workspace. In playground it's already printed on preview."
    }, {
      title: "No Result Printed",
      syntaxt: "cuk -m=post -u=https://postman-echo.com/post @cakcuk -bue=name:cakcuk&&id:cakcuk101 -nr",
      info: "It's only working in workspace. In playground, it's still be printed."
    }, {
      title: "No Parse for Debugging",
      syntaxt: "cuk -u=https://api.covid19api.com/dayone/country/{{country}}/status/{{status}}\n-up=country:indonesia&&status:confirmed\n-pr=\nCovid19 Confirmed Cases in Indonesia \\n\n{{ range . }} \n\\n\nDate: {{ .Date }} \\n\nCases: {{ .Cases }} \\n\n{{ end }}\n@cakcuk\n-np",
      info: "It will print raw result. It's also working for your custom commands."
    }]
  }];
  var FAQ = [{
    question: "Will Cakcuk support other workspaces",
    answer: "Yes, of course. Currently, <a href='#'>Cakcuk</a> only supports Slack, and Telegram is on a timeline for the nearest future. Do you have any ideas? Just simply <a href='mailto:midzulqornain@gmail.com'>mail me</a>."
  }, {
    question: "How do I integrate my workspace with Cakcuk",
    answer: "Just <a href='https://cakcuk.io/slack/add'>add Cakcuk in your workspace</a> directly or <a href='#/docs/deploy'> deploy by yourself.</a>"
  }, {
    question: "Is Cakcuk free",
    answer: "Free. It's also <a href='https://github.com/isdzulqor/cakcuk' target='_blank'>open-source</a> though."
  }, {
    question: "How do I try Cakcuk easily without any integration, just for curiosity",
    answer: "<a href='#/play'>Play with it!</a> No setup or necessary steps. Examples are provided. Just play around with your own API."
  }, {
    question: "What if I want to play with my own Cakcuk that deployed by myself",
    answer: "An embedded playground is available. You can just go to <i>your-cakcuk-url/ui/play</i>."
  }, {
    question: "How can I give my ideas, suggestions, or feedback for Cakcuk",
    answer: "Any ideas, suggestions, and feedback always desirable. You can <a href='https://docs.google.com/forms/d/e/1FAIpQLSddWL8d3c0pFQGNamfTwNjV2iG3zFHopgfT3SylqeggVi71Ow/viewform?usp=sf_link' target='_blank'>fill in the form</a>, <a href='mailto:midzulqornain@gmail.com' target='_blank'>mail me</a>, or <a href='https://github.com/isdzulqor/cakcuk/issues' target='_blank'>create issues</a> in <a href='https://github.com/isdzulqor/cakcuk' target='_blank'>Cakcuk Github</a>. We're happy to hear from you."
  }, {
    question: "How can I contribute to Cakcuk",
    answer: "<a href='https://github.com/isdzulqor/cakcuk/issues' target='_blank'>Submit your issues</a>, <a href='https://github.com/isdzulqor/cakcuk/pulls' target='_blank'>submit your pull request</a>, <a href='https://docs.google.com/forms/d/e/1FAIpQLSddWL8d3c0pFQGNamfTwNjV2iG3zFHopgfT3SylqeggVi71Ow/viewform?usp=sf_link' target='_blank'>give any feedback</a>, or share Cakcuk to your circle. Any contributions are welcomed."
  }, {
    question: "How can I give sponsorship to Cakcuk",
    answer: "Cakcuk Community version is currently maintained with my budget. If you're willing to provide better infrastructure with your infrastructure space or your budget. It will be great. Any kind of sponsorships is well appreciated. <a href='mailto:midzulqornain@gmail.com' target='_blank'>Please let me know!<a>"
  }];
  var RUN_WAYS = [{
    key: "event-tls-disabled",
    code: "docker run -p 80:80 \\\n      -e MYSQL_HOST=\"your-mysql-host\" \\\n      -e MYSQL_USERNAME=\"your-mysql-username\" \\\n      -e MYSQL_PASSWORD=\"your-mysql-password\" \\\n      -e MYSQL_DATABASE=\"your-mysql-db-name\" \\\n      -e SLACK_TOKEN=\"your-slack-app-token\" \\\n      -e SLACK_VERIFICATION_TOKEN=\"your-slack-verification-token\" \\\n      -e SLACK_EVENT_ENABLED=\"true\" \\\n      isdzulqor/cakcuk:latest"
  }, {
    key: "event-tls-enabled",
    code: "docker run -p 80:80 -p 443:443 \\\n      -e MYSQL_HOST=\"your-mysql-host\" \\\n      -e MYSQL_USERNAME=\"your-mysql-username\" \\\n      -e MYSQL_PASSWORD=\"your-mysql-password\" \\\n      -e MYSQL_DATABASE=\"your-mysql-db-name\" \\\n      -e SLACK_TOKEN=\"your-slack-app-token\" \\\n      -e SLACK_VERIFICATION_TOKEN=\"your-slack-verification-token\" \\\n      -e SLACK_EVENT_ENABLED=\"true\" \\\n      -e TLS_ENABLED=\"true\" \\\n      -e PUBLIC_DOMAINS=\"your-domain-1,www-your-domain-1\" \\\n      isdzulqor/cakcuk:latest"
  }, {
    key: "rtm-tls-disabled",
    code: "docker run -p 80:80 \\\n      -e MYSQL_HOST=\"your-mysql-host\" \\\n      -e MYSQL_USERNAME=\"your-mysql-username\" \\\n      -e MYSQL_PASSWORD=\"your-mysql-password\" \\\n      -e MYSQL_DATABASE=\"your-mysql-db-name\" \\\n      -e SLACK_TOKEN=\"your-slack-app-token\" \\\n      -e SLACK_VERIFICATION_TOKEN=\"your-slack-verification-token\" \\\n      -e SLACK_RTM_ENABLED=\"true\" \\\n      isdzulqor/cakcuk:latest"
  }, {
    key: "rtm-tls-enabled",
    code: "docker run -p 80:80 -p 443:443 \\\n      -e MYSQL_HOST=\"your-mysql-host\" \\\n      -e MYSQL_USERNAME=\"your-mysql-username\" \\\n      -e MYSQL_PASSWORD=\"your-mysql-password\" \\\n      -e MYSQL_DATABASE=\"your-mysql-db-name\" \\\n      -e SLACK_TOKEN=\"your-slack-app-token\" \\\n      -e SLACK_VERIFICATION_TOKEN=\"your-slack-verification-token\" \\\n      -e SLACK_RTM_ENABLED=\"true\" \\\n      -e TLS_ENABLED=\"true\" \\\n      -e PUBLIC_DOMAINS=\"your-domain-1,www-your-domain-1\" \\\n      isdzulqor/cakcuk:latest"
  }, {
    key: "docker-compose",
    code: "docker-compose -f docker-compose.yaml up -d"
  }];
  var PRIVACY_POLICY = "\n<a href=\"https://isdzulqor.com\" target=\"_blank\"><b>Isdzulqor</b></a> built **Cakcuk** as a Free and Open Source app. This SERVICE is provided by <a href=\"https://isdzulqor.com\" target=\"_blank\"><b>Isdzulqor</b></a> at no cost and is intended for use as is.\n\nThis page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.\n\nIf you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.\n\n**Information Collection and Use**\n\nFree Cakcuk community version app which is can be installed on your workspace. We collect minimum data only for supporting the Cakcuk app functionalities. Such as Team ID, and Team Name for unique identity per workspace to support Cakcuk features. User ID, and User name needed for the [Scope](#/docs/scopeCommand) and [Superuser](#/docs/suCommand) features. And also the data for [Custom Commands](#/docs/customCommand) that your team has created.\n\n\n**Log Data**\n\nFor a better experience, we may also save the Log Data for this site to collect some information. This Log Data may include information such as your device Internet Protocol (\u201CIP\u201D) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.\n\n**Cookies**\n\nCookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.\n\nThis Service does not use these \u201Ccookies\u201D explicitly. However, the app may use third party code and libraries that use \u201Ccookies\u201D to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.\n\n**Service Providers**\n\nI may employ third-party companies and individuals due to the following reasons:\n\n*   To facilitate our Service;\n*   To provide the Service on our behalf;\n*   To perform Service-related services; or\n*   To assist us in analyzing how our Service is used.\n\nI want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.\n\n**Security**\n\nI value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.\n\n**Links to Other Sites**\n\nThis Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.\n\n**Changes to This Privacy Policy**\n\nI may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page.\n\nThis policy is effective as of 2020-06-10\n\n**Contact Us**\n\nIf you have any questions or suggestions about our Privacy Policy, do not hesitate to contact me at midzulqornain@gmail.com.\n\n";
  var MOCK_DATA = {
    HELP_EXAMPLES: HELP_EXAMPLES,
    SNIPPET_EXAMPLES: SNIPPET_EXAMPLES,
    SNIPPET_CONSOLE: SNIPPET_CONSOLE,
    FAQ: FAQ,
    RUN_WAYS: RUN_WAYS,
    PRIVACY_POLICY: PRIVACY_POLICY
  };

  function _callSuper$a(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$a() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$a() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$a = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$8 = "src/components/content/Play.svelte";
  function create_fragment$9(ctx) {
    var div3;
    var div2;
    var div1;
    var div0;
    var br0;
    var t0;
    var br1;
    var t1;
    var h4;
    var t3;
    var span;
    var t4;
    var playeditor;
    var current;
    playeditor = new PlayEditor({
      props: {
        examples: MOCK_DATA.SNIPPET_EXAMPLES
      },
      $$inline: true
    });
    var block = {
      c: function () {
        div3 = element("div");
        div2 = element("div");
        div1 = element("div");
        div0 = element("div");
        br0 = element("br");
        t0 = space();
        br1 = element("br");
        t1 = space();
        h4 = element("h4");
        h4.textContent = "- Play around with Cakcuk -";
        t3 = space();
        span = element("span");
        t4 = space();
        create_component(playeditor.$$.fragment);
        add_location(br0, file$8, 10, 16, 339);
        add_location(br1, file$8, 11, 16, 360);
        add_location(h4, file$8, 12, 16, 381);
        attr_dev(div0, "class", "sub-header svelte-136146h");
        add_location(div0, file$8, 9, 12, 298);
        attr_dev(div1, "class", "pure-u-1 pure-u-md-1-1");
        add_location(div1, file$8, 8, 8, 249);
        attr_dev(span, "id", "editor");
        add_location(span, file$8, 15, 8, 460);
        attr_dev(div2, "class", "pure-g");
        add_location(div2, file$8, 7, 4, 220);
        attr_dev(div3, "class", "bg svelte-136146h");
        add_location(div3, file$8, 6, 0, 199);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div3, anchor);
        append_dev(div3, div2);
        append_dev(div2, div1);
        append_dev(div1, div0);
        append_dev(div0, br0);
        append_dev(div0, t0);
        append_dev(div0, br1);
        append_dev(div0, t1);
        append_dev(div0, h4);
        append_dev(div2, t3);
        append_dev(div2, span);
        append_dev(div2, t4);
        mount_component(playeditor, div2, null);
        current = true;
      },
      p: noop$1,
      i: function (local) {
        if (current) return;
        transition_in(playeditor.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(playeditor.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div3);
        destroy_component(playeditor);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$9.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$9($$self, $$props) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('Play', slots, []);
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Play> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$capture_state = function () {
      return {
        PlayEditor: PlayEditor,
        DATA: MOCK_DATA
      };
    };
    return [];
  }
  var Play = /*#__PURE__*/function (_SvelteComponentDev) {
    function Play(options) {
      var _this;
      _classCallCheck(this, Play);
      _this = _callSuper$a(this, Play, [options]);
      init(_this, options, instance$9, create_fragment$9, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "Play",
        options: options,
        id: create_fragment$9.name
      });
      return _this;
    }
    _inherits(Play, _SvelteComponentDev);
    return _createClass(Play);
  }(SvelteComponentDev);

  function _callSuper$b(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$b() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$b() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$b = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$9 = "src/components/content/Content.svelte";
  function create_fragment$a(ctx) {
    var div;
    var howworks;
    var t0;
    var example;
    var t1;
    var newsletter;
    var t2;
    var footer;
    var current;
    howworks = new HowWorks({
      $$inline: true
    });
    example = new Example({
      $$inline: true
    });
    newsletter = new Newsletter({
      $$inline: true
    });
    footer = new Footer({
      $$inline: true
    });
    var block = {
      c: function () {
        div = element("div");
        create_component(howworks.$$.fragment);
        t0 = space();
        create_component(example.$$.fragment);
        t1 = space();
        create_component(newsletter.$$.fragment);
        t2 = space();
        create_component(footer.$$.fragment);
        attr_dev(div, "class", "content-wrapper svelte-1eftkkt");
        add_location(div, file$9, 9, 0, 236);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div, anchor);
        mount_component(howworks, div, null);
        append_dev(div, t0);
        mount_component(example, div, null);
        append_dev(div, t1);
        mount_component(newsletter, div, null);
        append_dev(div, t2);
        mount_component(footer, div, null);
        current = true;
      },
      p: noop$1,
      i: function (local) {
        if (current) return;
        transition_in(howworks.$$.fragment, local);
        transition_in(example.$$.fragment, local);
        transition_in(newsletter.$$.fragment, local);
        transition_in(footer.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(howworks.$$.fragment, local);
        transition_out(example.$$.fragment, local);
        transition_out(newsletter.$$.fragment, local);
        transition_out(footer.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div);
        destroy_component(howworks);
        destroy_component(example);
        destroy_component(newsletter);
        destroy_component(footer);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$a.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$a($$self, $$props) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('Content', slots, []);
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Content> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$capture_state = function () {
      return {
        Example: Example,
        HowWorks: HowWorks,
        Footer: Footer,
        Newsletter: Newsletter,
        Play: Play
      };
    };
    return [];
  }
  var Content = /*#__PURE__*/function (_SvelteComponentDev) {
    function Content(options) {
      var _this;
      _classCallCheck(this, Content);
      _this = _callSuper$b(this, Content, [options]);
      init(_this, options, instance$a, create_fragment$a, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "Content",
        options: options,
        id: create_fragment$a.name
      });
      return _this;
    }
    _inherits(Content, _SvelteComponentDev);
    return _createClass(Content);
  }(SvelteComponentDev);

  function _callSuper$c(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$c() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$c() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$c = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$a = "src/components/navbar/Navbar.svelte";

  // (11:20) <Lazy fadeOption={null}>
  function create_default_slot_2$1(ctx) {
    var img;
    var img_src_value;
    var block = {
      c: function () {
        img = element("img");
        attr_dev(img, "class", "icon svelte-wq0fde");
        if (!src_url_equal(img.src, img_src_value = "images/github.svg")) attr_dev(img, "src", img_src_value);
        attr_dev(img, "alt", "Cakcuk Github Link");
        add_location(img, file$a, 11, 24, 382);
      },
      m: function (target, anchor) {
        insert_dev(target, img, anchor);
      },
      p: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(img);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot_2$1.name,
      type: "slot",
      source: "(11:20) <Lazy fadeOption={null}>",
      ctx: ctx
    });
    return block;
  }

  // (17:20) <Lazy fadeOption={null}>
  function create_default_slot_1$2(ctx) {
    var img;
    var img_src_value;
    var block = {
      c: function () {
        img = element("img");
        attr_dev(img, "class", "icon svelte-wq0fde");
        if (!src_url_equal(img.src, img_src_value = "images/twitter.svg")) attr_dev(img, "src", img_src_value);
        attr_dev(img, "alt", "Cakcuk Twitter Link");
        add_location(img, file$a, 17, 24, 683);
      },
      m: function (target, anchor) {
        insert_dev(target, img, anchor);
      },
      p: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(img);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot_1$2.name,
      type: "slot",
      source: "(17:20) <Lazy fadeOption={null}>",
      ctx: ctx
    });
    return block;
  }

  // (27:20) <Lazy fadeOption={null}>
  function create_default_slot$5(ctx) {
    var img;
    var img_src_value;
    var block = {
      c: function () {
        img = element("img");
        attr_dev(img, "id", "logo");
        attr_dev(img, "alt", "Cakcuk Logo");
        if (!src_url_equal(img.src, img_src_value = "images/cakcuk_logo.png")) attr_dev(img, "src", img_src_value);
        attr_dev(img, "class", "svelte-wq0fde");
        add_location(img, file$a, 27, 24, 1097);
      },
      m: function (target, anchor) {
        insert_dev(target, img, anchor);
      },
      p: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(img);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot$5.name,
      type: "slot",
      source: "(27:20) <Lazy fadeOption={null}>",
      ctx: ctx
    });
    return block;
  }
  function create_fragment$b(ctx) {
    var div2;
    var div1;
    var div0;
    var span;
    var a0;
    var lazy0;
    var t0;
    var a1;
    var lazy1;
    var t1;
    var ul;
    var li0;
    var a2;
    var lazy2;
    var t2;
    var li1;
    var a3;
    var t4;
    var li2;
    var a4;
    var t6;
    var li3;
    var a5;
    var div1_class_value;
    var current;
    lazy0 = new Src({
      props: {
        fadeOption: null,
        $$slots: {
          default: [create_default_slot_2$1]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    lazy1 = new Src({
      props: {
        fadeOption: null,
        $$slots: {
          default: [create_default_slot_1$2]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    lazy2 = new Src({
      props: {
        fadeOption: null,
        $$slots: {
          default: [create_default_slot$5]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    var block = {
      c: function () {
        div2 = element("div");
        div1 = element("div");
        div0 = element("div");
        span = element("span");
        a0 = element("a");
        create_component(lazy0.$$.fragment);
        t0 = text("\n                 \n                ");
        a1 = element("a");
        create_component(lazy1.$$.fragment);
        t1 = space();
        ul = element("ul");
        li0 = element("li");
        a2 = element("a");
        create_component(lazy2.$$.fragment);
        t2 = space();
        li1 = element("li");
        a3 = element("a");
        a3.textContent = "Play";
        t4 = space();
        li2 = element("li");
        a4 = element("a");
        a4.textContent = "FAQ";
        t6 = space();
        li3 = element("li");
        a5 = element("a");
        a5.textContent = "Docs";
        attr_dev(a0, "href", "https://github.com/isdzulqor/cakcuk");
        attr_dev(a0, "target", "_blank");
        attr_dev(a0, "class", "icon-link svelte-wq0fde");
        add_location(a0, file$a, 9, 16, 232);
        attr_dev(a1, "href", "https://twitter.com/cakcukio");
        attr_dev(a1, "target", "_blank");
        attr_dev(a1, "class", "icon-link svelte-wq0fde");
        add_location(a1, file$a, 15, 16, 540);
        attr_dev(span, "class", "svelte-wq0fde");
        add_location(span, file$a, 8, 12, 209);
        attr_dev(div0, "class", "pure-menu-heading svelte-wq0fde");
        add_location(div0, file$a, 7, 8, 165);
        attr_dev(a2, "href", "#");
        attr_dev(a2, "class", "pure-menu-link svelte-wq0fde");
        add_location(a2, file$a, 25, 16, 992);
        attr_dev(li0, "class", "pure-menu-item svelte-wq0fde");
        add_location(li0, file$a, 23, 12, 887);
        attr_dev(a3, "href", "#/play");
        attr_dev(a3, "class", "pure-menu-link svelte-wq0fde");
        add_location(a3, file$a, 34, 16, 1384);
        attr_dev(li1, "class", "pure-menu-item svelte-wq0fde");
        add_location(li1, file$a, 32, 12, 1276);
        attr_dev(a4, "href", "#/faq");
        attr_dev(a4, "class", "pure-menu-link svelte-wq0fde");
        add_location(a4, file$a, 39, 16, 1607);
        attr_dev(li2, "class", "pure-menu-item svelte-wq0fde");
        add_location(li2, file$a, 37, 12, 1500);
        attr_dev(a5, "href", "#/docs");
        attr_dev(a5, "class", "pure-menu-link svelte-wq0fde");
        add_location(a5, file$a, 44, 16, 1861);
        attr_dev(li3, "class", "pure-menu-item pure-menu-selected link-special svelte-wq0fde");
        add_location(li3, file$a, 42, 12, 1721);
        attr_dev(ul, "class", "pure-menu-list svelte-wq0fde");
        add_location(ul, file$a, 22, 8, 847);
        attr_dev(div1, "class", div1_class_value = "home-menu pure-menu-horizontal pure-menu-fixed " + /*state*/ctx[0] + " svelte-wq0fde");
        add_location(div1, file$a, 6, 4, 88);
        add_location(div2, file$a, 5, 0, 78);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div2, anchor);
        append_dev(div2, div1);
        append_dev(div1, div0);
        append_dev(div0, span);
        append_dev(span, a0);
        mount_component(lazy0, a0, null);
        append_dev(span, t0);
        append_dev(span, a1);
        mount_component(lazy1, a1, null);
        append_dev(div1, t1);
        append_dev(div1, ul);
        append_dev(ul, li0);
        append_dev(li0, a2);
        mount_component(lazy2, a2, null);
        append_dev(ul, t2);
        append_dev(ul, li1);
        append_dev(li1, a3);
        append_dev(ul, t4);
        append_dev(ul, li2);
        append_dev(li2, a4);
        append_dev(ul, t6);
        append_dev(ul, li3);
        append_dev(li3, a5);
        current = true;
      },
      p: function (ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        var lazy0_changes = {};
        if (dirty & /*$$scope*/2) {
          lazy0_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        lazy0.$set(lazy0_changes);
        var lazy1_changes = {};
        if (dirty & /*$$scope*/2) {
          lazy1_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        lazy1.$set(lazy1_changes);
        var lazy2_changes = {};
        if (dirty & /*$$scope*/2) {
          lazy2_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        lazy2.$set(lazy2_changes);
        if (!current || dirty & /*state*/1 && div1_class_value !== (div1_class_value = "home-menu pure-menu-horizontal pure-menu-fixed " + /*state*/ctx[0] + " svelte-wq0fde")) {
          attr_dev(div1, "class", div1_class_value);
        }
      },
      i: function (local) {
        if (current) return;
        transition_in(lazy0.$$.fragment, local);
        transition_in(lazy1.$$.fragment, local);
        transition_in(lazy2.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(lazy0.$$.fragment, local);
        transition_out(lazy1.$$.fragment, local);
        transition_out(lazy2.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div2);
        destroy_component(lazy0);
        destroy_component(lazy1);
        destroy_component(lazy2);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$b.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$b($$self, $$props, $$invalidate) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('Navbar', slots, []);
    var state = $$props.state;
    $$self.$$.on_mount.push(function () {
      if (state === undefined && !('state' in $$props || $$self.$$.bound[$$self.$$.props['state']])) {
        console.warn("<Navbar> was created without expected prop 'state'");
      }
    });
    var writable_props = ['state'];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Navbar> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$$set = function ($$props) {
      if ('state' in $$props) $$invalidate(0, state = $$props.state);
    };
    $$self.$capture_state = function () {
      return {
        Lazy: Src,
        state: state
      };
    };
    $$self.$inject_state = function ($$props) {
      if ('state' in $$props) $$invalidate(0, state = $$props.state);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    return [state];
  }
  var Navbar = /*#__PURE__*/function (_SvelteComponentDev) {
    function Navbar(options) {
      var _this;
      _classCallCheck(this, Navbar);
      _this = _callSuper$c(this, Navbar, [options]);
      init(_this, options, instance$b, create_fragment$b, safe_not_equal, {
        state: 0
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "Navbar",
        options: options,
        id: create_fragment$b.name
      });
      return _this;
    }
    _inherits(Navbar, _SvelteComponentDev);
    return _createClass(Navbar, [{
      key: "state",
      get: function () {
        throw new Error("<Navbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<Navbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }]);
  }(SvelteComponentDev);

  function _callSuper$d(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$d() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$d() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$d = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$b = "src/components/shared/CodeWrap.svelte";
  function create_fragment$c(ctx) {
    var div;
    var div_class_value;
    var current;
    var default_slot_template = /*#slots*/ctx[2].default;
    var default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ctx[1], null);
    var block = {
      c: function () {
        div = element("div");
        if (default_slot) default_slot.c();
        attr_dev(div, "class", div_class_value = "codeWrap " + /*type*/ctx[0] + " svelte-tdf7b7");
        add_location(div, file$b, 3, 0, 39);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div, anchor);
        if (default_slot) {
          default_slot.m(div, null);
        }
        current = true;
      },
      p: function (ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/2)) {
            update_slot_base(default_slot, default_slot_template, ctx, /*$$scope*/ctx[1], !current ? get_all_dirty_from_scope(/*$$scope*/ctx[1]) : get_slot_changes(default_slot_template, /*$$scope*/ctx[1], dirty, null), null);
          }
        }
        if (!current || dirty & /*type*/1 && div_class_value !== (div_class_value = "codeWrap " + /*type*/ctx[0] + " svelte-tdf7b7")) {
          attr_dev(div, "class", div_class_value);
        }
      },
      i: function (local) {
        if (current) return;
        transition_in(default_slot, local);
        current = true;
      },
      o: function (local) {
        transition_out(default_slot, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div);
        if (default_slot) default_slot.d(detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$c.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$c($$self, $$props, $$invalidate) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('CodeWrap', slots, ['default']);
    var type = $$props.type;
    $$self.$$.on_mount.push(function () {
      if (type === undefined && !('type' in $$props || $$self.$$.bound[$$self.$$.props['type']])) {
        console.warn("<CodeWrap> was created without expected prop 'type'");
      }
    });
    var writable_props = ['type'];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<CodeWrap> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$$set = function ($$props) {
      if ('type' in $$props) $$invalidate(0, type = $$props.type);
      if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    };
    $$self.$capture_state = function () {
      return {
        type: type
      };
    };
    $$self.$inject_state = function ($$props) {
      if ('type' in $$props) $$invalidate(0, type = $$props.type);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    return [type, $$scope, slots];
  }
  var CodeWrap = /*#__PURE__*/function (_SvelteComponentDev) {
    function CodeWrap(options) {
      var _this;
      _classCallCheck(this, CodeWrap);
      _this = _callSuper$d(this, CodeWrap, [options]);
      init(_this, options, instance$c, create_fragment$c, safe_not_equal, {
        type: 0
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "CodeWrap",
        options: options,
        id: create_fragment$c.name
      });
      return _this;
    }
    _inherits(CodeWrap, _SvelteComponentDev);
    return _createClass(CodeWrap, [{
      key: "type",
      get: function () {
        throw new Error("<CodeWrap>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<CodeWrap>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }]);
  }(SvelteComponentDev);

  function _callSuper$e(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$e() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$e() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$e = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$c = "src/components/navbar/Searchbar.svelte";
  function create_fragment$d(ctx) {
    var div1;
    var div0;
    var span0;
    var input;
    var t0;
    var span1;
    var img0;
    var img0_src_value;
    var t1;
    var img1;
    var img1_src_value;
    var div0_class_value;
    var block = {
      c: function () {
        div1 = element("div");
        div0 = element("div");
        span0 = element("span");
        input = element("input");
        t0 = space();
        span1 = element("span");
        img0 = element("img");
        t1 = text("\n             \n            ");
        img1 = element("img");
        attr_dev(input, "type", "text");
        attr_dev(input, "placeholder", "Search");
        attr_dev(input, "class", "svelte-1wqc1qo");
        add_location(input, file$c, 7, 12, 169);
        attr_dev(span0, "class", "search-input svelte-1wqc1qo");
        add_location(span0, file$c, 6, 8, 129);
        attr_dev(img0, "class", "icon svelte-1wqc1qo");
        if (!src_url_equal(img0.src, img0_src_value = "images/twitter_grey.svg")) attr_dev(img0, "src", img0_src_value);
        add_location(img0, file$c, 10, 12, 253);
        attr_dev(img1, "class", "icon svelte-1wqc1qo");
        if (!src_url_equal(img1.src, img1_src_value = "images/github_grey.svg")) attr_dev(img1, "src", img1_src_value);
        add_location(img1, file$c, 12, 12, 335);
        attr_dev(span1, "class", "svelte-1wqc1qo");
        add_location(span1, file$c, 9, 8, 234);
        attr_dev(div0, "class", div0_class_value = "home-menu pure-menu-horizontal pure-menu-fixed " + /*state*/ctx[0] + " svelte-1wqc1qo");
        add_location(div0, file$c, 5, 4, 52);
        add_location(div1, file$c, 4, 0, 42);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div1, anchor);
        append_dev(div1, div0);
        append_dev(div0, span0);
        append_dev(span0, input);
        append_dev(div0, t0);
        append_dev(div0, span1);
        append_dev(span1, img0);
        append_dev(span1, t1);
        append_dev(span1, img1);
      },
      p: function (ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        if (dirty & /*state*/1 && div0_class_value !== (div0_class_value = "home-menu pure-menu-horizontal pure-menu-fixed " + /*state*/ctx[0] + " svelte-1wqc1qo")) {
          attr_dev(div0, "class", div0_class_value);
        }
      },
      i: noop$1,
      o: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(div1);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$d.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$d($$self, $$props, $$invalidate) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('Searchbar', slots, []);
    var state = $$props.state;
    $$self.$$.on_mount.push(function () {
      if (state === undefined && !('state' in $$props || $$self.$$.bound[$$self.$$.props['state']])) {
        console.warn("<Searchbar> was created without expected prop 'state'");
      }
    });
    var writable_props = ['state'];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Searchbar> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$$set = function ($$props) {
      if ('state' in $$props) $$invalidate(0, state = $$props.state);
    };
    $$self.$capture_state = function () {
      return {
        state: state
      };
    };
    $$self.$inject_state = function ($$props) {
      if ('state' in $$props) $$invalidate(0, state = $$props.state);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    return [state];
  }
  var Searchbar = /*#__PURE__*/function (_SvelteComponentDev) {
    function Searchbar(options) {
      var _this;
      _classCallCheck(this, Searchbar);
      _this = _callSuper$e(this, Searchbar, [options]);
      init(_this, options, instance$d, create_fragment$d, safe_not_equal, {
        state: 0
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "Searchbar",
        options: options,
        id: create_fragment$d.name
      });
      return _this;
    }
    _inherits(Searchbar, _SvelteComponentDev);
    return _createClass(Searchbar, [{
      key: "state",
      get: function () {
        throw new Error("<Searchbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<Searchbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }]);
  }(SvelteComponentDev);

  function _callSuper$f(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$f() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$f() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$f = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$d = "src/components/docs/sections/SectionGetStarted.svelte";

  // (24:16) <Lazy fadeOption={null}>
  function create_default_slot_5(ctx) {
    var img;
    var img_src_value;
    var block = {
      c: function () {
        img = element("img");
        attr_dev(img, "alt", "Add to Slack");
        attr_dev(img, "height", "40");
        attr_dev(img, "width", "150");
        if (!src_url_equal(img.src, img_src_value = "images/btn-add-to-slack.svg")) attr_dev(img, "src", img_src_value);
        add_location(img, file$d, 24, 20, 721);
      },
      m: function (target, anchor) {
        insert_dev(target, img, anchor);
      },
      p: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(img);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot_5.name,
      type: "slot",
      source: "(24:16) <Lazy fadeOption={null}>",
      ctx: ctx
    });
    return block;
  }

  // (106:16) <CodeWrap>
  function create_default_slot_4$1(ctx) {
    var t_value = /*getRunWay*/ctx[0]("event-tls-disabled") + "";
    var t;
    var block = {
      c: function () {
        t = text(t_value);
      },
      m: function (target, anchor) {
        insert_dev(target, t, anchor);
      },
      p: function (ctx, dirty) {
        if (dirty & /*getRunWay*/1 && t_value !== (t_value = /*getRunWay*/ctx[0]("event-tls-disabled") + "")) set_data_dev(t, t_value);
      },
      d: function (detaching) {
        if (detaching) detach_dev(t);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot_4$1.name,
      type: "slot",
      source: "(106:16) <CodeWrap>",
      ctx: ctx
    });
    return block;
  }

  // (121:16) <CodeWrap>
  function create_default_slot_3$1(ctx) {
    var t_value = /*getRunWay*/ctx[0]("event-tls-enabled") + "";
    var t;
    var block = {
      c: function () {
        t = text(t_value);
      },
      m: function (target, anchor) {
        insert_dev(target, t, anchor);
      },
      p: function (ctx, dirty) {
        if (dirty & /*getRunWay*/1 && t_value !== (t_value = /*getRunWay*/ctx[0]("event-tls-enabled") + "")) set_data_dev(t, t_value);
      },
      d: function (detaching) {
        if (detaching) detach_dev(t);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot_3$1.name,
      type: "slot",
      source: "(121:16) <CodeWrap>",
      ctx: ctx
    });
    return block;
  }

  // (138:16) <CodeWrap>
  function create_default_slot_2$2(ctx) {
    var t_value = /*getRunWay*/ctx[0]("rtm-tls-disabled") + "";
    var t;
    var block = {
      c: function () {
        t = text(t_value);
      },
      m: function (target, anchor) {
        insert_dev(target, t, anchor);
      },
      p: function (ctx, dirty) {
        if (dirty & /*getRunWay*/1 && t_value !== (t_value = /*getRunWay*/ctx[0]("rtm-tls-disabled") + "")) set_data_dev(t, t_value);
      },
      d: function (detaching) {
        if (detaching) detach_dev(t);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot_2$2.name,
      type: "slot",
      source: "(138:16) <CodeWrap>",
      ctx: ctx
    });
    return block;
  }

  // (147:16) <CodeWrap>
  function create_default_slot_1$3(ctx) {
    var t_value = /*getRunWay*/ctx[0]("rtm-tls-enabled") + "";
    var t;
    var block = {
      c: function () {
        t = text(t_value);
      },
      m: function (target, anchor) {
        insert_dev(target, t, anchor);
      },
      p: function (ctx, dirty) {
        if (dirty & /*getRunWay*/1 && t_value !== (t_value = /*getRunWay*/ctx[0]("rtm-tls-enabled") + "")) set_data_dev(t, t_value);
      },
      d: function (detaching) {
        if (detaching) detach_dev(t);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot_1$3.name,
      type: "slot",
      source: "(147:16) <CodeWrap>",
      ctx: ctx
    });
    return block;
  }

  // (221:16) <CodeWrap>
  function create_default_slot$6(ctx) {
    var t_value = /*getRunWay*/ctx[0]("docker-compose") + "";
    var t;
    var block = {
      c: function () {
        t = text(t_value);
      },
      m: function (target, anchor) {
        insert_dev(target, t, anchor);
      },
      p: function (ctx, dirty) {
        if (dirty & /*getRunWay*/1 && t_value !== (t_value = /*getRunWay*/ctx[0]("docker-compose") + "")) set_data_dev(t, t_value);
      },
      d: function (detaching) {
        if (detaching) detach_dev(t);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot$6.name,
      type: "slot",
      source: "(221:16) <CodeWrap>",
      ctx: ctx
    });
    return block;
  }
  function create_fragment$e(ctx) {
    var div3;
    var div0;
    var h1;
    var t1;
    var h30;
    var t3;
    var div1;
    var t4;
    var div2;
    var p0;
    var t5;
    var a0;
    var t7;
    var a1;
    var t9;
    var br0;
    var t10;
    var br1;
    var t11;
    var a2;
    var lazy;
    var t12;
    var h2;
    var t14;
    var p1;
    var t15;
    var a3;
    var t17;
    var a4;
    var t19;
    var a5;
    var t21;
    var t22;
    var p2;
    var t23;
    var a6;
    var t25;
    var t26;
    var ul0;
    var li0;
    var a7;
    var t28;
    var li1;
    var a8;
    var t30;
    var li2;
    var a9;
    var t32;
    var h31;
    var t34;
    var ul1;
    var li3;
    var t36;
    var li4;
    var t38;
    var li5;
    var t40;
    var li6;
    var t42;
    var li7;
    var t44;
    var li8;
    var t46;
    var p3;
    var t47;
    var a10;
    var t49;
    var a11;
    var t51;
    var t52;
    var h32;
    var t54;
    var ul3;
    var li9;
    var h40;
    var t55;
    var a12;
    var t57;
    var t58;
    var codewrap0;
    var t59;
    var p4;
    var t61;
    var li10;
    var h41;
    var t62;
    var a13;
    var t64;
    var t65;
    var codewrap1;
    var t66;
    var p5;
    var t67;
    var a14;
    var t69;
    var t70;
    var li11;
    var h42;
    var t71;
    var a15;
    var t73;
    var t74;
    var codewrap2;
    var t75;
    var li12;
    var h43;
    var t76;
    var a16;
    var t78;
    var t79;
    var codewrap3;
    var t80;
    var h33;
    var t82;
    var ul2;
    var li13;
    var a17;
    var t84;
    var t85;
    var li14;
    var a18;
    var t87;
    var t88;
    var br2;
    var t89;
    var li15;
    var a19;
    var t91;
    var t92;
    var li16;
    var a20;
    var t94;
    var t95;
    var br3;
    var t96;
    var li17;
    var a21;
    var t98;
    var t99;
    var li18;
    var a22;
    var t101;
    var t102;
    var br4;
    var t103;
    var li19;
    var a23;
    var t105;
    var code0;
    var t107;
    var code1;
    var t109;
    var t110;
    var li20;
    var a24;
    var t112;
    var t113;
    var p6;
    var t114;
    var a25;
    var t116;
    var a26;
    var t118;
    var li21;
    var h44;
    var t119;
    var a27;
    var t121;
    var codewrap4;
    var t122;
    var p7;
    var t123;
    var a28;
    var t125;
    var a29;
    var t127;
    var t128;
    var li22;
    var h45;
    var t129;
    var a30;
    var t131;
    var br5;
    var t132;
    var h34;
    var t134;
    var ul4;
    var li23;
    var t136;
    var p8;
    var t138;
    var li24;
    var t140;
    var p9;
    var t141;
    var code2;
    var t143;
    var code3;
    var t145;
    var t146;
    var li25;
    var t148;
    var p10;
    var t149;
    var code4;
    var t151;
    var a31;
    var t153;
    var t154;
    var li26;
    var t156;
    var p11;
    var t157;
    var a32;
    var t159;
    var a33;
    var t161;
    var t162;
    var br6;
    var current;
    var mounted;
    var dispose;
    lazy = new Src({
      props: {
        fadeOption: null,
        $$slots: {
          default: [create_default_slot_5]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    codewrap0 = new CodeWrap({
      props: {
        $$slots: {
          default: [create_default_slot_4$1]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    codewrap1 = new CodeWrap({
      props: {
        $$slots: {
          default: [create_default_slot_3$1]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    codewrap2 = new CodeWrap({
      props: {
        $$slots: {
          default: [create_default_slot_2$2]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    codewrap3 = new CodeWrap({
      props: {
        $$slots: {
          default: [create_default_slot_1$3]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    codewrap4 = new CodeWrap({
      props: {
        $$slots: {
          default: [create_default_slot$6]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    var block = {
      c: function () {
        div3 = element("div");
        div0 = element("div");
        h1 = element("h1");
        h1.textContent = "Get Started";
        t1 = space();
        h30 = element("h3");
        h30.textContent = "Easy Ways to Get Started with Cakcuk";
        t3 = space();
        div1 = element("div");
        t4 = space();
        div2 = element("div");
        p0 = element("p");
        t5 = text("You can start using ");
        a0 = element("a");
        a0.textContent = "Cakcuk";
        t7 = text(" by adding\n            ");
        a1 = element("a");
        a1.textContent = "Cakcuk";
        t9 = text("\n            to your workspace directly.\n            ");
        br0 = element("br");
        t10 = space();
        br1 = element("br");
        t11 = space();
        a2 = element("a");
        create_component(lazy.$$.fragment);
        t12 = space();
        h2 = element("h2");
        h2.textContent = "Provision your own Cakcuk";
        t14 = space();
        p1 = element("p");
        t15 = text("To get started deploying ");
        a3 = element("a");
        a3.textContent = "Cakcuk";
        t17 = text(" by yourself, make\n            sure you have created the slack app first to get the Slack app\n            token. You can go to\n            ");
        a4 = element("a");
        a4.textContent = "Slack Apps";
        t19 = text("\n            and create one if you haven't created your slack app. You also need\n            to keep the verification token as well. It works for validation of\n            each request from Slack. Put those both tokens on your Cakcuk env\n            just like in\n            ");
        a5 = element("a");
        a5.textContent = "this section";
        t21 = text(".");
        t22 = space();
        p2 = element("p");
        t23 = text("When you use ");
        a6 = element("a");
        a6.textContent = "Slack Event API";
        t25 = text(", you also need to set events for those you subscribe to. There are\n            three events that you need to submit.");
        t26 = space();
        ul0 = element("ul");
        li0 = element("li");
        a7 = element("a");
        a7.textContent = "app_home_opened";
        t28 = space();
        li1 = element("li");
        a8 = element("a");
        a8.textContent = "app_mention";
        t30 = space();
        li2 = element("li");
        a9 = element("a");
        a9.textContent = "message.im";
        t32 = space();
        h31 = element("h3");
        h31.textContent = "Needed Slack scopes for your Cakcuk";
        t34 = space();
        ul1 = element("ul");
        li3 = element("li");
        li3.textContent = "app_mentions:read";
        t36 = space();
        li4 = element("li");
        li4.textContent = "chat:write";
        t38 = space();
        li5 = element("li");
        li5.textContent = "files:write";
        t40 = space();
        li6 = element("li");
        li6.textContent = "im:history";
        t42 = space();
        li7 = element("li");
        li7.textContent = "team:read";
        t44 = space();
        li8 = element("li");
        li8.textContent = "users:read";
        t46 = space();
        p3 = element("p");
        t47 = text("More explanations about ");
        a10 = element("a");
        a10.textContent = "Slack Scopes";
        t49 = text("\n            you can check here\n            ");
        a11 = element("a");
        a11.textContent = "https://api.slack.com/scopes";
        t51 = text(".");
        t52 = space();
        h32 = element("h3");
        h32.textContent = "Some ways to run Cakcuk by yourself";
        t54 = space();
        ul3 = element("ul");
        li9 = element("li");
        h40 = element("h4");
        t55 = text("Cakcuk with ");
        a12 = element("a");
        a12.textContent = "Slack Event API";
        t57 = text(" TLS disabled");
        t58 = space();
        create_component(codewrap0.$$.fragment);
        t59 = space();
        p4 = element("p");
        p4.textContent = "TLS disabled doesn't mean you cannot use HTTPS for your Cakcuk.\n                It gives you an option if you want to deploy it with TLS handled\n                by load balancer or the others, for example, Nginx. So it\n                doesn't need to be handled on the application level.";
        t61 = space();
        li10 = element("li");
        h41 = element("h4");
        t62 = text("Cakcuk with ");
        a13 = element("a");
        a13.textContent = "Slack Event API";
        t64 = text(" TLS Enabled");
        t65 = space();
        create_component(codewrap1.$$.fragment);
        t66 = space();
        p5 = element("p");
        t67 = text("If you use TLS enabled. You need to provide public domains that\n                you need to set for PUBLIC_DOMAINS env. It accepts multiple\n                domains separated by comma. Cakcuk uses ");
        a14 = element("a");
        a14.textContent = "Let's Encrypt";
        t69 = text(" to handle TLS.");
        t70 = space();
        li11 = element("li");
        h42 = element("h4");
        t71 = text("Cakcuk with ");
        a15 = element("a");
        a15.textContent = "Slack RTM API";
        t73 = text(" TLS disabled");
        t74 = space();
        create_component(codewrap2.$$.fragment);
        t75 = space();
        li12 = element("li");
        h43 = element("h4");
        t76 = text("Cakcuk with ");
        a16 = element("a");
        a16.textContent = "Slack RTM API";
        t78 = text(" TLS Enabled");
        t79 = space();
        create_component(codewrap3.$$.fragment);
        t80 = space();
        h33 = element("h3");
        h33.textContent = "A Bit Differences between Slack Event API & Slack RTM API";
        t82 = space();
        ul2 = element("ul");
        li13 = element("li");
        a17 = element("a");
        a17.textContent = "Slack RTM API";
        t84 = text(" doesn't need to expose a public endpoint. Thus it's easier\n                    to integrate with your private cluster if you have.");
        t85 = space();
        li14 = element("li");
        a18 = element("a");
        a18.textContent = "Slack Event API";
        t87 = text(" needs to has a public endpoint and register it to Slack to\n                    be challenged.");
        t88 = space();
        br2 = element("br");
        t89 = space();
        li15 = element("li");
        a19 = element("a");
        a19.textContent = "Slack RTM API";
        t91 = text(" uses WebSocket, so it's realtime and lower latency.");
        t92 = space();
        li16 = element("li");
        a20 = element("a");
        a20.textContent = "Slack Event API";
        t94 = text(" uses HTTPS webhook, it must have higher latency mostly.");
        t95 = space();
        br3 = element("br");
        t96 = space();
        li17 = element("li");
        a21 = element("a");
        a21.textContent = "Slack RTM API";
        t98 = text(" uses higher resource, CPU, memory & bandwidth. WebSocket costs\n                    this.");
        t99 = space();
        li18 = element("li");
        a22 = element("a");
        a22.textContent = "Slack Event API";
        t101 = text(" uses HTTPS webhook, it eats lower resources.");
        t102 = space();
        br4 = element("br");
        t103 = space();
        li19 = element("li");
        a23 = element("a");
        a23.textContent = "Slack RTM API";
        t105 = text("\n                    needs to expose many scopes/permissions, ");
        code0 = element("code");
        code0.textContent = "bot";
        t107 = text("\n                    Slack scope. It has multiple scopes/permissions aggregated\n                    in ");
        code1 = element("code");
        code1.textContent = "bot";
        t109 = text(" Slack scope. That's why RTM API will consume\n                    events that you don't need them as well.");
        t110 = space();
        li20 = element("li");
        a24 = element("a");
        a24.textContent = "Slack Event API";
        t112 = text(" can just use Slack scopes/permission as needed.");
        t113 = space();
        p6 = element("p");
        t114 = text("More about it ");
        a25 = element("a");
        a25.textContent = "https://api.slack.com/events-api";
        t116 = text("\n                and\n                ");
        a26 = element("a");
        a26.textContent = "https://api.slack.com/rtm";
        t118 = space();
        li21 = element("li");
        h44 = element("h4");
        t119 = text("Simply use ");
        a27 = element("a");
        a27.textContent = "docker-compose.yaml";
        t121 = space();
        create_component(codewrap4.$$.fragment);
        t122 = space();
        p7 = element("p");
        t123 = text("Make sure you overwrite the environment variables values as you\n                need. Please see the configurations explanations above, either\n                you use ");
        a28 = element("a");
        a28.textContent = "Event API";
        t125 = text("\n                or\n                ");
        a29 = element("a");
        a29.textContent = "RTM API";
        t127 = text(",\n                with TLS disabled or enabled.");
        t128 = space();
        li22 = element("li");
        h45 = element("h4");
        t129 = text("Clone the ");
        a30 = element("a");
        a30.textContent = "Source on Github";
        t131 = space();
        br5 = element("br");
        t132 = space();
        h34 = element("h3");
        h34.textContent = "Some Environment Variables Explanation";
        t134 = space();
        ul4 = element("ul");
        li23 = element("li");
        li23.textContent = "PORT";
        t136 = space();
        p8 = element("p");
        p8.textContent = "By default, Cakcuk with TLS disabled is using port 80. You can\n                change it as you want by overwriting the PORT env. Keep in mind,\n                it's only for TLS disabled. If you provision your Cakcuk with\n                TLS enabled. It will use port 80 and 443 for sure.";
        t138 = space();
        li24 = element("li");
        li24.textContent = "LOG_LEVEL";
        t140 = space();
        p9 = element("p");
        t141 = text("By default LOG_LEVEL value is ");
        code2 = element("code");
        code2.textContent = "info";
        t143 = text(". It means that\n                logs only print Info, Warn, Error, Fatal, and Panic those are\n                printed on logs. There are 5 types of LOG_LEVEL debug, info,\n                warn, error, fatal, and panic. If you want to print all the logs\n                although is for debugging only. You can overwrite LOG_LEVEL env\n                with ");
        code3 = element("code");
        code3.textContent = "debug";
        t145 = text(" value.");
        t146 = space();
        li25 = element("li");
        li25.textContent = "ENCRYPTION_PASSWORD";
        t148 = space();
        p10 = element("p");
        t149 = text("If you have checked special prefix functionality for ");
        code4 = element("code");
        code4.textContent = "encrypt=";
        t151 = text("\n                and encrypted option in your\n                ");
        a31 = element("a");
        a31.textContent = "Custom Commands";
        t153 = text(". This ENCRYPTION_PASSWORD value is the encryption key for the\n                encryption value. For authentication feature, it also uses this\n                encryption key. Just make sure you customize this\n                ENCRYPTION_PASSWORD env value to keep your sensitive value\n                secured.");
        t154 = space();
        li26 = element("li");
        li26.textContent = "SUPER_USER_MODE_ENABLED";
        t156 = space();
        p11 = element("p");
        t157 = text("SUPER_USER_MODE_ENABLED is true, means enabled by default. It\n                can be disabled by setting the value to be false. If you play\n                the commands on the Playground. You will automatically have\n                access to ");
        a32 = element("a");
        a32.textContent = "Superuser";
        t159 = text(". Just play with\n                ");
        a33 = element("a");
        a33.textContent = "SU";
        t161 = text("\n                command, examples are provided with an explanation on the info section.");
        t162 = space();
        br6 = element("br");
        add_location(h1, file$d, 11, 8, 278);
        add_location(h30, file$d, 12, 8, 307);
        attr_dev(div0, "class", "header");
        add_location(div0, file$d, 10, 4, 249);
        attr_dev(div1, "class", "line");
        add_location(div1, file$d, 14, 4, 368);
        attr_dev(a0, "href", "#");
        add_location(a0, file$d, 17, 32, 463);
        attr_dev(a1, "href", "#");
        add_location(a1, file$d, 18, 12, 508);
        add_location(br0, file$d, 20, 12, 583);
        add_location(br1, file$d, 21, 12, 602);
        attr_dev(a2, "href", "https://cakcuk.io/slack/add");
        add_location(a2, file$d, 22, 12, 621);
        add_location(p0, file$d, 16, 8, 427);
        attr_dev(h2, "id", "deploy");
        attr_dev(h2, "class", "content-subhead");
        add_location(h2, file$d, 34, 8, 985);
        attr_dev(a3, "href", "#");
        add_location(a3, file$d, 36, 37, 1105);
        attr_dev(a4, "target", "_blank");
        attr_dev(a4, "href", "https://api.slack.com/apps");
        add_location(a4, file$d, 39, 12, 1266);
        attr_dev(a5, "class", "common-link");
        attr_dev(a5, "goto", "waysToRun");
        add_location(a5, file$d, 44, 12, 1608);
        add_location(p1, file$d, 35, 8, 1064);
        attr_dev(a6, "href", "https://api.slack.com/events-api");
        attr_dev(a6, "target", "_blank");
        add_location(a6, file$d, 49, 25, 1764);
        add_location(p2, file$d, 48, 8, 1735);
        attr_dev(a7, "href", "https://api.slack.com/events/app_home_opened");
        attr_dev(a7, "target", "_blank");
        add_location(a7, file$d, 57, 16, 2064);
        add_location(li0, file$d, 56, 12, 2043);
        attr_dev(a8, "href", "https://api.slack.com/events/app_mention");
        attr_dev(a8, "target", "_blank");
        add_location(a8, file$d, 63, 16, 2263);
        add_location(li1, file$d, 62, 12, 2242);
        attr_dev(a9, "href", "https://api.slack.com/events/message.im");
        attr_dev(a9, "target", "_blank");
        add_location(a9, file$d, 69, 16, 2454);
        add_location(li2, file$d, 68, 12, 2433);
        add_location(ul0, file$d, 55, 8, 2026);
        attr_dev(h31, "class", "content-subhead");
        add_location(h31, file$d, 75, 8, 2632);
        add_location(li3, file$d, 77, 12, 2726);
        add_location(li4, file$d, 78, 12, 2765);
        add_location(li5, file$d, 79, 12, 2797);
        add_location(li6, file$d, 80, 12, 2830);
        add_location(li7, file$d, 81, 12, 2862);
        add_location(li8, file$d, 82, 12, 2893);
        add_location(ul1, file$d, 76, 8, 2709);
        attr_dev(a10, "target", "_blank");
        attr_dev(a10, "href", "https://api.slack.com/scopes");
        add_location(a10, file$d, 85, 36, 2975);
        attr_dev(a11, "target", "_blank");
        attr_dev(a11, "href", "https://api.slack.com/scopes");
        add_location(a11, file$d, 90, 12, 3135);
        add_location(p3, file$d, 84, 8, 2935);
        attr_dev(h32, "id", "waysToRun");
        attr_dev(h32, "class", "content-subhead");
        add_location(h32, file$d, 94, 8, 3275);
        attr_dev(a12, "href", "https://api.slack.com/events-api");
        attr_dev(a12, "target", "_blank");
        add_location(a12, file$d, 100, 32, 3493);
        attr_dev(h40, "class", "content-subhead-bold");
        add_location(h40, file$d, 99, 16, 3427);
        add_location(li9, file$d, 98, 12, 3406);
        add_location(p4, file$d, 107, 12, 3777);
        attr_dev(a13, "href", "https://api.slack.com/events-api");
        attr_dev(a13, "target", "_blank");
        add_location(a13, file$d, 115, 32, 4201);
        attr_dev(h41, "class", "content-subhead-bold");
        add_location(h41, file$d, 114, 16, 4135);
        add_location(li10, file$d, 113, 12, 4114);
        attr_dev(a14, "href", "https://letsencrypt.org");
        attr_dev(a14, "target", "_blank");
        add_location(a14, file$d, 125, 56, 4699);
        add_location(p5, file$d, 122, 12, 4483);
        attr_dev(a15, "href", "https://api.slack.com/rtm");
        attr_dev(a15, "target", "_blank");
        add_location(a15, file$d, 132, 32, 4955);
        attr_dev(h42, "class", "content-subhead-bold");
        add_location(h42, file$d, 131, 16, 4889);
        add_location(li11, file$d, 130, 12, 4868);
        attr_dev(a16, "href", "https://api.slack.com/rtm");
        attr_dev(a16, "target", "_blank");
        add_location(a16, file$d, 141, 32, 5315);
        attr_dev(h43, "class", "content-subhead-bold");
        add_location(h43, file$d, 140, 16, 5249);
        add_location(li12, file$d, 139, 12, 5228);
        attr_dev(h33, "class", "content-subhead");
        add_location(h33, file$d, 148, 12, 5586);
        attr_dev(a17, "href", "https://api.slack.com/rtm");
        attr_dev(a17, "target", "_blank");
        add_location(a17, file$d, 153, 20, 5765);
        add_location(li13, file$d, 152, 16, 5740);
        attr_dev(a18, "href", "https://api.slack.com/events-api");
        attr_dev(a18, "target", "_blank");
        add_location(a18, file$d, 159, 20, 6075);
        add_location(li14, file$d, 158, 16, 6050);
        add_location(br2, file$d, 164, 16, 6332);
        attr_dev(a19, "href", "https://api.slack.com/rtm");
        attr_dev(a19, "target", "_blank");
        add_location(a19, file$d, 166, 20, 6380);
        add_location(li15, file$d, 165, 16, 6355);
        attr_dev(a20, "href", "https://api.slack.com/events-api");
        attr_dev(a20, "target", "_blank");
        add_location(a20, file$d, 171, 20, 6611);
        add_location(li16, file$d, 170, 16, 6586);
        add_location(br3, file$d, 175, 16, 6830);
        attr_dev(a21, "href", "https://api.slack.com/rtm");
        attr_dev(a21, "target", "_blank");
        add_location(a21, file$d, 177, 20, 6878);
        add_location(li17, file$d, 176, 16, 6853);
        attr_dev(a22, "href", "https://api.slack.com/events-api");
        attr_dev(a22, "target", "_blank");
        add_location(a22, file$d, 183, 20, 7146);
        add_location(li18, file$d, 182, 16, 7121);
        add_location(br4, file$d, 187, 16, 7354);
        attr_dev(a23, "href", "https://api.slack.com/rtm");
        attr_dev(a23, "target", "_blank");
        add_location(a23, file$d, 189, 20, 7402);
        add_location(code0, file$d, 192, 61, 7579);
        add_location(code1, file$d, 194, 23, 7698);
        add_location(li19, file$d, 188, 16, 7377);
        attr_dev(a24, "href", "https://api.slack.com/events-api");
        attr_dev(a24, "target", "_blank");
        add_location(a24, file$d, 198, 20, 7884);
        add_location(li20, file$d, 197, 16, 7859);
        add_location(ul2, file$d, 151, 12, 5719);
        attr_dev(a25, "href", "https://api.slack.com/events-api");
        attr_dev(a25, "target", "_blank");
        add_location(a25, file$d, 204, 30, 8143);
        attr_dev(a26, "href", "https://api.slack.com/rtm");
        attr_dev(a26, "target", "_blank");
        add_location(a26, file$d, 209, 16, 8332);
        add_location(p6, file$d, 203, 12, 8109);
        attr_dev(a27, "href", "https://github.com/isdzulqor/cakcuk/blob/master/docker-compose.yaml");
        attr_dev(a27, "target", "_blank");
        add_location(a27, file$d, 215, 31, 8567);
        attr_dev(h44, "class", "content-subhead-bold");
        add_location(h44, file$d, 214, 16, 8502);
        add_location(li21, file$d, 213, 12, 8481);
        attr_dev(a28, "href", "https://api.slack.com/events-api");
        attr_dev(a28, "target", "_blank");
        add_location(a28, file$d, 225, 24, 9060);
        attr_dev(a29, "href", "https://api.slack.com/rtm");
        attr_dev(a29, "target", "_blank");
        add_location(a29, file$d, 230, 16, 9225);
        add_location(p7, file$d, 222, 12, 8873);
        attr_dev(a30, "href", "https://github.com/isdzulqor/cakcuk");
        attr_dev(a30, "target", "_blank");
        add_location(a30, file$d, 235, 30, 9450);
        attr_dev(h45, "class", "content-subhead-bold");
        add_location(h45, file$d, 234, 16, 9386);
        add_location(li22, file$d, 233, 12, 9365);
        add_location(ul3, file$d, 97, 8, 3389);
        add_location(br5, file$d, 242, 8, 9664);
        attr_dev(h34, "class", "content-subhead");
        add_location(h34, file$d, 243, 8, 9679);
        add_location(li23, file$d, 245, 12, 9776);
        add_location(p8, file$d, 246, 12, 9802);
        add_location(li24, file$d, 252, 12, 10140);
        add_location(code2, file$d, 254, 46, 10221);
        add_location(code3, file$d, 259, 21, 10591);
        add_location(p9, file$d, 253, 12, 10171);
        add_location(li25, file$d, 261, 12, 10646);
        add_location(code4, file$d, 263, 69, 10760);
        attr_dev(a31, "class", "common-link");
        attr_dev(a31, "goto", "customCommand");
        add_location(a31, file$d, 267, 16, 10881);
        add_location(p10, file$d, 262, 12, 10687);
        add_location(li26, file$d, 275, 12, 11338);
        attr_dev(a32, "class", "common-link");
        attr_dev(a32, "goto", "suCommand");
        add_location(a32, file$d, 280, 26, 11645);
        attr_dev(a33, "class", "common-link");
        attr_dev(a33, "goto", "suCommand");
        add_location(a33, file$d, 285, 16, 11826);
        add_location(p11, file$d, 276, 12, 11383);
        add_location(ul4, file$d, 244, 8, 9759);
        add_location(br6, file$d, 289, 8, 12018);
        attr_dev(div2, "class", "content");
        add_location(div2, file$d, 15, 4, 397);
        attr_dev(div3, "class", "main");
        attr_dev(div3, "id", "getStarted");
        add_location(div3, file$d, 9, 0, 189);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div3, anchor);
        append_dev(div3, div0);
        append_dev(div0, h1);
        append_dev(div0, t1);
        append_dev(div0, h30);
        append_dev(div3, t3);
        append_dev(div3, div1);
        append_dev(div3, t4);
        append_dev(div3, div2);
        append_dev(div2, p0);
        append_dev(p0, t5);
        append_dev(p0, a0);
        append_dev(p0, t7);
        append_dev(p0, a1);
        append_dev(p0, t9);
        append_dev(p0, br0);
        append_dev(p0, t10);
        append_dev(p0, br1);
        append_dev(p0, t11);
        append_dev(p0, a2);
        mount_component(lazy, a2, null);
        append_dev(div2, t12);
        append_dev(div2, h2);
        append_dev(div2, t14);
        append_dev(div2, p1);
        append_dev(p1, t15);
        append_dev(p1, a3);
        append_dev(p1, t17);
        append_dev(p1, a4);
        append_dev(p1, t19);
        append_dev(p1, a5);
        append_dev(p1, t21);
        append_dev(div2, t22);
        append_dev(div2, p2);
        append_dev(p2, t23);
        append_dev(p2, a6);
        append_dev(p2, t25);
        append_dev(div2, t26);
        append_dev(div2, ul0);
        append_dev(ul0, li0);
        append_dev(li0, a7);
        append_dev(ul0, t28);
        append_dev(ul0, li1);
        append_dev(li1, a8);
        append_dev(ul0, t30);
        append_dev(ul0, li2);
        append_dev(li2, a9);
        append_dev(div2, t32);
        append_dev(div2, h31);
        append_dev(div2, t34);
        append_dev(div2, ul1);
        append_dev(ul1, li3);
        append_dev(ul1, t36);
        append_dev(ul1, li4);
        append_dev(ul1, t38);
        append_dev(ul1, li5);
        append_dev(ul1, t40);
        append_dev(ul1, li6);
        append_dev(ul1, t42);
        append_dev(ul1, li7);
        append_dev(ul1, t44);
        append_dev(ul1, li8);
        append_dev(div2, t46);
        append_dev(div2, p3);
        append_dev(p3, t47);
        append_dev(p3, a10);
        append_dev(p3, t49);
        append_dev(p3, a11);
        append_dev(p3, t51);
        append_dev(div2, t52);
        append_dev(div2, h32);
        append_dev(div2, t54);
        append_dev(div2, ul3);
        append_dev(ul3, li9);
        append_dev(li9, h40);
        append_dev(h40, t55);
        append_dev(h40, a12);
        append_dev(h40, t57);
        append_dev(li9, t58);
        mount_component(codewrap0, li9, null);
        append_dev(ul3, t59);
        append_dev(ul3, p4);
        append_dev(ul3, t61);
        append_dev(ul3, li10);
        append_dev(li10, h41);
        append_dev(h41, t62);
        append_dev(h41, a13);
        append_dev(h41, t64);
        append_dev(li10, t65);
        mount_component(codewrap1, li10, null);
        append_dev(ul3, t66);
        append_dev(ul3, p5);
        append_dev(p5, t67);
        append_dev(p5, a14);
        append_dev(p5, t69);
        append_dev(ul3, t70);
        append_dev(ul3, li11);
        append_dev(li11, h42);
        append_dev(h42, t71);
        append_dev(h42, a15);
        append_dev(h42, t73);
        append_dev(li11, t74);
        mount_component(codewrap2, li11, null);
        append_dev(ul3, t75);
        append_dev(ul3, li12);
        append_dev(li12, h43);
        append_dev(h43, t76);
        append_dev(h43, a16);
        append_dev(h43, t78);
        append_dev(li12, t79);
        mount_component(codewrap3, li12, null);
        append_dev(ul3, t80);
        append_dev(ul3, h33);
        append_dev(ul3, t82);
        append_dev(ul3, ul2);
        append_dev(ul2, li13);
        append_dev(li13, a17);
        append_dev(li13, t84);
        append_dev(ul2, t85);
        append_dev(ul2, li14);
        append_dev(li14, a18);
        append_dev(li14, t87);
        append_dev(ul2, t88);
        append_dev(ul2, br2);
        append_dev(ul2, t89);
        append_dev(ul2, li15);
        append_dev(li15, a19);
        append_dev(li15, t91);
        append_dev(ul2, t92);
        append_dev(ul2, li16);
        append_dev(li16, a20);
        append_dev(li16, t94);
        append_dev(ul2, t95);
        append_dev(ul2, br3);
        append_dev(ul2, t96);
        append_dev(ul2, li17);
        append_dev(li17, a21);
        append_dev(li17, t98);
        append_dev(ul2, t99);
        append_dev(ul2, li18);
        append_dev(li18, a22);
        append_dev(li18, t101);
        append_dev(ul2, t102);
        append_dev(ul2, br4);
        append_dev(ul2, t103);
        append_dev(ul2, li19);
        append_dev(li19, a23);
        append_dev(li19, t105);
        append_dev(li19, code0);
        append_dev(li19, t107);
        append_dev(li19, code1);
        append_dev(li19, t109);
        append_dev(ul2, t110);
        append_dev(ul2, li20);
        append_dev(li20, a24);
        append_dev(li20, t112);
        append_dev(ul3, t113);
        append_dev(ul3, p6);
        append_dev(p6, t114);
        append_dev(p6, a25);
        append_dev(p6, t116);
        append_dev(p6, a26);
        append_dev(ul3, t118);
        append_dev(ul3, li21);
        append_dev(li21, h44);
        append_dev(h44, t119);
        append_dev(h44, a27);
        append_dev(li21, t121);
        mount_component(codewrap4, li21, null);
        append_dev(ul3, t122);
        append_dev(ul3, p7);
        append_dev(p7, t123);
        append_dev(p7, a28);
        append_dev(p7, t125);
        append_dev(p7, a29);
        append_dev(p7, t127);
        append_dev(ul3, t128);
        append_dev(ul3, li22);
        append_dev(li22, h45);
        append_dev(h45, t129);
        append_dev(h45, a30);
        append_dev(div2, t131);
        append_dev(div2, br5);
        append_dev(div2, t132);
        append_dev(div2, h34);
        append_dev(div2, t134);
        append_dev(div2, ul4);
        append_dev(ul4, li23);
        append_dev(ul4, t136);
        append_dev(ul4, p8);
        append_dev(ul4, t138);
        append_dev(ul4, li24);
        append_dev(ul4, t140);
        append_dev(ul4, p9);
        append_dev(p9, t141);
        append_dev(p9, code2);
        append_dev(p9, t143);
        append_dev(p9, code3);
        append_dev(p9, t145);
        append_dev(ul4, t146);
        append_dev(ul4, li25);
        append_dev(ul4, t148);
        append_dev(ul4, p10);
        append_dev(p10, t149);
        append_dev(p10, code4);
        append_dev(p10, t151);
        append_dev(p10, a31);
        append_dev(p10, t153);
        append_dev(ul4, t154);
        append_dev(ul4, li26);
        append_dev(ul4, t156);
        append_dev(ul4, p11);
        append_dev(p11, t157);
        append_dev(p11, a32);
        append_dev(p11, t159);
        append_dev(p11, a33);
        append_dev(p11, t161);
        append_dev(div2, t162);
        append_dev(div2, br6);
        current = true;
        if (!mounted) {
          dispose = [listen_dev(a5, "click", function () {
            if (is_function(/*scroll*/ctx[1])) /*scroll*/ctx[1].apply(this, arguments);
          }, false, false, false, false), listen_dev(a31, "click", function () {
            if (is_function(/*scroll*/ctx[1])) /*scroll*/ctx[1].apply(this, arguments);
          }, false, false, false, false), listen_dev(a32, "click", function () {
            if (is_function(/*scroll*/ctx[1])) /*scroll*/ctx[1].apply(this, arguments);
          }, false, false, false, false), listen_dev(a33, "click", function () {
            if (is_function(/*scroll*/ctx[1])) /*scroll*/ctx[1].apply(this, arguments);
          }, false, false, false, false), listen_dev(div3, "click", function () {
            if (is_function(/*clickMain*/ctx[2])) /*clickMain*/ctx[2].apply(this, arguments);
          }, false, false, false, false)];
          mounted = true;
        }
      },
      p: function (new_ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        ctx = new_ctx;
        var lazy_changes = {};
        if (dirty & /*$$scope*/8) {
          lazy_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        lazy.$set(lazy_changes);
        var codewrap0_changes = {};
        if (dirty & /*$$scope, getRunWay*/9) {
          codewrap0_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        codewrap0.$set(codewrap0_changes);
        var codewrap1_changes = {};
        if (dirty & /*$$scope, getRunWay*/9) {
          codewrap1_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        codewrap1.$set(codewrap1_changes);
        var codewrap2_changes = {};
        if (dirty & /*$$scope, getRunWay*/9) {
          codewrap2_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        codewrap2.$set(codewrap2_changes);
        var codewrap3_changes = {};
        if (dirty & /*$$scope, getRunWay*/9) {
          codewrap3_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        codewrap3.$set(codewrap3_changes);
        var codewrap4_changes = {};
        if (dirty & /*$$scope, getRunWay*/9) {
          codewrap4_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        codewrap4.$set(codewrap4_changes);
      },
      i: function (local) {
        if (current) return;
        transition_in(lazy.$$.fragment, local);
        transition_in(codewrap0.$$.fragment, local);
        transition_in(codewrap1.$$.fragment, local);
        transition_in(codewrap2.$$.fragment, local);
        transition_in(codewrap3.$$.fragment, local);
        transition_in(codewrap4.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(lazy.$$.fragment, local);
        transition_out(codewrap0.$$.fragment, local);
        transition_out(codewrap1.$$.fragment, local);
        transition_out(codewrap2.$$.fragment, local);
        transition_out(codewrap3.$$.fragment, local);
        transition_out(codewrap4.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div3);
        destroy_component(lazy);
        destroy_component(codewrap0);
        destroy_component(codewrap1);
        destroy_component(codewrap2);
        destroy_component(codewrap3);
        destroy_component(codewrap4);
        mounted = false;
        run_all(dispose);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$e.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$e($$self, $$props, $$invalidate) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('SectionGetStarted', slots, []);
    var getRunWay = $$props.getRunWay;
    var scroll = $$props.scroll;
    var clickMain = $$props.clickMain;
    $$self.$$.on_mount.push(function () {
      if (getRunWay === undefined && !('getRunWay' in $$props || $$self.$$.bound[$$self.$$.props['getRunWay']])) {
        console.warn("<SectionGetStarted> was created without expected prop 'getRunWay'");
      }
      if (scroll === undefined && !('scroll' in $$props || $$self.$$.bound[$$self.$$.props['scroll']])) {
        console.warn("<SectionGetStarted> was created without expected prop 'scroll'");
      }
      if (clickMain === undefined && !('clickMain' in $$props || $$self.$$.bound[$$self.$$.props['clickMain']])) {
        console.warn("<SectionGetStarted> was created without expected prop 'clickMain'");
      }
    });
    var writable_props = ['getRunWay', 'scroll', 'clickMain'];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<SectionGetStarted> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$$set = function ($$props) {
      if ('getRunWay' in $$props) $$invalidate(0, getRunWay = $$props.getRunWay);
      if ('scroll' in $$props) $$invalidate(1, scroll = $$props.scroll);
      if ('clickMain' in $$props) $$invalidate(2, clickMain = $$props.clickMain);
    };
    $$self.$capture_state = function () {
      return {
        CodeWrap: CodeWrap,
        Lazy: Src,
        getRunWay: getRunWay,
        scroll: scroll,
        clickMain: clickMain
      };
    };
    $$self.$inject_state = function ($$props) {
      if ('getRunWay' in $$props) $$invalidate(0, getRunWay = $$props.getRunWay);
      if ('scroll' in $$props) $$invalidate(1, scroll = $$props.scroll);
      if ('clickMain' in $$props) $$invalidate(2, clickMain = $$props.clickMain);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    return [getRunWay, scroll, clickMain];
  }
  var SectionGetStarted = /*#__PURE__*/function (_SvelteComponentDev) {
    function SectionGetStarted(options) {
      var _this;
      _classCallCheck(this, SectionGetStarted);
      _this = _callSuper$f(this, SectionGetStarted, [options]);
      init(_this, options, instance$e, create_fragment$e, safe_not_equal, {
        getRunWay: 0,
        scroll: 1,
        clickMain: 2
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "SectionGetStarted",
        options: options,
        id: create_fragment$e.name
      });
      return _this;
    }
    _inherits(SectionGetStarted, _SvelteComponentDev);
    return _createClass(SectionGetStarted, [{
      key: "getRunWay",
      get: function () {
        throw new Error("<SectionGetStarted>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionGetStarted>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "scroll",
      get: function () {
        throw new Error("<SectionGetStarted>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionGetStarted>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "clickMain",
      get: function () {
        throw new Error("<SectionGetStarted>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionGetStarted>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }]);
  }(SvelteComponentDev);

  function _callSuper$g(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$g() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$g() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$g = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$e = "src/components/docs/sections/SectionDefaultCommands.svelte";
  function create_fragment$f(ctx) {
    var div3;
    var div0;
    var h1;
    var t1;
    var h30;
    var t3;
    var div1;
    var t4;
    var div2;
    var h20;
    var t6;
    var p0;
    var t7;
    var a0;
    var t9;
    var a1;
    var t11;
    var t12;
    var p1;
    var t13;
    var code0;
    var t15;
    var a2;
    var t17;
    var t18;
    var playeditor0;
    var t19;
    var h21;
    var t21;
    var p2;
    var a3;
    var t23;
    var t24;
    var p3;
    var t25;
    var code1;
    var t27;
    var code2;
    var t29;
    var a4;
    var t31;
    var a5;
    var t33;
    var t34;
    var playeditor1;
    var t35;
    var h22;
    var t37;
    var p4;
    var a6;
    var t39;
    var a7;
    var t41;
    var t42;
    var p5;
    var t43;
    var a8;
    var t45;
    var a9;
    var t47;
    var t48;
    var playeditor2;
    var t49;
    var h23;
    var t51;
    var p6;
    var a10;
    var t53;
    var a11;
    var t55;
    var a12;
    var t57;
    var code3;
    var t59;
    var t60;
    var p7;
    var t61;
    var code4;
    var t63;
    var a13;
    var t65;
    var a14;
    var t67;
    var t68;
    var playeditor3;
    var t69;
    var h24;
    var t71;
    var p8;
    var t72;
    var a15;
    var t74;
    var a16;
    var t76;
    var code5;
    var t78;
    var code6;
    var t80;
    var code7;
    var t82;
    var code8;
    var t84;
    var t85;
    var p9;
    var t86;
    var a17;
    var t88;
    var code9;
    var t90;
    var a18;
    var t92;
    var a19;
    var t94;
    var t95;
    var playeditor4;
    var t96;
    var h25;
    var t98;
    var p10;
    var t99;
    var a20;
    var t101;
    var a21;
    var t103;
    var code10;
    var t105;
    var t106;
    var p11;
    var a22;
    var t108;
    var a23;
    var t110;
    var a24;
    var t112;
    var a25;
    var t114;
    var a26;
    var t116;
    var a27;
    var t118;
    var t119;
    var h31;
    var t121;
    var ul;
    var li0;
    var a28;
    var t123;
    var t124;
    var li1;
    var t126;
    var br0;
    var t127;
    var li2;
    var a29;
    var t129;
    var t130;
    var li3;
    var t132;
    var br1;
    var t133;
    var li4;
    var a30;
    var t135;
    var t136;
    var li5;
    var t138;
    var br2;
    var t139;
    var li6;
    var a31;
    var t141;
    var a32;
    var t143;
    var t144;
    var li7;
    var t145;
    var a33;
    var t147;
    var t148;
    var playeditor5;
    var current;
    var mounted;
    var dispose;
    playeditor0 = new PlayEditor({
      props: {
        background: "white",
        editorType: "medium",
        tabChecked: "checked",
        editorCommandArea: /*getHelpExample*/ctx[1]("help"),
        examples: /*getExample*/ctx[0]("Help")
      },
      $$inline: true
    });
    playeditor1 = new PlayEditor({
      props: {
        background: "white",
        editorType: "medium",
        tabChecked: "checked",
        editorCommandArea: /*getHelpExample*/ctx[1]("cuk"),
        examples: /*getExample*/ctx[0]("Cuk - Hit Endpoint")
      },
      $$inline: true
    });
    playeditor2 = new PlayEditor({
      props: {
        background: "white",
        editorType: "medium",
        tabChecked: "checked",
        editorCommandArea: /*getHelpExample*/ctx[1]("cak"),
        examples: /*getExample*/ctx[0]("Cak - Create Command")
      },
      $$inline: true
    });
    playeditor3 = new PlayEditor({
      props: {
        background: "white",
        editorType: "medium",
        tabChecked: "checked",
        editorCommandArea: /*getHelpExample*/ctx[1]("del"),
        examples: /*getExample*/ctx[0]("Del - Delete Command")
      },
      $$inline: true
    });
    playeditor4 = new PlayEditor({
      props: {
        background: "white",
        editorType: "medium",
        tabChecked: "checked",
        editorCommandArea: /*getHelpExample*/ctx[1]("scope"),
        examples: /*getExample*/ctx[0]("Scope - ACL")
      },
      $$inline: true
    });
    playeditor5 = new PlayEditor({
      props: {
        background: "white",
        editorType: "medium",
        tabChecked: "checked",
        editorCommandArea: /*getHelpExample*/ctx[1]("su"),
        examples: /*getExample*/ctx[0]("su - Superuser")
      },
      $$inline: true
    });
    var block = {
      c: function () {
        div3 = element("div");
        div0 = element("div");
        h1 = element("h1");
        h1.textContent = "Default Commands";
        t1 = space();
        h30 = element("h3");
        h30.textContent = "Cakcuk's Base Commands";
        t3 = space();
        div1 = element("div");
        t4 = space();
        div2 = element("div");
        h20 = element("h2");
        h20.textContent = "Help";
        t6 = space();
        p0 = element("p");
        t7 = text("Like most ");
        a0 = element("a");
        a0.textContent = "Help";
        t9 = text("\n            functions in other CLIs.\n            ");
        a1 = element("a");
        a1.textContent = "Help";
        t11 = text("\n            works to display command lists or specific commands for their details,\n            such as for example usage, description, options, etc.");
        t12 = space();
        p1 = element("p");
        t13 = text("It's pretty straightforward to work with ");
        code0 = element("code");
        code0.textContent = "Help";
        t15 = text(". It also\n            works with your\n            ");
        a2 = element("a");
        a2.textContent = "Custom Commands";
        t17 = text(". Just try the examples below!");
        t18 = space();
        create_component(playeditor0.$$.fragment);
        t19 = space();
        h21 = element("h2");
        h21.textContent = "Cuk";
        t21 = space();
        p2 = element("p");
        a3 = element("a");
        a3.textContent = "Cuk";
        t23 = text(" is\n            a command for hitting HTTP/S endpoints. It covers endpoint properties\n            like URL, Query Parameters, Headers, etc. It works pretty simply to support\n            common endpoint usage.");
        t24 = space();
        p3 = element("p");
        t25 = text("One of the special options that you can explore is ");
        code1 = element("code");
        code1.textContent = "--parseResponse, -pr";
        t27 = text(".\n            ");
        code2 = element("code");
        code2.textContent = "--parseResponse, -pr";
        t29 = text(" is supporting\n            ");
        a4 = element("a");
        a4.textContent = "Cak";
        t31 = text("\n            command and your\n            ");
        a5 = element("a");
        a5.textContent = "Custom Commands";
        t33 = text(" as well.");
        t34 = space();
        create_component(playeditor1.$$.fragment);
        t35 = space();
        h22 = element("h2");
        h22.textContent = "Cak";
        t37 = space();
        p4 = element("p");
        a6 = element("a");
        a6.textContent = "Cak";
        t39 = text("\n            is a special command to create your\n            ");
        a7 = element("a");
        a7.textContent = "Custom Commands";
        t41 = text(". Your commands creation on Playground only hold for 5 minutes.\n            They will be deleted after that.");
        t42 = space();
        p5 = element("p");
        t43 = text("Just explore ");
        a8 = element("a");
        a8.textContent = "Cak";
        t45 = text("\n            command using provided examples. They quite represent\n            ");
        a9 = element("a");
        a9.textContent = "Cak";
        t47 = text("\n            functionalities.");
        t48 = space();
        create_component(playeditor2.$$.fragment);
        t49 = space();
        h23 = element("h2");
        h23.textContent = "Del";
        t51 = space();
        p6 = element("p");
        a10 = element("a");
        a10.textContent = "Del";
        t53 = text("\n            is a simple command to delete your custom commands. You're not allowed\n            to delete\n            ");
        a11 = element("a");
        a11.textContent = "Default Commands";
        t55 = text(".\n            ");
        a12 = element("a");
        a12.textContent = "Del";
        t57 = text("\n            supports multiple commands deletion separated by double-and\n            ");
        code3 = element("code");
        code3.textContent = "&&";
        t59 = text(" like the examples below.");
        t60 = space();
        p7 = element("p");
        t61 = text("Please keep in mind, multiple option values always separated by\n            double-and ");
        code4 = element("code");
        code4.textContent = "&&";
        t63 = text(". You're only able to delete commands in\n            your\n            ");
        a13 = element("a");
        a13.textContent = "Scopes";
        t65 = text(", except you have\n            ");
        a14 = element("a");
        a14.textContent = "Superuser";
        t67 = text(" access.");
        t68 = space();
        create_component(playeditor3.$$.fragment);
        t69 = space();
        h24 = element("h2");
        h24.textContent = "Scope";
        t71 = space();
        p8 = element("p");
        t72 = text("Create, edit, and delete ");
        a15 = element("a");
        a15.textContent = "Scopes";
        t74 = text("\n            aka access control list (ACL) for users and commands. It's useful for\n            managing certain custom commands that belong to certain groups. For example,\n            you create two\n            ");
        a16 = element("a");
        a16.textContent = "Scopes";
        t76 = text("\n            for ");
        code5 = element("code");
        code5.textContent = "developer";
        t78 = text(" and ");
        code6 = element("code");
        code6.textContent = "infra";
        t80 = text(". You want to make\n            the users and commands that belong to the\n            ");
        code7 = element("code");
        code7.textContent = "developer";
        t82 = text("\n            can't be accessed by ");
        code8 = element("code");
        code8.textContent = "infra";
        t84 = text(" users, and vice versa.");
        t85 = space();
        p9 = element("p");
        t86 = text("The default ");
        a17 = element("a");
        a17.textContent = "scope";
        t88 = text("\n            for the command is\n            ");
        code9 = element("code");
        code9.textContent = "public";
        t90 = text(". Commands in public\n            ");
        a18 = element("a");
        a18.textContent = "scope";
        t92 = text("\n            can be accessed by anyone in your workspace. Please keep in mind, that\n            ");
        a19 = element("a");
        a19.textContent = "Scope";
        t94 = text(" creation on Playground also has 5 minutes expiration time.");
        t95 = space();
        create_component(playeditor4.$$.fragment);
        t96 = space();
        h25 = element("h2");
        h25.textContent = "SU - Superuser";
        t98 = space();
        p10 = element("p");
        t99 = text("Access and control to manage ");
        a20 = element("a");
        a20.textContent = "Superuser";
        t101 = text(".\n            ");
        a21 = element("a");
        a21.textContent = "Superuser";
        t103 = text("\n            is enabled by default. But, it's configurable via environment variable\n            of ");
        code10 = element("code");
        code10.textContent = "SUPER_USER_MODE_ENABLED";
        t105 = text(".");
        t106 = space();
        p11 = element("p");
        a22 = element("a");
        a22.textContent = "Superuser";
        t108 = text("\n            that you set on the Playground has an expiration time. It will hold for\n            5 minutes like\n            ");
        a23 = element("a");
        a23.textContent = "Cak commands";
        t110 = text("\n            &\n            ");
        a24 = element("a");
        a24.textContent = "Scopes";
        t112 = text("\n            creation. The only user that's in the\n            ");
        a25 = element("a");
        a25.textContent = "Superuser";
        t114 = text("\n            list that's able to set and delete the other users to be\n            ");
        a26 = element("a");
        a26.textContent = "Superuser";
        t116 = text(". But for the first-time installation,\n            ");
        a27 = element("a");
        a27.textContent = "Superuser";
        t118 = text("\n            can be set by anyone.");
        t119 = space();
        h31 = element("h3");
        h31.textContent = "The differences between Superuser and Common User";
        t121 = space();
        ul = element("ul");
        li0 = element("li");
        a28 = element("a");
        a28.textContent = "Superuser";
        t123 = text(" can Read, Create, Update, and Delete all Scopes.");
        t124 = space();
        li1 = element("li");
        li1.textContent = "Common User is only able to Read, Create, Update, and Delete his\n                Scopes.";
        t126 = space();
        br0 = element("br");
        t127 = space();
        li2 = element("li");
        a29 = element("a");
        a29.textContent = "Superuser";
        t129 = text(" can Read, Create, Update, Delete, and Execute all commands.");
        t130 = space();
        li3 = element("li");
        li3.textContent = "Common User is only able to Read, Create, Update, Delete, and\n                Execute his commands in his scopes.";
        t132 = space();
        br1 = element("br");
        t133 = space();
        li4 = element("li");
        a30 = element("a");
        a30.textContent = "Superuser";
        t135 = text(" can Read of all the user's access, the scopes and the commands\n                included.");
        t136 = space();
        li5 = element("li");
        li5.textContent = "Common User is not allowed.";
        t138 = space();
        br2 = element("br");
        t139 = space();
        li6 = element("li");
        a31 = element("a");
        a31.textContent = "Superuser";
        t141 = text("\n                can Show, Set, and Delete\n                ");
        a32 = element("a");
        a32.textContent = "Superuser";
        t143 = text(" list group.");
        t144 = space();
        li7 = element("li");
        t145 = text("Common User is only able to Show ");
        a33 = element("a");
        a33.textContent = "Superuser";
        t147 = text(" list.");
        t148 = space();
        create_component(playeditor5.$$.fragment);
        add_location(h1, file$e, 15, 8, 403);
        add_location(h30, file$e, 16, 8, 437);
        attr_dev(div0, "class", "header");
        add_location(div0, file$e, 14, 4, 374);
        attr_dev(div1, "class", "line");
        add_location(div1, file$e, 18, 4, 484);
        attr_dev(h20, "id", "helpCommand");
        attr_dev(h20, "class", "content-subhead");
        add_location(h20, file$e, 20, 8, 543);
        attr_dev(a0, "class", "common-link");
        attr_dev(a0, "goto", "helpCommand");
        add_location(a0, file$e, 22, 22, 632);
        attr_dev(a1, "class", "common-link");
        attr_dev(a1, "goto", "helpCommand");
        add_location(a1, file$e, 28, 12, 811);
        add_location(p0, file$e, 21, 8, 606);
        add_location(code0, file$e, 33, 53, 1107);
        attr_dev(a2, "class", "common-link");
        attr_dev(a2, "goto", "customCommand");
        add_location(a2, file$e, 35, 12, 1174);
        add_location(p1, file$e, 32, 8, 1050);
        attr_dev(h21, "id", "cukCommand");
        attr_dev(h21, "class", "content-subhead");
        add_location(h21, file$e, 46, 8, 1573);
        attr_dev(a3, "class", "common-link");
        attr_dev(a3, "goto", "cukCommand");
        add_location(a3, file$e, 48, 12, 1650);
        add_location(p2, file$e, 47, 8, 1634);
        add_location(code1, file$e, 54, 63, 2013);
        add_location(code2, file$e, 57, 12, 2090);
        attr_dev(a4, "class", "common-link");
        attr_dev(a4, "goto", "cakCommand");
        add_location(a4, file$e, 58, 12, 2150);
        attr_dev(a5, "class", "common-link");
        attr_dev(a5, "goto", "customCommand");
        add_location(a5, file$e, 60, 12, 2258);
        add_location(p3, file$e, 53, 8, 1946);
        attr_dev(h22, "id", "cakCommand");
        attr_dev(h22, "class", "content-subhead");
        add_location(h22, file$e, 71, 8, 2649);
        attr_dev(a6, "class", "common-link");
        attr_dev(a6, "goto", "cakCommand");
        add_location(a6, file$e, 73, 12, 2726);
        attr_dev(a7, "class", "common-link");
        attr_dev(a7, "goto", "customCommand");
        add_location(a7, file$e, 75, 12, 2853);
        add_location(p4, file$e, 72, 8, 2710);
        attr_dev(a8, "class", "common-link");
        attr_dev(a8, "goto", "cakCommand");
        add_location(a8, file$e, 81, 25, 3123);
        attr_dev(a9, "class", "common-link");
        attr_dev(a9, "goto", "cakCommand");
        add_location(a9, file$e, 87, 12, 3329);
        add_location(p5, file$e, 80, 8, 3094);
        attr_dev(h23, "id", "delCommand");
        attr_dev(h23, "class", "content-subhead");
        add_location(h23, file$e, 97, 8, 3697);
        attr_dev(a10, "class", "common-link");
        attr_dev(a10, "goto", "delCommand");
        add_location(a10, file$e, 99, 12, 3774);
        attr_dev(a11, "class", "common-link");
        attr_dev(a11, "goto", "defaultCommands");
        add_location(a11, file$e, 102, 12, 3958);
        attr_dev(a12, "class", "common-link");
        attr_dev(a12, "goto", "delCommand");
        add_location(a12, file$e, 105, 12, 4086);
        add_location(code3, file$e, 107, 12, 4237);
        add_location(p6, file$e, 98, 8, 3758);
        add_location(code4, file$e, 111, 23, 4402);
        attr_dev(a13, "class", "common-link");
        attr_dev(a13, "goto", "scopeCommand");
        add_location(a13, file$e, 113, 12, 4487);
        attr_dev(a14, "class", "common-link");
        attr_dev(a14, "goto", "suCommand");
        add_location(a14, file$e, 116, 12, 4618);
        add_location(p7, file$e, 109, 8, 4299);
        attr_dev(h24, "id", "scopeCommand");
        attr_dev(h24, "class", "content-subhead");
        add_location(h24, file$e, 127, 8, 5000);
        attr_dev(a15, "class", "common-link");
        attr_dev(a15, "goto", "scopeCommand");
        add_location(a15, file$e, 129, 37, 5106);
        attr_dev(a16, "class", "common-link");
        attr_dev(a16, "goto", "scopeCommand");
        add_location(a16, file$e, 137, 12, 5449);
        add_location(code5, file$e, 140, 16, 5567);
        add_location(code6, file$e, 140, 43, 5594);
        add_location(code7, file$e, 142, 12, 5697);
        add_location(code8, file$e, 143, 33, 5753);
        add_location(p8, file$e, 128, 8, 5065);
        attr_dev(a17, "class", "common-link");
        attr_dev(a17, "goto", "scopeCommand");
        add_location(a17, file$e, 146, 24, 5844);
        add_location(code9, file$e, 152, 12, 6019);
        attr_dev(a18, "class", "common-link");
        attr_dev(a18, "goto", "scopeCommand");
        add_location(a18, file$e, 153, 12, 6071);
        attr_dev(a19, "class", "common-link");
        attr_dev(a19, "goto", "scopeCommand");
        add_location(a19, file$e, 157, 12, 6267);
        add_location(p9, file$e, 145, 8, 5816);
        attr_dev(h25, "id", "suCommand");
        attr_dev(h25, "class", "content-subhead");
        add_location(h25, file$e, 168, 8, 6692);
        attr_dev(a20, "class", "common-link");
        attr_dev(a20, "goto", "suCommand");
        add_location(a20, file$e, 170, 41, 6808);
        attr_dev(a21, "class", "common-link");
        attr_dev(a21, "goto", "suCommand");
        add_location(a21, file$e, 175, 12, 6954);
        add_location(code10, file$e, 179, 15, 7154);
        add_location(p10, file$e, 169, 8, 6763);
        attr_dev(a22, "class", "common-link");
        attr_dev(a22, "goto", "suCommand");
        add_location(a22, file$e, 183, 12, 7230);
        attr_dev(a23, "class", "common-link");
        attr_dev(a23, "goto", "cakCommand");
        add_location(a23, file$e, 188, 12, 7455);
        attr_dev(a24, "class", "common-link");
        attr_dev(a24, "goto", "scopeCommand");
        add_location(a24, file$e, 192, 12, 7587);
        attr_dev(a25, "class", "common-link");
        attr_dev(a25, "goto", "suCommand");
        add_location(a25, file$e, 196, 12, 7751);
        attr_dev(a26, "class", "common-link");
        attr_dev(a26, "goto", "suCommand");
        add_location(a26, file$e, 200, 12, 7934);
        attr_dev(a27, "class", "common-link");
        attr_dev(a27, "goto", "suCommand");
        add_location(a27, file$e, 203, 12, 8086);
        add_location(p11, file$e, 182, 8, 7214);
        attr_dev(h31, "class", "content-subhead");
        add_location(h31, file$e, 209, 8, 8244);
        attr_dev(a28, "class", "common-link");
        attr_dev(a28, "goto", "suCommand");
        add_location(a28, file$e, 214, 16, 8395);
        add_location(li0, file$e, 213, 12, 8374);
        add_location(li1, file$e, 218, 12, 8584);
        add_location(br0, file$e, 222, 12, 8724);
        attr_dev(a29, "class", "common-link");
        attr_dev(a29, "goto", "suCommand");
        add_location(a29, file$e, 224, 16, 8764);
        add_location(li2, file$e, 223, 12, 8743);
        add_location(li3, file$e, 228, 12, 8964);
        add_location(br1, file$e, 232, 12, 9129);
        attr_dev(a30, "class", "common-link");
        attr_dev(a30, "goto", "suCommand");
        add_location(a30, file$e, 234, 16, 9169);
        add_location(li4, file$e, 233, 12, 9148);
        add_location(li5, file$e, 239, 12, 9398);
        add_location(br2, file$e, 240, 12, 9447);
        attr_dev(a31, "class", "common-link");
        attr_dev(a31, "goto", "suCommand");
        add_location(a31, file$e, 242, 16, 9487);
        attr_dev(a32, "class", "common-link");
        attr_dev(a32, "goto", "suCommand");
        add_location(a32, file$e, 246, 16, 9655);
        add_location(li6, file$e, 241, 12, 9466);
        attr_dev(a33, "class", "common-link");
        attr_dev(a33, "goto", "suCommand");
        add_location(a33, file$e, 251, 49, 9861);
        add_location(li7, file$e, 250, 12, 9807);
        add_location(ul, file$e, 212, 8, 8357);
        attr_dev(div2, "class", "content");
        add_location(div2, file$e, 19, 4, 513);
        attr_dev(div3, "class", "main");
        attr_dev(div3, "id", "defaultCommands");
        add_location(div3, file$e, 13, 0, 309);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div3, anchor);
        append_dev(div3, div0);
        append_dev(div0, h1);
        append_dev(div0, t1);
        append_dev(div0, h30);
        append_dev(div3, t3);
        append_dev(div3, div1);
        append_dev(div3, t4);
        append_dev(div3, div2);
        append_dev(div2, h20);
        append_dev(div2, t6);
        append_dev(div2, p0);
        append_dev(p0, t7);
        append_dev(p0, a0);
        append_dev(p0, t9);
        append_dev(p0, a1);
        append_dev(p0, t11);
        append_dev(div2, t12);
        append_dev(div2, p1);
        append_dev(p1, t13);
        append_dev(p1, code0);
        append_dev(p1, t15);
        append_dev(p1, a2);
        append_dev(p1, t17);
        append_dev(div2, t18);
        mount_component(playeditor0, div2, null);
        append_dev(div2, t19);
        append_dev(div2, h21);
        append_dev(div2, t21);
        append_dev(div2, p2);
        append_dev(p2, a3);
        append_dev(p2, t23);
        append_dev(div2, t24);
        append_dev(div2, p3);
        append_dev(p3, t25);
        append_dev(p3, code1);
        append_dev(p3, t27);
        append_dev(p3, code2);
        append_dev(p3, t29);
        append_dev(p3, a4);
        append_dev(p3, t31);
        append_dev(p3, a5);
        append_dev(p3, t33);
        append_dev(div2, t34);
        mount_component(playeditor1, div2, null);
        append_dev(div2, t35);
        append_dev(div2, h22);
        append_dev(div2, t37);
        append_dev(div2, p4);
        append_dev(p4, a6);
        append_dev(p4, t39);
        append_dev(p4, a7);
        append_dev(p4, t41);
        append_dev(div2, t42);
        append_dev(div2, p5);
        append_dev(p5, t43);
        append_dev(p5, a8);
        append_dev(p5, t45);
        append_dev(p5, a9);
        append_dev(p5, t47);
        append_dev(div2, t48);
        mount_component(playeditor2, div2, null);
        append_dev(div2, t49);
        append_dev(div2, h23);
        append_dev(div2, t51);
        append_dev(div2, p6);
        append_dev(p6, a10);
        append_dev(p6, t53);
        append_dev(p6, a11);
        append_dev(p6, t55);
        append_dev(p6, a12);
        append_dev(p6, t57);
        append_dev(p6, code3);
        append_dev(p6, t59);
        append_dev(div2, t60);
        append_dev(div2, p7);
        append_dev(p7, t61);
        append_dev(p7, code4);
        append_dev(p7, t63);
        append_dev(p7, a13);
        append_dev(p7, t65);
        append_dev(p7, a14);
        append_dev(p7, t67);
        append_dev(div2, t68);
        mount_component(playeditor3, div2, null);
        append_dev(div2, t69);
        append_dev(div2, h24);
        append_dev(div2, t71);
        append_dev(div2, p8);
        append_dev(p8, t72);
        append_dev(p8, a15);
        append_dev(p8, t74);
        append_dev(p8, a16);
        append_dev(p8, t76);
        append_dev(p8, code5);
        append_dev(p8, t78);
        append_dev(p8, code6);
        append_dev(p8, t80);
        append_dev(p8, code7);
        append_dev(p8, t82);
        append_dev(p8, code8);
        append_dev(p8, t84);
        append_dev(div2, t85);
        append_dev(div2, p9);
        append_dev(p9, t86);
        append_dev(p9, a17);
        append_dev(p9, t88);
        append_dev(p9, code9);
        append_dev(p9, t90);
        append_dev(p9, a18);
        append_dev(p9, t92);
        append_dev(p9, a19);
        append_dev(p9, t94);
        append_dev(div2, t95);
        mount_component(playeditor4, div2, null);
        append_dev(div2, t96);
        append_dev(div2, h25);
        append_dev(div2, t98);
        append_dev(div2, p10);
        append_dev(p10, t99);
        append_dev(p10, a20);
        append_dev(p10, t101);
        append_dev(p10, a21);
        append_dev(p10, t103);
        append_dev(p10, code10);
        append_dev(p10, t105);
        append_dev(div2, t106);
        append_dev(div2, p11);
        append_dev(p11, a22);
        append_dev(p11, t108);
        append_dev(p11, a23);
        append_dev(p11, t110);
        append_dev(p11, a24);
        append_dev(p11, t112);
        append_dev(p11, a25);
        append_dev(p11, t114);
        append_dev(p11, a26);
        append_dev(p11, t116);
        append_dev(p11, a27);
        append_dev(p11, t118);
        append_dev(div2, t119);
        append_dev(div2, h31);
        append_dev(div2, t121);
        append_dev(div2, ul);
        append_dev(ul, li0);
        append_dev(li0, a28);
        append_dev(li0, t123);
        append_dev(ul, t124);
        append_dev(ul, li1);
        append_dev(ul, t126);
        append_dev(ul, br0);
        append_dev(ul, t127);
        append_dev(ul, li2);
        append_dev(li2, a29);
        append_dev(li2, t129);
        append_dev(ul, t130);
        append_dev(ul, li3);
        append_dev(ul, t132);
        append_dev(ul, br1);
        append_dev(ul, t133);
        append_dev(ul, li4);
        append_dev(li4, a30);
        append_dev(li4, t135);
        append_dev(ul, t136);
        append_dev(ul, li5);
        append_dev(ul, t138);
        append_dev(ul, br2);
        append_dev(ul, t139);
        append_dev(ul, li6);
        append_dev(li6, a31);
        append_dev(li6, t141);
        append_dev(li6, a32);
        append_dev(li6, t143);
        append_dev(ul, t144);
        append_dev(ul, li7);
        append_dev(li7, t145);
        append_dev(li7, a33);
        append_dev(li7, t147);
        append_dev(div2, t148);
        mount_component(playeditor5, div2, null);
        current = true;
        if (!mounted) {
          dispose = [listen_dev(a0, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a1, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a2, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a3, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a4, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a5, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a6, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a7, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a8, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a9, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a10, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a11, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a12, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a13, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a14, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a15, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a16, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a17, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a18, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a19, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a20, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a21, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a22, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a23, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a24, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a25, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a26, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a27, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a28, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a29, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a30, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a31, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a32, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(a33, "click", function () {
            if (is_function(/*scroll*/ctx[2])) /*scroll*/ctx[2].apply(this, arguments);
          }, false, false, false, false), listen_dev(div3, "click", function () {
            if (is_function(/*clickMain*/ctx[3])) /*clickMain*/ctx[3].apply(this, arguments);
          }, false, false, false, false)];
          mounted = true;
        }
      },
      p: function (new_ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        ctx = new_ctx;
        var playeditor0_changes = {};
        if (dirty & /*getHelpExample*/2) playeditor0_changes.editorCommandArea = /*getHelpExample*/ctx[1]("help");
        if (dirty & /*getExample*/1) playeditor0_changes.examples = /*getExample*/ctx[0]("Help");
        playeditor0.$set(playeditor0_changes);
        var playeditor1_changes = {};
        if (dirty & /*getHelpExample*/2) playeditor1_changes.editorCommandArea = /*getHelpExample*/ctx[1]("cuk");
        if (dirty & /*getExample*/1) playeditor1_changes.examples = /*getExample*/ctx[0]("Cuk - Hit Endpoint");
        playeditor1.$set(playeditor1_changes);
        var playeditor2_changes = {};
        if (dirty & /*getHelpExample*/2) playeditor2_changes.editorCommandArea = /*getHelpExample*/ctx[1]("cak");
        if (dirty & /*getExample*/1) playeditor2_changes.examples = /*getExample*/ctx[0]("Cak - Create Command");
        playeditor2.$set(playeditor2_changes);
        var playeditor3_changes = {};
        if (dirty & /*getHelpExample*/2) playeditor3_changes.editorCommandArea = /*getHelpExample*/ctx[1]("del");
        if (dirty & /*getExample*/1) playeditor3_changes.examples = /*getExample*/ctx[0]("Del - Delete Command");
        playeditor3.$set(playeditor3_changes);
        var playeditor4_changes = {};
        if (dirty & /*getHelpExample*/2) playeditor4_changes.editorCommandArea = /*getHelpExample*/ctx[1]("scope");
        if (dirty & /*getExample*/1) playeditor4_changes.examples = /*getExample*/ctx[0]("Scope - ACL");
        playeditor4.$set(playeditor4_changes);
        var playeditor5_changes = {};
        if (dirty & /*getHelpExample*/2) playeditor5_changes.editorCommandArea = /*getHelpExample*/ctx[1]("su");
        if (dirty & /*getExample*/1) playeditor5_changes.examples = /*getExample*/ctx[0]("su - Superuser");
        playeditor5.$set(playeditor5_changes);
      },
      i: function (local) {
        if (current) return;
        transition_in(playeditor0.$$.fragment, local);
        transition_in(playeditor1.$$.fragment, local);
        transition_in(playeditor2.$$.fragment, local);
        transition_in(playeditor3.$$.fragment, local);
        transition_in(playeditor4.$$.fragment, local);
        transition_in(playeditor5.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(playeditor0.$$.fragment, local);
        transition_out(playeditor1.$$.fragment, local);
        transition_out(playeditor2.$$.fragment, local);
        transition_out(playeditor3.$$.fragment, local);
        transition_out(playeditor4.$$.fragment, local);
        transition_out(playeditor5.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div3);
        destroy_component(playeditor0);
        destroy_component(playeditor1);
        destroy_component(playeditor2);
        destroy_component(playeditor3);
        destroy_component(playeditor4);
        destroy_component(playeditor5);
        mounted = false;
        run_all(dispose);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$f.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$f($$self, $$props, $$invalidate) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('SectionDefaultCommands', slots, []);
    var getExample = $$props.getExample;
    var getHelpExample = $$props.getHelpExample;
    var getRunWay = $$props.getRunWay;
    var scroll = $$props.scroll;
    var clickMain = $$props.clickMain;
    $$self.$$.on_mount.push(function () {
      if (getExample === undefined && !('getExample' in $$props || $$self.$$.bound[$$self.$$.props['getExample']])) {
        console.warn("<SectionDefaultCommands> was created without expected prop 'getExample'");
      }
      if (getHelpExample === undefined && !('getHelpExample' in $$props || $$self.$$.bound[$$self.$$.props['getHelpExample']])) {
        console.warn("<SectionDefaultCommands> was created without expected prop 'getHelpExample'");
      }
      if (getRunWay === undefined && !('getRunWay' in $$props || $$self.$$.bound[$$self.$$.props['getRunWay']])) {
        console.warn("<SectionDefaultCommands> was created without expected prop 'getRunWay'");
      }
      if (scroll === undefined && !('scroll' in $$props || $$self.$$.bound[$$self.$$.props['scroll']])) {
        console.warn("<SectionDefaultCommands> was created without expected prop 'scroll'");
      }
      if (clickMain === undefined && !('clickMain' in $$props || $$self.$$.bound[$$self.$$.props['clickMain']])) {
        console.warn("<SectionDefaultCommands> was created without expected prop 'clickMain'");
      }
    });
    var writable_props = ['getExample', 'getHelpExample', 'getRunWay', 'scroll', 'clickMain'];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<SectionDefaultCommands> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$$set = function ($$props) {
      if ('getExample' in $$props) $$invalidate(0, getExample = $$props.getExample);
      if ('getHelpExample' in $$props) $$invalidate(1, getHelpExample = $$props.getHelpExample);
      if ('getRunWay' in $$props) $$invalidate(4, getRunWay = $$props.getRunWay);
      if ('scroll' in $$props) $$invalidate(2, scroll = $$props.scroll);
      if ('clickMain' in $$props) $$invalidate(3, clickMain = $$props.clickMain);
    };
    $$self.$capture_state = function () {
      return {
        CodeWrap: CodeWrap,
        PlayEditor: PlayEditor,
        Lazy: Src,
        getExample: getExample,
        getHelpExample: getHelpExample,
        getRunWay: getRunWay,
        scroll: scroll,
        clickMain: clickMain
      };
    };
    $$self.$inject_state = function ($$props) {
      if ('getExample' in $$props) $$invalidate(0, getExample = $$props.getExample);
      if ('getHelpExample' in $$props) $$invalidate(1, getHelpExample = $$props.getHelpExample);
      if ('getRunWay' in $$props) $$invalidate(4, getRunWay = $$props.getRunWay);
      if ('scroll' in $$props) $$invalidate(2, scroll = $$props.scroll);
      if ('clickMain' in $$props) $$invalidate(3, clickMain = $$props.clickMain);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    return [getExample, getHelpExample, scroll, clickMain, getRunWay];
  }
  var SectionDefaultCommands = /*#__PURE__*/function (_SvelteComponentDev) {
    function SectionDefaultCommands(options) {
      var _this;
      _classCallCheck(this, SectionDefaultCommands);
      _this = _callSuper$g(this, SectionDefaultCommands, [options]);
      init(_this, options, instance$f, create_fragment$f, safe_not_equal, {
        getExample: 0,
        getHelpExample: 1,
        getRunWay: 4,
        scroll: 2,
        clickMain: 3
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "SectionDefaultCommands",
        options: options,
        id: create_fragment$f.name
      });
      return _this;
    }
    _inherits(SectionDefaultCommands, _SvelteComponentDev);
    return _createClass(SectionDefaultCommands, [{
      key: "getExample",
      get: function () {
        throw new Error("<SectionDefaultCommands>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionDefaultCommands>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "getHelpExample",
      get: function () {
        throw new Error("<SectionDefaultCommands>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionDefaultCommands>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "getRunWay",
      get: function () {
        throw new Error("<SectionDefaultCommands>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionDefaultCommands>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "scroll",
      get: function () {
        throw new Error("<SectionDefaultCommands>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionDefaultCommands>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "clickMain",
      get: function () {
        throw new Error("<SectionDefaultCommands>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionDefaultCommands>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }]);
  }(SvelteComponentDev);

  function _callSuper$h(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$h() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$h() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$h = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$f = "src/components/docs/sections/SectionCustomCommand.svelte";
  function create_fragment$g(ctx) {
    var div3;
    var div0;
    var h1;
    var t1;
    var h3;
    var t3;
    var div1;
    var t4;
    var div2;
    var p0;
    var t5;
    var a0;
    var t7;
    var t8;
    var p1;
    var t9;
    var a1;
    var t11;
    var a2;
    var t13;
    var t14;
    var p2;
    var t15;
    var a3;
    var t17;
    var t18;
    var playeditor;
    var current;
    var mounted;
    var dispose;
    playeditor = new PlayEditor({
      props: {
        background: "white",
        editorType: "medium",
        tabChecked: "checked",
        examples: /*getExample*/ctx[0]("Custom Command - Simple Example", "Custom Command - Overwrite Option")
      },
      $$inline: true
    });
    var block = {
      c: function () {
        div3 = element("div");
        div0 = element("div");
        h1 = element("h1");
        h1.textContent = "Custom Command";
        t1 = space();
        h3 = element("h3");
        h3.textContent = "Create your own custom command based on your needs";
        t3 = space();
        div1 = element("div");
        t4 = space();
        div2 = element("div");
        p0 = element("p");
        t5 = text("Create your own custom command with ");
        a0 = element("a");
        a0.textContent = "Cak command";
        t7 = text(" then execute it. Please keep in mind, the commands you create on the\n            Playground have the expiration time. It takes 5 minutes to be deleted\n            after the creation time.");
        t8 = space();
        p1 = element("p");
        t9 = text("Your created ");
        a1 = element("a");
        a1.textContent = "Custom Commands";
        t11 = text("\n            also have the implicit options that\n            ");
        a2 = element("a");
        a2.textContent = "Cuk";
        t13 = text(" command\n            has. Like Query parameters, Headers, etc. You can overwrite or add params\n            as you need. Just try the examples below! You need to try it in sequence\n            for each example within the section.");
        t14 = space();
        p2 = element("p");
        t15 = text("Don't forget to explore ");
        a3 = element("a");
        a3.textContent = "Cak";
        t17 = text(" command as well for more functionalities as you need.");
        t18 = space();
        create_component(playeditor.$$.fragment);
        add_location(h1, file$f, 14, 8, 400);
        add_location(h3, file$f, 15, 8, 432);
        attr_dev(div0, "class", "header");
        add_location(div0, file$f, 13, 4, 371);
        attr_dev(div1, "class", "line");
        add_location(div1, file$f, 17, 4, 507);
        attr_dev(a0, "class", "common-link");
        attr_dev(a0, "goto", "cakCommand");
        add_location(a0, file$f, 20, 48, 618);
        add_location(p0, file$f, 19, 8, 566);
        attr_dev(a1, "class", "common-link");
        attr_dev(a1, "goto", "customCommand");
        add_location(a1, file$f, 29, 25, 992);
        attr_dev(a2, "class", "common-link");
        attr_dev(a2, "goto", "cukCommand");
        add_location(a2, file$f, 35, 12, 1195);
        add_location(p1, file$f, 28, 8, 963);
        attr_dev(a3, "class", "common-link");
        attr_dev(a3, "goto", "cakCommand");
        add_location(a3, file$f, 41, 36, 1551);
        add_location(p2, file$f, 40, 8, 1511);
        attr_dev(div2, "class", "content");
        add_location(div2, file$f, 18, 4, 536);
        attr_dev(div3, "class", "main");
        attr_dev(div3, "id", "customCommand");
        add_location(div3, file$f, 12, 0, 308);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div3, anchor);
        append_dev(div3, div0);
        append_dev(div0, h1);
        append_dev(div0, t1);
        append_dev(div0, h3);
        append_dev(div3, t3);
        append_dev(div3, div1);
        append_dev(div3, t4);
        append_dev(div3, div2);
        append_dev(div2, p0);
        append_dev(p0, t5);
        append_dev(p0, a0);
        append_dev(p0, t7);
        append_dev(div2, t8);
        append_dev(div2, p1);
        append_dev(p1, t9);
        append_dev(p1, a1);
        append_dev(p1, t11);
        append_dev(p1, a2);
        append_dev(p1, t13);
        append_dev(div2, t14);
        append_dev(div2, p2);
        append_dev(p2, t15);
        append_dev(p2, a3);
        append_dev(p2, t17);
        append_dev(div2, t18);
        mount_component(playeditor, div2, null);
        current = true;
        if (!mounted) {
          dispose = [listen_dev(a0, "click", function () {
            if (is_function(/*scroll*/ctx[1])) /*scroll*/ctx[1].apply(this, arguments);
          }, false, false, false, false), listen_dev(a1, "click", function () {
            if (is_function(/*scroll*/ctx[1])) /*scroll*/ctx[1].apply(this, arguments);
          }, false, false, false, false), listen_dev(a2, "click", function () {
            if (is_function(/*scroll*/ctx[1])) /*scroll*/ctx[1].apply(this, arguments);
          }, false, false, false, false), listen_dev(a3, "click", function () {
            if (is_function(/*scroll*/ctx[1])) /*scroll*/ctx[1].apply(this, arguments);
          }, false, false, false, false), listen_dev(div3, "click", function () {
            if (is_function(/*clickMain*/ctx[2])) /*clickMain*/ctx[2].apply(this, arguments);
          }, false, false, false, false)];
          mounted = true;
        }
      },
      p: function (new_ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        ctx = new_ctx;
        var playeditor_changes = {};
        if (dirty & /*getExample*/1) playeditor_changes.examples = /*getExample*/ctx[0]("Custom Command - Simple Example", "Custom Command - Overwrite Option");
        playeditor.$set(playeditor_changes);
      },
      i: function (local) {
        if (current) return;
        transition_in(playeditor.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(playeditor.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div3);
        destroy_component(playeditor);
        mounted = false;
        run_all(dispose);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$g.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$g($$self, $$props, $$invalidate) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('SectionCustomCommand', slots, []);
    var getExample = $$props.getExample;
    var getHelpExample = $$props.getHelpExample;
    var getRunWay = $$props.getRunWay;
    var scroll = $$props.scroll;
    var clickMain = $$props.clickMain;
    $$self.$$.on_mount.push(function () {
      if (getExample === undefined && !('getExample' in $$props || $$self.$$.bound[$$self.$$.props['getExample']])) {
        console.warn("<SectionCustomCommand> was created without expected prop 'getExample'");
      }
      if (getHelpExample === undefined && !('getHelpExample' in $$props || $$self.$$.bound[$$self.$$.props['getHelpExample']])) {
        console.warn("<SectionCustomCommand> was created without expected prop 'getHelpExample'");
      }
      if (getRunWay === undefined && !('getRunWay' in $$props || $$self.$$.bound[$$self.$$.props['getRunWay']])) {
        console.warn("<SectionCustomCommand> was created without expected prop 'getRunWay'");
      }
      if (scroll === undefined && !('scroll' in $$props || $$self.$$.bound[$$self.$$.props['scroll']])) {
        console.warn("<SectionCustomCommand> was created without expected prop 'scroll'");
      }
      if (clickMain === undefined && !('clickMain' in $$props || $$self.$$.bound[$$self.$$.props['clickMain']])) {
        console.warn("<SectionCustomCommand> was created without expected prop 'clickMain'");
      }
    });
    var writable_props = ['getExample', 'getHelpExample', 'getRunWay', 'scroll', 'clickMain'];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<SectionCustomCommand> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$$set = function ($$props) {
      if ('getExample' in $$props) $$invalidate(0, getExample = $$props.getExample);
      if ('getHelpExample' in $$props) $$invalidate(3, getHelpExample = $$props.getHelpExample);
      if ('getRunWay' in $$props) $$invalidate(4, getRunWay = $$props.getRunWay);
      if ('scroll' in $$props) $$invalidate(1, scroll = $$props.scroll);
      if ('clickMain' in $$props) $$invalidate(2, clickMain = $$props.clickMain);
    };
    $$self.$capture_state = function () {
      return {
        CodeWrap: CodeWrap,
        PlayEditor: PlayEditor,
        Lazy: Src,
        getExample: getExample,
        getHelpExample: getHelpExample,
        getRunWay: getRunWay,
        scroll: scroll,
        clickMain: clickMain
      };
    };
    $$self.$inject_state = function ($$props) {
      if ('getExample' in $$props) $$invalidate(0, getExample = $$props.getExample);
      if ('getHelpExample' in $$props) $$invalidate(3, getHelpExample = $$props.getHelpExample);
      if ('getRunWay' in $$props) $$invalidate(4, getRunWay = $$props.getRunWay);
      if ('scroll' in $$props) $$invalidate(1, scroll = $$props.scroll);
      if ('clickMain' in $$props) $$invalidate(2, clickMain = $$props.clickMain);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    return [getExample, scroll, clickMain, getHelpExample, getRunWay];
  }
  var SectionCustomCommand = /*#__PURE__*/function (_SvelteComponentDev) {
    function SectionCustomCommand(options) {
      var _this;
      _classCallCheck(this, SectionCustomCommand);
      _this = _callSuper$h(this, SectionCustomCommand, [options]);
      init(_this, options, instance$g, create_fragment$g, safe_not_equal, {
        getExample: 0,
        getHelpExample: 3,
        getRunWay: 4,
        scroll: 1,
        clickMain: 2
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "SectionCustomCommand",
        options: options,
        id: create_fragment$g.name
      });
      return _this;
    }
    _inherits(SectionCustomCommand, _SvelteComponentDev);
    return _createClass(SectionCustomCommand, [{
      key: "getExample",
      get: function () {
        throw new Error("<SectionCustomCommand>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionCustomCommand>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "getHelpExample",
      get: function () {
        throw new Error("<SectionCustomCommand>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionCustomCommand>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "getRunWay",
      get: function () {
        throw new Error("<SectionCustomCommand>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionCustomCommand>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "scroll",
      get: function () {
        throw new Error("<SectionCustomCommand>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionCustomCommand>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "clickMain",
      get: function () {
        throw new Error("<SectionCustomCommand>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionCustomCommand>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }]);
  }(SvelteComponentDev);

  function _callSuper$i(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$i() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$i() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$i = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$g = "src/components/docs/sections/SectionDefaultOptions.svelte";
  function create_fragment$h(ctx) {
    var div3;
    var div0;
    var h1;
    var t1;
    var h3;
    var t3;
    var div1;
    var t4;
    var div2;
    var h20;
    var t6;
    var p0;
    var t7;
    var code0;
    var t9;
    var t10;
    var h21;
    var t12;
    var p1;
    var t13;
    var code1;
    var t15;
    var code2;
    var t17;
    var t18;
    var h22;
    var t20;
    var p2;
    var t22;
    var h23;
    var t24;
    var p3;
    var t25;
    var code3;
    var t27;
    var t28;
    var h24;
    var t30;
    var p4;
    var t31;
    var code4;
    var t33;
    var code5;
    var t35;
    var code6;
    var t37;
    var t38;
    var playeditor;
    var current;
    var mounted;
    var dispose;
    playeditor = new PlayEditor({
      props: {
        background: "white",
        editorType: "medium",
        tabChecked: "checked",
        examples: /*getExample*/ctx[0]("Default Options")
      },
      $$inline: true
    });
    var block = {
      c: function () {
        div3 = element("div");
        div0 = element("div");
        h1 = element("h1");
        h1.textContent = "Default Options";
        t1 = space();
        h3 = element("h3");
        h3.textContent = "General options that you can use it in almost all of Cakcuk commands";
        t3 = space();
        div1 = element("div");
        t4 = space();
        div2 = element("div");
        h20 = element("h2");
        h20.textContent = "--outputFile, -of";
        t6 = space();
        p0 = element("p");
        t7 = text("Printing result to be file output. It's a single option. Just add ");
        code0 = element("code");
        code0.textContent = "--outputFile, -of";
        t9 = text(" in your command. Please note it's only working in your workspace.");
        t10 = space();
        h21 = element("h2");
        h21.textContent = "--filter, -f";
        t12 = space();
        p1 = element("p");
        t13 = text("Filtering result that's containing some keyword. Works like grep\n            command in terminal.\n            ");
        code1 = element("code");
        code1.textContent = "--filter, -f";
        t15 = text(" is case insensitive. Example usage:\n            ");
        code2 = element("code");
        code2.textContent = "--filter=this is keywords";
        t17 = text(". Just play the playground to\n            see the result!");
        t18 = space();
        h22 = element("h2");
        h22.textContent = "--printOptions, -po";
        t20 = space();
        p2 = element("p");
        p2.textContent = "It will print options when you execute the command in your\n            workspace. Just like the Preview tab in the command section of the\n            play editor. It's useful for you to ensure you input the correct\n            value for each option as you want. Something like avoiding typo.";
        t22 = space();
        h23 = element("h2");
        h23.textContent = "--noResponse, -nr";
        t24 = space();
        p3 = element("p");
        t25 = text("It will print no response from your executed command in your\n            workspace. Just add\n            ");
        code3 = element("code");
        code3.textContent = "--noResponse, -nr";
        t27 = text(" in your command. It's fit for your use-case\n            which is for post/put something, like triggering CI or something like\n            that you don't need the response.");
        t28 = space();
        h24 = element("h2");
        h24.textContent = "--noParse, -np";
        t30 = space();
        p4 = element("p");
        t31 = text("It will ignore ");
        code4 = element("code");
        code4.textContent = "--parseResponse, -pr";
        t33 = text(" value. It's useful\n            for debugging. Works with\n            ");
        code5 = element("code");
        code5.textContent = "Cuk";
        t35 = text(", and your ");
        code6 = element("code");
        code6.textContent = "custom commands";
        t37 = text(".");
        t38 = space();
        create_component(playeditor.$$.fragment);
        add_location(h1, file$g, 14, 8, 401);
        add_location(h3, file$g, 15, 8, 434);
        attr_dev(div0, "class", "header");
        add_location(div0, file$g, 13, 4, 372);
        attr_dev(div1, "class", "line");
        add_location(div1, file$g, 19, 4, 549);
        attr_dev(h20, "id", "outputFileOption");
        attr_dev(h20, "class", "content-subhead");
        add_location(h20, file$g, 21, 8, 608);
        add_location(code0, file$g, 23, 78, 771);
        add_location(p0, file$g, 22, 8, 689);
        attr_dev(h21, "id", "filterOption");
        attr_dev(h21, "class", "content-subhead");
        add_location(h21, file$g, 27, 8, 919);
        add_location(code1, file$g, 31, 12, 1117);
        add_location(code2, file$g, 32, 12, 1191);
        add_location(p1, file$g, 28, 8, 991);
        attr_dev(h22, "id", "printOptions");
        attr_dev(h22, "class", "content-subhead");
        add_location(h22, file$g, 35, 8, 1308);
        add_location(p2, file$g, 36, 8, 1387);
        attr_dev(h23, "id", "noResponseOption");
        attr_dev(h23, "class", "content-subhead");
        add_location(h23, file$g, 42, 8, 1716);
        add_location(code3, file$g, 46, 12, 1918);
        add_location(p3, file$g, 43, 8, 1797);
        attr_dev(h24, "id", "noParseOption");
        attr_dev(h24, "class", "content-subhead");
        add_location(h24, file$g, 50, 8, 2142);
        add_location(code4, file$g, 52, 27, 2248);
        add_location(code5, file$g, 54, 12, 2351);
        add_location(code6, file$g, 54, 39, 2378);
        add_location(p4, file$g, 51, 8, 2217);
        attr_dev(div2, "class", "content");
        add_location(div2, file$g, 20, 4, 578);
        attr_dev(div3, "class", "main");
        attr_dev(div3, "id", "defaultOptions");
        add_location(div3, file$g, 12, 0, 308);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div3, anchor);
        append_dev(div3, div0);
        append_dev(div0, h1);
        append_dev(div0, t1);
        append_dev(div0, h3);
        append_dev(div3, t3);
        append_dev(div3, div1);
        append_dev(div3, t4);
        append_dev(div3, div2);
        append_dev(div2, h20);
        append_dev(div2, t6);
        append_dev(div2, p0);
        append_dev(p0, t7);
        append_dev(p0, code0);
        append_dev(p0, t9);
        append_dev(div2, t10);
        append_dev(div2, h21);
        append_dev(div2, t12);
        append_dev(div2, p1);
        append_dev(p1, t13);
        append_dev(p1, code1);
        append_dev(p1, t15);
        append_dev(p1, code2);
        append_dev(p1, t17);
        append_dev(div2, t18);
        append_dev(div2, h22);
        append_dev(div2, t20);
        append_dev(div2, p2);
        append_dev(div2, t22);
        append_dev(div2, h23);
        append_dev(div2, t24);
        append_dev(div2, p3);
        append_dev(p3, t25);
        append_dev(p3, code3);
        append_dev(p3, t27);
        append_dev(div2, t28);
        append_dev(div2, h24);
        append_dev(div2, t30);
        append_dev(div2, p4);
        append_dev(p4, t31);
        append_dev(p4, code4);
        append_dev(p4, t33);
        append_dev(p4, code5);
        append_dev(p4, t35);
        append_dev(p4, code6);
        append_dev(p4, t37);
        append_dev(div2, t38);
        mount_component(playeditor, div2, null);
        current = true;
        if (!mounted) {
          dispose = listen_dev(div3, "click", function () {
            if (is_function(/*clickMain*/ctx[1])) /*clickMain*/ctx[1].apply(this, arguments);
          }, false, false, false, false);
          mounted = true;
        }
      },
      p: function (new_ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        ctx = new_ctx;
        var playeditor_changes = {};
        if (dirty & /*getExample*/1) playeditor_changes.examples = /*getExample*/ctx[0]("Default Options");
        playeditor.$set(playeditor_changes);
      },
      i: function (local) {
        if (current) return;
        transition_in(playeditor.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(playeditor.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div3);
        destroy_component(playeditor);
        mounted = false;
        dispose();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$h.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$h($$self, $$props, $$invalidate) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('SectionDefaultOptions', slots, []);
    var getExample = $$props.getExample;
    var getHelpExample = $$props.getHelpExample;
    var getRunWay = $$props.getRunWay;
    var scroll = $$props.scroll;
    var clickMain = $$props.clickMain;
    $$self.$$.on_mount.push(function () {
      if (getExample === undefined && !('getExample' in $$props || $$self.$$.bound[$$self.$$.props['getExample']])) {
        console.warn("<SectionDefaultOptions> was created without expected prop 'getExample'");
      }
      if (getHelpExample === undefined && !('getHelpExample' in $$props || $$self.$$.bound[$$self.$$.props['getHelpExample']])) {
        console.warn("<SectionDefaultOptions> was created without expected prop 'getHelpExample'");
      }
      if (getRunWay === undefined && !('getRunWay' in $$props || $$self.$$.bound[$$self.$$.props['getRunWay']])) {
        console.warn("<SectionDefaultOptions> was created without expected prop 'getRunWay'");
      }
      if (scroll === undefined && !('scroll' in $$props || $$self.$$.bound[$$self.$$.props['scroll']])) {
        console.warn("<SectionDefaultOptions> was created without expected prop 'scroll'");
      }
      if (clickMain === undefined && !('clickMain' in $$props || $$self.$$.bound[$$self.$$.props['clickMain']])) {
        console.warn("<SectionDefaultOptions> was created without expected prop 'clickMain'");
      }
    });
    var writable_props = ['getExample', 'getHelpExample', 'getRunWay', 'scroll', 'clickMain'];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<SectionDefaultOptions> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$$set = function ($$props) {
      if ('getExample' in $$props) $$invalidate(0, getExample = $$props.getExample);
      if ('getHelpExample' in $$props) $$invalidate(2, getHelpExample = $$props.getHelpExample);
      if ('getRunWay' in $$props) $$invalidate(3, getRunWay = $$props.getRunWay);
      if ('scroll' in $$props) $$invalidate(4, scroll = $$props.scroll);
      if ('clickMain' in $$props) $$invalidate(1, clickMain = $$props.clickMain);
    };
    $$self.$capture_state = function () {
      return {
        CodeWrap: CodeWrap,
        PlayEditor: PlayEditor,
        Lazy: Src,
        getExample: getExample,
        getHelpExample: getHelpExample,
        getRunWay: getRunWay,
        scroll: scroll,
        clickMain: clickMain
      };
    };
    $$self.$inject_state = function ($$props) {
      if ('getExample' in $$props) $$invalidate(0, getExample = $$props.getExample);
      if ('getHelpExample' in $$props) $$invalidate(2, getHelpExample = $$props.getHelpExample);
      if ('getRunWay' in $$props) $$invalidate(3, getRunWay = $$props.getRunWay);
      if ('scroll' in $$props) $$invalidate(4, scroll = $$props.scroll);
      if ('clickMain' in $$props) $$invalidate(1, clickMain = $$props.clickMain);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    return [getExample, clickMain, getHelpExample, getRunWay, scroll];
  }
  var SectionDefaultOptions = /*#__PURE__*/function (_SvelteComponentDev) {
    function SectionDefaultOptions(options) {
      var _this;
      _classCallCheck(this, SectionDefaultOptions);
      _this = _callSuper$i(this, SectionDefaultOptions, [options]);
      init(_this, options, instance$h, create_fragment$h, safe_not_equal, {
        getExample: 0,
        getHelpExample: 2,
        getRunWay: 3,
        scroll: 4,
        clickMain: 1
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "SectionDefaultOptions",
        options: options,
        id: create_fragment$h.name
      });
      return _this;
    }
    _inherits(SectionDefaultOptions, _SvelteComponentDev);
    return _createClass(SectionDefaultOptions, [{
      key: "getExample",
      get: function () {
        throw new Error("<SectionDefaultOptions>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionDefaultOptions>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "getHelpExample",
      get: function () {
        throw new Error("<SectionDefaultOptions>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionDefaultOptions>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "getRunWay",
      get: function () {
        throw new Error("<SectionDefaultOptions>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionDefaultOptions>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "scroll",
      get: function () {
        throw new Error("<SectionDefaultOptions>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionDefaultOptions>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }, {
      key: "clickMain",
      get: function () {
        throw new Error("<SectionDefaultOptions>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionDefaultOptions>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }]);
  }(SvelteComponentDev);

  function _callSuper$j(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$j() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$j() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$j = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$h = "src/components/docs/sections/SectionTipsTrick.svelte";
  function create_fragment$i(ctx) {
    var div3;
    var div0;
    var h1;
    var t1;
    var h3;
    var t3;
    var div1;
    var t4;
    var br0;
    var t5;
    var div2;
    var h20;
    var t7;
    var p0;
    var t9;
    var ol;
    var li0;
    var t11;
    var li1;
    var t13;
    var br1;
    var t14;
    var h21;
    var t16;
    var p1;
    var t17;
    var code0;
    var t19;
    var t20;
    var p2;
    var t21;
    var a;
    var t23;
    var code1;
    var t25;
    var mounted;
    var dispose;
    var block = {
      c: function () {
        div3 = element("div");
        div0 = element("div");
        h1 = element("h1");
        h1.textContent = "Tips & Trick";
        t1 = space();
        h3 = element("h3");
        h3.textContent = "You need to know for optimizing your Cakcuk";
        t3 = space();
        div1 = element("div");
        t4 = space();
        br0 = element("br");
        t5 = space();
        div2 = element("div");
        h20 = element("h2");
        h20.textContent = "Work with Slackbot";
        t7 = space();
        p0 = element("p");
        p0.textContent = "You can work with Slackbot to make your Cakcuk powerful.";
        t9 = space();
        ol = element("ol");
        li0 = element("li");
        li0.textContent = "Creating Slackbot alias to trigger Cakcuk's commands.";
        t11 = space();
        li1 = element("li");
        li1.textContent = "Set a reminder to execute a certain command at a certain\n                    time.";
        t13 = space();
        br1 = element("br");
        t14 = space();
        h21 = element("h2");
        h21.textContent = "Authentication Support";
        t16 = space();
        p1 = element("p");
        t17 = text("Currently, only basic authentication that's supported on a\n                specific option which is\n                ");
        code0 = element("code");
        code0.textContent = "--basicAuth, -ba";
        t19 = text(". But you also can implement the\n                other authentication that's able to generate to be header\n                values.");
        t20 = space();
        p2 = element("p");
        t21 = text("You can explore it easily on API tools like ");
        a = element("a");
        a.textContent = "Postman";
        t23 = text(". You can choose what type of auth you use. Then simply get the\n                generated headers. Then you can put those headers values to\n                Cakcuk command request with ");
        code1 = element("code");
        code1.textContent = "--header, -h";
        t25 = text(" option.");
        add_location(h1, file$h, 10, 12, 297);
        add_location(h3, file$h, 11, 12, 331);
        attr_dev(div0, "class", "header");
        add_location(div0, file$h, 9, 8, 264);
        attr_dev(div1, "class", "line");
        add_location(div1, file$h, 13, 8, 407);
        add_location(br0, file$h, 14, 8, 440);
        attr_dev(h20, "class", "content-subhead");
        add_location(h20, file$h, 16, 12, 489);
        add_location(p0, file$h, 17, 12, 553);
        add_location(li0, file$h, 19, 16, 650);
        add_location(li1, file$h, 20, 16, 729);
        add_location(ol, file$h, 18, 12, 629);
        add_location(br1, file$h, 25, 12, 889);
        attr_dev(h21, "class", "content-subhead");
        add_location(h21, file$h, 26, 12, 908);
        add_location(code0, file$h, 30, 16, 1112);
        add_location(p1, file$h, 27, 12, 976);
        attr_dev(a, "target", "_blank");
        attr_dev(a, "href", "https://www.postman.com/");
        add_location(a, file$h, 35, 60, 1365);
        add_location(code1, file$h, 40, 44, 1668);
        add_location(p2, file$h, 34, 12, 1301);
        attr_dev(div2, "class", "content");
        add_location(div2, file$h, 15, 8, 455);
        attr_dev(div3, "class", "main");
        attr_dev(div3, "id", "tipsTrick");
        add_location(div3, file$h, 8, 0, 201);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div3, anchor);
        append_dev(div3, div0);
        append_dev(div0, h1);
        append_dev(div0, t1);
        append_dev(div0, h3);
        append_dev(div3, t3);
        append_dev(div3, div1);
        append_dev(div3, t4);
        append_dev(div3, br0);
        append_dev(div3, t5);
        append_dev(div3, div2);
        append_dev(div2, h20);
        append_dev(div2, t7);
        append_dev(div2, p0);
        append_dev(div2, t9);
        append_dev(div2, ol);
        append_dev(ol, li0);
        append_dev(ol, t11);
        append_dev(ol, li1);
        append_dev(div2, t13);
        append_dev(div2, br1);
        append_dev(div2, t14);
        append_dev(div2, h21);
        append_dev(div2, t16);
        append_dev(div2, p1);
        append_dev(p1, t17);
        append_dev(p1, code0);
        append_dev(p1, t19);
        append_dev(div2, t20);
        append_dev(div2, p2);
        append_dev(p2, t21);
        append_dev(p2, a);
        append_dev(p2, t23);
        append_dev(p2, code1);
        append_dev(p2, t25);
        if (!mounted) {
          dispose = listen_dev(div3, "click", function () {
            if (is_function(/*clickMain*/ctx[0])) /*clickMain*/ctx[0].apply(this, arguments);
          }, false, false, false, false);
          mounted = true;
        }
      },
      p: function (new_ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        ctx = new_ctx;
      },
      i: noop$1,
      o: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(div3);
        mounted = false;
        dispose();
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$i.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$i($$self, $$props, $$invalidate) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('SectionTipsTrick', slots, []);
    var clickMain = $$props.clickMain;
    $$self.$$.on_mount.push(function () {
      if (clickMain === undefined && !('clickMain' in $$props || $$self.$$.bound[$$self.$$.props['clickMain']])) {
        console.warn("<SectionTipsTrick> was created without expected prop 'clickMain'");
      }
    });
    var writable_props = ['clickMain'];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<SectionTipsTrick> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$$set = function ($$props) {
      if ('clickMain' in $$props) $$invalidate(0, clickMain = $$props.clickMain);
    };
    $$self.$capture_state = function () {
      return {
        CodeWrap: CodeWrap,
        PlayEditor: PlayEditor,
        Lazy: Src,
        clickMain: clickMain
      };
    };
    $$self.$inject_state = function ($$props) {
      if ('clickMain' in $$props) $$invalidate(0, clickMain = $$props.clickMain);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    return [clickMain];
  }
  var SectionTipsTrick = /*#__PURE__*/function (_SvelteComponentDev) {
    function SectionTipsTrick(options) {
      var _this;
      _classCallCheck(this, SectionTipsTrick);
      _this = _callSuper$j(this, SectionTipsTrick, [options]);
      init(_this, options, instance$i, create_fragment$i, safe_not_equal, {
        clickMain: 0
      });
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "SectionTipsTrick",
        options: options,
        id: create_fragment$i.name
      });
      return _this;
    }
    _inherits(SectionTipsTrick, _SvelteComponentDev);
    return _createClass(SectionTipsTrick, [{
      key: "clickMain",
      get: function () {
        throw new Error("<SectionTipsTrick>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      },
      set: function (value) {
        throw new Error("<SectionTipsTrick>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
      }
    }]);
  }(SvelteComponentDev);

  function _callSuper$k(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$k() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$k() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$k = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$i = "src/components/docs/Docs.svelte";

  // (109:16) <Lazy fadeOption={null}>
  function create_default_slot$7(ctx) {
    var img;
    var img_src_value;
    var block = {
      c: function () {
        img = element("img");
        attr_dev(img, "id", "logo");
        attr_dev(img, "alt", "Cakcuk Logo");
        if (!src_url_equal(img.src, img_src_value = "images/cakcuk_logo.png")) attr_dev(img, "src", img_src_value);
        add_location(img, file$i, 109, 20, 3491);
      },
      m: function (target, anchor) {
        insert_dev(target, img, anchor);
      },
      p: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(img);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_default_slot$7.name,
      type: "slot",
      source: "(109:16) <Lazy fadeOption={null}>",
      ctx: ctx
    });
    return block;
  }
  function create_fragment$j(ctx) {
    var div3;
    var a0;
    var div0;
    var span0;
    var t0;
    var span1;
    var t1;
    var span2;
    var div0_class_value;
    var t2;
    var div2;
    var div1;
    var a1;
    var lazy;
    var t3;
    var ul;
    var li0;
    var a2;
    var t5;
    var li1;
    var a3;
    var t7;
    var li2;
    var a4;
    var t9;
    var li3;
    var a5;
    var t11;
    var li4;
    var a6;
    var t13;
    var li5;
    var a7;
    var t15;
    var li6;
    var a8;
    var t17;
    var li7;
    var a9;
    var t19;
    var li8;
    var a10;
    var t21;
    var li9;
    var a11;
    var t23;
    var li10;
    var a12;
    var t25;
    var li11;
    var a13;
    var t27;
    var li12;
    var a14;
    var t29;
    var li13;
    var a15;
    var t31;
    var li14;
    var a16;
    var t33;
    var li15;
    var a17;
    var t35;
    var sectiongetstarted;
    var t36;
    var sectiondefaultcommands;
    var t37;
    var sectioncustomcommand;
    var t38;
    var sectiondefaultoptions;
    var t39;
    var sectiontipstrick;
    var t40;
    var br0;
    var t41;
    var br1;
    var t42;
    var br2;
    var t43;
    var br3;
    var current;
    var mounted;
    var dispose;
    lazy = new Src({
      props: {
        fadeOption: null,
        $$slots: {
          default: [create_default_slot$7]
        },
        $$scope: {
          ctx: ctx
        }
      },
      $$inline: true
    });
    sectiongetstarted = new SectionGetStarted({
      props: {
        getRunWay: /*getRunWay*/ctx[5],
        scroll: /*scroll*/ctx[3],
        clickMain: /*clickMain*/ctx[2]
      },
      $$inline: true
    });
    sectiondefaultcommands = new SectionDefaultCommands({
      props: {
        getExample: /*getExample*/ctx[4],
        getHelpExample: /*getHelpExample*/ctx[6],
        getRunWay: /*getRunWay*/ctx[5],
        scroll: /*scroll*/ctx[3],
        clickMain: /*clickMain*/ctx[2]
      },
      $$inline: true
    });
    sectioncustomcommand = new SectionCustomCommand({
      props: {
        getExample: /*getExample*/ctx[4],
        getHelpExample: /*getHelpExample*/ctx[6],
        getRunWay: /*getRunWay*/ctx[5],
        scroll: /*scroll*/ctx[3],
        clickMain: /*clickMain*/ctx[2]
      },
      $$inline: true
    });
    sectiondefaultoptions = new SectionDefaultOptions({
      props: {
        getExample: /*getExample*/ctx[4],
        getHelpExample: /*getHelpExample*/ctx[6],
        getRunWay: /*getRunWay*/ctx[5],
        scroll: /*scroll*/ctx[3],
        clickMain: /*clickMain*/ctx[2]
      },
      $$inline: true
    });
    sectiontipstrick = new SectionTipsTrick({
      props: {
        clickMain: /*clickMain*/ctx[2]
      },
      $$inline: true
    });
    var block = {
      c: function () {
        div3 = element("div");
        a0 = element("a");
        div0 = element("div");
        span0 = element("span");
        t0 = space();
        span1 = element("span");
        t1 = space();
        span2 = element("span");
        t2 = space();
        div2 = element("div");
        div1 = element("div");
        a1 = element("a");
        create_component(lazy.$$.fragment);
        t3 = space();
        ul = element("ul");
        li0 = element("li");
        a2 = element("a");
        a2.textContent = "•   Get Started";
        t5 = space();
        li1 = element("li");
        a3 = element("a");
        a3.textContent = "•   Default Commands";
        t7 = space();
        li2 = element("li");
        a4 = element("a");
        a4.textContent = "•   Help";
        t9 = space();
        li3 = element("li");
        a5 = element("a");
        a5.textContent = "•   Cuk";
        t11 = space();
        li4 = element("li");
        a6 = element("a");
        a6.textContent = "•   Cak";
        t13 = space();
        li5 = element("li");
        a7 = element("a");
        a7.textContent = "•   Del";
        t15 = space();
        li6 = element("li");
        a8 = element("a");
        a8.textContent = "•   Scope - ACL";
        t17 = space();
        li7 = element("li");
        a9 = element("a");
        a9.textContent = "•   SU - Superuser";
        t19 = space();
        li8 = element("li");
        a10 = element("a");
        a10.textContent = "•   Custom Command";
        t21 = space();
        li9 = element("li");
        a11 = element("a");
        a11.textContent = "•   Default Options";
        t23 = space();
        li10 = element("li");
        a12 = element("a");
        a12.textContent = "•   --outputFile";
        t25 = space();
        li11 = element("li");
        a13 = element("a");
        a13.textContent = "•   --filter";
        t27 = space();
        li12 = element("li");
        a14 = element("a");
        a14.textContent = "•   --printOptions";
        t29 = space();
        li13 = element("li");
        a15 = element("a");
        a15.textContent = "•   --noResponse";
        t31 = space();
        li14 = element("li");
        a16 = element("a");
        a16.textContent = "•   --noParse";
        t33 = space();
        li15 = element("li");
        a17 = element("a");
        a17.textContent = "•   Tips & Trick";
        t35 = space();
        create_component(sectiongetstarted.$$.fragment);
        t36 = space();
        create_component(sectiondefaultcommands.$$.fragment);
        t37 = space();
        create_component(sectioncustomcommand.$$.fragment);
        t38 = space();
        create_component(sectiondefaultoptions.$$.fragment);
        t39 = space();
        create_component(sectiontipstrick.$$.fragment);
        t40 = space();
        br0 = element("br");
        t41 = space();
        br1 = element("br");
        t42 = space();
        br2 = element("br");
        t43 = space();
        br3 = element("br");
        attr_dev(span0, "class", "line");
        add_location(span0, file$i, 99, 12, 3176);
        attr_dev(span1, "class", "line");
        add_location(span1, file$i, 100, 12, 3215);
        attr_dev(span2, "class", "line");
        add_location(span2, file$i, 101, 12, 3254);
        attr_dev(div0, "class", div0_class_value = "hamburger " + /*activeToogle*/ctx[0] + " my-float");
        attr_dev(div0, "id", "hamburger-10");
        add_location(div0, file$i, 98, 8, 3098);
        attr_dev(a0, "class", "float");
        add_location(a0, file$i, 97, 4, 3049);
        attr_dev(a1, "href", "#");
        attr_dev(a1, "class", "pure-menu-heading");
        add_location(a1, file$i, 107, 12, 3391);
        attr_dev(a2, "goto", "getStarted");
        attr_dev(a2, "class", "pure-menu-link");
        add_location(a2, file$i, 118, 20, 3793);
        attr_dev(li0, "class", "pure-menu-item");
        add_location(li0, file$i, 117, 16, 3745);
        attr_dev(a3, "goto", "defaultCommands");
        attr_dev(a3, "class", "pure-menu-link");
        add_location(a3, file$i, 125, 20, 4069);
        attr_dev(li1, "class", "pure-menu-item");
        add_location(li1, file$i, 124, 16, 4021);
        attr_dev(a4, "goto", "helpCommand");
        attr_dev(a4, "class", "pure-menu-link menu-child");
        add_location(a4, file$i, 133, 20, 4380);
        attr_dev(li2, "class", "pure-menu-item");
        add_location(li2, file$i, 132, 16, 4332);
        attr_dev(a5, "goto", "cukCommand");
        attr_dev(a5, "class", "pure-menu-link menu-child");
        add_location(a5, file$i, 141, 20, 4686);
        attr_dev(li3, "class", "pure-menu-item");
        add_location(li3, file$i, 140, 16, 4638);
        attr_dev(a6, "goto", "cakCommand");
        attr_dev(a6, "class", "pure-menu-link menu-child");
        add_location(a6, file$i, 149, 20, 4990);
        attr_dev(li4, "class", "pure-menu-item");
        add_location(li4, file$i, 148, 16, 4942);
        attr_dev(a7, "goto", "delCommand");
        attr_dev(a7, "class", "pure-menu-link menu-child");
        add_location(a7, file$i, 157, 20, 5294);
        attr_dev(li5, "class", "pure-menu-item");
        add_location(li5, file$i, 156, 16, 5246);
        attr_dev(a8, "goto", "scopeCommand");
        attr_dev(a8, "class", "pure-menu-link menu-child");
        add_location(a8, file$i, 165, 20, 5598);
        attr_dev(li6, "class", "pure-menu-item");
        add_location(li6, file$i, 164, 16, 5550);
        attr_dev(a9, "goto", "suCommand");
        attr_dev(a9, "class", "pure-menu-link menu-child");
        add_location(a9, file$i, 173, 20, 5912);
        attr_dev(li7, "class", "pure-menu-item");
        add_location(li7, file$i, 172, 16, 5864);
        attr_dev(a10, "goto", "customCommand");
        attr_dev(a10, "class", "pure-menu-link");
        add_location(a10, file$i, 181, 20, 6244);
        attr_dev(li8, "class", "pure-menu-item menu-item-divided");
        add_location(li8, file$i, 180, 16, 6178);
        attr_dev(a11, "goto", "defaultOptions");
        attr_dev(a11, "class", "pure-menu-link");
        add_location(a11, file$i, 189, 20, 6551);
        attr_dev(li9, "class", "pure-menu-item");
        add_location(li9, file$i, 188, 16, 6503);
        attr_dev(a12, "goto", "outputFileOption");
        attr_dev(a12, "class", "pure-menu-link menu-child");
        add_location(a12, file$i, 197, 20, 6860);
        attr_dev(li10, "class", "pure-menu-item");
        add_location(li10, file$i, 196, 16, 6812);
        attr_dev(a13, "goto", "filterOption");
        attr_dev(a13, "class", "pure-menu-link menu-child");
        add_location(a13, file$i, 205, 20, 7179);
        attr_dev(li11, "class", "pure-menu-item");
        add_location(li11, file$i, 204, 16, 7131);
        attr_dev(a14, "goto", "printOptions");
        attr_dev(a14, "class", "pure-menu-link menu-child");
        add_location(a14, file$i, 213, 20, 7490);
        attr_dev(li12, "class", "pure-menu-item");
        add_location(li12, file$i, 212, 16, 7442);
        attr_dev(a15, "goto", "noResponseOption");
        attr_dev(a15, "class", "pure-menu-link menu-child");
        add_location(a15, file$i, 221, 20, 7807);
        attr_dev(li13, "class", "pure-menu-item");
        add_location(li13, file$i, 220, 16, 7759);
        attr_dev(a16, "goto", "noParseOption");
        attr_dev(a16, "class", "pure-menu-link menu-child");
        add_location(a16, file$i, 229, 20, 8126);
        attr_dev(li14, "class", "pure-menu-item");
        add_location(li14, file$i, 228, 16, 8078);
        attr_dev(a17, "goto", "tipsTrick");
        attr_dev(a17, "class", "pure-menu-link");
        add_location(a17, file$i, 238, 20, 8440);
        attr_dev(li15, "class", "pure-menu-item");
        add_location(li15, file$i, 237, 16, 8392);
        attr_dev(ul, "class", "pure-menu-list");
        add_location(ul, file$i, 116, 12, 3701);
        attr_dev(div1, "class", "pure-menu");
        add_location(div1, file$i, 106, 8, 3355);
        attr_dev(div2, "id", "menu");
        attr_dev(div2, "class", /*activeToogle*/ctx[0]);
        add_location(div2, file$i, 105, 4, 3310);
        add_location(br0, file$i, 251, 4, 9032);
        add_location(br1, file$i, 252, 4, 9043);
        add_location(br2, file$i, 253, 4, 9054);
        add_location(br3, file$i, 254, 4, 9065);
        attr_dev(div3, "id", "layout");
        attr_dev(div3, "class", /*activeToogle*/ctx[0]);
        add_location(div3, file$i, 94, 0, 2940);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div3, anchor);
        append_dev(div3, a0);
        append_dev(a0, div0);
        append_dev(div0, span0);
        append_dev(div0, t0);
        append_dev(div0, span1);
        append_dev(div0, t1);
        append_dev(div0, span2);
        append_dev(div3, t2);
        append_dev(div3, div2);
        append_dev(div2, div1);
        append_dev(div1, a1);
        mount_component(lazy, a1, null);
        append_dev(div1, t3);
        append_dev(div1, ul);
        append_dev(ul, li0);
        append_dev(li0, a2);
        append_dev(ul, t5);
        append_dev(ul, li1);
        append_dev(li1, a3);
        append_dev(ul, t7);
        append_dev(ul, li2);
        append_dev(li2, a4);
        append_dev(ul, t9);
        append_dev(ul, li3);
        append_dev(li3, a5);
        append_dev(ul, t11);
        append_dev(ul, li4);
        append_dev(li4, a6);
        append_dev(ul, t13);
        append_dev(ul, li5);
        append_dev(li5, a7);
        append_dev(ul, t15);
        append_dev(ul, li6);
        append_dev(li6, a8);
        append_dev(ul, t17);
        append_dev(ul, li7);
        append_dev(li7, a9);
        append_dev(ul, t19);
        append_dev(ul, li8);
        append_dev(li8, a10);
        append_dev(ul, t21);
        append_dev(ul, li9);
        append_dev(li9, a11);
        append_dev(ul, t23);
        append_dev(ul, li10);
        append_dev(li10, a12);
        append_dev(ul, t25);
        append_dev(ul, li11);
        append_dev(li11, a13);
        append_dev(ul, t27);
        append_dev(ul, li12);
        append_dev(li12, a14);
        append_dev(ul, t29);
        append_dev(ul, li13);
        append_dev(li13, a15);
        append_dev(ul, t31);
        append_dev(ul, li14);
        append_dev(li14, a16);
        append_dev(ul, t33);
        append_dev(ul, li15);
        append_dev(li15, a17);
        append_dev(div3, t35);
        mount_component(sectiongetstarted, div3, null);
        append_dev(div3, t36);
        mount_component(sectiondefaultcommands, div3, null);
        append_dev(div3, t37);
        mount_component(sectioncustomcommand, div3, null);
        append_dev(div3, t38);
        mount_component(sectiondefaultoptions, div3, null);
        append_dev(div3, t39);
        mount_component(sectiontipstrick, div3, null);
        append_dev(div3, t40);
        append_dev(div3, br0);
        append_dev(div3, t41);
        append_dev(div3, br1);
        append_dev(div3, t42);
        append_dev(div3, br2);
        append_dev(div3, t43);
        append_dev(div3, br3);
        current = true;
        if (!mounted) {
          dispose = [listen_dev(a0, "click", /*clickToogle*/ctx[1], false, false, false, false), listen_dev(a2, "click", /*scroll*/ctx[3], false, false, false, false), listen_dev(a3, "click", /*scroll*/ctx[3], false, false, false, false), listen_dev(a4, "click", /*scroll*/ctx[3], false, false, false, false), listen_dev(a5, "click", /*scroll*/ctx[3], false, false, false, false), listen_dev(a6, "click", /*scroll*/ctx[3], false, false, false, false), listen_dev(a7, "click", /*scroll*/ctx[3], false, false, false, false), listen_dev(a8, "click", /*scroll*/ctx[3], false, false, false, false), listen_dev(a9, "click", /*scroll*/ctx[3], false, false, false, false), listen_dev(a10, "click", /*scroll*/ctx[3], false, false, false, false), listen_dev(a11, "click", /*scroll*/ctx[3], false, false, false, false), listen_dev(a12, "click", /*scroll*/ctx[3], false, false, false, false), listen_dev(a13, "click", /*scroll*/ctx[3], false, false, false, false), listen_dev(a14, "click", /*scroll*/ctx[3], false, false, false, false), listen_dev(a15, "click", /*scroll*/ctx[3], false, false, false, false), listen_dev(a16, "click", /*scroll*/ctx[3], false, false, false, false), listen_dev(a17, "click", /*scroll*/ctx[3], false, false, false, false)];
          mounted = true;
        }
      },
      p: function (ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        if (!current || dirty & /*activeToogle*/1 && div0_class_value !== (div0_class_value = "hamburger " + /*activeToogle*/ctx[0] + " my-float")) {
          attr_dev(div0, "class", div0_class_value);
        }
        var lazy_changes = {};
        if (dirty & /*$$scope*/256) {
          lazy_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }
        lazy.$set(lazy_changes);
        if (!current || dirty & /*activeToogle*/1) {
          attr_dev(div2, "class", /*activeToogle*/ctx[0]);
        }
        if (!current || dirty & /*activeToogle*/1) {
          attr_dev(div3, "class", /*activeToogle*/ctx[0]);
        }
      },
      i: function (local) {
        if (current) return;
        transition_in(lazy.$$.fragment, local);
        transition_in(sectiongetstarted.$$.fragment, local);
        transition_in(sectiondefaultcommands.$$.fragment, local);
        transition_in(sectioncustomcommand.$$.fragment, local);
        transition_in(sectiondefaultoptions.$$.fragment, local);
        transition_in(sectiontipstrick.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(lazy.$$.fragment, local);
        transition_out(sectiongetstarted.$$.fragment, local);
        transition_out(sectiondefaultcommands.$$.fragment, local);
        transition_out(sectioncustomcommand.$$.fragment, local);
        transition_out(sectiondefaultoptions.$$.fragment, local);
        transition_out(sectiontipstrick.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div3);
        destroy_component(lazy);
        destroy_component(sectiongetstarted);
        destroy_component(sectiondefaultcommands);
        destroy_component(sectioncustomcommand);
        destroy_component(sectiondefaultoptions);
        destroy_component(sectiontipstrick);
        mounted = false;
        run_all(dispose);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$j.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function autoGrow(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  }
  function instance$j($$self, $$props, $$invalidate) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('Docs', slots, []);
    var activeToogle = "";
    function clickToogle() {
      if (activeToogle == "") {
        $$invalidate(0, activeToogle = "active");
        return;
      }
      $$invalidate(0, activeToogle = "");
    }
    function clickMain(event) {
      if (activeToogle == "active") {
        clickToogle();
      }
    }
    function scroll(event) {
      scrollInto(event, 22);
      clickMain();
    }
    function getExample() {
      for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
      }
      var filteredExamples = MOCK_DATA.SNIPPET_EXAMPLES.filter(function (item) {
        for (var i = 0; i < keys.length; i++) {
          if (item.key == keys[i]) return true;
        }
        return false;
      });
      return filteredExamples;
    }
    function getRunWay(key) {
      var filteredExamples = MOCK_DATA.RUN_WAYS.filter(function (item) {
        if (item.key == key) return true;
        return false;
      });
      if (filteredExamples.length > 0) {
        return filteredExamples[0].code;
      }
      return "";
    }
    function getHelpExample(key) {
      var filteredExamples = MOCK_DATA.HELP_EXAMPLES.filter(function (item) {
        if (item.key == key) return true;
        return false;
      });
      if (filteredExamples.length <= 0) {
        return;
      }
      return filteredExamples[0].command;
    }
    var watch = location$1.subscribe(function (value) {
      value = value.split("/docs/").join("");
      if (value == "/" || value == "/docs") {
        window.scrollTo(0, 0);
        return;
      }
      try {
        onMount(function () {
          scrollInto(null, 22, value, "auto");
        });
      } catch (e) {}
    });
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Docs> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$capture_state = function () {
      return {
        PlayEditor: PlayEditor,
        CodeWrap: CodeWrap,
        Searchbar: Searchbar,
        DATA: MOCK_DATA,
        scrollInto: scrollInto,
        onMount: onMount,
        Lazy: Src,
        location: location$1,
        querystring: querystring,
        SectionGetStarted: SectionGetStarted,
        SectionDefaultCommands: SectionDefaultCommands,
        SectionCustomCommand: SectionCustomCommand,
        SectionDefaultOptions: SectionDefaultOptions,
        SectionTipsTrick: SectionTipsTrick,
        activeToogle: activeToogle,
        clickToogle: clickToogle,
        clickMain: clickMain,
        scroll: scroll,
        getExample: getExample,
        getRunWay: getRunWay,
        getHelpExample: getHelpExample,
        autoGrow: autoGrow,
        watch: watch
      };
    };
    $$self.$inject_state = function ($$props) {
      if ('activeToogle' in $$props) $$invalidate(0, activeToogle = $$props.activeToogle);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    return [activeToogle, clickToogle, clickMain, scroll, getExample, getRunWay, getHelpExample];
  }
  var Docs = /*#__PURE__*/function (_SvelteComponentDev) {
    function Docs(options) {
      var _this;
      _classCallCheck(this, Docs);
      _this = _callSuper$k(this, Docs, [options]);
      init(_this, options, instance$j, create_fragment$j, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "Docs",
        options: options,
        id: create_fragment$j.name
      });
      return _this;
    }
    _inherits(Docs, _SvelteComponentDev);
    return _createClass(Docs);
  }(SvelteComponentDev);

  function _callSuper$l(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$l() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$l() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$l = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$j = "src/components/Landing.svelte";
  function create_fragment$k(ctx) {
    var div;
    var navbar;
    var t0;
    var banner;
    var t1;
    var content;
    var current;
    navbar = new Navbar({
      props: {
        state: "home"
      },
      $$inline: true
    });
    banner = new Banner({
      $$inline: true
    });
    content = new Content({
      $$inline: true
    });
    var block = {
      c: function () {
        div = element("div");
        create_component(navbar.$$.fragment);
        t0 = space();
        create_component(banner.$$.fragment);
        t1 = space();
        create_component(content.$$.fragment);
        attr_dev(div, "class", "svelte-18hqv7g");
        add_location(div, file$j, 9, 0, 223);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div, anchor);
        mount_component(navbar, div, null);
        append_dev(div, t0);
        mount_component(banner, div, null);
        append_dev(div, t1);
        mount_component(content, div, null);
        current = true;
      },
      p: noop$1,
      i: function (local) {
        if (current) return;
        transition_in(navbar.$$.fragment, local);
        transition_in(banner.$$.fragment, local);
        transition_in(content.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(navbar.$$.fragment, local);
        transition_out(banner.$$.fragment, local);
        transition_out(content.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div);
        destroy_component(navbar);
        destroy_component(banner);
        destroy_component(content);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$k.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$k($$self, $$props) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('Landing', slots, []);
    window.scrollTo(0, 0);
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Landing> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$capture_state = function () {
      return {
        Banner: Banner,
        Content: Content,
        Navbar: Navbar,
        Docs: Docs
      };
    };
    return [];
  }
  var Landing = /*#__PURE__*/function (_SvelteComponentDev) {
    function Landing(options) {
      var _this;
      _classCallCheck(this, Landing);
      _this = _callSuper$l(this, Landing, [options]);
      init(_this, options, instance$k, create_fragment$k, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "Landing",
        options: options,
        id: create_fragment$k.name
      });
      return _this;
    }
    _inherits(Landing, _SvelteComponentDev);
    return _createClass(Landing);
  }(SvelteComponentDev);

  function _callSuper$m(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$m() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$m() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$m = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$k = "src/components/NotFound.svelte";
  function create_fragment$l(ctx) {
    var div1;
    var div0;
    var h1;
    var t1;
    var a;
    var h2;
    var block = {
      c: function () {
        div1 = element("div");
        div0 = element("div");
        h1 = element("h1");
        h1.textContent = "Page Not Found 404";
        t1 = space();
        a = element("a");
        h2 = element("h2");
        h2.textContent = "back to Cakcuk.io";
        attr_dev(h1, "class", "svelte-1jy8apb");
        add_location(h1, file$k, 5, 2, 57);
        attr_dev(h2, "class", "svelte-1jy8apb");
        add_location(h2, file$k, 7, 3, 103);
        attr_dev(a, "href", "#");
        attr_dev(a, "class", "svelte-1jy8apb");
        add_location(a, file$k, 6, 2, 87);
        attr_dev(div0, "class", "fof svelte-1jy8apb");
        add_location(div0, file$k, 4, 1, 37);
        attr_dev(div1, "id", "main");
        attr_dev(div1, "class", "svelte-1jy8apb");
        add_location(div1, file$k, 3, 0, 20);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div1, anchor);
        append_dev(div1, div0);
        append_dev(div0, h1);
        append_dev(div0, t1);
        append_dev(div0, a);
        append_dev(a, h2);
      },
      p: noop$1,
      i: noop$1,
      o: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(div1);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$l.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$l($$self, $$props) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('NotFound', slots, []);
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<NotFound> was created with unknown prop '".concat(key, "'"));
    });
    return [];
  }
  var NotFound = /*#__PURE__*/function (_SvelteComponentDev) {
    function NotFound(options) {
      var _this;
      _classCallCheck(this, NotFound);
      _this = _callSuper$m(this, NotFound, [options]);
      init(_this, options, instance$l, create_fragment$l, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "NotFound",
        options: options,
        id: create_fragment$l.name
      });
      return _this;
    }
    _inherits(NotFound, _SvelteComponentDev);
    return _createClass(NotFound);
  }(SvelteComponentDev);

  function _callSuper$n(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$n() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$n() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$n = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$l = "src/components/PlayWrapper.svelte";
  function create_fragment$m(ctx) {
    var div;
    var navbar;
    var t0;
    var play;
    var t1;
    var footer;
    var current;
    navbar = new Navbar({
      props: {
        state: "play-menu"
      },
      $$inline: true
    });
    play = new Play({
      $$inline: true
    });
    footer = new Footer({
      $$inline: true
    });
    var block = {
      c: function () {
        div = element("div");
        create_component(navbar.$$.fragment);
        t0 = space();
        create_component(play.$$.fragment);
        t1 = space();
        create_component(footer.$$.fragment);
        attr_dev(div, "class", "content-wrapper svelte-14j4zvq");
        add_location(div, file$l, 8, 0, 180);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div, anchor);
        mount_component(navbar, div, null);
        append_dev(div, t0);
        mount_component(play, div, null);
        append_dev(div, t1);
        mount_component(footer, div, null);
        current = true;
      },
      p: noop$1,
      i: function (local) {
        if (current) return;
        transition_in(navbar.$$.fragment, local);
        transition_in(play.$$.fragment, local);
        transition_in(footer.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(navbar.$$.fragment, local);
        transition_out(play.$$.fragment, local);
        transition_out(footer.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div);
        destroy_component(navbar);
        destroy_component(play);
        destroy_component(footer);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$m.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$m($$self, $$props) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('PlayWrapper', slots, []);
    window.scrollTo(0, 0);
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<PlayWrapper> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$capture_state = function () {
      return {
        Navbar: Navbar,
        Play: Play,
        Footer: Footer
      };
    };
    return [];
  }
  var PlayWrapper = /*#__PURE__*/function (_SvelteComponentDev) {
    function PlayWrapper(options) {
      var _this;
      _classCallCheck(this, PlayWrapper);
      _this = _callSuper$n(this, PlayWrapper, [options]);
      init(_this, options, instance$m, create_fragment$m, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "PlayWrapper",
        options: options,
        id: create_fragment$m.name
      });
      return _this;
    }
    _inherits(PlayWrapper, _SvelteComponentDev);
    return _createClass(PlayWrapper);
  }(SvelteComponentDev);

  function _callSuper$o(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$o() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$o() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$o = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$m = "src/components/content/Console.svelte";
  function create_fragment$n(ctx) {
    var div4;
    var div3;
    var div2;
    var div0;
    var br0;
    var t0;
    var br1;
    var t1;
    var h4;
    var t3;
    var p;
    var t4;
    var b;
    var t6;
    var t7;
    var div1;
    var dialog_1;
    var form;
    var fieldset;
    var legend;
    var t9;
    var input;
    var t10;
    var button;
    var t12;
    var br2;
    var t13;
    var span;
    var t14;
    var playeditor;
    var current;
    var mounted;
    var dispose;
    playeditor = new PlayEditor({
      props: {
        isConsole: "true",
        examples: MOCK_DATA.SNIPPET_CONSOLE
      },
      $$inline: true
    });
    var block = {
      c: function () {
        div4 = element("div");
        div3 = element("div");
        div2 = element("div");
        div0 = element("div");
        br0 = element("br");
        t0 = space();
        br1 = element("br");
        t1 = space();
        h4 = element("h4");
        h4.textContent = "- Cakcuk Console -";
        t3 = space();
        p = element("p");
        t4 = text("You can create command with ");
        b = element("b");
        b.textContent = "Cak";
        t6 = text(" command for your Workspace\n                    with this Console");
        t7 = space();
        div1 = element("div");
        dialog_1 = element("dialog");
        form = element("form");
        fieldset = element("fieldset");
        legend = element("legend");
        legend.textContent = "Input your Console password";
        t9 = space();
        input = element("input");
        t10 = space();
        button = element("button");
        button.textContent = "Submit";
        t12 = space();
        br2 = element("br");
        t13 = space();
        span = element("span");
        t14 = space();
        create_component(playeditor.$$.fragment);
        add_location(br0, file$m, 55, 16, 1717);
        add_location(br1, file$m, 56, 16, 1740);
        set_style(h4, "color", "#fff", 1);
        add_location(h4, file$m, 57, 16, 1763);
        add_location(b, file$m, 59, 48, 1923);
        set_style(p, "color", "#fff", 1);
        add_location(p, file$m, 58, 16, 1839);
        attr_dev(div0, "class", "sub-header svelte-h5w3c5");
        add_location(div0, file$m, 54, 12, 1676);
        add_location(legend, file$m, 67, 28, 2307);
        attr_dev(input, "type", "password");
        attr_dev(input, "placeholder", "Password");
        input.required = true;
        add_location(input, file$m, 68, 28, 2380);
        attr_dev(button, "type", "submit");
        attr_dev(button, "class", "pure-button pure-button-primary");
        add_location(button, file$m, 69, 28, 2493);
        add_location(fieldset, file$m, 66, 24, 2268);
        attr_dev(form, "class", "pure-form");
        add_location(form, file$m, 65, 20, 2171);
        attr_dev(dialog_1, "id", "dialog");
        dialog_1.open = true;
        add_location(dialog_1, file$m, 64, 16, 2104);
        attr_dev(div1, "class", "pure-u-1 pure-u-md-1-1");
        add_location(div1, file$m, 63, 12, 2051);
        add_location(br2, file$m, 74, 12, 2692);
        attr_dev(div2, "class", "pure-u-1 pure-u-md-1-1");
        add_location(div2, file$m, 53, 8, 1627);
        attr_dev(span, "id", "editor");
        add_location(span, file$m, 76, 8, 2722);
        attr_dev(div3, "class", "pure-g");
        add_location(div3, file$m, 52, 4, 1598);
        attr_dev(div4, "class", "bg svelte-h5w3c5");
        add_location(div4, file$m, 51, 0, 1577);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div4, anchor);
        append_dev(div4, div3);
        append_dev(div3, div2);
        append_dev(div2, div0);
        append_dev(div0, br0);
        append_dev(div0, t0);
        append_dev(div0, br1);
        append_dev(div0, t1);
        append_dev(div0, h4);
        append_dev(div0, t3);
        append_dev(div0, p);
        append_dev(p, t4);
        append_dev(p, b);
        append_dev(p, t6);
        append_dev(div2, t7);
        append_dev(div2, div1);
        append_dev(div1, dialog_1);
        append_dev(dialog_1, form);
        append_dev(form, fieldset);
        append_dev(fieldset, legend);
        append_dev(fieldset, t9);
        append_dev(fieldset, input);
        set_input_value(input, /*consolePassword*/ctx[0]);
        append_dev(fieldset, t10);
        append_dev(fieldset, button);
        /*dialog_1_binding*/
        ctx[5](dialog_1);
        append_dev(div2, t12);
        append_dev(div2, br2);
        append_dev(div3, t13);
        append_dev(div3, span);
        append_dev(div3, t14);
        mount_component(playeditor, div3, null);
        current = true;
        if (!mounted) {
          dispose = [listen_dev(input, "input", /*input_input_handler*/ctx[4]), listen_dev(form, "submit", prevent_default(/*handleSubmitPassword*/ctx[2]), false, true, false, false)];
          mounted = true;
        }
      },
      p: function (ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        if (dirty & /*consolePassword*/1 && input.value !== /*consolePassword*/ctx[0]) {
          set_input_value(input, /*consolePassword*/ctx[0]);
        }
      },
      i: function (local) {
        if (current) return;
        transition_in(playeditor.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(playeditor.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div4);
        /*dialog_1_binding*/
        ctx[5](null);
        destroy_component(playeditor);
        mounted = false;
        run_all(dispose);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$n.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$n($$self, $$props, $$invalidate) {
    var $dialog;
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('Console', slots, []);
    var authSign;

    // Function to perform the HTTP request
    function verifyAuthSign() {
      return _verifyAuthSign.apply(this, arguments);
    }
    function _verifyAuthSign() {
      _verifyAuthSign = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee() {
        var response;
        return regenerator.wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return fetch("/console/verify", {
                method: "POST",
                headers: {
                  "x-auth-sign": authSign,
                  "x-auth-password": consolePassword
                }
              });
            case 3:
              response = _context.sent;
              if (!(response.status !== 200)) {
                _context.next = 8;
                break;
              }
              alert("Authentication failed,", response.text());

              // redirect to /
              window.location.href = "/";
              return _context.abrupt("return");
            case 8:
              localStorage.setItem('x-auth-sign', authSign);
              localStorage.setItem('x-auth-password', consolePassword);

              // show success dialog
              alert("Authentication success");
              _context.next = 17;
              break;
            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](0);
              alert("Authentication failed");

              // redirect to / 
              window.location.href = "/";
            case 17:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 13]]);
      }));
      return _verifyAuthSign.apply(this, arguments);
    }
    var consolePassword = "";
    function handleSubmitPassword() {
      authSign = window.location.href.includes("auth_sign=") ? window.location.href.split("auth_sign=")[1] : null;

      // Check if 'auth_sign' is not null or empty
      if (!authSign) {
        alert("auth_sign query parameter is missing");
        return;
      }
      verifyAuthSign();
      $dialog.close();
    }
    var dialog;
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Console> was created with unknown prop '".concat(key, "'"));
    });
    function input_input_handler() {
      consolePassword = this.value;
      $$invalidate(0, consolePassword);
    }
    $$self.$capture_state = function () {
      return {
        PlayEditor: PlayEditor,
        DATA: MOCK_DATA,
        authSign: authSign,
        verifyAuthSign: verifyAuthSign,
        consolePassword: consolePassword,
        handleSubmitPassword: handleSubmitPassword,
        dialog: dialog,
        $dialog: $dialog
      };
    };
    $$self.$inject_state = function ($$props) {
      if ('authSign' in $$props) authSign = $$props.authSign;
      if ('consolePassword' in $$props) $$invalidate(0, consolePassword = $$props.consolePassword);
      if ('dialog' in $$props) $$invalidate(3, dialog = $$props.dialog);
    };
    if ($$props && "$$inject" in $$props) {
      $$self.$inject_state($$props.$$inject);
    }
    return [consolePassword, $dialog, handleSubmitPassword, dialog, input_input_handler, function ($$value) {
      binding_callbacks[$$value ? 'unshift' : 'push'](function () {
        $dialog = $$value;
        dialog.set($dialog);
      });
    }];
  }
  var Console = /*#__PURE__*/function (_SvelteComponentDev) {
    function Console(options) {
      var _this;
      _classCallCheck(this, Console);
      _this = _callSuper$o(this, Console, [options]);
      init(_this, options, instance$n, create_fragment$n, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "Console",
        options: options,
        id: create_fragment$n.name
      });
      return _this;
    }
    _inherits(Console, _SvelteComponentDev);
    return _createClass(Console);
  }(SvelteComponentDev);

  function _callSuper$p(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$p() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$p() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$p = function _isNativeReflectConstruct() { return !!t; })(); }
  var console_1$1 = globals.console;
  var file$n = "src/components/ConsoleWrapper.svelte";
  function create_fragment$o(ctx) {
    var div;
    var navbar;
    var t;
    var console;
    var current;
    navbar = new Navbar({
      props: {
        state: "play-menu"
      },
      $$inline: true
    });
    console = new Console({
      $$inline: true
    });
    var block = {
      c: function () {
        div = element("div");
        create_component(navbar.$$.fragment);
        t = space();
        create_component(console.$$.fragment);
        attr_dev(div, "class", "content-wrapper svelte-14j4zvq");
        add_location(div, file$n, 6, 0, 139);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div, anchor);
        mount_component(navbar, div, null);
        append_dev(div, t);
        mount_component(console, div, null);
        current = true;
      },
      p: noop$1,
      i: function (local) {
        if (current) return;
        transition_in(navbar.$$.fragment, local);
        transition_in(console.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(navbar.$$.fragment, local);
        transition_out(console.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div);
        destroy_component(navbar);
        destroy_component(console);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$o.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$o($$self, $$props) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('ConsoleWrapper', slots, []);
    window.scrollTo(0, 0);
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn("<ConsoleWrapper> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$capture_state = function () {
      return {
        Navbar: Navbar,
        Console: Console
      };
    };
    return [];
  }
  var ConsoleWrapper = /*#__PURE__*/function (_SvelteComponentDev) {
    function ConsoleWrapper(options) {
      var _this;
      _classCallCheck(this, ConsoleWrapper);
      _this = _callSuper$p(this, ConsoleWrapper, [options]);
      init(_this, options, instance$o, create_fragment$o, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "ConsoleWrapper",
        options: options,
        id: create_fragment$o.name
      });
      return _this;
    }
    _inherits(ConsoleWrapper, _SvelteComponentDev);
    return _createClass(ConsoleWrapper);
  }(SvelteComponentDev);

  function _callSuper$q(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$q() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$q() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$q = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$o = "src/components/content/Faq.svelte";
  function get_each_context$1(ctx, list, i) {
    var child_ctx = ctx.slice();
    child_ctx[0] = list[i];
    child_ctx[2] = i;
    return child_ctx;
  }

  // (15:12) {#each DATA.FAQ as faq, i}
  function create_each_block$1(ctx) {
    var div1;
    var input;
    var input_id_value;
    var t0;
    var label;
    var t1_value = ++ /*i*/ctx[2] + "";
    var t1;
    var t2;
    var t3_value = /*faq*/ctx[0].question + "";
    var t3;
    var t4;
    var t5;
    var div0;
    var p;
    var b;
    var t7;
    var html_tag;
    var raw_value = /*faq*/ctx[0].answer + "";
    var t8;
    var block = {
      c: function () {
        div1 = element("div");
        input = element("input");
        t0 = space();
        label = element("label");
        t1 = text(t1_value);
        t2 = text(".   ");
        t3 = text(t3_value);
        t4 = text(" ?");
        t5 = space();
        div0 = element("div");
        p = element("p");
        b = element("b");
        b.textContent = "Answer:";
        t7 = space();
        html_tag = new HtmlTag(false);
        t8 = space();
        attr_dev(input, "type", "checkbox");
        attr_dev(input, "class", "tab-input svelte-1ampdqp");
        attr_dev(input, "id", input_id_value = /*faq*/ctx[0].question);
        add_location(input, file$o, 16, 20, 432);
        attr_dev(label, "class", "tab-label svelte-1ampdqp");
        attr_dev(label, "for", "chck1");
        add_location(label, file$o, 17, 20, 514);
        add_location(b, file$o, 19, 27, 678);
        html_tag.a = null;
        add_location(p, file$o, 19, 24, 675);
        attr_dev(div0, "class", "tab-content svelte-1ampdqp");
        add_location(div0, file$o, 18, 20, 625);
        attr_dev(div1, "class", "tab svelte-1ampdqp");
        add_location(div1, file$o, 15, 16, 394);
      },
      m: function (target, anchor) {
        insert_dev(target, div1, anchor);
        append_dev(div1, input);
        append_dev(div1, t0);
        append_dev(div1, label);
        append_dev(label, t1);
        append_dev(label, t2);
        append_dev(label, t3);
        append_dev(label, t4);
        append_dev(div1, t5);
        append_dev(div1, div0);
        append_dev(div0, p);
        append_dev(p, b);
        append_dev(p, t7);
        html_tag.m(raw_value, p);
        append_dev(div1, t8);
      },
      p: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(div1);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_each_block$1.name,
      type: "each",
      source: "(15:12) {#each DATA.FAQ as faq, i}",
      ctx: ctx
    });
    return block;
  }
  function create_fragment$p(ctx) {
    var div4;
    var div1;
    var div0;
    var br0;
    var t0;
    var h4;
    var t2;
    var br1;
    var t3;
    var div3;
    var div2;
    var each_value = MOCK_DATA.FAQ;
    validate_each_argument(each_value);
    var each_blocks = [];
    for (var i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    }
    var block = {
      c: function () {
        div4 = element("div");
        div1 = element("div");
        div0 = element("div");
        br0 = element("br");
        t0 = space();
        h4 = element("h4");
        h4.textContent = "- Frequently Asked Questions -";
        t2 = space();
        br1 = element("br");
        t3 = space();
        div3 = element("div");
        div2 = element("div");
        for (var _i = 0; _i < each_blocks.length; _i += 1) {
          each_blocks[_i].c();
        }
        add_location(br0, file$o, 7, 12, 185);
        add_location(h4, file$o, 8, 12, 202);
        add_location(br1, file$o, 9, 12, 254);
        attr_dev(div0, "class", "sub-header svelte-1ampdqp");
        add_location(div0, file$o, 6, 8, 148);
        attr_dev(div1, "class", "pure-u-1 pure-u-md-1-1");
        add_location(div1, file$o, 5, 4, 103);
        attr_dev(div2, "class", "tabs svelte-1ampdqp");
        add_location(div2, file$o, 13, 8, 320);
        attr_dev(div3, "class", "pure-u-1");
        add_location(div3, file$o, 12, 4, 289);
        attr_dev(div4, "class", "pure-g container  svelte-1ampdqp");
        add_location(div4, file$o, 4, 0, 67);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div4, anchor);
        append_dev(div4, div1);
        append_dev(div1, div0);
        append_dev(div0, br0);
        append_dev(div0, t0);
        append_dev(div0, h4);
        append_dev(div0, t2);
        append_dev(div0, br1);
        append_dev(div4, t3);
        append_dev(div4, div3);
        append_dev(div3, div2);
        for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
          if (each_blocks[_i2]) {
            each_blocks[_i2].m(div2, null);
          }
        }
      },
      p: function (ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];
        if (dirty & /*DATA*/0) {
          each_value = MOCK_DATA.FAQ;
          validate_each_argument(each_value);
          var _i3;
          for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
            var child_ctx = get_each_context$1(ctx, each_value, _i3);
            if (each_blocks[_i3]) {
              each_blocks[_i3].p(child_ctx, dirty);
            } else {
              each_blocks[_i3] = create_each_block$1(child_ctx);
              each_blocks[_i3].c();
              each_blocks[_i3].m(div2, null);
            }
          }
          for (; _i3 < each_blocks.length; _i3 += 1) {
            each_blocks[_i3].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      i: noop$1,
      o: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(div4);
        destroy_each(each_blocks, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$p.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$p($$self, $$props) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('Faq', slots, []);
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Faq> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$capture_state = function () {
      return {
        DATA: MOCK_DATA
      };
    };
    return [];
  }
  var Faq = /*#__PURE__*/function (_SvelteComponentDev) {
    function Faq(options) {
      var _this;
      _classCallCheck(this, Faq);
      _this = _callSuper$q(this, Faq, [options]);
      init(_this, options, instance$p, create_fragment$p, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "Faq",
        options: options,
        id: create_fragment$p.name
      });
      return _this;
    }
    _inherits(Faq, _SvelteComponentDev);
    return _createClass(Faq);
  }(SvelteComponentDev);

  function _callSuper$r(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$r() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$r() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$r = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$p = "src/components/FaqWrapper.svelte";
  function create_fragment$q(ctx) {
    var div;
    var navbar;
    var t0;
    var faq;
    var t1;
    var footer;
    var current;
    navbar = new Navbar({
      props: {
        state: "faq-menu"
      },
      $$inline: true
    });
    faq = new Faq({
      $$inline: true
    });
    footer = new Footer({
      $$inline: true
    });
    var block = {
      c: function () {
        div = element("div");
        create_component(navbar.$$.fragment);
        t0 = space();
        create_component(faq.$$.fragment);
        t1 = space();
        create_component(footer.$$.fragment);
        attr_dev(div, "class", "content-wrapper svelte-ry95q1");
        add_location(div, file$p, 8, 0, 177);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div, anchor);
        mount_component(navbar, div, null);
        append_dev(div, t0);
        mount_component(faq, div, null);
        append_dev(div, t1);
        mount_component(footer, div, null);
        current = true;
      },
      p: noop$1,
      i: function (local) {
        if (current) return;
        transition_in(navbar.$$.fragment, local);
        transition_in(faq.$$.fragment, local);
        transition_in(footer.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(navbar.$$.fragment, local);
        transition_out(faq.$$.fragment, local);
        transition_out(footer.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div);
        destroy_component(navbar);
        destroy_component(faq);
        destroy_component(footer);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$q.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$q($$self, $$props) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('FaqWrapper', slots, []);
    window.scrollTo(0, 0);
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<FaqWrapper> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$capture_state = function () {
      return {
        Navbar: Navbar,
        Faq: Faq,
        Footer: Footer
      };
    };
    return [];
  }
  var FaqWrapper = /*#__PURE__*/function (_SvelteComponentDev) {
    function FaqWrapper(options) {
      var _this;
      _classCallCheck(this, FaqWrapper);
      _this = _callSuper$r(this, FaqWrapper, [options]);
      init(_this, options, instance$q, create_fragment$q, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "FaqWrapper",
        options: options,
        id: create_fragment$q.name
      });
      return _this;
    }
    _inherits(FaqWrapper, _SvelteComponentDev);
    return _createClass(FaqWrapper);
  }(SvelteComponentDev);

  function _callSuper$s(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$s() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$s() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$s = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$q = "src/components/content/Privacy.svelte";
  function create_fragment$r(ctx) {
    var div5;
    var div1;
    var div0;
    var br;
    var t0;
    var h4;
    var t2;
    var div4;
    var div3;
    var div2;
    var raw_value = marked_1(MOCK_DATA.PRIVACY_POLICY) + "";
    var block = {
      c: function () {
        div5 = element("div");
        div1 = element("div");
        div0 = element("div");
        br = element("br");
        t0 = space();
        h4 = element("h4");
        h4.textContent = "- Privacy Policy -";
        t2 = space();
        div4 = element("div");
        div3 = element("div");
        div2 = element("div");
        add_location(br, file$q, 11, 12, 360);
        add_location(h4, file$q, 12, 12, 377);
        attr_dev(div0, "class", "sub-header svelte-f5foc0");
        add_location(div0, file$q, 10, 8, 323);
        attr_dev(div1, "class", "pure-u-1 pure-u-md-1-1");
        add_location(div1, file$q, 9, 4, 278);
        attr_dev(div2, "class", "privacy-content svelte-f5foc0");
        add_location(div2, file$q, 17, 12, 518);
        attr_dev(div3, "class", "card center svelte-f5foc0");
        add_location(div3, file$q, 16, 8, 480);
        attr_dev(div4, "class", "pure-u-1 pure-u-md-1-1");
        add_location(div4, file$q, 15, 4, 435);
        attr_dev(div5, "class", "pure-g container  svelte-f5foc0");
        add_location(div5, file$q, 8, 0, 242);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div5, anchor);
        append_dev(div5, div1);
        append_dev(div1, div0);
        append_dev(div0, br);
        append_dev(div0, t0);
        append_dev(div0, h4);
        append_dev(div5, t2);
        append_dev(div5, div4);
        append_dev(div4, div3);
        append_dev(div3, div2);
        div2.innerHTML = raw_value;
      },
      p: noop$1,
      i: noop$1,
      o: noop$1,
      d: function (detaching) {
        if (detaching) detach_dev(div5);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$r.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$r($$self, $$props) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('Privacy', slots, []);
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Privacy> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$capture_state = function () {
      return {
        marked: marked_1,
        DATA: MOCK_DATA
      };
    };
    return [];
  }
  var Privacy = /*#__PURE__*/function (_SvelteComponentDev) {
    function Privacy(options) {
      var _this;
      _classCallCheck(this, Privacy);
      _this = _callSuper$s(this, Privacy, [options]);
      init(_this, options, instance$r, create_fragment$r, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "Privacy",
        options: options,
        id: create_fragment$r.name
      });
      return _this;
    }
    _inherits(Privacy, _SvelteComponentDev);
    return _createClass(Privacy);
  }(SvelteComponentDev);

  function _callSuper$t(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$t() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$t() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$t = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$r = "src/components/PrivacyWrapper.svelte";
  function create_fragment$s(ctx) {
    var div;
    var navbar;
    var t0;
    var privacy;
    var t1;
    var footer;
    var current;
    navbar = new Navbar({
      props: {
        state: "faq-menu"
      },
      $$inline: true
    });
    privacy = new Privacy({
      $$inline: true
    });
    footer = new Footer({
      $$inline: true
    });
    var block = {
      c: function () {
        div = element("div");
        create_component(navbar.$$.fragment);
        t0 = space();
        create_component(privacy.$$.fragment);
        t1 = space();
        create_component(footer.$$.fragment);
        attr_dev(div, "class", "content-wrapper svelte-ry95q1");
        add_location(div, file$r, 8, 0, 185);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div, anchor);
        mount_component(navbar, div, null);
        append_dev(div, t0);
        mount_component(privacy, div, null);
        append_dev(div, t1);
        mount_component(footer, div, null);
        current = true;
      },
      p: noop$1,
      i: function (local) {
        if (current) return;
        transition_in(navbar.$$.fragment, local);
        transition_in(privacy.$$.fragment, local);
        transition_in(footer.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(navbar.$$.fragment, local);
        transition_out(privacy.$$.fragment, local);
        transition_out(footer.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div);
        destroy_component(navbar);
        destroy_component(privacy);
        destroy_component(footer);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$s.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$s($$self, $$props) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('PrivacyWrapper', slots, []);
    window.scrollTo(0, 0);
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<PrivacyWrapper> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$capture_state = function () {
      return {
        Navbar: Navbar,
        Privacy: Privacy,
        Footer: Footer
      };
    };
    return [];
  }
  var PrivacyWrapper = /*#__PURE__*/function (_SvelteComponentDev) {
    function PrivacyWrapper(options) {
      var _this;
      _classCallCheck(this, PrivacyWrapper);
      _this = _callSuper$t(this, PrivacyWrapper, [options]);
      init(_this, options, instance$s, create_fragment$s, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "PrivacyWrapper",
        options: options,
        id: create_fragment$s.name
      });
      return _this;
    }
    _inherits(PrivacyWrapper, _SvelteComponentDev);
    return _createClass(PrivacyWrapper);
  }(SvelteComponentDev);

  function _callSuper$u(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$u() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$u() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$u = function _isNativeReflectConstruct() { return !!t; })(); }
  var file$s = "src/components/DocsWrapper.svelte";
  function create_fragment$t(ctx) {
    var div;
    var docs;
    var t;
    var footer;
    var current;
    docs = new Docs({
      props: {
        class: "content-wrapper"
      },
      $$inline: true
    });
    footer = new Footer({
      props: {
        shouldBG: "bg-yellow"
      },
      $$inline: true
    });
    var block = {
      c: function () {
        div = element("div");
        create_component(docs.$$.fragment);
        t = space();
        create_component(footer.$$.fragment);
        add_location(div, file$s, 5, 0, 109);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        insert_dev(target, div, anchor);
        mount_component(docs, div, null);
        append_dev(div, t);
        mount_component(footer, div, null);
        current = true;
      },
      p: noop$1,
      i: function (local) {
        if (current) return;
        transition_in(docs.$$.fragment, local);
        transition_in(footer.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(docs.$$.fragment, local);
        transition_out(footer.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        if (detaching) detach_dev(div);
        destroy_component(docs);
        destroy_component(footer);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$t.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$t($$self, $$props) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('DocsWrapper', slots, []);
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<DocsWrapper> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$capture_state = function () {
      return {
        Docs: Docs,
        Footer: Footer
      };
    };
    return [];
  }
  var DocsWrapper = /*#__PURE__*/function (_SvelteComponentDev) {
    function DocsWrapper(options) {
      var _this;
      _classCallCheck(this, DocsWrapper);
      _this = _callSuper$u(this, DocsWrapper, [options]);
      init(_this, options, instance$t, create_fragment$t, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "DocsWrapper",
        options: options,
        id: create_fragment$t.name
      });
      return _this;
    }
    _inherits(DocsWrapper, _SvelteComponentDev);
    return _createClass(DocsWrapper);
  }(SvelteComponentDev);

  var routes = {
    '/': Landing,
    '/docs/*': DocsWrapper,
    '/docs': DocsWrapper,
    '/play': PlayWrapper,
    '/console': ConsoleWrapper,
    '/faq': FaqWrapper,
    '/privacy': PrivacyWrapper,
    '*': NotFound
  };

  function _callSuper$v(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$v() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct$v() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$v = function _isNativeReflectConstruct() { return !!t; })(); }
  function create_fragment$u(ctx) {
    var router;
    var current;
    router = new Router({
      props: {
        routes: routes
      },
      $$inline: true
    });
    var block = {
      c: function () {
        create_component(router.$$.fragment);
      },
      l: function () {
        throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
      },
      m: function (target, anchor) {
        mount_component(router, target, anchor);
        current = true;
      },
      p: noop$1,
      i: function (local) {
        if (current) return;
        transition_in(router.$$.fragment, local);
        current = true;
      },
      o: function (local) {
        transition_out(router.$$.fragment, local);
        current = false;
      },
      d: function (detaching) {
        destroy_component(router, detaching);
      }
    };
    dispatch_dev("SvelteRegisterBlock", {
      block: block,
      id: create_fragment$u.name,
      type: "component",
      source: "",
      ctx: ctx
    });
    return block;
  }
  function instance$u($$self, $$props) {
    var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
    validate_slots('App', slots, []);
    var writable_props = [];
    Object.keys($$props).forEach(function (key) {
      if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<App> was created with unknown prop '".concat(key, "'"));
    });
    $$self.$capture_state = function () {
      return {
        Router: Router,
        routes: routes,
        scrollInto: scrollInto
      };
    };
    return [];
  }
  var App = /*#__PURE__*/function (_SvelteComponentDev) {
    function App(options) {
      var _this;
      _classCallCheck(this, App);
      _this = _callSuper$v(this, App, [options]);
      init(_this, options, instance$u, create_fragment$u, safe_not_equal, {});
      dispatch_dev("SvelteRegisterComponent", {
        component: _this,
        tagName: "App",
        options: options,
        id: create_fragment$u.name
      });
      return _this;
    }
    _inherits(App, _SvelteComponentDev);
    return _createClass(App);
  }(SvelteComponentDev);

  var app = new App({
    target: document.body,
    props: {
      name: 'Muhammad Iskandar Dzulqornain'
    }
  });

  return app;

}());
