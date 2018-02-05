$(function() {   
    var startDate;
    var endDate;

    var selectCurrentWeek = function () {
        window.setTimeout(function () {
            $('.ui-weekpicker').find('.ui-datepicker-current-day a').addClass('ui-state-active').removeClass('ui-state-default');
        }, 1);
    }

    var setDates = function (input) {
        var $input = $(input);
        var date = $input.datepicker('getDate');
        if (date !== null) {
            var firstDay = $input.datepicker( "option", "firstDay" );
            var dayAdjustment = date.getDay() - firstDay;
            if (dayAdjustment < 0) {
                dayAdjustment += 7;
            }
            startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - dayAdjustment);
            endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - dayAdjustment + 6);
    
            var inst = $input.data('datepicker');
            var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
            $('#startDate').text($.datepicker.formatDate(dateFormat, startDate, inst.settings));
            $('#endDate').text($.datepicker.formatDate(dateFormat, endDate, inst.settings));
        }
    }

    var getStartDate = function (input) {
        var $input = $(input);
        var date = $input.datepicker('getDate');
        if (date !== null) {
            var firstDay = $input.datepicker( "option", "firstDay" );
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
        return $.datepicker.iso8601Week(new Date(dateText))
    }

    function addWeekToTable(startDate, weekNumber){
        let addedWeeksCount = $("#weeks > tbody").children().length;

        let tr = $("<tr>");
        let td = $("<td>");

        let text = $("<p>" + weekNumber + "</p>").attr("id", "w" + addedWeeksCount);
        let startDateHidden = $("<input type='hidden'>").attr("value", startDate);
        startDateHidden.addClass("startDate");

        td.append(text);
        td.append(startDateHidden);

        tr.append(td);

        $("#weeks").append(tr);
    }

    $('.week-picker').datepicker({
        beforeShow: function () {
            $('#ui-datepicker-div').addClass('ui-weekpicker');
            selectCurrentWeek();
        },
        onClose: function () {
            $('#ui-datepicker-div').removeClass('ui-weekpicker');
        },
        showOtherMonths: true,
        selectOtherMonths: true,
        showWeek: true,
        onSelect: function (dateText, inst) {
            setDates(this);
            selectCurrentWeek();
            $(this).change();
            // $(this).val("V." + $.datepicker.iso8601Week(new Date(dateText)));
            addWeekToTable(getStartDate(this), getWeekNumber(dateText));
            $(this).val("Välj veckor");
        },
        beforeShowDay: function (date) {
            var cssClass = '';
            if (date >= startDate && date <= endDate)
                cssClass = 'ui-datepicker-current-day';
            return [true, cssClass];
        },
        beforeShowDay: function(date){
            let array = getUnavailableDates();
            var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
        return [ array.indexOf(string) == -1 ]
        },
        onChangeMonthYear: function (year, month, inst) {
            selectCurrentWeek();
        }
    });
    
    setDates('.week-picker');

    var $calendarTR = $('.ui-weekpicker .ui-datepicker-calendar tr');
    $calendarTR.live('mousemove', function () {
        $(this).find('td a').addClass('ui-state-hover');
    });
    $calendarTR.live('mouseleave', function () {
        $(this).find('td a').removeClass('ui-state-hover');
    });
});