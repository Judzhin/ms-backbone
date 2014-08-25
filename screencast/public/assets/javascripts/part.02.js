(function() {

    /**
     *
     * @type {{Model: {}, View: {}, Collection: {}, Helper: {}}}
     */
    window.App = {
        Model: {},
        View: {},
        Collection: {},
        Router: {},
        Helper: {}
    };

    /**
     *
     * @param selector
     * @returns Undercore.Template
     */
    App.Helper.Template = function(selector) {
        return _.template($(selector).html());
    }

    var vent = _.extend({}, Backbone.Events);

    App.Router.Main = Backbone.Router.extend({
        routes: {
            '': 'index',
            'tasks': 'showTasks',
            'task/:id': 'showTask',
            '*error': 'errorPage'
        },
        index: function() {
            console.log('main route');
        },
        showTasks: function(/* ... */) {
            //vent.trigger('showpage:show', id);
            //console.log(['Show page by id: ' + id]);
            vent.trigger('tasks:show');
        },
        showTask: function(id) {
            console.log(['route trigger show task']);
            vent.trigger('task:show', id);
            //console.log(['Show item by id: ', id, ' and category:', category]);
        },
        errorPage: function(error) {
            console.log(['Error page: ', error]);
        }
    });

    new App.Router.Main();
    Backbone.history.start();

    App.Model.Task = Backbone.Model.extend({
        validate: function(attrs, options) {
            if (!$.trim(attrs.title)) {
                return 'Имя задачи должно быть валидным';
            }
        },
        idAttribute: 'task_id',
        urlRoot: '/tasks'
    });

    App.View.AddTask = Backbone.View.extend({
        el: '#task-add',
        events: {
            'submit': 'submitForm'
        },
        initialize: function() {

        },
        submitForm: function(e) {
            e.preventDefault();
            var title = $(e.currentTarget).find('input[type="text"]').val();
            var model = new App.Model.Task({
                title: title
            });
            this.collection.add(model);
            //console.log(this.collection);
        }
    });

    App.View.Task = Backbone.View.extend({
        initialize: function() {

            //_.bindAll(this, 'editEdit', 'render');

            //this.model.on('change:title');
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },
        tagName: 'li',
        template: App.Helper.Template('#task-item'),
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        events: {
            'click .edit': 'clickEdit',
            'click .delete': 'clickDelete'
        },
        clickEdit: function() {
            var title = prompt('Как переименуем задачу?', this.model.get('title'));
            this.model.set('title', title, {validate: true});
        },
        clickDelete: function() {
            this.model.destroy();
        },
        remove: function() {
            this.$el.remove();
        }
    });

    App.Collection.Tasks = Backbone.Collection.extend({
        model: App.Model.Task,
        url: 'api/tasks'
    });

    //var taskModel = new App.Model.Task({
    //    title: 'Сходить в магазин',
    //    priority: 4
    //});
    //
    //var taskView = new App.View.Task({
    //    model: taskModel
    //});

    App.View.Tasks = Backbone.View.extend({
        tagName: 'ul',
        initialize: function() {
            
            debugger;
            
            /**
             * On rout
             */
            vent.on('task:show', this.showTask, this);
            vent.on('tasks:show', this.showTasks, this);
            this.collection.on('add', this.addOne, this);

        },
        render: function() {
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function(task) {
            
            debugger;
            
            var view = new App.View.Task({
                model: task
            });
            this.$el.append(view.render().el);
        },
        showTasks: function() {
            $('body').html(this.render().el);
        },
        showTask: function(id) {

            var model = this.collection.at(id);

            var view = new App.View.Task({
                model: model
            });

            $('body').html(view.render().el);
        }
    });

    var tasksCollection = new App.Collection.Tasks();
    tasksCollection.fetch();
    //var tasksCollection = new App.Collection.Tasks([
    //    new App.Model.Task({
    //        title: 'Сходить в магазин',
    //        priority: 4
    //    }),
    //    new App.Model.Task({
    //        title: 'Сходить на работу',
    //        priority: 3
    //    }),
    //    new App.Model.Task({
    //        title: 'Прочитать почту',
    //        priority: 4
    //    })
    //]);

    var tasksView = new App.View.Tasks({
        collection: tasksCollection
    });

    $('.tasks').html(tasksView.render().el);

    var addTask = new App.View.AddTask({
        collection: tasksCollection
    });

    //var testRecord = new App.Model.Task({task_id: 1});
    //testRecord.fetch();
    
})();