const makeChart = (el) => {

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
  .attr("rx", 5);

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
