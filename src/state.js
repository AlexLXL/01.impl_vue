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
    data = isFunction(data) ? data.call(vm) : data;
    observe(data);
    
    console.log(data);
    data.arr.push(3);
}