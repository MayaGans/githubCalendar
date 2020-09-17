HTMLWidgets.widget({

  name: 'githubCalendar',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {
        // TODO: code to render the widget, e.g.
        const stringToDate = d3.timeParse("%Y-%m-%d");

        const rvalues = x.data.value;
        const rdates = x.data.date;

        const rdataarray = rdates.map(
          function (x, i) {
            return { date: stringToDate(x), value: rvalues[i] }
          });
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
