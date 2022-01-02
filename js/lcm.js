const expandArrayRange = (arr) => {
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    let range = [];

    for (let i = min; i <= max; i++) {
        range.push(i);
    }

    return range;
}

const lcm = (arr) => {
    let counter = 2;
    let range = expandArrayRange(arr);
    let divisionRow = [].concat(range);
    let divisionColumn = [];

    console.log(`lcm() call with argument: ${range}`);

    while (divisionRow.some(x => x >= counter)) {
        while (isPrime(counter) && divisionRow.some(x => x % counter === 0)) {            
            divisionColumn.push(counter);

            for (let i = 0; i < divisionRow.length; i++) {
                divisionRow[i] = divisionRow[i] % counter === 0 ? 
                    divisionRow[i] / counter : divisionRow[i];
            }

            console.log(`counter: ${counter}, row: ${divisionRow}, column: ${divisionColumn}`);
        }
        
        counter++;
    }

    return divisionColumn.reduce((x, y) => x * y);
}

let arr = [5,1];
console.log(`Calculating Less Common Multiplier for ${arr} - ${lcm(arr)}`);