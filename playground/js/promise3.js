// 完成链式调用

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(exe) {
    const self = this;
    self.status = PENDING;
    self.value = null;
    self.error = null;
    self.onFulfilledCallbacks = [];
    self.onRejectedCallbacks = [];

    const resolve = (value) => {
        if (self.status !== PENDING) {
            return;
        }
        setTimeout(() => {
            self.status = FULFILLED;
            self.value = value;
            // self.onFulfilled(self.value);
            self.onFulfilledCallbacks.forEach(fn => fn(self.value));
        });
    }

    const reject = (error) => {
        if (self.status !== PENDING) {
            return;
        }
        setTimeout(() => {
            self.status = REJECTED;
            self.error = error;
            // self.onRejected(self.error);
            self.onRejectedCallbacks.forEach(fn => fn(self.error));
        })
    }

    exe(resolve, reject);
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
    }
    else if (this.status === FULFILLED) {
        onFulfilled(this.value);
    }
    else {
        onRejected(this.error);
    }
    return this;
};

const fs = require('fs');

let readFilePromise = (filePath) => {
    return new MyPromise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        })
    })
}

readFilePromise('../static/001.txt').then(data => {
    console.log('第一次读取', data.toString());
    return readFilePromise('../static/002.txt');
}).then(data => {
    console.log('第二次读取', data.toString());
})
