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
      arrayMethods[method] = function (...args) {
        oldArrayPrototype[method].call(this, ...args); // 监控新增的值

        let inserted = null;
        let ob = this.__ob__;

        switch (method) {
          case "splice":
            inserted = args.slice(2);

          case "push":
          case "unshift":
            inserted = args;
            break;
        }

        if (inserted) ob.observeArray(inserted);
      };
    });

    function observe(value) {
      if (value.__ob__) return;
      if (!isObject(value)) return;
      return new Observer(value);
    }

    class Observer {
      constructor(value) {
        Object.defineProperty(value, "__ob__", {
          value: this,
          enumerable: false
        });

        if (isArray(value)) {
          value.__proto__ = arrayMethods;
          this.observeArray(value);
        } else {
          this.walk(value);
        }
      }

      walk(data) {
        // 监控对象
        Object.keys(data).forEach(key => {
          defineReactive(data, key, data[key]);
        });
      }

      observeArray(data) {
        // 监控数组
        data.forEach(item => observe(item)); // 数组内的引用类型添加监控，[[], {}]
      }

    }

    function defineReactive(obj, key, value) {
      observe(value); // 递归监控value

      Object.defineProperty(obj, key, {
        get() {
          return value;
        },

        set(newValue) {
          if (newValue === value) return;
          observe(newValue); // 新值加监控

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

      console.log(data); // data.arr.push(3);
      // console.log(vm.arr);
      // vm.arr[1].push(3);
      // vm.name = {a: 2};
      // vm.name.a = 20;
      // vm.arr.push({a: 100});
      // vm.arr[3].a = 200;
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
