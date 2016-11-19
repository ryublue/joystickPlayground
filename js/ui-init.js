// initialize UI
(function ($) {

    var updateTransferFunction = function () {
        var funcBody = config.tfEditor.getValue();
        var func = Function("d", funcBody);
        visVelocity.updateTransferFunction(func);
        config.transferFunction = func;
    }

    // fill options for transfer functions
    $.each(transferFunctions, function (name, funcBody) {
        $('#tfSel').append($('<option>', {value: name, text: name}));
    });
    $('#tfSel').change(function (e) {
        var tfName = this.options[e.target.selectedIndex].text
        config.tfEditor.setValue(transferFunctions[tfName]);
    });


    // event bindings
    $("#normTrace")
        .prop("checked", config.normalizedView.showTrace)
        .click(function() { config.normalizedView.showTrace = this.checked;} );

    $('#clearNormalizedView').click( function(){ visHelper.clearView(vis.norm); });
    $('#updateTransferFunction').click( function() { updateTransferFunction(); });
    $("#resetShip").click( function() {
        game.ship.addEvent({"type": "move", data: {x: config.ship.start.x, y: config.ship.start.y}});
    });

    // set initial transfer function
    window.setTimeout( function() {
        config.tfEditor.setValue(transferFunctions.identity);
        updateTransferFunction();

        // fire the main event loop
        $(document).ready(eventLoop);
    }, 100);
})(jQuery);