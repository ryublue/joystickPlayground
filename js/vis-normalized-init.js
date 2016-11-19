// visualiztion for normalized input
var visNormalized = ( function ($, vg) {    
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
      vis.norm = result.view;
    });

} )(jQuery, vg);