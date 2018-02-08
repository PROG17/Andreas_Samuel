
class Weekpicker {
    constructor() {

        $(document)
            .on('mousemove', '.ui-datepicker-calendar tr', function () {
                $(this).find('td a').addClass('ui-state-hover')
            })
            .on('mouseleave', '.ui-datepicker-calendar tr', function () {
                $(this).find('td a').removeClass('ui-state-hover')
            });
    }
    loadWeekPicker(uDates) {
        $('.week-picker').datepicker("destroy");
        $('.week-picker').datepicker({
            beforeShow: function () {
                $('#ui-datepicker-div').addClass('ui-weekpicker');
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
                if (!containsDate) {
                    $(this).change();
                    addWeekToTable(startDate, getWeekNumber(dateText));
                    $("#week-picker-validation").text("");
                }
                else {
                    $("#week-picker-validation").text("Veckan är redan vald.")
                }
                $(this).datepicker('setDate', null);
            },
            beforeShowDay: function (date) {
                // let array = unavailableDates == undefined ? [] : unavailableDates;
                let array = uDates == undefined ? [] : uDates;
                var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                return [array.indexOf(string) == -1]
            }
        });
        $('.week-picker').datepicker("refresh");
    }
    getStartDate(input) {
        var $input = $(input);
        var date = $input.datepicker('getDate');
        if (date !== null) {
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
    getWeekNumber(dateText) {
        return $.datepicker.iso8601Week(new Date(dateText))
    }
    static updateWeekPicker() {
        $.get("/getUnavailableDates", (bookings) => {
            //success
            // console.log(bookings);
            console.log("Första get")
            // unavailableDates = bookings;
        })
            .done((bookings) => {
                console.log("Klar")
                loadWeekPicker(bookings);
            })
            .fail((error) => {
                //fail
                console.log(error.responseJSON);
            });
    }
}