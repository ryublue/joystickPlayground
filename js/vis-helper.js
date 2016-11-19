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

    var visHelper = {};
    visHelper.updatePoint = updatePoint;
    visHelper.addPoint = addPoint;
    visHelper.clearView = clearView;

    return visHelper;
} )(jQuery);