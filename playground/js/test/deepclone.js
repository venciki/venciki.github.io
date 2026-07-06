/**
 * 简易版
 */
const deepClone = (obj) => {
    if (typeof obj !== 'object') {
        return;
    }

    let result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
        }
    }
    return result;
};

const obj = {
    a: 1,
    b: 2,
    c: {
        ca: 1
    }
};
const newobj = deepClone(obj);

obj.a = 'a'


console.log(newobj);