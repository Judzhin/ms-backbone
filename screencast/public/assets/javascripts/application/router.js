/**
 *
 * @type {*}
 */
App.Router.Main = Backbone.Router.extend({
    routes: {
        '': 'onIndex'
    },
    onIndex: function () {
        console.log(['index rout']);
    }
});