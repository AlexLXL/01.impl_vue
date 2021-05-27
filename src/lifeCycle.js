import {patch} from "./vdom/patch";

export function mountComponent(vm) {
    let vnode = vm._render(); // render -> vnode
    console.log("vnode:", vnode);
    vm._update(vnode); // vnode -> real DOM
}

export function lifCycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this;
        vm.$el = patch(vm.$el, vnode);
    }
}