//Dom Elements
const hourEL = document.querySelector('.hour');
const minuteEL = document.querySelector('.minute');
const valueEL = document.querySelector('.value');


const acEl = document.querySelector('.ac');
const pmEL = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

const additionEL = document.querySelector('.addition')
const subtractionEL = document.querySelector('.subtraction')
const multiplicationEL = document.querySelector('.multiplication')
const divisionEL = document.querySelector('.division')
const equalEL = document.querySelector('.equal')

const decimalEL = document.querySelector('.decimal')
const number0EL = document.querySelector('.number-0')
const number1EL = document.querySelector('.number-1')
const number2EL = document.querySelector('.number-2')
const number3EL = document.querySelector('.number-3')
const number4EL = document.querySelector('.number-4')
const number5EL = document.querySelector('.number-5')
const number6EL = document.querySelector('.number-6')
const number7EL = document.querySelector('.number-7')
const number8EL = document.querySelector('.number-8')
const number9EL = document.querySelector('.number-9')
const numberELArray = [
    number0EL, number1EL, number2EL, number3EL, number4EL,
    number5EL, number6EL, number7EL, number8EL, number9EL
];

//variables
let valueStrInMemory = null;
let operatorInMemory = null;

// Functions
const getValueAsStr = () => {
    const currentDisplayStr = valueEL.textContent;
    return currentDisplayStr.split('.').join('');
}

const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
}

const setStrAsValue = (valueStr) => {
    if (valueStr[valueStr.length - 1] === '.') {
        valueEL.textContent += '.';
        return;
    }
    const [wholeNumStr, decimalStr] = valueStr.split('.');
    if (decimalStr) {
        valueEL.textContent =
            parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    } else {
        valueEL.textContent = parseFloat(wholeNumStr).toLocaleString();
    }
};
const handleNumberCLick = (numStr) => {
    const currentValueStr = getValueAsStr();
    if (currentValueStr === '0') {
        valueEL.textContent = numStr;
    } else {
        valueEL.textContent =
            parseFloat(currentValueStr + numStr).toLocaleString();
    }
};

const getResultOfOperationAsStr = () => {
    const currentValueNum = getValueAsNum();
    const valueNumInMemory = parseFloat(valueStrInMemory);
    let newValueNum;
    if (operatorInMemory === 'addition') {
        newValueNum = valueNumInMemory + currentValueNum;
    } else if (operatorInMemory === 'subtraction') {
        newValueNum = valueNumInMemory - currentValueNum;
    } else if (operatorInMemory === 'multiplication') {
        newValueNum = valueNumInMemory * currentValueNum;
    } else if (operatorInMemory === 'division') {
        newValueNum = valueNumInMemory / currentValueNum;
    }
    return newValueNum.toString();
};

const handleOperatorClick = (operation) => {
    const cuurentValueStr = getValueAsStr();

    if (!valueStrInMemory) {
        valueStrInMemory = cuurentValueStr;
        operatorInMemory = operation;
        setStrAsValue('0');
        return
    }
    valueStrInMemory = getResultOfOperationAsStr();
    operatorInMemory = operation;
    setStrAsValue('0');
}

//Add Event Listeners to functions
acEl.addEventListener('click', () => {
    setStrAsValue('0');
    valueStrInMemory = null;
    operatorInMemory = null;
});
pmEL.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const cuurentValueStr = getComputedStyle();

    if (currentValueStr === '-0') {
        setStrAsValue('0');
        return;
    }
    if (currentValueNum >= 0) {
        setStrAsValue('-' + currentValueStr);
    } else {
        setStrAsValue(currentValueStr.substring(1));
    }
});

percentEl.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const newValueNum = currentValueNum / 100;
    setStrAsValue(newValueNum.toString());
    valueStrInMemory = null;
    operatorInMemory = null;
});


// Add Event Listeners to operators
additionEL.addEventListener('click', () => {
    handleOperatorClick('addition');
});
subtractionEL.addEventListener('click', () => {
    handleOperatorClick('subtraction');
});
multiplicationEL.addEventListener('click', () => {
    handleOperatorClick('multiplication');
});
divisionEL.addEventListener('click', () => {
    handleOperatorClick('division');
});
equalEL.addEventListener('click', () => {
    if (valueStrInMemory) {
        setStrAsValue(getResultOfOperationAsStr());
        valueStrInMemory = null;
        operatorInMemory = null;
    }
})


// Add Event Listeners to number and decimal
for (let i = 0; i < numberELArray.length; i++) {
    const numberEL = numberELArray[i];

    numberEL.addEventListener('click', () => {
        handleNumberCLick(i.toString());
    });
}

decimalEL.addEventListener('click', () => {
    const currentValueStr = getValueAsStr();
    if (!currentValueStr.includes(',')) {
        valueEL.textContent = currentValueStr + ',';
    }
});




// Set up the time
const updateTime = () => {
    const currentTime = new Date();

    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    /*
    if(currentHour > 12){
        currentHour -= 12;
    }
    */

    hourEL.textContent = currentHour.toString().padStart(2, '0');
    minuteEL.textContent = currentMinute.toString().padStart(2, '0');
}
setInterval(updateTime, 1000);
updateTime()