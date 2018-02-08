$(function () {

    //Veckor
    $("#week-input-row").on("mouseleave", function () {
        let weekCount = $("#weeks tbody").children().length;
        let spanSelector = ".weeks-validation";

        if (weekCount < 1) {
            $(spanSelector).text("Minst en vecka måste väljas.");
        }
        else {
            $(spanSelector).text("");
        }
    });

    //Betala
    $("#topay").on("blur", function () {
        let value = $(this).val();
        let spanSelector = ".topay-validation";

        if (validator.isEmpty(value)) {
            $(spanSelector).text("Kostnad är obligatorisk.");
        }
        else if (!validator.isCurrency(value, {allow_negatives:false})) {
            $(spanSelector).text("Kostnadssumman är inte giltig.");
        }
        else {
            $(spanSelector).text("");
        }
    });

    //Förnamn
    $("#firstname").on("blur", function () {
        let value = $(this).val();
        let spanSelector = ".firstname-validation";

        if (validator.isEmpty(value)) {
            $(spanSelector).text("Förnamn är obligatorisk.");
        }
        else if (!validator.isAlpha(value, ["sv-SE"])) {
            $(spanSelector).text("Förnamnet får bara innehålla tecken från A-Ö.");
        }
        else if(!validator.isLength(value ,{min: 2, max: 50})){
            $(spanSelector).text("Förnamnet måste vara mellan 2-50 tecken.");
        }
        else {
            $(spanSelector).text("");
        }
    });

    //Efternamn
    $("#lastname").on("blur", function () {
        let value = $(this).val();
        let spanSelector = ".lastname-validation";

        if (validator.isEmpty(value)) {
            $(spanSelector).text("Efternamn är obligatorisk.");
        }
        else if (!validator.isAlpha(value, ["sv-SE"])) {
            $(spanSelector).text("Efternamnet får bara innehålla tecken från A-Ö.");
        }
        else if(!validator.isLength(value ,{min: 2, max: 50})){
            $(spanSelector).text("Efternamnet måste vara mellan 2-50 tecken.");
        }
        else {
            $(spanSelector).text("");
        }
    });

    //Personnummer
    $("#identitycode").on("blur", function () {
        let value = $(this).val();
        let spanSelector = ".identitycode-validation";

        if (validator.isEmpty(value)) {
            $(spanSelector).text("Personnummer är obligatorisk.");
        }
        else if (!validator.matches(identityNumber, /^\d{6}-\d{4}$|^\d{8}-\d{4}$/)) {
            $(spanSelector).text("Personnumret är ogiltigt");
        }
        else {
            $(spanSelector).text("");
        }
    });

    //Gatuadress
    $("#streetaddress").on("blur", function () {
        let value = $(this).val();
        let spanSelector = ".streetaddress-validation";

        if (validator.isEmpty(value)) {
            $(spanSelector).text("Gatuadress är obligatorisk.");
        }
        else if (!validator.isAlphanumeric(value, ["sv-SE"])) {
            $(spanSelector).text("Gatuadress får bara innehålla bokstäver mellan A-Ö och siffror.");
        }
        else if(!validator.isLength(value ,{min: 2, max: 50})){
            $(spanSelector).text("Postort måste vara mellan 2-50 tecken.");
        }
        else {
            $(spanSelector).text("");
        }
    });

    //Postnummer
    $("#postalcode").on("blur", function () {
        let value = $(this).val();
        let spanSelector = ".postalcode-validation";

        if (validator.isEmpty(value)) {
            $(spanSelector).text("Postnummer är obligatorisk.");
        }
        else if (!validator.isPostalCode(value, "SE")) {
            $(spanSelector).text("Postnumret är ogiltigt");
        }
        else {
            $(spanSelector).text("");
        }
    });

    //Postort
    $("#city").on("blur", function () {
        let value = $(this).val();
        let spanSelector = ".city-validation";

        if (validator.isEmpty(value)) {
            $(spanSelector).text("Postort är obligatorisk.");
        }
        else if (!validator.isAlpha(value, ["sv-SE"])) {
            $(spanSelector).text("Postort får bara innehålla tecken från A-Ö.");
        }
        else if(!validator.isLength(value ,{min: 2, max: 50})){
            $(spanSelector).text("Postort måste vara mellan 2-50 tecken.");
        }
        else {
            $(spanSelector).text("");
        }
    });

    //Telefonnummer
    $("#phone").on("blur", function () {
        let value = $(this).val();
        let spanSelector = ".phone-validation";

        if (validator.isEmpty(value)) {
            $(spanSelector).text("Telefonnummer är obligatorisk.");
        }
        else if (!validator.isNumeric(value)) {
            $(spanSelector).text("Telefonnumret är ogiltigt");
        }
        else {
            $(spanSelector).text("");
        }
    });

    //Email
    $("#email").on("blur", function () {
        let value = $(this).val();
        let spanSelector = ".email-validation";

        if (validator.isEmpty(value)) {
            $(spanSelector).text("Email är obligatorisk.");
        }
        else if (!validator.isEmail(value)) {
            $(spanSelector).text("Emailadressen är ogiltigt");
        }
        else {
            $(spanSelector).text("");
        }
    });

});