// 简易promise

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(exe) {
    const self = this;
    self.status = PENDING;
    self.value = null;
    self.error = null;
    self.onFulfilled = null;
    self.onRejected = null;

    const resolve = (value) => {
        if (self.status !== PENDING) {
            return;
        }
        setTimeout(() => {
            self.status = FULFILLED;
            self.value = value;
            self.onFulfilled(self.value);
        });
    }

    const reject = (error) => {
        if (self.status !== PENDING) {
            return;
        }
        setTimeout(() => {
            self.status = REJECTED;
            self.error = error;
            self.onRejected(self.error);
        })
    }

    exe(resolve, reject);
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    if (this.status === PENDING) {
        this.onFulfilled = onFulfilled;
        this.onRejected = onRejected;
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

let promise1 = new MyPromise((resolve, reject) => {
  fs.readFile('../static/001.txt', (err, data) => {
    if (!err) {
      resolve(data);
    } else {
      reject(err);
    }
  })
});

let x1 = promise1.then(data => {
    console.log("第一次展示", data.toString());    
});

let x2 = promise1.then(data => {
    console.log("第二次展示", data.toString());    
});

let x3 = promise1.then(data => {
    console.log("第三次展示", data.toString());    
});