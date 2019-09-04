function get_colors(n) {
var colors = ["#a6cee3","#1f78b4","#b2df8a","#33a02c",
"#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6",
"#6a3d9a"];

 return colors[ n % colors.length];}
  
var margin = {top: 61, right: 140, bottom: 101, left: 50},
    width = 1060 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(24, "s");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5, "s");

var area = d3.svg.area()
    .x(function(d) { return x(d.timestamp); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });
  
  
var stack = d3.layout.stack()
    .values(function(d) { return d.values; });
  
var svg2 = d3.select("#stackedtimeline").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .on("mousedown", mousedown)
    .on("mouseup", mouseup);

var startTime, endTime;
var selected = [];
var nodes = [];

  function mousedown() {
      var m = d3.mouse(this);

      svg2.select("#rangeRect").remove()
    
      rect2 = svg2.append("rect")
          .attr("x", m[0])
          .attr("y", 0)
          .attr("height", height)
          .attr("width", 0)
          .attr("id", "rangeRect");
      svg2.on("mousemove", mousemove);
      startTime = m[0];
    }

  function mousemove(d) {
      var m = d3.mouse(this);
      rect2.attr("width", Math.max(0, m[0] - +rect2.attr("x")));
  }

  function mouseup() {
      svg2.on("mousemove", null);
      startTime = map_time(rect2.attr("x"));
      endTime = map_time(parseInt(rect2.attr("x")) + parseInt(rect2.attr("width")));
      loadBehaviouralCharts();
  }

  function map_time(num) {
    var out_min, out_max;
    out_min = x.domain()[0];
    out_max = x.domain()[1];
    return (num - 0) * (out_max - out_min) / (width) + out_min;
  }
  
  svg2.append("text")
    .attr("x", 0)
    .attr("y", -40)
    .attr("dy", "0.71em")
    .attr("fill", "#000")
    .text("Stacked timeline overview")
    .style("font", "23px avenir")
    .style("fill", "#000000");
  
  svg2.append("text")
    .attr("x", 0)
    .attr("y", 202)
    .attr("dy", "0em")
    .style("font", "12px avenir")
    .style("fill", "#000000")
    .text("This is the stacked timeline view of the cluster performance.");
  
  
    d3.csv("data.csv", function(error, data) {
   
     color.domain(d3.keys(data[0]).filter(function(key) {return key !== "timestamp"; }));
 
     data.forEach(function(d) {  
      d.timestamp = +d.timestamp;
      d.cpu_usr = +d.cpu_usr;
      d.cpu_sys= +d.cpu_sys;
      d.cpu_iowait= +d.cpu_iowait;
      d.cpu_steal = +d.cpu_steal;
      d.cpu_idle = +d.cpu_idle;
      d.network_ifutil = +d.network_ifutil;
      d.memory_memused = +d.memory_memused;
      d.memory_commit = +d.memory_commit;
      d.disk_util = +d.disk_util;
      d.paging_vmeff = +d.paging_vmeff;
      }); 
       
       

  var browsers = stack(color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {timestamp: d.timestamp, y: d[name] * 1};
      })
    };
  }));

//   // Set domains for axes
  x.domain(d3.extent(data, function(d) { return d.timestamp; }));
  y.domain([0, 500])

  var browser2 = svg2.selectAll(".browser")
      .data(browsers)
      .enter().append("g")
      .attr("class", "browser");

  browser2.append("path")
      .attr("class", "area")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d,i) { 
        return get_colors(i); });

   svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis).append("text")
      .attr("x", 350)
      .attr("y", 36)
      .attr("fill", "#000")
      .text("Hour of Time")
      .style("font-weight", "bold");

  svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -250)
      .attr("y", -40)
      .attr("dy", "0.3408em")
      .attr("fill", "#000")
      .text("")
      .style("font-weight", "bold");
      
  var legend2 = svg2.selectAll(".legend")
      .data(color.domain()).enter()
      .append("g")
      .attr("class","legend")
      .attr("transform", "translate(" + (width +40) + "," + 0+ ")");

  legend2.append("rect")
     .attr("x", 0) 
     .attr("y", function(d, i) { return 20 * i; })
     .attr("width", 10)
     .attr("height", 10)
     .style("fill", function(d, i) {
      return get_colors(i);}); 
   
  legend2.append("text")
     .attr("x", 20) 
     .attr("dy", "0.75em")
     .attr("y", function(d, i) { return 20 * i; })
     .text(function(d) {return d});
      
  legend2.append("text")
     .attr("x",0) 
//      .attr("dy", "0.75em")
     .attr("y",-10)
     .text("Categories");


});