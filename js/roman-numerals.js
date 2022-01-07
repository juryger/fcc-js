const romanMatch1stDecPlace = {
    '0': '',
    '1': 'I',
    '2': 'II',
    '3': 'III',
    '4': 'IV',
    '5': 'V',
    '6': 'VI',
    '7': 'VII',
    '8': 'VIII',
    '9': 'IX'
}

const romanMatch2ndDecPlace = {
    '00': '',
    '10': 'X',
    '20': 'XX',
    '30': 'XXX',
    '40': 'XL',
    '50': 'L',
    '60': 'LX',
    '70': 'LXX',
    '80': 'LXXX',
    '90': 'XC'
}

const romanMatch3rdDecPlace = {
    '000': '',
    '100': 'C',
    '200': 'CC',
    '300': 'CCC',
    '400': 'CD',
    '500': 'D',
    '600': 'DC',
    '700': 'DCC',
    '800': 'DCCC',
    '900': 'CM'
}

const RomanThousandPlaceValue = 'M';

function convertDecimalPlace(num, place) {
    let romanStr = '';

    switch(place) {
        case 1:
            romanStr = romanMatch1stDecPlace[num.toString()];
            break;
        case 2: 
            romanStr = romanMatch2ndDecPlace[`${num}0`];
            break;
        case 3:
            romanStr = romanMatch3rdDecPlace[`${num}00`];
            break;
        default:
            romanStr = RomanThousandPlaceValue.repeat(num);
            break;
    }

    return romanStr;
}

function convertToRoman(num) {
    let str = num.toString();

    let romanStr = '';
    for (let i = 0; i < str.length; i++) {
        romanStr += convertDecimalPlace(str[i], str.length - i);
    }

    console.log(romanStr);
    return romanStr;
}

convertToRoman(3999);