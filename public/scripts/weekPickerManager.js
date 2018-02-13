class WeekPickerManager {

    static reloadWeekPicker(selector, unavailableDates) {
        $(selector).datepicker("destroy");
        this.loadWeekPicker(selector, unavailableDates)
        $('.week-picker').datepicker("refresh");
    }

    static loadWeekPicker(selector, unvavailableDates) {
        $(selector).datepicker({
            calculateWeek: function (date) {
                return Math.floor((moment(date).dayOfYear() - 1) / 7) + 2;
            },
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
            firstDay: 6,
            onSelect: function (dateText, inst) {
                let selectedDates = $(".startDate");
                let startDate = WeekPickerManager.getStartDate(this);
                let containsDate = selectedDates.toArray().contains(startDate);
                if (!containsDate) {
                    $(this).change();
                    WeekPickerManager.addWeekToTable(startDate, WeekPickerManager.getWeekNumber(dateText), "#weeks");
                    WeekPickerManager.PopulateInputWithTableSum(".week-cost", "#topay");
                    WeekPickerManager.setValidationMessage("#week-picker-validation", "");
                    WeekPickerManager.setValidationMessage(".weeks-validation", "");
                }
                else {
                    WeekPickerManager.setValidationMessage("#week-picker-validation", "Veckan är redan vald.")
                }

                // $('.ui-datepicker-calendar tr').find('td a').addClass('ui-state-active');

                // $(this).datepicker('setDate', null);
            },
            beforeShowDay: function (date) {
                let array = unvavailableDates == undefined ? [] : unvavailableDates;
                var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                return [array.indexOf(string) == -1]
            }
        });
        $(document)
            .on('mousemove', '.ui-datepicker-calendar tr', function () {
                $(this).find('td a').addClass('ui-state-hover')
            })
            .on('mouseleave', '.ui-datepicker-calendar tr', function () {
                $(this).find('td a').removeClass('ui-state-hover')
            })
            .on('toggle', '.ui-datepicker-calendar tr', function () {
                $(this).find('td a').addClass('ui-state-active')
            })
    }
    static PopulateInputWithTableSum(costSelector, inputSelector) {
        $(inputSelector).val(WeekPickerManager.CalculateSum(costSelector));
    }

    static CalculateSum(costSelector) {
        let costs = $(costSelector);
        let sum = 0;
        Array.from(costs).forEach(c => {
            let amount = $(c).val();
            sum += Number(amount);
        })
        if ($("#cleaning").prop("checked") == true){
            sum += 1200;
        }
        return sum;
    }

    static addWeekToTable(startDate, weekNumber, tableSelector) {
        let addedWeeksCount = $(tableSelector + " > tbody").children().length;
        let weekCost;
        let weekIsHighSeason =
            [25, 26, 27, 28, 29, 30, 31, 32]
                .filter(x => x == weekNumber) > 0 ? true : false;

        if (weekIsHighSeason) {
            weekCost = 4500;
        }
        else {
            weekCost = 3500;
        }

        let tr = $("<tr id='tr" + addedWeeksCount + "'>");
        let td1 = $("<td class='w-25'>");
        let td2 = $("<td class='w-25'>");
        let td3 = $("<td class='w-25'>");
        let td4 = $("<td class='w-25'>");

        let text = $("<p>" + weekNumber + "</p>").attr("id", "w" + addedWeeksCount);

        let startDateHidden = $("<input type='hidden'>").attr("value", startDate);
        startDateHidden.addClass("startDate");

        let costText = $(`<p class='badge badge-pill badge-secondary'>${weekCost + " kr"}</p>`)

        let costHidden = $("<input type='hidden'>").attr("value", weekCost);
        costHidden.addClass("week-cost");

        let deleteBtn = $("<button class='btn btn-sm btn-danger'" + addedWeeksCount + "'>x</button>")
        deleteBtn.click(function () {
            $(this).parent().parent().remove();
            WeekPickerManager.PopulateInputWithTableSum(".week-cost", "#topay");
        })

        td1.append(text);
        td1.append(startDateHidden);
        td2.append(costText);
        td2.append(costHidden);
        td4.append(deleteBtn);

        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);

        $(tableSelector).append(tr);
    };

    static setValidationMessage(selector, message) {
        $(selector).text(message)
    }

    static getStartDate(input) {
        let $input = $(input);
        let date = $input.datepicker('getDate');
        if (date !== null) {
            let firstDay = $input.datepicker("option", "firstDay");
            let dayAdjustment = date.getDay() - firstDay;
            if (dayAdjustment < 0) {
                dayAdjustment += 7;
            }
            let startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - dayAdjustment);

            let inst = $input.data('datepicker');
            let dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
            return $.datepicker.formatDate(dateFormat, startDate, inst.settings);
        }
    }

    // static get weekdays(){
    //     return ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    // }

    static getWeekNumber(dateText) {
        let day = moment(dateText).isoWeekday();
        if (day === 6 || day === 7) {
            return ($.datepicker.iso8601Week(new Date(dateText))) + 1;
        }
        else {
            return $.datepicker.iso8601Week(new Date(dateText));
        }

    }
    static updateWeekPickerDates(selector) {
        $.get("/getUnavailableDates", (bookings) => {
            //success
            // console.log(bookings);
            console.log("Första get")
            // unavailableDates = bookings;
        })
            .done((bookings) => {
                console.log("Klar")
                WeekPickerManager.reloadWeekPicker(selector, bookings)
            })
            .fail((error) => {
                //fail
                console.log(error.responseJSON);
            });
    }
}