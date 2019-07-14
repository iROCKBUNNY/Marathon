---
---

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
        let values = $('#pace-calculator-form').form('get values');
        let pace = ((Number(values.hour) * 60 + Number(values.minute)) * 60 + Number(values.second)) / Number(values.distance);
        let minutes = Math.floor(pace / 60);
        let seconds = Math.floor(pace - minutes * 60);
        let milliseconds = (pace - Math.floor(pace)) * 1000;
        $('#pace').html(`${minutes.toString().padStart(2, '0')}&prime;${seconds.toString().padStart(2, '0')}&Prime;<span class="ui mini text">${milliseconds.toFixed(0).padStart(3, '0')}</span>`);
    };
};

// set initial values
function setInitialValues() {
    $('#pace-calculator-form').form('set values', {
        hour: '{{ site.data.pace_calculator.initial_values.hour }}',
        minute: '{{ site.data.pace_calculator.initial_values.minute }}',
        second: '{{ site.data.pace_calculator.initial_values.second }}',
        distance: '{{ site.data.pace_calculator.initial_values.distance }}'
    });
    calculatePace();
};
setInitialValues();

// update pace when if detecting data change
$('#pace-calculator-form').change(function (event) {
    calculatePace();
});

// bind event to reset button
$('#reset').click(function (event) {
    setInitialValues();
});
