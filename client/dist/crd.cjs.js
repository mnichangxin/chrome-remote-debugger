'use strict';

var io = require('socket.io-client');
var xhr = require('xhr');
var arrayFind = require('core-js/library/fn/array/find');
var Cookies = require('js-cookie');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var io__default = /*#__PURE__*/_interopDefaultLegacy(io);
var xhr__default = /*#__PURE__*/_interopDefaultLegacy(xhr);
var arrayFind__default = /*#__PURE__*/_interopDefaultLegacy(arrayFind);
var Cookies__default = /*#__PURE__*/_interopDefaultLegacy(Cookies);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var runtime = {exports: {}};

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (module) {
var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

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
  exports.wrap = wrap;

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
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
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
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
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
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
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

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

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

  exports.keys = function(object) {
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

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
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

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
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
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
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

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
}(runtime));

var regenerator = runtime.exports;

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var json2FormUrl = function json2FormUrl(jsonData) {
  var formUrl = '';
  Object.keys(jsonData).forEach(function (key, i) {
    if (i > 0) formUrl += '&';
    formUrl += "".concat(key, "=").concat(jsonData[key]);
  });
  return formUrl;
};
var getWsUrlOrigin = function getWsUrlOrigin(wsHost) {
  return wsHost.replace(/^((https?|ws):\/\/|\/\/)/, '');
};
var randomString = function randomString(e) {
  e = e || 32;
  var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var a = t.length;
  var n = '';

  for (var i = 0; i < e; i++) {
    n += t.charAt(Math.floor(Math.random() * a));
  }

  return n;
};

var _excluded = ["url", "method", "formType"];

var flatten = function flatten(arr) {
  return arr.reduce(function (acc, val) {
    return acc.concat(Array.isArray(val) ? flatten(val) : val);
  }, []);
};

var request = function request(_ref) {
  var url = _ref.url,
      method = _ref.method,
      formType = _ref.formType,
      options = _objectWithoutProperties(_ref, _excluded);

  return new Promise(function (resolve, reject) {
    if (formType) {
      options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      };
      options.data = json2FormUrl(options.data || options.body);
    }

    xhr__default['default'][method.toLowerCase() || 'get'](url || '', options, function (err, res) {
      if (err) return reject(err);
      if (res.statusCode < 200 || res.statusCode >= 400) return reject('Network error, please retry...');
      return resolve(JSON.parse(res.body));
    });
  });
};
var to = function to(promise, errExt) {
  return promise.then(function (data) {
    return [null, data];
  })["catch"](function (err) {
    if (errExt) Object.assign(err, errExt);
    return [err, undefined];
  });
};
var generatePid = function generatePid() {
  var cache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var currentScript = document.currentScript;
  var pid = randomString();

  if (cache) {
    var storageKey = "__crd_".concat(location.origin).concat(location.pathname);
    var storageValue = localStorage.getItem(storageKey);

    if (storageValue) {
      pid = storageValue;
    } else {
      localStorage.setItem(storageKey, pid);
    }
  }

  if (!cache && currentScript && currentScript.dataset.pid) {
    return currentScript.dataset.pid;
  }

  return pid;
};
var getAttributes$1 = function getAttributes(namedNodeMap) {
  if (!namedNodeMap) {
    return;
  }

  var attributes = namedNodeMap.toArray().map(function (attr) {
    return [attr.name, attr.value];
  });
  return flatten(attributes);
};
var getTitle = function getTitle() {
  var title = '';
  var titleTag = document.querySelector('title');

  if (titleTag) {
    title = titleTag.text;
  }

  return title;
};

var ObjectStore = /*#__PURE__*/function () {
  function ObjectStore() {
    _classCallCheck(this, ObjectStore);

    this.objects = [];
  }

  _createClass(ObjectStore, [{
    key: "get",
    value: function get(id) {
      var object = this.objects[id];

      if (!object) {
        return;
      }

      return object;
    }
  }, {
    key: "size",
    get: function get() {
      return this.objects.length;
    }
  }, {
    key: "getByObjectId",
    value: function getByObjectId(objectId) {
      var id = JSON.parse(objectId).id;
      return this.get(id);
    }
  }, {
    key: "getLastObject",
    value: function getLastObject() {
      return this.get(this.getLastScriptId());
    }
  }, {
    key: "getLastScriptId",
    value: function getLastScriptId() {
      return this.size - 1;
    }
  }, {
    key: "push",
    value: function push(object) {
      var id = this.size;
      this.objects.push(object);
      return id;
    }
  }]);

  return ObjectStore;
}();
var ObjectStore$1 = new ObjectStore();

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var SUB_TYPES = ['array', 'null', 'node', 'regexp', 'date', 'map', 'set', 'iterator', 'generator', 'error', 'promise', 'typedarray'];
/**
 * Facade for subtype property
 */

var PropertyObject = /*#__PURE__*/function () {
  function PropertyObject(object) {
    _classCallCheck(this, PropertyObject);

    var subtype = PropertyObject.getSubType(object);

    var type = _typeof(object);

    if (type.match(/^(number|string|undefined|boolean)$/) || subtype === 'null') {
      return new PrimitiveObject(object, subtype);
    }

    return PropertyObject.createPropertyInstance(object, subtype);
  }

  _createClass(PropertyObject, null, [{
    key: "createPropertyInstance",
    value: function createPropertyInstance(object, subtype) {
      if (subtype === 'array') return new ArrayObject(object, subtype);
      if (subtype === 'null') return new PrimitiveObject(object, subtype);
      if (subtype === 'undefined') return new PrimitiveObject(object, subtype);
      if (subtype === 'node') return new NodeObject(object, subtype);
      if (subtype === 'regexp') return new CompositeObject(object, subtype);
      if (subtype === 'date') return new CompositeObject(object, subtype);
      if (subtype === 'map') return new CompositeObject(object, subtype);
      if (subtype === 'set') return new CompositeObject(object, subtype);
      if (subtype === 'iterator') return new CompositeObject(object, subtype);
      if (subtype === 'generator') return new CompositeObject(object, subtype);
      if (subtype === 'error') return new ErrorObject(object, subtype);
      if (subtype === 'promise') return new PromiseObject(object, subtype);
      if (subtype === 'typedarray') return new TypedarrayObject(object, subtype);
      return new CompositeObject(object);
    }
    /**
     * returns subtype of object
     */

  }, {
    key: "getSubType",
    value: function getSubType(object) {
      /**
       * null
       */
      if (object === null) {
        return 'null';
      }
      /**
       * undefined
       */


      if (typeof object === 'undefined') {
        return 'undefined';
      }
      /**
       * objects can have cases where constructor is null
       */


      if (!object.constructor) {
        return 'map';
      }

      var constructorName = object.constructor.name;
      /**
       * error
       */

      if (object instanceof Error || constructorName.match(/Error$/)) {
        return 'error';
      }
      /**
       * node
       */


      if (typeof object.nodeType === 'number') {
        return 'node';
      }
      /**
       * iterator
       */


      if (object.iterator) {
        return 'iterator';
      }
      /**
       * generator
       */


      if (constructorName === 'GeneratorFunction') {
        return 'generator';
      }
      /**
       * promise
       */


      if (object instanceof Promise) {
        return 'promise';
      }
      /**
       * array
       */


      if (Array.isArray(object) || typeof object.length === 'number' && object.constructor.name !== 'object') {
        return 'array';
      }
      /**
       * typedarray
       */


      if (constructorName.match(/^Float(\d+)Array$/)) {
        return 'typedarray';
      }
      /**
       * constructorName check
       */


      if (SUB_TYPES.indexOf(constructorName.toLowerCase()) > -1) {
        return constructorName.toLowerCase;
      }
    }
  }]);

  return PropertyObject;
}();

var PrimitiveObject = /*#__PURE__*/function () {
  function PrimitiveObject(object, subtype) {
    _classCallCheck(this, PrimitiveObject);

    _defineProperty(this, "isPrimitive", true);

    this.object = object;
    this.subtype = subtype || this.subtype;
    this.type = _typeof(object);
    this.value = this.object;
    this.className = this.object ? this.object.constructor.name : undefined;
  }

  _createClass(PrimitiveObject, [{
    key: "get",
    value: function get() {
      var value = this.value,
          subtype = this.subtype,
          type = this.type,
          description = this.description;
      return {
        value: value,
        subtype: subtype,
        type: type,
        description: description
      };
    }
    /**
     * for primitives the origin is the actual value except for 'null' and 'undefined'
     */

  }, {
    key: "description",
    get: function get() {
      return this.object ? this.value.toString() : this.subtype;
    }
  }]);

  return PrimitiveObject;
}();

var CompositeObject = /*#__PURE__*/function (_PrimitiveObject) {
  _inherits(CompositeObject, _PrimitiveObject);

  var _super = _createSuper(CompositeObject);

  function CompositeObject(object, subtype) {
    var _this;

    _classCallCheck(this, CompositeObject);

    _this = _super.call(this, object, subtype);

    _defineProperty(_assertThisInitialized(_this), "isPrimitive", false);

    var id = ObjectStore$1.push(_this.object);
    _this.objectId = JSON.stringify({
      injectedScriptId: 1,
      id: id
    });
    return _this;
  }

  _createClass(CompositeObject, [{
    key: "get",
    value: function get() {
      var className = this.className,
          description = this.description,
          objectId = this.objectId,
          subtype = this.subtype,
          type = this.type;
      return {
        className: className,
        description: description,
        objectId: objectId,
        subtype: subtype,
        type: type
      };
    }
  }, {
    key: "description",
    get: function get() {
      return this.object.constructor.name || this.object.toString();
    }
  }]);

  return CompositeObject;
}(PrimitiveObject);

var ArrayObject = /*#__PURE__*/function (_CompositeObject) {
  _inherits(ArrayObject, _CompositeObject);

  var _super2 = _createSuper(ArrayObject);

  function ArrayObject() {
    _classCallCheck(this, ArrayObject);

    return _super2.apply(this, arguments);
  }

  _createClass(ArrayObject, [{
    key: "description",
    get: function get() {
      return "".concat(this.className, "(").concat(this.object.length, ")");
    }
  }]);

  return ArrayObject;
}(CompositeObject);

var NodeObject = /*#__PURE__*/function (_CompositeObject2) {
  _inherits(NodeObject, _CompositeObject2);

  var _super3 = _createSuper(NodeObject);

  function NodeObject(object, subtype) {
    var _this2;

    _classCallCheck(this, NodeObject);

    _this2 = _super3.call(this, object, subtype);
    _this2.value = _this2.getValue();
    _this2.className = _this2.object.constructor.name;
    return _this2;
  }

  _createClass(NodeObject, [{
    key: "description",
    get: function get() {
      return this.object.nodeName.toLowerCase();
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var value = this.object.nodeName.toLowerCase();

      if (this.object.id) {
        value += "#".concat(this.object.id);
      }

      if (this.object.className) {
        value += ".".concat(this.object.className.replace(' ', '.'));
      }

      return value;
    }
  }]);

  return NodeObject;
}(CompositeObject);

var ErrorObject = /*#__PURE__*/function (_CompositeObject3) {
  _inherits(ErrorObject, _CompositeObject3);

  var _super4 = _createSuper(ErrorObject);

  function ErrorObject() {
    var _this3;

    _classCallCheck(this, ErrorObject);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this3 = _super4.call.apply(_super4, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this3), "className", 'Error');

    return _this3;
  }

  _createClass(ErrorObject, [{
    key: "description",
    get: function get() {
      return this.object.stack;
    }
  }]);

  return ErrorObject;
}(CompositeObject);

var PromiseObject = /*#__PURE__*/function (_CompositeObject4) {
  _inherits(PromiseObject, _CompositeObject4);

  var _super5 = _createSuper(PromiseObject);

  function PromiseObject() {
    var _this4;

    _classCallCheck(this, PromiseObject);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this4 = _super5.call.apply(_super5, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this4), "className", 'Promise');

    _defineProperty(_assertThisInitialized(_this4), "description", 'Promise');

    return _this4;
  }

  return PromiseObject;
}(CompositeObject);

var TypedarrayObject = /*#__PURE__*/function (_CompositeObject5) {
  _inherits(TypedarrayObject, _CompositeObject5);

  var _super6 = _createSuper(TypedarrayObject);

  function TypedarrayObject() {
    var _this5;

    _classCallCheck(this, TypedarrayObject);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this5 = _super6.call.apply(_super6, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this5), "className", 'TypedarrayObject');

    _defineProperty(_assertThisInitialized(_this5), "description", 'TypedarrayObject');

    return _this5;
  }

  return TypedarrayObject;
}(CompositeObject);

/**
 * parses through root children to create Node objects
 * @param  {NodeElement} root   element to start with
 * @param  {number}      depth  number of child depth to parse through
 * @param  {Object}      pierce unknown
 * @return {Node}               root element with children elements
 */
function getDomNodes(root, depth, pierce) {
  for (var i = 0; i < root.node.childNodes.length; ++i) {
    var node = root.node.childNodes[i];
    /**
     * ignore line break nodes
     */

    if (node.nodeName === '#text' && node.nodeValue.trim() === '') {
      continue;
    }
    /**
     * Check if node id is available and if not assign new node ids to them.
     * This can happen if a node was replaced or a text node changed between we
     * initially assigned a node id via `setNodeIds` and we created a node object
     * via `getDomNodes` (which have listeners for these changes)
     */


    if (typeof node._nodeId !== 'number') {
      setNodeIds(node);
    }

    var child = root.addChild(node);

    if (depth && child && node.childNodes.length) {
      getDomNodes(child, depth - 1);
      continue;
    }
    /**
     * get child node if it is only a text node
     */


    if (child && node.childNodes.length === 1 && node.childNodes[0].nodeName === '#text') {
      getDomNodes(child, 0);
    }
  }
}
var nodes$1 = 0;
function setNodeIds(root) {
  if (!root || root._nodeId) {
    return;
  }

  root._nodeId = nodes$1++;

  for (var i = 0; i < root.childNodes.length; ++i) {
    setNodeIds(root.childNodes[i]);
  }
}
/**
 * parses rgba color object to css string
 * @param  {Object} color  object with r, g, b and a property
 * @return {String}        css value for e.g. background-color property
 */

function getColorFormatted(color) {
  if (!color) {
    return "rgba(0, 0, 0, 0)";
  }

  return "rgba(".concat(color.r, ",").concat(color.g, ",").concat(color.b, ",").concat(color.a, ")");
}

var enabled = false;
var name$1 = 'DOM';
var HIGHLIGHT_NODE_ID = '_highlightedNode';
var inspectedNodes = [];
/**
 * Returns the root DOM node (and optionally the subtree) to the caller.
 *
 * @param  {integer} depth   The maximum depth at which children should be retrieved, defaults to 1.
 *                           Use -1 for the entire subtree or provide an integer larger than 0.
 *                           (experimental)
 * @param  {boolean} pierce  Whether or not iframes and shadow roots should be traversed when returning
 *                           the subtree (default is false). (experimental)
 * @return {root}            Resulting node.
 */

function getDocument(_ref) {
  var _ref$depth = _ref.depth,
      depth = _ref$depth === void 0 ? 1 : _ref$depth;
      _ref.pierce;
  var root = new Node(document);
  getDomNodes(root, depth);
  return {
    root: root
  };
}
/**
 * Requests that children of the node with given id are returned to the caller in form of setChildNodes
 * events where not only immediate children are retrieved, but all children down to the specified depth.
 *
 * @param  {NodeId} nodeId   Id of the node to get children for.
 * @param  {integer} depth   The maximum depth at which children should be retrieved, defaults to 1.
 *                           Use -1 for the entire subtree or provide an integer larger than 0.
 *                           (experimental)
 * @param  {boolean} pierce  Whether or not iframes and shadow roots should be traversed when returning
 *                           the subtree (default is false). (experimental)
 */

function requestChildNodes(_ref2) {
  var nodeId = _ref2.nodeId,
      _ref2$depth = _ref2.depth,
      depth = _ref2$depth === void 0 ? 1 : _ref2$depth;
      _ref2.pierce;
  var root = Node.getNode(nodeId);

  if (!root) {
    throw new Error("Couldn't find node with nodeId ".concat(nodeId));
  }

  getDomNodes(root, depth);
  this.execute('DOM.setChildNodes', {
    parentId: nodeId,
    nodes: root.children
  });
  return {};
}
/**
 * Returns node's HTML markup.
 * @param  {NodeId} nodeId  Id of the node to get markup for.
 * @return {String}         Outer HTML markup.
 */

function getOuterHTML(_ref3) {
  var nodeId = _ref3.nodeId;
  var node = Node.getNode(nodeId);

  if (!node) {
    return {};
  }

  var outerHTML = node.node.outerHTML;
  return {
    outerHTML: outerHTML
  };
}
/**
 * Sets node HTML markup, returns new node id.
 * @param {NodeId} nodeId    Id of the node to set markup for.
 * @param {String} outerHTML Outer HTML markup to set.
 */

function setOuterHTML(_ref4) {
  var nodeId = _ref4.nodeId,
      outerHTML = _ref4.outerHTML;
  var root = Node.getNode(nodeId);

  if (!root) {
    return {};
  }

  var elem = root.node;
  var dp = new DOMParser();
  var dom = dp.parseFromString("<div>".concat(outerHTML, "</div>"), 'text/xml');
  /**
   * remove origin node
   */

  this.execute('DOM.childNodeRemoved', {
    nodeId: root.nodeId,
    parentNodeId: elem.parentNode._nodeId
  });
  var lastNodeId = elem.previousElementSibling ? elem.previousElementSibling._nodeId : elem.parentNode._nodeId;

  for (var i = 0; i < dom.documentElement.childNodes.length; i++) {
    var el = dom.documentElement.childNodes[i];
    setNodeIds(el);
    var node = new Node(el);
    elem.parentNode.insertBefore(el.cloneNode(), elem);
    this.execute('DOM.childNodeInserted', {
      node: {
        attributes: node.getFlattenedAttributes(),
        childNodeCount: node.childNodeCount,
        localName: node.localName,
        nodeId: node.nodeId,
        nodeName: node.nodeName,
        nodeType: node.nodeType,
        nodeValue: node.nodeValue
      },
      parentNodeId: elem.parentNode._nodeId,
      previousNodeId: lastNodeId
    });
    lastNodeId = el._nodeId;
  }

  elem.remove();
  return {};
}
/**
 * Removes attribute with given name from an element with given id.
 * @param  {nodeId} nodeId Id of the element to remove attribute from.
 * @param  {String} name   Name of the attribute to remove.
 */

function removeAttribute(_ref5) {
  var nodeId = _ref5.nodeId,
      name = _ref5.name;
  var node = Node.getNode(nodeId);

  if (!node) {
    return {};
  }

  var elem = node.node;
  elem.removeAttribute(name);
  return {};
}
/**
 * Removes node with given id.
 * @param  {NodeId} nodeId  Id of the node to remove.
 */

function removeNode(_ref6) {
  var nodeId = _ref6.nodeId;
  var node = Node.getNode(nodeId);

  if (!node) {
    return {};
  }

  var elem = node.node;
  elem.remove();
  return {};
}
/**
 * Hides DOM node highlight.
 */

function hideHighlight() {
  var highlightNode = document.getElementById(HIGHLIGHT_NODE_ID);

  if (highlightNode) {
    highlightNode.remove();
  }

  return {};
}
/**
 * Highlights DOM node with given id or with the given JavaScript object wrapper. Either nodeId or objectId must be specified.
 *
 * @param  {highlightConfig}        highlightConfig  A descriptor for the highlight appearance.
 * @param  {NodeId}                 nodeId           Identifier of the node to highlight.
 */

function highlightNode(_ref7) {
  var highlightConfig = _ref7.highlightConfig,
      nodeId = _ref7.nodeId,
      objectId = _ref7.objectId;
  var node;

  if (typeof nodeId === 'number') {
    /**
     * get node by node id
     */
    node = Node.getNode(nodeId).node;
  } else if (typeof objectId === 'string') {
    /**
     * get node from object store
     */
    node = ObjectStore$1.getByObjectId(objectId);
  } else {
    throw new Error('Neither nodeId nor objectId was given to get the node');
  }
  /**
   * remove highlighted node if existing
   */


  hideHighlight();
  /**
   * check if node is visible
   */

  if (!(node.offsetWidth || node.offsetHeight)) {
    return {};
  }
  /**
   * highlight container node
   */


  var container = document.createElement('div');
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.position = 'absolute';
  container.style.left = "0px";
  container.style.top = "0px";
  container.id = HIGHLIGHT_NODE_ID;
  container.setAttribute('data-origin', 'debugger');
  document.body.appendChild(container);
  var computedStyle = window.getComputedStyle(node);
  var rect = node.getBoundingClientRect();
  var contentColor = highlightConfig.contentColor,
      paddingColor = highlightConfig.paddingColor,
      marginColor = highlightConfig.marginColor;
  /**
   * node to highlight element
   */

  var elemNode = document.createElement('div');
  elemNode.style.backgroundColor = getColorFormatted(contentColor);
  elemNode.style.width = "".concat(rect.width - parseInt(computedStyle.paddingRight, 10) - parseInt(computedStyle.paddingLeft, 10), "px");
  elemNode.style.height = "".concat(rect.height - parseInt(computedStyle.paddingTop, 10) - parseInt(computedStyle.paddingBottom, 10), "px");
  /**
   * node to highlight padding
   */

  var paddingNode = document.createElement('div');
  paddingNode.style.borderColor = getColorFormatted(paddingColor);
  paddingNode.style.borderStyle = 'solid';
  paddingNode.style.borderWidth = "".concat(computedStyle.paddingTop, " ").concat(computedStyle.paddingRight, " ").concat(computedStyle.paddingLeft, " ").concat(computedStyle.paddingBottom);
  paddingNode.style.position = 'absolute';
  paddingNode.style.left = "".concat(rect.left + window.scrollX, "px");
  paddingNode.style.top = "".concat(rect.top + window.scrollY, "px");
  paddingNode.style.zIndex = 10001;
  paddingNode.appendChild(elemNode);
  container.appendChild(paddingNode);
  /**
   * node to highlight margin
   */

  var marginNode = document.createElement('div');
  var paddingNodeRect = paddingNode.getBoundingClientRect();
  marginNode.style.borderColor = getColorFormatted(marginColor);
  marginNode.style.backgroundColor = getColorFormatted(marginColor);
  marginNode.style.borderStyle = 'solid';
  marginNode.style.borderWidth = "".concat(computedStyle.marginTop, " ").concat(computedStyle.marginRight, " ").concat(computedStyle.marginLeft, " ").concat(computedStyle.marginBottom);
  marginNode.style.width = "".concat(paddingNodeRect.width, "px");
  marginNode.style.height = "".concat(paddingNodeRect.height, "px");
  /**
   * set position styles
   */

  marginNode.style.position = 'absolute';
  marginNode.style.left = "".concat(rect.left - parseInt(computedStyle.marginLeft, 10) + window.scrollX, "px");
  marginNode.style.top = "".concat(rect.top - parseInt(computedStyle.marginTop, 10) + window.scrollY, "px");
  marginNode.style.zIndex = 10000;
  container.appendChild(marginNode);
  return {};
}
/**
 * Sets node value for a node with given id.
 *
 * @param {NodeId} nodeId  Id of the node to set value for.
 * @param {String} value   New node's value.
 */

function setNodeValue(_ref8) {
  var nodeId = _ref8.nodeId,
      value = _ref8.value;
  var root = Node.getNode(nodeId);
  /**
   * set characterDataModified flag so the node object doesn't send update event
   * to the frontend again
   */

  root.node._characterDataModified = true;
  root.node.nodeValue = value;
  this.execute('DOM.characterDataModified', {
    nodeId: nodeId,
    value: value
  });
  return {};
}
/**
 * Enables console to refer to the node with given id via $x (see Command Line API for more
 * details $x functions).
 * ToDo: NYI
 *
 * @param  {NodeId} nodeId   DOM node id to be accessible by means of $x command line API.
 */

function setInspectedNode(_ref9) {
  var nodeId = _ref9.nodeId;
  var root = Node.getNode(nodeId);

  if (!root) {
    return;
  }

  inspectedNodes.unshift(root.node);

  if (inspectedNodes.length > 4) {
    inspectedNodes.pop();
  }
  /**
   * for some reasons Webpack can't deal with having $ (surrounded by single quotes) in
   * interpreted code that is why we ignore eslint in that line
   */


  inspectedNodes.forEach(function (elem, i) {
    return window["$" + i] = elem;
  }); // eslint-disable-line quotes

  return {};
}
/**
 * Sets attributes on element with given id. This method is useful when user edits some existing attribute
 * value and types in several attribute name/value pairs.
 *
 * @param {NodeId} nodeId  Id of the element to set attributes for.
 * @param {String} name    Text with a number of attributes. Will parse this text using HTML parser.
 * @param {String} text    Attribute name to replace with new attributes derived from text in case text
 *                         parsed successfully.
 */

function setAttributesAsText(_ref10) {
  var nodeId = _ref10.nodeId,
      name = _ref10.name,
      text = _ref10.text;
  var root = Node.getNode(nodeId);

  if (!root) {
    throw new Error("Couldn't find node with nodeId ".concat(nodeId));
  }
  /**
   * create a fake element and apply the attribute string to a sub element
   * so that the browser parses it and we can use the JS native API to
   * access their values
   */


  var fakeElem = document.createElement('div');
  var nodeName = root.node.nodeName;
  fakeElem.innerHTML = "<".concat(nodeName, " ").concat(text, " />");

  if (name.trim()) {
    root.node.removeAttribute(name);
  }

  fakeElem.childNodes[0].attributes.toArray().forEach(function (attr) {
    return root.node.setAttribute(attr.name, attr.value);
  });
  return {};
}
/**
 * Marks last undoable state. (EXPERIMENTAL)
 */

function markUndoableState() {
  return {};
}
/**
 * Requests that the node is sent to the caller given the JavaScript node object reference.
 * All nodes that form the path from the node to the root are also sent to the client as a
 * series of setChildNodes notifications.
 * @return {Runtime.RemoteObjectId}  object id where node is stored
 */

function requestNode(_ref11) {
  var objectId = _ref11.objectId;
  var node = ObjectStore$1.getByObjectId(objectId);
  var root = new Node(node);
  this.execute('DOM.setChildNodes', {
    parentId: root.nodeId,
    nodes: root.children
  });
  return {
    nodeId: root.nodeId
  };
}
/**
 * Resolves JavaScript node object for given node id.
 *
 * @param {NodeId} nodeId          Id of the node to resolve.
 * @param {String} objectGroup     Symbolic group name that can be used to release multiple objects.
 * @return {Runtime.RemoteObject}  JavaScript object wrapper for given node.
 */

function resolveNode(_ref12) {
  var nodeId = _ref12.nodeId;
  var root = Node.getNode(nodeId);

  if (!root) {
    throw new Error("Couldn't find node with nodeId ".concat(nodeId));
  }

  var nodeProperty = new PropertyObject(root.node);
  var className = nodeProperty.className,
      description = nodeProperty.description,
      objectId = nodeProperty.objectId,
      subtype = nodeProperty.subtype,
      type = nodeProperty.type;
  return {
    object: {
      className: className,
      description: description,
      objectId: objectId,
      subtype: subtype,
      type: type
    }
  };
}
/**
 * Returns attributes for the specified node.
 * @param  {nodeId}   nodeId  Id of the node to retrieve attibutes for.
 * @return {String[]}         An interleaved array of node attribute names and values.
 */

function getAttributes(_ref13) {
  var nodeId = _ref13.nodeId;
  var root = Node.getNode(nodeId);

  if (!root) {
    throw new Error("Couldn't find node with nodeId ".concat(nodeId));
  }

  return {
    attributes: getAttributes$1(root.node.attributes)
  };
}
/**
 * Events
 */

/**
 * Fired when Document has been totally updated. Node ids are no longer valid.
 */

function documentUpdated() {
  this.execute('DOM.documentUpdated', {});
}

var DOM = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getDocument: getDocument,
  requestChildNodes: requestChildNodes,
  getOuterHTML: getOuterHTML,
  setOuterHTML: setOuterHTML,
  removeAttribute: removeAttribute,
  removeNode: removeNode,
  hideHighlight: hideHighlight,
  highlightNode: highlightNode,
  setNodeValue: setNodeValue,
  setInspectedNode: setInspectedNode,
  setAttributesAsText: setAttributesAsText,
  markUndoableState: markUndoableState,
  requestNode: requestNode,
  resolveNode: resolveNode,
  getAttributes: getAttributes,
  documentUpdated: documentUpdated,
  enabled: enabled,
  name: name$1,
  HIGHLIGHT_NODE_ID: HIGHLIGHT_NODE_ID
});

var nodeCount = 0;
var nodes = {};
var elements = {};

var Node = /*#__PURE__*/function () {
  function Node(node) {
    _classCallCheck(this, Node);

    _defineProperty(this, "nodeId", nodeCount++);

    this.nodeId = node._nodeId;
    this.childNodeCount = node.childNodes.length;
    this.localName = node.localName || '';
    this.nodeName = node.nodeName;
    this.nodeType = node.nodeType;
    this.nodeValue = node.nodeValue || '';

    if (node.attributes) {
      this.attributes = Array.prototype.slice.call(node.attributes).map(function (item) {
        return [item.nodeName, item.nodeValue];
      }).reduce(function (list, item) {
        return list.concat(item);
      }, []);
    }

    if (this.isDocumentNode()) {
      this.documentURL = node.documentURI;
      this.xmlVersion = node.xmlVersion;
      this.baseURL = node.baseURI;
    }

    if (this.isDoctypeDeclaration()) {
      this.publicId = node.publicId;
      this.systemId = node.systemId;
    }
    /**
     * register mutation observer if available
     */


    if (typeof MutationObserver === 'function') {
      this.registerMutationObserver(node);
    }

    nodes[this.nodeId] = this;
    elements[this.nodeId] = node;
  }

  _createClass(Node, [{
    key: "handleAttributeChange",
    value: function handleAttributeChange(mutation) {
      var attribute = mutation.target.attributes.getNamedItem(mutation.attributeName);
      var attributeValue = (attribute || {}).value;
      /**
       * attribute modified
       */

      if (mutation.oldValue && attributeValue) {
        return window.remoteDebugger.execute('DOM.attributeModified', {
          nodeId: this.nodeId,
          name: mutation.attributeName,
          value: attributeValue
        });
      }
      /**
       * attribute removed
       */


      if (mutation.oldValue && !attributeValue) {
        window.remoteDebugger.execute('DOM.attributeRemoved', {
          nodeId: this.nodeId,
          name: mutation.attributeName
        });
      }
      /**
       * attribute added
       */


      if (!mutation.oldValue) {
        window.remoteDebugger.execute('DOM.attributeModified', {
          nodeId: this.nodeId,
          name: mutation.attributeName,
          value: attributeValue
        });
      }
    }
  }, {
    key: "handleCharacterDataMutations",
    value: function handleCharacterDataMutations(mutation) {
      /**
       * update text node value
       */
      this.nodeValue = mutation.target.nodeValue || '';
      /**
       * don't resend update event if change was triggered by frontend
       */

      if (mutation.target._characterDataModified) {
        /**
         * enable update for future changes scripts
         */
        mutation.target._characterDataModified = false;
        return;
      }
      /**
       * don't send event if text hasn't changed
       */


      if (mutation.oldValue === mutation.target.nodeValue) {
        return;
      }
      /**
       * remove node in devtools frontend
       */


      window.remoteDebugger.execute('DOM.childNodeRemoved', {
        nodeId: this.nodeId,
        parentNodeId: this.parentId
      });
      /**
       * add node in devtools frontend with new value
       */

      window.remoteDebugger.execute('DOM.childNodeInserted', {
        node: {
          localName: this.localName,
          nodeId: this.nodeId,
          nodeName: this.nodeName,
          nodeType: this.nodeType,
          nodeValue: this.nodeValue
        },
        parentNodeId: this.parentId,
        previousNodeId: 0
      });
    }
  }, {
    key: "handleChildListMutations",
    value: function handleChildListMutations(mutation) {
      if (mutation.addedNodes.length) {
        for (var i = 0; i < mutation.addedNodes.length; ++i) {
          /**
           * prevent highlighted node from being displayed in the devtools
           */
          if (mutation.addedNodes[i].id === HIGHLIGHT_NODE_ID) {
            continue;
          }

          setNodeIds(mutation.addedNodes[i]);
          var node = new Node(mutation.addedNodes[i]);
          /**
           * in case node is the first child there is no previous element sibling
           * so use the parent node
           */

          var previousNode = node.node.previousElementSibling;

          if (!previousNode) {
            previousNode = node.node.parentElement;
          }

          window.remoteDebugger.execute('DOM.childNodeInserted', {
            node: {
              attributes: node.getFlattenedAttributes(),
              childNodeCount: node.childNodeCount,
              localName: node.localName,
              nodeId: node.nodeId,
              nodeName: node.nodeName,
              nodeType: node.nodeType,
              nodeValue: node.nodeValue
            },
            parentNodeId: this.nodeId,
            previousNodeId: previousNode._nodeId
          });
        }
      }

      if (mutation.removedNodes.length) {
        for (var _i = 0; _i < mutation.removedNodes.length; ++_i) {
          /**
           * event not need to be thrown for highlighted node
           */
          if (mutation.removedNodes[_i].id === HIGHLIGHT_NODE_ID) {
            continue;
          }

          var _node = mutation.removedNodes[_i];
          window.remoteDebugger.execute('DOM.childNodeRemoved', {
            nodeId: _node._nodeId,
            parentNodeId: this.nodeId
          });
        }
      }
    }
  }, {
    key: "isDocumentNode",
    value: function isDocumentNode() {
      return this.nodeName === '#document';
    }
  }, {
    key: "isDoctypeDeclaration",
    value: function isDoctypeDeclaration() {
      return this.nodeName === 'html';
    }
  }, {
    key: "getFlattenedAttributes",
    value: function getFlattenedAttributes() {
      return getAttributes$1(this.node.attributes);
    }
  }, {
    key: "addChild",
    value: function addChild(node) {
      if (!this.children) {
        this.children = [];
      }
      /**
       * check if node is injected script tag
       */


      if (node.nodeName.toLowerCase() === 'script' && node.getAttribute('data-origin') === 'debugger') {
        return;
      }

      var child = new Node(node);
      child.parentId = this.nodeId;
      this.children.push(child);
      return child;
    }
  }, {
    key: "registerMutationObserver",
    value: function registerMutationObserver(node) {
      var _this = this;

      var observer = new MutationObserver(function (mutations) {
        var attributeMutations = mutations.filter(function (m) {
          return m.type === 'attributes';
        });
        var childListMutations = mutations.filter(function (m) {
          return m.type === 'childList';
        });
        var characterDataMutations = mutations.filter(function (m) {
          return m.type === 'characterData';
        });
        attributeMutations.forEach(_this.handleAttributeChange.bind(_this));
        childListMutations.forEach(_this.handleChildListMutations.bind(_this));
        characterDataMutations.forEach(_this.handleCharacterDataMutations.bind(_this));
      });
      return observer.observe(node, {
        attributes: true,
        attributeOldValue: true,
        childList: true,
        characterData: true,
        characterDataOldValue: true
      });
    }
  }, {
    key: "node",
    get: function get() {
      return elements[this.nodeId];
    }
  }], [{
    key: "getNode",
    value: function getNode(nodeId) {
      return nodes[nodeId];
    }
  }]);

  return Node;
}();

/**
 * Returns the computed style for a DOM node identified by nodeId.
 *
 * @param {NodeId} nodeId                   Id of the element to get computed styles from
 * @return {[CSSComputedStyleProperty]}     Computed style for the specified DOM node.
 */

function getComputedStyleForNode(_ref) {
  var nodeId = _ref.nodeId;
  var root = Node.getNode(nodeId);

  if (!root) {
    throw new Error("Couldn't find node with nodeId ".concat(nodeId));
  }

  var computedStyle = [];
  var computedStyleOrig = window.getComputedStyle(root.node);

  for (var i = 0; i < computedStyleOrig.length; ++i) {
    computedStyle.push({
      name: computedStyleOrig[i],
      value: computedStyleOrig[computedStyleOrig[i]]
    });
  }

  return {
    computedStyle: computedStyle
  };
}
/**
 * Requests information about platform fonts which we used to render child TextNodes in the given node.
 */

function getPlatformFontsForNode(_ref2) {
  _ref2.nodeId;

  /**
   * this is not traceable therefor return always a standard font
   */
  return {
    familyName: 'Arial',
    isCustomFont: false,
    glyphCount: 0
  };
}
/**
 * Returns requested styles for a DOM node identified by nodeId.
 *
 * @param  {nodeId} nodeId  desired node id
 */

function getMatchedStylesForNode(_ref3) {
  var _this = this;

  var nodeId = _ref3.nodeId;

  var _Node$getNode = Node.getNode(nodeId),
      node = _Node$getNode.node;

  var ruleList = window.getMatchedCSSRules(node);
  var matchedCSSRules = [].slice.call(ruleList || []).map(function (rule) {
    return {
      matchingSelectors: [0],
      rule: _this.cssStore.getRuleByCssText(rule.selectorText, rule.cssText)
    };
  });
  return {
    matchedCSSRules: matchedCSSRules,
    cssKeyframesRules: [],
    pseudoElements: [],
    inherited: [],
    inlineStyle: getInlineStylesForNode.call(this, {
      nodeId: nodeId
    }).inlineStyle
  };
}
/**
 * Returns the styles defined inline (explicitly in the "style" attribute and implicitly, using
 * DOM attributes) for a DOM node identified by nodeId.
 *
 * @param  {nodeId} nodeId  desired node id
 */

function getInlineStylesForNode(_ref4) {
  var nodeId = _ref4.nodeId;

  var _Node$getNode2 = Node.getNode(nodeId),
      node = _Node$getNode2.node;

  var cssStyle;

  if (node._styleSheetId) {
    cssStyle = this.cssStore.get(node._styleSheetId);
  } else {
    cssStyle = this.cssStore.addInlineStyleSheet(node);
  }

  return {
    inlineStyle: cssStyle.rules.length ? cssStyle.rules[0].style : {}
  };
}
/**
 * Returns the current textual content and the URL for a stylesheet.
 * @param  {styleSheetId} styleSheetId  id of stylesheet
 * @return {String}                     The stylesheet text
 */

function getStyleSheetText(_ref5) {
  var styleSheetId = _ref5.styleSheetId;
  var styleSheet = this.cssStore.get(styleSheetId);
  return styleSheet.getStyleSheetText();
}
/**
 * Sets the new stylesheet text.
 * @param {StyleSheetId} styleSheetId  if of style style
 * @param {String}       text          changed css style
 */

function setStyleText(_ref6) {
  var styleSheetId = _ref6.styleSheetId,
      range = _ref6.range,
      text = _ref6.text;
  var styleSheet = this.cssStore.get(styleSheetId);
  return styleSheet.setStyleText(range, text);
}
/**
 * Sets the new stylesheet text.
 * @param {Array} edits  list of stylesheet changes
 */

function setStyleTexts(_ref7) {
  var _this2 = this;

  var edits = _ref7.edits;
  var styles = [];
  edits.forEach(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    styles.push(setStyleText.apply(_this2, args));
  });
  return {
    styles: styles
  };
}
function styleSheetRegistered(_ref8) {
  var _this3 = this;

  var cssText = _ref8.cssText,
      url = _ref8.url;
      _ref8.ownerNode;

  /**
   * wait until document ready so `document.styleSheets` is not empty
   */
  if (!this.readyStateComplete) {
    return setTimeout(function () {
      return styleSheetRegistered.call(_this3, {
        cssText: cssText,
        url: url
      });
    }, 100);
  }
  /**
   * check if stylesheet was already registered
   */


  var registeredStyleSheet = this.cssStore.getByUrl(url);

  if (registeredStyleSheet) {
    return this.execute('CSS.styleSheetAdded', {
      header: registeredStyleSheet.header
    });
  }

  var cssStyleSheets = [].slice.call(document.styleSheets);
  var styleSheetElement = arrayFind__default['default'](cssStyleSheets, function (cssStyleSheet) {
    return cssStyleSheet.href && cssStyleSheet.href.indexOf(url) > -1;
  });

  if (!styleSheetElement) {
    return this.emit('debug', "Couldn't register stylesheet, url not found ".concat(url));
  }

  var styleSheet = this.cssStore.add({
    href: styleSheetElement.href,
    cssRules: [].slice.call(styleSheetElement.cssRules),
    ownerNode: styleSheetElement.ownerNode,
    cssText: cssText
  });
  this.execute('CSS.styleSheetAdded', {
    header: styleSheet.header
  });
}

var CSS = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getComputedStyleForNode: getComputedStyleForNode,
  getPlatformFontsForNode: getPlatformFontsForNode,
  getMatchedStylesForNode: getMatchedStylesForNode,
  getInlineStylesForNode: getInlineStylesForNode,
  getStyleSheetText: getStyleSheetText,
  setStyleText: setStyleText,
  setStyleTexts: setStyleTexts,
  styleSheetRegistered: styleSheetRegistered
});

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Methods
 */

/**
 * Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions
 * or no exceptions. Initial pause on exceptions state is `none`.
 *
 * @param  {String} state  Pause on exceptions mode. Allowed values: none, uncaught, all.
 */
function setPauseOnExceptions() {
  return {};
}
/**
 * Enables or disables async call stacks tracking.
 *
 * @param  {Integer} maxDepth  Maximum depth of async call stacks. Setting to 0 will effectively
 *                             disable collecting async call stacks (default).
 */

function setAsyncCallStackDepth() {
  return {};
}
/**
 * Replace previous blackbox patterns with passed ones. Forces backend to skip stepping/pausing
 * in scripts with url matching one of the patterns. VM will try to leave blackboxed script by
 * performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
 *
 * @param  {String[]} patterns  Array of regexps that will be used to check script url for
 *                              blackbox state.
 */

function setBlackboxPatterns() {
  return {};
}
function getScriptSource(_ref) {
  var scriptId = _ref.scriptId;
  var script = [].slice.apply(document.querySelectorAll('script')).filter(function (node) {
    return node._nodeId && scriptId === node._nodeId.toString();
  })[0];

  if (!script) {
    return {
      scriptSource: '',
      error: "no script found with id ".concat(scriptId)
    };
  }
  /**
   * return script when inline
   */


  if (script.textContent.length) {
    return {
      scriptSource: script.textContent
    };
  }
  /**
   * otherwise return src and let middleware handle it
   */


  return {
    scriptSource: '',
    src: script.getAttribute('src')
  };
}
/**
 * Events
 */

/**
 * Fired when virtual machine parses script. This event is also fired for all known and
 * uncollected scripts upon enabling debugger.
 *
 * @param {String} script  script that was executed (e.g. by console)
 */

function scriptParsed(script) {
  if (!script) {
    var scripts = document.querySelectorAll('script');

    var _iterator = _createForOfIteratorHelper(scripts),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _script = _step.value;
        var hasSourceURL = Boolean(_script.attributes && _script.attributes.src && _script.attributes.src.nodeValue);
        this.execute('Debugger.scriptParsed', {
          startColumn: 0,
          startLine: 0,
          executionContextId: this.executionContextId,
          executionContextAuxData: {
            frameId: this.frameId,
            isDefault: true
          },
          hasSourceURL: hasSourceURL,
          isLiveEdit: false,
          scriptId: _script._nodeId ? _script._nodeId.toString() : null,
          sourceMapURL: '',
          url: hasSourceURL ? _script.attributes.src.nodeValue : ''
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return;
  }

  this.execute('Debugger.scriptParsed', {
    startColumn: 0,
    endColumn: 0,
    startLine: 0,
    endLine: 0,
    executionContextId: this.executionContextId,
    executionContextAuxData: {
      frameId: this.frameId,
      isDefault: true
    },
    scriptId: script.scriptId.toString(),
    hasSourceURL: false,
    isLiveEdit: false,
    sourceMapURL: '',
    url: ''
  });
}
/**
 * Fired when virtual machine fails to parse the script.
 */

function scriptFailedToParse(_ref2) {
  var scriptId = _ref2.scriptId,
      expression = _ref2.expression;
  this.execute('Debugger.scriptParsed', {
    startColumn: 0,
    endColumn: expression.length,
    startLine: 0,
    endLine: 0,
    executionContextId: this.executionContextId,
    executionContextAuxData: {
      frameId: this.frameId,
      isDefault: true
    },
    scriptId: scriptId.toString(),
    hasSourceURL: false,
    isLiveEdit: false,
    sourceMapURL: '',
    url: ''
  });
}

var Debugger = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setPauseOnExceptions: setPauseOnExceptions,
  setAsyncCallStackDepth: setAsyncCallStackDepth,
  setBlackboxPatterns: setBlackboxPatterns,
  getScriptSource: getScriptSource,
  scriptParsed: scriptParsed,
  scriptFailedToParse: scriptFailedToParse
});

var BitField = /*#__PURE__*/function () {
  function BitField(value) {
    _classCallCheck(this, BitField);

    this.values = [value];
  }

  _createClass(BitField, [{
    key: "get",
    value: function get(i) {
      var index = i / 32 | 0; // | 0 converts to an int. Math.floor works too.

      var bit = i % 32;
      return (this.values[index] & 1 << bit) !== 0;
    }
  }, {
    key: "set",
    value: function set(i) {
      var index = i / 32 | 0;
      var bit = i % 32;
      this.values[index] |= 1 << bit;
    }
  }, {
    key: "unset",
    value: function unset(i) {
      var index = i / 32 | 0;
      var bit = i % 32;
      this.values[index] &= ~(1 << bit);
    }
  }]);

  return BitField;
}();

/**
 * helper method to emulate key event on page
 *
 * @param  {Number} keyCode key code to be simulated
 */

function triggerKeyboardEvent(keyCode) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'keydown';
  var bubbles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var cancelable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var altKeyArg = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var ctrlKeyArg = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var metaKeyArg = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var shiftKeyArg = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  var eventObj = document.createEventObject ? document.createEventObject() : document.createEvent('Events');

  if (eventObj.initEvent) {
    eventObj.initEvent(type, bubbles, cancelable);
  }

  eventObj.keyCode = keyCode;
  eventObj.which = keyCode;
  eventObj.altKey = altKeyArg;
  eventObj.shiftKey = ctrlKeyArg;
  eventObj.ctrlKey = metaKeyArg;
  eventObj.metaKey = shiftKeyArg;
  document.body.dispatchEvent ? document.body.dispatchEvent(eventObj) : document.body.fireEvent('onkeydown', eventObj);
}
/**
 * Dispatches a key event to the page.
 *
 * @param  {String}   type            Type of the key event. Allowed values: keyDown, keyUp, rawKeyDown, char.
 * @param  {Integer}  modifiers       Bit field representing pressed modifier keys.
 *                                    (Alt=1, Ctrl=2, Meta/Command=4, Shift=8 (default: 0))
 * @param  {String}   value           Text as generated by processing a virtual key code with a keyboard layout.
 */


function dispatchKeyEvent(_ref) {
  var type = _ref.type,
      modifiers = _ref.modifiers,
      value = _ref.value;
  var bitModifiers = new BitField(modifiers);
  var altKeyArg = bitModifiers.get(1);
  var ctrlKeyArg = bitModifiers.get(2);
  var metaKeyArg = bitModifiers.get(4);
  var shiftKeyArg = bitModifiers.get(8);
  var args = [type, 'keydown', true, true, altKeyArg, ctrlKeyArg, metaKeyArg, shiftKeyArg];
  /**
   * simplification for HbbTV supported devices
   */

  if (window.KeyEvent) {
    if (Array.isArray(value)) {
      value = value.join('');
    }

    var key = value.slice(0, 3).toUpperCase() === 'VK_' ? value.toUpperCase() : "VK_".concat(value.toUpperCase());
    triggerKeyboardEvent.apply(void 0, [window.KeyEvent[key], type].concat(args));
    return {
      success: true
    };
  }

  value.forEach(function (_char) {
    return triggerKeyboardEvent.apply(void 0, [_char.charCodeAt(0), type].concat(args));
  });
  return {
    success: true
  };
}

var Input = /*#__PURE__*/Object.freeze({
  __proto__: null,
  dispatchKeyEvent: dispatchKeyEvent
});

/**
 * Returns all browser cookies for the current URL. Depending on the backend support, will return detailed
 * cookie information in the cookies field. (EXPERIMENTAL)
 */

function getCookies(_ref) {
  _ref.urls;
  var cookies = Cookies__default['default'].get();
  return Object.keys(cookies).map(function (name) {
    return {
      name: name,
      value: cookies[name]
    };
  });
}
/**
 * Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist. (EXPERIMENTAL)
 * @param {String}         url            The request-URI to associate with the setting of the cookie. This
 *                                        value can affect the default domain and path values of the created cookie.
 * @param {String}         name           The name of the cookie.
 * @param {String}         value          The value of the cookie.
 * @param {String}         domain         If omitted, the cookie becomes a host-only cookie.
 * @param {String}         path           Defaults to the path portion of the url parameter.
 * @param {Boolean}        secure         Defaults ot false.
 * @param {Boolean}        httpOnly       Defaults ot false.
 * @param {CookieSameSite} sameSite       Defaults to browser default behavior.
 * @param {Timestamp}      expirationDate If omitted, the cookie becomes a session cookie.
 *
 * @return {Boolean}                      True if successfully set cookie.
 */

function setCookie(cookie) {
  /**
   * make sure secure and httpOnly are boolean
   */
  cookie.secure = Boolean(cookie.secure);
  cookie.httpOnly = Boolean(cookie.httpOnly);
  cookie.expires = cookie.expirationDate;
  /**
   * set cookie
   */

  var domain = cookie.domain,
      path = cookie.path,
      expires = cookie.expires,
      secure = cookie.secure,
      httpOnly = cookie.httpOnly;
  Cookies__default['default'].set(cookie.name, cookie.value, {
    domain: domain,
    path: path,
    expires: expires,
    secure: secure,
    httpOnly: httpOnly
  });
  return {
    success: true
  };
}
/**
 * Deletes browser cookie with given name, domain and path. (EXPERIMENTAL)
 * @param  {String} cookieName Name of the cookie to remove.
 * @param  {String} url        URL to match cooke domain and path.
 *
 * @return {Boolean}           True if successfully removed cookie.
 */

function deleteCookie(_ref2) {
  _ref2.cookieName;
      _ref2.url;
  Cookies__default['default'].remove(name);
  return {
    success: true
  };
}
/**
 * Clears browser cookies.
 *
 * @return {Boolean}           True if successfully removed cookies.
 */

function clearBrowserCookies() {
  var cookies = Cookies__default['default'].get();

  for (var _i = 0, _Object$keys = Object.keys(cookies); _i < _Object$keys.length; _i++) {
    var cookie = _Object$keys[_i];
    Cookies__default['default'].remove(cookie);
  }

  return {
    success: true
  };
}
var network = {
  getAllCookie: getCookies // same functionality

};

var Network = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getCookies: getCookies,
  setCookie: setCookie,
  deleteCookie: deleteCookie,
  clearBrowserCookies: clearBrowserCookies,
  'default': network
});

/**
 * Methods
 */
var addScriptToEvaluateOnNewDocument = function addScriptToEvaluateOnNewDocument() {
  return {};
};
var bringToFront = function bringToFront() {
  return {};
};
var captureScreenshot = function captureScreenshot() {
  return {};
};
var createIsolatedWorld = function createIsolatedWorld() {
  return {};
};
var disable = function disable() {
  return {};
};
var enable = function enable() {
  return {};
};
var getAppManifest = function getAppManifest() {
  return {};
};
var getFrameTree = function getFrameTree() {
  return {};
};
var getLayoutMetrics = function getLayoutMetrics() {
  return {};
};
var getNavigationHistory = function getNavigationHistory() {
  return {};
};
var handleJavaScriptDialog = function handleJavaScriptDialog() {
  return {};
};
var navigate = function navigate(_ref) {
  var url = _ref.url;
  window.localtion.assign(url);
  return {};
};
var navigateToHistoryEntry = function navigateToHistoryEntry(_ref2) {
  var entryId = _ref2.entryId;
  window.history.go(entryId);
  return {};
};
var printToPDF = function printToPDF() {
  return {};
};
var reload = function reload(_ref3) {
  var ignoreCache = _ref3.ignoreCache;
  window.location.reload(Boolean(ignoreCache));
  return {};
};
var removeScriptToEvaluateOnNewDocument = function removeScriptToEvaluateOnNewDocument() {
  return {};
};
var resetNavigationHistory = function resetNavigationHistory() {
  return {};
};
var setDocumentContent = function setDocumentContent() {
  return {};
};
var stopLoading = function stopLoading() {
  return {};
};
var getResourceTree = function getResourceTree() {
  return {
    frameTree: {
      childFrames: [],
      frame: {
        // id: this.frameId,
        // loaderId: this.frameId + '0',
        id: 0,
        loaderId: '00',
        mimeType: 'text/html',
        securityOrigin: document.location.origin,
        url: document.location.origin
      }
    }
  };
};
/**
 * Events
 */
// export const frameStoppedLoading = () => {
//     this.execute('Page.frameStoppedLoading', { frameId: this.frameId })
// }
// export const loadEventFired = () => {
//     this.execute('Page.loadEventFired', { timestamp: 649314.52695 })
// }

var Page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  addScriptToEvaluateOnNewDocument: addScriptToEvaluateOnNewDocument,
  bringToFront: bringToFront,
  captureScreenshot: captureScreenshot,
  createIsolatedWorld: createIsolatedWorld,
  disable: disable,
  enable: enable,
  getAppManifest: getAppManifest,
  getFrameTree: getFrameTree,
  getLayoutMetrics: getLayoutMetrics,
  getNavigationHistory: getNavigationHistory,
  handleJavaScriptDialog: handleJavaScriptDialog,
  navigate: navigate,
  navigateToHistoryEntry: navigateToHistoryEntry,
  printToPDF: printToPDF,
  reload: reload,
  removeScriptToEvaluateOnNewDocument: removeScriptToEvaluateOnNewDocument,
  resetNavigationHistory: resetNavigationHistory,
  setDocumentContent: setDocumentContent,
  stopLoading: stopLoading,
  getResourceTree: getResourceTree
});

/**
 * parse console properties properly
 * @param  {*}             arg  any kind of primitive or object
 * @return {RemoteObject}       Mirror object referencing original JavaScript object.
 */

function getConsoleArg(arg) {
  var returnByValue = arguments.length > 2 ? arguments[2] : undefined;
  var property = new PropertyObject(arg);

  if (property.type === 'undefined') {
    return {
      type: property.type
    };
  }
  /**
   * return primitives right away
   */


  if (property.isPrimitive || property.subtype === 'array' && returnByValue) {
    return {
      type: property.type,
      value: arg
    };
  }

  var result = property.get();

  if (property.subtype !== 'node') {
    /**
     * apply preview for raw objects only
     */
    result.preview = {
      description: property.description,
      overflow: false,
      properties: getObjectProperties(property.object),
      type: property.type,
      subtype: property.subtype
    };
  }

  return result;
}
function getObjectProperties(obj) {
  var includeDescriptors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return Object.getOwnPropertyNames(obj).map(function (propertyName) {
    /**
     * ignore accessor and hide internal properties (_nodeId)
     */
    if (propertyName === 'length' || propertyName === 'constructor' || propertyName === '_nodeId') {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
    var property = new PropertyObject(descriptor.value);
    /**
     * only return a subset of properties
     */

    if (!includeDescriptors) {
      var result = property.get();
      result.name = propertyName;
      result.value = result.description;
      delete result.description;
      delete result.objectId;
      delete result.className;
      return result;
    }

    return {
      configurable: descriptor.configurable,
      enumerable: descriptor.enumerable,
      writable: descriptor.writable,
      name: propertyName,
      value: property.get(),
      isOwn: obj.hasOwnProperty(propertyName)
    };
  }).filter(function (prop) {
    return Boolean(prop);
  });
}
/**
 * generates an error object
 * @param  {String} [message='fake']  error message (optional)
 * @return {Object}                   error object
 */

function getError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'fake';
  var fakeStack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  try {
    throw new Error(message);
  } catch (err) {
    /**
     * fake stack if none existing
     * TV browser doesn't allow to modify error object (readonly) so we need to
     * fake the error object
     */
    if (!err.stack || fakeStack) {
      return getFakeError(err);
    }

    return err;
  }
}
/**
 * generates a fake error object since we can't modify the stack and eval errors come without
 */

function getFakeError(err) {
  var newError = {
    message: err.message,
    stack: "".concat(err.constructor.name, ": ").concat(err.message, "\n\tat <anonymous>:1:1")
  };
  newError.constructor = err.constructor;
  return newError;
}
/**
 * returns stacktrace data for console.log event
 */

function getStacktrace(err) {
  var error = err || getError();

  if (!error) {
    return [];
  }

  var splittedStack = error.stack.split('\n');
  return splittedStack.filter(function (line) {
    /**
     * filter out own functions
     */
    return !line.match(/^__(getStacktrace|fakeConsole)/);
  }).map(function (line) {
    var stackData = line.trim().match(/^(.*@)*(.*):(\d+):(\d+)$/);

    if (!stackData) {
      return null;
    }
    /**
     * ToDo assign _nodeId to each element on the page to get this working
     */


    var url = stackData[2];
    var script = Array.from(document.querySelectorAll('script')).filter(function (script) {
      return script.src === url;
    })[0];
    return {
      columnNumber: stackData[4],
      lineNumber: stackData[3],
      scriptId: script ? script._nodeId : 0,
      url: stackData[2],
      functionName: stackData[1] ? stackData[1].slice(0, 1) : ''
    };
  }).filter(function (stackData) {
    return Boolean(stackData);
  });
}
/**
 * executes a given expressions safely and returns its value or error
 * @param  {String} expression  javascript you want to execute
 * @return {Object}             result containing the expression value or error and objectId from store
 */

function callFn(expression) {
  var result = {
    value: null,
    error: null,
    scriptId: null
  };

  try {
    result.value = eval(expression); // eslint-disable-line no-eval
  } catch (e) {
    result.error = e;
    result.error.wasThrown = true;
    /**
     * trigger scriptFailedToParse event when script can't be parsed
     */
    // scriptFailedToParse.call(this, script)
  } finally {
    result.scriptId = ObjectStore$1.push(result.value || result.error);
  }

  return result;
}

var scripts = [];
/**
 * internal methods
 */

/**
 * overwrite console
 */

function overwriteConsole(console) {
  var _this = this;

  var consoleMethods = Object.keys(Object.getPrototypeOf(console));
  /**
   * try different way to grab console methods
   * (more supported by newer browser)
   */

  if (consoleMethods.length === 0) {
    consoleMethods = Object.getOwnPropertyNames(console);
  }
  /**
   * if no methods were found return original object instead of null
   */


  if (consoleMethods.length === 0) {
    return console;
  }

  return consoleMethods.reduce(function (con, type) {
    if (typeof console[type] !== 'function') {
      con[type] = console[type];
      return con;
    }

    var origFn = console[type].bind(console);
    var self = _this;

    con[type] = function __fakeConsole() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      self.execute('Runtime.consoleAPICalled', {
        args: args.map(getConsoleArg),
        executionContext: self.executionContextId,
        stackTrace: {
          callFrames: getStacktrace()
        },
        timestamp: new Date().getTime(),
        type: type
      });
      origFn.apply(self, args);
    };

    return con;
  }, {});
}
/**
 * Methods
 */

/**
 * Tells inspected instance to run if it was waiting for debugger to attach.
 */

function runIfWaitingForDebugger() {
  return {}; // NYI
}
/**
 * Compiles expression.
 * @param  {String}           expression Expression to compile.
 * @param  {*}                context    scope to call expression on
 * @return {ScriptId}                    Id of the script.
 * @return {ExceptionDetails}            Exception details
 */

function compileScript(_ref) {
  var expression = _ref.expression;
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

  var _callFn$call = callFn.call(context, expression),
      error = _callFn$call.error,
      scriptId = _callFn$call.scriptId;

  if (error && error.wasThrown) {
    var exceptionDetails = {
      columnNumber: 0,
      exception: getConsoleArg(error, scriptId),
      exceptionId: scriptId,
      lineNumber: 0,
      scriptId: scriptId.toString(),
      text: 'Uncaught'
    };
    return {
      exceptionDetails: exceptionDetails
    };
  }

  scriptParsed.call(this, {
    scriptId: scriptId
  });
  return {
    scriptId: scriptId.toString()
  };
}
/**
 * Evaluates expression on global object.
 *
 * @param  {Boolean}            awaitPromise          Whether execution should wait for promise to be
 *                                                    resolved. If the result of evaluation is not a
 *                                                    Promise, it's considered to be an error.
 * @param  {ExecutionContextId} contextId             Specifies in which execution context to perform
 *                                                    evaluation. If the parameter is omitted the
 *                                                    evaluation will be performed in the context of
 *                                                    the inspected page.
 * @param  {String}             expression            Expression to evaluate.
 * @param  {Boolean}            generatePreview       Whether preview should be generated for the result.
 * @param  {Boolean}            includeCommandLineAPI Determines whether Command Line API should be
 *                                                    available during the evaluation.
 * @param  {String}             objectGroup           Symbolic group name that can be used to release
 *                                                    multiple objects.
 * @param  {Boolean}            returnByValue         Whether the result is expected to be a JSON object
 *                                                    that should be sent by value.
 * @param  {Boolean}            silent                In silent mode exceptions thrown during evaluation
 *                                                    are not reported and do not pause execution.
 *                                                    Overrides setPauseOnException state.
 * @param  {Boolean}            userGesture           Whether execution should be treated as initiated
 *                                                    by user in the UI.
 * @return {RemoteObject|ExceptionDetails}                       Evauluation result or exception details
 */

function evaluate(_ref2) {
  _ref2.awaitPromise;
      _ref2.contextId;
      var expression = _ref2.expression,
      generatePreview = _ref2.generatePreview;
      _ref2.includeCommandLineAPI;
      var objectGroup = _ref2.objectGroup,
      returnByValue = _ref2.returnByValue;
      _ref2.silent;
      _ref2.userGesture;

  /**
   * evaluate is only supported for console executions
   */
  if (['console', 'completion'].indexOf(objectGroup) === -1) {
    return {};
  }
  /**
   * If a variable gets assigned no compileScript method is triggered but `generatePreview`
   * will be passed into evaluate with true.
   * Also in case when `objectGroup` is set to completion we need to call compileScript
   * to return the result of the pass in function to get the preview for the scope.
   */


  if (generatePreview || objectGroup === 'completion') {
    compileScript.call(this, {
      expression: expression
    });
  }

  var result = ObjectStore$1.getLastObject();
  var scriptId = ObjectStore$1.getLastScriptId();

  if (result instanceof Error && result.wasThrown) {
    var newError = getFakeError(result);
    var errorResult = getConsoleArg(newError, scriptId, returnByValue);
    return {
      result: errorResult,
      exceptionDetails: {
        columnNumber: 0,
        lineNumber: 0,
        scriptId: scriptId.toString(),
        exception: errorResult,
        exceptionId: scriptId,
        stackTrace: {
          callFrames: getStacktrace(newError)
        },
        text: newError.constructor.name
      }
    };
  }

  if (objectGroup === 'completion' && !returnByValue) {
    var constructorName = result && result.constructor ? result.constructor.name : undefined;
    return {
      result: {
        className: constructorName,
        description: constructorName,
        objectId: JSON.stringify({
          injectedScriptId: 1,
          id: scriptId
        }),
        type: _typeof(result)
      }
    };
  }
  /**
   * in case evaluate throws an error or returns one we need to fake the stack
   * in order to not send debugger stacktraces
   */


  if (result instanceof Error) {
    return {
      result: getConsoleArg(getFakeError(result), scriptId, returnByValue)
    };
  }

  return {
    result: getConsoleArg(result, scriptId, returnByValue)
  };
}
function awaitPromise(_ref3, id) {
  var _this2 = this;

  var promiseObjectId = _ref3.promiseObjectId,
      returnByValue = _ref3.returnByValue;
      _ref3.generatePreview;
  var promise = ObjectStore$1.getByObjectId(promiseObjectId);

  if (typeof promise.then !== 'function') {
    var err = new Error('RemoteObject is not a promise');
    var errorResult = getConsoleArg(err, null, returnByValue);
    return {
      result: errorResult
    };
  }

  promise.then(function (payload) {
    var result = {
      result: getConsoleArg(payload, promiseObjectId, returnByValue)
    };

    _this2.emit('result', {
      id: id,
      result: result
    });
  }, function (e) {
    var errorResult = getConsoleArg(e, null, returnByValue);

    _this2.emit('result', {
      id: id,
      result: {
        result: errorResult,
        exceptionDetails: {
          columnNumber: 0,
          lineNumber: 0,
          scriptId: promiseObjectId,
          exception: errorResult,
          exceptionId: promiseObjectId,
          stackTrace: {
            callFrames: getStacktrace(e)
          },
          text: e.constructor.name
        }
      }
    });
  });
}
/**
 * Calls function with given declaration on the given object. Object group of the result
 * is inherited from the target object.
 *
 * @param  {CallArgument[]}  arguments            Call arguments. All call arguments must belong
 *                                                to the same JavaScript world as the target object.
 * @param  {String}          functionDeclaration  Declaration of the function to call.
 * @return {RemoteObject}                         evelalutaion result
 * @return {ExceptionDetails}                     exception details
 */

function callFunctionOn(_ref4) {
  _ref4.arguments;
      var functionDeclaration = _ref4.functionDeclaration,
      objectId = _ref4.objectId;
  var scope = ObjectStore$1.getByObjectId(objectId);
  compileScript.call(this, {
    expression: "(".concat(functionDeclaration, ").apply(this)")
  }, scope);
  var result = ObjectStore$1.getLastObject();
  var scriptId = ObjectStore$1.getLastScriptId();

  if (result instanceof Error) {
    return {
      exceptionDetails: {
        columnNumber: 0,
        lineNumber: 0,
        scriptId: scriptId.toString(),
        exception: result,
        exceptionId: scriptId,
        stackTrace: {
          callFrames: getStacktrace(result)
        },
        text: result.constructor.name
      }
    };
  }

  return {
    result: {
      type: _typeof(result),
      value: result
    }
  };
}
/**
 * Releases all remote objects that belong to a given group.
 *
 * @param  {String} objectGroup  Symbolic object group name.
 */

function releaseObjectGroup(_ref5) {
  _ref5.objectGroup;
  return {};
}
/**
 * Returns properties of a given object. Object group of the result is inherited from the
 * target object.
 *
 * @param  {RemoteObjectId} objectId                Identifier of the object to return properties for.
 * @param  {Boolean}        ownProperties           If true, returns properties belonging only to the
 *                                                 element itself, not to its prototype chain.
 * @param  {Boolean}        accessorPropertiesOnly  If true, returns accessor properties (with
 *                                                 getter/setter) only; internal properties are not
 *                                                 returned either.
 * @param  {Boolean}        generatePreview        Whether preview should be generated for the results.
 *
 * @return {RemoteObject}      evelalutaion result
 * @return {ExceptionDetails}  exception details
 */

function getProperties(_ref6) {
  var accessorPropertiesOnly = _ref6.accessorPropertiesOnly,
      objectId = _ref6.objectId;

  /**
   * not able to detect accessors via JS yet
   */
  if (accessorPropertiesOnly) {
    return {
      result: []
    };
  }

  var result = ObjectStore$1.getByObjectId(objectId);

  if (!result) {
    return {
      result: []
    };
  }

  return {
    result: getObjectProperties(result, true)
  };
}
/**
 * Releases remote object with given id.
 *
 * @param {RemoteObjectId} objectId  Identifier of the object to release.
 */

function releaseObject(_ref7) {
  _ref7.objectId;
  return {}; // NYI
}
/**
 * Events
 */

/**
 * Issued when new execution context is created (e.g. when page load event gets triggered).
 *
 * @return {ExecutionContextDescription} A newly created execution contex.
 */

function executionContextCreated() {
  this.execute('Runtime.executionContextCreated', {
    context: {
      auxData: {
        frameId: this.frameId,
        isDefault: true
      },
      id: this.executionContextId,
      name: document.title,
      origin: window.location.origin
    }
  });
}

var Runtime = /*#__PURE__*/Object.freeze({
  __proto__: null,
  scripts: scripts,
  overwriteConsole: overwriteConsole,
  runIfWaitingForDebugger: runIfWaitingForDebugger,
  compileScript: compileScript,
  evaluate: evaluate,
  awaitPromise: awaitPromise,
  callFunctionOn: callFunctionOn,
  releaseObjectGroup: releaseObjectGroup,
  getProperties: getProperties,
  releaseObject: releaseObject,
  executionContextCreated: executionContextCreated
});

/**
 * Methods
 */

/**
 * Enables target discovery for the specified locations, when setDiscoverTargets was
 * set to true.
 *
 * @param {RemoteLocation[]} locations  List of remote locations.
 */
function setRemoteLocations() {
  return {};
}
/**
 * Controls whether to discover available targets and notify via
 * targetCreated/targetDestroyed events.
 *
 * @param {Boolean} discover  Whether to discover available targets.
 */

function setDiscoverTargets() {
  return {};
}
/**
 * Controls whether to automatically attach to new targets which are considered to be related
 * to this one. When turned on, attaches to all existing related targets as well. When turned
 * off, automatically detaches from all currently attached targets.
 *
 * @param {Boolean} autoAttach              Whether to auto-attach to related targets.
 * @param {Boolean} waitForDebuggerOnStart  Whether to pause new targets when attaching to them. Use
 *                                          Runtime.runIfWaitingForDebugger to run paused targets.
 */

function setAutoAttach(_ref) {
  _ref.autoAttach;
      _ref.waitForDebuggerOnStart;
  return {};
}

var Target = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setRemoteLocations: setRemoteLocations,
  setDiscoverTargets: setDiscoverTargets,
  setAutoAttach: setAutoAttach
});

/**
 * contains some methods that have been moved to this new domain according to latest
 * devtools developments
 */
/**
 * Paints viewport size upon main frame resize.
 * @param {Boolean} show Whether to paint size or not.
 */

function setShowViewportSizeOnResize(_ref) {
  _ref.show;
  // NYI
  return {};
}
function setPausedInDebuggerMessage() {
  // NYI
  return {};
}

var Overlay = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setShowViewportSizeOnResize: setShowViewportSizeOnResize,
  setPausedInDebuggerMessage: setPausedInDebuggerMessage,
  highlightNode: highlightNode,
  hideHighlight: hideHighlight
});

var W3C_ELEMENT_ID = 'element-6066-11e4-a52e-4f735466cecf';
var elementCache = [];
/**
 * Helper
 */

/**
* find elements by css selector
* @param  {String} selector   css selector
* @param  {HTMLElement} root  context node
* @return {HTMLElement[]}     list if elements matching xpath
*/

function findByCssSelector(selector, root) {
  return root.querySelectorAll(selector);
}
/**
* find element by xpath
* @param  {String} selector   xpath selector
* @param  {HTMLElement} root  context node
* @return {HTMLElement[]}     list of elements matching xpath
*/


function findByXPath(selector, root) {
  var result = document.evaluate(selector, root, null, 0, null);
  var elements = [];
  var value = result.iterateNext();

  while (value) {
    elements.push(value);
    value = result.iterateNext();
  }

  return elements;
}

function formatElements(using, value, element) {
  /**
   * check if element is already in cache
   */
  var cachedElement = elementCache.filter(function (e) {
    return e.element === element;
  })[0];

  if (cachedElement) {
    return cachedElement;
  }
  /**
   * make sure element has nodeId
   */


  if (!element._nodeId) {
    setNodeIds(element);
  }
  /**
   * make sure node is available in node store
   */


  var node = Node.getNode(element._nodeId);

  if (!node) {
    node = new Node(element);
  }

  return {
    uuid: node.nodeId,
    // ToDo have check if nodeId exists
    using: using,
    value: value,
    element: element
  };
}

function find(_ref, fromElement) {
  var using = _ref.using,
      value = _ref.value;
  var root = fromElement instanceof HTMLElement ? fromElement : document;
  var elements;

  switch (using) {
    case 'id':
      elements = findByCssSelector("#".concat(value), root);
      break;

    case 'css selector':
      elements = findByCssSelector(value, root);
      break;

    case 'link text':
      elements = findByXPath("//a[text()[normalize-space()]=\"".concat(value, "\"]"), root);
      break;

    case 'partial link text':
      elements = findByXPath("//a[contains(text()[normalize-space()],\"".concat(value, "\")]"), root);
      break;

    case 'xpath':
      elements = findByXPath(value, root);
  }

  var result = [].slice.call(elements)
  /**
   * format
   */
  .map(function (element) {
    return formatElements(using, value, element);
  })
  /**
   * don't append empty (filtered) entries
   */
  .filter(function (e) {
    return Boolean(e);
  });
  /**
   * cache element
   */

  elementCache = elementCache.concat(result);
  return result.map(function (result) {
    return _defineProperty({}, W3C_ELEMENT_ID, result.uuid);
  });
}
/**
 * returns cached HTMLElement
 * @param  {String} uuid  id of cached element
 * @return {HTMLElement}  cached element
 */


function get(uuid) {
  var element = elementCache.filter(function (e) {
    return e.uuid === uuid;
  })[0];
  return element ? element.element : undefined;
}
/**
 * methods
 */

/**
 * The Find Element command is used to find an element in the current browsing context
 * that can be used for future commands.
 *
 * @param {String}  using  selector strategy
 * @param {Srting}  value  selector
 * @return {Object}        element
 */


function findElement(_ref3) {
  var using = _ref3.using,
      value = _ref3.value;
  var element = find({
    using: using,
    value: value
  })[0];

  if (!element) {
    return {
      error: 'NoSuchElementError'
    };
  }

  return element;
}
/**
 * The Find Elements command is used to find elements in the current browsing context
 * that can be used for future commands.
 *
 * @param {String}  using  selector strategy
 * @param {Srting}  value  selector
 * @return {Object[]}      elements
 */

function findElements(_ref4) {
  var using = _ref4.using,
      value = _ref4.value;
  return find({
    using: using,
    value: value
  });
}
/**
 * The Find Element From Element command is used to find an element from a web element
 * in the current browsing context that can be used for future commands.
 *
 * @param  {String} elementId  element uuid
 * @param  {String} using      selector strategy
 * @param  {Srting} value      selector
 * @return {Object}            element
 */

function findElementFromElement(_ref5) {
  var elementId = _ref5.elementId,
      using = _ref5.using,
      value = _ref5.value;
  var nodeContext = get(elementId);
  return find({
    using: using,
    value: value
  }, nodeContext)[0];
}
/**
 * The Find Elements From Element command is used to find elements from a web element
 * in the current browsing context that can be used for future commands.
 *
 * @param  {String} elementId  element uuid
 * @param  {String} using      selector strategy
 * @param  {Srting} value      selector
 * @return {Object}            elements
 */

function findElementsFromElement(_ref6) {
  var elementId = _ref6.elementId,
      using = _ref6.using,
      value = _ref6.value;
  var nodeContext = get(elementId);
  return find({
    using: using,
    value: value
  }, nodeContext);
}
/**
 * Transforms an object to an element result (usually executed when user accesses and
 * element via execute script command)
 *
 * @param  {String} objectId  the object id returned by Runtime.evaluate
 * @param  {String} value     function that was executed
 * @return {Object}           element
 */

function transformElementObject(_ref7) {
  var objectId = _ref7.objectId;
  var element = ObjectStore$1.getByObjectId(objectId);
  var result = formatElements('script', null, element);
  elementCache = elementCache.concat(result);
  return _defineProperty({}, W3C_ELEMENT_ID, result.uuid);
}
/**
 * The Get Element Text command intends to return an element’s text “as rendered”.
 * This is approximately equivalent to calling element.innerText. An element’s rendered
 * text is also used for locating a elements by their link text and partial link text.
 *
 * @param  {NodeId} nodeId  node to get text content from
 * @return {String}         text content
 */

function getText(_ref9) {
  var nodeId = _ref9.nodeId;
  var root = Node.getNode(nodeId);

  if (!root) {
    throw new Error("Couldn't find node with nodeId ".concat(nodeId));
  }

  return {
    text: root.node.innerText
  };
}
/**
 * The Get Element Rect command returns the dimensions and coordinates of the given
 * web element.
 *
 * @param  {NodeId} nodeId  node to get text content from
 * @return {Object}         object with x, y, width and height properties
 */

function getElementRect(_ref10) {
  var nodeId = _ref10.nodeId;
  var root = Node.getNode(nodeId);

  if (!root) {
    throw new Error("Couldn't find node with nodeId ".concat(nodeId));
  }

  var rect = root.node.getBoundingClientRect();
  /**
   * The returned value is a dictionary with the following members:
   */

  return {
    /**
     * X axis position of the top-left corner of the web element relative to
     * the current browsing context’s document element in CSS reference pixels.
     * @type {Number}
     */
    x: rect.left,

    /**
     * Y axis position of the top-left corner of the web element relative to
     * the current browsing context’s document element in CSS reference pixels.
     * @type {Number}
     */
    y: rect.top,

    /**
     * Height of the web element’s bounding rectangle in CSS reference pixels.
     * @type {Number}
     */
    width: rect.width,

    /**
     * Width of the web element’s bounding rectangle in CSS reference pixels.
     * @type {Number}
     */
    height: rect.height
  };
}
/**
 * The Get Element Property command will return the result of getting a property of an element.
 *
 * @param  {NodeId} nodeId  node to get property from
 * @return {String}         property value
 */

function getElementProperty(_ref11) {
  var nodeId = _ref11.nodeId,
      property = _ref11.property;
  var root = Node.getNode(nodeId);

  if (!root) {
    throw new Error("Couldn't find node with nodeId ".concat(nodeId));
  }

  return {
    value: root.node[property]
  };
}
function title() {
  return {
    value: getTitle()
  };
}

var Webdriver = /*#__PURE__*/Object.freeze({
  __proto__: null,
  findElement: findElement,
  findElements: findElements,
  findElementFromElement: findElementFromElement,
  findElementsFromElement: findElementsFromElement,
  transformElementObject: transformElementObject,
  getText: getText,
  getElementRect: getElementRect,
  getElementProperty: getElementProperty,
  title: title
});

var domains = {
  CSS: CSS,
  Debugger: Debugger,
  DOM: DOM,
  Input: Input,
  Network: Network,
  Page: Page,
  Runtime: Runtime,
  Target: Target,
  Overlay: Overlay,
  Webdriver: Webdriver
};

function dispatch (domains) {
  var _this = this;

  return function (CDPObject) {
    var id = CDPObject.id,
        params = CDPObject.params,
        method = CDPObject.method;
    var domainArr = method.split('.');

    var _domainArr = _slicedToArray(domainArr, 2),
        domain = _domainArr[0],
        subDomain = _domainArr[1];

    var response = {};
    if (id) response.id = id;

    if (!domains[domain]) {
      response.result = "Not support domain [".concat(domain, "]");
    } else {
      var execResult = domains[domain][subDomain];
      response.method = method;
      response.result = execResult ? execResult(params || {}) : {};
    }

    _this.emit('cdp', response);
  };
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var RemoteDebugger = /*#__PURE__*/function () {
  function RemoteDebugger(options) {
    var _this = this;

    _classCallCheck(this, RemoteDebugger);

    this.domains = {};
    this.initDomains();
    options = this.mergeOptions(options);
    Object.keys(options).forEach(function (key) {
      _this[key] = options[key];
    });
    this.loadHandler();
  }

  _createClass(RemoteDebugger, [{
    key: "inspectorPage",
    value: function () {
      var _inspectorPage = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        var url, requestData, _yield$to, _yield$to2, err, res;

        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = "//".concat(getWsUrlOrigin(this.wsHost), "/register");
                requestData = {
                  pid: this.pid,
                  title: this.title,
                  url: this.url,
                  wsHost: this.wsHost
                };
                _context.next = 4;
                return to(request({
                  url: url,
                  method: 'post',
                  formType: true,
                  data: requestData
                }));

              case 4:
                _yield$to = _context.sent;
                _yield$to2 = _slicedToArray(_yield$to, 2);
                err = _yield$to2[0];
                res = _yield$to2[1];

                if (!err) {
                  _context.next = 10;
                  break;
                }

                throw err;

              case 10:
                if (res.errNo === 0) this.connectSocket();

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function inspectorPage() {
        return _inspectorPage.apply(this, arguments);
      }

      return inspectorPage;
    }()
  }, {
    key: "initDomains",
    value: function initDomains() {
      for (var _i = 0, _Object$entries = Object.entries(domains); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            name = _Object$entries$_i[0],
            domain = _Object$entries$_i[1];

        this.domains[name] = domain;
      }
    }
  }, {
    key: "initSocketEvent",
    value: function initSocketEvent(socket) {
      socket.emit('connected');
      socket.on('cdp', dispatch.call(socket, this.domains));
    }
  }, {
    key: "connectSocket",
    value: function connectSocket() {
      var wsUrlOrigin = getWsUrlOrigin(this.wsHost);
      var socket = io__default['default']("ws://".concat(wsUrlOrigin, "/devtools/page/").concat(this.pid));
      this.initSocketEvent(socket);
    }
  }, {
    key: "mergeOptions",
    value: function mergeOptions(options) {
      return _objectSpread({
        pid: generatePid(),
        title: document.title,
        url: location.href,
        wsHost: '//localhost:9222'
      }, options);
    }
  }, {
    key: "loadHandler",
    value: function loadHandler() {
      var _this2 = this;

      document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
          _this2.domains.Runtime.executionContextCreated.call(_this2);

          _this2.domains.Debugger.scriptParsed.call(_this2);

          _this2.domains.Page.frameStoppedLoading.call(_this2);

          _this2.domains.Page.loadEventFired.call(_this2);

          _this2.domains.DOM.documentUpdated.call(_this2);

          setNodeIds();
        }
      };
    }
  }, {
    key: "init",
    value: function init() {
      try {
        this.inspectorPage();
      } catch (e) {
        console.log(e);
      }
    }
  }]);

  return RemoteDebugger;
}();

module.exports = RemoteDebugger;
