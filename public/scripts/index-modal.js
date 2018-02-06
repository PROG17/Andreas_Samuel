// import { lchmod } from "fs";

Array.prototype.contains = function (needle) {
    for (i in this) {
        if (this[i].value === needle) return true;
    }
    return false;
}


function getDatesFromUserInput() {
    var dateInputs = $(".startDate");
    var dates = new Array();
    for (let i = 0; i < dateInputs.length; i++) {
        dates.push($(dateInputs[i]).val());
    }
    let counter = 1;
    let allDates = new Array();

    for (let i = 0; i < dates.length; i++) {
        for (let j = 0; j < 7; j++) {
            let tempDate = new moment(dates[i]);
            tempDate.add(j, 'day');
            allDates.push(tempDate.format('YYYY-MM-DD'));
        }
    }
    return allDates;
};

$("#bookBtn").click(function () {

    $.get("/getUnavailableDates", (bookings) => {
        console.log(bookings);

        let bookingModal = $('#booking');

        bookingModal.data("bookingDates", bookings);

        bookingModal.addClass("show modalDisplayBlock");
        
        
    });

});

$("#saveBookingBtn").click(function () {

    let dates = getDatesFromUserInput();
    let toPay = $("#topay").val();
    let fName = $("#firstname").val();
    let lName = $("#lastname").val();
    let identityCode = $("#identitycode").val();
    let street = $("#streetaddress").val();
    let postalCode = $("#postalcode").val();
    let city = $("#city").val();
    let phone = $("#phone").val();
    let email = $("#email").val();
    let bookingDate = moment().format('YYYY-MM-DD');


    let booking = {
        dates: dates,
        toPay: toPay,
        firstName: fName,
        lastName: lName,
        personalIdentityNumber: identityCode,
        streetAddress: street,
        zipCode: postalCode,
        postTown: city,
        phoneNumber: phone,
        email: email,
        bookingDate: bookingDate
    };

    $.post("/makeBooking", booking);

    // let booking = new Booking(
    //     dates,toPay,fName,lName,identityCode,street,postalCode,city,phone,email,bookingDate);

    // bookingManager.MakeBooking(booking);
});

function addWeekToTable(startDate, weekNumber) {
    let addedWeeksCount = $("#weeks > tbody").children().length;

    let tr = $("<tr id='tr" + addedWeeksCount + "'>");
    let td1 = $("<td>");
    let td2 = $("<td>");

    let text = $("<p>" + weekNumber + "</p>").attr("id", "w" + addedWeeksCount);
    let startDateHidden = $("<input type='hidden'>").attr("value", startDate);
    startDateHidden.addClass("startDate");
    let deleteBtn = $("<button class='btn btn-sm btn-danger'" + addedWeeksCount + "'>x</button>")
    deleteBtn.click(function () {
        $(this).parent().parent().remove();
    })

    td1.append(text);
    td1.append(startDateHidden);
    td2.append(deleteBtn);

    tr.append(td1);
    tr.append(td2);

    $("#weeks").append(tr);
};