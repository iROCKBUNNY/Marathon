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
        var minutes = Math.floor(pace / 60);
        var seconds = Math.floor(pace - minutes * 60);
        var milliseconds = (pace - Math.floor(pace)) * 1000;
        $('#pace').html(`${minutes.toString().padStart(2, '0')}'${seconds.toString().padStart(2, '0')}"<span class="ui mini text">${milliseconds.toFixed(0).padStart(3, '0')}</span>`);
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