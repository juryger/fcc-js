function palindrome(str) {
    let normalizedStr = str;

    let nonAlphaRegex = /\W|\_/g;
    if (nonAlphaRegex.test(str)) {
        normalizedStr = str.replace(nonAlphaRegex, '');
    }

    let len = normalizedStr.length;
    let left = normalizedStr.slice(0, len % 2 === 0 ? len/2 : len/2);
    let right = normalizedStr.slice(len % 2 === 0 ? len/2 : len/2 + 1);

    let rightArr = right.split('');
    right = rightArr.reverse().join('');
    console.log(`left: ${left} vs right: ${right}`);

    return left.toLowerCase() === right.toLowerCase();
  }
  
  palindrome("A man, a plan, a canal. Panama");