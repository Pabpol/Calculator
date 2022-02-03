let inputValue = 0;
let valueScreen = '';
let expresionScreen = '';
let firstOperator = '';
let secondOperator = '';
let firstDigit = '';
let secondDigit = '';
let result = '';


const currentDigit = document.querySelector('.currentDigit');
const expresion = document.querySelector('.expresion');
const numericBtns = document.querySelectorAll('.numericPad');
const operatorBtns = document.querySelectorAll('.operations');
const bottomSection = document.querySelectorAll('.bottomSection');
const especialOperationBtns = document.querySelectorAll('.especialOperation');


numericBtns.forEach((btn) => btn.addEventListener('click', () => {
    getValue(btn);

}));

operatorBtns.forEach((btn) => btn.addEventListener('click', () => {
    
    inputOperator(btn);
    clearScreen(btn);

}));

bottomSection.forEach((btn) => btn.addEventListener('click', () => {
    showResult(btn);
    backSpace(btn);
}));

especialOperationBtns.forEach((btn) => btn.addEventListener('click', () =>{

    operatePercent(btn);
    operateSquare(btn);
    operateRoot(btn);
    operateSign(btn);
}));

const createExpresion = (operator) => {
    
    expresionScreen = result === '' ? valueScreen + operator : result + operator;
    expresion.textContent = expresionScreen;
    valueScreen = '';

}

const showResult = (e) => {
    if (e.textContent === '=') {
        secondDigit = Number(valueScreen);
        calculate(secondOperator === '' ? firstOperator : secondOperator);
        currentDigit.textContent = result === '' ? valueScreen: result;
        expresion.textContent = expresionScreen + valueScreen + '=';
        valueScreen = result === '' ? Number(valueScreen): Number(result);
        result = '';
        firstOperator = '';
        secondOperator = '';
        firstDigit = valueScreen;
        secondDigit = '';
        valueScreen = '';
    }
}
const backSpace = (e) => {
    if (e.value === 'back') {
        if (valueScreen.length === 1) {
            valueScreen = 0;
            currentDigit.textContent = valueScreen;
        } else if (result === '') {

            valueScreen = 0;
            currentDigit.textContent = valueScreen;
            expresion.textContent = '';
            firstOperator = '';
            secondOperator = '';
            firstDigit = '';
            secondDigit = '';
        } else {
            valueScreen = valueScreen.toString().slice(0, -1);
            currentDigit.textContent = valueScreen;

        }

    }
}

const getValue = (e) => {
    inputValue = e.value;
    if (valueScreen === 0 && inputValue != '.') {
        valueScreen = inputValue;
        currentDigit.textContent = valueScreen;
    } else {
        valueScreen = valueScreen + inputValue;
        currentDigit.textContent = valueScreen;
    }

}

const clearScreen = (e) => {
    if (e.value == 'clear') {
        inputValue = 0;
        valueScreen = '';
        expresionScreen = '';
        firstOperator = '';
        secondOperator = '';
        firstDigit = '';
        secondDigit = '';
        result = '';
        currentDigit.textContent = valueScreen;
        expresion.textContent = valueScreen;
    }

}


function inputOperator(e) {
    if (firstOperator != '' && secondOperator === '') {
        secondOperator = getOperator(e);
        secondDigit = valueScreen === '' ? '' : Number(valueScreen);
        secondDigit != 0 ? calculate(firstOperator) : valueScreen = Number(firstDigit);
        createExpresion(secondOperator);
        firstDigit = secondDigit === '' ? Number(firstDigit) : Number(result);
        

    } else if (firstOperator != '' && secondOperator != '') {
        secondDigit = valueScreen === '' ? '' : Number(valueScreen);
        secondDigit != 0 ? calculate(secondOperator) : valueScreen = Number(firstDigit);
        secondOperator = getOperator(e);
        valueScreen = secondDigit === '' ? valueScreen : result;
        createExpresion(secondOperator);
        firstDigit = secondDigit === '' ? Number(firstDigit) : Number(result);

    } else {
        firstOperator = getOperator(e);
        firstDigit = valueScreen != ''? Number(valueScreen) : firstDigit;
        valueScreen = valueScreen === ''? firstDigit:valueScreen;
        createExpresion(firstOperator);
    }
}

const operatePercent = (e) => {
    if (e.value == '%') {
       operator = secondOperator === '' ? firstOperator : secondOperator
       if (operator === '+' || operator === '-') {
        valueScreen = valueScreen/100 * firstDigit;
        expresion.textContent = expresion.textContent+valueScreen;
        currentDigit.textContent = valueScreen;
       }else{
        valueScreen = valueScreen/100;
        expresion.textContent = expresion.textContent+valueScreen;
        currentDigit.textContent = valueScreen;
       }
    }
}

const operateSquare = (e) => {
    if (e.value === 'x²') {
        firstDigit = valueScreen;
        valueScreen = Math.pow(valueScreen,2);
        expresion.textContent = `sqr(${firstDigit})`;
        currentDigit.textContent = valueScreen;
    }
}
const operateRoot = (e) =>{
    if (e.value === 'root') {
        firstDigit = valueScreen;
        valueScreen = Math.round(Math.sqrt(valueScreen)*1000)/1000;
        expresion.textContent = `√(${firstDigit})`;
        currentDigit.textContent = valueScreen;
    }
}
const operateSign = (e) => {
    if (e.value === '+/-') {
        valueScreen = valueScreen*-1;
        currentDigit.textContent = valueScreen;
    }
}


const getOperator = (e) => {

    switch (e.value) {
        case '+':

            return '+'

            break;
        case '-':

            return '-'

            break;
        case '/':

            return '/'

            break;
        case '*':

            return '*'

            break;
        // case '%':
        //     return '%'
        //     break;
        // case '+/-':
        //     return '+/-'
        //     break;
        // case 'x²':
        //     return 'x²'
        //     break;
        // case 'root':
        //     return 'root'
        //     break;

        default:
            break;
    }


}

const calculate = (operator) => {

    switch (operator) {
        case '+':
            result = firstDigit + secondDigit;
            
            break;
        case '-':
            result = firstDigit - secondDigit;
            

            break;
        case '/':

            result = Math.round(firstDigit / secondDigit * 1000) / 1000;

            break;
        case '*':
            result = firstDigit * secondDigit;
            break;
        case '%':
            result = (firstDigit + secondDigit) / firstDigit;
            break;
        default:
            break;
    }
}


