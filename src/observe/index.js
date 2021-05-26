import {isArray, isObject} from "../utils";
import {arrayMethods} from "./array";

export function observe(value) {
    if (value.__ob__) return;
    if (!isObject(value)) return;

    return new Observer(value);
}

class Observer {
    constructor(value) {
        Object.defineProperty(value, "__ob__", {
            value: this,
            enumerable: false
        })

        if (isArray(value)) {
            value.__proto__ = arrayMethods;
            this.observeArray(value);
        }else {
            this.walk(value);
        }
    }

    walk(data) {
        // 监控对象
        Object.keys(data).forEach((key) => {
            defineReactive(data, key, data[key]);
        })
    }

    observeArray(data) {
        // 监控数组
        data.forEach((item) => observe(item)); // 数组内的引用类型添加监控，[[], {}]
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
    })
}