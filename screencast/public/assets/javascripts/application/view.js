/**
 * Main App View
 * @type {*}
 */
App.View.Main = Backbone.View.extend({

    /**
     * @constructor
     */
    initialize: function () {
        // console.log(["Main View", this.collection.toJSON()]);

        Vent.on('contact:edit', this.onEditContact, this);

        new App.View.ContactForm({
            collection: this.collection
        });
        var contacts = new App.View.Contacts({
            collection: this.collection
        }).render();

        $('#contact-items').append(contacts.el);

    },
    onEditContact: function (model) {
        var form = new App.View.ContactFormEdit({
            model: model
        });
        $('#contact-form-edit-block').html(form.render().el);

    }
});

/**
 *
 * @type {*}
 */
App.View.ContactForm = Backbone.View.extend({
    initialize: function () {
        this.formEl = {
            name: this.$('input[name="name"]'),
            number: this.$('input[name="number"]'),
            email: this.$('input[name="email"]')
        };
    },
    el: '#contact-form',
    events: {
        'submit': 'onSubmit'
    },
    onSubmit: function (e) {

        e.preventDefault();

        var contact = this.collection.create({
            name: this.formEl.name.val(),
            number: this.formEl.number.val(),
            email: this.formEl.email.val()
        }, {wait: true});

        this.$el.trigger('reset');
    }
});

/**
 *
 * @type {*}
 */
App.View.ContactFormEdit = Backbone.View.extend({
    template: App.Helper.Template('#contact-item-edit'),
    events: {
        'submit': 'onSubmit',
        'click button[type="button"]': 'onCancelClick'
    },
    render: function () {
        var view = this.template(this.model.toJSON());
        this.$el.html(view);

        /**
         * cache after past template
         * @type {{name: *, number: *, email: *}}
         */
        this.formEl = {
            name: this.$el.find('input[name="name"]'),
            number: this.$el.find('input[name="number"]'),
            email: this.$el.find('input[name="email"]')
        };
        return this;
    },
    onSubmit: function (e) {
        console.log('edit');
        e.preventDefault();

        this.model.save({
            name: this.formEl.name.val(),
            number: this.formEl.number.val(),
            email: this.formEl.email.val()
        });

        this.remove();
    },
    onCancelClick: function() {
        this.remove();
    }
});

/**
 *
 * @type {*}
 */
App.View.Contacts = Backbone.View.extend({
    initialize: function () {
        this.collection.on("add", this.addOne, this);
    },
    tagName: 'tbody',
    render: function () {
        this.collection.each(this.addOne, this);
        return this;
    },
    addOne: function (record) {
        var view = new App.View.Contact({
            model: record
        });

        this.$el.append(view.render().el);
        return this;
    }
});

/**
 *
 * @type {*}
 */
App.View.Contact = Backbone.View.extend({
    initialize: function () {
        this.model.on('destroy', this.remove, this);
        this.model.on('change', this.render, this);
    },
    tagName: 'tr',
    events: {
        'click a.destroy': 'onDestroyClick',
        'click a.edit': 'onEditClick'
    },
    /**
     *
     * @param e
     */
    onDestroyClick: function (e) {
        this.model.destroy();
    },

    /**
     *
     * @param e
     */
    onEditClick: function (e) {
        Vent.trigger('contact:edit', this.model);
    },
    template: App.Helper.Template('#contact-item'),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});
