
// invocation for an animation that shows Segment Workspaces

selectAllAnimation(
  {type: "selection", name: "Workspace", children: [
    {type: "array", name: "project", children: [
      {type: "element", name: "identifies"},
      {type: "element", name: "pages"},
      {type: "element", name: "tracks"},
      {type: "element", name: "track"}
    ]}
  ]},
  24 * 4,
  {type: "selection", name: "Workspace", children: [
    {type: "array", name: "project", children: [
      {type: "element", name: "identifies"},
      {type: "element", name: "pages"},
      {type: "element", name: "tracks"},
      {type: "element", name: "track"}
    ]},
    {type: "array", name: "project", children: [
      {type: "element", name: "identifies"},
      {type: "element", name: "pages"},
      {type: "element", name: "tracks"},
      {type: "element", name: "track"}
    ]},
    {type: "array", name: "project", children: [
      {type: "element", name: "identifies"},
      {type: "element", name: "pages"},
      {type: "element", name: "tracks"},
      {type: "element", name: "track"}
    ]},
    {type: "array", name: "project", children: [
      {type: "element", name: "identifies"},
      {type: "element", name: "pages"},
      {type: "element", name: "tracks"},
      {type: "element", name: "track"}
    ]}
  ]},
  24 * 16
).on("start", function() {
  d3.select("#select-all-1-1").style("background", "#ff0");
}).on("middle", function() {
  d3.select("#select-all-1-1").style("background", null);
}).on("end", function() {
  d3.select("#select-all-1-2").style("background", "#ff0");
}).on("reset", function() {
  d3.selectAll("#select-all-1-1,#select-all-1-2").style("background", 'green');
});
