import {isFunction} from "./utils";
import {observe} from "./observe/index.js";

export function initState(vm) {
    const opts = vm.$options;
    
    if (opts.data) {
        initData(vm)
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
    })
}