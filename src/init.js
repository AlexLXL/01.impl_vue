import {initState} from "./state";
import {compilerToFunction} from "./compiler";
import {mountComponent} from "./lifeCycle";

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this;
        vm.$options = options;

        initState(vm);

        if (vm.$options.el) {
            vm.$mount(vm.$options.el);
        }
    }

    Vue.prototype.$mount = function (el) {
        const vm = this;
        const opts = vm.$options;
        el = document.querySelector(el);
        vm.$el = el;

        if (!opts.render) {
            let template = opts.template;
            if (!opts.template) {
                template = el.outerHTML;
            }
            let render = compilerToFunction(template);
            opts.render = render;
        }

        mountComponent(vm);
    }
}

/*
示例:render函数

function render() {
  with(this) {
    return _c('div', {
      attrs: {
        "id": "app"
      }
    }, [_v("aa " + _s(msg) + " cc "), _c('p', [_v("cc")])])
  }
}
*/
