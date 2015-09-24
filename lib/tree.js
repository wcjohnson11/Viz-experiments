// a badass two sided tree (for a 2-sided marketplace???)

var margin = {top: 0, right: 40, bottom: 0, left: 40},
    width = 720,
    step = 100;

function tree(leftRoot, rightRoot, outerHeight) {
  if (arguments.length < 3) outerHeight = rightRoot, rightRoot = null;

  var height = outerHeight - margin.top - margin.bottom;

  var tree = d3.layout.tree()
      .size([height, 1])
      .separation(function() { return 1; });

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("margin", "1em 0 1em " + -margin.left + "px");

  var g = svg.selectAll("g")
      .data([].concat(
        leftRoot ? {type: "left", nodes: tree.nodes(leftRoot)} : [],
        rightRoot ? {type: "right", nodes: tree.nodes(rightRoot).map(flip), flipped: true} : []
      ))
    .enter().append("g")
      .attr("class", function(d) { return d.type; })
      .attr("transform", function(d) { return "translate(" + (!!d.flipped * width + margin.left) + "," + margin.top + ")"; });

  var link = g.append("g")
      .attr("class", "link")
    .selectAll("path")
      .data(function(d) { return tree.links(d.nodes); })
    .enter().append("path")
      .attr("class", linkType);

  var node = g.append("g")
      .attr("class", "node")
    .selectAll("g")
      .data(function(d) { return d.nodes; })
    .enter().append("g")
      .attr("class", function(d) { return d.type; });

  node.append("rect");

  node.append("text")
      .attr("dy", ".35em")
      .text(function(d) { return d.name; })
      .each(function(d) { d.width = Math.max(32, this.getComputedTextLength() + 12); })
      .attr("x", function(d) { return d.flipped ? 6 - d.width : 6; });

  node.filter(function(d) { return "join" in d; }).insert("path", "text")
      .attr("class", "join");

  svg.call(reset);

  function name(d) {
    return d.name;
  }

  function flip(d) {
    d.depth *= -1;
    d.flipped = true;
    return d;
  }

  return svg;
}

function linkType(d) {
  return d.target.type.split(/\s+/).map(function(t) { return "to-" + t; })
      .concat(d.source.type.split(/\s+/).map(function(t) { return "from-" + t; }))
      .join(" ");
}

function reset(svg) {
  svg.selectAll("*")
      .style("stroke-opacity", null)
      .style("fill-opacity", null)
      .style("display", null);

  var node = svg.selectAll(".node g")
      .attr("class", function(d) { return d.type; })
      .attr("transform", function(d, i) { return "translate(" + d.depth * step + "," + d.x + ")"; });

  node.select("rect")
      .attr("ry", 6)
      .attr("rx", 6)
      .attr("y", -10)
      .attr("height", 20)
      .attr("width", function(d) { return d.width; })
    .filter(function(d) { return d.flipped; })
      .attr("x", function(d) { return -d.width; });

  node.select(".join")
      .attr("d", d3.svg.diagonal()
        .source(function(d) { return {y: d.width, x: 0}; })
        .target(function(d) { return {y: 88, x: d.join * 24}; })
        .projection(function(d) { return [d.y, d.x]; }));

  svg.selectAll(".link path")
      .attr("class", linkType)
      .attr("d", d3.svg.diagonal()
        .source(function(d) { return {y: d.source.depth * step + (d.source.flipped ? -1 : +1) * d.source.width, x: d.source.x}; })
        .target(function(d) { return {y: d.target.depth * step, x: d.target.x}; })
        .projection(function(d) { return [d.y, d.x]; }));
}
