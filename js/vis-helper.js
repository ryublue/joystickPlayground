var visHelper = ( function ($) {
    function updatePoint (view, x, y) {
        view.data("source")
            .update(function(d){return true;}, "x", function(d){return x;})
            .update(function(d){return true;}, "y", function(d){return y;});
        view.update()
    }

    function addPoint (view, x, y) {
        view.data("source").insert([{"x": x, "y": y }])
        view.update()
    }

    function clearView (view) {
        view.data("source").remove(function(d) { return true; });
        view.update();
    }


    $('#clearNormalizedView').click( function(){ clearView(normalizedView); });


    // cursor visualiztion
    vlSpec = {
      "data": { "name": "normalizedInput", "values": [ {"x": 0,"y": 0, "id": "position"} ] },
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
      normalizedView = result.view;
    });


    var visHelper = {};
    visHelper.updatePoint = updatePoint;
    visHelper.addPoint = addPoint;
    visHelper.clearView = clearView;

    return visHelper;
} )(jQuery);