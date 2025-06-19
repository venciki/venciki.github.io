---
title: leetcodeDay3
date: 2025-06-19
categories:
  - 算法
tags:
  - JavaScript
  - leetcode
---

# 算法day2

## 多数元素

**描述**

```
给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。
```

**示例：**

```js
输入：nums = [3,2,3]
输出：3

输入：nums = [2,2,1,1,1,2,2]
输出：2
```


### Code

```js
var majorityElement = function(nums) {
    const len = nums.length;

    if (len === 1) {
        return nums[0];
    }

    const map = new Map();

    for (n of nums) {
        if (!map.get(n)) {
            map.set(n, 1);
        }
        else {
            map.set(n, map.get(n) + 1);
            if (map.get(n) > len / 2) {
                return n;
            }
        }
    }
}


// 优化
var majorityElement = function(nums) {
    const len = nums.length;
    const map = new Map();

    for (n of nums) {
        map.set(n, (map.get(n) || 0) + 1);
        if (map.get(n) > len / 2) {
            return n;
        }
    }
}

```


## 轮转数组

**描述**

```
给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
```

**示例：**

```
输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]

输入：nums = [-1,-100,3,99], k = 2
输出：[3,99,-1,-100]
解释: 
向右轮转 1 步: [99,-1,-100,3]
向右轮转 2 步: [3,99,-1,-100]
```
### 思路
看到一个很好的思路：
```
nums = "----->-->"; k =3
result = "-->----->";

reverse "----->-->" we can get "<--<-----"
reverse "<--" we can get "--><-----"
reverse "<-----" we can get "-->----->"
this visualization help me figure it out :)
```
### Code

```javascript
var rotate = function(nums, k) {
    const reverse = (nums, start, end) => {
        while (start < end) {
            let temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    };

    k = k % nums.length;

    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
}
```

## 买卖股票的最佳时机

**描述**

```
给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
```

**示例：**

```
输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。

输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
```

### Code

```javascript
var maxProfit = function(prices) {
    let minPrice = prices[0];
    let maxMoney = 0;
    
    for (p of prices) {
        minPrice = Math.min(minPrice, p);
        maxMoney = Math.max(maxMoney, p - minPrice);
    }

    return maxMoney;
}
```

## 买卖股票的最佳时机 II

**描述**

```
给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。

在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。

返回 你能获得的 最大 利润 。
```

**示例：**

```
输入：prices = [7,1,5,3,6,4]
输出：7
解释：在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4。
随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3。
最大总利润为 4 + 3 = 7 。


输入：prices = [1,2,3,4,5]
输出：4
解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4。
最大总利润为 4 。
```

### Code

```javascript
var maxProfit = function(prices) {
    let sum = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            let temp = prices[i] - prices[i - 1];
            sum += temp;
        }
    }

    return sum;
}
```