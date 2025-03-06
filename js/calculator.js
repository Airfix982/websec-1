let historyArray = [];

function checkForErr(num1, num2, operator) {
    let val1 = parseFloat(num1.value);
    let val2 = parseFloat(num2.value);
    let hasError = false;

    if (num1.value.trim() === '') {
        num1.classList.add('error');
        num1.placeholder = "Input number";
        hasError = true;
    } else {
        num1.classList.remove('error');
        num1.placeholder = "";
    }

    if (num2.value.trim() === '') {
        num2.classList.add('error');
        num2.placeholder = "Input number";
        hasError = true;
    } else {
        num2.classList.remove('error');
        num2.placeholder = "";
    }

    if (isNaN(val1)) {
        num1.classList.add('error');
        num1.value = "";
        num1.placeholder = "Only digits!";
        hasError = true;
    } else {
        num1.classList.remove('error');
    }

    if (isNaN(val2)) {
        num2.classList.add('error');
        num2.value = "";
        num2.placeholder = "Only digits!";
        hasError = true;
    } else {
        num2.classList.remove('error');
    }

    if (operator === '/' && (val2 === 0 || val2 === -0)) {
        num2.classList.add('error');
        num2.value = "";
        num2.placeholder = "Cannot divide by 0!";
        hasError = true;
    } else {
        num2.classList.remove('error');
    }

    return hasError;
}

document.getElementById('get-res').addEventListener('click', function () {
    let num1 = document.getElementById('num1');
    let num2 = document.getElementById('num2');
    let operator = document.getElementById('operation').value;
    let historyBox = document.getElementById('prev-res');
    let currResBox = document.getElementById('curr-res');

    if (checkForErr(num1, num2, operator)) return;

    let val1 = parseFloat(num1.value);
    let val2 = parseFloat(num2.value);
    let result;

    switch (operator) {
        case '+': result = val1 + val2; break;
        case '-': result = val1 - val2; break;
        case '*': result = val1 * val2; break;
        case '/': result = val2 !== 0 ? val1 / val2 : 'Ошибка'; break;
    }

    let newResult = `<b>${val1} ${operator} ${val2} = ${result}</b>`;

    if (currResBox.innerHTML.trim() !== "") {   
        historyArray.push(currResBox.innerHTML);
        if(historyArray.length > 3)
            historyArray.splice(0, 1)
        historyArray = historyArray.slice(-3);
        historyBox.innerHTML = historyArray.join("<br>");
    }

    currResBox.innerHTML = newResult;
});
