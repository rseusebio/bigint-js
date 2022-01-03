function sqrt(value) {
    if (value < 0n) {
        throw 'square root of negative numbers is not supported'
    }

    if (value < 2n) {
        return value;
    }

    function newtonIteration(n, x0) {
        const x1 = ((n / x0) + x0) >> 1n;
        if (x0 === x1 || x0 === (x1 - 1n)) {
            return x0;
        }
        return newtonIteration(n, x1);
    }

    return newtonIteration(value, 1n);
}

function calculateBigInt(inputNum, result = [], repeat = true) {

    if (typeof inputNum !== 'bigint')
        return result;

    const num = inputNum > 0n ? inputNum : -1n * inputNum;

    if (num < 2n) return result;

    const theSqrt = sqrt(num);

    let x = 2n;

    if (num % x) {
        x = 3n;
        if (num % x) {
            x = 5n;

            let add = 2n;

            while ((num % x) && (x < theSqrt)) {
                // search numbers: 5, 7, 11, 13, 17, 19, 23...
                x += add;
                // add each time: 2, 4, 2, 4, 2, 4, 2...
                add = 6n - add;
            }
        }
    }

    x = (x <= theSqrt) ? x : num;

    if (!repeat) {
        const index = result.indexOf(x);

        if (index < 0)
            result.push(x);

    } else {
        result.push(x);
    }


    if (x === num) {
        return result;
    } else {
        return calculateBigInt(num / x, result, repeat);
    }
}

function factorize(num) {
    const factors = calculateBigInt(num);
    const countObject = {};
    for (const factor of factors) {
        if (Number.isFinite(countObject[factor])) {
            countObject[factor] += 1;
        } else {
            countObject[factor] = 1;
        }
    }
    return countObject;
}

function stringify(obj) {

    let arr = [];

    for (let base in obj) {
        exp = obj[base];

        if (exp === 1) {
            arr.push(base + "");
        } else {
            arr.push(`${base}<sup>${exp}</sup>`);
        }
    }

    return arr.join(" x ");
}

function getFactors(num) {
    return calculateBigInt(num, [], true);
}