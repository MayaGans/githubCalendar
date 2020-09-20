HTMLWidgets.widget({

  name: 'githubCalendar',

  type: 'output',

  factory: function(el, width, height) {

if (el.length > 0) div[0].innerHTML = "";
    return {

   renderValue: function(x) {

    const stringToDate = d3.timeParse("%Y-%m-%d");
    const rvalues = x.data.value;
    const rdates = x.data.date;
    const rdataarray = rdates.map(
      function (x, i) {
        return { date: stringToDate(x), value: rvalues[i] }
      });
  // need to get the year from x.data.value string
  var chosen_year = x.data.date[0].substring(0,4);

       if (el.length > 0) div[0].innerHTML = "";

        makeChart(rdataarray, el, chosen_year, height)
      },

      resize: function(width, height) {

      }

    };
  }
});
