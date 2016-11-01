FlowRouter.route('/', {
    action: function(params, queryParams) {
        FlowLayout.render('body', {  top: "menu", main: "addStudent" });
    },
    name: "home",
    triggersEnter: [function(context, redirect) {
    if(!Meteor.userId()){
        redirect('/login')
    }
}]
});

FlowRouter.route('/list', {
    action: function(params, queryParams) {
        FlowLayout.render('body', {  top: "menu", main: "studentList" });
    },
    name: "student.list"
});

FlowRouter.route('/login', {
    action: function(params, queryParams) {
        FlowLayout.render('body', { top: "menu",  main: "login" });
    },
    name: "login",
    triggersEnter: [function(context, redirect) {
        if(Meteor.userId()){
            redirect('/')
        }
    }]
});

FlowRouter.route('/register', {
    action: function(params, queryParams) {
        FlowLayout.render('body', {  top: "menu", main: "register" });
    },
    name: "register",
    triggersEnter: [function(context, redirect) {
    if(Meteor.userId()){
        redirect('/')
    }
    }]
});

