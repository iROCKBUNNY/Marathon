// pace-calculator.js

$('.selection.dropdown').dropdown();

$('#pace-calculator-form').form({
    inline : true,
    on: 'blur',
    fields: {
        hour: {
            identifier: 'hour',
            rules: [
                {
                    type   : 'empty',
                    prompt : 'Please select hour'
                }
            ]
        },
        minute: {
            identifier: 'minute',
            rules: [
                {
                    type   : 'empty',
                    prompt : 'Please select minute'
                }
            ]
        },
        second: {
            identifier: 'second',
            rules: [
                {
                    type   : 'empty',
                    prompt : 'Please select second'
                }
            ]
        },
        distance: {
            identifier: 'distance',
            rules: [
                {
                    type   : 'empty',
                    prompt : 'Please select distance'
                }
            ]
        }
    }
});

function calculatePace() {
    if ($('#pace-calculator-form').form('validate form')) {
        var values = $('#pace-calculator-form').form('get values');
        var pace = ((Number(values.hour) * 60 + Number(values.minute)) * 60 + Number(values.second)) / Number(values.distance);
        var minute = Math.floor(pace / 60);
        var second = pace - minute * 60;
        if (second < 10) {
            $('#pace').text(`${minute}:0${second.toFixed(3)}`);
        } else {
            $('#pace').text(`${minute}:${second.toFixed(3)}`);
        };
    };
};

// set initial values
$('#pace-calculator-form').form('set values', {
    hour: '4',
    minute: '0',
    second: '0',
    distance: '42.195'
});
calculatePace();

// bind event to calculate button
$('#calculate-pace').click(function(event) {
    calculatePace();
});