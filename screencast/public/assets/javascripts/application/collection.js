/**
 *
 * @type {*}
 */
App.Collection.Contacts = Backbone.Collection.extend({
    model: App.Model.Contact,
    /**
     * @name url|urlRoot
     * @description
     */
    url: 'api/contacts'
});
