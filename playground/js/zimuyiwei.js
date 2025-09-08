const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
for (let str of strs) {
    console.log(str, Array.from(str), Array.from(str).sort().join(''));
}