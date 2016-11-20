// visualiztion for normalized input
var visNorm = ( function ($, vg) {

  var view;
  var isTraceOn = false;

  // public: add normalized point to the view
  function addNormPoint(norm) {
    if (isTraceOn) {
      view.data("source").insert([{"x": norm.x, "y": norm.y }])
    }
    else {
      view.data("source")
          .update(function(d){return true;}, "x", function(d){return norm.x;})
          .update(function(d){return true;}, "y", function(d){return norm.y;});
    }
    
    view.update()
  }

  // public: should show trace or not
  function setShowTraces(isShowing) {
    isTraceOn = isShowing;
  }

  // public: clear the view
  function clear() {
    view.data("source").remove(function(d) { return true; });
    view.update();
  }


  // initialize plot
  vlSpec = {
    "data": {"values": [ {"x": 0,"y": 0} ] },
    "mark": "point",
    "encoding": {
      "x": {
        "field": "x",
        "type": "quantitative",
        "scale": {"domain": [-1, 1], "range": "width", "zero": false},
        "axis": {"ticks": 10}
      },
      "y": {
        "field": "y",
        "type": "quantitative",
        "scale": {"domain": [-1, 1], "range": "width", "zero": false},
        "axis": {"ticks": 10}
      }
    }
  }

  var embedSpec = {
    mode: "vega-lite",
    spec: vlSpec,
    actions: false
  }
  
  vg.embed("#normVis", embedSpec, function(error, result) {
    view = result.view;
  });

  var api = {};
  api.addNormPoint = addNormPoint;
  api.setShowTraces = setShowTraces;
  api.clear = clear;
  return api;

} )(jQuery, vg);