(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    function isFunction(val) {
      return typeof val === "function";
    }
    function isObject(val) {
      return typeof val === "object" && val !== null;
    }
    function isArray(val) {
      return Array.isArray(val);
    }

    let oldArrayPrototype = Array.prototype;
    let arrayMethods = Object.create(oldArrayPrototype);
    let methods = ["push", "shift", "pop", "unshift", "reverse", "sort", "splice"];
    methods.forEach(method => {
      arrayMethods[method] = function () {
        console.log("数组方法进行了重写操作");
      };
    });

    function observe(value) {
      if (!isObject(value)) return;
      return new Observer(value);
    }

    class Observer {
      constructor(value) {
        if (isArray(value)) {
          value.__proto__ = arrayMethods;
        } else {
          this.walk(value);
        }
      }

      walk(data) {
        Object.keys(data).forEach(key => {
          defineReactive(data, key, data[key]);
        });
      }

    }

    function defineReactive(obj, key, value) {
      observe(value); // 递归监控value

      Object.defineProperty(obj, key, {
        get() {
          return value;
        },

        set(newValue) {
          if (newValue === oldValue) return;
          value = newValue;
        }

      });
    }

    function initState(vm) {
      const opts = vm.$options;

      if (opts.data) {
        initData(vm);
      }
    }

    function initData(vm) {
      let data = vm.$options.data;
      data = vm._data = isFunction(data) ? data.call(vm) : data;
      observe(data);

      for (let key in data) {
        proxy(vm, key, "_data");
      }

      console.log(data);
      data.arr.push(3);
      console.log(vm.arr);
    }

    function proxy(vm, key, source) {
      Object.defineProperty(vm, key, {
        get() {
          return vm[source][key];
        },

        set(newValue) {
          vm[source][key] = newValue;
        }

      });
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        const vm = this;
        vm.$options = options;
        initState(vm);

        if (vm.$options.el) ;
      };
    }

    function Vue(option) {
      this._init(option);
    }

    initMixin(Vue);

    return Vue;

})));
//# sourceMappingURL=vue.js.map
