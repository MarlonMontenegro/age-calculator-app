function getInput() {
    let months = validateInput('inputMonth', validateMonth);
    let year = validateInput('inputYear', validateYear);
    let days = validateInput('inputDay', validateDay, months, year);

    calculateAge(days, months, year);

}

function validateInput(inputId, validationFunction, param1, param2) {
    const inputValue = document.getElementById(inputId).value;
    return validationFunction(inputValue, param1, param2);
}

function validateDay(day, month, year) {

    const daysInMonth = getDaysInMonth(month, year);

    const isInvalid =
        !validateInputNotEmpty(day) ||
        !validateInputIsANumber(day) ||
        day < 1 || day > 31
        || day > daysInMonth;


    errorMessage('inputDay', isInvalid, 'DayTitle');

    return isInvalid ? "--" : day;
}

function validateMonth(month) {
    const isInvalid = !validateInputNotEmpty(month) || !validateInputIsANumber(month) || month < 1 || month > 12;
    errorMessage('inputMonth', isInvalid, 'monthTitle');
    return isInvalid ? "--" : month;
}

function validateYear(year) {

    const isInvalid = !validateInputNotEmpty(year) || !validateInputIsANumber(year) || year > new Date().getFullYear();
    errorMessage('inputYear', isInvalid, 'titleYear');

    return isInvalid ? "--" : year;
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

function getDaysInMonth(month, year) {

    let daysInMonth;

    switch (month) {
        case 4:
        case 6:
        case 9:
        case 11:
            daysInMonth = 30;
            break;
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            daysInMonth = 31;
            break;
        default :
            daysInMonth = 28;
            if (isALeapYear(year)) {
                daysInMonth = 29;
            }
    }

    return daysInMonth;
}

function isALeapYear(year) {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
}

function calculateAge(day, month, year) {

    const currentDate = new Date();
    const birthDate = new Date(year, month - 1, day);

    let ageYear = currentDate.getFullYear() - year;
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();

    if (currentDate < birthDate) {
        ageYear--;
        ageMonths += 12;
    }

    if (ageDays < 0) {
        const lastMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        ageDays += lastMonthDays;
        ageMonths--;

        if (ageMonths < 0) {
            ageMonths = 0;
        }
    }


    let dayOutput = document.getElementById('dayOutputSpan');
    let monthOutput = document.getElementById('monthOutputSpan');
    let yearOutput = document.getElementById('yearOutputSpan');

    dayOutput.firstChild.textContent = ageDays + " ";
    monthOutput.firstChild.textContent = ageMonths + " ";
    yearOutput.firstChild.textContent = ageYear + " ";
}

