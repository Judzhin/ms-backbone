App.Model.Contact = Backbone.Model.extend({
    idAttribute: 'contact_id',
    validate: function (attrs, opts) {

        if (!attrs.name || !attrs.number) {
            return 'Имя и номер обязательны для заполнения';
        }

        if (!attrs.email) {
            return 'Вы не ввели Email';
        }

    }
});
