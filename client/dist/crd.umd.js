(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('core-js/library/fn/array/find'), require('js-cookie')) :
  typeof define === 'function' && define.amd ? define(['core-js/library/fn/array/find', 'js-cookie'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.CRD = factory(global.arrayFind, global.Cookies));
}(this, (function (arrayFind, Cookies) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
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

  var build = {exports: {}};

  var url$1 = {};

  /**
   * Parses an URI
   *
   * @author Steven Levithan <stevenlevithan.com> (MIT license)
   * @api private
   */

  var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

  var parts = [
      'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
  ];

  var parseuri$2 = function parseuri(str) {
      var src = str,
          b = str.indexOf('['),
          e = str.indexOf(']');

      if (b != -1 && e != -1) {
          str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
      }

      var m = re.exec(str || ''),
          uri = {},
          i = 14;

      while (i--) {
          uri[parts[i]] = m[i] || '';
      }

      if (b != -1 && e != -1) {
          uri.source = src;
          uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
          uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
          uri.ipv6uri = true;
      }

      uri.pathNames = pathNames(uri, uri['path']);
      uri.queryKey = queryKey(uri, uri['query']);

      return uri;
  };

  function pathNames(obj, path) {
      var regx = /\/{2,9}/g,
          names = path.replace(regx, "/").split("/");

      if (path.substr(0, 1) == '/' || path.length === 0) {
          names.splice(0, 1);
      }
      if (path.substr(path.length - 1, 1) == '/') {
          names.splice(names.length - 1, 1);
      }

      return names;
  }

  function queryKey(uri, query) {
      var data = {};

      query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
          if ($1) {
              data[$1] = $2;
          }
      });

      return data;
  }

  var browser = {exports: {}};

  /**
   * Helpers.
   */

  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;

  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  var ms = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
      return parse(val);
    } else if (type === 'number' && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(val)
    );
  };

  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */

  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y;
      case 'weeks':
      case 'week':
      case 'w':
        return n * w;
      case 'days':
      case 'day':
      case 'd':
        return n * d;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }

  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return Math.round(ms / d) + 'd';
    }
    if (msAbs >= h) {
      return Math.round(ms / h) + 'h';
    }
    if (msAbs >= m) {
      return Math.round(ms / m) + 'm';
    }
    if (msAbs >= s) {
      return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
  }

  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return plural(ms, msAbs, d, 'day');
    }
    if (msAbs >= h) {
      return plural(ms, msAbs, h, 'hour');
    }
    if (msAbs >= m) {
      return plural(ms, msAbs, m, 'minute');
    }
    if (msAbs >= s) {
      return plural(ms, msAbs, s, 'second');
    }
    return ms + ' ms';
  }

  /**
   * Pluralization helper.
   */

  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
  }

  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   */

  function setup(env) {
  	createDebug.debug = createDebug;
  	createDebug.default = createDebug;
  	createDebug.coerce = coerce;
  	createDebug.disable = disable;
  	createDebug.enable = enable;
  	createDebug.enabled = enabled;
  	createDebug.humanize = ms;
  	createDebug.destroy = destroy;

  	Object.keys(env).forEach(key => {
  		createDebug[key] = env[key];
  	});

  	/**
  	* The currently active debug mode names, and names to skip.
  	*/

  	createDebug.names = [];
  	createDebug.skips = [];

  	/**
  	* Map of special "%n" handling functions, for the debug "format" argument.
  	*
  	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  	*/
  	createDebug.formatters = {};

  	/**
  	* Selects a color for a debug namespace
  	* @param {String} namespace The namespace string for the for the debug instance to be colored
  	* @return {Number|String} An ANSI color code for the given namespace
  	* @api private
  	*/
  	function selectColor(namespace) {
  		let hash = 0;

  		for (let i = 0; i < namespace.length; i++) {
  			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
  			hash |= 0; // Convert to 32bit integer
  		}

  		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  	}
  	createDebug.selectColor = selectColor;

  	/**
  	* Create a debugger with the given `namespace`.
  	*
  	* @param {String} namespace
  	* @return {Function}
  	* @api public
  	*/
  	function createDebug(namespace) {
  		let prevTime;
  		let enableOverride = null;

  		function debug(...args) {
  			// Disabled?
  			if (!debug.enabled) {
  				return;
  			}

  			const self = debug;

  			// Set `diff` timestamp
  			const curr = Number(new Date());
  			const ms = curr - (prevTime || curr);
  			self.diff = ms;
  			self.prev = prevTime;
  			self.curr = curr;
  			prevTime = curr;

  			args[0] = createDebug.coerce(args[0]);

  			if (typeof args[0] !== 'string') {
  				// Anything else let's inspect with %O
  				args.unshift('%O');
  			}

  			// Apply any `formatters` transformations
  			let index = 0;
  			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
  				// If we encounter an escaped % then don't increase the array index
  				if (match === '%%') {
  					return '%';
  				}
  				index++;
  				const formatter = createDebug.formatters[format];
  				if (typeof formatter === 'function') {
  					const val = args[index];
  					match = formatter.call(self, val);

  					// Now we need to remove `args[index]` since it's inlined in the `format`
  					args.splice(index, 1);
  					index--;
  				}
  				return match;
  			});

  			// Apply env-specific formatting (colors, etc.)
  			createDebug.formatArgs.call(self, args);

  			const logFn = self.log || createDebug.log;
  			logFn.apply(self, args);
  		}

  		debug.namespace = namespace;
  		debug.useColors = createDebug.useColors();
  		debug.color = createDebug.selectColor(namespace);
  		debug.extend = extend;
  		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

  		Object.defineProperty(debug, 'enabled', {
  			enumerable: true,
  			configurable: false,
  			get: () => enableOverride === null ? createDebug.enabled(namespace) : enableOverride,
  			set: v => {
  				enableOverride = v;
  			}
  		});

  		// Env-specific initialization logic for debug instances
  		if (typeof createDebug.init === 'function') {
  			createDebug.init(debug);
  		}

  		return debug;
  	}

  	function extend(namespace, delimiter) {
  		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  		newDebug.log = this.log;
  		return newDebug;
  	}

  	/**
  	* Enables a debug mode by namespaces. This can include modes
  	* separated by a colon and wildcards.
  	*
  	* @param {String} namespaces
  	* @api public
  	*/
  	function enable(namespaces) {
  		createDebug.save(namespaces);

  		createDebug.names = [];
  		createDebug.skips = [];

  		let i;
  		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  		const len = split.length;

  		for (i = 0; i < len; i++) {
  			if (!split[i]) {
  				// ignore empty strings
  				continue;
  			}

  			namespaces = split[i].replace(/\*/g, '.*?');

  			if (namespaces[0] === '-') {
  				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
  			} else {
  				createDebug.names.push(new RegExp('^' + namespaces + '$'));
  			}
  		}
  	}

  	/**
  	* Disable debug output.
  	*
  	* @return {String} namespaces
  	* @api public
  	*/
  	function disable() {
  		const namespaces = [
  			...createDebug.names.map(toNamespace),
  			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
  		].join(',');
  		createDebug.enable('');
  		return namespaces;
  	}

  	/**
  	* Returns true if the given mode name is enabled, false otherwise.
  	*
  	* @param {String} name
  	* @return {Boolean}
  	* @api public
  	*/
  	function enabled(name) {
  		if (name[name.length - 1] === '*') {
  			return true;
  		}

  		let i;
  		let len;

  		for (i = 0, len = createDebug.skips.length; i < len; i++) {
  			if (createDebug.skips[i].test(name)) {
  				return false;
  			}
  		}

  		for (i = 0, len = createDebug.names.length; i < len; i++) {
  			if (createDebug.names[i].test(name)) {
  				return true;
  			}
  		}

  		return false;
  	}

  	/**
  	* Convert regexp to namespace
  	*
  	* @param {RegExp} regxep
  	* @return {String} namespace
  	* @api private
  	*/
  	function toNamespace(regexp) {
  		return regexp.toString()
  			.substring(2, regexp.toString().length - 2)
  			.replace(/\.\*\?$/, '*');
  	}

  	/**
  	* Coerce `val`.
  	*
  	* @param {Mixed} val
  	* @return {Mixed}
  	* @api private
  	*/
  	function coerce(val) {
  		if (val instanceof Error) {
  			return val.stack || val.message;
  		}
  		return val;
  	}

  	/**
  	* XXX DO NOT USE. This is a temporary stub function.
  	* XXX It WILL be removed in the next major release.
  	*/
  	function destroy() {
  		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
  	}

  	createDebug.enable(createDebug.load());

  	return createDebug;
  }

  var common = setup;

  /* eslint-env browser */

  (function (module, exports) {
  /**
   * This is the web browser implementation of `debug()`.
   */

  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();
  exports.destroy = (() => {
  	let warned = false;

  	return () => {
  		if (!warned) {
  			warned = true;
  			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
  		}
  	};
  })();

  /**
   * Colors.
   */

  exports.colors = [
  	'#0000CC',
  	'#0000FF',
  	'#0033CC',
  	'#0033FF',
  	'#0066CC',
  	'#0066FF',
  	'#0099CC',
  	'#0099FF',
  	'#00CC00',
  	'#00CC33',
  	'#00CC66',
  	'#00CC99',
  	'#00CCCC',
  	'#00CCFF',
  	'#3300CC',
  	'#3300FF',
  	'#3333CC',
  	'#3333FF',
  	'#3366CC',
  	'#3366FF',
  	'#3399CC',
  	'#3399FF',
  	'#33CC00',
  	'#33CC33',
  	'#33CC66',
  	'#33CC99',
  	'#33CCCC',
  	'#33CCFF',
  	'#6600CC',
  	'#6600FF',
  	'#6633CC',
  	'#6633FF',
  	'#66CC00',
  	'#66CC33',
  	'#9900CC',
  	'#9900FF',
  	'#9933CC',
  	'#9933FF',
  	'#99CC00',
  	'#99CC33',
  	'#CC0000',
  	'#CC0033',
  	'#CC0066',
  	'#CC0099',
  	'#CC00CC',
  	'#CC00FF',
  	'#CC3300',
  	'#CC3333',
  	'#CC3366',
  	'#CC3399',
  	'#CC33CC',
  	'#CC33FF',
  	'#CC6600',
  	'#CC6633',
  	'#CC9900',
  	'#CC9933',
  	'#CCCC00',
  	'#CCCC33',
  	'#FF0000',
  	'#FF0033',
  	'#FF0066',
  	'#FF0099',
  	'#FF00CC',
  	'#FF00FF',
  	'#FF3300',
  	'#FF3333',
  	'#FF3366',
  	'#FF3399',
  	'#FF33CC',
  	'#FF33FF',
  	'#FF6600',
  	'#FF6633',
  	'#FF9900',
  	'#FF9933',
  	'#FFCC00',
  	'#FFCC33'
  ];

  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */

  // eslint-disable-next-line complexity
  function useColors() {
  	// NB: In an Electron preload script, document will be defined but not fully
  	// initialized. Since we know we're in Chrome, we'll just detect this case
  	// explicitly
  	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
  		return true;
  	}

  	// Internet Explorer and Edge do not support colors.
  	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
  		return false;
  	}

  	// Is webkit? http://stackoverflow.com/a/16459606/376773
  	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
  		// Is firebug? http://stackoverflow.com/a/398120/376773
  		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
  		// Is firefox >= v31?
  		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
  		// Double check webkit in userAgent just in case we are in a worker
  		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }

  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
  	args[0] = (this.useColors ? '%c' : '') +
  		this.namespace +
  		(this.useColors ? ' %c' : ' ') +
  		args[0] +
  		(this.useColors ? '%c ' : ' ') +
  		'+' + module.exports.humanize(this.diff);

  	if (!this.useColors) {
  		return;
  	}

  	const c = 'color: ' + this.color;
  	args.splice(1, 0, c, 'color: inherit');

  	// The final "%c" is somewhat tricky, because there could be other
  	// arguments passed either before or after the %c, so we need to
  	// figure out the correct index to insert the CSS into
  	let index = 0;
  	let lastC = 0;
  	args[0].replace(/%[a-zA-Z%]/g, match => {
  		if (match === '%%') {
  			return;
  		}
  		index++;
  		if (match === '%c') {
  			// We only are interested in the *last* %c
  			// (the user may have provided their own)
  			lastC = index;
  		}
  	});

  	args.splice(lastC, 0, c);
  }

  /**
   * Invokes `console.debug()` when available.
   * No-op when `console.debug` is not a "function".
   * If `console.debug` is not available, falls back
   * to `console.log`.
   *
   * @api public
   */
  exports.log = console.debug || console.log || (() => {});

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */
  function save(namespaces) {
  	try {
  		if (namespaces) {
  			exports.storage.setItem('debug', namespaces);
  		} else {
  			exports.storage.removeItem('debug');
  		}
  	} catch (error) {
  		// Swallow
  		// XXX (@Qix-) should we be logging these?
  	}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */
  function load() {
  	let r;
  	try {
  		r = exports.storage.getItem('debug');
  	} catch (error) {
  		// Swallow
  		// XXX (@Qix-) should we be logging these?
  	}

  	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  	if (!r && typeof process !== 'undefined' && 'env' in process) {
  		r = process.env.DEBUG;
  	}

  	return r;
  }

  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
  	try {
  		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
  		// The Browser also has localStorage in the global context.
  		return localStorage;
  	} catch (error) {
  		// Swallow
  		// XXX (@Qix-) should we be logging these?
  	}
  }

  module.exports = common(exports);

  const {formatters} = module.exports;

  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  formatters.j = function (v) {
  	try {
  		return JSON.stringify(v);
  	} catch (error) {
  		return '[UnexpectedJSONParseError]: ' + error.message;
  	}
  };
  }(browser, browser.exports));

  Object.defineProperty(url$1, "__esModule", { value: true });
  url$1.url = void 0;
  const parseuri$1 = parseuri$2;
  const debug$7 = browser.exports("socket.io-client:url");
  /**
   * URL parser.
   *
   * @param uri - url
   * @param path - the request path of the connection
   * @param loc - An object meant to mimic window.location.
   *        Defaults to window.location.
   * @public
   */
  function url(uri, path = "", loc) {
      let obj = uri;
      // default to window.location
      loc = loc || (typeof location !== "undefined" && location);
      if (null == uri)
          uri = loc.protocol + "//" + loc.host;
      // relative path support
      if (typeof uri === "string") {
          if ("/" === uri.charAt(0)) {
              if ("/" === uri.charAt(1)) {
                  uri = loc.protocol + uri;
              }
              else {
                  uri = loc.host + uri;
              }
          }
          if (!/^(https?|wss?):\/\//.test(uri)) {
              debug$7("protocol-less url %s", uri);
              if ("undefined" !== typeof loc) {
                  uri = loc.protocol + "//" + uri;
              }
              else {
                  uri = "https://" + uri;
              }
          }
          // parse
          debug$7("parse %s", uri);
          obj = parseuri$1(uri);
      }
      // make sure we treat `localhost:80` and `localhost` equally
      if (!obj.port) {
          if (/^(http|ws)$/.test(obj.protocol)) {
              obj.port = "80";
          }
          else if (/^(http|ws)s$/.test(obj.protocol)) {
              obj.port = "443";
          }
      }
      obj.path = obj.path || "/";
      const ipv6 = obj.host.indexOf(":") !== -1;
      const host = ipv6 ? "[" + obj.host + "]" : obj.host;
      // define unique id
      obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
      // define href
      obj.href =
          obj.protocol +
              "://" +
              host +
              (loc && loc.port === obj.port ? "" : ":" + obj.port);
      return obj;
  }
  url$1.url = url;

  var manager = {};

  var lib$1 = {exports: {}};

  var transports$1 = {};

  var hasCors = {exports: {}};

  /**
   * Module exports.
   *
   * Logic borrowed from Modernizr:
   *
   *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
   */

  try {
    hasCors.exports = typeof XMLHttpRequest !== 'undefined' &&
      'withCredentials' in new XMLHttpRequest();
  } catch (err) {
    // if XMLHttp support is disabled in IE then it will throw
    // when trying to create
    hasCors.exports = false;
  }

  var globalThis_browser = (() => {
    if (typeof self !== "undefined") {
      return self;
    } else if (typeof window !== "undefined") {
      return window;
    } else {
      return Function("return this")();
    }
  })();

  // browser shim for xmlhttprequest module

  const hasCORS = hasCors.exports;
  const globalThis$4 = globalThis_browser;

  var xmlhttprequest = function(opts) {
    const xdomain = opts.xdomain;

    // scheme must be same when usign XDomainRequest
    // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
    const xscheme = opts.xscheme;

    // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
    // https://github.com/Automattic/engine.io-client/pull/217
    const enablesXDR = opts.enablesXDR;

    // XMLHttpRequest can be disabled on IE
    try {
      if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
        return new XMLHttpRequest();
      }
    } catch (e) {}

    // Use XDomainRequest for IE8 if enablesXDR is true
    // because loading bar keeps flashing when using jsonp-polling
    // https://github.com/yujiosaka/socke.io-ie8-loading-example
    try {
      if ("undefined" !== typeof XDomainRequest && !xscheme && enablesXDR) {
        return new XDomainRequest();
      }
    } catch (e) {}

    if (!xdomain) {
      try {
        return new globalThis$4[["Active"].concat("Object").join("X")](
          "Microsoft.XMLHTTP"
        );
      } catch (e) {}
    }
  };

  var pollingXhr = {exports: {}};

  const PACKET_TYPES$1 = Object.create(null); // no Map = no polyfill
  PACKET_TYPES$1["open"] = "0";
  PACKET_TYPES$1["close"] = "1";
  PACKET_TYPES$1["ping"] = "2";
  PACKET_TYPES$1["pong"] = "3";
  PACKET_TYPES$1["message"] = "4";
  PACKET_TYPES$1["upgrade"] = "5";
  PACKET_TYPES$1["noop"] = "6";

  const PACKET_TYPES_REVERSE$1 = Object.create(null);
  Object.keys(PACKET_TYPES$1).forEach(key => {
    PACKET_TYPES_REVERSE$1[PACKET_TYPES$1[key]] = key;
  });

  const ERROR_PACKET$1 = { type: "error", data: "parser error" };

  var commons = {
    PACKET_TYPES: PACKET_TYPES$1,
    PACKET_TYPES_REVERSE: PACKET_TYPES_REVERSE$1,
    ERROR_PACKET: ERROR_PACKET$1
  };

  const { PACKET_TYPES } = commons;

  const withNativeBlob$1 =
    typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
      Object.prototype.toString.call(Blob) === "[object BlobConstructor]");
  const withNativeArrayBuffer$2 = typeof ArrayBuffer === "function";

  // ArrayBuffer.isView method is not defined in IE10
  const isView$1 = obj => {
    return typeof ArrayBuffer.isView === "function"
      ? ArrayBuffer.isView(obj)
      : obj && obj.buffer instanceof ArrayBuffer;
  };

  const encodePacket$1 = ({ type, data }, supportsBinary, callback) => {
    if (withNativeBlob$1 && data instanceof Blob) {
      if (supportsBinary) {
        return callback(data);
      } else {
        return encodeBlobAsBase64(data, callback);
      }
    } else if (
      withNativeArrayBuffer$2 &&
      (data instanceof ArrayBuffer || isView$1(data))
    ) {
      if (supportsBinary) {
        return callback(data instanceof ArrayBuffer ? data : data.buffer);
      } else {
        return encodeBlobAsBase64(new Blob([data]), callback);
      }
    }
    // plain string
    return callback(PACKET_TYPES[type] + (data || ""));
  };

  const encodeBlobAsBase64 = (data, callback) => {
    const fileReader = new FileReader();
    fileReader.onload = function() {
      const content = fileReader.result.split(",")[1];
      callback("b" + content);
    };
    return fileReader.readAsDataURL(data);
  };

  var encodePacket_browser = encodePacket$1;

  var base64Arraybuffer = {};

  /*
   * base64-arraybuffer
   * https://github.com/niklasvh/base64-arraybuffer
   *
   * Copyright (c) 2012 Niklas von Hertzen
   * Licensed under the MIT license.
   */
  (function(chars){

    base64Arraybuffer.encode = function(arraybuffer) {
      var bytes = new Uint8Array(arraybuffer),
      i, len = bytes.length, base64 = "";

      for (i = 0; i < len; i+=3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        base64 += chars[bytes[i + 2] & 63];
      }

      if ((len % 3) === 2) {
        base64 = base64.substring(0, base64.length - 1) + "=";
      } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + "==";
      }

      return base64;
    };

    base64Arraybuffer.decode =  function(base64) {
      var bufferLength = base64.length * 0.75,
      len = base64.length, i, p = 0,
      encoded1, encoded2, encoded3, encoded4;

      if (base64[base64.length - 1] === "=") {
        bufferLength--;
        if (base64[base64.length - 2] === "=") {
          bufferLength--;
        }
      }

      var arraybuffer = new ArrayBuffer(bufferLength),
      bytes = new Uint8Array(arraybuffer);

      for (i = 0; i < len; i+=4) {
        encoded1 = chars.indexOf(base64[i]);
        encoded2 = chars.indexOf(base64[i+1]);
        encoded3 = chars.indexOf(base64[i+2]);
        encoded4 = chars.indexOf(base64[i+3]);

        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
      }

      return arraybuffer;
    };
  })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");

  const { PACKET_TYPES_REVERSE, ERROR_PACKET } = commons;

  const withNativeArrayBuffer$1 = typeof ArrayBuffer === "function";

  let base64decoder;
  if (withNativeArrayBuffer$1) {
    base64decoder = base64Arraybuffer;
  }

  const decodePacket$1 = (encodedPacket, binaryType) => {
    if (typeof encodedPacket !== "string") {
      return {
        type: "message",
        data: mapBinary(encodedPacket, binaryType)
      };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
      return {
        type: "message",
        data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
      };
    }
    const packetType = PACKET_TYPES_REVERSE[type];
    if (!packetType) {
      return ERROR_PACKET;
    }
    return encodedPacket.length > 1
      ? {
          type: PACKET_TYPES_REVERSE[type],
          data: encodedPacket.substring(1)
        }
      : {
          type: PACKET_TYPES_REVERSE[type]
        };
  };

  const decodeBase64Packet = (data, binaryType) => {
    if (base64decoder) {
      const decoded = base64decoder.decode(data);
      return mapBinary(decoded, binaryType);
    } else {
      return { base64: true, data }; // fallback for old browsers
    }
  };

  const mapBinary = (data, binaryType) => {
    switch (binaryType) {
      case "blob":
        return data instanceof ArrayBuffer ? new Blob([data]) : data;
      case "arraybuffer":
      default:
        return data; // assuming the data is already an ArrayBuffer
    }
  };

  var decodePacket_browser = decodePacket$1;

  const encodePacket = encodePacket_browser;
  const decodePacket = decodePacket_browser;

  const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text

  const encodePayload = (packets, callback) => {
    // some packets may be added to the array while encoding, so the initial length must be saved
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;

    packets.forEach((packet, i) => {
      // force base64 encoding for binary packets
      encodePacket(packet, false, encodedPacket => {
        encodedPackets[i] = encodedPacket;
        if (++count === length) {
          callback(encodedPackets.join(SEPARATOR));
        }
      });
    });
  };

  const decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i = 0; i < encodedPackets.length; i++) {
      const decodedPacket = decodePacket(encodedPackets[i], binaryType);
      packets.push(decodedPacket);
      if (decodedPacket.type === "error") {
        break;
      }
    }
    return packets;
  };

  var lib = {
    protocol: 4,
    encodePacket,
    encodePayload,
    decodePacket,
    decodePayload
  };

  var componentEmitter = {exports: {}};

  (function (module) {
  /**
   * Expose `Emitter`.
   */

  {
    module.exports = Emitter;
  }

  /**
   * Initialize a new `Emitter`.
   *
   * @api public
   */

  function Emitter(obj) {
    if (obj) return mixin(obj);
  }
  /**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */

  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }

  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.on =
  Emitter.prototype.addEventListener = function(event, fn){
    this._callbacks = this._callbacks || {};
    (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
      .push(fn);
    return this;
  };

  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.once = function(event, fn){
    function on() {
      this.off(event, on);
      fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
  };

  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.off =
  Emitter.prototype.removeListener =
  Emitter.prototype.removeAllListeners =
  Emitter.prototype.removeEventListener = function(event, fn){
    this._callbacks = this._callbacks || {};

    // all
    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    }

    // specific event
    var callbacks = this._callbacks['$' + event];
    if (!callbacks) return this;

    // remove all handlers
    if (1 == arguments.length) {
      delete this._callbacks['$' + event];
      return this;
    }

    // remove specific handler
    var cb;
    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }

    // Remove event specific arrays for event types that no
    // one is subscribed for to avoid memory leak.
    if (callbacks.length === 0) {
      delete this._callbacks['$' + event];
    }

    return this;
  };

  /**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */

  Emitter.prototype.emit = function(event){
    this._callbacks = this._callbacks || {};

    var args = new Array(arguments.length - 1)
      , callbacks = this._callbacks['$' + event];

    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }

    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }

    return this;
  };

  /**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */

  Emitter.prototype.listeners = function(event){
    this._callbacks = this._callbacks || {};
    return this._callbacks['$' + event] || [];
  };

  /**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */

  Emitter.prototype.hasListeners = function(event){
    return !! this.listeners(event).length;
  };
  }(componentEmitter));

  const parser$4 = lib;
  const Emitter$3 = componentEmitter.exports;
  const debug$6 = browser.exports("engine.io-client:transport");

  class Transport$2 extends Emitter$3 {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} options.
     * @api private
     */
    constructor(opts) {
      super();

      this.opts = opts;
      this.query = opts.query;
      this.readyState = "";
      this.socket = opts.socket;
    }

    /**
     * Emits an error.
     *
     * @param {String} str
     * @return {Transport} for chaining
     * @api public
     */
    onError(msg, desc) {
      const err = new Error(msg);
      err.type = "TransportError";
      err.description = desc;
      this.emit("error", err);
      return this;
    }

    /**
     * Opens the transport.
     *
     * @api public
     */
    open() {
      if ("closed" === this.readyState || "" === this.readyState) {
        this.readyState = "opening";
        this.doOpen();
      }

      return this;
    }

    /**
     * Closes the transport.
     *
     * @api private
     */
    close() {
      if ("opening" === this.readyState || "open" === this.readyState) {
        this.doClose();
        this.onClose();
      }

      return this;
    }

    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     * @api private
     */
    send(packets) {
      if ("open" === this.readyState) {
        this.write(packets);
      } else {
        // this might happen if the transport was silently closed in the beforeunload event handler
        debug$6("transport is not open, discarding packets");
      }
    }

    /**
     * Called upon open
     *
     * @api private
     */
    onOpen() {
      this.readyState = "open";
      this.writable = true;
      this.emit("open");
    }

    /**
     * Called with data.
     *
     * @param {String} data
     * @api private
     */
    onData(data) {
      const packet = parser$4.decodePacket(data, this.socket.binaryType);
      this.onPacket(packet);
    }

    /**
     * Called with a decoded packet.
     */
    onPacket(packet) {
      this.emit("packet", packet);
    }

    /**
     * Called upon close.
     *
     * @api private
     */
    onClose() {
      this.readyState = "closed";
      this.emit("close");
    }
  }

  var transport = Transport$2;

  var parseqs$3 = {};

  /**
   * Compiles a querystring
   * Returns string representation of the object
   *
   * @param {Object}
   * @api private
   */

  parseqs$3.encode = function (obj) {
    var str = '';

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (str.length) str += '&';
        str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
      }
    }

    return str;
  };

  /**
   * Parses a simple querystring into an object
   *
   * @param {String} qs
   * @api private
   */

  parseqs$3.decode = function(qs){
    var qry = {};
    var pairs = qs.split('&');
    for (var i = 0, l = pairs.length; i < l; i++) {
      var pair = pairs[i].split('=');
      qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
  };

  var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
    , length = 64
    , map = {}
    , seed = 0
    , i = 0
    , prev;

  /**
   * Return a string representing the specified number.
   *
   * @param {Number} num The number to convert.
   * @returns {String} The string representation of the number.
   * @api public
   */
  function encode(num) {
    var encoded = '';

    do {
      encoded = alphabet[num % length] + encoded;
      num = Math.floor(num / length);
    } while (num > 0);

    return encoded;
  }

  /**
   * Return the integer value specified by the given string.
   *
   * @param {String} str The string to convert.
   * @returns {Number} The integer value represented by the string.
   * @api public
   */
  function decode(str) {
    var decoded = 0;

    for (i = 0; i < str.length; i++) {
      decoded = decoded * length + map[str.charAt(i)];
    }

    return decoded;
  }

  /**
   * Yeast: A tiny growing id generator.
   *
   * @returns {String} A unique id.
   * @api public
   */
  function yeast$2() {
    var now = encode(+new Date());

    if (now !== prev) return seed = 0, prev = now;
    return now +'.'+ encode(seed++);
  }

  //
  // Map each character to its index.
  //
  for (; i < length; i++) map[alphabet[i]] = i;

  //
  // Expose the `yeast`, `encode` and `decode` functions.
  //
  yeast$2.encode = encode;
  yeast$2.decode = decode;
  var yeast_1 = yeast$2;

  const Transport$1 = transport;
  const parseqs$2 = parseqs$3;
  const parser$3 = lib;
  const yeast$1 = yeast_1;

  const debug$5 = browser.exports("engine.io-client:polling");

  class Polling$2 extends Transport$1 {
    /**
     * Transport name.
     */
    get name() {
      return "polling";
    }

    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @api private
     */
    doOpen() {
      this.poll();
    }

    /**
     * Pauses polling.
     *
     * @param {Function} callback upon buffers are flushed and transport is paused
     * @api private
     */
    pause(onPause) {
      this.readyState = "pausing";

      const pause = () => {
        debug$5("paused");
        this.readyState = "paused";
        onPause();
      };

      if (this.polling || !this.writable) {
        let total = 0;

        if (this.polling) {
          debug$5("we are currently polling - waiting to pause");
          total++;
          this.once("pollComplete", function() {
            debug$5("pre-pause polling complete");
            --total || pause();
          });
        }

        if (!this.writable) {
          debug$5("we are currently writing - waiting to pause");
          total++;
          this.once("drain", function() {
            debug$5("pre-pause writing complete");
            --total || pause();
          });
        }
      } else {
        pause();
      }
    }

    /**
     * Starts polling cycle.
     *
     * @api public
     */
    poll() {
      debug$5("polling");
      this.polling = true;
      this.doPoll();
      this.emit("poll");
    }

    /**
     * Overloads onData to detect payloads.
     *
     * @api private
     */
    onData(data) {
      debug$5("polling got data %s", data);
      const callback = packet => {
        // if its the first message we consider the transport open
        if ("opening" === this.readyState && packet.type === "open") {
          this.onOpen();
        }

        // if its a close packet, we close the ongoing requests
        if ("close" === packet.type) {
          this.onClose();
          return false;
        }

        // otherwise bypass onData and handle the message
        this.onPacket(packet);
      };

      // decode payload
      parser$3.decodePayload(data, this.socket.binaryType).forEach(callback);

      // if an event did not trigger closing
      if ("closed" !== this.readyState) {
        // if we got data we're not polling
        this.polling = false;
        this.emit("pollComplete");

        if ("open" === this.readyState) {
          this.poll();
        } else {
          debug$5('ignoring poll - transport state "%s"', this.readyState);
        }
      }
    }

    /**
     * For polling, send a close packet.
     *
     * @api private
     */
    doClose() {
      const close = () => {
        debug$5("writing close packet");
        this.write([{ type: "close" }]);
      };

      if ("open" === this.readyState) {
        debug$5("transport open - closing");
        close();
      } else {
        // in case we're trying to close while
        // handshaking is in progress (GH-164)
        debug$5("transport not open - deferring close");
        this.once("open", close);
      }
    }

    /**
     * Writes a packets payload.
     *
     * @param {Array} data packets
     * @param {Function} drain callback
     * @api private
     */
    write(packets) {
      this.writable = false;

      parser$3.encodePayload(packets, data => {
        this.doWrite(data, () => {
          this.writable = true;
          this.emit("drain");
        });
      });
    }

    /**
     * Generates uri for connection.
     *
     * @api private
     */
    uri() {
      let query = this.query || {};
      const schema = this.opts.secure ? "https" : "http";
      let port = "";

      // cache busting is forced
      if (false !== this.opts.timestampRequests) {
        query[this.opts.timestampParam] = yeast$1();
      }

      if (!this.supportsBinary && !query.sid) {
        query.b64 = 1;
      }

      query = parseqs$2.encode(query);

      // avoid port if default for schema
      if (
        this.opts.port &&
        (("https" === schema && Number(this.opts.port) !== 443) ||
          ("http" === schema && Number(this.opts.port) !== 80))
      ) {
        port = ":" + this.opts.port;
      }

      // prepend ? to query
      if (query.length) {
        query = "?" + query;
      }

      const ipv6 = this.opts.hostname.indexOf(":") !== -1;
      return (
        schema +
        "://" +
        (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
        port +
        this.opts.path +
        query
      );
    }
  }

  var polling$1 = Polling$2;

  var util = {};

  util.pick = (obj, ...attr) => {
    return attr.reduce((acc, k) => {
      if (obj.hasOwnProperty(k)) {
        acc[k] = obj[k];
      }
      return acc;
    }, {});
  };

  /* global attachEvent */

  const XMLHttpRequest$2 = xmlhttprequest;
  const Polling$1 = polling$1;
  const Emitter$2 = componentEmitter.exports;
  const { pick: pick$1 } = util;
  const globalThis$3 = globalThis_browser;

  const debug$4 = browser.exports("engine.io-client:polling-xhr");

  /**
   * Empty function
   */

  function empty() {}

  const hasXHR2 = (function() {
    const xhr = new XMLHttpRequest$2({ xdomain: false });
    return null != xhr.responseType;
  })();

  class XHR$1 extends Polling$1 {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @api public
     */
    constructor(opts) {
      super(opts);

      if (typeof location !== "undefined") {
        const isSSL = "https:" === location.protocol;
        let port = location.port;

        // some user agents have empty `location.port`
        if (!port) {
          port = isSSL ? 443 : 80;
        }

        this.xd =
          (typeof location !== "undefined" &&
            opts.hostname !== location.hostname) ||
          port !== opts.port;
        this.xs = opts.secure !== isSSL;
      }
      /**
       * XHR supports binary
       */
      const forceBase64 = opts && opts.forceBase64;
      this.supportsBinary = hasXHR2 && !forceBase64;
    }

    /**
     * Creates a request.
     *
     * @param {String} method
     * @api private
     */
    request(opts = {}) {
      Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
      return new Request(this.uri(), opts);
    }

    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @api private
     */
    doWrite(data, fn) {
      const req = this.request({
        method: "POST",
        data: data
      });
      req.on("success", fn);
      req.on("error", err => {
        this.onError("xhr post error", err);
      });
    }

    /**
     * Starts a poll cycle.
     *
     * @api private
     */
    doPoll() {
      debug$4("xhr poll");
      const req = this.request();
      req.on("data", this.onData.bind(this));
      req.on("error", err => {
        this.onError("xhr poll error", err);
      });
      this.pollXhr = req;
    }
  }

  class Request extends Emitter$2 {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @api public
     */
    constructor(uri, opts) {
      super();
      this.opts = opts;

      this.method = opts.method || "GET";
      this.uri = uri;
      this.async = false !== opts.async;
      this.data = undefined !== opts.data ? opts.data : null;

      this.create();
    }

    /**
     * Creates the XHR object and sends the request.
     *
     * @api private
     */
    create() {
      const opts = pick$1(
        this.opts,
        "agent",
        "enablesXDR",
        "pfx",
        "key",
        "passphrase",
        "cert",
        "ca",
        "ciphers",
        "rejectUnauthorized",
        "autoUnref"
      );
      opts.xdomain = !!this.opts.xd;
      opts.xscheme = !!this.opts.xs;

      const xhr = (this.xhr = new XMLHttpRequest$2(opts));

      try {
        debug$4("xhr open %s: %s", this.method, this.uri);
        xhr.open(this.method, this.uri, this.async);
        try {
          if (this.opts.extraHeaders) {
            xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
            for (let i in this.opts.extraHeaders) {
              if (this.opts.extraHeaders.hasOwnProperty(i)) {
                xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
              }
            }
          }
        } catch (e) {}

        if ("POST" === this.method) {
          try {
            xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
          } catch (e) {}
        }

        try {
          xhr.setRequestHeader("Accept", "*/*");
        } catch (e) {}

        // ie6 check
        if ("withCredentials" in xhr) {
          xhr.withCredentials = this.opts.withCredentials;
        }

        if (this.opts.requestTimeout) {
          xhr.timeout = this.opts.requestTimeout;
        }

        if (this.hasXDR()) {
          xhr.onload = () => {
            this.onLoad();
          };
          xhr.onerror = () => {
            this.onError(xhr.responseText);
          };
        } else {
          xhr.onreadystatechange = () => {
            if (4 !== xhr.readyState) return;
            if (200 === xhr.status || 1223 === xhr.status) {
              this.onLoad();
            } else {
              // make sure the `error` event handler that's user-set
              // does not throw in the same tick and gets caught here
              setTimeout(() => {
                this.onError(typeof xhr.status === "number" ? xhr.status : 0);
              }, 0);
            }
          };
        }

        debug$4("xhr data %s", this.data);
        xhr.send(this.data);
      } catch (e) {
        // Need to defer since .create() is called directly from the constructor
        // and thus the 'error' event can only be only bound *after* this exception
        // occurs.  Therefore, also, we cannot throw here at all.
        setTimeout(() => {
          this.onError(e);
        }, 0);
        return;
      }

      if (typeof document !== "undefined") {
        this.index = Request.requestsCount++;
        Request.requests[this.index] = this;
      }
    }

    /**
     * Called upon successful response.
     *
     * @api private
     */
    onSuccess() {
      this.emit("success");
      this.cleanup();
    }

    /**
     * Called if we have data.
     *
     * @api private
     */
    onData(data) {
      this.emit("data", data);
      this.onSuccess();
    }

    /**
     * Called upon error.
     *
     * @api private
     */
    onError(err) {
      this.emit("error", err);
      this.cleanup(true);
    }

    /**
     * Cleans up house.
     *
     * @api private
     */
    cleanup(fromError) {
      if ("undefined" === typeof this.xhr || null === this.xhr) {
        return;
      }
      // xmlhttprequest
      if (this.hasXDR()) {
        this.xhr.onload = this.xhr.onerror = empty;
      } else {
        this.xhr.onreadystatechange = empty;
      }

      if (fromError) {
        try {
          this.xhr.abort();
        } catch (e) {}
      }

      if (typeof document !== "undefined") {
        delete Request.requests[this.index];
      }

      this.xhr = null;
    }

    /**
     * Called upon load.
     *
     * @api private
     */
    onLoad() {
      const data = this.xhr.responseText;
      if (data !== null) {
        this.onData(data);
      }
    }

    /**
     * Check if it has XDomainRequest.
     *
     * @api private
     */
    hasXDR() {
      return typeof XDomainRequest !== "undefined" && !this.xs && this.enablesXDR;
    }

    /**
     * Aborts the request.
     *
     * @api public
     */
    abort() {
      this.cleanup();
    }
  }

  /**
   * Aborts pending requests when unloading the window. This is needed to prevent
   * memory leaks (e.g. when using IE) and to ensure that no spurious error is
   * emitted.
   */

  Request.requestsCount = 0;
  Request.requests = {};

  if (typeof document !== "undefined") {
    if (typeof attachEvent === "function") {
      attachEvent("onunload", unloadHandler);
    } else if (typeof addEventListener === "function") {
      const terminationEvent = "onpagehide" in globalThis$3 ? "pagehide" : "unload";
      addEventListener(terminationEvent, unloadHandler, false);
    }
  }

  function unloadHandler() {
    for (let i in Request.requests) {
      if (Request.requests.hasOwnProperty(i)) {
        Request.requests[i].abort();
      }
    }
  }

  pollingXhr.exports = XHR$1;
  pollingXhr.exports.Request = Request;

  const Polling = polling$1;
  const globalThis$2 = globalThis_browser;

  const rNewline = /\n/g;
  const rEscapedNewline = /\\n/g;

  /**
   * Global JSONP callbacks.
   */

  let callbacks;

  class JSONPPolling extends Polling {
    /**
     * JSONP Polling constructor.
     *
     * @param {Object} opts.
     * @api public
     */
    constructor(opts) {
      super(opts);

      this.query = this.query || {};

      // define global callbacks array if not present
      // we do this here (lazily) to avoid unneeded global pollution
      if (!callbacks) {
        // we need to consider multiple engines in the same page
        callbacks = globalThis$2.___eio = globalThis$2.___eio || [];
      }

      // callback identifier
      this.index = callbacks.length;

      // add callback to jsonp global
      callbacks.push(this.onData.bind(this));

      // append to query string
      this.query.j = this.index;
    }

    /**
     * JSONP only supports binary as base64 encoded strings
     */
    get supportsBinary() {
      return false;
    }

    /**
     * Closes the socket.
     *
     * @api private
     */
    doClose() {
      if (this.script) {
        // prevent spurious errors from being emitted when the window is unloaded
        this.script.onerror = () => {};
        this.script.parentNode.removeChild(this.script);
        this.script = null;
      }

      if (this.form) {
        this.form.parentNode.removeChild(this.form);
        this.form = null;
        this.iframe = null;
      }

      super.doClose();
    }

    /**
     * Starts a poll cycle.
     *
     * @api private
     */
    doPoll() {
      const script = document.createElement("script");

      if (this.script) {
        this.script.parentNode.removeChild(this.script);
        this.script = null;
      }

      script.async = true;
      script.src = this.uri();
      script.onerror = e => {
        this.onError("jsonp poll error", e);
      };

      const insertAt = document.getElementsByTagName("script")[0];
      if (insertAt) {
        insertAt.parentNode.insertBefore(script, insertAt);
      } else {
        (document.head || document.body).appendChild(script);
      }
      this.script = script;

      const isUAgecko =
        "undefined" !== typeof navigator && /gecko/i.test(navigator.userAgent);

      if (isUAgecko) {
        setTimeout(function() {
          const iframe = document.createElement("iframe");
          document.body.appendChild(iframe);
          document.body.removeChild(iframe);
        }, 100);
      }
    }

    /**
     * Writes with a hidden iframe.
     *
     * @param {String} data to send
     * @param {Function} called upon flush.
     * @api private
     */
    doWrite(data, fn) {
      let iframe;

      if (!this.form) {
        const form = document.createElement("form");
        const area = document.createElement("textarea");
        const id = (this.iframeId = "eio_iframe_" + this.index);

        form.className = "socketio";
        form.style.position = "absolute";
        form.style.top = "-1000px";
        form.style.left = "-1000px";
        form.target = id;
        form.method = "POST";
        form.setAttribute("accept-charset", "utf-8");
        area.name = "d";
        form.appendChild(area);
        document.body.appendChild(form);

        this.form = form;
        this.area = area;
      }

      this.form.action = this.uri();

      function complete() {
        initIframe();
        fn();
      }

      const initIframe = () => {
        if (this.iframe) {
          try {
            this.form.removeChild(this.iframe);
          } catch (e) {
            this.onError("jsonp polling iframe removal error", e);
          }
        }

        try {
          // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
          const html = '<iframe src="javascript:0" name="' + this.iframeId + '">';
          iframe = document.createElement(html);
        } catch (e) {
          iframe = document.createElement("iframe");
          iframe.name = this.iframeId;
          iframe.src = "javascript:0";
        }

        iframe.id = this.iframeId;

        this.form.appendChild(iframe);
        this.iframe = iframe;
      };

      initIframe();

      // escape \n to prevent it from being converted into \r\n by some UAs
      // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
      data = data.replace(rEscapedNewline, "\\\n");
      this.area.value = data.replace(rNewline, "\\n");

      try {
        this.form.submit();
      } catch (e) {}

      if (this.iframe.attachEvent) {
        this.iframe.onreadystatechange = () => {
          if (this.iframe.readyState === "complete") {
            complete();
          }
        };
      } else {
        this.iframe.onload = complete;
      }
    }
  }

  var pollingJsonp = JSONPPolling;

  const globalThis$1 = globalThis_browser;

  var websocketConstructor_browser = {
    WebSocket: globalThis$1.WebSocket || globalThis$1.MozWebSocket,
    usingBrowserWebSocket: true,
    defaultBinaryType: "arraybuffer"
  };

  const Transport = transport;
  const parser$2 = lib;
  const parseqs$1 = parseqs$3;
  const yeast = yeast_1;
  const { pick } = util;
  const {
    WebSocket,
    usingBrowserWebSocket,
    defaultBinaryType
  } = websocketConstructor_browser;

  const debug$3 = browser.exports("engine.io-client:websocket");

  // detect ReactNative environment
  const isReactNative =
    typeof navigator !== "undefined" &&
    typeof navigator.product === "string" &&
    navigator.product.toLowerCase() === "reactnative";

  class WS extends Transport {
    /**
     * WebSocket transport constructor.
     *
     * @api {Object} connection options
     * @api public
     */
    constructor(opts) {
      super(opts);

      this.supportsBinary = !opts.forceBase64;
    }

    /**
     * Transport name.
     *
     * @api public
     */
    get name() {
      return "websocket";
    }

    /**
     * Opens socket.
     *
     * @api private
     */
    doOpen() {
      if (!this.check()) {
        // let probe timeout
        return;
      }

      const uri = this.uri();
      const protocols = this.opts.protocols;

      // React Native only supports the 'headers' option, and will print a warning if anything else is passed
      const opts = isReactNative
        ? {}
        : pick(
            this.opts,
            "agent",
            "perMessageDeflate",
            "pfx",
            "key",
            "passphrase",
            "cert",
            "ca",
            "ciphers",
            "rejectUnauthorized",
            "localAddress",
            "protocolVersion",
            "origin",
            "maxPayload",
            "family",
            "checkServerIdentity"
          );

      if (this.opts.extraHeaders) {
        opts.headers = this.opts.extraHeaders;
      }

      try {
        this.ws =
          usingBrowserWebSocket && !isReactNative
            ? protocols
              ? new WebSocket(uri, protocols)
              : new WebSocket(uri)
            : new WebSocket(uri, protocols, opts);
      } catch (err) {
        return this.emit("error", err);
      }

      this.ws.binaryType = this.socket.binaryType || defaultBinaryType;

      this.addEventListeners();
    }

    /**
     * Adds event listeners to the socket
     *
     * @api private
     */
    addEventListeners() {
      this.ws.onopen = () => {
        if (this.opts.autoUnref) {
          this.ws._socket.unref();
        }
        this.onOpen();
      };
      this.ws.onclose = this.onClose.bind(this);
      this.ws.onmessage = ev => this.onData(ev.data);
      this.ws.onerror = e => this.onError("websocket error", e);
    }

    /**
     * Writes data to socket.
     *
     * @param {Array} array of packets.
     * @api private
     */
    write(packets) {
      this.writable = false;

      // encodePacket efficient as it uses WS framing
      // no need for encodePayload
      for (let i = 0; i < packets.length; i++) {
        const packet = packets[i];
        const lastPacket = i === packets.length - 1;

        parser$2.encodePacket(packet, this.supportsBinary, data => {
          // always create a new object (GH-437)
          const opts = {};
          if (!usingBrowserWebSocket) {
            if (packet.options) {
              opts.compress = packet.options.compress;
            }

            if (this.opts.perMessageDeflate) {
              const len =
                "string" === typeof data ? Buffer.byteLength(data) : data.length;
              if (len < this.opts.perMessageDeflate.threshold) {
                opts.compress = false;
              }
            }
          }

          // Sometimes the websocket has already been closed but the browser didn't
          // have a chance of informing us about it yet, in that case send will
          // throw an error
          try {
            if (usingBrowserWebSocket) {
              // TypeError is thrown when passing the second argument on Safari
              this.ws.send(data);
            } else {
              this.ws.send(data, opts);
            }
          } catch (e) {
            debug$3("websocket closed before onclose event");
          }

          if (lastPacket) {
            // fake drain
            // defer to next tick to allow Socket to clear writeBuffer
            setTimeout(() => {
              this.writable = true;
              this.emit("drain");
            }, 0);
          }
        });
      }
    }

    /**
     * Called upon close
     *
     * @api private
     */
    onClose() {
      Transport.prototype.onClose.call(this);
    }

    /**
     * Closes socket.
     *
     * @api private
     */
    doClose() {
      if (typeof this.ws !== "undefined") {
        this.ws.close();
        this.ws = null;
      }
    }

    /**
     * Generates uri for connection.
     *
     * @api private
     */
    uri() {
      let query = this.query || {};
      const schema = this.opts.secure ? "wss" : "ws";
      let port = "";

      // avoid port if default for schema
      if (
        this.opts.port &&
        (("wss" === schema && Number(this.opts.port) !== 443) ||
          ("ws" === schema && Number(this.opts.port) !== 80))
      ) {
        port = ":" + this.opts.port;
      }

      // append timestamp to URI
      if (this.opts.timestampRequests) {
        query[this.opts.timestampParam] = yeast();
      }

      // communicate binary support capabilities
      if (!this.supportsBinary) {
        query.b64 = 1;
      }

      query = parseqs$1.encode(query);

      // prepend ? to query
      if (query.length) {
        query = "?" + query;
      }

      const ipv6 = this.opts.hostname.indexOf(":") !== -1;
      return (
        schema +
        "://" +
        (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
        port +
        this.opts.path +
        query
      );
    }

    /**
     * Feature detection for WebSocket.
     *
     * @return {Boolean} whether this transport is available.
     * @api public
     */
    check() {
      return (
        !!WebSocket &&
        !("__initialize" in WebSocket && this.name === WS.prototype.name)
      );
    }
  }

  var websocket$1 = WS;

  const XMLHttpRequest$1 = xmlhttprequest;
  const XHR = pollingXhr.exports;
  const JSONP = pollingJsonp;
  const websocket = websocket$1;

  transports$1.polling = polling;
  transports$1.websocket = websocket;

  /**
   * Polling transport polymorphic constructor.
   * Decides on xhr vs jsonp based on feature detection.
   *
   * @api private
   */

  function polling(opts) {
    let xhr;
    let xd = false;
    let xs = false;
    const jsonp = false !== opts.jsonp;

    if (typeof location !== "undefined") {
      const isSSL = "https:" === location.protocol;
      let port = location.port;

      // some user agents have empty `location.port`
      if (!port) {
        port = isSSL ? 443 : 80;
      }

      xd = opts.hostname !== location.hostname || port !== opts.port;
      xs = opts.secure !== isSSL;
    }

    opts.xdomain = xd;
    opts.xscheme = xs;
    xhr = new XMLHttpRequest$1(opts);

    if ("open" in xhr && !opts.forceJSONP) {
      return new XHR(opts);
    } else {
      if (!jsonp) throw new Error("JSONP disabled");
      return new JSONP(opts);
    }
  }

  const transports = transports$1;
  const Emitter$1 = componentEmitter.exports;
  const debug$2 = browser.exports("engine.io-client:socket");
  const parser$1 = lib;
  const parseuri = parseuri$2;
  const parseqs = parseqs$3;

  class Socket$2 extends Emitter$1 {
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri or options
     * @param {Object} options
     * @api public
     */
    constructor(uri, opts = {}) {
      super();

      if (uri && "object" === typeof uri) {
        opts = uri;
        uri = null;
      }

      if (uri) {
        uri = parseuri(uri);
        opts.hostname = uri.host;
        opts.secure = uri.protocol === "https" || uri.protocol === "wss";
        opts.port = uri.port;
        if (uri.query) opts.query = uri.query;
      } else if (opts.host) {
        opts.hostname = parseuri(opts.host).host;
      }

      this.secure =
        null != opts.secure
          ? opts.secure
          : typeof location !== "undefined" && "https:" === location.protocol;

      if (opts.hostname && !opts.port) {
        // if no port is specified manually, use the protocol default
        opts.port = this.secure ? "443" : "80";
      }

      this.hostname =
        opts.hostname ||
        (typeof location !== "undefined" ? location.hostname : "localhost");
      this.port =
        opts.port ||
        (typeof location !== "undefined" && location.port
          ? location.port
          : this.secure
          ? 443
          : 80);

      this.transports = opts.transports || ["polling", "websocket"];
      this.readyState = "";
      this.writeBuffer = [];
      this.prevBufferLen = 0;

      this.opts = Object.assign(
        {
          path: "/engine.io",
          agent: false,
          withCredentials: false,
          upgrade: true,
          jsonp: true,
          timestampParam: "t",
          rememberUpgrade: false,
          rejectUnauthorized: true,
          perMessageDeflate: {
            threshold: 1024
          },
          transportOptions: {},
          closeOnBeforeunload: true
        },
        opts
      );

      this.opts.path = this.opts.path.replace(/\/$/, "") + "/";

      if (typeof this.opts.query === "string") {
        this.opts.query = parseqs.decode(this.opts.query);
      }

      // set on handshake
      this.id = null;
      this.upgrades = null;
      this.pingInterval = null;
      this.pingTimeout = null;

      // set on heartbeat
      this.pingTimeoutTimer = null;

      if (typeof addEventListener === "function") {
        if (this.opts.closeOnBeforeunload) {
          // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
          // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
          // closed/reloaded)
          addEventListener(
            "beforeunload",
            () => {
              if (this.transport) {
                // silently close the transport
                this.transport.removeAllListeners();
                this.transport.close();
              }
            },
            false
          );
        }
        if (this.hostname !== "localhost") {
          this.offlineEventListener = () => {
            this.onClose("transport close");
          };
          addEventListener("offline", this.offlineEventListener, false);
        }
      }

      this.open();
    }

    /**
     * Creates transport of the given type.
     *
     * @param {String} transport name
     * @return {Transport}
     * @api private
     */
    createTransport(name) {
      debug$2('creating transport "%s"', name);
      const query = clone(this.opts.query);

      // append engine.io protocol identifier
      query.EIO = parser$1.protocol;

      // transport name
      query.transport = name;

      // session id if we already have one
      if (this.id) query.sid = this.id;

      const opts = Object.assign(
        {},
        this.opts.transportOptions[name],
        this.opts,
        {
          query,
          socket: this,
          hostname: this.hostname,
          secure: this.secure,
          port: this.port
        }
      );

      debug$2("options: %j", opts);

      return new transports[name](opts);
    }

    /**
     * Initializes transport to use and starts probe.
     *
     * @api private
     */
    open() {
      let transport;
      if (
        this.opts.rememberUpgrade &&
        Socket$2.priorWebsocketSuccess &&
        this.transports.indexOf("websocket") !== -1
      ) {
        transport = "websocket";
      } else if (0 === this.transports.length) {
        // Emit error on next tick so it can be listened to
        setTimeout(() => {
          this.emit("error", "No transports available");
        }, 0);
        return;
      } else {
        transport = this.transports[0];
      }
      this.readyState = "opening";

      // Retry with the next transport if the transport is disabled (jsonp: false)
      try {
        transport = this.createTransport(transport);
      } catch (e) {
        debug$2("error while creating transport: %s", e);
        this.transports.shift();
        this.open();
        return;
      }

      transport.open();
      this.setTransport(transport);
    }

    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @api private
     */
    setTransport(transport) {
      debug$2("setting transport %s", transport.name);

      if (this.transport) {
        debug$2("clearing existing transport %s", this.transport.name);
        this.transport.removeAllListeners();
      }

      // set up transport
      this.transport = transport;

      // set up transport listeners
      transport
        .on("drain", this.onDrain.bind(this))
        .on("packet", this.onPacket.bind(this))
        .on("error", this.onError.bind(this))
        .on("close", () => {
          this.onClose("transport close");
        });
    }

    /**
     * Probes a transport.
     *
     * @param {String} transport name
     * @api private
     */
    probe(name) {
      debug$2('probing transport "%s"', name);
      let transport = this.createTransport(name, { probe: 1 });
      let failed = false;

      Socket$2.priorWebsocketSuccess = false;

      const onTransportOpen = () => {
        if (failed) return;

        debug$2('probe transport "%s" opened', name);
        transport.send([{ type: "ping", data: "probe" }]);
        transport.once("packet", msg => {
          if (failed) return;
          if ("pong" === msg.type && "probe" === msg.data) {
            debug$2('probe transport "%s" pong', name);
            this.upgrading = true;
            this.emit("upgrading", transport);
            if (!transport) return;
            Socket$2.priorWebsocketSuccess = "websocket" === transport.name;

            debug$2('pausing current transport "%s"', this.transport.name);
            this.transport.pause(() => {
              if (failed) return;
              if ("closed" === this.readyState) return;
              debug$2("changing transport and sending upgrade packet");

              cleanup();

              this.setTransport(transport);
              transport.send([{ type: "upgrade" }]);
              this.emit("upgrade", transport);
              transport = null;
              this.upgrading = false;
              this.flush();
            });
          } else {
            debug$2('probe transport "%s" failed', name);
            const err = new Error("probe error");
            err.transport = transport.name;
            this.emit("upgradeError", err);
          }
        });
      };

      function freezeTransport() {
        if (failed) return;

        // Any callback called by transport should be ignored since now
        failed = true;

        cleanup();

        transport.close();
        transport = null;
      }

      // Handle any error that happens while probing
      const onerror = err => {
        const error = new Error("probe error: " + err);
        error.transport = transport.name;

        freezeTransport();

        debug$2('probe transport "%s" failed because of error: %s', name, err);

        this.emit("upgradeError", error);
      };

      function onTransportClose() {
        onerror("transport closed");
      }

      // When the socket is closed while we're probing
      function onclose() {
        onerror("socket closed");
      }

      // When the socket is upgraded while we're probing
      function onupgrade(to) {
        if (transport && to.name !== transport.name) {
          debug$2('"%s" works - aborting "%s"', to.name, transport.name);
          freezeTransport();
        }
      }

      // Remove all listeners on the transport and on self
      const cleanup = () => {
        transport.removeListener("open", onTransportOpen);
        transport.removeListener("error", onerror);
        transport.removeListener("close", onTransportClose);
        this.removeListener("close", onclose);
        this.removeListener("upgrading", onupgrade);
      };

      transport.once("open", onTransportOpen);
      transport.once("error", onerror);
      transport.once("close", onTransportClose);

      this.once("close", onclose);
      this.once("upgrading", onupgrade);

      transport.open();
    }

    /**
     * Called when connection is deemed open.
     *
     * @api public
     */
    onOpen() {
      debug$2("socket open");
      this.readyState = "open";
      Socket$2.priorWebsocketSuccess = "websocket" === this.transport.name;
      this.emit("open");
      this.flush();

      // we check for `readyState` in case an `open`
      // listener already closed the socket
      if (
        "open" === this.readyState &&
        this.opts.upgrade &&
        this.transport.pause
      ) {
        debug$2("starting upgrade probes");
        let i = 0;
        const l = this.upgrades.length;
        for (; i < l; i++) {
          this.probe(this.upgrades[i]);
        }
      }
    }

    /**
     * Handles a packet.
     *
     * @api private
     */
    onPacket(packet) {
      if (
        "opening" === this.readyState ||
        "open" === this.readyState ||
        "closing" === this.readyState
      ) {
        debug$2('socket receive: type "%s", data "%s"', packet.type, packet.data);

        this.emit("packet", packet);

        // Socket is live - any packet counts
        this.emit("heartbeat");

        switch (packet.type) {
          case "open":
            this.onHandshake(JSON.parse(packet.data));
            break;

          case "ping":
            this.resetPingTimeout();
            this.sendPacket("pong");
            this.emit("pong");
            break;

          case "error":
            const err = new Error("server error");
            err.code = packet.data;
            this.onError(err);
            break;

          case "message":
            this.emit("data", packet.data);
            this.emit("message", packet.data);
            break;
        }
      } else {
        debug$2('packet received with socket readyState "%s"', this.readyState);
      }
    }

    /**
     * Called upon handshake completion.
     *
     * @param {Object} handshake obj
     * @api private
     */
    onHandshake(data) {
      this.emit("handshake", data);
      this.id = data.sid;
      this.transport.query.sid = data.sid;
      this.upgrades = this.filterUpgrades(data.upgrades);
      this.pingInterval = data.pingInterval;
      this.pingTimeout = data.pingTimeout;
      this.onOpen();
      // In case open handler closes socket
      if ("closed" === this.readyState) return;
      this.resetPingTimeout();
    }

    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @api private
     */
    resetPingTimeout() {
      clearTimeout(this.pingTimeoutTimer);
      this.pingTimeoutTimer = setTimeout(() => {
        this.onClose("ping timeout");
      }, this.pingInterval + this.pingTimeout);
      if (this.opts.autoUnref) {
        this.pingTimeoutTimer.unref();
      }
    }

    /**
     * Called on `drain` event
     *
     * @api private
     */
    onDrain() {
      this.writeBuffer.splice(0, this.prevBufferLen);

      // setting prevBufferLen = 0 is very important
      // for example, when upgrading, upgrade packet is sent over,
      // and a nonzero prevBufferLen could cause problems on `drain`
      this.prevBufferLen = 0;

      if (0 === this.writeBuffer.length) {
        this.emit("drain");
      } else {
        this.flush();
      }
    }

    /**
     * Flush write buffers.
     *
     * @api private
     */
    flush() {
      if (
        "closed" !== this.readyState &&
        this.transport.writable &&
        !this.upgrading &&
        this.writeBuffer.length
      ) {
        debug$2("flushing %d packets in socket", this.writeBuffer.length);
        this.transport.send(this.writeBuffer);
        // keep track of current length of writeBuffer
        // splice writeBuffer and callbackBuffer on `drain`
        this.prevBufferLen = this.writeBuffer.length;
        this.emit("flush");
      }
    }

    /**
     * Sends a message.
     *
     * @param {String} message.
     * @param {Function} callback function.
     * @param {Object} options.
     * @return {Socket} for chaining.
     * @api public
     */
    write(msg, options, fn) {
      this.sendPacket("message", msg, options, fn);
      return this;
    }

    send(msg, options, fn) {
      this.sendPacket("message", msg, options, fn);
      return this;
    }

    /**
     * Sends a packet.
     *
     * @param {String} packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} callback function.
     * @api private
     */
    sendPacket(type, data, options, fn) {
      if ("function" === typeof data) {
        fn = data;
        data = undefined;
      }

      if ("function" === typeof options) {
        fn = options;
        options = null;
      }

      if ("closing" === this.readyState || "closed" === this.readyState) {
        return;
      }

      options = options || {};
      options.compress = false !== options.compress;

      const packet = {
        type: type,
        data: data,
        options: options
      };
      this.emit("packetCreate", packet);
      this.writeBuffer.push(packet);
      if (fn) this.once("flush", fn);
      this.flush();
    }

    /**
     * Closes the connection.
     *
     * @api private
     */
    close() {
      const close = () => {
        this.onClose("forced close");
        debug$2("socket closing - telling transport to close");
        this.transport.close();
      };

      const cleanupAndClose = () => {
        this.removeListener("upgrade", cleanupAndClose);
        this.removeListener("upgradeError", cleanupAndClose);
        close();
      };

      const waitForUpgrade = () => {
        // wait for upgrade to finish since we can't send packets while pausing a transport
        this.once("upgrade", cleanupAndClose);
        this.once("upgradeError", cleanupAndClose);
      };

      if ("opening" === this.readyState || "open" === this.readyState) {
        this.readyState = "closing";

        if (this.writeBuffer.length) {
          this.once("drain", () => {
            if (this.upgrading) {
              waitForUpgrade();
            } else {
              close();
            }
          });
        } else if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      }

      return this;
    }

    /**
     * Called upon transport error
     *
     * @api private
     */
    onError(err) {
      debug$2("socket error %j", err);
      Socket$2.priorWebsocketSuccess = false;
      this.emit("error", err);
      this.onClose("transport error", err);
    }

    /**
     * Called upon transport close.
     *
     * @api private
     */
    onClose(reason, desc) {
      if (
        "opening" === this.readyState ||
        "open" === this.readyState ||
        "closing" === this.readyState
      ) {
        debug$2('socket close with reason: "%s"', reason);

        // clear timers
        clearTimeout(this.pingIntervalTimer);
        clearTimeout(this.pingTimeoutTimer);

        // stop event from firing again for transport
        this.transport.removeAllListeners("close");

        // ensure transport won't stay open
        this.transport.close();

        // ignore further transport communication
        this.transport.removeAllListeners();

        if (typeof removeEventListener === "function") {
          removeEventListener("offline", this.offlineEventListener, false);
        }

        // set ready state
        this.readyState = "closed";

        // clear session id
        this.id = null;

        // emit close event
        this.emit("close", reason, desc);

        // clean buffers after, so users can still
        // grab the buffers on `close` event
        this.writeBuffer = [];
        this.prevBufferLen = 0;
      }
    }

    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} server upgrades
     * @api private
     *
     */
    filterUpgrades(upgrades) {
      const filteredUpgrades = [];
      let i = 0;
      const j = upgrades.length;
      for (; i < j; i++) {
        if (~this.transports.indexOf(upgrades[i]))
          filteredUpgrades.push(upgrades[i]);
      }
      return filteredUpgrades;
    }
  }

  Socket$2.priorWebsocketSuccess = false;

  /**
   * Protocol version.
   *
   * @api public
   */

  Socket$2.protocol = parser$1.protocol; // this is an int

  function clone(obj) {
    const o = {};
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = obj[i];
      }
    }
    return o;
  }

  var socket$1 = Socket$2;

  const Socket$1 = socket$1;

  lib$1.exports = (uri, opts) => new Socket$1(uri, opts);

  /**
   * Expose deps for legacy compatibility
   * and standalone browser access.
   */

  lib$1.exports.Socket = Socket$1;
  lib$1.exports.protocol = Socket$1.protocol; // this is an int
  lib$1.exports.Transport = transport;
  lib$1.exports.transports = transports$1;
  lib$1.exports.parser = lib;

  var socket = {};

  var dist = {};

  var binary = {};

  var isBinary$1 = {};

  Object.defineProperty(isBinary$1, "__esModule", { value: true });
  isBinary$1.hasBinary = isBinary$1.isBinary = void 0;
  const withNativeArrayBuffer = typeof ArrayBuffer === "function";
  const isView = (obj) => {
      return typeof ArrayBuffer.isView === "function"
          ? ArrayBuffer.isView(obj)
          : obj.buffer instanceof ArrayBuffer;
  };
  const toString$1 = Object.prototype.toString;
  const withNativeBlob = typeof Blob === "function" ||
      (typeof Blob !== "undefined" &&
          toString$1.call(Blob) === "[object BlobConstructor]");
  const withNativeFile = typeof File === "function" ||
      (typeof File !== "undefined" &&
          toString$1.call(File) === "[object FileConstructor]");
  /**
   * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
   *
   * @private
   */
  function isBinary(obj) {
      return ((withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
          (withNativeBlob && obj instanceof Blob) ||
          (withNativeFile && obj instanceof File));
  }
  isBinary$1.isBinary = isBinary;
  function hasBinary(obj, toJSON) {
      if (!obj || typeof obj !== "object") {
          return false;
      }
      if (Array.isArray(obj)) {
          for (let i = 0, l = obj.length; i < l; i++) {
              if (hasBinary(obj[i])) {
                  return true;
              }
          }
          return false;
      }
      if (isBinary(obj)) {
          return true;
      }
      if (obj.toJSON &&
          typeof obj.toJSON === "function" &&
          arguments.length === 1) {
          return hasBinary(obj.toJSON(), true);
      }
      for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
              return true;
          }
      }
      return false;
  }
  isBinary$1.hasBinary = hasBinary;

  Object.defineProperty(binary, "__esModule", { value: true });
  binary.reconstructPacket = binary.deconstructPacket = void 0;
  const is_binary_1 = isBinary$1;
  /**
   * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
   *
   * @param {Object} packet - socket.io event packet
   * @return {Object} with deconstructed packet and list of buffers
   * @public
   */
  function deconstructPacket(packet) {
      const buffers = [];
      const packetData = packet.data;
      const pack = packet;
      pack.data = _deconstructPacket(packetData, buffers);
      pack.attachments = buffers.length; // number of binary 'attachments'
      return { packet: pack, buffers: buffers };
  }
  binary.deconstructPacket = deconstructPacket;
  function _deconstructPacket(data, buffers) {
      if (!data)
          return data;
      if (is_binary_1.isBinary(data)) {
          const placeholder = { _placeholder: true, num: buffers.length };
          buffers.push(data);
          return placeholder;
      }
      else if (Array.isArray(data)) {
          const newData = new Array(data.length);
          for (let i = 0; i < data.length; i++) {
              newData[i] = _deconstructPacket(data[i], buffers);
          }
          return newData;
      }
      else if (typeof data === "object" && !(data instanceof Date)) {
          const newData = {};
          for (const key in data) {
              if (data.hasOwnProperty(key)) {
                  newData[key] = _deconstructPacket(data[key], buffers);
              }
          }
          return newData;
      }
      return data;
  }
  /**
   * Reconstructs a binary packet from its placeholder packet and buffers
   *
   * @param {Object} packet - event packet with placeholders
   * @param {Array} buffers - binary buffers to put in placeholder positions
   * @return {Object} reconstructed packet
   * @public
   */
  function reconstructPacket(packet, buffers) {
      packet.data = _reconstructPacket(packet.data, buffers);
      packet.attachments = undefined; // no longer useful
      return packet;
  }
  binary.reconstructPacket = reconstructPacket;
  function _reconstructPacket(data, buffers) {
      if (!data)
          return data;
      if (data && data._placeholder) {
          return buffers[data.num]; // appropriate buffer (should be natural order anyway)
      }
      else if (Array.isArray(data)) {
          for (let i = 0; i < data.length; i++) {
              data[i] = _reconstructPacket(data[i], buffers);
          }
      }
      else if (typeof data === "object") {
          for (const key in data) {
              if (data.hasOwnProperty(key)) {
                  data[key] = _reconstructPacket(data[key], buffers);
              }
          }
      }
      return data;
  }

  (function (exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Decoder = exports.Encoder = exports.PacketType = exports.protocol = void 0;
  const Emitter = componentEmitter.exports;
  const binary_1 = binary;
  const is_binary_1 = isBinary$1;
  const debug = browser.exports("socket.io-parser");
  /**
   * Protocol version.
   *
   * @public
   */
  exports.protocol = 5;
  var PacketType;
  (function (PacketType) {
      PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
      PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
      PacketType[PacketType["EVENT"] = 2] = "EVENT";
      PacketType[PacketType["ACK"] = 3] = "ACK";
      PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
      PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
      PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
  })(PacketType = exports.PacketType || (exports.PacketType = {}));
  /**
   * A socket.io Encoder instance
   */
  class Encoder {
      /**
       * Encode a packet as a single string if non-binary, or as a
       * buffer sequence, depending on packet type.
       *
       * @param {Object} obj - packet object
       */
      encode(obj) {
          debug("encoding packet %j", obj);
          if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
              if (is_binary_1.hasBinary(obj)) {
                  obj.type =
                      obj.type === PacketType.EVENT
                          ? PacketType.BINARY_EVENT
                          : PacketType.BINARY_ACK;
                  return this.encodeAsBinary(obj);
              }
          }
          return [this.encodeAsString(obj)];
      }
      /**
       * Encode packet as string.
       */
      encodeAsString(obj) {
          // first is type
          let str = "" + obj.type;
          // attachments if we have them
          if (obj.type === PacketType.BINARY_EVENT ||
              obj.type === PacketType.BINARY_ACK) {
              str += obj.attachments + "-";
          }
          // if we have a namespace other than `/`
          // we append it followed by a comma `,`
          if (obj.nsp && "/" !== obj.nsp) {
              str += obj.nsp + ",";
          }
          // immediately followed by the id
          if (null != obj.id) {
              str += obj.id;
          }
          // json data
          if (null != obj.data) {
              str += JSON.stringify(obj.data);
          }
          debug("encoded %j as %s", obj, str);
          return str;
      }
      /**
       * Encode packet as 'buffer sequence' by removing blobs, and
       * deconstructing packet into object with placeholders and
       * a list of buffers.
       */
      encodeAsBinary(obj) {
          const deconstruction = binary_1.deconstructPacket(obj);
          const pack = this.encodeAsString(deconstruction.packet);
          const buffers = deconstruction.buffers;
          buffers.unshift(pack); // add packet info to beginning of data list
          return buffers; // write all the buffers
      }
  }
  exports.Encoder = Encoder;
  /**
   * A socket.io Decoder instance
   *
   * @return {Object} decoder
   */
  class Decoder extends Emitter {
      constructor() {
          super();
      }
      /**
       * Decodes an encoded packet string into packet JSON.
       *
       * @param {String} obj - encoded packet
       */
      add(obj) {
          let packet;
          if (typeof obj === "string") {
              packet = this.decodeString(obj);
              if (packet.type === PacketType.BINARY_EVENT ||
                  packet.type === PacketType.BINARY_ACK) {
                  // binary packet's json
                  this.reconstructor = new BinaryReconstructor(packet);
                  // no attachments, labeled binary but no binary data to follow
                  if (packet.attachments === 0) {
                      super.emit("decoded", packet);
                  }
              }
              else {
                  // non-binary full packet
                  super.emit("decoded", packet);
              }
          }
          else if (is_binary_1.isBinary(obj) || obj.base64) {
              // raw binary data
              if (!this.reconstructor) {
                  throw new Error("got binary data when not reconstructing a packet");
              }
              else {
                  packet = this.reconstructor.takeBinaryData(obj);
                  if (packet) {
                      // received final buffer
                      this.reconstructor = null;
                      super.emit("decoded", packet);
                  }
              }
          }
          else {
              throw new Error("Unknown type: " + obj);
          }
      }
      /**
       * Decode a packet String (JSON data)
       *
       * @param {String} str
       * @return {Object} packet
       */
      decodeString(str) {
          let i = 0;
          // look up type
          const p = {
              type: Number(str.charAt(0)),
          };
          if (PacketType[p.type] === undefined) {
              throw new Error("unknown packet type " + p.type);
          }
          // look up attachments if type binary
          if (p.type === PacketType.BINARY_EVENT ||
              p.type === PacketType.BINARY_ACK) {
              const start = i + 1;
              while (str.charAt(++i) !== "-" && i != str.length) { }
              const buf = str.substring(start, i);
              if (buf != Number(buf) || str.charAt(i) !== "-") {
                  throw new Error("Illegal attachments");
              }
              p.attachments = Number(buf);
          }
          // look up namespace (if any)
          if ("/" === str.charAt(i + 1)) {
              const start = i + 1;
              while (++i) {
                  const c = str.charAt(i);
                  if ("," === c)
                      break;
                  if (i === str.length)
                      break;
              }
              p.nsp = str.substring(start, i);
          }
          else {
              p.nsp = "/";
          }
          // look up id
          const next = str.charAt(i + 1);
          if ("" !== next && Number(next) == next) {
              const start = i + 1;
              while (++i) {
                  const c = str.charAt(i);
                  if (null == c || Number(c) != c) {
                      --i;
                      break;
                  }
                  if (i === str.length)
                      break;
              }
              p.id = Number(str.substring(start, i + 1));
          }
          // look up json data
          if (str.charAt(++i)) {
              const payload = tryParse(str.substr(i));
              if (Decoder.isPayloadValid(p.type, payload)) {
                  p.data = payload;
              }
              else {
                  throw new Error("invalid payload");
              }
          }
          debug("decoded %s as %j", str, p);
          return p;
      }
      static isPayloadValid(type, payload) {
          switch (type) {
              case PacketType.CONNECT:
                  return typeof payload === "object";
              case PacketType.DISCONNECT:
                  return payload === undefined;
              case PacketType.CONNECT_ERROR:
                  return typeof payload === "string" || typeof payload === "object";
              case PacketType.EVENT:
              case PacketType.BINARY_EVENT:
                  return Array.isArray(payload) && payload.length > 0;
              case PacketType.ACK:
              case PacketType.BINARY_ACK:
                  return Array.isArray(payload);
          }
      }
      /**
       * Deallocates a parser's resources
       */
      destroy() {
          if (this.reconstructor) {
              this.reconstructor.finishedReconstruction();
          }
      }
  }
  exports.Decoder = Decoder;
  function tryParse(str) {
      try {
          return JSON.parse(str);
      }
      catch (e) {
          return false;
      }
  }
  /**
   * A manager of a binary event's 'buffer sequence'. Should
   * be constructed whenever a packet of type BINARY_EVENT is
   * decoded.
   *
   * @param {Object} packet
   * @return {BinaryReconstructor} initialized reconstructor
   */
  class BinaryReconstructor {
      constructor(packet) {
          this.packet = packet;
          this.buffers = [];
          this.reconPack = packet;
      }
      /**
       * Method to be called when binary data received from connection
       * after a BINARY_EVENT packet.
       *
       * @param {Buffer | ArrayBuffer} binData - the raw binary data received
       * @return {null | Object} returns null if more binary data is expected or
       *   a reconstructed packet object if all buffers have been received.
       */
      takeBinaryData(binData) {
          this.buffers.push(binData);
          if (this.buffers.length === this.reconPack.attachments) {
              // done with buffer list
              const packet = binary_1.reconstructPacket(this.reconPack, this.buffers);
              this.finishedReconstruction();
              return packet;
          }
          return null;
      }
      /**
       * Cleans up binary packet reconstruction variables.
       */
      finishedReconstruction() {
          this.reconPack = null;
          this.buffers = [];
      }
  }
  }(dist));

  var on$1 = {};

  Object.defineProperty(on$1, "__esModule", { value: true });
  on$1.on = void 0;
  function on(obj, ev, fn) {
      obj.on(ev, fn);
      return function subDestroy() {
          obj.off(ev, fn);
      };
  }
  on$1.on = on;

  var typedEvents = {};

  Object.defineProperty(typedEvents, "__esModule", { value: true });
  typedEvents.StrictEventEmitter = void 0;
  const Emitter = componentEmitter.exports;
  /**
   * Strictly typed version of an `EventEmitter`. A `TypedEventEmitter` takes type
   * parameters for mappings of event names to event data types, and strictly
   * types method calls to the `EventEmitter` according to these event maps.
   *
   * @typeParam ListenEvents - `EventsMap` of user-defined events that can be
   * listened to with `on` or `once`
   * @typeParam EmitEvents - `EventsMap` of user-defined events that can be
   * emitted with `emit`
   * @typeParam ReservedEvents - `EventsMap` of reserved events, that can be
   * emitted by socket.io with `emitReserved`, and can be listened to with
   * `listen`.
   */
  class StrictEventEmitter extends Emitter {
      /**
       * Adds the `listener` function as an event listener for `ev`.
       *
       * @param ev Name of the event
       * @param listener Callback function
       */
      on(ev, listener) {
          super.on(ev, listener);
          return this;
      }
      /**
       * Adds a one-time `listener` function as an event listener for `ev`.
       *
       * @param ev Name of the event
       * @param listener Callback function
       */
      once(ev, listener) {
          super.once(ev, listener);
          return this;
      }
      /**
       * Emits an event.
       *
       * @param ev Name of the event
       * @param args Values to send to listeners of this event
       */
      emit(ev, ...args) {
          super.emit(ev, ...args);
          return this;
      }
      /**
       * Emits a reserved event.
       *
       * This method is `protected`, so that only a class extending
       * `StrictEventEmitter` can emit its own reserved events.
       *
       * @param ev Reserved event name
       * @param args Arguments to emit along with the event
       */
      emitReserved(ev, ...args) {
          super.emit(ev, ...args);
          return this;
      }
      /**
       * Returns the listeners listening to an event.
       *
       * @param event Event name
       * @returns Array of listeners subscribed to `event`
       */
      listeners(event) {
          return super.listeners(event);
      }
  }
  typedEvents.StrictEventEmitter = StrictEventEmitter;

  Object.defineProperty(socket, "__esModule", { value: true });
  socket.Socket = void 0;
  const socket_io_parser_1 = dist;
  const on_1$1 = on$1;
  const typed_events_1$1 = typedEvents;
  const debug$1 = browser.exports("socket.io-client:socket");
  /**
   * Internal events.
   * These events can't be emitted by the user.
   */
  const RESERVED_EVENTS = Object.freeze({
      connect: 1,
      connect_error: 1,
      disconnect: 1,
      disconnecting: 1,
      // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
      newListener: 1,
      removeListener: 1,
  });
  class Socket extends typed_events_1$1.StrictEventEmitter {
      /**
       * `Socket` constructor.
       *
       * @public
       */
      constructor(io, nsp, opts) {
          super();
          this.receiveBuffer = [];
          this.sendBuffer = [];
          this.ids = 0;
          this.acks = {};
          this.flags = {};
          this.io = io;
          this.nsp = nsp;
          this.ids = 0;
          this.acks = {};
          this.receiveBuffer = [];
          this.sendBuffer = [];
          this.connected = false;
          this.disconnected = true;
          this.flags = {};
          if (opts && opts.auth) {
              this.auth = opts.auth;
          }
          if (this.io._autoConnect)
              this.open();
      }
      /**
       * Subscribe to open, close and packet events
       *
       * @private
       */
      subEvents() {
          if (this.subs)
              return;
          const io = this.io;
          this.subs = [
              on_1$1.on(io, "open", this.onopen.bind(this)),
              on_1$1.on(io, "packet", this.onpacket.bind(this)),
              on_1$1.on(io, "error", this.onerror.bind(this)),
              on_1$1.on(io, "close", this.onclose.bind(this)),
          ];
      }
      /**
       * Whether the Socket will try to reconnect when its Manager connects or reconnects
       */
      get active() {
          return !!this.subs;
      }
      /**
       * "Opens" the socket.
       *
       * @public
       */
      connect() {
          if (this.connected)
              return this;
          this.subEvents();
          if (!this.io["_reconnecting"])
              this.io.open(); // ensure open
          if ("open" === this.io._readyState)
              this.onopen();
          return this;
      }
      /**
       * Alias for connect()
       */
      open() {
          return this.connect();
      }
      /**
       * Sends a `message` event.
       *
       * @return self
       * @public
       */
      send(...args) {
          args.unshift("message");
          this.emit.apply(this, args);
          return this;
      }
      /**
       * Override `emit`.
       * If the event is in `events`, it's emitted normally.
       *
       * @return self
       * @public
       */
      emit(ev, ...args) {
          if (RESERVED_EVENTS.hasOwnProperty(ev)) {
              throw new Error('"' + ev + '" is a reserved event name');
          }
          args.unshift(ev);
          const packet = {
              type: socket_io_parser_1.PacketType.EVENT,
              data: args,
          };
          packet.options = {};
          packet.options.compress = this.flags.compress !== false;
          // event ack callback
          if ("function" === typeof args[args.length - 1]) {
              debug$1("emitting packet with ack id %d", this.ids);
              this.acks[this.ids] = args.pop();
              packet.id = this.ids++;
          }
          const isTransportWritable = this.io.engine &&
              this.io.engine.transport &&
              this.io.engine.transport.writable;
          const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
          if (discardPacket) {
              debug$1("discard packet as the transport is not currently writable");
          }
          else if (this.connected) {
              this.packet(packet);
          }
          else {
              this.sendBuffer.push(packet);
          }
          this.flags = {};
          return this;
      }
      /**
       * Sends a packet.
       *
       * @param packet
       * @private
       */
      packet(packet) {
          packet.nsp = this.nsp;
          this.io._packet(packet);
      }
      /**
       * Called upon engine `open`.
       *
       * @private
       */
      onopen() {
          debug$1("transport is open - connecting");
          if (typeof this.auth == "function") {
              this.auth((data) => {
                  this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data });
              });
          }
          else {
              this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data: this.auth });
          }
      }
      /**
       * Called upon engine or manager `error`.
       *
       * @param err
       * @private
       */
      onerror(err) {
          if (!this.connected) {
              this.emitReserved("connect_error", err);
          }
      }
      /**
       * Called upon engine `close`.
       *
       * @param reason
       * @private
       */
      onclose(reason) {
          debug$1("close (%s)", reason);
          this.connected = false;
          this.disconnected = true;
          delete this.id;
          this.emitReserved("disconnect", reason);
      }
      /**
       * Called with socket packet.
       *
       * @param packet
       * @private
       */
      onpacket(packet) {
          const sameNamespace = packet.nsp === this.nsp;
          if (!sameNamespace)
              return;
          switch (packet.type) {
              case socket_io_parser_1.PacketType.CONNECT:
                  if (packet.data && packet.data.sid) {
                      const id = packet.data.sid;
                      this.onconnect(id);
                  }
                  else {
                      this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                  }
                  break;
              case socket_io_parser_1.PacketType.EVENT:
                  this.onevent(packet);
                  break;
              case socket_io_parser_1.PacketType.BINARY_EVENT:
                  this.onevent(packet);
                  break;
              case socket_io_parser_1.PacketType.ACK:
                  this.onack(packet);
                  break;
              case socket_io_parser_1.PacketType.BINARY_ACK:
                  this.onack(packet);
                  break;
              case socket_io_parser_1.PacketType.DISCONNECT:
                  this.ondisconnect();
                  break;
              case socket_io_parser_1.PacketType.CONNECT_ERROR:
                  const err = new Error(packet.data.message);
                  // @ts-ignore
                  err.data = packet.data.data;
                  this.emitReserved("connect_error", err);
                  break;
          }
      }
      /**
       * Called upon a server event.
       *
       * @param packet
       * @private
       */
      onevent(packet) {
          const args = packet.data || [];
          debug$1("emitting event %j", args);
          if (null != packet.id) {
              debug$1("attaching ack callback to event");
              args.push(this.ack(packet.id));
          }
          if (this.connected) {
              this.emitEvent(args);
          }
          else {
              this.receiveBuffer.push(Object.freeze(args));
          }
      }
      emitEvent(args) {
          if (this._anyListeners && this._anyListeners.length) {
              const listeners = this._anyListeners.slice();
              for (const listener of listeners) {
                  listener.apply(this, args);
              }
          }
          super.emit.apply(this, args);
      }
      /**
       * Produces an ack callback to emit with an event.
       *
       * @private
       */
      ack(id) {
          const self = this;
          let sent = false;
          return function (...args) {
              // prevent double callbacks
              if (sent)
                  return;
              sent = true;
              debug$1("sending ack %j", args);
              self.packet({
                  type: socket_io_parser_1.PacketType.ACK,
                  id: id,
                  data: args,
              });
          };
      }
      /**
       * Called upon a server acknowlegement.
       *
       * @param packet
       * @private
       */
      onack(packet) {
          const ack = this.acks[packet.id];
          if ("function" === typeof ack) {
              debug$1("calling ack %s with %j", packet.id, packet.data);
              ack.apply(this, packet.data);
              delete this.acks[packet.id];
          }
          else {
              debug$1("bad ack %s", packet.id);
          }
      }
      /**
       * Called upon server connect.
       *
       * @private
       */
      onconnect(id) {
          debug$1("socket connected with id %s", id);
          this.id = id;
          this.connected = true;
          this.disconnected = false;
          this.emitBuffered();
          this.emitReserved("connect");
      }
      /**
       * Emit buffered events (received and emitted).
       *
       * @private
       */
      emitBuffered() {
          this.receiveBuffer.forEach((args) => this.emitEvent(args));
          this.receiveBuffer = [];
          this.sendBuffer.forEach((packet) => this.packet(packet));
          this.sendBuffer = [];
      }
      /**
       * Called upon server disconnect.
       *
       * @private
       */
      ondisconnect() {
          debug$1("server disconnect (%s)", this.nsp);
          this.destroy();
          this.onclose("io server disconnect");
      }
      /**
       * Called upon forced client/server side disconnections,
       * this method ensures the manager stops tracking us and
       * that reconnections don't get triggered for this.
       *
       * @private
       */
      destroy() {
          if (this.subs) {
              // clean subscriptions to avoid reconnections
              this.subs.forEach((subDestroy) => subDestroy());
              this.subs = undefined;
          }
          this.io["_destroy"](this);
      }
      /**
       * Disconnects the socket manually.
       *
       * @return self
       * @public
       */
      disconnect() {
          if (this.connected) {
              debug$1("performing disconnect (%s)", this.nsp);
              this.packet({ type: socket_io_parser_1.PacketType.DISCONNECT });
          }
          // remove socket from pool
          this.destroy();
          if (this.connected) {
              // fire events
              this.onclose("io client disconnect");
          }
          return this;
      }
      /**
       * Alias for disconnect()
       *
       * @return self
       * @public
       */
      close() {
          return this.disconnect();
      }
      /**
       * Sets the compress flag.
       *
       * @param compress - if `true`, compresses the sending data
       * @return self
       * @public
       */
      compress(compress) {
          this.flags.compress = compress;
          return this;
      }
      /**
       * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
       * ready to send messages.
       *
       * @returns self
       * @public
       */
      get volatile() {
          this.flags.volatile = true;
          return this;
      }
      /**
       * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
       * callback.
       *
       * @param listener
       * @public
       */
      onAny(listener) {
          this._anyListeners = this._anyListeners || [];
          this._anyListeners.push(listener);
          return this;
      }
      /**
       * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
       * callback. The listener is added to the beginning of the listeners array.
       *
       * @param listener
       * @public
       */
      prependAny(listener) {
          this._anyListeners = this._anyListeners || [];
          this._anyListeners.unshift(listener);
          return this;
      }
      /**
       * Removes the listener that will be fired when any event is emitted.
       *
       * @param listener
       * @public
       */
      offAny(listener) {
          if (!this._anyListeners) {
              return this;
          }
          if (listener) {
              const listeners = this._anyListeners;
              for (let i = 0; i < listeners.length; i++) {
                  if (listener === listeners[i]) {
                      listeners.splice(i, 1);
                      return this;
                  }
              }
          }
          else {
              this._anyListeners = [];
          }
          return this;
      }
      /**
       * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
       * e.g. to remove listeners.
       *
       * @public
       */
      listenersAny() {
          return this._anyListeners || [];
      }
  }
  socket.Socket = Socket;

  /**
   * Expose `Backoff`.
   */

  var backo2 = Backoff$1;

  /**
   * Initialize backoff timer with `opts`.
   *
   * - `min` initial timeout in milliseconds [100]
   * - `max` max timeout [10000]
   * - `jitter` [0]
   * - `factor` [2]
   *
   * @param {Object} opts
   * @api public
   */

  function Backoff$1(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
  }

  /**
   * Return the backoff duration.
   *
   * @return {Number}
   * @api public
   */

  Backoff$1.prototype.duration = function(){
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
      var rand =  Math.random();
      var deviation = Math.floor(rand * this.jitter * ms);
      ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
  };

  /**
   * Reset the number of attempts.
   *
   * @api public
   */

  Backoff$1.prototype.reset = function(){
    this.attempts = 0;
  };

  /**
   * Set the minimum duration
   *
   * @api public
   */

  Backoff$1.prototype.setMin = function(min){
    this.ms = min;
  };

  /**
   * Set the maximum duration
   *
   * @api public
   */

  Backoff$1.prototype.setMax = function(max){
    this.max = max;
  };

  /**
   * Set the jitter
   *
   * @api public
   */

  Backoff$1.prototype.setJitter = function(jitter){
    this.jitter = jitter;
  };

  Object.defineProperty(manager, "__esModule", { value: true });
  manager.Manager = void 0;
  const eio = lib$1.exports;
  const socket_1 = socket;
  const parser = dist;
  const on_1 = on$1;
  const Backoff = backo2;
  const typed_events_1 = typedEvents;
  const debug = browser.exports("socket.io-client:manager");
  class Manager extends typed_events_1.StrictEventEmitter {
      constructor(uri, opts) {
          super();
          this.nsps = {};
          this.subs = [];
          if (uri && "object" === typeof uri) {
              opts = uri;
              uri = undefined;
          }
          opts = opts || {};
          opts.path = opts.path || "/socket.io";
          this.opts = opts;
          this.reconnection(opts.reconnection !== false);
          this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
          this.reconnectionDelay(opts.reconnectionDelay || 1000);
          this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
          this.randomizationFactor(opts.randomizationFactor || 0.5);
          this.backoff = new Backoff({
              min: this.reconnectionDelay(),
              max: this.reconnectionDelayMax(),
              jitter: this.randomizationFactor(),
          });
          this.timeout(null == opts.timeout ? 20000 : opts.timeout);
          this._readyState = "closed";
          this.uri = uri;
          const _parser = opts.parser || parser;
          this.encoder = new _parser.Encoder();
          this.decoder = new _parser.Decoder();
          this._autoConnect = opts.autoConnect !== false;
          if (this._autoConnect)
              this.open();
      }
      reconnection(v) {
          if (!arguments.length)
              return this._reconnection;
          this._reconnection = !!v;
          return this;
      }
      reconnectionAttempts(v) {
          if (v === undefined)
              return this._reconnectionAttempts;
          this._reconnectionAttempts = v;
          return this;
      }
      reconnectionDelay(v) {
          var _a;
          if (v === undefined)
              return this._reconnectionDelay;
          this._reconnectionDelay = v;
          (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
          return this;
      }
      randomizationFactor(v) {
          var _a;
          if (v === undefined)
              return this._randomizationFactor;
          this._randomizationFactor = v;
          (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
          return this;
      }
      reconnectionDelayMax(v) {
          var _a;
          if (v === undefined)
              return this._reconnectionDelayMax;
          this._reconnectionDelayMax = v;
          (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
          return this;
      }
      timeout(v) {
          if (!arguments.length)
              return this._timeout;
          this._timeout = v;
          return this;
      }
      /**
       * Starts trying to reconnect if reconnection is enabled and we have not
       * started reconnecting yet
       *
       * @private
       */
      maybeReconnectOnOpen() {
          // Only try to reconnect if it's the first time we're connecting
          if (!this._reconnecting &&
              this._reconnection &&
              this.backoff.attempts === 0) {
              // keeps reconnection from firing twice for the same reconnection loop
              this.reconnect();
          }
      }
      /**
       * Sets the current transport `socket`.
       *
       * @param {Function} fn - optional, callback
       * @return self
       * @public
       */
      open(fn) {
          debug("readyState %s", this._readyState);
          if (~this._readyState.indexOf("open"))
              return this;
          debug("opening %s", this.uri);
          this.engine = eio(this.uri, this.opts);
          const socket = this.engine;
          const self = this;
          this._readyState = "opening";
          this.skipReconnect = false;
          // emit `open`
          const openSubDestroy = on_1.on(socket, "open", function () {
              self.onopen();
              fn && fn();
          });
          // emit `error`
          const errorSub = on_1.on(socket, "error", (err) => {
              debug("error");
              self.cleanup();
              self._readyState = "closed";
              this.emitReserved("error", err);
              if (fn) {
                  fn(err);
              }
              else {
                  // Only do this if there is no fn to handle the error
                  self.maybeReconnectOnOpen();
              }
          });
          if (false !== this._timeout) {
              const timeout = this._timeout;
              debug("connect attempt will timeout after %d", timeout);
              if (timeout === 0) {
                  openSubDestroy(); // prevents a race condition with the 'open' event
              }
              // set timer
              const timer = setTimeout(() => {
                  debug("connect attempt timed out after %d", timeout);
                  openSubDestroy();
                  socket.close();
                  socket.emit("error", new Error("timeout"));
              }, timeout);
              if (this.opts.autoUnref) {
                  timer.unref();
              }
              this.subs.push(function subDestroy() {
                  clearTimeout(timer);
              });
          }
          this.subs.push(openSubDestroy);
          this.subs.push(errorSub);
          return this;
      }
      /**
       * Alias for open()
       *
       * @return self
       * @public
       */
      connect(fn) {
          return this.open(fn);
      }
      /**
       * Called upon transport open.
       *
       * @private
       */
      onopen() {
          debug("open");
          // clear old subs
          this.cleanup();
          // mark as open
          this._readyState = "open";
          this.emitReserved("open");
          // add new subs
          const socket = this.engine;
          this.subs.push(on_1.on(socket, "ping", this.onping.bind(this)), on_1.on(socket, "data", this.ondata.bind(this)), on_1.on(socket, "error", this.onerror.bind(this)), on_1.on(socket, "close", this.onclose.bind(this)), on_1.on(this.decoder, "decoded", this.ondecoded.bind(this)));
      }
      /**
       * Called upon a ping.
       *
       * @private
       */
      onping() {
          this.emitReserved("ping");
      }
      /**
       * Called with data.
       *
       * @private
       */
      ondata(data) {
          this.decoder.add(data);
      }
      /**
       * Called when parser fully decodes a packet.
       *
       * @private
       */
      ondecoded(packet) {
          this.emitReserved("packet", packet);
      }
      /**
       * Called upon socket error.
       *
       * @private
       */
      onerror(err) {
          debug("error", err);
          this.emitReserved("error", err);
      }
      /**
       * Creates a new socket for the given `nsp`.
       *
       * @return {Socket}
       * @public
       */
      socket(nsp, opts) {
          let socket = this.nsps[nsp];
          if (!socket) {
              socket = new socket_1.Socket(this, nsp, opts);
              this.nsps[nsp] = socket;
          }
          return socket;
      }
      /**
       * Called upon a socket close.
       *
       * @param socket
       * @private
       */
      _destroy(socket) {
          const nsps = Object.keys(this.nsps);
          for (const nsp of nsps) {
              const socket = this.nsps[nsp];
              if (socket.active) {
                  debug("socket %s is still active, skipping close", nsp);
                  return;
              }
          }
          this._close();
      }
      /**
       * Writes a packet.
       *
       * @param packet
       * @private
       */
      _packet(packet) {
          debug("writing packet %j", packet);
          const encodedPackets = this.encoder.encode(packet);
          for (let i = 0; i < encodedPackets.length; i++) {
              this.engine.write(encodedPackets[i], packet.options);
          }
      }
      /**
       * Clean up transport subscriptions and packet buffer.
       *
       * @private
       */
      cleanup() {
          debug("cleanup");
          this.subs.forEach((subDestroy) => subDestroy());
          this.subs.length = 0;
          this.decoder.destroy();
      }
      /**
       * Close the current socket.
       *
       * @private
       */
      _close() {
          debug("disconnect");
          this.skipReconnect = true;
          this._reconnecting = false;
          if ("opening" === this._readyState) {
              // `onclose` will not fire because
              // an open event never happened
              this.cleanup();
          }
          this.backoff.reset();
          this._readyState = "closed";
          if (this.engine)
              this.engine.close();
      }
      /**
       * Alias for close()
       *
       * @private
       */
      disconnect() {
          return this._close();
      }
      /**
       * Called upon engine close.
       *
       * @private
       */
      onclose(reason) {
          debug("onclose");
          this.cleanup();
          this.backoff.reset();
          this._readyState = "closed";
          this.emitReserved("close", reason);
          if (this._reconnection && !this.skipReconnect) {
              this.reconnect();
          }
      }
      /**
       * Attempt a reconnection.
       *
       * @private
       */
      reconnect() {
          if (this._reconnecting || this.skipReconnect)
              return this;
          const self = this;
          if (this.backoff.attempts >= this._reconnectionAttempts) {
              debug("reconnect failed");
              this.backoff.reset();
              this.emitReserved("reconnect_failed");
              this._reconnecting = false;
          }
          else {
              const delay = this.backoff.duration();
              debug("will wait %dms before reconnect attempt", delay);
              this._reconnecting = true;
              const timer = setTimeout(() => {
                  if (self.skipReconnect)
                      return;
                  debug("attempting reconnect");
                  this.emitReserved("reconnect_attempt", self.backoff.attempts);
                  // check again for the case socket closed in above events
                  if (self.skipReconnect)
                      return;
                  self.open((err) => {
                      if (err) {
                          debug("reconnect attempt error");
                          self._reconnecting = false;
                          self.reconnect();
                          this.emitReserved("reconnect_error", err);
                      }
                      else {
                          debug("reconnect success");
                          self.onreconnect();
                      }
                  });
              }, delay);
              if (this.opts.autoUnref) {
                  timer.unref();
              }
              this.subs.push(function subDestroy() {
                  clearTimeout(timer);
              });
          }
      }
      /**
       * Called upon successful reconnect.
       *
       * @private
       */
      onreconnect() {
          const attempt = this.backoff.attempts;
          this._reconnecting = false;
          this.backoff.reset();
          this.emitReserved("reconnect", attempt);
      }
  }
  manager.Manager = Manager;

  (function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.io = exports.Socket = exports.Manager = exports.protocol = void 0;
  const url_1 = url$1;
  const manager_1 = manager;
  const debug = browser.exports("socket.io-client");
  /**
   * Module exports.
   */
  module.exports = exports = lookup;
  /**
   * Managers cache.
   */
  const cache = (exports.managers = {});
  function lookup(uri, opts) {
      if (typeof uri === "object") {
          opts = uri;
          uri = undefined;
      }
      opts = opts || {};
      const parsed = url_1.url(uri, opts.path || "/socket.io");
      const source = parsed.source;
      const id = parsed.id;
      const path = parsed.path;
      const sameNamespace = cache[id] && path in cache[id]["nsps"];
      const newConnection = opts.forceNew ||
          opts["force new connection"] ||
          false === opts.multiplex ||
          sameNamespace;
      let io;
      if (newConnection) {
          debug("ignoring socket cache for %s", source);
          io = new manager_1.Manager(source, opts);
      }
      else {
          if (!cache[id]) {
              debug("new io instance for %s", source);
              cache[id] = new manager_1.Manager(source, opts);
          }
          io = cache[id];
      }
      if (parsed.query && !opts.query) {
          opts.query = parsed.queryKey;
      }
      return io.socket(parsed.path, opts);
  }
  exports.io = lookup;
  /**
   * Protocol version.
   *
   * @public
   */
  var socket_io_parser_1 = dist;
  Object.defineProperty(exports, "protocol", { enumerable: true, get: function () { return socket_io_parser_1.protocol; } });
  /**
   * `connect`.
   *
   * @param {String} uri
   * @public
   */
  exports.connect = lookup;
  /**
   * Expose constructors for standalone build.
   *
   * @public
   */
  var manager_2 = manager;
  Object.defineProperty(exports, "Manager", { enumerable: true, get: function () { return manager_2.Manager; } });
  var socket_1 = socket;
  Object.defineProperty(exports, "Socket", { enumerable: true, get: function () { return socket_1.Socket; } });
  exports.default = lookup;
  }(build, build.exports));

  var io = /*@__PURE__*/getDefaultExportFromCjs(build.exports);

  io.Manager;
  io.Socket;

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

  var xhr$1 = {exports: {}};

  var win;

  if (typeof window !== "undefined") {
      win = window;
  } else if (typeof commonjsGlobal !== "undefined") {
      win = commonjsGlobal;
  } else if (typeof self !== "undefined"){
      win = self;
  } else {
      win = {};
  }

  var window_1 = win;

  var isFunction_1 = isFunction$1;

  var toString = Object.prototype.toString;

  function isFunction$1 (fn) {
    if (!fn) {
      return false
    }
    var string = toString.call(fn);
    return string === '[object Function]' ||
      (typeof fn === 'function' && string !== '[object RegExp]') ||
      (typeof window !== 'undefined' &&
       // IE8 and below
       (fn === window.setTimeout ||
        fn === window.alert ||
        fn === window.confirm ||
        fn === window.prompt))
  }

  var trim = function(string) {
    return string.replace(/^\s+|\s+$/g, '');
  }
    , isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
      };

  var parseHeaders$1 = function (headers) {
    if (!headers)
      return {}

    var result = {};

    var headersArr = trim(headers).split('\n');

    for (var i = 0; i < headersArr.length; i++) {
      var row = headersArr[i];
      var index = row.indexOf(':')
      , key = trim(row.slice(0, index)).toLowerCase()
      , value = trim(row.slice(index + 1));

      if (typeof(result[key]) === 'undefined') {
        result[key] = value;
      } else if (isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [ result[key], value ];
      }
    }

    return result
  };

  var immutable = extend;

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  function extend() {
      var target = {};

      for (var i = 0; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
              if (hasOwnProperty.call(source, key)) {
                  target[key] = source[key];
              }
          }
      }

      return target
  }

  var window$1 = window_1;
  var isFunction = isFunction_1;
  var parseHeaders = parseHeaders$1;
  var xtend = immutable;

  xhr$1.exports = createXHR;
  // Allow use of default import syntax in TypeScript
  xhr$1.exports.default = createXHR;
  createXHR.XMLHttpRequest = window$1.XMLHttpRequest || noop;
  createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window$1.XDomainRequest;

  forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
      createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
          options = initParams(uri, options, callback);
          options.method = method.toUpperCase();
          return _createXHR(options)
      };
  });

  function forEachArray(array, iterator) {
      for (var i = 0; i < array.length; i++) {
          iterator(array[i]);
      }
  }

  function isEmpty(obj){
      for(var i in obj){
          if(obj.hasOwnProperty(i)) return false
      }
      return true
  }

  function initParams(uri, options, callback) {
      var params = uri;

      if (isFunction(options)) {
          callback = options;
          if (typeof uri === "string") {
              params = {uri:uri};
          }
      } else {
          params = xtend(options, {uri: uri});
      }

      params.callback = callback;
      return params
  }

  function createXHR(uri, options, callback) {
      options = initParams(uri, options, callback);
      return _createXHR(options)
  }

  function _createXHR(options) {
      if(typeof options.callback === "undefined"){
          throw new Error("callback argument missing")
      }

      var called = false;
      var callback = function cbOnce(err, response, body){
          if(!called){
              called = true;
              options.callback(err, response, body);
          }
      };

      function readystatechange() {
          if (xhr.readyState === 4) {
              setTimeout(loadFunc, 0);
          }
      }

      function getBody() {
          // Chrome with requestType=blob throws errors arround when even testing access to responseText
          var body = undefined;

          if (xhr.response) {
              body = xhr.response;
          } else {
              body = xhr.responseText || getXml(xhr);
          }

          if (isJson) {
              try {
                  body = JSON.parse(body);
              } catch (e) {}
          }

          return body
      }

      function errorFunc(evt) {
          clearTimeout(timeoutTimer);
          if(!(evt instanceof Error)){
              evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") );
          }
          evt.statusCode = 0;
          return callback(evt, failureResponse)
      }

      // will load the data & process the response in a special response object
      function loadFunc() {
          if (aborted) return
          var status;
          clearTimeout(timeoutTimer);
          if(options.useXDR && xhr.status===undefined) {
              //IE8 CORS GET successful response doesn't have a status field, but body is fine
              status = 200;
          } else {
              status = (xhr.status === 1223 ? 204 : xhr.status);
          }
          var response = failureResponse;
          var err = null;

          if (status !== 0){
              response = {
                  body: getBody(),
                  statusCode: status,
                  method: method,
                  headers: {},
                  url: uri,
                  rawRequest: xhr
              };
              if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                  response.headers = parseHeaders(xhr.getAllResponseHeaders());
              }
          } else {
              err = new Error("Internal XMLHttpRequest Error");
          }
          return callback(err, response, response.body)
      }

      var xhr = options.xhr || null;

      if (!xhr) {
          if (options.cors || options.useXDR) {
              xhr = new createXHR.XDomainRequest();
          }else {
              xhr = new createXHR.XMLHttpRequest();
          }
      }

      var key;
      var aborted;
      var uri = xhr.url = options.uri || options.url;
      var method = xhr.method = options.method || "GET";
      var body = options.body || options.data;
      var headers = xhr.headers = options.headers || {};
      var sync = !!options.sync;
      var isJson = false;
      var timeoutTimer;
      var failureResponse = {
          body: undefined,
          headers: {},
          statusCode: 0,
          method: method,
          url: uri,
          rawRequest: xhr
      };

      if ("json" in options && options.json !== false) {
          isJson = true;
          headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json"); //Don't override existing accept header declared by user
          if (method !== "GET" && method !== "HEAD") {
              headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json"); //Don't override existing accept header declared by user
              body = JSON.stringify(options.json === true ? body : options.json);
          }
      }

      xhr.onreadystatechange = readystatechange;
      xhr.onload = loadFunc;
      xhr.onerror = errorFunc;
      // IE9 must have onprogress be set to a unique function.
      xhr.onprogress = function () {
          // IE must die
      };
      xhr.onabort = function(){
          aborted = true;
      };
      xhr.ontimeout = errorFunc;
      xhr.open(method, uri, !sync, options.username, options.password);
      //has to be after open
      if(!sync) {
          xhr.withCredentials = !!options.withCredentials;
      }
      // Cannot set timeout with sync request
      // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
      // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
      if (!sync && options.timeout > 0 ) {
          timeoutTimer = setTimeout(function(){
              if (aborted) return
              aborted = true;//IE9 may still call readystatechange
              xhr.abort("timeout");
              var e = new Error("XMLHttpRequest timeout");
              e.code = "ETIMEDOUT";
              errorFunc(e);
          }, options.timeout );
      }

      if (xhr.setRequestHeader) {
          for(key in headers){
              if(headers.hasOwnProperty(key)){
                  xhr.setRequestHeader(key, headers[key]);
              }
          }
      } else if (options.headers && !isEmpty(options.headers)) {
          throw new Error("Headers cannot be set on an XDomainRequest object")
      }

      if ("responseType" in options) {
          xhr.responseType = options.responseType;
      }

      if ("beforeSend" in options &&
          typeof options.beforeSend === "function"
      ) {
          options.beforeSend(xhr);
      }

      // Microsoft Edge browser sends "undefined" when send is called with undefined value.
      // XMLHttpRequest spec says to pass null as body to indicate no body
      // See https://github.com/naugtur/xhr/issues/100.
      xhr.send(body || null);

      return xhr


  }

  function getXml(xhr) {
      // xhr.responseXML will throw Exception "InvalidStateError" or "DOMException"
      // See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseXML.
      try {
          if (xhr.responseType === "document") {
              return xhr.responseXML
          }
          var firefoxBugTakenEffect = xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror";
          if (xhr.responseType === "" && !firefoxBugTakenEffect) {
              return xhr.responseXML
          }
      } catch (e) {}

      return null
  }

  function noop() {}

  var xhr = xhr$1.exports;

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

      xhr[method.toLowerCase() || 'get'](url || '', options, function (err, res) {
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
    this.send({
      method: 'DOM.setChildNodes',
      params: {
        parentId: nodeId,
        nodes: root.children
      }
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

    this.send({
      method: 'DOM.childNodeRemoved',
      params: {
        nodeId: root.nodeId,
        parentNodeId: elem.parentNode._nodeId
      }
    });
    var lastNodeId = elem.previousElementSibling ? elem.previousElementSibling._nodeId : elem.parentNode._nodeId;

    for (var i = 0; i < dom.documentElement.childNodes.length; i++) {
      var el = dom.documentElement.childNodes[i];
      setNodeIds(el);
      var node = new Node(el);
      elem.parentNode.insertBefore(el.cloneNode(), elem);
      this.send({
        method: 'DOM.childNodeInserted',
        params: {
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
        }
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
    this.send({
      method: 'DOM.characterDataModified',
      params: {
        nodeId: nodeId,
        value: value
      }
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
      return window['$' + i] = elem;
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
    this.send({
      method: 'DOM.setChildNodes',
      params: {
        parentId: root.nodeId,
        nodes: root.children
      }
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
    this.send({
      method: 'DOM.documentUpdated',
      params: {}
    });
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
    var computedStyleOrig = window.setComputedStyle(root.node);

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
      return this.send({
        method: 'CSS.styleSheetAdded',
        params: {
          header: registeredStyleSheet.header
        }
      });
    }

    var cssStyleSheets = [].slice.call(document.styleSheets);
    var styleSheetElement = arrayFind__default['default'](cssStyleSheets, function (cssStyleSheet) {
      return cssStyleSheet.href && cssStyleSheet.href.indexOf(url) > -1;
    });

    if (!styleSheetElement) {
      return this.socket.emit('debug', "Couldn't register stylesheet, url not found ".concat(url));
    }

    var styleSheet = this.cssStore.add({
      href: styleSheetElement.href,
      cssRules: [].slice.call(styleSheetElement.cssRules),
      ownerNode: styleSheetElement.ownerNode,
      cssText: cssText
    });
    this.send({
      method: 'CSS.styleSheetAdded',
      params: {
        header: styleSheet.header
      }
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
          this.send({
            method: 'Debugger.scriptParsed',
            params: {
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
            }
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return;
    }

    this.send({
      method: 'Debugger.scriptParsed',
      params: {
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
      }
    });
  }
  /**
   * Fired when virtual machine fails to parse the script.
   */

  function scriptFailedToParse(_ref2) {
    var scriptId = _ref2.scriptId,
        expression = _ref2.expression;
    this.send({
      method: 'Debugger.scriptParsed',
      params: {
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
      }
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
   * ---- Page Domain ----
   */

  /**
   * Methods
   */
  function addScriptToEvaluateOnNewDocument() {
    return {};
  }
  function bringToFront() {
    return {};
  }
  function captureScreenshot() {
    return {};
  }
  function createIsolatedWorld() {
    return {};
  }
  function disable() {
    return {};
  }
  function enable() {
    return {};
  }
  function getAppManifest() {
    return {};
  }
  function getFrameTree() {
    return {};
  }
  function getLayoutMetrics() {
    return {};
  }
  function getNavigationHistory() {
    return {};
  }
  function handleJavaScriptDialog() {
    return {};
  }
  function navigate(_ref) {
    var url = _ref.url;
    window.localtion.assign(url);
    return {};
  }
  function navigateToHistoryEntry(_ref2) {
    var entryId = _ref2.entryId;
    window.history.go(entryId);
    return {};
  }
  function printToPDF() {
    return {};
  }
  function reload(_ref3) {
    var ignoreCache = _ref3.ignoreCache;
    window.location.reload(Boolean(ignoreCache));
    return {};
  }
  function removeScriptToEvaluateOnNewDocument() {
    return {};
  }
  function resetNavigationHistory() {
    return {};
  }
  function setDocumentContent() {
    return {};
  }
  function stopLoading() {
    return {};
  }
  function getResourceTree() {
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
  }
  /**
   * Events
   */

  function frameStoppedLoading() {
    this.send({
      method: 'Page.frameStoppedLoading',
      params: {
        frameId: this.frameId
      }
    });
  }
  function loadEventFired() {
    this.send({
      method: 'Page.loadEventFired',
      params: {
        timestamp: 649314.52695
      }
    });
  }

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
    getResourceTree: getResourceTree,
    frameStoppedLoading: frameStoppedLoading,
    loadEventFired: loadEventFired
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

        self.send('Runtime.consoleAPICalled', {
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
    this.send({
      method: 'Runtime.executionContextCreated',
      params: {
        context: {
          auxData: {
            frameId: this.frameId,
            isDefault: true
          },
          id: this.executionContextId,
          name: document.title,
          origin: window.location.origin
        }
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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  var RemoteDebugger = /*#__PURE__*/function () {
    function RemoteDebugger(options) {
      var _this = this;

      _classCallCheck(this, RemoteDebugger);

      this.socket = null;
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
      key: "dispatch",
      value: function dispatch(CDP) {
        var id = CDP.id,
            params = CDP.params,
            method = CDP.method;
        var domainArr = method.split('.');

        var _domainArr = _slicedToArray(domainArr, 2),
            domain = _domainArr[0],
            subDomain = _domainArr[1];

        var response = {};
        if (id) response.id = id;

        if (!this.domains[domain]) {
          response.result = "Not support domain [".concat(domain, "]");
        } else {
          var execResult = this.domains[domain][subDomain];
          response.method = method;
          response.result = execResult ? execResult.call(this, params || {}) : {};
        }

        this.send(response);
      }
    }, {
      key: "send",
      value: function send(CDP) {
        this.socket.emit('cdp', CDP);
      }
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
      value: function initSocketEvent() {
        this.socket.emit('connected');
        this.socket.on('cdp', this.dispatch.bind(this));
      }
    }, {
      key: "connectSocket",
      value: function connectSocket() {
        var wsUrlOrigin = getWsUrlOrigin(this.wsHost);
        var socket = io("ws://".concat(wsUrlOrigin, "/devtools/page/").concat(this.pid));
        this.socket = socket;
        this.initSocketEvent();
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

  return RemoteDebugger;

})));
