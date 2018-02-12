$(function () {
    $("#login-btn").click(function () {
        let emailInput = $("#login-email").val();
        let passInput = $("#login-password").val();

        let login = { email: emailInput, password: passInput };

        $.post("/login", login, (data, textStatus, jqxhr) => {
            console.log("success login");
        })
            .fail((error) => {
                console.log("failed to login");
                $("#login-validation").text();
            })
            .done((data) => {
                checkIfLoggedIn();
            })
    });
});