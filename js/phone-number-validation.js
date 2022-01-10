function telephoneCheck(str) {
    let usPhoneRegex = /^(1\s?)?(\(\d{3}\)(?=\s?\d)|\d{3})[-\s]?(\d{3})[-\s]?(\d{4})$/;
    return str.test(usPhoneRegex);
}

let result = telephoneCheck("1 555-555-5555");
console.log(result);