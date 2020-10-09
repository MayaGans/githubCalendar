HTMLWidgets.widget({

  name: 'githubCalendar',

  type: 'output',

  factory: function(el, width, height) {

    return {

      //  attach empty svg that should get populated on render
      svg: null,

      renderValue: function(x) {

        const stringToDate = d3.timeParse("%Y-%m-%d");
        const rvalues = x.data.value;
        const rdates = x.data.date;
        const rdataarray = rdates.map(
          function (x, i) {
            return { date: stringToDate(x), value: rvalues[i] }
          }
        );

        // need to get the year from x.data.value string
        var chosen_year = x.data.date[0].substring(0,4);

        // attach our svg container selection to the widget
        //   then in updates post-render we know that we don't need to recreate
        this.svg = makeChart(rdataarray, el, chosen_year, height, this.svg);
      },

      resize: function(width, height) {

      }

    };
  }
});
