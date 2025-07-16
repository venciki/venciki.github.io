

const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

const handleRegExp = (target) => {
    const {source, flags} = target;
    return new target.constructor(source, flags);
}

const handleFunc = (target) => {
    // ...
}

const handleNotTraverse = (target, tag) => {
    const Ctor = target.constuctor;
    switch (tag) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(target);
        case regexpTag:
            return handleRegExp(target);
        case funcTag:
            return handleFunc(target);
        default:
            return new Ctor(target);
    }
}

let obj = {a: 123};
obj.target = obj;

console.log(deepClone(obj));