class FormValidation {
    static validator(inputSelector, spanSelector, logicFunc) {
        $(spanSelector).text(logicFunc(inputSelector));
    }
    static validateAll(){
        FormValidation.validateCity();
        FormValidation.validateEmail();
        FormValidation.validateFirstname();
        FormValidation.validateLastname();
        FormValidation.validateIdentityCode();
        FormValidation.validatePhone();
        FormValidation.validatePostalCode();
        FormValidation.validateStreetAddress();
        FormValidation.validateToPay();
        FormValidation.validateWeeks();
    }
    static validateWeeks() {
        var weeksFunc = function () {
            let weekCount = $("#weeks tbody").children().length;
            let spanSelector = ".weeks-validation";

            if (weekCount < 1) {
                return "Minst en vecka måste väljas."
            }
            else {
                return "";
            }
        }
        return FormValidation.validator(undefined, ".weeks-validation", weeksFunc);
    }
    static validateToPay() {
        var toPayFunc = function (inputSelector) {
            let value = $(inputSelector).val();

            if (validator.isEmpty(value)) {
                return "Kostnad är obligatorisk.";
            }
            else if (!validator.isCurrency(value, { allow_negatives: false })) {
                return "Kostnadssumman är inte giltig.";
            }
            else {
                return "";
            }
        }
        return FormValidation.validator("#topay", ".topay-validation", toPayFunc);
    }
    static validateFirstname() {
        var firstnameFunc = function (inputSelector) {
            let value = $(inputSelector).val();

            if (validator.isEmpty(value)) {
                return "Förnamn är obligatorisk.";
            }
            else if (!validator.matches(value, /[A-ö\s]/)) {
                return "Förnamnet får bara innehålla bokstäver från A-Ö.";
            }
            else if (!validator.isLength(value, { min: 2, max: 50 })) {
                return "Förnamnet måste vara mellan 2-50 tecken.";
            }
            else {
                return "";
            }
        }

        return FormValidation.validator("#firstname", ".firstname-validation", firstnameFunc);
    }
    static validateLastname() {
        var lastnameFunc = function (inputSelector) {
            let value = $(inputSelector).val();

            if (validator.isEmpty(value)) {
                return "Efternamn är obligatorisk.";
            }
            else if (!validator.matches(value, /[A-ö\s -]/)) {
                return "Efternamnet får bara innehålla bokstäver från A-Ö.";
            }
            else if (!validator.isLength(value, { min: 2, max: 50 })) {
                return "Efternamnet måste vara mellan 2-50 tecken.";
            }
            else {
                return "";
            }
        }
        return FormValidation.validator("#lastname", ".lastname-validation", lastnameFunc);
    }
    static validateIdentityCode() {
        var identityCodeFunc = function (inputSelector) {
            let value = $(inputSelector).val();

            if (validator.isEmpty(value)) {
                return "Personnummer är obligatorisk.";
            }
            else if (!validator.matches(value, /^\d{6}-\d{4}$|^\d{8}-\d{4}$/)) {
                return "Personnumret är ogiltigt";
            }
            else {
                return "";
            }
        }

        return FormValidation.validator("#identitycode", ".identitycode-validation", identityCodeFunc);
    }
    static validateStreetAddress(inputSelector) {
        var streetAddressFunc = function (inputSelector) {

            let value = $(inputSelector).val();

            if (validator.isEmpty(value)) {
                return "Gatuadress är obligatorisk.";
            }
            // 
            else if (!validator.matches(value, /[A-ö\s0-9 -]/)) {
                return "Gatuadress får bara innehålla bokstäver mellan A-Ö och siffror.";
            }
            else if (!validator.isLength(value, { min: 2, max: 50 })) {
                return "Postort måste vara mellan 2-50 tecken.";
            }
            else {
                return "";
            }

        }
        return FormValidation.validator("#streetaddress", ".streetaddress-validation", streetAddressFunc)
    }
    static validatePostalCode() {
        let postalCodeFunc = function (inputSelector) {
            let value = $(inputSelector).val();

            if (validator.isEmpty(value)) {
                return "Postnummer är obligatorisk.";
            }
            else if (!validator.isPostalCode(value, "SE")) {
                return "Postnumret är ogiltigt";
            }
            else {
                return "";
            }
        }
        return FormValidation.validator("#postalcode", ".postalcode-validation", postalCodeFunc);
    }
    static validateCity() {
        var cityFunc = function (inputSelector) {
            let value = $(inputSelector).val();

            if (validator.isEmpty(value)) {
                return "Postort är obligatorisk.";
            }
            else if (!validator.isAlpha(value, ["sv-SE"])) {
                return "Postort får bara innehålla tecken från A-Ö.";
            }
            else if (!validator.isLength(value, { min: 2, max: 50 })) {
                return "Postort måste vara mellan 2-50 tecken.";
            }
            else {
                return "";
            }
        }
        return FormValidation.validator("#city", ".city-validation", cityFunc)
    }
    static validatePhone() {
        var phoneFunc = function (inputSelector) {
            let value = $(inputSelector).val();

            if (validator.isEmpty(value)) {
                return "Telefonnummer är obligatorisk.";
            }
            else if (!validator.isNumeric(value)) {
                return "Telefonnumret är ogiltigt";
            }
            else {
                return "";
            }
        }
        return FormValidation.validator("#phone", ".phone-validation", phoneFunc);
    }
    static validateEmail() {
        let emailFunc = function (inputSelector) {
            let value = $(inputSelector).val();

            if (validator.isEmpty(value)) {
                return "Email är obligatorisk.";
            }
            else if (!validator.isEmail(value)) {
                return "Emailadressen är ogiltigt";
            }
            else {
                return "";
            }
        }
        return FormValidation.validator("#email", ".email-validation", emailFunc)
    }

}

$(function () {

    //Veckor
    $("#week-input-row").on("mouseleave", function () {
        FormValidation.validateWeeks();
    });

    //Betala
    $("#topay").on("blur", function () {
        FormValidation.validateToPay();
    });

    //Förnamn
    $("#firstname").on("blur", function () {
        FormValidation.validateFirstname();
    });

    //Efternamn
    $("#lastname").on("blur", function () {
        FormValidation.validateLastname();
    });

    //Personnummer
    $("#identitycode").on("blur", function () {
        FormValidation.validateIdentityCode();
    });

    //Gatuadress
    $("#streetaddress").on("blur", function () {
        FormValidation.validateStreetAddress();
    });

    //Postnummer
    $("#postalcode").on("blur", function () {
        FormValidation.validatePostalCode();
    });

    //Postort
    $("#city").on("blur", function () {
        FormValidation.validateCity();
    });

    //Telefonnummer
    $("#phone").on("blur", function () {
        FormValidation.validatePhone();
    });

    //Email
    $("#email").on("blur", function () {
        FormValidation.validateEmail();
    });

});