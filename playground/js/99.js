

let str = '';

for (let i = 1; i <= 9; i++) {
    for (let j = i; j <= 9; j++) {
        str += `${i} * ${j} = ${i * j}  `;
    }
    str += '\n';
}

console.log(str);

