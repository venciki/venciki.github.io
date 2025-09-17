---
title: leetcode集合
date: 2026-01-01
tags:
  - RV
---

## 两数之和
9.8
```js
const twoSum = function(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.has(target - nums[i]), i];
    }
    map.set(nums[i], i);
  }
}
```

## 字母异位词分组

9.8

输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]

输出: [["bat"],["nat","tan"],["ate","eat","tea"]]

```js
var groupAnagrams = function(strs) {
  const map = new Map();
  for (let str of strs) {
    const array = Array.from(str);
    array.sort();
    const key = array.join('');
    const list = map.get(key) ? map.get(key) : new Array();
    list.push(str);
    map.set(key, list);
  }

  return Array.from(map.values());
}
```

## 最长连续序列
9.9

输入：nums = [100,4,200,1,3,2]

输出：4

解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。

```js
var longestConsecutive = function(nums) {
  if (nums.length === 0) {
    return 0;
  }
  nums.sort((a, b) => a - b);
  let len = 1;
  let maxLen = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] === 0) {
      continue;
    }
    if (nums[i] - nums[i - 1] === 1) {
      len++;
    }
    else {
      len = 1;
    }
    max = Math.max(max, len);
  }
  return max;
}
```

## 移动零
9.9

输入: nums = [0,1,0,3,12]

输出: [1,3,12,0,0]

```js
var moveZeroes = function(nums) {
  let slow = 0;
  let fast = 0;
  while (fast < nums.length) {
    if (nums[fast] !== 0) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      fast++;
      slow++;
    }
    else {
      fast++;
    }
  }
}
```

## 盛最多水的容器
9.10

```js
var maxArea = function(height) {
  let left = 0;
  let right = height.length - 1;
  let area = 0;
  let maxArea = 0;

  while (left < right) {
    area = (right - left) * Math.min(height[left], height[right]);
    maxArea = Math.max(maxArea, area);
    if (height[left] < height[right]) {
      left++;
    }
    else {
      right--;
    }
  }

  return maxArea;
}
```

## 三数之和
9.10

```js
var threeSum = function(nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    if (i >= 1 && nums[i] === nums[i - 1]) {
      continue;
    }

    let left = i + 1;
    let right = nums.length - 1;
    let n1 = nums[i];

    while (left < right) {
      let n2 = nums[left];
      let n3 = nums[right];

      if (n1 + n2 + n3 === 0) {
        result.push([n1, n2, n3]);
        while (left < right && n2 === nums[left]) {
          left++;
        }
        while (left < right && n3 === nums[right]) {
          right--;
        }
      }
      else if (n1 + n2 + n3 < 0) {
        left++;
      }
      else {
        right--;
      }
    }
  }

  return result;
}
```

## 接雨水
9.11

```js
var trap = function(height) {
  let left = 0;
  let right = height.length - 1;
  let maxLeft = 0;
  let maxRight = 0;
  let result = 0;

  while (left < right) {
    maxLeft = Math.max(maxLeft, height[left]);
    maxRight = Math.max(maxRight, height[right]);
    if (height[left] < height[right]) {
      result += maxLeft - height[left];
      left++;
    }
    else {
      result += maxRight - height[right];
      right--;
    }
  }

  return result;
}
```

## 无重复字符的最长子串
9.11

```js
var lengthOfLongestSubstring = function(s) {
  const sList = [];
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    while (sList.includes(s[i])) {
      sList.shift();
    }
    sList.push(s[i]);
    maxLen = Math.max(maxLen, sList.length);
  }
  return maxLen;
}
```

## 找到字符串中所有的异位字词
9.13

```js
var findAnagrams = function(s, p) {
  const sLen = s.length;
  const pLen = p.length
  const sCount = Array(26).fill(0);
  const pCount = Array(26).fill(0);
  const result = [];

  if (sLen < pLen) {
    return [];
  }

  for (let ch of p) {
    pCount[ch.charCodeAt() - 97]++;
  }

  for (let i = 0; i < p.length; i++) {
    sCount[s[i].charCodeAt() - 97]++
  }

  if (pCount.join() === sCount.join()) {
    result.push(0);
  }

  for (let i = pLen; i < s.length; i++) {
    sCount[s[i].charCodeAt() - 97]++;
    sCount[s[i - pLen].charCodeAt() - 97]--;

    if (pCount.join() === sCount.join()) {
      result.push(i - pLen + 1);
    }
  }
  return result;
}
```


## 和为 K 的子数组
给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数。子数组是数组中元素的连续非空序列。


示例 1：

输入：nums = [1,1,1], k = 2
输出：2
示例 2：

输入：nums = [1,2,3], k = 3
输出：2

```js
var subarraySum = function(nums, k) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      if (sum === k) {
        count++;
      }
    }
  }
  return count;
}
```

## 最大子数组和
9.15

给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组是数组中的一个连续部分。

示例 1：

输入：nums = [-2,1,-3,4,-1,2,1,-5,4]

输出：6

解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

```js
var maxSubArray = function(nums) {
  let count = 0;
  let maxSum = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    count += nums[i];
    if (count > maxSum) {
      maxSum = count;
    }

    if (count < 0) {
      count = 0;
    }
  }
  return maxSum;
}
```

## 合并区间
```
示例 1：

输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
示例 2：

输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
示例 3：

输入：intervals = [[4,7],[1,4]]
输出：[[1,7]]
解释：区间 [1,4] 和 [4,7] 可被视为重叠区间。
```

```js
var merge = function(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    if (result[result.length - 1][1] >= intervals[i][0]) {
      result[result.length - 1][1] = Math.max(result[result.length - 1][1], intervals[i][1]);
    }
    else {
      result.push(intervals[i]);
    }
  }

  return result;
}
```

## 轮转数组
9.16

给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

 
```
示例 1:

输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]

示例 2:

输入：nums = [-1,-100,3,99], k = 2
输出：[3,99,-1,-100]
解释: 
向右轮转 1 步: [99,-1,-100,3]
向右轮转 2 步: [3,99,-1,-100]
```

```js
var rotate = function(nums, k) {
  const reserve = (nums, start, end) => {
    const temp = nums[end];
    nums[end] = nums[start];
    nums[start] = temp;
    start++;
    end--;
  };

  k = k % nums.length;

  reserve(nums, 0, nums.length - 1);
  reserve(nums, 0, k - 1);
  reserve(nums, k, nums.length - 1);
}
```

## 除自身以外数组的乘积

```
示例 1:
输入: nums = [1,2,3,4]
输出: [24,12,8,6]

示例 2:
输入: nums = [-1,1,0,-3,3]
输出: [0,0,9,0,0]
```

```js
var productExceptSelf = function(nums) {
  // 题目等价于前n项乘积 * 后n项乘积

  // 第一项的前 n 项乘积为 1
  const res = [1];

  for (let i = 1; i < nums.length; i++) {
    // 前前n项乘积 * 当前项
    res[i] = res[i - 1] * nums[i - 1];
  }

  // 后n项乘积，响应的最后一项的后n项乘积为1
  let right = 1;

  for (let j = nums.length - 1; j >= 0; j--) {
    // 结果就是 前n项乘积 * 后n项乘积；
    res[j] *= right;
    // 当前项 * 后后n项乘积
    right *= nums[j]
  }

  return res;
}
```
