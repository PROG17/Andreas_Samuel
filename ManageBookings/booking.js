module.exports = class Booking {
    constructor(dates, toPay, firstName, lastName,
        personalIdentityNumber, streetAddress, zipCode, postTown, phoneNumber, email, bookingDate, needClean) {

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
        this.needClean = needClean;
    }
}