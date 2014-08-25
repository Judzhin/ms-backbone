/**
 * Start Application
 * @returns {undefined}
 */
(function() {
    /**
     * Global Application variable
     */
    window.App = {
        Model: {},
        Collection: {},
        View: {},
        Router: {},
        Helper: {
            Template: function(selector){
                return _.template($(selector).html());
            }
        }
    };
    
    /**
     * Observer
     */
    window.Vent = _.extend({}, Backbone.Events);

})();