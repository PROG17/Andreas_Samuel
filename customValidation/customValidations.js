const validator = require('validator');

function validateDate(date, errorStrings) {

    let isDate = validator.matches(date, /^\d{4}-\d{2}-\d{2}$/);
    if (!isDate)
        errorStrings.push(`Ej korrekt datumformat: ${date}`);
}


function validateDates(dates, errorStrings) {

    if (dates == null || dates.length == 0) {
        errorStrings.push(`Minst ett datum är obligatoriskt`);
        return;
    }

    for (let date of dates) {
        validateDate(date, errorStrings);
    }

}

function hasValue(name, value, errorStrings) {
    if (value == null || value == "") {
        errorStrings.push(`${name} är obligatoriskt`);
        return false;
    }

    return true;
}

function validateCurrency(currency, errorStrings) {

    if (!hasValue("Belopp", currency, errorStrings))
        return;

    let isCurrency = validator.isCurrency(currency);

    if (!isCurrency)
        errorStrings.push(`Ej korrekt angivet belopp: ${currency}`);

}

function validateIdentityNumber(identityNumber, errorStrings) {

    if (!hasValue("Personnummer", identityNumber, errorStrings))
        return;

    let isIdentityNumber = validator.matches(identityNumber, /^\d{6}-\d{4}$|^\d{8}-\d{4}$/);

    if (!isIdentityNumber)
        errorStrings.push(`Ej korrekt personnummer: ${identityNumber}`);

}

function validateEmail(email, errorStrings) {

    if (!hasValue("Email", email, errorStrings))
        return;

    let isEmail = validator.isEmail(email);

    if (!isEmail)
        errorStrings.push(`Ej korrekt email: ${email}`);

}


exports.validateDate = validateDate;
exports.validateDates = validateDates;
exports.hasValue = hasValue;
exports.validateCurrency = validateCurrency;
exports.validateIdentityNumber = validateIdentityNumber;
exports.validateEmail = validateEmail;

