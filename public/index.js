$("#sundreSkola").click((e) => {
    $.get('/sundreSkola', (data) => {
        animateContent(data, "rotate");
    });
});

$("#includesBtn").click((e) => {
    $.get('/includes', (data) => {
        animateContent(data, "slideFromRight");
    });
});

function animateContent(htmlContent, animateClassName) {
    let content = $("#content");
    let footer = $("#sectionFooter");
    footer.addClass("hide");
    content.removeClass().addClass("hide");
    $("#content").html(htmlContent);
    setTimeout(() => {
        content.addClass(animateClassName);
        footer.removeClass("hide");
    }, 100);
}

$("#findUsBtn").click((e) => {
    $.get('/findus', (data) => {       
        animateContent(data, "slideFromDown");
    });
});

$("#historyBtn").click((e) => {
    $.get('/history', (data) => {
        animateContent(data, "rotate");
    });
});

$(".surroundingBtn").click((e) => {
    let href = e.target.getAttribute("data-href");
    let iframe = document.createElement("iframe");
    iframe.className = "IframePage";
    iframe.src = href;
    $("#content").empty().append(iframe);
});


$.get('/sundreSkola', (data) => {
    $("#content").html(data);
});

function checkIfLoggedIn() {
    $.get("/getLoggedInStatus", (response) => {
        console.log(response);

        if (response.loggedIn === true) {
            $("#login-btn").remove();
            if (response.user.role === "admin") {
                console.log("Admin logged in");
                addListBookingsBtn();
                $("#login").prepend("<button id='logoff-btn' type='button' class='btn btn-light btn-sm'>Logga ut</button>");

                $("#logoff-btn").click(function () {
                    $.get("/logout", (response) => {
                        $("#sundreSkola").trigger("click");
                        checkIfLoggedIn();
                        console.log(response);
                    }).fail((error) => {
                        console.log(error.message);
                        console.error.error;
                    });
                });
                $("#login-btn").remove();
            }
        }
        else {
            $("#login").prepend("<button id='login-btn' type='button' class='btn btn-light btn-sm' data-toggle='modal' data-target='#login-modal'>Logga in</button>");
            $("#logoff-btn").remove();
            $("#listBookingsBtn").remove();
        }
    });
};

checkIfLoggedIn();