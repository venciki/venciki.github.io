// 完善catch

// then的改进

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

// 拆解Promise
function resolvePromise(bridgePromise, x, resolve, reject) {
    if (x instanceof MyPromise) {
        // 拆解这个 promise ，直到返回值不为 promise 为止
        if (x.status === PENDING) {
            x.then(y => {
                resolvePromise(bridgePromise, y, resolve, reject);
            }, error => {
                reject(error);
            })
        }
        else {
            x.then(resolve, reject);
        }
    }
    else {
         // 非 Promise 的话直接 resolve 即可
        resolve(x);
    }

}


MyPromise.prototype.then = function(onFulfilled, onRejected) {
    let bridgePromise;
    let self = this;
    // 成功回调不传给它一个默认函数
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
    // 对于失败回调直接抛错
    onRejected = typeof onRejected === "function" ? onRejected : error => { throw error };

    if (this.status === PENDING) {
        return bridgePromise = new MyPromise((resolve, reject) => {
            self.onFulfilledCallbacks.push(value => {
                try {
                    const x = onFulfilled(value);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });

            self.onRejectedCallbacks.push(error => {
                try {
                    const x = onRejected(error);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            })
        })
    }
    else if (this.status === FULFILLED) {
        return bridgePromise = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        })
    }
    else {
        return bridgePromise = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(self.error);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        })
    }
};

MyPromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
}