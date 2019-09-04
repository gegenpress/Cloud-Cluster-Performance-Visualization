function loadBehaviouralCharts(){
  var margin2 = {top: 61, right: 140, bottom: 101, left: 50};
  var height2 = 300 - margin2.top - margin2.bottom;
  var width2 = 1060 - margin2.left - margin2.right;

  d3.select("#behaviouralSVG").remove();

  var svg = d3.select("#behavioural").append("svg")
      .attr("id", "behaviouralSVG")
      .attr("width",width2 + margin2.left + margin2.right)
      .attr("height",height2 + margin2.top + margin2.bottom)
      .append("g")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

  // setup scales - the domain is specified inside of the function called when we load the data
  var xScale = d3.scale.linear().range([0, width2]);
  var yScale = d3.scale.linear().range([height2, 0]);
  var color = d3.scale.category10();

  // setup the axes
  var xAxis2 = d3.svg.axis().scale(xScale).orient("bottom");
  var yAxis2 = d3.svg.axis().scale(yScale).orient("left");

  // create function to parse dates into date objects
  var parseDate = d3.time.format("%Y-%m-%d").parse;
  var formatDate = d3.time.format("%Y-%m-%d");
  var bisectDate = d3.bisector(function(d) { return d.date; }).left;

  // set the line attributes
  var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yScale(d.close); });

  svg.append("text")
    .attr("x", 0)
    .attr("y", -40)
    .attr("dy", "0.71em")
    .attr("fill", "#000")
    .text("Behavioural Similarity Charts")
    .style("font", "23px avenir")
    .style("fill", "#000000");

  svg.append("text")
    .attr("x", 0)
    .attr("y", 202)
    .attr("dy", "0em")
    .style("font", "12px avenir")
    .style("fill", "#000000")
    .text("This chart shows the similarity between various nodes.");

  // import data and create chart
  d3.csv("out.csv", function(d) {
    if(d.timestamp >= startTime && d.timestamp <= endTime)
      return {
        date: +d.timestamp,
        node1: +d.node1,
        node2: +d.node2,
        node3: +d.node3,
        node4: +d.node4,
        node5: +d.node5,
        node6: +d.node6
      };
    },
    function(error,data) {

      // sort data ascending - needed to get correct bisector results
      data.sort(function(a,b) {
        return a.date - b.date;
      });

      // color domain
      color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

      // create stocks array with object for each company containing all data
      var stocks = color.domain().map(function(name) {
        return {
          name: name,
          values: data.map(function(d){
            return {date: d.date, close: d[name] * 1};
          })
        };
      });

      // add domain ranges to the x and y scales
      xScale.domain([
        d3.min(stocks, function(c) { return d3.min(c.values, function(v) { return v.date; }); }),
        d3.max(stocks, function(c) { return d3.max(c.values, function(v) { return v.date; }); })
      ]);
      yScale.domain([
        0,
        // d3.min(stocks, function(c) { return d3.min(c.values, function(v) { return v.close; }); }),
        d3.max(stocks, function(c) { return d3.max(c.values, function(v) { return v.close; }); })
      ]);

      // add the x axis
      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2).append("text")
        .attr("x", 350)
        .attr("y", 36)
        .attr("fill", "#000")
        .text("Hour of Time")
        .style("font-weight", "bold");

      // add the y axis
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis2)
        .append("text")
          .attr("transform","rotate(-90)")
          .attr("y",-60)
          .attr("dy",".71em")
          .style("text-anchor","end")
          .text("Values");

      // add the line groups
      var stock = svg.selectAll(".stockXYZ")
          .data(stocks)
          .enter().append("g")
          .attr("class","stockXYZ");

      // add the stock price paths
      stock.append("path")
        .attr("class","line")
        .attr("id",function(d,i){ return "id" + i; })
        .attr("d", function(d) {
          return line(d.values);
        })
        .style("stroke", function(d, i) { return get_colors(i); });

      var maxLen = data.length;
      stock.append("text")
        .datum(function(d) {
          return {name: d.name, value: d.values[maxLen - 1]};
        })
        .attr("transform", function(d) {
          return "translate(" + xScale(d.value.date) + "," + yScale(d.value.close) + ")";
        })
        .attr("id",function(d,i){ return "text_id" + i; })
        .attr("x", 3)
        .attr("dy", ".55em")
        .text(function(d) { return d.name; });

      var legend = svg.selectAll(".legend")
      .data(color.domain()).enter()
      .append("g")
      .attr("class","legend")
      .attr("transform", "translate(" + (width +40) + "," + 0+ ")");

      legend.append("rect")
         .attr("x", 0) 
         .attr("y", function(d, i) { return 20 * i; })
         .attr("width", 10)
         .attr("height", 10)
         .style("fill", function(d, i) {
          return get_colors(i);}); 
      
      legend.append("rect")
         .attr("x", 20) 
         .attr("y", function(d, i) { return 20 * i; })
         .attr("width", 10)
         .attr("height", 10)
         .style("fill", "#DFDAD9")
         .on("click", function(d){
         
          if (selected.includes(d))
          {
            this.style.fill = "#DFDAD9";
            for( var i = 0; i < selected.length; i++){ 
               if ( selected[i] === d) {
                 selected.splice(i, 1); 
               }
            }
          } else {
            this.style.fill = "#000000";
            selected.push(d);
          }
          loadDetailedCharts();
         });; 
       
      legend.append("text")
         .attr("x", 40) 
         .attr("dy", "0.75em")
         .attr("y", function(d, i) { return 20 * i; })
         .text(function(d) {return d});
          
      legend.append("text")
         .attr("x",0) 
    //      .attr("dy", "0.75em")
         .attr("y",-10)
         .text("Categories");
  });
}

