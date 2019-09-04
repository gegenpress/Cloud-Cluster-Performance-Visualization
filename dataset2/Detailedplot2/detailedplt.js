function loadDetailedCharts(){
    d3.select("#area1").selectAll("svg").remove();
    d3.select("#area2").selectAll("svg").remove();
    d3.select("#area3").selectAll("svg").remove();
    if(selected.length == 0){
      return
    }
    detailedplot("Detailedplot2/cpu_usr.csv","#area1","CPU usr","Purple")
    detailedplot("Detailedplot2/memory_commit.csv","#area2","Memory Commit","black")
    detailedplot("Detailedplot2/memory_memused.csv","#area3","Memory Utilization","Orange")
    nodes = ["node1", "node2", "node3", "node4", "node5", "node6"]
    for( var i = 0; i < selected.length; i++){ 
      for( var j = 0; j < nodes.length; j++){ 
         if ( nodes[j] === selected[i]) {
           nodes.splice(j, 1); 
         }
      }
    }
    detailedplot2("Detailedplot2/cpu_usr.csv","#area1","CPU usr","Purple")
    detailedplot2("Detailedplot2/memory_commit.csv","#area2","Memory Commit","black")
    detailedplot2("Detailedplot2/memory_memused.csv","#area3","Memory Utilization","Orange")
}

function detailedplot(filename,divid,textlabel,bgcolor){

// Set the dimensions of the canvas / graph
var margin3 = {top: 30, right: 20, bottom: 30, left: 50},
  width3 = 500 - margin3.left - margin3.right,
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
  .y(function(d) { return y(d.node1); });

var valueline2 = d3.svg.line()
    .x(function(d) { return x(d.timestamp); })
    .y(function(d) { return y(d.node2); });

var valueline3 = d3.svg.line()
    .x(function(d) { return x(d.timestamp); })
    .y(function(d) { return y(d.node3); });

var valueline4 = d3.svg.line()
    .x(function(d) { return x(d.timestamp); })
    .y(function(d) { return y(d.node4); });

var valueline5 = d3.svg.line()
    .x(function(d) { return x(d.timestamp); })
    .y(function(d) { return y(d.node5); });

var valueline6 = d3.svg.line()
    .x(function(d) { return x(d.timestamp); })
    .y(function(d) { return y(d.node6); });

var valueline7 = d3.svg.line()
    .x(function(d) { return x(d.timestamp); })
    .y(function(d) { return y(d.node7); });

var chart1 = d3.select(divid)
    .append("svg")
      .attr("width", width3 + margin3.left + margin3.right)
      .attr("height", height3 + margin3.top + margin3.bottom)
    .append("g")
      .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

 // Get the data
 d3.csv(filename, function(error, data) {
    data.forEach(function(d) {
      if(d.timestamp >= startTime && d.timestamp <= endTime){
        d.timestamp = +d.timestamp;
        d.node1 = +d.node1;
        d.node2 = +d.node2;
        d.node3 = +d.node3;
        d.node4 = +d.node4;
        d.node5 = +d.node5;
        d.node6 = +d.node6;
        d.node7 = +d.node7;
      }
    });

  x.domain(d3.extent(data, function(d) { return d.timestamp; }));
  y.domain([0, d3.max(data, function(d) { return Math.max(d.node1, d.node2, d.node3, d.node4, d.node5, d.node6, d.node7); })]);

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

  for (var i = 0; i < selected.length; i++) {
      if(selected[i]=="node1"){
        chart1.append("path")
          .attr("class", "line")
          .style("stroke", "red")
          .attr("d", valueline(data));
      } else if(selected[i]=="node2"){
        chart1.append("path")
          .attr("class", "line")
          .style("stroke", "red")
          .attr("d", valueline2(data));
      } else if(selected[i]=="node3"){
          chart1.append("path")
            .attr("class", "line")
            .style("stroke", "red")
            .attr("d", valueline3(data));
      } else if(selected[i]=="node4"){
          chart1.append("path")
            .attr("class", "line")
            .style("stroke", "red")
            .attr("d", valueline4(data));
      } else if(selected[i]=="node5"){
          chart1.append("path")
            .attr("class", "line")
            .style("stroke", "red")
            .attr("d", valueline5(data));
      } else if(selected[i]=="node6"){
          chart1.append("path")
            .attr("class", "line")
            .style("stroke", "red")
            .attr("d", valueline6(data));
      } else if(selected[i]=="node7"){
          chart1.append("path")
            .attr("class", "line")
            .style("stroke", "red")
            .attr("d", valueline7(data));
      } 
  }

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

function detailedplot2(filename,divid,textlabel,bgcolor){

// Set the dimensions of the canvas / graph
var margin3 = {top: 30, right: 20, bottom: 30, left: 50},
  width3 = 500 - margin3.left - margin3.right,
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
  .y(function(d) { return y(d.node1); });

var valueline2 = d3.svg.line()
    .x(function(d) { return x(d.timestamp); })
    .y(function(d) { return y(d.node2); });

var valueline3 = d3.svg.line()
    .x(function(d) { return x(d.timestamp); })
    .y(function(d) { return y(d.node3); });

var valueline4 = d3.svg.line()
    .x(function(d) { return x(d.timestamp); })
    .y(function(d) { return y(d.node4); });

var valueline5 = d3.svg.line()
    .x(function(d) { return x(d.timestamp); })
    .y(function(d) { return y(d.node5); });

var valueline6 = d3.svg.line()
    .x(function(d) { return x(d.timestamp); })
    .y(function(d) { return y(d.node6); });

var valueline7 = d3.svg.line()
    .x(function(d) { return x(d.timestamp); })
    .y(function(d) { return y(d.node7); });

var chart1 = d3.select(divid)
    .append("svg")
      .attr("width", width3 + margin3.left + margin3.right)
      .attr("height", height3 + margin3.top + margin3.bottom)
    .append("g")
      .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

 // Get the data
 d3.csv(filename, function(error, data) {
    data.forEach(function(d) {
      if(d.timestamp >= startTime && d.timestamp <= endTime){
        d.timestamp = +d.timestamp;
        d.node1 = +d.node1;
        d.node2 = +d.node2;
        d.node3 = +d.node3;
        d.node4 = +d.node4;
        d.node5 = +d.node5;
        d.node6 = +d.node6;
        d.node7 = +d.node7;
      }
    });

  x.domain(d3.extent(data, function(d) { return d.timestamp; }));
  y.domain([0, d3.max(data, function(d) { return Math.max(d.node1, d.node2, d.node3, d.node4, d.node5, d.node6, d.node7); })]);

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

  for (var i = 0; i < nodes.length; i++) {
      if(nodes[i]=="node1"){
        chart1.append("path")
          .attr("class", "line")
          .style("stroke", "yellow")
          .attr("d", valueline(data));
      } else if(nodes[i]=="node2"){
        chart1.append("path")
          .attr("class", "line")
          .style("stroke", "yellow")
          .attr("d", valueline2(data));
      } else if(nodes[i]=="node3"){
          chart1.append("path")
            .attr("class", "line")
            .style("stroke", "yellow")
            .attr("d", valueline3(data));
      } else if(nodes[i]=="node4"){
          chart1.append("path")
            .attr("class", "line")
            .style("stroke", "yellow")
            .attr("d", valueline4(data));
      } else if(nodes[i]=="node5"){
          chart1.append("path")
            .attr("class", "line")
            .style("stroke", "yellow")
            .attr("d", valueline5(data));
      } else if(nodes[i]=="node6"){
          chart1.append("path")
            .attr("class", "line")
            .style("stroke", "yellow")
            .attr("d", valueline6(data));
      } else if(nodes[i]=="node7"){
          chart1.append("path")
            .attr("class", "line")
            .style("stroke", "yellow")
            .attr("d", valueline7(data));
      } 
  }

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
