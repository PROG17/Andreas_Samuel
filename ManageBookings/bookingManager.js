module.exports = class BookingManager {
    constructor(database) {
        this.database = database;
    }

    MakeBooking(booking) {

        let bookingsRef = this.database.ref("Bookings/");

        bookingsRef.push({
            dates: booking.dates,
            toPay: booking.toPay,
            firstName: booking.firstName,
            lastName: booking.lastName,
            personalIdentityNumber: booking.personalIdentityNumber,
            streetAddress: booking.streetAddress,
            zipCode: booking.zipCode,
            postTown: booking.postTown,
            phoneNumber: booking.phoneNumber,
            email: booking.email,
            bookingDate: booking.bookingDate
        });

    }

    GetUnavailableDates(succesFunc, errorFunc) {
        let bookingsRef = this.database.ref("Bookings/");

        bookingsRef.on("value", function (bookings) {
            bookingsRef.off("value");
            let unavailableDates = [];

            bookings.forEach(function (booking) {
                console.log(booking.key + " : " + booking.val());
                let b = booking.val();
                unavailableDates.push(...b.dates);
            });

            succesFunc(unavailableDates);
        }, function (error) {
            bookingsRef.off("value");
            errorFunc(error);
        });
    }
}

class Booking {

    constructor(dates, toPay, firstName, lastName,
        personalIdentityNumber, streetAddress, zipCode, postTown, phoneNumber, email, bookingDate) {

        this.dates = dates;
        this.toPay = toPay;
        this.firstName = firstName;
        this.lastName = lastName;
        this.personalIdentityNumber = personalIdentityNumber;
        this.streetAddress = streetAddress;
        this.zipCode = zipCode;
        this.postTown = postTown;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.bookingDate = bookingDate;
    }
}






