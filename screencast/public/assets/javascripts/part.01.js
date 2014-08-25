/**
 *
 */
(function () {

    /**
     *
     * @type {{Model: {}, View: {}, Collection: {}, Helper: {}}}
     */
    window.App = {
        Model: {},
        View: {},
        Collection: {},
        Helper: {}
    };

    /**
     *
     * @param selector
     * @returns Undercore.Template
     */
    App.Helper.Template = function (selector) {
        return _.template($(selector).html());
    }

    //var Chapter = Backbone.Model.extend({
    //    validate: function (attrs, options) {
    //        console.log(["Validate", attrs]);
    //        if (attrs.end < attrs.start) {
    //            return "can't end before it starts";
    //        }
    //    }
    //});
    //
    //var one = new Chapter({
    //    title: "Chapter One: The Beginning"
    //});
    //
    //one.on("invalid", function (model, error) {
    //    console.log(["Invalid error", model.get("title"), error]);
    //});
    //
    //one.save({
    //    start: 15,
    //    end: 10
    //});

    App.Model.Person = Backbone.Model.extend({
        defaults: {
            name: "Judzhin",
            age: 16,
            job: 'Developer'
        },
        validate: function (attrs) {

            // validate name
            if (!attrs.name.length) {
                return "Имя не может быть пустым";
            }

            // validate age
            if (0 >= attrs.age) {
                return "Возраст не может быть отрецаемым";
            }

        }
    });

    var modelPerson = new App.Model.Person();

    modelPerson.on("invalid", function (model, err) {
        console.log(["Invalid error", model.get("name"), err]);
    });

    App.Collection.Person = Backbone.Collection.extend({
        model: App.Model.Person
    });

    /**
     *
     * @type Backbone.View
     */
    App.View.Person = Backbone.View.extend({
        //initialize: function () {
        //    this.render();
        //},
        /**
         * @type Underscore.Template
         */
        // template: _.template($('#person-item').html()),
        template: App.Helper.Template('#person-item'),
        tagName: 'li',
        className: 'person',
        id: 'person',
        /**
         *
         * @returns {*}
         */
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    /**
     *
     * @type {*}
     */
    App.View.Persons = Backbone.View.extend({
        //initialize: function () {
        //    console.log(['Collection', this.collection]);
        //},
        tagName: 'ul',
        render: function () {

            // build child elements
            this.collection.each(function (item) {
                var personView = new App.View.Person({
                    model: item
                });

                // append element
                this.$el.append(personView.render().el);

            }, this);

            return this;
        }
    });

    var viewPerson = new App.View.Person({
        model: modelPerson
    });

    var collectionPerson = new App.Collection.Person();

    for (var i = 0; i < 5; i++) {
        //personalCollection.add(new Person({
        //    name: 'Jdz: ' + i,
        //    age: 27,
        //    job: 'Developer'
        //}));
        collectionPerson.add({
            name: 'Jdz: ' + i,
            age: 27,
            job: 'Developer'
        });
    }

    var viewPersons = new App.View.Persons({
        collection: collectionPerson
    });

    $(document.body).append(viewPersons.render().el);

})();