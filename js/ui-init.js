// initialize UI
(function ($) {

    // code editor
    var editor = ace.edit("transferFunctionEditor");
    editor.setTheme("ace/theme/xcode");
    var session = editor.getSession()
    session.setMode("ace/mode/javascript");
    session.setUseWrapMode(true);
    session.setWrapLimitRange(40, 45);
    editor.$blockScrolling = Infinity

    // remember the editor in our namespace
    config.tfEditor = editor;


    var updateTransferFunction = function () {
        var funcBody = config.tfEditor.getValue();
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