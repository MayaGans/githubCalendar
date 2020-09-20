const makeChart = (rdataarray, el, chosen_year, height) => {

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
    .attr("class", "calendar")
    .style("position", "absolute")
    .style("z-index", "100")
    .style("visibility", "hidden")
    .style("color", "white")
    .style("background-color", "black")
    .style("opacity", 0.7)
    .style("border-radius", "5px")
    .style("padding", "10px")

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
      .on("mouseover", function (event, d, i) {
        d3.select(this)
          .transition()
          .duration("50")
         tooltip.html(d.value + " on " + parseTime(d.date))
        return tooltip.style("visibility", "visible");
      })

      // Setting things back to normal after tool tip
      .on('mouseover', function (event, d) {
         tooltip.html(d.value + " on " + parseTime(d.date))
         return tooltip.style("visibility", "visible")
      })
      .on('mouseout', function (event, d) {
         return tooltip.style("visibility", "hidden")
      })
      .on("mousemove", function(event){
         return tooltip.style("top", (event.pageY-20)+"px")
                       .style("left",(event.pageX+20)+"px");
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
  .text(formatDay)
  .attr("fill", d => (countDay(d) % 2 ? "black" : "white"))

  const month = year.append("g")
  .attr("class","calendar")
  .selectAll("g")
  .data(d => d3.timeMonths(d3.timeMonth(d.values[0].date), d.values[d.values.length - 1].date))
  .enter().append("g")

  month.append("text")
  .attr("class","calendar")
  .attr("x", d => timeWeek.count(d3.timeYear(d), timeWeek.ceil(d)) * cellSize + 2)
  .attr("y", -5)
  .text(formatMonth)
  .attr("fill", d => (d3.timeYear(d) ? console.log(d3.timeMonths(d3.timeMonth(d))) : "white"))

    var colorLegendScale = d3.scaleOrdinal()
  .domain([1,2,3,4,5])
  .range(["#EBEDF0", "#9BE9A8", "#3FC463", "#2EA14E", "#1F6E39"]);

// Add one dot in the legend for each name.
var legendsize = 16

const legend = svg.append("g")
   .selectAll("legend")
  .data([1,2,3,4,5])
  .enter()
  .append("rect")
    .attr("x", function(d,i){ return 750 + i*(legendsize+5)})
    .attr("y", 160)
    .attr("width", legendsize)
    .attr("height", legendsize)
    .style("fill", function(d){ return colorLegendScale(d)})
    .attr("rx", 5)

  svg.append("text")
    .attr("x", 705)
    .attr("y", 173)
    .attr("fill", "black")
    .html("Less")

    svg.append("text")
    .attr("x", 865)
    .attr("y", 173)
    .attr("fill", "black")
    .html("More")
};
