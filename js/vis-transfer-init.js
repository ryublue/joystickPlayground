var visTransfer = ( function ($, vg, visHelper) {

  var view; 
  var myInputDomain = [0, 1];
  var myOuputDomain = [0, 5];
  var cCounter = 0;
  const MAXCURSOR = 100;  // maximum number of history trace

  // public: set transfer function
  function setTransferFunction(func) {
    var samples = sampleFromFunction(func);
    view.data("source")
      .remove(function(d) { return (d.hint != "cursor"); })
      .insert(samples);
    view.update();
  }

  // public: add distance to the plot
  function addDistanceLog(v) {
    view.data("source")
      .remove(function(d) { 
        return (d.hint == "cursor" && d.cursorId < cCounter - MAXCURSOR); 
      })
      .insert([{"input": Math.abs(v.input), "output": Math.abs(v.output), "hint": "cursor", "cursorId": ++cCounter}]);

    view.update();
  }
  
  // sampling from the transfer function for plotting
  function sampleFromFunction(func) {
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
    
    vg.embed("#transferVis", embedSpec, function(error, result) {
      view = result.view;
    });

    var api = {};
    api.setTransferFunction = setTransferFunction;
    api.addDistanceLog = addDistanceLog;
    return api;

} )(jQuery, vg, visHelper);