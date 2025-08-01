const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

const getType = (obj) => Object.prototype.toString.call(obj);

const canTraverse = {
  '[object Map]': true,
  '[object Set]': true,
  '[object Array]': true,
  '[object Object]': true,
  '[object Arguments]': true,
};

const mapTag = '[object Map]';
const setTag = '[object Set]';
const boolTag = '[object Boolean]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const handleRegExp = (target) => {
    const {source, flags} = target;
    return new target.constructor(source, flags);
}

const handleFunc = (func) => {
    // 箭头函数直接返回自身
    if(!func.prototype) return func;
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    // 分别匹配 函数参数 和 函数体
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if(!body) return null;

    if (param) {
        const paramArr = param[0].split(',');
        return new Function(...paramArr, body[0]);
    } else {
        return new Function(body[0]);
    }
}


const handleNotTraverse = (target, tag) => {
    const Ctor = target.constructor;
    switch(tag) {
        case boolTag:
            return new Object(Boolean.prototype.valueOf.call(target));
        case numberTag:
            return new Object(Number.prototype.valueOf.call(target));
        case stringTag:
            return new Object(String.prototype.valueOf.call(target));
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


const deepClone = (target, map = new Map()) => {
    if (!isObject(target)) {
        return target;
    }

    let type = getType(target);
    let resultObj;
    if (!canTraverse[type]) {
        // 处理不可遍历对象
        return handleNotTraverse(target, type);
    }

    if (map.has(target)) {
        return map.get(target);
    }

    // 这波操作相当关键，可以保证对象的原型不丢失！
    let Ctor = target.constructor;
    resultObj = new Ctor();

    map.set(target, resultObj);

    // 处理Map
    if (type === mapTag) {
        target.forEach((item , key)=> {
            resultObj.set(deepClone(key, map), deepClone(item, map));
        })
        return resultObj;
    }

    // 处理Set
    if (type === setTag) {
        target.forEach(item=> {
            resultObj.add(deepClone(item, map));
        })
        return resultObj;
    }

    // 处理数组和对象
    for (let prop in target) {
        if (target.hasOwnProperty(prop)) {
            resultObj[prop] = deepClone(target[prop], map);
        }
    }

    return resultObj;
}

let obj = {a: 123};
obj.target = obj;

console.log(deepClone(obj));