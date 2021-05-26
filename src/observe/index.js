import {isArray, isObject} from "../utils";
import {arrayMethods} from "./array";

export function observe(value) {
    if (!isObject(value)) return;

    return new Observer(value);
}

class Observer {
    constructor(value) {
        if (isArray(value)) {
            value.__proto__ = arrayMethods;
        }else {
            this.walk(value);
        }
    }

    walk(data) {
        Object.keys(data).forEach((key) => {
            defineReactive(data, key, data[key]);
        })
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
    })
}