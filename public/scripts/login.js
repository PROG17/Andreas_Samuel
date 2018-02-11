$(function () {
    $("#login-btn").click(function () {
        let emailInput = $("#login-email").val();
        let passInput = $("#login-password").val();

        let toSend = { email: emailInput, password: passInput };

        $.post("/login", toSend, function (data, error) {
        })
            .fail((error) => {
                console.log(error.responseJSON);
                $("#login-validation").text();
                console.log(toSend);
            })
            .done((data) => {
                console.log(data);
                let navList = $("#navbar-list");
                let li = $("li");
                li.addClass("nav-item");
                let btn = $("<button id='listBookingsBtn' class='btn btn-light btn-sm'>Se bokning</button>")
                btn.click(function () {
                    // Anropar get-metod från servern och fyller content
                });
                li.append(btn);
                navlist.append(li);
            })
    });
});