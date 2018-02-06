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


