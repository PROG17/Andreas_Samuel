$(function(){

    $("#listBookingsBtn").on("click", function () {

        // $.get("/getBookings", function (data, error) {
    
        // })
        //     .fail((error) => {
        //         console.log(error);
        //     })
        //     .done((data) => {
        //         PopulateTableWithBookings(data);
        //     });
    
        let booking1 = {
          dates: ["2018-11-01", "2018-11-02"],
          toPay: 11000,
          firstName: "Sven",
          lastName: "Svensson",
          personalIdentityNumber: "19840101-0152",
          streetAddress: "Gråsuggebacken 12",
          zipCode: "14242",
          postTown: "Skogås",
          phoneNumber: "0754839287",
          email: "svennis2@gmail.com",
          bookingDate: "2018-01-04"
        };
    
        let booking2 = {
            dates: ["2018-11-04", "2018-11-05"],
            toPay: 11000,
            firstName: "Anders",
            lastName: "Svensson",
            personalIdentityNumber: "19820223-7352",
            streetAddress: "Blåssippev.17",
            zipCode: "28713",
            postTown: "Göteborg",
            phoneNumber: "042-6563238",
            email: "christiansvensson@gmail.com",
            bookingDate: "2018-02-04"
          };
    
        let bookings = [booking1, booking2];
    
        PopulateTableWithBookings(bookings);
    
    });
    
    function PopulateTableWithBookings(bookings) {
        let contentDiv = $("#content");
        let container = $("<div class='responsive-table'>")
            let headers =
            ["Namn", "Personnr.", "Gatuadr.", "Postnr.", "Ort", "Email", "Telefon", "Datum", "Kostnad", "Bokningsdatum"]
        let table = $("<table class='table table-striped'>")
        let trHead = $("<tr>");
    
        headers.forEach(h => {
            let th = $(`<th>${h}</th>`)
            trHead.append(th);
        });
        let thead = $("<thead class='thead-light'>")
        thead.append(trHead);
        table.append(thead);
    
        tbody = $("<tbody>")
        bookings.forEach(b => {
            let tr = $("<tr>");
    
            tr.append($(`<td>${b.firstName + " " + b.lastName}</td>`));
            tr.append($(`<td>${b.personalIdentityNumber}</td>`));

            // let addressList = $("<ul style='list-style:none; padding:0;'>");
            // addressList.append($(`<p>${b.streetAddress}</p>`))
            // addressList.append($(`<p>${b.zipCode}</p>`))
            // addressList.append($(`<p>${b.postTown}</p>`))

            // tr.append($(`<td>${b.streetAddress},</br>${b.zipCode},</br>${b.postTown}</td>`));
            tr.append($(`<td>${b.streetAddress}</td>`));
            tr.append($(`<td>${b.postTown}</td>`));
            tr.append($(`<td>${b.zipCode}</td>`));
            tr.append($(`<td>${b.email}</td>`));
            tr.append($(`<td>${b.phoneNumber}</td>`));
            let ul = $("<ul>");;
    
            b.dates.forEach(d => {
                let li = $(`<li>${d}</li>`);
                ul.append(li);
            })
            let td = $("<td>");
            tr.append(td.append(ul));
    
            tr.append($(`<td>${b.toPay}</td>`));
            tr.append($(`<td>${b.bookingDate}</td>`));
    
            tbody.append(tr);
        });
        table.append(tbody);
        $(container).append(table);
        $(contentDiv).html(container);
    }

});