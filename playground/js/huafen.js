var partitionLabels = function(s) {
    const last = new Array(26);
    const length = s.length;
    const codePointA = 'a'.codePointAt(0);
    for (let i = 0; i < length; i++) {
        last[s.codePointAt(i) - codePointA] = i;
    }
}

partitionLabels("ababcbacadefegdehijhklij")