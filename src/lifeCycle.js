import {patch} from "./vdom/patch";
import {Watcher} from "./observe/watcher";

export function mountComponent(vm) {
    // let vnode = vm._render();
    // console.log("vnode:", vnode);
    // vm._update(vnode);

    // 组件更新函数
    let updateComponent = () => {
        vm._update(vm._render()); // render -> vnode -> real DOM
    }

    new Watcher(vm, updateComponent, () => { // render -> getter -> watcher
        console.log("更新钩子 update")
    }, true);
}

export function lifCycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this;
        vm.$el = patch(vm.$el, vnode);
    }
}