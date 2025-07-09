/**
 * Event
 */

function EventEmitter() {
    this.events = new Map();
}

const wrapCallback = (fn, once) => ({callback: fn, once});

EventEmitter.prototype.addListener = function(type, fn, once = false) {
    const handler = this.events.get(type);
    const wrapped = wrapCallback(fn, once);

    if (!handler) {
        this.events.set(type, wrapped);
    }
    else if (handler && typeof handler.callback === 'function') {
        this.events.set(type, [handler, wrapped]);
    }
    else {
        handler.push(wrapped);
    }
}

EventEmitter.prototype.removeListener = function(type, listener) {
    const handler = this.events.get(type);
    if (!handler) {
        return;
    }
    if (!Array.isArray(handler)) {
        if (handler.callback === listener) {
            this.events.delete(type);
        }
        return;
    }
    for (let i = 0; i < handler.length; i++) {
        let item = handler[i];
        if (item.callback === listener) {
            handler.splice(i, 1);
            i--;

            if (handler.length === 1) {
                this.events.set(type, handler[0]);
            }
        }
    }
}

EventEmitter.prototype.once = function (type, fn) {
    this.addListener(type, fn, true);
}

EventEmitter.prototype.emit = function (type, ...args) {
    const handler = this.events.get(type);
    if (!handler) {
        return;
    }
    if (Array.isArray(handler)) {
        handler.forEach(item => {
            item.callback.apply(this, args);
            if (item.once) {
                this.removeListener(type, item.callback);
            }
        })
    }
    else {
        handler.callback.apply(this, args);
        if (handler.once) {
            this.removeListener(type, handler.callback);
        }
    }
    return true;
}

EventEmitter.prototype.removeAllListener = function(type) {
    if (type) {
        this.events.delete(type);
    }
    else {
        this.events.clear();
    }
}

function assert(condition, message) {
    if (!condition) {
        console.error('❌', message);
    } else {
        console.log('✅', message);
    }
}

let emitter = new EventEmitter();

// 基本测试数据
let called = false;
function listener1() { called = true; }

// 1. 测试 addListener 和 emit
emitter.addListener('test', listener1);
emitter.emit('test');
assert(called === true, 'addListener + emit 触发成功');

// 2. 测试 removeListener
called = false;
emitter.removeListener('test', listener1);
emitter.emit('test');
assert(called === false, 'removeListener 成功移除监听器');

// 3. 测试 once
let onceCount = 0;
function onceListener() { onceCount++; }
emitter.once('onceEvent', onceListener);
emitter.emit('onceEvent');
emitter.emit('onceEvent');
assert(onceCount === 1, 'once 只触发一次');

// 4. 测试多个监听器
let count1 = 0, count2 = 0;
function fn1() { count1++; }
function fn2() { count2++; }

emitter.addListener('multi', fn1);
emitter.addListener('multi', fn2);
emitter.emit('multi');
assert(count1 === 1 && count2 === 1, '多个监听器均被调用');

emitter.removeListener('multi', fn1);
emitter.emit('multi');
assert(count1 === 1 && count2 === 2, '移除其中一个监听器后，另一个仍然可调用');

emitter.removeListener('multi', fn2);
emitter.emit('multi');
assert(count1 === 1 && count2 === 2, '两个监听器都被移除后不再调用');

// 5. 测试 removeAllListener
let called3 = false;
function fn3() { called3 = true; }

emitter.addListener('clearEvent', fn3);
emitter.removeAllListener('clearEvent');
emitter.emit('clearEvent');
assert(called3 === false, 'removeAllListener 移除特定事件成功');

// 6. 测试 removeAllListener 全部清除
let hit = false;
function anyListener() { hit = true; }

emitter.addListener('evt1', anyListener);
emitter.addListener('evt2', anyListener);
emitter.removeAllListener(); // 全部清除
emitter.emit('evt1');
emitter.emit('evt2');
assert(hit === false, 'removeAllListener() 清空所有事件成功');
