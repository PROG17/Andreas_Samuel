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
    iframe.className="IframePage";
    // iframe.width = "900";
    // iframe.height = "600";
    iframe.src = href;
    $("#content").empty().append(iframe);
});


$.get('/sundreSkola', (data) => {
    $("#content").html(data);
});

