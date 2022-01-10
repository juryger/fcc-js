const moneyNominalMap = {
    "ONE HUNDRED": 100,
    "TWENTY": 20,
    "TEN": 10,
    "FIVE": 5,
    "ONE": 1,
    "QUARTER": 0.25,
    "DIME": 0.1,
    "NICKEL": 0.05,
    "PENNY": 0.01
};

let result = {
    status: '',
    sum: 0,
    change: []
};

function processDecimal(val, isDecPoint, cid) {
    console.log(`tp2: process decimal val: ${val}, isDecPoint: ${isDecPoint}`);
    if (val === 0) {
      return true;
    }

    let lookupCid = [];

    if (!isDecPoint) {
        if (val % 10 === 0) {
            lookupCid = ["ONE HUNDRED", "TWENTY", "TEN", "FIVE", "ONE"];
        } else {
            lookupCid = ["FIVE", "ONE"];
        }    
    } else {
        if (val * 100 % 10 === 0) {
            lookupCid = ["QUARTER", "DIME", "NICKEL", "PENNY"];
        } else {
            lookupCid = ["NICKEL", "PENNY"];
        }
    }

    console.log(`tp2.1: lookup cid: ${lookupCid}`);

    let sum = 0;
    for (let i = 0; i < lookupCid.length && sum < val; i++) {        
        let found = cid.find(x => x[0] === lookupCid[i] && x[1] > 0 );
        if (!found) {
            continue;
        }

        let cidItem = [found[0], 0];

        const moneyNominal = moneyNominalMap[found[0]];
        console.log(` > ${found}, money nom: ${moneyNominal}`);

        if (moneyNominal > val) {
            continue;
        }

        for (let j = 0; j < Math.floor(found[1]/moneyNominal) && parseFloat((sum + moneyNominal).toFixed(2)) <= val; j++) {
            sum += moneyNominal;
            cidItem[1] += moneyNominal;

            console.log(` >> ${sum}, ${cidItem}`);
        }

        let found2 = result.change.find(x => x[0] === cidItem[0]);
        if (!found2) {
            result.change.push(cidItem);
        }
        else {
            found2[1] += cidItem[1];
        }
    }

    result.sum += sum;
    return parseFloat(sum.toFixed(2)) === val;
}

function checkCashRegister(price, cash, cid) {
    result.status = '';
    result.sum = 0;
    result.change = [];

    let change = (cash - price).toFixed(2);
    console.log(`tp0: ${change}`)

    if (change < 0) {
        return { "status": "NA", "change": [] };
    }

    let changeStr = change.toString();
    let decimalPointIndex = changeStr.indexOf(".");

    let changeLeftPart = decimalPointIndex !== -1 ? changeStr.slice(0, decimalPointIndex) : changeStr;
    let changeRightPart = decimalPointIndex !== -1 ? changeStr.slice(decimalPointIndex + 1, decimalPointIndex + 1 + 2) : "0";

    console.log(`tp1: change left: ${changeLeftPart}, right: ${changeRightPart}`);

    let isNotEnoughFounds = false;
    for (let i = 0; i < changeLeftPart.length; i++) {
        if (!processDecimal(parseInt(changeLeftPart[i].padEnd(changeLeftPart.length - i,'0'), 10), false, cid)) {
            isNotEnoughFounds = true;
            break;
        }
    }

    if (!isNotEnoughFounds) {
        for (let i = 0; i < changeRightPart.length; i++) {
            if (!processDecimal(parseFloat('0.' + changeRightPart[i].padStart(i+1,'0'), 10), true, cid)) {
                isNotEnoughFounds = true;
                break;
            }
        }
    }

    result.change = result.change.map(x => { let y = x; y[1] = parseFloat(y[1].toFixed(2)); return y; } );

    let cidSumA = result.change.map(x => x[1]).reduce((x,y) => x[1] + y[1]);
    let cidSumB = cid.map(x => parseFloat(x[1])).reduce((x,y) => x + y);

    let isClosed = !isNotEnoughFounds && cidSumA === cidSumB;
    result.status = isNotEnoughFounds ? 'INSUFFICIENT_FUNDS' : 
        isClosed ? 'CLOSED' : 'OPEN'; 
      
    console.log(`tp3: status: ${result.status}, sum: ${result.sum}, change: ${result.change}`);

    return { "status": result.status, "change": isNotEnoughFounds ? 
      [] : 
      isClosed ? cid : result.change };
}


checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

// 100 - 3.26 = 96.74 > 3*20$ + 2*10$ + 3*5$ + 1$ + 2*25c + 2*10c + 4*1c