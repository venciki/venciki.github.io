const result = [];
// const flat = (arr) => {
//     for (let i = 0; i < arr.length; i++) {
//         const curItem = arr[i];
//         if (Array.isArray(curItem)) {
//             flat(curItem);
//         }
//         else {
//             result.push(curItem)
//         }
//     }
// }


const flat = (arr) => {
    return arr.reduce((pre, curt) => {
        return pre.concat(Array.isArray(curt) ? flat(curt) : curt);
    }, [])
}

const arr = [1, 2, [2, 3, [1]]];

flat(arr);

console.log(flat(arr));