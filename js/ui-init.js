var ui = (function ($, visTransfer, visNorm, game, config) {

    // code editor
    var tfEditor = ace.edit("transferFunctionEditor");
    tfEditor.setTheme("ace/theme/xcode");
    var session = tfEditor.getSession()
    session.setMode("ace/mode/javascript");
    session.setUseWrapMode(true);
    session.setWrapLimitRange(40, 45);
    tfEditor.$blockScrolling = Infinity



    var updateTransferFunction = function () {
        var funcBody = tfEditor.getValue();
        var func = Function("d", funcBody);
        visTransfer.setTransferFunction(func);
        config.transferFunction = func;
    }

    // fill options for transfer functions
    $.each(transferFunctions, function (name, funcBody) {
        $('#tfSel').append($('<option>', {value: name, text: name}));
    });
    $('#tfSel').change(function (e) {
        var tfName = this.options[e.target.selectedIndex].text
        tfEditor.setValue(transferFunctions[tfName]);
    });


    // event bindings
    $("#normTrace")
        .click(function() { visNorm.setShowTraces(this.checked);} );

    $('#clearNormalizedView').click( function(){ visNorm.clear(); });
    $('#updateTransferFunction').click( function() { updateTransferFunction(); });
    $("#resetShip").click( function() {
        game.resetShip();
    });

    // set initial transfer function
    window.setTimeout( function() {
        tfEditor.setValue(transferFunctions.identity);
        updateTransferFunction();

        // fire the main event loop
        $(document).ready(eventLoop);
    }, 100);


    // public: update method for vis and text
    function updateUI(norm, distanceLog) {
        
        // update vis
        visTransfer.addDistanceLog(distanceLog);
        visNorm.addNormPoint(norm);

        // update text
        $("#normX").text(norm.x.toFixed(2));
        $("#normY").text(norm.y.toFixed(2));
        $("#distanceInput").text(distanceLog.input.toFixed(2));
        $("#distanceOutput").text(distanceLog.output.toFixed(2));
    
    }
    

    var api = {};
    api.updateUI = updateUI;
    return api;
})(jQuery, visTransfer, visNorm, game, config);