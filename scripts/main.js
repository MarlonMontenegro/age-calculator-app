function getInput() {
    const day = validateInput('inputDay', validateDay);
    const month = validateInput('inputMonth', validateMonth);
    const year = validateInput('inputYear', validateYear);
}

function validateInput(inputId, validationFunction) {
    const inputValue = document.getElementById(inputId).value;
    return validationFunction(inputValue);
}

function validateDay(day) {
    const isInvalid = !validateInputNotEmpty(day) || !validateInputIsANumber(day) || day < 1 || day > 31;
    errorMessage('inputDay', isInvalid, 'DayTitle');
    return isInvalid ? null : day;
}

function validateMonth(month) {
    const isInvalid = !validateInputNotEmpty(month) || !validateInputIsANumber(month) || month < 1 || month > 12;
    errorMessage('inputMonth', isInvalid, 'monthTitle');
    return isInvalid ? null : month;
}

function validateYear(year) {

    const isInvalid = !validateInputNotEmpty(year) || !validateInputIsANumber(year) || year > new Date().getFullYear();
    errorMessage('inputYear', isInvalid, 'titleYear');


    return isInvalid ? null : year;
}

function validateInputNotEmpty(input) {
    return input !== null && input !== undefined && input !== '';
}

function validateInputIsANumber(input) {
    return !isNaN(Number(input));
}

function errorMessage(inputId, isInvalid, titleId) {

    const errorText = document.getElementById(`error-${inputId}`);
    const inputBox = document.getElementById(inputId);
    const title = document.getElementById(titleId);

    errorText.style.display = isInvalid ? 'block' : 'none';
    inputBox.style.border = isInvalid ? 'red solid 2px' : "1px solid #DCDCDC";
    title.style.color = isInvalid ? 'red' : 'hsl(0, 1%, 44%)';
}
