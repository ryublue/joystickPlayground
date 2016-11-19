// visualiztion for normalized input
// use globally defined vis.velo

var visVelocity = ( function ($, vg, visHelper) {

  var view; 
  var myInputDomain = [0, 1];
  var myOuputDomain = [0, 5];

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
      .insert([{"input": Math.abs(v.input), "output": Math.abs(v.output), "hint": "cursor"}]);
    view.update();
    
   }

  // transfer functions
  var transferFunctions = {};
  transferFunctions.identity = function(x){return x;}; 
  transferFunctions.ease = function(x){return (x<0.5) ? x * 2 : x * 5;}; 
  

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
  var initValues = [{"input": 1, "output": 1}]
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
              "axis": {"ticks": 10, "title": "Normalized joystick distance"}
            },
            "y": {
              "field": "output",
              "type": "quantitative",
              "scale": {"domain": myOuputDomain, "range": "width", "zero": false},
              "axis": {"ticks": 10, "title": "Ship movement distance"}
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
            },
            "y": {
              "field": "output",
              "type": "quantitative",
              "scale": {"domain": myOuputDomain, "range": "width", "zero": false},
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