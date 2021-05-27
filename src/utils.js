export function isFunction(val) {
    return typeof val === "function";
}

export function isObject(val) {
    return typeof val === "object" && val !== null;
}

export function isArray(val) {
    return Array.isArray(val);
}

let callbacks = [];
let waiting = false;
export function nextTick(fn) {
    callbacks.push(fn);
    if (!waiting) {
        Promise.resolve().then(flushCallbacks);
        waiting = true;
    }
}
function flushCallbacks() {
    callbacks.forEach(fn => fn());
    callbacks = [];
    waiting = false;
}