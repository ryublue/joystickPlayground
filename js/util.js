var util = ( function ($) {
    function pointDist (p1, p2) { 
        return Math.sqrt(((p1.x - p2.x) * (p1.x - p2.x)) + ((p1.y - p2.y) * (p1.y - p2.y))); 
    }

    var api = {};
    api.pointDist = pointDist;
    api.pointZero = {"x": 0.0 , "y": 0.0}
    
    return api;
} )(jQuery);