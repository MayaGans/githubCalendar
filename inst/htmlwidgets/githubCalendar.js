HTMLWidgets.widget({

  name: 'githubCalendar',

  type: 'output',

  factory: function(el, width, height) {


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
  var chosen_year = 2020;

  const makeChart = () => {

  const colorScale = d3.scaleOrdinal()
  .domain(d3.extent(rdataarray, d => d.value))
  .range(["#9BE9A8", "#3FC463", "#2EA14E", "#1F6E39"]);

  const formatMonth = d3.timeFormat("%b");
  const formatDay = d => "SMTWTFS"[d.getDay()];
  const formatDate = d3.timeFormat("%x");
  const format = d3.format("+.2%");
  const countDay = d => d.getDay();
  const timeWeek = d3.timeSunday;
  const cellSize = 17;

  const parseTime = d3.timeFormat("%b %d");

      let dimensions = {
      width: 900,
      height: 200,
      margin: {
        top: 15,
        right: 15,
        bottom: 40,
        left: 50,
      },
    };

    dimensions.boundedWidth =
      dimensions.width - dimensions.margin.left - dimensions.margin.right;

    dimensions.boundedHeight =
      dimensions.height - dimensions.margin.top - dimensions.margin.bottom;


 var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "100")
    .style("visibility", "hidden")
    .style("color", "white")
    .style("background-color", "black")
    .style("opacity", 0.7)
    .style("border-radius", "5px")
    .style("padding", "10px")
    .attr("class", "tooltip")

 var div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  const svg = d3.select(el)
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${
          dimensions.width + dimensions.margin.left + dimensions.margin.right
        } ${
          dimensions.height + dimensions.margin.top + dimensions.margin.bottom
        }`
      )

  var calendarData = [{key: chosen_year, values: rdataarray}];

  const year = svg.selectAll("g")
  .data(calendarData)
  .enter().append("g")
  .attr("class","calendar")
  .attr("transform", (d, i) => `translate(40,${height * i + cellSize * 1.5})`);

  year.append("g")
  .attr("class","calendar")
  .selectAll("rect")
  .data(d => d.values)
  .enter().append("rect")
  .attr("width", cellSize - 1)
  .attr("height", cellSize - 1)
  .attr("x", d => timeWeek.count(d3.timeYear(d.date), d.date) * cellSize + 0.5)
  .attr("y", d => countDay(d.date) * cellSize + 0.5)
  .attr('fill', d => d.value === 0 ? "#EBEDF0" : colorScale(d.value))
  .attr("stroke", 'white')
  .attr("rx", 5)
  .on('mouseover', function (d, i) {
         tooltip.html(d.value + " on " + parseTime(d.date))
         return tooltip.style("visibility", "visible")
      })
      .on('mouseout', function (d, i) {
         return tooltip.style("visibility", "hidden")
      })
      .on("mousemove", function(d) {
        // why is this undefined on NaN?
         return tooltip.html(d.value + " on " + parseTime(d.date))
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
      })

  // I want this to print only Mon, Wed, Fri
  year.append("g")
  .attr("text-anchor", "end")
  .attr("class","calendar")
  .selectAll("text")
  .data((d3.range(7)).map(i => new Date(chosen_year, 0, i)))
  .enter().append("text")
  .attr("x", -5)
  .attr("y", d => (countDay(d) + 0.5) * cellSize)
  .attr("dy", "0.31em")
  .text(formatDay);

  const month = year.append("g")
  .attr("class","calendar")
  .selectAll("g")
  .data(d => d3.timeMonths(d3.timeMonth(d.values[0].date), d.values[d.values.length - 1].date))
  .enter().append("g")

  month.append("text")
  .attr("class","calendar")
  .attr("x", d => timeWeek.count(d3.timeYear(d), timeWeek.ceil(d)) * cellSize + 2)
  .attr("y", -5)
  .text(formatMonth);
};
        makeChart()
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
