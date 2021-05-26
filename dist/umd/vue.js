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

    function observe(value) {
      if (!isObject(value)) return;
      return new Observer(value);
    }

    class Observer {
      constructor(value) {
        this.walk(value);
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
      data = isFunction(data) ? data.call(vm) : data;
      observe(data);
      console.log(data);
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
