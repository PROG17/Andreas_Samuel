$("#sundreSkola").click((e) => {
    $.get('/sundreSkola', (data) => {
        $("#content").html(data);
    });
});

$("#includesBtn").click((e) => {
    $.get('/includes', (data) => {
        $("#content").html(data);
    });
});

$("#findUsBtn").click((e) => {
    $.get('/findus', (data) => {
        $("#content").html(data);
    });
});

$("#historyBtn").click((e) => {
    $.get('/history', (data) => {
        $("#content").html(data);
    });
});

$(".surroundingBtn").click((e) => {
    let href = e.target.getAttribute("data-href");
    let iframe = document.createElement("iframe");
    iframe.className = "IframePage";
    // iframe.width = "900";
    // iframe.height = "600";
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
            if (response.user.role === "admin") {
                console.log("Admin logged in");                
                $("#login").prepend("<button id='logoff-btn' type='button' class='btn btn-light btn-sm'>Logga ut</button>");
                $("#logoff-btn").click(function(){
                    // Logga ut på servern och uppdatera nav
                    checkIfLoggedIn();
                });
                addListBookingsBtn();
                $("#login-btn").remove();
            }
        }
        else{
            $("#login").prepend("<button id='login-btn' type='button' class='btn btn-light btn-sm' data-toggle='modal' data-target='#exampleModal'>Logga in</button>");
            $("#logoff-btn").remove()
        }
    });
};

checkIfLoggedIn();