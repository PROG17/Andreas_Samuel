$(function() {   
$(function () {
    var startDate;
    var endDate;

    var selectCurrentWeek = function () {
        window.setTimeout(function () {
            $('.ui-weekpicker').find('.ui-datepicker-current-day a').addClass('ui-state-active').removeClass('ui-state-default');
        }, 1);
    }

    var getStartDate = function (input) {
        var $input = $(input);
        var date = $input.datepicker('getDate');
        if (date !== null) {
            var firstDay = $input.datepicker( "option", "firstDay" );
            var firstDay = $input.datepicker("option", "firstDay");
            var dayAdjustment = date.getDay() - firstDay;
            if (dayAdjustment < 0) {
                dayAdjustment += 7;
            }
            startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - dayAdjustment);

            var inst = $input.data('datepicker');
            var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
            return $.datepicker.formatDate(dateFormat, startDate, inst.settings);
        }
    }

    var getWeekNumber = function(dateText){
    var getWeekNumber = function (dateText) {
        return $.datepicker.iso8601Week(new Date(dateText))
    }

    $('.week-picker').datepicker({
        beforeShow: function () {
            $('#ui-datepicker-div').addClass('ui-weekpicker');
            selectCurrentWeek();
            var d = $('.ui-weekpicker > table');
        },
        onClose: function () {
            $('#ui-datepicker-div').removeClass('ui-weekpicker');
        },
        showOtherMonths: true,
        selectOtherMonths: true,
        showWeek: true,
        minDate: 0,
        onSelect: function (dateText, inst) {
            let selectedDates = $(".startDate");
            let startDate = getStartDate(this);
            let containsDate = selectedDates.toArray().contains(startDate);
            if(!containsDate){
            if (!containsDate) {
                $(this).change();
                addWeekToTable(startDate, getWeekNumber(dateText));
                $("#week-picker-validation").text("");
            }
            else{
            else {
                $("#week-picker-validation").text("Veckan är redan vald.")
            }
            

            $(this).val("Välj veckor");
        },
        beforeShowDay: function(date){
            // let array = [];

         


            // bookingManager.GetUnavailableDates((dates)=>{
            //     array = dates;
            //   }, (error)=>{
            //     console.log(error);
            //   });
              
=======
        beforeShowDay: function (date) {
            // var $calendarTR = $('.ui-weekpicker .ui-datepicker-calendar tbody tr');
            // var $calendarTR = $('.ui-weekpicker');
            // var tbl = $calendarTR.children("table");
            // var cal = document.querySelector("#ui-datepicker-div");
            // $calendarTR.on('mousemove', function () {
            //     $(this).find('td a').addClass('ui-state-hover');
            // });
            // $calendarTR.on('mouseleave' ,function () {
            //     $(this).find('td a').removeClass('ui-state-hover');
            // });

            let array = [];
            bookingManager.GetUnavailableDates((dates) => {
                array = dates;
            }, (error) => {
                console.log(error);
            });
            var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
        return [ array.indexOf(string) == -1 ]
            return [array.indexOf(string) == -1]
        }
    });

    var $calendarTR = $('.ui-weekpicker .ui-datepicker-calendar tr');
    $calendarTR.live('mousemove', function () {
    
    var $calendarTR = $('.week-picker .ui-datepicker-calendar tbody tr');
    // var $calendarTR = $('.ui-weekpicker').children();
    // $calendarTR.live('mousemove', function () {
    //     $(this).find('td a').addClass('ui-state-hover');
    // });
    // $calendarTR.live('mouseleave', function () {
    //     $(this).find('td a').removeClass('ui-state-hover');
    // });
    $calendarTR.on('mouseover', function (event) {
        event.preventDefault();
        $(this).find('td a').addClass('ui-state-hover');
    });
    $calendarTR.live('mouseleave', function () {
    $calendarTR.on('mouseleave' ,function (event) {
        event.preventDefault();
        $(this).find('td a').removeClass('ui-state-hover');
    });



});