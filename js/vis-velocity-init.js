// visualiztion for normalized input
// use globally defined vis.velo

var visVelocity = ( function ($, vg, visHelper) {

  var view; 
  var myInputDomain = [0, 25];
  var myOuputDomain = [0, 2000];

  function updateTransferFunction(func) {
    var samples = sampleVelocityFunction(func);
    view.data("source")
      .remove(function(d) { return (d.hint != "cursor"); })
      .insert(samples);
    view.update();
  }

   function updateVelocity(v) {
    view.data("source")
      .remove(function(d) { return (d.hint == "cursor"); })
      .insert([{"input": v.input, "output": v.output, "hint": "cursor"}]);
    view.update();
    
   }

  // transfer functions
  var transferFunctions = {};
  transferFunctions.identity = function(x){return x;}; 
  

  // sampling from the transfer function for plotting
  function sampleVelocityFunction(func) {
    var count = 100;
    var scale = myInputDomain[1] / count;
    var data = new Array(count);
    for (var i = 0; i < count; i++) {
      data[i] = {"input": i * scale, "output": func(i * scale)};
    }
    return data;
  }


  // plot specification
  var initValues = sampleVelocityFunction(function(x){return x;})
  initValues.push({"input": 0, "output": 0, "hint": "cursor"});
  vlSpec = {
      "data": {"values": initValues },
      "layers": [
        {
          "mark": "line",
          "transform": {"filter": "datum.hint != 'cursor'"},
          "encoding": {
            "x": {
              "field": "input",
              "type": "quantitative",
              "scale": {"domain": myInputDomain, "range": "width", "zero": false},
              "axis": {"ticks": 10}
            },
            "y": {
              "field": "output",
              "type": "quantitative",
              "scale": {"domain": myOuputDomain, "range": "width", "zero": false},
              "axis": {"ticks": 10}
            }
          }
        },
        {
          "mark": "point",
          "transform": {"filter": "datum.hint == 'cursor'"},
          "encoding": {
            "x": {
              "field": "input",
              "type": "quantitative",
              "scale": {"domain": myInputDomain, "range": "width", "zero": false},
              "axis": {"ticks": 10}
            },
            "y": {
              "field": "output",
              "type": "quantitative",
              "scale": {"domain": myOuputDomain, "range": "width", "zero": false},
              "axis": {"ticks": 10}
            }
          }
        }
      ]
    }

    var embedSpec = {
      mode: "vega-lite",
      spec: vlSpec,
      actions: false
    }
    
    vg.embed("#velocityVis", embedSpec, function(error, result) {
      vis.velo = result.view;
      view = vis.velo;
    });

    var api = {};
    api.updateTransferFunction = updateTransferFunction;
    api.transferFunctions = transferFunctions;
    api.updateVelocity = updateVelocity;
    return api;

} )(jQuery, vg, visHelper);