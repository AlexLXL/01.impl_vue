let oldArrayPrototype = Array.prototype;

export let arrayMethods = Object.create(oldArrayPrototype);

let methods = ["push", "shift", "pop", "unshift", "reverse", "sort", "splice"];

methods.forEach((method) => {
    arrayMethods[method] = function(){
        console.log("数组方法进行了重写操作")
    }
})