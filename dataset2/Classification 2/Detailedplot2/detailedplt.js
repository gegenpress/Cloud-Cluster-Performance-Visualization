var resultNode;
function loadDetailedCharts(resultNode){
    resultNode = resultNode;
    d3.select("#area1").selectAll("svg").remove();
    d3.select("#area2").selectAll("svg").remove();
    d3.select("#area3").selectAll("svg").remove();
    detailedplot("Detailedplot2/cpu_usr.csv","#area1","CPU usr","Purple", resultNode)
    detailedplot("Detailedplot2/memory_commit.csv","#area2","Memory Commit","black", resultNode)
    detailedplot("Detailedplot2/memory_memused.csv","#area3","Memory Utilization","Orange", resultNode)
}

function detailedplot(filename,divid,textlabel,bgcolor,resultNode){

// Set the dimensions of the canvas / graph
var margin3 = {top: 30, right: 20, bottom: 30, left: 50},
  width3 = 1000 - margin3.left - margin3.right,
  height3 = 250 - margin3.top - margin3.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
var x = d3.scale.linear().range([0, width3]);
var y = d3.scale.linear().range([height3, 0]);

// Define the axes
var xAxis3 = d3.svg.axis().scale(x)
  .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
  .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
  .x(function(d) { return x(d.timestamp); })
  .y(function(d) { return y(d[resultNode.toLowerCase()]); });

var chart1 = d3.select(divid)
    .append("svg")
      .attr("width", width3 + margin3.left + margin3.right)
      .attr("height", height3 + margin3.top + margin3.bottom)
    .append("g")
      .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

 // Get the data
 d3.csv(filename, function(error, data) {
    data.forEach(function(d) {
        d.timestamp = +d.timestamp;
        d[resultNode] = +d[resultNode.toLowerCase()];
    });

  x.domain(d3.extent(data, function(d) { return d.timestamp; }));
  y.domain([0, d3.max(data, function(d) { return d[resultNode.toLowerCase()]; })]);

  chart1.append("rect")
      .attr("x",0)
      .attr("y",-27)
      .attr("width", 250)
      .attr("height", 25)
      .style("fill", bgcolor);

  chart1.append("text")
      .attr("x",25)
      .attr("y",-5)
      .attr("text-anchor", "left")
      .style("font-size", "20px")
      .style("fill", "white")
      .text(textlabel);

  // Add the valueline path.
  chart1.append("path")
    .attr("class", "line")
    .style("stroke", "red")
    .attr("d", valueline(data));

  // Add the X Axis
  chart1.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height3 + ")")
    .call(xAxis3);

  // Add the Y Axis
  chart1.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  });
}
